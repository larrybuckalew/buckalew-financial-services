import { describe, test, expect } from '@jest/globals';
import request from 'supertest';
import app from '../../server/app';

describe('API Integration Tests', () => {
  describe('Authentication Endpoints', () => {
    test('POST /api/auth/register', async () => {
      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'TestPassword123'
        });
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
    });

    test('POST /api/auth/login', async () => {
      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'TestPassword123'
        });
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });
  });

  describe('Financial Data Endpoints', () => {
    test('GET /api/portfolio/summary', async () => {
      const response = await request(app)
        .get('/api/portfolio/summary')
        .set('Authorization', `Bearer ${testToken}`);
      
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('totalValue');
      expect(response.body).toHaveProperty('allocation');
    });
  });
});