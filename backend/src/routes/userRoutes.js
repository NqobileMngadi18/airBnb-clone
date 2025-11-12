const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const auth = require("../middleware/auth");
const userController = require("../controllers/userController");
<<<<<<< HEAD

router.post("/login",
    [
        body("email").notEmpty().withMessage("Email or username is required"),
=======
const { body } = require("express-validator");

router.post("/login",
    [
        body("email").isEmail().withMessage("Valid email is required"),
>>>>>>> 865287e79966027f0cd7f3e715612a2ead50933f
        body("password").notEmpty().withMessage("Password is required"),
    ],
    userController.loginUser
);

<<<<<<< HEAD
router.post("/register",
    [
        body("email").isEmail().withMessage("Valid email is required"),
        body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
        body("name").notEmpty().withMessage("Name is required"),
    ],
    userController.registerUser
);


=======
>>>>>>> 865287e79966027f0cd7f3e715612a2ead50933f
router.get("/profile", auth, userController.getUserProfile);

module.exports = router;