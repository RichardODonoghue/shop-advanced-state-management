import { PropsWithChildren, createContext, useState } from 'react';
import { DUMMY_PRODUCTS } from '../dummy-products';

interface CartContext {
  items: Item[];
  addItemToCart: (arg0: string) => void;
  updateCartItemQuantity: (arg0: string, arg1: number) => void;
}

type ItemId = string;

export type Item = {
  id: ItemId;
  name: string;
  price: number;
  quantity: number;
};

export type ShoppingCartState = {
  items: Item[];
};

export const CartContext = createContext<CartContext>({
  items: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
});

export const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [shoppingCart, setShoppingCart] = useState<ShoppingCartState>({
    items: [],
  });

  const handleAddItemToCart = (id: ItemId) => {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];

      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        if (product) {
          updatedItems.push({
            id: id,
            name: product.title,
            price: product.price,
            quantity: 1,
          });
        }
      }

      return {
        items: updatedItems,
      };
    });
  };

  const handleUpdateCartItemQuantity = (productId: string, amount: number) => {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  };

  const contextValue = {
    items: shoppingCart.items,
    addItemToCart: handleAddItemToCart,
    updateCartItemQuantity: handleUpdateCartItemQuantity,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
