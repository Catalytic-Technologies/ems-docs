// @ts-check
/**
 * Playwright configuration for the EMS Guardian PWA (http://localhost:3001).
 *
 * Uses a Pixel 7 (Android / Chromium) responsive viewport — matches the
 * target device for the Guardian PWA and avoids the need for a separate
 * WebKit browser install.
 *
 *   npx playwright test --config=playwright.config.guardian.js
 */
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '.env') });

const GUARDIAN_URL = process.env.EMS_GUARDIAN_BASE_URL || 'http://localhost:3001';

/** @type {import('@playwright/test').PlaywrightTestConfig} */
export default defineConfig({
  testDir: '.',
  testMatch: [
    'guardian-screenshots/**/*.spec.js',
    'guardian-videos/**/*.spec.js',
  ],
  outputDir: 'guardian-test-results',
  fullyParallel: false,
  retries: 1,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'guardian-playwright-report', open: 'never' }],
  ],
  timeout: 120_000,

  use: {
    baseURL: GUARDIAN_URL,
    // Pixel 7 viewport — 412 × 915 dp, 2.625× pixel ratio, Chromium-based
    viewport: { width: 412, height: 915 },
    deviceScaleFactor: 2.625,
    isMobile: true,
    hasTouch: true,
    screenshot: 'only-on-failure',
    // storageState is NOT set globally — each project declares it explicitly
  },

  projects: [
    // Auth setup — logs in as a parent and writes guardian-auth-state.json
    {
      name: 'guardian-setup',
      testMatch: 'auth.setup.guardian.js',
      use: {
        // Use Chromium (no webkit install needed)
        ...devices['Pixel 7'],
        baseURL: GUARDIAN_URL,
        launchOptions: { slowMo: 300, headless: false },
      },
    },
    // Screenshot specs
    {
      name: 'guardian-screenshots',
      testMatch: 'guardian-screenshots/**/*.spec.js',
      dependencies: ['guardian-setup'],
      use: {
        ...devices['Pixel 7'],
        baseURL: GUARDIAN_URL,
        storageState: 'guardian-auth-state.json',
        launchOptions: { slowMo: 400, headless: false },
      },
    },
    // Video recording specs
    {
      name: 'guardian-videos',
      testMatch: 'guardian-videos/**/*.spec.js',
      dependencies: ['guardian-setup'],
      use: {
        ...devices['Pixel 7'],
        baseURL: GUARDIAN_URL,
        storageState: 'guardian-auth-state.json',
        launchOptions: { slowMo: 700, headless: false },
      },
    },
  ],
});
