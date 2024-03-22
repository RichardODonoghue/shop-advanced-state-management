import { useRef } from 'react';

import CartModal from './CartModal.tsx';
import { ShoppingCartState } from '../App.tsx';

interface HeaderProps {
  cart: ShoppingCartState;
  onUpdateCartItemQuantity: (arg0: string, arg1: number) => void;
}

export const Header = ({ cart, onUpdateCartItemQuantity }: HeaderProps) => {
  const modal = useRef<HTMLDialogElement>();

  const cartQuantity = cart.items.length;

  function handleOpenCartClick() {
    modal.current!.show();
  }

  let modalActions = <button>Close</button>;

  if (cartQuantity > 0) {
    modalActions = (
      <>
        <button>Close</button>
        <button>Checkout</button>
      </>
    );
  }

  return (
    <>
      <CartModal
        ref={modal}
        cartItems={cart.items}
        onUpdateCartItemQuantity={onUpdateCartItemQuantity}
        title="Your Cart"
        actions={modalActions}
      />
      <header id="main-header">
        <div id="main-title">
          <img src="logo.png" alt="Elegant model" />
          <h1>Elegant Context</h1>
        </div>
        <p>
          <button onClick={handleOpenCartClick}>Cart ({cartQuantity})</button>
        </p>
      </header>
    </>
  );
};
