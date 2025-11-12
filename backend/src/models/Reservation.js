// const mongoose = require("mongoose");

// const reservationSchema = new mongoose.Schema({
//     accomodation: { type: String, ref: 'Accommodation', required: true },
//     user: { type: String, ref: 'User', required: true },
//     startDate: { type: Date, required: true },
//     endDate: { type: Date, required: true },
//     status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
//     createdAt: { type: Date, default: Date.now },
//     updatedAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Reservation", reservationSchema, "Listings");

const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  accommodation: { type: mongoose.Schema.Types.ObjectId, ref: "Accommodation", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
}, { timestamps: true });

module.exports = mongoose.model("Reservation", reservationSchema);
