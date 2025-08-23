import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../context/AuthContext';

const ProductCard = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      setIsLoading(true);
      await onAddToCart({ ...product, quantity });
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <button
          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
          onClick={() => {/* Handle wishlist */}}
        >
          <FontAwesomeIcon icon={faHeart} className="text-gray-600" />
        </button>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        
        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={faStar}
                className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600">({product.reviews} reviews)</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
            {product.discount > 0 && (
              <span className="ml-2 text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
            )}
          </div>
          {product.discount > 0 && (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {product.discount}% off
            </span>
          )}
        </div>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center border rounded">
            <button
              className="px-3 py-1 hover:bg-gray-100"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </button>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-12 text-center border-x py-1 focus:outline-none"
            />
            <button
              className="px-3 py-1 hover:bg-gray-100"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        <button
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;