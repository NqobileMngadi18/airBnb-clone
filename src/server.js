const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const accommodationRoutes = require('./routes/accommodationRoutes');

app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/accommodations', accommodationRoutes);

// Test API
app.get('/api/test', (req, res) => res.json({ message: 'API is working properly' }));

// Serve React frontend after API routes
app.use(express.static(path.join(__dirname, "..", "client")));

// Catch-all for React frontend
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});


// MongoDB connection and server start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected successfully to MongoDB');
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('Could not connect to MongoDB:', err));
