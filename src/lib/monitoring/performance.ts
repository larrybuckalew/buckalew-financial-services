import { logInfo } from './logger';

export const measurePerformance = (name: string, fn: () => Promise<any>) => {
  return async (...args: any[]) => {
    const start = performance.now();
    try {
      const result = await fn(...args);
      const duration = performance.now() - start;
      
      logInfo('Performance measurement', {
        name,
        duration,
        success: true
      });
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      
      logInfo('Performance measurement', {
        name,
        duration,
        success: false,
        error: error.message
      });
      
      throw error;
    }
  };
};

export const trackApiPerformance = () => {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      return measurePerformance(
        `API:${target.constructor.name}.${propertyKey}`,
        originalMethod.bind(this)
      )(...args);
    };

    return descriptor;
  };
};