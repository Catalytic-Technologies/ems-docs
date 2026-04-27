/**
 * Screenshots: Calendar & Documents modules
 * Routes: /calendar, /documents
 */
import { test } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';

test('school calendar', async ({ page }) => {
  await page.goto('/calendar');
  await page.waitForLoadState('networkidle');
  await pause(page, 1500);
  await page.screenshot({ path: screenshotPath('communication', 'calendar.png') });

  // Highlight event dots/chips on the calendar
  const event = page.locator('[class*="event"], [class*="fc-event"], .rbc-event').first();
  if (await event.isVisible()) {
    await highlight(page, '[class*="event"]:first-of-type', { colour: '#2563eb', label: 'Calendar event' });
    await page.screenshot({ path: screenshotPath('communication', 'calendar-event.png') });
    await clearHighlights(page);

    // Click to open event detail
    await event.click();
    await pause(page, 600);
    await page.screenshot({ path: screenshotPath('communication', 'calendar-event-detail.png') });
    // Close if modal opened
    const closeBtn = page.locator('button[aria-label="Close"], button:has-text("Close"), button:has-text("×")').first();
    if (await closeBtn.isVisible()) await closeBtn.click();
  }

  // Highlight the Add Event button
  const addBtn = page.getByRole('button', { name: /add event|new event/i }).first();
  if (await addBtn.isVisible()) {
    await highlight(page, addBtn, { colour: '#2563eb', label: 'Add event' });
    await page.screenshot({ path: screenshotPath('communication', 'calendar-add-event.png') });
    await clearHighlights(page);
  }
});

test('documents library', async ({ page }) => {
  await page.goto('/documents');
  await page.waitForLoadState('networkidle');
  await pause(page, 1000);
  await page.screenshot({ path: screenshotPath('communication', 'documents.png') });

  // Highlight document cards/rows
  const docRow = page.locator('table tbody tr, [class*="document-item"]').first();
  if (await docRow.isVisible()) {
    await highlight(page, 'table tbody tr:first-child', { colour: '#2563eb', label: 'Document row' });
    await page.screenshot({ path: screenshotPath('communication', 'documents-row.png') });
    await clearHighlights(page);
  }

  // Highlight Upload Document button
  const uploadBtn = page.getByRole('button', { name: /upload/i }).first();
  if (await uploadBtn.isVisible()) {
    await highlight(page, uploadBtn, { colour: '#2563eb', label: 'Upload document' });
    await page.screenshot({ path: screenshotPath('communication', 'documents-upload.png') });
    await clearHighlights(page);
  }
});
