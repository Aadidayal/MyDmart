import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../config/api';
import './Groceries.css';

const Groceries = ({ onAddToCart }) => {
  const [sortBy, setSortBy] = useState('default');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroceriesProducts = async () => {
      try {
        setLoading(true);
        // Use the actual Groceries category ObjectId from the database
        const response = await axios.get(`${API_URL}/products/category/68a21c83d7f0c3f3ef738b09`);
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch groceries products');
        console.error('Error fetching groceries products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroceriesProducts();
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
    return <div className="groceries-loading">Loading groceries products...</div>;
  }

  if (error) {
    return <div className="groceries-error">{error}</div>;
  }

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
        {sortedProducts.map(product => {
          // Ensure product has required fields
          if (!product || !product._id) {
            console.warn('Invalid product data:', product);
            return null;
          }
          
          return (
          <div key={product._id} className="groceries-card">
            <img 
              src={product.imageUrl || product.images?.[0] || 'https://via.placeholder.com/300x300?text=No+Image'} 
              alt={product.name || 'Product'} 
              className="groceries-image" 
            />
            <h3 className="groceries-name">{product.name || 'Unknown Product'}</h3>
            <div className="groceries-price-row">
              <span className="groceries-price">₹{product.price || 0}</span>
              {product.originalPrice && product.originalPrice !== product.price && (
                <span className="groceries-original-price">₹{product.originalPrice}</span>
              )}
              {product.discount && product.discount > 0 && (
                <span className="groceries-discount">{Math.round(product.discount)}% off</span>
              )}
            </div>
            <button 
              className="groceries-btn"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
          );
        }).filter(Boolean)}
      </div>
    </div>
  );
};

export default Groceries; 