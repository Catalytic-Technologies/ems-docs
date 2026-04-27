/**
 * Shared helpers for screenshot and video Playwright specs.
 */

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Absolute path to a screenshot output file.
 * @param {string} module  - e.g. 'academic'
 * @param {string} filename - e.g. 'attendance-mark.png'
 */
export function screenshotPath(module, filename) {
  return path.resolve(__dirname, '..', 'static', 'img', module, filename);
}

/**
 * Absolute path to a video recording output directory.
 * @param {string} module - e.g. 'academic'
 */
export function videoDir(module) {
  return path.resolve(__dirname, 'recordings', module);
}

/**
 * Inject a CSS highlight overlay on a specific element before screenshotting.
 * Draws a coloured box with an optional numbered callout label.
 *
 * @param {import('@playwright/test').Page} page
 * @param {string|import('@playwright/test').Locator} selectorOrLocator
 *   Either a plain CSS selector string (no Playwright pseudo-selectors like :has-text)
 *   OR a Playwright Locator object (preferred — avoids querySelector limitations).
 * @param {object} [options]
 * @param {string} [options.colour] - Border colour (default: #2563eb)
 * @param {string} [options.label]  - Callout number/label (optional)
 */
export async function highlight(page, selectorOrLocator, { colour = '#2563eb', label } = {}) {
  const overlayScript = (el, { colour, label }) => {
    document.querySelectorAll('.__ems_highlight').forEach((e) => e.remove());
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const overlay = document.createElement('div');
    overlay.className = '__ems_highlight';
    overlay.style.cssText = `
      position: fixed;
      top: ${rect.top - 4}px;
      left: ${rect.left - 4}px;
      width: ${rect.width + 8}px;
      height: ${rect.height + 8}px;
      border: 3px solid ${colour};
      border-radius: 6px;
      box-shadow: 0 0 0 9999px rgba(0,0,0,0.35);
      pointer-events: none;
      z-index: 999999;
    `;
    if (label) {
      const badge = document.createElement('div');
      badge.style.cssText = `
        position: absolute;
        top: -14px;
        left: -4px;
        background: ${colour};
        color: white;
        font-family: sans-serif;
        font-size: 13px;
        font-weight: 700;
        padding: 2px 8px;
        border-radius: 4px;
        white-space: nowrap;
      `;
      badge.textContent = label;
      overlay.appendChild(badge);
    }
    document.body.appendChild(overlay);
  };

  // Playwright Locator object — use locator.evaluate() so Playwright resolves
  // the element and passes the actual DOM node into the browser context.
  const isLocator = selectorOrLocator !== null
    && typeof selectorOrLocator === 'object'
    && typeof selectorOrLocator.evaluate === 'function';

  // Playwright-specific selector syntax that querySelector() cannot handle.
  // Covers both pseudo-class form (:has-text) and engine-prefix form (text=).
  const PLAYWRIGHT_PSEUDOS = [
    ':text(', ':has-text(', ':text-is(', ':visible', ':checked',
    'text=', 'css=', 'xpath=', 'role=', 'label=', 'placeholder=',
  ];
  const isPlaywrightSelector = typeof selectorOrLocator === 'string'
    && PLAYWRIGHT_PSEUDOS.some((p) => selectorOrLocator.includes(p));

  if (isLocator) {
    // Already a Playwright Locator — pass the DOM element directly.
    try {
      await selectorOrLocator.evaluate(overlayScript, { colour, label });
    } catch {
      // Element may have disappeared; skip silently.
    }
  } else if (isPlaywrightSelector) {
    // Use Playwright's own engine to resolve the selector, then run the overlay
    // inside the browser via locator.evaluate().
    const locator = page.locator(selectorOrLocator).first();
    try {
      if (await locator.isVisible({ timeout: 2000 })) {
        await locator.evaluate(overlayScript, { colour, label });
      }
    } catch {
      // Element not found — skip silently.
    }
  } else {
    // Plain CSS selector — safe to pass directly to querySelector().
    await page.evaluate(
      ({ sel, colour, label }) => {
        const el = document.querySelector(sel);
        document.querySelectorAll('.__ems_highlight').forEach((e) => e.remove());
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const overlay = document.createElement('div');
        overlay.className = '__ems_highlight';
        overlay.style.cssText = `
          position: fixed;
          top: ${rect.top - 4}px;
          left: ${rect.left - 4}px;
          width: ${rect.width + 8}px;
          height: ${rect.height + 8}px;
          border: 3px solid ${colour};
          border-radius: 6px;
          box-shadow: 0 0 0 9999px rgba(0,0,0,0.35);
          pointer-events: none;
          z-index: 999999;
        `;
        if (label) {
          const badge = document.createElement('div');
          badge.style.cssText = `
            position: absolute;
            top: -14px;
            left: -4px;
            background: ${colour};
            color: white;
            font-family: sans-serif;
            font-size: 13px;
            font-weight: 700;
            padding: 2px 8px;
            border-radius: 4px;
            white-space: nowrap;
          `;
          badge.textContent = label;
          overlay.appendChild(badge);
        }
        document.body.appendChild(overlay);
      },
      { sel: selectorOrLocator, colour, label }
    );
  }
  await page.waitForTimeout(300);
}

/**
 * Remove all highlight overlays.
 * @param {import('@playwright/test').Page} page
 */
export async function clearHighlights(page) {
  await page.evaluate(() => {
    document.querySelectorAll('.__ems_highlight').forEach((e) => e.remove());
  });
}

/**
 * Inject a CSS cursor ring that makes the mouse position always visible
 * in screen recordings.
 * @param {import('@playwright/test').Page} page
 */
export async function injectCursorRing(page) {
  await page.addStyleTag({
    content: `
      * { cursor: none !important; }
      .__ems_cursor {
        position: fixed;
        width: 22px;
        height: 22px;
        border: 3px solid #1a73e8;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999999;
        transform: translate(-50%, -50%);
        transition: transform 0.05s ease;
        background: rgba(26, 115, 232, 0.15);
      }
    `,
  });
  await page.evaluate(() => {
    const cursor = document.createElement('div');
    cursor.className = '__ems_cursor';
    document.body.appendChild(cursor);
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });
  });
}

/**
 * Pause for a specified number of milliseconds (for pacing in videos).
 * @param {import('@playwright/test').Page} page
 * @param {number} ms
 */
export async function pause(page, ms = 1500) {
  await page.waitForTimeout(ms);
}
