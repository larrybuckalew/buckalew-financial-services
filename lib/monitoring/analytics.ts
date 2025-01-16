// Centralized analytics and monitoring utility
export class AnalyticsService {
  private static instance: AnalyticsService
  private providers: string[] = []

  private constructor() {
    this.initializeProviders()
  }

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService()
    }
    return AnalyticsService.instance
  }

  private initializeProviders() {
    // Initialize analytics providers based on environment
    if (process.env.NODE_ENV === 'production') {
      this.initGoogleAnalytics()
      this.initSentry()
    }
  }

  private initGoogleAnalytics() {
    // Google Analytics initialization
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_GA_ID) {
      window.dataLayer = window.dataLayer || []
      function gtag(){window.dataLayer.push(arguments)}
      gtag('js', new Date())
      gtag('config', process.env.NEXT_PUBLIC_GA_ID)
    }
  }

  private initSentry() {
    // Sentry error tracking
    if (typeof window !== 'undefined') {
      import('@sentry/react').then(Sentry => {
        Sentry.init({
          dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
          integrations: [
            new Sentry.BrowserTracing(),
            new Sentry.Replay()
          ],
          tracesSampleRate: 1.0,
          replaysSessionSampleRate: 0.1,
          replaysOnErrorSampleRate: 1.0,
        })
      })
    }
  }

  // Track page views
  public trackPageView(path: string, title?: string) {
    if (typeof window !== 'undefined') {
      // Google Analytics
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_path: path,
          page_title: title || document.title
        })
      }

      // Sentry page tracking
      import('@sentry/react').then(Sentry => {
        Sentry.setTag('page_path', path)
      })
    }
  }

  // Track custom events
  public trackEvent({
    category,
    action,
    label,
    value
  }: {
    category: string
    action: string
    label?: string
    value?: number
  }) {
    if (typeof window !== 'undefined') {
      // Google Analytics event
      if (window.gtag) {
        window.gtag('event', action, {
          event_category: category,
          event_label: label,
          value: value
        })
      }

      // Sentry custom event
      import('@sentry/react').then(Sentry => {
        Sentry.captureMessage(`Event: ${category} - ${action}`, {
          level: 'info',
          extra: { label, value }
        })
      })
    }
  }

  // Track errors
  public trackError(error: Error) {
    if (typeof window !== 'undefined') {
      import('@sentry/react').then(Sentry => {
        Sentry.captureException(error)
      })
    }
  }
}