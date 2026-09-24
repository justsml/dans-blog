import {normalizeSeverity} from './severity.ts';
import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {z} from 'zod';
import {hash,rubric,assessmentSchema,meetsQualityGate} from './protocol.ts';
import {runCli} from './cli-transport.ts';
import {readRecord,writeRecords} from './records.ts';
import {validateNegotiatedTranslation} from './batch-validation.ts';
import {extractJsonObject} from '../judge-utils.ts';
const base=resolve(process.argv[2]??'reports/i18n/consensus-batches/2026-09-23-expanded');
const only=process.argv[3]??'';
const selected=readFileSync(join(base,'selection.jsonl'),'utf8').trim().split('\n').map(line=>JSON.parse(line)).filter(s=>only.split(',').some(term=>(s.post+'-'+s.locale).includes(term)));
const schema=z.object({approveExactText:z.boolean(),candidateHash:z.string(),assessment:assessmentSchema,sourceConcerns:z.array(z.string()),explanation:z.string()});
const actors=[{id:'editor-A',model:'openai/gpt-6-sol',backend:'codex'},{id:'editor-B',model:'anthropic/claude-opus-5.5',backend:'claude'},{id:'auditor-A',model:'openai/gpt-6-astra',backend:'codex'},{id:'auditor-B',model:'anthropic/claude-fable-5.1',backend:'claude'}] as const;
async function finalize(s:any){
 const dir=s.runPath??join(base,s.post+'-'+s.locale),locale=s.locale;
 const snapshot=JSON.parse(readFileSync(join(dir,locale+'-snapshot.json'),'utf8'));
 const ledger=readRecord(join(dir,locale+'-ledger.json'));
 const last=ledger.rounds.at(-1),candidate=last.proposal.translation,candidateHash=hash(candidate);
 if(candidateHash!==last.candidateHash)throw Error('Round hash mismatch');
 const validation=await validateNegotiatedTranslation(snapshot.source,candidate,snapshot.target,snapshot.targetPath,locale);
 const result=readRecord(join(dir,locale+'-result.json'));
 if(!validation.passed){writeRecords(join(dir,'finalization-validation.jsonl'),[{candidateHash,validation}]);throw Error('Deterministic validation failed: '+dir);}
 const call=async(actor:typeof actors[number],blind:boolean)=>{
  const path=join(dir,'calls','finalize-'+candidateHash.slice(0,12)+'-'+actor.id);
  const task={locale,source:snapshot.source,currentTranslation:candidate,candidateHash,sourcePath:snapshot.sourcePath,targetPath:snapshot.targetPath,...(blind?{}:{negotiation:normalizeSeverity(last,last.severityScale??'0-4'),severityScale:'1-5',validation})};
  const system=rubric+'\nFinal frozen-text review. No rewrite is requested. Approve the EXACT candidate text only if it is a strong, faithful, native-quality reference. Reject any substantive defect, omission, unintended offense, source-code drift or loss of voice. A valid optional alternative (severity 1/2) does not itself make the current wording unacceptable. Do not conflate consensus with unanimity of stylistic taste. Preserve individual preferences in unresolved, but approval means you affirm this exact text is acceptable. Put inherited English errors ONLY in sourceConcerns, not unresolved/readiness. Return the supplied candidateHash unchanged. The final goal is reasoned approval or rejection, not agreement for its own sake. Use only supplied input; no tools.';
  const fingerprint=hash(JSON.stringify({actor,system,task}));
  if(existsSync(path+'-parsed.jsonl')){const old=readRecord(path+'-parsed.json');if(old.fingerprint!==fingerprint)throw Error('Finalization identity changed');return schema.parse(old.value);}
  if(existsSync(path+'-raw.jsonl'))throw Error('Prior raw result needs inspection');
  writeRecords(path+'-request.jsonl',[{actor,system,task,fingerprint}]);
  const text=await runCli(actor.backend,{model:actor.model,effort:'high'},system+'\n'+JSON.stringify(task)+'\nOUTPUT SCHEMA\n'+JSON.stringify(z.toJSONSchema(schema)),z.toJSONSchema(schema),path);
  writeRecords(path+'-raw.jsonl',[{fingerprint,text}]);
  const object=extractJsonObject(text);if(!object)throw Error('No JSON');
  const value=schema.parse(JSON.parse(object));if(value.candidateHash!==candidateHash)throw Error('Endorsement hash mismatch');
  writeRecords(path+'-parsed.jsonl',[{fingerprint,value}]);console.log(s.post+' '+locale+' finalized review '+actor.id);return value;
 };
 const all=async<T>(jobs:Promise<T>[])=>{const rows=await Promise.allSettled(jobs);const errors=rows.filter(r=>r.status==='rejected');if(errors.length)throw new AggregateError(errors.map(r=>(r as PromiseRejectedResult).reason));return rows.map(r=>(r as PromiseFulfilledResult<T>).value);};
 const endorsements=await all(actors.slice(0,2).map(actor=>call(actor,false)));
 if(!endorsements.every(e=>e.approveExactText)||!meetsQualityGate(endorsements.map(e=>e.assessment),validation.passed,false))throw Error('Editors require further refinement: '+dir);
 const reviews=await all(actors.slice(2).map(actor=>call(actor,true)));
 const gold=reviews.every(e=>e.approveExactText)&&meetsQualityGate(reviews.map(e=>e.assessment),validation.passed,false);
 const audits=reviews.map((r,i)=>({actor:actors[i+2],mapping:{candidate:'X'},blind:{candidates:[{label:'X',assessment:r.assessment}],sourceConcerns:r.sourceConcerns}}));
 const finalRound={...normalizeSeverity(last,last.severityScale??'0-4'),stage:'frozen-text-endorsement',severityScale:'1-5',previousValidation:last.validation,validation,endorsements,consensus:true,gold,audits};
 writeRecords(join(dir,'finalization.jsonl'),[{severityScale:'1-5',candidateHash,endorsements,reviews,validation,gold}]);
 if(!gold)throw Error('Blind reviewers require further refinement: '+dir);
 if(!existsSync(join(dir,locale+'-pre-finalization-result.jsonl')))writeRecords(join(dir,locale+'-pre-finalization-result.jsonl'),[result]);
 if(last.stage!=='frozen-text-endorsement')ledger.rounds.push(finalRound);
 writeRecords(join(dir,locale+'-ledger.jsonl'),[ledger]);
 writeRecords(join(dir,locale+'-result.jsonl'),[{...result,round:last.round,severityScale:'1-5',candidateHash,validation,assessments:endorsements.map(e=>e.assessment),audits,consensus:true,gold:true,status:'synthetic-consensus-gold',finalization:'explicit-frozen-text-endorsement'}]);
 writeFileSync(join(dir,locale+'-candidate.mdx'),candidate);
 console.log(s.post+' '+locale+' GOLD');
}
const rows=await Promise.allSettled(selected.map(finalize));
for(let i=0;i<rows.length;i++)if(rows[i]!.status==='rejected')console.error(selected[i].post, String((rows[i] as PromiseRejectedResult).reason));
if(rows.some(r=>r.status==='rejected'))process.exitCode=1;
