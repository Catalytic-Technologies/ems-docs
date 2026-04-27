/**
 * Screenshots: Login & Dashboard (Getting Started section)
 *
 * The login screenshot is taken WITHOUT auth state (fresh browser).
 * Login form selectors (Login.jsx uses name attributes, no <label>):
 *   input[name="email"]    placeholder="Email"
 *   input[name="password"] placeholder="Password"
 *   button[type="submit"]  text="Login"
 * Post-login redirect: /dashboard
 */

import { test, expect } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';
import dotenv from 'dotenv';
dotenv.config();

const EMAIL    = process.env.EMS_DEMO_EMAIL    || 'admin@demo-school.ems';
const PASSWORD = process.env.EMS_DEMO_PASSWORD || 'DemoPass123!';
const BASE_URL = process.env.EMS_BASE_URL      || 'http://localhost:3000';

test('login page screenshot', async ({ browser }) => {
  // Fresh unauthenticated context so the login page is visible
  const context = await browser.newContext({
    storageState: undefined,
    baseURL: BASE_URL,
    viewport: { width: 1280, height: 720 },
  });
  const page = await context.newPage();

  await page.goto(`${BASE_URL}/login`);
  await page.waitForLoadState('networkidle');
  await pause(page, 600);

  // Full clean login page
  await page.screenshot({ path: screenshotPath('getting-started', 'login.png') });

  // Highlight email field
  await highlight(page, 'input[name="email"]', {
    colour: '#2563eb',
    label: '① Enter your email',
  });
  await page.screenshot({ path: screenshotPath('getting-started', 'login-email.png') });
  await clearHighlights(page);

  // Highlight password field
  await highlight(page, 'input[name="password"]', {
    colour: '#2563eb',
    label: '② Enter your password',
  });
  await page.screenshot({ path: screenshotPath('getting-started', 'login-password.png') });
  await clearHighlights(page);

  // Highlight Login button
  await highlight(page, 'button[type="submit"]', {
    colour: '#2563eb',
    label: '③ Click Login',
  });
  await page.screenshot({ path: screenshotPath('getting-started', 'login-button.png') });
  await clearHighlights(page);

  // Fill credentials and log in
  await page.locator('input[name="email"]').fill(EMAIL);
  await page.locator('input[name="password"]').fill(PASSWORD);
  await page.locator('button[type="submit"]').click();

  await expect(page).toHaveURL(/\/dashboard/, { timeout: 20_000 });
  await pause(page, 1500);

  // Full dashboard screenshot
  await page.screenshot({ path: screenshotPath('getting-started', 'dashboard.png') });

  // Highlight the sidebar
  await highlight(page, '.sidebar, nav.c-sidebar, aside', {
    colour: '#2563eb',
    label: 'Navigation sidebar',
  });
  await page.screenshot({ path: screenshotPath('getting-started', 'dashboard-sidebar.png') });
  await clearHighlights(page);

  await context.close();
});
