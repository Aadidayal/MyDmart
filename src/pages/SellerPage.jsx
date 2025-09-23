import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaStore, FaUserTie, FaEnvelope, FaPhone, FaBuilding, FaMapMarkerAlt, FaIdCard, FaBoxes, FaGlobe, FaInfoCircle, FaCheckCircle, FaTruck, FaChartLine, FaHandshake } from 'react-icons/fa';
import { GiArchiveRegister } from 'react-icons/gi';
import { API_URL } from '../config/api';
import './SellerPage.css';

const SellerPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [form, setForm] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    businessType: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gst: '',
    pan: '',
    productCategories: [],
    description: '',
    website: '',
    bankAccount: '',
    ifsc: '',
    agree: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    'Groceries & Food', 'Electronics & Gadgets', 'Clothing & Fashion', 
    'Home & Kitchen', 'Beauty & Personal Care', 'Sports & Outdoors',
    'Books & Stationery', 'Toys & Games', 'Automotive', 'Health & Wellness'
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'productCategories') {
      const updatedCategories = checked 
        ? [...form.productCategories, value]
        : form.productCategories.filter(cat => cat !== value);
      setForm(prev => ({ ...prev, productCategories: updatedCategories }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/seller/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          productCategories: form.productCategories.join(', ')
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.message || 'Failed to submit request');
      
      // Redirect to success page with credentials
      navigate('/seller/success', {
        state: {
          credentials: data.credentials,
          sellerId: data.sellerId,
          businessName: form.businessName
        }
      });
    } catch (err) {
      setError(err.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="seller-page">
        <div className="success-container">
          <div className="success-animation">
            <FaCheckCircle size={80} color="#4BB543" />
          </div>
          <h2>Application Submitted Successfully!</h2>
          <p>Thank you for your interest in becoming a Dmart selling partner. Our team will review your application and contact you within 2-3 business days.</p>
          <div className="next-steps">
            <h3>What happens next?</h3>
            <ul>
              <li>📋 Application review (1-2 days)</li>
              <li>📞 Verification call from our team</li>
              <li>✅ Account setup and onboarding</li>
              <li>🚀 Start selling on Dmart!</li>
            </ul>
          </div>
          <button onClick={() => window.location.href = '/'} className="back-home-btn">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="seller-page-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <FaStore size={60} color="#f0c14b" />
          <h1>Become a Dmart Selling Partner</h1>
          <p>Join thousands of successful sellers and grow your business with India's fastest-growing marketplace</p>
          <div className="benefits-grid">
            <div className="benefit-item">
              <FaTruck size={24} color="#f0c14b" />
              <span>Free Logistics</span>
            </div>
            <div className="benefit-item">
              <FaChartLine size={24} color="#f0c14b" />
              <span>Growth Analytics</span>
            </div>
            <div className="benefit-item">
              <FaHandshake size={24} color="#f0c14b" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Application Form */}
      <div className="application-section">
        <div className="form-container">
          <h2>Seller Registration Form</h2>
          <form className="seller-form" onSubmit={handleSubmit}>
            
            {/* Business Information */}
            <div className="form-section">
              <h3><FaBuilding /> Business Information</h3>
              <div className="input-grid">
                <div className="input-group">
                  <label>
                    <FaBuilding className="input-icon" />
                    Business Name *
                  </label>
                  <input 
                    name="businessName" 
                    value={form.businessName} 
                    onChange={handleChange} 
                    required 
                    placeholder="Enter your business name"
                  />
                </div>
                <div className="input-group">
                  <label>
                    <FaUserTie className="input-icon" />
                    Owner/Contact Name *
                  </label>
                  <input 
                    name="ownerName" 
                    value={form.ownerName} 
                    onChange={handleChange} 
                    required 
                    placeholder="Enter owner's full name"
                  />
                </div>
              </div>
              
              <div className="input-group">
                <label>
                  <FaBuilding className="input-icon" />
                  Business Type *
                </label>
                <select name="businessType" value={form.businessType} onChange={handleChange} required>
                  <option value="">Select Business Type</option>
                  <option value="proprietorship">Sole Proprietorship</option>
                  <option value="partnership">Partnership</option>
                  <option value="private_limited">Private Limited Company</option>
                  <option value="public_limited">Public Limited Company</option>
                  <option value="llp">Limited Liability Partnership (LLP)</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Contact Information */}
            <div className="form-section">
              <h3><FaEnvelope /> Contact Information</h3>
              <div className="input-grid">
                <div className="input-group">
                  <label>
                    <FaEnvelope className="input-icon" />
                    Email Address *
                  </label>
                  <input 
                    name="email" 
                    type="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    required 
                    placeholder="business@example.com"
                  />
                </div>
                <div className="input-group">
                  <label>
                    <FaPhone className="input-icon" />
                    Phone Number *
                  </label>
                  <input 
                    name="phone" 
                    type="tel" 
                    value={form.phone} 
                    onChange={handleChange} 
                    required 
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="form-section">
              <h3><FaMapMarkerAlt /> Business Address</h3>
              <div className="input-group">
                <label>
                  <FaMapMarkerAlt className="input-icon" />
                  Complete Address *
                </label>
                <textarea 
                  name="address" 
                  value={form.address} 
                  onChange={handleChange} 
                  required 
                  placeholder="Building name, street, area"
                  rows="3"
                />
              </div>
              <div className="input-grid">
                <div className="input-group">
                  <label>City *</label>
                  <input 
                    name="city" 
                    value={form.city} 
                    onChange={handleChange} 
                    required 
                    placeholder="City"
                  />
                </div>
                <div className="input-group">
                  <label>State *</label>
                  <input 
                    name="state" 
                    value={form.state} 
                    onChange={handleChange} 
                    required 
                    placeholder="State"
                  />
                </div>
                <div className="input-group">
                  <label>PIN Code *</label>
                  <input 
                    name="pincode" 
                    value={form.pincode} 
                    onChange={handleChange} 
                    required 
                    placeholder="000000"
                    pattern="[0-9]{6}"
                  />
                </div>
              </div>
            </div>

            {/* Legal Documents */}
            <div className="form-section">
              <h3><FaIdCard /> Legal Documents</h3>
              <div className="input-grid">
                <div className="input-group">
                  <label>
                    <FaIdCard className="input-icon" />
                    GST Number *
                  </label>
                  <input 
                    name="gst" 
                    value={form.gst} 
                    onChange={handleChange} 
                    required 
                    placeholder="22AAAAA0000A1Z5"
                    pattern="[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}"
                  />
                </div>
                <div className="input-group">
                  <label>
                    <FaIdCard className="input-icon" />
                    PAN Number *
                  </label>
                  <input 
                    name="pan" 
                    value={form.pan} 
                    onChange={handleChange} 
                    required 
                    placeholder="AAAAA0000A"
                    pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                  />
                </div>
              </div>
            </div>

            {/* Product Categories */}
            <div className="form-section">
              <h3><FaBoxes /> Product Categories</h3>
              <p className="section-description">Select the categories you want to sell in:</p>
              <div className="categories-grid">
                {categories.map(category => (
                  <label key={category} className="category-checkbox">
                    <input
                      type="checkbox"
                      name="productCategories"
                      value={category}
                      checked={form.productCategories.includes(category)}
                      onChange={handleChange}
                    />
                    {category}
                  </label>
                ))}
              </div>
            </div>

            {/* Business Details */}
            <div className="form-section">
              <h3><FaInfoCircle /> Business Details</h3>
              <div className="input-group">
                <label>
                  <FaInfoCircle className="input-icon" />
                  Business Description
                </label>
                <textarea 
                  name="description" 
                  value={form.description} 
                  onChange={handleChange} 
                  placeholder="Tell us about your business, products, and experience"
                  rows="4"
                />
              </div>
              <div className="input-group">
                <label>
                  <FaGlobe className="input-icon" />
                  Website (Optional)
                </label>
                <input 
                  name="website" 
                  value={form.website} 
                  onChange={handleChange} 
                  placeholder="https://www.yourwebsite.com"
                />
              </div>
            </div>

            {/* Banking Details */}
            <div className="form-section">
              <h3>💳 Banking Information</h3>
              <div className="input-grid">
                <div className="input-group">
                  <label>Bank Account Number *</label>
                  <input 
                    name="bankAccount" 
                    value={form.bankAccount} 
                    onChange={handleChange} 
                    required 
                    placeholder="Enter account number"
                  />
                </div>
                <div className="input-group">
                  <label>IFSC Code *</label>
                  <input 
                    name="ifsc" 
                    value={form.ifsc} 
                    onChange={handleChange} 
                    required 
                    placeholder="ABCD0123456"
                    pattern="[A-Z]{4}0[A-Z0-9]{6}"
                  />
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="form-section">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  name="agree" 
                  checked={form.agree} 
                  onChange={handleChange} 
                  required 
                />
                <span className="checkmark"></span>
                I agree to the <a href="#" target="_blank">Terms and Conditions</a> and <a href="#" target="_blank">Seller Policy</a>
              </label>
            </div>

            {error && <div className="error-message">{error}</div>}
            
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? (
                <>
                  <div className="spinner"></div>
                  Processing Application...
                </>
              ) : (
                <>
                  <GiArchiveRegister size={20} />
                  Submit Application
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
