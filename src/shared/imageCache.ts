import { getImage } from "astro:assets";

const getBaseName = (path: string) => {
  const parts = path.split("/");
  return parts.slice(parts.length - 2, parts.length).join("/");
};

export const images = import.meta.glob<{ default: ImageMetadata }>(
  "/src/content/posts/**/*.{jpeg,jpg,png,gif,svg,webp}",
  {
    eager: true,
  },
);

const imagePaths = Object.fromEntries(
  Object.entries(images).map(([path, image]) => {
    return [getBaseName(path), image];
  }),
);

export type ResponsiveImagesType = {
  mobile: ImageMetadata | Promise<ImageMetadata>;
  tablet: ImageMetadata | Promise<ImageMetadata>;
  desktop: ImageMetadata | Promise<ImageMetadata>;

  large: ImageMetadata | Promise<ImageMetadata>;
};

const responsiveImages:
  | Record<string, ResponsiveImagesType>
  | [string, ResponsiveImagesType][] = (await Promise.all(
  Object.entries(images).map(async ([path, image]) => {
    const imgImport = image.default;
    // console.log("imgImport", imgImport);
    if (!imgImport) return [path, null];
    return [
      path,
      {
        mobile: getImage({ src: imgImport, width: 240 }),
        tablet: getImage({ src: imgImport, width: 360 }),
        desktop: getImage({ src: imgImport, width: 640 }),
        large: getImage({ src: imgImport, width: 960 }),
      },
    ];
  }),
).catch(console.error)) as unknown as Record<string, ResponsiveImagesType>;

export const getResponsiveImage = (imagePath: string) => {
  let responsiveImageLookup: Record<string, ResponsiveImagesType> | undefined;
  if (Array.isArray(responsiveImages)) {
    responsiveImageLookup = Object.fromEntries(responsiveImages);
  }
  if (!responsiveImages) return;
  return responsiveImages[imagePath] || responsiveImageLookup?.[imagePath];
};
// console.log("responsiveImages", responsiveImages);

export const getImageProps = (
  imagePath: string,
  // responsiveLevel: "mobile" | "tablet" | "desktop" | "large" = "desktop"
) => {
  // console.log('images:', images, 'imagePath:', imagePath);
  if (!imagePaths[imagePath])
    throw new Error(
      `"${imagePath}" does not exist in glob: "src/assets/*.{jpeg,jpg,png,gif,svg,webp}"`,
    );

  return imagePaths[imagePath].default;
};

/**
 * Convert paths like:
 * `/@fs/Users/dan/code/oss/dans-blog-v3/src/content/posts/2024-01-16--contribute-to-open-source-the-easy-way/open-source-high-life.webp?origWidth=1020&origHeight=673&origFormat=webp`
 *
 * Into:
 *
 * `/src/content/posts/2024-01-16--contribute-to-open-source-the-easy-way/open-source-high-life.webp`
 *
 */
export const getSrcPath = (imagePath: string) => {
  if (imagePath.includes("dans-blog-v3"))
    imagePath = imagePath.split("dans-blog-v3")[1];
  if (imagePath.includes("?")) imagePath = imagePath.split("?")[0];

  return imagePath;
};
