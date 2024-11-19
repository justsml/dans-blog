import { mkdir } from "fs/promises";
import path, { dirname, join } from "path";
import { autoScreenShot } from "../src/components/Screenshots/AutoScreenShot.ts";
import getSiteRss, { RssishItem } from "./get-site.ts";
import ScreenshotService from "../src/components/Screenshots/PageScreenshot.ts";
import { RSSFeedItem } from "@astrojs/rss";
import { makeLogs } from "../src/components/LogHelper.ts";
import { Page } from "playwright";
const { SITE_URL } = process.env;

let count = 0;
const log = makeLogs("screenshotter");

const screenshotService = new ScreenshotService();
const siteUrlPrefix = SITE_URL ?? "http://localhost:3000";
const rssFeed = await getSiteRss(siteUrlPrefix, "/rss.json");
let basePath = `/tmp/screenshots`;

// console.log("RSS FEED: ", rssFeed.items[0]);

console.log("Loading RSS FEED: ", rssFeed.items.length);

async function handlePost(post: RSSFeedItem, index?: number) {
  if (index! < 3) console.log("POST: ", post);
}

await screenshotService.init();

// const firstItem = rssFeed.items[0];

// await generateImages(buildArgs(firstItem as RSSFeedItem & { slug: string }));
for await (let item of rssFeed.items) {
  count++;
  console.log("COUNT: ", count);

  const args = buildArgs(item);

  await generateImages(args);
  // if (count > 3) break;
}
// const results = Promise.allSettled(rssFeed.items.map(handlePost));
screenshotService.close();

function buildArgs(
  rssItem: RssishItem,
): ScreenshotTask {
  let { title, slug, link, categories, description } = rssItem;
  link = `${siteUrlPrefix}${link}`;

  // const category = categories![0];

  // const category = link!.split("/")[1];
  // const titleParts = title!.split(":");
  // const titleSlug = titleParts[0].trim().replace(/ /g, "-");
  // const titleName = titleParts[1].trim();
  const isQuiz = categories?.includes("Quiz") || categories?.includes("quiz");

  if (rssItem.sourcePath) {
    basePath = `${process.cwd()}/src/content/posts/${dirname(rssItem.sourcePath)}`;
    basePath = `${process.cwd()}/public/previews/${dirname(rssItem.sourcePath)}`;
    console.log("BASE PATH: ", basePath);
    // process.exit(0);
  } else {
    basePath = `/tmp/screenshots/${slug}`;
  }

  let selectorPathMap: Record<string, string> = isQuiz
    ? {
        "#qq-1": join(`${basePath}`, `/previews/q1.jpg`),
        "#qq-2": join(`${basePath}`, `/previews/q2.jpg`),
        "#qq-3": join(`${basePath}`, `/previews/q3.jpg`),
        "#qq-4": join(`${basePath}`, `/previews/q4.jpg`),
        "#qq-5": join(`${basePath}`, `/previews/q5.jpg`),
        "#qq-6": join(`${basePath}`, `/previews/q6.jpg`),
        "#qq-7": join(`${basePath}`, `/previews/q7.jpg`),
        "#qq-8": join(`${basePath}`, `/previews/q8.jpg`),
        "#qq-9": join(`${basePath}`, `/previews/q9.jpg`),
        "#qq-10": join(`${basePath}`, `/previews/q10.jpg`),
      }
    : {
        "main.article": join(`${basePath}`, `/previews/main.jpg`),
      };

  return {
    [`${link}`]: {
      fileName: join(`${basePath}`, `/previews/main.jpg`),
      selectorPathMap,
      sizes: [
        {
          fileName: join(`${basePath}`, `/previews/desktop.jpg`),
          width: 1280,
          height: 720,
        },
        {
          fileName: join(`${basePath}`, `/previews/mobile.jpg`),
          width: 430,
          height: 900,
        },
      ],
      delayMs: 300,
    },
  };
}

type ScreenshotTask = Record<string, ScreenshotOptions>;
type ScreenshotOptions = {
  fileName: string;
  selectorPathMap?: Record<string, string>;
  sizes?: Dimension[];
  maxAgeSeconds?: number;
  failOnMissing?: boolean | "production";
  selector?: string;
  scrollTo?: string;
  delayMs?: number;
  zoom?: number;
};

type Dimension = {
  fileName: string;
  width: number;
  height: number;
};

// const isPathComplete = (s: string) =>
//   s.startsWith("/") &&
//   (s.endsWith(".png") || s.endsWith(".jpg") || s.endsWith(".jpeg"));

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

async function applyClassName(page: Page, overrideClassName: string) {
  if (overrideClassName) {
    await page.evaluate((overrideClassName) => {
      document.body.classList.add(overrideClassName);
    }, overrideClassName);
  }
}

