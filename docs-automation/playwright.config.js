// @ts-check
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '.env') });

const BASE_URL = process.env.EMS_BASE_URL || 'http://localhost:5173';

/** @type {import('@playwright/test').PlaywrightTestConfig} */
export default defineConfig({
  testDir: '.',
  testMatch: ['screenshots/**/*.spec.js', 'videos/**/*.spec.js'],
  outputDir: 'test-results',
  fullyParallel: false,   // run sequentially — we need a stable demo server state
  retries: 1,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  timeout: 120_000,       // 2 min per test — videos can be long

  use: {
    baseURL: BASE_URL,
    viewport: { width: 1280, height: 720 },
    screenshot: 'only-on-failure',
    // storageState is NOT set here — each project declares it explicitly so the
    // setup project can run without the file needing to exist yet.
  },

  projects: [
    // Auth setup — runs first, logs in and writes auth-state.json
    {
      name: 'setup',
      testMatch: 'auth.setup.js',
      use: {
        launchOptions: { slowMo: 300, headless: false },
      },
    },
    // Screenshot specs — reuse the saved session
    {
      name: 'screenshots',
      testMatch: 'screenshots/**/*.spec.js',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth-state.json',
        launchOptions: { slowMo: 400, headless: false },
      },
    },
    // Video recording specs — reuse the saved session
    {
      name: 'videos',
      testMatch: 'videos/**/*.spec.js',
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'auth-state.json',
        launchOptions: { slowMo: 700, headless: false },
        // recordVideo is set per-context inside each spec so we control the output path
      },
    },
  ],
});
