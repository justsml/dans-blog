import fs from "node:fs";
import path from "node:path";
import ScreenshotService from "./PageScreenshot.ts";

type AutoScreenShotOptions = {
  fileName: string;
  url: string;
  maxAgeSeconds: number;
  failOnMissing: boolean | 'production';
  width?: number;
  height?: number;
  selector?: string;
  scrollTo?: string;
  delayMs?: number;
  zoom?: number;
};

export const autoScreenShot = async ({
  fileName,
  url,
  maxAgeSeconds,
  failOnMissing,
  height = 600,
  width = 1200,
  selector,
  scrollTo,
  delayMs = 10,
  zoom,

}: AutoScreenShotOptions) => {

  const screenshotService = new ScreenshotService();

  const outputPath = path.join(
    process.cwd(),
    "public",
    "screenshots",
    fileName
  );

  const screenshotExists = fs.existsSync(outputPath);

  if (screenshotExists) {
    const { mtime } = fs.statSync(outputPath);
    const ageSeconds = (Date.now() - mtime.getTime()) / 1000;
    console.log(`Screenshot ${fileName} is ${ageSeconds} seconds old`);


    if (ageSeconds < maxAgeSeconds) {
      console.log(`Skipping screenshot ${fileName} as it's still fresh`);
      return;
    }
  }

  console.time(`Screenshot ${fileName}`);
  try {
    await screenshotService.init();
    await screenshotService.createScreenshot({
      url,
      outputPath,
      width,
      height,
      delayMs,
      scrollTo,
      selector,
      zoom,
    });
    console.log(`Screenshot ${fileName} created`);
  } catch (error) {
    // @ts-expect-error
    console.error(`Error creating screenshot ${fileName}: ${error?.message}`);
    if (failOnMissing === true) {
      throw error;
    } else if (failOnMissing === 'production') {
      if (process.env.NODE_ENV === 'production') {
        throw error;
      }
    }
    
  } finally {
    await screenshotService.close();
  }
  console.timeEnd(`Screenshot ${fileName}`);
  return 
}
