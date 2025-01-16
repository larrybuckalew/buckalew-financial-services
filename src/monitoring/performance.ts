import { metrics, MetricOptions } from '@opentelemetry/api-metrics';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';

class PerformanceMonitor {
  private meter: any;
  private counters: Map<string, any>;
  private histograms: Map<string, any>;

  constructor() {
    const exporter = new PrometheusExporter({ port: 9464 });
    this.meter = metrics.getMeter('financial-services');
    this.counters = new Map();
    this.histograms = new Map();

    // Initialize default metrics
    this.createCounter('api_requests_total', 'Total API requests');
    this.createCounter('api_errors_total', 'Total API errors');
    this.createHistogram('api_request_duration', 'API request duration');
    this.createHistogram('db_query_duration', 'Database query duration');
  }

  private createCounter(name: string, description: string) {
    const counter = this.meter.createCounter(name, {
      description,
      unit: '1'
    });
    this.counters.set(name, counter);
  }

  private createHistogram(name: string, description: string) {
    const histogram = this.meter.createHistogram(name, {
      description,
      unit: 'ms'
    });
    this.histograms.set(name, histogram);
  }

  incrementCounter(name: string, value: number = 1, attributes?: Record<string, string>) {
    const counter = this.counters.get(name);
    if (counter) {
      counter.add(value, attributes);
    }
  }

  recordHistogram(name: string, value: number, attributes?: Record<string, string>) {
    const histogram = this.histograms.get(name);
    if (histogram) {
      histogram.record(value, attributes);
    }
  }

  async measureAsyncOperation<T>(
    name: string,
    operation: () => Promise<T>,
    attributes?: Record<string, string>
  ): Promise<T> {
    const startTime = Date.now();
    try {
      const result = await operation();
      this.recordHistogram(name, Date.now() - startTime, attributes);
      return result;
    } catch (error) {
      this.incrementCounter(`${name}_errors`, 1, attributes);
      throw error;
    }
  }
}

export const performanceMonitor = new PerformanceMonitor();