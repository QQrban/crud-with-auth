function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    const av = a[orderBy];
    const bv = b[orderBy];

    if (typeof av === "string" && typeof bv === "string") {
        const aFirst = av.charAt(0).toLowerCase();
        const bFirst = bv.charAt(0).toLowerCase();

        if (bFirst < aFirst) return -1;
        if (bFirst > aFirst) return 1;
        return 0;
    }

    return bv < av ? -1 : bv > av ? 1 : 0;
}

type Order = "asc" | "desc";

export function getComparator<Key extends PropertyKey>(
    order: Order,
    orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
) => number {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}