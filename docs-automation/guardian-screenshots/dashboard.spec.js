/**
 * Guardian screenshots: Home / Dashboard
 *
 * Captures the main dashboard cards: attendance status, fees overview,
 * performance chart, and messages widget.
 */
import { test } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';

test('guardian home dashboard', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await pause(page, 1500);

  // Full home screen
  await page.screenshot({ path: screenshotPath('guardian', 'home.png'), fullPage: false });

  // Highlight the bottom navigation bar
  await highlight(page, 'nav, [role="navigation"], .bottom-nav, footer nav', {
    colour: '#2563eb',
    label: 'Bottom navigation',
  });
  await page.screenshot({ path: screenshotPath('guardian', 'home-bottom-nav.png'), fullPage: false });
  await clearHighlights(page);

  // Highlight attendance card
  const attCard = page.locator('text=Attendance').first();
  if (await attCard.isVisible()) {
    await highlight(page, attCard, { colour: '#2563eb', label: 'Attendance status' });
    await page.screenshot({ path: screenshotPath('guardian', 'home-attendance-card.png'), fullPage: false });
    await clearHighlights(page);
  }

  // Scroll down to reveal fees card
  await page.evaluate(() => window.scrollBy(0, 300));
  await pause(page, 500);
  await page.screenshot({ path: screenshotPath('guardian', 'home-fees-card.png'), fullPage: false });

  // Scroll further to performance
  await page.evaluate(() => window.scrollBy(0, 300));
  await pause(page, 500);
  await page.screenshot({ path: screenshotPath('guardian', 'home-performance-card.png'), fullPage: false });

  // Scroll to bottom — messages widget
  await page.evaluate(() => window.scrollBy(0, 400));
  await pause(page, 500);
  await page.screenshot({ path: screenshotPath('guardian', 'home-messages-widget.png'), fullPage: false });
});
