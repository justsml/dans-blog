import {existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {join} from 'node:path';
import matter from 'gray-matter';
import {compile} from '@mdx-js/mdx';
import {startActiveObservation} from '@langfuse/tracing';
import {generateText} from './braintrust.ts';
import {langfuseEnabled,flushLangfuse} from './langfuse.ts';
import {resolveLlmConfig,createOpenRouterChatModel} from './core/model-config.ts';
import {lowestReasoningEffort} from './core/reasoning-defaults.ts';
import {buildSystemPrompt} from './prompts.ts';
import {normalizeLocalizedCandidateFile,normalizeFrontmatterAssetPaths,omitInheritedTranslatedFrontmatter} from './localized-mdx.ts';
import {validateTranslation} from './core/validate.ts';
import {loadGoldenDataset} from './negotiation/dataset.ts';
import {hash,auditSchema,assessmentShape,rubric,protectedDiff} from './negotiation/protocol.ts';
import {extractJsonObject} from './judge-utils.ts';
import {usageFromResult} from './llm-telemetry.ts';
import {catalogCost} from './judge-benchmark-report.ts';

const dir=process.argv[2]??'reports/i18n/translation-battles/2026-09-24-gold-v1';
const mode=process.argv[3]??'canary';
const catalog=JSON.parse(readFileSync(join(dir,'catalog.json'),'utf8'));
const cases=loadGoldenDataset('datasets/i18n/consensus-gold/v1');
const judges=['openai/gpt-6-sol','anthropic/claude-opus-5.5'];
const write=(path:string,value:unknown)=>writeFileSync(path,JSON.stringify(value)+'\n');
const read=(path:string)=>JSON.parse(readFileSync(path,'utf8'));
const judgeSystem=rubric+'\nYou are conducting an independent BLIND paired evaluation, not a negotiation. Neither candidate is authoritative. Compare each against English and independently score every dimension. Use preferredLabel X, Y, or tie. Do not infer model identities. No external tools are available: mark unverifiable cultural claims requiresReference=true. Return ONLY JSON matching: '+JSON.stringify({candidates:[{label:'X',assessment:assessmentShape},{label:'Y',assessment:assessmentShape}],preferredLabel:'tie',reason:'specific comparison'});
const identity={datasetHash:hash(readFileSync('datasets/i18n/consensus-gold/v1/cases.jsonl','utf8')),catalogHash:hash(JSON.stringify(catalog)),harnessHash:hash(readFileSync(import.meta.path,'utf8')),models:catalog.models.map((m:any)=>({id:m.id,effort:lowestReasoningEffort(m)})),judges,judgeEffort:'high',maxOutputTokens:24000,retries:0,concurrency:4,method:'whole-document translation; source only; paired blinded reviews',judgePromptHash:hash(judgeSystem),terra:'unavailable'};
mkdirSync(join(dir,'calls'),{recursive:true});
if(existsSync(join(dir,'manifest.jsonl'))){if(JSON.stringify(read(join(dir,'manifest.jsonl')).identity)!==JSON.stringify(identity))throw Error('Run identity changed: choose a new run directory');}
else {write(join(dir,'manifest.jsonl'),{createdAt:new Date().toISOString(),identity});writeFileSync(join(dir,'inputs.jsonl'),cases.map(c=>JSON.stringify(c)).join('\n')+'\n');}
async function call(id:string,model:string,effort:string,system:string,prompt:string){
 const path=join(dir,'calls',id+'.jsonl'); const fingerprint=hash(JSON.stringify({model,effort,system,prompt,identity}));
 if(existsSync(path)){const saved=read(path);if(saved.fingerprint!==fingerprint)throw Error('Cached call mismatch');return saved;}
 if(!langfuseEnabled)throw Error('Langfuse required');
 const config=resolveLlmConfig(`llm://openrouter/${model}?reasoning_effort=${effort}&max_tokens=24000`);
 return startActiveObservation('translation-battle',async span=>{
  const start=Date.now();const row:any={id,model,effort,fingerprint,system,prompt,startedAt:new Date().toISOString(),traceId:span.traceId,observationId:span.id};
  span.update({input:{id,model,effort,run:dir},metadata:{battleRun:dir,callId:id}});
  try {const result=await generateText({model:createOpenRouterChatModel(config),system,prompt,maxOutputTokens:24000,maxRetries:0,providerOptions:config.providerOptions,abortSignal:AbortSignal.timeout(300000)});
   Object.assign(row,{text:result.text,usage:result.usage,providerMetadata:result.providerMetadata,finishReason:result.finishReason,warnings:result.warnings,response:result.response,telemetry:usageFromResult(result.usage,Date.now()-start,result.providerMetadata),ok:result.finishReason!=='length'&&result.text.trim().length>0});
   row.catalogEstimateUsd=catalogCost(row.telemetry,catalog.models.find((m:any)=>m.id===model).pricing,model);
  }catch(e){Object.assign(row,{ok:false,error:String(e)});span.update({level:'ERROR',statusMessage:String(e)});}
  row.durationMs=Date.now()-start;write(path,row);span.update({output:{ok:row.ok,durationMs:row.durationMs}});span.end();await flushLangfuse();console.log(JSON.stringify({id,ok:row.ok,seconds:row.durationMs/1000}));return row;
 },{asType:'agent',endOnExit:false});
}
async function generate(c:typeof cases[number],m:any){
 const id='gen-'+hash(c.id+m.id).slice(0,20);
 const row=await call(id,m.id,lowestReasoningEffort(m),buildSystemPrompt(c.locale,c.source.text.includes('<Challenge')),'Translate the COMPLETE English MDX document below, including its reader-facing frontmatter. Preserve controlled metadata. Output a complete MDX file with frontmatter.\n\n'+c.source.text);
 let target='',validation:any=null;
 if(row.ok)try{const parsed=matter(row.text);target=normalizeLocalizedCandidateFile(c.source.text,matter.stringify(parsed.content,normalizeFrontmatterAssetPaths(omitInheritedTranslatedFrontmatter(parsed.data))));validation=validateTranslation({sourceContents:c.source.text,targetContents:target,targetPath:c.baseline.path,locale:c.locale});
  await compile(matter(target).content);validation.protectedDifferences=protectedDiff(matter(c.source.text).content,matter(target).content);validation.passed=validation.passed&&!validation.protectedDifferences.length;
 }catch(e){validation={passed:false,error:String(e)};target=target||row.text;}
 const out={id,caseId:c.id,model:m.id,ok:row.ok,target,validation};write(join(dir,id+'-result.jsonl'),out);return out;
}
async function review(g:any,j:string){
 if(!g.ok)return;const c=cases.find(c=>c.id===g.caseId)!;
 const generatedLabel=parseInt(hash(g.id+j).slice(0,8),16)%2?'X':'Y';
 const pair=generatedLabel==='X'?{X:g.target,Y:c.reference.text}:{X:c.reference.text,Y:g.target};
 const id='review-'+hash(g.id+j).slice(0,20);
 const row=await call(id,j,'high',judgeSystem,JSON.stringify({locale:c.locale,english:c.source.text,candidates:pair}));
 let result:any=null,error:string|undefined;
 if(row.ok)try{result=auditSchema.parse(JSON.parse(extractJsonObject(row.text)??'null'));if(new Set(result.candidates.map((x:any)=>x.label)).size!==2||!result.candidates.every((x:any)=>['X','Y'].includes(x.label))||!['X','Y','tie'].includes(result.preferredLabel))throw Error('Invalid labels');}catch(e){error=String(e);}
 write(join(dir,id+'-result.jsonl'),{id,generationId:g.id,caseId:c.id,model:g.model,judge:j,generatedLabel,ok:!!result,result,error});
}
async function pool<T>(jobs:T[],fn:(job:T)=>Promise<unknown>){let index=0;await Promise.all(Array.from({length:4},async()=>{while(index<jobs.length){const job=jobs[index++];await fn(job!);}}));}
const jobs=cases.flatMap(c=>catalog.models.map((m:any)=>({c,m})));
const selected=mode==='canary'?jobs.slice(0,1):jobs;
const generated:any[]=[];
await pool(selected,async({c,m})=>{generated.push(await generate(c,m));});
await pool(generated.flatMap(g=>judges.map(j=>({g,j}))),async({g,j})=>review(g,j));
await flushLangfuse();console.log('Battle stage complete: '+mode);
