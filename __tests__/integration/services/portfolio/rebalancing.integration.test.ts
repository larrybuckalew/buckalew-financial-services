import { portfolioRebalancingService } from '../../../../src/services/portfolio/rebalancing';
import { PrismaClient } from '@prisma/client';

describe('PortfolioRebalancingService Integration', () => {
  let prisma: PrismaClient;

  beforeAll(async () => {
    prisma = new PrismaClient();
    // Setup test database
    await setupTestData();
  });

  afterAll(async () => {
    await cleanupTestData();
    await prisma.$disconnect();
  });

  async function setupTestData() {
    // Create test user
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        passwordHash: 'hash',
        profile: {
          create: {
            riskTolerance: 'MODERATE'
          }
        }
      }
    });

    // Create test portfolio
    const portfolio = await prisma.portfolio.create({
      data: {
        userId: user.id,
        name: 'Test Portfolio',
        holdings: {
          create: [
            {
              symbol: 'VTI',
              shares: 100,
              costBasis: 180
            },
            {
              symbol: 'BND',
              shares: 50,
              costBasis: 85
            }
          ]
        }
      }
    });

    return { user, portfolio };
  }

  async function cleanupTestData() {
    await prisma.holding.deleteMany();
    await prisma.portfolio.deleteMany();
    await prisma.profile.deleteMany();
    await prisma.user.deleteMany();
  }

  it('should execute full rebalancing workflow', async () => {
    const testPortfolio = await prisma.portfolio.findFirst({
      include: {
        holdings: true,
        user: {
          include: {
            profile: true
          }
        }
      }
    });

    expect(testPortfolio).toBeDefined();

    // Generate rebalancing plan
    const plan = await portfolioRebalancingService.generateRebalancingPlan(testPortfolio!.id);
    expect(plan).toBeDefined();
    expect(plan.recommendations.length).toBeGreaterThan(0);

    // Execute rebalancing
    const result = await portfolioRebalancingService.executeRebalancing(testPortfolio!.id, plan);
    expect(result).toBeDefined();

    // Verify portfolio changes
    const updatedPortfolio = await prisma.portfolio.findUnique({
      where: { id: testPortfolio!.id },
      include: { holdings: true }
    });

    expect(updatedPortfolio).toBeDefined();
    expect(updatedPortfolio!.holdings.length).toBe(testPortfolio!.holdings.length);
  });
});
