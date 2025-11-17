// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// require("dotenv").config();

// const User = require("./models/User");
// const Accommodation = require("./models/Accommodation");
// const Reservation = require("./models/Reservation");

// const seed = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB connected...");

//     // Clear existing data
//     await User.deleteMany();
//     await Accommodation.deleteMany();

//     // Create sample users and hosts
//     const salt = await bcrypt.genSalt(10);

//     // Create hosts for each location
//     const hostNY = new User({
//       name: "New York Host",
//       email: "host-newyork@example.com",
//       password: await bcrypt.hash("password123", salt),
//       role: "host",
//     });

//     const hostParis = new User({
//       name: "Paris Host",
//       email: "host-paris@example.com",
//       password: await bcrypt.hash("password123", salt),
//       role: "host",
//     });

//     const hostTokyo = new User({
//       name: "Tokyo Host",
//       email: "host-tokyo@example.com",
//       password: await bcrypt.hash("password123", salt),
//       role: "host",
//     });

//     const hostCapeTown = new User({
//       name: "Cape Town Host",
//       email: "host-capetown@example.com",
//       password: await bcrypt.hash("password123", salt),
//       role: "host",
//     });

//     const hostThailand = new User({
//       name: "Thailand Host",
//       email: "host-thailand@example.com",
//       password: await bcrypt.hash("password123", salt),
//       role: "host",
//     });

//     // Regular user for testing
//     const user1 = new User({
//       name: "Test User",
//       email: "test@example.com",
//       password: await bcrypt.hash("password123", salt),
//       role: "user",
//     });

//     await hostNY.save();
//     await hostParis.save();
//     await hostTokyo.save();
//     await hostCapeTown.save();
//     await hostThailand.save();
//     await user1.save();

//     console.log("Users & Hosts created");

//     // Create sample accommodations for all 5 locations
//     const accommodations = [
//       // New York
//       {
//         title: "Luxury Manhattan Apartment",
//         description: "A stunning modern apartment in the heart of Manhattan with breathtaking city views.",
//         price: 350,
//         location: "newyork",
//         propertyType: "Entire apartment",
//         guests: 6,
//         bedrooms: 3,
//         bathrooms: 2,
//         amenities: {
//           wifi: true,
//           kitchen: true,
//           freeParking: false,
//           pool: false,
//           gym: true,
//           airConditioning: true,
//           heating: true,
//           tv: true,
//           workspace: true
//         },
//         ratings: {
//           overall: 4.8,
//           cleanliness: 4.9,
//           communication: 4.7,
//           checkIn: 4.8,
//           accuracy: 4.8,
//           location: 4.9,
//           value: 4.6
//         },
//         reviewCount: 127,
//         images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
//         owner: hostNY._id,
//       },
//       {
//         title: "Cozy Brooklyn Loft",
//         description: "Stylish loft in trendy Brooklyn neighborhood.",
//         price: 180,
//         location: "newyork",
//         propertyType: "Entire loft",
//         guests: 4,
//         bedrooms: 2,
//         bathrooms: 1,
//         amenities: {
//           wifi: true,
//           kitchen: true,
//           freeParking: true,
//           pool: false,
//           gym: false,
//           airConditioning: true,
//           heating: true,
//           tv: true,
//           workspace: true
//         },
//         ratings: {
//           overall: 4.6,
//           cleanliness: 4.7,
//           communication: 4.8,
//           checkIn: 4.5,
//           accuracy: 4.6,
//           location: 4.4,
//           value: 4.8
//         },
//         reviewCount: 89,
//         images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],
//         owner: hostNY._id,
//       },

