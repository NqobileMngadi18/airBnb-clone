const Reservation = require("../models/Reservation");
const express = require("express");
const router = express.Router();
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const Accomodation = require("../models/Accommodation");

// Get all reservations

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('user').populate('accomodation');
        res.status(200).json(reservations);
    } catch (err) {
        res.status(500).json({ message: "Error fetching reservations", error: err });
    }
};

// Get single reservation by ID

exports.getReservationById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID" });
        const reservation = await Reservation.findById(id).populate('user').populate('accomodation');
        if (!reservation) return res.status(404).json({ message: "Reservation not found" });
        res.status(200).json(reservation);
    } catch (err) {
        res.status(500).json({ message: "Error fetching reservation", error: err });
    }
};

// Create new reservation

exports.createReservation = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { accomodation: accomodationId, startDate, endDate } = req.body;
        const accomodation = await Accomodation.findById(accomodationId);
        if (!accomodation) return res.status(404).json({ message: "Accomodation not found" });
        const newReservation = new Reservation({ accomodation: accomodationId, startDate, endDate, user: req.user.id });
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
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID" });
        const updatedReservation = await Reservation.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );
        if (!updatedReservation) return res.status(404).json({ message: "Reservation not found" });
        res.status(200).json(updatedReservation);
    } catch (err) {
        res.status(400).json({ message: "Error updating reservation", error: err });
    }
};

// Delete reservation

exports.deleteReservation = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ message: "Invalid ID" });
        const reservation = await Reservation.findByIdAndDelete(id);
        if (!deleteReservation) return res.status(404).json({ message: "Reservation not found" });
        res.status(200).json({ message: "Reservation deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting reservation", error: err });
    }
};