import React, { useContext } from 'react'
import { CartContext } from '../context/cart-context';

export const SuccessModal = ({closeModal}) => {
  const cartCtxValue = useContext(CartContext);
  
    function handleCloseClick(){
        cartCtxValue.clearCart();
        closeModal();
    }
  return (
    <>
    <h1>Order Created Successfully</h1>
    <button onClick={handleCloseClick} className='button'>Close</button>
    </>
  )
}

