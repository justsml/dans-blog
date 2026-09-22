import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { usageFromResult } from './llm-telemetry.ts';

type Row = { phase: string; cohort?: string; effort?: string; fixture: string; model: string; split: string; expectedReady?: boolean; ok: boolean; result?: any; captured?: any; durationMs?: number };
export function comparisonCohort(row: Row) { return row.cohort ?? row.phase; }
function modelLabel(model: string, rows: Row[]) { return `${model} (${[...new Set(rows.map(r => r.effort ?? "low"))].join(", ")})`; }
export function mean(values: number[]) { return values.length ? values.reduce((a, b) => a + b, 0) / values.length : null; }
export function knownSum(values: Array<number | undefined>): number | null {
  return values.length && values.every(v => typeof v === 'number' && Number.isFinite(v)) ? (values as number[]).reduce((a, b) => a + b, 0) : null;
}
export function accuracy(rows: Row[]) {
  const labeled = rows.filter(r => r.expectedReady !== undefined);
  return { correct: labeled.filter(r => r.ok && r.result.publishReady === r.expectedReady).length, total: labeled.length };
}
export function catalogCost(usage: { inputTokens: number; outputTokens: number; cacheReadTokens?: number; cacheWriteTokens?: number }, pricing: Record<string, string>) {
  // OpenRouter completion tokens already include reasoning; never add them again.
  const cached = usage.cacheReadTokens ?? 0;
  const written = usage.cacheWriteTokens ?? 0;
  return (usage.inputTokens - cached - written) * Number(pricing.prompt) + cached * Number(pricing.input_cache_read ?? pricing.prompt) + written * Number(pricing.input_cache_write ?? pricing.prompt) + usage.outputTokens * Number(pricing.completion);
}
const f = (n: number | null, digits = 3) => n === null ? 'unknown' : n.toFixed(digits);

