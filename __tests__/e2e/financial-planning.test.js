import { test, expect } from '@playwright/test';

test.describe('Financial Planning Workflows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'TestPass123!');
    await page.click('[data-testid="login-button"]');
  });

  test('complete retirement planning workflow', async ({ page }) => {
    await page.click('[data-testid="retirement-planning"]');

    // Fill retirement goals
    await page.fill('[data-testid="retirement-age"]', '65');
    await page.fill('[data-testid="current-savings"]', '100000');
    await page.fill('[data-testid="monthly-contribution"]', '1000');
    await page.click('[data-testid="calculate-retirement"]');

    // Verify results
    await expect(page.locator('[data-testid="retirement-projection"]')).toBeVisible();
    await expect(page.locator('[data-testid="monthly-needed"]')).toBeVisible();

    // Save plan
    await page.click('[data-testid="save-plan"]');
    await expect(page.locator('[data-testid="save-confirmation"]')).toBeVisible();
  });

  test('investment portfolio rebalancing', async ({ page }) => {
    await page.click('[data-testid="portfolio-management"]');

    // Check current allocation
    const currentAllocation = await page.locator('[data-testid="current-allocation"]').textContent();
    
    // Adjust allocation
    await page.fill('[data-testid="stocks-allocation"]', '70');
    await page.fill('[data-testid="bonds-allocation"]', '30');
    await page.click('[data-testid="rebalance-portfolio"]');

    // Verify changes
    await expect(page.locator('[data-testid="rebalance-confirmation"]')).toBeVisible();
    const newAllocation = await page.locator('[data-testid="current-allocation"]').textContent();
    expect(newAllocation).not.toBe(currentAllocation);
  });

  test('risk assessment questionnaire', async ({ page }) => {
    await page.click('[data-testid="risk-assessment"]');

    // Complete questionnaire
    const questions = await page.locator('[data-testid="risk-question"]').all();
    for (const question of questions) {
      await question.locator('input[value="moderate"]').click();
    }

    await page.click('[data-testid="submit-assessment"]');

    // Verify risk profile
    await expect(page.locator('[data-testid="risk-profile"]')).toBeVisible();
    await expect(page.locator('[data-testid="investment-recommendations"]')).toBeVisible();
  });

  test('goal tracking setup', async ({ page }) => {
    await page.click('[data-testid="goals-tracking"]');

    // Add new financial goal
    await page.click('[data-testid="add-goal"]');
    await page.fill('[data-testid="goal-name"]', 'Buy a House');
    await page.fill('[data-testid="goal-amount"]', '500000');
    await page.fill('[data-testid="goal-date"]', '2027-12-31');
    await page.click('[data-testid="save-goal"]');

    // Verify goal creation
    await expect(page.locator('[data-testid="goal-card"]')).toBeVisible();
    await expect(page.locator('[data-testid="goal-progress"]')).toBeVisible();
  });
});