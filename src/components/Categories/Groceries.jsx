import React, { useState } from 'react';
import './Groceries.css';

const Groceries = ({ onAddToCart }) => {
  const [sortBy, setSortBy] = useState('default');
  
  const groceriesProducts = [
    { 
      _id: '1', 
      name: 'Fresh Apples (1kg)', 
      price: 199, 
      originalPrice: 249, 
      discount: 20, 
      imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3',
      category: 'Groceries'
    },
    { 
      _id: '2', 
      name: 'Organic Milk (1L)', 
      price: 99, 
      originalPrice: 129, 
      discount: 23, 
      imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3',
      category: 'Groceries'
    },
    { 
      _id: '3', 
      name: 'Whole Wheat Bread', 
      price: 45, 
      originalPrice: 60, 
      discount: 25, 
      imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3',
      category: 'Groceries'
    },
    { 
      _id: '4', 
      name: 'Fresh Eggs (12)', 
      price: 89, 
      originalPrice: 99, 
      discount: 10, 
      imageUrl: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?ixlib=rb-4.0.3',
      category: 'Groceries'
    },
    { 
      _id: '5', 
      name: 'Basmati Rice (1kg)', 
      price: 129, 
      originalPrice: 149, 
      discount: 13, 
      imageUrl: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-4.0.3',
      category: 'Groceries'
    },
    { 
      _id: '6', 
      name: 'Extra Virgin Olive Oil', 
      price: 399, 
      originalPrice: 499, 
      discount: 20, 
      imageUrl: 'https://images.unsplash.com/photo-1594282406314-6312a4bf6a1b?ixlib=rb-4.0.3',
      category: 'Groceries'
    }
  ];

  const handleAddToCart = (product) => {
    onAddToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1
    });
  };

  const sortedProducts = [...groceriesProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="groceries-category-page">
      <div className="groceries-filter-bar">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
      <h2 className="category-title">Groceries</h2>
      <div className="groceries-grid">
        {sortedProducts.map(product => (
          <div key={product._id} className="groceries-card">
            <img src={product.imageUrl} alt={product.name} className="groceries-image" />
            <h3 className="groceries-name">{product.name}</h3>
            <div className="groceries-price-row">
              <span className="groceries-price">₹{product.price}</span>
              <span className="groceries-original-price">₹{product.originalPrice}</span>
              <span className="groceries-discount">{product.discount}% off</span>
            </div>
            <button 
              className="groceries-btn"
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

export default Groceries; 