import * as React from 'react';
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
import {
  conditionalReturn,
  toArray,
  toObject,
  isNullOrUndefined,
  classNames,
} from '../../utils';
import THead from '../HTableHead';
import HTEmptyView from '../HTableEmptyView';
import HTLoadingView from '../HTableLoadingView';
import TRow, { IHTableRow } from '../HTableRow';
import SBar from '../SearchBar';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import './styles.module.css';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import useHTableStyle from './hTableStyle';
import {
  HTableId as IHTableId,
  HTableProps,
  IHComponents,
  IHTablePaginationOpetions,
} from '.';

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
} as const;

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
}: HTableProps) {
  const props = arguments[0] as HTableProps;
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
  } = components as IHComponents;

  const {
    rowsPerPageOptions,
    totalItems,
    rowsPerPage,
    pageNumber,
    onRowsPerPageChange,
    onPageChange,
    component: paginationComponent,
    paginationProps,
  } = toObject(paginationOptions) as IHTablePaginationOpetions;

  let updatedCollapseOptions = toObject(collapseOptions);

  const [searchText, setSearchTextValue] = React.useState<string>(
    defaultSearchText || ''
  );
  const [selected, setSelected] = React.useState<IHTableId[]>(
    toArray(defaultSelectedIds)
  );
  const [collapsapedRowId, setCollapsedRowId] = React.useState<IHTableId>(
    updatedCollapseOptions.defaultCollapsedRowId
  );

  const totalCount = totalItems ?? rows?.length ?? 0;

  const handleSelectAllClick = (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => {
    let updatedSelected: IHTableId[] = [];

    if (event.target.checked) {
      updatedSelected = rows.map((n: IHTableRow) => n.id);
    }

    setSelected(updatedSelected);
    onSelectAllClick?.(event, checked, updatedSelected);
  };

  const handleClick = (
    event: React.MouseEvent<Element, MouseEvent>,
    row: IHTableRow
  ) => {
    if (!selectable) return;

    const rowId = row.id;
    const selectedIndex = selected.indexOf(rowId);
    let newSelected: IHTableId[] = [];

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
    Boolean(searchable),
    <SearchBar
      components={components}
      searchOptions={searchOptions}
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

  const isSelected = (id: IHTableId) => selected.indexOf(id) !== -1;

  function onRef(ref: HTMLElement | null) {
    disabled &&
      ref &&
      ref.addEventListener('keydown', event => {
        event.preventDefault();
      });
  }

  const hasCollapseRow = rows?.some(
    (r: IHTableRow) => !isNullOrUndefined(r.collapseRow)
  );
  const allHeads =
    (hasCollapseRow
      ? heads?.concat?.({
          id: '-1',
          component: <div />,
        })
      : heads) || [];

  if (updatedCollapseOptions.closeCollapsedRowWhenOtherOpen) {
    updatedCollapseOptions = {
      ...updatedCollapseOptions,
      ...{
        onOpen: (_: any, id: IHTableId) => {
          setCollapsedRowId(prevId => (prevId === id ? '' : id));
        },
      },
    };
  }

  return (
    <TableContainer
      ref={onRef}
      component={Card}
      {...toObject(tableContainerProps)}
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
              {rows.map((row: IHTableRow, index: number) => {
                const isRowSelected = isSelected(row.id);
                return (
                  <HTableRow
                    components={components}
                    selectOptoins={selectOptoins}
                    isCollapsed={row.id === collapsapedRowId}
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
          onPageChange={(
            event: React.MouseEvent<HTMLButtonElement> | null,
            page: number
          ) => onPageChange?.(event, page, searchText)}
          onRowsPerPageChange={(
            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
          ) => onRowsPerPageChange?.(e, searchText)}
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
      id: 11,
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
    {
      id: 22,
      cells: [
        { id: 'cellId3', component: 'Row#2Cell1', props: {} },
        { id: 'cellId4', component: 'Row#2Cell2', props: {} },
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

export default HTable;
