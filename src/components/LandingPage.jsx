import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingCart, 
  faTruck, 
  faStar, 
  faGift,
  faEnvelope,
  faQuoteLeft
} from '@fortawesome/free-solid-svg-icons';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to <span>D-Mart</span></h1>
          <p>Your One-Stop Shop for Everything</p>
          <div className="search-bar">
            <input type="text" placeholder="Search for products..." />
            <button>Search</button>
          </div>
          <Link to="/products" className="cta-button">
            Shop Now <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <h2 className="section-title">Shop by Category</h2>
        <div className="categories-grid">
          <div className="category-card">
            <div className="category-image-container">
              <img
                src="https://images.unsplash.com/photo-1541014741257-de529411b96a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Groceries"
                className="category-image"
              />
              <div className="category-overlay">
                <h3>Groceries</h3>
                <p>Fresh produce and daily essentials</p>
                <Link to="/category/1" className="explore-btn">Explore</Link>
              </div>
            </div>
          </div>
          <div className="category-card">
            <div className="category-image-container">
              <img
                src="https://images.unsplash.com/photo-1519558260268-cde7e03a0152?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Electronics"
                className="category-image"
              />
              <div className="category-overlay">
                <h3>Electronics</h3>
                <p>Latest gadgets and devices</p>
                <Link to="/category/2" className="explore-btn">Explore</Link>
              </div>
            </div>
          </div>
          <div className="category-card">
            <div className="category-image-container">
              <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
                alt="Fashion"
                className="category-image"
              />
              <div className="category-overlay">
                <h3>Fashion</h3>
                <p>Trendy clothing and accessories</p>
                <Link to="/category/3" className="explore-btn">Explore</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="special-offers">
        <div className="container">
          <h2 className="section-title">Special Offers</h2>
          <div className="offers-grid">
            <div className="offer-card">
              <div className="offer-badge">50% OFF</div>
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="Weekend Sale"
              />
              <h3>Weekend Special</h3>
              <p>Up to 50% off on selected items</p>
              <Link to="/offers" className="offer-btn">Shop Now</Link>
            </div>
            <div className="offer-card">
              <div className="offer-badge">NEW</div>
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
                alt="New Arrivals"
              />
              <h3>New Arrivals</h3>
              <p>Check out our latest products</p>
              <Link to="/new-arrivals" className="offer-btn">Explore</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
              <p>"D-Mart has transformed my shopping experience. Great products, amazing prices, and excellent service!"</p>
              <div className="testimonial-author">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  alt="Sarah Johnson"
                />
                <div>
                  <h4>Sarah Johnson</h4>
                  <p>Regular Customer</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <FontAwesomeIcon icon={faQuoteLeft} className="quote-icon" />
              <p>"The delivery is always on time, and the quality of products is consistently excellent. Highly recommended!"</p>
              <div className="testimonial-author">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  alt="Michael Brown"
                />
                <div>
                  <h4>Michael Brown</h4>
                  <p>Premium Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <h2>Subscribe to Our Newsletter</h2>
          <p>Get the latest updates on new products and special offers</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Enter your email" required />
            <button type="submit">
              <FontAwesomeIcon icon={faEnvelope} /> Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
