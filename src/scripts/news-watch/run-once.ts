import { NEWS_WATCH_DB_PATH, NEWS_WATCH_ITEM_DIR, getSources } from "./config.ts";
import { runWithConcurrency } from "./concurrency.ts";
import { openNewsWatchDb, type UnextractedItemRow } from "./db.ts";
import { extractEntitiesForPendingItems, isExtractionConfigured } from "./extract.ts";
import { fmtDuration, printTable, truncate } from "./format.ts";
import { writeItemMarkdown } from "./markdown.ts";
import { scoreRelevance } from "./relevance.ts";
import { fetchRedditPage, fetchSource } from "./sources.ts";
import { detectTrendSignal, engagementScore, makeItemId, makeTopicKey } from "./trend.ts";
import type { CapturedItem, SourceSpec, TrendSignal } from "./types.ts";

const RATE_LIMIT_BACKOFF_MINUTES = 15;
const SOURCE_FETCH_CONCURRENCY = Math.max(1, Number.parseInt(process.env.NEWS_WATCH_CONCURRENCY ?? "4", 10));

type RunOptions = {
  all?: boolean;
  sourceKeys?: string[];
  now?: Date;
  quiet?: boolean;
  extract?: boolean;
  extractAll?: boolean;
  extractMinRelevance?: number;
};

type RunSummary = {
  checkedSources: number;
  skippedSources: number;
  capturedItems: number;
  signals: TrendSignal[];
  failures: Array<{ source: string; error: string }>;
  pagination: Array<{ source: string; pages: number; items: number; cursor: string | null; rateLimited: boolean }>;
  extraction?: {
    processed: number;
    entitiesCreated: number;
    mentionsCreated: number;
    categoriesAssigned: number;
    cooccurrencesBumped: number;
    durationMs: number;
    errors: number;
  };
};

export async function runNewsWatchOnce(options: RunOptions = {}) {
  const now = options.now ?? new Date();
  const db = openNewsWatchDb(NEWS_WATCH_DB_PATH);
  const sources = getSources().filter((source) =>
    options.sourceKeys == null || options.sourceKeys.includes(source.key),
  );
  const summary: RunSummary = {
    checkedSources: 0,
    skippedSources: 0,
    capturedItems: 0,
    signals: [],
    failures: [],
    pagination: [],
  };

  try {
    const dueSources = sources.filter((source) => options.all || db.isSourceDue(source, now));
    const skipped = sources.length - dueSources.length;
    summary.skippedSources = skipped;

    const tasks = dueSources.map((source) => async () => {
      summary.checkedSources += 1;
      try {
        const sourceResult = await captureSource(source, now, db);
        summary.capturedItems += sourceResult.capturedItems;
        summary.signals.push(...sourceResult.signals);
        if (sourceResult.pagination) summary.pagination.push(sourceResult.pagination);
        db.recordSourceSuccess(source, now, sourceResult.signals.length);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        summary.failures.push({ source: source.key, error: message });
        db.recordSourceFailure(source, now, error);
      }
    });

    await runWithConcurrency(tasks, SOURCE_FETCH_CONCURRENCY);

    if (options.extract !== false && isExtractionConfigured()) {
      try {
        const stats = await extractEntitiesForPendingItems(db, {
          includeAllItems: options.extractAll === true,
          minRelevance: options.extractMinRelevance,
          verbose: !options.quiet,
        });
        summary.extraction = {
          processed: stats.processed,
          entitiesCreated: stats.entitiesCreated,
          mentionsCreated: stats.mentionsCreated,
          categoriesAssigned: stats.categoriesAssigned,
          cooccurrencesBumped: stats.cooccurrencesBumped,
          durationMs: stats.durationMs,
          errors: stats.errors.length,
        };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        summary.failures.push({ source: "extraction", error: message });
      }
    }
  } finally {
    db.close();
  }

  if (!options.quiet) {
    console.log(renderRunSummary(summary));
  }

  return summary;
}

type CaptureResult = {
  capturedItems: number;
  signals: TrendSignal[];
  pagination?: RunSummary["pagination"][number];
};

async function captureSource(source: SourceSpec, now: Date, db: ReturnType<typeof openNewsWatchDb>): Promise<CaptureResult> {
  let items: CapturedItem[];
  let paginationResult: RunSummary["pagination"][number] | undefined;

  if (source.type === "reddit" && source.pagination?.enabled) {
    const result = await captureRedditPaginated(source, now, db);
    items = result.items;
    paginationResult = result.pagination;
  } else {
    items = await fetchSource(source, now.toISOString());
  }

  const signals: TrendSignal[] = [];
  for (const item of items) {
    const itemId = makeItemId(item);
    const topicKey = makeTopicKey(item);
    const relevance = scoreRelevance(item);
    const markdownPath = writeItemMarkdown({
      itemDir: NEWS_WATCH_ITEM_DIR,
      itemId,
      topicKey,
      item,
      relevance,
    });
    const previous = db.getLatestMetric(itemId);
    db.upsertItem(itemId, topicKey, item, relevance, markdownPath);
    const current = db.insertMetric(itemId, item, engagementScore(item.metrics));

    if (item.author && item.author.trim().length > 0) {
      const authorId = makeAuthorId(source.key, item.author);
      db.upsertAuthor({
        authorId,
        displayName: item.author,
        sourceKey: source.key,
        firstSeenAt: item.capturedAt,
        lastSeenAt: item.capturedAt,
        itemCount: 1,
      });
      db.linkItemAuthor(itemId, authorId);
    }

    const signal = detectTrendSignal({
      item,
      itemId,
      topicKey,
      relevanceScore: relevance.score,
      previous,
      current,
      rapidPollSeconds: source.rapidIntervalSeconds,
    });

    if (signal != null) {
      db.insertSignal(signal);
      signals.push(signal);
    }
  }

  return {
    capturedItems: items.length,
    signals,
    pagination: paginationResult,
  };
}

