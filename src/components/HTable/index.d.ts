import {
    GridProps,
    SelectProps,
    TableBodyProps,
    TableContainerProps,
    TableHeadProps,
    TableProps,
    TableRowProps,
    TextFieldProps
} from "@mui/material";
import {SwitchBaseProps} from "@mui/material/internal/SwitchBase";
import {ClassNameMap} from "@mui/styles";
import {IHTableHeadCell, ISelectAllOptions} from "components/HTableHead";
import {ICollapseOptions, IHTableRow} from "components/HTableRow";
import { MouseEventHandler } from "react";
import {allComponents} from "./HTable";

export type HTableId = string | number;
export type IColor =
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning"
    | "default"
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
    totalItems: number;
    pageNumber: number;
    onRowsPerPageChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    rowsPerPage: number;
    rowsPerPageOptions?: Array<number | {value: number; label: string}>;
    classes?: Partial<ClassNameMap<string>>;
    component?: JSX.Element;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement> | null,
        page: number,
        searchText: string
    ) => void;
};

export interface HTableProps {
    heads: IHTableHeadCell[];
    emptyViewText: string;
    selectOptoins?: {defaultSelectedIds?: HTableId[]};
    tableBodyprops: TableBodyProps;
    sortable: boolean;
    collapseOptions: ICollapseOptions;
    tableProps: TableProps;
    color: IColor;
    onSort?: (headCellId: HTableId) => void;
    orderBy?: HTableId;
    order?: "asc" | "desc";
    onSelectAllClick?: SwitchBaseProps["onChange"];
    onRowSelected?: (event: MouseEventHandler | undefined, row: IHTableRow) => void;
    selectable?: boolean;
    rows: IHTableRow[];
    isLoading?: boolean;
    disabled?: boolean;
    tableContainerProps?: TableContainerProps;
    isPaginate?: boolean;
    searchable?: boolean;
    emptyView?: JSX.Element;
    loadingView?: JSX.Element;
    searchOptions?: IHTableSearchOptions;
    paginationOptions?: IHTablePaginationOpetions;
    headOptions?: {
        headRowProps?: TableRowProps;
        selectAllOptions?: ISelectAllOptions;
        headProps?: TableHeadProps;
    };
}

declare const HTable: (props: HTableProps) => JSX.Element;

export default HTable;
