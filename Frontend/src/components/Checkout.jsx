import { useContext } from "react";
import { CartContext } from "../context/cart-context";

export const Checkout = ({ total, closeModal ,onSubmitted}) => {

  const {cartItems} = useContext(CartContext);
    
    const url = "http://localhost:8080/orders";

    async function handleSubmitClick(event){
        event.preventDefault();

        const fd = new FormData(event.target);
        const customer = new Object();

        customer.name=fd.get('name');
        customer.email=fd.get('email');
        customer.street=fd.get('street');
        customer['postal-code']=fd.get('postal-code');
        customer.city=fd.get('city');

        const order = new Object();
        order.customer = customer;
        order.items = cartItems;

        const data = new Object();

        data.order = order;

        console.log(data);
        
        let stringData = JSON.stringify(data);
        console.log(stringData);
        fetch(url, {
            method : 'POST',
            body : stringData,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
              }
        })
        .then(response => {
            if(!response.ok)
                throw new Error('..');
            return response.text()
        })
        .then(response => console.log(response))

        onSubmitted(true);
      }

  return (
    <>
      <form className='control' onSubmit={handleSubmitClick}>
        <h1>Checkout</h1>
        <p>Total Amount : ${total}</p>
        <label htmlFor=''>Full Name </label>
        <input type='text' name='name'/>
        <label htmlFor=''>Email Address </label>
        <input type='email' name='email'/>
        <label htmlFor=''>Street </label>
        <input type='text' name='street'/>
      <div className='control-row mt-4 mb-4'>
        <label htmlFor=''>Postal Code </label>
        <input type='text' name='postal-code'/>
        <label htmlFor=''>City </label>
        <input type='text' name='city'/>
        </div>

        <div className='flex gap-5 space-x-10'>
        <button className='button'>Submit</button>
        <button className='button' type='button' onClick={closeModal}>Close</button>
        </div>
      </form>
    </>
  );
};