//       // Paris
//       {
//         title: "Champs-Élysées Apartment",
//         description: "Elegant Parisian apartment near the famous Champs-Élysées.",
//         price: 320,
//         location: "paris",
//         propertyType: "Entire apartment",
//         guests: 5,
//         bedrooms: 2,
//         bathrooms: 2,
//         amenities: {
//           wifi: true,
//           kitchen: true,
//           freeParking: false,
//           pool: false,
//           gym: false,
//           airConditioning: false,
//           heating: true,
//           tv: true,
//           workspace: true
//         },
//         ratings: {
//           overall: 4.7,
//           cleanliness: 4.8,
//           communication: 4.6,
//           checkIn: 4.7,
//           accuracy: 4.7,
//           location: 4.9,
//           value: 4.5
//         },
//         reviewCount: 156,
//         images: ["https://images.unsplash.com/photo-1549638441-b787d2e11f14?w=800"],
//         owner: hostParis._id,
//       },
//       {
//         title: "Montmartre Artist Loft",
//         description: "Charming loft in the artistic Montmartre district.",
//         price: 220,
//         location: "paris",
//         propertyType: "Entire loft",
//         guests: 4,
//         bedrooms: 2,
//         bathrooms: 1,
//         amenities: {
//           wifi: true,
//           kitchen: true,
//           freeParking: false,
//           pool: false,
//           gym: false,
//           airConditioning: false,
//           heating: true,
//           tv: true,
//           workspace: true
//         },
//         ratings: {
//           overall: 4.5,
//           cleanliness: 4.6,
//           communication: 4.7,
//           checkIn: 4.4,
//           accuracy: 4.5,
//           location: 4.6,
//           value: 4.7
//         },
//         reviewCount: 94,
//         images: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"],
//         owner: hostParis._id,
//       },

//       // Tokyo
//       {
//         title: "Modern Shibuya Apartment",
//         description: "Ultra-modern apartment in the heart of Shibuya.",
//         price: 200,
//         location: "tokyo",
//         propertyType: "Entire apartment",
//         guests: 4,
//         bedrooms: 2,
//         bathrooms: 2,
//         amenities: {
//           wifi: true,
//           kitchen: true,
//           freeParking: false,
//           pool: false,
//           gym: true,
//           airConditioning: true,
//           heating: true,
//           tv: true,
//           workspace: true
//         },
//         ratings: {
//           overall: 4.6,
//           cleanliness: 4.8,
//           communication: 4.9,
//           checkIn: 4.7,
//           accuracy: 4.6,
//           location: 4.8,
//           value: 4.5
//         },
//         reviewCount: 142,
//         images: ["https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800"],
//         owner: hostTokyo._id,
//       },
//       {
//         title: "Traditional Ryokan Experience",
//         description: "Authentic Japanese accommodation with tatami mats.",
//         price: 150,
//         location: "tokyo",
//         propertyType: "Traditional ryokan",
//         guests: 3,
//         bedrooms: 1,
//         bathrooms: 1,
//         amenities: {
//           wifi: true,
//           kitchen: false,
//           freeParking: false,
//           pool: false,
//           gym: false,
//           airConditioning: true,
//           heating: true,
//           tv: true,
//           workspace: false
//         },
//         ratings: {
//           overall: 4.8,
//           cleanliness: 4.9,
//           communication: 4.7,
//           checkIn: 4.8,
//           accuracy: 4.9,
//           location: 4.6,
//           value: 4.9
//         },
//         reviewCount: 186,
//         images: ["https://images.unsplash.com/photo-1528164344705-47542687000d?w=800"],
//         owner: hostTokyo._id,
//       },

//       // Cape Town
//       {
//         title: "Table Mountain View Villa",
//         description: "Stunning villa with breathtaking views of Table Mountain.",
//         price: 250,
//         location: "capetown",
//         propertyType: "Entire villa",
//         guests: 8,
//         bedrooms: 4,
//         bathrooms: 3,
//         amenities: {
//           wifi: true,
//           kitchen: true,
//           freeParking: true,
//           pool: true,
//           gym: false,
//           airConditioning: false,
//           heating: false,
//           tv: true,
//           workspace: true
//         },
//         ratings: {
//           overall: 4.8,
//           cleanliness: 4.9,
//           communication: 4.7,
//           checkIn: 4.8,
//           accuracy: 4.8,
//           location: 4.9,
//           value: 4.7
//         },
//         reviewCount: 124,
//         images: ["https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800"],
//         owner: hostCapeTown._id,
//       },
//       {
//         title: "V&A Waterfront Penthouse",
//         description: "Luxury penthouse at the V&A Waterfront with harbor views.",
//         price: 180,
//         location: "capetown",
//         propertyType: "Entire penthouse",
//         guests: 4,
//         bedrooms: 2,
//         bathrooms: 2,
//         amenities: {
//           wifi: true,
//           kitchen: true,
//           freeParking: true,
//           pool: false,
//           gym: true,
//           airConditioning: false,
//           heating: false,
//           tv: true,
//           workspace: true
//         },
//         ratings: {
//           overall: 4.6,
//           cleanliness: 4.7,
//           communication: 4.8,
//           checkIn: 4.5,
//           accuracy: 4.6,
//           location: 4.8,
//           value: 4.7
//         },
//         reviewCount: 87,
//         images: ["https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=800"],
//         owner: hostCapeTown._id,
//       },

