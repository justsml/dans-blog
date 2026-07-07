import { createHash } from "node:crypto";
import type { CapturedItem, StoredMetric, TrendSignal } from "./types.ts";

const STOPWORDS = new Set([
  "about",
  "after",
  "again",
  "against",
  "and",
  "are",
  "because",
  "been",
  "before",
  "being",
  "from",
  "have",
  "into",
  "over",
  "that",
  "the",
  "this",
  "with",
  "your",
]);

export function makeItemId(item: CapturedItem) {
  return createHash("sha256")
    .update(`${item.sourceKey}\n${item.externalId || item.canonicalUrl}`)
    .digest("hex")
    .slice(0, 24);
}

export function makeTopicKey(item: CapturedItem) {
  const tokens = item.title
    .toLowerCase()
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/[^a-z0-9\s.-]/g, " ")
    .split(/\s+/)
    .map((token) => token.replace(/^\.+|\.+$/g, ""))
    .filter((token) => token.length > 2 && !STOPWORDS.has(token))
    .slice(0, 10);

  const topicText = tokens.join(" ") || item.canonicalUrl;
  return createHash("sha1").update(topicText).digest("hex").slice(0, 16);
}

export function engagementScore(metric: {
  score?: number;
  upvotes?: number;
  comments?: number;
  likes?: number;
  reposts?: number;
  shares?: number;
  views?: number;
  rank?: number;
}) {
  const score = metric.score ?? metric.upvotes ?? 0;
  const comments = metric.comments ?? 0;
  const likes = metric.likes ?? 0;
  const reposts = metric.reposts ?? 0;
  const shares = metric.shares ?? 0;
  const views = metric.views ?? 0;
  const rankBoost = metric.rank != null && metric.rank > 0 ? Math.max(0, 35 - metric.rank) : 0;

  return Number((score + likes + comments * 4 + reposts * 6 + shares * 6 + views * 0.01 + rankBoost).toFixed(3));
}

export function detectTrendSignal(input: {
  item: CapturedItem;
  itemId: string;
  topicKey: string;
  relevanceScore: number;
  previous?: StoredMetric;
  current: StoredMetric;
  rapidPollSeconds: number;
}): TrendSignal | undefined {
  const { item, itemId, topicKey, relevanceScore, previous, current, rapidPollSeconds } = input;

  if (relevanceScore < 0.32) return undefined;

  if (previous == null) {
    const isTopRanked = current.rank != null && current.rank <= 3;
    const isStronglyRelevant = relevanceScore >= 0.68;
    if (!isTopRanked && !isStronglyRelevant) return undefined;

    return {
      itemId,
      topicKey,
      detectedAt: current.observedAt,
      signalScore: Number((relevanceScore * 0.72 + (isTopRanked ? 0.18 : 0)).toFixed(3)),
      signalType: "new-relevant",
      reason: isTopRanked
        ? `New relevant item entered top ${current.rank} for ${item.sourceName}.`
        : "New item is strongly aligned with AI consulting watch terms.",
      recommendedPollSeconds: rapidPollSeconds,
      current,
    };
  }

  const elapsedHours = Math.max(
    1 / 60,
    (Date.parse(current.observedAt) - Date.parse(previous.observedAt)) / 3_600_000,
  );
  const delta = current.engagementScore - previous.engagementScore;
  const velocityPerHour = delta / elapsedHours;
  const growthRatio =
    previous.engagementScore > 5 ? current.engagementScore / previous.engagementScore : 1;
  const lowBaselineJump = previous.engagementScore <= 5 && current.engagementScore >= 50;
  const commentVelocity =
    ((current.comments ?? 0) - (previous.comments ?? 0)) / elapsedHours;

  const isRunaway =
    velocityPerHour >= 30 ||
    growthRatio >= 1.6 ||
    lowBaselineJump ||
    commentVelocity >= 10 ||
    (relevanceScore >= 0.62 && current.engagementScore >= 250);

  if (!isRunaway) return undefined;

  const growthComponent = Math.min(0.24, Math.log2(Math.max(1, growthRatio)) / 6);
  const velocityComponent = Math.min(0.28, Math.log10(Math.max(1, velocityPerHour)) / 5);
  const signalScore = Math.min(1, relevanceScore * 0.56 + growthComponent + velocityComponent);

  return {
    itemId,
    topicKey,
    detectedAt: current.observedAt,
    signalScore: Number(signalScore.toFixed(3)),
    signalType: current.engagementScore >= 1000 ? "high-engagement" : "runaway-growth",
    reason: [
      `Engagement ${previous.engagementScore.toFixed(1)} -> ${current.engagementScore.toFixed(1)}`,
      `velocity ${velocityPerHour.toFixed(1)}/hour`,
      `growth ${growthRatio.toFixed(2)}x`,
    ].join("; "),
    recommendedPollSeconds: rapidPollSeconds,
    previous,
    current,
  };
}
