const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./src/models/User");
const Accommodation = require("./src/models/Accommodation");

const mockAccommodations = [
  // New York Listings
  {
    title: "Luxury Manhattan Apartment",
    description: "A stunning modern apartment in the heart of Manhattan with breathtaking city views. Perfect for business travelers and tourists alike.",
    price: 350,
    location: "newyork",
    propertyType: "Entire apartment",
    guests: 6,
    bedrooms: 3,
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
      accuracy: 4.8,
      location: 4.9,
      value: 4.6
    },
    reviewCount: 127,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800"
    ]
  },
  {
    title: "Cozy Brooklyn Loft",
    description: "Stylish loft in trendy Brooklyn neighborhood. Walking distance to subway and great restaurants.",
    price: 180,
    location: "newyork",
    propertyType: "Entire loft",
    guests: 4,
    bedrooms: 2,
    bathrooms: 1,
    amenities: {
      wifi: true,
      kitchen: true,
      freeParking: true,
      pool: false,
      gym: false,
      airConditioning: true,
      heating: true,
      tv: true,
      workspace: true
    },
    ratings: {
      overall: 4.6,
      cleanliness: 4.7,
      communication: 4.8,
      checkIn: 4.5,
      accuracy: 4.6,
      location: 4.4,
      value: 4.8
    },
    reviewCount: 89,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
      "https://images.unsplash.com/photo-1565623833408-d77e39b88af6?w=800"
    ]
  },
  {
    title: "Central Park View Studio",
    description: "Beautiful studio overlooking Central Park. Prime location in Upper East Side.",
    price: 280,
    location: "newyork",
    propertyType: "Entire studio",
    guests: 2,
    bedrooms: 1,
    bathrooms: 1,
    amenities: {
      wifi: true,
      kitchen: true,
      freeParking: false,
      pool: false,
      gym: true,
      airConditioning: true,
      heating: true,
      tv: true,
      workspace: false
    },
    ratings: {
      overall: 4.9,
      cleanliness: 4.9,
      communication: 4.8,
      checkIn: 4.9,
      accuracy: 4.9,
      location: 5.0,
      value: 4.7
    },
    reviewCount: 203,
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"
    ]
  },

  // Paris Listings
  {
    title: "Champs-Élysées Apartment",
    description: "Elegant Parisian apartment near the famous Champs-Élysées. Classic French architecture with modern amenities.",
    price: 320,
    location: "paris",
    propertyType: "Entire apartment",
    guests: 5,
    bedrooms: 2,
    bathrooms: 2,
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
      cleanliness: 4.8,
      communication: 4.6,
      checkIn: 4.7,
      accuracy: 4.7,
      location: 4.9,
      value: 4.5
    },
    reviewCount: 156,
    images: [
      "https://images.unsplash.com/photo-1549638441-b787d2e11f14?w=800",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800"
    ]
  },
  {
    title: "Montmartre Artist Loft",
    description: "Charming loft in the artistic Montmartre district. Near Sacré-Cœur and authentic French cafés.",
    price: 220,
    location: "paris",
    propertyType: "Entire loft",
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
      overall: 4.5,
      cleanliness: 4.6,
      communication: 4.7,
      checkIn: 4.4,
      accuracy: 4.5,
      location: 4.6,
      value: 4.7
    },
    reviewCount: 94,
    images: [
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800"
    ]
  },
  {
    title: "Seine River View Penthouse",
    description: "Luxurious penthouse with panoramic views of the Seine River and Eiffel Tower.",
    price: 450,
    location: "paris",
    propertyType: "Entire penthouse",
    guests: 6,
    bedrooms: 3,
    bathrooms: 3,
    amenities: {
      wifi: true,
      kitchen: true,
      freeParking: true,
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
      communication: 4.8,
      checkIn: 4.9,
      accuracy: 4.9,
      location: 5.0,
      value: 4.6
    },
    reviewCount: 78,
    images: [
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?w=800"
    ]
  },

  // Tokyo Listings
  {
    title: "Modern Shibuya Apartment",
    description: "Ultra-modern apartment in the heart of Shibuya. Experience Tokyo's vibrant nightlife and culture.",
    price: 200,
    location: "tokyo",
    propertyType: "Entire apartment",
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
      overall: 4.6,
      cleanliness: 4.8,
      communication: 4.9,
      checkIn: 4.7,
      accuracy: 4.6,
      location: 4.8,
      value: 4.5
    },
    reviewCount: 142,
    images: [
      "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800",
      "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800"
    ]
  },
  {
    title: "Traditional Ryokan Experience",
    description: "Authentic Japanese accommodation with tatami mats and traditional breakfast. A unique cultural experience.",
    price: 150,
    location: "tokyo",
    propertyType: "Traditional ryokan",
    guests: 3,
    bedrooms: 1,
    bathrooms: 1,
    amenities: {
      wifi: true,
      kitchen: false,
      freeParking: false,
      pool: false,
      gym: false,
      airConditioning: true,
      heating: true,
      tv: true,
      workspace: false
    },
    ratings: {
      overall: 4.8,
      cleanliness: 4.9,
      communication: 4.7,
      checkIn: 4.8,
      accuracy: 4.9,
      location: 4.6,
      value: 4.9
    },
    reviewCount: 186,
    images: [
      "https://images.unsplash.com/photo-1528164344705-47542687000d?w=800",
      "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800"
    ]
  },
  {
    title: "Tokyo Bay High-Rise",
    description: "Spectacular high-rise apartment with Tokyo Bay views. Modern amenities and excellent transport links.",
    price: 300,
    location: "tokyo",
    propertyType: "Entire apartment",
    guests: 5,
    bedrooms: 2,
    bathrooms: 2,
    amenities: {
      wifi: true,
      kitchen: true,
      freeParking: true,
      pool: true,
      gym: true,
      airConditioning: true,
      heating: true,
      tv: true,
      workspace: true
    },
    ratings: {
      overall: 4.7,
      cleanliness: 4.8,
      communication: 4.6,
      checkIn: 4.7,
      accuracy: 4.7,
      location: 4.9,
      value: 4.4
    },
    reviewCount: 98,
    images: [
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800"
    ]
  },

  // Cape Town Listings
  {
    title: "Table Mountain View Villa",
    description: "Stunning villa with breathtaking views of Table Mountain. Private pool and garden included.",
    price: 250,
    location: "capetown",
    propertyType: "Entire villa",
    guests: 8,
    bedrooms: 4,
    bathrooms: 3,
    amenities: {
      wifi: true,
      kitchen: true,
      freeParking: true,
      pool: true,
      gym: false,
      airConditioning: false,
      heating: false,
      tv: true,
      workspace: true
    },
    ratings: {
      overall: 4.8,
      cleanliness: 4.9,
      communication: 4.7,
      checkIn: 4.8,
      accuracy: 4.8,
      location: 4.9,
      value: 4.7
    },
    reviewCount: 124,
    images: [
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800"
    ]
  },
  {
    title: "V&A Waterfront Penthouse",
    description: "Luxury penthouse at the V&A Waterfront with harbor views. Walking distance to shops and restaurants.",
    price: 180,
    location: "capetown",
    propertyType: "Entire penthouse",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: {
      wifi: true,
      kitchen: true,
      freeParking: true,
      pool: false,
      gym: true,
      airConditioning: false,
      heating: false,
      tv: true,
      workspace: true
    },
    ratings: {
      overall: 4.6,
      cleanliness: 4.7,
      communication: 4.8,
      checkIn: 4.5,
      accuracy: 4.6,
      location: 4.8,
      value: 4.7
    },
    reviewCount: 87,
    images: [
      "https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=800",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800"
    ]
  },
  {
    title: "Camps Bay Beach House",
    description: "Beautiful beach house steps away from Camps Bay beach. Perfect for sunset views and relaxation.",
    price: 320,
    location: "capetown",
    propertyType: "Entire house",
    guests: 6,
    bedrooms: 3,
    bathrooms: 2,
    amenities: {
      wifi: true,
      kitchen: true,
      freeParking: true,
      pool: false,
      gym: false,
      airConditioning: false,
      heating: false,
      tv: true,
      workspace: false
    },
    ratings: {
      overall: 4.9,
      cleanliness: 4.9,
      communication: 4.8,
      checkIn: 4.9,
      accuracy: 4.9,
      location: 5.0,
      value: 4.7
    },
    reviewCount: 156,
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800"
    ]
  },

  // Thailand Listings
  {
    title: "Bangkok Luxury Condo",
    description: "Modern luxury condominium in central Bangkok. Rooftop pool and city skyline views.",
    price: 120,
    location: "thailand",
    propertyType: "Entire condominium",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: {
      wifi: true,
      kitchen: true,
      freeParking: true,
      pool: true,
      gym: true,
      airConditioning: true,
      heating: false,
      tv: true,
      workspace: true
    },
    ratings: {
      overall: 4.5,
      cleanliness: 4.6,
      communication: 4.7,
      checkIn: 4.4,
      accuracy: 4.5,
      location: 4.6,
      value: 4.8
    },
    reviewCount: 234,
    images: [
      "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800"
    ]
  },
  {
    title: "Phuket Beach Villa",
    description: "Tropical villa near pristine beaches in Phuket. Private pool and traditional Thai architecture.",
    price: 200,
    location: "thailand",
    propertyType: "Entire villa",
    guests: 6,
    bedrooms: 3,
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
      overall: 4.7,
      cleanliness: 4.8,
      communication: 4.6,
      checkIn: 4.7,
      accuracy: 4.7,
      location: 4.8,
      value: 4.6
    },
    reviewCount: 167,
    images: [
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800"
    ]
  },
  {
    title: "Chiang Mai Mountain Retreat",
    description: "Peaceful mountain retreat in Chiang Mai. Surrounded by nature with temple views.",
    price: 80,
    location: "thailand",
    propertyType: "Entire cottage",
    guests: 4,
    bedrooms: 2,
    bathrooms: 2,
    amenities: {
      wifi: true,
      kitchen: true,
      freeParking: true,
      pool: false,
      gym: false,
      airConditioning: true,
      heating: false,
      tv: true,
      workspace: true
    },
    ratings: {
      overall: 4.8,
      cleanliness: 4.9,
      communication: 4.9,
      checkIn: 4.8,
      accuracy: 4.8,
      location: 4.7,
      value: 4.9
    },
    reviewCount: 298,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800"
    ]
  }
];