function resetViewport(page: Page) {
  page.setViewportSize({ width: 1280, height: 720 });
}

async function generateImages(args: ScreenshotTask) {
  let page: Page | undefined;
  const startTime = Date.now();
  for (const [url, options] of Object.entries(args)) {
    const { selectorPathMap, sizes, scrollTo, delayMs, zoom } = options;

    if (page) {
      await page.close();
    }
    // init page
    if (!page) {
      page = await screenshotService.goToUrl(url);
    } else {
      await page.goto(url);
    }
    applyClassName(page, "screenshot-mode");
    if (zoom && zoom > 0 && zoom < 10) {
      await page.evaluate(`document.body.style.zoom = ${zoom}`);
    }
    await page.waitForTimeout(delayMs ?? 1000);

    // Get main screenshots based on sizes
    if (sizes) {
      for await (const { fileName, width, height } of sizes) {
        const newFile = fileName.startsWith("/")
          ? fileName
          : path.join(process.cwd(), fileName);

        log(`Creating screenshot ${newFile}`);
        await mkdir(dirname(newFile), { recursive: true });
        // count++;
        if (scrollTo) applyScrollTo(page, scrollTo);
        page.setViewportSize({ width, height });
        await page.screenshot({
          quality: 100,
          path: newFile,
        });
        console.log(`Screenshot saved to ${newFile}`);
      }
    }

    resetViewport(page);

    // get any additional screenshots based on selectorPathMap
    if (selectorPathMap) {
      await page.reload();
      for await (const [selector, fileName] of Object.entries(
        selectorPathMap,
      )) {
        const newFile = fileName.startsWith("/")
          ? fileName
          : path.join(process.cwd(), fileName);
        log(`Screenshot for ${selector}: ${newFile}`);
        const element = await page.$(selector).catch((e) => {
          console.error(`Error selecting element ${selector}: ${e?.message}`);
          return null;
        });

        if (!element) {
          console.warn(
            `Element with selector '${selector}' not found. Skipping.`,
          );
          continue;
          // throw new Error(`Element with selector '${selector}' not found`);
        }
        // delay 1000ms to wait for the element to be fully loaded
        await page.waitForTimeout(delayMs ?? 1000);
        await element.screenshot({
          path: newFile,
          quality: 100,
          scale: "device",
        })
        .then(() => {
          console.log(`Screenshot saved to ${newFile}`);
        })
        .catch((e) => {
          console.error(`Error creating screenshot ${newFile}: ${e?.message}`);
        })
      }
    }
    // close page
    page.close();
  }
  const endTime = Date.now();
  console.log(`Screenshots generated in ${endTime - startTime}ms`);
}
// console.log("QUIZ PAGE: ", category, slug, title);
// const siteUrlPrefix = "http://localhost:3000"
// // const siteUrlPrefix = "https://danlevy.net"; // "http://localhost:4321"
// // const contentPath = Astro.props.sourcePath.split("/")[0];
// const fullPath = `src/content/posts/${Astro.props.sourcePath}`
// const basePath = `${process.cwd()}`
// const fullBasePath = path.dirname(join(`${basePath}`, `${fullPath}`));
// const socialBannerPreview = `${fullBasePath}/cover.jpg`;

// const newBase = `/tmp/screenshots/${contentPath}`;

// await mkdir(newBase, { recursive: true });

// console.log("ID: ", newBase, fullPath);
// console.log("Cappin URL: ", `${siteUrlPrefix}/${slug}`);

// await autoScreenShot({
//   url: `${siteUrlPrefix}/${slug}`,
//   fileName: `${newBase}/preview-q1.jpg`,
//   selectorPathMap: {
//     "#qq-1": `${newBase}/preview-q1.jpg`,
//     "#qq-2": `${newBase}/preview-q2.jpg`,
//     "#qq-3": `${newBase}/preview-q3.jpg`,
//     "#qq-4": `${newBase}/preview-q4.jpg`,
//     "#qq-5": `${newBase}/preview-q5.jpg`,
//     "#qq-6": `${newBase}/preview-q6.jpg`,
//     "#qq-7": `${newBase}/preview-q7.jpg`,
//   },
//   width: 1200,
//   height: 1200,
//   delayMs: 50,
// });
// await autoScreenShot({
//   url: `${siteUrlPrefix}/${slug}`,
//   fileName: `${newBase}/preview-desktop.jpg`,
//   width: 1280,
//   height: 720,
//   delayMs: 50,
// });
// await autoScreenShot({
//   url: `${siteUrlPrefix}/${slug}`,
//   fileName: `${newBase}/preview-mobile.jpg`,
//   width: 430,
//   height: 900,
//   delayMs: 50,
// });
