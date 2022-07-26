import { TableRowProps } from "@material-ui/core/TableRow/TableRow";
import {
  GridProps,
  SelectProps,
  TableCellBaseProps,
  TableCellProps,
  TableContainerProps,
  TextFieldProps,
} from "@mui/material";
import { ClassNameMap } from "@mui/styles";
import { MouseEventHandler } from "react";

export type HTableId = string | number;

export type IRowCell = { id: HTableId; component: JSX.Element; props: TableCellBaseProps };

export type ICollapseOptios = {
  collapseDefaultState: boolean;
  openedIcon: JSX.Element;
  closedIcon: JSX.Element;
  onOpen: (e: MouseEventHandler | undefined, id: HTableId, row: ITableRow) => void;
  isOpen: boolean;
};

export type IHTableCollapseRow = IRowCell & { options: ICollapseOptios };

export type IHTableHeadCell = {
  id: HTableId;
  numeric?: boolean;
  disablePadding?: boolean;
  label: string;
};

export type IHTableSearchOptions = {
  defaultSearchText?: string;
  searchInputProps?: TextFieldProps;
  searchInputContainerProps?: GridProps;
  onClearSearch?: () => void;
  onSearchClick?: (searchText: string) => void;
};

export type IHTablePaginationOpetions = {
  totalItems: number;
  pageNumber: number;
  onChangeRowsPerPage?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onRowsPerPageChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  rowsPerPage: number;
  rowsPerPageOptions?: Array<number | { value: number; label: string }>;
  classes?: Partial<ClassNameMap<string>>;
  SelectProps?: Partial<SelectProps>;
  onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number, searchText: string) => void;
};

export type IHtableHeadOptoins = {
  headCellProps: TableCellProps;
};

export interface HTableProps {
  heads: IHTableHeadCell[];
  selectable?: boolean;
  rows: ITableRow[];
  rowOptions?: {};
  isLoading?: boolean;
  disabled?: boolean;
  tableContainerProps?: TableContainerProps;
  addPagination?: boolean;
  headersOptions?: IHtableHeadOptoins;
  searchable?: boolean;
  emptyView?: JSX.Element;
  searchOptions?: IHTableSearchOptions;
  paginationOptions?: IHTablePaginationOpetions;
}

export interface HTableRowProps {
  row: ITableRow;
  isRowSelected?: boolean;
  onRowClicked?: (event: MouseEventHandler | undefined, row: ITableRow) => void;
}

export type ITableRow = {
  id: HTableId;
  cells: IRowCell[];
  props?: TableRowProps;
  collapseRow?: IHTableCollapseRow;
  selectable?: boolean;
};

export declare const HTableHead: (props: HTableProps) => JSX.Element;
export declare const HTableRow: (props: HTableRowProps) => JSX.Element;
declare const HTable: (props: HTableProps) => JSX.Element;

export default HTable;
