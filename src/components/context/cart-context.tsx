"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import type { ProdutoDestaque, GrupoOpcoesPersonalizacao, Opcao } from "@/types/cardapio";

export interface CartItem {
  produto: ProdutoDestaque;
  opcoesSelecionadas: Record<string, Opcao[] | Opcao | null>;
  quantidade: number;
  precoFinal: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (item: CartItem) => {
    setItems((prev) => [...prev, item]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => setItems([]);

  return <CartContext.Provider value={{ items, addItem, removeItem, clearCart }}>{children}</CartContext.Provider>;
};
