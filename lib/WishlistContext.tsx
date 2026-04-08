import { createContext, useContext, useState, ReactNode } from "react";

type WishlistItem = {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  unit: string;
  image: string;
  category: string;
};

type WishlistContextType = {
  items: WishlistItem[];
  toggle: (item: WishlistItem) => void;
  isWishlisted: (id: string) => boolean;
};

const WishlistContext = createContext<WishlistContextType>({} as WishlistContextType);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  const toggle = (item: WishlistItem) =>
    setItems((prev) =>
      prev.find((i) => i.id === item.id)
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item]
    );

  const isWishlisted = (id: string) => items.some((i) => i.id === id);

  return (
    <WishlistContext.Provider value={{ items, toggle, isWishlisted }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
