import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import '../index.css';
import { createPortal } from 'react-dom';
import { Cart } from './Cart';
import { Checkout } from './Checkout';
import { SuccessModal } from './SuccessModal';

const CartModal = forwardRef(function CartModal({setCartButtonClicked},ref) {
  const dialogRef = useRef(null);

  const [checkoutClicked, setCheckoutClicked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [total, setTotal] = useState(0);

  function handleCheckoutClick() {
    setCheckoutClicked(true);
  }

  useImperativeHandle(ref, () => ({
    open() {
      dialogRef.current.showModal();
    },
    close() {
      dialogRef.current.close();
    },
  }));

  const closeModal = () => {
    if (dialogRef.current) {
      setCheckoutClicked(false);
      setCartButtonClicked(false);
      dialogRef.current.close();
    }
  };
  function handleClose() {
    setCheckoutClicked(false);
    setSubmitted(false);
    dialogRef.current.close();
  }

  return createPortal(
    <dialog ref={dialogRef} className='modal p-5 pr-10 pl-10'>
      {!checkoutClicked && (
        <Cart
          closeModal={closeModal}
          handleCheckoutClick={handleCheckoutClick}
          total={total}
          setTotal={setTotal}
        />
      )}

      {checkoutClicked && !submitted && (
        <Checkout
          total={total}
          closeModal={closeModal}
          onSubmitted={() => setSubmitted(true)}
        />
      )}

      {submitted && <SuccessModal closeModal={handleClose} />}
    </dialog>,
    document.getElementById('modal')
  );
});

export default CartModal;
