import {
  CheckboxProps,
  TableCellProps,
  TableHeadProps,
  TableRowProps,
  TableSortLabelProps,
} from '@mui/material';
import { IColor, IHTableComponents, HTableId } from '../HTable';

export type IHTableHeadCell = {
  id: HTableId;
  component: JSX.Element | any;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  sortLabelProps?:
    | ((thisCell: IHTableHeadCell) => TableSortLabelProps)
    | TableSortLabelProps;
  props?: ((thisCell: IHTableHeadCell) => TableCellProps) | TableCellProps;
  sortable?: ((thisCell: IHTableHeadCell) => boolean) | boolean;
};

export type IHtableSelectAllOptions = {
  selectAllCheckboxProps?: CheckboxProps;
  selectAllCellProps?: TableCellProps;
};

export type HTableHeadProps = {
  components: IHTableComponents;
  color?: IColor;
  heads: IHTableHeadCell[];
  numSelected?: number;
  headProps?: TableHeadProps;
  headRowProps?: TableRowProps;
  rowCount?: number;
  selectAllOptions?: IHtableSelectAllOptions;
  onSelectAllClick?: (
    event: React.ChangeEvent<HTMLInputElement>,
    checked: boolean
  ) => void;
  sortable?: boolean;
  onSort?: (headCellId: HTableId) => void;
  orderBy?: HTableId;
  order?: 'asc' | 'desc';
  selectable?: boolean;
};

export * from './HTableHead';
export { default } from './HTableHead';
