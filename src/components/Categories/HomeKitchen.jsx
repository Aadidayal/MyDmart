import React, { useState } from 'react';
import './HomeKitchen.css';

const HomeKitchen = ({ onAddToCart }) => {
  const [sortBy, setSortBy] = useState('default');
  
  const homeKitchenProducts = [
    { 
      _id: '1', 
      name: 'Premium Non-Stick Cookware Set', 
      price: 2499, 
      originalPrice: 3999, 
      discount: 38, 
      imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3',
      category: 'HomeKitchen'
    },
    { 
      _id: '2', 
      name: 'Stainless Steel Mixing Bowls Set', 
      price: 899, 
      originalPrice: 1499, 
      discount: 40, 
      imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3',
      category: 'HomeKitchen'
    },
    { 
      _id: '3', 
      name: 'Electric Kettle with Temperature Control', 
      price: 1999, 
      originalPrice: 2999, 
      discount: 33, 
      imageUrl: 'https://images.unsplash.com/photo-1608039829574-327d29c5d5c8?ixlib=rb-4.0.3',
      category: 'HomeKitchen'
    },
    { 
      _id: '4', 
      name: 'Ceramic Dinnerware Set', 
      price: 1799, 
      originalPrice: 2499, 
      discount: 28, 
      imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3',
      category: 'HomeKitchen'
    },
    { 
      _id: '5', 
      name: 'Professional Chef Knife Set', 
      price: 3499, 
      originalPrice: 4999, 
      discount: 30, 
      imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3',
      category: 'HomeKitchen'
    },
    { 
      _id: '6', 
      name: 'Glass Storage Jars (Set of 6)', 
      price: 799, 
      originalPrice: 1199, 
      discount: 33, 
      imageUrl: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?ixlib=rb-4.0.3',
      category: 'HomeKitchen'
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

  const sortedProducts = [...homeKitchenProducts].sort((a, b) => {
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
    <div className="homekitchen-category-page">
      <div className="homekitchen-filter-bar">
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="default">Default</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>
      <h2 className="category-title">Home & Kitchen</h2>
      <div className="homekitchen-grid">
        {sortedProducts.map(product => (
          <div key={product._id} className="homekitchen-card">
            <img src={product.imageUrl} alt={product.name} className="homekitchen-image" />
            <h3 className="homekitchen-name">{product.name}</h3>
            <div className="homekitchen-price-row">
              <span className="homekitchen-price">₹{product.price}</span>
              <span className="homekitchen-original-price">₹{product.originalPrice}</span>
              <span className="homekitchen-discount">{product.discount}% off</span>
            </div>
            <button 
              className="homekitchen-btn"
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

export default HomeKitchen; 