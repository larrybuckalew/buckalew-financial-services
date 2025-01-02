import * as Sentry from '@sentry/node';
import { logger } from './logger';

class ErrorTracker {
  constructor() {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 1.0,
      integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Sentry.Integrations.Prisma({ tracing: true })
      ]
    });
  }

  captureError(error: Error, context?: any) {
    Sentry.withScope(scope => {
      if (context) {
        scope.setExtras(context);
      }
      Sentry.captureException(error);
    });

    // Also log to our standard logger
    logger.error(error.message, { error, context });
  }

  captureMessage(message: string, level: Sentry.SeverityLevel = 'info') {
    Sentry.captureMessage(message, level);
    logger.info(message);
  }

  setUser(user: { id: string; email?: string; role?: string }) {
    Sentry.setUser(user);
  }

  clearUser() {
    Sentry.setUser(null);
  }
}

export const errorTracker = new ErrorTracker();