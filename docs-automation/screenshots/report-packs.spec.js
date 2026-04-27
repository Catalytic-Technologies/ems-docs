/**
 * Screenshots: Report Packs module
 * Routes: /report-packs, /report-packs/builder, /report-packs/my
 */
import { test } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';

test('report packs list', async ({ page }) => {
  await page.goto('/report-packs');
  await page.waitForLoadState('networkidle');
  await pause(page, 1200);
  await page.screenshot({ path: screenshotPath('academic', 'report-packs-list.png') });

  // Highlight status badges
  const draft = page.locator('text=DRAFT, text=Draft').first();
  if (await draft.isVisible()) {
    await highlight(page, ':text("DRAFT"), :text("Draft")', { colour: '#64748b', label: 'Draft pack' });
    await page.screenshot({ path: screenshotPath('academic', 'report-packs-draft.png') });
    await clearHighlights(page);
  }

  const approved = page.locator('text=APPROVED, text=Approved').first();
  if (await approved.isVisible()) {
    await highlight(page, ':text("APPROVED"), :text("Approved")', { colour: '#16a34a', label: 'Approved pack' });
    await page.screenshot({ path: screenshotPath('academic', 'report-packs-approved.png') });
    await clearHighlights(page);
  }
});

test('report pack builder (teacher view)', async ({ page }) => {
  await page.goto('/report-packs/builder');
  await page.waitForLoadState('networkidle');
  await pause(page, 1200);
  await page.screenshot({ path: screenshotPath('academic', 'report-pack-builder.png') });

  // Highlight class selector
  const classSel = page.locator('select, [class*="select"]').first();
  if (await classSel.isVisible()) {
    await highlight(page, 'select', { colour: '#2563eb', label: 'Select class' });
    await page.screenshot({ path: screenshotPath('academic', 'report-pack-class-select.png') });
    await clearHighlights(page);
  }
});

test('my report packs (teacher)', async ({ page }) => {
  await page.goto('/report-packs/my');
  await page.waitForLoadState('networkidle');
  await pause(page, 1000);
  await page.screenshot({ path: screenshotPath('academic', 'my-report-packs.png') });
});
