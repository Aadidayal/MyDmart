const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');

const categories = [
  {
    name: 'Electronics',
    description: 'Latest electronic gadgets and devices',
    imageUrl: 'https://example.com/electronics.jpg'
  },
  {
    name: 'Clothing',
    description: 'Fashionable clothing for all',
    imageUrl: 'https://example.com/clothing.jpg'
  },
  {
    name: 'Home & Kitchen',
    description: 'Home essentials and kitchenware',
    imageUrl: 'https://example.com/home-kitchen.jpg'
  }
];

const products = [
  {
    name: 'Smartphone X',
    description: 'Latest smartphone with amazing features',
    price: 29999,
    originalPrice: 34999,
    discount: 15,
    imageUrl: 'https://example.com/smartphone.jpg',
    stock: 50,
    rating: 4.5,
    reviews: 120
  },
  {
    name: 'Laptop Pro',
    description: 'High-performance laptop for professionals',
    price: 69999,
    originalPrice: 79999,
    discount: 12,
    imageUrl: 'https://example.com/laptop.jpg',
    stock: 30,
    rating: 4.8,
    reviews: 85
  },
  {
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with noise cancellation',
    price: 8999,
    originalPrice: 9999,
    discount: 10,
    imageUrl: 'https://example.com/headphones.jpg',
    stock: 100,
    rating: 4.3,
    reviews: 200
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Insert categories
    const insertedCategories = await Category.insertMany(categories);
    console.log('Categories seeded successfully');

    // Add category IDs to products
    const productsWithCategories = products.map((product, index) => ({
      ...product,
      categoryId: insertedCategories[0]._id // Assign all products to Electronics category for now
    }));

    // Insert products
    await Product.insertMany(productsWithCategories);
    console.log('Products seeded successfully');

    // Close connection
    await mongoose.connection.close();
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 