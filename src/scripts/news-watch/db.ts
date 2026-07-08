import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import Database from "libsql";
import type {
  Author,
  CapturedItem,
  Entity,
  EntityCooccurrence,
  EntityMention,
  EntityType,
  ItemExtraction,
  PaginationState,
  RelevanceResult,
  SourceSpec,
  StoredMetric,
  TrendSignal,
} from "./types.ts";

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
  getPagination: (sourceKey: string) => PaginationState;
  updatePagination: (sourceKey: string, patch: Partial<PaginationState>) => void;
  clearPagination: (sourceKey: string) => void;
  upsertAuthor: (author: Author) => void;
  linkItemAuthor: (itemId: string, authorId: string) => void;
  upsertEntity: (entity: Entity) => void;
  insertItemMentions: (itemId: string, mentions: EntityMention[], capturedAt: string) => void;
  upsertItemCategories: (itemId: string, categories: { name: string; score: number }[]) => void;
  bumpCooccurrences: (itemId: string, entityIds: string[], capturedAt: string) => void;
  getItemExtraction: (itemId: string) => ItemExtraction | undefined;
  listEntitiesByType: (type: EntityType, limit?: number) => Entity[];
  listTopCooccurrences: (limit?: number, since?: string) => EntityCooccurrence[];
  listItemsWithoutExtraction: (limit?: number) => Array<UnextractedItemRow>;
  listAllItemsWithoutExtraction: (limit?: number) => Array<UnextractedItemRow>;
};

