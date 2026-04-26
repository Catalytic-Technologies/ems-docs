/**
 * Video recording: Invoicing workflow
 *
 * Records the full flow of generating invoices for a term.
 * Output: docs-automation/recordings/invoicing/
 */

import { test } from '@playwright/test';
import { videoDir, injectCursorRing, pause } from '../helpers.js';
import path from 'path';

test('record invoicing workflow', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'auth-state.json',
    recordVideo: {
      dir: path.join(videoDir('invoicing')),
      size: { width: 1280, height: 720 },
    },
    viewport: { width: 1280, height: 720 },
  });

  const page = await context.newPage();
  await injectCursorRing(page);

  // Navigate to Finance → Invoices
  await page.goto('/finance/invoices');
  await page.waitForLoadState('networkidle');
  await pause(page, 2000);

  // Click Generate Invoices
  const genBtn = page.getByRole('button', { name: /generate invoices/i });
  if (await genBtn.isVisible({ timeout: 4000 })) {
    await genBtn.click();
    await page.waitForLoadState('networkidle');
    await pause(page, 2000);

    // Select term if a dropdown appears
    const termSelect = page.getByLabel(/term/i).first();
    if (await termSelect.isVisible({ timeout: 2000 })) {
      await termSelect.selectOption({ index: 1 });
      await pause(page, 1000);
    }

    // Click Preview
    const previewBtn = page.getByRole('button', { name: /preview/i });
    if (await previewBtn.isVisible({ timeout: 2000 })) {
      await previewBtn.click();
      await page.waitForLoadState('networkidle');
      await pause(page, 2000);
    }

    // Confirm Generate
    const confirmBtn = page.getByRole('button', { name: /^generate$/i });
    if (await confirmBtn.isVisible({ timeout: 2000 })) {
      await confirmBtn.click();
      await page.waitForLoadState('networkidle');
      await pause(page, 3000);
    }
  }

  // View the invoice list result
  await pause(page, 2000);

  await context.close();
  console.log('✅ Invoicing video recording saved');
});
