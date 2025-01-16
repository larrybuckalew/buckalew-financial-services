import { prisma } from '@/lib/prisma';
import { calculateMetrics } from '../analysis/risk-metrics';

export async function checkRiskAlerts(portfolioId) {
  const alerts = [];
  const portfolio = await getPortfolioData(portfolioId);
  const metrics = await calculateMetrics(portfolio);

  // Check volatility spikes
  if (await checkVolatilitySpike(metrics)) {
    alerts.push({
      type: 'VOLATILITY_SPIKE',
      severity: 'HIGH',
      title: 'Abnormal Volatility Detected',
      description: 'Portfolio volatility has increased significantly',
      action: 'REVIEW_RISK_EXPOSURE'
    });
  }

  // Check correlation changes
  const correlationAlerts = await checkCorrelationChanges(metrics);
  alerts.push(...correlationAlerts);

  // Check drawdown thresholds
  if (metrics.maxDrawdown <= -15) {
    alerts.push({
      type: 'EXCESSIVE_DRAWDOWN',
      severity: 'CRITICAL',
      title: 'Significant Portfolio Drawdown',
      description: `Portfolio drawdown of ${metrics.maxDrawdown}% exceeds threshold`,
      action: 'IMMEDIATE_REVIEW'
    });
  }

  // Check beta deviation
  const betaAlerts = await checkBetaDeviation(metrics);
  if (betaAlerts) alerts.push(betaAlerts);

  // Check liquidity risk
  const liquidityAlerts = await checkLiquidityRisk(portfolio);
  alerts.push(...liquidityAlerts);

  return alerts;
}

async function checkVolatilitySpike(metrics) {
  const historicalVol = await getHistoricalVolatility(metrics.portfolioId);
  const currentVol = metrics.volatility;
  return currentVol > (historicalVol.mean + 2 * historicalVol.stdDev);
}

async function checkCorrelationChanges(metrics) {
  const alerts = [];
  const correlationChanges = await getCorrelationChanges(metrics.portfolioId);

  for (const change of correlationChanges) {
    if (Math.abs(change.delta) > 0.3) {
      alerts.push({
        type: 'CORRELATION_SHIFT',
        severity: 'MEDIUM',
        title: 'Significant Correlation Change',
        description: `Correlation change detected in ${change.asset} relationship`,
        action: 'REVIEW_DIVERSIFICATION'
      });
    }
  }

  return alerts;
}

async function checkBetaDeviation(metrics) {
  const targetBeta = await getTargetBeta(metrics.portfolioId);
  const currentBeta = metrics.beta;
  const deviation = Math.abs(currentBeta - targetBeta);

  if (deviation > 0.2) {
    return {
      type: 'BETA_DEVIATION',
      severity: 'MEDIUM',
      title: 'Portfolio Beta Deviation',
      description: `Portfolio beta of ${currentBeta} deviates from target of ${targetBeta}`,
      action: 'ADJUST_MARKET_EXPOSURE'
    };
  }

  return null;
}

async function checkLiquidityRisk(portfolio) {
  const alerts = [];
  const liquidityMetrics = await calculateLiquidityMetrics(portfolio);

  if (liquidityMetrics.illiquidPercentage > 25) {
    alerts.push({
      type: 'LIQUIDITY_RISK',
      severity: 'HIGH',
      title: 'High Illiquid Asset Exposure',
      description: `Portfolio contains ${liquidityMetrics.illiquidPercentage}% illiquid assets`,
      action: 'REVIEW_LIQUIDITY_PROFILE'
    });
  }

  return alerts;
}
