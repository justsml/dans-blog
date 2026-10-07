import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import sharp from "sharp";
import { applyScreenshotMode } from "../src/components/Screenshots/screenshotMode";

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
)
  .filter((item) => !filter || item.slug.includes(filter))
  .filter(
    (item) =>
      !process.argv.includes("--missing") ||
      !existsSync(join("public/social", `${item.slug}.jpg`)),
  );
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
        await page.addStyleTag({
          content: await Bun.file(
            new URL("../src/styles/social-card.css", import.meta.url),
          ).text(),
        });
        await page.evaluate(async () => {
          await document.fonts.ready;
          await Promise.all(
            Array.from(document.images).map((image) => image.decode()),
          );
        });
        await page.evaluate(() => {
          const feature = document.querySelector<HTMLElement>(".feature");
          const copy = document.querySelector<HTMLElement>(".copy");
          const title = copy?.querySelector<HTMLElement>("h1");
          const sheet = document.querySelector<HTMLElement>(".quiz-sheet");
          const question = sheet?.querySelector<HTMLElement>("h2");
          const prompt = sheet?.querySelector<HTMLElement>("p");
          if (sheet && question && prompt) {
            let questionSize = parseFloat(getComputedStyle(question).fontSize);
            while (
              prompt.getBoundingClientRect().bottom >
                sheet.getBoundingClientRect().bottom - 18 &&
              questionSize > 18
            ) {
              question.style.fontSize = `${--questionSize}px`;
            }
            if (
              prompt.getBoundingClientRect().bottom >
              sheet.getBoundingClientRect().bottom - 18
            )
              throw new Error("Quiz preview does not fit");
          }
          if (!feature || !copy || !title) return;
          let size = parseFloat(getComputedStyle(title).fontSize);
          while (
            copy.getBoundingClientRect().height > feature.clientHeight - 48 &&
            size > 32
          ) {
            title.style.fontSize = `${--size}px`;
          }
          if (copy.getBoundingClientRect().height > feature.clientHeight - 48) {
            throw new Error("Social card title does not fit");
          }
        });
        const output = join("public/social", `${slug}.jpg`);
        await mkdir(dirname(output), { recursive: true });
        const capture = await page.locator(".social-card").screenshot();
        const encoded = await sharp(capture)
          .jpeg({ quality: 92, mozjpeg: true })
          .toBuffer();
        await Bun.write(output, encoded);
        const item = items[index];
        if (item.sourceDir && item.locale === "en") {
          const webp = await sharp(capture).webp({ quality: 90 }).toBuffer();
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
          for (const name of ["desktop-social.webp", "mobile-social.webp"]) {
            const webp = await sharp(capture).webp({ quality: 90 }).toBuffer();
            await Bun.write(
              join("public/previews/open-source-journal", name),
              webp,
            );
            await Bun.write(
              join("src/content/posts/open-source-journal", name),
              webp,
            );
          }
        }
        if (slug === "home") {
          const homeCard = await sharp(capture)
            .webp({ quality: 92 })
            .toBuffer();
          await Bun.write("src/assets/social-banner.webp", homeCard);
          for (const name of ["desktop-social.webp", "mobile-social.webp"]) {
            await Bun.write(join("src/content/posts", name), homeCard);
          }
          for (const dimension of [
            { name: "desktop", width: 800, height: 720 },
            { name: "mobile", width: 480, height: 960 },
          ]) {
            await page.setViewportSize({
              width: dimension.width,
              height: dimension.height,
            });
            await page.goto(site);
            await applyScreenshotMode(page, `${dimension.name}-shot`);
            await page.evaluate(async () => {
              await document.fonts.ready;
              await Promise.all(
                Array.from(document.images).map((image) => {
                  image.loading = "eager";
                  return image.decode().catch(() => undefined);
                }),
              );
            });
            const preview = await sharp(await page.screenshot())
              .webp({ quality: 90 })
              .toBuffer();
            await Bun.write(
              join("src/content/posts", `${dimension.name}.webp`),
              preview,
            );
          }
          await page.setViewportSize({ width: 1200, height: 630 });
        }
        console.log(`${index + 1}/${items.length} ${output}`);
      }
      await page.close();
    }),
  );
} finally {
  await browser.close();
}
