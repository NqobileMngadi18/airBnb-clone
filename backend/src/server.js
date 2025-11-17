const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Import routes
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

// Routes
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/accommodations', accommodationRoutes);

// API test route
app.get('/api/test', (req, res) => res.json({ message: 'API is working properly' }));

/*
  ----- FRONTEND SERVING (Heroku / Production) -----
  Uncomment the following block when you deploy to Heroku 
  after building the frontend (npm run build) and moving 
  the build folder into backend/client.
*/

// app.use(express.static(path.join(__dirname, 'client', 'build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

