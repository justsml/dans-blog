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
