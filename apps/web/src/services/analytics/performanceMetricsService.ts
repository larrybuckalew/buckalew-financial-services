export interface PerformanceMetric {
  key: string;
  value: number;
  baseline?: number;
  unit?: string;
}

export interface SystemPerformance {
  responseTime: number;
  errorRate: number;
  cpuUsage: number;
  memoryUsage: number;
}

export interface InvestmentPerformance {
  totalReturn: number;
  annualizedReturn: number;
  sharpeRatio: number;
  maxDrawdown: number;
}

export interface UserConversionMetrics {
  signupConversionRate: number;
  activeUserRate: number;
  retentionRate: number;
  averageLifetimeValue: number;
}

class PerformanceMetricsService {
  // Calculate financial investment performance
  calculateInvestmentPerformance(investments: any[]): InvestmentPerformance {
    // Calculate total return
    const totalReturn = investments.reduce((total, inv) => 
      total + ((inv.currentValue - inv.initialInvestment) / inv.initialInvestment), 0
    ) / investments.length * 100;

    // Annualized return (assuming 1-year period)
    const annualizedReturn = totalReturn;

    // Simple Sharpe Ratio calculation (assuming risk-free rate of 2%)
    const riskFreeRate = 0.02;
    const standardDeviation = this.calculateStandardDeviation(
      investments.map(inv => 
        (inv.currentValue - inv.initialInvestment) / inv.initialInvestment
      )
    );
    const sharpeRatio = (totalReturn - riskFreeRate) / (standardDeviation || 1);

    // Max drawdown calculation
    const valuations = investments.map(inv => inv.currentValue);
    const maxDrawdown = this.calculateMaxDrawdown(valuations);

    return {
      totalReturn,
      annualizedReturn,
      sharpeRatio,
      maxDrawdown
    };
  }

  // Calculate standard deviation
  private calculateStandardDeviation(values: number[]): number {
    if (values.length === 0) return 0;
    
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const squareDiffs = values.map(value => Math.pow(value - mean, 2));
    const avgSquareDiff = squareDiffs.reduce((sum, val) => sum + val, 0) / values.length;
    
    return Math.sqrt(avgSquareDiff);
  }

  // Calculate max drawdown
  private calculateMaxDrawdown(values: number[]): number {
    let maxDrawdown = 0;
    let peak = values[0];

    for (let i = 1; i < values.length; i++) {
      // Update peak if new high is found
      peak = Math.max(peak, values[i]);
      
      // Calculate drawdown
      const drawdown = (peak - values[i]) / peak * 100;
      maxDrawdown = Math.max(maxDrawdown, drawdown);
    }

    return maxDrawdown;
  }

  // Calculate user conversion metrics
  calculateUserConversionMetrics(userData: any[]): UserConversionMetrics {
    const totalUsers = userData.length;
    const activeUsers = userData.filter(user => user.isActive).length;
    const signups = userData.filter(user => user.signupDate).length;

    // Signup conversion rate (assuming a baseline conversion target)
    const signupConversionRate = (signups / totalUsers) * 100;

    // Active user rate
    const activeUserRate = (activeUsers / totalUsers) * 100;

    // Retention rate (simplistic calculation)
    const retentionRate = userData.filter(user => 
      user.lastLoginDate && 
      (Date.now() - new Date(user.lastLoginDate).getTime()) < 30 * 24 * 60 * 60 * 1000
    ).length / totalUsers * 100;

    // Average lifetime value calculation
    const averageLifetimeValue = userData.reduce((total, user) => 
      total + (user.totalTransactionValue || 0), 0
    ) / totalUsers;

    return {
      signupConversionRate,
      activeUserRate,
      retentionRate,
      averageLifetimeValue
    };
  }

  // Track system performance
  trackSystemPerformance(): SystemPerformance {
    // In a real-world scenario, these would be dynamically gathered
    // Here we'll provide a simulated example
    return {
      responseTime: this.generateRandomMetric(50, 200), // ms
      errorRate: this.generateRandomMetric(0, 5), // percentage
      cpuUsage: this.generateRandomMetric(10, 80), // percentage
      memoryUsage: this.generateRandomMetric(20, 90) // percentage
    };
  }

  // Generate performance benchmarks
  generatePerformanceBenchmarks(metrics: PerformanceMetric[]): PerformanceMetric[] {
    return metrics.map(metric => ({
      ...metric,
      baseline: this.calculateBaseline(metric),
      status: this.evaluateMetricStatus(metric)
    }));
  }

  // Calculate baseline for a metric
  private calculateBaseline(metric: PerformanceMetric): number {
    // Implement baseline calculation logic
    switch (metric.key) {
      case 'responseTime':
        return 100; // 100ms baseline
      case 'errorRate':
        return 2; // 2% error rate baseline
      case 'userConversion':
        return 10; // 10% conversion baseline
      default:
        return metric.value * 0.9; // Default to 90% of current value
    }
  }

  // Evaluate metric status
  private evaluateMetricStatus(metric: PerformanceMetric): 'good' | 'warning' | 'critical' {
    if (!metric.baseline) return 'good';

    const deviation = Math.abs(metric.value - metric.baseline) / metric.baseline * 100;

    if (deviation <= 10) return 'good';
    if (deviation <= 25) return 'warning';
    return 'critical';
  }

  // Helper method to generate random metrics for simulation
  private generateRandomMetric(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Comprehensive performance report
  generatePerformanceReport(userData: any[], investments: any[]): {
    userMetrics: UserConversionMetrics,
    investmentPerformance: InvestmentPerformance,
    systemPerformance: SystemPerformance
  } {
    return {
      userMetrics: this.calculateUserConversionMetrics(userData),
      investmentPerformance: this.calculateInvestmentPerformance(investments),
      systemPerformance: this.trackSystemPerformance()
    };
  }
}

export default new PerformanceMetricsService();
