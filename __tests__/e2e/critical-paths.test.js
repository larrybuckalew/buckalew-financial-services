import { test, expect } from '@playwright/test';

describe('Critical User Paths', () => {
  test('complete financial planning workflow', async ({ page }) => {
    await page.goto('/');
    
    // User Registration
    await test.step('user registration', async () => {
      await page.click('[data-testid="register-button"]');
      await page.fill('[data-testid="email-input"]', 'test@example.com');
      await page.fill('[data-testid="password-input"]', 'TestPassword123');
      await page.click('[data-testid="submit-registration"]');
      await expect(page).toHaveURL('/dashboard');
    });

    // Financial Profile Creation
    await test.step('financial profile creation', async () => {
      await page.click('[data-testid="create-profile"]');
      await page.fill('[data-testid="income-input"]', '75000');
      await page.fill('[data-testid="savings-input"]', '25000');
      await page.click('[data-testid="save-profile"]');
      await expect(page.locator('[data-testid="profile-saved"]')).toBeVisible();
    });

    // Investment Portfolio Setup
    await test.step('investment portfolio setup', async () => {
      await page.click('[data-testid="portfolio-setup"]');
      await page.selectOption('[data-testid="risk-level"]', 'moderate');
      await page.click('[data-testid="generate-portfolio"]');
      await expect(page.locator('[data-testid="portfolio-recommendation"]')).toBeVisible();
    });
  });
});