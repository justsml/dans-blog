import { chromium, Browser, Page } from "playwright";
import { makeLogs } from "../LogHelper.ts";

const log = makeLogs("ScreenshotSvc");

type ScreenshotOptions = {
  url: string;
  outputPath?: string;
  width?: number;
  height?: number;
  selector?: string;
  scrollTo?: string;
  zoom?: number;
  delayMs?: number;
};

/**
 * Service for creating screenshots of web pages.
 * Uses Playwright to control a headless browser.
 * @see https://playwright.dev/
 * 
 * @example
 * ```typescript
 * const screenshotService = new ScreenshotService();
 * await screenshotService.init();
 * try {
 *   const buffer = await screenshotService.createScreenshot({
 *     url: 'https://example.com',
 *     width: 1280,
 *     height: 720,
 *     selector: '#main-content',
 *     scrollTo: '#footer',
 *     delayMs: 1000,
 *   });
 *   // Do something with the buffer, like saving it to a file
 *   require('fs').writeFileSync('screenshot.png', buffer);
 * } catch (error) {
 *   console.error('Error:', error);
 * } finally {
 *   await screenshotService.close();
 * }
 * ```
 */
class ScreenshotService {
  private browser: Browser | null = null;
  private headless = true;

  private readonly overrideClassName = "screenshot-mode";

  public async init(): Promise<void> {
    log("Initializing browser");
    this.browser = await chromium.launch({ headless: this.headless });
    log("Browser initialized");
  }

  public async createScreenshot({
    url,
    outputPath,
    width,
    height,
    selector,
    scrollTo,
    zoom,
    delayMs,
  }: ScreenshotOptions): Promise<Buffer> {
    if (!this.browser) {
      throw new Error("Browser is not initialized. Please call init() first.");
    }

    const page: Page = await this.browser.newPage();

    if (width && height) {
      await page.setViewportSize({ width: width, height: height });
      log(`Creating screenshot for ${url} with size ${width}x${height}`);
    }

    await page.goto(url);
    log(`Navigated to ${url}`);

    if (scrollTo) {
      await page.evaluate((scrollTo) => {
        const element = document.querySelector(scrollTo);
        if (element) element.scrollIntoView();
        else console.warn(`Element '${scrollTo}' not found. ScrollTo skipped.`);
      }, scrollTo);
    }

    if (delayMs) await page.waitForTimeout(delayMs);

    if (this.overrideClassName) {
      await page.evaluate((overrideClassName) => {
        document.body.classList.add(overrideClassName);
      }, this.overrideClassName);
    }

    if (zoom && zoom > 0 && zoom < 10)
      await page.evaluate(`document.body.style.scale = ${zoom}`);

    let screenshotBuffer: Buffer;
    if (selector) {
      const element = await page.$(selector);
      if (!element) {
        throw new Error(`Element with selector '${selector}' not found`);
      }
      screenshotBuffer = await element.screenshot({ path: outputPath });
    } else {
      screenshotBuffer = await page.screenshot({ path: outputPath });
    }

    await page.close();
    return screenshotBuffer;
  }

  public async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
    }
  }
}

export default ScreenshotService;

// Usage example (uncomment for use):
// (async () => {
//   const screenshotService = new ScreenshotService();
//   await screenshotService.init();
//   try {
//     const buffer = await screenshotService.createScreenshot({
//       url: 'https://example.com',
//       width: 1280,
//       height: 720,
//       selector: '#main-content',
//       scrollTo: '#footer',
//       delayMs: 1000,
//     });
//     // Do something with the buffer, like saving it to a file
//     require('fs').writeFileSync('screenshot.png', buffer);
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     await screenshotService.close();
//   }
// })();
