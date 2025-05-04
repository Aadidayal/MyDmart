import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faUser, 
  faPhone,
  faBars
} from '@fortawesome/free-solid-svg-icons';
import '../sec.css';
import './Header.css';

const Header = ({ cartCount, isLoggedIn, onLoginClick, onLogoutClick }) => {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          E-Commerce
        </Link>
        
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/category/1" className="nav-link">Groceries</Link>
          <Link to="/category/2" className="nav-link">Electronics</Link>
          <Link to="/category/3" className="nav-link">Clothing</Link>
          <Link to="/category/4" className="nav-link">Home & Kitchen</Link>
          <Link to="/category/5" className="nav-link">Beauty & Care</Link>
          <Link to="/category/6" className="nav-link">Sports & Outdoors</Link>
        </nav>
        
        <div className="header-actions">
          {isLoggedIn ? (
            <button onClick={onLogoutClick} className="auth-button">
              Logout
            </button>
          ) : (
            <button onClick={onLoginClick} className="auth-button">
              Login
            </button>
          )}
          <Link to="/cart" className="cart-link">
            <span className="cart-icon">🛒</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
