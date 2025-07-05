import type { JSX } from "react";

export type LoginForm = {
    identifier: string;
    password: string;
};

export type AuthResponse = {
    token: string;
};

export type DrawerItem = {
    text: string;
    icon: JSX.Element;
    to?: string;
    onClick?: () => void;
};

export type ProductType = {
    name: string;
    description: string;
    price: number;
};

export type NumericValueType = {
    proteins: number | null;
    fats: number | null;
    carbs: number | null;
    sugar: number | null;
};

export type ProductDataTableType = {
    name: string;
    id: number;
    description: string;
    price: number;
};

export type ProductData = {
    id: number;
    name: string;
    description: string;
    price: number;
};
