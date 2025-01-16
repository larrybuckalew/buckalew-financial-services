import { Analytics } from '@segment/analytics-next';

class AnalyticsService {
  constructor() {
    this.analytics = new Analytics({
      writeKey: process.env.SEGMENT_WRITE_KEY
    });
  }

  trackPageView(pageName, properties = {}) {
    this.analytics.page(pageName, {
      ...properties,
      timestamp: new Date().toISOString()
    });
  }

  trackEvent(eventName, properties = {}) {
    this.analytics.track(eventName, {
      ...properties,
      timestamp: new Date().toISOString()
    });
  }

  identifyUser(userId, traits = {}) {
    this.analytics.identify(userId, {
      ...traits,
      updatedAt: new Date().toISOString()
    });
  }

  // Track specific financial events
  trackPortfolioView(userId, portfolioValue) {
    this.trackEvent('Portfolio Viewed', {
      userId,
      portfolioValue,
      viewedAt: new Date().toISOString()
    });
  }

  trackInvestmentMade(userId, amount, investmentType) {
    this.trackEvent('Investment Made', {
      userId,
      amount,
      investmentType,
      timestamp: new Date().toISOString()
    });
  }
}