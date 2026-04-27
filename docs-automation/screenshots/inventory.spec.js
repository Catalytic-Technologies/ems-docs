/**
 * Screenshots: Inventory module
 * Routes: /inventory, /inventory/items, /inventory/low-stock,
 *         /inventory/transactions, /inventory/suppliers, /inventory/categories
 */
import { test } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';

test('inventory dashboard', async ({ page }) => {
  await page.goto('/inventory');
  await page.waitForLoadState('networkidle');
  await pause(page, 1200);
  await page.screenshot({ path: screenshotPath('inventory', 'dashboard.png') });

  // Highlight summary cards
  const cards = page.locator('.card, [class*="card"]').first();
  if (await cards.isVisible()) {
    await highlight(page, '.card', { colour: '#2563eb', label: 'Stock summary' });
    await page.screenshot({ path: screenshotPath('inventory', 'dashboard-cards.png') });
    await clearHighlights(page);
  }
});

test('inventory items list', async ({ page }) => {
  await page.goto('/inventory/items');
  await page.waitForLoadState('networkidle');
  await pause(page, 1000);
  await page.screenshot({ path: screenshotPath('inventory', 'items-list.png') });

  // Highlight Add Item button
  const addBtn = page.getByRole('button', { name: /add item|new item/i }).first();
  if (await addBtn.isVisible()) {
    await highlight(page, addBtn, { colour: '#2563eb', label: 'Add new item' });
    await page.screenshot({ path: screenshotPath('inventory', 'items-add-button.png') });
    await clearHighlights(page);
  }

  // Open first item detail
  const firstRow = page.locator('table tbody tr, [class*="item-row"]').first();
  if (await firstRow.isVisible()) {
    await highlight(page, 'table tbody tr:first-child', { colour: '#2563eb', label: 'Item row' });
    await page.screenshot({ path: screenshotPath('inventory', 'items-row-highlight.png') });
    await clearHighlights(page);
    const link = firstRow.locator('a').first();
    if (await link.isVisible()) {
      await link.click();
      await page.waitForLoadState('networkidle');
      await pause(page, 800);
      await page.screenshot({ path: screenshotPath('inventory', 'item-detail.png') });
    }
  }
});

test('low stock alerts', async ({ page }) => {
  await page.goto('/inventory/low-stock');
  await page.waitForLoadState('networkidle');
  await pause(page, 1000);
  await page.screenshot({ path: screenshotPath('inventory', 'low-stock.png') });

  // Highlight a low-stock warning row
  const warn = page.locator('[class*="warning"], [class*="danger"], .text-danger').first();
  if (await warn.isVisible()) {
    await highlight(page, '[class*="warning"]:first-of-type, .text-danger:first-of-type', { colour: '#dc2626', label: 'Low stock alert' });
    await page.screenshot({ path: screenshotPath('inventory', 'low-stock-alert.png') });
    await clearHighlights(page);
  }
});

test('stock transactions', async ({ page }) => {
  await page.goto('/inventory/transactions');
  await page.waitForLoadState('networkidle');
  await pause(page, 1000);
  await page.screenshot({ path: screenshotPath('inventory', 'transactions.png') });

  // Highlight stock-in vs stock-out badges
  const badge = page.locator('[class*="badge"], .badge').first();
  if (await badge.isVisible()) {
    await highlight(page, '.badge', { colour: '#2563eb', label: 'Transaction type' });
    await page.screenshot({ path: screenshotPath('inventory', 'transactions-badges.png') });
    await clearHighlights(page);
  }
});

test('suppliers list', async ({ page }) => {
  await page.goto('/inventory/suppliers');
  await page.waitForLoadState('networkidle');
  await pause(page, 1000);
  await page.screenshot({ path: screenshotPath('inventory', 'suppliers.png') });
});

test('inventory categories', async ({ page }) => {
  await page.goto('/inventory/categories');
  await page.waitForLoadState('networkidle');
  await pause(page, 1000);
  await page.screenshot({ path: screenshotPath('inventory', 'categories.png') });
});

test('stock in form', async ({ page }) => {
  await page.goto('/inventory/stock-in');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('inventory', 'stock-in-form.png') });
});

test('stock out form', async ({ page }) => {
  await page.goto('/inventory/stock-out');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('inventory', 'stock-out-form.png') });
});
