/**
 * Screenshots: Communication — Inbox, Documents, Calendar
 */

import { test } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';

test('inbox screenshots', async ({ page }) => {
  await page.goto('/inbox');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('communication', 'inbox.png') });

  // Highlight Compose button
  await highlight(page, 'a[href*="compose"], button', {
    colour: '#2563eb',
    label: 'Compose message',
  });
  await page.screenshot({ path: screenshotPath('communication', 'inbox-compose-btn.png') });
  await clearHighlights(page);

  // Compose page
  await page.goto('/inbox/compose');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('communication', 'compose.png') });
});

test('documents screenshots', async ({ page }) => {
  await page.goto('/documents');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('communication', 'documents-list.png') });
});

test('calendar screenshot', async ({ page }) => {
  await page.goto('/calendar');
  await page.waitForLoadState('networkidle');
  await pause(page, 1000);
  await page.screenshot({ path: screenshotPath('administration', 'calendar.png') });
});

test('staff and parents screenshots', async ({ page }) => {
  await page.goto('/staff');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('administration', 'staff-list.png') });

  await page.goto('/parents');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('administration', 'parents-list.png') });
});

test('reports center screenshot', async ({ page }) => {
  await page.goto('/reports/center');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('reports', 'reports-center.png') });

  await page.goto('/report-packs');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('reports', 'report-packs.png') });
});

test('settings screenshots', async ({ page }) => {
  await page.goto('/settings/school');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('administration', 'school-settings.png') });

  await page.goto('/settings/terms');
  await page.waitForLoadState('networkidle');
  await pause(page, 600);
  await page.screenshot({ path: screenshotPath('administration', 'terms-settings.png') });
});
