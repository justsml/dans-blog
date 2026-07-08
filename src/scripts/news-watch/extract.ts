import "dotenv/config";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { generateText } from "../i18n/braintrust.ts";
import { NEWS_WATCH_DB_PATH } from "./config.ts";
import { runWithConcurrency } from "./concurrency.ts";
import type { NewsWatchDb, UnextractedItemRow } from "./db.ts";
import { openNewsWatchDb } from "./db.ts";
import { fmtDuration, printTable, truncate } from "./format.ts";
import type { Entity, EntityMention, EntityType } from "./types.ts";

// Default to DeepSeek V4 Flash (fast + cheap for bulk entity extraction).
// Swap to GPT-OSS 120B via NEWS_WATCH_EXTRACTION_MODEL=openai/gpt-oss-120b for higher-quality runs.
const EXTRACTION_MODEL = process.env.NEWS_WATCH_EXTRACTION_MODEL ?? "deepseek/deepseek-v4-flash:nitro";
const EXTRACTION_MIN_RELEVANCE = Number.parseFloat(process.env.NEWS_WATCH_EXTRACTION_MIN_RELEVANCE ?? "0.2");
const EXTRACTION_BATCH_SIZE = Number.parseInt(process.env.NEWS_WATCH_EXTRACTION_BATCH_SIZE ?? "20", 10);
const EXTRACTION_MAX_BATCHES = Number.parseInt(process.env.NEWS_WATCH_EXTRACTION_MAX_BATCHES ?? "25", 10);
const EXTRACTION_TEMPERATURE = Number.parseFloat(process.env.NEWS_WATCH_EXTRACTION_TEMPERATURE ?? "0.0");
const EXTRACTION_MAX_TOKENS = Number.parseInt(process.env.NEWS_WATCH_EXTRACTION_MAX_TOKENS ?? "4000", 10);
const EXTRACTION_TIMEOUT_MS = Number.parseInt(process.env.NEWS_WATCH_EXTRACTION_TIMEOUT_MS ?? "45000", 10);
const EXTRACTION_CONCURRENCY = Math.max(1, Number.parseInt(process.env.NEWS_WATCH_CONCURRENCY ?? "4", 10));
const EXTRACTION_REASONING_EFFORT = process.env.NEWS_WATCH_EXTRACTION_REASONING_EFFORT ?? "none";

const SYSTEM_PROMPT = [
  "You are an entity extractor for a tech/AI news index.",
  "For each news item, extract concrete entities and short topic labels.",
  "Output rules:",
  "- Use canonical, naturally-cased names (\"OpenAI\", not \"openai\").",
  "- Skip low-signal entities. Only extract concrete, recurring, or newsworthy entities.",
  "- people/orgs/products/topics are arrays of short strings (no objects, no markdown).",
  "- Categories: short lowercase tags like \"ai-models\", \"ai-agents\", \"mcp\", \"rag\", \"inference\", \"hardware\", \"devtools\", \"open-source\", \"business\", \"research\", \"security\", \"products\", \"funding\". Pick 1-4 per item.",
  "- Do NOT echo the input. Do NOT include prose, commentary, or markdown fences.",
  "- Return a single JSON object with this exact shape: {\"items\": [{\"id\": \"<id>\", \"people\": [...], \"orgs\": [...], \"products\": [...], \"topics\": [...], \"categories\": [...]}, ...]}",
].join("\n");

const USER_TEMPLATE = `Extract entities and categories from these news items:\n\n`;

const ALLOWED_CATEGORIES = new Set([
  "ai-models",
  "ai-agents",
  "mcp",
  "rag",
  "inference",
  "hardware",
  "devtools",
  "open-source",
  "business",
  "research",
  "security",
  "ethics",
  "regulation",
  "products",
  "funding",
]);

export type ExtractionBatchResult = {
  batch: number;
  items: number;
  entities: number;
  mentions: number;
  categories: number;
  cooccurrences: number;
  failed: boolean;
  error?: string;
};

