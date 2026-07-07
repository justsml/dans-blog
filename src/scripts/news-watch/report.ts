import { NEWS_WATCH_DB_PATH } from "./config.ts";
import { openNewsWatchDb } from "./db.ts";

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

if (import.meta.main) {
  renderReport().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

export async function renderReport(limit = 20) {
  const db = openNewsWatchDb(NEWS_WATCH_DB_PATH);
  try {
    const rows = db.db.prepare(`
      SELECT
        s.detected_at,
        s.signal_score,
        s.signal_type,
        s.reason,
        i.title,
        i.canonical_url,
        i.source_name,
        i.relevance_score
      FROM news_trend_signals s
      JOIN news_items i ON i.item_id = s.item_id
      ORDER BY s.detected_at DESC, s.signal_score DESC
      LIMIT ?
    `).all(limit) as SignalRow[];

    if (rows.length === 0) {
      console.log("No trend signals captured yet.");
      return;
    }

    for (const row of rows) {
      console.log([
        `## ${row.title}`,
        `- Signal: ${row.signal_score.toFixed(2)} ${row.signal_type}`,
        `- Source: ${row.source_name}`,
        `- Relevance: ${row.relevance_score.toFixed(2)}`,
        `- Detected: ${row.detected_at}`,
        `- URL: ${row.canonical_url}`,
        `- Reason: ${row.reason}`,
        "",
      ].join("\n"));
    }
  } finally {
    db.close();
  }
}
