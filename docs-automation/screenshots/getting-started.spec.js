/**
 * Screenshots: Login & Dashboard (Getting Started section)
 *
 * The login screenshot is taken WITHOUT auth state (fresh browser).
 */

import { test, expect } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';
import dotenv from 'dotenv';
dotenv.config();

// Override storageState for the login screenshot — we need to be logged out
test.use({ storageState: undefined });

test('login page screenshot', async ({ browser }) => {
  const context = await browser.newContext({ storageState: undefined });
  const page = await context.newPage();

  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  await pause(page, 500);

  // Highlight email field
  await highlight(page, 'input[type="email"], input[name="email"]', {
    colour: '#1a73e8',
    label: 'Enter your email',
  });
  await page.screenshot({ path: screenshotPath('getting-started', 'login.png') });
  await clearHighlights(page);

  // Log in to capture dashboard
  await page.getByLabel(/email/i).fill(process.env.EMS_DEMO_EMAIL || 'admin@demo-school.ems');
  await page.getByLabel(/password/i).fill(process.env.EMS_DEMO_PASSWORD || 'DemoPass123!');
  await page.getByRole('button', { name: /sign in|log in/i }).click();
  await expect(page).toHaveURL(/dashboard/, { timeout: 15_000 });
  await pause(page, 1000);
  await page.screenshot({ path: screenshotPath('getting-started', 'dashboard.png') });

  await context.close();
});
