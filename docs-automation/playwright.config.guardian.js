// @ts-check
/**
 * Playwright configuration for the EMS Guardian PWA (http://localhost:3001).
 *
 * Uses a mobile viewport (iPhone 14 Pro) because the Guardian PWA is a
 * mobile-first progressive web app. Run this config separately from the
 * admin-web config:
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
    // iPhone 14 Pro viewport — matches real-world usage of the PWA
    viewport: { width: 393, height: 852 },
    deviceScaleFactor: 3,
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
        launchOptions: { slowMo: 300, headless: false },
      },
    },
    // Screenshot specs
    {
      name: 'guardian-screenshots',
      testMatch: 'guardian-screenshots/**/*.spec.js',
      dependencies: ['guardian-setup'],
      use: {
        ...devices['iPhone 14 Pro'],
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
        ...devices['iPhone 14 Pro'],
        baseURL: GUARDIAN_URL,
        storageState: 'guardian-auth-state.json',
        launchOptions: { slowMo: 700, headless: false },
      },
    },
  ],
});
