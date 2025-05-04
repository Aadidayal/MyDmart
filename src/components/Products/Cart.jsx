import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../sec.css';

const Cart = ({ cart, onRemoveFromCart }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRemoveFromCart = async (itemId) => {
    try {
      setIsLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to modify cart');
        return;
      }

      await axios.delete(`http://localhost:5000/api/cart/remove/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Call the parent's remove function
      onRemoveFromCart(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
      if (error.response) {
        if (error.response.status === 401) {
          setError('Your session has expired. Please login again.');
        } else if (error.response.status === 404) {
          setError('Item not found in cart');
        } else {
          setError('Error removing item from cart. Please try again.');
        }
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Shopping Cart</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {cart.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty</p>
          <Link to="/" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="row">
            <div className="col-md-8">
              {cart.map((item) => (
                <div key={item._id} className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="img-fluid rounded-start cart-image"
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{item.name}</h5>
                        <p className="card-text">₹{item.price.toFixed(2)}</p>
                        <p className="card-text">Quantity: {item.quantity}</p>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRemoveFromCart(item._id)}
                          disabled={isLoading}
                        >
                          {isLoading ? 'Removing...' : 'Remove'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Order Summary</h5>
                  <p>Total Items: {cart.reduce((total, item) => total + item.quantity, 0)}</p>
                  <p>Total Amount: ₹{calculateTotal().toFixed(2)}</p>
                  <button className="btn btn-success w-100">
                    Proceed to Checkout
                  </button>
                  <Link to="/" className="btn btn-outline-primary w-100 mt-2">
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 