//       // Thailand
//       {
//         title: "Bangkok Luxury Condo",
//         description: "Modern luxury condominium in central Bangkok.",
//         price: 120,
//         location: "thailand",
//         propertyType: "Entire condominium",
//         guests: 4,
//         bedrooms: 2,
//         bathrooms: 2,
//         amenities: {
//           wifi: true,
//           kitchen: true,
//           freeParking: true,
//           pool: true,
//           gym: true,
//           airConditioning: true,
//           heating: false,
//           tv: true,
//           workspace: true
//         },
//         ratings: {
//           overall: 4.5,
//           cleanliness: 4.6,
//           communication: 4.7,
//           checkIn: 4.4,
//           accuracy: 4.5,
//           location: 4.6,
//           value: 4.8
//         },
//         reviewCount: 234,
//         images: ["https://images.unsplash.com/photo-1528181304800-259b08848526?w=800"],
//         owner: hostThailand._id,
//       },
//       {
//         title: "Phuket Beach Villa",
//         description: "Tropical villa near pristine beaches in Phuket.",
//         price: 200,
//         location: "thailand",
//         propertyType: "Entire villa",
//         guests: 6,
//         bedrooms: 3,
//         bathrooms: 3,
//         amenities: {
//           wifi: true,
//           kitchen: true,
//           freeParking: true,
//           pool: true,
//           gym: false,
//           airConditioning: true,
//           heating: false,
//           tv: true,
//           workspace: false
//         },
//         ratings: {
//           overall: 4.7,
//           cleanliness: 4.8,
//           communication: 4.6,
//           checkIn: 4.7,
//           accuracy: 4.7,
//           location: 4.8,
//           value: 4.6
//         },
//         reviewCount: 167,
//         images: ["https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800"],
//         owner: hostThailand._id,
//       }
//     ];

//     await Accommodation.insertMany(accommodations);

//     const reservations = [
//   {
//     user: user1._id, // the test user
//     accommodation: accommodations[0]._id, // Luxury Manhattan Apartment
//     checkIn: new Date("2025-12-01"),
//     checkOut: new Date("2025-12-05"),
//     guests: 2,
//     totalPrice: accommodations[0].price * 4
//   },
//   {
//     user: user1._id,
//     accommodation: accommodations[4]._id, // Modern Shibuya Apartment
//     checkIn: new Date("2025-11-20"),
//     checkOut: new Date("2025-11-25"),
//     guests: 3,
//     totalPrice: accommodations[4].price * 5
//   },
// ];
// await Reservation.insertMany(reservations);
// console.log(`Created ${reservations.length} reservations`);


//     console.log(`Created ${accommodations.length} accommodations across 5 locations:`);
//     console.log("- New York: 2 listings");
//     console.log("- Paris: 2 listings");
//     console.log("- Tokyo: 2 listings");
//     console.log("- Cape Town: 2 listings");
//     console.log("- Thailand: 2 listings");

//     console.log("\nTest accounts:");
//     console.log("- test@example.com / password123 (user)");
//     console.log("- host-newyork@example.com / password123 (host)");
//     console.log("- host-paris@example.com / password123 (host)");
//     console.log("- host-tokyo@example.com / password123 (host)");
//     console.log("- host-capetown@example.com / password123 (host)");
//     console.log("- host-thailand@example.com / password123 (host)");

