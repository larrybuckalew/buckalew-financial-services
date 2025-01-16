import { PrismaClient } from '@prisma/client';
import { RebalancingPlan, TradeRecommendation } from '../../types/portfolio';
import { financialDataService } from '../../integrations/financialData';
import { logger } from '../../monitoring/logger';

class PortfolioRebalancingService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private sortByTaxEfficiency(holdings: any[], marketData: any[]): any[] {
    return [...holdings].sort((a, b) => {
      const aGain = (marketData.find(m => m.symbol === a.symbol)?.price || 0) - a.costBasis;
      const bGain = (marketData.find(m => m.symbol === b.symbol)?.price || 0) - b.costBasis;
      return aGain - bGain; // Sort by smallest gain (or largest loss) first
    });
  }

  private async calculateTaxImplications(trades: TradeRecommendation[], holdings: any[]) {
    const taxImplications = [];
    
    for (const trade of trades) {
      if (trade.action === 'SELL') {
        const holding = holdings.find(h => h.symbol === trade.symbol);
        if (holding) {
          const gain = (trade.estimatedPrice - holding.costBasis) * trade.shares;
          const holdingPeriod = this.calculateHoldingPeriod(holding.purchaseDate);
          
          taxImplications.push({
            symbol: trade.symbol,
            gain,
            isLongTerm: holdingPeriod > 365,
            estimatedTax: this.estimateTax(gain, holdingPeriod)
          });
        }
      }
    }

    return taxImplications;
  }

  private calculateHoldingPeriod(purchaseDate: Date): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - purchaseDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  private estimateTax(gain: number, holdingPeriod: number): number {
    // Simplified tax estimation - would need to be customized based on user's tax situation
    const rate = holdingPeriod > 365 ? 0.15 : 0.35; // Long-term vs short-term capital gains
    return gain > 0 ? gain * rate : 0;
  }

  private getRecommendedSymbols(assetType: string, targetValue: number): string[] {
    // This would integrate with a security selection service to get recommended
    // securities based on various factors (performance, fees, risk, etc.)
    const recommendations = {
      STOCKS: ['VTI', 'VOO', 'VUG'],
      BONDS: ['BND', 'AGG', 'VGIT'],
      CASH: ['VMFXX', 'SWVXX']
    };

    return recommendations[assetType] || [];
  }

  private calculateTradingCosts(trades: TradeRecommendation[]): number {
    const COMMISSION_PER_TRADE = 0; // Assume commission-free trading
    const SPREAD_PERCENTAGE = 0.001; // Estimated bid-ask spread

    return trades.reduce((total, trade) => {
      const spreadCost = trade.shares * trade.estimatedPrice * SPREAD_PERCENTAGE;
      return total + spreadCost + COMMISSION_PER_TRADE;
    }, 0);
  }

  async executeRebalancing(portfolioId: string, plan: RebalancingPlan) {
    const session = await this.prisma.$transaction(async (prisma) => {
      try {
        // Record the rebalancing plan
        const rebalancing = await prisma.portfolioRebalancing.create({
          data: {
            portfolioId,
            planDetails: plan,
            status: 'IN_PROGRESS'
          }
        });

        // Execute each trade
        for (const trade of plan.recommendations) {
          await prisma.transaction.create({
            data: {
              portfolioId,
              symbol: trade.symbol,
              type: trade.action === 'BUY' ? 'BUY' : 'SELL',
              shares: trade.shares,
              price: trade.estimatedPrice,
              total: trade.shares * trade.estimatedPrice,
              status: 'PENDING'
            }
          });

          // Update holdings
          const holding = await prisma.holding.findFirst({
            where: {
              portfolioId,
              symbol: trade.symbol
            }
          });

          if (holding) {
            if (trade.action === 'SELL') {
              if (trade.shares === holding.shares) {
                await prisma.holding.delete({
                  where: { id: holding.id }
                });
              } else {
                await prisma.holding.update({
                  where: { id: holding.id },
                  data: {
                    shares: { decrement: trade.shares }
                  }
                });
              }
            } else {
              await prisma.holding.update({
                where: { id: holding.id },
                data: {
                  shares: { increment: trade.shares }
                }
              });
            }
          } else if (trade.action === 'BUY') {
            await prisma.holding.create({
              data: {
                portfolioId,
                symbol: trade.symbol,
                shares: trade.shares,
                costBasis: trade.estimatedPrice
              }
            });
          }
        }

        // Update rebalancing status
        await prisma.portfolioRebalancing.update({
          where: { id: rebalancing.id },
          data: { status: 'COMPLETED' }
        });

        return rebalancing;
      } catch (error) {
        logger.error('Rebalancing execution failed', error);
        throw error;
      }
    });

    return session;
  }
}

export const portfolioRebalancingService = new PortfolioRebalancingService();