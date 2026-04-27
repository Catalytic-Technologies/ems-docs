/**
 * Video recording: Attendance workflow
 *
 * Records the full flow of marking attendance for a class.
 * Output: docs-automation/recordings/attendance/
 */

import { test } from '@playwright/test';
import { videoDir, injectCursorRing, pause } from '../helpers.js';
import path from 'path';

test('record attendance workflow', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'auth-state.json',
    recordVideo: {
      dir: path.join(videoDir('attendance')),
      size: { width: 1280, height: 720 },
    },
    viewport: { width: 1280, height: 720 },
  });

  const page = await context.newPage();
  await injectCursorRing(page);

  // ── Navigate to Attendance ─────────────────────────────────────────────────
  await page.goto('/attendance/mark');
  await page.waitForLoadState('networkidle');
  await pause(page, 2000); // let viewer see the list

  // ── Open a class ──────────────────────────────────────────────────────────
  const classLink = page.getByRole('link', { name: /grade 4|class/i }).first();
  if (await classLink.isVisible({ timeout: 4000 })) {
    await classLink.click();
    await page.waitForLoadState('networkidle');
    await pause(page, 2000);
  }

  // ── Verify the date is correct ────────────────────────────────────────────
  await pause(page, 1500);

  // ── Mark All Present ──────────────────────────────────────────────────────
  const markAllBtn = page.getByRole('button', { name: /mark all present/i });
  if (await markAllBtn.isVisible({ timeout: 3000 })) {
    await markAllBtn.click();
    await pause(page, 1500);
  }

  // ── Change one student to Absent ──────────────────────────────────────────
  const absentBtn = page.getByRole('button', { name: /^A$|absent/i }).first();
  if (await absentBtn.isVisible({ timeout: 3000 })) {
    await absentBtn.click();
    await pause(page, 1000);
  }

  // ── Save ──────────────────────────────────────────────────────────────────
  const saveBtn = page.getByRole('button', { name: /save attendance/i });
  if (await saveBtn.isVisible({ timeout: 3000 })) {
    await saveBtn.click();
    await page.waitForLoadState('networkidle');
    await pause(page, 2000);
  }

  await context.close(); // closes and finalises the .webm recording
  console.log('✅ Attendance video recording saved to docs-automation/recordings/attendance/');
});
