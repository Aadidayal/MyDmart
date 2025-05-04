const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['groceries', 'electronics', 'clothing', 'home', 'personal-care']
  },
  imageUrl: { type: String, required: true },
  stock: { type: Number, default: 100 },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);