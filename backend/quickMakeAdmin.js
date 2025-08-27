// Run this file with: node quickMakeAdmin.js your-email@example.com

const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const email = process.argv[2];

if (!email) {
  console.log('❌ Please provide an email address');
  console.log('Usage: node quickMakeAdmin.js your-email@example.com');
  process.exit(1);
}

const makeAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const user = await User.findOne({ email });
    
    if (!user) {
      console.log(`❌ User with email ${email} not found`);
      console.log('Make sure you have registered with this email first');
      process.exit(1);
    }

    user.role = 'admin';
    await user.save();

    console.log(`🎉 SUCCESS! User ${email} is now an admin!`);
    console.log('User details:');
    console.log(`- Name: ${user.name}`);
    console.log(`- Email: ${user.email}`);
    console.log(`- Role: ${user.role}`);
    
    console.log('\n🔄 Please logout and login again to see the admin panel');

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.connection.close();
    console.log('Database connection closed');
    process.exit(0);
  }
};

makeAdmin();
