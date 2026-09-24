import {test,expect} from 'bun:test';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {hash} from './protocol.ts';
import {loadGoldenDataset,goldenBenchmarkFixtures,assertCurrentSourceMatches,type GoldenCase} from './dataset.ts';
const c:GoldenCase={schemaVersion:1,id:'post-es-v1',datasetVersion:'v1',status:'gold',locale:'es',
 source:{path:'src/content/posts/example/index.mdx',sha256:hash('English'),text:'English'},
 baseline:{path:'src/content/posts/example/es/index.mdx',sha256:hash('Old'),text:'Old'},
 reference:{path:'reference.mdx',sha256:hash('Español'),text:'Español'},dimensions:['faithfulness'],
 lineage:{runPath:'run',manifestSha256:hash('manifest'),ledgerSha256:hash('ledger'),resultSha256:hash('result'),method:'adversarial-consensus',createdAt:'2026-09-23'},
 confidence:{count:2,mean:0.9,median:0.9,meaning:'self-reported'},
};
test('dataset verifies both manifest and embedded source/reference bytes',()=>{
 const dir=mkdtempSync(join(tmpdir(),'gold-dataset-'));
 try{
  const save=(value:GoldenCase)=>{const text=JSON.stringify(value)+'\n';writeFileSync(join(dir,'cases.jsonl'),text);writeFileSync(join(dir,'manifest.json'),JSON.stringify({casesSha256:hash(text),caseCount:1}));};
  save(c);expect(loadGoldenDataset(dir)).toEqual([c]);
  save({...c,reference:{...c.reference,text:'tampered'}});expect(()=>loadGoldenDataset(dir)).toThrow('content hash');
  save(c);writeFileSync(join(dir,'cases.jsonl'),'changed');expect(()=>loadGoldenDataset(dir)).toThrow('manifest hash');
 }finally{rmSync(dir,{recursive:true,force:true});}
});
test('eval fixture excludes debate and confidence; changed source cannot reuse gold',()=>{
 const fixture=goldenBenchmarkFixtures([c])[0]!;
 expect(fixture.target).toBe('Español');
 expect(fixture).not.toHaveProperty('lineage');
 expect(fixture).not.toHaveProperty('confidence');
 expect(()=>assertCurrentSourceMatches(c,'new English')).toThrow('Source changed');
 expect(()=>assertCurrentSourceMatches(c,'English')).not.toThrow();
});

test('multi-run export preserves frozen inputs and rejects incomplete admission',async()=>{
 const {exportGoldenDataset}=await import('./dataset.ts');
 const {mkdirSync,readFileSync}=await import('node:fs');
 const {dimensions}=await import('./protocol.ts');
 const dir=mkdtempSync(join(tmpdir(),'gold-multi-'));
 try{
  const assessment={ready:true,ratings:dimensions.map(d=>({dimension:d,score:4,confidence:0.9,rationale:'Evidence',quote:'text'})),unresolved:[],summary:'Ready'};
  const make=(post:string,locale:'es'|'ja')=>{
   const run=join(dir,post);mkdirSync(run);
   writeFileSync(join(run,'manifest.json'),JSON.stringify({identity:{post,locales:[locale],rubricHash:hash('rubric')}}));
   writeFileSync(join(run,locale+'-snapshot.json'),JSON.stringify({source:'English',target:'Old',sourceHash:hash('English'),targetHash:hash('Old'),sourcePath:'src/'+post+'/index.mdx',targetPath:'src/'+post+'/'+locale+'/index.mdx'}));
   writeFileSync(join(run,locale+'-candidate.mdx'),'Translated');
   writeFileSync(join(run,locale+'-ledger.jsonl'),'{}\n');
   writeFileSync(join(run,locale+'-result.jsonl'),JSON.stringify({gold:true,sourceHash:hash('English'),baselineHash:hash('Old'),candidateHash:hash('Translated'),validation:{passed:true},assessments:[assessment,assessment],audits:[1,2].map(()=>({mapping:{candidate:'X'},blind:{candidates:[{label:'X',assessment}]}})),confidence:c.confidence})+'\n');
   return run;
  };
  const runs=[make('a','es'),make('b','ja')],out=join(dir,'v1');
  const cases=exportGoldenDataset(runs,out,'v1');
  expect(cases).toHaveLength(2);expect(cases[0]!.source.text).toBe('English');
  expect(readFileSync(join(out,'benchmark-fixtures.jsonl'),'utf8').trim().split('\n')).toHaveLength(2);
  expect(()=>exportGoldenDataset(runs,out,'v1')).toThrow('immutable');
  const resultPath=join(runs[1]!,'ja-result.jsonl');
  const result=JSON.parse(readFileSync(resultPath,'utf8'));result.gold=false;writeFileSync(resultPath,JSON.stringify(result)+'\n');
  expect(()=>exportGoldenDataset(runs,join(dir,'bad'),'v2')).toThrow('gates');
 }finally{rmSync(dir,{recursive:true,force:true});}
});
