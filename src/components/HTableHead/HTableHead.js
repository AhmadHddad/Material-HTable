import { conditionalReturn, returnObjFromFunc, toObject } from "utils";

export default function HTableHead({ components, heads, numSelected, headRowProps, tableHeadProps, rowCount, selectAllOptions, onSelectAllClick, sortable, onSort, orderBy, order, selectable, tableSortLabelProps, headCellProps }) {
    const { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } = components;
    const { selectAllCheckboxProps, selectAllCellProps } = toObject(selectAllOptions)

    return (
        <TableHead {...toObject(tableHeadProps)}>
            <TableRow {...toObject(headRowProps)}>
                {conditionalReturn(selectable,
                    <TableCell padding="checkbox" {...toObject(selectAllCellProps)}>
                        <Checkbox
                            color="primary"
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
                        {...returnObjFromFunc(headCellProps, headCell)}
                    >
                        {sortable ? <TableSortLabel
                            active={orderBy === headCell?.id}
                            direction={orderBy === headCell?.id ? order : 'asc'}
                            onClick={() => onSort?.(headCell?.id)}
                            {...returnObjFromFunc(tableSortLabelProps, headCell)}
                        >
                            {headCell?.label}
                        </TableSortLabel> : headCell?.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
