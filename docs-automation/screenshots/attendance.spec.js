/**
 * Screenshots: Attendance module
 *
 * Captures annotated screenshots of the attendance marking flow.
 * Output: static/img/academic/attendance-*.png
 */

import { test, expect } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';

test('attendance screenshots', async ({ page }) => {
  // ── 1. Navigate to Attendance ──────────────────────────────────────────────
  await page.goto('/attendance');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);

  await page.screenshot({
    path: screenshotPath('academic', 'attendance-list.png'),
    fullPage: false,
  });

  // ── 2. Open a class ────────────────────────────────────────────────────────
  const firstClass = page.getByRole('link', { name: /grade 4 blue/i }).first();
  if (await firstClass.isVisible()) {
    await highlight(page, '[data-testid="class-row"]:first-child, .class-row:first-child, tr:first-child', {
      label: 'Click to open',
    });
    await page.screenshot({
      path: screenshotPath('academic', 'attendance-class-select.png'),
    });
    await clearHighlights(page);
    await firstClass.click();
    await page.waitForLoadState('networkidle');
    await pause(page, 600);
  } else {
    // fallback: try clicking any attendance link
    await page.getByRole('link').first().click();
    await page.waitForLoadState('networkidle');
  }

  // ── 3. Attendance marking screen ──────────────────────────────────────────
  await page.screenshot({
    path: screenshotPath('academic', 'attendance-mark.png'),
  });

  // ── 4. Highlight "Mark All Present" button ────────────────────────────────
  const markAllBtn = page.getByRole('button', { name: /mark all present/i });
  if (await markAllBtn.isVisible()) {
    await highlight(page, 'button', { colour: '#137333', label: 'Mark All Present' });
    await page.screenshot({
      path: screenshotPath('academic', 'attendance-mark-all.png'),
    });
    await clearHighlights(page);
  }

  // ── 5. Highlight Save Attendance button ───────────────────────────────────
  const saveBtn = page.getByRole('button', { name: /save attendance/i });
  if (await saveBtn.isVisible()) {
    await highlight(page, 'button[type="submit"], .btn-save', { colour: '#1a73e8', label: 'Save' });
    await page.screenshot({
      path: screenshotPath('academic', 'attendance-save.png'),
    });
    await clearHighlights(page);
  }

  console.log('✅ Attendance screenshots saved to static/img/academic/');
});
