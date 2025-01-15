# Contact API Documentation

## Submit Contact Form

### `POST /api/contact/submit`

Submit a contact form inquiry.

#### Request Body
```typescript
{
  name: string;          // Full name of the contact
  email: string;         // Email address
  phone?: string;        // Optional phone number
  service?: string;      // Optional service of interest
  message: string;       // Inquiry message
  preferredContact?: 'email' | 'phone'; // Preferred contact method
  timeToContact?: string; // Best time to contact
}
```

#### Success Response
```typescript
{
  success: true,
  data: {
    referenceId: string;    // Reference ID for the inquiry
    receivedTimestamp: string; // When the inquiry was received
    estimatedResponse: string; // Estimated response time
  }
}
```

#### Error Response
```typescript
{
  success: false,
  error: {
    code: string;
    message: string;
    details?: {
      field?: string;
      value?: any;
      reason?: string;
    }
  }
}
```

## Get Contact Status

### `GET /api/contact/status/:referenceId`

Check the status of a submitted contact form.

#### Parameters
- `referenceId`: Contact form submission reference ID

#### Success Response
```typescript
{
  success: true,
  data: {
    status: 'new' | 'viewed' | 'in-progress' | 'responded' | 'closed';
    assignedTo?: string;    // Name of assigned representative
    lastUpdated: string;    // Timestamp of last status update
    nextAction?: string;    // Next planned action
  }
}
```

## Update Contact Preferences

### `PATCH /api/contact/preferences/:referenceId`

Update contact preferences for a submission.

#### Request Body
```typescript
{
  preferredContact?: 'email' | 'phone';
  timeToContact?: string;
  additionalNotes?: string;
}
```

#### Success Response
```typescript
{
  success: true,
  data: {
    updated: string[]; // List of updated fields
    timestamp: string; // When the update was processed
  }
}
```