import { PrismaClient } from '@prisma/client';
import { logger } from '../monitoring/logger';

class AuditService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async logAction(params: {
    userId: string;
    action: string;
    details: any;
    ipAddress?: string;
    userAgent?: string;
  }) {
    try {
      await this.prisma.auditLog.create({
        data: {
          userId: params.userId,
          action: params.action,
          details: params.details,
          ipAddress: params.ipAddress,
          userAgent: params.userAgent
        }
      });

      logger.info('Audit log created', params);
    } catch (error) {
      logger.error('Failed to create audit log', error);
      throw error;
    }
  }

  async getAuditLogs(filters: {
    userId?: string;
    action?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
    offset?: number;
  }) {
    try {
      const where: any = {};

      if (filters.userId) where.userId = filters.userId;
      if (filters.action) where.action = filters.action;
      if (filters.startDate || filters.endDate) {
        where.createdAt = {};
        if (filters.startDate) where.createdAt.gte = filters.startDate;
        if (filters.endDate) where.createdAt.lte = filters.endDate;
      }

      const logs = await this.prisma.auditLog.findMany({
        where,
        take: filters.limit || 50,
        skip: filters.offset || 0,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            select: {
              email: true,
              role: true
            }
          }
        }
      });

      return logs;
    } catch (error) {
      logger.error('Failed to retrieve audit logs', error);
      throw error;
    }
  }

  async exportAuditLogs(filters: {
    startDate: Date;
    endDate: Date;
    format: 'csv' | 'json';
  }) {
    try {
      const logs = await this.getAuditLogs({
        startDate: filters.startDate,
        endDate: filters.endDate,
        limit: 1000000 // High limit for full export
      });

      if (filters.format === 'csv') {
        // Convert to CSV format
        const csv = logs.map(log => ({
          timestamp: log.createdAt,
          userEmail: log.user.email,
          userRole: log.user.role,
          action: log.action,
          details: JSON.stringify(log.details),
          ipAddress: log.ipAddress,
          userAgent: log.userAgent
        }));

        return csv;
      }

      return logs;
    } catch (error) {
      logger.error('Failed to export audit logs', error);
      throw error;
    }
  }
}

export const auditService = new AuditService();