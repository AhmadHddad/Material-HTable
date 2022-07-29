import {
    CheckboxProps,
    IconButtonProps,
    SvgIconProps,
    TableCellProps,
    TableRowProps
} from "@mui/material";
import {IColor, IHComponents, HTableId} from "components/HTable";
import {MouseEventHandler} from "react";

export type IHTableCollapseRow = {
    component: JSX.Element;
    rowProps: TableRowProps | (({row, isRowSelected}: {row: IHTableRow; isRowSelected: boolean}) => TableCellProps);
    cellProps:
        | TableCellProps
        | ((row: IHTableRow) => TableCellProps);
};

export type IHTableRow = {
    id: HTableId;
    cells: IRowCell[];
    props?: TableRowProps | ((thisRow: IHTableRow) => TableRowProps);
    collapseRow?: IHTableCollapseRow;
};

export type ICollapseOptions = {
    collapseDefaultState: boolean;
    onOpen?: MouseEventHandler | undefined;
    isOpen?: boolean;
    collapseBtnProps?: IconButtonProps | ((row: IHTableRow) => IconButtonProps);
    arrowDownKeysProps?: SvgIconProps;
    arrowUpKeysProps?:
        | SvgIconProps
        | (({row, isCollapseOpen}: {row: IHTableRow; isCollapseOpen: boolean}) => SvgIconProps);
    collapseBtnTableCellProps?: TableCellProps | ((row: IHTableRow) => TableCellProps);
};

export type ISelectionOptions = {
    checkboxProps?: CheckboxProps | ((row: IHTableRow) => CheckboxProps);
    checkboxTableCellProps?: TableCellProps | ((row: IHTableRow) => TableCellProps);
};

export interface HTableRowProps {
    row: IHTableRow;
    isRowSelected?: boolean;
    onRowClicked?: (event: MouseEventHandler | undefined, row: IHTableRow) => void;
    components: IHComponents;
    color?: IColor;
    selectable?: boolean;
    index: HTableId;
    collapseOptions?: ICollapseOptions | ((thisRow: IHTableRow) => ICollapseOptions);
    selectOptoins?: ISelectionOptions;
}

export type IRowCell = {
    id: HTableId;
    component: JSX.Element;
    props?:
        | TableCellProps
        | (({row, cell}: {row: IHTableRow; cell: IRowCell}) => TableCellProps)
};

export declare const HTableRow: (props: HTableRowProps) => JSX.Element;
