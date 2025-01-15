
# Development Setup Guide

## Prerequisites
- Node.js (version 14 or higher)
- yarn (or npm) installed globally

## Steps

1. **Clone the repository**:
   ```
   git clone https://github.com/your-username/buckalew-financial-services.git
   ```

2. **Install dependencies**:
   ```
   cd buckalew-financial-services
   yarn install
   ```

3. **Set up environment variables**:
   - Rename the `.env.example` file to `.env.local`
   - Update the environment variables with your specific configuration

4. **Start the development server**:
   ```
   yarn dev
   ```
   This will start the Next.js development server and you can access the application at `http://localhost:3000`.

5. **Run the test suite**:
   ```
   yarn test
   ```
   This will run the Jest and Playwright tests for the application.

6. **Build the application**:
   ```
   yarn build
   ```
   This will create a production-ready build of the application.
