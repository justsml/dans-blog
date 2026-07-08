import { NEWS_WATCH_DB_PATH } from "./config.ts";
import { openNewsWatchDb } from "./db.ts";
import { fmtTime, pct, printTable, truncate } from "./format.ts";
import type { EntityType } from "./types.ts";

type CliArgs = {
  command: string;
  type?: EntityType;
  limit: number;
  since?: string;
  itemId?: string;
  category?: string;
  json: boolean;
};

export async function runGraphCli(argv: string[]) {
  const args = parseArgs(argv);
  const db = openNewsWatchDb(NEWS_WATCH_DB_PATH);
  try {
    switch (args.command) {
      case "entities":
        return renderEntities(db, args);
      case "cooccurrences":
        return renderCooccurrences(db, args);
      case "categories":
        return renderCategories(db, args);
      case "authors":
        return renderAuthors(db, args);
      case "item":
        return renderItem(db, args);
      case "stats":
        return renderStats(db, args);
      default:
        throw new Error(`unknown command: ${args.command}`);
    }
  } finally {
    db.close();
  }
}

function renderEntities(db: ReturnType<typeof openNewsWatchDb>, args: CliArgs) {
  const type = args.type ?? "org";
  const rows = db.listEntitiesByType(type, args.limit);
  if (args.json) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }
  if (rows.length === 0) {
    console.log(`No ${type} entities found.`);
    return;
  }
  console.log(`## Top ${rows.length} ${type} entities`);
  const tableRows: string[][] = rows.map((r) => [
    String(r.mentionCount),
    truncate(r.name, 40),
    r.aliases.slice(0, 3).join(", "),
    fmtTime(r.lastSeenAt),
  ]);
  console.log(printTable(["MENTIONS", "NAME", "ALIASES", "LAST_SEEN"], tableRows).join("\n"));
}

function renderCooccurrences(db: ReturnType<typeof openNewsWatchDb>, args: CliArgs) {
  const rows = db.listTopCooccurrences(args.limit, args.since);
  if (args.json) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }
  if (rows.length === 0) {
    console.log("No co-occurrences found.");
    return;
  }
  console.log(`## Top ${rows.length} entity co-occurrences${args.since ? ` (since ${args.since})` : ""}`);
  const tableRows: string[][] = rows.map((r) => [
    String(r.count),
    truncate(r.entityAId, 36),
    "↔",
    truncate(r.entityBId, 36),
    fmtTime(r.lastSeenAt),
  ]);
  console.log(printTable(["COUNT", "ENTITY_A", "", "ENTITY_B", "LAST_SEEN"], tableRows).join("\n"));
}

function renderCategories(db: ReturnType<typeof openNewsWatchDb>, args: CliArgs) {
  const rows = db.db
    .prepare(`
      SELECT category, COUNT(DISTINCT item_id) AS item_count, AVG(score) AS avg_score
      FROM news_item_categories
      GROUP BY category
      ORDER BY item_count DESC
      LIMIT ?
    `)
    .all(args.limit) as Array<{ category: string; item_count: number; avg_score: number | null }>;
  if (args.json) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }
  if (rows.length === 0) {
    console.log("No categories found.");
    return;
  }
  console.log(`## Top ${rows.length} categories`);
  const tableRows: string[][] = rows.map((r) => [
    String(r.item_count),
    r.avg_score != null ? r.avg_score.toFixed(2) : "-",
    r.category,
  ]);
  console.log(printTable(["ITEMS", "AVG_SCORE", "CATEGORY"], tableRows).join("\n"));
}

function renderAuthors(db: ReturnType<typeof openNewsWatchDb>, args: CliArgs) {
  const rows = db.db
    .prepare(`
      SELECT a.display_name, a.source_key, a.item_count, a.last_seen_at
      FROM news_authors a
      ORDER BY a.item_count DESC, a.last_seen_at DESC
      LIMIT ?
    `)
    .all(args.limit) as Array<{ display_name: string; source_key: string; item_count: number; last_seen_at: string }>;
  if (args.json) {
    console.log(JSON.stringify(rows, null, 2));
    return;
  }
  if (rows.length === 0) {
    console.log("No authors found.");
    return;
  }
  console.log(`## Top ${rows.length} authors`);
  const tableRows: string[][] = rows.map((r) => [
    String(r.item_count),
    truncate(r.source_key, 22),
    truncate(r.display_name, 40),
    fmtTime(r.last_seen_at),
  ]);
  console.log(printTable(["ITEMS", "SOURCE", "NAME", "LAST_SEEN"], tableRows).join("\n"));
}

