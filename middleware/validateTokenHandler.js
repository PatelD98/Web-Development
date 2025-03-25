const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const validateTokenHandler = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Extract token from the Authorization header
            token = req.headers.authorization.split(" ")[1];

            // Verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach the user to the request object
            req.user = await User.findById(decoded.id).select("-password");

            if (!req.user) {
                res.status(401);
                throw new Error("User not found");
            }

            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }

    if (!token) {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});

module.exports = validateTokenHandler;