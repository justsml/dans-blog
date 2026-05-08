import { mkdir, rm } from "fs/promises";
import path, { dirname, join } from "path";
import getSiteRss, { type RssishItem } from "./get-site.ts";
import ScreenshotService from "../src/components/Screenshots/PageScreenshot.ts";
import { makeLogs } from "../src/components/LogHelper.ts";
import type { ElementHandle, Page } from "playwright";
import * as webP from "@/shared/webP.ts";
import { resizeAndCrop } from "../src/shared/socialBanner.ts";
import { saveAltText } from "./siteHelpers.ts";
import { applyScreenshotMode } from "../src/components/Screenshots/screenshotMode.ts";

const log = makeLogs("screenshotter");
const screenshotService = new ScreenshotService();

const DEFAULT_SITE_URL = "http://localhost:4242";
const DEFAULT_RSS_PATH = "/rss.json";
const DEFAULT_CONCURRENCY = 2;
const DEFAULT_DELAY_MS = 150;
const DEFAULT_RETRIES = 3;
const FEED_TIMEOUT_MS = 10_000;
const HERO_IMAGE_TIMEOUT_MS = 3_000;
const NAVIGATION_TIMEOUT_MS = 10_000;
const RETRY_INITIAL_DELAY_MS = 250;
const QUIZ_SELECTOR_FALLBACK_COUNT = 30;
const ELEMENT_SCREENSHOT_TIMEOUT_MS = 15_000;
const SCROLL_NUDGE_DELAY_MS = 175;
const SOCIAL_BANNER_SIZE = {
  width: 1200,
  height: 628,
};

type CliOptions = {
  after?: string;
  before?: string;
  between?: DateRange;
  concurrency: number;
  filter?: string;
  limit?: number;
  retries: number;
  rssPath: string;
  siteUrl: string;
};

type DateRange = {
  after?: string;
  before?: string;
};

await main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});

async function main() {
  const cliOptions = parseCliOptions(process.argv.slice(2));

  if (hasArg(process.argv.slice(2), "help")) {
    printHelp();
    return;
  }

  log(`Loading RSS feed from ${cliOptions.siteUrl}${cliOptions.rssPath}`);
  const rssFeed = await getSiteRss(cliOptions.siteUrl, cliOptions.rssPath, {
    timeoutMs: FEED_TIMEOUT_MS,
  }).catch((error) => {
    throw new Error(
      [
        getErrorMessage(error),
        "",
        "The screenshotter needs an already-running local site or SITE_URL.",
        `Checked: ${cliOptions.siteUrl}${cliOptions.rssPath}`,
        "For local static screenshots, build and serve the site first.",
      ].join("\n"),
    );
  });

  let items = filterFeedItems(rssFeed.items, cliOptions.filter);
  items = filterFeedItemsByDate(items, {
    after: cliOptions.between?.after ?? cliOptions.after,
    before: cliOptions.between?.before ?? cliOptions.before,
  });
  if (cliOptions.limit != null) {
    items = items.slice(0, cliOptions.limit);
  }

  if (items.length === 0) {
    log("No RSS items matched. Nothing to screenshot.");
    return;
  }

  log(
    `Generating screenshots for ${items.length} RSS item(s) with concurrency ${cliOptions.concurrency}.`,
  );
  await screenshotService.init();

  try {
    await runWithConcurrency(
      items,
      cliOptions.concurrency,
      async (item, index) => {
        log(`(${index + 1}/${items.length}) ${item.slug}: ${item.title}`);
        await generateImages(buildArgs(item, cliOptions.siteUrl), {
          retries: cliOptions.retries,
        });
      },
    );
  } finally {
    await screenshotService.close();
  }
}

