const express = require('express');
const router = express.Router();
const sellerController = require('../controllers/sellerController');

// Seller application
router.post('/apply', sellerController.applySeller);

// Seller login
router.post('/login', sellerController.sellerLogin);

// Get seller status
router.get('/status/:sellerId', sellerController.getSellerStatus);

// Product management
router.post('/product', sellerController.addProduct);
router.get('/products/:sellerId', sellerController.getSellerProducts);
router.put('/product/:productId', sellerController.updateProduct);

// Admin: get all seller requests
router.get('/requests', sellerController.getAllSellerRequests);

module.exports = router;
