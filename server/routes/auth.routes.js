const express = require('express');
const router = express.Router();
const { validateToken } = require('../middleware/auth.middleware');
const authController = require('../controllers/auth.controller');

// Auth routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', validateToken, authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

module.exports = router;