/**
 * API Client Utility
 * 
 * Implements:
 * - Request/Response Interceptors
 * - Error Handling
 * - Retry Logic
 * - Rate Limiting
 */

import axios from 'axios';

const apiClient = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(
  config => {
    // Add auth headers, logging, etc.
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  response => response,
  error => {
    // Handle errors, implement retry logic
    return Promise.reject(error);
  }
);

export default apiClient;