import { expect, test } from "bun:test";
import {
  projectTranslationScores,
  sendTranslationScores,
} from "./langfuse-score-projection.ts";

test("saved metrics keep their scales and stable identities without invented missing values", () => {
  const record = {
    at: "2026-09-01T00:00:00Z",
    overallScore: 94.4,
    confidenceScore: 0.8,
    readability: 0,
    recommendation: "accept",
    technicalAccuracy: null,
    coherence: NaN,
  };
  const scores = projectTranslationScores(
    record,
    { traceId: "trace", observationId: "span" },
    "source-hash",
  );
  expect(scores.map((s) => [s.name, s.value])).toEqual([
    ["i18n.readability", 0],
    ["i18n.overallScore", 94.4],
    ["i18n.confidenceScore", 0.8],
    ["i18n.recommendation", "accept"],
  ]);
  expect(
    projectTranslationScores(
      record,
      { traceId: "trace", observationId: "span" },
      "source-hash",
    ),
  ).toEqual(scores);
  expect(scores.every((s) => s.metadata.sourceTimestamp === record.at)).toBe(
    true,
  );
});

test("core and candidate judges project nested dimensions and boolean decisions", () => {
  const scores = projectTranslationScores(
    {
      scores: { fidelity: 82 },
      judgeScores: { culturalAdaptation: 90, languagePurity: 88 },
      publishReady: false,
    },
    { traceId: "trace" },
    "source",
  );
  expect(scores.map((s) => s.name)).toEqual([
    "i18n.fidelity",
    "i18n.culturalAdaptation",
    "i18n.languagePurity",
    "i18n.publishReady",
  ]);
  expect(scores.at(-1)).toMatchObject({ value: 0, dataType: "BOOLEAN" });
});

test("score delivery preserves source timestamps and treats partial rejection as failure", async () => {
  const names = [
    "LANGFUSE_BASE_URL",
    "LANGFUSE_PUBLIC_KEY",
    "LANGFUSE_SECRET_KEY",
  ];
  const old = names.map((name) => process.env[name]);
  process.env.LANGFUSE_BASE_URL = "http://localhost:1";
  process.env.LANGFUSE_PUBLIC_KEY = "test";
  process.env.LANGFUSE_SECRET_KEY = "test";
  try {
    const scores = projectTranslationScores(
      { at: "2026-09-01T00:00:00Z", overallScore: 50 },
      { traceId: "trace" },
      "source",
    );
    let body: any;
    const fake = (async (_url: unknown, options: RequestInit) => {
      body = JSON.parse(String(options.body));
      return Response.json({ errors: [{ id: "rejected" }] });
    }) as typeof fetch;
    await expect(
      sendTranslationScores(scores, "2026-09-24T00:00:00Z", fake),
    ).rejects.toThrow("rejected 1");
    expect(body.batch[0].timestamp).toBe("2026-09-01T00:00:00Z");
    expect(body.batch[0].type).toBe("score-create");
  } finally {
    for (const [i, name] of names.entries()) {
      if (old[i] === undefined) delete process.env[name];
      else process.env[name] = old[i];
    }
  }
});
