import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { useMemo, useState } from "react";
import type { Mode, NumericValueType, ProductData, ProductDataTableType, ProductType } from "../types/types";
import { EnhancedTableToolbar } from "./ToolBar";
import { EnhancedTableHead } from "./HeadCell";
import { getComparator } from "../utils/comparator";

type Order = "asc" | "desc";

type mainTableProps = {
    rows: ProductData[];
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setValue: React.Dispatch<React.SetStateAction<ProductType>>;
    setNumericValue: React.Dispatch<React.SetStateAction<NumericValueType>>;
    setId: React.Dispatch<React.SetStateAction<number>>;
};

export default function EnhancedTable({
    rows,
    setMode,
    setOpen,
    setValue,
    setNumericValue,
    setId,
}: mainTableProps) {
    const [order, setOrder] = useState<Order>("asc");
    const [orderBy, setOrderBy] = useState<keyof ProductDataTableType>("id");
    const [selected, setSelected] = useState<readonly number[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof ProductDataTableType
    ) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (event.target.checked) {
            setSelected(rows?.map((n) => n.id) ?? []);
        } else {
            setSelected([]);
        }
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly number[] = [];

        if (selectedIndex === -1) {
            newSelected = [...selected, id];
        } else {
            newSelected = selected.filter((s) => s !== id);
        }
        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const visibleRows = useMemo(
        () =>
            [...(rows ?? [])]
                .sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [order, orderBy, page, rowsPerPage, rows]
    );

    const handleEditClick = (e: React.MouseEvent, row: ProductDataTableType) => {
        e.stopPropagation();
        setOpen(true);
        setMode("edit");
        setValue(row)
        const descriptionToExtract = row.description;
        const [proteins, fats, carbs, sugar] = descriptionToExtract.match(/\d+/g)?.map(Number) ?? [];
        setId(row.id)
        setNumericValue({
            proteins: proteins,
            fats: fats,
            carbs: carbs,
            sugar: sugar
        })
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} />
                <TableContainer>
                    <Table sx={{ minWidth: 850 }}>
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={rows?.length ?? 0}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const isItemSelected = selected.includes(
                                    row.id
                                );
                                const labelId = `enhanced-table-checkbox-${index}`;

                                return (
                                    <TableRow
                                        hover
                                        onClick={(event) =>
                                            handleClick(event, row.id)
                                        }
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        sx={{ cursor: "pointer" }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                color="primary"
                                                checked={isItemSelected}
                                            />
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            sx={{ width: 60 }}
                                        >
                                            {row.id}
                                        </TableCell>
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            padding="none"
                                        >
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="left">
                                            {row.description}
                                        </TableCell>
                                        <TableCell align="right">
                                            {row.price}
                                        </TableCell>
                                        <TableCell
                                            sx={{ position: "relative" }}
                                        >
                                            <IconButton
                                                sx={{
                                                    position: "absolute",
                                                    top: 5,
                                                    left: 0,
                                                }}
                                                onClick={(e) => handleEditClick(e, row)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[]}
                    component="div"
                    count={rows?.length ?? 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
