import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { usageFromResult } from './llm-telemetry.ts';

export type Row = { phase: string; cohort?: string; effort?: string; fixture: string; model: string; split: string; expectedReady?: boolean; ok: boolean; result?: any; captured?: any; durationMs?: number };
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
export function catalogCost(usage: { inputTokens: number; outputTokens: number; cacheReadTokens?: number; cacheWriteTokens?: number }, pricing: Record<string, string>, modelId = '') {
  // OpenRouter completion tokens already include reasoning; never add them again.
  const cached = usage.cacheReadTokens ?? 0;
  const written = usage.cacheWriteTokens ?? 0;
  const inputRate = Number(pricing.prompt);
  // Gemini cache-write price is additive storage; writes can overlap cached reads.
  // Other catalog write prices include the base input price, so add only the premium.
  const writeSurcharge = modelId.startsWith('google/') ? Number(pricing.input_cache_write ?? 0) : Math.max(0, Number(pricing.input_cache_write ?? pricing.prompt) - inputRate);
  return (usage.inputTokens - cached) * inputRate + cached * Number(pricing.input_cache_read ?? pricing.prompt) + written * writeSurcharge + usage.outputTokens * Number(pricing.completion);
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
    'Original corpus: one public article (named vs. default exports), in Spanish, Japanese, and Arabic. The ten-case expansion, when present, is reported separately below. Source and translations verified byte-for-byte against public GitHub main before API submission. Controlled cases cover clean translations, reversed payment-retry prohibitions, and held-out executable-code changes. Corpus cases have no independent numeric gold scores. Opus agreement is diagnostic, not correctness.', '',
    'All prompts, fixture texts, fixture SHA-256, raw responses, token usage, cost metadata, failures, and phase settings are saved alongside this report. Initial canary connection failures were sandbox infrastructure failures; they remain in results.jsonl and are excluded from model ranking.', '',
    '## Controlled baseline', '', '| Model | Correct / attempts | Mean latency (s) | Mean catalog cost ($) |', '|---|---:|---:|---:|'];
  for (const model of models) {
    const group = rows.filter(r => comparisonCohort(r) === 'baseline' && r.model === model);
    const good = group.filter(r => r.ok);
    const a = accuracy(group);
    const pricing = catalog.models.find((m: any) => m.id === model).pricing;
    lines.push(`| ${modelLabel(model, group)} | ${a.correct}/${a.total} | ${f(mean(good.map(r => r.result.telemetry.durationMs / 1000)))} | ${f(mean(good.map(r => catalogCost(r.result.telemetry, pricing, model))), 6)} |`);
  }
  for (const phase of ['corpus', 'calibrated-corpus']) {
    lines.push('', `## ${phase === 'corpus' ? 'Original' : 'Repository-calibrated'} article prompt`, '', '| Model | Valid / attempts | Mean score | Ready | Agreement with Opus¹ | Mean latency (s) | Mean catalog cost ($) | Credits charged ($) |', '|---|---:|---:|---:|---:|---:|---:|---:|');
    for (const model of models) {
      const group = rows.filter(r => comparisonCohort(r) === phase && r.model === model);
      const good = group.filter(r => r.ok);
      const paired = good.filter(r => rows.some(o => comparisonCohort(o) === phase && o.fixture === r.fixture && o.model === 'anthropic/claude-opus-5.5' && o.ok));
      const agree = paired.filter(r => rows.find(o => comparisonCohort(o) === phase && o.fixture === r.fixture && o.model === 'anthropic/claude-opus-5.5')?.result?.publishReady === r.result.publishReady).length;
      const pricing = catalog.models.find((m: any) => m.id === model).pricing;
      lines.push(`| ${modelLabel(model, group)} | ${good.length}/${group.length} | ${f(mean(good.map(r => r.result.overallScore)), 1)} | ${good.filter(r => r.result.publishReady).length}/${good.length} | ${agree}/${paired.length} | ${f(mean(good.map(r => r.result.telemetry.durationMs / 1000)))} | ${f(mean(good.map(r => catalogCost(r.result.telemetry, pricing, model))), 6)} | ${f(knownSum(group.map(r => r.ok ? r.result.telemetry.providerCostUsd : r.captured?.providerMetadata?.openrouter?.usage?.cost)), 6)} |`);
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
      lines.push(`| ${modelLabel(row.model, [row])} | ${row.fixture} | ${row.ok ? 'yes' : 'no'} | ${usage?.outputTokens ?? 'unknown'} | ${f(usage ? usage.durationMs / 1000 : null)} | ${f(usage ? catalogCost(usage, pricing, row.model) : null, 6)} |`);
    }
  }
  const lowestRows = rows.filter(r => comparisonCohort(r) === 'lowest10-calibrated');
  if (lowestRows.length) {
    const fixtures = JSON.parse(readFileSync(join(dir, 'fixtures-lowest10.json'), 'utf8'));
    const plannedModels = JSON.parse(readFileSync(join(dir, 'lowest10-calibrated-manifest.json'), 'utf8')).models;
    const cohortLines = lowestCohortReport(lowestRows, catalog, fixtures, plannedModels);
    if (existsSync(join(dir, 'lowest10-drift.json'))) {
      const drift = JSON.parse(readFileSync(join(dir, 'lowest10-drift.json'), 'utf8'));
      cohortLines.push('', '## Scored-file drift audit', '', `${drift.cases.filter((c:any)=>c.targetMatchesAfterRemovingSourceHash).length}/${drift.cases.length} frozen targets match their scored versions after removing only the added sourceHash frontmatter line. The two quizzes have additional source/target changes. See lowest10-drift.json; frozen inputs were not modified.`);
    }
    const reruns = rows.filter(r => comparisonCohort(r) === 'lowest10-limit-retry');
    if (reruns.length) {
      cohortLines.push('', '## One retry of output-limit rows at the same 16k cap', '', 'These explicit reruns preserve the original fixture hash, prompt tuning, and reasoning effort. They do not replace first-attempt statistics above. No malformed-JSON rows were retried.', '', '| Model | Fixture | Valid | Finish reason | Output tokens | Seconds | Charged USD |', '|---|---|---|---|---:|---:|---:|');
      for (const row of reruns) {
        const usage = row.ok ? row.result.telemetry : row.captured ? usageFromResult(row.captured.usage,row.durationMs??0,row.captured.providerMetadata) : undefined;
        cohortLines.push(`| ${row.model} | ${row.fixture} | ${row.ok?'yes':'no'} | ${row.ok?row.result.telemetry.finishReason:row.captured?.finishReason??'unknown'} | ${usage?.outputTokens??'unknown'} | ${f(usage?usage.durationMs/1000:null)} | ${f(usage?.providerCostUsd??null,6)} |`);
      }
    }
    writeFileSync(join(dir, 'lowest10-summary.md'), cohortLines.join('\n') + '\n');
    lines.push('', '## Ten additional lowest-scoring translations', '', ...cohortLines.slice(2));
  }
  writeFileSync(join(dir, 'summary.md'), lines.join('\n') + '\n');
  console.log(join(dir, 'summary.md'));
}

