import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/cart-context';



export const Cart = ({closeModal,handleCheckoutClick,total,setTotal}) => {

  const {cartItems,handleAddCartItems,handleRemoveCartItem} = useContext(CartContext);

    useEffect(() => {
        let num = 0;
        num = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);
        setTotal(num);
        console.log("cart Items :",cartItems);
        

        
      }, [cartItems]);

      const disabled = cartItems.length == 0;
      let buttonClasses ;
      if(!disabled){
        buttonClasses = "bg-amber-400 p-1 rounded-md shadow-md hover:bg-amber-500 cursor:pointer";
      }
      else{
        buttonClasses = "bg-gray-700 p-1 rounded-md shadow-md";
      }

     
  return (
    <>
     <div className="cart">
        <h1>Your Cart</h1>
        {cartItems.length == 0 && <h2>Your Cart Is Empty...</h2>}
        <ul>
          {cartItems.length !== 0 && cartItems.map((cartItem) => (
            cartItem.quantity > 0 &&
            <li key={cartItem.id} className="font-bold">
              <div className='cart-item'>
                <div className="flex gap-5 items-center">
                  <h2>{cartItem.name} : </h2>
                  <p className="font-mono">${cartItem.price} * {cartItem.quantity}</p>
                </div>
                <div className='cart-item-actions'>
                  <button onClick={() => handleAddCartItems(cartItem)}>+</button>
                  <p>{cartItem.quantity}</p>
                  <button onClick={() => handleRemoveCartItem(cartItem)}>-</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="cart-total font-mono">Total: {total}</div>
      <div className="modal-actions">
        <button onClick={closeModal} className="text-button">Close</button>
        <button className={buttonClasses} onClick={() => handleCheckoutClick()} disabled = {disabled}>Checkout</button>
      </div>
    </>
  )
}

