import { IconButton, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { HTableRowProps, IHTableCollapseOptions, IHTableRowCell } from '.';
import {
  callFuncOrReturn,
  conditionalReturn,
  isNullOrUndefined,
  returnObjFromFunc,
  toObject,
} from '../../utils';
import { IHTableComponents } from '../HTable';

const useStyle = makeStyles((_: Theme) => ({
  collapseRow: {
    padding: '0 !important',
  },
}));

export default function HTableRow({
  components,
  color,
  row,
  onRowClicked,
  selectable,
  index,
  rowOptions,
  isCollapsed,
  collapseOptions,
  dense,
  selectOptoins,
  isRowSelected,
}: HTableRowProps) {
  const classes = useStyle();
  const {
    Checkbox,
    Collapse,
    TableCell,
    TableRow,
    KeyboardArrowUpIcon,
    KeyboardArrowDownIcon,
  } = components as IHTableComponents;
  const {
    collapseDefaultState,
    onOpen,
    isOpen,
    collapseBtnProps,
    arrowDownKeysProps,
    arrowUpKeysProps,
    collapseBtnTableCellProps,
  } = returnObjFromFunc(collapseOptions, row) as IHTableCollapseOptions;

  const { checkboxProps, checkboxTableCellProps } = toObject(selectOptoins);
  const { id, cells, collapseRow, props } = toObject(row);
  const [open, setOpen] = React.useState(!!collapseDefaultState);

  function onCollapseOpen(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    e.stopPropagation();
    onOpen ? onOpen(e, id, row) : setOpen(!open);
  }

  const isCollapseOpen = Boolean(
    callFuncOrReturn(isOpen) || isCollapsed || open
  );
  const labelId = `enhanced-table-checkbox-${index}`;

  const collapsable = !isNullOrUndefined(collapseRow);
  const collapseComponent = collapseRow?.component || collapseRow;
  return (
    <React.Fragment>
      <TableRow
        aria-checked={isRowSelected}
        tabIndex={-1}
        sx={{ '& > *': { borderBottom: 'unset' } }}
        key={id}
        id={id}
        selected={isRowSelected}
        onClick={(event: any) => onRowClicked?.(event, row)}
        {...returnObjFromFunc(rowOptions?.rowProps, row)}
        {...returnObjFromFunc(props, row)}
      >
        {conditionalReturn(
          Boolean(selectable),
          <TableCell
            padding={dense ? 'none' : selectable ? 'checkbox' : 'normal'}
            {...returnObjFromFunc(checkboxTableCellProps, row)}
          >
            <Checkbox
              color={color}
              checked={isRowSelected}
              inputProps={{
                'aria-labelledby': labelId,
              }}
              {...returnObjFromFunc(checkboxProps, row)}
            />
          </TableCell>
        )}
        {cells?.map((cell: IHTableRowCell, i: number) => {
          const component = cell?.component || cell;
          return (
            <TableCell
              key={cell?.id || i}
              component="th"
              scope="row"
              padding={dense ? 'none' : selectable ? 'checkbox' : 'normal'}
              {...returnObjFromFunc(rowOptions?.cellProps, { row, cell })}
              {...returnObjFromFunc(cell?.props, { row, cell })}
            >
              {component}
            </TableCell>
          );
        })}
        {conditionalReturn(
          collapsable,
          <TableCell
          padding={dense ? 'none' : selectable ? 'checkbox' : 'normal'}
          {...returnObjFromFunc(collapseBtnTableCellProps, row)}
          >
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={onCollapseOpen}
              {...returnObjFromFunc(collapseBtnProps, row)}
            >
              {isCollapseOpen ? (
                <KeyboardArrowUpIcon
                  {...returnObjFromFunc(arrowUpKeysProps, {
                    row,
                    isCollapseOpen,
                  })}
                />
              ) : (
                <KeyboardArrowDownIcon
                  {...returnObjFromFunc(arrowDownKeysProps, {
                    row,
                    isCollapseOpen,
                  })}
                />
              )}
            </IconButton>
          </TableCell>
        )}
      </TableRow>
      {conditionalReturn(
        collapsable,
        <TableRow
          sx={{ '& > *': { borderBottom: 'unset' } }}
          selected={isRowSelected}
          {...returnObjFromFunc(collapseRow?.rowProps, { row, isRowSelected })}
        >
          <TableCell
            className={classes.collapseRow}
            colSpan={6}
            {...returnObjFromFunc(collapseRow?.cellProps, row)}
          >
            <Collapse in={isCollapseOpen} timeout="auto" unmountOnExit>
              {collapseComponent}
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </React.Fragment>
  );
}
