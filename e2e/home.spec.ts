import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  await page.goto('/');
  
  // Check for main title
  const mainTitle = await page.textContent('h1');
  expect(mainTitle).toContain('Welcome to Buckalew Financial Services');

  // Check for navigation links
  const servicesLink = await page.getByRole('link', { name: 'Our Services' });
  const contactLink = await page.getByRole('link', { name: 'Contact Us' });
  
  expect(servicesLink).toBeTruthy();
  expect(contactLink).toBeTruthy();
})