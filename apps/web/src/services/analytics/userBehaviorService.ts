import { v4 as uuidv4 } from 'uuid';

// Interfaces for user behavior tracking
export interface UserEvent {
  id: string;
  userId: string;
  eventType: 'PAGE_VIEW' | 'CLICK' | 'FORM_SUBMIT' | 'TRANSACTION' | 'LOGIN';
  timestamp: number;
  metadata?: Record<string, any>;
}

export interface UserEngagementMetrics {
  totalPageViews: number;
  averageSessionDuration: number;
  mostVisitedPages: { page: string; views: number }[];
  retentionRate: number;
}

export interface UserActivityProfile {
  userId: string;
  activityScore: number;
  frequentFeatures: string[];
  lastActive: number;
}

class UserBehaviorService {
  private eventStore: UserEvent[] = [];

  // Track user event
  trackEvent(event: Omit<UserEvent, 'id' | 'timestamp'>): UserEvent {
    const trackedEvent: UserEvent = {
      id: uuidv4(),
      timestamp: Date.now(),
      ...event
    };

    this.eventStore.push(trackedEvent);
    return trackedEvent;
  }

  // Calculate user engagement metrics
  calculateUserEngagement(userId: string, timeframe: number = 30 * 24 * 60 * 60 * 1000): UserEngagementMetrics {
    const cutoffTime = Date.now() - timeframe;
    
    const filteredEvents = this.eventStore.filter(event => 
      event.userId === userId && event.timestamp > cutoffTime
    );

    // Page views
    const pageViewEvents = filteredEvents.filter(event => event.eventType === 'PAGE_VIEW');
    const pageViewsByPage = pageViewEvents.reduce((acc, event) => {
      const page = event.metadata?.page || 'Unknown';
      acc[page] = (acc[page] || 0) + 1;
      return acc;
    }, {});

    // Session duration calculation
    const sortedEvents = filteredEvents.sort((a, b) => a.timestamp - b.timestamp);
    const sessionDurations = this.calculateSessionDurations(sortedEvents);

    return {
      totalPageViews: pageViewEvents.length,
      averageSessionDuration: this.calculateAverageSessionDuration(sessionDurations),
      mostVisitedPages: Object.entries(pageViewsByPage)
        .map(([page, views]) => ({ page, views }))
        .sort((a, b) => b.views - a.views)
        .slice(0, 5),
      retentionRate: this.calculateRetentionRate(userId, timeframe)
    };
  }

  // Calculate session durations
  private calculateSessionDurations(events: UserEvent[]): number[] {
    const sessions: number[] = [];
    
    for (let i = 1; i < events.length; i++) {
      const timeBetweenEvents = events[i].timestamp - events[i-1].timestamp;
      if (timeBetweenEvents < 30 * 60 * 1000) { // Session if within 30 minutes
        sessions.push(timeBetweenEvents);
      }
    }

    return sessions;
  }

  // Calculate average session duration
  private calculateAverageSessionDuration(sessions: number[]): number {
    if (sessions.length === 0) return 0;
    return sessions.reduce((sum, duration) => sum + duration, 0) / sessions.length;
  }

  // Calculate retention rate
  private calculateRetentionRate(userId: string, timeframe: number): number {
    const cutoffTime = Date.now() - timeframe;
    const userEvents = this.eventStore.filter(event => 
      event.userId === userId && event.timestamp > cutoffTime
    );

    // Simple retention calculation - percentage of days active
    const uniqueDaysActive = new Set(
      userEvents.map(event => new Date(event.timestamp).toDateString())
    );

    const totalPossibleDays = Math.floor(timeframe / (24 * 60 * 60 * 1000));
    return (uniqueDaysActive.size / totalPossibleDays) * 100;
  }

  // Generate user activity profile
  generateUserActivityProfile(userId: string): UserActivityProfile {
    const userEvents = this.eventStore.filter(event => event.userId === userId);
    
    // Calculate activity score based on event frequency and types
    const eventTypeWeights = {
      'TRANSACTION': 5,
      'FORM_SUBMIT': 3,
      'PAGE_VIEW': 1,
      'LOGIN': 2,
      'CLICK': 0.5
    };

    const activityScore = userEvents.reduce((score, event) => 
      score + (eventTypeWeights[event.eventType] || 0), 0
    );

    // Most frequent features
    const featureFrequency = userEvents.reduce((acc, event) => {
      const feature = event.metadata?.feature || 'Unknown';
      acc[feature] = (acc[feature] || 0) + 1;
      return acc;
    }, {});

    const frequentFeatures = Object.entries(featureFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([feature]) => feature);

    return {
      userId,
      activityScore,
      frequentFeatures,
      lastActive: userEvents.length > 0 
        ? userEvents[userEvents.length - 1].timestamp 
        : 0
    };
  }

  // Clear events older than a specified time
  cleanupOldEvents(retentionPeriod: number = 90 * 24 * 60 * 60 * 1000) {
    const cutoffTime = Date.now() - retentionPeriod;
    this.eventStore = this.eventStore.filter(
      event => event.timestamp > cutoffTime
    );
  }
}

export default new UserBehaviorService();
