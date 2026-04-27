/**
 * Guardian screenshots: Documents
 *
 * Captures the school documents library — circulars, handbooks, and
 * other published files parents can download.
 */
import { test } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';

test('guardian documents library', async ({ page }) => {
  await page.goto('/documents');
  await page.waitForLoadState('networkidle');
  await pause(page, 1200);

  // Full documents page
  await page.screenshot({ path: screenshotPath('guardian', 'documents.png'), fullPage: false });

  // Highlight a document item if visible
  const docItem = page.locator('a, button').filter({ hasText: /download|view|pdf|handbook|circular/i }).first();
  if (await docItem.isVisible()) {
    await highlight(page, 'a, button', { colour: '#2563eb', label: 'Download document' });
    await page.screenshot({ path: screenshotPath('guardian', 'documents-item.png'), fullPage: false });
    await clearHighlights(page);
  }

  // Scroll to reveal more documents
  await page.evaluate(() => window.scrollBy(0, 300));
  await pause(page, 400);
  await page.screenshot({ path: screenshotPath('guardian', 'documents-scrolled.png'), fullPage: false });
});
