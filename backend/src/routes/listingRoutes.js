const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const accommodationController = require("../controllers/accommodationController");
const auth = require("../middleware/auth");

// Get all listings (same as accommodations)
router.get("/", accommodationController.getAllAccommodations);

// Get single listing by ID
router.get("/:id", accommodationController.getAccommodationById);

// Create new listing (requires authentication)
router.post("/", auth,
    [
        body("title").notEmpty().withMessage("Title is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("price").isNumeric().withMessage("Price must be a number"),
        body("location").notEmpty().withMessage("Location is required"),
    ],
    accommodationController.createAccommodation
);

// Update listing (requires authentication)
router.put("/:id", auth, accommodationController.updateAccommodation);

// Delete listing (requires authentication)
router.delete("/:id", auth, accommodationController.deleteAccommodation);

module.exports = router;
