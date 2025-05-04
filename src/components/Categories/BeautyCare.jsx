import React, { useState } from 'react';
import './BeautyCare.css';

const BeautyCare = ({ onAddToCart }) => {
  const [sortBy, setSortBy] = useState('default');
  
  const beautyCareProducts = [
    { 
      _id: '1', 
      name: 'Vitamin C Serum', 
      price: 999, 
      originalPrice: 1499, 
      discount: 33, 
      imageUrl: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3',
      category: 'BeautyCare'
    },
    { 
      _id: '2', 
      name: 'Hyaluronic Acid Moisturizer', 
      price: 799, 
      originalPrice: 1199, 
      discount: 33, 
      imageUrl: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?ixlib=rb-4.0.3',
      category: 'BeautyCare'
    },
    { 
      _id: '3', 
      name: 'Retinol Night Cream', 
      price: 1299, 
      originalPrice: 1999, 
      discount: 35, 
      imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3',
      category: 'BeautyCare'
    },
    { 
      _id: '4', 
      name: 'Sunscreen SPF 50', 
      price: 599, 
      originalPrice: 899, 
      discount: 33, 
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3',
      category: 'BeautyCare'
    },
    { 
      _id: '5', 
      name: 'Charcoal Face Mask', 
      price: 499, 
      originalPrice: 799, 
      discount: 38, 
      imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3',
      category: 'BeautyCare'
    },
    { 
      _id: '6', 
      name: 'Rose Water Toner', 
      price: 399, 
      originalPrice: 599, 
      discount: 33, 
      imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3',
      category: 'BeautyCare'
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

  const sortedProducts = [...beautyCareProducts].sort((a, b) => {
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
    <div className="beautycare-category-page">
      <div className="beautycare-filter-bar">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
      <h2 className="category-title">Beauty & Care</h2>
      <div className="beautycare-grid">
        {sortedProducts.map(product => (
          <div key={product._id} className="beautycare-card">
            <img src={product.imageUrl} alt={product.name} className="beautycare-image" />
            <h3 className="beautycare-name">{product.name}</h3>
            <div className="beautycare-price-row">
              <span className="beautycare-price">₹{product.price}</span>
              <span className="beautycare-original-price">₹{product.originalPrice}</span>
              <span className="beautycare-discount">{product.discount}% off</span>
            </div>
            <button 
              className="beautycare-btn"
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

export default BeautyCare; 