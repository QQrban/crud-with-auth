import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Mode, NumericValueType, ProductType } from "../types/types";
import { NumericInput } from "./NumericInput";
import { Input } from "./Input";

type AddProductFormProps = {
    open: boolean;
    mode: Mode;
    value: ProductType;
    setMode: React.Dispatch<React.SetStateAction<Mode>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
    mode,
    setMode,
    value,
    setValue,
    numericValue,
    setNumericValue,
    handleFormSubmit,
}: AddProductFormProps) {
    
    const handleClose = () => {
        setOpen(false);
        setValue({
            name: "",
            description: "",
            price: 0,
        });
        setNumericValue({
            proteins: null,
            fats: null,
            carbs: null,
            sugar: null,
        });
        setMode("add");
    };

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
                    <div className="text-2xl">
                        {mode == "add" ? "Add Product" : "Edit Product"}
                    </div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleFormSubmit();
                        }}
                        className="flex flex-col gap-10 mt-7"
                    >
                        <div className="relative flex flex-col">
                            <label className="text-gray-400" htmlFor="name">
                                Name
                            </label>
                            <Input
                                id="name"
                                value={value.name}
                                onChange={(e) =>
                                    setValue({ ...value, name: e.target.value })
                                }
                                placeholder="Name"
                            />
                        </div>
                        {inputFields.map((field) => (
                            <div className="relative flex flex-col" key={field}>
                                <label
                                    htmlFor={field}
                                    className="capitalize text-gray-400"
                                >
                                    {field}
                                </label>
                                <NumericInput
                                    field={field}
                                    value={numericValue[field]}
                                    onChange={(v) =>
                                        setNumericValue((prev) => ({
                                            ...prev,
                                            [field]: v,
                                        }))
                                    }
                                />
                            </div>
                        ))}
                        <div className="relative flex flex-col">
                            <label className="text-gray-400" htmlFor="price">
                                Price
                            </label>
                            <Input
                                id="price"
                                min={0.1}
                                max={15}
                                step={0.01}
                                type="number"
                                inputMode="numeric"
                                pattern="\d*"
                                maxLength={2}
                                value={
                                    value.price === 0 ? "" : value.price ?? ""
                                }
                                onChange={(e) =>
                                    setValue({
                                        ...value,
                                        price: Number(e.target.value),
                                    })
                                }
                                placeholder="Price"
                            />
                        </div>
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
