import type { ProductData } from "../types/types";

export function createData(
    name: string,
    id: number,
    description: string,
    price: number
): ProductData {
    return { name, id, description, price };
}