function main() {
  const dir = process.argv[2];
  if (!dir) throw new Error('Usage: bun run i18n:judge:benchmark:report -- <run-directory>');
  const rows: Row[] = readFileSync(join(dir, 'results.jsonl'), 'utf8').trim().split('\n').map(line => JSON.parse(line));
  const catalog = JSON.parse(readFileSync(join(dir, 'catalog.json'), 'utf8'));
  const models = [...new Set(rows.filter(r => comparisonCohort(r) === 'baseline').map(r => r.model))];
  const lines = [`# Translation judge comparison — ${catalog.checkedAt.slice(0, 10)}`, '',
    `${models.length} OpenRouter judges; identical frozen inputs and production scoreTranslation contract. Original models use low reasoning; additions show their requested minimum setting in each row. No retries, concurrency 4 per phase. GPT models omit unsupported temperature. Latest Gemini Flash and Flash Lite selected from the saved live catalog. This is a small pilot, not a language-quality leaderboard.`, '',
    'Corpus: one public article (named vs. default exports), in Spanish, Japanese, and Arabic. Source and translations verified byte-for-byte against public GitHub main before API submission. Controlled cases cover clean translations, reversed payment-retry prohibitions, and held-out executable-code changes. Corpus cases have no independent numeric gold scores. Opus agreement is diagnostic, not correctness.', '',
    'All prompts, fixture texts, fixture SHA-256, raw responses, token usage, cost metadata, failures, and phase settings are saved alongside this report. Initial canary connection failures were sandbox infrastructure failures; they remain in results.jsonl and are excluded from model ranking.', '',
    '## Controlled baseline', '', '| Model | Correct / attempts | Mean latency (s) | Mean catalog cost ($) |', '|---|---:|---:|---:|'];
  for (const model of models) {
    const group = rows.filter(r => comparisonCohort(r) === 'baseline' && r.model === model);
    const good = group.filter(r => r.ok);
    const a = accuracy(group);
    const pricing = catalog.models.find((m: any) => m.id === model).pricing;
    lines.push(`| ${modelLabel(model, group)} | ${a.correct}/${a.total} | ${f(mean(good.map(r => r.result.telemetry.durationMs / 1000)))} | ${f(mean(good.map(r => catalogCost(r.result.telemetry, pricing))), 6)} |`);
  }
  for (const phase of ['corpus', 'calibrated-corpus']) {
    lines.push('', `## ${phase === 'corpus' ? 'Original' : 'Repository-calibrated'} article prompt`, '', '| Model | Valid / attempts | Mean score | Ready | Agreement with Opus¹ | Mean latency (s) | Mean catalog cost ($) | Credits charged ($) |', '|---|---:|---:|---:|---:|---:|---:|---:|');
    for (const model of models) {
      const group = rows.filter(r => comparisonCohort(r) === phase && r.model === model);
      const good = group.filter(r => r.ok);
      const paired = good.filter(r => rows.some(o => comparisonCohort(o) === phase && o.fixture === r.fixture && o.model === 'anthropic/claude-opus-5.5' && o.ok));
      const agree = paired.filter(r => rows.find(o => comparisonCohort(o) === phase && o.fixture === r.fixture && o.model === 'anthropic/claude-opus-5.5')?.result?.publishReady === r.result.publishReady).length;
      const pricing = catalog.models.find((m: any) => m.id === model).pricing;
      lines.push(`| ${modelLabel(model, group)} | ${good.length}/${group.length} | ${f(mean(good.map(r => r.result.overallScore)), 1)} | ${good.filter(r => r.result.publishReady).length}/${good.length} | ${agree}/${paired.length} | ${f(mean(good.map(r => r.result.telemetry.durationMs / 1000)))} | ${f(mean(good.map(r => catalogCost(r.result.telemetry, pricing))), 6)} | ${f(knownSum(group.map(r => r.ok ? r.result.telemetry.providerCostUsd : r.captured?.providerMetadata?.openrouter?.usage?.cost)), 6)} |`);
    }
  }
  lines.push('', '¹Publish-ready agreement on valid paired responses only. Shared prompt mistakes can produce agreement; the original prompt caused both Luna and Opus to flag allowed metadata/path changes. Costs and latency means cover valid responses only; charged totals also include captured failed responses when known. Raw usage preserves failure costs.', '',
    'Catalog estimates use saved input/cache-read/cache-write/output rates; completion tokens already include reasoning. Cache-write premiums were added to the estimate during the GPT-6 extension, correcting the earlier report estimates where write usage was present. OpenRouter returned zero charged credits for the OpenAI calls despite nonzero upstream inference cost. Zero credits must not be interpreted as zero economic cost. Cache state and provider routing were not controlled, so latency/cost differences are observations from this run.', '',
    '## Calibrated article accounting', '', '| Model | Input tokens | Output tokens (includes reasoning) | Reasoning tokens | Cached input | Upstream USD | Ready with medium/high fixes |', '|---|---:|---:|---:|---:|---:|---:|');
  for (const model of models) {
    const group = rows.filter(r => comparisonCohort(r) === 'calibrated-corpus' && r.model === model);
    const usage = group.map(r => r.ok ? r.result.telemetry : r.captured ? usageFromResult(r.captured.usage, r.durationMs ?? 0, r.captured.providerMetadata) : undefined);
    const sum = (key: string) => knownSum(usage.map(u => u?.[key]));
    const conflicts = group.filter(r => r.ok && r.result.publishReady && r.result.suggestions.some((s: any) => s.priority === 'medium' || s.priority === 'high')).length;
    lines.push(`| ${modelLabel(model, group)} | ${f(sum('inputTokens'), 0)} | ${f(sum('outputTokens'), 0)} | ${f(sum('reasoningTokens'), 0)} | ${f(sum('cacheReadTokens'), 0)} | ${f(sum('providerUpstreamCostUsd'), 6)} | ${conflicts} |`);
  }
  lines.push('', 'Token and upstream totals above include captured invalid responses; no failed-call cost is erased. Raw provider metadata distinguishes missing fields where the shared telemetry helper normalizes token counts to zero.', '', '## GPT-6 Luna calibration', '', '| Round | Split | Correct / attempts | Mean latency (s) | Mean score |', '|---|---|---:|---:|---:|---:|');
  for (const [phase, split] of [['baseline', 'calibration'], ['calibration-medium', 'calibration'], ['calibration-site-rules', 'calibration'], ['calibration-site-rules', 'heldout']]) {
    const group = rows.filter(r => comparisonCohort(r) === phase && r.split === split && r.model === 'openai/gpt-6-luna');
    const good = group.filter(r => r.ok); const a = accuracy(group);
    lines.push(`| ${phase} | ${split} | ${a.correct}/${a.total} | ${f(mean(good.map(r => r.result.telemetry.durationMs / 1000)))} | ${f(mean(good.map(r => r.result.overallScore)), 1)} |`);
  }
  lines.push('', 'Round 1: unchanged low reasoning. Round 2: medium reasoning, unchanged prompt. Round 3: low reasoning plus explicit site conventions. Held-out code-change/clean pairs use a different source and were not used to choose the prompt. The public corpus was used for diagnosis and tuning, so its improvements are in-sample. No human-rated held-out natural-translation set was evaluated.', '', '## Failure records', '');
  for (const row of rows.filter(r => !r.ok)) lines.push(`- ${row.phase} / ${row.model} / ${row.fixture}: ${(row as any).error.replaceAll('\n', ' ').slice(0, 240)}`);
  if (existsSync(join(dir, 'gpt6-sol-parser-recovery.json'))) lines.push('', 'Sol original-prompt Arabic failure was a harness parser error, not malformed model JSON. Offline replay after the code-fence extraction fix recovered score 80 and publishReady=false without new inference. Original observed pipeline statistics and the original failure remain above; see gpt6-sol-parser-recovery.json.');
  if (existsSync(join(dir, 'gpt6-availability.json'))) lines.push('', 'GPT-6 Terra was absent from both OpenRouter and the configured first-party OpenAI catalog. Per user instruction it remains unavailable; GPT-5.6 Terra was not substituted. Astra was requested at low (mandatory reasoning); Sol at none. Zero reasoning tokens reported by a provider do not prove that no internal reasoning occurred.');
  const limitRetries = rows.filter(r => comparisonCohort(r) === 'output-limit-recovery');
  if (limitRetries.length) {
    lines.push('', '## Output-limit reruns at 16k', '', 'The original comparison used an 8,000-token cap. The user requested a 16,000-token cap and reruns of every limit-hit row. These new-budget attempts are reported separately, without replacing the original failures.', '', '| Model | Fixture | Valid | Output tokens | Seconds | Catalog USD |', '|---|---|---|---:|---:|---:|');
    for (const row of limitRetries) {
      const usage = row.ok ? row.result.telemetry : row.captured ? usageFromResult(row.captured.usage, row.durationMs ?? 0, row.captured.providerMetadata) : undefined;
      const pricing = catalog.models.find((m: any) => m.id === row.model).pricing;
      lines.push(`| ${modelLabel(row.model, [row])} | ${row.fixture} | ${row.ok ? 'yes' : 'no'} | ${usage?.outputTokens ?? 'unknown'} | ${f(usage ? usage.durationMs / 1000 : null)} | ${f(usage ? catalogCost(usage, pricing) : null, 6)} |`);
    }
  }
  writeFileSync(join(dir, 'summary.md'), lines.join('\n') + '\n');
  console.log(join(dir, 'summary.md'));
}
if (import.meta.main) main();
