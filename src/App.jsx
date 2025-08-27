import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Header from './components/Header';
import ProductList from './components/Products/ProductList';
import Cart from './components/Products/Cart';
import Categories from './components/Products/Categories';
import AuthModal from './components/Auth/AuthModal';
import './App.css';
import axios from 'axios';

// Lazy load components for better performance
const Electronics = lazy(() => import('./components/Categories/Electronics'));
const Groceries = lazy(() => import('./components/Categories/Groceries'));
const Clothing = lazy(() => import('./components/Categories/Clothing'));
const HomeKitchen = lazy(() => import('./components/Categories/HomeKitchen'));
const BeautyCare = lazy(() => import('./components/Categories/BeautyCare'));
const SportsOutdoors = lazy(() => import('./components/Categories/SportsOutdoors'));
const SellerPage = lazy(() => import('./pages/SellerPage'));
const SellerSuccess = lazy(() => import('./components/Seller/SellerSuccess'));
const SellerLogin = lazy(() => import('./components/Seller/SellerLogin'));
const SellerDashboard = lazy(() => import('./components/Seller/SellerDashboard'));
const AdminDashboard = lazy(() => import('./components/Admin/AdminDashboard'));

// Loading component
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '200px',
    fontSize: '1.2rem',
    color: '#666'
  }}>
    Loading...
  </div>
);

const AppContent = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [cart, setCart] = useState([]);
  const { isAuthenticated, logout, token, isAdmin } = useAuth();

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

  const handleRemoveFromCart = async (updatedItems) => {
    try {
      // Update the cart state with the new items
      setCart(updatedItems);
    } catch (error) {
      console.error('Error updating cart state:', error);
      alert('Error updating cart. Please try again.');
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
        <Route path="/" element={
          isAdmin ? (
            <Suspense fallback={<LoadingSpinner />}>
              <AdminDashboard />
            </Suspense>
          ) : (
            <Categories />
          )
        } />
        <Route path="/admin" element={
          <Suspense fallback={<LoadingSpinner />}>
            <AdminDashboard />
          </Suspense>
        } />
        <Route path="/category/1" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Groceries onAddToCart={handleAddToCart} />
          </Suspense>
        } />
        <Route path="/category/2" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Electronics onAddToCart={handleAddToCart} />
          </Suspense>
        } />
        <Route path="/category/3" element={
          <Suspense fallback={<LoadingSpinner />}>
            <Clothing onAddToCart={handleAddToCart} />
          </Suspense>
        } />
        <Route path="/category/4" element={
          <Suspense fallback={<LoadingSpinner />}>
            <HomeKitchen onAddToCart={handleAddToCart} />
          </Suspense>
        } />
        <Route path="/category/5" element={
          <Suspense fallback={<LoadingSpinner />}>
            <BeautyCare onAddToCart={handleAddToCart} />
          </Suspense>
        } />
        <Route path="/category/6" element={
          <Suspense fallback={<LoadingSpinner />}>
            <SportsOutdoors onAddToCart={handleAddToCart} />
          </Suspense>
        } />
        <Route 
          path="/category/:categoryId" 
          element={<ProductList onAddToCart={handleAddToCart} />} 
        />
        <Route 
          path="/cart" 
          element={<Cart cart={cart} onRemoveFromCart={handleRemoveFromCart} />} 
        />
        <Route path="/seller" element={
          <Suspense fallback={<LoadingSpinner />}>
            <SellerPage />
          </Suspense>
        } />
        <Route path="/seller/success" element={
          <Suspense fallback={<LoadingSpinner />}>
            <SellerSuccess />
          </Suspense>
        } />
        <Route path="/seller/login" element={
          <Suspense fallback={<LoadingSpinner />}>
            <SellerLogin />
          </Suspense>
        } />
        <Route path="/seller/dashboard" element={
          <Suspense fallback={<LoadingSpinner />}>
            <SellerDashboard />
          </Suspense>
        } />
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
