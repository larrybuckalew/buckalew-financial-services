import { chromium } from '@playwright/test';

async function globalSetup() {
  // Set up any global test data or configuration
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Create test user if needed
  try {
    await page.goto(process.env.BASE_URL + '/api/test/setup');
    const response = await page.waitForResponse(response =>
      response.url().includes('/api/test/setup') && response.status() === 200
    );
    console.log('Test environment setup complete');
  } catch (error) {
    console.error('Error setting up test environment:', error);
    throw error;
  }

  await browser.close();
}

export default globalSetup;