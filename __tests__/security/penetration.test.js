import { test, expect } from '@playwright/test';

describe('Security Tests', () => {
  test('XSS vulnerability checks', async ({ page }) => {
    const xssPayload = '<script>alert("xss")</script>';
    
    await page.goto('/contact');
    await page.fill('[data-testid="contact-form-name"]', xssPayload);
    await page.click('[data-testid="submit-form"]');
    
    const content = await page.content();
    expect(content).not.toContain(xssPayload);
  });

  test('CSRF protection', async ({ page }) => {
    await page.goto('/profile');
    
    const response = await page.evaluate(async () => {
      const res = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Test' })
      });
      return res.status;
    });
    
    expect(response).toBe(403); // Should fail without CSRF token
  });

  test('rate limiting', async ({ page }) => {
    const attempts = Array(11).fill(null);
    const responses = await Promise.all(
      attempts.map(() => 
        page.evaluate(() =>
          fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: 'test@example.com',
              password: 'test123'
            })
          }).then(res => res.status)
        )
      )
    );
    
    expect(responses[responses.length - 1]).toBe(429); // Rate limit exceeded
  });
});