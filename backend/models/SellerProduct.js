const mongoose = require('mongoose');

const SellerProductSchema = new mongoose.Schema({
  // Product Basic Information
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true
  },
  subcategory: { type: String },
  brand: { type: String },

  // Pricing and Inventory
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discount: { 
    type: Number, 
    default: function() {
      if (this.originalPrice && this.originalPrice > this.price) {
        return Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
      }
      return 0;
    }
  },
  stock: { type: Number, required: true },

  // Images - Simple array of URLs to match frontend
  images: [{ type: String }],

  // Seller Information
  sellerId: { type: String, required: true },
  sellerName: { type: String, required: true },

  // Product Status
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  
  // Admin Review
  adminComments: { type: String, default: '' },
  reviewedBy: { type: String, default: '' },
  reviewedAt: { type: Date },

  // For compatibility with main product structure
  imageUrl: { 
    type: String,
    default: function() {
      return this.images && this.images.length > 0 ? this.images[0] : '';
    }
  },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },

  // Map category to categoryId for compatibility
  categoryId: {
    type: String,
    default: function() {
      const categoryMap = {
        'Groceries': '1',
        'Electronics': '2', 
        'Clothing': '3',
        'Home & Kitchen': '4',
        'Beauty & Personal Care': '5',
        'Sports & Outdoors': '6'
      };
      return categoryMap[this.category] || '1';
    }
  },

  // Timestamps
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  approvedAt: { type: Date }
});

// Update the updatedAt field before saving
SellerProductSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  
  // Set imageUrl to first image if not set
  if (this.images && this.images.length > 0 && !this.imageUrl) {
    this.imageUrl = this.images[0];
  }
  
  // Calculate discount if originalPrice is provided
  if (this.originalPrice && this.originalPrice > this.price) {
    this.discount = Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  
  // Set categoryId based on category
  const categoryMap = {
    'Groceries': '1',
    'Electronics': '2', 
    'Clothing': '3',
    'Home & Kitchen': '4',
    'Beauty & Personal Care': '5',
    'Sports & Outdoors': '6'
  };
  this.categoryId = categoryMap[this.category] || '1';
  
  next();
});

module.exports = mongoose.model('SellerProduct', SellerProductSchema);
