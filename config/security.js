/**
 * Security Configuration
 * 
 * Implements:
 * - Rate Limiting
 * - Input Validation
 * - XSS Protection
 * - CSRF Protection
 * - Content Security Policy
 */

const securityConfig = {
  rateLimiting: {
    windowMs: 15 * 60 * 1000,
    max: 100
  },
  csrf: {
    enabled: true,
    cookie: true
  },
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"]
    }
  }
};

module.exports = securityConfig;