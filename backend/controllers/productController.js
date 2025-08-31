const mongoose = require('mongoose');
const Product = require('../models/Product');
const SellerProduct = require('../models/SellerProduct');

exports.getAllProducts = async (req, res) => {
  try {
    // Get regular products
    const regularProducts = await Product.find();
    
    // Get approved seller products
    const sellerProducts = await SellerProduct.find({ status: 'approved' });
    
    // Combine both types of products
    const allProducts = [...regularProducts, ...sellerProducts];
    
    res.json(allProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    console.log('Fetching products for category:', category);
    
    // Get regular products by category
    let regularProducts = [];
    try {
      regularProducts = await Product.find({ categoryId: category });
      console.log('Regular products found:', regularProducts.length);
    } catch (productErr) {
      console.log('Error fetching regular products:', productErr.message);
    }
    
    // Get approved seller products by category
    // We need to map the ObjectId to category name for seller products
    let sellerProducts = [];
    try {
      // Create a mapping of categoryId to category name
      const categoryMapping = {
        '68a217ef46a3642ac769d992': 'Electronics',
        '68a217ef46a3642ac769d993': 'Clothing', 
        '68a217ef46a3642ac769d994': 'Home & Kitchen',
        '68a2191dcf33d9406791539e': 'Beauty & Personal Care',
        '68a21c83d7f0c3f3ef738b09': 'Groceries',
        '68a21c83d7f0c3f3ef738b0c': 'Sports & Outdoors'
      };
      
      const categoryName = categoryMapping[category];
      if (categoryName) {
        sellerProducts = await SellerProduct.find({ 
          category: categoryName, 
          status: 'approved' 
        });
      }
      console.log('Seller products found:', sellerProducts.length);
    } catch (sellerErr) {
      console.log('Error fetching seller products:', sellerErr.message);
    }
    
    // Combine both types of products
    const allProducts = [...regularProducts, ...sellerProducts];
    console.log('Total products found:', allProducts.length);
    
    res.json(allProducts);
  } catch (err) {
    console.error('Category fetch error:', err);
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try to find in regular products first
    let product = await Product.findById(id);
    
    // If not found, try seller products
    if (!product) {
      product = await SellerProduct.findById(id);
    }
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};