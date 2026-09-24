import {readFileSync,writeFileSync,mkdirSync,existsSync,appendFileSync,readdirSync,renameSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {z} from 'zod';
import matter from 'gray-matter';
import {compile} from '@mdx-js/mdx';
import {runCli,type CliBackend} from './cli-transport.ts';
import {hash,rubric,assessmentSchema,meetsQualityGate,protectedDiff} from './protocol.ts';
import {writeRecords,readRecord} from './records.ts';
import {snapshotHistory} from './history.ts';
import {validateTranslation} from '../core/validate.ts';
import {parseQuiz} from '../quiz-parser.ts';
import {extractJsonObject} from '../judge-utils.ts';

const root=process.cwd();
const base=resolve(process.argv[2]??'reports/i18n/consensus-batches/2026-09-23-expanded');
const seed=resolve('reports/i18n/consensus-pilots/2026-09-23-named-exports');
const samples=[
 {post:'2023-08-18--should-you-use-named-or-default-exports',locale:'es',reason:'Complete original negotiated pilot; fix remaining idiom and code preservation defects.'},
 {post:'2023-08-18--should-you-use-named-or-default-exports',locale:'ja',reason:'Complete original negotiated pilot; correct argument/parameter ambiguity and emphasis.'},
 {post:'2025-05-31--the-last-to-think',locale:'es',reason:'Satire, metaphor, historical references and authorial edge; latest recorded score 91.4.'},
 {post:'2024-08-29--handling-international-numbers-and-currency',locale:'ja',reason:'Locale-specific number/currency conventions and technical APIs; latest recorded score 77.6.'},
 {post:'2024-10-31--quiz-js-interfaces-symbols-and-enumerables',locale:'es',reason:'Quiz wording, hints, explanations, executable examples and answer-key preservation; latest recorded score 87.6.'},
] as const;
const editors=[{id:'editor-A',model:'openai/gpt-6-sol',effort:'high',backend:'codex'},{id:'editor-B',model:'anthropic/claude-opus-5.5',effort:'high',backend:'claude'}] as const;
const auditors=[{id:'auditor-A',model:'openai/gpt-6-astra',effort:'high',backend:'codex'},{id:'auditor-B',model:'anthropic/claude-fable-5.1',effort:'high',backend:'claude'}] as const;
type Actor={id:string;model:string;effort:string;backend:CliBackend};
const reviewSchema=z.object({assessment:assessmentSchema,sourceConcerns:z.array(z.string())});
const proposalSchema=z.object({translation:z.string().min(100),changes:z.array(z.object({before:z.string(),after:z.string(),severity:z.number().int().min(0).max(4),confidence:z.number().min(0).max(1),rationale:z.string(),evidenceIds:z.array(z.string())})),responseToPeer:z.string(),sourceConcerns:z.array(z.string())});
const approvalSchema=z.object({assessment:assessmentSchema,changeVotes:z.array(z.object({index:z.number().int(),agreeWording:z.boolean(),agreeSeverity:z.boolean(),severity:z.number().int().min(0).max(4),rationale:z.string()})),sourceConcerns:z.array(z.string())});
const system=rubric+'\nAssess translation defects only in unresolved. Put inherited English factual/code defects in sourceConcerns, never in translation unresolved or readiness scores. Protect the source even where it is wrong. The task is a native-quality adaptation retaining the author’s edge. Inline frozen evidence replaces tool access; do not access other files or run tools. Do not invent references. English code comments must be preserved verbatim, including nested fences. Preserve all original target frontmatter metadata. Return only the requested JSON.';
mkdirSync(base,{recursive:true});
writeRecords(join(base,'selection.jsonl'),samples.map(s=>({...s,selectedAt:'2026-09-23',sourcePath:'src/content/posts/'+s.post+'/index.mdx'})));
async function all<T>(jobs:Promise<T>[]){const results=await Promise.allSettled(jobs);const errors=results.filter(r=>r.status==='rejected');if(errors.length)throw new AggregateError(errors.map(r=>(r as PromiseRejectedResult).reason));return results.map(r=>(r as PromiseFulfilledResult<T>).value);}
async function call<T>(dir:string,key:string,actor:Actor,task:string,schema:z.ZodType<T>){
 const outputSchema=z.toJSONSchema(schema),request={actor,system,task,outputSchema},fingerprint=hash(JSON.stringify(request));
 const path=join(dir,'calls',key);mkdirSync(join(dir,'calls'),{recursive:true});
 if(existsSync(path+'-parsed.jsonl')){const old=readRecord(path+'-parsed.json');if(old.fingerprint!==fingerprint)throw Error('Cached identity changed: '+key);return schema.parse(old.value);}
 if(existsSync(path+'-raw.jsonl'))throw Error('Inspect prior unparsed response: '+path);
 if(existsSync(path+'-error.jsonl')){const archive=join(dir,'calls','attempts',key+'-'+Date.now());mkdirSync(archive,{recursive:true});for(const name of readdirSync(join(dir,'calls')))if(name.startsWith(key+'-'))renameSync(join(dir,'calls',name),join(archive,name));}
 writeRecords(path+'-request.jsonl',[{...request,fingerprint}]);
 const started=performance.now();
 try{
 const text=await runCli(actor.backend,actor,system+'\nTASK\n'+task+'\nOUTPUT SCHEMA\n'+JSON.stringify(outputSchema),outputSchema,path);
 writeRecords(path+'-raw.jsonl',[{fingerprint,text,durationMs:performance.now()-started}]);
 const json=extractJsonObject(text);if(!json)throw Error('Missing response JSON');
 const value=schema.parse(JSON.parse(json));writeRecords(path+'-parsed.jsonl',[{fingerprint,value}]);
 appendFileSync(join(base,'events.jsonl'),JSON.stringify({at:new Date().toISOString(),case:dir.split('/').pop(),key,model:actor.model,status:'complete',durationMs:performance.now()-started})+'\n');
 console.log(dir.split('/').pop()+' '+key+' complete');return value;
 }catch(error){writeRecords(path+'-error.jsonl',[{fingerprint,error:String(error)}]);throw error;}
}
async function validate(source:string,target:string,baseline:string,path:string,locale:'es'|'ja'){
 const structural=validateTranslation({sourceContents:source,targetContents:target,targetPath:path,locale});
 let mdxError:string|null=null;try{await compile(matter(target).content);}catch(error){mdxError=String(error);}
 const protectedChanges=protectedDiff(baseline,target,source);
 let quizError:string|null=null;
 if(source.includes('<Challenge'))try{
  const signature=(text:string)=>parseQuiz(matter(text).content).challenges.map(c=>({index:c.index,answers:c.options.map(o=>!!o.isAnswer),clientVisible:c.clientVisible}));
  if(JSON.stringify(signature(source))!==JSON.stringify(signature(target)))throw Error('Quiz answer positions/index/hydration changed');
 }catch(error){quizError=String(error);}
 return {structural,mdxError,protectedChanges,quizError,passed:structural.passed&&!mdxError&&!protectedChanges.length&&!quizError};
}
async function run(sample:typeof samples[number]){
 const {post,locale}=sample,dir=join(base,post+'-'+locale);mkdirSync(dir,{recursive:true});
 const sourcePath='src/content/posts/'+post+'/index.mdx',targetPath='src/content/posts/'+post+'/'+locale+'/index.mdx';
 const snapshotPath=join(dir,locale+'-snapshot.json');
 const source=readFileSync(sourcePath,'utf8'),target=readFileSync(targetPath,'utf8');
 const snapshot=existsSync(snapshotPath)?JSON.parse(readFileSync(snapshotPath,'utf8')):{locale,sourcePath,targetPath,source,target,sourceHash:hash(source),targetHash:hash(target),history:snapshotHistory(root,sourcePath,targetPath)};
 if(snapshot.sourceHash!==hash(source)||snapshot.targetHash!==hash(target)||hash(snapshot.source)!==snapshot.sourceHash||hash(snapshot.target)!==snapshot.targetHash)throw Error('Frozen input drift: '+post);
 if(!existsSync(snapshotPath))writeFileSync(snapshotPath,JSON.stringify(snapshot,null,2)+'\n');
 const references=JSON.parse(readFileSync(join(seed,'references.json'),'utf8'));
 const identity={protocol:'refinement-v1',post,locales:[locale],editors,auditors,rubricHash:hash(system),snapshotHash:hash(JSON.stringify(snapshot)),referencesHash:hash(JSON.stringify(references)),maxRounds:4};
 const manifestPath=join(dir,'manifest.json');
 if(existsSync(manifestPath)&&JSON.stringify(JSON.parse(readFileSync(manifestPath,'utf8')).identity)!==JSON.stringify(identity))throw Error('Manifest changed');
 if(!existsSync(manifestPath))writeFileSync(manifestPath,JSON.stringify({identity,createdAt:new Date().toISOString()},null,2)+'\n');
 const ctx={locale,audience:locale==='es'?'Broad Spanish-speaking technical readers; avoid needless regional slang.':'Japanese technical readers; fluent local technical editorial voice.',sourcePath,targetPath,sourceHash:snapshot.sourceHash,source};
 const evidence={history:snapshot.history,references};
 let current=target,feedback:unknown=null;
 if(post===samples[0].post){current=readFileSync(join(seed,locale+'-candidate.mdx'),'utf8');feedback=JSON.parse(readFileSync(join(seed,locale+'-result.json'),'utf8'));}
 const initial=await all(editors.map(actor=>call(dir,'initial-'+actor.id,actor,'Independently assess the full current translation, before seeing a peer. Identify every actionable error and optional polish. Distinguish source concerns.\n'+JSON.stringify({...ctx,currentTranslation:current,evidence,priorPilotFindings:feedback}),reviewSchema)));
 feedback=initial;
 const rounds:unknown[]=[];
 for(let round=1;round<=4;round++){
  const author=editors[(round-1)%2]!,peer=editors[round%2]!;
  const proposal=await call(dir,'round-'+round+'-proposal',author,'Produce a complete refined translation from the CURRENT version, responding to all competing critiques. Make only defensible improvements; do not rewrite for novelty. Include full MDX frontmatter and body. Enumerate changes with exact before/after excerpts, severity, confidence and evidence IDs (source/target or checked reference). Preserve code, factual numbers, URLs, quiz answers and author voice. No new unsupported cultural claims. A prose code comment already translated must be restored to the source. Fix all substantive translation issues so the next review can pass.\n'+JSON.stringify({...ctx,currentTranslation:current,peerFeedback:feedback,evidence}),proposalSchema);
  const candidate=proposal.translation;
  const validation=await validate(source,candidate,target,targetPath,locale);
  writeFileSync(join(dir,locale+'-round-'+round+'.mdx'),candidate);
  const approvals=await all([author,peer].map(actor=>call(dir,'round-'+round+'-approval-'+actor.id,actor,'Critically review the proposed full translation. Vote on EVERY numbered change (zero-based index), agreeing only if both wording and severity are defensible. Reject/counter weak claims, including your own. Recheck the whole document independently against English, not just listed edits. You may approve an excellent unchanged passage. Report exact remaining translation issues; inherited source defects go ONLY in sourceConcerns.\n'+JSON.stringify({...ctx,baselineTranslation:current,candidate,proposal,validation,evidence}),approvalSchema)));
  const votesComplete=approvals.every(a=>a.changeVotes.length===proposal.changes.length&&new Set(a.changeVotes.map(v=>v.index)).size===proposal.changes.length&&a.changeVotes.every(v=>v.index>=0&&v.index<proposal.changes.length&&v.agreeWording&&v.agreeSeverity&&v.severity===proposal.changes[v.index]!.severity));
  const assessments=approvals.map(a=>a.assessment);
  const consensus=votesComplete&&meetsQualityGate(assessments,validation.passed,false);
  let audits:any[]=[];
  if(consensus){
   audits=await all(auditors.map(async actor=>{
    const blind=await call(dir,'round-'+round+'-blind-'+actor.id,actor,'Independently score this full translation against English on all ten dimensions. It is an unlabeled candidate; no creator identities or confidence are provided. Identify concrete translation defects. Inherited source problems are separate sourceConcerns.\n'+JSON.stringify({...ctx,currentTranslation:candidate}),reviewSchema);
    return {actor,mapping:{candidate:'X'},blind:{candidates:[{label:'X',assessment:blind.assessment}],sourceConcerns:blind.sourceConcerns}};
   }));
  }
  const gold=consensus&&meetsQualityGate(audits.map(a=>a.blind.candidates[0].assessment),validation.passed,false);
  rounds.push({round,startingHash:hash(current),candidateHash:hash(candidate),proposal,approvals,validation,consensus,gold,audits});
  const confidences=proposal.changes.map(c=>c.confidence).sort((a,b)=>a-b);
  const confidence={count:confidences.length,mean:confidences.length?confidences.reduce((a,b)=>a+b,0)/confidences.length:null,median:confidences.length?(confidences[Math.floor((confidences.length-1)/2)]!+confidences[Math.floor(confidences.length/2)]!)/2:null,meaning:'Self-reported negotiated change confidence, not calibrated probability'};
  const result={locale,sourceHash:snapshot.sourceHash,baselineHash:snapshot.targetHash,candidateHash:hash(candidate),consensus,gold,status:gold?'synthetic-consensus-gold':'needs-negotiation',confidence,assessments,audits,validation,round};
  writeRecords(join(dir,locale+'-ledger.jsonl'),[{sourcePath,targetPath,sourceHash:snapshot.sourceHash,baselineHash:snapshot.targetHash,initial,rounds}]);
  writeRecords(join(dir,locale+'-result.jsonl'),[result]);writeFileSync(join(dir,locale+'-candidate.mdx'),candidate);
  if(gold){console.log(post+' '+locale+' GOLD');return {dir,...result};}
  current=candidate;feedback={approvals,audits,validation,instruction:'Resolve remaining objections; give reasoned responses to disagreements. Do not classify source issues as translation defects.'};
 }
 return {dir,status:'needs-negotiation',gold:false};
}
// Two cases at a time bounds local CLI/provider load; sibling failures retain successful work.
const onlyIndex=process.argv.indexOf('--only');
const selected=onlyIndex<0?samples:samples.filter(s=>process.argv[onlyIndex+1]!.split(',').some(term=>(s.post+'-'+s.locale).includes(term)));
if(!selected.length)throw Error('No selected samples');
const results:unknown[]=[];
for(let i=0;i<selected.length;i+=2){const rows=await Promise.allSettled(selected.slice(i,i+2).map(run));for(const r of rows)results.push(r.status==='fulfilled'?r.value:{status:'failed',error:String(r.reason)});writeRecords(join(base,'results.jsonl'),results);}
console.log(JSON.stringify(results.map((r:any)=>({dir:r.dir,status:r.status}))));

if(results.some((r:any)=>!r.gold))process.exitCode=1;
