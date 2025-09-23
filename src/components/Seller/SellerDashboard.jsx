import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { API_URL } from '../../config/api';
import './SellerDashboard.css';

const SellerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('status');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get seller data from navigation state or localStorage
    const sellerData = location.state?.seller || JSON.parse(localStorage.getItem('sellerData') || 'null');
    
    if (!sellerData) {
      navigate('/seller/login');
      return;
    }
    
    setSeller(sellerData);
    fetchSellerProducts(sellerData.sellerId);
    setLoading(false);
  }, [navigate, location.state]);

  const fetchSellerProducts = async (sellerId) => {
    try {
      const response = await fetch(`${API_URL}/seller/products/${sellerId}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(data.products);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('sellerData');
    navigate('/seller/login');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'status-pending', text: 'Under Review', icon: '⏳' },
      approved: { class: 'status-approved', text: 'Approved', icon: '✅' },
      rejected: { class: 'status-rejected', text: 'Rejected', icon: '❌' }
    };
    
    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`status-badge ${config.class}`}>
        <span className="status-icon">{config.icon}</span>
        {config.text}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading || !seller) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="seller-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="seller-info">
            <h1>Welcome, {seller.ownerName}</h1>
            <p className="business-name">{seller.businessName}</p>
            <p className="seller-id">Seller ID: {seller.sellerId}</p>
          </div>
          <div className="header-actions">
            {getStatusBadge(seller.status)}
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-nav">
        <button 
          className={`nav-tab ${activeTab === 'status' ? 'active' : ''}`}
          onClick={() => setActiveTab('status')}
        >
          📊 Application Status
        </button>
        <button 
          className={`nav-tab ${activeTab === 'products' ? 'active' : ''}`}
          onClick={() => setActiveTab('products')}
          disabled={seller.status !== 'approved'}
        >
          📦 My Products
        </button>
        <button 
          className={`nav-tab ${activeTab === 'upload' ? 'active' : ''}`}
          onClick={() => setActiveTab('upload')}
          disabled={seller.status !== 'approved'}
        >
          ➕ Add Product
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'status' && (
          <StatusTab seller={seller} />
        )}
        
        {activeTab === 'products' && seller.status === 'approved' && (
          <ProductsTab products={products} onRefresh={() => fetchSellerProducts(seller.sellerId)} />
        )}
        
        {activeTab === 'upload' && seller.status === 'approved' && (
          <UploadTab seller={seller} onUpload={() => fetchSellerProducts(seller.sellerId)} />
        )}
      </div>
    </div>
  );
};

// Status Tab Component
const StatusTab = ({ seller }) => (
  <div className="status-tab">
    <div className="status-card">
      <h2>Application Status</h2>
      
      <div className="status-overview">
        <div className="status-item">
          <label>Current Status:</label>
          <div>{seller.status === 'pending' && (
            <span className="status-pending">⏳ Under Review</span>
          )}
          {seller.status === 'approved' && (
            <span className="status-approved">✅ Approved - You can start selling!</span>
          )}
          {seller.status === 'rejected' && (
            <span className="status-rejected">❌ Application Rejected</span>
          )}</div>
        </div>
        
        <div className="status-item">
          <label>Submitted:</label>
          <div>{new Date(seller.createdAt).toLocaleDateString()}</div>
        </div>
        
        {seller.lastStatusUpdate && (
          <div className="status-item">
            <label>Last Updated:</label>
            <div>{new Date(seller.lastStatusUpdate).toLocaleDateString()}</div>
          </div>
        )}
        
        {seller.adminComments && (
          <div className="status-item">
            <label>Admin Comments:</label>
            <div className="admin-comments">{seller.adminComments}</div>
          </div>
        )}
      </div>
      
      {seller.status === 'pending' && (
        <div className="status-message pending-message">
          <h3>🔍 Review in Progress</h3>
          <p>Our team is currently reviewing your application. This typically takes 2-3 business days.</p>
          <ul>
            <li>We're verifying your business information</li>
            <li>Checking required documents</li>
            <li>Validating contact details</li>
          </ul>
        </div>
      )}
      
      {seller.status === 'approved' && (
        <div className="status-message approved-message">
          <h3>🎉 Congratulations!</h3>
          <p>Your seller application has been approved. You can now:</p>
          <ul>
            <li>Upload and manage your products</li>
            <li>Set your own prices and inventory</li>
            <li>Track your sales and orders</li>
          </ul>
        </div>
      )}
      
      {seller.status === 'rejected' && (
        <div className="status-message rejected-message">
          <h3>❌ Application Not Approved</h3>
          <p>Unfortunately, your application was not approved at this time.</p>
          {seller.adminComments && (
            <div className="rejection-reason">
              <strong>Reason:</strong> {seller.adminComments}
            </div>
          )}
          <p>You may submit a new application after addressing the concerns mentioned above.</p>
        </div>
      )}
    </div>
  </div>
);

// Products Tab Component
const ProductsTab = ({ products, onRefresh }) => (
  <div className="products-tab">
    <div className="products-header">
      <h2>My Products ({products.length})</h2>
      <button className="refresh-btn" onClick={onRefresh}>
        🔄 Refresh
      </button>
    </div>
    
    {products.length === 0 ? (
      <div className="empty-products">
        <div className="empty-icon">📦</div>
        <h3>No Products Yet</h3>
        <p>Start by adding your first product using the "Add Product" tab.</p>
      </div>
    ) : (
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              {product.images && product.images.length > 0 ? (
                <img src={product.images[0]} alt={product.name} />
              ) : (
                <div className="no-image">📷</div>
              )}
            </div>
            
            <div className="product-info">
              <h4>{product.name}</h4>
              <p className="product-category">{product.category}</p>
              <div className="product-price">₹{product.price}</div>
              <div className="product-stock">Stock: {product.stock}</div>
              <div className={`product-status ${product.status}`}>
                {product.status === 'pending' && '⏳ Pending Review'}
                {product.status === 'approved' && '✅ Live'}
                {product.status === 'rejected' && '❌ Rejected'}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

// Upload Tab Component
const UploadTab = ({ seller, onUpload }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    price: '',
    originalPrice: '',
    stock: '',
    brand: '',
    images: ['']
  });
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const categories = [
    'Electronics', 'Clothing', 'Home & Kitchen', 'Beauty & Personal Care',
    'Sports & Outdoors', 'Books', 'Toys & Games', 'Groceries'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({
      ...formData,
      images: newImages
    });
  };

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, '']
    });
  };

  const removeImageField = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      images: newImages.length > 0 ? newImages : ['']
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage({ type: '', text: '' });

    try {
      const productData = {
        ...formData,
        sellerId: seller.sellerId,
        images: formData.images.filter(img => img.trim() !== ''),
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        stock: parseInt(formData.stock)
      };

      const response = await fetch(`${API_URL}/seller/product`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Product uploaded successfully! It will be reviewed before going live.' });
        setFormData({
          name: '',
          description: '',
          category: '',
          subcategory: '',
          price: '',
          originalPrice: '',
          stock: '',
          brand: '',
          images: ['']
        });
        onUpload();
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to upload product' });
      }
    } catch (error) {
      console.error('Upload error:', error);
      setMessage({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="upload-tab">
      <h2>Add New Product</h2>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.type === 'success' ? '✅' : '⚠️'} {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-row">
          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter product name"
            />
          </div>
          
          <div className="form-group">
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="Enter brand name"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Describe your product..."
            rows="4"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label>Subcategory</label>
            <input
              type="text"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              placeholder="Enter subcategory"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Price (₹) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>
          
          <div className="form-group">
            <label>Original Price (₹)</label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              min="0"
              step="0.01"
              placeholder="0.00"
            />
          </div>
          
          <div className="form-group">
            <label>Stock Quantity *</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              required
              min="0"
              placeholder="0"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Product Images</label>
          {formData.images.map((image, index) => (
            <div key={index} className="image-input-group">
              <input
                type="url"
                value={image}
                onChange={(e) => handleImageChange(index, e.target.value)}
                placeholder="Enter image URL"
              />
              {formData.images.length > 1 && (
                <button
                  type="button"
                  className="remove-image-btn"
                  onClick={() => removeImageField(index)}
                >
                  ❌
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            className="add-image-btn"
            onClick={addImageField}
          >
            + Add Another Image
          </button>
        </div>

        <button 
          type="submit" 
          className="upload-btn"
          disabled={uploading}
        >
          {uploading ? (
            <span>
              <div className="spinner small"></div>
              Uploading...
            </span>
          ) : (
            'Upload Product'
          )}
        </button>
      </form>
    </div>
  );
};

export default SellerDashboard;
