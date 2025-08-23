import React, { useState } from 'react';
import './Clothing.css';

const Clothing = ({ onAddToCart }) => {
  const [sortBy, setSortBy] = useState('default');
  
  const clothingProducts = [
    { 
      _id: '1', 
      name: "Men's Casual Shirt", 
      price: 999, 
      originalPrice: 1499, 
      discount: 33, 
      imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3',
      category: 'Clothing'
    },
    { 
      _id: '2', 
      name: "Women's Dress", 
      price: 1499, 
      originalPrice: 1999, 
      discount: 25, 
      imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3',
      category: 'Clothing'
    },
    { 
      _id: '3', 
      name: 'Running Shoes', 
      price: 2999, 
      originalPrice: 3999, 
      discount: 25, 
      imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3',
      category: 'Clothing'
    },
    { 
      _id: '4', 
      name: 'Designer Handbag', 
      price: 3999, 
      originalPrice: 4999, 
      discount: 20, 
      imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3',
      category: 'Clothing'
    },
    { 
      _id: '5', 
      name: "Men's Watch", 
      price: 4999, 
      originalPrice: 5999, 
      discount: 17, 
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3',
      category: 'Clothing'
    },
    { 
      _id: '6', 
      name: "Women's Sunglasses", 
      price: 1999, 
      originalPrice: 2499, 
      discount: 20, 
      imageUrl: 'https://images.unsplash.com/photo-1577803645773-f96470509666?ixlib=rb-4.0.3',
      category: 'Clothing'
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

  const sortedProducts = [...clothingProducts].sort((a, b) => {
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
    <div className="clothing-category-page">
      <div className="clothing-filter-bar">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
      <h2 className="category-title">Clothing</h2>
      <div className="clothing-grid">
        {sortedProducts.map(product => (
          <div key={product._id} className="clothing-card">
            <img src={product.imageUrl} alt={product.name} className="clothing-image" />
            <h3 className="clothing-name">{product.name}</h3>
            <div className="clothing-price-row">
              <span className="clothing-price">₹{product.price}</span>
              <span className="clothing-original-price">₹{product.originalPrice}</span>
              <span className="clothing-discount">{product.discount}% off</span>
            </div>
            <button 
              className="clothing-btn"
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

export default Clothing; 