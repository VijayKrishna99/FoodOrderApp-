import React, { useContext, useEffect, useRef, useState } from 'react';
import logo from '../assets/logo.jpg';
import '../index.css';
import CartModal from './CartModal';
import { CartContext } from '../context/cart-context';

export const Header = () => {
  const [cartButtonClicked, setCartButtonClicked] = useState(false);
  const modalRef = useRef();
  const { cartItems } = useContext(CartContext);

  function handleClick() {
    setCartButtonClicked(true);
  }

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.open();
    }
  }, [cartButtonClicked]);
  

  return (
    <>
      <div id='main-header'>
        <h1 id='title'>
          <img src={logo} alt='' />
          REACTFOOD
        </h1>
        <button className='text-button' onClick={handleClick}>
          Cart ({cartItems.length})
        </button>
        {cartButtonClicked && (
          <CartModal
            ref={modalRef}
            setCartButtonClicked={setCartButtonClicked}
          />
        )}
      </div>
    </>
  );
};
