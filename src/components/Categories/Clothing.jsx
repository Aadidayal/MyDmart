import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Clothing.css';

const Clothing = ({ onAddToCart }) => {
  const [sortBy, setSortBy] = useState('default');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClothingProducts = async () => {
      try {
        setLoading(true);
        // Use the actual Clothing category ObjectId from the database
        const response = await axios.get('http://localhost:5000/api/products/category/68a217ef46a3642ac769d993');
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch clothing products');
        console.error('Error fetching clothing products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchClothingProducts();
  }, []);

  const handleAddToCart = (product) => {
    onAddToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl || product.images?.[0],
      quantity: 1
    });
  };

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return (a.price || 0) - (b.price || 0);
      case 'price-high':
        return (b.price || 0) - (a.price || 0);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <div className="clothing-category-page">
        <h2 className="category-title">Clothing</h2>
        <div className="loading">Loading clothing products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="clothing-category-page">
        <h2 className="category-title">Clothing</h2>
        <div className="error">Error: {error}</div>
      </div>
    );
  }

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
        {sortedProducts.length === 0 ? (
          <div className="no-products">No clothing products available</div>
        ) : (
          sortedProducts.map(product => {
            // Ensure product has required fields
            if (!product || !product._id) {
              console.warn('Invalid product data:', product);
              return null;
            }
            
            return (
              <div key={product._id} className="clothing-card">
                <img 
                  src={product.imageUrl || product.images?.[0] || 'https://via.placeholder.com/300x300?text=No+Image'} 
                  alt={product.name || 'Product'} 
                  className="clothing-image" 
                />
                <h3 className="clothing-name">{product.name || 'Unknown Product'}</h3>
                <div className="clothing-price-row">
                  <span className="clothing-price">₹{product.price || 0}</span>
                  {product.originalPrice && product.originalPrice !== product.price && (
                    <span className="clothing-original-price">₹{product.originalPrice}</span>
                  )}
                  {product.discount && product.discount > 0 && (
                    <span className="clothing-discount">{Math.round(product.discount)}% off</span>
                  )}
                </div>
                <button 
                  className="clothing-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            );
          }).filter(Boolean)
        )}
      </div>
    </div>
  );
};

export default Clothing; 