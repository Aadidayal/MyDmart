import React from 'react';
import { Link } from 'react-router-dom';
import '../../sec.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Categories = () => {
  const categories = [
    { 
      id: 1, 
      name: 'Groceries', 
      image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3', 
      description: 'Fresh produce and daily essentials' 
    },
    { 
      id: 2, 
      name: 'Electronics', 
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3', 
      description: 'Latest gadgets and devices' 
    },
    { 
      id: 3, 
      name: 'Clothing', 
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3', 
      description: 'Trendy fashion for everyone' 
    },
    { 
      id: 4, 
      name: 'Home & Kitchen', 
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3', 
      description: 'Everything for your home' 
    },
    { 
      id: 5, 
      name: 'Beauty & Personal Care', 
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3', 
      description: 'Premium beauty products' 
    },
    { 
      id: 6, 
      name: 'Sports & Outdoors', 
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3', 
      description: 'Sports gear and outdoor equipment' 
    },
  ];

  const specialOffers = [
    {
      id: 1,
      title: 'Weekend Special',
      description: 'Get 20% off on all electronics',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3',
      buttonText: 'Shop Now'
    },
    { 
      id: 2,
      title: 'New Arrivals',
      description: 'Check out our latest products',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3',
      buttonText: 'Explore'
    },
    {
      id: 3,
      title: 'Member Benefits',
      description: 'Join our loyalty program',
      image: 'https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-4.0.3',
      buttonText: 'Sign Up'
    }
  ];

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
                    <img
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
                  <img src={offer.image} alt={offer.title} className="offer-image" />
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
    </div>
  );
};

export default Categories; 