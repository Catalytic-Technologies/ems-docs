/**
 * auth.setup.js
 *
 * Logs in with the demo admin account and saves the browser storage state
 * so all screenshot and video specs can reuse the authenticated session
 * without repeating the login flow.
 *
 * Run as the 'setup' project in playwright.config.js.
 */

import { test as setup, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const EMAIL = process.env.EMS_DEMO_EMAIL || 'admin@demo-school.ems';
const PASSWORD = process.env.EMS_DEMO_PASSWORD || 'DemoPass123!';
const AUTH_FILE = 'auth-state.json';

setup('authenticate as demo admin', async ({ page }) => {
  await page.goto('/login');

  // Fill login form
  await page.getByLabel(/email/i).fill(EMAIL);
  await page.getByLabel(/password/i).fill(PASSWORD);
  await page.getByRole('button', { name: /sign in|log in/i }).click();

  // Wait until we reach the dashboard
  await expect(page).toHaveURL(/dashboard/, { timeout: 15_000 });

  // Save the authenticated session to disk
  await page.context().storageState({ path: AUTH_FILE });
  console.log(`✅ Auth state saved to ${AUTH_FILE}`);
});
