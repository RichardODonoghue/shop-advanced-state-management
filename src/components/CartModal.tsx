import { ReactElement, forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Cart } from './Cart.tsx';

interface CartModalProps {
  title: string;
  actions: ReactElement;
}

export const CartModal = forwardRef<HTMLDialogElement, CartModalProps>(
  function Modal({ title, actions }, ref) {
    const dialog = useRef<HTMLDialogElement>(null);

    useImperativeHandle(
      ref,
      () =>
        ({
          show: () => dialog.current?.showModal(),
        } as HTMLDialogElement)
    );

    const modalRoot = document.getElementById('modal') as HTMLElement;

    return createPortal(
      <dialog id="modal" ref={dialog}>
        <h2>{title}</h2>
        <Cart />
        <form method="dialog" id="modal-actions">
          {actions}
        </form>
      </dialog>,
      modalRoot
    );
  }
);