function buildArgs(rssItem: RssishItem, siteUrlPrefix: string): ScreenshotTask {
  const { slug, categories } = rssItem;
  const link = new URL(rssItem.link ?? `/${slug}/`, siteUrlPrefix).toString();
  const sourceDir = getSourceDir(rssItem.sourcePath);
  const isQuiz = categories?.includes("Quiz") || categories?.includes("quiz");
  const contentPath = sourceDir
    ? path.join(process.cwd(), "src/content/posts", sourceDir)
    : path.join("/tmp/screenshots", slug);
  const previewPath = sourceDir
    ? path.join(process.cwd(), "public/previews", sourceDir)
    : path.join("/tmp/screenshots", slug);

  const questionCount = rssItem.questionCount;
  const quizQuestionCount =
    isQuiz &&
    Number.isInteger(questionCount) &&
    questionCount &&
    questionCount > 0
      ? questionCount
      : undefined;
  const selectorPathMap = isQuiz
    ? buildQuizSelectorPathMap(previewPath, quizQuestionCount)
    : undefined;

  return {
    [`${link}`]: {
      selectorPathMap,
      sizes: [
        {
          fileName: join(contentPath, "desktop.jpg"),
          width: 800,
          height: 720,
          classModifier: "desktop-shot",
          postProcess: "resizeAndCrop",
        },
        {
          fileName: join(contentPath, "mobile.jpg"),
          width: 480,
          height: 960,
          classModifier: "mobile-shot",
          postProcess: "resizeAndCrop",
        },
      ],
      delayMs: DEFAULT_DELAY_MS,
    },
  };
}

type ScreenshotTask = Record<string, ScreenshotOptions>;
type ScreenshotOptions = {
  selectorPathMap?: Record<string, string>;
  sizes?: Dimension[];
  scrollTo?: string;
  delayMs?: number;
  zoom?: number;
};

type Dimension = {
  fileName: string;
  width: number;
  height: number;
  classModifier?: string;
  postProcess?: undefined | "resizeAndCrop";
};

type GenerateImagesOptions = {
  retries?: number;
};

async function applyScrollTo(page: Page, scrollTo: string) {
  if (scrollTo) {
    await page.waitForSelector(scrollTo);
    await page.evaluate((scrollTo) => {
      const element = document.querySelector(scrollTo);
      if (element) element.scrollIntoView();
      else console.warn(`Element '${scrollTo}' not found. ScrollTo skipped.`);
    }, scrollTo);
  }
}

async function nudgeScrollForImageLoading(page: Page) {
  await page
    .evaluate(async (delayMs) => {
      const originalX = window.scrollX;
      const originalY = window.scrollY;
      const maxScrollY =
        document.documentElement.scrollHeight - window.innerHeight;
      const nudgeY = Math.min(
        Math.max(120, window.innerHeight * 0.35),
        maxScrollY,
      );

      if (nudgeY <= 0) return;

      window.scrollTo({ left: originalX, top: nudgeY, behavior: "auto" });
      await new Promise((resolve) => window.setTimeout(resolve, delayMs));
      window.scrollTo({ left: originalX, top: originalY, behavior: "auto" });
    }, SCROLL_NUDGE_DELAY_MS)
    .catch((error) => {
      if (error instanceof Error) assertNotAutoRefresh(error);
      if (isRetryableScreenshotError(error)) throw error;
      console.warn(`Scroll nudge skipped: ${getErrorMessage(error)}`);
    });
}

async function waitForHeroImage(page: Page) {
  await page
    .evaluate(async (timeoutMs) => {
      const img = document.querySelector<HTMLImageElement>(
        ".banner-wrapper img, .hero-image img",
      );
      if (!img) return;

      img.loading = "eager";

      const waitForLoad = new Promise<void>((resolve) => {
        if (img.complete && img.naturalWidth > 0) {
          resolve();
          return;
        }

        const cleanup = () => {
          window.clearTimeout(timeout);
          img.removeEventListener("load", onSettled);
          img.removeEventListener("error", onSettled);
        };
        const onSettled = () => {
          cleanup();
          resolve();
        };
        const timeout = window.setTimeout(onSettled, timeoutMs);

        img.addEventListener("load", onSettled, { once: true });
        img.addEventListener("error", onSettled, { once: true });
      });

      await waitForLoad;

      if (
        img.complete &&
        img.naturalWidth > 0 &&
        typeof img.decode === "function"
      ) {
        await Promise.race([
          img.decode().catch(() => undefined),
          new Promise((resolve) => window.setTimeout(resolve, timeoutMs)),
        ]);
      }
    }, HERO_IMAGE_TIMEOUT_MS)
    .catch((error) => {
      if (error instanceof Error) assertNotAutoRefresh(error);
      if (isRetryableScreenshotError(error)) throw error;
      console.warn(`Hero image wait skipped: ${getErrorMessage(error)}`);
    });
}

