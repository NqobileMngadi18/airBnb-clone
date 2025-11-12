const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const User = require('./models/User');
const Accommodation = require('./models/Accommodation');

// Mock data for accommodations in the five locations
const createMockAccommodations = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Find a host user (or create one if none exists)
    let hostUser = await User.findOne({ role: 'host' });
    if (!hostUser) {
      const bcrypt = require('bcryptjs');
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash('password123', salt);

      hostUser = await User.create({
        name: 'Host User',
        email: 'host@example.com',
        password: passwordHash,
        role: 'host'
      });
      console.log('Created a new host user');
    }

    // Check if we already have accommodations
    const count = await Accommodation.countDocuments();
    if (count > 0) {
      console.log(`Database already has ${count} accommodations. Skipping seed.`);
      await mongoose.disconnect();
      return;
    }

    // Create mock accommodations for each location
    const accommodations = [
      // New York accommodations
      {
        title: "Luxury Apartment in Manhattan",
        description: "Experience New York from this stunning penthouse with panoramic views of Central Park and the city skyline.",
        price: 350,
        location: "New York",
        images: [
          "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
          "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
        ],
        propertyType: "Entire home/apartment",
        guests: 4,
        bedrooms: 2,
        bathrooms: 2,
        amenities: {
          wifi: true,
          kitchen: true,
          freeParking: false,
          pool: false,
          gym: true,
          airConditioning: true,
          heating: true,
          tv: true,
          workspace: true
        },
        ratings: {
          overall: 4.8,
          cleanliness: 4.9,
          communication: 4.7,
          checkIn: 4.8,
          accuracy: 4.9,
          location: 5.0,
          value: 4.5
        },
        reviewCount: 124,
        owner: hostUser._id
      },
      {
        title: "Cozy Brooklyn Brownstone",
        description: "Authentic Brooklyn experience in a renovated historic brownstone with a beautiful garden.",
        price: 175,
        location: "New York",
        images: [
          "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
          "https://images.unsplash.com/photo-1507089947368-19c1da9775ae"
        ],
        propertyType: "Entire home/apartment",
        guests: 3,
        bedrooms: 1,
        bathrooms: 1,
        amenities: {
          wifi: true,
          kitchen: true,
          freeParking: false,
          pool: false,
          gym: false,
          airConditioning: true,
          heating: true,
          tv: true,
          workspace: false
        },
        ratings: {
          overall: 4.7,
          cleanliness: 4.8,
          communication: 4.9,
          checkIn: 4.7,
          accuracy: 4.6,
          location: 4.5,
          value: 4.8
        },
        reviewCount: 89,
        owner: hostUser._id
      },

      // Paris accommodations
      {
        title: "Charming Apartment near the Eiffel Tower",
        description: "Beautiful Parisian apartment with a balcony overlooking the Seine River and the Eiffel Tower.",
        price: 280,
        location: "Paris",
        images: [
          "https://images.unsplash.com/photo-1502602898657-3e91760cbb34",
          "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af"
        ],
        propertyType: "Entire home/apartment",
        guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: {
          wifi: true,
          kitchen: true,
          freeParking: false,
          pool: false,
          gym: false,
          airConditioning: false,
          heating: true,
          tv: true,
          workspace: true
        },
        ratings: {
          overall: 4.9,
          cleanliness: 4.8,
          communication: 5.0,
          checkIn: 4.9,
          accuracy: 4.7,
          location: 5.0,
          value: 4.6
        },
        reviewCount: 156,
        owner: hostUser._id
      },
      {
        title: "Artistic Loft in Le Marais",
        description: "Modern loft in the historic Marais district, walking distance to museums, cafés, and boutiques.",
        price: 220,
        location: "Paris",
        images: [
          "https://images.unsplash.com/photo-1513694203232-719a280e022f",
          "https://images.unsplash.com/photo-1502672023488-70e25813eb80"
        ],
        propertyType: "Entire home/apartment",
        guests: 4,
        bedrooms: 2,
        bathrooms: 1,
        amenities: {
          wifi: true,
          kitchen: true,
          freeParking: false,
          pool: false,
          gym: false,
          airConditioning: false,
          heating: true,
          tv: true,
          workspace: true
        },
        ratings: {
          overall: 4.7,
          cleanliness: 4.5,
          communication: 4.8,
          checkIn: 4.6,
          accuracy: 4.7,
          location: 4.9,
          value: 4.7
        },
        reviewCount: 113,
        owner: hostUser._id
      },

      // Tokyo accommodations
      {
        title: "Modern Studio in Shibuya",
        description: "Sleek and modern studio apartment in the heart of Tokyo's vibrant Shibuya district.",
        price: 150,
        location: "Tokyo",
        images: [
          "https://images.unsplash.com/photo-1480796927426-f609979314bd",
          "https://images.unsplash.com/photo-1503899036084-c55cdd92da26"
        ],
        propertyType: "Entire home/apartment",
        guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: {
          wifi: true,
          kitchen: true,
          freeParking: false,
          pool: false,
          gym: false,
          airConditioning: true,
          heating: true,
          tv: true,
          workspace: false
        },
        ratings: {
          overall: 4.6,
          cleanliness: 4.9,
          communication: 4.3,
          checkIn: 4.8,
          accuracy: 4.5,
          location: 5.0,
          value: 4.2
        },
        reviewCount: 87,
        owner: hostUser._id
      },
      {
        title: "Traditional Machiya House in Kyoto",
        description: "Experience traditional Japanese living in this beautifully restored machiya house with a garden.",
        price: 260,
        location: "Tokyo",
        images: [
          "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e",
          "https://images.unsplash.com/photo-1504198453319-5ce911bafcde"
        ],
        propertyType: "Entire home/apartment",
        guests: 5,
        bedrooms: 2,
        bathrooms: 1,
        amenities: {
          wifi: true,
          kitchen: true,
          freeParking: false,
          pool: false,
          gym: false,
          airConditioning: true,
          heating: true,
          tv: true,
          workspace: true
        },
        ratings: {
          overall: 4.9,
          cleanliness: 5.0,
          communication: 4.7,
          checkIn: 4.8,
          accuracy: 4.9,
          location: 4.7,
          value: 4.8
        },
        reviewCount: 67,
        owner: hostUser._id
      },

      // Cape Town accommodations
      {
        title: "Ocean View Villa in Camps Bay",
        description: "Stunning villa with panoramic ocean views, private pool, and easy beach access in upscale Camps Bay.",
        price: 300,
        location: "Cape Town",
        images: [
          "https://images.unsplash.com/photo-1576821431116-c8eef2902649",
          "https://images.unsplash.com/photo-1580060839134-75a5edca2e99"
        ],
        propertyType: "Entire home/apartment",
        guests: 6,
        bedrooms: 3,
        bathrooms: 2,
        amenities: {
          wifi: true,
          kitchen: true,
          freeParking: true,
          pool: true,
          gym: false,
          airConditioning: true,
          heating: false,
          tv: true,
          workspace: true
        },
        ratings: {
          overall: 4.9,
          cleanliness: 4.8,
          communication: 5.0,
          checkIn: 4.9,
          accuracy: 4.8,
          location: 5.0,
          value: 4.7
        },
        reviewCount: 78,
        owner: hostUser._id
      },
      {
        title: "Cozy Apartment in City Centre",
        description: "Modern apartment in the heart of Cape Town, close to all major attractions and restaurants.",
        price: 130,
        location: "Cape Town",
        images: [
          "https://images.unsplash.com/photo-1566073771259-6a8506099945",
          "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf"
        ],
        propertyType: "Entire home/apartment",
        guests: 3,
        bedrooms: 1,
        bathrooms: 1,
        amenities: {
          wifi: true,
          kitchen: true,
          freeParking: false,
          pool: false,
          gym: true,
          airConditioning: true,
          heating: false,
          tv: true,
          workspace: true
        },
        ratings: {
          overall: 4.6,
          cleanliness: 4.7,
          communication: 4.5,
          checkIn: 4.8,
          accuracy: 4.6,
          location: 4.9,
          value: 4.5
        },
        reviewCount: 92,
        owner: hostUser._id
      },

      // Thailand accommodations
      {
        title: "Beachfront Villa in Phuket",
        description: "Luxurious beachfront villa with private pool, direct beach access, and stunning sunset views.",
        price: 400,
        location: "Thailand",
        images: [
          "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4",
          "https://images.unsplash.com/photo-1533929736458-ca588d08c8be"
        ],
        propertyType: "Entire home/apartment",
        guests: 8,
        bedrooms: 4,
        bathrooms: 3,
        amenities: {
          wifi: true,
          kitchen: true,
          freeParking: true,
          pool: true,
          gym: false,
          airConditioning: true,
          heating: false,
          tv: true,
          workspace: false
        },
        ratings: {
          overall: 4.9,
          cleanliness: 4.8,
          communication: 4.7,
          checkIn: 4.8,
          accuracy: 4.9,
          location: 5.0,
          value: 4.7
        },
        reviewCount: 115,
        owner: hostUser._id
      },
      {
        title: "Chic Apartment in Bangkok",
        description: "Modern, stylish apartment in downtown Bangkok with rooftop pool and stunning city views.",
        price: 120,
        location: "Thailand",
        images: [
          "https://images.unsplash.com/photo-1588854337115-1c67d9247e4d",
          "https://images.unsplash.com/photo-1582640731057-5165a3258ab8"
        ],
        propertyType: "Entire home/apartment",
        guests: 2,
        bedrooms: 1,
        bathrooms: 1,
        amenities: {
          wifi: true,
          kitchen: true,
          freeParking: false,
          pool: true,
          gym: true,
          airConditioning: true,
          heating: false,
          tv: true,
          workspace: true
        },
        ratings: {
          overall: 4.7,
          cleanliness: 4.8,
          communication: 4.6,
          checkIn: 4.9,
          accuracy: 4.7,
          location: 4.8,
          value: 4.9
        },
        reviewCount: 142,
        owner: hostUser._id
      }
    ];

    // Insert all accommodations
    await Accommodation.insertMany(accommodations);
    console.log(`Successfully seeded ${accommodations.length} accommodations`);

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');

  } catch (error) {
    console.error('Error seeding accommodations:', error);
    process.exit(1);
  }
};

// Execute the function
createMockAccommodations();
