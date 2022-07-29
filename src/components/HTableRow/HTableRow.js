
import { IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { conditionalReturn, isNullOrUndefined, returnObjFromFunc, toObject } from "../../utils";

const useStyle = makeStyles(theme => ({
    collapseRow: {
        paddingBottom: "0 !important"
        , paddingTop: "0 !important"
    }
}));

export default function HTableRow({ components, color, row, onRowClicked, selectable, index, collapseOptions, selectOptoins, isRowSelected }) {
    const classes = useStyle()
    const { Checkbox, Collapse, TableCell, TableRow, KeyboardArrowUpIcon, KeyboardArrowDownIcon } = components;
    const { collapseDefaultState, onOpen, isOpen, collapseBtnProps, arrowDownKeysProps, arrowUpKeysProps, collapseBtnTableCellProps } = returnObjFromFunc(collapseOptions, row)
    const { checkboxProps, checkboxTableCellProps } = toObject(selectOptoins);
    const { id, cells, collapseRow, props } = toObject(row)
    const [open, setOpen] = React.useState(!!collapseDefaultState);

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
                sx={{ '& > *': { borderBottom: 'unset' } }}
                key={id}
                id={id}
                selected={isRowSelected}
                onClick={(event) => onRowClicked(event, row)}
                {...returnObjFromFunc(props, row)}
            >
                {conditionalReturn(selectable,
                    <TableCell padding="checkbox" {...returnObjFromFunc(checkboxTableCellProps, row)}>
                        <Checkbox
                            color={color}
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
                        padding="none"
                        {...returnObjFromFunc(cell?.props, { row, cell })}>
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
                            {isCollapseOpen ? <KeyboardArrowUpIcon {...returnObjFromFunc(arrowUpKeysProps, { row, isCollapseOpen })} /> : <KeyboardArrowDownIcon {...returnObjFromFunc(arrowDownKeysProps, { row, isCollapseOpen })} />}
                        </IconButton>
                    </TableCell>)}
            </TableRow>
            {conditionalReturn(collapsable, <TableRow
                selected={isRowSelected}
                {...(returnObjFromFunc(collapseRow?.props, { row, isRowSelected }))}>
                <TableCell className={classes.collapseRow} colSpan={6} {...returnObjFromFunc(collapseRow?.props, row)}>
                    <Collapse in={isCollapseOpen} timeout="auto" unmountOnExit>
                        {collapseRow?.component}
                    </Collapse>
                </TableCell>
            </TableRow>)}
        </React.Fragment>
    );
}