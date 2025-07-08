import api from "../api";
import type { Mode, NumericValueType, ProductType } from "../types/types";

type handleFormSubmitProps = {
    numericValue: NumericValueType;
    setNumericValue: React.Dispatch<React.SetStateAction<NumericValueType>>;
    value: ProductType;
    mode: Mode;
    id: number;
    setValue: React.Dispatch<React.SetStateAction<ProductType>>;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setCreatedProduct: React.Dispatch<React.SetStateAction<boolean>>;
};

export const handleFormSubmit = async ({
    numericValue,
    setNumericValue,
    value,
    mode,
    id,
    setValue,
    setOpen,
    setCreatedProduct,
}: handleFormSubmitProps) => {
    if (Object.values(numericValue).some((x) => x === null)) {
        alert("Please fill all fields with correct data");
        return;
    }

    const description = `${numericValue.proteins ?? 0} | ${
        numericValue.fats ?? 0
    } | ${numericValue.carbs ?? 0} (${numericValue.sugar ?? 0})`;

    const productToSubmit: ProductType = {
        ...value,
        description,
    };

    if (
        Object.values(productToSubmit).some(
            (x) => x === null || x === "" || x === 0
        )
    ) {
        alert("Please fill all fields with correct data");
        return;
    }

    try {
        const url = mode === "add" ? "/add-product" : `/update/${id}`;

        const response =
            mode === "add"
                ? await api.post(url, productToSubmit)
                : await api.put(url, productToSubmit);

        if (response.status == 200) {
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
            setOpen(false);
            setCreatedProduct(true);
        }
    } catch (e) {
        console.log(e);
    }
};
