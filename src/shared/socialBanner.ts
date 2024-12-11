import sharp from 'sharp';

interface ResizeOptions {
  width?: number;
  height?: number;
}
/**
 * Use the default options to resize and crop
 * the image for most social media platforms.
 */
export async function resizeAndCrop(
  inputPath: string,
  outputPath: string,
  { width = 1200, height = 628 }: ResizeOptions = {}
): Promise<void> {

  await sharp(inputPath)
    .resize({
      width,
      height,
      fit: 'cover',
      position: 'top'
    })
    .toFile(outputPath);
}