export function lowestCohortReport(rows: Row[], catalog: any, fixtures: any[], plannedModels?: string[]) {
  const models = [...new Set(plannedModels ?? rows.map(r => r.model))].sort();
  const expected = fixtures.length * models.length;
  const lines = ['# Ten additional lowest-scoring translations', '',
    `${rows.length}/${expected} planned calls recorded across ${fixtures.length} additional translations and ${models.length} judges. Full current texts, no truncation, frozen before inference. Calibrated site-convention prompt, 16,000 output tokens, four concurrent calls, no automatic retries. Astra low; Sol none; other judges low. GPT-6 Terra remains unavailable.`, '',
    'Selection uses the latest translation_scored record per slug/locale in reports/translations-log.jsonl, then the ten lowest scores not already in the corpus. Ties use slug then locale. These historical scores select cases; they are not gold labels or confirmed scores of the current files. Every target differs from its scored hash, and two quiz sources also changed. All twenty current source/target texts were verified byte-identical to public GitHub before inference. This cohort includes eight article translations and two quizzes, with six Hindi cases; it is not a representative locale sample.', '',
    '| Rank | Translation | Kind | Selection score | Scored at | Current source matches scored hash | Current target matches scored hash |', '|---:|---|---|---:|---|---|---|'];
  for (const fixture of fixtures) lines.push(`| ${fixture.selectionRank} | ${fixture.locale}/${fixture.slug} | ${fixture.contentKind} | ${fixture.selectionScore} | ${fixture.scoreAt.slice(0,10)} | ${fixture.sourceMatchesScoredHash ? 'yes' : 'no'} | ${fixture.targetMatchesScoredHash ? 'yes' : 'no'} |`);
  lines.push('', '## Judge comparison', '', '| Model (reasoning) | Valid / attempted | Mean translation score | Ready | Ready with medium/high fixes | Opus decision agreement | Mean seconds | Catalog USD / valid call | Charged USD total | Upstream USD total |', '|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|');
  for (const model of models) {
    const group = rows.filter(r => r.model === model);
    const good = group.filter(r => r.ok);
    const paired = good.map(r => ({row:r,opus:rows.find(o=>o.model==='anthropic/claude-opus-5.5'&&o.fixture===r.fixture&&o.ok)})).filter(p=>p.opus);
    const agrees = paired.filter(p=>p.row.result.publishReady===p.opus!.result.publishReady).length;
    const conflicts = good.filter(r=>r.result.publishReady&&r.result.suggestions.some((s:any)=>s.priority==='high'||s.priority==='medium')).length;
    const pricing = catalog.models.find((m:any)=>m.id===model).pricing;
    const usage = group.map(r=>r.ok?r.result.telemetry:r.captured?usageFromResult(r.captured.usage,r.durationMs??0,r.captured.providerMetadata):undefined);
    lines.push(`| ${modelLabel(model,group)} | ${good.length}/${group.length} | ${f(mean(good.map(r=>r.result.overallScore)),1)} | ${good.filter(r=>r.result.publishReady).length}/${good.length} | ${conflicts} | ${agrees}/${paired.length} | ${f(mean(good.map(r=>r.result.telemetry.durationMs/1000)))} | ${f(mean(good.map(r=>catalogCost(r.result.telemetry,pricing,model))),6)} | ${f(knownSum(usage.map(u=>u?.providerCostUsd)),6)} | ${f(knownSum(usage.map(u=>u?.providerUpstreamCostUsd)),6)} |`);
  }
  lines.push('', 'Higher translation scores indicate more generous assessments, not better judges. Agreement with Opus is diagnostic, not correctness. Cost/latency means above cover valid calls only; charged/upstream totals also include captured invalid responses. Zero provider credits do not imply free inference. Catalog estimates include cache-read discounts and cache-write premiums; provider routing may cost more than headline catalog rates. This cohort uses larger inputs and a 16k cap, so it is reported separately from the original three-translation/8k comparison.', '', '## Failure-inclusive operating cost', '', '| Model | Mean seconds / attempt | Upstream USD / usable result, including failed-call cost |', '|---|---:|---:|');
  for (const model of models) {
    const group = rows.filter(r=>r.model===model);
    const good = group.filter(r=>r.ok);
    const costs = group.map(r=>r.ok?r.result.telemetry.providerUpstreamCostUsd:r.captured?usageFromResult(r.captured.usage,r.durationMs??0,r.captured.providerMetadata).providerUpstreamCostUsd:undefined);
    const total = knownSum(costs);
    lines.push(`| ${model} | ${f(mean(group.map(r=>r.ok?r.result.telemetry.durationMs/1000:(r.durationMs??0)/1000)))} | ${f(total===null||!good.length?null:total/good.length,6)} |`);
  }
  lines.push('', 'Gemini can report overlapping cache-read and cache-write counts. Its catalog write rate is an additive storage charge, while the other tested providers include base input in their write rate. The estimator applies these separately, matching the observed Gemini upstream costs. See [OpenRouter prompt caching documentation](https://openrouter.ai/docs/guides/best-practices/prompt-caching).', '', '## Per-translation scores', '', `| Translation | ${models.join(' | ')} |`, `|---|${models.map(()=>'---:').join('|')}|`);
  for (const fixture of fixtures) lines.push(`| ${fixture.id} | ${models.map(model=>{const row=rows.find(r=>r.model===model&&r.fixture===fixture.id);return !row?'pending':row.ok?`${row.result.overallScore}${row.result.publishReady?' ready':''}`:'FAILED';}).join(' | ')} |`);
  lines.push('', '## Failures', '');
  const failed = rows.filter(r=>!r.ok);
  if (!failed.length) lines.push('None recorded.');
  for (const row of failed) lines.push(`- ${row.model} / ${row.fixture}: ${(row as any).error.replaceAll('\n',' ').slice(0,280)}`);
  return lines;
}
if (import.meta.main) main();
