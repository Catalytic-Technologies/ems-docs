/**
 * Guardian screenshots: Academic Progress & Report Cards
 *
 * Captures the progress page, subject performance bars, and the
 * report card status.
 */
import { test } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';

test('guardian academic progress', async ({ page }) => {
  await page.goto('/progress');
  await page.waitForLoadState('networkidle');
  await pause(page, 1200);

  // Full progress page
  await page.screenshot({ path: screenshotPath('guardian', 'progress.png'), fullPage: false });

  // Highlight the performance chart
  const chart = page.locator('canvas, svg').first();
  if (await chart.isVisible()) {
    await highlight(page, 'canvas, svg', { colour: '#2563eb', label: 'Performance chart' });
    await page.screenshot({ path: screenshotPath('guardian', 'progress-chart.png'), fullPage: false });
    await clearHighlights(page);
  }

  // Scroll to subject breakdown
  await page.evaluate(() => window.scrollBy(0, 300));
  await pause(page, 500);
  await page.screenshot({ path: screenshotPath('guardian', 'progress-subjects.png'), fullPage: false });

  // Highlight a subject row if visible
  const subjectRow = page.locator('text=Mathematics').first();
  if (await subjectRow.isVisible()) {
    await highlight(page, ':text("Mathematics")', { colour: '#2563eb', label: 'Subject score' });
    await page.screenshot({ path: screenshotPath('guardian', 'progress-subject-row.png'), fullPage: false });
    await clearHighlights(page);
  }

  // Report card section
  const reportSection = page.locator('text=Report Card, text=Report card').first();
  if (await reportSection.isVisible()) {
    await highlight(page, ':text("Report")', { colour: '#2563eb', label: 'Report card status' });
    await page.screenshot({ path: screenshotPath('guardian', 'progress-report-status.png'), fullPage: false });
    await clearHighlights(page);
  }

  // Tap a subject to drill in (if links exist)
  const subjectLink = page.locator('a[href*="/progress/subject/"]').first();
  if (await subjectLink.isVisible()) {
    await subjectLink.click();
    await page.waitForLoadState('networkidle');
    await pause(page, 800);
    await page.screenshot({ path: screenshotPath('guardian', 'progress-subject-detail.png'), fullPage: false });
  }
});
