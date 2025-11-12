const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");

router.post("/login",
    [
        body("email").notEmpty().withMessage("Email or username is required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    userController.loginUser
);

router.post("/register",
    [
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
        body("name").notEmpty().withMessage("Name is required"),
    ],
    userController.registerUser
);


router.get("/profile", auth, userController.getUserProfile);

module.exports = router;