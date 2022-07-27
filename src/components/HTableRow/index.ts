import {TableCellBaseProps, TableRowProps} from "@mui/material";
import {HTableId} from "components/HTable";
import {MouseEventHandler} from "react";

export type ICollapseOptios = {
    collapseDefaultState: boolean;
    openedIcon: JSX.Element;
    closedIcon: JSX.Element;
    onOpen: (e: MouseEventHandler | undefined, id: HTableId, row: ITableRow) => void;
    isOpen: boolean;
};

export type IHTableCollapseRow = IRowCell & {options: ICollapseOptios};

export type ITableRow = {
    id: HTableId;
    cells: IRowCell[];
    props?: TableRowProps;
    collapseRow?: IHTableCollapseRow;
    selectable?: boolean;
};

export interface HTableRowProps {
    row: ITableRow;
    isRowSelected?: boolean;
    onRowClicked?: (event: MouseEventHandler | undefined, row: ITableRow) => void;
}

export type IRowCell = {id: HTableId; component: JSX.Element; props: TableCellBaseProps};

export declare const HTableRow: (props: HTableRowProps) => JSX.Element;
