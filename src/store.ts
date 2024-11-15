import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "./types/ProductType";

type CartState = {
    cart: ProductType[];
    isOpen: boolean;
    toggleCart: () => void;
    addToCart: (product: ProductType) => void; // Função para adicionar ao carrinho
    removeFromCart: (productId: string) => void; // Função para remover do carrinho
};

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            isOpen: false,
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            addToCart: (product) =>
                set((state) => ({ cart: [...state.cart, product] })),
            removeFromCart: (productId) =>
                set((state) => ({
                    cart: state.cart.filter((product) => product.id !== productId),
                })),
        }),
        {
            name: "cart-storage", // Nome do armazenamento no localStorage
        }
    )
);