function isAutoRefreshNavigationError(error: unknown) {
  if (!(error instanceof Error)) return false;

  return (
    error.message.includes(
      "The page navigated while screenshot mode was being applied.",
    ) ||
    (error.message.includes("context") &&
      error.message.includes("a navigation"))
  );
}

function isRetryableScreenshotError(error: unknown) {
  if (!(error instanceof Error)) return false;

  const message = error.message.toLowerCase();
  return (
    isAutoRefreshNavigationError(error) ||
    message.includes("target page, context or browser has been closed") ||
    message.includes("target closed") ||
    message.includes("page has been closed") ||
    message.includes("context has been closed") ||
    message.includes("browser has been closed") ||
    message.includes("execution context was destroyed") ||
    message.includes("navigation failed because page was closed") ||
    message.includes("net::err_") ||
    message.includes("timeout")
  );
}

function assertNotAutoRefresh(error: Error) {
  if (isAutoRefreshNavigationError(error)) {
    throw new Error(
      [
        "The page navigated while screenshot mode was being applied.",
        "This usually means the screenshotter is pointed at a live dev server with auto-refresh.",
        "Use a static build or a stable preview server for screenshots.",
      ].join(" "),
    );
  }
}

async function waitForRetryBackoff(attempt: number) {
  const delayMs = RETRY_INITIAL_DELAY_MS * 2 ** Math.max(0, attempt - 1);
  await new Promise((resolve) => setTimeout(resolve, delayMs));
  return delayMs;
}

async function withScreenshotRetry<T>(
  label: string,
  action: () => Promise<T>,
  { retries }: { retries: number },
) {
  let attempt = 0;

  while (true) {
    try {
      return await action();
    } catch (error) {
      if (!isRetryableScreenshotError(error) || attempt >= retries) {
        throw error;
      }

      attempt += 1;
      const delayMs = await waitForRetryBackoff(attempt);
      console.warn(
        `${label} hit a retryable screenshot failure: ${getErrorMessage(error)}. Retrying ${attempt}/${retries} after ${delayMs}ms.`,
      );
    }
  }
}

async function applyScreenshotModeSafely(
  page: Page,
  classModifier?: string,
) {
  await applyScreenshotMode(page, classModifier).catch((error) => {
    if (error instanceof Error) assertNotAutoRefresh(error);
    throw error;
  });
}

async function resetViewport(page: Page) {
  await page.setViewportSize({ width: 1280, height: 720 });
}

/** Converts supported files to webp in same path */
async function takeScreenshot(ctx: Page | ElementHandle, fileName: string) {
  await mkdir(dirname(fileName), { recursive: true });
  await ctx.screenshot({
    quality: 100,
    path: fileName,
    timeout: ELEMENT_SCREENSHOT_TIMEOUT_MS,
  });
  if (webP.isFileSupported(fileName)) {
    try {
      const webpFile = await webP.convertToWebP(fileName);
      await rm(fileName, { force: true });
      return webpFile;
    } catch (error) {
      console.error(
        `Error converting ${fileName} to webP: ${getErrorMessage(error)}`,
      );
      return fileName;
    }
  }
  return fileName;
}

async function generateImages(
  args: ScreenshotTask,
  { retries = DEFAULT_RETRIES }: GenerateImagesOptions = {},
) {
  const startTime = Date.now();
  for (const [url, options] of Object.entries(args)) {
    await withScreenshotRetry(
      `Screenshot ${url}`,
      () => generateImagesForUrl(url, options),
      { retries },
    );
  }
  const endTime = Date.now();
  console.log(`Screenshots generated in ${endTime - startTime}ms`);
}

