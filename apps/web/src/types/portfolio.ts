export interface PortfolioAnalysis {
  portfolioId: string;
  timestamp: string;
  holdings: HoldingAnalysis[];
  totalValue: number;
  totalGain: number;
  totalGainPercentage: number;
  riskMetrics: RiskMetrics;
  currentAllocation: AllocationTarget[];
  targetAllocation: AllocationTarget[];
  rebalancingNeeded: RebalancingRecommendation[];
}

export interface HoldingAnalysis {
  symbol: string;
  shares: number;
  currentPrice: number;
  currentValue: number;
  costBasis: number;
  gain: number;
  gainPercentage: number;
}

export interface RiskMetrics {
  volatility: number;
  beta: number;
  sharpeRatio: number;
  diversificationScore: number;
}

export interface AllocationTarget {
  type: string;
  percentage: number;
}

export interface RebalancingPlan {
  portfolioId: string;
  timestamp: string;
  currentAllocation: AllocationTarget[];
  targetAllocation: AllocationTarget[];
  recommendations: TradeRecommendation[];
  taxImplications: TaxImplication[];
  estimatedCosts: number;
}

export interface TradeRecommendation {
  symbol: string;
  action: 'BUY' | 'SELL';
  shares: number;
  estimatedPrice: number;
  reason: string;
}

export interface TaxImplication {
  symbol: string;
  gain: number;
  isLongTerm: boolean;
  estimatedTax: number;
}

export interface RebalancingRecommendation {
  assetType: string;
  currentPercentage: number;
  targetPercentage: number;
  differencePercentage: number;
  recommendedChange: number;
}