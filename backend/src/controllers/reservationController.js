const Reservation = require("../models/Reservation");
const mongoose = require("mongoose");
const Accommodation = require("../models/Accommodation");
const { validationResult } = require("express-validator");
const auth = require("../middleware/auth");

// Get all reservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("user")
      .populate("accommodation");
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reservations", error: err });
  }
};

// Get single reservation by ID
exports.getReservationById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID" });

    const reservation = await Reservation.findById(id)
      .populate("user")
      .populate("accommodation");

    if (!reservation)
      return res.status(404).json({ message: "Reservation not found" });

    res.status(200).json(reservation);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reservation", error: err });
  }
};

// Create reservation
exports.createReservation = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { accommodationId, startDate, endDate,} = req.body;
    const userId = req.user.id;
    // Check accommodation exists
    const accommodation = await Accommodation.findById(accommodationId);
    if (!accommodation)
      return res.status(404).json({ message: "Accommodation not found" });

    // Create reservation using IDs
    const newReservation = new Reservation({
      accommodation: accommodationId,
      user: userId,
      startDate,
      endDate,
    });

    await newReservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ message: "Error creating reservation", error: err });
  }
};

// Update reservation
exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID" });

    const updatedReservation = await Reservation.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedReservation)
      return res.status(404).json({ message: "Reservation not found" });

    res.status(200).json(updatedReservation);
  } catch (err) {
    res.status(400).json({ message: "Error updating reservation", error: err });
  }
};

// Delete reservation
exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: "Invalid ID" });

    const reservation = await Reservation.findByIdAndDelete(id);
    if (!reservation)
      return res.status(404).json({ message: "Reservation not found" });

    res.status(200).json({ message: "Reservation deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting reservation", error: err });
  }
};
