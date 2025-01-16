import pino from 'pino';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => {
      return { level: label };
    },
  },
  timestamp: () => `,'time':'${new Date().toISOString()}'`,
  redact: [
    'password',
    'token',
    '*.password',
    '*.token',
    'req.headers.authorization'
  ]
});

export const logError = (error: Error, context?: Record<string, any>) => {
  logger.error({ error, ...context });
};

export const logInfo = (message: string, context?: Record<string, any>) => {
  logger.info({ message, ...context });
};

export const logWarn = (message: string, context?: Record<string, any>) => {
  logger.warn({ message, ...context });
};

export const logDebug = (message: string, context?: Record<string, any>) => {
  logger.debug({ message, ...context });
};

export default logger;