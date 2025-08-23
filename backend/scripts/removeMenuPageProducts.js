const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const Product = require('../models/Product');
const categoriesToRemove = ['chinese', 'street', 'indian', 'italian', 'desserts', 'japanese'];

async function removeMenuPageProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const result = await Product.deleteMany({ category: { $in: categoriesToRemove } });
    console.log(`Removed ${result.deletedCount} MenuPage products from MongoDB.`);
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error removing MenuPage products:', error);
    process.exit(1);
  }
}

removeMenuPageProducts();
