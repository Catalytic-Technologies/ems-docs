/**
 * Screenshots: Students module
 */

import { test } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';

test('students screenshots', async ({ page }) => {
  // ── 1. Student list ────────────────────────────────────────────────────────
  await page.goto('/students');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('academic', 'students-list.png') });

  // ── 2. Highlight Add Student button ───────────────────────────────────────
  await highlight(page, 'button, a', { colour: '#1a73e8', label: 'Add Student' });
  await page.screenshot({ path: screenshotPath('academic', 'students-add-btn.png') });
  await clearHighlights(page);

  // ── 3. Student detail / profile ───────────────────────────────────────────
  const firstStudent = page.getByRole('link').filter({ hasText: /\w+ \w+/ }).first();
  if (await firstStudent.isVisible({ timeout: 3000 })) {
    await firstStudent.click();
    await page.waitForLoadState('networkidle');
    await pause(page, 600);
    await page.screenshot({ path: screenshotPath('academic', 'student-profile.png') });
  }

  console.log('✅ Student screenshots saved');
});
