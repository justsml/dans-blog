// Module to support running cwebp to convert images to webP format
// cwebp -q 90 "$file" -o "${file%.*}.webp"

import { execFile } from "child_process";
import { rm } from "fs/promises";
import { promisify } from "util";

const execFileAsync = promisify(execFile);

export async function convertToWebP(file: string) {
  if (/\.gif$/i.test(file))
    throw new Error(
      "Cannot convert GIFs to webP (todo: add support for `gif2webp`)",
    );
  try {
    const newFileName = file.replace(/\.[^.]+$/, ".webp");

    await rm(newFileName, { force: true }).catch(() => {});

    await execFileAsync("cwebp", ["-q", "90", file, "-o", newFileName]);
    return newFileName;
  } catch (error) {
    // @ts-ignore
    console.error(`Error converting ${file} to webP: ${error.message}`);
    console.error(`🚨 Make sure cwebp is installed and in your PATH.`);
    throw error;
  }
}

export const isFileSupported = (file: string) => /\.(jpe?g|png)$/i.test(file);
