const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const validateTokenHandler = require("../middleware/validateTokenHandler");
const { log } = require("console");
const { default: mongoose } = require("mongoose");

//@desc Register a new user
//@route POST /api/users/register
//@access Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password:", hashedPassword);
    const user = await User.create({
        name, 
        email, 
        password: hashedPassword
    });

    console.log("User created:", user);
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

//@desc Login user
//@route POST /api/users/login
//@access Public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email && !password) {
        res.status(400);
        throw new Error("Please enter all fields");
    }
    const user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("Invalid credentials");
    }
    console.log("User found:", user);
    console.log("password:",password);
    console.log("user password:", user.password);
    console.log("bcrypt compare:", await bcrypt.compare(password, user.password));
    
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" })
        });
    }
    else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
});

//@desc Get current user
//@route GET /api/users/current
//@access Private
const getCurrentUser = asyncHandler(async (req, res) => {
    console.log("req.user:", req.user);
    res.json(req.user);
});


module.exports = { registerUser, loginUser, getCurrentUser };
