import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Checkbox, Collapse, IconButton, TableCell, TableRow } from '@mui/material';
import * as React from 'react';
import { conditionalReturn, isNullOrUndefined, returnObjFromFunc, toObject, uuidv4 } from "../../utils";

export default function HTableRow({ row, onRowClicked, selectable, index, collapseOptions, selectOptoins, isRowSelected }) {

    const { collapseDefaultState, openedIcon, closedIcon, onOpen, isOpen, collapseBtnProps, arrowKeysProps, collapseBtnTableCellProps } = toObject(collapseOptions)
    const { checkboxProps, checkboxTableCellProps } = toObject(selectOptoins);
    const { id, cells, collapseRow } = toObject(row)
    const [open, setOpen] = React.useState(!!collapseDefaultState);

    const CollapseOpendIcon = openedIcon || <KeyboardArrowUpIcon {...toObject(arrowKeysProps)} />
    const CollapseClosedIcon = closedIcon || <KeyboardArrowDownIcon {...toObject(arrowKeysProps)} />

    function onCollapseOpen(e) {
        e.stopPropagation();
        onOpen ? onOpen(e, id, row) : setOpen(!open)
    }

    const isCollapseOpen = Boolean(isOpen | open)
    const labelId = `enhanced-table-checkbox-${index}`;

    const collapsable = !isNullOrUndefined(collapseRow)

    return (
        <React.Fragment>
            <TableRow
                aria-checked={isRowSelected}
                tabIndex={-1}
                key={id}
                id={id}
                selected={isRowSelected}
                onClick={(event) => onRowClicked(event, row)}>
                {conditionalReturn(selectable,
                    <TableCell padding="checkbox" {...returnObjFromFunc(checkboxTableCellProps, row)}>
                        <Checkbox
                            color="primary"
                            checked={isRowSelected}
                            inputProps={{
                                'aria-labelledby': labelId,
                            }}
                            {...returnObjFromFunc(checkboxProps, row)}
                        />
                    </TableCell>)}
                {cells?.map((cell, i) => (
                    <TableCell
                        key={cell.id || i}
                        component="th"
                        scope="row"
                        {...returnObjFromFunc(cell?.props, row, cell)}>
                        {cell?.component}
                    </TableCell>
                ))}
                {conditionalReturn(collapsable,
                    <TableCell padding="none" {...returnObjFromFunc(collapseBtnTableCellProps, row)}>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={onCollapseOpen}
                            {...returnObjFromFunc(collapseBtnProps, row)}
                        >
                            {isCollapseOpen ? CollapseOpendIcon : CollapseClosedIcon}
                        </IconButton>
                    </TableCell>)}
            </TableRow>
            {conditionalReturn(collapsable, <TableRow  {...(returnObjFromFunc(collapseRow?.rowPorps, row))}>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} {...returnObjFromFunc(collapseRow?.cellProps, row)}>
                    <Collapse in={isCollapseOpen} timeout="auto" unmountOnExit>
                        {collapseRow?.component}
                    </Collapse>
                </TableCell>
            </TableRow>)}
        </React.Fragment>
    );
}