import { Button } from "@mui/material";
import DataTable from "../components/DataTable";
import SideBar from "../components/SideBar";
import { useCallback, useEffect, useState } from "react";
import AddProductForm from "../components/AddProductForm";
import type {
    Mode,
    NumericValueType,
    ProductData,
    ProductType,
} from "../types/types";
import { handleFormSubmit } from "../utils/validateFormFields";
import api from "../api";
import { createData } from "../utils/createData";

export const Dashboard = () => {
    const [createdProduct, setCreatedProduct] = useState(false);
    const [selected, setSelected] = useState<number[]>([]);
    const [rows, setRows] = useState<ProductData[]>([]);
    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState<Mode>("add");
    const [id, setId] = useState<number>(0);

    const [value, setValue] = useState<ProductType>({
        name: "",
        description: "",
        price: 0,
    });

    const [numericValue, setNumericValue] = useState<NumericValueType>({
        proteins: null,
        fats: null,
        carbs: null,
        sugar: null,
    });

    const submitWrapper = useCallback(() => {
        handleFormSubmit({
            numericValue,
            setNumericValue,
            value,
            mode,
            setValue,
            setMode,
            setOpen,
            setCreatedProduct,
            id,
        });
    }, [
        numericValue,
        setNumericValue,
        value,
        mode,
        setValue,
        setMode,
        setOpen,
        setCreatedProduct,
        id,
    ]);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get<ProductData[]>("/products");
            const mappedRows = data.map((p) =>
                createData(p.name, p.id, p.description, p.price)
            );
            setRows(mappedRows);
        } catch (e) {
            console.error(e);
        }
    };

    const deleteSelectedProducts = async () => {
        try {
            const response = await api.delete("/delete", {
                data: selected,
            });

            if (response.status == 200) {
                fetchProducts();
                setSelected([]);
            }
        } catch (e) {
            console.log(e);
        }
    };

    const openAddProduct = () => {
        setOpen(true);
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
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (createdProduct) {
            fetchProducts();
            setCreatedProduct(false);
        }
    }, [createdProduct]);

    return (
        <div
            className="
            min-h-full 
            absolute 
            flex
            items-center
            "
        >
            <AddProductForm
                mode={mode}
                setMode={setMode}
                handleFormSubmit={submitWrapper}
                numericValue={numericValue}
                setNumericValue={setNumericValue}
                value={value}
                setValue={setValue}
                open={open}
                setOpen={setOpen}
            />
            <SideBar />
            <div className="flex flex-col gap-3">
                <div className="self-end">
                    <Button variant="contained" onClick={openAddProduct}>
                        Add Product
                    </Button>
                </div>
                <DataTable
                    deleteSelectedProducts={deleteSelectedProducts}
                    selected={selected}
                    setSelected={setSelected}
                    setId={setId}
                    setNumericValue={setNumericValue}
                    setValue={setValue}
                    setOpen={setOpen}
                    setMode={setMode}
                    rows={rows}
                />
            </div>
        </div>
    );
};
