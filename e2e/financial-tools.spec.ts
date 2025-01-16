import { test, expect } from '@playwright/test'

test.describe('Financial Tools', () => {
  test.beforeEach(async ({ page }) => {
    // Log in before each test
    await page.goto('/auth/login')
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'Password123!')
    await page.click('[data-testid="login-button"]')
  })

  test('should calculate mortgage payments', async ({ page }) => {
    await page.goto('/tools/mortgage-calculator')
    await page.fill('[data-testid="loan-amount"]', '300000')
    await page.fill('[data-testid="interest-rate"]', '3.5')
    await page.fill('[data-testid="loan-term"]', '30')
    await page.click('[data-testid="calculate-button"]')
    
    await expect(page.locator('[data-testid="monthly-payment"]')).toBeVisible()
    const monthlyPayment = await page.locator('[data-testid="monthly-payment"]').textContent()
    expect(parseFloat(monthlyPayment)).toBeCloseTo(1347.13, 2)
  })

  test('should display portfolio overview', async ({ page }) => {
    await page.goto('/dashboard')
    
    await expect(page.locator('[data-testid="total-assets"]')).toBeVisible()
    await expect(page.locator('[data-testid="asset-allocation"]')).toBeVisible()
    await expect(page.locator('[data-testid="performance-chart"]')).toBeVisible()
  })

  test('should calculate retirement projections', async ({ page }) => {
    await page.goto('/tools/retirement-calculator')
    await page.fill('[data-testid="current-age"]', '30')
    await page.fill('[data-testid="retirement-age"]', '65')
    await page.fill('[data-testid="current-savings"]', '50000')
    await page.fill('[data-testid="monthly-contribution"]', '1000')
    await page.click('[data-testid="calculate-button"]')
    
    await expect(page.locator('[data-testid="projected-savings"]')).toBeVisible()
    await expect(page.locator('[data-testid="monthly-retirement-income"]')).toBeVisible()
  })
})