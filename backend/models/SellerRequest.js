const mongoose = require('mongoose');

const SellerRequestSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  businessType: { type: String, required: true },
  address: { type: String, required: true },
  gst: { type: String, required: true },
  pan: { type: String, required: true },
  productCategories: { type: String, required: true },
  description: { type: String },
  website: { type: String },
  agree: { type: Boolean, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SellerRequest', SellerRequestSchema);
