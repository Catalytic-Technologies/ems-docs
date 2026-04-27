/**
 * Screenshots: Requisitions module
 * Routes: /finance/requisitions, /finance/requisitions/:id
 */
import { test } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';

test('requisitions list', async ({ page }) => {
  await page.goto('/finance/requisitions');
  await page.waitForLoadState('networkidle');
  await pause(page, 1000);
  await page.screenshot({ path: screenshotPath('finance', 'requisitions-list.png') });

  // Highlight status badges (PENDING, APPROVED, DISBURSED, DRAFT)
  const pending = page.locator('text=PENDING, text=Pending').first();
  if (await pending.isVisible()) {
    await highlight(page, ':text("PENDING"), :text("Pending")', { colour: '#f59e0b', label: 'Pending approval' });
    await page.screenshot({ path: screenshotPath('finance', 'requisitions-pending.png') });
    await clearHighlights(page);
  }

  const approved = page.locator('text=APPROVED, text=Approved').first();
  if (await approved.isVisible()) {
    await highlight(page, ':text("APPROVED"), :text("Approved")', { colour: '#16a34a', label: 'Approved' });
    await page.screenshot({ path: screenshotPath('finance', 'requisitions-approved.png') });
    await clearHighlights(page);
  }

  // Open a requisition detail
  const firstLink = page.locator('table tbody tr a, [class*="row"] a').first();
  if (await firstLink.isVisible()) {
    await firstLink.click();
    await page.waitForLoadState('networkidle');
    await pause(page, 800);
    await page.screenshot({ path: screenshotPath('finance', 'requisition-detail.png') });

    // Highlight the approval workflow section
    const workflow = page.locator('text=Approval, text=Review, text=Status').first();
    if (await workflow.isVisible()) {
      await highlight(page, ':text("Approval"), :text("Review")', { colour: '#2563eb', label: 'Approval workflow' });
      await page.screenshot({ path: screenshotPath('finance', 'requisition-workflow.png') });
      await clearHighlights(page);
    }
  }
});

test('new requisition form', async ({ page }) => {
  await page.goto('/finance/requisitions/new');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('finance', 'requisition-new-form.png') });

  // Highlight the budget line selector
  const budgetSel = page.locator('select, [class*="select"]').first();
  if (await budgetSel.isVisible()) {
    await highlight(page, 'select', { colour: '#2563eb', label: 'Select budget line' });
    await page.screenshot({ path: screenshotPath('finance', 'requisition-budget-select.png') });
    await clearHighlights(page);
  }
});
