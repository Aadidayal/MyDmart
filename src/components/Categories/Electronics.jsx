import React, { useState } from 'react';
import './Electronics.css';

const Electronics = ({ onAddToCart }) => {
  const [sortBy, setSortBy] = useState('default');
  
  const electronicsProducts = [
    {
      _id: '1',
      name: 'Wireless Noise Cancelling Headphones',
      price: 4999,
      originalPrice: 7999,
      discount: 38,
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3',
      category: 'Electronics'
    },
    {
      _id: '2',
      name: 'Smart Watch with Health Tracking',
      price: 3999,
      originalPrice: 5999,
      discount: 33,
      imageUrl: 'https://images.unsplash.com/photo-1545579133-99bb5ab189bd?ixlib=rb-4.0.3',
      category: 'Electronics'
    },
    {
      _id: '3',
      name: 'Portable Bluetooth Speaker',
      price: 1999,
      originalPrice: 2999,
      discount: 33,
      imageUrl: 'https://images.unsplash.com/photo-1606220588911-5117e7648a6a?ixlib=rb-4.0.3',
      category: 'Electronics'
    },
    {
      _id: '4',
      name: 'Wireless Earbuds Pro',
      price: 2999,
      originalPrice: 4499,
      discount: 33,
      imageUrl: 'https://images.unsplash.com/photo-1606220588911-5117e7648a6a?ixlib=rb-4.0.3',
      category: 'Electronics'
    },
    {
      _id: '5',
      name: 'Tablet with Stylus',
      price: 12999,
      originalPrice: 15999,
      discount: 19,
      imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3',
      category: 'Electronics'
    },
    {
      _id: '6',
      name: 'Smartphone',
      price: 24999,
      originalPrice: 29999,
      discount: 17,
      imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3',
      category: 'Electronics'
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

  const sortedProducts = [...electronicsProducts].sort((a, b) => {
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
    <div className="electronics-category-page">
      <div className="electronics-filter-bar">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
      <h2 className="category-title">Electronics</h2>
      <div className="electronics-grid">
        {sortedProducts.map(product => (
          <div key={product._id} className="electronics-card">
            <img src={product.imageUrl} alt={product.name} className="electronics-image" />
            <h3 className="electronics-name">{product.name}</h3>
            <div className="electronics-price-row">
              <span className="electronics-price">₹{product.price}</span>
              <span className="electronics-original-price">₹{product.originalPrice}</span>
              <span className="electronics-discount">{product.discount}% off</span>
            </div>
            <button 
              className="electronics-btn"
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

export default Electronics; 