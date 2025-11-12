const mongoose = require("mongoose");

const accommodationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },
    images: [String],

    // Property Details
    propertyType: { type: String, default: "Entire home/apartment" },
    guests: { type: Number, required: true, default: 4 },
    bedrooms: { type: Number, required: true, default: 2 },
    bathrooms: { type: Number, required: true, default: 2 },

    // Amenities
    amenities: {
        wifi: { type: Boolean, default: true },
        kitchen: { type: Boolean, default: true },
        freeParking: { type: Boolean, default: true },
        pool: { type: Boolean, default: false },
        gym: { type: Boolean, default: false },
        airConditioning: { type: Boolean, default: false },
        heating: { type: Boolean, default: false },
        tv: { type: Boolean, default: true },
        workspace: { type: Boolean, default: false }
    },

    // Ratings and Reviews
    ratings: {
        overall: { type: Number, default: 4.5, min: 1, max: 5 },
        cleanliness: { type: Number, default: 4.5, min: 1, max: 5 },
        communication: { type: Number, default: 4.5, min: 1, max: 5 },
        checkIn: { type: Number, default: 4.5, min: 1, max: 5 },
        accuracy: { type: Number, default: 4.5, min: 1, max: 5 },
        location: { type: Number, default: 4.5, min: 1, max: 5 },
        value: { type: Number, default: 4.5, min: 1, max: 5 }
    },

    reviewCount: { type: Number, default: 0 },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model("Accommodation", accommodationSchema);