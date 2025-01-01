import prometheus from 'prom-client';

// Initialize default metrics
prometheus.collectDefaultMetrics();

// Custom metrics
export const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 1, 3, 5, 10]
});

export const activeUsers = new prometheus.Gauge({
  name: 'active_users_total',
  help: 'Total number of active users'
});

export const portfolioValue = new prometheus.Gauge({
  name: 'portfolio_value_total',
  help: 'Total portfolio value in USD',
  labelNames: ['user_id']
});

export const transactionCount = new prometheus.Counter({
  name: 'transactions_total',
  help: 'Total number of transactions',
  labelNames: ['type']
});

export const errorCount = new prometheus.Counter({
  name: 'errors_total',
  help: 'Total number of errors',
  labelNames: ['type', 'code']
});

export const apiLatency = new prometheus.Summary({
  name: 'api_latency_seconds',
  help: 'API endpoint latency in seconds',
  labelNames: ['endpoint'],
  percentiles: [0.5, 0.9, 0.99]
});
