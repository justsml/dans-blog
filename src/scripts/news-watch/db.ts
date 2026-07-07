import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import Database from "libsql";
import type { CapturedItem, RelevanceResult, SourceSpec, StoredMetric, TrendSignal } from "./types.ts";

type Db = ReturnType<typeof Database>;

export type NewsWatchDb = {
  db: Db;
  close: () => void;
  isSourceDue: (source: SourceSpec, now: Date) => boolean;
  recordSourceSuccess: (source: SourceSpec, now: Date, signalCount: number) => void;
  recordSourceFailure: (source: SourceSpec, now: Date, error: unknown) => void;
  upsertItem: (itemId: string, topicKey: string, item: CapturedItem, relevance: RelevanceResult, markdownPath?: string, screenshotPath?: string) => void;
  getLatestMetric: (itemId: string) => StoredMetric | undefined;
  insertMetric: (itemId: string, item: CapturedItem, engagementScore: number) => StoredMetric;
  insertSignal: (signal: TrendSignal) => void;
};

export function openNewsWatchDb(path: string): NewsWatchDb {
  mkdirSync(dirname(path), { recursive: true });
  const db = new Database(path);
  migrate(db);

  return {
    db,
    close: () => db.close(),
    isSourceDue: (source, now) => isSourceDue(db, source, now),
    recordSourceSuccess: (source, now, signalCount) => recordSourceSuccess(db, source, now, signalCount),
    recordSourceFailure: (source, now, error) => recordSourceFailure(db, source, now, error),
    upsertItem: (itemId, topicKey, item, relevance, markdownPath, screenshotPath) =>
      upsertItem(db, itemId, topicKey, item, relevance, markdownPath, screenshotPath),
    getLatestMetric: (itemId) => getLatestMetric(db, itemId),
    insertMetric: (itemId, item, engagementScore) => insertMetric(db, itemId, item, engagementScore),
    insertSignal: (signal) => insertSignal(db, signal),
  };
}