function renderItem(db: ReturnType<typeof openNewsWatchDb>, args: CliArgs) {
  if (!args.itemId) throw new Error("--item <itemId> required for 'item' command");
  const extraction = db.getItemExtraction(args.itemId);
  if (!extraction) {
    console.log(`No extraction found for ${args.itemId}`);
    return;
  }
  if (args.json) {
    console.log(JSON.stringify(extraction, null, 2));
    return;
  }
  console.log(`Item ${args.itemId}:`);
  for (const [kind, list] of [
    ["People", extraction.people],
    ["Orgs", extraction.orgs],
    ["Products", extraction.products],
    ["Topics", extraction.topics],
  ] as const) {
    if (list.length === 0) continue;
    console.log(`  ${kind}:`);
    for (const m of list) {
      console.log(`    - ${m.name}${m.context ? ` — ${m.context}` : ""}`);
    }
  }
  if (extraction.categories.length > 0) {
    console.log(`  Categories:`);
    for (const c of extraction.categories) {
      console.log(`    - ${c.name}: ${c.score.toFixed(2)}`);
    }
  }
}

function renderStats(db: ReturnType<typeof openNewsWatchDb>, _args: CliArgs) {
  const items = (db.db.prepare("SELECT COUNT(*) AS n FROM news_items").get() as { n: number }).n;
  const extracted = (db.db.prepare("SELECT COUNT(DISTINCT item_id) AS n FROM news_item_mentions").get() as { n: number }).n;
  const entities = (db.db.prepare("SELECT COUNT(*) AS n FROM news_entities").get() as { n: number }).n;
  const authors = (db.db.prepare("SELECT COUNT(*) AS n FROM news_authors").get() as { n: number }).n;
  const cooccurrences = (db.db.prepare("SELECT COUNT(*) AS n FROM news_entity_cooccurrences").get() as { n: number }).n;
  const categories = (db.db.prepare("SELECT COUNT(DISTINCT category) AS n FROM news_item_categories").get() as { n: number }).n;
  const signals = (db.db.prepare("SELECT COUNT(*) AS n FROM news_trend_signals").get() as { n: number }).n;
  const metrics = (db.db.prepare("SELECT COUNT(*) AS n FROM news_item_metrics").get() as { n: number }).n;
  const sources = (db.db.prepare("SELECT COUNT(*) AS n FROM news_sources").get() as { n: number }).n;
  const enabledSources = (db.db.prepare("SELECT COUNT(*) AS n FROM news_sources WHERE enabled = 1").get() as { n: number }).n;

  console.log("=== News Graph Stats ===");
  const rows: Array<[string, string]> = [
    ["sources", `${sources.toLocaleString()} (${enabledSources.toLocaleString()} enabled)`],
    ["items", items.toLocaleString()],
    ["items w/ extraction", `${extracted.toLocaleString()} (${pct(extracted, items)})`],
    ["signals", signals.toLocaleString()],
    ["metrics observations", metrics.toLocaleString()],
    ["entities", entities.toLocaleString()],
    ["authors", authors.toLocaleString()],
    ["co-occurrence edges", cooccurrences.toLocaleString()],
    ["distinct categories", categories.toLocaleString()],
  ];
  const labelWidth = Math.max(...rows.map((r) => r[0].length));
  for (const [label, value] of rows) {
    console.log(`  ${label.padEnd(labelWidth)}  ${value}`);
  }
}

function parseArgs(argv: string[]): CliArgs {
  const positional: string[] = [];
  const flags: Record<string, string | boolean> = {};
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const key = arg.slice(2);
      const next = argv[i + 1];
      if (next != null && !next.startsWith("--")) {
        flags[key] = next;
        i += 1;
      } else {
        flags[key] = true;
      }
    } else {
      positional.push(arg);
    }
  }
  return {
    command: positional[0] ?? "stats",
    type: (flags.type as EntityType | undefined),
    limit: flags.limit != null ? Number.parseInt(String(flags.limit), 10) || 25 : 25,
    since: flags.since != null ? String(flags.since) : undefined,
    itemId: flags.item != null ? String(flags.item) : undefined,
    category: flags.category != null ? String(flags.category) : undefined,
    json: flags.json === true,
  };
}

if (import.meta.main) {
  runGraphCli(process.argv.slice(2)).catch((err) => {
    console.error(err);
    process.exitCode = 1;
  });
}
