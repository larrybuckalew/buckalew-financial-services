import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
import { PrismaClient } from '@prisma/client';

export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  context?: Record<string, any>;
  userId?: string;
}

class LoggingService {
  private logger: winston.Logger;
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        // Console transport
        new winston.transports.Console({
          format: winston.format.simple()
        }),
        
        // Daily rotate file for all logs
        new DailyRotateFile({
          filename: 'logs/combined-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d'
        }),

        // Separate error logs
        new DailyRotateFile({
          level: 'error',
          filename: 'logs/error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '14d'
        })
      ]
    });
  }

  // Log an entry
  async log(entry: LogEntry): Promise<void> {
    const { level, message, context, userId } = entry;

    // Log to Winston
    this.logger.log({
      level,
      message,
      meta: context
    });

    // Save to database
    try {
      await this.prisma.systemLog.create({
        data: {
          level,
          message,
          context: JSON.stringify(context || {}),
          userId: userId || null
        }
      });
    } catch (dbError) {
      console.error('Failed to log to database:', dbError);
    }
  }

  // Log error
  async error(message: string, context?: Record<string, any>, userId?: string): Promise<void> {
    await this.log({
      level: LogLevel.ERROR,
      message,
      context,
      userId
    });
  }

  // Log warning
  async warn(message: string, context?: Record<string, any>, userId?: string): Promise<void> {
    await this.log({
      level: LogLevel.WARN,
      message,
      context,
      userId
    });
  }

  // Log info
  async info(message: string, context?: Record<string, any>, userId?: string): Promise<void> {
    await this.log({
      level: LogLevel.INFO,
      message,
      context,
      userId
    });
  }

  // Log debug
  async debug(message: string, context?: Record<string, any>, userId?: string): Promise<void> {
    await this.log({
      level: LogLevel.DEBUG,
      message,
      context,
      userId
    });
  }

  // Retrieve logs with filtering
  async getLogs(options: {
    level?: LogLevel;
    userId?: string;
    startDate?: Date;
    endDate?: Date;
    limit?: number;
  } = {}): Promise<any[]> {
    const { 
      level, 
      userId, 
      startDate, 
      endDate, 
      limit = 100 
    } = options;

    return this.prisma.systemLog.findMany({
      where: {
        level: level || undefined,
        userId: userId || undefined,
        timestamp: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: { timestamp: 'desc' },
      take: limit
    });
  }

  // Performance monitoring
  async trackPerformance(
    operation: string, 
    startTime: number, 
    userId?: string
  ): Promise<void> {
    const duration = Date.now() - startTime;

    await this.log({
      level: LogLevel.INFO,
      message: `Performance: ${operation}`,
      context: { 
        duration,
        operationType: operation
      },
      userId
    });

    // Optionally log slow operations
    if (duration > 1000) {
      await this.warn(`Slow operation detected: ${operation}`, { duration });
    }
  }

  // Security event logging
  async logSecurityEvent(
    eventType: string, 
    details: Record<string, any>, 
    userId?: string
  ): Promise<void> {
    await this.log({
      level: LogLevel.WARN,
      message: `Security Event: ${eventType}`,
      context: details,
      userId
    });
  }
}

export default new LoggingService();
