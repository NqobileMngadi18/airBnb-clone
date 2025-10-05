const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const accomodationRoutes = require('./routes/accommodationRoutes');

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected successfully to MongoDB');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error('Could not connect to MongoDB:', err));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/accomodations', accomodationRoutes);
// app.use('/api/listings', listingRoutes); // (when you extract listings into its own route)
