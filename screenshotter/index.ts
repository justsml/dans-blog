import { mkdir } from "fs/promises";
import path, { dirname, join } from "path";
import getSiteRss, { RssishItem } from "./get-site.ts";
import ScreenshotService from "../src/components/Screenshots/PageScreenshot.ts";
import { makeLogs } from "../src/components/LogHelper.ts";
import { ElementHandle, Page } from "playwright";
import * as webP from "@/shared/webP.ts";
import { rmSync } from "fs";
import { resizeAndCrop } from "../src/shared/socialBanner.ts";
import { saveAltText } from "./siteHelpers.ts";

const { SITE_URL } = process.env;

let count = 0;
const log = makeLogs("screenshotter");

const screenshotService = new ScreenshotService();
const siteUrlPrefix = SITE_URL ?? "http://localhost:4321";
const rssFeed = await getSiteRss(siteUrlPrefix, "/rss.json");

// get --filter=arg
let filterArg = process.argv.find((arg) => arg.startsWith("--filter="));
filterArg = filterArg?.split("=")[1];
if (filterArg) {
  log(`Filtering RSS feed (${rssFeed.items.length}) for: ${filterArg}. `);
  rssFeed.items = rssFeed.items.filter(
    (item) =>
      item.categories?.includes(filterArg) ||
      item.title?.includes(filterArg) ||
      item.slug?.includes(filterArg),
  );
  log(
    `Filtered feed from ${rssFeed.items.length} to ${rssFeed.items.length} items`,
  );
}

let basePath = `/tmp/screenshots`;

// console.log("RSS FEED: ", rssFeed.items[0]);

console.log("Loading RSS FEED: ", rssFeed.items.length);

// async function handlePost(post: RSSFeedItem, index?: number) {
//   if (index! < 3) console.log("POST: ", post);
// }

await screenshotService.init();

// const firstItem = rssFeed.items[0];

// await generateImages(buildArgs(firstItem as RSSFeedItem & { slug: string }));
for await (let item of rssFeed.items) {
  count++;
  console.log("COUNT: ", count);

  const args = buildArgs(item);

  await generateImages(args);
  // if (count > 0) break;
}
// const results = Promise.allSettled(rssFeed.items.map(handlePost));
screenshotService.close();

