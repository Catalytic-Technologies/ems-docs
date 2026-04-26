/**
 * Video recording: Recording a fee payment
 */

import { test } from '@playwright/test';
import { videoDir, injectCursorRing, pause } from '../helpers.js';
import path from 'path';

test('record payment workflow', async ({ browser }) => {
  const context = await browser.newContext({
    storageState: 'auth-state.json',
    recordVideo: {
      dir: path.join(videoDir('payments')),
      size: { width: 1280, height: 720 },
    },
    viewport: { width: 1280, height: 720 },
  });

  const page = await context.newPage();
  await injectCursorRing(page);

  await page.goto('/finance/payments');
  await page.waitForLoadState('networkidle');
  await pause(page, 2000);

  const newBtn = page.getByRole('button', { name: /new payment/i });
  if (await newBtn.isVisible({ timeout: 4000 })) {
    await newBtn.click();
    await page.waitForLoadState('networkidle');
    await pause(page, 1500);

    // Search for a student
    const studentSearch = page.getByPlaceholder(/search student/i).first();
    if (await studentSearch.isVisible({ timeout: 3000 })) {
      await studentSearch.fill('James');
      await pause(page, 1200);
      const firstResult = page.getByRole('option').first();
      if (await firstResult.isVisible({ timeout: 2000 })) {
        await firstResult.click();
        await pause(page, 1200);
      }
    }

    // Amount
    const amountInput = page.getByLabel(/amount/i).first();
    if (await amountInput.isVisible({ timeout: 2000 })) {
      await amountInput.fill('10000');
      await pause(page, 800);
    }

    // Method
    const methodSelect = page.getByLabel(/method/i).first();
    if (await methodSelect.isVisible({ timeout: 2000 })) {
      await methodSelect.selectOption('cash');
      await pause(page, 800);
    }

    await page.screenshot({ path: 'docs-automation/recordings/payments/payment-form-filled.png' });
    await pause(page, 1500);

    // Save
    const saveBtn = page.getByRole('button', { name: /save|record payment/i });
    if (await saveBtn.isVisible({ timeout: 2000 })) {
      await saveBtn.click();
      await page.waitForLoadState('networkidle');
      await pause(page, 2500);
    }
  }

  await context.close();
  console.log('✅ Payment video recording saved');
});
