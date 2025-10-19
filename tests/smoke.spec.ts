import { test, expect } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

test.describe('Public slider smoke', () => {
  test('health endpoint responds with timestamp', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/api/health`);
    expect(response.status()).toBe(200);

    const data = await response.json();
    expect(data).toMatchObject({ ok: true });
    expect(new Date(data.time).toString()).not.toBe('Invalid Date');
  });

  test('home page renders slider hero region', async ({ page }) => {
    const response = await page.goto(BASE_URL);
    expect(response?.ok()).toBeTruthy();

    const carousel = page.locator('[aria-roledescription="carousel"]');
    await expect(carousel).toBeVisible();

    const quickActions = page.locator('a[aria-label="Konum"]');
    await expect(quickActions.first()).toBeVisible();
  });
});
