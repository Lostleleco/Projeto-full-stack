import { ReactNode } from "react";

export type ProductType = {
    name: ReactNode;
    id: string;
    price: string | null;  // Alterado para 'string' para armazenar o preço formatado
    quantity?: number | 1;
    image: string;
    description: string | null;
    currency?: string;
};
