# Authentication API Documentation

## User Authentication

### `POST /api/auth/login`

Authenticate a user and receive access tokens.

#### Request Body
```typescript
{
  email: string;      // User email
  password: string;   // User password
  remember?: boolean; // Optional: keep user logged in
}
```

#### Success Response
```typescript
{
  success: true,
  data: {
    token: string;        // JWT access token
    refreshToken: string; // Refresh token
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    }
  }
}
```

### `POST /api/auth/register`

Register a new user account.

#### Request Body
```typescript
{
  email: string;           // User email
  password: string;        // User password
  confirmPassword: string; // Password confirmation
  name: string;           // Full name
  acceptTerms: boolean;    // Terms acceptance
}
```

### `POST /api/auth/refresh`

Refresh an expired access token.

#### Request Body
```typescript
{
  refreshToken: string; // Refresh token
}
```

### `POST /api/auth/reset-password`

Request a password reset.

#### Request Body
```typescript
{
  email: string; // User email
}
```

### `POST /api/auth/reset-password/confirm`

Complete password reset process.

#### Request Body
```typescript
{
  token: string;           // Reset token from email
  password: string;        // New password
  confirmPassword: string; // Password confirmation
}
```

## Session Management

### `GET /api/auth/session`

Get current session information.

#### Success Response
```typescript
{
  success: true,
  data: {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    },
    expires: string; // Session expiration timestamp
  }
}
```

### `POST /api/auth/logout`

End the current session.

#### Success Response
```typescript
{
  success: true,
  data: {
    message: "Successfully logged out"
  }
}
```