import { NEWS_WATCH_DB_PATH, NEWS_WATCH_ITEM_DIR, getSources } from "./config.ts";
import { openNewsWatchDb } from "./db.ts";
import { writeItemMarkdown } from "./markdown.ts";
import { scoreRelevance } from "./relevance.ts";
import { fetchSource } from "./sources.ts";
import { detectTrendSignal, engagementScore, makeItemId, makeTopicKey } from "./trend.ts";
import type { SourceSpec, TrendSignal } from "./types.ts";

type RunOptions = {
  all?: boolean;
  sourceKeys?: string[];
  now?: Date;
  quiet?: boolean;
};

export async function runNewsWatchOnce(options: RunOptions = {}) {
  const now = options.now ?? new Date();
  const db = openNewsWatchDb(NEWS_WATCH_DB_PATH);
  const sources = getSources().filter((source) =>
    options.sourceKeys == null || options.sourceKeys.includes(source.key),
  );
  const summary = {
    checkedSources: 0,
    skippedSources: 0,
    capturedItems: 0,
    signals: [] as TrendSignal[],
    failures: [] as Array<{ source: string; error: string }>,
  };

  try {
    for (const source of sources) {
      if (!options.all && !db.isSourceDue(source, now)) {
        summary.skippedSources += 1;
        continue;
      }

      summary.checkedSources += 1;
      try {
        const sourceSignals = await captureSource(source, now, db);
        summary.capturedItems += sourceSignals.capturedItems;
        summary.signals.push(...sourceSignals.signals);
        db.recordSourceSuccess(source, now, sourceSignals.signals.length);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        summary.failures.push({ source: source.key, error: message });
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

async function captureSource(source: SourceSpec, now: Date, db: ReturnType<typeof openNewsWatchDb>) {
  const signals: TrendSignal[] = [];

  try {
    const items = await fetchSource(source, now.toISOString());

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
    };
  } catch (error) {
    db.recordSourceFailure(source, now, error);
    throw error;
  }
}

function renderRunSummary(summary: Awaited<ReturnType<typeof runNewsWatchOnce>>) {
  const lines = [
    `Checked ${summary.checkedSources} source(s), skipped ${summary.skippedSources}, captured ${summary.capturedItems} item(s).`,
  ];

  if (summary.signals.length > 0) {
    lines.push(`Signals: ${summary.signals.length}`);
    for (const signal of summary.signals.slice(0, 10)) {
      lines.push(`- ${signal.signalScore.toFixed(2)} ${signal.signalType}: ${signal.reason}`);
    }
  } else {
    lines.push("Signals: 0");
  }

  if (summary.failures.length > 0) {
    lines.push(`Failures: ${summary.failures.length}`);
    for (const failure of summary.failures) {
      lines.push(`- ${failure.source}: ${failure.error}`);
    }
  }

  return lines.join("\n");
}

function parseArgs(argv = process.argv.slice(2)): RunOptions {
  const sourceKeys: string[] = [];
  let all = false;
  let quiet = false;

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--all") all = true;
    if (arg === "--quiet") quiet = true;
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
    sourceKeys: sourceKeys.length > 0 ? sourceKeys : undefined,
  };
}

if (import.meta.main) {
  runNewsWatchOnce(parseArgs()).catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
