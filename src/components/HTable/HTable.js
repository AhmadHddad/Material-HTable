import * as React from "react";
import {
    TableContainer as MTableContainer,
    TablePagination as MTablePagination,
    Table as MTalbe,
    IconButton as MIconButton,
    TextField as MTextField,
    TableRow as MTableRow,
    TableCell as MTableCell,
    Checkbox as MCheckbox,
    TableSortLabel as MTableSortLabel,
    TableHead as MTableHead,
    TableBody as MTableBody,
    Grid as MGrid,
    Card as MCard,
    CircularProgress,
    Collapse,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import { conditionalReturn, returnObjFromFunc, toArray, toObject } from "../../utils";
import THead from "../HTableHead";
import HTEmptyView from "../HTableEmptyView";
import HTLoadingView from "../HTableLoadingView";
import TRow from "../HTableRow";
import SBar from "../SearchBar";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export const allComponents = {
    Table: MTalbe,
    Card: MCard,
    TableContainer: MTableContainer,
    TablePagination: MTablePagination,
    TableBody: MTableBody,
    TextField: MTextField,
    IconButton: MIconButton,
    TableRow: MTableRow,
    KeyboardArrowUpIcon,
    HTableHead: THead,
    HTableRow: TRow,
    HTableEmptyView: HTEmptyView,
    KeyboardArrowDownIcon,
    TableHead: MTableHead,
    HTableLoadingView: HTLoadingView,
    TableCell: MTableCell,
    Grid: MGrid,
    SearchIcon,
    CircularProgress,
    ClearIcon,
    SearchBar: SBar,
    Collapse,
    Checkbox: MCheckbox,
    TableSortLabel: MTableSortLabel,
};

function HTable({
    heads,
    loadingView,
    selectable,
    emptyViewText,
    selectOptoins,
    rows,
    isLoading,
    disabled,
    tableContainerProps,
    tableBodyprops,
    sortable,
    isPaginate,
    collapseOptions,
    headOptions,
    searchable,
    emptyView,
    tableProps,
    color,
    searchOptions,
    paginationOptions,
    onSort,
    orderBy,
    order,
    onSelectAllClick,
    onRowSelected
}) {
    const props = arguments[0];
    const classes = useHTableStyle(props);

    const { defaultSelectedIds } = toObject(selectOptoins)
    const { defaultSearchText } = toObject(searchOptions);
    const components = Object.assign(allComponents, props.components);
    const { Card, SearchBar, HTableHead, HTableEmptyView, HTableLoadingView, HTableRow, TableContainer, Table, TableBody, TablePagination } = components;

    const {
        rowsPerPageOptions,
        totalItems,
        rowsPerPage,
        pageNumber,
        onRowsPerPageChange,
        onPageChange,
        component: paginationComponent,
        paginationProps
    } = toObject(paginationOptions);

    const [searchText, setSearchTextValue] = React.useState(defaultSearchText || "");
    const [selected, setSelected] = React.useState(toArray(defaultSelectedIds));

    const totalCount = totalItems ?? rows?.length ?? 0;

    const handleSelectAllClick = event => {
        let updatedSelected = [];

        if (event.target.checked) {
            updatedSelected = rows.map(n => n.id);
        }

        setSelected(updatedSelected);
        onSelectAllClick?.(event, updatedSelected)
    };

    const handleClick = (event, row) => {
        if (!selectable) return;
        const rowId = row.id;
        const selectedIndex = selected.indexOf(rowId);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, rowId);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
        onRowSelected?.(event, newSelected)
    };

    const searchBar = conditionalReturn(searchable, <SearchBar components={components} searchOptions={setSearchTextValue} searchText={searchText} setSearchTextValue={setSearchTextValue} />)

    const renderLoaderOrEmptyView = () => {
        const LoaderView = loadingView || <HTableLoadingView components={components} />;
        const EmptyView = emptyView || <HTableEmptyView components={components} emptyViewText={emptyViewText} />;
        return (
            <>
                {searchBar}
                {isLoading ? LoaderView : EmptyView}
            </>
        );
    };

    const isSelected = id => selected.indexOf(id) !== -1;

    function onRef(ref) {
        disabled && ref && ref.addEventListener("keydown", event => {
            event.preventDefault();
        })
    }

    const allHeads = heads?.concat?.({
        id: "-1",
        component: ""
    }) || []

    return (
        <TableContainer
            className={classNames({ [classes.disabled]: disabled })} ref={onRef}
            component={Card}
            {...returnObjFromFunc(tableContainerProps)}
        >
            {isLoading || !rows?.length ? (
                renderLoaderOrEmptyView()
            ) : (
                <>
                    {searchBar}
                    <Table  {...toObject(tableProps)}>
                        <HTableHead
                            components={components}
                            numSelected={selected?.length ?? 0}
                            color={color}
                            onSelectAllClick={handleSelectAllClick}
                            heads={allHeads}
                            sortable={sortable}
                            order={order}
                            orderBy={orderBy}
                            onSort={onSort}
                            rowCount={totalCount}
                            selectable={selectable}
                            {...toObject(headOptions)}
                        />
                        <TableBody {...toObject(tableBodyprops)}>
                            {rows.map((row, index) => {
                                const isRowSelected = isSelected(row.id);
                                return (
                                    <HTableRow
                                        components={components}
                                        selectOptoins={selectOptoins}
                                        collapseOptions={collapseOptions}
                                        color={color}
                                        selectable={selectable}
                                        index={index}
                                        key={row.id || index}
                                        row={row}
                                        onRowClicked={handleClick}
                                        isRowSelected={isRowSelected}
                                    />
                                );
                            })}
                        </TableBody>
                    </Table>
                </>)}
            {isPaginate && (
                <TablePagination
                    component={paginationComponent || "div"}
                    rowsPerPageOptions={rowsPerPageOptions}
                    count={totalCount}
                    rowsPerPage={rowsPerPage}
                    page={pageNumber}
                    onPageChange={(...args) => onPageChange(...args, searchText)}
                    onRowsPerPageChange={(...args) =>
                        onRowsPerPageChange(...args, searchText)
                    }
                    {...toObject(paginationProps)}
                />
            )}
        </TableContainer>
    );
}