export type ExtractionStats = {
  processed: number;
  entitiesCreated: number;
  mentionsCreated: number;
  categoriesAssigned: number;
  cooccurrencesBumped: number;
  model: string;
  durationMs: number;
  errors: Array<{ itemId: string; error: string }>;
  batches: ExtractionBatchResult[];
};

export type ExtractionOptions = {
  batchSize?: number;
  maxBatches?: number;
  minRelevance?: number;
  includeAllItems?: boolean;
  now?: Date;
  verbose?: boolean;
};

type LlmItemInput = {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
};

type LlmValue = string | { name?: string; aliases?: string[]; context?: string };

type LlmItemOutput = {
  id: string;
  people?: LlmValue[];
  orgs?: LlmValue[];
  products?: LlmValue[];
  topics?: LlmValue[];
  categories?: Array<string | { name?: string; score?: number }>;
};

type LlmOutput = { items: LlmItemOutput[] };

const openRouterApiKey = process.env.OPENROUTER_API_KEY;
const openRouterProvider = openRouterApiKey
  ? createOpenRouter({ apiKey: openRouterApiKey, headers: { "X-Title": "dans-blog news-watch extraction" } })
  : null;

export function isExtractionConfigured(): boolean {
  return openRouterProvider != null;
}

export async function extractEntitiesForPendingItems(
  db: NewsWatchDb,
  options: ExtractionOptions = {},
): Promise<ExtractionStats> {
  const startedAt = Date.now();
  const batchSize = options.batchSize ?? EXTRACTION_BATCH_SIZE;
  const maxBatches = options.maxBatches ?? EXTRACTION_MAX_BATCHES;
  const minRelevance = options.minRelevance ?? EXTRACTION_MIN_RELEVANCE;
  const includeAll = options.includeAllItems ?? false;

  if (!openRouterProvider) {
    return {
      processed: 0,
      entitiesCreated: 0,
      mentionsCreated: 0,
      categoriesAssigned: 0,
      cooccurrencesBumped: 0,
      model: EXTRACTION_MODEL,
      durationMs: 0,
      errors: [{ itemId: "-", error: "OPENROUTER_API_KEY not set" }],
      batches: [],
    };
  }

  const stats: ExtractionStats = {
    processed: 0,
    entitiesCreated: 0,
    mentionsCreated: 0,
    categoriesAssigned: 0,
    cooccurrencesBumped: 0,
    model: EXTRACTION_MODEL,
    durationMs: 0,
    errors: [],
    batches: [],
  };
  const now = options.now ?? new Date();
  const totalTarget = batchSize * maxBatches;

  // Bulk-fetch pending items upfront so concurrent workers extract disjoint sets
  // (avoids double-incrementing entity mention_count from overlapping reads).
  const pool = includeAll
    ? db.listAllItemsWithoutExtraction(totalTarget)
    : db.listItemsWithoutExtraction(totalTarget);
  const usablePool = pool.filter((row) => row.relevance_score >= minRelevance);
  const chunks: UnextractedItemRow[][] = [];
  for (let i = 0; i < usablePool.length; i += batchSize) {
    chunks.push(usablePool.slice(i, i + batchSize));
  }

  const tasks = chunks.map((chunk, batchIndex) => async () => {
    try {
      const result = await runExtractionBatch(chunk);
      const persisted = persistBatchResults(db, chunk, result, now.toISOString());
      stats.processed += chunk.length;
      stats.entitiesCreated += persisted.entities;
      stats.mentionsCreated += persisted.mentions;
      stats.categoriesAssigned += persisted.categories;
      stats.cooccurrencesBumped += persisted.cooccurrences;
      stats.batches.push({
        batch: batchIndex + 1,
        items: chunk.length,
        entities: persisted.entities,
        mentions: persisted.mentions,
        categories: persisted.categories,
        cooccurrences: persisted.cooccurrences,
        failed: false,
      });
      if (options.verbose) {
        console.log(`extraction batch ${batchIndex + 1}: ${chunk.length} items, ${persisted.entities} entities, ${persisted.mentions} mentions`);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      for (const row of chunk) stats.errors.push({ itemId: row.item_id, error: message });
      stats.batches.push({
        batch: batchIndex + 1,
        items: chunk.length,
        entities: 0,
        mentions: 0,
        categories: 0,
        cooccurrences: 0,
        failed: true,
        error: message,
      });
      if (options.verbose) {
        console.log(`extraction batch ${batchIndex + 1} failed: ${message}`);
      }
    }
  });

  await runWithConcurrency(tasks, EXTRACTION_CONCURRENCY);

  stats.durationMs = Date.now() - startedAt;
  return stats;
}

async function runExtractionBatch(rows: UnextractedItemRow[]): Promise<LlmOutput> {
  if (!openRouterProvider) throw new Error("OpenRouter provider not initialized");
  const model = openRouterProvider.chat(EXTRACTION_MODEL);
  const items = rows.map<LlmItemInput>((row) => ({
    id: row.item_id,
    title: row.title,
    summary: (row.summary ?? "").slice(0, 1500),
    source: row.source_key,
    url: row.canonical_url,
  }));
  const userPayload = USER_TEMPLATE + JSON.stringify(items);
  const result = await generateText({
    model,
    allowSystemInMessages: true,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userPayload },
    ],
    temperature: EXTRACTION_TEMPERATURE,
    maxOutputTokens: EXTRACTION_MAX_TOKENS,
    timeout: { totalMs: EXTRACTION_TIMEOUT_MS },
    providerOptions: {
      openrouter: {
        reasoning: { effort: EXTRACTION_REASONING_EFFORT, exclude: true },
      },
    },
  });
  const text = result.text.trim();
  if (!text) {
    throw new Error(`model returned no text (finishReason=${result.finishReason ?? "unknown"})`);
  }
  return parseLlmJson(text);
}

