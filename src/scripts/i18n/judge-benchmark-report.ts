import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { usageFromResult } from './llm-telemetry.ts';

type Row = { phase: string; fixture: string; model: string; split: string; expectedReady?: boolean; ok: boolean; result?: any; captured?: any; durationMs?: number };
export function mean(values: number[]) { return values.length ? values.reduce((a, b) => a + b, 0) / values.length : null; }
export function knownSum(values: Array<number | undefined>): number | null {
  return values.length && values.every(v => typeof v === 'number' && Number.isFinite(v)) ? (values as number[]).reduce((a, b) => a + b, 0) : null;
}
export function accuracy(rows: Row[]) {
  const labeled = rows.filter(r => r.expectedReady !== undefined);
  return { correct: labeled.filter(r => r.ok && r.result.publishReady === r.expectedReady).length, total: labeled.length };
}
export function catalogCost(usage: { inputTokens: number; outputTokens: number; cacheReadTokens?: number }, pricing: Record<string, string>) {
  // OpenRouter completion tokens already include reasoning; never add them again.
  const cached = usage.cacheReadTokens ?? 0;
  return (usage.inputTokens - cached) * Number(pricing.prompt) + cached * Number(pricing.input_cache_read ?? pricing.prompt) + usage.outputTokens * Number(pricing.completion);
}
const f = (n: number | null, digits = 3) => n === null ? 'unknown' : n.toFixed(digits);

