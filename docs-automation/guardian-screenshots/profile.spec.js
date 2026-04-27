/**
 * Guardian screenshots: Profile
 *
 * Captures the parent profile screen including child selector
 * (multi-child families), account settings, and logout.
 */
import { test } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';

test('guardian profile page', async ({ page }) => {
  await page.goto('/profile');
  await page.waitForLoadState('networkidle');
  await pause(page, 1000);

  // Full profile page
  await page.screenshot({ path: screenshotPath('guardian', 'profile.png'), fullPage: false });

  // Highlight avatar / name section
  const nameEl = page.locator('h1, h2, [class*="name"], [class*="title"]').first();
  if (await nameEl.isVisible()) {
    await highlight(page, 'h1, h2', { colour: '#2563eb', label: 'Guardian name' });
    await page.screenshot({ path: screenshotPath('guardian', 'profile-name.png'), fullPage: false });
    await clearHighlights(page);
  }

  // Highlight logout button
  const logout = page.locator('button').filter({ hasText: /log out|sign out|logout/i }).first();
  if (await logout.isVisible()) {
    await highlight(page, 'button:has-text("Log"), button:has-text("Sign out"), button:has-text("Logout")', {
      colour: '#dc2626',
      label: 'Sign out',
    });
    await page.screenshot({ path: screenshotPath('guardian', 'profile-logout.png'), fullPage: false });
    await clearHighlights(page);
  }

  // Scroll to view more settings
  await page.evaluate(() => window.scrollBy(0, 300));
  await pause(page, 400);
  await page.screenshot({ path: screenshotPath('guardian', 'profile-settings.png'), fullPage: false });
});
