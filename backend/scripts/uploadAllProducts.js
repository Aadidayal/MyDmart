const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');

// All categories with their products
const categories = [
  {
    name: 'Groceries',
    description: 'Fresh produce and daily essentials',
    imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-4.0.3',
    products: [
      {
        name: 'Fresh Apples',
        description: 'Fresh and juicy apples from local farms',
        price: 199,
        originalPrice: 249,
        discount: 20,
        imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3',
        stock: 100,
        rating: 4.5,
        reviews: 50
      },
      {
        name: 'Organic Milk',
        description: 'Fresh organic milk from grass-fed cows',
        price: 99,
        originalPrice: 119,
        discount: 17,
        imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3',
        stock: 200,
        rating: 4.7,
        reviews: 120
      }
    ]
  },
  {
    name: 'Electronics',
    description: 'Latest gadgets and devices',
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3',
    products: [
      {
        name: 'Smartphone X',
        description: 'Latest smartphone with amazing features',
        price: 29999,
        originalPrice: 34999,
        discount: 15,
        imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3',
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
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3',
        stock: 30,
        rating: 4.8,
        reviews: 85
      }
    ]
  },
  {
    name: 'Clothing',
    description: 'Trendy fashion for everyone',
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3',
    products: [
      {
        name: 'Men\'s Casual Shirt',
        description: 'Comfortable and stylish casual shirt',
        price: 999,
        originalPrice: 1299,
        discount: 23,
        imageUrl: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3',
        stock: 150,
        rating: 4.3,
        reviews: 75
      },
      {
        name: 'Women\'s Summer Dress',
        description: 'Elegant summer dress for all occasions',
        price: 1499,
        originalPrice: 1999,
        discount: 25,
        imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3',
        stock: 100,
        rating: 4.6,
        reviews: 90
      }
    ]
  },
  {
    name: 'Home & Kitchen',
    description: 'Everything for your home',
    imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3',
    products: [
      {
        name: 'Non-Stick Cookware Set',
        description: 'Complete set of non-stick cookware',
        price: 3999,
        originalPrice: 4999,
        discount: 20,
        imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3',
        stock: 40,
        rating: 4.7,
        reviews: 60
      },
      {
        name: 'Smart Home Speaker',
        description: 'Voice-controlled smart speaker',
        price: 4999,
        originalPrice: 5999,
        discount: 17,
        imageUrl: 'https://images.unsplash.com/photo-1589003077984-894e133dabab?ixlib=rb-4.0.3',
        stock: 80,
        rating: 4.4,
        reviews: 110
      }
    ]
  },
  {
    name: 'Beauty & Personal Care',
    description: 'Premium beauty products',
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3',
    products: [
      {
        name: 'Facial Cleanser',
        description: 'Gentle facial cleanser for all skin types',
        price: 499,
        originalPrice: 599,
        discount: 17,
        imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3',
        stock: 200,
        rating: 4.5,
        reviews: 150
      },
      {
        name: 'Hair Care Kit',
        description: 'Complete hair care solution',
        price: 1299,
        originalPrice: 1499,
        discount: 13,
        imageUrl: 'https://images.unsplash.com/photo-1605497788044-5a32c7078486?ixlib=rb-4.0.3',
        stock: 100,
        rating: 4.6,
        reviews: 85
      }
    ]
  },
  {
    name: 'Sports & Outdoors',
    description: 'Sports gear and outdoor equipment',
    imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3',
    products: [
      {
        name: 'Running Shoes',
        description: 'Comfortable running shoes for all terrains',
        price: 2999,
        originalPrice: 3499,
        discount: 14,
        imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3',
        stock: 60,
        rating: 4.7,
        reviews: 95
      },
      {
        name: 'Camping Tent',
        description: 'Spacious camping tent for 4 people',
        price: 5999,
        originalPrice: 6999,
        discount: 14,
        imageUrl: 'https://images.unsplash.com/photo-1537905569824-f89f14cceb68?ixlib=rb-4.0.3',
        stock: 30,
        rating: 4.4,
        reviews: 45
      }
    ]
  }
];

const uploadAllProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Clear existing data
    await Category.deleteMany({});
    await Product.deleteMany({});

    // Insert categories and their products
    for (const categoryData of categories) {
      // Create category
      const category = new Category({
        name: categoryData.name,
        description: categoryData.description,
        imageUrl: categoryData.imageUrl
      });
      await category.save();
      console.log(`Created category: ${category.name}`);

      // Add products for this category
      for (const productData of categoryData.products) {
        const product = new Product({
          ...productData,
          categoryId: category._id
        });
        await product.save();
        console.log(`Added product: ${product.name} to category: ${category.name}`);
      }
    }

    console.log('All categories and products uploaded successfully');
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error uploading data:', error);
    process.exit(1);
  }
};

uploadAllProducts(); 