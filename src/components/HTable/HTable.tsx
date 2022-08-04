import * as React from 'react';
import 'react-app-polyfill/ie11';
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
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import PropTypes from 'prop-types';
import {
  conditionalReturn,
  returnObjFromFunc,
  toArray,
  toObject,
  isNullOrUndefined,
  classNames,
} from '../../utils';
import THead from '../HTableHead';
import HTEmptyView from '../HTableEmptyView';
import HTLoadingView from '../HTableLoadingView';
import TRow from '../HTableRow';
import SBar from '../SearchBar';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import useHTableStyle from './hTableStyle';

export const allComponents = {
  Table: MTalbe,
  Card: MCard,
  TableContainer: MTableContainer,
  TablePagination: MTablePagination,
  TableBody: MTableBody,
  TextField: MTextField,
  IconButton: MIconButton,
  TableRow: MTableRow,
  KeyboardArrowUpIcon: KeyboardArrowUp,
  HTableHead: THead,
  HTableRow: TRow,
  HTableEmptyView: HTEmptyView,
  KeyboardArrowDownIcon: KeyboardArrowDown,
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
  onRowSelected,
}: any) {
  const props = arguments[0];
  const classes = useHTableStyle(props);

  const { defaultSelectedIds } = toObject(selectOptoins);
  const { defaultSearchText } = toObject(searchOptions);
  const components = Object.assign(allComponents, props.components);
  const {
    Card,
    SearchBar,
    HTableHead,
    HTableEmptyView,
    HTableLoadingView,
    HTableRow,
    TableContainer,
    Table,
    TableBody,
    TablePagination,
  } = components;

  const {
    rowsPerPageOptions,
    totalItems,
    rowsPerPage,
    pageNumber,
    onRowsPerPageChange,
    onPageChange,
    component: paginationComponent,
    paginationProps,
  } = toObject(paginationOptions);

  let updatedCollapseOptions = toObject(collapseOptions);

  const [searchText, setSearchTextValue] = React.useState(
    defaultSearchText || ''
  );
  const [selected, setSelected] = React.useState(toArray(defaultSelectedIds));
  const [collapsapedRowId, setCollapsedRowId] = React.useState(
    updatedCollapseOptions.defaultCollapsedRowId
  );

  const totalCount = totalItems ?? rows?.length ?? 0;

  const handleSelectAllClick = (event: any) => {
    let updatedSelected = [];

    if (event.target.checked) {
      updatedSelected = rows.map((n: any) => n.id);
    }

    setSelected(updatedSelected);
    onSelectAllClick?.(event, updatedSelected);
  };

  const handleClick = (event: any, row: any) => {
    if (!selectable) return;
    const rowId = row.id;
    const selectedIndex = selected.indexOf(rowId);
    let newSelected: any = [];

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
    onRowSelected?.(event, newSelected);
  };

  const searchBar = conditionalReturn(
    searchable,
    <SearchBar
      components={components}
      searchOptions={setSearchTextValue}
      searchText={searchText}
      setSearchTextValue={setSearchTextValue}
    />
  );

  const renderLoaderOrEmptyView = () => {
    const LoaderView = loadingView || (
      <HTableLoadingView components={components} />
    );
    const EmptyView = emptyView || (
      <HTableEmptyView components={components} emptyViewText={emptyViewText} />
    );
    return (
      <>
        {searchBar}
        {isLoading ? LoaderView : EmptyView}
      </>
    );
  };

  const isSelected = (id: any) => selected.indexOf(id) !== -1;

  function onRef(ref: any) {
    disabled &&
      ref &&
      ref.addEventListener('keydown', (event: any) => {
        event.preventDefault();
      });
  }

  const hasCollapseRow = rows?.some(
    (r: any) => !isNullOrUndefined(r.collapseRow)
  );
  const allHeads =
    (hasCollapseRow
      ? heads?.concat?.({
          id: '-1',
          component: '',
        })
      : heads) || [];

  const isOpen = React.useCallback((rowId: any) => rowId === collapsapedRowId, [
    collapsapedRowId,
  ]);

  if (updatedCollapseOptions.closeCollapsedRowWhenOtherOpen) {
    updatedCollapseOptions = {
      ...updatedCollapseOptions,
      ...{
        isOpen,
        onOpen: (_: any, id: any) => {
          setCollapsedRowId(id);
        },
      },
    };
  }

  return (
    <TableContainer
      ref={onRef}
      component={Card}
      {...returnObjFromFunc(tableContainerProps)}
      className={classNames(
        { [classes.disabled]: disabled },
        classes.tableContainer,
        tableContainerProps?.className
      )}
    >
      {isLoading || !rows?.length ? (
        renderLoaderOrEmptyView()
      ) : (
        <>
          {searchBar}
          <Table {...toObject(tableProps)}>
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
              {rows.map((row: any, index: any) => {
                const isRowSelected = isSelected(row.id);
                return (
                  <HTableRow
                    components={components}
                    selectOptoins={selectOptoins}
                    collapseOptions={updatedCollapseOptions}
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
        </>
      )}
      {isPaginate && (
        <TablePagination
          component={paginationComponent || 'div'}
          rowsPerPageOptions={rowsPerPageOptions}
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={pageNumber}
          onPageChange={(...args: any) => onPageChange(...args, searchText)}
          onRowsPerPageChange={(...args: any) =>
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
      align: 'left',
      props: {},
      sortLabelProps: {},
      component: 'Heading 1',
    },
    {
      id: 2,
      component: 'Heading2',
    },
  ],
  rows: [
    {
      id: 1,
      cells: [
        { id: 'cellId1', component: 'Row#1Cell1', props: {} },
        { id: 'cellId2', component: 'Row#1Cell2', props: {} },
      ],
      props: {},
      collapseRow: {
        component: <div>Collapse Row</div>,
        rowPorps: {},
        cellProps: {},
      },
    },
  ],
};

HTable.propTypes = {
  heads: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      align: PropTypes.oneOf(['inherit', 'left', 'center', 'right', 'justify']),
      props: PropTypes.object,
      sortLabelProps: PropTypes.object,
      component: PropTypes.any,
    })
  ),
  emptyViewText: PropTypes.string,
  selectOptoins: PropTypes.shape({
    defaultSelectedIds: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),
  }),
  tableBodyprops: PropTypes.object,
  sortable: PropTypes.bool,
  collapseOptions: PropTypes.shape({
    collapseDefaultState: PropTypes.bool,
    onOpen: PropTypes.func,
    closeCollapsedRowWhenOtherOpen: PropTypes.bool,
    isOpen: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
    defaultCollapsedRowId: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    collapseBtnProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    arrowDownKeysProps: PropTypes.object,
    arrowUpKeysProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  }),
  tableProps: PropTypes.object,
  color: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.oneOf([
      'primary',
      'secondary',
      'error',
      'info',
      'success',
      'warning',
      'default',
    ]),
  ]),
  orderBy: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  order: PropTypes.oneOf(['asc', 'desc']),
  onSelectAllClick: PropTypes.func,
  onSort: PropTypes.func,
  selectable: PropTypes.bool,
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      cells: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          component: PropTypes.any,
          props: PropTypes.object,
        })
      ),
      props: PropTypes.object,
      collapseRow: PropTypes.shape({
        component: PropTypes.any,
        rowPorps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        cellProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      }),
    })
  ),
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
  searchOptions: PropTypes.objectOf(
    PropTypes.shape({
      defaultSearchText: PropTypes.string,
      searchInputProps: PropTypes.object,
      searchInputContainerProps: PropTypes.object,
      onClearSearch: PropTypes.func,
      onSearchClick: PropTypes.func,
    })
  ),
  paginationOptions: PropTypes.objectOf(
    PropTypes.shape({
      totalItems: PropTypes.number,
      pageNumber: PropTypes.number,
      onRowsPerPageChange: PropTypes.func,
      rowsPerPage: PropTypes.number,
      rowsPerPageOptions: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.number),
        PropTypes.arrayOf(
          PropTypes.objectOf(
            PropTypes.shape({
              value: PropTypes.number,
              label: PropTypes.string,
            })
          )
        ),
      ]),
      classes: PropTypes.object,
      component: PropTypes.any,
      onPageChange: PropTypes.func,
    })
  ),
  headOptions: PropTypes.shape({
    headRowProps: PropTypes.object,
    selectAllOptions: PropTypes.shape({
      selectAllCheckboxProps: PropTypes.object,
      selectAllCellProps: PropTypes.object,
    }),
    headProps: PropTypes.object,
  }),
};

export default HTable;
