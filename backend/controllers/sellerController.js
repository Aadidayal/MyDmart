const SellerRequest = require('../models/SellerRequest');

// POST /api/seller/apply
exports.applySeller = async (req, res) => {
  try {
    const seller = new SellerRequest(req.body);
    await seller.save();
    res.status(201).json({ message: 'Seller request submitted successfully.' });
  } catch (err) {
    res.status(400).json({ message: 'Failed to submit seller request.', error: err.message });
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
