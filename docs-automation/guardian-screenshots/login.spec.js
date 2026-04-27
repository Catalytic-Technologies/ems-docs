/**
 * Guardian screenshots: Login screen
 *
 * Uses a fresh unauthenticated context so the login UI is visible.
 */
import { test, expect } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';
import dotenv from 'dotenv';
dotenv.config();

const GUARDIAN_URL = process.env.EMS_GUARDIAN_BASE_URL || 'http://localhost:3001';
const EMAIL        = process.env.EMS_GUARDIAN_EMAIL    || 'parent@demo-school.ems';
const PASSWORD     = process.env.EMS_GUARDIAN_PASSWORD || 'DemoPass123!';

test('guardian login screen', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: undefined,
    baseURL: GUARDIAN_URL,
    viewport: { width: 393, height: 852 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 3,
  });
  const page = await context.newPage();

  await page.goto(`${GUARDIAN_URL}/login`);
  await page.waitForLoadState('networkidle');
  await pause(page, 600);

  // Full login screen
  await page.screenshot({ path: screenshotPath('guardian', 'login.png'), fullPage: false });

  // Highlight email/phone field
  await highlight(page, 'input[placeholder="Email or phone number"]', {
    colour: '#2563eb',
    label: '① Email or phone number',
  });
  await page.screenshot({ path: screenshotPath('guardian', 'login-email-field.png'), fullPage: false });
  await clearHighlights(page);

  // Highlight password field
  await highlight(page, 'input[placeholder="Password"]', {
    colour: '#2563eb',
    label: '② Password',
  });
  await page.screenshot({ path: screenshotPath('guardian', 'login-password-field.png'), fullPage: false });
  await clearHighlights(page);

  // Highlight Sign In button
  await highlight(page, 'button[type="submit"]', {
    colour: '#2563eb',
    label: '③ Sign In',
  });
  await page.screenshot({ path: screenshotPath('guardian', 'login-submit.png'), fullPage: false });
  await clearHighlights(page);

  // Phone OTP tab — show the alternative login mode
  const otpTab = page.getByRole('button', { name: /phone code/i });
  if (await otpTab.isVisible()) {
    await otpTab.click();
    await pause(page, 400);
    await page.screenshot({ path: screenshotPath('guardian', 'login-otp-tab.png'), fullPage: false });
  }

  // Log in and take a post-login home screenshot
  await page.getByRole('button', { name: /password/i }).click();
  await pause(page, 300);
  await page.getByPlaceholder('Email or phone number').fill(EMAIL);
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page).toHaveURL(`${GUARDIAN_URL}/`, { timeout: 15_000 });
  await pause(page, 1500);
  await page.screenshot({ path: screenshotPath('guardian', 'home-after-login.png'), fullPage: false });

  await context.close();
});
