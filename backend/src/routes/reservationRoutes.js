const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const Reservation = require("../models/Reservation");
const reservationController = require("../controllers/reservationController");

router.get("/", reservationController.getAllReservations);
router.get("/:id", reservationController.getReservationById);
// router.post("/", reservationController.createReservation);
router.post("/", auth, reservationController.createReservation);
router.put("/:id", auth, reservationController.updateReservation);
router.delete("/:id", auth, reservationController.deleteReservation);

module.exports = router;
