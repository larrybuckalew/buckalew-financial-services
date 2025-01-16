import { format, subMonths, parseISO } from 'date-fns';

// Interfaces for financial trend analysis
export interface FinancialTrend {
  period: string;
  totalRevenue: number;
  averageTransactionValue: number;
  growthRate: number;
}

export interface InvestmentTrend {
  assetClass: string;
  performance: number;
  volatility: number;
}

export interface SectorPerformance {
  sector: string;
  returnRate: number;
  riskScore: number;
}

class FinancialTrendsService {
  // Analyze historical financial performance
  analyzeFinancialPerformance(transactions: any[]): FinancialTrend[] {
    // Group transactions by month
    const monthlyGrouped = this.groupTransactionsByMonth(transactions);

    return Object.entries(monthlyGrouped).map(([period, monthTransactions]) => ({
      period,
      totalRevenue: this.calculateTotalRevenue(monthTransactions),
      averageTransactionValue: this.calculateAverageTransactionValue(monthTransactions),
      growthRate: this.calculateMonthOverMonthGrowth(monthlyGrouped, period)
    }));
  }

  // Group transactions by month
  private groupTransactionsByMonth(transactions: any[]): { [key: string]: any[] } {
    return transactions.reduce((acc, transaction) => {
      const monthKey = format(parseISO(transaction.date), 'yyyy-MM');
      if (!acc[monthKey]) {
        acc[monthKey] = [];
      }
      acc[monthKey].push(transaction);
      return acc;
    }, {});
  }

  // Calculate total revenue for a period
  private calculateTotalRevenue(transactions: any[]): number {
    return transactions.reduce((total, transaction) => 
      total + Math.abs(transaction.amount), 0);
  }

  // Calculate average transaction value
  private calculateAverageTransactionValue(transactions: any[]): number {
    if (transactions.length === 0) return 0;
    const totalValue = transactions.reduce((total, transaction) => 
      total + Math.abs(transaction.amount), 0);
    return totalValue / transactions.length;
  }

  // Calculate month-over-month growth
  private calculateMonthOverMonthGrowth(
    monthlyData: { [key: string]: any[] }, 
    currentPeriod: string
  ): number {
    const currentMonthRevenue = this.calculateTotalRevenue(monthlyData[currentPeriod]);
    const previousMonthKey = format(
      subMonths(parseISO(`${currentPeriod}-01`), 1), 
      'yyyy-MM'
    );
    
    if (!monthlyData[previousMonthKey]) return 0;
    
    const previousMonthRevenue = this.calculateTotalRevenue(monthlyData[previousMonthKey]);
    
    return previousMonthRevenue 
      ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100 
      : 0;
  }

  // Analyze investment performance across sectors
  analyzeSectorPerformance(investments: any[]): SectorPerformance[] {
    const sectorGroups = investments.reduce((acc, investment) => {
      if (!acc[investment.sector]) {
        acc[investment.sector] = [];
      }
      acc[investment.sector].push(investment);
      return acc;
    }, {});

    return Object.entries(sectorGroups).map(([sector, sectorInvestments]) => {
      const returns = sectorInvestments.map(inv => 
        (inv.currentValue - inv.initialInvestment) / inv.initialInvestment * 100
      );

      return {
        sector,
        returnRate: this.calculateAverage(returns),
        riskScore: this.calculateStandardDeviation(returns)
      };
    });
  }

  // Calculate average
  private calculateAverage(values: number[]): number {
    if (values.length === 0) return 0;
    return values.reduce((sum, val) => sum + val, 0) / values.length;
  }

  // Calculate standard deviation (risk score)
  private calculateStandardDeviation(values: number[]): number {
    if (values.length === 0) return 0;
    
    const avg = this.calculateAverage(values);
    const squareDiffs = values.map(value => Math.pow(value - avg, 2));
    const avgSquareDiff = this.calculateAverage(squareDiffs);
    
    return Math.sqrt(avgSquareDiff);
  }

  // Predict future financial trends
  predictFinancialTrends(historicalData: any[], periods: number = 3): FinancialTrend[] {
    const historicalTrends = this.analyzeFinancialPerformance(historicalData);
    const lastTrend = historicalTrends[historicalTrends.length - 1];

    const predictions: FinancialTrend[] = [];
    
    for (let i = 1; i <= periods; i++) {
      const predictedRevenue = lastTrend.totalRevenue * (1 + (lastTrend.growthRate / 100));
      predictions.push({
        period: `Forecast ${i}`,
        totalRevenue: predictedRevenue,
        averageTransactionValue: lastTrend.averageTransactionValue,
        growthRate: lastTrend.growthRate
      });
    }

    return predictions;
  }
}

export default new FinancialTrendsService();
