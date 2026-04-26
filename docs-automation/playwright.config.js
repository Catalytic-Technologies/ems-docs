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
    // slowMo paces interactions so they are human-readable in recordings
    launchOptions: {
      slowMo: 600,
      headless: false,    // headed so video capture is crisp
      args: ['--start-maximized'],
    },
    screenshot: 'only-on-failure',
    // Storage state is saved by auth.setup.js and reused by all specs
    storageState: 'auth-state.json',
  },

  projects: [
    // Auth setup — runs first, saves login session
    {
      name: 'setup',
      testMatch: 'auth.setup.js',
      use: { storageState: undefined },
    },
    // Screenshot specs
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
    // Video recording specs
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
