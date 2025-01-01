import { sendEmail } from '../email';
import { sendSlackNotification } from '../slack';
import logger from '../logger';

export const AlertSeverity = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  CRITICAL: 'critical'
};

export const AlertType = {
  SYSTEM: 'system',
  SECURITY: 'security',
  BUSINESS: 'business',
  PERFORMANCE: 'performance'
};

export async function sendAlert({
  type,
  severity,
  message,
  details,
  timestamp = new Date()
}) {
  const alert = {
    type,
    severity,
    message,
    details,
    timestamp
  };

  // Log alert
  logger.info('Alert triggered', alert);

  // Store in database
  await prisma.alert.create({
    data: alert
  });

  // Send notifications based on severity
  if (severity === AlertSeverity.CRITICAL) {
    await Promise.all([
      sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `CRITICAL ALERT: ${message}`,
        template: 'critical-alert',
        data: alert
      }),
      sendSlackNotification({
        channel: '#alerts-critical',
        message: `🚨 *CRITICAL ALERT*\n${message}\n${JSON.stringify(details, null, 2)}`
      })
    ]);
  } else if (severity === AlertSeverity.ERROR) {
    await sendSlackNotification({
      channel: '#alerts-errors',
      message: `⚠️ *ERROR ALERT*\n${message}`
    });
  }

  return alert;
}

export async function checkSystemHealth() {
  const checks = {
    database: await checkDatabaseConnection(),
    redis: await checkRedisConnection(),
    api: await checkExternalAPIs()
  };

  const unhealthyServices = Object.entries(checks)
    .filter(([_, status]) => !status)
    .map(([service]) => service);

  if (unhealthyServices.length > 0) {
    await sendAlert({
      type: AlertType.SYSTEM,
      severity: AlertSeverity.CRITICAL,
      message: 'System health check failed',
      details: {
        unhealthyServices,
        checks
      }
    });
  }

  return checks;
}
