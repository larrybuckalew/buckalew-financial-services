# Buckalew Financial Services Unified Project

## Project Overview

Buckalew Financial Services is a comprehensive financial solutions platform designed to provide users with advanced financial planning, calculation, and advisory tools.

### Key Features

- 🧮 Advanced Financial Calculators
  - Mortgage Calculator
  - Compound Interest Calculator
  - Retirement Planning Tools
  - Debt Management Calculators

- 🔒 Secure Authentication
- 📊 Responsive Design
- 🚀 Modern Tech Stack

## Technology Stack

- **Frontend**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Testing**: Jest, React Testing Library
- **Authentication**: NextAuth.js
- **Database**: Prisma ORM

## Project Structure

```
buckalew-financial-unified/
│
├── src/
│   ├── app/           # Next.js App Router
│   ├── components/    # Reusable UI Components
│   │   └── calculators/
│   ├── lib/           # Utility Functions
│   └── styles/        # Global Styles
│
├── prisma/            # Database Schema
├── tests/             # Testing Infrastructure
└── scripts/           # Utility Scripts
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL (recommended)

### Installation

1. Clone the repository
2. Install dependencies
   ```bash
   npm install
   ```
3. Set up environment variables
4. Run database migrations
   ```bash
   npx prisma migrate dev
   ```
5. Start development server
   ```bash
   npm run dev
   ```

## Testing

Run comprehensive test suite:
```bash
npm test
```

## Deployment

Configured for easy deployment on:
- Vercel
- Netlify
- AWS Amplify

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

Proprietary - Buckalew Financial Services

## Contact

- Email: support@buckalewfinancial.com
- Website: https://buckalewfinancial.com
```