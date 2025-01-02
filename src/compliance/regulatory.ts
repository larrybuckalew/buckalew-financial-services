import { PrismaClient } from '@prisma/client';
import { logger } from '../monitoring/logger';

class RegulatoryService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async validateTransactionLimits(transaction: {
    userId: string;
    amount: number;
    type: string;
  }) {
    try {
      // Check daily transaction limits
      const dailyTotal = await this.getDailyTransactionTotal(transaction.userId);
      if (dailyTotal + transaction.amount > 10000) { // $10,000 daily limit
        throw new Error('Daily transaction limit exceeded');
      }

      // Check for suspicious activity
      const suspiciousActivity = await this.checkSuspiciousActivity(transaction);
      if (suspiciousActivity) {
        await this.reportSuspiciousActivity(transaction);
        throw new Error('Transaction flagged for review');
      }

      return true;
    } catch (error) {
      logger.error('Transaction validation failed', error);
      throw error;
    }
  }

  private async getDailyTransactionTotal(userId: string): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const transactions = await this.prisma.transaction.findMany({
      where: {
        account: {
          userId: userId
        },
        date: {
          gte: today
        }
      }
    });

    return transactions.reduce((sum, tx) => sum + Number(tx.amount), 0);
  }

  private async checkSuspiciousActivity(transaction: any): Promise<boolean> {
    // Implement suspicious activity detection logic
    const flags = [];

    // Check for rapid transactions
    const recentTransactions = await this.prisma.transaction.findMany({
      where: {
        account: {
          userId: transaction.userId
        },
        date: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000) // Last 24 hours
        }
      }
    });

    if (recentTransactions.length > 10) { // More than 10 transactions in 24 hours
      flags.push('HIGH_FREQUENCY');
    }

    // Check for unusual amount patterns
    const averageAmount = recentTransactions.reduce(
      (sum, tx) => sum + Number(tx.amount), 0
    ) / recentTransactions.length;

    if (transaction.amount > averageAmount * 5) { // 5x average amount
      flags.push('UNUSUAL_AMOUNT');
    }

    return flags.length > 0;
  }

  private async reportSuspiciousActivity(transaction: any) {
    await this.prisma.auditLog.create({
      data: {
        userId: transaction.userId,
        action: 'SUSPICIOUS_ACTIVITY_REPORT',
        details: {
          transaction,
          timestamp: new Date().toISOString(),
          reason: 'Suspicious transaction pattern detected'
        }
      }
    });

    // Send notification to compliance team
    logger.warn('Suspicious activity detected', { transaction });
  }
}

export const regulatoryService = new RegulatoryService();