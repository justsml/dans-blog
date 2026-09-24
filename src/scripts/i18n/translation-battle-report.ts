import { existsSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
const dir =
  process.argv[2] ?? "reports/i18n/translation-battles/2026-09-24-gold-v1";
const read = (p: string) => JSON.parse(readFileSync(p, "utf8"));
const inputs = readFileSync(join(dir, "inputs.jsonl"), "utf8")
  .trim()
  .split("\n")
  .map((line) => JSON.parse(line));
const records = readdirSync(dir)
  .filter((f) => f.endsWith("-result.jsonl"))
  .map((f) => read(join(dir, f)));
const calls = readdirSync(join(dir, "calls")).map((f) =>
  read(join(dir, "calls", f)),
);
const extra = (file: string) =>
  existsSync(join(dir, file))
    ? readFileSync(join(dir, file), "utf8")
        .trim()
        .split("\n")
        .filter(Boolean)
        .map((line) => JSON.parse(line))
    : [];
const quizChecks = extra("quiz-checks.jsonl"),
  mdxChecks = extra("mdx-checks.jsonl");
for (const c of calls) {
  c.accountingAnomaly = !!c.text && c.telemetry?.outputTokens === 0;
  if (c.accountingAnomaly) c.catalogEstimateUsd = undefined;
}
const manifest = read(join(dir, "manifest.jsonl"));
const mean = (xs: number[]) =>
  xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null;
const sum = (xs: (number | undefined)[]) =>
  xs.length && xs.every((x) => typeof x === "number")
    ? xs.reduce<number>((a, b) => a + b!, 0)
    : null;
const quantile = (xs: number[], p: number) =>
  xs.length
    ? [...xs].sort((a, b) => a - b)[Math.max(0, Math.ceil(xs.length * p) - 1)]
    : null;
const score = (a: any) => mean(a.ratings.map((r: any) => r.score))!;
const caseRows = records
  .filter((r) => r.id.startsWith("gen-"))
  .map((g) => {
    const reviews = records.filter((r) => r.generationId === g.id && r.ok);
    return {
      caseId: g.caseId,
      model: g.model,
      generationId: g.id,
      completed: g.ok,
      validation: g.validation,
      reviews: reviews.map((r) => ({
        judge: r.judge,
        quality: score(
          r.result.candidates.find((c: any) => c.label === r.generatedLabel)
            .assessment,
        ),
        goldQuality: score(
          r.result.candidates.find((c: any) => c.label !== r.generatedLabel)
            .assessment,
        ),
        preference:
          r.result.preferredLabel === "tie"
            ? "tie"
            : r.result.preferredLabel === r.generatedLabel
              ? "generated"
              : "gold",
      })),
      preferenceAgreement:
        reviews.length === 2
          ? reviews.every(
              (r) =>
                (r.result.preferredLabel === "tie"
                  ? "tie"
                  : r.result.preferredLabel === r.generatedLabel
                    ? "generated"
                    : "gold") ===
                (reviews[0].result.preferredLabel === "tie"
                  ? "tie"
                  : reviews[0].result.preferredLabel ===
                      reviews[0].generatedLabel
                    ? "generated"
                    : "gold"),
            )
          : null,
    };
  });
writeFileSync(
  join(dir, "per-case.jsonl"),
  caseRows.map((r) => JSON.stringify(r)).join("\n") + "\n",
);
const rows = manifest.identity.models
  .map((m: any) => {
    const gens = records.filter(
      (r) => r.model === m.id && r.id.startsWith("gen-"),
    );
    const receipts = calls.filter(
      (r) => r.model === m.id && r.id.startsWith("gen-"),
    );
    const reviews = records.filter(
      (r) => r.model === m.id && r.id.startsWith("review-") && r.ok,
    );
    const pairs = reviews.map((r) => ({
      r,
      g: r.result.candidates.find((c: any) => c.label === r.generatedLabel)
        .assessment,
      ref: r.result.candidates.find((c: any) => c.label !== r.generatedLabel)
        .assessment,
    }));
    const known = receipts.filter((r) => r.telemetry);
    return {
      model: m.id,
      effort: m.effort,
      byJudge: Object.fromEntries(
        manifest.identity.judges.map((j: string) => {
          const ps = pairs.filter((p) => p.r.judge === j);
          return [
            j,
            {
              reviews: ps.length,
              quality: mean(ps.map((p) => score(p.g))),
              gap: mean(ps.map((p) => score(p.g) - score(p.ref))),
            },
          ];
        }),
      ),
      byLocale: Object.fromEntries(
        ["es", "ja"].map((locale) => {
          const ps = pairs.filter(
            (p) => inputs.find((c) => c.id === p.r.caseId)?.locale === locale,
          );
          return [
            locale,
            {
              reviews: ps.length,
              quality: mean(ps.map((p) => score(p.g))),
              gap: mean(ps.map((p) => score(p.g) - score(p.ref))),
            },
          ];
        }),
      ),
      quizChecks: quizChecks.filter((r) => r.model === m.id),
      postProcessingRegressions: mdxChecks.filter(
        (r) => r.model === m.id && !r.rawError && r.normalizedError,
      ).length,
      planned: 5,
      attempted: receipts.length,
      completed: receipts.filter((r) => r.finishReason === "stop").length,
      abnormalFinishReasons: receipts
        .filter((r) => r.finishReason !== "stop")
        .map((r) => ({ id: r.id, finishReason: r.finishReason })),
      accountingAnomalies: receipts.filter((r) => r.accountingAnomaly).length,
      validationPassed: gens.filter((r) => r.validation?.passed).length,
      structuralPassed: gens.filter(
        (r) =>
          r.validation &&
          !r.validation.error &&
          r.validation.issues?.every((i: any) => i.severity === "low"),
      ).length,
      reviews: pairs.length,
      quality: mean(pairs.map((p) => score(p.g))),
      goldQuality: mean(pairs.map((p) => score(p.ref))),
      gap: mean(pairs.map((p) => score(p.g) - score(p.ref))),
      wins: pairs.filter(
        (p) => p.r.result.preferredLabel === p.r.generatedLabel,
      ).length,
      ties: pairs.filter((p) => p.r.result.preferredLabel === "tie").length,
      losses: pairs.filter(
        (p) =>
          p.r.result.preferredLabel !== "tie" &&
          p.r.result.preferredLabel !== p.r.generatedLabel,
      ).length,
      ready: pairs.filter((p) => p.g.ready).length,
      severity4or5: pairs.reduce(
        (n, p) => n + p.g.unresolved.filter((i: any) => i.severity >= 4).length,
        0,
      ),
      medianSeconds: quantile(
        receipts.map((r) => r.durationMs / 1000),
        0.5,
      ),
      p95Seconds: quantile(
        receipts.map((r) => r.durationMs / 1000),
        0.95,
      ),
      meanSeconds: mean(receipts.map((r) => r.durationMs / 1000)),
      gatewayUsd: sum(receipts.map((r) => r.telemetry?.providerCostUsd)),
      upstreamUsd: sum(
        receipts.map((r) => r.telemetry?.providerUpstreamCostUsd),
      ),
      catalogEstimateUsd: sum(receipts.map((r) => r.catalogEstimateUsd)),
      catalogKnownSubtotalUsd: receipts.reduce(
        (n, r) => n + (r.catalogEstimateUsd ?? 0),
        0,
      ),
      unknownUsageAttempts: receipts.length - known.length,
      inputTokens: sum(receipts.map((r) => r.telemetry?.inputTokens)),
      outputTokens: sum(receipts.map((r) => r.telemetry?.outputTokens)),
      reasoningTokens: sum(receipts.map((r) => r.telemetry?.reasoningTokens)),
      cachedTokens: sum(receipts.map((r) => r.telemetry?.cacheReadTokens)),
      effectiveOutputTokensPerSecond: mean(
        known.map(
          (r) =>
            (r.telemetry.outputTokens - r.telemetry.reasoningTokens) /
            (r.durationMs / 1000),
        ),
      ),
      dimensions: Object.fromEntries(
        (pairs[0]?.g.ratings ?? []).map((rating: any) => [
          rating.dimension,
          mean(
            pairs.map(
              (p) =>
                p.g.ratings.find((r: any) => r.dimension === rating.dimension)
                  .score,
            ),
          ),
        ]),
      ),
    };
  })
  .sort((a: any, b: any) => (b.quality ?? -1) - (a.quality ?? -1));
writeFileSync(
  join(dir, "summary.jsonl"),
  rows.map((r: any) => JSON.stringify(r)).join("\n") + "\n",
);
const costs = ["gen-", "review-"].map((prefix) => {
  const selected = calls.filter((c) => c.id.startsWith(prefix));
  return {
    phase: prefix === "gen-" ? "generation" : "evaluation",
    attempts: selected.length,
    medianSeconds: quantile(
      selected.map((c) => c.durationMs / 1000),
      0.5,
    ),
    inputTokens: sum(selected.map((c) => c.telemetry?.inputTokens)),
    outputTokens: sum(selected.map((c) => c.telemetry?.outputTokens)),
    reasoningTokens: sum(selected.map((c) => c.telemetry?.reasoningTokens)),
    cacheReadTokens: sum(selected.map((c) => c.telemetry?.cacheReadTokens)),
    cacheWriteTokens: sum(selected.map((c) => c.telemetry?.cacheWriteTokens)),
    reportedGatewayUsd: sum(selected.map((c) => c.telemetry?.providerCostUsd)),
    reportedUpstreamUsd: sum(
      selected.map((c) => c.telemetry?.providerUpstreamCostUsd),
    ),
    catalogEstimateUsd: sum(selected.map((c) => c.catalogEstimateUsd)),
    catalogKnownSubtotalUsd: selected.reduce(
      (n, c) => n + (c.catalogEstimateUsd ?? 0),
      0,
    ),
    accountingAnomalies: selected.filter((c) => c.accountingAnomaly).length,
    unknownCostAttempts: selected.filter(
      (c) => c.telemetry?.providerCostUsd === undefined,
    ).length,
  };
});
writeFileSync(
  join(dir, "costs.jsonl"),
  costs.map((r) => JSON.stringify(r)).join("\n") + "\n",
);
const f = (x: number | null, d = 2) => (x === null ? "unknown" : x.toFixed(d));
const lines = [
  "# Fresh translation battle against frozen consensus gold",
  "",
  `Gold preferred in ${rows.reduce((n: any, r: any) => n + r.losses, 0)}/${records.filter((r) => r.id.startsWith("review-") && r.ok).length} valid reviews; generated preferred in ${rows.reduce((n: any, r: any) => n + r.wins, 0)}; ties ${rows.reduce((n: any, r: any) => n + r.ties, 0)}. Reviewer preference agreement: ${caseRows.filter((r) => r.preferenceAgreement).length}/${caseRows.filter((r) => r.preferenceAgreement !== null).length} fully reviewed pairs.`,
  "",
  `Five cases (Spanish/Japanese); ${calls.filter((c) => c.id.startsWith("gen-")).length}/65 generation attempts. Each generator sees only English. Max output 24,000 tokens; lowest supported reasoning; no retries. Whole-document requests, concurrency 4. GPT-6 Terra unavailable.`,
  ``,
  `Two independent blinded reviewers: GPT-6 Sol and Opus 5.5 at high reasoning. X/Y order is assigned independently by deterministic hash; ties allowed. Quality is the mean of ten 1–5 dimensions. Gold is scored alongside each candidate, never assumed perfect. Scores are model assessments on five cases, not calibrated human accuracy. Judge self-preference remains possible.`,
  ``,
  `Raw responses are preserved. Common mechanical import/asset normalization and inherited-frontmatter omission occur before evaluation. Strict deterministic checks can flag intentional locale formatting: inspect individual receipts. Failures are retained; quality means exclude failed/missing reviews. Review costs are separate.`,
  ``,
  `| Model | Effort | Complete | Checks pass | Reviews | Quality /5 | Gap vs gold | W/T/L | Median s | p95 s | Catalog $ | Input tokens | Output tokens | Reasoning |`,
  `|---|---|---:|---:|---:|---:|---:|---|---:|---:|---:|---:|---:|---:|`,
  ...rows.map(
    (r: any) =>
      `| ${r.model} | ${r.effort} | ${r.completed}/5 | ${r.validationPassed}/5 | ${r.reviews}/10 | ${f(r.quality)} | ${f(r.gap)} | ${r.wins}/${r.ties}/${r.losses} | ${f(r.medianSeconds)} | ${f(r.p95Seconds)} | ${f(r.catalogEstimateUsd, 4)} | ${r.inputTokens ?? "unknown"} | ${r.outputTokens ?? "unknown"} | ${r.reasoningTokens ?? "unknown"} |`,
  ),
  "",
  "## Deterministic findings",
  `${records.filter((r) => r.parseRecovery).length} review responses required trailing-comma-only JSON syntax recovery. Original responses and failed parse records are preserved in parse-recovery.jsonl; no scores or wording changed.`,
  "",
  ...calls
    .filter((c) => c.accountingAnomaly)
    .map(
      (c) =>
        `${c.model} (${c.id}): nonempty partial output returned with finishReason=${c.finishReason} and zero native token counters. OpenRouter generation lookup confirms zero native counters/charge but reports estimated tokens separately. Marked abnormal completion; catalog cost is unknown. Token sums are reported counters and undercount this attempt. See provider-accounting-anomaly.jsonl.`,
    ),
  ...mdxChecks
    .filter((r) => !r.rawError && r.normalizedError)
    .map(
      (r) =>
        `${r.model}: valid raw MDX became invalid in the existing import normalizer (${r.id}). This is a harness regression, not a raw model syntax failure; its paired quality review reflects the normalized file.`,
    ),
  ...quizChecks
    .filter((r) => !r.passed)
    .map(
      (r) =>
        `${r.model}: quiz signature check failed (${r.id}): ${r.error ?? "answer positions/index/hydration changed"}.`,
    ),
  "",
  "## Cost accounting",
  "",
  ...costs.map(
    (c) =>
      `${c.phase}: ${c.attempts} calls; gateway reported $${f(c.reportedGatewayUsd, 6)}; upstream reported $${f(c.reportedUpstreamUsd, 6)}; catalog estimate $${f(c.catalogEstimateUsd, 6)} (known subtotal $${f(c.catalogKnownSubtotalUsd, 6)}; ${c.accountingAnomalies} accounting anomalies); ${c.unknownCostAttempts} unknown-cost attempts.`,
  ),
  "",
  "Gateway and upstream are distinct receipts and are not added. Catalog estimates are API-equivalent comparisons, not invoices. Zero gateway charges may accompany BYOK upstream cost. Latency includes complete request time; effective output throughput is not streaming decode speed. p95 with only five samples is the maximum. All trace IDs and prompts are in calls/*.jsonl.",
];
writeFileSync(join(dir, "README.md"), lines.join("\n") + "\n");
console.log(JSON.stringify({ rows, costs }, null, 2));
