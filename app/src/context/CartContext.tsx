import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { readStored, writeStored, clearStored } from '@/lib/storage';
import type { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  // Starts empty so prerendered markup and the first client render agree;
  // the real cart loads from storage right after mount.
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Intentional post-mount setState — see AuthContext for the reasoning.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setItems(readStored<CartItem[]>('brar_cart', []));
  }, []);

  const addToCart = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      let newItems: CartItem[];
      if (existing) {
        newItems = prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prev, { product, quantity: 1 }];
      }
      writeStored('brar_cart', newItems);
      return newItems;
    });
  }, []);

  const removeFromCart = useCallback((productId: number) => {
    setItems((prev) => {
      const newItems = prev.filter((item) => item.product.id !== productId);
      writeStored('brar_cart', newItems);
      return newItems;
    });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) => {
      const newItems = prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );
      writeStored('brar_cart', newItems);
      return newItems;
    });
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
    clearStored('brar_cart');
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
