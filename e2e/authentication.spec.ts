import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test('should allow user to sign up', async ({ page }) => {
    await page.goto('/auth/signup')
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'Password123!')
    await page.fill('[data-testid="confirm-password-input"]', 'Password123!')
    await page.click('[data-testid="signup-button"]')
    
    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('[data-testid="welcome-message"]')).toBeVisible()
  })

  test('should allow user to log in', async ({ page }) => {
    await page.goto('/auth/login')
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.fill('[data-testid="password-input"]', 'Password123!')
    await page.click('[data-testid="login-button"]')
    
    await expect(page).toHaveURL('/dashboard')
  })

  test('should handle forgotten password flow', async ({ page }) => {
    await page.goto('/auth/forgot-password')
    await page.fill('[data-testid="email-input"]', 'test@example.com')
    await page.click('[data-testid="reset-button"]')
    
    await expect(page.locator('[data-testid="success-message"]')).toBeVisible()
  })
})