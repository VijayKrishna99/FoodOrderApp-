import { useState } from 'react';
import { Header } from './components/Header';
import { Main } from './components/Main';
import CartContextProvider, { CartContext } from './context/cart-context';

function App() {
  return (
    <>
      <CartContextProvider>
        <Header />
        <Main />
      </CartContextProvider>
    </>
  );
}

export default App;
