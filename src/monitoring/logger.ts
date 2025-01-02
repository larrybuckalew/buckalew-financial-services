import winston from 'winston';
import { LoggingWinston } from '@google-cloud/logging-winston';

class Logger {
  private logger: winston.Logger;

  constructor() {
    const loggingWinston = new LoggingWinston({
      projectId: process.env.GCP_PROJECT_ID,
      keyFilename: process.env.GCP_KEY_FILE
    });

    this.logger = winston.createLogger({
      level: process.env.LOG_LEVEL || 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console(),
        loggingWinston
      ]
    });
  }

  info(message: string, meta?: any) {
    this.logger.info(message, meta);
  }

  error(message: string, error?: any) {
    this.logger.error(message, {
      error: error?.message,
      stack: error?.stack,
      ...error
    });
  }

  warn(message: string, meta?: any) {
    this.logger.warn(message, meta);
  }

  debug(message: string, meta?: any) {
    this.logger.debug(message, meta);
  }

  audit(action: string, userId: string, details: any) {
    this.logger.info('AUDIT', {
      action,
      userId,
      details,
      timestamp: new Date().toISOString()
    });
  }
}

export const logger = new Logger();