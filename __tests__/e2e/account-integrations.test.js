import { test, expect } from '@playwright/test';

test.describe('Account Integrations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'TestPass123!');
    await page.click('[data-testid="login-button"]');
  });

  test('link external bank account', async ({ page }) => {
    await page.click('[data-testid="account-linking"]');
    
    // Mock Plaid link flow
    await page.click('[data-testid="link-bank"]');
    await page.fill('[data-testid="plaid-institution"]', 'Chase');
    await page.fill('[data-testid="plaid-username"]', 'test_user');
    await page.fill('[data-testid="plaid-password"]', 'test_pass');
    await page.click('[data-testid="plaid-submit"]');

    // Verify successful linking
    await expect(page.locator('[data-testid="account-linked"]')).toBeVisible();
    await expect(page.locator('[data-testid="account-balance"]')).toBeVisible();
  });

  test('sync transaction history', async ({ page }) => {
    await page.click('[data-testid="linked-accounts"]');
    await page.click('[data-testid="sync-transactions"]');

    // Verify transaction sync
    await expect(page.locator('[data-testid="sync-status"]')).toBeVisible();
    await expect(page.locator('[data-testid="transaction-list"]')).toBeVisible();
  });

  test('categorize transactions', async ({ page }) => {
    await page.click('[data-testid="transactions"]');
    
    // Select and categorize transaction
    await page.click('[data-testid="transaction-item"]');
    await page.selectOption('[data-testid="category-select"]', 'Investment');
    await page.click('[data-testid="save-category"]');

    // Verify categorization
    await expect(page.locator('[data-testid="category-label"]')).toHaveText('Investment');
  });

  test('set account refresh preferences', async ({ page }) => {
    await page.click('[data-testid="account-settings"]');
    
    // Configure refresh settings
    await page.selectOption('[data-testid="refresh-frequency"]', 'daily');
    await page.click('[data-testid="auto-categorize"]');
    await page.click('[data-testid="save-preferences"]');

    // Verify settings update
    await expect(page.locator('[data-testid="settings-saved"]')).toBeVisible();
  });
});