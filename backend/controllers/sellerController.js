const SellerRequest = require('../models/SellerRequest');
const SellerProduct = require('../models/SellerProduct');

// POST /api/seller/apply
exports.applySeller = async (req, res) => {
  try {
    const seller = new SellerRequest(req.body);
    await seller.save();
    
    // Return credentials to frontend
    res.status(201).json({
      message: 'Seller request submitted successfully.',
      sellerId: seller.sellerCredentials.sellerId,
      credentials: {
        username: seller.sellerCredentials.username,
        password: seller.sellerCredentials.password
      },
      status: seller.status
    });
  } catch (err) {
    res.status(400).json({ message: 'Failed to submit seller request.', error: err.message });
  }
};

// POST /api/seller/login
exports.sellerLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    const seller = await SellerRequest.findOne({
      'sellerCredentials.username': username,
      'sellerCredentials.password': password
    });

    if (!seller) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.json({
      message: 'Login successful',
      seller: {
        sellerId: seller.sellerCredentials.sellerId,
        businessName: seller.businessName,
        ownerName: seller.ownerName,
        email: seller.email,
        status: seller.status,
        createdAt: seller.createdAt,
        lastStatusUpdate: seller.lastStatusUpdate,
        adminComments: seller.adminComments
      }
    });
  } catch (error) {
    console.error('Error during seller login:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/seller/status/:sellerId
exports.getSellerStatus = async (req, res) => {
  try {
    const { sellerId } = req.params;
    
    const seller = await SellerRequest.findOne({
      'sellerCredentials.sellerId': sellerId
    });

    if (!seller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    res.json({
      sellerId: seller.sellerCredentials.sellerId,
      businessName: seller.businessName,
      status: seller.status,
      submittedAt: seller.createdAt,
      lastStatusUpdate: seller.lastStatusUpdate,
      adminComments: seller.adminComments,
      reviewedBy: seller.reviewedBy,
      reviewedAt: seller.reviewedAt
    });
  } catch (error) {
    console.error('Error fetching seller status:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// POST /api/seller/product
exports.addProduct = async (req, res) => {
  try {
    const { sellerId } = req.body;
    
    // Check if seller is approved
    const seller = await SellerRequest.findOne({
      'sellerCredentials.sellerId': sellerId,
      status: 'approved'
    });

    if (!seller) {
      return res.status(403).json({ message: 'Seller not approved or not found' });
    }

    const productData = {
      ...req.body,
      sellerName: seller.businessName
    };

    const product = new SellerProduct(productData);
    await product.save();

    res.status(201).json({
      message: 'Product added successfully',
      productId: product._id,
      status: product.status
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/seller/products/:sellerId
exports.getSellerProducts = async (req, res) => {
  try {
    const { sellerId } = req.params;
    
    const products = await SellerProduct.find({ sellerId });
    
    res.json({
      products,
      total: products.length
    });
  } catch (error) {
    console.error('Error fetching seller products:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// PUT /api/seller/product/:productId
exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { sellerId } = req.body;
    
    const product = await SellerProduct.findOneAndUpdate(
      { _id: productId, sellerId },
      req.body,
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: 'Product not found or not authorized' });
    }

    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// GET /api/seller/requests (admin only)
exports.getAllSellerRequests = async (req, res) => {
  try {
    const requests = await SellerRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch seller requests.' });
  }
};
