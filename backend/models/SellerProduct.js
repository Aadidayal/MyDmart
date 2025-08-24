const mongoose = require('mongoose');

const SellerProductSchema = new mongoose.Schema({
  // Product Basic Information
  productName: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['electronics', 'clothing', 'home_kitchen', 'beauty_care', 'sports_outdoors', 'books', 'groceries']
  },
  subcategory: { type: String },
  brand: { type: String, required: true },
  model: { type: String },

  // Pricing and Inventory
  price: { type: Number, required: true },
  costPrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  stock: { type: Number, required: true },
  minStock: { type: Number, default: 5 },

  // Product Details
  specifications: [{
    name: String,
    value: String
  }],
  features: [String],
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    weight: Number,
    unit: { type: String, default: 'cm' }
  },

  // Images and Media
  images: [{
    url: String,
    isMain: { type: Boolean, default: false },
    alt: String
  }],
  videos: [String],

  // Seller Information
  sellerId: { type: String, required: true },
  sellerName: { type: String, required: true },

  // Product Status
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'active', 'inactive'],
    default: 'pending'
  },
  
  // Admin Review
  adminComments: { type: String, default: '' },
  reviewedBy: { type: String, default: '' },
  reviewedAt: { type: Date },

  // SEO and Marketing
  tags: [String],
  seoTitle: String,
  seoDescription: String,

  // Shipping
  shippingInfo: {
    weight: Number,
    dimensions: {
      length: Number,
      width: Number,
      height: Number
    },
    freeShipping: { type: Boolean, default: false },
    shippingCharge: { type: Number, default: 0 }
  },

  // Analytics
  views: { type: Number, default: 0 },
  orders: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  approvedAt: { type: Date }
});

// Update the updatedAt field before saving
SellerProductSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('SellerProduct', SellerProductSchema);
