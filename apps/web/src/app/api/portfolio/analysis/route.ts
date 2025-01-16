import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { withErrorHandling } from '@/lib/api/middleware';
import { optimizePortfolio } from '@/lib/finance/portfolioOptimization';

export const GET = withErrorHandling(async (req) => {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Get user's portfolio data
  const portfolio = await prisma.portfolio.findUnique({
    where: { userId: session.user.id },
    include: {
      assets: true,
      transactions: {
        orderBy: { date: 'desc' },
        take: 365 // Last year of transactions
      }
    }
  });

  if (!portfolio) {
    return NextResponse.json({ error: 'Portfolio not found' }, { status: 404 });
  }

  // Calculate key metrics
  const metrics = await calculatePortfolioMetrics(portfolio);

  // Get optimization recommendations
  const recommendations = generateRecommendations(portfolio, metrics);

  return NextResponse.json({
    metrics,
    recommendations
  });
});

async function calculatePortfolioMetrics(portfolio) {
  const returns = calculateReturns(portfolio.transactions);
  const volatility = calculateVolatility(returns);
  const sharpeRatio = calculateSharpeRatio(returns, volatility);
  const drawdown = calculateMaxDrawdown(portfolio.transactions);
  const diversification = calculateDiversificationScore(portfolio.assets);

  return {
    returns,
    volatility,
    sharpeRatio,
    drawdown,
    diversification
  };
}

function calculateReturns(transactions) {
  // Calculate daily, monthly, and yearly returns
  const dailyReturns = [];
  const monthlyReturns = [];
  const yearlyReturns = [];

  // Implementation details...

  return {
    daily: dailyReturns,
    monthly: monthlyReturns,
    yearly: yearlyReturns
  };
}

function calculateVolatility(returns) {
  // Calculate standard deviation of returns
  const values = returns.daily;
  const mean = values.reduce((a, b) => a + b) / values.length;
  const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length;
  return Math.sqrt(variance);
}

function calculateSharpeRatio(returns, volatility) {
  const riskFreeRate = 0.02; // Assume 2% risk-free rate
  const excessReturn = returns.yearly[returns.yearly.length - 1] - riskFreeRate;
  return excessReturn / volatility;
}

function calculateMaxDrawdown(transactions) {
  // Calculate maximum drawdown from peak
  let maxDrawdown = 0;
  let peak = 0;

  transactions.forEach(transaction => {
    if (transaction.balance > peak) {
      peak = transaction.balance;
    }
    const drawdown = (peak - transaction.balance) / peak;
    if (drawdown > maxDrawdown) {
      maxDrawdown = drawdown;
    }
  });

  return maxDrawdown;
}

function calculateDiversificationScore(assets) {
  // Calculate diversification score based on asset allocation
  const weights = assets.map(asset => asset.percentage);
  const sumSquaredWeights = weights.reduce((a, b) => a + Math.pow(b, 2), 0);
  return (1 - sumSquaredWeights) * 100; // Higher score means better diversification
}

function generateRecommendations(portfolio, metrics) {
  const recommendations = [];

  // Check diversification
  if (metrics.diversification < 70) {
    recommendations.push({
      type: 'diversification',
      priority: 'high',
      message: 'Consider diversifying your portfolio across more asset classes',
      action: 'Review asset allocation'
    });
  }

  // Check risk level
  if (metrics.volatility > 0.2) {
    recommendations.push({
      type: 'risk',
      priority: 'medium',
      message: 'Portfolio volatility is higher than recommended',
      action: 'Consider reducing exposure to high-risk assets'
    });
  }

  // Check performance
  if (metrics.sharpeRatio < 1) {
    recommendations.push({
      type: 'performance',
      priority: 'medium',
      message: 'Risk-adjusted returns could be improved',
      action: 'Review asset selection and weights'
    });
  }

  return recommendations;
}