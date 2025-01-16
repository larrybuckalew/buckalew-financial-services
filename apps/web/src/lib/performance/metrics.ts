import { logInfo } from '../monitoring/logger';

export class PerformanceMetrics {
  private static instance: PerformanceMetrics;
  private metrics: Map<string, number[]>;

  private constructor() {
    this.metrics = new Map();
  }

  static getInstance(): PerformanceMetrics {
    if (!PerformanceMetrics.instance) {
      PerformanceMetrics.instance = new PerformanceMetrics();
    }
    return PerformanceMetrics.instance;
  }

  recordMetric(name: string, value: number) {
    const existing = this.metrics.get(name) || [];
    existing.push(value);
    this.metrics.set(name, existing);

    logInfo('Performance metric recorded', {
      metric: name,
      value,
      average: this.getAverageMetric(name)
    });
  }

  getAverageMetric(name: string): number {
    const values = this.metrics.get(name) || [];
    if (values.length === 0) return 0;
    return values.reduce((a, b) => a + b, 0) / values.length;
  }

  getAllMetrics() {
    const result: Record<string, { average: number, count: number }> = {};
    this.metrics.forEach((values, name) => {
      result[name] = {
        average: this.getAverageMetric(name),
        count: values.length
      };
    });
    return result;
  }

  clearMetrics() {
    this.metrics.clear();
  }
}