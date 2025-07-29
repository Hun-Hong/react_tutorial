import { createContext, useContext } from "react";
import type { CartState, CartAction } from "./Types";

export const CartContext = createContext<CartState | null>(null);
export const CartDispatchContext = createContext<React.Dispatch<CartAction> | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

export function useCartDispatch() {
  const context = useContext(CartDispatchContext);
  if (!context) {
    throw new Error('useCartDispatch must be used within CartProvider');
  }
  return context;
}

