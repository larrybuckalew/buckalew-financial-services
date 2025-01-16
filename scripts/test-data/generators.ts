import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { generateMarketData } from './market-data';

class TestDataGenerator {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private async generateTransactions(portfolioId: string, count: number) {
    for (let i = 0; i < count; i++) {
      await this.prisma.transaction.create({
        data: {
          portfolioId,
          type: faker.helpers.arrayElement([
            'DEPOSIT',
            'WITHDRAWAL',
            'TRANSFER',
            'FEE',
            'INTEREST',
            'DIVIDEND',
            'TRADE'
          ]),
          amount: faker.number.float({ min: 100, max: 10000 }),
          currency: 'USD',
          description: faker.finance.transactionDescription(),
          date: faker.date.past(),
          category: faker.helpers.arrayElement([
            'INVESTMENT',
            'EXPENSE',
            'INCOME',
            'TRANSFER'
          ])
        }
      });
    }
  }

  private async generateDocuments(userId: string, count: number) {
    for (let i = 0; i < count; i++) {
      await this.prisma.document.create({
        data: {
          userId,
          type: faker.helpers.arrayElement([
            'ID_VERIFICATION',
            'TAX_FORM',
            'ACCOUNT_STATEMENT',
            'CONTRACT',
            'OTHER'
          ]),
          name: faker.system.fileName(),
          path: faker.system.filePath(),
          mimeType: faker.system.mimeType(),
          size: faker.number.int({ min: 1000, max: 10000000 }),
          category: faker.helpers.arrayElement([
            'PERSONAL',
            'FINANCIAL',
            'TAX',
            'LEGAL'
          ]),
          expirationDate: faker.date.future()
        }
      });
    }
  }

  async generateRealisticUserBehavior(userId: string, days: number) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    for (let i = 0; i < days; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);

      // Generate login history
      await this.generateLoginHistory(userId, currentDate);

      // Generate portfolio activity
      await this.generateDailyPortfolioActivity(userId, currentDate);

      // Generate audit logs
      await this.generateAuditLogs(userId, currentDate);
    }
  }

  private async generateLoginHistory(userId: string, date: Date) {
    const loginCount = faker.number.int({ min: 0, max: 5 });
    
    for (let i = 0; i < loginCount; i++) {
      await this.prisma.loginHistory.create({
        data: {
          userId,
          ipAddress: faker.internet.ip(),
          userAgent: faker.internet.userAgent(),
          success: faker.datatype.boolean(0.95),
          failureReason: faker.datatype.boolean(0.95) ? null : 'Invalid password',
          createdAt: faker.date.between(
            date,
            new Date(date.getTime() + 24 * 60 * 60 * 1000)
          )
        }
      });
    }
  }

  private async generateDailyPortfolioActivity(userId: string, date: Date) {
    const portfolios = await this.prisma.portfolio.findMany({
      where: { userId }
    });

    for (const portfolio of portfolios) {
      // Generate random portfolio views
      const viewCount = faker.number.int({ min: 0, max: 10 });
      
      for (let i = 0; i < viewCount; i++) {
        await this.generatePortfolioView(portfolio.id, date);
      }

      // Generate random trades
      if (faker.datatype.boolean(0.3)) { // 30% chance of trading
        await this.generateTrade(portfolio.id, date);
      }
    }
  }

  private async generatePortfolioView(portfolioId: string, date: Date) {
    await this.prisma.auditLog.create({
      data: {
        action: 'VIEW_PORTFOLIO',
        details: {
          portfolioId,
          view_type: faker.helpers.arrayElement([
            'SUMMARY',
            'HOLDINGS',
            'PERFORMANCE',
            'ANALYSIS'
          ])
        },
        ipAddress: faker.internet.ip(),
        userAgent: faker.internet.userAgent(),
        createdAt: faker.date.between(
          date,
          new Date(date.getTime() + 24 * 60 * 60 * 1000)
        ),
        userId: (await this.prisma.portfolio.findUnique({
          where: { id: portfolioId }
        }))!.userId
      }
    });
  }

  private async generateTrade(portfolioId: string, date: Date) {
    const holding = await this.prisma.holding.findFirst({
      where: { portfolioId }
    });

    if (holding) {
      const isBuy = faker.datatype.boolean();
      const shares = faker.number.int({
        min: 1,
        max: isBuy ? 100 : holding.shares
      });

      await this.prisma.transaction.create({
        data: {
          portfolioId,
          type: 'TRADE',
          amount: shares * holding.currentValue / holding.shares,
          currency: 'USD',
          description: `${isBuy ? 'Buy' : 'Sell'} ${shares} shares of ${holding.symbol}`,
          date: faker.date.between(
            date,
            new Date(date.getTime() + 24 * 60 * 60 * 1000)
          )
        }
      });

      // Update holding
      await this.prisma.holding.update({
        where: { id: holding.id },
        data: {
          shares: isBuy
            ? { increment: shares }
            : { decrement: shares }
        }
      });
    }
  }

  private async generateAuditLogs(userId: string, date: Date) {
    const actionCount = faker.number.int({ min: 1, max: 20 });

    for (let i = 0; i < actionCount; i++) {
      await this.prisma.auditLog.create({
        data: {
          userId,
          action: faker.helpers.arrayElement([
            'LOGIN',
            'LOGOUT',
            'VIEW_PORTFOLIO',
            'UPDATE_PROFILE',
            'EXECUTE_TRADE',
            'GENERATE_REPORT',
            'UPDATE_SETTINGS'
          ]),
          details: {},
          ipAddress: faker.internet.ip(),
          userAgent: faker.internet.userAgent(),
          createdAt: faker.date.between(
            date,
            new Date(date.getTime() + 24 * 60 * 60 * 1000)
          )
        }
      });
    }
  }
}

export const testDataGenerator = new TestDataGenerator();