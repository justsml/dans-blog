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
const DEFAULT_DELAY_MS = 150;
const FEED_TIMEOUT_MS = 10_000;
const NAVIGATION_TIMEOUT_MS = 30_000;
const QUIZ_SELECTOR_COUNT = 30;
const ELEMENT_SCREENSHOT_TIMEOUT_MS = 45_000;
const SOCIAL_BANNER_SIZE = {
  width: 1200,
  height: 628,
};

type CliOptions = {
  filter?: string;
  limit?: number;
  rssPath: string;
  siteUrl: string;
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
  if (cliOptions.limit != null) {
    items = items.slice(0, cliOptions.limit);
  }

  if (items.length === 0) {
    log("No RSS items matched. Nothing to screenshot.");
    return;
  }

  log(`Generating screenshots for ${items.length} RSS item(s).`);
  await screenshotService.init();

  try {
    for (const [index, item] of items.entries()) {
      log(`(${index + 1}/${items.length}) ${item.slug}: ${item.title}`);
      await generateImages(buildArgs(item, cliOptions.siteUrl));
    }
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

  const selectorPathMap = isQuiz
    ? buildQuizSelectorPathMap(previewPath)
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

function assertNotAutoRefresh(error: Error) {
  if (
    error.message.includes("context") &&
    error.message.includes("a navigation")
  ) {
    throw new Error(
      [
        "The page navigated while screenshot mode was being applied.",
        "This usually means the screenshotter is pointed at a live dev server with auto-refresh.",
        "Use a static build or a stable preview server for screenshots.",
      ].join(" "),
    );
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

async function generateImages(args: ScreenshotTask) {
  const startTime = Date.now();
  for (const [url, options] of Object.entries(args)) {
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
            console.error(`Error reloading page: ${getErrorMessage(error)}`);
          });
        await preparePage(page, { delayMs, zoom });

        await page.evaluate(() => {
          if (window.__superHackFix_patchOptionsListWithActualHeight) {
            window.__superHackFix_patchOptionsListWithActualHeight();
          }
        });

        for (const [selector, fileName] of Object.entries(selectorPathMap)) {
          const newFile = toAbsolutePath(fileName);
          log(`Screenshot for ${selector}: ${newFile}`);
          await applyScreenshotModeSafely(page);
          const element = await prepareElementScreenshot(page, selector).catch((error) => {
            console.error(
              `Error selecting element ${selector}: ${getErrorMessage(error)}`,
            );
            return null;
          });

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
  const endTime = Date.now();
  console.log(`Screenshots generated in ${endTime - startTime}ms`);
}

async function prepareElementScreenshot(page: Page, selector: string) {
  await page.waitForSelector(selector, {
    state: "attached",
    timeout: NAVIGATION_TIMEOUT_MS,
  });

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
    element.scrollIntoView({ block: "center", inline: "center" });
  }, selector);

  await page.waitForFunction(
    (selector) => {
      const element = document.querySelector<HTMLElement>(selector);
      if (!element) return false;

      const rect = element.getBoundingClientRect();
      const style = window.getComputedStyle(element);

      return (
        rect.width > 0 &&
        rect.height > 0 &&
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
  const limitArg = getArgValue(args, "limit");
  const limit =
    limitArg == null || limitArg === ""
      ? undefined
      : Number.parseInt(limitArg, 10);

  if (limit != null && (!Number.isFinite(limit) || limit < 1)) {
    throw new Error("--limit must be a positive integer.");
  }

  return {
    filter: getArgValue(args, "filter"),
    limit,
    rssPath: rssPath.startsWith("/") ? rssPath : `/${rssPath}`,
    siteUrl,
  };
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

function buildQuizSelectorPathMap(basePath: string): Record<string, string> {
  return Object.fromEntries(
    Array.from({ length: QUIZ_SELECTOR_COUNT }, (_, index) => {
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

  const sourceDir = dirname(sourcePath);
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
  --limit <number>    Limit the number of matched posts, useful for smoke tests.
  --site <url>        Site root to screenshot. Defaults to SITE_URL or ${DEFAULT_SITE_URL}.
  --rss <path>        RSS JSON path. Defaults to ${DEFAULT_RSS_PATH}.
  --help              Show this help text.`);
}
