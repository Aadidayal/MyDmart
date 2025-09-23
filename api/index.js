// Vercel API handler
try {
  console.log('Loading backend server...');
  const app = require('../backend/server.js');
  console.log('Backend server loaded successfully');
  module.exports = app;
} catch (error) {
  console.error('Error loading backend server:', error);
  
  // Fallback handler for debugging
  module.exports = (req, res) => {
    console.error('API handler error:', error);
    res.status(500).json({ 
      error: 'Server configuration error', 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  };
}