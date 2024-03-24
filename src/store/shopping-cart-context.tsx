import { PropsWithChildren, createContext, useReducer } from 'react';
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

type Action =
  | { type: 'ADD_ITEM'; payload: string }
  | { type: 'UPDATE_ITEM'; payload: { productId: string; amount: number } };

export const CartContext = createContext<CartContext>({
  items: [],
  addItemToCart: () => {},
  updateCartItemQuantity: () => {},
});

const shoppingCartReducer = (state: ShoppingCartState, action: Action) => {
  console.log(action);

  if (action.type === 'ADD_ITEM') {
    const updatedItems = [...state.items];

    const existingCartItemIndex = updatedItems.findIndex(
      (cartItem) => cartItem.id === action.payload
    );
    const existingCartItem = updatedItems[existingCartItemIndex];

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const product = DUMMY_PRODUCTS.find(
        (product) => product.id === action.payload
      );
      if (product) {
        updatedItems.push({
          id: action.payload,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }
    }

    return {
      ...state, // not needed here but here for demonstration
      items: updatedItems,
    };
  }

  if (action.type === 'UPDATE_ITEM') {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.payload.productId
    );

    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };

    updatedItem.quantity += action.payload.amount;

    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }

    return {
      ...state,
      items: updatedItems,
    };
  }
  return state;
};

export const CartContextProvider = ({ children }: PropsWithChildren) => {
  const [shoppingCart, shoppingCartDispatch] = useReducer(shoppingCartReducer, {
    items: [],
  });

  const handleAddItemToCart = (id: ItemId) => {
    shoppingCartDispatch({
      type: 'ADD_ITEM',
      payload: id,
    });
  };

  const handleUpdateCartItemQuantity = (productId: string, amount: number) => {
    shoppingCartDispatch({
      type: 'UPDATE_ITEM',
      payload: {
        productId,
        amount,
      },
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
