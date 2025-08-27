const SellerRequest = require('../models/SellerRequest');
const User = require('../models/User');

// Get all seller requests (Admin only)
const getAllSellerRequests = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const requests = await SellerRequest.find().sort({ createdAt: -1 });
    res.json({ requests });
  } catch (error) {
    console.error('Get seller requests error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Approve seller request (Admin only)
const approveSellerRequest = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { requestId } = req.params;
    
    const request = await SellerRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Seller request not found' });
    }

    if (request.status === 'approved') {
      return res.status(400).json({ message: 'Request already approved' });
    }

    // Update request status
    request.status = 'approved';
    await request.save();

    res.json({ 
      message: 'Seller request approved successfully',
      request 
    });
  } catch (error) {
    console.error('Approve seller request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reject seller request (Admin only)
const rejectSellerRequest = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const { requestId } = req.params;
    const { reason } = req.body;
    
    const request = await SellerRequest.findById(requestId);
    if (!request) {
      return res.status(404).json({ message: 'Seller request not found' });
    }

    if (request.status === 'rejected') {
      return res.status(400).json({ message: 'Request already rejected' });
    }

    // Update request status
    request.status = 'rejected';
    request.rejectionReason = reason || 'No reason provided';
    await request.save();

    res.json({ 
      message: 'Seller request rejected successfully',
      request 
    });
  } catch (error) {
    console.error('Reject seller request error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get admin dashboard stats
const getAdminStats = async (req, res) => {
  try {
    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    const [
      totalRequests,
      pendingRequests,
      approvedRequests,
      rejectedRequests,
      totalUsers
    ] = await Promise.all([
      SellerRequest.countDocuments(),
      SellerRequest.countDocuments({ status: 'pending' }),
      SellerRequest.countDocuments({ status: 'approved' }),
      SellerRequest.countDocuments({ status: 'rejected' }),
      User.countDocuments()
    ]);

    res.json({
      stats: {
        totalRequests,
        pendingRequests,
        approvedRequests,
        rejectedRequests,
        totalUsers
      }
    });
  } catch (error) {
    console.error('Get admin stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Make user admin (Super admin function - for development)
const makeUserAdmin = async (req, res) => {
  try {
    const { email } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = 'admin';
    await user.save();

    res.json({ 
      message: `User ${email} is now an admin`,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Make user admin error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAllSellerRequests,
  approveSellerRequest,
  rejectSellerRequest,
  getAdminStats,
  makeUserAdmin
};
