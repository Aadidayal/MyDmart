const Cart = require('../models/Cart');
const Product = require('../models/Product');
const SellerProduct = require('../models/SellerProduct');

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });
    
    if (!cart) {
      return res.json({ items: [], totalItems: 0, totalPrice: 0 });
    }
    
    res.json({
      items: cart.items,
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { _id, name, price, imageUrl, quantity = 1 } = req.body;
    
    if (!_id) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    let cart = await Cart.findOne({ userId: req.user.userId });

    if (!cart) {
      cart = new Cart({
        userId: req.user.userId,
        items: [{
          productId: _id,
          name: name,
          price: price,
          imageUrl: imageUrl,
          quantity: quantity,
          addedAt: new Date(),
          lastUpdatedAt: new Date()
        }]
      });
    } else {
      const existingItem = cart.items.find(item => item.productId.toString() === _id);
      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.lastUpdatedAt = new Date();
      } else {
        cart.items.push({
          productId: _id,
          name: name,
          price: price,
          imageUrl: imageUrl,
          quantity: quantity,
          addedAt: new Date(),
          lastUpdatedAt: new Date()
        });
      }
    }

    await cart.save();
    console.log(`User ${req.user.userId} added product ${_id} to cart`);
    
    res.json({
      items: cart.items,
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: 'Error adding to cart', error: error.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === req.params.productId);
    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    // Remove the item completely
    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.json({
      items: cart.items,
      totalItems: cart.totalItems,
      totalPrice: cart.totalPrice
    });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: 'Error removing from cart', error: error.message });
  }
};