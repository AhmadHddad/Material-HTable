import {
  GridProps,
  SelectProps,
  TableCellProps,
  TableContainerProps,
  TextFieldProps,
} from "@mui/material";
import { ClassNameMap } from "@mui/styles";
import { IHTableHeadCell, IHtableHeadOptoins } from "components/HTableHead";
import { ITableRow } from "components/HTableRow";

export type HTableId = string | number;

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



export declare const HTableHead: (props: HTableProps) => JSX.Element;
declare const HTable: (props: HTableProps) => JSX.Element;

export default HTable;
