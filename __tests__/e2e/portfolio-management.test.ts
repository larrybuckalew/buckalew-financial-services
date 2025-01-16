import { test, expect } from '@playwright/test';

test.describe('Portfolio Management', () => {
  test.beforeEach(async ({ page }) => {
    // Login and navigate to portfolio section
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'TestPass123!');
    await page.click('[data-testid="login-button"]');
    await page.click('[data-testid="portfolio-section"]');
  });

  test('portfolio overview displays correctly', async ({ page }) => {
    // Verify portfolio summary
    await expect(page.locator('[data-testid="portfolio-summary"]')).toBeVisible();
    await expect(page.locator('[data-testid="total-value"]')).toBeVisible();
    await expect(page.locator('[data-testid="total-gain"]')).toBeVisible();

    // Verify holdings table
    await expect(page.locator('[data-testid="holdings-table"]')).toBeVisible();
    const holdings = await page.locator('[data-testid="holding-row"]').all();
    expect(holdings.length).toBeGreaterThan(0);

    // Verify allocation chart
    await expect(page.locator('[data-testid="allocation-chart"]')).toBeVisible();
  });

  test('rebalancing workflow', async ({ page }) => {
    // Navigate to rebalancing
    await page.click('[data-testid="rebalance-portfolio"]');

    // Check current allocation
    await expect(page.locator('[data-testid="current-allocation"]')).toBeVisible();
    await expect(page.locator('[data-testid="target-allocation"]')).toBeVisible();

    // View rebalancing recommendations
    await page.click('[data-testid="view-recommendations"]');
    await expect(page.locator('[data-testid="trade-recommendations"]')).toBeVisible();

    // Review tax implications
    await page.click('[data-testid="review-tax-impact"]');
    await expect(page.locator('[data-testid="tax-implications"]')).toBeVisible();

    // Confirm rebalancing
    await page.click('[data-testid="confirm-rebalancing"]');
    await expect(page.locator('[data-testid="confirmation-dialog"]')).toBeVisible();
    await page.click('[data-testid="confirm-yes"]');

    // Verify success message
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();
  });

  test('portfolio analysis features', async ({ page }) => {
    // Navigate to analysis section
    await page.click('[data-testid="portfolio-analysis"]');

    // Check risk metrics
    await expect(page.locator('[data-testid="risk-metrics"]')).toBeVisible();
    await expect(page.locator('[data-testid="volatility-metric"]')).toBeVisible();
    await expect(page.locator('[data-testid="beta-metric"]')).toBeVisible();
    await expect(page.locator('[data-testid="sharpe-ratio"]')).toBeVisible();

    // Performance analysis
    await page.click('[data-testid="performance-tab"]');
    await expect(page.locator('[data-testid="performance-chart"]')).toBeVisible();
    await expect(page.locator('[data-testid="returns-table"]')).toBeVisible();

    // Date range selection
    await page.selectOption('[data-testid="date-range"]', '1Y');
    await expect(page.locator('[data-testid="performance-chart"]')).toBeVisible();

    // Export analysis
    await page.click('[data-testid="export-analysis"]');
    const download = await Promise.all([
      page.waitForEvent('download'),
      page.click('[data-testid="download-pdf"]')
    ]);
    expect(download[0].suggestedFilename()).toContain('portfolio-analysis');
  });

  test('add new holdings workflow', async ({ page }) => {
    // Navigate to add holding
    await page.click('[data-testid="add-holding"]');

    // Search for security
    await page.fill('[data-testid="security-search"]', 'VTI');
    await page.click('[data-testid="search-results"] >> text=VTI');

    // Enter trade details
    await page.fill('[data-testid="shares-input"]', '10');
    await page.fill('[data-testid="price-input"]', '200');
    await page.fill('[data-testid="date-input"]', '2024-01-15');

    // Submit order
    await page.click('[data-testid="submit-order"]');

    // Verify confirmation
    await expect(page.locator('[data-testid="order-confirmation"]')).toBeVisible();
    await expect(page.locator('[data-testid="holdings-table"]')).toContainText('VTI');
  });

  test('portfolio settings and preferences', async ({ page }) => {
    // Navigate to settings
    await page.click('[data-testid="portfolio-settings"]');

    // Update risk profile
    await page.selectOption('[data-testid="risk-tolerance"]', 'AGGRESSIVE');
    await page.click('[data-testid="save-risk-profile"]');
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible();

    // Configure alerts
    await page.click('[data-testid="alert-settings"]');
    await page.check('[data-testid="price-alerts"]');
    await page.fill('[data-testid="price-threshold"]', '5');
    await page.click('[data-testid="save-alerts"]');
    await expect(page.locator('[data-testid="settings-saved"]')).toBeVisible();

    // Set display preferences
    await page.click('[data-testid="display-settings"]');
    await page.selectOption('[data-testid="default-view"]', 'PERFORMANCE');
    await page.click('[data-testid="save-preferences"]');
    await expect(page.locator('[data-testid="preferences-saved"]')).toBeVisible();
  });

  test('tax loss harvesting analysis', async ({ page }) => {
    // Navigate to tax analysis
    await page.click('[data-testid="tax-analysis"]');

    // View harvesting opportunities
    await expect(page.locator('[data-testid="harvesting-opportunities"]')).toBeVisible();

    // Select position to harvest
    await page.click('[data-testid="harvest-position"]');
    await expect(page.locator('[data-testid="tax-impact"]')).toBeVisible();

    // Review replacement options
    await expect(page.locator('[data-testid="replacement-options"]')).toBeVisible();

    // Confirm harvesting strategy
    await page.click('[data-testid="confirm-harvest"]');
    await expect(page.locator('[data-testid="harvest-confirmation"]')).toBeVisible();
  });
});
