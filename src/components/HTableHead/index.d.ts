import {
    CheckboxProps,
    TableCellProps,
    TableHeadProps,
    TableRowProps,
    TableSortLabelProps
} from "@mui/material";
import {SwitchBaseProps} from "@mui/material/internal/SwitchBase";
import {IColor, IHComponents, HTableId} from "components/HTable";

export type IHTableHeadCell = {
    id: HTableId;
    component: JSX.Element;
    align?: "inherit" | "left" | "center" | "right" | "justify";
    sortLabelProps?: (thisCell: IHTableHeadCell) => TableSortLabelProps | TableSortLabelProps;
    props?: (thisCell: IHTableHeadCell) => TableCellProps | TableCellProps;
};

export type ISelectAllOptions = {
    selectAllCheckboxProps?: CheckboxProps;
    selectAllCellProps?: TableCellProps;
};

export type HTableHeadProps = {
    components: IHComponents;
    color?: IColor;
    heads: IHTableHeadCell[];
    numSelected?: number;
    headProps?: TableHeadProps;
    headRowProps?: TableRowProps;
    rowCount?: number;
    selectAllOptions?: ISelectAllOptions;
    onSelectAllClick?: SwitchBaseProps["onChange"];
    sortable?: boolean;
    onSort?: (headCellId: HTableId) => void;
    orderBy?: HTableId;
    order?: "asc" | "desc";
    selectable?: boolean;
};

 declare const HTableHead: (props: HTableHeadProps) => JSX.Element;

 export default HTableHead
