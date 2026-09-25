import { expect, test } from "bun:test";
import {
  projectEvalScores,
  projectTranslationScores,
  propagatableMetadata,
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

test("eval scores stay on their 0–1 scale under an eval. prefix with stable ids", () => {
  const link = { traceId: "t1", observationId: "o1" };
  const scores = projectEvalScores(
    "eval:post/ja",
    [
      { name: "mdx", score: 1, passed: true, severity: "high" },
      { name: "judge", score: 0.82, passed: false, severity: "medium", details: "tone drift" },
      { name: "broken", score: Number.NaN, passed: false, severity: "low" },
    ],
    link,
  );
  expect(scores.map((s) => [s.name, s.value])).toEqual([
    ["eval.mdx", 1],
    ["eval.judge", 0.82],
  ]);
  expect(scores[1]).toMatchObject({
    ...link,
    dataType: "NUMERIC",
    comment: "tone drift",
    metadata: { evalName: "eval:post/ja", passed: false, severity: "medium" },
  });
  expect(projectEvalScores("eval:post/ja", [{ name: "mdx", score: 1 }], link)[0].id)
    .toBe(scores[0].id);
});

test("only short scalar metadata is propagated to child observations", () => {
  expect(
    propagatableMetadata({
      slug: "trust-but-throttle",
      attempt: 2,
      dryRun: false,
      profiles: { translation: "v3" },
      missing: undefined,
      huge: "x".repeat(201),
    }),
  ).toEqual({ slug: "trust-but-throttle", attempt: "2", dryRun: "false" });
});
