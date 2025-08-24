import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SellerSuccess.css';

const SellerSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { credentials, sellerId, businessName } = location.state || {};

  if (!credentials) {
    navigate('/seller');
    return null;
  }

  const handleLoginRedirect = () => {
    navigate('/seller/login');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="seller-success-container">
      <div className="seller-success-card">
        <div className="success-header">
          <div className="success-icon">✅</div>
          <h1>Registration Successful!</h1>
          <p>Your seller request has been submitted successfully.</p>
        </div>

        <div className="credentials-section">
          <h2>Your Seller Credentials</h2>
          <p className="credentials-note">
            Please save these credentials securely. You'll need them to log in to your seller portal.
          </p>
          
          <div className="credential-item">
            <label>Seller ID:</label>
            <div className="credential-value">
              <span>{sellerId}</span>
              <button 
                className="copy-btn"
                onClick={() => copyToClipboard(sellerId)}
                title="Copy to clipboard"
              >
                📋
              </button>
            </div>
          </div>

          <div className="credential-item">
            <label>Username:</label>
            <div className="credential-value">
              <span>{credentials.username}</span>
              <button 
                className="copy-btn"
                onClick={() => copyToClipboard(credentials.username)}
                title="Copy to clipboard"
              >
                📋
              </button>
            </div>
          </div>

          <div className="credential-item">
            <label>Password:</label>
            <div className="credential-value">
              <span>{credentials.password}</span>
              <button 
                className="copy-btn"
                onClick={() => copyToClipboard(credentials.password)}
                title="Copy to clipboard"
              >
                📋
              </button>
            </div>
          </div>
        </div>

        <div className="next-steps">
          <h3>What's Next?</h3>
          <div className="steps-list">
            <div className="step">
              <span className="step-number">1</span>
              <div className="step-content">
                <strong>Review Process</strong>
                <p>Our team will review your application within 2-3 business days.</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">2</span>
              <div className="step-content">
                <strong>Status Updates</strong>
                <p>Use your credentials to check your application status anytime.</p>
              </div>
            </div>
            <div className="step">
              <span className="step-number">3</span>
              <div className="step-content">
                <strong>Start Selling</strong>
                <p>Once approved, you can start uploading and managing your products.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className="login-btn primary"
            onClick={handleLoginRedirect}
          >
            Go to Seller Login
          </button>
          <button 
            className="home-btn secondary"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>

        <div className="warning-message">
          <div className="warning-icon">⚠️</div>
          <p>
            <strong>Important:</strong> Please save these credentials in a secure location. 
            We won't show them again for security reasons.
          </p>
        </div>

        <div className="access-info">
          <div className="info-icon">💡</div>
          <div className="info-content">
            <h4>How to Access Your Seller Portal Later:</h4>
            <p>You can always access your seller portal using the <strong>"Seller Login"</strong> button in the header of our website. Use your credentials to check your status and manage products once approved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSuccess;