async function captureRedditPaginated(source: SourceSpec, now: Date, db: ReturnType<typeof openNewsWatchDb>) {
  const pagination = source.pagination!;
  const itemsPerPage = Math.max(1, Math.min(100, pagination.itemsPerPage));
  const maxItems = Math.max(itemsPerPage, pagination.maxItems);
  const existing = db.getPagination(source.key);
  let cursor: string | null = existing.lastCursor;
  const fetched: CapturedItem[] = [];
  let pages = 0;
  let rateLimited = false;
  let nextCursor: string | null = cursor;

  while (fetched.length < maxItems) {
    if (cursor && existing.rateLimitedUntil && Date.parse(existing.rateLimitedUntil) > now.getTime()) {
      rateLimited = true;
      break;
    }
    const page = await fetchRedditPage(source, cursor, itemsPerPage, now.toISOString());
    pages += 1;
    if (page.rateLimited) {
      rateLimited = true;
      nextCursor = page.nextCursor ?? cursor;
      break;
    }
    if (page.items.length === 0) {
      nextCursor = null;
      break;
    }
    fetched.push(...page.items);
    nextCursor = page.nextCursor;
    if (!nextCursor || page.items.length < itemsPerPage) break;
    cursor = nextCursor;
  }

  db.updatePagination(source.key, {
    lastCursor: nextCursor,
    lastFetchedAt: now.toISOString(),
    totalFetched: existing.totalFetched + fetched.length,
    rateLimitedUntil: rateLimited
      ? new Date(now.getTime() + RATE_LIMIT_BACKOFF_MINUTES * 60_000).toISOString()
      : null,
  });

  return {
    items: fetched,
    pagination: {
      source: source.key,
      pages,
      items: fetched.length,
      cursor: nextCursor,
      rateLimited,
    },
  };
}

function makeAuthorId(sourceKey: string, author: string) {
  return `${sourceKey}::${author.toLowerCase().replace(/[^a-z0-9_-]+/gi, "_").slice(0, 80) || "anon"}`;
}

function renderRunSummary(summary: RunSummary) {
  const out: string[] = [];
  out.push("=== News Watch Run ===");
  out.push(`Captured ${summary.capturedItems} item(s) from ${summary.checkedSources} source(s), skipped ${summary.skippedSources}.`);
  out.push("");

  if (summary.pagination.length > 0) {
    out.push("## Pagination");
    const rows: string[][] = summary.pagination.map((p) => [
      p.source,
      String(p.pages),
      String(p.items),
      p.cursor ?? "null",
      p.rateLimited ? "yes" : "no",
    ]);
    out.push(...printTable(["SOURCE", "PAGES", "ITEMS", "CURSOR", "RATE_LIMITED"], rows));
    out.push("");
  }

  if (summary.extraction) {
    const e = summary.extraction;
    out.push("## Extraction");
    out.push(`  model run in ${fmtDuration(e.durationMs)} (${e.errors} error${e.errors === 1 ? "" : "s"})`);
    const rows: string[][] = [
      ["processed", String(e.processed)],
      ["entities created", String(e.entitiesCreated)],
      ["mentions created", String(e.mentionsCreated)],
      ["categories assigned", String(e.categoriesAssigned)],
      ["co-occurrence edges", String(e.cooccurrencesBumped)],
    ];
    const labelWidth = Math.max(...rows.map((r) => r[0].length));
    for (const [label, value] of rows) {
      out.push(`  ${label.padEnd(labelWidth)}  ${value}`);
    }
    out.push("");
  }

  out.push(`## Signals (${summary.signals.length})`);
  if (summary.signals.length > 0) {
    const rows: string[][] = summary.signals.slice(0, 10).map((s) => [
      s.signalScore.toFixed(2),
      s.signalType,
      truncate(s.reason, 80),
    ]);
    out.push(...printTable(["SCORE", "TYPE", "REASON"], rows));
  } else {
    out.push("(none)");
  }
  out.push("");

  if (summary.failures.length > 0) {
    out.push(`## Failures (${summary.failures.length})`);
    const rows: string[][] = summary.failures.map((f) => [
      f.source,
      truncate(f.error, 80),
    ]);
    out.push(...printTable(["SOURCE", "ERROR"], rows));
    out.push("");
  }

  return out.join("\n");
}

function parseArgs(argv = process.argv.slice(2)): RunOptions {
  const sourceKeys: string[] = [];
  let all = false;
  let quiet = false;
  let extract: boolean | undefined;
  let extractAll = false;
  let extractMinRelevance: number | undefined;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--all") all = true;
    if (arg === "--quiet") quiet = true;
    if (arg === "--no-extract") extract = false;
    if (arg === "--extract-all") extractAll = true;
    if (arg === "--extract-min-relevance") {
      const value = argv[index + 1];
      if (value == null) throw new Error("Missing value for --extract-min-relevance");
      extractMinRelevance = Number.parseFloat(value);
      index += 1;
    }
    if (arg === "--source") {
      const value = argv[index + 1];
      if (value == null) throw new Error("Missing value for --source");
      sourceKeys.push(value);
      index += 1;
    }
  }

  return {
    all,
    quiet,
    extract,
    extractAll,
    extractMinRelevance,
    sourceKeys: sourceKeys.length > 0 ? sourceKeys : undefined,
  };
}

if (import.meta.main) {
  runNewsWatchOnce(parseArgs()).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

export type { UnextractedItemRow };
