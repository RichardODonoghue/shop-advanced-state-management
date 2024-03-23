import { createContext } from 'react';
import { Item } from '../App';

interface CartContext {
  items: Item[];
  addItemToCart: (arg0: string) => void;
  updateCartItemQuantity: (arg0: string, arg1: number) => void;
}

export const CartContext = createContext<CartContext>({
  items: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
});
