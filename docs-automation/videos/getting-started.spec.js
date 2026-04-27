/**
 * Video recording: Getting Started — Login and Dashboard tour
 *
 * Demonstrates the login flow and a quick tour of the dashboard.
 * Output: docs-automation/recordings/getting-started/
 */

import { test } from '@playwright/test';
import { videoDir, injectCursorRing, pause } from '../helpers.js';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

test('record login and dashboard tour', async ({ browser }) => {
  // Start fresh — unauthenticated context for the login demo
  const context = await browser.newContext({
    recordVideo: {
      dir: path.join(videoDir('getting-started')),
      size: { width: 1280, height: 720 },
    },
    viewport: { width: 1280, height: 720 },
  });

  const page = await context.newPage();
  await injectCursorRing(page);

  // ── Login ──────────────────────────────────────────────────────────────────
  await page.goto('/login');
  await page.waitForLoadState('networkidle');
  await pause(page, 2000); // viewer sees login screen

  const email = process.env.EMS_DEMO_EMAIL || 'admin@demo-school.ems';
  const password = process.env.EMS_DEMO_PASSWORD || 'DemoPass123!';

  await page.locator('input[name="email"]').fill(email);
  await pause(page, 800);
  await page.locator('input[name="password"]').fill(password);
  await pause(page, 800);
  await page.locator('button[type="submit"]').click();
  await page.waitForURL(/\/dashboard/, { timeout: 20_000 });
  await pause(page, 2500); // viewer sees dashboard

  // ── Sidebar tour ───────────────────────────────────────────────────────────
  // Hover over key nav items to show the structure
  const navLinks = [
    '/students',
    '/attendance/mark',
    '/finance/invoices',
    '/inbox',
  ];

  for (const link of navLinks) {
    const navEl = page.locator(`a[href="${link}"]`).first();
    if (await navEl.isVisible({ timeout: 2000 })) {
      await navEl.hover();
      await pause(page, 800);
    }
  }

  // ── Navigate to students for a quick peek ─────────────────────────────────
  await page.goto('/students');
  await page.waitForLoadState('networkidle');
  await pause(page, 2000);

  await context.close();
  console.log('✅ Getting-started video recording saved');
});
