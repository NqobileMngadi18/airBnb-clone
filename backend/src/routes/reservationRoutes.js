const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Reservation = require("../models/Reservation");
const reservationController = require("../controllers/reservationController");
const auth = require("../middleware/auth");

router.get("/", reservationController.getAllReservations);
router.get("/:id", reservationController.getReservationById);
router.post("/", auth, reservationController.createReservation);
router.put("/:id", auth, reservationController.updateReservation);
router.delete("/:id", auth, reservationController.deleteReservation);

module.exports = router;
