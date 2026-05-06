import { chromium } from "playwright";

const BASE_URL = process.env.PERF_BASE_URL ?? "http://localhost:4444";
const REPEATS = Number(process.env.PERF_REPEATS ?? 5);

const pages = [
  { type: "home", path: "/" },
  { type: "post", path: "/llm-connection-strings/" },
  { type: "quiz", path: "/quiz-master-modern-html5/" },
];

const networkProfile = {
  offline: false,
  latency: 40,
  downloadThroughput: (10 * 1024 * 1024) / 8,
  uploadThroughput: (5 * 1024 * 1024) / 8,
};

function percentile(values, p) {
  const sorted = [...values].sort((a, b) => a - b);
  const index = Math.min(sorted.length - 1, Math.floor(sorted.length * p));
  return sorted[index] ?? 0;
}

function median(values) {
  return percentile(values, 0.5);
}

function average(values) {
  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function round(value) {
  return Math.round(value);
}

function summarize(samples) {
  const keys = [
    "ttfb",
    "domContentLoaded",
    "load",
    "lcp",
    "fcp",
    "transferKb",
    "requests",
  ];

  return Object.fromEntries(
    keys.map((key) => [
      key,
      {
        median: round(median(samples.map((sample) => sample[key]))),
        avg: round(average(samples.map((sample) => sample[key]))),
      },
    ]),
  );
}

async function measureOne(browser, pageInfo, mode) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();
  const client = await context.newCDPSession(page);
  let transferBytes = 0;
  let requestCount = 0;

  await client.send("Network.enable");
  await client.send("Network.setCacheDisabled", {
    cacheDisabled: mode === "cold",
  });
  await client.send("Network.emulateNetworkConditions", networkProfile);
  await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });

  client.on("Network.responseReceived", () => {
    requestCount += 1;
  });
  client.on("Network.loadingFinished", (event) => {
    transferBytes += event.encodedDataLength ?? 0;
  });

  await page.addInitScript(() => {
    window.__perfLcp = 0;
    window.__perfFcp = 0;
    try {
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__perfLcp = entry.startTime;
        }
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        for (const entry of list.getEntriesByName("first-contentful-paint")) {
          window.__perfFcp = entry.startTime;
        }
      }).observe({ type: "paint", buffered: true });
    } catch {}
  });

  const url = new URL(pageInfo.path, BASE_URL).toString();

  if (mode === "warm") {
    await page.goto(url, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(500);
    transferBytes = 0;
    requestCount = 0;
    await page.reload({ waitUntil: "load", timeout: 60000 });
  } else {
    await page.goto(url, { waitUntil: "load", timeout: 60000 });
  }

  await page.waitForTimeout(1500);

  const nav = await page.evaluate(() => {
    const timing = performance.getEntriesByType("navigation")[0];
    return {
      ttfb: timing.responseStart,
      domContentLoaded: timing.domContentLoadedEventEnd,
      load: timing.loadEventEnd,
      lcp: window.__perfLcp || 0,
      fcp: window.__perfFcp || 0,
    };
  });

  await context.close();

  return {
    ...nav,
    transferKb: transferBytes / 1024,
    requests: requestCount,
  };
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const pageInfo of pages) {
    for (const mode of ["cold", "warm"]) {
      const samples = [];
      for (let index = 0; index < REPEATS; index += 1) {
        samples.push(await measureOne(browser, pageInfo, mode));
      }
      results.push({
        page: pageInfo.type,
        path: pageInfo.path,
        mode,
        summary: summarize(samples),
        samples: samples.map((sample) =>
          Object.fromEntries(
            Object.entries(sample).map(([key, value]) => [key, round(value)]),
          ),
        ),
      });
    }
  }

  await browser.close();
  console.log(JSON.stringify({ baseUrl: BASE_URL, repeats: REPEATS, results }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
