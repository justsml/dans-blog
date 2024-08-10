#!/usr/bin/env bun
import { globby } from "globby";
import sharp, { type FormatEnum, type Sharp } from "sharp";
import * as path from "path";
import { existsSync, rmSync } from "fs";

const config = {
  replace: true,
};

const isFileNeeded = (file: string) => {
  const exists = existsSync(file);
  if (!exists) return true;

  if (config.replace && exists) {
    rmSync(file);
    return true;
  }
  return false;
};

async function resizeImages(sourceFolder: string): Promise<void> {
  const sizes = [900, 600, 300];

  const imageFiles = await globby([
    `${sourceFolder}/**/*.{jpg,jpeg,png,gif,svg}`,
  ]).then((files) =>
    files.filter((file) => {
      if (file.includes("icon_")) return false;
      if (sizes.some((size) => file.includes(`w${size}`))) return false;
      return true;
    })
  );

  for (const file of imageFiles) {
    const dirName = path.dirname(file);
    const fileName = path.basename(file);
    const fileExtension = path.extname(file);
    const bareName = fileName.replace(fileExtension, "");

    const img = sharp(file);

    if (
      fileExtension === ".jpg" ||
      fileExtension === ".jpeg" ||
      fileExtension === ".png"
    ) {
      let ext = "jpeg";
      if (fileExtension === ".png") ext = "png";

      const iconFileName = `icon_${bareName}${fileExtension}`;
      const iconFilePath = path.join(dirName, iconFileName);
      if (!isFileNeeded(iconFilePath)) {
        console.log(`Skipping icon: ${file}`);
      } else {
        const resizedImg = img.clone().resize({ width: 2048, fit: "cover" });
        const region = await getCenterSquareRegion(resizedImg, 200);
        console.log("region", region, await getImageInfo(resizedImg));
        try {
          await resizedImg
            .extract(region)
            .toFormat(ext as "jpeg" | "png")
            .toFile(iconFilePath);
        } catch (error) {
          console.error("Error creating icon:", error, iconFilePath);
        }
      }
    }

    for (const size of sizes) {
      const outputFileName = `w${size}_${bareName}${fileExtension}`;
      const outputFilePath = path.join(dirName, outputFileName);
      if (!isFileNeeded(outputFilePath)) {
        console.log(`Skipping: ${file}`);
        continue;
      }
      const format = getValidImageType(fileExtension);
      if (format?.includes("svg")) {
        console.log(`Skipping SVG: ${file}`);
        continue;
      }
      if (!format) {
        console.error(`Invalid image format: ${fileExtension}`);
        continue;
      }
      await img
        .clone()
        .resize({
          width: size,
          fit: "cover",
          withoutEnlargement: true,
        })
        .toFormat(format)
        .toFile(outputFilePath);

      console.log(
        `Resized ${fileName} to ${size}px width, saved as ${outputFilePath}`
      );
    }
  }
}

const getCenterSquareRegion = async (file: Sharp, size: number) => {
  // Get image dimensions
  const { width, height } = await getImageInfo(file);
  if (!width || !height)
    throw new Error(`Invalid image dimensions ${width}x${height}`);

  if (size > width || size > height) {
    // no need to crop, image is smaller than the target size
    console.log("No need to crop", { width, height, size });
    return {
      left: 0,
      top: 0,
      width,
      height,
      original: { width, height },
    };
  }
  // Calculate the region to extract
  const x = Math.floor((width - size) / 2);
  const y = Math.floor((height - size) / 2);

  return {
    left: x,
    top: y,
    width: size,
    height: size,
    original: { width, height },
  };
};

async function getImageInfo(img: Sharp) {
  const { width, height, orientation, format, size } = await img.metadata();

  return (orientation || 0) >= 5
    ? { width: height, height: width, format, size }
    : { width, height, format, size };
}

const getValidImageType = (ext: string): keyof FormatEnum | undefined => {
  ext = `${ext}`.toLowerCase().trim().replace(".", "");
  if (ext === "avif") return "avif";
  if (ext === "dz") return "dz";
  if (ext === "fits") return "fits";
  if (ext === "gif") return "gif";
  if (ext === "heif") return "heif";
  if (ext === "input") return "input";
  if (ext === "jpeg") return "jpeg";
  if (ext === "jpg") return "jpg";
  if (ext === "jp2") return "jp2";
  if (ext === "jxl") return "jxl";
  if (ext === "magick") return "magick";
  if (ext === "openslide") return "openslide";
  if (ext === "pdf") return "pdf";
  if (ext === "png") return "png";
  if (ext === "ppm") return "ppm";
  if (ext === "raw") return "raw";
  if (ext === "svg") return "svg";
  if (ext === "tiff") return "tiff";
  if (ext === "tif") return "tif";
  if (ext === "v") return "v";
  if (ext === "webp") return "webp";
};
// Replace './images' with your target folder path
resizeImages("./src/content")
  .then((results) => {
    console.log("All images resized successfully", results);
  })
  .catch((error) => {
    console.error("Error resizing images:", error);
  });
