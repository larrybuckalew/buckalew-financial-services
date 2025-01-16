const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configured email transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Validate form data
function validateFormData(data) {
    const errors = {};

    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.name = 'Please provide a valid name';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.email = 'Please provide a valid email address';
    }

    // Phone validation
    const phoneRegex = /^\+?\d{10,14}$/;
    if (!data.phone || !phoneRegex.test(data.phone.replace(/[\s-()]/g, ''))) {
        errors.phone = 'Please provide a valid phone number';
    }

    return Object.keys(errors).length === 0 ? null : errors;
}

// Lead submission endpoint
router.post('/submit-lead', async (req, res) => {
    const formData = req.body;

    // Validate form data
    const validationErrors = validateFormData(formData);
    if (validationErrors) {
        return res.status(400).json({ 
            success: false, 
            errors: validationErrors 
        });
    }

    try {
        // Send email notification
        await transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            subject: 'New Lead Submission',
            html: `
                <h2>New Lead Submission</h2>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Phone:</strong> ${formData.phone}</p>
                <p><strong>Service of Interest:</strong> ${formData.['service-type']}</p>
                <p><strong>Message:</strong> ${formData.message}</p>
            `
        });

        // Optional: Store lead in database (not implemented here)

        res.status(200).json({ 
            success: true, 
            message: 'Lead submitted successfully' 
        });
    } catch (error) {
        console.error('Lead submission error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error processing lead submission' 
        });
    }
});

module.exports = router;