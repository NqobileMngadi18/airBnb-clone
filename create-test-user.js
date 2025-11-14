const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

// Correct path to models
const User = require("./src/models/User");

const WIPE = process.env.WIPE_USERS === 'true';

const createTestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");

    if (WIPE) {
      await User.deleteMany();
      console.log("Cleared existing users (WIPE_USERS=true)");
    } else {
      console.log("Keeping existing users (set WIPE_USERS=true to clear)");
    }

    const existing = await User.findOne({ email: 'test@example.com' });
    if (existing) {
      console.log('Test user already exists, skipping creation');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    const testUser = new User({
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
      role: "user",
    });

    const testHost = new User({
      name: "Test Host",
      email: "host2@example.com",
      password: hashedPassword,
      role: "host",
    });

    await testUser.save();
    await testHost.save();

    console.log("Created test users:");
    console.log("  test@example.com / password123");
    console.log("  host2@example.com / password123");
    process.exit(0);
  } catch (err) {
    console.error("Error creating test users:", err);
    process.exit(1);
  }
};

createTestUser();