function main() {
  const dir = process.argv[2];
  if (!dir) throw new Error('Usage: bun run i18n:judge:benchmark:report -- <run-directory>');
  const rows: Row[] = readFileSync(join(dir, 'results.jsonl'), 'utf8').trim().split('\n').map(line => JSON.parse(line));
  const catalog = JSON.parse(readFileSync(join(dir, 'catalog.json'), 'utf8'));
  const models = [...new Set(rows.filter(r => r.phase === 'baseline').map(r => r.model))];
  const lines = [`# Translation judge comparison — ${catalog.checkedAt.slice(0, 10)}`, '',
    'Eight OpenRouter judges; identical frozen inputs and production scoreTranslation contract. Low reasoning, no retries, concurrency 4. GPT Luna omits unsupported temperature. Latest Gemini Flash and Flash Lite selected from the saved live catalog. This is a small pilot, not a language-quality leaderboard.', '',
    'Corpus: one public article (named vs. default exports), in Spanish, Japanese, and Arabic. Source and translations verified byte-for-byte against public GitHub main before API submission. Controlled cases cover clean translations, reversed payment-retry prohibitions, and held-out executable-code changes. Corpus cases have no independent numeric gold scores. Opus agreement is diagnostic, not correctness.', '',
    'All prompts, fixture texts, fixture SHA-256, raw responses, token usage, cost metadata, failures, and phase settings are saved alongside this report. Initial canary connection failures were sandbox infrastructure failures; they remain in results.jsonl and are excluded from model ranking.', '',
    '## Controlled baseline', '', '| Model | Correct / attempts | Mean latency (s) | Mean catalog cost ($) |', '|---|---:|---:|---:|'];
  for (const model of models) {
    const group = rows.filter(r => r.phase === 'baseline' && r.model === model);
    const good = group.filter(r => r.ok);
    const a = accuracy(group);
    const pricing = catalog.models.find((m: any) => m.id === model).pricing;
    lines.push(`| ${model} | ${a.correct}/${a.total} | ${f(mean(good.map(r => r.result.telemetry.durationMs / 1000)))} | ${f(mean(good.map(r => catalogCost(r.result.telemetry, pricing))), 6)} |`);
  }
  for (const phase of ['corpus', 'calibrated-corpus']) {
    lines.push('', `## ${phase === 'corpus' ? 'Original' : 'Repository-calibrated'} article prompt`, '', '| Model | Valid / attempts | Mean score | Ready | Agreement with Opus¹ | Mean latency (s) | Mean catalog cost ($) | Credits charged ($) |', '|---|---:|---:|---:|---:|---:|---:|---:|');
    for (const model of models) {
      const group = rows.filter(r => r.phase === phase && r.model === model);
      const good = group.filter(r => r.ok);
      const paired = good.filter(r => rows.some(o => o.phase === phase && o.fixture === r.fixture && o.model === 'anthropic/claude-opus-5.5' && o.ok));
      const agree = paired.filter(r => rows.find(o => o.phase === phase && o.fixture === r.fixture && o.model === 'anthropic/claude-opus-5.5')?.result?.publishReady === r.result.publishReady).length;
      const pricing = catalog.models.find((m: any) => m.id === model).pricing;
      lines.push(`| ${model} | ${good.length}/${group.length} | ${f(mean(good.map(r => r.result.overallScore)), 1)} | ${good.filter(r => r.result.publishReady).length}/${good.length} | ${agree}/${paired.length} | ${f(mean(good.map(r => r.result.telemetry.durationMs / 1000)))} | ${f(mean(good.map(r => catalogCost(r.result.telemetry, pricing))), 6)} | ${f(knownSum(group.map(r => r.ok ? r.result.telemetry.providerCostUsd : r.captured?.providerMetadata?.openrouter?.usage?.cost)), 6)} |`);
    }
  }
  lines.push('', '¹Publish-ready agreement on valid paired responses only. Shared prompt mistakes can produce agreement; the original prompt caused both Luna and Opus to flag allowed metadata/path changes. Costs and latency means cover valid responses only; charged totals also include captured failed responses when known. Raw usage preserves failure costs.', '',
    'Catalog estimates use current input/cache/output rates; completion tokens already include reasoning. OpenRouter returned zero charged credits for the Luna calls despite nonzero upstream inference cost. Zero credits must not be interpreted as zero economic cost. Cache state and provider routing were not controlled, so latency/cost differences are observations from this run.', '',
    '## Calibrated article accounting', '', '| Model | Input tokens | Output tokens (includes reasoning) | Reasoning tokens | Cached input | Upstream USD | Ready with medium/high fixes |', '|---|---:|---:|---:|---:|---:|---:|');
  for (const model of models) {
    const group = rows.filter(r => r.phase === 'calibrated-corpus' && r.model === model);
    const usage = group.map(r => r.ok ? r.result.telemetry : r.captured ? usageFromResult(r.captured.usage, r.durationMs ?? 0, r.captured.providerMetadata) : undefined);
    const sum = (key: string) => knownSum(usage.map(u => u?.[key]));
    const conflicts = group.filter(r => r.ok && r.result.publishReady && r.result.suggestions.some((s: any) => s.priority === 'medium' || s.priority === 'high')).length;
    lines.push(`| ${model} | ${f(sum('inputTokens'), 0)} | ${f(sum('outputTokens'), 0)} | ${f(sum('reasoningTokens'), 0)} | ${f(sum('cacheReadTokens'), 0)} | ${f(sum('providerUpstreamCostUsd'), 6)} | ${conflicts} |`);
  }
  lines.push('', 'Token and upstream totals above include captured invalid responses; no failed-call cost is erased. Raw provider metadata distinguishes missing fields where the shared telemetry helper normalizes token counts to zero.', '', '## GPT-6 Luna calibration', '', '| Round | Split | Correct / attempts | Mean latency (s) | Mean score |', '|---|---|---:|---:|---:|---:|');
  for (const [phase, split] of [['baseline', 'calibration'], ['calibration-medium', 'calibration'], ['calibration-site-rules', 'calibration'], ['calibration-site-rules', 'heldout']]) {
    const group = rows.filter(r => r.phase === phase && r.split === split && r.model === 'openai/gpt-6-luna');
    const good = group.filter(r => r.ok); const a = accuracy(group);
    lines.push(`| ${phase} | ${split} | ${a.correct}/${a.total} | ${f(mean(good.map(r => r.result.telemetry.durationMs / 1000)))} | ${f(mean(good.map(r => r.result.overallScore)), 1)} |`);
  }
  lines.push('', 'Round 1: unchanged low reasoning. Round 2: medium reasoning, unchanged prompt. Round 3: low reasoning plus explicit site conventions. Held-out code-change/clean pairs use a different source and were not used to choose the prompt. The public corpus was used for diagnosis and tuning, so its improvements are in-sample. No human-rated held-out natural-translation set was evaluated.', '', '## Failure records', '');
  for (const row of rows.filter(r => !r.ok)) lines.push(`- ${row.phase} / ${row.model} / ${row.fixture}: ${(row as any).error.replaceAll('\n', ' ').slice(0, 240)}`);
  writeFileSync(join(dir, 'summary.md'), lines.join('\n') + '\n');
  console.log(join(dir, 'summary.md'));
}
if (import.meta.main) main();
