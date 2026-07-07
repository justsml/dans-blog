import { describe, expect, test } from "bun:test";
import { getRedditListingParts } from "./sources.ts";
import { detectTrendSignal, engagementScore, makeItemId, makeTopicKey } from "./trend.ts";
import type { CapturedItem } from "./types.ts";

const baseItem: CapturedItem = {
  sourceKey: "reddit-local-llama",
  sourceType: "reddit",
  sourceName: "Reddit r/LocalLLaMA hot",
  externalId: "abc",
  canonicalUrl: "https://www.reddit.com/r/LocalLLaMA/comments/abc/demo",
  title: "Local LLM inference gets much faster with new quantization trick",
  capturedAt: "2026-07-07T12:00:00.000Z",
  metrics: { score: 40, comments: 8, rank: 2 },
  raw: {},
};

describe("news-watch trend detection", () => {
  test("builds stable item and topic keys", () => {
    expect(makeItemId(baseItem)).toHaveLength(24);
    expect(makeTopicKey(baseItem)).toHaveLength(16);
    expect(makeItemId(baseItem)).toBe(makeItemId(baseItem));
  });

  test("weights comments and rank into engagement", () => {
    expect(engagementScore({ score: 10, comments: 5, rank: 1 })).toBe(64);
  });

  test("signals fast growth for relevant items", () => {
    const signal = detectTrendSignal({
      item: baseItem,
      itemId: "item",
      topicKey: "topic",
      relevanceScore: 0.72,
      rapidPollSeconds: 60,
      previous: {
        observedAt: "2026-07-07T11:00:00.000Z",
        score: 20,
        comments: 2,
        rank: 7,
        engagementScore: 56,
      },
      current: {
        observedAt: "2026-07-07T12:00:00.000Z",
        score: 140,
        comments: 28,
        rank: 2,
        engagementScore: 285,
      },
    });

    expect(signal?.signalType).toBe("runaway-growth");
    expect(signal?.recommendedPollSeconds).toBe(60);
  });

  test("derives reddit listing parts from source urls", () => {
    expect(getRedditListingParts({
      key: "reddit-local-llama",
      type: "reddit",
      name: "Reddit r/LocalLLaMA hot",
      url: "https://www.reddit.com/r/LocalLLaMA/hot.json?limit=50",
      enabled: true,
      pollIntervalSeconds: 600,
      rapidIntervalSeconds: 60,
    })).toEqual({
      subreddit: "LocalLLaMA",
      listing: "hot",
    });
  });
});
