import { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import axiosInstance from '../axiosInstance';

export const CartContext = createContext({
  cartItems: [],
  handleAddCartItems: () => {},
  handleRemoveCartItem: () => {},
  clearCart: () => {},
});

function cartContextReducer(state, action) {
 

  const prevCartItems = [...state];

  switch (action.type) {
    case 'SET_CART':
      console.log("set cart : ",action.payload.cartItems);
      return action.payload.cartItems;

    case 'ADD_ITEM':
      const existingItem = prevCartItems.find(
        (cartItem) => cartItem.id === action.payload.item.id
      );
      if (!existingItem) {
        const newItem = {
          id: action.payload.item.id,
          name: action.payload.item.name,
          quantity: 1,
          price: action.payload.item.price,
        };

        return [...prevCartItems, newItem];
      } else {
        return prevCartItems.map((item) =>
          item.id === existingItem.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }
    
    case 'REMOVE_ITEM':
      if (action.payload.item.quantity > 1) {
        return prevCartItems.map((cartItem) =>
          cartItem.id === action.payload.item.id
            ? {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              }
            : cartItem
        );
      } else {
        return prevCartItems.filter(
          (cartItem) => cartItem.id !== action.payload.item.id 
        );
      }
    
    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
}

export default function CartContextProvider({ children }) {
  const [cartItems, cartItemsDispatch] = useReducer(cartContextReducer, []);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await axios.get('http://localhost:8080/cart'); // Replace with actual user ID
        cartItemsDispatch({
          type: 'SET_CART',
          payload: { cartItems: response.data },
        });
        console.log("response ",response.data);
      } catch (error) {
        console.error('Failed to fetch cart items:', error);
      }
    }
    fetchCartItems();
  }, []);

  async function handleAddCartItems(item) {
    try {
      console.log("item", item);
      await axios.post('http://localhost:8080/addItem', item); // Replace with actual user ID
      cartItemsDispatch({
        type: 'ADD_ITEM',
        payload: { item },
      });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  }

  async function handleRemoveCartItem(item) {
    try {
      await axiosInstance.delete(`http://localhost:8080/delete/${item.id}`); // Replace with actual user ID
      cartItemsDispatch({
        type: 'REMOVE_ITEM',
        payload: { item },
      });
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  }

  function clearCart() {
    cartItemsDispatch({ type: 'CLEAR_CART' });
  }
 



  const cartCtxValue = {
    cartItems,
    handleAddCartItems,
    handleRemoveCartItem,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartCtxValue}>{children}</CartContext.Provider>
  );
}
