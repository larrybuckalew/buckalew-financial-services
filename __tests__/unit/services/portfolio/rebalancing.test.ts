import { portfolioRebalancingService } from '../../../../src/services/portfolio/rebalancing';
import { financialDataService } from '../../../../src/integrations/financialData';
import { PrismaClient } from '@prisma/client';

jest.mock('../../../../src/integrations/financialData');

describe('PortfolioRebalancingService', () => {
  let prisma: PrismaClient;

  beforeEach(() => {
    prisma = new PrismaClient();
    (financialDataService.getStockQuote as jest.Mock).mockResolvedValue({
      symbol: 'VTI',
      price: 200,
      change: 2,
      percentChange: 1,
      volume: 1000000
    });
  });

  afterEach(async () => {
    await prisma.$disconnect();
    jest.clearAllMocks();
  });

  describe('generateRebalancingPlan', () => {
    it('should generate valid rebalancing plan', async () => {
      const mockPortfolio = {
        id: 'test-portfolio',
        holdings: [
          {
            symbol: 'VTI',
            shares: 100,
            costBasis: 180,
            purchaseDate: new Date('2023-01-01')
          },
          {
            symbol: 'BND',
            shares: 20,
            costBasis: 85,
            purchaseDate: new Date('2023-06-01')
          }
        ],
        user: {
          profile: {
            riskTolerance: 'MODERATE'
          }
        }
      };

      jest.spyOn(prisma.portfolio, 'findUnique').mockResolvedValue(mockPortfolio as any);

      const plan = await portfolioRebalancingService.generateRebalancingPlan('test-portfolio');

      expect(plan).toBeDefined();
      expect(plan.recommendations).toBeInstanceOf(Array);
      expect(plan.taxImplications).toBeDefined();
      expect(plan.estimatedCosts).toBeGreaterThanOrEqual(0);
    });

    it('should handle tax implications correctly', async () => {
      const mockPortfolio = {
        id: 'test-portfolio',
        holdings: [
          {
            symbol: 'VTI',
            shares: 100,
            costBasis: 150, // Current price 200, so there's a gain
            purchaseDate: new Date('2023-01-01')
          }
        ],
        user: {
          profile: {
            riskTolerance: 'MODERATE'
          }
        }
      };

      jest.spyOn(prisma.portfolio, 'findUnique').mockResolvedValue(mockPortfolio as any);

      const plan = await portfolioRebalancingService.generateRebalancingPlan('test-portfolio');

      const vtiImplication = plan.taxImplications.find(ti => ti.symbol === 'VTI');
      expect(vtiImplication).toBeDefined();
      expect(vtiImplication?.gain).toBeGreaterThan(0);
      expect(vtiImplication?.estimatedTax).toBeGreaterThan(0);
    });

    it('should optimize for tax efficiency', async () => {
      const mockPortfolio = {
        id: 'test-portfolio',
        holdings: [
          {
            symbol: 'VTI',
            shares: 100,
            costBasis: 220, // Loss position
            purchaseDate: new Date('2023-01-01')
          },
          {
            symbol: 'VOO',
            shares: 50,
            costBasis: 150, // Gain position
            purchaseDate: new Date('2023-01-01')
          }
        ],
        user: {
          profile: {
            riskTolerance: 'MODERATE'
          }
        }
      };

      jest.spyOn(prisma.portfolio, 'findUnique').mockResolvedValue(mockPortfolio as any);

      const plan = await portfolioRebalancingService.generateRebalancingPlan('test-portfolio');

      // Should prefer selling VTI (loss position) before VOO (gain position)
      const sellRecommendations = plan.recommendations.filter(r => r.action === 'SELL');
      if (sellRecommendations.length > 1) {
        const vtiIndex = sellRecommendations.findIndex(r => r.symbol === 'VTI');
        const vooIndex = sellRecommendations.findIndex(r => r.symbol === 'VOO');
        expect(vtiIndex).toBeLessThan(vooIndex);
      }
    });
  });

  describe('executeRebalancing', () => {
    it('should execute all trades in a transaction', async () => {
      const mockPlan = {
        portfolioId: 'test-portfolio',
        timestamp: new Date().toISOString(),
        recommendations: [
          {
            symbol: 'VTI',
            action: 'SELL' as const,
            shares: 10,
            estimatedPrice: 200,
            reason: 'Rebalancing'
          },
          {
            symbol: 'BND',
            action: 'BUY' as const,
            shares: 20,
            estimatedPrice: 85,
            reason: 'Rebalancing'
          }
        ],
        taxImplications: [],
        estimatedCosts: 10
      };

      const mockTransaction = jest.fn();
      jest.spyOn(prisma, '$transaction').mockImplementation(callback => callback(prisma));
      
      const result = await portfolioRebalancingService.executeRebalancing('test-portfolio', mockPlan);

      expect(result).toBeDefined();
      expect(prisma.$transaction).toHaveBeenCalled();
    });

    it('should update holdings correctly after trades', async () => {
      const mockPlan = {
        portfolioId: 'test-portfolio',
        timestamp: new Date().toISOString(),
        recommendations: [
          {
            symbol: 'VTI',
            action: 'SELL' as const,
            shares: 100, // Full position sale
            estimatedPrice: 200,
            reason: 'Rebalancing'
          }
        ],
        taxImplications: [],
        estimatedCosts: 5
      };

      const mockHolding = {
        id: 'holding-1',
        symbol: 'VTI',
        shares: 100
      };

      jest.spyOn(prisma.holding, 'findFirst').mockResolvedValue(mockHolding as any);
      jest.spyOn(prisma.holding, 'delete').mockResolvedValue({} as any);
      jest.spyOn(prisma, '$transaction').mockImplementation(callback => callback(prisma));

      await portfolioRebalancingService.executeRebalancing('test-portfolio', mockPlan);

      expect(prisma.holding.delete).toHaveBeenCalledWith({
        where: { id: 'holding-1' }
      });
    });

    it('should handle errors during execution', async () => {
      const mockPlan = {
        portfolioId: 'test-portfolio',
        timestamp: new Date().toISOString(),
        recommendations: [
          {
            symbol: 'VTI',
            action: 'SELL' as const,
            shares: 10,
            estimatedPrice: 200,
            reason: 'Rebalancing'
          }
        ],
        taxImplications: [],
        estimatedCosts: 5
      };

      jest.spyOn(prisma, '$transaction').mockRejectedValue(new Error('Transaction failed'));

      await expect(portfolioRebalancingService.executeRebalancing('test-portfolio', mockPlan))
        .rejects
        .toThrow('Transaction failed');
    });
  });
});