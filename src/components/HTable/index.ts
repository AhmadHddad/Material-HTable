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
import { IHTableHeadCell, ISelectAllOptions } from '../HTableHead';
import { ICollapseOptions, IHTableRow, ISelectionOptions } from '../HTableRow';
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
export type IHComponents = typeof allComponents;

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
  components?: IHComponents;
  emptyViewText?: string;
  selectOptoins?: { defaultSelectedIds?: HTableId[] } & ISelectionOptions;
  tableBodyprops?: TableBodyProps;
  sortable?: boolean;
  collapseOptions?: ICollapseOptions;
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
  isPaginate?: boolean;
  searchable?: boolean;
  emptyView?: JSX.Element | any;
  loadingView?: JSX.Element | any;
  searchOptions?: IHTableSearchOptions;
  paginationOptions?: IHTablePaginationOpetions;
  headOptions?: {
    headRowProps?: TableRowProps;
    selectAllOptions?: ISelectAllOptions;
    headProps?: TableHeadProps;
  };
}

export * from './HTable';
export { default } from './HTable';
