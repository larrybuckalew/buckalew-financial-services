import { PrismaClient } from '@prisma/client';
import { logger } from '../monitoring/logger';
import { storageService } from '../integrations/storage';

class RetentionService {
  private prisma: PrismaClient;
  private readonly retentionPeriods = {
    ACCOUNT_STATEMENTS: 7 * 365, // 7 years in days
    TAX_DOCUMENTS: 7 * 365,
    TRANSACTION_RECORDS: 7 * 365,
    USER_ACTIVITY: 2 * 365, // 2 years
    AUDIT_LOGS: 7 * 365,
    COMMUNICATION_LOGS: 3 * 365, // 3 years
    TEMP_FILES: 30 // 30 days
  };

  constructor() {
    this.prisma = new PrismaClient();
  }

  private calculateExpiryDate(retentionPeriod: number): Date {
    const date = new Date();
    date.setDate(date.getDate() - retentionPeriod);
    return date;
  }

  async applyRetentionPolicy() {
    try {
      const tasks = [
        this.cleanupDocuments(),
        this.cleanupAuditLogs(),
        this.cleanupTransactions(),
        this.cleanupLoginHistory()
      ];

      await Promise.all(tasks);
      logger.info('Retention policy applied successfully');
    } catch (error) {
      logger.error('Failed to apply retention policy', error);
      throw error;
    }
  }

  private async cleanupDocuments() {
    const types = {
      ACCOUNT_STATEMENT: this.retentionPeriods.ACCOUNT_STATEMENTS,
      TAX_FORM: this.retentionPeriods.TAX_DOCUMENTS,
      OTHER: this.retentionPeriods.TEMP_FILES
    };

    for (const [type, period] of Object.entries(types)) {
      const expiryDate = this.calculateExpiryDate(period);
      
      const expiredDocs = await this.prisma.document.findMany({
        where: {
          type: type as any,
          createdAt: { lt: expiryDate }
        }
      });

      for (const doc of expiredDocs) {
        await storageService.deleteFile(doc.path);
        await this.prisma.document.delete({
          where: { id: doc.id }
        });
      }
    }
  }

  private async cleanupAuditLogs() {
    const expiryDate = this.calculateExpiryDate(
      this.retentionPeriods.AUDIT_LOGS
    );

    await this.prisma.auditLog.deleteMany({
      where: {
        createdAt: { lt: expiryDate }
      }
    });
  }

  private async cleanupTransactions() {
    const expiryDate = this.calculateExpiryDate(
      this.retentionPeriods.TRANSACTION_RECORDS
    );

    await this.prisma.transaction.deleteMany({
      where: {
        createdAt: { lt: expiryDate }
      }
    });
  }

  private async cleanupLoginHistory() {
    const expiryDate = this.calculateExpiryDate(
      this.retentionPeriods.USER_ACTIVITY
    );

    await this.prisma.loginHistory.deleteMany({
      where: {
        createdAt: { lt: expiryDate }
      }
    });
  }
}

export const retentionService = new RetentionService();