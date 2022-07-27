import { TableCellProps } from "@mui/material";
import { HTableId } from "components/HTable";

export type IHTableHeadCell = {
    id: HTableId;
    numeric?: boolean;
    disablePadding?: boolean;
    label: string;
  };
  
  export type IHtableHeadOptoins = {
    headCellProps: TableCellProps;
  };
  