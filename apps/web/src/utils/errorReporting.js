import * as Sentry from '@sentry/react';

class ErrorReporting {
  constructor() {
    Sentry.init({
      dsn: process.env.SENTRY_DSN,
      environment: process.env.NODE_ENV,
      tracesSampleRate: 1.0,
    });
  }

  captureError(error, context = {}) {
    Sentry.captureException(error, {
      extra: context
    });
  }

  captureMessage(message, level = 'info') {
    Sentry.captureMessage(message, level);
  }

  setUserContext(user) {
    Sentry.setUser({
      id: user.id,
      email: user.email,
      username: user.username
    });
  }

  clearUserContext() {
    Sentry.setUser(null);
  }
}

export const errorReporting = new ErrorReporting();