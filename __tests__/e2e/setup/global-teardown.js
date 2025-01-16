import { chromium } from '@playwright/test';

async function globalTeardown() {
  // Clean up test data
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    await page.goto(process.env.BASE_URL + '/api/test/teardown');
    const response = await page.waitForResponse(response =>
      response.url().includes('/api/test/teardown') && response.status() === 200
    );
    console.log('Test environment cleanup complete');
  } catch (error) {
    console.error('Error cleaning up test environment:', error);
    throw error;
  }

  await browser.close();
}