const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");
const Accommodation = require("./models/Accommodation");

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");

    // Clear existing data (optional, safe for testing)
    await User.deleteMany();
    await Accommodation.deleteMany();

    // Create sample users & hosts
    const salt = await bcrypt.genSalt(10);

    const host1 = new User({
      name: "Alice Host",
      email: "alice@host.com",
      password: await bcrypt.hash("alice123", salt),
      role: "host",
    });

    const host2 = new User({
      name: "Bob Host",
      email: "bob@host.com",
      password: await bcrypt.hash("bob123", salt),
      role: "host",
    });

    const user1 = new User({
      name: "Charlie User",
      email: "charlie@user.com",
      password: await bcrypt.hash("charlie123", salt),
      role: "user",
    });

    await host1.save();
    await host2.save();
    await user1.save();

    console.log("Users & Hosts created");

    // Create sample accommodations
    const accommodations = [
      {
        title: "Cozy Apartment in Cape Town",
        description: "Beautiful 2-bedroom apartment with ocean views.",
        price: 120,
        location: "Cape Town, South Africa",
        images: ["https://via.placeholder.com/400"],
        owner: host1._id,
      },
      {
        title: "Luxury Villa in Durban",
        description: "Spacious villa with pool and private garden.",
        price: 250,
        location: "Durban, South Africa",
        images: ["https://via.placeholder.com/400"],
        owner: host2._id,
      },
    ];

    await Accommodation.insertMany(accommodations);

    console.log("Sample accommodations created");

    process.exit();
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seed();