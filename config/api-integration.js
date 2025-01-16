/**
 * External API Integration Configuration
 * 
 * Configures connections to:
 * - Financial Data Providers
 * - Payment Processors
 * - Authentication Services
 * - Analytics Services
 */

const apiConfig = {
  financialData: {
    provider: 'financial-provider',
    apiKey: process.env.FINANCIAL_API_KEY,
    endpoint: process.env.FINANCIAL_API_ENDPOINT
  },
  payments: {
    provider: 'payment-processor',
    apiKey: process.env.PAYMENT_API_KEY,
    endpoint: process.env.PAYMENT_API_ENDPOINT
  },
  analytics: {
    provider: 'analytics-service',
    apiKey: process.env.ANALYTICS_API_KEY,
    endpoint: process.env.ANALYTICS_API_ENDPOINT
  }
};

module.exports = apiConfig;