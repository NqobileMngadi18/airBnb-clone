const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const Reservation = require('./models/Reservation');
const User = require('./models/User');
const Accommodation = require('./models/Accommodation');

// Mock data for reservations
const createMockReservations = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Check if we already have reservations
    const count = await Reservation.countDocuments();
    if (count > 0) {
      console.log(`Database already has ${count} reservations. Skipping seed.`);
      await mongoose.disconnect();
      return;
    }

    // Get some users and accommodations to create reservations
    const users = await User.find({ role: 'user' }).limit(10);
    const accommodations = await Accommodation.find().limit(10);

    if (users.length === 0 || accommodations.length === 0) {
      console.log('No users or accommodations found. Please seed users and accommodations first.');
      await mongoose.disconnect();
      return;
    }

    // Create mock reservations
    const reservations = [];
    const statuses = ['confirmed', 'pending', 'cancelled', 'completed'];

    for (let i = 0; i < Math.min(20, users.length * 2); i++) {
      const user = users[i % users.length];
      const accommodation = accommodations[i % accommodations.length];

      // Generate random dates
      const today = new Date();
      const checkInDays = Math.floor(Math.random() * 180) + 1; // 1-180 days from now
      const checkOutDays = checkInDays + Math.floor(Math.random() * 14) + 1; // 1-14 days after check-in

      const checkInDate = new Date(today.getTime() + (checkInDays * 24 * 60 * 60 * 1000));
      const checkOutDate = new Date(today.getTime() + (checkOutDays * 24 * 60 * 60 * 1000));

      // Calculate total nights and price
      const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
      const totalPrice = accommodation.price * nights;
      const guests = Math.floor(Math.random() * accommodation.guests) + 1;

      reservations.push({
        user: user._id,
        accommodation: accommodation._id,
        checkInDate,
        checkOutDate,
        guests,
        totalPrice,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        specialRequests: i % 3 === 0 ? [
          'Late check-in after 10 PM',
          'Extra towels and bedding',
          'Ground floor room preferred'
        ][Math.floor(Math.random() * 3)] : undefined,
        createdAt: new Date(today.getTime() - (Math.random() * 30 * 24 * 60 * 60 * 1000)) // Random date within last 30 days
      });
    }

    // Insert all reservations
    await Reservation.insertMany(reservations);
    console.log(`Successfully seeded ${reservations.length} reservations`);

    // Show some statistics
    const statusCounts = await Reservation.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    console.log('Reservation statistics:');
    statusCounts.forEach(stat => {
      console.log(`- ${stat._id}: ${stat.count} reservations`);
    });

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

  } catch (error) {
    console.error('Error seeding reservations:', error);
    process.exit(1);
  }
};

// Execute the function
createMockReservations();
