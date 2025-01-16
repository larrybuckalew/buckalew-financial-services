import prometheus from 'prom-client';

// Portfolio Metrics
export const portfolioValue = new prometheus.Gauge({
  name: 'portfolio_total_value',
  help: 'Total portfolio value in USD',
  labelNames: ['portfolio_id', 'risk_level']
});

export const assetAllocation = new prometheus.Gauge({
  name: 'asset_allocation_percentage',
  help: 'Percentage allocation by asset type',
  labelNames: ['portfolio_id', 'asset_type']
});

export const investmentReturns = new prometheus.Gauge({
  name: 'investment_returns_percentage',
  help: 'Investment returns percentage',
  labelNames: ['portfolio_id', 'timeframe']
});

// Risk Metrics
export const riskMetrics = new prometheus.Gauge({
  name: 'portfolio_risk_metrics',
  help: 'Various risk metrics for portfolios',
  labelNames: ['portfolio_id', 'metric_type']
});

// Client Activity Metrics
export const clientActivity = new prometheus.Counter({
  name: 'client_activity_total',
  help: 'Total client activities by type',
  labelNames: ['activity_type', 'client_id']
});

export const documentAccess = new prometheus.Counter({
  name: 'document_access_total',
  help: 'Document access count',
  labelNames: ['document_type', 'client_id']
});

// Performance Metrics
export const portfolioPerformance = new prometheus.Histogram({
  name: 'portfolio_performance_distribution',
  help: 'Distribution of portfolio performance',
  labelNames: ['portfolio_id'],
  buckets: [-10, -5, 0, 5, 10, 15, 20, 25, 30]
});

// Compliance Metrics
export const complianceChecks = new prometheus.Counter({
  name: 'compliance_checks_total',
  help: 'Number of compliance checks performed',
  labelNames: ['check_type', 'result']
});

// Trading Metrics
export const tradingActivity = new prometheus.Counter({
  name: 'trading_activity_total',
  help: 'Number of trades executed',
  labelNames: ['trade_type', 'asset_class']
});
