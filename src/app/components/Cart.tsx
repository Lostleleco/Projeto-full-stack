'use client';

import { useCartStore } from "../store"; // A store de carrinho
import { ProductType } from "../../types/ProductType"; // Tipo de produto, se necessário

export default function Cart() {
    const { isOpen, toggleCart, cart } = useCartStore(); // Obtenha o estado do carrinho e a função toggleCart

    // Função para calcular o número total de itens no carrinho
    const getTotalItems = () => {
        return cart.reduce((acc, product) => acc + (product.quantity || 1), 0); // Conta as quantidades, ou 1 se não houver
    };

    return (
        <div onClick={toggleCart} className="flex items-center gap-8">
            <div className="flex items-center cursor-pointer relative">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 4.5h16.5l-1.5 9H5.25l-1.5-9zM7.5 19.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zm12 0a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                    />
                </svg>
                <span className="bg-teal-600 text-sm font-bold rounded-full h-5 w-5 flex items-center justify-center absolute left-3 bottom-3">
                    {getTotalItems()} {/* Aqui exibimos o número de itens no carrinho */}
                </span>
            </div>

            {isOpen && (
                <div className="fixed w-full h-screen bg-black/25 left-0 top-0 z-50">
                    <div 
                        onClick={(e) => e.stopPropagation()} 
                        className="absolute bg-slate-600 right-0 top-0 w-1/3 h-screen p-12 overflow-y-scroll"
                    >
                        <h1>Meu carrinho</h1>
                        {/* Renderizando os produtos do carrinho */}
                        {cart.length === 0 ? (
                            <p>O carrinho está vazio.</p>
                        ) : (
                            cart.map((product: ProductType) => (
                                <div key={product.id} className="mb-4">
                                    <p>{product.name}</p>
                                    <p>{product.price}</p>
                                    <p>Quantidade: {product.quantity}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
