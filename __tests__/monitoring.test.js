import monitoring from '../lib/monitoring';

describe('Monitoring Service', () => {
  test('should track requests correctly', () => {
    monitoring.trackRequest('GET', '/api/status', 200);
    const metrics = monitoring.getMetrics();
    expect(metrics).toContain('app_requests_total');
  });

  test('health check returns status', async () => {
    const health = await monitoring.healthCheck();
    expect(health).toHaveProperty('status');
    expect(health).toHaveProperty('checks');
  });
});