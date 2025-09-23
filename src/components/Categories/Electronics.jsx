import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config/api';
import './Electronics.css';

const Electronics = ({ onAddToCart }) => {
  const [sortBy, setSortBy] = useState('default');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchElectronicsProducts = async () => {
      try {
        setLoading(true);
        // Use the actual Electronics category ObjectId from the database
        const response = await axios.get(`${API_URL}/products/category/68a217ef46a3642ac769d992`);
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch electronics products');
        console.error('Error fetching electronics products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchElectronicsProducts();
  }, []);

  const handleAddToCart = (product) => {
    onAddToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1
    });
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  if (loading) {
    return <div className="electronics-loading">Loading electronics products...</div>;
  }

  if (error) {
    return <div className="electronics-error">{error}</div>;
  }

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