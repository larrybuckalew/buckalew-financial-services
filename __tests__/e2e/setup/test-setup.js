import { expect, test as base } from '@playwright/test';

// Extend basic test with custom auth fixture
export const test = base.extend({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', process.env.TEST_USER_EMAIL);
    await page.fill('[data-testid="password-input"]', process.env.TEST_USER_PASSWORD);
    await page.click('[data-testid="login-button"]');
    await expect(page).toHaveURL('/dashboard');
    await use(page);
  }
});

// Custom assertions
expect.extend({
  toBeValidDate: function(received) {
    const pass = !isNaN(Date.parse(received));
    return {
      pass,
      message: () =>
        pass
          ? `Expected ${received} not to be a valid date`
          : `Expected ${received} to be a valid date`
    };
  },
  
  toBeMonetaryValue: function(received) {
    const pass = /^\$?\d+(,\d{3})*(\.\d{2})?$/.test(received);
    return {
      pass,
      message: () =>
        pass
          ? `Expected ${received} not to be a valid monetary value`
          : `Expected ${received} to be a valid monetary value`
    };
  }
});