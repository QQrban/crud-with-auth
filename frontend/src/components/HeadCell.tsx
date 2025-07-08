import {
    Box,
    Checkbox,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
} from "@mui/material";
import type { ProductDataTableType } from "../types/types";
import { visuallyHidden } from "@mui/utils";

interface HeadCell {
    disablePadding: boolean;
    id: keyof ProductDataTableType;
    label: string;
    numeric: boolean;
    sortable: boolean;
}

type Order = "asc" | "desc";

const headCells: readonly HeadCell[] = [
    {
        id: "id",
        numeric: true,
        disablePadding: false,
        label: "ID",
        sortable: true,
    },
    {
        id: "name",
        numeric: false,
        disablePadding: true,
        label: "Name",
        sortable: true,
    },
    {
        id: "description",
        numeric: false,
        disablePadding: false,
        label: "Proteins/Fats/Carbs (Sugar) (g)",
        sortable: false,
    },
    {
        id: "price",
        numeric: true,
        disablePadding: false,
        label: "Price (€)",
        sortable: true,
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof ProductDataTableType
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort,
    } = props;
    const createSortHandler =
        (property: keyof ProductDataTableType) =>
        (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        color="primary"
                        indeterminate={
                            numSelected > 0 && numSelected < rowCount
                        }
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? "right" : "left"}
                        padding={headCell.disablePadding ? "none" : "normal"}
                        sortDirection={
                            headCell.sortable && orderBy === headCell.id
                                ? order
                                : false
                        }
                    >
                        {headCell.sortable ? (
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={
                                    orderBy === headCell.id ? order : "asc"
                                }
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === "desc"
                                            ? "sorted descending"
                                            : "sorted ascending"}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        ) : (
                            headCell.label
                        )}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
