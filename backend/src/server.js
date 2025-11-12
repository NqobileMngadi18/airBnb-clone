const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const accommodationRoutes = require('./routes/accommodationRoutes');
const User = require('./models/User');

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[REQ] ${req.method} ${req.url}`);
  next();
});

// Simple health route (responds even if DB not yet connected)
app.get('/api/health', (req, res) => {
  console.log('Health check hit');
  res.status(200).json({ status: 'ok', time: new Date().toISOString() });
});

async function ensureDefaultUsers() {
  const count = await User.countDocuments();
  if (count === 0) {
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('password123', salt);
    const defaults = [
      { name: 'Dev Host', email: 'host@example.com', role: 'host', password: passwordHash },
      { name: 'Dev User', email: 'user@example.com', role: 'user', password: passwordHash }
    ];
    await User.insertMany(defaults);
    console.log('Seeded default users: host@example.com / password123, user@example.com / password123');
  }
}

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(async () => {
    console.log('Connected successfully to MongoDB');
    await ensureDefaultUsers();
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/accommodations', accommodationRoutes);
// app.use('/api/listings', listingRoutes); // (when you extract listings into its own route)

