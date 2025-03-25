const express = require('express');
const router = express.Router();
const { 
    registerUser,
    loginUser,
    getCurrentUser
} = require('../controllers/userController');
const validateTokenHandler = require('../middleware/validateTokenHandler');

router.route("/register")
    .post(registerUser);

router.route("/login")
    .post(loginUser);

router.route("/current")
    .get(validateTokenHandler,getCurrentUser);

module.exports = router;