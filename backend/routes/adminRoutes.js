const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getAllSellerRequests,
  approveSellerRequest,
  rejectSellerRequest,
  getAdminStats,
  makeUserAdmin
} = require('../controllers/adminController');

// Debug route to check user info
router.get('/check-user', auth, (req, res) => {
  res.json({
    message: 'User authenticated successfully',
    user: req.user,
    isAdmin: req.user.role === 'admin'
  });
});

// Get all seller requests (Admin only)
router.get('/seller-requests', auth, getAllSellerRequests);

// Approve seller request (Admin only)
router.put('/seller-requests/:requestId/approve', auth, approveSellerRequest);

// Reject seller request (Admin only)
router.put('/seller-requests/:requestId/reject', auth, rejectSellerRequest);

// Get admin dashboard stats
router.get('/stats', auth, getAdminStats);

// Make user admin (Development route - remove in production)
router.post('/make-admin', makeUserAdmin);

module.exports = router;
