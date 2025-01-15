import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate through main pages', async ({ page }) => {
    // Start from the homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/Buckalew Financial Services/);

    // Navigate to About page
    await page.click('text=About');
    await expect(page).toHaveURL(/.*about/);
    await expect(page.locator('h1')).toContainText('About');

    // Navigate to Services page
    await page.click('text=Services');
    await expect(page).toHaveURL(/.*services/);
    await expect(page.locator('h1')).toContainText('Services');

    // Navigate to Contact page
    await page.click('text=Contact');
    await expect(page).toHaveURL(/.*contact/);
    await expect(page.locator('h1')).toContainText('Contact');
  });
});

test.describe('Calculator functionality', () => {
  test('should calculate mortgage payments', async ({ page }) => {
    await page.goto('/calculators/mortgage');
    
    // Fill in the mortgage calculator form
    await page.fill('input[name="loanAmount"]', '300000');
    await page.fill('input[name="interestRate"]', '3.5');
    await page.selectOption('select[name="loanTerm"]', '30');
    
    await page.click('text=Calculate Payment');
    
    // Check if result is displayed
    const result = await page.locator('.result-amount');
    await expect(result).toBeVisible();
  });
});