function parseLlmJson(text: string): LlmOutput {
  const fenced = text.match(/```(?:json)?\s*([\s\S]+?)\s*```/);
  const candidate = fenced ? fenced[1] : text;
  const firstBrace = candidate.indexOf("{");
  const lastBrace = candidate.lastIndexOf("}");
  const jsonText = firstBrace >= 0 && lastBrace > firstBrace ? candidate.slice(firstBrace, lastBrace + 1) : candidate;
  try {
    const parsed = JSON.parse(jsonText) as LlmOutput;
    if (!parsed || !Array.isArray(parsed.items)) {
      throw new Error("model JSON did not include an items array");
    }
    if (parsed.items.length === 0) {
      throw new Error("model JSON included an empty items array");
    }
    return parsed;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`failed to parse model JSON: ${message}`);
  }
}

function persistBatchResults(
  db: NewsWatchDb,
  rows: UnextractedItemRow[],
  output: LlmOutput,
  capturedAt: string,
) {
  const byId = new Map(rows.map((row) => [row.item_id, row]));
  let entities = 0;
  let mentions = 0;
  let categories = 0;
  let cooccurrences = 0;
  const seenEntityIdsByItem = new Map<string, Set<string>>();

  for (const llmItem of output.items) {
    const row = byId.get(llmItem.id);
    if (!row) continue;
    const itemEntityIds: string[] = [];
    const seen = new Set<string>();

    for (const list of [
      { type: "person" as const, entries: llmItem.people ?? [] },
      { type: "org" as const, entries: llmItem.orgs ?? [] },
      { type: "product" as const, entries: llmItem.products ?? [] },
      { type: "topic" as const, entries: llmItem.topics ?? [] },
    ]) {
      const itemMentions: EntityMention[] = [];
      for (const entry of list.entries) {
        const name = normalizeEntityName(entry);
        if (!name) continue;
        const entityId = makeEntityId(list.type, name);
        if (seen.has(entityId)) continue;
        seen.add(entityId);
        const aliases = extractAliases(entry);
        const entity: Entity = {
          entityId,
          name: canonicalName(name),
          type: list.type,
          aliases: dedupeAliases([name, ...aliases].map(canonicalName)),
          firstSeenAt: capturedAt,
          lastSeenAt: capturedAt,
          mentionCount: 0,
        };
        db.upsertEntity(entity);
        entities += 1;
        itemMentions.push({
          entityId,
          name: entity.name,
          type: entity.type,
          context: typeof entry === "object" ? entry.context : undefined,
        });
        itemEntityIds.push(entityId);
      }
      if (itemMentions.length > 0) {
        db.insertItemMentions(row.item_id, itemMentions, capturedAt);
        mentions += itemMentions.length;
      }
    }

    const validCategories = (llmItem.categories ?? [])
      .map((c) => (typeof c === "string" ? { name: c, score: 0.5 } : { name: c.name ?? "", score: c.score ?? 0.5 }))
      .filter((c) => c.name && c.name.length > 0)
      .map((c) => ({ name: c.name.toLowerCase(), score: clamp01(c.score) }))
      .filter((c) => ALLOWED_CATEGORIES.has(c.name));
    if (validCategories.length > 0) {
      db.upsertItemCategories(row.item_id, validCategories);
      categories += validCategories.length;
    }

    if (itemEntityIds.length > 1) {
      db.bumpCooccurrences(row.item_id, itemEntityIds, capturedAt);
      cooccurrences += pairCount(itemEntityIds.length);
    }

    seenEntityIdsByItem.set(row.item_id, new Set(itemEntityIds));
  }

  return { entities, mentions, categories, cooccurrences };
}

