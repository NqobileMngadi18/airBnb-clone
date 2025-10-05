const Accommodation = require("../models/Accommodation");
const express = require("express");
const router = express.Router
const { validationResult } = require("express-validator");

// Get all accommodations
 
exports.getAllAccommodations = async (req, res) => {
    try {
        const accommodations = await Accommodation.find();
        res.status(200). json(accommodations);
    } catch (err) {
        res.status(500).json({ message: "Error fetching accommodations", error: err });
    }
};

// Get single accommodation by ID

exports.getAccommodationById = async (req, res) => {
    try {
       const accommodation = await Accommodation.findById(req.params.id).populate("owner", "name email role");
         if (!accommodation) return res.status(404).json({ message: "Accommodation not found" });
            res.status(200).json(accommodation);
    } catch (err) {
        res.status(500).json({ message: "Error fetching accommodation", error: err });
    }
};

// Create new accomodation

exports.createAccommodation = async (req, res) => {
   try {
        const accommodation = new Accommodation({ ...req.body, owner: req.user.id });
        await accommodation.save();
        res.status(201).json(accommodation);
   } catch (err) {
        res.status(400).json({ message: "Error creating accommodation", error: err });
   }
};

// Update accommodation

exports.updateAccommodation = async (req, res) => {
    try {
        const updatedAccommodation = await Accommodation.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedAccommodation) return res.status(404).json({ message: "Accommodation not found" });
        res.status(200).json(updatedAccommodation);
    } catch (err) {
        res.status(500).json({ message: "Error updating accommodation", error: err });
    }   
};

// Delete accomodation

exports.deleteAccommodation = async (req, res) => {
    try {
        const deletedAccommodation = await Accommodation.findByIdAndDelete(req.params.id);
        if (!deletedAccommodation) return res.status(404).json({ message: "Accommodation not found" });
        res.status(200).json({ message: "Accommodation deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting accommodation", error: err });
    }   
};