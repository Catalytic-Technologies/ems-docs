/**
 * auth.setup.js
 *
 * Logs in with the demo admin account and saves the browser storage state
 * so all screenshot and video specs can reuse the authenticated session
 * without repeating the login flow.
 *
 * Login form selectors (from ems-admin-web/src/features/auth/Login.jsx):
 *   - Email   → <CFormInput name="email"    placeholder="Email"    type="email">
 *   - Password→ <CFormInput name="password" placeholder="Password" type="password">
 *   - Button  → <CButton type="submit">Login</CButton>
 *   - Post-login redirect → /dashboard
 */

import { test as setup, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const EMAIL    = process.env.EMS_DEMO_EMAIL    || 'admin@demo-school.ems';
const PASSWORD = process.env.EMS_DEMO_PASSWORD || 'DemoPass123!';
const AUTH_FILE = 'auth-state.json';

setup('authenticate as demo admin', async ({ page }) => {
  await page.goto('/login');
  await page.waitForLoadState('networkidle');

  // Target inputs by their `name` attribute — most reliable with CoreUI forms
  await page.locator('input[name="email"]').fill(EMAIL);
  await page.locator('input[name="password"]').fill(PASSWORD);
  await page.locator('button[type="submit"]').click();

  // Admin web navigates to /dashboard after successful login
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 20_000 });

  await page.context().storageState({ path: AUTH_FILE });
  console.log(`✅ Auth state saved to ${AUTH_FILE}`);
});
