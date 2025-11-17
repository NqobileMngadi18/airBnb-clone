const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Mock data for users
const createMockUsers = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if we already have users
    const count = await User.countDocuments();
    if (count > 0) {
      console.log(`Database already has ${count} users. Skipping seed.`);
      await mongoose.disconnect();
      return;
    }

    // Create password hash
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);

    // Create mock users
    const users = [
      // Admin users
      {
        name: 'Admin User',
        email: 'admin@airbnb.com',
        password: passwordHash,
        role: 'admin'
      },

      // Host users
      {
        name: 'John Smith',
        email: 'john.host@example.com',
        password: passwordHash,
        role: 'host'
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.host@example.com',
        password: passwordHash,
        role: 'host'
      },
      {
        name: 'Michael Chen',
        email: 'michael.host@example.com',
        password: passwordHash,
        role: 'host'
      },
      {
        name: 'Emma Rodriguez',
        email: 'emma.host@example.com',
        password: passwordHash,
        role: 'host'
      },
      {
        name: 'David Wilson',
        email: 'david.host@example.com',
        password: passwordHash,
        role: 'host'
      },

      // Regular users
      {
        name: 'Alice Cooper',
        email: 'alice.user@example.com',
        password: passwordHash,
        role: 'user'
      },
      {
        name: 'Bob Anderson',
        email: 'bob.user@example.com',
        password: passwordHash,
        role: 'user'
      },
      {
        name: 'Carol Martinez',
        email: 'carol.user@example.com',
        password: passwordHash,
        role: 'user'
      },
      {
        name: 'Daniel Thompson',
        email: 'daniel.user@example.com',
        password: passwordHash,
        role: 'user'
      },
      {
        name: 'Eva Garcia',
        email: 'eva.user@example.com',
        password: passwordHash,
        role: 'user'
      },
      {
        name: 'Frank Lee',
        email: 'frank.user@example.com',
        password: passwordHash,
        role: 'user'
      },
      {
        name: 'Grace Kim',
        email: 'grace.user@example.com',
        password: passwordHash,
        role: 'user'
      },
      {
        name: 'Henry Brown',
        email: 'henry.user@example.com',
        password: passwordHash,
        role: 'user'
      },

      // Test users for different purposes
      {
        name: 'Test Host',
        email: 'host@example.com',
        password: passwordHash,
        role: 'host'
      },
      {
        name: 'Test User',
        email: 'user@example.com',
        password: passwordHash,
        role: 'user'
      }
    ];

    // Insert all users
    await User.insertMany(users);
    console.log(`Successfully seeded ${users.length} users`);
    console.log('Default login credentials:');
    console.log('- Admin: admin@airbnb.com / password123');
    console.log('- Host: host@example.com / password123');
    console.log('- User: user@example.com / password123');
    console.log('- All other users use password: password123');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

  } catch (error) {
    console.error('Error seeding users:', error);
    process.exit(1);
  }
};

// Execute the function
createMockUsers();
