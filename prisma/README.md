# Buckalew Financial Services - Database Setup

## Prisma Database Management

### Prerequisites
- PostgreSQL installed
- `.env` file configured with `DATABASE_URL`

### Initial Setup
1. Install dependencies
```bash
npm install
```

2. Generate Prisma Client
```bash
npx prisma generate
```

### Database Migrations
Create a new migration:
```bash
# Use the custom script for migration
./prisma/migrations/create-migration.sh MigrationName
```

### Seeding Database
To seed the database with initial data:
```bash
npm run db:seed
```

### Reset Database
To completely reset the database:
```bash
npm run db:reset
```

## Database Schema Overview
- Users with roles (Admin, Advisor, Client)
- Comprehensive financial models
- Secure authentication
- Detailed transaction tracking

### Models Include:
- User
- Profile
- Account
- Investment
- Transaction
- Insurance Policy

### Key Features
- Role-based access control
- Secure password hashing
- Comprehensive financial tracking
- Flexible data modeling
