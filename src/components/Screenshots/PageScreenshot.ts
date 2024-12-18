import { chromium, Browser, Page } from "playwright";
import { makeLogs } from "../LogHelper.ts";

const log = makeLogs("ScreenshotSvc");

type ScreenshotOptions = {
  url: string;
  outputPath?: string;
  width?: number;
  height?: number;
  scrollTo?: string;
  zoom?: number;
  delayMs?: number;
  selector?: string;
  selectorPathMap?: Record<string, string>;
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
  public pages: Page[] = [];
  private browser: Browser | null = null;
  private headless = true;
  private readonly overrideClassName = "screenshot-mode";

  public async init(): Promise<void> {
    log("Initializing browser");
    this.browser = await chromium.launch({ headless: this.headless });
    log("Browser initialized");
  }

  async goToUrl(url: string) {
    if (!this.browser) {
      throw new Error("Browser is not initialized. Please call init() first.");
    }

    const page: Page = await this.browser.newPage({
      viewport: { width: 1024, height: 720 },
      deviceScaleFactor: 4,
    });
    this.pages.push(page);
    await page.goto(url);
    log(`Navigated to ${url}`);
    return page;
  }
  get _browserInstance() {
    return this.browser;
  }
  get _pages() {
    return this.pages;
  }

  public async createScreenshot({
    url,
    outputPath,
    width,
    height,
    selector,
    selectorPathMap,
    scrollTo,
    zoom,
    delayMs,
    overrideClassName = this.overrideClassName,
  }: ScreenshotOptions & {
    overrideClassName?: string;
  }): Promise<Buffer | null> {
    if (!this.browser) {
      throw new Error("Browser is not initialized. Please call init() first.");
    }

    const page: Page = await this.browser.newPage({
      deviceScaleFactor: 4,
    });

    if (width && height) {
      await page.setViewportSize({ width: width, height: height });
      log(`Creating screenshot for ${url} with size ${width}x${height}`);
    }

    await page.goto(url);
    log(`Navigated to ${url}`);

    if (scrollTo) {
      await page.waitForSelector(scrollTo);
      await page.evaluate((scrollTo) => {
        const element = document.querySelector(scrollTo);
        if (element) element.scrollIntoView();
        else console.warn(`Element '${scrollTo}' not found. ScrollTo skipped.`);
      }, scrollTo);
    }

    if (delayMs) await page.waitForTimeout(delayMs);

    if (overrideClassName) {
      await page.evaluate((overrideClassName) => {
        document.body.classList.add(overrideClassName);
      }, overrideClassName);
    }

    if (zoom && zoom > 0 && zoom < 10)
      await page.evaluate(`document.body.style.scale = ${zoom}`);

    let screenshotBuffer: Buffer | null = null;

    if (selectorPathMap) {
      for (const [selector, path] of Object.entries(selectorPathMap)) {
        const element = await page.$(selector);
        if (!element) {
          throw new Error(`Element with selector '${selector}' not found`);
        }
        // delay 1000ms to wait for the element to be fully loaded
        await page.waitForTimeout(1000);
        screenshotBuffer = await element.screenshot({
          path: path,
          quality: 100,
          scale: "device",
        });
        console.log(`Screenshot saved to ${path}`);
      }
    } else if (selector) {
      const element = await page.$(selector);
      if (!element) {
        throw new Error(`Element with selector '${selector}' not found`);
      }
      screenshotBuffer = await element.screenshot({
        path: outputPath,
        quality: 100,
        scale: "device",
      });
      console.log(`Screenshot saved to ${outputPath}`);
    } else {
      await page.evaluate(() => {
        document.body.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      });
      screenshotBuffer = await page.screenshot({
        path: outputPath,
        quality: 100,
        scale: "device",
      });
      console.log(`Screenshot saved to ${outputPath}`);
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