export type UnextractedItemRow = {
  item_id: string;
  title: string;
  summary: string | null;
  source_key: string;
  canonical_url: string;
  author: string | null;
  published_at: string | null;
  relevance_score: number;
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
    getPagination: (sourceKey) => getPagination(db, sourceKey),
    updatePagination: (sourceKey, patch) => updatePagination(db, sourceKey, patch),
    clearPagination: (sourceKey) => clearPagination(db, sourceKey),
    upsertAuthor: (author) => upsertAuthor(db, author),
    linkItemAuthor: (itemId, authorId) => linkItemAuthor(db, itemId, authorId),
    upsertEntity: (entity) => upsertEntity(db, entity),
    insertItemMentions: (itemId, mentions, capturedAt) => insertItemMentions(db, itemId, mentions, capturedAt),
    upsertItemCategories: (itemId, categories) => upsertItemCategories(db, itemId, categories),
    bumpCooccurrences: (itemId, entityIds, capturedAt) => bumpCooccurrences(db, itemId, entityIds, capturedAt),
    getItemExtraction: (itemId) => getItemExtraction(db, itemId),
    listEntitiesByType: (type, limit) => listEntitiesByType(db, type, limit),
    listTopCooccurrences: (limit, since) => listTopCooccurrences(db, limit, since),
    listItemsWithoutExtraction: (limit) => listItemsWithoutExtraction(db, limit),
    listAllItemsWithoutExtraction: (limit) => listAllItemsWithoutExtraction(db, limit),
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
      pagination_enabled INTEGER NOT NULL DEFAULT 0,
      pagination_items_per_page INTEGER NOT NULL DEFAULT 50,
      pagination_max_items INTEGER NOT NULL DEFAULT 200,
      pagination_last_cursor TEXT,
      pagination_last_fetched_at TEXT,
      pagination_total_fetched INTEGER NOT NULL DEFAULT 0,
      pagination_rate_limited_until TEXT,
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

    CREATE TABLE IF NOT EXISTS news_authors (
      author_id TEXT PRIMARY KEY,
      display_name TEXT NOT NULL,
      source_key TEXT NOT NULL,
      first_seen_at TEXT NOT NULL,
      last_seen_at TEXT NOT NULL,
      item_count INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS news_item_authors (
      item_id TEXT NOT NULL,
      author_id TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'primary',
      PRIMARY KEY (item_id, author_id, role)
    );

    CREATE TABLE IF NOT EXISTS news_entities (
      entity_id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      aliases_json TEXT NOT NULL DEFAULT '[]',
      first_seen_at TEXT NOT NULL,
      last_seen_at TEXT NOT NULL,
      mention_count INTEGER NOT NULL DEFAULT 0
    );

    CREATE INDEX IF NOT EXISTS idx_news_entities_type ON news_entities(type, mention_count DESC);
    CREATE INDEX IF NOT EXISTS idx_news_entities_name ON news_entities(LOWER(name));

    CREATE TABLE IF NOT EXISTS news_item_mentions (
      mention_id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id TEXT NOT NULL,
      entity_id TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'subject',
      context TEXT,
      offset_in_source INTEGER,
      captured_at TEXT NOT NULL,
      UNIQUE (item_id, entity_id, role)
    );

    CREATE INDEX IF NOT EXISTS idx_news_mentions_entity ON news_item_mentions(entity_id);
    CREATE INDEX IF NOT EXISTS idx_news_mentions_item ON news_item_mentions(item_id);

    CREATE TABLE IF NOT EXISTS news_item_categories (
      item_id TEXT NOT NULL,
      category TEXT NOT NULL,
      score REAL NOT NULL,
      source TEXT NOT NULL DEFAULT 'extracted',
      PRIMARY KEY (item_id, category)
    );

    CREATE TABLE IF NOT EXISTS news_entity_cooccurrences (
      entity_a_id TEXT NOT NULL,
      entity_b_id TEXT NOT NULL,
      count INTEGER NOT NULL DEFAULT 0,
      first_seen_at TEXT NOT NULL,
      last_seen_at TEXT NOT NULL,
      PRIMARY KEY (entity_a_id, entity_b_id)
    );

    CREATE INDEX IF NOT EXISTS idx_news_cooc_count ON news_entity_cooccurrences(count DESC);
    CREATE INDEX IF NOT EXISTS idx_news_cooc_b ON news_entity_cooccurrences(entity_b_id);

    CREATE TABLE IF NOT EXISTS news_item_links (
      source_item_id TEXT NOT NULL,
      target_item_id TEXT NOT NULL,
      first_seen_at TEXT NOT NULL,
      PRIMARY KEY (source_item_id, target_item_id)
    );

    CREATE INDEX IF NOT EXISTS idx_news_items_topic ON news_items(topic_key, last_seen_at);
    CREATE INDEX IF NOT EXISTS idx_news_items_source ON news_items(source_key, last_seen_at);
    CREATE INDEX IF NOT EXISTS idx_news_items_published ON news_items(published_at DESC);
    CREATE INDEX IF NOT EXISTS idx_news_metrics_item_time ON news_item_metrics(item_id, observed_at DESC);
    CREATE INDEX IF NOT EXISTS idx_news_signals_time ON news_trend_signals(detected_at DESC);
  `);

  // Idempotent column adds for users on the previous schema.
  const sourceColumns = new Set(
    (db.prepare("PRAGMA table_info(news_sources)").all() as Array<{ name: string }>).map((row) => row.name),
  );
  const sourceColumnAdds: Array<[string, string]> = [
    ["pagination_enabled", "INTEGER NOT NULL DEFAULT 0"],
    ["pagination_items_per_page", "INTEGER NOT NULL DEFAULT 50"],
    ["pagination_max_items", "INTEGER NOT NULL DEFAULT 200"],
    ["pagination_last_cursor", "TEXT"],
    ["pagination_last_fetched_at", "TEXT"],
    ["pagination_total_fetched", "INTEGER NOT NULL DEFAULT 0"],
    ["pagination_rate_limited_until", "TEXT"],
  ];
  for (const [name, ddl] of sourceColumnAdds) {
    if (!sourceColumns.has(name)) {
      db.exec(`ALTER TABLE news_sources ADD COLUMN ${name} ${ddl}`);
    }
  }
}

function isSourceDue(db: Db, source: SourceSpec, now: Date) {
  syncSource(db, source, now);
  const row = db
    .prepare("SELECT next_poll_after FROM news_sources WHERE source_key = ?")
    .get(source.key) as { next_poll_after?: string } | undefined;
  return row?.next_poll_after == null || Date.parse(row.next_poll_after) <= now.getTime();
}

function syncSource(db: Db, source: SourceSpec, now: Date) {
  const pagination = source.pagination;
  db.prepare(`
    INSERT INTO news_sources (
      source_key, type, name, url, enabled, poll_interval_seconds, rapid_interval_seconds, updated_at,
      pagination_enabled, pagination_items_per_page, pagination_max_items
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(source_key) DO UPDATE SET
      type = excluded.type,
      name = excluded.name,
      url = excluded.url,
      enabled = excluded.enabled,
      poll_interval_seconds = excluded.poll_interval_seconds,
      rapid_interval_seconds = excluded.rapid_interval_seconds,
      updated_at = excluded.updated_at,
      pagination_enabled = excluded.pagination_enabled,
      pagination_items_per_page = excluded.pagination_items_per_page,
      pagination_max_items = excluded.pagination_max_items
  `).run(
    source.key,
    source.type,
    source.name,
    source.url ?? null,
    source.enabled ? 1 : 0,
    source.pollIntervalSeconds,
    source.rapidIntervalSeconds,
    now.toISOString(),
    pagination?.enabled ? 1 : 0,
    pagination?.itemsPerPage ?? 50,
    pagination?.maxItems ?? 200,
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

function getPagination(db: Db, sourceKey: string): PaginationState {
  const row = db
    .prepare(`
      SELECT pagination_enabled, pagination_items_per_page, pagination_max_items,
             pagination_last_cursor, pagination_last_fetched_at, pagination_total_fetched,
             pagination_rate_limited_until
      FROM news_sources
      WHERE source_key = ?
    `)
    .get(sourceKey) as
    | {
        pagination_enabled: number | null;
        pagination_items_per_page: number | null;
        pagination_max_items: number | null;
        pagination_last_cursor: string | null;
        pagination_last_fetched_at: string | null;
        pagination_total_fetched: number | null;
        pagination_rate_limited_until: string | null;
      }
    | undefined;
  return {
    enabled: Boolean(row?.pagination_enabled),
    itemsPerPage: row?.pagination_items_per_page ?? 50,
    maxItems: row?.pagination_max_items ?? 200,
    lastCursor: row?.pagination_last_cursor ?? null,
    lastFetchedAt: row?.pagination_last_fetched_at ?? null,
    totalFetched: row?.pagination_total_fetched ?? 0,
    rateLimitedUntil: row?.pagination_rate_limited_until ?? null,
  };
}

function updatePagination(db: Db, sourceKey: string, patch: Partial<PaginationState>) {
  const current = getPagination(db, sourceKey);
  const next: PaginationState = { ...current, ...patch };
  db.prepare(`
    UPDATE news_sources
    SET pagination_last_cursor = ?,
        pagination_last_fetched_at = ?,
        pagination_total_fetched = ?,
        pagination_rate_limited_until = ?
    WHERE source_key = ?
  `).run(
    next.lastCursor,
    next.lastFetchedAt,
    next.totalFetched,
    next.rateLimitedUntil,
    sourceKey,
  );
}

function clearPagination(db: Db, sourceKey: string) {
  db.prepare(`
    UPDATE news_sources
    SET pagination_last_cursor = NULL,
        pagination_last_fetched_at = NULL,
        pagination_total_fetched = 0,
        pagination_rate_limited_until = NULL
    WHERE source_key = ?
  `).run(sourceKey);
}

function upsertAuthor(db: Db, author: Author) {
  db.prepare(`
    INSERT INTO news_authors (author_id, display_name, source_key, first_seen_at, last_seen_at, item_count)
    VALUES (?, ?, ?, ?, ?, ?)
    ON CONFLICT(author_id) DO UPDATE SET
      display_name = excluded.display_name,
      last_seen_at = excluded.last_seen_at,
      item_count = news_authors.item_count + 1
  `).run(
    author.authorId,
    author.displayName,
    author.sourceKey,
    author.firstSeenAt,
    author.lastSeenAt,
    1,
  );
}

function linkItemAuthor(db: Db, itemId: string, authorId: string) {
  db.prepare(`
    INSERT OR IGNORE INTO news_item_authors (item_id, author_id, role)
    VALUES (?, ?, 'primary')
  `).run(itemId, authorId);
}

function upsertEntity(db: Db, entity: Entity) {
  db.prepare(`
    INSERT INTO news_entities (entity_id, name, type, aliases_json, first_seen_at, last_seen_at, mention_count)
    VALUES (?, ?, ?, ?, ?, ?, 1)
    ON CONFLICT(entity_id) DO UPDATE SET
      name = excluded.name,
      aliases_json = excluded.aliases_json,
      last_seen_at = excluded.last_seen_at,
      mention_count = news_entities.mention_count + 1
  `).run(
    entity.entityId,
    entity.name,
    entity.type,
    JSON.stringify(entity.aliases ?? []),
    entity.firstSeenAt,
    entity.lastSeenAt,
  );
}

function insertItemMentions(db: Db, itemId: string, mentions: EntityMention[], capturedAt: string) {
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO news_item_mentions (item_id, entity_id, role, context, offset_in_source, captured_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  for (const m of mentions) {
    if (!m.entityId) continue;
    stmt.run(itemId, m.entityId, m.role ?? "subject", m.context ?? null, m.offset ?? null, capturedAt);
  }
}

function upsertItemCategories(db: Db, itemId: string, categories: { name: string; score: number }[]) {
  const stmt = db.prepare(`
    INSERT INTO news_item_categories (item_id, category, score, source)
    VALUES (?, ?, ?, 'extracted')
    ON CONFLICT(item_id, category) DO UPDATE SET
      score = excluded.score
  `);
  for (const c of categories) {
    stmt.run(itemId, c.name, c.score);
  }
}

function bumpCooccurrences(db: Db, itemId: string, entityIds: string[], capturedAt: string) {
  if (entityIds.length < 2) return;
  const sorted = [...new Set(entityIds)].sort();
  const stmt = db.prepare(`
    INSERT INTO news_entity_cooccurrences (entity_a_id, entity_b_id, count, first_seen_at, last_seen_at)
    VALUES (?, ?, 1, ?, ?)
    ON CONFLICT(entity_a_id, entity_b_id) DO UPDATE SET
      count = news_entity_cooccurrences.count + 1,
      last_seen_at = excluded.last_seen_at
  `);
  for (let i = 0; i < sorted.length; i += 1) {
    for (let j = i + 1; j < sorted.length; j += 1) {
      stmt.run(sorted[i], sorted[j], capturedAt, capturedAt);
    }
  }
  // capture itemId for future per-item link table if needed
  void itemId;
}

function getItemExtraction(db: Db, itemId: string): ItemExtraction | undefined {
  const mentions = db
    .prepare(`
      SELECT m.entity_id, m.role, m.context, m.offset_in_source, e.name, e.type
      FROM news_item_mentions m
      JOIN news_entities e ON e.entity_id = m.entity_id
      WHERE m.item_id = ?
    `)
    .all(itemId) as Array<{
      entity_id: string;
      role: string | null;
      context: string | null;
      offset_in_source: number | null;
      name: string;
      type: string;
    }>;
  const categories = db
    .prepare(`SELECT category, score FROM news_item_categories WHERE item_id = ?`)
    .all(itemId) as Array<{ category: string; score: number }>;
  if (mentions.length === 0 && categories.length === 0) return undefined;
  const item = mentions[0];
  const people: EntityMention[] = [];
  const orgs: EntityMention[] = [];
  const products: EntityMention[] = [];
  const topics: EntityMention[] = [];
  for (const m of mentions) {
    const mention: EntityMention = {
      entityId: m.entity_id,
      name: m.name,
      type: m.type as EntityType,
      role: m.role ?? undefined,
      context: m.context ?? undefined,
      offset: m.offset_in_source ?? undefined,
    };
    if (m.type === "person") people.push(mention);
    else if (m.type === "org") orgs.push(mention);
    else if (m.type === "product") products.push(mention);
    else if (m.type === "topic") topics.push(mention);
  }
  return {
    itemId,
    people,
    orgs,
    products,
    topics,
    categories: categories.map((c) => ({ name: c.category, score: c.score })),
    extractedAt: item ? new Date().toISOString() : new Date().toISOString(),
  };
}

function listEntitiesByType(db: Db, type: EntityType, limit = 50): Entity[] {
  const rows = db
    .prepare(`
      SELECT entity_id, name, type, aliases_json, first_seen_at, last_seen_at, mention_count
      FROM news_entities
      WHERE type = ?
      ORDER BY mention_count DESC, last_seen_at DESC
      LIMIT ?
    `)
    .all(type, limit) as Array<{
      entity_id: string;
      name: string;
      type: string;
      aliases_json: string;
      first_seen_at: string;
      last_seen_at: string;
      mention_count: number;
    }>;
  return rows.map((row) => ({
    entityId: row.entity_id,
    name: row.name,
    type: row.type as EntityType,
    aliases: safeJsonArray(row.aliases_json),
    firstSeenAt: row.first_seen_at,
    lastSeenAt: row.last_seen_at,
    mentionCount: row.mention_count,
  }));
}

function listTopCooccurrences(db: Db, limit = 25, since?: string): EntityCooccurrence[] {
  const sql = since
    ? `
      SELECT entity_a_id, entity_b_id, count, first_seen_at, last_seen_at
      FROM news_entity_cooccurrences
      WHERE last_seen_at >= ?
      ORDER BY count DESC
      LIMIT ?
    `
    : `
      SELECT entity_a_id, entity_b_id, count, first_seen_at, last_seen_at
      FROM news_entity_cooccurrences
      ORDER BY count DESC
      LIMIT ?
    `;
  const rows = since
    ? (db.prepare(sql).all(since, limit) as Array<{
        entity_a_id: string;
        entity_b_id: string;
        count: number;
        first_seen_at: string;
        last_seen_at: string;
      }>)
    : (db.prepare(sql).all(limit) as Array<{
        entity_a_id: string;
        entity_b_id: string;
        count: number;
        first_seen_at: string;
        last_seen_at: string;
      }>);
  return rows.map((row) => ({
    entityAId: row.entity_a_id,
    entityBId: row.entity_b_id,
    count: row.count,
    firstSeenAt: row.first_seen_at,
    lastSeenAt: row.last_seen_at,
  }));
}

function listItemsWithoutExtraction(db: Db, limit = 50) {
  return db
    .prepare(`
      SELECT i.item_id, i.title, i.summary, i.source_key, i.canonical_url, i.author, i.published_at, i.relevance_score
      FROM news_items i
      LEFT JOIN news_item_mentions m ON m.item_id = i.item_id
      WHERE m.mention_id IS NULL AND i.relevance_score >= 0.2
      GROUP BY i.item_id
      ORDER BY i.relevance_score DESC, i.last_seen_at DESC
      LIMIT ?
    `)
    .all(limit) as Array<{
      item_id: string;
      title: string;
      summary: string | null;
      source_key: string;
      canonical_url: string;
      author: string | null;
      published_at: string | null;
      relevance_score: number;
    }>;
}

function listAllItemsWithoutExtraction(db: Db, limit = 50) {
  return db
    .prepare(`
      SELECT i.item_id, i.title, i.summary, i.source_key, i.canonical_url, i.author, i.published_at, i.relevance_score
      FROM news_items i
      LEFT JOIN news_item_mentions m ON m.item_id = i.item_id
      WHERE m.mention_id IS NULL
      GROUP BY i.item_id
      ORDER BY i.relevance_score DESC, i.last_seen_at DESC
      LIMIT ?
    `)
    .all(limit) as Array<{
      item_id: string;
      title: string;
      summary: string | null;
      source_key: string;
      canonical_url: string;
      author: string | null;
      published_at: string | null;
      relevance_score: number;
    }>;
}

function safeJsonArray(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}
