/**
 * Screenshots: Finance module — invoices and payments
 */

import { test } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';

test('finance - invoice list screenshot', async ({ page }) => {
  await page.goto('/finance/invoices');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('finance', 'invoice-list.png') });

  // Highlight Generate Invoices button
  const genBtn = page.getByRole('button', { name: /generate invoices/i });
  if (await genBtn.isVisible()) {
    await highlight(page, 'button', { colour: '#1a73e8', label: 'Generate Invoices' });
    await page.screenshot({ path: screenshotPath('finance', 'invoice-generate.png') });
    await clearHighlights(page);
  }
});

test('finance - payment form screenshot', async ({ page }) => {
  await page.goto('/finance/payments');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('finance', 'payments-list.png') });

  const newBtn = page.getByRole('button', { name: /new payment/i });
  if (await newBtn.isVisible()) {
    await newBtn.click();
    await page.waitForLoadState('networkidle');
    await pause(page, 600);
    await page.screenshot({ path: screenshotPath('finance', 'payment-form.png') });
  }
});

test('finance - fee setup screenshots', async ({ page }) => {
  await page.goto('/finance/fee-items');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('finance', 'fee-items.png') });

  await page.goto('/finance/fee-templates');
  await page.waitForLoadState('networkidle');
  await pause(page, 600);
  await page.screenshot({ path: screenshotPath('finance', 'fee-templates.png') });
});

test('finance - bva report screenshot', async ({ page }) => {
  await page.goto('/finance/budgets/bva');
  await page.waitForLoadState('networkidle');
  await pause(page, 1000);
  await page.screenshot({ path: screenshotPath('finance', 'bva-report.png') });
});

test('finance - defaulters and scholarships', async ({ page }) => {
  await page.goto('/finance/defaulters');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('finance', 'defaulters.png') });

  await page.goto('/finance/scholarships');
  await page.waitForLoadState('networkidle');
  await pause(page, 600);
  await page.screenshot({ path: screenshotPath('finance', 'scholarships.png') });

  await page.goto('/finance/payment-plans');
  await page.waitForLoadState('networkidle');
  await pause(page, 600);
  await page.screenshot({ path: screenshotPath('finance', 'payment-plans.png') });
});
