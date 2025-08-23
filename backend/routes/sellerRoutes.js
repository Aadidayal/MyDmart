const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');

// Seller application
router.post('/apply', sellerController.applySeller);

// Admin: get all seller requests
router.get('/requests', sellerController.getAllSellerRequests);

module.exports = router;
