const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");
const { body } = require("express-validator");

router.post("/login",
    [
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    userController.loginUser
);

router.get("/profile", auth, userController.getUserProfile);

module.exports = router;