/**
 * Screenshots: Timetables module
 * Routes: /timetables, /timetables/calendar, /timetables/school-overview
 */
import { test } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';

test('timetables list', async ({ page }) => {
  await page.goto('/timetables');
  await page.waitForLoadState('networkidle');
  await pause(page, 1000);
  await page.screenshot({ path: screenshotPath('academic', 'timetables-list.png') });

  // Highlight Create Timetable button
  const createBtn = page.getByRole('button', { name: /create|new timetable/i }).first();
  if (await createBtn.isVisible()) {
    await highlight(page, createBtn, { colour: '#2563eb', label: 'Create timetable' });
    await page.screenshot({ path: screenshotPath('academic', 'timetables-create.png') });
    await clearHighlights(page);
  }

  // Open first timetable
  const firstLink = page.locator('table tbody tr a, [class*="row"] a').first();
  if (await firstLink.isVisible()) {
    await firstLink.click();
    await page.waitForLoadState('networkidle');
    await pause(page, 1200);
    await page.screenshot({ path: screenshotPath('academic', 'timetable-detail.png') });

    // Highlight a period cell
    const cell = page.locator('table td, [class*="period"], [class*="slot"]').nth(3);
    if (await cell.isVisible()) {
      await highlight(page, 'table td:nth-child(3)', { colour: '#2563eb', label: 'Period slot' });
      await page.screenshot({ path: screenshotPath('academic', 'timetable-period-cell.png') });
      await clearHighlights(page);
    }
  }
});

test('timetable calendar view', async ({ page }) => {
  await page.goto('/timetables/calendar');
  await page.waitForLoadState('networkidle');
  await pause(page, 1500);
  await page.screenshot({ path: screenshotPath('academic', 'timetable-calendar.png') });
});

test('school timetable overview', async ({ page }) => {
  await page.goto('/timetables/school-overview');
  await page.waitForLoadState('networkidle');
  await pause(page, 1200);
  await page.screenshot({ path: screenshotPath('academic', 'timetable-school-overview.png') });
});
