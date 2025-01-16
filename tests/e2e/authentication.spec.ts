import { test, expect } from '@playwright/test'

test.describe('Authentication Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/login')
  })

  test('successful login with valid credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'test@example.com')
    await page.fill('input[name="password"]', 'ValidPassword123!')
    await page.click('button[type="submit"]')

    // Assert redirect to dashboard
    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('h1')).toContainText('Welcome')
  })

  test('failed login with incorrect credentials', async ({ page }) => {
    await page.fill('input[name="email"]', 'wrong@example.com')
    await page.fill('input[name="password"]', 'incorrectPassword')
    await page.click('button[type="submit"]')

    // Assert error message
    const errorMessage = page.locator('.error-message')
    await expect(errorMessage).toBeVisible()
    await expect(errorMessage).toContainText('Invalid credentials')
  })

  test('registration with valid data', async ({ page }) => {
    await page.goto('/auth/register')
    
    await page.fill('input[name="name"]', 'Test User')
    await page.fill('input[name="email"]', 'newuser@example.com')
    await page.fill('input[name="password"]', 'StrongP@ssw0rd123!')
    await page.fill('input[name="confirmPassword"]', 'StrongP@ssw0rd123!')
    
    await page.click('button[type="submit"]')

    // Assert successful registration
    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('.success-message')).toContainText('Registration successful')
  })
})