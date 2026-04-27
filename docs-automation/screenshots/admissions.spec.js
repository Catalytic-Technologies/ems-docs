/**
 * Screenshots: Admissions module
 * Routes: /admissions, /admissions/cycles, /admissions/:id
 */
import { test } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';

test('admissions pipeline', async ({ page }) => {
  await page.goto('/admissions');
  await page.waitForLoadState('networkidle');
  await pause(page, 1500);
  await page.screenshot({ path: screenshotPath('admissions', 'pipeline.png') });

  // Highlight the kanban/pipeline columns (submitted → under review → shortlisted etc.)
  const col = page.locator('[class*="column"], [class*="stage"], [class*="pipeline"]').first();
  if (await col.isVisible()) {
    await highlight(page, '[class*="column"]:first-of-type, [class*="stage"]:first-of-type', { colour: '#2563eb', label: 'Pipeline stage' });
    await page.screenshot({ path: screenshotPath('admissions', 'pipeline-stage.png') });
    await clearHighlights(page);
  }

  // Highlight an application card
  const appCard = page.locator('[class*="card"], table tbody tr').first();
  if (await appCard.isVisible()) {
    await highlight(page, '[class*="card"]:first-of-type, table tbody tr:first-child', { colour: '#2563eb', label: 'Application card' });
    await page.screenshot({ path: screenshotPath('admissions', 'application-card.png') });
    await clearHighlights(page);
  }

  // Status filter — highlight status badges
  const submitted = page.locator('text=submitted, text=Submitted').first();
  if (await submitted.isVisible()) {
    await highlight(page, ':text("submitted"), :text("Submitted")', { colour: '#3b82f6', label: 'Submitted' });
    await page.screenshot({ path: screenshotPath('admissions', 'status-submitted.png') });
    await clearHighlights(page);
  }

  const accepted = page.locator('text=accepted, text=Accepted').first();
  if (await accepted.isVisible()) {
    await highlight(page, ':text("accepted"), :text("Accepted")', { colour: '#16a34a', label: 'Accepted' });
    await page.screenshot({ path: screenshotPath('admissions', 'status-accepted.png') });
    await clearHighlights(page);
  }

  // Open first application
  const firstApp = page.locator('table tbody tr a, [class*="card"] a, [class*="app-row"]').first();
  if (await firstApp.isVisible()) {
    await firstApp.click();
    await page.waitForLoadState('networkidle');
    await pause(page, 1000);
    await page.screenshot({ path: screenshotPath('admissions', 'application-detail.png') });

    // Highlight applicant info section
    await highlight(page, '[class*="card"]:first-of-type', { colour: '#2563eb', label: 'Applicant information' });
    await page.screenshot({ path: screenshotPath('admissions', 'application-info.png') });
    await clearHighlights(page);

    // Highlight review history / audit trail
    const history = page.locator('text=Review History, text=History, text=Timeline').first();
    if (await history.isVisible()) {
      await highlight(page, ':text("History"), :text("Timeline")', { colour: '#2563eb', label: 'Review history' });
      await page.screenshot({ path: screenshotPath('admissions', 'application-history.png') });
      await clearHighlights(page);
    }
  }
});

test('admission cycles', async ({ page }) => {
  await page.goto('/admissions/cycles');
  await page.waitForLoadState('networkidle');
  await pause(page, 1000);
  await page.screenshot({ path: screenshotPath('admissions', 'cycles-list.png') });

  // Highlight the open cycle
  const openBadge = page.locator('text=open, text=Open').first();
  if (await openBadge.isVisible()) {
    await highlight(page, ':text("open"), :text("Open")', { colour: '#16a34a', label: 'Open cycle' });
    await page.screenshot({ path: screenshotPath('admissions', 'cycle-open.png') });
    await clearHighlights(page);
  }

  // Highlight New Cycle button
  const newBtn = page.getByRole('button', { name: /new cycle|create cycle/i }).first();
  if (await newBtn.isVisible()) {
    await highlight(page, newBtn, { colour: '#2563eb', label: 'Create new cycle' });
    await page.screenshot({ path: screenshotPath('admissions', 'cycles-new-button.png') });
    await clearHighlights(page);
  }
});