async function generateImagesForUrl(url: string, options: ScreenshotOptions) {
  const { selectorPathMap, sizes, scrollTo, delayMs, zoom } = options;
  let page: Page | undefined;

  try {
    log("Browser loading %s", url);
    page = await screenshotService.goToUrl(url);
    await preparePage(page, { delayMs, zoom });

    // Get main screenshots based on sizes
    if (sizes) {
      for (const {
        fileName,
        width,
        height,
        classModifier,
        postProcess,
      } of sizes) {
        const newFile = toAbsolutePath(fileName);

        log(`Creating screenshot ${newFile}`);
        await page.setViewportSize({ width, height });
        await page.reload({
          timeout: NAVIGATION_TIMEOUT_MS,
          waitUntil: "domcontentloaded",
        });
        await preparePage(page, {
          classModifier,
          delayMs,
          scrollTo,
          zoom,
        });

        const outputFile = await takeScreenshot(page, newFile);
        if (postProcess === "resizeAndCrop") {
          const socialBannerPath = outputFile
            .replace(".jpg", "-social.jpg")
            .replace(".webp", "-social.webp");
          await resizeAndCrop(
            outputFile,
            socialBannerPath,
            SOCIAL_BANNER_SIZE,
          );
        }
        log(`Screenshot saved to ${outputFile}`);
      }
    }

    await resetViewport(page);

    // get any additional screenshots based on selectorPathMap
    if (selectorPathMap && Object.keys(selectorPathMap).length > 0) {
      if (page.isClosed()) {
        page = await screenshotService.goToUrl(url);
      }

      await page
        .reload({
          timeout: NAVIGATION_TIMEOUT_MS,
          waitUntil: "domcontentloaded",
        })
        .catch((error) => {
          if (isRetryableScreenshotError(error)) throw error;
          console.error(`Error reloading page: ${getErrorMessage(error)}`);
        });
      await preparePage(page, { delayMs, zoom });

      await page.evaluate(() => {
        if (window.__superHackFix_patchOptionsListWithActualHeight) {
          window.__superHackFix_patchOptionsListWithActualHeight();
        }
      });

      const availableSelectorPathMap = await resolveSelectorPathMap(
        page,
        selectorPathMap,
      );

      for (const [selector, fileName] of Object.entries(
        availableSelectorPathMap,
      )) {
        const newFile = toAbsolutePath(fileName);
        log(`Screenshot for ${selector}: ${newFile}`);
        await applyScreenshotModeSafely(page);
        const element = await prepareElementScreenshot(page, selector).catch(
          (error) => {
            if (isRetryableScreenshotError(error)) throw error;
            console.error(
              `Error selecting element ${selector}: ${getErrorMessage(error)}`,
            );
            return null;
          },
        );

        if (!element) {
          console.warn(
            `Element with selector '${selector}' not found. Skipping.`,
          );
          continue;
        }

        await page.waitForTimeout(delayMs ?? 1000);
        await takeScreenshot(element, newFile)
          .then((outputFile) => {
            const altTxtPath = outputFile
              .replace(/\.[a-z]{3,4}$/i, "-alt.txt")
              .replace(".webp", "-alt.txt")
              .replace(".png", "-alt.txt");
            console.log(`Screenshot saved to ${outputFile}`);
            return saveAltText(element, altTxtPath);
          })
          .catch((error) => {
            if (isRetryableScreenshotError(error)) throw error;
            console.error(
              `Error creating screenshot ${newFile}: ${getErrorMessage(error)}`,
            );
          });
      }
    }
  } finally {
    await closePage(page);
  }
}

