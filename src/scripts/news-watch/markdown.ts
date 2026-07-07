import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { CapturedItem, RelevanceResult } from "./types.ts";

export function writeItemMarkdown(input: {
  itemDir: string;
  itemId: string;
  topicKey: string;
  item: CapturedItem;
  relevance: RelevanceResult;
}) {
  const { itemDir, itemId, topicKey, item, relevance } = input;
  const date = item.capturedAt.slice(0, 10);
  const outputDir = join(itemDir, date.slice(0, 4), date.slice(5, 7));
  const path = join(outputDir, `${date}--${itemId}.md`);
  mkdirSync(outputDir, { recursive: true });

  writeFileSync(path, renderMarkdown(itemId, topicKey, item, relevance), "utf8");
  return path;
}

function renderMarkdown(itemId: string, topicKey: string, item: CapturedItem, relevance: RelevanceResult) {
  return [
    "---",
    `item_id: ${JSON.stringify(itemId)}`,
    `topic_key: ${JSON.stringify(topicKey)}`,
    `source_key: ${JSON.stringify(item.sourceKey)}`,
    `source_type: ${JSON.stringify(item.sourceType)}`,
    `source_name: ${JSON.stringify(item.sourceName)}`,
    `url: ${JSON.stringify(item.canonicalUrl)}`,
    `published_at: ${JSON.stringify(item.publishedAt ?? null)}`,
    `captured_at: ${JSON.stringify(item.capturedAt)}`,
    `relevance_score: ${relevance.score}`,
    `matched_terms: ${JSON.stringify(relevance.matchedTerms)}`,
    "---",
    "",
    `# ${item.title}`,
    "",
    item.summary ? item.summary : "_No summary captured._",
    "",
    "## Source",
    "",
    `- Source: ${item.sourceName}`,
    `- URL: ${item.canonicalUrl}`,
    item.author ? `- Author: ${item.author}` : undefined,
    item.publishedAt ? `- Published: ${item.publishedAt}` : undefined,
    "",
    "## Metrics",
    "",
    "```json",
    JSON.stringify(item.metrics, null, 2),
    "```",
    "",
    "## Relevance",
    "",
    relevance.reasons.length > 0
      ? relevance.reasons.map((reason) => `- ${reason}`).join("\n")
      : "- No specialty terms matched.",
    "",
  ].filter((line) => line !== undefined).join("\n");
}
