import {normalizeSeverity} from './severity.ts';
import {readRecordText,readRecord,writeRecords} from './records.ts';
import {existsSync,mkdirSync,readFileSync,writeFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {z} from 'zod';
import {hash,meetsQualityGate,assessmentSchema} from './protocol.ts';
const artifact=z.object({path:z.string(),sha256:z.string().regex(/^[a-f0-9]{64}$/),text:z.string()});
export const goldenCaseSchema=z.object({
 schemaVersion:z.literal(1),id:z.string(),datasetVersion:z.string(),status:z.literal('gold'),
 locale:z.enum(['es','ja']),source:artifact,baseline:artifact,reference:artifact,
 dimensions:z.array(z.string()),lineage:z.object({runPath:z.string(),manifestSha256:z.string(),ledgerSha256:z.string(),resultSha256:z.string(),method:z.literal('adversarial-consensus'),createdAt:z.string()}),
 quality:z.object({severityScale:z.literal('1-5'),editorAssessments:z.array(assessmentSchema),blindAssessments:z.array(assessmentSchema)}).optional(),
 confidence:z.object({count:z.number(),mean:z.number().nullable(),median:z.number().nullable(),meaning:z.string()}),
});
export type GoldenCase=z.infer<typeof goldenCaseSchema>;
export function loadGoldenDataset(dir:string):GoldenCase[] {
 const manifest=JSON.parse(readFileSync(join(dir,'manifest.json'),'utf8'));
 const contents=readFileSync(join(dir,'cases.jsonl'),'utf8');
 if(hash(contents)!==manifest.casesSha256)throw Error('Dataset manifest hash mismatch');
 const cases=contents.trim().split('\n').filter(Boolean).map(line=>goldenCaseSchema.parse(JSON.parse(line)));
 if(cases.length!==manifest.caseCount||new Set(cases.map(c=>c.id)).size!==cases.length)throw Error('Dataset count/ID mismatch');
 for(const c of cases)for(const a of [c.source,c.baseline,c.reference])if(hash(a.text)!==a.sha256)throw Error('Golden case content hash mismatch');
 return cases;
}
/** The harness sees canonical inputs/targets, without creator identities or confidence hints. */
export function goldenBenchmarkFixtures(cases:GoldenCase[]) {
 return cases.map(c=>({id:c.id,locale:c.locale,source:c.source.text,target:c.reference.text,expectedReady:true,split:'heldout',datasetVersion:c.datasetVersion,sourceHash:c.source.sha256,referenceHash:c.reference.sha256}));
}
export function assertCurrentSourceMatches(c:GoldenCase,currentContents:string) {
 if(hash(currentContents)!==c.source.sha256)throw Error('Source changed: use a new dataset case/version, not this reference');
}
export function exportGoldenDataset(runInput:string|string[],datasetDir:string,version:string) {
 if(existsSync(datasetDir))throw Error('Dataset versions are immutable; choose a new directory');
 const runDirs=typeof runInput==='string'?[runInput]:runInput;
 if(!runDirs.length)throw Error('At least one admitted run is required');
 const cases:GoldenCase[]=[];
 const rubricHashes=new Set<string>();
 for(const runDir of runDirs){
 const manifestText=readFileSync(join(runDir,'manifest.json'),'utf8'),manifest=JSON.parse(manifestText);
 rubricHashes.add(manifest.identity.rubricHash);
 for(const locale of manifest.identity.locales){
  const snapshot=JSON.parse(readFileSync(join(runDir,locale+'-snapshot.json'),'utf8'));
  const resultText=readRecordText(join(runDir,locale+'-result.json')),result=readRecord(join(runDir,locale+'-result.json'));
  const ledgerText=readRecordText(join(runDir,locale+'-ledger.json'));
  const candidate=readFileSync(join(runDir,locale+'-candidate.mdx'),'utf8');
  if(manifest.identity.protocol==='refinement-v1'){
   const ledger=JSON.parse(ledgerText),round=ledger.rounds.at(-1);
   if(!round?.gold||round.candidateHash!==hash(candidate)||round.proposal.translation!==candidate)throw Error('Negotiation ledger does not attest final candidate');
   if(round.stage==='frozen-text-endorsement'){
    if(round.endorsements.length<2||!round.endorsements.every((e:any)=>e.approveExactText&&e.candidateHash===hash(candidate))||!meetsQualityGate(round.endorsements.map((e:any)=>assessmentSchema.parse(normalizeSeverity(e.assessment,round.severityScale??'0-4'))),round.validation.passed,false))throw Error('Missing exact-text endorsement');
   }else if(round.approvals.length<2||!round.approvals.every((a:any)=>a.changeVotes.length===round.proposal.changes.length&&new Set(a.changeVotes.map((v:any)=>v.index)).size===round.proposal.changes.length&&a.changeVotes.every((v:any)=>v.agreeWording&&v.agreeSeverity&&v.severity===round.proposal.changes[v.index]?.severity)))throw Error('Missing wording/severity consensus');
  }
  const assessments=result.assessments.map((a:unknown)=>assessmentSchema.parse(normalizeSeverity(a,result.severityScale??'0-4')));
  const blind=result.audits.map((a:any)=>assessmentSchema.parse(normalizeSeverity(a.blind.candidates.find((c:any)=>c.label===a.mapping.candidate).assessment,result.severityScale??'0-4')));
  const unresolvedEvidence=assessments.some((a:z.infer<typeof assessmentSchema>)=>a.unresolved.some(i=>i.requiresReference&&i.severity>=3));
  if(!result.gold||!meetsQualityGate(assessments,result.validation.passed,unresolvedEvidence)||!meetsQualityGate(blind,result.validation.passed,false))throw Error('Case has not passed consensus and blind audit gates: '+locale);
  if(hash(snapshot.source)!==snapshot.sourceHash||hash(snapshot.target)!==snapshot.targetHash||hash(candidate)!==result.candidateHash)throw Error('Pilot artifact drift');
  if(result.sourceHash!==snapshot.sourceHash||result.baselineHash!==snapshot.targetHash)throw Error('Pilot identity mismatch');
  cases.push(goldenCaseSchema.parse({schemaVersion:1,id:manifest.identity.post+'-'+locale+'-'+snapshot.sourceHash.slice(0,12),datasetVersion:version,status:'gold',locale,
   source:{path:snapshot.sourcePath,sha256:snapshot.sourceHash,text:snapshot.source},
   baseline:{path:snapshot.targetPath,sha256:snapshot.targetHash,text:snapshot.target},
   reference:{path:join(runDir,locale+'-candidate.mdx'),sha256:hash(candidate),text:candidate},
   dimensions:assessments[0].ratings.map((r:any)=>r.dimension),
   lineage:{runPath:runDir,manifestSha256:hash(manifestText),ledgerSha256:hash(ledgerText),resultSha256:hash(resultText),method:'adversarial-consensus',createdAt:new Date().toISOString()},
   quality:{severityScale:'1-5',editorAssessments:assessments,blindAssessments:blind},
   confidence:result.confidence,
  }));
 }
 }
 if(new Set(cases.map(c=>c.id)).size!==cases.length)throw Error('Duplicate golden case IDs');
 mkdirSync(datasetDir,{recursive:true});
 const contents=cases.map(c=>JSON.stringify(c)).join('\n')+'\n';
 writeFileSync(join(datasetDir,'cases.jsonl'),contents);
 writeFileSync(join(datasetDir,'manifest.json'),JSON.stringify({schemaVersion:1,datasetVersion:version,referenceType:'synthetic-consensus-gold',severityScale:'1-5',blockingSeverityMinimum:3,legacySeverityMapping:'0-4 values map to 1-5 by adding one; raw lineage is preserved',caseCount:cases.length,casesSha256:hash(contents),createdAt:new Date().toISOString(),rubricHashes:[...rubricHashes],usage:'Canonical golden references for translation/harness evals. Keep fixed per benchmark version; create a new version when inputs or references change.'},null,2)+'\n');
 writeRecords(join(datasetDir,'benchmark-fixtures.jsonl'),goldenBenchmarkFixtures(cases));
 return loadGoldenDataset(datasetDir);
}
if(import.meta.main){
 const [run,output,version]=process.argv.slice(2);
 if(!run||!output||!version)throw Error('Usage: bun dataset.ts RUN_DIR NEW_DATASET_DIR VERSION');
 console.log(exportGoldenDataset(resolve(run),resolve(output),version).map(c=>({id:c.id,sourceHash:c.source.sha256,referenceHash:c.reference.sha256})));
}