function migrate(db: Db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS news_sources (
      source_key TEXT PRIMARY KEY,
      type TEXT NOT NULL,
      name TEXT NOT NULL,
      url TEXT,
      enabled INTEGER NOT NULL,
      poll_interval_seconds INTEGER NOT NULL,
      rapid_interval_seconds INTEGER NOT NULL,
      last_polled_at TEXT,
      next_poll_after TEXT,
      rapid_until TEXT,
      consecutive_failures INTEGER NOT NULL DEFAULT 0,
      last_error TEXT,
      updated_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS news_items (
      item_id TEXT PRIMARY KEY,
      topic_key TEXT NOT NULL,
      source_key TEXT NOT NULL,
      source_type TEXT NOT NULL,
      source_name TEXT NOT NULL,
      external_id TEXT NOT NULL,
      canonical_url TEXT NOT NULL,
      title TEXT NOT NULL,
      summary TEXT,
      author TEXT,
      published_at TEXT,
      first_seen_at TEXT NOT NULL,
      last_seen_at TEXT NOT NULL,
      relevance_score REAL NOT NULL,
      relevance_reasons TEXT NOT NULL,
      matched_terms TEXT NOT NULL,
      markdown_path TEXT,
      screenshot_path TEXT,
      raw_json TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS news_item_metrics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id TEXT NOT NULL,
      observed_at TEXT NOT NULL,
      score REAL,
      upvotes REAL,
      comments REAL,
      likes REAL,
      reposts REAL,
      shares REAL,
      views REAL,
      rank INTEGER,
      engagement_score REAL NOT NULL,
      FOREIGN KEY(item_id) REFERENCES news_items(item_id)
    );

    CREATE TABLE IF NOT EXISTS news_trend_signals (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id TEXT NOT NULL,
      topic_key TEXT NOT NULL,
      detected_at TEXT NOT NULL,
      signal_score REAL NOT NULL,
      signal_type TEXT NOT NULL,
      reason TEXT NOT NULL,
      recommended_poll_seconds INTEGER NOT NULL,
      metric_json TEXT NOT NULL,
      FOREIGN KEY(item_id) REFERENCES news_items(item_id)
    );

    CREATE INDEX IF NOT EXISTS idx_news_items_topic ON news_items(topic_key, last_seen_at);
    CREATE INDEX IF NOT EXISTS idx_news_items_source ON news_items(source_key, last_seen_at);
    CREATE INDEX IF NOT EXISTS idx_news_metrics_item_time ON news_item_metrics(item_id, observed_at DESC);
    CREATE INDEX IF NOT EXISTS idx_news_signals_time ON news_trend_signals(detected_at DESC);
  `);
}

function isSourceDue(db: Db, source: SourceSpec, now: Date) {
  syncSource(db, source, now);
  const row = db
    .prepare("SELECT next_poll_after FROM news_sources WHERE source_key = ?")
    .get(source.key) as { next_poll_after?: string } | undefined;
  return row?.next_poll_after == null || Date.parse(row.next_poll_after) <= now.getTime();
}

function syncSource(db: Db, source: SourceSpec, now: Date) {
  db.prepare(`
    INSERT INTO news_sources (
      source_key, type, name, url, enabled, poll_interval_seconds, rapid_interval_seconds, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(source_key) DO UPDATE SET
      type = excluded.type,
      name = excluded.name,
      url = excluded.url,
      enabled = excluded.enabled,
      poll_interval_seconds = excluded.poll_interval_seconds,
      rapid_interval_seconds = excluded.rapid_interval_seconds,
      updated_at = excluded.updated_at
  `).run(
    source.key,
    source.type,
    source.name,
    source.url ?? null,
    source.enabled ? 1 : 0,
    source.pollIntervalSeconds,
    source.rapidIntervalSeconds,
    now.toISOString(),
  );
}

function recordSourceSuccess(db: Db, source: SourceSpec, now: Date, signalCount: number) {
  const rapidUntil = signalCount > 0
    ? new Date(now.getTime() + 60 * 60_000)
    : getExistingRapidUntil(db, source.key);
  const stillRapid = rapidUntil != null && rapidUntil.getTime() > now.getTime();
  const nextInterval = stillRapid ? source.rapidIntervalSeconds : source.pollIntervalSeconds;

  db.prepare(`
    UPDATE news_sources
    SET last_polled_at = ?,
        next_poll_after = ?,
        rapid_until = ?,
        consecutive_failures = 0,
        last_error = NULL,
        updated_at = ?
    WHERE source_key = ?
  `).run(
    now.toISOString(),
    new Date(now.getTime() + nextInterval * 1000).toISOString(),
    rapidUntil?.toISOString() ?? null,
    now.toISOString(),
    source.key,
  );
}

function recordSourceFailure(db: Db, source: SourceSpec, now: Date, error: unknown) {
  const row = db
    .prepare("SELECT consecutive_failures FROM news_sources WHERE source_key = ?")
    .get(source.key) as { consecutive_failures?: number } | undefined;
  const failures = (row?.consecutive_failures ?? 0) + 1;
  const backoffSeconds = Math.min(source.pollIntervalSeconds * 6, source.pollIntervalSeconds * 2 ** failures);
  const message = error instanceof Error ? error.message : String(error);

  db.prepare(`
    UPDATE news_sources
    SET last_polled_at = ?,
        next_poll_after = ?,
        consecutive_failures = ?,
        last_error = ?,
        updated_at = ?
    WHERE source_key = ?
  `).run(
    now.toISOString(),
    new Date(now.getTime() + backoffSeconds * 1000).toISOString(),
    failures,
    message.slice(0, 1000),
    now.toISOString(),
    source.key,
  );
}

function getExistingRapidUntil(db: Db, sourceKey: string) {
  const row = db
    .prepare("SELECT rapid_until FROM news_sources WHERE source_key = ?")
    .get(sourceKey) as { rapid_until?: string } | undefined;
  if (!row?.rapid_until) return undefined;
  const timestamp = Date.parse(row.rapid_until);
  return Number.isFinite(timestamp) ? new Date(timestamp) : undefined;
}

function upsertItem(
  db: Db,
  itemId: string,
  topicKey: string,
  item: CapturedItem,
  relevance: RelevanceResult,
  markdownPath?: string,
  screenshotPath?: string,
) {
  db.prepare(`
    INSERT INTO news_items (
      item_id, topic_key, source_key, source_type, source_name, external_id,
      canonical_url, title, summary, author, published_at, first_seen_at, last_seen_at,
      relevance_score, relevance_reasons, matched_terms, markdown_path, screenshot_path, raw_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(item_id) DO UPDATE SET
      topic_key = excluded.topic_key,
      canonical_url = excluded.canonical_url,
      title = excluded.title,
      summary = excluded.summary,
      author = excluded.author,
      published_at = excluded.published_at,
      last_seen_at = excluded.last_seen_at,
      relevance_score = excluded.relevance_score,
      relevance_reasons = excluded.relevance_reasons,
      matched_terms = excluded.matched_terms,
      markdown_path = COALESCE(excluded.markdown_path, news_items.markdown_path),
      screenshot_path = COALESCE(excluded.screenshot_path, news_items.screenshot_path),
      raw_json = excluded.raw_json
  `).run(
    itemId,
    topicKey,
    item.sourceKey,
    item.sourceType,
    item.sourceName,
    item.externalId,
    item.canonicalUrl,
    item.title,
    item.summary ?? null,
    item.author ?? null,
    item.publishedAt ?? null,
    item.capturedAt,
    item.capturedAt,
    relevance.score,
    JSON.stringify(relevance.reasons),
    JSON.stringify(relevance.matchedTerms),
    markdownPath ?? null,
    screenshotPath ?? null,
    JSON.stringify(item.raw),
  );
}

function getLatestMetric(db: Db, itemId: string): StoredMetric | undefined {
  const row = db.prepare(`
    SELECT observed_at, score, upvotes, comments, likes, reposts, shares, views, rank, engagement_score
    FROM news_item_metrics
    WHERE item_id = ?
    ORDER BY observed_at DESC, id DESC
    LIMIT 1
  `).get(itemId) as Record<string, number | string | null> | undefined;

  return row == null ? undefined : metricFromRow(row);
}

function insertMetric(db: Db, itemId: string, item: CapturedItem, engagementScore: number): StoredMetric {
  db.prepare(`
    INSERT INTO news_item_metrics (
      item_id, observed_at, score, upvotes, comments, likes, reposts, shares, views, rank, engagement_score
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    itemId,
    item.capturedAt,
    item.metrics.score ?? null,
    item.metrics.upvotes ?? null,
    item.metrics.comments ?? null,
    item.metrics.likes ?? null,
    item.metrics.reposts ?? null,
    item.metrics.shares ?? null,
    item.metrics.views ?? null,
    item.metrics.rank ?? null,
    engagementScore,
  );

  return {
    ...item.metrics,
    observedAt: item.capturedAt,
    engagementScore,
  };
}

function insertSignal(db: Db, signal: TrendSignal) {
  db.prepare(`
    INSERT INTO news_trend_signals (
      item_id, topic_key, detected_at, signal_score, signal_type, reason, recommended_poll_seconds, metric_json
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    signal.itemId,
    signal.topicKey,
    signal.detectedAt,
    signal.signalScore,
    signal.signalType,
    signal.reason,
    signal.recommendedPollSeconds,
    JSON.stringify({ previous: signal.previous, current: signal.current }),
  );
}

function metricFromRow(row: Record<string, number | string | null>): StoredMetric {
  return {
    observedAt: String(row.observed_at),
    score: nullableNumber(row.score),
    upvotes: nullableNumber(row.upvotes),
    comments: nullableNumber(row.comments),
    likes: nullableNumber(row.likes),
    reposts: nullableNumber(row.reposts),
    shares: nullableNumber(row.shares),
    views: nullableNumber(row.views),
    rank: nullableNumber(row.rank),
    engagementScore: Number(row.engagement_score ?? 0),
  };
}

function nullableNumber(value: unknown) {
  return typeof value === "number" ? value : undefined;
}
