# Buckalew Financial Services - Security Services

## Overview
Advanced security services providing multi-layered protection for financial transactions and user accounts.

## Services

### 1. Two-Factor Authentication (2FA)
- Generate 2FA secrets
- Create QR codes for authentication
- Verify 2FA tokens
- Enable/disable two-factor authentication

### 2. IP Access Control
- Create IP-based access rules
- Geolocation-based access verification
- Log access attempts
- Manage allowed/blocked IPs and countries

### 3. Fraud Detection
- Machine learning-powered fraud risk assessment
- Real-time transaction risk scoring
- Comprehensive fraud flag detection
- Periodic model training

## Key Security Features
- Multi-factor authentication
- Geolocation-based access control
- Machine learning fraud detection
- Comprehensive access logging

## Technologies
- Speakeasy (2FA generation)
- Geoip-lite (IP geolocation)
- TensorFlow.js (Machine Learning)
- Prisma ORM (Database interactions)

## Future Enhancements
- Advanced machine learning models
- More granular access controls
- Real-time fraud prevention
- Enhanced risk scoring algorithms

## Usage Examples

### Two-Factor Authentication
```typescript
// Generate 2FA setup
const setup = await twoFactorAuthService.generateTwoFactorSecret(userId);

// Verify 2FA token
const isValid = twoFactorAuthService.verifyTwoFactorToken(secret, token);
```

### IP Access Control
```typescript
// Check IP access
const isAllowed = await ipAccessControlService.isIPAllowed(userId, ipAddress);

// Log access attempt
await ipAccessControlService.logAccessAttempt(userId, ipAddress, isAllowed);
```

### Fraud Detection
```typescript
// Assess transaction risk
const riskAssessment = await fraudDetectionService.assessTransactionRisk(transaction);

// Get recent fraud alerts
const fraudAlerts = await fraudDetectionService.getRecentFraudAlerts(userId);
```
