import { TableCell } from "@mui/material";
import { conditionalReturn, returnObjFromFunc, toObject } from "../../utils";
import React from "react";

export default function HTableHead({ color, components, heads, numSelected, headRowProps, headProps, rowCount, selectAllOptions, onSelectAllClick, sortable, onSort, orderBy, order, selectable }: any) {
    const { Checkbox, TableHead, TableRow, TableSortLabel } = components;
    const { selectAllCheckboxProps, selectAllCellProps } = toObject(selectAllOptions)

    return (
        <TableHead {...toObject(headProps)}>
            <TableRow {...toObject(headRowProps)}>
                {conditionalReturn(selectable,
                    <TableCell padding="checkbox" {...toObject(selectAllCellProps)}>
                        <Checkbox
                            color={color}
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            {...toObject(selectAllCheckboxProps)}
                        />
                    </TableCell>)}
                {heads.map((headCell: any, i: any) => {
                    const component = headCell?.component ?? headCell;
                    const id = headCell?.id || i

                    return (
                        <TableCell
                            key={id}
                            align={headCell?.align}
                            padding={selectable ? 'none' : 'normal'}
                            sortDirection={orderBy === id ? order : false}
                            {...returnObjFromFunc(headCell.props, headCell)}
                        >
                            {sortable ? <TableSortLabel
                                color={color}
                                active={orderBy === id}
                                direction={orderBy === id ? order : 'asc'}
                                onClick={() => onSort?.(id)}
                                {...returnObjFromFunc(headCell.sortLabelProps, headCell)}
                            >
                                {component}
                            </TableSortLabel> : component}
                        </TableCell>
                    )
                })}
            </TableRow>
        </TableHead>
    );
}
