'use client';

import { useCartStore } from "../store"; // A store de carrinho
import { ProductType } from "@/types/ProductType";

interface ProductProps {
    product: ProductType; // Especificando que a prop "product" é do tipo ProductType
}

export default function Product({ product }: ProductProps) {
    const { addProduct } = useCartStore(); // Obtenha a função addProduct

    return (
        <button
            onClick={() => addProduct(product)}
            className="rounded-md bg-teal-600 text-white px-3.5 py-2.5 text-sm text-center">
            Adicionar ao carrinho
        </button>
    );
}
