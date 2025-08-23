
const mongoose = require('mongoose');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const Product = require('../models/Product');
const Category = require('../models/Category');

// All categories needed for the products
const categories = [
  { name: 'Home & Kitchen', description: 'Home essentials and kitchenware', imageUrl: '' },
  { name: 'Beauty & Personal Care', description: 'Beauty and personal care products', imageUrl: '' },
  { name: 'Electronics', description: 'Latest electronic gadgets and devices', imageUrl: '' },
  { name: 'Groceries', description: 'Daily groceries and essentials', imageUrl: '' },
  { name: 'Sports & Outdoors', description: 'Sports gear and outdoor equipment', imageUrl: '' },
  { name: 'chinese', description: 'Chinese cuisine', imageUrl: '' },
  { name: 'street', description: 'Street food', imageUrl: '' },
  { name: 'indian', description: 'Indian cuisine', imageUrl: '' },
  { name: 'italian', description: 'Italian cuisine', imageUrl: '' },
  { name: 'desserts', description: 'Desserts', imageUrl: '' },
  { name: 'japanese', description: 'Japanese cuisine', imageUrl: '' }
];

// All products from frontend files, with numeric discount and generic description
const products = [
  // Groceries
  { name: 'Fresh Apples (1kg)', description: 'Fresh and juicy apples, perfect for snacking or baking.', price: 199, originalPrice: 249, discount: 20, imageUrl: 'https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?ixlib=rb-4.0.3', category: 'Groceries', stock: 100 },
  { name: 'Organic Milk (1L)', description: 'Pure organic milk for your daily needs.', price: 99, originalPrice: 129, discount: 23, imageUrl: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?ixlib=rb-4.0.3', category: 'Groceries', stock: 100 },
  { name: 'Whole Wheat Bread', description: 'Healthy whole wheat bread, soft and fresh.', price: 45, originalPrice: 60, discount: 25, imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3', category: 'Groceries', stock: 100 },
  { name: 'Fresh Eggs (12)', description: 'Farm-fresh eggs, rich in protein.', price: 89, originalPrice: 99, discount: 10, imageUrl: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?ixlib=rb-4.0.3', category: 'Groceries', stock: 100 },
  { name: 'Basmati Rice (1kg)', description: 'Premium quality basmati rice for delicious meals.', price: 129, originalPrice: 149, discount: 13, imageUrl: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?ixlib=rb-4.0.3', category: 'Groceries', stock: 100 },
  { name: 'Extra Virgin Olive Oil', description: 'High-quality extra virgin olive oil for healthy cooking.', price: 399, originalPrice: 499, discount: 20, imageUrl: 'https://images.unsplash.com/photo-1594282406314-6312a4bf6a1b?ixlib=rb-4.0.3', category: 'Groceries', stock: 100 },

  // Sports & Outdoors
  { name: 'Mountain Bike', description: 'Durable mountain bike suitable for all terrains.', price: 15999, originalPrice: 19999, discount: 20, imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3', category: 'Sports & Outdoors', stock: 100 },
  { name: 'Yoga Mat', description: 'Comfortable yoga mat for your daily practice.', price: 499, originalPrice: 799, discount: 38, imageUrl: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?ixlib=rb-4.0.3', category: 'Sports & Outdoors', stock: 100 },
  { name: 'Football', description: 'High-quality football for matches and training.', price: 699, originalPrice: 999, discount: 30, imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3', category: 'Sports & Outdoors', stock: 100 },
  { name: 'Tennis Racket', description: 'Lightweight tennis racket for all levels.', price: 2499, originalPrice: 3499, discount: 29, imageUrl: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?ixlib=rb-4.0.3', category: 'Sports & Outdoors', stock: 100 },
  { name: 'Camping Tent', description: 'Spacious camping tent for outdoor adventures.', price: 3999, originalPrice: 4999, discount: 20, imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3', category: 'Sports & Outdoors', stock: 100 },
  { name: 'Dumbbell Set', description: 'Adjustable dumbbell set for strength training.', price: 2499, originalPrice: 3499, discount: 29, imageUrl: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-4.0.3', category: 'Sports & Outdoors', stock: 100 },
  { name: 'Sports Shoes', description: 'Comfortable sports shoes for running and workouts.', price: 2999, originalPrice: 3999, discount: 25, imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3', category: 'Sports & Outdoors', stock: 100 },
  { name: 'Hiking Backpack', description: 'Durable hiking backpack for all your gear.', price: 1999, originalPrice: 2499, discount: 20, imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?ixlib=rb-4.0.3', category: 'Sports & Outdoors', stock: 100 },
  // Home & Kitchen
  { name: 'Premium Non-Stick Cookware Set', description: 'Premium non-stick cookware set for your kitchen.', price: 2499, originalPrice: 3999, discount: 38, imageUrl: 'https://images.unsplash.com/photo-1584990347449-b7abbb0bbec7?ixlib=rb-4.0.3', rating: 4.5, reviews: 128, category: 'Home & Kitchen', stock: 100 },
  { name: 'Stainless Steel Mixing Bowls Set', description: 'Stainless steel mixing bowls for all your needs.', price: 899, originalPrice: 1499, discount: 40, imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3', rating: 4.7, reviews: 95, category: 'Home & Kitchen', stock: 100 },
  { name: 'Electric Kettle with Temperature Control', description: 'Electric kettle with temperature control.', price: 1999, originalPrice: 2999, discount: 33, imageUrl: 'https://images.unsplash.com/photo-1608039829574-327d29c5d5c8?ixlib=rb-4.0.3', rating: 4.6, reviews: 210, category: 'Home & Kitchen', stock: 100 },
  { name: 'Ceramic Dinnerware Set', description: 'Ceramic dinnerware set for your dining table.', price: 1799, originalPrice: 2499, discount: 28, imageUrl: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3', rating: 4.8, reviews: 156, category: 'Home & Kitchen', stock: 100 },
  { name: 'Professional Chef Knife Set', description: 'Professional chef knife set for precision cutting.', price: 3499, originalPrice: 4999, discount: 30, imageUrl: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3', rating: 4.9, reviews: 89, category: 'Home & Kitchen', stock: 100 },
  // Beauty & Personal Care
  { name: 'Natural Skincare Set', description: 'Natural skincare set for glowing skin.', price: 1299, originalPrice: 1999, discount: 35, imageUrl: 'https://images.unsplash.com/photo-1612817288484-6f916006741a?ixlib=rb-4.0.3', rating: 4.7, reviews: 245, category: 'Beauty & Personal Care', stock: 100 },
  { name: 'Organic Hair Care Bundle', description: 'Organic hair care bundle for healthy hair.', price: 1599, originalPrice: 2299, discount: 30, imageUrl: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?ixlib=rb-4.0.3', rating: 4.8, reviews: 178, category: 'Beauty & Personal Care', stock: 100 },
  { name: 'Luxury Makeup Kit', description: 'Luxury makeup kit for all occasions.', price: 2999, originalPrice: 3999, discount: 25, imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3', rating: 4.6, reviews: 312, category: 'Beauty & Personal Care', stock: 100 },
  { name: 'Facial Care Essentials', description: 'Facial care essentials for daily routine.', price: 899, originalPrice: 1299, discount: 31, imageUrl: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3', rating: 4.5, reviews: 167, category: 'Beauty & Personal Care', stock: 100 },
  // Electronics
  { name: 'Wireless Noise Cancelling Headphones', description: 'Wireless noise cancelling headphones.', price: 4999, originalPrice: 7999, discount: 38, imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3', rating: 4.6, reviews: 352, category: 'Electronics', stock: 100 },
  { name: 'Smart Watch with Health Tracking', description: 'Smart watch with health tracking features.', price: 3999, originalPrice: 5999, discount: 33, imageUrl: 'https://images.unsplash.com/photo-1545579133-99bb5ab189bd?ixlib=rb-4.0.3', rating: 4.7, reviews: 289, category: 'Electronics', stock: 100 },
  { name: 'Portable Bluetooth Speaker', description: 'Portable bluetooth speaker for music on the go.', price: 1999, originalPrice: 2999, discount: 33, imageUrl: 'https://images.unsplash.com/photo-1606220588911-5117e7648a6a?ixlib=rb-4.0.3', rating: 4.5, reviews: 156, category: 'Electronics', stock: 100 },
  { name: 'Wireless Earbuds Pro', description: 'Wireless earbuds pro for immersive sound.', price: 2999, originalPrice: 4499, discount: 33, imageUrl: 'https://images.unsplash.com/photo-1606220588911-5117e7648a6a?ixlib=rb-4.0.3', rating: 4.8, reviews: 421, category: 'Electronics', stock: 100 },
  { name: 'Tablet with Stylus', description: 'Tablet with stylus for productivity.', price: 12999, originalPrice: 15999, discount: 19, imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3', rating: 4.7, reviews: 198, category: 'Electronics', stock: 100 },
];

const seedAllFrontendProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    // Insert categories if not present
    const categoryMap = {};
    for (const cat of categories) {
      let category = await Category.findOne({ name: cat.name });
      if (!category) {
        category = await Category.create(cat);
      }
      categoryMap[cat.name] = category._id;
    }
    // Prepare products with categoryId
    const productsWithCategoryId = products.map(p => ({
      ...p,
      categoryId: categoryMap[p.category],
    }));
    await Product.deleteMany({});
    await Product.insertMany(productsWithCategoryId);
    console.log('All frontend products seeded successfully!');
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding frontend products:', error);
    process.exit(1);
  }
};

seedAllFrontendProducts();
