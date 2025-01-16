import { test, expect } from '@playwright/test';

test.describe('Advisory Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'TestPass123!');
    await page.click('[data-testid="login-button"]');
  });

  test('schedule advisor meeting', async ({ page }) => {
    await page.click('[data-testid="advisory-services"]');
    await page.click('[data-testid="schedule-meeting"]');

    // Fill meeting details
    await page.selectOption('[data-testid="meeting-type"]', 'portfolio-review');
    await page.fill('[data-testid="meeting-date"]', '2025-02-01');
    await page.selectOption('[data-testid="meeting-time"]', '14:00');
    await page.click('[data-testid="confirm-meeting"]');

    // Verify scheduling
    await expect(page.locator('[data-testid="meeting-confirmed"]')).toBeVisible();
  });

  test('investment recommendations', async ({ page }) => {
    await page.click('[data-testid="advisory-services"]');
    await page.click('[data-testid="get-recommendations"]');

    // Review recommendations
    await expect(page.locator('[data-testid="recommendation-list"]')).toBeVisible();
    
    // Accept recommendation
    await page.click('[data-testid="accept-recommendation"]');
    await page.click('[data-testid="confirm-action"]');

    // Verify acceptance
    await expect(page.locator('[data-testid="action-confirmed"]')).toBeVisible();
  });

  test('portfolio analysis report', async ({ page }) => {
    await page.click('[data-testid="advisory-services"]');
    await page.click('[data-testid="portfolio-analysis"]');

    // Generate report
    await page.click('[data-testid="generate-report"]');

    // Verify report sections
    await expect(page.locator('[data-testid="allocation-analysis"]')).toBeVisible();
    await expect(page.locator('[data-testid="performance-metrics"]')).toBeVisible();
    await expect(page.locator('[data-testid="risk-analysis"]')).toBeVisible();
  });

  test('advisor communication', async ({ page }) => {
    await page.click('[data-testid="advisory-services"]');
    await page.click('[data-testid="message-advisor"]');

    // Send message
    await page.fill('[data-testid="message-input"]', 'Question about portfolio allocation');
    await page.click('[data-testid="send-message"]');

    // Verify message sent
    await expect(page.locator('[data-testid="message-sent"]')).toBeVisible();
  });
});