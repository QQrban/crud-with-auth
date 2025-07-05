import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { NumericValueType, ProductType } from "../types/types";
import { NumericInput } from "./NumericInput";
import { Input } from "./Input";

type AddProductFormProps = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    value: ProductType;
    setValue: React.Dispatch<React.SetStateAction<ProductType>>;
    numericValue: NumericValueType;
    setNumericValue: React.Dispatch<React.SetStateAction<NumericValueType>>;
    handleFormSubmit: () => void;
};

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    pt: 3,
};

const inputFields: (keyof NumericValueType)[] = [
    "proteins",
    "fats",
    "carbs",
    "sugar",
];

export default function AddProductForm({
    open,
    setOpen,
    value,
    setValue,
    numericValue,
    setNumericValue,
    handleFormSubmit,
}: AddProductFormProps) {
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={(theme) => ({
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                    <div className="text-2xl">Add Product</div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleFormSubmit();
                        }}
                        className="flex flex-col gap-10 mt-7"
                    >
                        <Input
                            value={value.name}
                            onChange={(e) =>
                                setValue({ ...value, name: e.target.value })
                            }
                            placeholder="Name"
                        />
                        {inputFields.map((field) => (
                            <NumericInput
                                key={field}
                                field={field}
                                value={numericValue[field]}
                                onChange={(v) =>
                                    setNumericValue((prev) => ({
                                        ...prev,
                                        [field]: v,
                                    }))
                                }
                            />
                        ))}
                        <Input
                            min={0.1}
                            max={15}
                            step={0.01}
                            type="number"
                            inputMode="numeric"
                            pattern="\d*"
                            maxLength={2}
                            value={value.price === 0 ? "" : value.price ?? ""}
                            onChange={(e) =>
                                setValue({
                                    ...value,
                                    price: Number(e.target.value),
                                })
                            }
                            placeholder="Price"
                        />
                        <Button
                            type="submit"
                            className="self-end w-30"
                            variant="contained"
                        >
                            OK
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
