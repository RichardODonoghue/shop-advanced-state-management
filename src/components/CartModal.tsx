import { ReactElement, forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Cart } from './Cart.tsx';
import { Item } from '../App.tsx';

interface CartModalProps {
  cartItems: Item[];
  onUpdateCartItemQuantity: (arg0: string, arg1: number) => void;
  title: string;
  actions: ReactElement;
}

const CartModal = forwardRef(function Modal(
  { cartItems, onUpdateCartItemQuantity, title, actions }: CartModalProps,
  ref
) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      show: () => {
        dialog.current!.showModal();
      },
    };
  });

  const modalRoot = document.getElementById('modal') as HTMLElement;

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart items={cartItems} onUpdateItemQuantity={onUpdateCartItemQuantity} />
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    modalRoot
  );
});

export default CartModal;
