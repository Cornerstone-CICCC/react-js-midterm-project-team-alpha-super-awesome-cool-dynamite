// CARLOS: Authentication Routes
// Defines endpoints for signup, login and logout

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// CARLOS: POST /api/auth/signup - Create new account
router.post('/signup', authController.signup);

// CARLOS: POST /api/auth/login - Sign in
router.post('/login', authController.login);

// CARLOS: POST /api/auth/logout - Sign out
router.post('/logout', authController.logout);

module.exports = router;