async function prepareElementScreenshot(page: Page, selector: string) {
  const existingElement = await page.$(selector);
  if (!existingElement) return null;

  await page.evaluate((selector) => {
    const element = document.querySelector<HTMLElement>(selector);
    if (!element) return;

    document
      .querySelectorAll<HTMLElement>(
        ".quiz-nav-bar, .quiz-score-bar, .quiz-completion-card",
      )
      .forEach((quizChrome) => {
        quizChrome.style.setProperty("display", "none", "important");
      });

    const island = element.closest<HTMLElement>("astro-island");
    const quizUI = island?.closest<HTMLElement>(".quiz-ui");

    if (island && quizUI) {
      quizUI.classList.add("quiz-slides-active");

      quizUI
        .querySelectorAll<HTMLElement>("astro-island")
        .forEach((candidateIsland) => {
          const containsChallenge = Boolean(
            candidateIsland.querySelector(".challenge"),
          );
          if (!containsChallenge) return;

          if (candidateIsland === island) {
            candidateIsland.classList.add("quiz-slide", "quiz-slide--active");
            candidateIsland.classList.remove("quiz-slide--hidden");
            candidateIsland.style.setProperty("display", "block", "important");
            candidateIsland.style.setProperty("position", "relative");
            candidateIsland.style.setProperty("width", "100%");
            candidateIsland.style.setProperty("height", "auto");
            candidateIsland.style.setProperty("overflow", "visible");
            candidateIsland.style.setProperty("opacity", "1");
            candidateIsland.style.setProperty("pointer-events", "auto");
            candidateIsland.style.removeProperty("clip");
            candidateIsland.style.removeProperty("transform");
            candidateIsland.style.removeProperty("filter");
          } else {
            candidateIsland.classList.add("quiz-slide", "quiz-slide--hidden");
            candidateIsland.classList.remove("quiz-slide--active");
            candidateIsland.style.setProperty("display", "none", "important");
          }
        });
    }

    element.classList.remove(
      "challenge-enter",
      "answer-correct-pulse",
      "answer-incorrect-shake",
      "pulse",
      "shake",
    );
    element.style.setProperty("opacity", "1");
    element.style.removeProperty("transform");
    element.style.removeProperty("filter");

    const panel = element.querySelector<HTMLElement>(".quiz-body-panel");
    const options = element.querySelector<HTMLElement>(".quiz-options");
    const explanation = element.querySelector<HTMLElement>(".explanation");

    if (panel && options) {
      panel.classList.remove("card-flip");
      panel.style.setProperty("overflow", "visible", "important");
      panel.style.setProperty("transform-style", "flat", "important");

      options.style.setProperty("display", "grid", "important");
      options.style.setProperty("position", "relative", "important");
      options.style.setProperty("visibility", "visible", "important");
      options.style.setProperty("opacity", "1", "important");
      options.style.setProperty("transform", "none", "important");
      options.style.setProperty("height", "auto", "important");

      if (explanation) {
        explanation.style.setProperty("display", "none", "important");
        explanation.style.setProperty("visibility", "hidden", "important");
      }

      const optionsHeight = options.scrollHeight;
      if (optionsHeight > 0) {
        panel.style.setProperty("height", `${optionsHeight}px`, "important");
        panel.style.setProperty("min-height", `${optionsHeight}px`, "important");
      }
    }

    element.scrollIntoView({ block: "center", inline: "center" });
  }, selector);

  await page.waitForFunction(
    (selector) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) return false;

      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);
      const options = element.querySelector<HTMLElement>(".quiz-options");
      const optionsRect = options?.getBoundingClientRect();

      return (
        rect.width > 0 &&
        rect.height > 0 &&
        Boolean(optionsRect && optionsRect.width > 0 && optionsRect.height > 0) &&
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        style.opacity !== "0"
      );
    },
    selector,
    { timeout: NAVIGATION_TIMEOUT_MS },
  );

  const element = await page.$(selector);
  await element?.scrollIntoViewIfNeeded({ timeout: NAVIGATION_TIMEOUT_MS });
  return element;
}

function parseCliOptions(args: string[]): CliOptions {
  const siteUrl = normalizeSiteUrl(
    getArgValue(args, "site") ??
      getArgValue(args, "site-url") ??
      process.env.SITE_URL ??
      DEFAULT_SITE_URL,
  );
  const rssPath = getArgValue(args, "rss") ?? DEFAULT_RSS_PATH;
  const concurrencyArg = getArgValue(args, "concurrency");
  const concurrency =
    concurrencyArg == null || concurrencyArg === ""
      ? DEFAULT_CONCURRENCY
      : Number.parseInt(concurrencyArg, 10);
  const limitArg = getArgValue(args, "limit");
  const limit =
    limitArg == null || limitArg === ""
      ? undefined
      : Number.parseInt(limitArg, 10);
  const retriesArg = getArgValue(args, "retries");
  const retries =
    retriesArg == null || retriesArg === ""
      ? DEFAULT_RETRIES
      : Number.parseInt(retriesArg, 10);

  if (
    !Number.isFinite(concurrency) ||
    concurrency < 1 ||
    concurrency > 8
  ) {
    throw new Error("--concurrency must be an integer from 1 to 8.");
  }

  if (limit != null && (!Number.isFinite(limit) || limit < 1)) {
    throw new Error("--limit must be a positive integer.");
  }

  if (!Number.isFinite(retries) || retries < 0 || retries > 8) {
    throw new Error("--retries must be an integer from 0 to 8.");
  }

  return {
    after: parseDateArg(getArgValue(args, "after"), "--after"),
    before: parseDateArg(getArgValue(args, "before"), "--before"),
    between: parseBetweenArg(getArgValue(args, "between")),
    concurrency,
    filter: getArgValue(args, "filter"),
    limit,
    retries,
    rssPath: rssPath.startsWith("/") ? rssPath : `/${rssPath}`,
    siteUrl,
  };
}

