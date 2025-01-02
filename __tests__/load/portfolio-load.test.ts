import { test, expect } from '@playwright/test';
import { PrismaClient } from '@prisma/client';

test.describe('Portfolio Load Testing', () => {
  let prisma: PrismaClient;

  test.beforeAll(async () => {
    prisma = new PrismaClient();
    await generateLoadTestData();
  });

  test.afterAll(async () => {
    await cleanupLoadTestData();
    await prisma.$disconnect();
  });

  async function generateLoadTestData() {
    // Generate multiple users with large portfolios
    const users = await Promise.all(
      Array.from({ length: 100 }, (_, i) => (
        prisma.user.create({
          data: {
            email: `load-test-${i}@example.com`,
            passwordHash: 'hash',
            profile: {
              create: {
                riskTolerance: 'MODERATE'
              }
            },
            portfolios: {
              create: {
                name: `Load Test Portfolio ${i}`,
                holdings: {
                  create: Array.from({ length: 50 }, (_, j) => ({
                    symbol: `STOCK${j}`,
                    shares: Math.floor(Math.random() * 1000),
                    costBasis: Math.random() * 200
                  }))
                }
              }
            }
          }
        })
      ))
    );

    return users;
  }

  async function cleanupLoadTestData() {
    await prisma.holding.deleteMany({
      where: {
        portfolio: {
          user: {
            email: { startsWith: 'load-test-' }
          }
        }
      }
    });
    await prisma.portfolio.deleteMany({
      where: {
        user: {
          email: { startsWith: 'load-test-' }
        }
      }
    });
    await prisma.profile.deleteMany({
      where: {
        user: {
          email: { startsWith: 'load-test-' }
        }
      }
    });
    await prisma.user.deleteMany({
      where: {
        email: { startsWith: 'load-test-' }
      }
    });
  }

  test('concurrent portfolio analysis requests', async ({ browser }) => {
    // Create multiple browser contexts for concurrent users
    const contexts = await Promise.all(
      Array.from({ length: 10 }, () => browser.newContext())
    );

    const pages = await Promise.all(
      contexts.map(context => context.newPage())
    );

    // Login and access portfolios concurrently
    const startTime = Date.now();
    await Promise.all(
      pages.map(async (page, i) => {
        await page.goto('/login');
        await page.fill('[data-testid="email-input"]', `load-test-${i}@example.com`);
        await page.fill('[data-testid="password-input"]', 'TestPass123!');
        await page.click('[data-testid="login-button"]');
        await page.click('[data-testid="portfolio-analysis"]');
        await page.waitForSelector('[data-testid="analysis-complete"]');
      })
    );
    const endTime = Date.now();

    // Check performance metrics
    const totalTime = endTime - startTime;
    const averageTime = totalTime / pages.length;
    
    expect(averageTime).toBeLessThan(5000); // Average response time under 5s

    // Cleanup
    await Promise.all(contexts.map(context => context.close()));
  });

  test('portfolio rebalancing under load', async ({ browser }) => {
    const contexts = await Promise.all(
      Array.from({ length: 5 }, () => browser.newContext())
    );

    const pages = await Promise.all(
      contexts.map(context => context.newPage())
    );

    // Execute rebalancing operations concurrently
    const operations = pages.map(async (page, i) => {
      await page.goto('/login');
      await page.fill('[data-testid="email-input"]', `load-test-${i}@example.com`);
      await page.fill('[data-testid="password-input"]', 'TestPass123!');
      await page.click('[data-testid="login-button"]');

      const startTime = Date.now();
      
      await page.click('[data-testid="rebalance-portfolio"]');
      await page.click('[data-testid="view-recommendations"]');
      await page.waitForSelector('[data-testid="trade-recommendations"]');
      
      await page.click('[data-testid="confirm-rebalancing"]');
      await page.click('[data-testid="confirm-yes"]');
      await page.waitForSelector('[data-testid="success-message"]');

      return Date.now() - startTime;
    });

    const completionTimes = await Promise.all(operations);
    const averageTime = completionTimes.reduce((a, b) => a + b) / completionTimes.length;

    expect(averageTime).toBeLessThan(8000); // Complete rebalancing under 8s
    expect(Math.max(...completionTimes)).toBeLessThan(10000); // Max time under 10s

    // Cleanup
    await Promise.all(contexts.map(context => context.close()));
  });

  test('real-time market data updates', async ({ browser }) => {
    const pages = await Promise.all(
      Array.from({ length: 20 }, async () => {
        const context = await browser.newContext();
        const page = await context.newPage();
        return page;
      })
    );

    // Monitor real-time updates across multiple portfolios
    const monitoringOperations = pages.map(async (page, i) => {
      await page.goto('/login');
      await page.fill('[data-testid="email-input"]', `load-test-${i}@example.com`);
      await page.fill('[data-testid="password-input"]', 'TestPass123!');
      await page.click('[data-testid="login-button"]');

      // Track market data updates
      let updateCount = 0;
      page.on('response', response => {
        if (response.url().includes('/api/market-data')) {
          updateCount++;
        }
      });

      await page.click('[data-testid="portfolio-dashboard"]');
      await page.waitForTimeout(30000); // Monitor for 30 seconds

      return updateCount;
    });

    const updateCounts = await Promise.all(monitoringOperations);
    const totalUpdates = updateCounts.reduce((a, b) => a + b, 0);

    // Expect reasonable update frequency
    expect(totalUpdates).toBeGreaterThan(100); // At least 100 updates across all sessions
    
    // Cleanup
    await Promise.all(pages.map(page => page.context().close()));
  });

  test('database performance under load', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Login as admin
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'admin@example.com');
    await page.fill('[data-testid="password-input"]', 'AdminPass123!');
    await page.click('[data-testid="login-button"]');

    // Monitor database metrics during bulk operations
    const dbMetrics = [];
    let startTime = Date.now();

    // Execute bulk portfolio updates
    await page.click('[data-testid="bulk-operations"]');
    await page.click('[data-testid="update-all-portfolios"]');

    // Wait for completion and collect metrics
    await page.waitForSelector('[data-testid="operation-complete"]');
    
    const completionTime = Date.now() - startTime;
    expect(completionTime).toBeLessThan(15000); // Bulk operation under 15s

    // Cleanup
    await context.close();
  });
});
