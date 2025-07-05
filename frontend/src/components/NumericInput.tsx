import type { NumericValueType } from "../types/types";
import { Input } from "./Input";

type NumericInputProps = {
    field: keyof NumericValueType;
    value: number | null;
    onChange: (v: number | null) => void;
};

export const NumericInput = ({ field, value, onChange }: NumericInputProps) => {
    const label = field.charAt(0).toUpperCase() + field.slice(1);

    return (
        <>
            <Input
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={2}
                value={value ?? ""}
                placeholder={`${label} (g per 100g)`}
                onInput={(e) => {
                    const raw = e.currentTarget.value.replace(/\D/g, "");
                    onChange(raw === "" ? null : Number(raw));
                }}
            />
        </>
    );
};
