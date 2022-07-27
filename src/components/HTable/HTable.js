import "./hTableSyle.css";
import { useState } from "react";
import * as React from "react";
import {
    Grid,
    TextField,
    IconButton,
    CardContent,
    TableContainer,
    TablePagination,
    Card
} from "@mui/material";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import classNames from "classnames";
import { returnObjFromFunc, toObject, uuidv4 } from "../../utils";
import HTableHead from "components/HTableHead/HTableHead";
import HTableEmptyView from "components/HTableEmptyView/HTableEmptyView";
import HTableLoadingView from "components/HTableLoadingView/HTableLoadingView";
import useHTableStyle from "./hTableStyle";
import HTableRow from "components/HTableRow/HTableRow";

const headCells = [
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Dessert (100g serving)"
    },
    {
        id: "calories",
        numeric: true,
        disablePadding: true,
        label: "Calories"
    },
    {
        id: "collapseRow",
        label: ""
    }
];

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
    addPagination,
    headOptions,
    search,
    emptyView,
    searchOptions,
    paginationOptions
}) {
    const props = arguments[0];
    const classes = useHTableStyle(props);
    const { headCellProps } = toObject(headOptions);
    const {
        defaultSearchText,
        searchInputProps,
        clearBtnProps,
        searchIcon,
        searchInputContainerProps,
        searchBtnProps,
        onClearSearch,
        onSearchClick
    } = toObject(searchOptions);
    const { } = rowOptions;
    const {
        rowsPerPageOptions,
        totalItems,
        rowsPerPage,
        pageNumber,
        onRowsPerPageChange,
        onPageChange,
        classes: paginationClasses,
        component: paginationComponent
    } = toObject(paginationOptions);

    const [searchText, setSearchTextValue] = useState(defaultSearchText || "");
    const [selected, setSelected] = React.useState([]);

    const totalCount = totalItems || rows?.length;

    const handleSelectAllClick = event => {
        if (event.target.checked) {
            const newSelecteds = rows.map(n => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
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
    };

    const SearchIcn = searchIcon || <SearchIcon fontSize="small" />;
    function renderSearchBar() {
        if (!search) return null;

        return (
            <form
                onSubmit={e => {
                    e.preventDefault();
                    onSearchClick?.(searchText);
                }}
            >
                <Grid
                    container
                    item
                    padding={1}
                    justifyContent={"flex-start"}
                    {...searchInputContainerProps}
                >
                    <TextField
                        variant="standard"
                        onChange={e => setSearchTextValue(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <IconButton
                                    title="Clear"
                                    type="submit"
                                    aria-label="Clear"
                                    size="small"
                                    onClick={function () {
                                        onSearchClick?.(searchText);
                                    }}
                                    {...returnObjFromFunc(searchBtnProps, searchText)}
                                >
                                    {SearchIcn}
                                </IconButton>
                            ),
                            endAdornment: (
                                <IconButton
                                    title="Clear"
                                    aria-label="Clear"
                                    size="small"
                                    onClick={() => {
                                        setSearchTextValue("");
                                        onClearSearch?.();
                                    }}
                                    style={{ visibility: searchText ? "visible" : "hidden" }}
                                    {...returnObjFromFunc(clearBtnProps, searchText)}
                                >
                                    <ClearIcon fontSize="small" />
                                </IconButton>
                            )
                        }}
                        {...returnObjFromFunc(searchInputProps)}
                    />
                </Grid>
            </form>
        );
    }

    const renderLoaderOrEmptyView = () => {
        const LoaderView = loaderView || <HTableLoadingView />;
        const EmptyView = emptyView || <HTableEmptyView emptyViewText={emptyViewText} />;
        return (
            <>
                {renderSearchBar()}
                {isLoading ? LoaderView : EmptyView}
            </>
        );
    };

    const isSelected = id => selected.indexOf(id) !== -1;

    return (
        <Card>
            <CardContent className={classNames(classes.cardBody)}>
                {isLoading || !rows?.length ? (
                    renderLoaderOrEmptyView()
                ) : (
                    <>
                        {renderSearchBar()}
                        <TableContainer
                            {...returnObjFromFunc(tableContainerProps)}
                            component={"div"}
                        >
                            <Table className={classes.table} aria-label="simple table">
                                <HTableHead
                                    numSelected={selected?.length}
                                    onSelectAllClick={handleSelectAllClick}
                                    heads={heads}
                                    rowCount={totalCount}
                                    selectable={selectable}
                                />
                                <TableBody {...toObject(tableBodyprops)}>
                                    {rows.map((row, index) => {
                                        const isRowSelected = isSelected(row.id);
                                        return (
                                            <HTableRow
                                                selectOptoins={selectOptoins}
                                                selectable={selectable}
                                                index={index}
                                                key={row.id || index}
                                                row={row}
                                                onRowClicked={event => handleClick(event, row.id)}
                                                isRowSelected={isRowSelected}
                                            />
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        {addPagination && (
                            <TablePagination
                                component={paginationComponent || "div"}
                                rowsPerPageOptions={rowsPerPageOptions}
                                classes={
                                    paginationClasses || {
                                        root: classes.root
                                    }
                                }
                                count={totalCount}
                                rowsPerPage={rowsPerPage}
                                page={pageNumber - 1}
                                onPageChange={(...args) => onPageChange(...args, searchText)}
                                onRowsPerPageChange={(...args) =>
                                    onRowsPerPageChange(...args, searchText)
                                }
                            />
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
}

HTable.defaultProps = {
    heads: headCells,
    selectable: true,
    rows: new Array(5)
        .fill({
            id: 1,
            cells: [
                { id: "cellId1", component: "Row#1Cell1", props: {} },
                { id: "cellId2", component: "Row#1Cell2", props: {} }
            ],
            props: {},
            collapseRow: { component: <div>HEllo</div>, props: {} }
        })
        .map(o => ({ ...o, id: uuidv4() })),
    rowOptions: {},
    isLoading: false,
    disabled: false,
    tableContainerProps: {},
    hover: false,
    addPagination: false,
    headersOptions: {},
    search: false,
    emptyView: null,
    searchOptions: {},
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
    search: PropTypes.bool,
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
    onChangeRowsPerPage: PropTypes.func
};

export default HTable;