/** Report a matched 24k expansion without pooling historical attempts. */
import {readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {catalogCost, mean, knownSum} from './judge-benchmark-report.ts';
import {usageFromResult} from './llm-telemetry.ts';
const dir=process.argv[2];
if(!dir) throw Error('Pass the run directory');
const read=(file:string)=>JSON.parse(readFileSync(join(dir,file),'utf8'));
const rows=readFileSync(join(dir,'results.jsonl'),'utf8').trim().split('\n').map(line=>JSON.parse(line));
const phases=['qwen-lowest-24k','qwen-selected-resume','references-lowest-24k'];
const selectedQwen=['qwen/qwen3.8-flash','qwen/qwen3.8-27b'];
const manifests=phases.map(p=>read(`${p}-manifest.json`));
for(const m of manifests) {
  if(m.fixtureHash!==manifests[0].fixtureHash || JSON.stringify(m.tuning)!==JSON.stringify(manifests[0].tuning) || m.maxOutputTokens!==24000) throw Error('Unmatched inputs, prompts, or cap');
}
const matched=rows.filter(r=>phases.includes(r.phase) && (!r.model.startsWith('qwen/') || selectedQwen.includes(r.model)));
const models=[...new Set<string>(manifests.flatMap(m=>m.models))].filter(m=>!m.startsWith("qwen/") || selectedQwen.includes(m));
const fixtures=read('fixtures.json');
const catalog=read('catalog.json');
const n=(v:number|null,d=4)=>v===null?'unknown':v.toFixed(d);
const usage=(r:any)=>r.ok?r.result.telemetry:r.captured?usageFromResult(r.captured.usage,r.durationMs??0,r.captured.providerMetadata):undefined;
const cost=(r:any)=>{const u=usage(r);return u?catalogCost(u,catalog.models.find((m:any)=>m.id===r.model).pricing,r.model):undefined;};
const conflicts=(r:any)=>r.ok&&r.result.publishReady&&r.result.suggestions.some((s:any)=>['medium','high'].includes(s.priority));
const lines=['# Matched 24k translation judge comparison — 2026-09-22','','Twelve selected models, the same ten frozen public translations and eight Spanish synthetic controls, identical v2 audit prompts, 24,000 output tokens, and minimum supported thinking. Qwen and reference phases each run four concurrent calls without automatic retries. Prompts, raw responses, fixture hashes, catalogs, and all failures are retained. GPT-6 Terra remains unavailable as requested.','','Optional reasoning is disabled with `reasoning.enabled=false`; mandatory reasoning uses its lowest advertised effort. These are requested settings, not proof of internal model behavior. Capability metadata comes from the saved [OpenRouter model catalog](https://openrouter.ai/api/v1/models); [reasoning controls](https://openrouter.ai/docs/guides/best-practices/reasoning-tokens) distinguish disabling from merely hiding reasoning.','','## Quality and observed cost','','Controlled correctness counts invalid responses as incorrect. The ten real translations have no independent numeric gold scores; mean translation scores do not measure judge quality. The controls and natural cases were used during prior prompt development/validation, so this is a regression comparison, not a new held-out quality estimate.','','Cost per parsed real verdict includes captured failed-call catalog costs in its numerator. Missing usage stays unknown. Seconds average parsed real verdicts only. Provider routing and cache state are uncontrolled.','','| Model | Thinking | Controls correct / 8 | Real parsed / 10 | Ready with medium/high fixes | USD / parsed real verdict | Seconds / parsed real verdict |','|---|---|---:|---:|---:|---:|---:|'];
for(const model of models){
 const g=matched.filter(r=>r.model===model),a=g.filter(r=>r.split==='heldout'),b=g.filter(r=>r.split==='lowest-scoring'),good=b.filter(r=>r.ok);
 const total=knownSum(b.map(cost));
 lines.push(`| ${model} | ${manifests.find(m=>m.models.includes(model)).effortByModel[model]} | ${a.filter(r=>r.ok&&r.result.publishReady===r.expectedReady).length}/${a.length} | ${good.length}/${b.length} | ${b.filter(conflicts).length} | ${n(total===null||!good.length?null:total/good.length)} | ${n(mean(good.map(r=>r.result.telemetry.durationMs/1000)),2)} |`);
}
lines.push('', 'A parsed result is not necessarily schema-complete: DeepSeek returned 81 suggestions without required fields on hi/deathmatch-git-rebase-vs-merge; production normalization discarded all 81. Thus only 6/10 of its first-attempt real results retain complete suggestion arrays. See suggestion-schema-audit.json. The superseded Omni variant also omitted suggestion reasons. These are model contract failures, not clean verdicts.', '', '## Recorded cost accounting','','Catalog estimates include input/cache-read/cache-write/output rates and count reasoning within output once. Provider credits, upstream spend, and estimates are distinct; zero charged OpenAI credits do not imply free inference. All completed attempts with captured usage are included below, including superseded Qwen variants. Interrupted unrecorded requests may incur additional charges; this is not a complete billing reconciliation.','','| Model | Attempts | Catalog USD | Charged USD | Upstream USD | Reported reasoning tokens |','|---|---:|---:|---:|---:|---:|');
for(const model of [...new Set(rows.map(r=>r.model))]){
 const g=rows.filter(r=>r.model===model),us=g.map(usage);
 lines.push(`| ${model} | ${g.length} | ${n(knownSum(g.map(cost)))} | ${n(knownSum(us.map(u=>u?.providerCostUsd)))} | ${n(knownSum(us.map(u=>u?.providerUpstreamCostUsd)))} | ${n(knownSum(us.map(u=>u?.reasoningTokens)),0)} |`);
}
lines.push('','## Prior output-limit recovery','','The new matched run revisits all five previously limited real cases. Four DeepSeek cases also have a separate recovery phase preserving the older site-conventions prompt; both its output cap and reasoning mode changed, so improvement cannot be attributed solely to the cap. No old failures are overwritten.','','| Model | Fixture | Phase | Valid | Output tokens | Finish |','|---|---|---|---|---:|---|');
const limited=['ru-docker-security-tips-for-self-hosting','hi-docker-security-tips-for-self-hosting','he-quiz-is-your-memory-rusty','ja-you-may-not-need-axios'];
for(const r of rows.filter(r=>(r.model==='deepseek/deepseek-v4.1-flash'&&limited.includes(r.fixture))||(r.model==='z-ai/glm-5.3-flash'&&r.fixture==='hi-beware-the-single-purpose-people'))){const u=usage(r);lines.push(`| ${r.model} | ${r.fixture} | ${r.phase} | ${r.ok} | ${u?.outputTokens??'unknown'} | ${u?.finishReason??r.captured?.finishReason??'unknown'} |`);}
lines.push('','## Failed attempts','');for(const r of rows.filter(r=>!r.ok))lines.push(`- ${r.phase} / ${r.model} / ${r.fixture}: ${r.error}`);
const expected=models.length*fixtures.length;
lines.push('',`Matched completion: ${matched.length}/${expected} attempts; ${matched.filter(r=>r.ok).length} parsed. Supplemental completed attempts: ${rows.length-matched.length}. Interrupted requests are listed in interruption.json; their outcome and cost are unknown and excluded from recorded totals.`);
writeFileSync(join(dir,'summary.md'),lines.join('\n')+'\n');
console.log(join(dir,'summary.md'));
