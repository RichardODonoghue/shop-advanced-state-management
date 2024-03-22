import { createContext } from 'react';

interface CartContext {
  items: [];
  addItemToCart: () => void;
}

export const CartContext = createContext<CartContext>({
  items: [],
  addItemToCart: () => {},
});
