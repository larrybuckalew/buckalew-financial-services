import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test('should submit contact form successfully', async ({ page }) => {
    await page.goto('/contact');

    // Fill out the contact form
    await page.fill('input[name="name"]', 'Test User');
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="phone"]', '555-555-5555');
    await page.selectOption('select[name="service"]', 'Financial Planning');
    await page.fill('textarea[name="message"]', 'This is a test message');

    // Submit the form
    await page.click('button[type="submit"]');

    // Check for success message
    const successMessage = await page.locator('.success-message');
    await expect(successMessage).toBeVisible();
    await expect(successMessage).toContainText('Thank you for contacting us');
  });

  test('should show validation errors', async ({ page }) => {
    await page.goto('/contact');

    // Try to submit empty form
    await page.click('button[type="submit"]');

    // Check for error messages
    const errorMessages = await page.locator('.error-message');
    await expect(errorMessages).toHaveCount(3); // Name, email, and message are required
  });
});