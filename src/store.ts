import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProductType } from "./types/ProductType";

type CartState = {
    onCheckout: string;
    setCheckout(arg0: string): unknown;
    cart: ProductType[];
    isOpen: boolean;
    toggleCart: () => void;
    addProduct: (product: ProductType) => void;
    removeProduct: (productId: string) => void;
};

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            cart: [],
            // Função para adicionar produto ao carrinho
            addProduct: (product) => set((state) => {
                const existingProduct = state.cart.find((p) => p.id === product.id);
                if (existingProduct) {
                    // Se o produto já existe no carrinho, aumenta a quantidade
                    const updatedCart = state.cart.map((p) =>
                        p.id === product.id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
                    );
                    return { cart: updatedCart };
                } else {
                    // Caso contrário, adiciona o produto com quantidade 1
                    return { cart: [...state.cart, { ...product, quantity: 1 }] };
                }
            }),
            // Função para remover produto do carrinho
            removeProduct: (productId) => set((state) => ({
                cart: state.cart.filter((product) => product.id !== productId),
            })),
            isOpen: false,
            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
        }),
        {
            name: "cart-storage", // Nome do armazenamento no localStorage
        }
    )
);
