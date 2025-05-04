import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import ProductList from './components/Products/ProductList';
import Cart from './components/Products/Cart';
import Categories from './components/Products/Categories';
import Electronics from './components/Categories/Electronics';
import Groceries from './components/Categories/Groceries';
import Clothing from './components/Categories/Clothing';
import HomeKitchen from './components/Categories/HomeKitchen';
import BeautyCare from './components/Categories/BeautyCare';
import SportsOutdoors from './components/Categories/SportsOutdoors';
import AuthModal from './components/Auth/AuthModal';
import './App.css';
import axios from 'axios';

const AppContent = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [cart, setCart] = useState([]);
  const { isAuthenticated, logout, token } = useAuth();

  const handleAddToCart = async (product) => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/cart/add', {
        _id: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: product.quantity || 1
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update local cart state with the response from the backend
      setCart(response.data.items);
      
      // Show success message
      alert('Item added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      if (error.response?.status === 401) {
        setShowAuthModal(true);
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to add item to cart. Please try again.');
      }
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      const response = await axios.delete(`http://localhost:5000/api/cart/remove/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update local state with the updated cart from the backend
      setCart(response.data.items);
      
      // Show success message
      alert('Item removed from cart successfully!');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert('Failed to remove item from cart. Please try again.');
      }
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    logout();
    setCart([]);
    localStorage.removeItem('token');
  };

  // Load cart from backend when authenticated
  useEffect(() => {
    const loadCart = async () => {
      if (isAuthenticated && token) {
        try {
          const response = await axios.get('http://localhost:5000/api/cart', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setCart(response.data.items);
        } catch (error) {
          console.error('Error loading cart:', error);
          if (error.response?.status === 401) {
            setShowAuthModal(true);
          }
        }
      }
    };
    loadCart();
  }, [isAuthenticated, token]);

  return (
    <>
      <Header 
        cartCount={cart.length} 
        isLoggedIn={isAuthenticated} 
        onLoginClick={() => setShowAuthModal(true)}
        onLogoutClick={handleLogout}
      />
      
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />

      <Routes>
        <Route path="/" element={<Categories />} />
        <Route path="/category/1" element={<Groceries onAddToCart={handleAddToCart} />} />
        <Route path="/category/2" element={<Electronics onAddToCart={handleAddToCart} />} />
        <Route path="/category/3" element={<Clothing onAddToCart={handleAddToCart} />} />
        <Route path="/category/4" element={<HomeKitchen onAddToCart={handleAddToCart} />} />
        <Route path="/category/5" element={<BeautyCare onAddToCart={handleAddToCart} />} />
        <Route path="/category/6" element={<SportsOutdoors onAddToCart={handleAddToCart} />} />
        <Route 
          path="/category/:categoryId" 
          element={<ProductList onAddToCart={handleAddToCart} />} 
        />
        <Route 
          path="/cart" 
          element={<Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} />} 
        />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;
