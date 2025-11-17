const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Import all seed functions
const seedUsers = require('./seed-users');
const seedLocations = require('./seed-locations');
const seedReservations = require('./seed-reservations');

async function seedAll() {
  try {
    console.log('🌱 Starting complete database seeding...\n');

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing data (optional - uncomment if you want to reset)
    // await mongoose.connection.db.dropDatabase();
    // console.log('🗑️  Cleared existing database\n');

    console.log('👥 Seeding users...');
    await runSeedScript('./seed-users.js');

    console.log('\n🏠 Seeding accommodations/locations...');
    await runSeedScript('./seed-locations.js');

    console.log('\n📅 Seeding reservations...');
    await runSeedScript('./seed-reservations.js');

    console.log('\n🎉 All seeding completed successfully!');
    console.log('\n📝 Default login credentials:');
    console.log('   - Admin: admin@airbnb.com / password123');
    console.log('   - Host: host@example.com / password123');
    console.log('   - User: user@example.com / password123');
    console.log('   - All other users: password123');

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');

  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
}

async function runSeedScript(scriptPath) {
  return new Promise((resolve, reject) => {
    const { spawn } = require('child_process');
    const child = spawn('node', [scriptPath], {
      stdio: 'inherit',
      cwd: __dirname
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Seed script ${scriptPath} exited with code ${code}`));
      } else {
        resolve();
      }
    });
  });
}

// Execute if this file is run directly
if (require.main === module) {
  seedAll();
}

module.exports = seedAll;
