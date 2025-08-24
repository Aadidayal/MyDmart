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
  
  // Seller Credentials and Status
  sellerCredentials: {
    username: {
      type: String,
      unique: true,
      sparse: true
    },
    password: {
      type: String
    },
    sellerId: {
      type: String,
      unique: true,
      sparse: true
    }
  },

  // Request Status
  status: { 
    type: String, 
    enum: ['pending', 'under_review', 'approved', 'rejected'],
    default: 'pending' 
  },

  // Admin Review
  adminComments: {
    type: String,
    default: ''
  },
  reviewedBy: {
    type: String,
    default: ''
  },
  reviewedAt: {
    type: Date
  },

  createdAt: { type: Date, default: Date.now },
  lastStatusUpdate: { type: Date, default: Date.now }
});

// Generate seller credentials before saving
SellerRequestSchema.pre('save', function(next) {
  if (this.isNew && !this.sellerCredentials.username) {
    const timestamp = Date.now().toString().slice(-6);
    const businessInitials = this.businessName.substring(0, 3).toUpperCase();
    this.sellerCredentials.username = `SELL${businessInitials}${timestamp}`;
    this.sellerCredentials.password = this.generatePassword();
    this.sellerCredentials.sellerId = `DMT${timestamp}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  }
  next();
});

// Method to generate random password
SellerRequestSchema.methods.generatePassword = function() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

module.exports = mongoose.model('SellerRequest', SellerRequestSchema);
