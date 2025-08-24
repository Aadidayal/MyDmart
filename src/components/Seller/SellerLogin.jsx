import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SellerLogin.css';

const SellerLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/seller/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store seller info in localStorage
        localStorage.setItem('sellerData', JSON.stringify(data.seller));
        
        // Navigate to seller dashboard
        navigate('/seller/dashboard', { 
          state: { seller: data.seller } 
        });
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="seller-login-container">
      <div className="seller-login-card">
        <div className="login-header">
          <h1>Seller Portal Login</h1>
          <p>Sign in to manage your products and view your status</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Enter your username"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="loading-spinner">
                <span className="spinner"></span>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="login-footer">
          <div className="divider">
            <span>Don't have credentials?</span>
          </div>
          
          <div className="footer-actions">
            <button 
              className="register-btn"
              onClick={() => navigate('/seller')}
            >
              Apply as Seller
            </button>
            
            <button 
              className="home-btn"
              onClick={() => navigate('/')}
            >
              Back to Home
            </button>
          </div>
        </div>

        <div className="help-section">
          <div className="help-item">
            <strong>📋 Need Help?</strong>
            <p>Your credentials were provided after successful registration.</p>
          </div>
          
          <div className="help-item">
            <strong>🔍 Check Status</strong>
            <p>Use your login to check your application approval status.</p>
          </div>
          
          <div className="help-item">
            <strong>🛍️ Start Selling</strong>
            <p>Once approved, you can upload and manage your products.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
