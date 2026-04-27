/**
 * Guardian video: Full EMS Guardian PWA walkthrough
 *
 * Records a narrated tour of the parent-facing mobile app covering:
 *   1. Login screen
 *   2. Home dashboard overview
 *   3. Attendance history
 *   4. Fees & invoice detail
 *   5. Academic progress
 *   6. Messages
 *   7. Documents library
 *   8. Profile / logout
 *
 * The recording is saved to docs-automation/recordings/guardian/.
 * Merge with Azure TTS audio using the ffmpeg command in RUN.md.
 */
import { test, expect } from '@playwright/test';
import { videoDir, injectCursorRing, pause } from '../helpers.js';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
dotenv.config();

const GUARDIAN_URL = process.env.EMS_GUARDIAN_BASE_URL || 'http://localhost:3001';
const EMAIL        = process.env.EMS_GUARDIAN_EMAIL    || 'parent@demo-school.ems';
const PASSWORD     = process.env.EMS_GUARDIAN_PASSWORD || 'DemoPass123!';

test('guardian app full tour', async ({ browser }) => {
  const outDir = videoDir('guardian');
  fs.mkdirSync(outDir, { recursive: true });

  const context = await browser.newContext({
    storageState: undefined,
    baseURL: GUARDIAN_URL,
    viewport: { width: 393, height: 852 },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 3,
    recordVideo: {
      dir: outDir,
      size: { width: 393, height: 852 },
    },
  });

  const page = await context.newPage();
  await injectCursorRing(page);

  // ── 1. Login screen ─────────────────────────────────────────────────────────
  await page.goto(`${GUARDIAN_URL}/login`);
  await page.waitForLoadState('networkidle');
  await pause(page, 1500); // pause while narrator introduces the app

  await page.getByPlaceholder('Email or phone number').click();
  await pause(page, 500);
  await page.getByPlaceholder('Email or phone number').fill(EMAIL);
  await pause(page, 500);
  await page.getByPlaceholder('Password').click();
  await pause(page, 400);
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await pause(page, 800);
  await page.getByRole('button', { name: /sign in/i }).click();

  // ── 2. Home / Dashboard ──────────────────────────────────────────────────────
  await expect(page).toHaveURL(`${GUARDIAN_URL}/`, { timeout: 15_000 });
  await page.waitForLoadState('networkidle');
  await pause(page, 2000); // narrator: "This is your home screen…"

  // Scroll through the dashboard cards slowly
  await page.evaluate(() => window.scrollBy({ top: 250, behavior: 'smooth' }));
  await pause(page, 1500);
  await page.evaluate(() => window.scrollBy({ top: 250, behavior: 'smooth' }));
  await pause(page, 1500);
  await page.evaluate(() => window.scrollBy({ top: 300, behavior: 'smooth' }));
  await pause(page, 1500);
  // Scroll back to top
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await pause(page, 1000);

  // ── 3. Attendance ────────────────────────────────────────────────────────────
  await page.goto(`${GUARDIAN_URL}/attendance`);
  await page.waitForLoadState('networkidle');
  await pause(page, 2000); // narrator: "The Attendance screen shows…"

  await page.evaluate(() => window.scrollBy({ top: 300, behavior: 'smooth' }));
  await pause(page, 1500);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'smooth' }));
  await pause(page, 800);

  // ── 4. Fees ──────────────────────────────────────────────────────────────────
  await page.goto(`${GUARDIAN_URL}/fees`);
  await page.waitForLoadState('networkidle');
  await pause(page, 2000); // narrator: "The Fees screen gives you a clear view…"

  // Open first invoice if available
  const firstInvoice = page.locator('a[href*="/fees/"]').first();
  if (await firstInvoice.isVisible()) {
    await firstInvoice.click();
    await page.waitForLoadState('networkidle');
    await pause(page, 2000); // narrator: "Tapping an invoice shows the full breakdown…"
    await page.goBack();
    await pause(page, 800);
  }

  // ── 5. Academic Progress ─────────────────────────────────────────────────────
  await page.goto(`${GUARDIAN_URL}/progress`);
  await page.waitForLoadState('networkidle');
  await pause(page, 2000); // narrator: "The Progress screen shows performance data…"

  await page.evaluate(() => window.scrollBy({ top: 300, behavior: 'smooth' }));
  await pause(page, 1500);

  const subjectLink = page.locator('a[href*="/progress/subject/"]').first();
  if (await subjectLink.isVisible()) {
    await subjectLink.click();
    await page.waitForLoadState('networkidle');
    await pause(page, 1500); // narrator: "Drill into any subject to see individual assessment scores…"
    await page.goBack();
    await pause(page, 800);
  }

  // ── 6. Messages ──────────────────────────────────────────────────────────────
  await page.goto(`${GUARDIAN_URL}/messages`);
  await page.waitForLoadState('networkidle');
  await pause(page, 2000); // narrator: "The Messages screen shows all school communications…"

  const firstMsg = page.locator('a[href*="/messages/"]').first();
  if (await firstMsg.isVisible()) {
    await firstMsg.click();
    await page.waitForLoadState('networkidle');
    await pause(page, 2000); // narrator: "Open any message to read the full content…"
    await page.goBack();
    await pause(page, 800);
  }

  // ── 7. Documents ─────────────────────────────────────────────────────────────
  await page.goto(`${GUARDIAN_URL}/documents`);
  await page.waitForLoadState('networkidle');
  await pause(page, 2000); // narrator: "Documents published by the school appear here…"

  await page.evaluate(() => window.scrollBy({ top: 300, behavior: 'smooth' }));
  await pause(page, 1000);

  // ── 8. Profile ───────────────────────────────────────────────────────────────
  await page.goto(`${GUARDIAN_URL}/profile`);
  await page.waitForLoadState('networkidle');
  await pause(page, 2000); // narrator: "From your Profile you can review your account details…"

  await page.evaluate(() => window.scrollBy({ top: 300, behavior: 'smooth' }));
  await pause(page, 1500);

  // Pause before closing so the last frame is visible
  await pause(page, 1000);

  await context.close(); // this flushes the video file to disk
  console.log(`✅ Guardian tour video saved to: ${outDir}`);
});
