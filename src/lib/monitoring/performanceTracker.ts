import { performance } from 'perf_hooks';

export class PerformanceTracker {
  private static start(label: string): void {
    performance.mark(`${label}-start`);
  }

  private static end(label: string): number {
    performance.mark(`${label}-end`);
    performance.measure(label, `${label}-start`, `${label}-end`);
    
    const measurements = performance.getEntriesByName(label);
    const duration = measurements[0]?.duration || 0;

    this.logPerformance(label, duration);

    performance.clearMarks(`${label}-start`);
    performance.clearMarks(`${label}-end`);
    performance.clearMeasures(label);

    return duration;
  }

  private static logPerformance(label: string, duration: number): void {
    const thresholds: { [key: string]: number } = {
      'database-query': 100,
      'external-api-call': 500,
      'complex-calculation': 200
    };

    if (duration > (thresholds[label] || 300)) {
      console.warn(`Performance warning: ${label} took ${duration}ms`);
    }
  }

  public static async trackAsync<T>(
    label: string, 
    asyncFn: () => Promise<T>
  ): Promise<T> {
    this.start(label);
    try {
      const result = await asyncFn();
      this.end(label);
      return result;
    } catch (error) {
      this.end(label);
      throw error;
    }
  }

  public static track<T>(
    label: string, 
    fn: () => T
  ): T {
    this.start(label);
    try {
      const result = fn();
      this.end(label);
      return result;
    } catch (error) {
      this.end(label);
      throw error;
    }
  }
}