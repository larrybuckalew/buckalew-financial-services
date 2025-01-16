const express = require('express');
const axios = require('axios');
const router = express.Router();

// ReCAPTCHA verification endpoint
router.post('/verify-recaptcha', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ success: false, message: 'No reCAPTCHA token provided' });
    }

    try {
        const recaptchaResponse = await axios.post(
            'https://www.google.com/recaptcha/api/siteverify',
            null,
            {
                params: {
                    secret: process.env.RECAPTCHA_SECRET_KEY,
                    response: token
                }
            }
        );

        const { success, score, action } = recaptchaResponse.data;

        // Check reCAPTCHA verification
        if (success && score > 0.5 && action === 'contact_form') {
            return res.json({ success: true, message: 'ReCAPTCHA verified' });
        } else {
            return res.status(400).json({ 
                success: false, 
                message: 'ReCAPTCHA verification failed',
                details: recaptchaResponse.data 
            });
        }
    } catch (error) {
        console.error('ReCAPTCHA verification error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Internal server error during reCAPTCHA verification' 
        });
    }
});

module.exports = router;