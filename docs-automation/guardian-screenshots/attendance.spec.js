/**
 * Guardian screenshots: Attendance
 *
 * Captures the child's attendance history and the summary chart.
 */
import { test } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';

test('guardian attendance page', async ({ page }) => {
  await page.goto('/attendance');
  await page.waitForLoadState('networkidle');
  await pause(page, 1200);

  // Full attendance page
  await page.screenshot({ path: screenshotPath('guardian', 'attendance.png'), fullPage: false });

  // Highlight the attendance chart/summary
  const chart = page.locator('canvas, svg, [data-testid="attendance-chart"]').first();
  if (await chart.isVisible()) {
    await highlight(page, 'canvas, svg', { colour: '#2563eb', label: 'Attendance chart' });
    await page.screenshot({ path: screenshotPath('guardian', 'attendance-chart.png'), fullPage: false });
    await clearHighlights(page);
  }

  // Scroll to show the list of daily records
  await page.evaluate(() => window.scrollBy(0, 300));
  await pause(page, 500);
  await page.screenshot({ path: screenshotPath('guardian', 'attendance-history.png'), fullPage: false });

  // Highlight a PRESENT status badge if visible
  const presentBadge = page.locator('text=Present').first();
  if (await presentBadge.isVisible()) {
    await highlight(page, ':text("Present")', { colour: '#16a34a', label: 'Present' });
    await page.screenshot({ path: screenshotPath('guardian', 'attendance-present-badge.png'), fullPage: false });
    await clearHighlights(page);
  }

  // Highlight an ABSENT status badge if visible
  const absentBadge = page.locator('text=Absent').first();
  if (await absentBadge.isVisible()) {
    await highlight(page, ':text("Absent")', { colour: '#dc2626', label: 'Absent' });
    await page.screenshot({ path: screenshotPath('guardian', 'attendance-absent-badge.png'), fullPage: false });
    await clearHighlights(page);
  }
});
