  import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import '../../sec.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import LazyImage from '../LazyImage';
import useImagePreloader from '../../hooks/useImagePreloader';

const Categories = () => {
  const categories = useMemo(() => [
    { 
      id: 1, 
      name: 'Groceries', 
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3&w=400&q=80', 
      description: 'Fresh produce and daily essentials' 
    },
    { 
      id: 2, 
      name: 'Electronics', 
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&w=400&q=80', 
      description: 'Latest gadgets and devices' 
    },
    { 
      id: 3, 
      name: 'Clothing', 
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&w=400&q=80', 
      description: 'Trendy fashion for everyone' 
    },
    { 
      id: 4, 
      name: 'Home & Kitchen', 
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&w=400&q=80', 
      description: 'Everything for your home' 
    },
    { 
      id: 5, 
      name: 'Beauty & Personal Care', 
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&w=400&q=80', 
      description: 'Premium beauty products' 
    },
    { 
      id: 6, 
      name: 'Sports & Outdoors', 
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&w=400&q=80', 
      description: 'Sports gear and outdoor equipment' 
    },
  ], []);

  const specialOffers = useMemo(() => [
    {
      id: 1,
      title: 'Weekend Special',
      description: 'Get 20% off on all electronics',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&w=600&q=80',
      buttonText: 'Shop Now'
    },
    { 
      id: 2,
      title: 'New Arrivals',
      description: 'Check out our latest products',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&w=600&q=80',
      buttonText: 'Explore'
    },
    {
      id: 3,
      title: 'Member Benefits',
      description: 'Join our loyalty program',
      image: 'https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3&w=600&q=80',
      buttonText: 'Sign Up'
    }
  ], []);

  // Preload all images
  const allImages = useMemo(() => [
    ...categories.map(cat => cat.image),
    ...specialOffers.map(offer => offer.image)
  ], [categories, specialOffers]);
  
  useImagePreloader(allImages);

  return (
    <div className="categories-page">
      {/* Hero Section */}
      <div className="hero-section" style={{ 
        backgroundImage: 'url(https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="hero-content">
          <h1>Welcome to D-Mart</h1>
          <p>Your one-stop shop for all your needs</p>
          <div className="search-bar">
            <input type="text" placeholder="Search for products..." />
            <button>Search</button>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="container mt-5">
        <h2 className="section-title">Shop by Category</h2>
        <div className="row">
          {categories.map((category) => (
            <div key={category.id} className="col-md-4 mb-4">
              <Link to={`/category/${category.id}`} className="text-decoration-none">
                <div className="category-card">
                  <div className="category-image-container">
                    <LazyImage
                      src={category.image}
                      alt={category.name}
                      className="category-image"
                    />
                    <div className="category-overlay">
                      <h3>{category.name}</h3>
                      <p>{category.description}</p>
                      <button className="explore-btn">
                        Explore <FontAwesomeIcon icon={faArrowRight} />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Special Offers Section */}
      <div className="special-offers">
        <div className="container">
          <h2 className="section-title">Special Offers</h2>
          <div className="offers-grid">
            {specialOffers.map((offer) => (
              <div key={offer.id} className="offer-card">
                <div className="offer-image-container">
                  <LazyImage src={offer.image} alt={offer.title} className="offer-image" />
                  <div className="offer-content">
                    <h3>{offer.title}</h3>
                    <p>{offer.description}</p>
                    <button className="offer-btn">{offer.buttonText}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compact Professional Footer */}
      <footer className="footer-section footer-compact">
        <div className="container footer-inner">
          <div className="footer-top">
            <div className="ft-left">
              <h3 className="brand">D-Mart</h3>
              <p className="brand-tag">Everyday low prices, trusted stores.</p>
            </div>

            <div className="ft-newsletter">
              <label htmlFor="newsletter" className="nl-label">Subscribe for deals</label>
              <div className="nl-input">
                <input id="newsletter" type="email" placeholder="Your email address" />
                <button className="nl-btn">Subscribe</button>
              </div>
              <div className="app-badges">
                <span>📱 Get our App</span>
              </div>
            </div>
          </div>

          <div className="footer-links">
            <div className="col">
              <h4>Sell on D-Mart</h4>
              <ul>
                <li><Link to="/seller">Start Selling</Link></li>
                <li><Link to="/seller/login">Seller Login</Link></li>
                <li><a href="#policies">Seller Policies</a></li>
              </ul>
            </div>
            <div className="col">
              <h4>Customer Care</h4>
              <ul>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#returns">Returns</a></li>
                <li><a href="#shipping">Shipping</a></li>
              </ul>
            </div>
            <div className="col">
              <h4>Company</h4>
              <ul>
                <li><a href="#about">About Us</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#press">Press</a></li>
              </ul>
            </div>
            <div className="col pay-col">
              <h4>We accept</h4>
              <div className="payments">
                <span>💳 Visa</span>
                <span>💳 Mastercard</span>
                <span>📱 UPI</span>
                <span>🏦 Net Banking</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom compact">
            <div className="fb-left">© 2025 D-Mart Pvt Ltd. All rights reserved.</div>
            <div className="fb-right">
              <a href="#terms">Terms</a>
              <span>•</span>
              <a href="#privacy">Privacy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Categories; 