import {
  GridProps,
  TableBodyProps,
  TableContainerProps,
  TableHeadProps,
  TablePaginationBaseProps,
  TableProps,
  TableRowProps,
  TextFieldProps,
} from '@mui/material';
import { ClassNameMap } from '@mui/styles';
import { IHTableHeadCell, IHtableSelectAllOptions as IHTableSelectAllOptions } from '../HTableHead';
import {
  IHTableCollapseOptions,
  IHTableRow,
  IHTableRowOptions,
  IHTableSelectionOptions,
} from '../HTableRow';
import React from 'react';
import { allComponents } from './HTable';

export type HTableId = string | number;
export type IColor =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning'
  | 'default'
  | string;
export type IHTableComponents = typeof allComponents;

export type IHTableSearchOptions = {
  defaultSearchText?: string;
  searchInputProps?: TextFieldProps;
  searchInputContainerProps?: GridProps;
  onClearSearch?: () => void;
  onSearchClick?: (searchText: string) => void;
};

export type IHTablePaginationOpetions = {
  totalItems?: number;
  pageNumber?: number;
  onRowsPerPageChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    searchText: string
  ) => void;
  rowsPerPage?: number;
  rowsPerPageOptions?: Array<number | { value: number; label: string }>;
  classes?: Partial<ClassNameMap<string>>;
  paginationProps?: TablePaginationBaseProps;
  component?: JSX.Element | any;
  onPageChange?: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number,
    searchText: string
  ) => void;
};

export interface HTableProps {
  heads: IHTableHeadCell[];
  components?: IHTableComponents;
  emptyViewText?: string;
  dense?:boolean;
  rowOptions?:IHTableRowOptions;
  selectOptoins?: { defaultSelectedIds?: HTableId[] } & IHTableSelectionOptions;
  tableBodyprops?: TableBodyProps;
  sortable?: boolean;
  collapseOptions?: IHTableCollapseOptions;
  tableProps?: TableProps;
  color?: IColor;
  onSort?: (headCellId: HTableId) => void;
  orderBy?: HTableId;
  order?: 'asc' | 'desc';
  onSelectAllClick?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    selectedIds: HTableId[]
  ) => void;
  onRowSelected?: (event: React.MouseEvent, selectedRowIds: HTableId[]) => void;
  selectable?: boolean;
  rows: IHTableRow[];
  isLoading?: boolean;
  disabled?: boolean;
  tableContainerProps?: TableContainerProps & { component: JSX.Element | any };
  pagination?: boolean;
  searchable?: boolean;
  emptyView?: JSX.Element | any;
  loadingView?: JSX.Element | any;
  searchOptions?: IHTableSearchOptions;
  paginationOptions?: IHTablePaginationOpetions;
  headOptions?: {
    headRowProps?: TableRowProps;
    selectAllOptions?: IHTableSelectAllOptions;
    headProps?: TableHeadProps;
  };
}

export * from './HTable';
export * as HTableEmptyView from '../HTableEmptyView';
export * as HTableHead from '../HTableHead';
export * as HTableLoadingView from '../HTableLoadingView';
export * as HTableRow from '../HTableRow';
export * as HTableSearchBar from '../HTableSearchBar';
export { default } from './HTable';