async function runWithConcurrency<T>(
  items: T[],
  concurrency: number,
  worker: (item: T, index: number) => Promise<void>,
) {
  let nextIndex = 0;
  const workerCount = Math.min(concurrency, items.length);

  await Promise.all(
    Array.from({ length: workerCount }, async () => {
      while (nextIndex < items.length) {
        const index = nextIndex;
        nextIndex += 1;
        await worker(items[index], index);
      }
    }),
  );
}

function filterFeedItems(items: RssishItem[], filter?: string) {
  if (!filter) return items;

  const originalCount = items.length;
  const needle = filter.toLowerCase();
  const filteredItems = items.filter((item) => {
    const haystack = [item.slug, item.title, ...(item.categories ?? [])]
      .filter((value): value is string => typeof value === "string")
      .map((value) => value.toLowerCase());

    return haystack.some((value) => value.includes(needle));
  });

  log(
    `Filtered feed from ${originalCount} to ${filteredItems.length} item(s).`,
  );
  return filteredItems;
}

function filterFeedItemsByDate(items: RssishItem[], range: DateRange) {
  const { after, before } = range;
  if (!after && !before) return items;

  const originalCount = items.length;
  const filteredItems = items.filter((item) => {
    const postDate = getItemDateString(item);
    if (!postDate) return false;
    if (after && postDate < after) return false;
    if (before && postDate > before) return false;
    return true;
  });

  log(
    `Date-filtered feed from ${originalCount} to ${filteredItems.length} item(s).`,
  );
  return filteredItems;
}

function parseBetweenArg(value?: string): DateRange | undefined {
  if (!value) return undefined;

  const [after, before, ...extraParts] = value
    .split(/\.\.|,/)
    .map((part) => part.trim());

  if (!after || !before || extraParts.length > 0) {
    throw new Error(
      "--between must use YYYY-MM-DD..YYYY-MM-DD, for example --between 2024-11-01..2024-11-30.",
    );
  }

  const range = {
    after: parseDateArg(after, "--between start"),
    before: parseDateArg(before, "--between end"),
  };

  if (range.after && range.before && range.after > range.before) {
    throw new Error("--between start date must be on or before the end date.");
  }

  return range;
}

function parseDateArg(value: string | undefined, name: string) {
  if (value == null || value === "") return undefined;

  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new Error(`${name} must use YYYY-MM-DD format.`);
  }

  const parsedDate = new Date(`${value}T00:00:00.000Z`);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error(`${name} must be a valid calendar date.`);
  }

  const normalized = parsedDate.toISOString().slice(0, 10);
  if (normalized !== value) {
    throw new Error(`${name} must be a valid calendar date.`);
  }

  return value;
}

function getItemDateString(item: RssishItem) {
  if (!item.pubDate) return undefined;

  const date =
    item.pubDate instanceof Date ? item.pubDate : new Date(item.pubDate);
  if (Number.isNaN(date.getTime())) return undefined;

  return date.toISOString().slice(0, 10);
}

async function resolveSelectorPathMap(
  page: Page,
  selectorPathMap: Record<string, string>,
) {
  const selectors = Object.keys(selectorPathMap);
  const availableSelectors = new Set(
    await page.evaluate((selectors) => {
      return selectors.filter((selector) => document.querySelector(selector));
    }, selectors),
  );

  if (availableSelectors.size !== selectors.length) {
    log(
      `Found ${availableSelectors.size} quiz question element(s), skipping ${selectors.length - availableSelectors.size} missing selector(s).`,
    );
  }

  return Object.fromEntries(
    Object.entries(selectorPathMap).filter(([selector]) =>
      availableSelectors.has(selector),
    ),
  );
}

