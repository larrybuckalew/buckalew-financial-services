import { test, expect } from '@playwright/test';

test.describe('Document Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'TestPass123!');
    await page.click('[data-testid="login-button"]');
  });

  test('upload and verify documents', async ({ page }) => {
    await page.click('[data-testid="documents"]');

    // Upload document
    const fileInput = await page.locator('[data-testid="file-upload"]');
    await fileInput.setInputFiles({
      name: 'test-document.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('test content')
    });

    // Verify upload
    await expect(page.locator('[data-testid="upload-success"]')).toBeVisible();
    await expect(page.locator('[data-testid="document-list"]')).toContainText('test-document.pdf');
  });

  test('document categorization', async ({ page }) => {
    await page.click('[data-testid="documents"]');
    await page.click('[data-testid="document-item"]');

    // Categorize document
    await page.selectOption('[data-testid="document-category"]', 'Tax Returns');
    await page.click('[data-testid="save-category"]');

    // Verify categorization
    await expect(page.locator('[data-testid="category-label"]')).toHaveText('Tax Returns');
  });

  test('document sharing', async ({ page }) => {
    await page.click('[data-testid="documents"]');
    await page.click('[data-testid="document-item"]');
    await page.click('[data-testid="share-document"]');

    // Set sharing options
    await page.fill('[data-testid="share-email"]', 'advisor@example.com');
    await page.selectOption('[data-testid="share-permission"]', 'view');
    await page.click('[data-testid="confirm-share"]');

    // Verify sharing
    await expect(page.locator('[data-testid="share-success"]')).toBeVisible();
  });

  test('document expiration and renewal', async ({ page }) => {
    await page.click('[data-testid="documents"]');
    await page.click('[data-testid="document-item"]');

    // Set expiration
    await page.fill('[data-testid="expiration-date"]', '2025-12-31');
    await page.click('[data-testid="save-expiration"]');

    // Verify expiration setting
    await expect(page.locator('[data-testid="expiration-label"]')).toContainText('2025-12-31');
  });
});