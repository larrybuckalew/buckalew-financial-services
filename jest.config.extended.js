/**
 * Extended Jest Configuration
 * 
 * Implements comprehensive test coverage for:
 * - Unit Tests
 * - Integration Tests
 * - E2E Tests
 * - Performance Tests
 */

module.exports = {
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom'
};