/** Matched-input judge comparison. Never promotes or edits translations. */
import { lowestReasoningEffort, type ReasoningCapability } from "./core/reasoning-defaults.ts";
import { mkdirSync, readFileSync, writeFileSync, appendFileSync, readdirSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import { scoreTranslation, type JudgePromptTuning } from "./core/score.ts";
import { generateText } from "./braintrust.ts";
import type { ActiveLocale } from "../../shared/i18n.ts";

export const JUDGE_BENCHMARK_MODELS = [
  "openai/gpt-6-luna", "openai/gpt-5.6-luna", "google/gemini-3.8-flash",
  "google/gemini-3.5-flash-lite", "deepseek/deepseek-v4.1-flash",
  "z-ai/glm-5.3-flash", "z-ai/glm-5.3-flashx", "anthropic/claude-opus-5.5",
  "anthropic/claude-fable-5.1",
  "openai/gpt-6-astra", "openai/gpt-6-sol",
  "qwen/qwen3.8-flash", "qwen/qwen3.8-27b",
];
export function benchmarkReasoningEffort(requested: string, model: { reasoning?: ReasoningCapability | null }) {
  return requested === 'lowest' ? lowestReasoningEffort(model) : requested;
}
export function defaultBenchmarkEffort(_model: string) { return 'lowest'; }
export function isOutputLimitFailure(row: { ok: boolean; error?: string; captured?: { finishReason?: string } }) {
  return !row.ok && (/hit maxOutputTokens=/.test(row.error ?? '') || ['length', 'max_tokens'].includes(row.captured?.finishReason ?? ''));
}
type Fixture = { id: string; locale: ActiveLocale; source: string; target: string; expectedReady?: boolean; split: "calibration" | "heldout" | "corpus" | "lowest-scoring"; defect?: string };
const arg = (name: string, fallback: string) => { const i = process.argv.indexOf(`--${name}`); return i < 0 ? fallback : process.argv[i + 1]!; };
const hash = (s: string) => createHash("sha256").update(s).digest("hex");

function fixtures(): Fixture[] {
  const source = '# Retry requests\n\nRetry at most three times. Never retry a failed payment automatically.\n\n```js\nconst retries = 3;\n```\n\nRead the [guide](https://example.com/guide).\n';
  const examples: Array<[ActiveLocale, string, string, string]> = [
    ["es", '# Reintentar solicitudes\n\nReintenta como máximo tres veces. Nunca reintentes automáticamente un pago fallido.\n\n```js\nconst retries = 3;\n```\n\nLee la [guía](https://example.com/guide).\n', 'Nunca reintentes automáticamente un pago fallido.', 'Reintenta siempre automáticamente un pago fallido.'],
    ["ja", '# リクエストの再試行\n\n再試行は最大3回までにしてください。失敗した支払いを自動的に再試行しないでください。\n\n```js\nconst retries = 3;\n```\n\n[ガイド](https://example.com/guide)を読んでください。\n', '失敗した支払いを自動的に再試行しないでください。', '失敗した支払いは必ず自動的に再試行してください。'],
    ["ar", '# إعادة محاولة الطلبات\n\nأعد المحاولة ثلاث مرات كحد أقصى. لا تُعِد محاولة عملية دفع فاشلة تلقائيًا أبدًا.\n\n```js\nconst retries = 3;\n```\n\nاقرأ [الدليل](https://example.com/guide).\n', 'لا تُعِد محاولة عملية دفع فاشلة تلقائيًا أبدًا.', 'أعِد دائمًا محاولة عملية دفع فاشلة تلقائيًا.'],
  ];
  const cases: Fixture[] = examples.flatMap(([locale, target, correct, wrong]) => [
    { id: `${locale}-clean`, locale, source, target, expectedReady: true, split: "calibration" as const },
    { id: `${locale}-negation`, locale, source, target: target.replace(correct, wrong), expectedReady: false, split: "calibration" as const, defect: "Payment retry prohibition reversed" },
  ]);
  // Different source and error types, never used for prompt selection.
  for (const [locale, prose] of [["es", "La caché caduca después de 60 segundos."], ["ja", "キャッシュは60秒後に期限切れになります。"], ["ar", "تنتهي صلاحية ذاكرة التخزين المؤقت بعد 60 ثانية."]] as const) {
    const src = '# Cache\n\nThe cache expires after 60 seconds.\n\n```js\nconst ttl = 60;\n```\n';
    const target = `# Cache\n\n${prose}\n\n\`\`\`js\nconst ttl = 60;\n\`\`\`\n`;
    cases.push({ id: `${locale}-code-change`, locale, source: src, target: target.replace('ttl = 60', 'ttl = 600'), expectedReady: false, split: "heldout", defect: "Executable code changed from 60 to 600" });
    cases.push({ id: `${locale}-cache-clean`, locale, source: src, target, expectedReady: true, split: "heldout" });
  }
  const root = 'src/content/posts';
  for (const locale of ["es", "ja", "ar"] as const) {
    const candidates = readdirSync(root).flatMap(dir => {
      try {
        const source = readFileSync(join(root, dir, 'index.mdx'), 'utf8');
        const target = readFileSync(join(root, dir, locale, 'index.mdx'), 'utf8');
        return source.length >= 2500 && source.length <= 6000 ? [{ id: `${locale}-${dir}`, locale, source, target, split: "corpus" as const }] : [];
      } catch { return []; }
    }).sort((a, b) => a.id.localeCompare(b.id));
    if (!candidates.length) throw new Error(`No corpus fixture for ${locale}`);
    cases.push(candidates[0]!);
  }
  return cases;
}

async function main() {
  const out = arg('out', `reports/i18n/judge-benchmarks/${new Date().toISOString().replaceAll(':', '-')}`);
  const phase = arg('phase', 'baseline');
  const cohort = arg('cohort', phase);
  const resumeOf = arg('resume-of', '');
  const completedRows = resumeOf ? readFileSync(join(out, 'results.jsonl'), 'utf8').trim().split('\n').map(line => JSON.parse(line)).filter(row => row.phase === resumeOf) : [];
  const retryLimitsOf = arg('retry-limits-of', '');
  const retryRows = retryLimitsOf ? readFileSync(join(out, 'results.jsonl'), 'utf8').trim().split('\n').map(line => JSON.parse(line)).filter(row => row.phase === retryLimitsOf && isOutputLimitFailure(row)) : undefined;
  if (retryRows && !retryRows.length) throw new Error(`No output-limit failures in ${retryLimitsOf}`);
  const models: string[] = retryRows ? [...new Set<string>(retryRows.map(row => row.model))] : arg('models', JUDGE_BENCHMARK_MODELS.join(',')).split(',');
  const effort = arg('effort', 'default');
  const maxOutputTokens = Number(arg('max-output-tokens', '24000'));
  if (!Number.isSafeInteger(maxOutputTokens) || maxOutputTokens <= 0) throw new Error('max-output-tokens must be a positive integer');
  const tuningPath = arg('tuning', '');
  const tuning: JudgePromptTuning | undefined = tuningPath ? JSON.parse(readFileSync(tuningPath, 'utf8')) : undefined;
  mkdirSync(out, { recursive: true });
  const customFixturesPath = arg('fixtures', '');
  const fixturesPath = customFixturesPath || join(out, 'fixtures.json');
  let cases: Fixture[];
  if (customFixturesPath) {
    const text = readFileSync(fixturesPath, 'utf8');
    cases = /\.(jsonl|ndjson)$/.test(fixturesPath) ? text.split('\n').filter(line => line.trim()).map(line => JSON.parse(line)) : JSON.parse(text);
  }
  else {
    try { cases = JSON.parse(readFileSync(fixturesPath, 'utf8')); } catch { cases = fixtures(); writeFileSync(fixturesPath, JSON.stringify(cases, null, 2)); }
  }
  const split = arg('split', phase === 'baseline' ? 'calibration,corpus' : 'calibration');
  cases = cases.filter(c => split.split(',').includes(c.split));
  const fixtureId = arg('fixture', '');
  if (fixtureId) cases = cases.filter(c => c.id === fixtureId);
  if (retryRows) {
    const retryManifest = JSON.parse(readFileSync(join(out, `${retryLimitsOf}-manifest.json`), 'utf8'));
    if (retryManifest.fixtureHash !== hash(readFileSync(fixturesPath, 'utf8'))) throw new Error('Retry fixtures differ from original phase');
    if (JSON.stringify(retryManifest.tuning) !== JSON.stringify(tuning)) throw new Error('Retry tuning differs from original phase');
    const retryIds = new Set(retryRows.map(row => row.fixture));
    cases = cases.filter(c => retryIds.has(c.id));
    if (cases.length !== retryIds.size) throw new Error('Retry split omits a failed fixture');
  }
  if (!cases.length) throw new Error('No fixtures match the requested split and fixture');
  const savedCatalogPath = join(out, 'catalog.json');
  const catalogPath = arg('catalog', await Bun.file(savedCatalogPath).exists() ? savedCatalogPath : '');
  const catalog = catalogPath ? JSON.parse(readFileSync(catalogPath, 'utf8')) : await (async () => {
    const response = await fetch('https://openrouter.ai/api/v1/models');
    if (!response.ok) throw new Error(`Model catalog HTTP ${response.status}`);
    const body = await response.json() as { data: Array<{ id: string }> };
    return { checkedAt: new Date().toISOString(), models: body.data.filter(m => [...JUDGE_BENCHMARK_MODELS, ...models].includes(m.id)) };
  })();
  for (const model of models) if (!catalog.models.some((m: any) => m.id === model)) throw new Error(`Model unavailable: ${model}`);
  const effortByModel = Object.fromEntries(models.map(model => [model, benchmarkReasoningEffort(effort === 'default' ? defaultBenchmarkEffort(model) : effort, catalog.models.find((m: any) => m.id === model))]));
  if (retryRows?.some(row => row.effort !== effortByModel[row.model])) throw new Error('Retry reasoning differs from original phase');
  if (resumeOf) {
    const previous = JSON.parse(readFileSync(join(out, `${resumeOf}-manifest.json`), 'utf8'));
    if (previous.fixtureHash !== hash(readFileSync(fixturesPath, 'utf8')) || JSON.stringify(previous.tuning) !== JSON.stringify(tuning) || previous.maxOutputTokens !== maxOutputTokens || models.some(model => previous.effortByModel[model] !== effortByModel[model])) throw new Error('Resume settings differ from original phase');
  }
  const manifestPath = join(out, `${phase}-manifest.json`);
  if (await Bun.file(manifestPath).exists()) throw new Error(`Phase already exists: ${phase}`);
  writeFileSync(join(out, `${phase}-catalog.json`), JSON.stringify(catalog, null, 2));
  const previousCatalog = await Bun.file(savedCatalogPath).exists() ? JSON.parse(readFileSync(savedCatalogPath, 'utf8')) : catalog;
  // Preserve the original rates for existing rows when adding new models later.
  const mergedCatalog = { ...previousCatalog, models: [...previousCatalog.models, ...catalog.models.filter((m: any) => !previousCatalog.models.some((p: any) => p.id === m.id))] };
  writeFileSync(savedCatalogPath, JSON.stringify(mergedCatalog, null, 2));
  writeFileSync(manifestPath, JSON.stringify({ phase, cohort, resumeOf: resumeOf || undefined, models, effort, effortByModel, maxOutputTokens, retryLimitsOf: retryLimitsOf || undefined, retryPairs: retryRows?.map(row => ({ model: row.model, fixture: row.fixture })), fixtureId: fixtureId || undefined, catalogCheckedAt: catalog.checkedAt, tuning, split, fixturesPath, fixtureHash: hash(readFileSync(fixturesPath, 'utf8')), startedAt: new Date().toISOString(), maxRetries: 0, concurrency: 4 }, null, 2));
  // Rotate model order across fixtures to reduce ordering/cache bias.
  const jobs = cases.flatMap((fixture, i) => [...models.slice(i % models.length), ...models.slice(0, i % models.length)].map(model => ({ fixture, model }))).filter(job => !retryRows || retryRows.some(row => row.fixture === job.fixture.id && row.model === job.model));
  const pendingJobs = jobs.filter(job => !completedRows.some(row => row.model === job.model && row.fixture === job.fixture.id));
  let next = 0;
  await Promise.all(Array.from({ length: 4 }, async () => {
    while (next < pendingJobs.length) {
      const { fixture, model } = pendingJobs[next++]!;
      const key = `${phase}-${fixture.id}-${model.replaceAll('/', '_')}`;
      const started = performance.now();
      let captured: any;
      try {
        const result = await scoreTranslation({
          model: `llm://openrouter/${model}?reasoning_effort=${effortByModel[model]}&max_tokens=${maxOutputTokens}`, locale: fixture.locale,
          sourceContents: fixture.source, targetContents: fixture.target, candidateId: hash(fixture.target).slice(0, 12),
          promptTuning: tuning,
          generateText: (async (options: any) => {
            writeFileSync(join(out, `${key}-prompt.json`), JSON.stringify({ messages: options.messages, providerOptions: options.providerOptions, temperature: options.temperature, maxOutputTokens: options.maxOutputTokens }, null, 2));
            const response = await generateText({ ...options, maxRetries: 0 });
            captured = { text: response.text, usage: response.usage, providerMetadata: response.providerMetadata, finishReason: response.finishReason, warnings: response.warnings };
            writeFileSync(join(out, `${key}-raw.json`), JSON.stringify(captured, null, 2));
            return response;
          }) as typeof generateText,
        });
        if (!result.judgeScores) throw new Error('Missing judge scores');
        const row = { phase, cohort, effort: effortByModel[model], fixture: fixture.id, split: fixture.split, model, expectedReady: fixture.expectedReady, ok: true, result };
        appendFileSync(join(out, 'results.jsonl'), JSON.stringify(row) + '\n');
        console.log(`${key}: ${result.overallScore}, ready=${result.publishReady}, cost=${result.telemetry.providerCostUsd ?? 'unknown'}`);
      } catch (error) {
        const row = { phase, cohort, effort: effortByModel[model], fixture: fixture.id, split: fixture.split, model, expectedReady: fixture.expectedReady, ok: false, durationMs: performance.now() - started, error: error instanceof Error ? error.message : String(error), captured };
        appendFileSync(join(out, 'results.jsonl'), JSON.stringify(row) + '\n');
        console.error(`${key}: FAILED ${row.error.slice(0, 220)}`);
      }
    }
  }));
  console.log(`Results: ${out}`);
}
if (import.meta.main) await main();
