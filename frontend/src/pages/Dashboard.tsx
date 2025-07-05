import { Button } from "@mui/material";
import DataTable from "../components/DataTable";
import SideBar from "../components/SideBar";
import { useCallback, useEffect, useState } from "react";
import AddProductForm from "../components/AddProductForm";
import type {
    NumericValueType,
    ProductData,
    ProductType,
} from "../types/types";
import { handleFormSubmit } from "../utils/validateFormFields";
import api from "../api";
import { createData } from "../utils/createData";

export const Dashboard = () => {
    const [createdProduct, setCreatedProduct] = useState(false);
    const [rows, setRows] = useState<ProductData[]>([]);
    const [open, setOpen] = useState(false);
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
            setValue,
            setOpen,
            setCreatedProduct,
        });
    }, [
        numericValue,
        value,
        setNumericValue,
        setValue,
        setOpen,
        setCreatedProduct,
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

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        if (createdProduct) {
            fetchProducts();
            setCreatedProduct(false);
        }
        console.log(createdProduct);
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
                    <Button variant="contained" onClick={() => setOpen(true)}>
                        Add Product
                    </Button>
                </div>
                <DataTable rows={rows} />
            </div>
        </div>
    );
};