function makeEntityId(type: EntityType, name: string): string {
  return `${type}::${name.toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "").slice(0, 80) || "unknown"}`;
}

function normalizeEntityName(entry: string | { name?: string; aliases?: string[]; context?: string }): string {
  if (typeof entry === "string") return entry.trim();
  return (entry.name ?? "").trim();
}

function extractAliases(entry: string | { name?: string; aliases?: string[]; context?: string }): string[] {
  if (typeof entry === "string") return [];
  return (entry.aliases ?? []).map((a) => a.trim()).filter((a) => a.length > 0);
}

function canonicalName(value: string): string {
  const trimmed = value.trim().replace(/\s+/g, " ");
  if (trimmed.length === 0) return trimmed;
  // Preserve acronyms (>=2 consecutive uppercase letters) and words already in title/upper case.
  // Only re-case the rest of the words.
  return trimmed
    .split(" ")
    .map((word) => {
      if (/^[A-Z0-9&._-]{2,}$/.test(word)) return word;
      if (/[A-Z]/.test(word) && /[a-z]/.test(word)) return word;
      if (word.length === 0) return word;
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

function dedupeAliases(values: string[]): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of values) {
    const key = value.toLowerCase();
    if (seen.has(key) || !value) continue;
    seen.add(key);
    out.push(value);
  }
  return out.slice(0, 5);
}

function clamp01(value: number): number {
  if (value < 0) return 0;
  if (value > 1) return 1;
  return Number(value.toFixed(3));
}

function pairCount(n: number): number {
  return (n * (n - 1)) / 2;
}

type CliArgs = {
  all: boolean;
  minRelevance?: number;
  batchSize?: number;
  maxBatches?: number;
  quiet: boolean;
  json: boolean;
};

function parseCliArgs(argv: string[]): CliArgs {
  const args: CliArgs = { all: false, quiet: false, json: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--all") args.all = true;
    else if (arg === "--quiet") args.quiet = true;
    else if (arg === "--json") args.json = true;
    else if (arg === "--min-relevance") {
      const v = argv[i + 1];
      if (v == null) throw new Error("Missing value for --min-relevance");
      args.minRelevance = Number.parseFloat(v);
      i += 1;
    } else if (arg === "--batch-size") {
      const v = argv[i + 1];
      if (v == null) throw new Error("Missing value for --batch-size");
      args.batchSize = Number.parseInt(v, 10);
      i += 1;
    } else if (arg === "--max-batches") {
      const v = argv[i + 1];
      if (v == null) throw new Error("Missing value for --max-batches");
      args.maxBatches = Number.parseInt(v, 10);
      i += 1;
    }
  }
  return args;
}

function renderExtractionSummary(stats: ExtractionStats): string {
  const out: string[] = [];
  out.push("=== News Watch Extraction ===");
  out.push(`Model: ${stats.model}`);
  out.push(`Concurrency: ${EXTRACTION_CONCURRENCY}`);
  out.push(`Duration: ${fmtDuration(stats.durationMs)}`);
  out.push("");

  out.push("## Summary");
  const rows: Array<[string, string]> = [
    ["processed", stats.processed.toLocaleString()],
    ["entities created", stats.entitiesCreated.toLocaleString()],
    ["mentions created", stats.mentionsCreated.toLocaleString()],
    ["categories assigned", stats.categoriesAssigned.toLocaleString()],
    ["co-occurrence edges", stats.cooccurrencesBumped.toLocaleString()],
    ["batches run", String(stats.batches.length)],
    ["batches failed", String(stats.batches.filter((b) => b.failed).length)],
    ["item errors", String(stats.errors.length)],
  ];
  const labelWidth = Math.max(...rows.map((r) => r[0].length));
  for (const [label, value] of rows) {
    out.push(`  ${label.padEnd(labelWidth)}  ${value}`);
  }
  out.push("");

  if (stats.batches.length > 0) {
    out.push("## Batches");
    const tableRows: string[][] = stats.batches.map((b) => [
      String(b.batch),
      String(b.items),
      String(b.entities),
      String(b.mentions),
      String(b.categories),
      String(b.cooccurrences),
      b.failed ? "FAIL" : "ok",
      b.failed ? truncate(b.error ?? "", 40) : "",
    ]);
    out.push(...printTable(["BATCH", "ITEMS", "ENTITIES", "MENTIONS", "CATS", "COOCUR", "STATUS", "ERROR"], tableRows));
    out.push("");
  }

  if (stats.errors.length > 0) {
    out.push(`## Errors (${stats.errors.length})`);
    const errorRows: string[][] = stats.errors.slice(0, 20).map((e) => [
      truncate(e.itemId, 36),
      truncate(e.error, 70),
    ]);
    out.push(...printTable(["ITEM_ID", "ERROR"], errorRows));
    if (stats.errors.length > 20) {
      out.push(`... and ${stats.errors.length - 20} more`);
    }
    out.push("");
  }

  if (!isExtractionConfigured()) {
    out.push("NOTE: OPENROUTER_API_KEY not set — extraction skipped. Set it in .env to enable.");
  }

  return out.join("\n");
}

if (import.meta.main) {
  const args = parseCliArgs(process.argv.slice(2));
  if (!isExtractionConfigured() && !args.quiet) {
    console.log(renderExtractionSummary({
      processed: 0,
      entitiesCreated: 0,
      mentionsCreated: 0,
      categoriesAssigned: 0,
      cooccurrencesBumped: 0,
      model: EXTRACTION_MODEL,
      durationMs: 0,
      errors: [{ itemId: "-", error: "OPENROUTER_API_KEY not set" }],
      batches: [],
    }));
    process.exitCode = 0;
    process.exit(0);
  }
  const db = openNewsWatchDb(NEWS_WATCH_DB_PATH);
  try {
    const stats = await extractEntitiesForPendingItems(db, {
      includeAllItems: args.all,
      minRelevance: args.minRelevance,
      batchSize: args.batchSize,
      maxBatches: args.maxBatches,
      verbose: !args.quiet,
    });
    if (args.json) {
      console.log(JSON.stringify(stats, null, 2));
    } else if (!args.quiet) {
      console.log(renderExtractionSummary(stats));
    }
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    db.close();
  }
}
