import { test } from '@playwright/test';
import { chromium } from 'playwright';

describe('Performance Tests', () => {
  test('critical page load times', async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    // Homepage Load Time
    const homepageStart = Date.now();
    await page.goto('/');
    const homeMetrics = await page.evaluate(() => ({
      lcpTime: window.performance.getEntriesByType('largest-contentful-paint')[0]?.startTime,
      fid: window.performance.getEntriesByType('first-input')[0]?.processingStart - 
           window.performance.getEntriesByType('first-input')[0]?.startTime,
      cls: window.performance.getEntriesByType('layout-shift')
        .reduce((sum, shift) => sum + shift.value, 0)
    }));

    // Dashboard Load Time
    const dashboardStart = Date.now();
    await page.goto('/dashboard');
    const dashboardMetrics = await page.evaluate(() => ({
      lcpTime: window.performance.getEntriesByType('largest-contentful-paint')[0]?.startTime,
      ttfb: window.performance.getEntriesByType('navigation')[0].responseStart
    }));

    await browser.close();

    expect(homeMetrics.lcpTime).toBeLessThan(2500); // 2.5s LCP threshold
    expect(homeMetrics.fid).toBeLessThan(100);     // 100ms FID threshold
    expect(homeMetrics.cls).toBeLessThan(0.1);     // 0.1 CLS threshold
    expect(dashboardMetrics.ttfb).toBeLessThan(600); // 600ms TTFB threshold
  });
});