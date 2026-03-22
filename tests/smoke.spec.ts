import { test, expect } from '@playwright/test';

test('homepage renders main layout', async ({ page }) => {
  await page.goto('/');
  // Basic smoke test to ensure the Astro app renders
  await expect(page).toHaveTitle(/Wanda/i);
});

test('responsive mobile layout works', async ({ page, isMobile }) => {
  await page.goto('/');
  // Checking that body exists and layout doesn't crash on mobile or desktop
  const body = await page.locator('body');
  await expect(body).toBeVisible();
});
