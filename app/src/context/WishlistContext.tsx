import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Product } from '@/data/products';

interface WishlistContextType {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (product: Product) => void;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>(() => {
    const stored = localStorage.getItem('brar_wishlist');
    return stored ? JSON.parse(stored) : [];
  });

  const addToWishlist = useCallback((product: Product) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev;
      const newItems = [...prev, product];
      localStorage.setItem('brar_wishlist', JSON.stringify(newItems));
      return newItems;
    });
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setItems((prev) => {
      const newItems = prev.filter((p) => p.id !== productId);
      localStorage.setItem('brar_wishlist', JSON.stringify(newItems));
      return newItems;
    });
  }, []);

  const isInWishlist = useCallback((productId: number) => {
    return items.some((p) => p.id === productId);
  }, [items]);

  const toggleWishlist = useCallback((product: Product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }, [isInWishlist, addToWishlist, removeFromWishlist]);

  return (
    <WishlistContext.Provider
      value={{
        items,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlist,
        totalItems: items.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}
