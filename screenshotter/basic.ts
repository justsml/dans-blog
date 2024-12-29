/**
 * Run this script to take screenshots of a list of URLs
 * 
 * ```bash
 * bun run ./screenshotter/basic.ts \
 *   --output ./.screens \
 *   --url https://danlevy.net/javascript-promises-quiz/,https://danlevy.net/js-quiz-14-date-time-questions-test-your-knowledge/
 * ```
 * 
 * @packageDocumentation
 * @module ScreenshotterBasic
 * @category Scripts
 * 
 */
import fs from "node:fs";
import path from "node:path";
import ScreenshotService from "../src/components/Screenshots/PageScreenshot.ts";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { slugify } from "../src/shared/pathHelpers.ts";

type AutoScreenShotOptions = {
  url: string;
  fileName: string;
  selectorPathMap?: Record<string, string>;
  maxAgeSeconds?: number;
  failOnMissing?: boolean | "production";
  width?: number;
  height?: number;
  selector?: string;
  scrollTo?: string;
  delayMs?: number;
  zoom?: number;
};

const argv = await yargs(hideBin(process.argv))
  .option("urls", {
    alias: ["u", "url"],
    type: "string",
    demandOption: true,
    describe: "Comma-separated list of URLs to screenshot",
  })
  .option("output", {
    type: "string",
    demandOption: true,
    describe: "Output directory for screenshots",
  })
  .option("prefix", {
    type: "string",
    describe: "Prefix for screenshot filenames",
  })
  .help()
  .argv;

  const urls = argv.urls?.split(",");
  const output = argv.output;

console.log("Starting screenshots");
const screenshotPromises = urls.map((url: string): Promise<string> =>
  autoScreenShot({
    url,
    fileName: path.join(output, `${argv.prefix || ""}${slugify(url).replace(/-$/, '')}.jpg`),
    
  }),
);
await Promise.all(screenshotPromises).catch(console.error);

const screenshotPromisesMobile = urls.map((url: string): Promise<string> =>
  autoScreenShot({
    url,
    fileName: path.join(output, `${argv.prefix || ""}${slugify(url).replace(/-$/, '')}-mobile.jpg`),
    width: 385,
    height: 812,
    
  }),
);
await Promise.all(screenshotPromisesMobile).catch(console.error);

console.log("Screenshots complete");

async function autoScreenShot({
  url,
  fileName,
  // maxAgeSeconds = ms("3 months") / 1000,
  // maxAgeSeconds = 86_400 * 7, // 1 week
  failOnMissing,
  width = 880,
  height = 2650,
  delayMs = 4250,
  selector,
  selectorPathMap,
  scrollTo,
  zoom,
}: AutoScreenShotOptions) {
  const screenshotService = new ScreenshotService();

  const isPathComplete = (s: string) =>
    s.startsWith("/") &&
    (s.endsWith(".png") || s.endsWith(".jpg") || s.endsWith(".jpeg"));

  const outputPath = isPathComplete(fileName)
    ? fileName
    : path.join(process.cwd(), fileName);

  const displayPath =
    path.basename(path.dirname(outputPath)) + "/" + path.basename(outputPath);

  const screenshotExists = fs.existsSync(outputPath);

  if (screenshotExists) {
    // const { mtime } = fs.statSync(outputPath);
    // const ageSeconds = (Date.now() - mtime.getTime()) / 1000;
    // TODO Remove file 
    console.log(`Screenshot ${displayPath} is seconds old`);
  }

  try {
    console.time(`Screenshot ${displayPath}`);
    await screenshotService.init();
    await screenshotService.createScreenshot({
      url,
      outputPath,
      width,
      height,
      delayMs,
      scrollTo,
      selector,
      selectorPathMap,
      zoom,
      overrideClassName: "",
    });
    console.log(`Created ${outputPath}`);
  } catch (error) {
    console.error(
      // @ts-expect-error
      `Error creating screenshot ${displayPath}: ${error?.message}`,
    );
    if (failOnMissing === true) {
      throw error;
    } else if (failOnMissing === "production") {
      if (process.env.NODE_ENV === "production") {
        throw error;
      }
    }
  } finally {
    await screenshotService.close();
    console.timeEnd(`Screenshot ${displayPath}`);
  }
  return outputPath;
};
