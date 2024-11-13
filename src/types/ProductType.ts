import { ReactNode } from "react";

export type ProductType = {
    name: ReactNode;
    id: string;
    price: number | null;
    quantity?: number | 1;
    image: string;
    description: string | null;
    currency?: string;

};