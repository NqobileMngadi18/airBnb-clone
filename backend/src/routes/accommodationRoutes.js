const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const accommodationController = require("../controllers/accommodationController");
const auth = require("../middleware/auth");

router.get("/", accommodationController.getAllAccommodations);
router.get("/:id", accommodationController.getAccommodationById);
router.post("/", auth, 
    [
        body("title").notEmpty().withMessage("Title is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("price").isNumeric().withMessage("Price must be a number"),
        body("location").notEmpty().withMessage("Location is required"),
    ],
    accommodationController.createAccommodation
);
router.put("/:id", auth, accommodationController.updateAccommodation);
router.delete("/:id", auth, accommodationController.deleteAccommodation);

module.exports = router;