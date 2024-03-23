import { useRef, useContext } from 'react';
import CartModal from './CartModal.tsx';
import { CartContext } from '../store/shopping-cart-context.tsx';

export const Header = () => {
  const { items } = useContext(CartContext);
  const modal = useRef<HTMLDialogElement>(null);

  const cartQuantity = items.length;

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
      <CartModal ref={modal} title="Your Cart" actions={modalActions} />
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
