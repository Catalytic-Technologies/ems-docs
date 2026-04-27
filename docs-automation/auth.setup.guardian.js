/**
 * auth.setup.guardian.js
 *
 * Logs in to the EMS Guardian PWA with the demo parent account and saves
 * the browser storage state so all guardian screenshot and video specs
 * can reuse the authenticated session.
 *
 * Run as the 'guardian-setup' project in playwright.config.guardian.js.
 *
 * Prerequisites:
 *   - ems-guardian-pwa is running on http://localhost:3001
 *   - ems-server seeded with: node ems-server/scripts/seed-demo.js
 *     (creates parent@demo-school.ems / DemoPass123!)
 */

import { test as setup, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const EMAIL    = process.env.EMS_GUARDIAN_EMAIL    || 'parent@demo-school.ems';
const PASSWORD = process.env.EMS_GUARDIAN_PASSWORD || 'DemoPass123!';
const AUTH_FILE = 'guardian-auth-state.json';

setup('authenticate as demo parent', async ({ page }) => {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');

  // The login form uses placeholder text, not <label> elements
  await page.getByPlaceholder('Email or phone number').fill(EMAIL);
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByRole('button', { name: /sign in/i }).click();

  // After login the app navigates to the home/dashboard route (/)
  await expect(page).toHaveURL('/', { timeout: 15_000 });

  await page.context().storageState({ path: AUTH_FILE });
  console.log(`✅ Guardian auth state saved to ${AUTH_FILE}`);
});
