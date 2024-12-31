// Authentication Middleware
const jwt = require('jsonwebtoken');
const config = require('../config');

const auth = {
    // Verify JWT token
    verifyToken: async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;

            if (!token) {
                return res.status(401).json({
                    success: false,
                    error: 'No token provided'
                });
            }

            const decoded = jwt.verify(token, config.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                error: 'Invalid token'
            });
        }
    },

    // Require admin role
    requireAdmin: async (req, res, next) => {
        try {
            const token = req.headers.authorization?.split(' ')[1] || req.cookies?.token;

            if (!token) {
                return res.status(401).json({
                    success: false,
                    error: 'No token provided'
                });
            }

            const decoded = jwt.verify(token, config.JWT_SECRET);
            
            if (!decoded.isAdmin) {
                return res.status(403).json({
                    success: false,
                    error: 'Admin access required'
                });
            }

            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                error: 'Invalid token'
            });
        }
    },

    // Create JWT token
    createToken: (user) => {
        return jwt.sign(
            {
                id: user.id,
                email: user.email,
                isAdmin: user.isAdmin
            },
            config.JWT_SECRET,
            { expiresIn: '24h' }
        );
    },

    // Verify session middleware
    verifySession: async (req, res, next) => {
        try {
            // Check for active session
            if (!req.session || !req.session.userId) {
                return res.status(401).json({
                    success: false,
                    error: 'No active session'
                });
            }

            // Optionally verify session in database
            // const session = await Session.findById(req.session.id);
            // if (!session || session.isExpired) {
            //     return res.status(401).json({
            //         success: false,
            //         error: 'Session expired'
            //     });
            // }

            next();
        } catch (error) {
            return res.status(401).json({
                success: false,
                error: 'Session verification failed'
            });
        }
    },

    // Security headers middleware
    securityHeaders: (req, res, next) => {
        // Set security headers
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
        res.setHeader('Content-Security-Policy', "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'");

        next();
    },

    // Rate limiting middleware
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
    },

    // CSRF protection
    csrfProtection: async (req, res, next) => {
        // Implement CSRF token verification
        const csrfToken = req.headers['x-csrf-token'] || req.body._csrf;
        
        if (!csrfToken || !validateCsrfToken(csrfToken)) {
            return res.status(403).json({
                success: false,
                error: 'Invalid CSRF token'
            });
        }

        next();
    }
};

// Helper function to validate CSRF token
function validateCsrfToken(token) {
    // Implement CSRF token validation logic
    return true; // Placeholder
}

module.exports = auth;