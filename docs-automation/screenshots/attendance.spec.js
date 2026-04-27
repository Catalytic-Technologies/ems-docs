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
  // ── 1a. Attendance Mark page (teacher view) ───────────────────────────────
  await page.goto('/attendance/mark');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);

  await page.screenshot({
    path: screenshotPath('academic', 'attendance-list.png'),
    fullPage: false,
  });

  // ── 2. Attendance View page (admin/report view) ───────────────────────────
  await page.goto('/attendance/view');
  await page.waitForLoadState('networkidle');
  await pause(page, 600);

  await page.screenshot({
    path: screenshotPath('academic', 'attendance-view.png'),
  });

  // ── 2a. Open first available class from mark page ─────────────────────────
  await page.goto('/attendance/mark');
  await page.waitForLoadState('networkidle');
  await pause(page, 600);

  const firstClass = page.getByRole('link', { name: /grade|class/i }).first();
  if (await firstClass.isVisible({ timeout: 3000 })) {
    await highlight(page, 'table tbody tr:first-child, .attendance-class-row:first-child', {
      label: 'Click to mark',
    });
    await page.screenshot({
      path: screenshotPath('academic', 'attendance-class-select.png'),
    });
    await clearHighlights(page);
    await firstClass.click();
    await page.waitForLoadState('networkidle');
    await pause(page, 600);
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
