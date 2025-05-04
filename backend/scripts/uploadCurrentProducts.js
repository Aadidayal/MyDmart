const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');

// Your current products data
const currentProducts = [
  {
    name: "Smartphone X",
    description: "Latest smartphone with amazing features",
    price: 29999,
    originalPrice: 34999,
    discount: 15,
    imageUrl: "https://example.com/smartphone.jpg",
    stock: 50,
    rating: 4.5,
    reviews: 120
  },
  {
    name: "Laptop Pro",
    description: "High-performance laptop for professionals",
    price: 69999,
    originalPrice: 79999,
    discount: 12,
    imageUrl: "https://example.com/laptop.jpg",
    stock: 30,
    rating: 4.8,
    reviews: 85
  },
  {
    name: "Wireless Headphones",
    description: "Premium wireless headphones with noise cancellation",
    price: 8999,
    originalPrice: 9999,
    discount: 10,
    imageUrl: "https://example.com/headphones.jpg",
    stock: 100,
    rating: 4.3,
    reviews: 200
  },
  {
    name: "Smart Watch",
    description: "Feature-rich smartwatch with health tracking",
    price: 14999,
    originalPrice: 16999,
    discount: 12,
    imageUrl: "https://example.com/smartwatch.jpg",
    stock: 75,
    rating: 4.6,
    reviews: 150
  },
  {
    name: "Tablet Pro",
    description: "Powerful tablet for work and entertainment",
    price: 39999,
    originalPrice: 44999,
    discount: 11,
    imageUrl: "https://example.com/tablet.jpg",
    stock: 40,
    rating: 4.7,
    reviews: 95
  }
];

const uploadProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Get or create Electronics category
    let category = await Category.findOne({ name: 'Electronics' });
    if (!category) {
      category = new Category({
        name: 'Electronics',
        description: 'Latest electronic gadgets and devices',
        imageUrl: 'https://example.com/electronics.jpg'
      });
      await category.save();
    }

    // Add products to database
    for (const product of currentProducts) {
      const existingProduct = await Product.findOne({ name: product.name });
      if (!existingProduct) {
        const newProduct = new Product({
          ...product,
          categoryId: category._id
        });
        await newProduct.save();
        console.log(`Added product: ${product.name}`);
      } else {
        console.log(`Product already exists: ${product.name}`);
      }
    }

    console.log('All products uploaded successfully');
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error uploading products:', error);
    process.exit(1);
  }
};

uploadProducts(); 