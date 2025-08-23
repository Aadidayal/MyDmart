import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faBox, faTag } from '@fortawesome/free-solid-svg-icons';
import './Categories.css';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: 'Groceries & Essentials',
      description: 'Fresh fruits, vegetables, daily essentials, and more at the best prices',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      itemCount: '1000+',
      offers: '40% Off',
      featured: true
    },
    {
      id: 2,
      name: 'Electronics',
      description: 'Latest smartphones, laptops, accessories with best deals',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      itemCount: '500+',
      offers: '25% Off',
      featured: false
    },
    {
      id: 3,
      name: 'Fashion',
      description: 'Trending clothes, footwear, and accessories for men, women & kids',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
      itemCount: '2000+',
      offers: '60% Off',
      featured: true
    }
  ];

  return (
    <section className="categories-section">
      <div className="categories-container">
        <h2 className="categories-title">Shop By Category</h2>
        <div className="categories-grid">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className={`category-card ${category.featured ? 'featured-category' : ''}`}
            >
              <div className="category-image-container">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="category-image"
                />
                <div className="category-overlay">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-description">{category.description}</p>
                  <div className="category-stats">
                    <div className="stat-item">
                      <FontAwesomeIcon icon={faBox} className="stat-icon" />
                      <span>{category.itemCount} items</span>
                    </div>
                    <div className="stat-item">
                      <FontAwesomeIcon icon={faTag} className="stat-icon" />
                      <span>Up to {category.offers}</span>
                    </div>
                  </div>
                  <Link to={`/products/${category.id}`} className="explore-button">
                    Explore Now
                    <FontAwesomeIcon icon={faArrowRight} className="explore-icon" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories; 