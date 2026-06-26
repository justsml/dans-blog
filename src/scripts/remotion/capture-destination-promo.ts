import { chromium } from "playwright";
import matter from "gray-matter";
import { mkdirSync, readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import path from "node:path";

type FeaturedPost = {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  date: string;
  popularity: number;
};

type CapturedPage = {
  slug: string;
  url: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  width: number;
  height: number;
  scrollTarget: number;
};

const ROOT = process.cwd();
const BASE_URL = process.env.DANLEVY_CAPTURE_BASE_URL ?? "http://127.0.0.1:4242";
const VIEWPORT = { width: 1440, height: 1400 };
const MAX_CAPTURE_HEIGHT = 3600;
const OUTPUT_DIR = path.join(ROOT, "public", "remotion", "destination-promo");
const GENERATED_FILE = path.join(ROOT, "src", "remotion", "destination-promo", "generated-pages.ts");

const cleanTitle = (value: unknown): string => String(value ?? "").replace(/\s+/g, " ").trim();

const getDateTime = (value: unknown): number => {
  if (value instanceof Date) return value.getTime();
  const parsed = new Date(String(value ?? ""));
  return Number.isNaN(parsed.getTime()) ? 0 : parsed.getTime();
};

const readFeaturedPosts = (): FeaturedPost[] => {
  const postsRoot = path.join(ROOT, "src", "content", "posts");
  const posts = readdirSync(postsRoot)
    .map((dir) => {
      const file = path.join(postsRoot, dir, "index.mdx");
      if (!existsSync(file)) return null;

      const { data } = matter(readFileSync(file, "utf8"));
      if (data.draft === true || data.publish === false || data.hidden === true || data.unlisted === true) {
        return null;
      }

      return {
        slug: dir.replace(/^\d{4}-\d{2}-\d{2}--/, ""),
        title: cleanTitle(data.title),
        subtitle: cleanTitle(data.subTitle ?? data.subtitle ?? ""),
        category: cleanTitle(data.category),
        date: new Date(getDateTime(data.date)).toISOString().slice(0, 10),
        popularity: Number(data.popularity ?? 0),
      };
    })
    .filter(Boolean) as FeaturedPost[];

  return posts
    .sort((a, b) => b.popularity - a.popularity || getDateTime(b.date) - getDateTime(a.date))
    .slice(0, 5);
};

const escapeTsString = (value: string): string => JSON.stringify(value);

const waitForPage = async (url: string): Promise<void> => {
  const response = await fetch(url, { method: "HEAD" }).catch(() => null);
  if (!response?.ok) {
    throw new Error(`Expected the blog to be running at ${url}, but got no successful response.`);
  }
};

const findInterestingScrollTarget = async (page: import("playwright").Page): Promise<number> => {
  return page.evaluate(() => {
    const viewportHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;
    const selectors = [
      "main img",
      "main figure",
      "main canvas",
      "main .expressive-code",
      "main pre",
      "main blockquote",
      "main table",
      ".article-card__media",
    ];

    const candidates = selectors
      .flatMap((selector) => Array.from(document.querySelectorAll<HTMLElement>(selector)))
      .map((element) => element.getBoundingClientRect().top + window.scrollY)
      .filter((top) => top > viewportHeight * 0.65);

    const target = candidates.length > 0 ? Math.min(...candidates) - viewportHeight * 0.2 : viewportHeight * 0.72;
    return Math.max(0, Math.min(target, Math.max(0, scrollHeight - viewportHeight)));
  });
};

const capturePage = async (
  page: import("playwright").Page,
  pageData: Omit<CapturedPage, "image" | "width" | "height" | "scrollTarget">,
  filename: string,
): Promise<CapturedPage> => {
  const url = new URL(pageData.url, BASE_URL).toString();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.emulateMedia({ reducedMotion: "reduce" });

  const metrics = await page.evaluate(() => ({
    scrollHeight: document.documentElement.scrollHeight,
  }));
  const scrollTarget = await findInterestingScrollTarget(page);
  const height = Math.min(MAX_CAPTURE_HEIGHT, Math.ceil(metrics.scrollHeight));
  const absoluteOutput = path.join(OUTPUT_DIR, filename);

  await page.setViewportSize({ width: VIEWPORT.width, height });
  await page.screenshot({ path: absoluteOutput });
  await page.setViewportSize(VIEWPORT);

  return {
    ...pageData,
    image: `remotion/destination-promo/${filename}`,
    width: VIEWPORT.width,
    height,
    scrollTarget: Math.min(scrollTarget, Math.max(0, height - VIEWPORT.height)),
  };
};

const main = async () => {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  mkdirSync(path.dirname(GENERATED_FILE), { recursive: true });

  await waitForPage(BASE_URL);

  const posts = readFeaturedPosts();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: VIEWPORT, deviceScaleFactor: 1 });

  const captured: CapturedPage[] = [];
  captured.push(
    await capturePage(
      page,
      {
        slug: "home",
        url: "/",
        title: "DanLevy.net",
        subtitle: "Sharp technical writing for AI, code, search, security, and the operational weirdness in between.",
        category: "Home",
      },
      "home.png",
    ),
  );

  for (const post of posts) {
    captured.push(
      await capturePage(
        page,
        {
          slug: post.slug,
          url: `/${post.slug}/`,
          title: post.title,
          subtitle: post.subtitle,
          category: post.category,
        },
        `${post.slug}.png`,
      ),
    );
  }

  await browser.close();

  const file = `export type DestinationPage = {
  slug: string;
  url: string;
  title: string;
  subtitle: string;
  category: string;
  image: string;
  width: number;
  height: number;
  scrollTarget: number;
};

export const destinationPages = [
${captured
  .map(
    (item) => `  {
    slug: ${escapeTsString(item.slug)},
    url: ${escapeTsString(item.url)},
    title: ${escapeTsString(item.title)},
    subtitle: ${escapeTsString(item.subtitle)},
    category: ${escapeTsString(item.category)},
    image: ${escapeTsString(item.image)},
    width: ${item.width},
    height: ${item.height},
    scrollTarget: ${Math.round(item.scrollTarget)},
  },`,
  )
  .join("\n")}
] satisfies DestinationPage[];
`;

  writeFileSync(GENERATED_FILE, file);
  console.log(`Captured ${captured.length} pages for DestinationPromo.`);
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
