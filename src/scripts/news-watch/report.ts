import { NEWS_WATCH_DB_PATH } from "./config.ts";
import { openNewsWatchDb } from "./db.ts";
import { fmtTime, pct, printTable, truncate } from "./format.ts";

type SignalRow = {
  detected_at: string;
  signal_score: number;
  signal_type: string;
  reason: string;
  title: string;
  canonical_url: string;
  source_name: string;
  relevance_score: number;
};

type SourceRow = {
  source_key: string;
  type: string;
  name: string;
  enabled: number;
  last_polled_at: string | null;
  next_poll_after: string | null;
  consecutive_failures: number;
  last_error: string | null;
};

type ItemRow = {
  item_id: string;
  title: string;
  source_key: string;
  source_name: string;
  canonical_url: string;
  relevance_score: number;
  first_seen_at: string;
  last_seen_at: string;
  captured_at: string;
};

type ReportOptions = {
  limit?: number;
  since?: string;
  format?: "table" | "markdown";
};

const DEFAULT_LIMIT = 20;

if (import.meta.main) {
  const opts = parseArgs(process.argv.slice(2));
  renderReport(opts).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

export async function renderReport(options: ReportOptions = {}) {
  const limit = options.limit ?? DEFAULT_LIMIT;
  const since = options.since;
  const format = options.format ?? "table";
  const db = openNewsWatchDb(NEWS_WATCH_DB_PATH);

  try {
    const summary = fetchSummary(db, since);
    const sources = fetchSources(db);
    const signals = fetchSignals(db, limit, since);
    const topItems = fetchTopItems(db, limit, since);
    const recentItems = fetchRecentItems(db, limit, since);

    if (summary.items === 0 && signals.length === 0) {
      console.log("No news-watch data captured yet.");
      return;
    }

    const out: string[] = [];
    out.push("=== News Watch Report ===");
    out.push(`Generated: ${new Date().toISOString()}`);
    out.push(`Window: ${since ? `since ${since}` : "all time"}`);
    out.push("");

    renderSummary(out, summary);
    renderSources(out, sources, format);
    renderSignals(out, signals, format);
    renderTopItems(out, topItems, format);
    renderRecentItems(out, recentItems, format);

    console.log(out.join("\n"));
  } finally {
    db.close();
  }
}

type Summary = {
  items: number;
  extractedItems: number;
  sources: number;
  enabledSources: number;
  signals: number;
  authors: number;
  entities: number;
  cooccurrences: number;
  categories: number;
  metrics: number;
  failures: number;
};

function fetchSummary(db: ReturnType<typeof openNewsWatchDb>, since?: string): Summary {
  const itemsSince = since
    ? (db.db.prepare("SELECT COUNT(*) AS n FROM news_items WHERE last_seen_at >= ?").get(since) as { n: number }).n
    : (db.db.prepare("SELECT COUNT(*) AS n FROM news_items").get() as { n: number }).n;
  const items = since
    ? itemsSince
    : (db.db.prepare("SELECT COUNT(*) AS n FROM news_items").get() as { n: number }).n;
  const extractedItems = (db.db.prepare("SELECT COUNT(DISTINCT item_id) AS n FROM news_item_mentions").get() as { n: number }).n;
  const sources = (db.db.prepare("SELECT COUNT(*) AS n FROM news_sources").get() as { n: number }).n;
  const enabledSources = (db.db.prepare("SELECT COUNT(*) AS n FROM news_sources WHERE enabled = 1").get() as { n: number }).n;
  const signals = since
    ? (db.db.prepare("SELECT COUNT(*) AS n FROM news_trend_signals WHERE detected_at >= ?").get(since) as { n: number }).n
    : (db.db.prepare("SELECT COUNT(*) AS n FROM news_trend_signals").get() as { n: number }).n;
  const authors = (db.db.prepare("SELECT COUNT(*) AS n FROM news_authors").get() as { n: number }).n;
  const entities = (db.db.prepare("SELECT COUNT(*) AS n FROM news_entities").get() as { n: number }).n;
  const cooccurrences = (db.db.prepare("SELECT COUNT(*) AS n FROM news_entity_cooccurrences").get() as { n: number }).n;
  const categories = (db.db.prepare("SELECT COUNT(DISTINCT category) AS n FROM news_item_categories").get() as { n: number }).n;
  const metrics = since
    ? (db.db.prepare("SELECT COUNT(*) AS n FROM news_item_metrics WHERE observed_at >= ?").get(since) as { n: number }).n
    : (db.db.prepare("SELECT COUNT(*) AS n FROM news_item_metrics").get() as { n: number }).n;
  const failures = (db.db.prepare("SELECT COUNT(*) AS n FROM news_sources WHERE consecutive_failures > 0").get() as { n: number }).n;

  return {
    items,
    extractedItems,
    sources,
    enabledSources,
    signals,
    authors,
    entities,
    cooccurrences,
    categories,
    metrics,
    failures,
  };
}

function renderSummary(out: string[], s: Summary) {
  out.push("## Summary");
  const rows: Array<[string, string]> = [
    ["items", s.items.toLocaleString()],
    ["items w/ extraction", `${s.extractedItems.toLocaleString()} (${pct(s.extractedItems, s.items)})`],
    ["sources", `${s.sources.toLocaleString()} (${s.enabledSources.toLocaleString()} enabled)`],
    ["signals", s.signals.toLocaleString()],
    ["metrics observations", s.metrics.toLocaleString()],
    ["entities", s.entities.toLocaleString()],
    ["authors", s.authors.toLocaleString()],
    ["co-occurrence edges", s.cooccurrences.toLocaleString()],
    ["distinct categories", s.categories.toLocaleString()],
    ["sources w/ failures", s.failures.toLocaleString()],
  ];
  const labelWidth = Math.max(...rows.map((r) => r[0].length));
  for (const [label, value] of rows) {
    out.push(`  ${label.padEnd(labelWidth)}  ${value}`);
  }
  out.push("");
}

function fetchSources(db: ReturnType<typeof openNewsWatchDb>): Array<SourceRow & { item_count: number }> {
  const sources = db.db
    .prepare(`
      SELECT source_key, type, name, enabled, last_polled_at, next_poll_after,
             consecutive_failures, last_error
      FROM news_sources
      ORDER BY source_key
    `)
    .all() as SourceRow[];
  const counts = db.db
    .prepare(`SELECT source_key, COUNT(*) AS n FROM news_items GROUP BY source_key`)
    .all() as Array<{ source_key: string; n: number }>;
  const countMap = new Map(counts.map((c) => [c.source_key, c.n]));
  return sources
    .map((s) => ({ ...s, item_count: countMap.get(s.source_key) ?? 0 }))
    .sort((a, b) => b.item_count - a.item_count);
}

function renderSources(out: string[], sources: Array<SourceRow & { item_count: number }>, format: "table" | "markdown") {
  if (sources.length === 0) return;
  out.push("## Sources");
  if (format === "table") {
    const rows: string[][] = sources.map((s) => [
      s.source_key,
      s.type,
      s.enabled ? "yes" : "no",
      fmtTime(s.last_polled_at),
      fmtTime(s.next_poll_after),
      String(s.consecutive_failures),
      String(s.item_count),
    ]);
    out.push(...printTable(["SOURCE", "TYPE", "ENABLED", "LAST_POLLED", "NEXT_POLL", "FAIL", "ITEMS"], rows));
  } else {
    for (const s of sources) {
      out.push(`- ${s.source_key} (${s.type}, ${s.enabled ? "enabled" : "disabled"}): ${s.item_count} items, ${s.consecutive_failures} failure(s)${s.last_error ? `, last error: ${s.last_error.slice(0, 100)}` : ""}`);
    }
  }
  out.push("");
}

function fetchSignals(db: ReturnType<typeof openNewsWatchDb>, limit: number, since?: string): SignalRow[] {
  const sql = since
    ? `
      SELECT s.detected_at, s.signal_score, s.signal_type, s.reason,
             i.title, i.canonical_url, i.source_name, i.relevance_score
      FROM news_trend_signals s
      JOIN news_items i ON i.item_id = s.item_id
      WHERE s.detected_at >= ?
      ORDER BY s.detected_at DESC, s.signal_score DESC
      LIMIT ?
    `
    : `
      SELECT s.detected_at, s.signal_score, s.signal_type, s.reason,
             i.title, i.canonical_url, i.source_name, i.relevance_score
      FROM news_trend_signals s
      JOIN news_items i ON i.item_id = s.item_id
      ORDER BY s.detected_at DESC, s.signal_score DESC
      LIMIT ?
    `;
  return since
    ? (db.db.prepare(sql).all(since, limit) as SignalRow[])
    : (db.db.prepare(sql).all(limit) as SignalRow[]);
}

function renderSignals(out: string[], signals: SignalRow[], format: "table" | "markdown") {
  if (signals.length === 0) {
    out.push("## Signals");
    out.push("(none captured)");
    out.push("");
    return;
  }
  out.push(`## Signals (${signals.length})`);
  if (format === "table") {
    const rows: string[][] = signals.map((s) => [
      fmtTime(s.detected_at),
      s.signal_score.toFixed(2),
      s.signal_type,
      truncate(s.title, 60),
      s.source_name,
    ]);
    out.push(...printTable(["DETECTED", "SCORE", "TYPE", "TITLE", "SOURCE"], rows));
    out.push("");
    out.push("Signal details:");
    for (const s of signals) {
      out.push(`- [${s.signal_score.toFixed(2)} ${s.signal_type}] ${s.title}`);
      out.push(`    ${s.detected_at} · ${s.source_name} · relevance ${s.relevance_score.toFixed(2)}`);
      out.push(`    ${s.canonical_url}`);
      out.push(`    ${s.reason}`);
    }
  } else {
    for (const s of signals) {
      out.push(`## ${s.title}`);
      out.push(`- Signal: ${s.signal_score.toFixed(2)} ${s.signal_type}`);
      out.push(`- Source: ${s.source_name}`);
      out.push(`- Relevance: ${s.relevance_score.toFixed(2)}`);
      out.push(`- Detected: ${s.detected_at}`);
      out.push(`- URL: ${s.canonical_url}`);
      out.push(`- Reason: ${s.reason}`);
      out.push("");
    }
  }
  out.push("");
}

function fetchTopItems(db: ReturnType<typeof openNewsWatchDb>, limit: number, since?: string): ItemRow[] {
  const sql = since
    ? `
      SELECT item_id, title, source_key, source_name, canonical_url,
             relevance_score, first_seen_at, last_seen_at, last_seen_at AS captured_at
      FROM news_items
      WHERE last_seen_at >= ?
      ORDER BY relevance_score DESC, last_seen_at DESC
      LIMIT ?
    `
    : `
      SELECT item_id, title, source_key, source_name, canonical_url,
             relevance_score, first_seen_at, last_seen_at, last_seen_at AS captured_at
      FROM news_items
      ORDER BY relevance_score DESC, last_seen_at DESC
      LIMIT ?
    `;
  return since
    ? (db.db.prepare(sql).all(since, limit) as ItemRow[])
    : (db.db.prepare(sql).all(limit) as ItemRow[]);
}

function renderTopItems(out: string[], items: ItemRow[], format: "table" | "markdown") {
  if (items.length === 0) return;
  out.push(`## Top items by relevance (${items.length})`);
  if (format === "table") {
    const rows: string[][] = items.map((i) => [
      i.relevance_score.toFixed(2),
      i.source_key,
      truncate(i.title, 70),
    ]);
    out.push(...printTable(["REL", "SOURCE", "TITLE"], rows));
  } else {
    for (const i of items) {
      out.push(`- [${i.relevance_score.toFixed(2)}] ${i.source_key}: ${i.title}`);
    }
  }
  out.push("");
}

function fetchRecentItems(db: ReturnType<typeof openNewsWatchDb>, limit: number, since?: string): ItemRow[] {
  const sql = since
    ? `
      SELECT item_id, title, source_key, source_name, canonical_url,
             relevance_score, first_seen_at, last_seen_at, first_seen_at AS captured_at
      FROM news_items
      WHERE first_seen_at >= ?
      ORDER BY first_seen_at DESC
      LIMIT ?
    `
    : `
      SELECT item_id, title, source_key, source_name, canonical_url,
             relevance_score, first_seen_at, last_seen_at, first_seen_at AS captured_at
      FROM news_items
      ORDER BY first_seen_at DESC
      LIMIT ?
    `;
  return since
    ? (db.db.prepare(sql).all(since, limit) as ItemRow[])
    : (db.db.prepare(sql).all(limit) as ItemRow[]);
}

function renderRecentItems(out: string[], items: ItemRow[], format: "table" | "markdown") {
  if (items.length === 0) return;
  out.push(`## Recent captures (${items.length})`);
  if (format === "table") {
    const rows: string[][] = items.map((i) => [
      fmtTime(i.captured_at),
      i.source_key,
      i.relevance_score.toFixed(2),
      truncate(i.title, 70),
    ]);
    out.push(...printTable(["CAPTURED", "SOURCE", "REL", "TITLE"], rows));
  } else {
    for (const i of items) {
      out.push(`- ${i.captured_at} [${i.relevance_score.toFixed(2)}] ${i.source_key}: ${i.title}`);
    }
  }
  out.push("");
}

function parseArgs(argv: string[]): ReportOptions {
  const opts: ReportOptions = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--limit") {
      const v = argv[i + 1];
      if (v == null) throw new Error("Missing value for --limit");
      opts.limit = Number.parseInt(v, 10) || DEFAULT_LIMIT;
      i += 1;
    } else if (arg === "--since") {
      const v = argv[i + 1];
      if (v == null) throw new Error("Missing value for --since");
      opts.since = v;
      i += 1;
    } else if (arg === "--markdown") {
      opts.format = "markdown";
    }
  }
  return opts;
}
