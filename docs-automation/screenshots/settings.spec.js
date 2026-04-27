/**
 * Screenshots: Settings module
 * Routes: /settings/school, /settings/terms, /settings/subjects,
 *         /settings/grading-templates, /settings/report-templates
 * Plus: /users (staff management)
 */
import { test } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';

test('school settings', async ({ page }) => {
  await page.goto('/settings/school');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('settings', 'school-settings.png') });

  // Highlight school name field
  const nameField = page.locator('input[name="name"], input[placeholder*="school"]').first();
  if (await nameField.isVisible()) {
    await highlight(page, 'input[name="name"]', { colour: '#2563eb', label: 'School name' });
    await page.screenshot({ path: screenshotPath('settings', 'school-name-field.png') });
    await clearHighlights(page);
  }
});

test('terms management', async ({ page }) => {
  await page.goto('/settings/terms');
  await page.waitForLoadState('networkidle');
  await pause(page, 1000);
  await page.screenshot({ path: screenshotPath('settings', 'terms.png') });

  // Highlight the current/active term badge
  const activeTerm = page.locator('text=Current, text=Active, [class*="success"]').first();
  if (await activeTerm.isVisible()) {
    await highlight(page, ':text("Current"), :text("Active")', { colour: '#16a34a', label: 'Current term' });
    await page.screenshot({ path: screenshotPath('settings', 'terms-current.png') });
    await clearHighlights(page);
  }

  // Highlight Add Term button
  const addBtn = page.getByRole('button', { name: /add term|new term/i }).first();
  if (await addBtn.isVisible()) {
    await highlight(page, addBtn, { colour: '#2563eb', label: 'Add new term' });
    await page.screenshot({ path: screenshotPath('settings', 'terms-add.png') });
    await clearHighlights(page);
  }
});

test('subjects management', async ({ page }) => {
  await page.goto('/settings/subjects');
  await page.waitForLoadState('networkidle');
  await pause(page, 1000);
  await page.screenshot({ path: screenshotPath('settings', 'subjects.png') });

  // Highlight subject codes column
  const codeCol = page.locator('text=MTH, text=ENG').first();
  if (await codeCol.isVisible()) {
    await highlight(page, ':text("MTH")', { colour: '#2563eb', label: 'Subject code' });
    await page.screenshot({ path: screenshotPath('settings', 'subjects-code.png') });
    await clearHighlights(page);
  }
});

test('staff/users list', async ({ page }) => {
  await page.goto('/users');
  await page.waitForLoadState('networkidle');
  await pause(page, 1000);
  await page.screenshot({ path: screenshotPath('settings', 'staff-list.png') });

  // Highlight role badges
  const role = page.locator('[class*="badge"]').first();
  if (await role.isVisible()) {
    await highlight(page, '[class*="badge"]:first-of-type', { colour: '#2563eb', label: 'User role badge' });
    await page.screenshot({ path: screenshotPath('settings', 'staff-role-badge.png') });
    await clearHighlights(page);
  }

  // Highlight Invite/Add User button
  const addBtn = page.getByRole('button', { name: /add user|invite|new user/i }).first();
  if (await addBtn.isVisible()) {
    await highlight(page, 'button:has-text("Add"), button:has-text("Invite")', { colour: '#2563eb', label: 'Add staff user' });
    await page.screenshot({ path: screenshotPath('settings', 'staff-add-button.png') });
    await clearHighlights(page);
  }
});

test('grading templates', async ({ page }) => {
  await page.goto('/settings/grading-templates');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('settings', 'grading-templates.png') });
});

test('report templates', async ({ page }) => {
  await page.goto('/settings/report-templates');
  await page.waitForLoadState('networkidle');
  await pause(page, 800);
  await page.screenshot({ path: screenshotPath('settings', 'report-templates.png') });
});
