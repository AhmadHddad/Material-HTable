import {
  CheckboxProps,
  IconButtonProps,
  SvgIconProps,
  TableCellProps,
  TableRowProps,
} from '@mui/material';
import { IColor, IHComponents, HTableId } from '../HTable';

export type IHTableCollapseRow = {
  component:  any;
  rowProps:
    | TableRowProps
    | (({
        row,
        isRowSelected,
      }: {
        row: IHTableRow;
        isRowSelected: boolean;
      }) => TableCellProps);
  cellProps: TableCellProps | ((row: IHTableRow) => TableCellProps);
};

export type IHTableRow = {
  id: HTableId;
  cells: IRowCell[] | JSX.Element[];
  props?: TableRowProps | ((thisRow: IHTableRow) => TableRowProps);
  collapseRow?: IHTableCollapseRow | JSX.Element;
};

export type ICollapseOptions = {
  collapseDefaultState?: boolean;
  onOpen?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, id: HTableId, row: IHTableRow) => void;
  isOpen?: ((id: HTableId) => boolean) | boolean;
  collapseBtnProps?: IconButtonProps | ((row: IHTableRow) => IconButtonProps);
  closeCollapsedRowWhenOtherOpen?: boolean;
  arrowDownKeysProps?: SvgIconProps;
  defaultCollapsedRowId?: HTableId;
  arrowUpKeysProps?:
    | SvgIconProps
    | (({
        row,
        isCollapseOpen,
      }: {
        row: IHTableRow;
        isCollapseOpen: boolean;
      }) => SvgIconProps);
  collapseBtnTableCellProps?:
    | TableCellProps
    | ((row: IHTableRow) => TableCellProps);
};

export type ISelectionOptions = {
  checkboxProps?: CheckboxProps | ((row: IHTableRow) => CheckboxProps);
  checkboxTableCellProps?:
    | TableCellProps
    | ((row: IHTableRow) => TableCellProps);
};

export interface HTableRowProps {
  row: IHTableRow;
  isRowSelected?: boolean;
  onRowClicked?: (event: React.MouseEvent, row: IHTableRow) => void;
  components: IHComponents;
  color?: IColor;
  selectable?: boolean;
  isCollapsed?: boolean;
  index: HTableId;
  collapseOptions?:
    | ICollapseOptions
    | ((thisRow: IHTableRow) => ICollapseOptions);
  selectOptoins?: ISelectionOptions;
}

export type IRowCell = {
  id: HTableId;
  component: JSX.Element | any;
  props?:
    | TableCellProps
    | (({ row, cell }: { row: IHTableRow; cell: IRowCell }) => TableCellProps);
};

export * from './HTableRow';
export { default } from './HTableRow';
