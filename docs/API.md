# Buckalew Financial Services API Documentation

## Authentication
All API requests require JWT authentication.

## Endpoints

### User Management
- POST /api/users/register
- POST /api/users/login
- GET /api/users/profile

### Financial Services
- GET /api/portfolio
- POST /api/transactions
- GET /api/analysis/risk

### System Status
- GET /api/health
- GET /metrics

## Error Codes
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error