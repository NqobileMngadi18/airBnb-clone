const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Correct import
const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const accommodationRoutes = require('./routes/accommodationRoutes');

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected successfully to MongoDB');
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('Could not connect to MongoDB:', err));

const path = require("path");

app.use(express.static(path.join(__dirname, "..", "client")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});


// Routes
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/accommodations', accommodationRoutes);

// Api tester

app.get( '/api/test', (req, res)=> res.json({ message: 'API is working properly' }) );
// Remove this line for now unless you have a listingRoutes file:
/// app.use('/api/listings', listingRoutes);
