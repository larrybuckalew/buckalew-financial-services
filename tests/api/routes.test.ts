
import request from 'supertest';
import app from '../../app/api/[...api]';

describe('API Routes', () => {
  test('GET /api/hello', async () => {
    const response = await request(app).get('/api/hello');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Hello, API!' });
  });

  // Add more API route tests here
});
