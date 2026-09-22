import {readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {catalogCost, mean} from '../../../../../src/scripts/i18n/judge-benchmark-report.ts';
const dir=import.meta.dir;
const read=(p:string)=>JSON.parse(readFileSync(join(dir,p),'utf8'));
const rows=(p:string)=>readFileSync(join(dir,p),'utf8').trim().split('\n').map(s=>JSON.parse(s));
const current=rows('results.jsonl'), old=rows('../results.jsonl');
const catalog=read('catalog.json');
const models=['z-ai/glm-5.3-flash','google/gemini-3.8-flash','google/gemini-3.5-flash-lite'];
const fmt=(n:number|null)=>n===null?'unknown':n.toFixed(4);
const lines=['# GLM and Gemini judge calibration — 2026-09-22','','All calls use low reasoning, a 16,000-token cap, production scoreTranslation, and no automatic retries. Two development prompt versions were evaluated, then version 2 was frozen for validation. The baseline is the existing repository-conventions prompt. No translation files were changed.','','## Controlled validation','','Four new Spanish clean/error pairs test minimum/maximum reversal, untranslated paragraphs, executable paths versus permitted image relocation, and localized anchors. Fixtures were frozen before responses. The v2 prompt was written before baseline validation results were inspected; no tuning followed validation. Labels and defects are excluded from model prompts. This is a small synthetic check, not independent human-rated natural-language calibration.','','| Model | Baseline correct | v2 correct | v2 clean rejected | v2 invalid | Mean baseline → v2 USD |','|---|---:|---:|---:|---:|---:|'];
for(const model of models){
 const a=current.filter(r=>r.model===model&&r.phase==='heldout-baseline'),b=current.filter(r=>r.model===model&&r.phase==='heldout-v2');
 const acc=(g:any[])=>g.filter(r=>r.ok&&r.result.publishReady===r.expectedReady).length;
 const cost=(g:any[])=>mean(g.filter(r=>r.ok).map(r=>catalogCost(r.result.telemetry,catalog.models.find((m:any)=>m.id===model).pricing,model)));
 lines.push(`| ${model} | ${acc(a)}/${a.length} | ${acc(b)}/${b.length} | ${b.filter(r=>r.expectedReady&&r.ok&&!r.result.publishReady).length}/4 | ${b.filter(r=>!r.ok).length} | ${fmt(cost(a))} → ${fmt(cost(b))} |`);
}
lines.push('','## Ten lowest-scoring translations','','The exact frozen ten-case corpus from the earlier comparison is reused. Two cases were used during development, so these are regression/diagnostic results, not held-out quality estimates. The historical selection scores are not gold labels.','','| Model | Baseline → v2 valid | Ready with medium/high fixes | Mean USD/valid | Mean seconds/valid |','|---|---:|---:|---:|---:|');
for(const model of models){
 const a=old.filter(r=>r.model===model&&r.phase==='lowest10-calibrated'),b=current.filter(r=>r.model===model&&r.phase==='corpus-v2');
 const good=(g:any[])=>g.filter(r=>r.ok);
 const conflicts=(g:any[])=>good(g).filter(r=>r.result.publishReady&&r.result.suggestions.some((s:any)=>['medium','high'].includes(s.priority))).length;
 const cost=(g:any[])=>mean(good(g).map(r=>catalogCost(r.result.telemetry,catalog.models.find((m:any)=>m.id===model).pricing,model)));
 const time=(g:any[])=>mean(good(g).map(r=>r.result.telemetry.durationMs/1000));
 lines.push(`| ${model} | ${good(a).length}/${a.length} → ${good(b).length}/${b.length} | ${conflicts(a)} → ${conflicts(b)} | ${fmt(cost(a))} → ${fmt(cost(b))} | ${fmt(time(a))} → ${fmt(time(b))} |`);
}
lines.push('','## Development and limitations','','Version 1 requested a complete evidence audit and consistent readiness. GLM still emitted malformed quiz JSON; Flash Lite still reported only the first untranslated heading. Version 2 additionally requests all distinct defect categories, short exact spans, and complete suggestion objects. All six original clean/negation controls passed for all three models in both development rounds. GLM recovered valid quiz JSON in development v2. These are observed outcomes, not reliability guarantees.','','Flash Lite corrected both validation misses (minimum/maximum and executable path) but still missed substantial untranslated paragraphs and changed Pagefind code paths in the full Hindi article during development v2. Its translation score remained 92 despite that flawed article. Do not use the score alone or describe higher scores as better judge quality. Short synthetic success does not establish full-document recall.','','The overlay is registered for the three requested models, without changing the default judge. Flash Lite remains suitable only with independent checks or a stronger review for important decisions. Exact snippet suggestions are not automatically applied by this calibration.','','Per-call prompts, raw responses, usage, phase manifests, fixture hashes, and both prompt versions are retained. Catalog estimates use the saved same-day rates, account for cache reads/writes, and count reasoning within output tokens once. Cache state and routing vary; costs and latency are observations, not controlled throughput benchmarks. Costs below include captured failures when known.','','| Phase | Attempts | Valid | Charged USD |','|---|---:|---:|---:|');
for(const phase of [...new Set(current.map(r=>r.phase))]){
 const g=current.filter(r=>r.phase===phase);const costs=g.map(r=>r.ok?r.result.telemetry.providerCostUsd:r.captured?.providerMetadata?.openrouter?.usage?.cost);
 lines.push(`| ${phase} | ${g.length} | ${g.filter(r=>r.ok).length} | ${costs.every(n=>typeof n==='number')?fmt(costs.reduce((a,b)=>a+b,0)):'unknown'} |`);
}
lines.push('','## Verification and remaining failure','', '158 focused offline tests passed. Profile resolution was checked for all three models for article and quiz content, and the resolved prompt text matches the tested v2 overlay. All 12 defective validation outputs identify the planted error using an exact target snippet. GLM hit the 16k output limit on hi/beware-the-single-purpose-people twice: the explicitly requested same-cap retry also failed. Neither attempt is counted as a usable verdict. The first-attempt table excludes retry success/failure; the phase totals retain its cost.', '', '## Failures','');for(const r of current.filter(r=>!r.ok))lines.push(`- ${r.phase}, ${r.model}, ${r.fixture}: ${r.error}`);
writeFileSync(join(dir,'findings.md'),lines.join('\n')+'\n');
console.log(join(dir,'findings.md'));
