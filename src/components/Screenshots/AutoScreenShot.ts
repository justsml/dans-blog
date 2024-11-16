import fs, { createReadStream } from "node:fs";
import path from "node:path";
import ScreenshotService from "./PageScreenshot.ts";
import ms from "ms";

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

export const autoScreenShot = async ({
  url,
  fileName,
  // maxAgeSeconds = ms("3 months") / 1000,
  maxAgeSeconds = 86_400 * 7, // 1 week
  failOnMissing,
  height = 600,
  width = 1200,
  delayMs = 10,
  selector,
  selectorPathMap,
  scrollTo,
  zoom,
}: AutoScreenShotOptions) => {
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
    const { mtime } = fs.statSync(outputPath);
    const ageSeconds = (Date.now() - mtime.getTime()) / 1000;
    
    if (ageSeconds < maxAgeSeconds) {
      // console.log(`Skipping screenshot ${displayPath} as it's still fresh`);
      return createReadStream(outputPath, { encoding: "utf8" });
    }
    console.log(`Screenshot ${displayPath} is ${ageSeconds} seconds old`);
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
  return createReadStream(outputPath, { encoding: "utf8" });
};
