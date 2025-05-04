import React, { useState } from 'react';
import './SportsOutdoors.css';

const sportsProducts = [
  { id: 1, name: 'Mountain Bike', price: 15999, originalPrice: 19999, discount: '20% off', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3' },
  { id: 2, name: 'Yoga Mat', price: 499, originalPrice: 799, discount: '38% off', image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?ixlib=rb-4.0.3' },
  { id: 3, name: 'Football', price: 699, originalPrice: 999, discount: '30% off', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3' },
  { id: 4, name: 'Tennis Racket', price: 2499, originalPrice: 3499, discount: '29% off', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3' },
  { id: 5, name: 'Camping Tent', price: 3999, originalPrice: 4999, discount: '20% off', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3' },
  { id: 6, name: 'Dumbbell Set', price: 2499, originalPrice: 3499, discount: '29% off', image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3' },
  { id: 7, name: 'Sports Shoes', price: 2999, originalPrice: 3999, discount: '25% off', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3' },
  { id: 8, name: 'Hiking Backpack', price: 1999, originalPrice: 2499, discount: '20% off', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3' }
];

const SportsOutdoors = ({ onAddToCart }) => {
  const [sortBy, setSortBy] = useState('default');
  const sortedProducts = [...sportsProducts];

  const handleAddToCart = (product) => {
    onAddToCart(product);
  };

  return (
    <div className="sportsoutdoors-category-page">
      <div className="sportsoutdoors-filter-bar">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
      <h2 className="category-title">Sports & Outdoors</h2>
      <div className="sportsoutdoors-grid">
        {sortedProducts.map(product => (
          <div key={product.id} className="sportsoutdoors-card">
            <img src={product.image} alt={product.name} className="sportsoutdoors-image" />
            <h3 className="sportsoutdoors-name">{product.name}</h3>
            <div className="sportsoutdoors-price-row">
              <span className="sportsoutdoors-price">₹{product.price}</span>
              <span className="sportsoutdoors-original-price">₹{product.originalPrice}</span>
              <span className="sportsoutdoors-discount">{product.discount}</span>
            </div>
            <button 
              className="sportsoutdoors-btn"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SportsOutdoors; 