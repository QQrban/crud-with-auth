import { alpha } from "@mui/material/styles";
import { IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

interface EnhancedTableToolbarProps {
    numSelected: number;
    deleteSelectedProducts: () => void;
}

export function EnhancedTableToolbar({numSelected, deleteSelectedProducts}: EnhancedTableToolbarProps) {

    return (
        <Toolbar
            sx={[
                {
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                },
                numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(
                            theme.palette.primary.main,
                            theme.palette.action.activatedOpacity
                        ),
                },
            ]}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    All Products
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={deleteSelectedProducts}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                ""
            )}
        </Toolbar>
    );
}