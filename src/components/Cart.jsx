import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view cart');
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:5000/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems(response.data.items);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      setError('Failed to load cart items');
      setLoading(false);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to modify cart');
        return;
      }

      console.log('Removing item with productId:', productId);
      const response = await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Remove response:', response);
      
      // Update the cart items with the response from the server
      setCartItems(response.data.items);
    } catch (error) {
      console.error('Error removing item:', error);
      if (error.response?.status === 401) {
        setError('Your session has expired. Please login again.');
      } else if (error.response?.status === 404) {
        setError('Item not found in cart');
      } else {
        setError('Failed to remove item from cart');
      }
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (loading) {
    return <div className="cart-loading">Loading cart...</div>;
  }

  if (error) {
    return <div className="cart-error">{error}</div>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="cart-empty">Your cart is empty</div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.productId} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <div className="cart-item-price">₹{item.price}</div>
                  <div className="cart-item-quantity">Quantity: {item.quantity}</div>
                </div>
                <button 
                  className="cart-remove-btn"
                  onClick={() => handleRemoveFromCart(item.productId)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-total">Total: ₹{calculateTotal()}</div>
            <button className="cart-checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 