//     process.exit();
//   } catch (err) {
//     console.error("Error seeding data:", err);
//     process.exit(1);
//   }
// };
// seed();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/User");
const Accommodation = require("./models/Accommodation");
const Reservation = require("./models/Reservation");

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected...");

    // Clear existing data
    await User.deleteMany();
    await Accommodation.deleteMany();
    await Reservation.deleteMany();

    // Create sample users and hosts
    const salt = await bcrypt.genSalt(10);

    const hostNY = new User({
      name: "New York Host",
      email: "host-newyork@example.com",
      password: await bcrypt.hash("password123", salt),
      role: "host",
    });

    const hostParis = new User({
      name: "Paris Host",
      email: "host-paris@example.com",
      password: await bcrypt.hash("password123", salt),
      role: "host",
    });

    const hostTokyo = new User({
      name: "Tokyo Host",
      email: "host-tokyo@example.com",
      password: await bcrypt.hash("password123", salt),
      role: "host",
    });

    const hostCapeTown = new User({
      name: "Cape Town Host",
      email: "host-capetown@example.com",
      password: await bcrypt.hash("password123", salt),
      role: "host",
    });

    const hostThailand = new User({
      name: "Thailand Host",
      email: "host-thailand@example.com",
      password: await bcrypt.hash("password123", salt),
      role: "host",
    });

    const user1 = new User({
      name: "Test User",
      email: "test@example.com",
      password: await bcrypt.hash("password123", salt),
      role: "user",
    });

    await User.insertMany([hostNY, hostParis, hostTokyo, hostCapeTown, hostThailand, user1]);
    console.log("Users & Hosts created");

    // Create sample accommodations
    const accommodationsData = [
      // New York
      {
        title: "Luxury Manhattan Apartment",
        description: "A stunning modern apartment in Manhattan with city views.",
        price: 350,
        location: "newyork",
        propertyType: "Entire apartment",
        guests: 6,
        bedrooms: 3,
        bathrooms: 2,
        amenities: {
          wifi: true, kitchen: true, freeParking: false, pool: false,
          gym: true, airConditioning: true, heating: true, tv: true, workspace: true
        },
        ratings: { overall: 4.8, cleanliness: 4.9, communication: 4.7, checkIn: 4.8, accuracy: 4.8, location: 4.9, value: 4.6 },
        reviewCount: 127,
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800"],
        owner: hostNY._id,
      },
      {
        title: "Cozy Brooklyn Loft",
        description: "Stylish loft in trendy Brooklyn neighborhood.",
        price: 180,
        location: "newyork",
        propertyType: "Entire loft",
        guests: 4,
        bedrooms: 2,
        bathrooms: 1,
        amenities: { wifi: true, kitchen: true, freeParking: true, pool: false, gym: false, airConditioning: true, heating: true, tv: true, workspace: true },
        ratings: { overall: 4.6, cleanliness: 4.7, communication: 4.8, checkIn: 4.5, accuracy: 4.6, location: 4.4, value: 4.8 },
        reviewCount: 89,
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],
        owner: hostNY._id,
      },
      // Paris
      {
        title: "Champs-Élysées Apartment",
        description: "Elegant Parisian apartment near the famous Champs-Élysées.",
        price: 320,
        location: "paris",
        propertyType: "Entire apartment",
        guests: 5,
        bedrooms: 2,
        bathrooms: 2,
        amenities: { wifi: true, kitchen: true, freeParking: false, pool: false, gym: false, airConditioning: false, heating: true, tv: true, workspace: true },
        ratings: { overall: 4.7, cleanliness: 4.8, communication: 4.6, checkIn: 4.7, accuracy: 4.7, location: 4.9, value: 4.5 },
        reviewCount: 156,
        images: ["https://images.unsplash.com/photo-1549638441-b787d2e11f14?w=800"],
        owner: hostParis._id,
      },
      {
        title: "Montmartre Artist Loft",
        description: "Charming loft in the artistic Montmartre district.",
        price: 220,
        location: "paris",
        propertyType: "Entire loft",
        guests: 4,
        bedrooms: 2,
        bathrooms: 1,
        amenities: { wifi: true, kitchen: true, freeParking: false, pool: false, gym: false, airConditioning: false, heating: true, tv: true, workspace: true },
        ratings: { overall: 4.5, cleanliness: 4.6, communication: 4.7, checkIn: 4.4, accuracy: 4.5, location: 4.6, value: 4.7 },
        reviewCount: 94,
        images: ["https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800"],
        owner: hostParis._id,
      },
      // Tokyo
      {
        title: "Modern Shibuya Apartment",
        description: "Ultra-modern apartment in Shibuya.",
        price: 200,
        location: "tokyo",
        propertyType: "Entire apartment",
        guests: 4,
        bedrooms: 2,
        bathrooms: 2,
        amenities: { wifi: true, kitchen: true, freeParking: false, pool: false, gym: true, airConditioning: true, heating: true, tv: true, workspace: true },
        ratings: { overall: 4.6, cleanliness: 4.8, communication: 4.9, checkIn: 4.7, accuracy: 4.6, location: 4.8, value: 4.5 },
        reviewCount: 142,
        images: ["https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800"],
        owner: hostTokyo._id,
      },
      {
        title: "Traditional Ryokan Experience",
        description: "Authentic Japanese accommodation with tatami mats.",
        price: 150,
        location: "tokyo",
        propertyType: "Traditional ryokan",
        guests: 3,
        bedrooms: 1,
        bathrooms: 1,
        amenities: { wifi: true, kitchen: false, freeParking: false, pool: false, gym: false, airConditioning: true, heating: true, tv: true, workspace: false },
        ratings: { overall: 4.8, cleanliness: 4.9, communication: 4.7, checkIn: 4.8, accuracy: 4.9, location: 4.6, value: 4.9 },
        reviewCount: 186,
        images: ["https://images.unsplash.com/photo-1528164344705-47542687000d?w=800"],
        owner: hostTokyo._id,
      },
      // Cape Town
      {
        title: "Table Mountain View Villa",
        description: "Stunning villa with views of Table Mountain.",
        price: 250,
        location: "capetown",
        propertyType: "Entire villa",
        guests: 8,
        bedrooms: 4,
        bathrooms: 3,
        amenities: { wifi: true, kitchen: true, freeParking: true, pool: true, gym: false, airConditioning: false, heating: false, tv: true, workspace: true },
        ratings: { overall: 4.8, cleanliness: 4.9, communication: 4.7, checkIn: 4.8, accuracy: 4.8, location: 4.9, value: 4.7 },
        reviewCount: 124,
        images: ["https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=800"],
        owner: hostCapeTown._id,
      },
      {
        title: "V&A Waterfront Penthouse",
        description: "Luxury penthouse at the V&A Waterfront.",
        price: 180,
        location: "capetown",
        propertyType: "Entire penthouse",
        guests: 4,
        bedrooms: 2,
        bathrooms: 2,
        amenities: { wifi: true, kitchen: true, freeParking: true, pool: false, gym: true, airConditioning: false, heating: false, tv: true, workspace: true },
        ratings: { overall: 4.6, cleanliness: 4.7, communication: 4.8, checkIn: 4.5, accuracy: 4.6, location: 4.8, value: 4.7 },
        reviewCount: 87,
        images: ["https://images.unsplash.com/photo-1562663474-6cbb3eaa4d14?w=800"],
        owner: hostCapeTown._id,
      },
      // Thailand
      {
        title: "Bangkok Luxury Condo",
        description: "Modern luxury condominium in Bangkok.",
        price: 120,
        location: "thailand",
        propertyType: "Entire condominium",
        guests: 4,
        bedrooms: 2,
        bathrooms: 2,
        amenities: { wifi: true, kitchen: true, freeParking: true, pool: true, gym: true, airConditioning: true, heating: false, tv: true, workspace: true },
        ratings: { overall: 4.5, cleanliness: 4.6, communication: 4.7, checkIn: 4.4, accuracy: 4.5, location: 4.6, value: 4.8 },
        reviewCount: 234,
        images: ["https://images.unsplash.com/photo-1528181304800-259b08848526?w=800"],
        owner: hostThailand._id,
      },
      {
        title: "Phuket Beach Villa",
        description: "Tropical villa near beaches in Phuket.",
        price: 200,
        location: "thailand",
        propertyType: "Entire villa",
        guests: 6,
        bedrooms: 3,
        bathrooms: 3,
        amenities: { wifi: true, kitchen: true, freeParking: true, pool: true, gym: false, airConditioning: true, heating: false, tv: true, workspace: false },
        ratings: { overall: 4.7, cleanliness: 4.8, communication: 4.6, checkIn: 4.7, accuracy: 4.7, location: 4.8, value: 4.6 },
        reviewCount: 167,
        images: ["https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800"],
        owner: hostThailand._id,
      }
    ];

    const accommodations = await Accommodation.insertMany(accommodationsData);
    console.log(`Created ${accommodations.length} accommodations`);

    // Create sample reservations
    const reservationsData = [
  {
    user: user1._id,
    accommodation: accommodations[0]._id,
    startDate: new Date("2025-12-01"),
    endDate: new Date("2025-12-05"),
    guests: 2,
    totalPrice: accommodations[0].price * 4,
  },
  {
    user: user1._id,
    accommodation: accommodations[4]._id,
    startDate: new Date("2025-11-20"),
    endDate: new Date("2025-11-25"),
    guests: 3,
    totalPrice: accommodations[4].price * 5,
  },
];


    await Reservation.insertMany(reservationsData);
    console.log(`Created ${reservationsData.length} reservations`);

    console.log("\nSeeding complete!");
    process.exit();
  } catch (err) {
    console.error("Error seeding data:", err);
    process.exit(1);
  }
};

seed();
