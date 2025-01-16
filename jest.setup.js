// jest.setup.js
import '@testing-library/jest-dom/extend-expect';

// Optional: Add global mocks or setup for your tests
// For example:
// jest.mock('next/router', () => require('next-router-mock'));

// Extend timeout for async tests if needed
jest.setTimeout(10000);