const createMockData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");

    // Check if we should wipe existing data
    const WIPE = process.env.WIPE_DATA === 'true';

    if (WIPE) {
      await Accommodation.deleteMany();
      console.log("Cleared existing accommodations");
    }

    // Check if accommodations already exist
    const existingAccommodations = await Accommodation.countDocuments();
    if (existingAccommodations > 0 && !WIPE) {
      console.log(`Found ${existingAccommodations} existing accommodations. Set WIPE_DATA=true to recreate.`);
      process.exit(0);
    }

    // Find or create host users for each location
    const hostUsers = [];
    const locations = ['newyork', 'paris', 'tokyo', 'capetown', 'thailand'];

    for (const location of locations) {
      let hostUser = await User.findOne({ email: `host-${location}@example.com` });

      if (!hostUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash("password123", salt);

        hostUser = new User({
          name: `${location.charAt(0).toUpperCase() + location.slice(1)} Host`,
          email: `host-${location}@example.com`,
          password: hashedPassword,
          role: "host",
        });

        await hostUser.save();
        console.log(`Created host user for ${location}`);
      }

      hostUsers.push({ location, user: hostUser });
    }

    // Create accommodations
    const accommodationsToCreate = [];

    for (const accommodation of mockAccommodations) {
      const hostUser = hostUsers.find(h => h.location === accommodation.location);

      accommodationsToCreate.push({
        ...accommodation,
        owner: hostUser.user._id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await Accommodation.insertMany(accommodationsToCreate);

    console.log(`Created ${accommodationsToCreate.length} accommodations across 5 locations:`);
    console.log("- New York: 3 listings");
    console.log("- Paris: 3 listings");
    console.log("- Tokyo: 3 listings");
    console.log("- Cape Town: 3 listings");
    console.log("- Thailand: 3 listings");

    console.log("\nHost accounts created:");
    hostUsers.forEach(host => {
      console.log(`- ${host.user.email} / password123`);
    });

    process.exit(0);
  } catch (error) {
    console.error("Error creating mock data:", error);
    process.exit(1);
  }
};

createMockData();
