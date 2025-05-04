import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faArrowRight, 
  faHome, 
  faLaptop, 
  faSparkles,
  faStar,
  faTruck
} from '@fortawesome/free-solid-svg-icons';
import './CategoryProducts.css';

const CategoryProducts = () => {
  const homeKitchenProducts = [
    {
      id: 1,
      name: 'Premium Non-Stick Cookware Set',
      price: 2499,
      originalPrice: 3999,
      discount: '38% off',
      image: 'https://images.unsplash.com/photo-1584990347449-b7abbb0bbec7?ixlib=rb-4.0.3',
      rating: 4.5,
      reviews: 128,
      freeDelivery: true
    },
    {
      id: 2,
      name: 'Stainless Steel Mixing Bowls Set',
      price: 899,
      originalPrice: 1499,
      discount: '40% off',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3',
      rating: 4.7,
      reviews: 95,
      freeDelivery: true
    },
    {
      id: 3,
      name: 'Electric Kettle with Temperature Control',
      price: 1999,
      originalPrice: 2999,
      discount: '33% off',
      image: 'https://images.unsplash.com/photo-1608039829574-327d29c5d5c8?ixlib=rb-4.0.3',
      rating: 4.6,
      reviews: 210,
      freeDelivery: true
    },
    {
      id: 4,
      name: 'Ceramic Dinnerware Set',
      price: 1799,
      originalPrice: 2499,
      discount: '28% off',
      image: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3',
      rating: 4.8,
      reviews: 156,
      freeDelivery: true
    },
    {
      id: 5,
      name: 'Professional Chef Knife Set',
      price: 3499,
      originalPrice: 4999,
      discount: '30% off',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3',
      rating: 4.9,
      reviews: 89,
      freeDelivery: true
    }
  ];

  const beautyProducts = [
    {
      id: 1,
      name: 'Natural Skincare Set',
      price: 1299,
      originalPrice: 1999,
      discount: '35% off',
      image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3',
      rating: 4.7,
      reviews: 245,
      freeDelivery: true
    },
    {
      id: 2,
      name: 'Organic Hair Care Bundle',
      price: 1599,
      originalPrice: 2299,
      discount: '30% off',
      image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?ixlib=rb-4.0.3',
      rating: 4.8,
      reviews: 178,
      freeDelivery: true
    },
    {
      id: 3,
      name: 'Luxury Makeup Kit',
      price: 2999,
      originalPrice: 3999,
      discount: '25% off',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3',
      rating: 4.6,
      reviews: 312,
      freeDelivery: true
    },
    {
      id: 4,
      name: 'Facial Care Essentials',
      price: 899,
      originalPrice: 1299,
      discount: '31% off',
      image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3',
      rating: 4.5,
      reviews: 167,
      freeDelivery: true
    }
  ];

  const electronicsProducts = [
    {
      id: 1,
      name: 'Wireless Noise Cancelling Headphones',
      price: 4999,
      originalPrice: 7999,
      discount: '38% off',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3',
      rating: 4.6,
      reviews: 352,
      freeDelivery: true
    },
    {
      id: 2,
      name: 'Smart Watch with Health Tracking',
      price: 3999,
      originalPrice: 5999,
      discount: '33% off',
      image: 'https://images.unsplash.com/photo-1545579133-99bb5ab189bd?ixlib=rb-4.0.3',
      rating: 4.7,
      reviews: 289,
      freeDelivery: true
    },
    {
      id: 3,
      name: 'Portable Bluetooth Speaker',
      price: 1999,
      originalPrice: 2999,
      discount: '33% off',
      image: 'https://images.unsplash.com/photo-1606220588911-5117e7648a6a?ixlib=rb-4.0.3',
      rating: 4.5,
      reviews: 156,
      freeDelivery: true
    },
    {
      id: 4,
      name: 'Wireless Earbuds Pro',
      price: 2999,
      originalPrice: 4499,
      discount: '33% off',
      image: 'https://images.unsplash.com/photo-1606220588911-5117e7648a6a?ixlib=rb-4.0.3',
      rating: 4.8,
      reviews: 421,
      freeDelivery: true
    },
    {
      id: 5,
      name: 'Tablet with Stylus',
      price: 12999,
      originalPrice: 15999,
      discount: '19% off',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3',
      rating: 4.7,
      reviews: 198,
      freeDelivery: true
    }
  ];

  const renderRatingStars = (rating) => {
    return (
      <div className="rating-stars">
        {[...Array(5)].map((_, index) => (
          <FontAwesomeIcon 
            key={index}
            icon={faStar}
            style={{ color: index < rating ? '#f9c74f' : '#ddd' }}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Home & Kitchen Section */}
      <section className="category-section">
        <div className="category-header">
          <h2>
            <FontAwesomeIcon icon={faHome} className="category-icon" />
            Home & Kitchen
          </h2>
          <Link to="/category/home-kitchen" className="view-all">
            View All <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
        <div className="products-row home-kitchen-grid">
          {homeKitchenProducts.map(product => (
            <div key={product.id} className="home-kitchen-card">
              <img 
                src={product.image} 
                alt={product.name} 
                className="home-kitchen-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <div className="product-price">
                <span className="product-original-price">₹{product.originalPrice}</span>
                <span>₹{product.price}</span>
                <span className="product-discount">{product.discount}</span>
              </div>
              {product.freeDelivery && (
                <div className="free-delivery-badge">
                  <FontAwesomeIcon icon={faTruck} />
                  Free Delivery
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Beauty & Personal Care Section */}
      <section className="category-section">
        <div className="category-header">
          <h2>
            <FontAwesomeIcon icon={faSparkles} className="category-icon" />
            Beauty & Personal Care
          </h2>
          <Link to="/category/beauty" className="view-all">
            View All <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
        <div className="products-row beauty-care-grid">
          {beautyProducts.map(product => (
            <div key={product.id} className="beauty-care-card">
              <img 
                src={product.image} 
                alt={product.name} 
                className="beauty-care-image"
              />
              <div className="beauty-care-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                  <span className="product-original-price">₹{product.originalPrice}</span>
                  <span>₹{product.price}</span>
                  <span className="product-discount">{product.discount}</span>
                </div>
                <div className="product-rating">
                  {renderRatingStars(product.rating)}
                  <span>({product.reviews})</span>
                </div>
                {product.freeDelivery && (
                  <div className="free-delivery-badge">
                    <FontAwesomeIcon icon={faTruck} />
                    Free Delivery
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Electronics Section */}
      <section className="category-section">
        <div className="category-header">
          <h2>
            <FontAwesomeIcon icon={faLaptop} className="category-icon" />
            Electronics
          </h2>
          <Link to="/category/electronics" className="view-all">
            View All <FontAwesomeIcon icon={faArrowRight} />
          </Link>
        </div>
        <div className="products-row electronics-grid">
          {electronicsProducts.map(product => (
            <div key={product.id} className="electronics-card">
              <img 
                src={product.image} 
                alt={product.name} 
                className="electronics-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <div className="product-price">
                <span className="product-original-price">₹{product.originalPrice}</span>
                <span>₹{product.price}</span>
                <span className="product-discount">{product.discount}</span>
              </div>
              <div className="product-rating">
                {renderRatingStars(product.rating)}
                <span>({product.reviews})</span>
              </div>
              {product.freeDelivery && (
                <div className="free-delivery-badge">
                  <FontAwesomeIcon icon={faTruck} />
                  Free Delivery
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default CategoryProducts; 