HTable.defaultProps = {
    heads: [
        {
            id: 1,
            align: "left",
            props: {},
            sortLabelProps: {},
            component: "Heading 1"
        },
        {
            id: 2,
            component: "Heading2"
        }
    ],
    rows: [{
        id: 1,
        cells: [
            { id: "cellId1", component: "Row#1Cell1", props: {} },
            { id: "cellId2", component: "Row#1Cell2", props: {} }
        ],
        props: {},
        collapseRow: { component: <div>Collapse Row</div>, rowPorps: {}, cellProps: {} }
    }],
};

HTable.propTypes = {
    heads: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        align: PropTypes.oneOf(["inherit", "left", "center", "right", "justify"]),
        props: PropTypes.object,
        sortLabelProps: PropTypes.object,
        component: PropTypes.element
    })),
    emptyViewText: PropTypes.string,
    selectOptoins: PropTypes.shape({ defaultSelectedIds: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])) }),
    tableBodyprops: PropTypes.object,
    sortable: PropTypes.bool,
    collapseOptions: PropTypes.shape({
        collapseDefaultState: PropTypes.bool,
        onOpen: PropTypes.func,
        isOpen: PropTypes.bool,
        collapseBtnProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
        arrowDownKeysProps: PropTypes.object,
        arrowUpKeysProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func])
    }),
    tableProps: PropTypes.object,
    color: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf(["primary"
        , "secondary"
        , "error"
        , "info"
        , "success"
        , "warning"
        , "default"])]),
    orderBy: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    order: PropTypes.oneOf(["asc" | "desc"]),
    onSelectAllClick: PropTypes.func,
    onSort: PropTypes.func,
    selectable: PropTypes.bool,
    rows: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        cells: PropTypes.arrayOf(PropTypes.shape(
            {
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                component: PropTypes.element,
                props: PropTypes.object
            }
        )),
        props: PropTypes.object,
        collapseRow: PropTypes.shape({
            component: PropTypes.element,
            rowPorps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
            cellProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
        })
    })),
    isLoading: PropTypes.bool,
    disabled: PropTypes.bool,
    tableContainerProps: PropTypes.object,
    isPaginate: PropTypes.bool,
    searchable: PropTypes.bool,
    emptyView: PropTypes.element,
    components: PropTypes.shape({
        Table: PropTypes.element,
        Card: PropTypes.element,
        TableContainer: PropTypes.element,
        TablePagination: PropTypes.element,
        TableBody: PropTypes.element,
        TextField: PropTypes.element,
        IconButton: PropTypes.element,
        TableRow: PropTypes.element,
        KeyboardArrowUpIcon: PropTypes.element,
        HTableHead: PropTypes.element,
        HTableRow: PropTypes.element,
        HTableEmptyView: PropTypes.element,
        KeyboardArrowDownIcon: PropTypes.element,
        TableHead: PropTypes.element,
        HTableLoadingView: PropTypes.element,
        TableCell: PropTypes.element,
        Grid: PropTypes.element,
        SearchIcon: PropTypes.element,
        CircularProgress: PropTypes.element,
        ClearIcon: PropTypes.element,
        SearchBar: PropTypes.element,
        Collapse: PropTypes.element,
        Checkbox: PropTypes.element,
        TableSortLabel: PropTypes.element,
    }),
    loadingView: PropTypes.element,
    searchOptions: PropTypes.objectOf(PropTypes.shape({
        defaultSearchText: PropTypes.string,
        searchInputProps: PropTypes.object,
        searchInputContainerProps: PropTypes.object,
        onClearSearch: PropTypes.func,
        onSearchClick: PropTypes.func
    })),
    paginationOptions: PropTypes.objectOf(PropTypes.shape({
        totalItems: PropTypes.number,
        pageNumber: PropTypes.number,
        onRowsPerPageChange: PropTypes.func,
        rowsPerPage: PropTypes.number,
        rowsPerPageOptions: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.arrayOf(PropTypes.objectOf(PropTypes.shape({ value: PropTypes.number, label: PropTypes.string })))]),
        classes: PropTypes.object,
        component: PropTypes.element,
        onPageChange: PropTypes.func
    })),
    headOptions: PropTypes.shape({
        headRowProps: PropTypes.object,
        selectAllOptions: PropTypes.shape({
            selectAllCheckboxProps: PropTypes.object,
            selectAllCellProps: PropTypes.object,
        }),
        headProps: PropTypes.object,
    })
}

export default HTable;
