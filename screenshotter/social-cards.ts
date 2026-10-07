import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import sharp from "sharp";

const site = process.env.SITE_URL ?? "http://localhost:4242";
const filterIndex = process.argv.indexOf("--filter");
const filter = filterIndex >= 0 ? process.argv[filterIndex + 1] : undefined;
const response = await fetch(new URL("/social-card/manifest.json", site));
if (!response.ok) throw new Error(`Social card manifest: ${response.status}`);
const items = (
  (await response.json()) as {
    slug: string;
    sourceDir?: string;
    locale?: string;
  }[]
).filter((item) => !filter || item.slug.includes(filter));
const browser = await chromium.launch();
let next = 0;
try {
  await Promise.all(
    Array.from({ length: 3 }, async () => {
      const page = await browser.newPage({
        viewport: { width: 1200, height: 630 },
        deviceScaleFactor: 1,
      });
      while (next < items.length) {
        const index = next++;
        const { slug } = items[index];
        const result = await page.goto(
          new URL(`/social-card/${slug}/`, site).toString(),
        );
        if (!result?.ok()) throw new Error(`${slug}: ${result?.status()}`);
        await page.evaluate(async () => {
          await document.fonts.ready;
          await Promise.all(
            Array.from(document.images).map((image) => image.decode()),
          );
        });
        const overflow = await page.evaluate(() => {
          const feature = document.querySelector(".feature");
          const copy = document.querySelector(".copy");
          if (!feature || !copy) return false;
          return (
            copy.getBoundingClientRect().height >
            feature.getBoundingClientRect().height - 48
          );
        });
        if (overflow)
          await page.addStyleTag({
            content:
              ".copy h1{font-size:42px!important}.dek{font-size:20px!important}",
          });
        const output = join("public/social", `${slug}.png`);
        await mkdir(dirname(output), { recursive: true });
        const png = await sharp(await page.locator(".social-card").screenshot())
          .png({ compressionLevel: 9 })
          .toBuffer();
        await Bun.write(output, png);
        const item = items[index];
        if (item.sourceDir && item.locale === "en") {
          const webp = await sharp(png).webp({ quality: 90 }).toBuffer();
          for (const name of ["desktop-social.webp", "mobile-social.webp"]) {
            await Bun.write(
              join("src/content/posts", item.sourceDir, name),
              webp,
            );
          }
        }
        if (slug === "open-source-journal") {
          await mkdir("public/previews/open-source-journal", {
            recursive: true,
          });
          for (const name of ["desktop-social.webp", "mobile-social.webp"])
            await sharp(png)
              .webp({ quality: 90 })
              .toFile(join("public/previews/open-source-journal", name));
        }
        if (slug === "home")
          await sharp(png)
            .webp({ quality: 92 })
            .toFile("src/assets/social-banner.webp");
        console.log(`${index + 1}/${items.length} ${output}`);
      }
      await page.close();
    }),
  );
} finally {
  await browser.close();
}
