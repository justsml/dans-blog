import sharp from "sharp";

type RGB = [number, number, number];

// Build-time hero colours: the four most vivid, mutually distinct tones of a 6×6 reduction, as hex.
// Pages paint their background from these before any image decodes or script runs.
// Translations share a hero, so each source image is read once per build.
const cache = new Map<string, Promise<string[] | null>>();

const chroma = ([r, g, b]: RGB) => Math.max(r, g, b) - Math.min(r, g, b);
const distance = (a: RGB, b: RGB) => Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
const hex = (rgb: RGB) => `#${rgb.map((c) => c.toString(16).padStart(2, "0")).join("")}`;

async function extract(path: string) {
  const data = await sharp(path).resize(6, 6, { fit: "cover" }).removeAlpha().raw().toBuffer();
  const pixels: RGB[] = [];
  for (let i = 0; i + 2 < data.length; i += 3) pixels.push([data[i], data[i + 1], data[i + 2]]);
  pixels.sort((a, b) => chroma(b) - chroma(a));
  const picks: RGB[] = [];
  for (const minGap of [64, 32, 0]) {
    for (const pixel of pixels) if (picks.length < 4 && picks.every((p) => distance(p, pixel) > minGap)) picks.push(pixel);
  }
  return picks.map(hex);
}

// `fsPath` is the original file Astro attaches (non-enumerably) to imported image metadata.
export function heroPalette(image: unknown): Promise<string[] | null> {
  const path = (image as { fsPath?: string } | null)?.fsPath;
  if (!path) return Promise.resolve(null);
  if (!cache.has(path)) cache.set(path, extract(path).catch(() => null));
  return cache.get(path)!;
}

export const paletteStyle = (colors: string[] | null) =>
  colors ? colors.map((color, i) => `--hero-${i + 1}:${color}`).join(";") : "";
