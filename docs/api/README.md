# API Documentation

## Overview

The Buckalew Financial Services API is organized around REST. Our API accepts JSON-encoded request bodies, returns JSON-encoded responses, and uses standard HTTP response codes and authentication.

## Base URL

All API requests should be made to:
```
https://api.buckalew-financial.com/v1
```

## Authentication

Authentication is handled via JWT tokens. Include the token in the Authorization header:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

## Common Response Format

All API responses follow this format:
```json
{
  "success": true|false,
  "data": {}, // Response data if successful
  "error": {  // Error information if unsuccessful
    "code": "ERROR_CODE",
    "message": "Human readable message",
    "details": {} // Additional error details if available
  }
}
```

## Rate Limiting

API requests are limited to:
- 100 requests per minute for authenticated users
- 20 requests per minute for unauthenticated users

## Available Endpoints

### Authentication
- `POST /auth/login`
- `POST /auth/register`
- `POST /auth/reset-password`
- `POST /auth/refresh-token`

### Calculators
- `POST /calculators/mortgage`
- `POST /calculators/retirement`
- `POST /calculators/insurance`

### Client Management
- `POST /contacts`
- `GET /appointments`
- `POST /appointments`

### Content Management
- `GET /services`
- `GET /resources`
- `GET /blog-posts`

For detailed information about each endpoint, see the individual API documentation files.