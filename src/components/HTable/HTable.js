import "./hTableSyle.css";
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
    Collapse,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import PropTypes from "prop-types";
import classNames from "classnames";
import { conditionalReturn, returnObjFromFunc, toArray, toObject } from "../../utils";
import HTableHead from "components/HTableHead/HTableHead";
import HTableEmptyView from "components/HTableEmptyView/HTableEmptyView";
import HTableLoadingView from "components/HTableLoadingView/HTableLoadingView";
import useHTableStyle from "./hTableStyle";
import HTableRow from "components/HTableRow/HTableRow";
import SearchBar from "components/SearchBar/SearchBar";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const headCells = [
    {
        id: "name",
        align: "left",
        disablePadding: true,
        props: {},
        sortLabelProps: {},
        component: "Dessert (100g serving)"
    },
    {
        id: "calories",
        numeric: true,
        disablePadding: true,
        component: "Calories"
    },
    {
        id: "collapseRow",
        component: ""
    }
];



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
    KeyboardArrowDownIcon,
    TableHead: MTableHead,
    TableCell: MTableCell,
    Grid: MGrid,
    SearchIcon,
    ClearIcon,
    Collapse,
    Checkbox: MCheckbox,
    TableSortLabel: MTableSortLabel,
};

function HTable({
    heads,
    loaderView,
    selectable,
    emptyViewText,
    selectOptoins,
    rows,
    rowOptions,
    isLoading,
    disabled,
    tableContainerProps,
    tableBodyprops,
    sortable,
    addPagination,
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
    cardProps,
    onSelectAllClick,
    onRowSelected
}) {
    const props = arguments[0];
    const classes = useHTableStyle(props);

    const { defaultSelectedIds } = toObject(selectOptoins)
    const { defaultSearchText } = toObject(searchOptions);
    const components = Object.assign(allComponents, props.components);
    const { Card, TableContainer, Table, TableBody, TablePagination } = components;

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

    const totalCount = totalItems || rows?.length;

    const handleSelectAllClick = event => {
        let updatedSelected = [];

        if (event.target.checked) {
            updatedSelected = rows.map(n => n.id);
        }

        setSelected(updatedSelected);
        onSelectAllClick?.(event, updatedSelected)
    };

    const handleClick = (event, row) => {
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
        const LoaderView = loaderView || <HTableLoadingView />;
        const EmptyView = emptyView || <HTableEmptyView emptyViewText={emptyViewText} />;
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

    return (
        <TableContainer
            className={classNames({ [classes.disabled]: disabled })} ref={onRef} {...toObject(cardProps)}
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
                            //color, components, heads, numSelected, headRowProps,selectAllOptions headProps, rowCount, , onSelectAllClick, sortable, onSort, orderBy, order, selectable
                            components={components}
                            numSelected={selected?.length ?? 0}
                            color={color}
                            onSelectAllClick={handleSelectAllClick}
                            heads={heads}
                            sortable={sortable}
                            order={order}
                            orderBy={orderBy}
                            onSort={onSort}
                            rowCount={totalCount ?? 0}
                            selectable={selectable}
                            {...toObject(headOptions)}
                        />
                        <TableBody {...toObject(tableBodyprops)}>
                            {rows.map((row, index) => {
                                const isRowSelected = isSelected(row.id);
                                return (
                                    <HTableRow
                                        rowOptions={rowOptions}
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
            {addPagination && (
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
    heads: headCells,
    selectable: true,
    rows: [{
        id: 1,
        cells: [
            { id: "cellId1", component: "Row#1Cell1", props: {} },
            { id: "cellId2", component: "Row#1Cell2", props: {} }
        ],
        props: {},
        collapseRow: { component: <div>Collapse Row</div>, rowPorps: {}, cellProps: {} }
    }],
    rowOptions: {},
    isLoading: false,
    tableContainerProps: {},
    hover: false,
    addPagination: false,
    color: "primary",
    headersOptions: {},
    disabled: false,
    searchable: true,
    emptyView: null,
    searchOptions: {},
    components: {},
    paginationOptions: {}
};

HTable.propTypes = {
    headers: PropTypes.array,
    rows: PropTypes.array,
    isLoading: PropTypes.bool,
    disabled: PropTypes.bool,
    hover: PropTypes.bool,
    tableContainerProps: PropTypes.object,
    paperProps: PropTypes.object,
    emptyView: PropTypes.any,
    addPagination: PropTypes.bool,
    select: PropTypes.bool,
    checkbox: PropTypes.bool,
    paperEffect: PropTypes.bool,
    searchable: PropTypes.bool,
    rowsPerPageOptions: PropTypes.array,
    searchInputProps: PropTypes.object,
    searchInputContainerProps: PropTypes.object,
    headerTextProps: PropTypes.object,
    rowsPerPage: PropTypes.number,
    page: PropTypes.number,
    totalItems: PropTypes.number,
    onChangePage: PropTypes.func,
    onClearSearch: PropTypes.func,
    onRowClick: PropTypes.func,
    headerIcon: PropTypes.any,
    headerTitle: PropTypes.string,
    color: PropTypes.string,
    components: PropTypes.object,
    onChangeRowsPerPage: PropTypes.func
};

export default HTable;
