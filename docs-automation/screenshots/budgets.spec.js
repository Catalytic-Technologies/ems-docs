/**
 * Screenshots: Budgets & BVA (Budget vs Actual) module
 * Routes: /finance/budgets, /finance/budgets/bva, /finance/budgets/:id
 */
import { test } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';

test('budgets list', async ({ page }) => {
  await page.goto('/finance/budgets');
  await page.waitForLoadState('networkidle');
  await pause(page, 1000);
  await page.screenshot({ path: screenshotPath('finance', 'budgets-list.png') });

  // Highlight active budget badge
  const activeBadge = page.locator('text=active, text=Active').first();
  if (await activeBadge.isVisible()) {
    await highlight(page, ':text("active"), :text("Active")', { colour: '#16a34a', label: 'Active budget' });
    await page.screenshot({ path: screenshotPath('finance', 'budgets-active.png') });
    await clearHighlights(page);
  }

  // Open budget detail
  const detailLink = page.locator('table tbody tr a, [class*="row"] a').first();
  if (await detailLink.isVisible()) {
    await detailLink.click();
    await page.waitForLoadState('networkidle');
    await pause(page, 1000);
    await page.screenshot({ path: screenshotPath('finance', 'budget-detail.png') });

    // Expense lines table
    const expTable = page.locator('text=Expense').first();
    if (await expTable.isVisible()) {
      await highlight(page, ':text("Expense")', { colour: '#2563eb', label: 'Expense lines' });
      await page.screenshot({ path: screenshotPath('finance', 'budget-expense-lines.png') });
      await clearHighlights(page);
    }
  }
});

test('BVA report', async ({ page }) => {
  await page.goto('/finance/budgets/bva');
  await page.waitForLoadState('networkidle');
  await pause(page, 1500);
  await page.screenshot({ path: screenshotPath('finance', 'bva-report.png') });

  // Highlight over-budget items (red)
  const overBudget = page.locator('[class*="danger"], .text-danger').first();
  if (await overBudget.isVisible()) {
    await highlight(page, '.text-danger', { colour: '#dc2626', label: 'Over budget' });
    await page.screenshot({ path: screenshotPath('finance', 'bva-over-budget.png') });
    await clearHighlights(page);
  }

  // Highlight under-budget items (green)
  const underBudget = page.locator('[class*="success"], .text-success').first();
  if (await underBudget.isVisible()) {
    await highlight(page, '.text-success', { colour: '#16a34a', label: 'Under budget' });
    await page.screenshot({ path: screenshotPath('finance', 'bva-under-budget.png') });
    await clearHighlights(page);
  }

  // Scroll to see the full BVA table
  await page.evaluate(() => window.scrollBy(0, 400));
  await pause(page, 600);
  await page.screenshot({ path: screenshotPath('finance', 'bva-report-scrolled.png') });
});