function buildArgs(rssItem: RssishItem): ScreenshotTask {
  let contentPath = "";
  let { slug, link, categories } = rssItem;
  link = `${siteUrlPrefix}${link}`;

  // const category = categories![0];

  // const category = link!.split("/")[1];
  // const titleParts = title!.split(":");
  // const titleSlug = titleParts[0].trim().replace(/ /g, "-");
  // const titleName = titleParts[1].trim();
  const isQuiz = categories?.includes("Quiz") || categories?.includes("quiz");

  if (rssItem.sourcePath) {
    contentPath = `${process.cwd()}/src/content/posts/${dirname(rssItem.sourcePath)}`;
    basePath = `${process.cwd()}/public/previews/${dirname(rssItem.sourcePath)}`;
    // contentPath = `${basePath}`;
    log("BASE PATH: ", basePath);
    log("CONTENT PATH: ", contentPath);
    // process.exit(0);
  } else {
    basePath = `/tmp/screenshots/${slug}`;
  }

  let selectorPathMap: Record<string, string> = isQuiz
    ? {
        "#qq-1": join(`${basePath}`, `/q1.jpg`),
        "#qq-2": join(`${basePath}`, `/q2.jpg`),
        "#qq-3": join(`${basePath}`, `/q3.jpg`),
        "#qq-4": join(`${basePath}`, `/q4.jpg`),
        "#qq-5": join(`${basePath}`, `/q5.jpg`),
        "#qq-6": join(`${basePath}`, `/q6.jpg`),
        "#qq-7": join(`${basePath}`, `/q7.jpg`),
        "#qq-8": join(`${basePath}`, `/q8.jpg`),
        "#qq-9": join(`${basePath}`, `/q9.jpg`),
        "#qq-10": join(`${basePath}`, `/q10.jpg`),
        "#qq-11": join(`${basePath}`, `/q11.jpg`),
        "#qq-12": join(`${basePath}`, `/q12.jpg`),
        "#qq-13": join(`${basePath}`, `/q13.jpg`),
        "#qq-14": join(`${basePath}`, `/q14.jpg`),
        "#qq-15": join(`${basePath}`, `/q15.jpg`),
        "#qq-16": join(`${basePath}`, `/q16.jpg`),
        "#qq-17": join(`${basePath}`, `/q17.jpg`),
        "#qq-18": join(`${basePath}`, `/q18.jpg`),
        "#qq-19": join(`${basePath}`, `/q19.jpg`),
        "#qq-20": join(`${basePath}`, `/q20.jpg`),
      }
    : {
        // TODO: Re-enable this when we can control the height of the page/viewport
        // "main.article": join(`${basePath}`, `/main.jpg`),
      };

  return {
    [`${link}`]: {
      fileName: join(`${contentPath}`, `/main.jpg`),
      selectorPathMap,
      sizes: [
        {
          fileName: join(`${contentPath}`, `/desktop.jpg`),
          width: 800,
          height: 720,
          classModifier: "desktop-shot",
          postProcess: "resizeAndCrop",
        },
        {
          fileName: join(`${contentPath}`, `/mobile.jpg`),
          width: 480,
          height: 960,
          classModifier: "mobile-shot",
          postProcess: "resizeAndCrop",
        },
      ],
      delayMs: 150,
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
  classModifier?: string;
  postProcess?: undefined | "resizeAndCrop";
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

const checkForAutoRefresh = async (error: Error) => {
  if (
    error.message.includes("context") &&
    error.message.includes("a navigation")
  ) {
    console.error(
      `WARNING: DONT TRY TAKE SCREENSHOTS AGAINST A LIVE DEV SERVER - INFINITE RELOAD LOOP POSSIBLE. STATICALLY BUILD SITE & SERVE IT LOCALLY!`,
    );
    process.exit(42);
  }
  return false;
};
async function addClassName(page: Page, overrideClassName: string) {
  if (overrideClassName) {
    const _classes = await page
      .evaluate((overrideClassName) => {
        document.body.classList.add(overrideClassName);
        return document.body.classList.value;
      }, overrideClassName)
      .catch((e) => {
        console.error(`Error adding class ${overrideClassName}: ${e?.message}`);
        checkForAutoRefresh(e);
      });
    // console.log("Applied classes: ", classes);
  }
}

async function resetViewport(page: Page) {
  await page.setViewportSize({ width: 1280, height: 720 });
}

/** Converts supported files to webp in same path */
async function takeScreenshot(ctx: Page | ElementHandle, fileName: string) {
  await ctx.screenshot({
    quality: 100,
    path: fileName,
    timeout: 30_000,
  });
  if (webP.isFileSupported(fileName)) {
    try {
      const webpFile = await webP.convertToWebP(fileName);
      rmSync(fileName);
      return webpFile;
    } catch (error) {
      // @ts-ignore
      console.error(
        // @ts-ignore
        `🚨🚨 Error! Converting ${fileName} to webP: ${error?.message}`,
      );
      return fileName;
    }
  }
  return fileName;
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
      log("Browser loading %s", url);
      page = await screenshotService.goToUrl(url);
    } else {
      log("Navigating to %s", url);
      await page.goto(url);
    }
    addClassName(page, "screenshot-mode");
    if (zoom && zoom > 0 && zoom < 10) {
      await page.evaluate(`document.body.style.zoom = ${zoom}`);
    }
    await page.waitForTimeout(delayMs ?? 1000);

    // Get main screenshots based on sizes
    if (sizes) {
      for await (const {
        fileName,
        width,
        height,
        classModifier,
        postProcess,
      } of sizes) {
        const newFile = fileName.startsWith("/")
          ? fileName
          : path.join(process.cwd(), fileName);

        log(`Creating screenshot ${newFile}`);
        await mkdir(dirname(newFile), { recursive: true });
        await page.reload();
        await addClassName(page, "screenshot-mode");
        if (classModifier) await addClassName(page, classModifier);

        if (scrollTo) await applyScrollTo(page, scrollTo);
        await page.setViewportSize({ width, height });
        const outputFile = await takeScreenshot(page, newFile);
        if (postProcess === "resizeAndCrop") {
          const socialBannerPath = outputFile
            .replace(".jpg", "-social.jpg")
            .replace(".webp", "-social.webp");
          await resizeAndCrop(outputFile, socialBannerPath, {
            width: 1200,
            height: 628,
          });
        }
        log(`Screenshot saved to ${outputFile}`);
      }
    }

    await resetViewport(page);

    // get any additional screenshots based on selectorPathMap
    if (selectorPathMap) {
      if (page.isClosed()) {
        page = await screenshotService.goToUrl(url);
      }
      // if (page.)
      await page.reload().catch((e) => {
        console.error(`Error reloading page: ${e?.message}`);
      });
      await addClassName(page, "screenshot-mode");

      await page.evaluate(() => {
        if (window.__superHackFix_patchOptionsListWithActualHeight) {
          console.log("Patching options list!");
          const scriptResult = window.__superHackFix_patchOptionsListWithActualHeight();
          console.log("Patched options list!", scriptResult);
        }
      });

      
      for await (const [selector, fileName] of Object.entries(
        selectorPathMap,
      )) {
        const newFile = fileName.startsWith("/")
          ? fileName
          : path.join(process.cwd(), fileName);
        log(`Screenshot for ${selector}: ${newFile}`);
        await addClassName(page, "screenshot-mode");
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
        // await Promise.resolve(newFile)
        await takeScreenshot(element, newFile)
          .then((outputFile) => {
            const altTxtPath = outputFile
              .replace(/\.[a-z]{3,4}$/i, "-alt.txt")
              .replace(".webp", "-alt.txt")
              .replace(".png", "-alt.txt");
            console.log(`Screenshot saved to ${outputFile}`);
            return saveAltText(element, altTxtPath);
          })
          .catch((e) => {
            console.error(
              `Error creating screenshot ${newFile}: ${e?.message}`,
            );
          });
      }
    }
    try {
      await page.waitForTimeout(50);
      // close page
      await page.close();
    } catch (e) {
      // @ts-ignore
      console.error(`Error waiting for page to load: ${e?.message}`);
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
