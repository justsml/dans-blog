import { mkdir } from "fs/promises";
import path, { dirname, join } from "path";
import { autoScreenShot } from "../src/components/Screenshots/AutoScreenShot.ts";
import getSiteRss from "./get-site.ts";
import ScreenshotService from "../src/components/Screenshots/PageScreenshot.ts";
import { RSSFeedItem } from "@astrojs/rss";
import { makeLogs } from "../src/components/LogHelper.ts";
import { Page } from "playwright";
let count = 0;
const log = makeLogs("screenshotter");

const screenshotService = new ScreenshotService();
const siteUrlPrefix = "http://localhost:4321";
const basePath = `/tmp/screenshots`;
const rssFeed = await getSiteRss(siteUrlPrefix, "/rss.json");

console.log("RSS FEED: ", rssFeed.items[0]);

console.log("Loading RSS FEED: ", rssFeed.items.length);

async function handlePost(post: RSSFeedItem, index?: number) {
  if (index! < 3) console.log("POST: ", post);
}

await screenshotService.init();

const firstItem = rssFeed.items[0];

await generateImages(buildArgs(firstItem as RSSFeedItem & { slug: string }));
// for (let item of rssFeed.items) {
//   count++;
//   console.log("COUNT: ", count);
//   const args = buildArgs(item);

//   await generateImages(args);
// }
// const results = Promise.allSettled(rssFeed.items.map(handlePost));
screenshotService.close();

function buildArgs(rssItem: RSSFeedItem & {
  slug: string;
}): ScreenshotTask {
  let { title, slug, link, categories, description } = rssItem;
  link = `${siteUrlPrefix}${link}`;

  // const category = categories![0];

  // const category = link!.split("/")[1];
  // const titleParts = title!.split(":");
  // const titleSlug = titleParts[0].trim().replace(/ /g, "-");
  // const titleName = titleParts[1].trim();
  const isQuiz = categories?.includes("Quiz") || categories?.includes("quiz");

  let selectorPathMap = isQuiz ?{
    "#qq-1": join(`${basePath}`, `${slug}/q1.jpg`),
    "#qq-2": join(`${basePath}`, `${slug}/q2.jpg`),
    "#qq-3": join(`${basePath}`, `${slug}/q3.jpg`),
    "#qq-4": join(`${basePath}`, `${slug}/q4.jpg`),
    "#qq-5": join(`${basePath}`, `${slug}/q5.jpg`),
    "#qq-6": join(`${basePath}`, `${slug}/q6.jpg`),
    "#qq-7": join(`${basePath}`, `${slug}/q7.jpg`),
    "#qq-8": join(`${basePath}`, `${slug}/q8.jpg`),
    "#qq-9": join(`${basePath}`, `${slug}/q9.jpg`),
    "#qq-10": join(`${basePath}`, `${slug}/q10.jpg`),
  } : {
    ".article": join(`${basePath}`, `${slug}/article.jpg`),
  };

  return {
    [`${link}`]: {
      fileName: join(`${basePath}`, `${slug}/main.jpg`),
      selectorPathMap,
      sizes: [
        { fileName: join(`${basePath}`, `${slug}/desktop.jpg`), width: 1280, height: 720 },
        { fileName: join(`${basePath}`, `${slug}/mobile.jpg`), width: 430, height: 900 },
      ],
      delayMs: 50,
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

async function generateImages(args: ScreenshotTask) {
  const startTime = Date.now();
  for (const [url, options] of Object.entries(args)) {
    const { selectorPathMap, sizes, scrollTo, delayMs, zoom } =
      options;


    const page = await screenshotService.goToUrl(url);
    applyClassName(page, "screenshot-mode");
    if (zoom && zoom > 0 && zoom < 10) {
      await page.evaluate(`document.body.style.zoom = ${zoom}`);
    }

    if (sizes) {
      for await (const { fileName, width, height } of sizes) {
        const newFile = fileName.startsWith("/") ? fileName : path.join(process.cwd(), fileName);
        
        log(`Creating screenshot ${newFile}`);
        await mkdir(dirname(newFile), { recursive: true });
        count++;
        if (scrollTo) applyScrollTo(page, scrollTo);
        page.setViewportSize({ width, height });
        if (delayMs) await page.waitForTimeout(delayMs);
        await page.screenshot({
          quality: 100,
          path: newFile,
        });
      }
    }

    if (selectorPathMap) {
      for await (const [selector, fileName] of Object.entries(selectorPathMap)) {
        const newFile = fileName.startsWith("/") ? fileName : path.join(process.cwd(), fileName);
        log(`Screenshot for ${selector}: ${newFile}`);
        const element = await page.$(selector);
        if (!element) {
          console.warn(`Element with selector '${selector}' not found. Skipping.`);
          continue;
          // throw new Error(`Element with selector '${selector}' not found`);
        }
        // delay 1000ms to wait for the element to be fully loaded
        // await page.waitForTimeout(delayMs ?? 1000);
        await element.screenshot({
          path: newFile,
          quality: 100,
          scale: "device",
        });
        console.log(`Screenshot saved to ${newFile}`);
      }
    }
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
