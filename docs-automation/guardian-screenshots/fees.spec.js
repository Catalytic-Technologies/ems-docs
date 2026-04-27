/**
 * Guardian screenshots: Fees & Invoices
 *
 * Captures the fees overview, the invoice list, and a single invoice detail.
 */
import { test } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';

test('guardian fees overview', async ({ page }) => {
  await page.goto('/fees');
  await page.waitForLoadState('networkidle');
  await pause(page, 1200);

  // Fees overview — summary chart + balance
  await page.screenshot({ path: screenshotPath('guardian', 'fees-overview.png'), fullPage: false });

  // Highlight total balance row
  const balance = page.locator('text=Balance').first();
  if (await balance.isVisible()) {
    await highlight(page, ':text("Balance")', { colour: '#dc2626', label: 'Outstanding balance' });
    await page.screenshot({ path: screenshotPath('guardian', 'fees-balance.png'), fullPage: false });
    await clearHighlights(page);
  }

  // Scroll to invoice list
  await page.evaluate(() => window.scrollBy(0, 300));
  await pause(page, 500);
  await page.screenshot({ path: screenshotPath('guardian', 'fees-invoice-list.png'), fullPage: false });

  // Tap the first invoice to open detail view
  const firstInvoice = page.locator('a[href*="/fees/"], button').filter({ hasText: /invoice|term/i }).first();
  if (await firstInvoice.isVisible()) {
    await firstInvoice.click();
    await page.waitForLoadState('networkidle');
    await pause(page, 800);
    await page.screenshot({ path: screenshotPath('guardian', 'fees-invoice-detail.png'), fullPage: false });

    // Highlight the line items table
    const table = page.locator('table, [role="table"]').first();
    if (await table.isVisible()) {
      await highlight(page, 'table, [role="table"]', { colour: '#2563eb', label: 'Invoice line items' });
      await page.screenshot({ path: screenshotPath('guardian', 'fees-invoice-items.png'), fullPage: false });
      await clearHighlights(page);
    }
  }
});
