/**
 * Guardian screenshots: Messages
 *
 * Captures the messages list and a single message detail view.
 */
import { test } from '@playwright/test';
import { screenshotPath, highlight, clearHighlights, pause } from '../helpers.js';

test('guardian messages', async ({ page }) => {
  await page.goto('/messages');
  await page.waitForLoadState('networkidle');
  await pause(page, 1200);

  // Messages list
  await page.screenshot({ path: screenshotPath('guardian', 'messages.png'), fullPage: false });

  // Highlight an unread badge if visible
  const unread = page.locator('text=Unread, .unread, [data-unread]').first();
  if (await unread.isVisible()) {
    await highlight(page, ':text("Unread")', { colour: '#dc2626', label: 'Unread message' });
    await page.screenshot({ path: screenshotPath('guardian', 'messages-unread.png'), fullPage: false });
    await clearHighlights(page);
  }

  // Highlight the first message item
  const firstMessage = page.locator('a[href*="/messages/"]').first();
  if (await firstMessage.isVisible()) {
    await highlight(page, 'a[href*="/messages/"]', { colour: '#2563eb', label: 'Tap to open message' });
    await page.screenshot({ path: screenshotPath('guardian', 'messages-list-highlight.png'), fullPage: false });
    await clearHighlights(page);

    // Open message detail
    await firstMessage.click();
    await page.waitForLoadState('networkidle');
    await pause(page, 800);
    await page.screenshot({ path: screenshotPath('guardian', 'message-detail.png'), fullPage: false });

    // Highlight subject line
    const subject = page.locator('h1, h2, h3').first();
    if (await subject.isVisible()) {
      await highlight(page, 'h1, h2, h3', { colour: '#2563eb', label: 'Message subject' });
      await page.screenshot({ path: screenshotPath('guardian', 'message-detail-subject.png'), fullPage: false });
      await clearHighlights(page);
    }
  }
});
