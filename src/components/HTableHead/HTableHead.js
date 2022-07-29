import { TableCell } from "@mui/material";
import { conditionalReturn, returnObjFromFunc, toObject } from "utils";

export default function HTableHead({ color, components, heads, numSelected, headRowProps, headProps, rowCount, selectAllOptions, onSelectAllClick, sortable, onSort, orderBy, order, selectable }) {
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
                {heads.map((headCell) => (
                    <TableCell
                        key={headCell?.id}
                        align={headCell?.align}
                        padding={headCell?.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell?.id ? order : false}
                        {...returnObjFromFunc(headCell.props, headCell)}
                    >
                        {sortable ? <TableSortLabel
                            color={color}
                            active={orderBy === headCell?.id}
                            direction={orderBy === headCell?.id ? order : 'asc'}
                            onClick={() => onSort?.(headCell?.id)}
                            {...returnObjFromFunc(headCell.sortLabelProps, headCell)}
                        >
                            {headCell?.component}
                        </TableSortLabel> : headCell?.component}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