function buildQuizSelectorPathMap(
  basePath: string,
  questionCount = QUIZ_SELECTOR_FALLBACK_COUNT,
): Record<string, string> {
  return Object.fromEntries(
    Array.from({ length: questionCount }, (_, index) => {
      const questionNumber = index + 1;
      return [
        `#qq-${questionNumber}`,
        join(basePath, `q${questionNumber}.jpg`),
      ];
    }),
  );
}

function getSourceDir(sourcePath?: string) {
  if (!sourcePath) return undefined;

  const normalizedSourcePath = sourcePath
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .replace(/^src\/content\/posts\//, "")
    .replace(/\/+$/, "");

  if (
    !normalizedSourcePath ||
    normalizedSourcePath === "." ||
    normalizedSourcePath.split("/").includes("..")
  ) {
    return undefined;
  }

  const sourceDir = path.posix.extname(normalizedSourcePath)
    ? path.posix.dirname(normalizedSourcePath)
    : normalizedSourcePath;

  return sourceDir === "." ? undefined : sourceDir;
}

async function preparePage(
  page: Page,
  {
    classModifier,
    delayMs,
    scrollTo,
    zoom,
  }: {
    classModifier?: string;
    delayMs?: number;
    scrollTo?: string;
    zoom?: number;
  },
) {
  await applyScreenshotModeSafely(page, classModifier);

  if (zoom && zoom > 0 && zoom < 10) {
    await page.evaluate((zoom) => {
      document.body.style.zoom = String(zoom);
    }, zoom);
  }

  await waitForHeroImage(page);
  await nudgeScrollForImageLoading(page);
  await waitForHeroImage(page);

  if (scrollTo) await applyScrollTo(page, scrollTo);
  await page.waitForTimeout(delayMs ?? DEFAULT_DELAY_MS);
}

function toAbsolutePath(fileName: string) {
  return fileName.startsWith("/")
    ? fileName
    : path.join(process.cwd(), fileName);
}

async function closePage(page?: Page) {
  if (!page || page.isClosed()) return;

  try {
    await page.waitForTimeout(50);
    await page.close();
  } catch (error) {
    console.error(`Error closing page: ${getErrorMessage(error)}`);
  }
}

function getArgValue(args: string[], name: string) {
  const exactArg = `--${name}`;
  const prefixedArg = `${exactArg}=`;
  const inlineArg = args.find((arg) => arg.startsWith(prefixedArg));

  if (inlineArg) {
    return inlineArg.slice(prefixedArg.length);
  }

  const argIndex = args.indexOf(exactArg);
  return argIndex >= 0 ? args[argIndex + 1] : undefined;
}

function hasArg(args: string[], name: string) {
  return args.includes(`--${name}`);
}

function normalizeSiteUrl(siteUrl: string) {
  return siteUrl.replace(/\/+$/, "");
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : String(error);
}

function printHelp() {
  console.log(`Usage: bun run screenshots [options]

Options:
  --filter <text>     Screenshot only posts matching a title, slug, category, or tag.
  --after <date>      Screenshot posts published on or after YYYY-MM-DD.
  --before <date>     Screenshot posts published on or before YYYY-MM-DD.
  --between <range>   Screenshot posts in an inclusive range: YYYY-MM-DD..YYYY-MM-DD.
  --concurrency <n>   Number of posts to screenshot in parallel, 1-8. Defaults to ${DEFAULT_CONCURRENCY}.
  --limit <number>    Limit the number of matched posts, useful for smoke tests.
  --retries <number>  Retry transient screenshot failures with exponential backoff. Defaults to ${DEFAULT_RETRIES}.
  --site <url>        Site root to screenshot. Defaults to SITE_URL or ${DEFAULT_SITE_URL}.
  --rss <path>        RSS JSON path. Defaults to ${DEFAULT_RSS_PATH}.
  --help              Show this help text.`);
}
