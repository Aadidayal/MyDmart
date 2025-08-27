import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { token, user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({});
  const [sellerRequests, setSellerRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'overview') {
      fetchStats();
    } else if (activeTab === 'requests') {
      fetchSellerRequests();
    }
  }, [activeTab]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSellerRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/admin/seller-requests', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSellerRequests(data.requests);
      }
    } catch (error) {
      console.error('Error fetching seller requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveRequest = async (requestId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/seller-requests/${requestId}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        alert('Seller request approved successfully!');
        fetchSellerRequests(); // Refresh the list
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error approving request:', error);
      alert('Error approving request');
    }
  };

  const handleRejectRequest = async (requestId) => {
    const reason = prompt('Enter rejection reason:');
    if (!reason) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/seller-requests/${requestId}/reject`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ reason })
      });

      if (response.ok) {
        alert('Seller request rejected successfully!');
        fetchSellerRequests(); // Refresh the list
      } else {
        const data = await response.json();
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Error rejecting request:', error);
      alert('Error rejecting request');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'approved': return '#28a745';
      case 'rejected': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-user-info">
          <span>Welcome, {user?.name}</span>
          <span className="admin-badge">Admin</span>
        </div>
      </div>

      <div className="admin-nav">
        <button 
          className={`nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`nav-btn ${activeTab === 'requests' ? 'active' : ''}`}
          onClick={() => setActiveTab('requests')}
        >
          Seller Requests
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'overview' && (
          <div className="overview-section">
            <h2>Dashboard Overview</h2>
            {loading ? (
              <div className="loading">Loading stats...</div>
            ) : (
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total Users</h3>
                  <div className="stat-number">{stats.totalUsers || 0}</div>
                </div>
                <div className="stat-card">
                  <h3>Total Seller Requests</h3>
                  <div className="stat-number">{stats.totalRequests || 0}</div>
                </div>
                <div className="stat-card pending">
                  <h3>Pending Requests</h3>
                  <div className="stat-number">{stats.pendingRequests || 0}</div>
                </div>
                <div className="stat-card approved">
                  <h3>Approved Requests</h3>
                  <div className="stat-number">{stats.approvedRequests || 0}</div>
                </div>
                <div className="stat-card rejected">
                  <h3>Rejected Requests</h3>
                  <div className="stat-number">{stats.rejectedRequests || 0}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'requests' && (
          <div className="requests-section">
            <h2>Seller Requests</h2>
            {loading ? (
              <div className="loading">Loading requests...</div>
            ) : (
              <div className="requests-list">
                {sellerRequests.length === 0 ? (
                  <div className="no-requests">No seller requests found</div>
                ) : (
                  sellerRequests.map((request) => (
                    <div key={request._id} className="request-card">
                      <div className="request-header">
                        <div className="request-info">
                          <h3>{request.businessName}</h3>
                          <p>{request.fullName} • {request.email}</p>
                        </div>
                        <div 
                          className="status-badge"
                          style={{ backgroundColor: getStatusColor(request.status) }}
                        >
                          {request.status}
                        </div>
                      </div>
                      
                      <div className="request-details">
                        <div className="business-info-section">
                          <h4>📋 Business Information</h4>
                          <div className="info-grid">
                            <div className="info-item">
                              <span className="label">Owner Name:</span>
                              <span className="value">{request.ownerName}</span>
                            </div>
                            <div className="info-item">
                              <span className="label">Business Type:</span>
                              <span className="value">{request.businessType}</span>
                            </div>
                            <div className="info-item">
                              <span className="label">GST Number:</span>
                              <span className="value">{request.gst}</span>
                            </div>
                            <div className="info-item">
                              <span className="label">PAN Number:</span>
                              <span className="value">{request.pan}</span>
                            </div>
                          </div>
                        </div>

                        <div className="contact-info-section">
                          <h4>📞 Contact Information</h4>
                          <div className="info-grid">
                            <div className="info-item">
                              <span className="label">Email:</span>
                              <span className="value">{request.email}</span>
                            </div>
                            <div className="info-item">
                              <span className="label">Phone:</span>
                              <span className="value">{request.phone}</span>
                            </div>
                            <div className="info-item full-width">
                              <span className="label">Address:</span>
                              <span className="value">{request.address}</span>
                            </div>
                            {request.website && (
                              <div className="info-item full-width">
                                <span className="label">Website:</span>
                                <span className="value">
                                  <a href={request.website} target="_blank" rel="noopener noreferrer">
                                    {request.website}
                                  </a>
                                </span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="product-info-section">
                          <h4>🛍️ Product Information</h4>
                          <div className="info-grid">
                            <div className="info-item full-width">
                              <span className="label">Product Categories:</span>
                              <span className="value categories-list">{request.productCategories}</span>
                            </div>
                            {request.description && (
                              <div className="info-item full-width">
                                <span className="label">Business Description:</span>
                                <span className="value description-text">{request.description}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="timeline-section">
                          <h4>⏰ Request Timeline</h4>
                          <div className="timeline-item">
                            <span className="timeline-label">Submitted:</span>
                            <span className="timeline-value">{formatDate(request.createdAt)}</span>
                          </div>
                          {request.lastStatusUpdate !== request.createdAt && (
                            <div className="timeline-item">
                              <span className="timeline-label">Last Updated:</span>
                              <span className="timeline-value">{formatDate(request.lastStatusUpdate)}</span>
                            </div>
                          )}
                          {request.reviewedAt && (
                            <div className="timeline-item">
                              <span className="timeline-label">Reviewed:</span>
                              <span className="timeline-value">{formatDate(request.reviewedAt)}</span>
                            </div>
                          )}
                          {request.reviewedBy && (
                            <div className="timeline-item">
                              <span className="timeline-label">Reviewed By:</span>
                              <span className="timeline-value">{request.reviewedBy}</span>
                            </div>
                          )}
                        </div>

                        {request.adminComments && (
                          <div className="admin-comments-section">
                            <h4>💬 Admin Comments</h4>
                            <div className="admin-comments">
                              {request.adminComments}
                            </div>
                          </div>
                        )}

                        {request.sellerCredentials && (
                          <div className="credentials-info">
                            <h4>🔑 Generated Seller Credentials</h4>
                            <div className="credentials-grid">
                              <div className="credential-item">
                                <span className="credential-label">Seller ID:</span>
                                <span className="credential-value">{request.sellerCredentials.sellerId}</span>
                              </div>
                              <div className="credential-item">
                                <span className="credential-label">Username:</span>
                                <span className="credential-value">{request.sellerCredentials.username}</span>
                              </div>
                              <div className="credential-item">
                                <span className="credential-label">Password:</span>
                                <span className="credential-value">{request.sellerCredentials.password}</span>
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {request.rejectionReason && (
                          <div className="rejection-reason">
                            <h4>❌ Rejection Reason</h4>
                            <p>{request.rejectionReason}</p>
                          </div>
                        )}
                      </div>

                      {request.status === 'pending' && (
                        <div className="request-actions">
                          <button 
                            className="approve-btn"
                            onClick={() => handleApproveRequest(request._id)}
                          >
                            Approve
                          </button>
                          <button 
                            className="reject-btn"
                            onClick={() => handleRejectRequest(request._id)}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
