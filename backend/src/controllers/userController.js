const User = require("../models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// Register user
exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Invalid input",
            errors: errors.array()
        });
    }

    const { name, email, password, role = 'user' } = req.body;

    try {
        // Check if user already exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        // Create new user
        const user = new User({
            name,
            email,
            password: passwordHash,
            role
        });

        await user.save();

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: "Server error during registration" });
    }
};

// Login user
exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Invalid input",
            errors: errors.array()
        });
    }

    const { email, password } = req.body;

    try {
        const identifier = email; // can be username or email
        const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        const idRegex = new RegExp(`^${escapeRegex(identifier)}$`, 'i');

        // Find by email OR username (case-insensitive)
        let user = await User.findOne({
            $or: [
                { email: idRegex },
                { name: idRegex }
            ]
        });

        // Dev-mode auto bootstrap: only when identifier looks like an email
        const looksLikeEmail = /\S+@\S+\.\S+/.test(identifier);
        if (!user && process.env.NODE_ENV !== 'production' && looksLikeEmail) {
            const bcrypt = require('bcryptjs');
            const salt = await bcrypt.genSalt(10);
            const passwordHash = await bcrypt.hash(password, salt);
            user = new User({
                name: identifier.split('@')[0],
                email: identifier.toLowerCase(),
                password: passwordHash,
                role: 'user'
            });
            await user.save();
            console.log(`Auto-created dev user ${identifier}`);
        }
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        // Return both token and user data (excluding password)
        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({
            message: "Server error during login",
            error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
        });
    }
};

// Get logged in user

exports.getUserProfile = async (req, res) => {
    try {
        const user= await User.findById(req.user.id).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Error fetching user profile", error: err });
    }
};