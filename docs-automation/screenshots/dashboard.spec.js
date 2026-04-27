/**
 * Screenshots: Dashboard (Getting Started section)
 *
 * Captures the login page and the school-admin dashboard.
 * The login screenshot needs a fresh (unauthenticated) context.
 */

import { test, expect } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';
import dotenv from 'dotenv';
dotenv.config();

// ── Login page — fresh browser, no stored auth ─────────────────────
test('login page screenshot', async ({ browser }) => {
  const context = await browser.newContext({ storageState: undefined });
  const page = await context.newPage();

  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  await pause(page, 500);

  // Full clean login page
  await page.screenshot({ path: screenshotPath('getting-started', 'login.png') });

  // Highlight email field
  await highlight(page, 'input[type="email"], input[name="email"]', {
    colour: '#2563eb',
    label: '① Enter your email',
  });
  await page.screenshot({ path: screenshotPath('getting-started', 'login-email.png') });
  await clearHighlights(page);

  // Log in and capture dashboard
  const email = process.env.EMS_DEMO_EMAIL || 'admin@demo-school.ems';
  const password = process.env.EMS_DEMO_PASSWORD || 'DemoPass123!';
  await page.locator('input[name="email"]').fill(email);
  await page.locator('input[name="password"]').fill(password);
  await page.locator('button[type="submit"]').click();
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 20_000 });
  await pause(page, 1500);

  await page.screenshot({ path: screenshotPath('getting-started', 'dashboard.png') });
  await context.close();
});

// ── Dashboard — authenticated ──────────────────────────────────────
test('dashboard overview screenshots', async ({ page }) => {
  await page.goto('/dashboard');
  await page.waitForLoadState('networkidle');
  await pause(page, 1000);

  await page.screenshot({ path: screenshotPath('getting-started', 'dashboard-overview.png') });

  // Highlight sidebar navigation
  await highlight(page, '.sidebar, nav[aria-label="sidebar"], .c-sidebar', {
    colour: '#2563eb',
    label: 'Navigation sidebar',
  });
  await page.screenshot({ path: screenshotPath('getting-started', 'dashboard-sidebar.png') });
  await clearHighlights(page);
});
