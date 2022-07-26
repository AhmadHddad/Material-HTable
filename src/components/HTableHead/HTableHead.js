import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { conditionalReturn } from "utils";

export default function HTableHead({ heads, numSelected, rowCount, onSelectAllClick, sortable, onSort, orderBy, order, selectable }) {

    return (
        <TableHead>
            <TableRow>
                {conditionalReturn(selectable,
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>)}
                {heads.map((headCell) => (
                    <TableCell
                        key={headCell?.id}
                        align={headCell?.align}
                        padding={headCell?.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell?.id ? order : false}
                    >
                        {sortable ? <TableSortLabel
                            active={orderBy === headCell?.id}
                            direction={orderBy === headCell?.id ? order : 'asc'}
                            onClick={() => onSort?.(headCell?.id)}
                        >
                            {headCell?.label}
                        </TableSortLabel> : headCell?.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
