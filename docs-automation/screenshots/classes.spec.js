/**
 * Screenshots: Classes, Timetables, Assessments, Exit Passes
 */

import { test } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';

test('classes list screenshot', async ({ page }) => {
  await page.goto('/classes');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('academic', 'classes-list.png') });

  // Click into first class
  const firstClass = page.getByRole('link').filter({ hasText: /grade|class|form/i }).first();
  if (await firstClass.isVisible({ timeout: 3000 })) {
    await firstClass.click();
    await page.waitForLoadState('networkidle');
    await pause(page, 800);
    await page.screenshot({ path: screenshotPath('academic', 'class-detail.png') });
  }
});

test('timetable screenshots', async ({ page }) => {
  await page.goto('/timetables');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('academic', 'timetables-list.png') });

  await page.goto('/timetables/calendar');
  await page.waitForLoadState('networkidle');
  await pause(page, 1000);
  await page.screenshot({ path: screenshotPath('academic', 'timetable-calendar.png') });
});

test('assessments screenshots', async ({ page }) => {
  await page.goto('/assessments');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('academic', 'assessments-list.png') });

  await page.goto('/assessments/marks');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('academic', 'assessments-marks.png') });
});

test('exit passes screenshots', async ({ page }) => {
  await page.goto('/exit-passes');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('academic', 'exit-passes-list.png') });

  // Highlight Issue button
  await highlight(page, 'a[href*="exit-passes/new"], button', {
    colour: '#2563eb',
    label: 'Issue exit pass',
  });
  await page.screenshot({ path: screenshotPath('academic', 'exit-passes-issue.png') });
  await clearHighlights(page);
});
