import {test,expect} from 'bun:test';
import {hash,issueAdmissibility,applyPatches,protectedDiff,validateVotes,agreedIssues,assessmentSchema,assessmentShape,meetsQualityGate,type Issue,type Vote} from './protocol.ts';
import {readRevision} from './history.ts';
const issue:Issue={id:'a',kind:'translation',category:'faithfulness',severity:3,sourceQuote:'Never',targetQuote:'Siempre',replacement:'Nunca',rationale:'Negation reversed',alternative:'',confidence:0.9,requiresExternalEvidence:false,audienceScope:'es',evidence:[{referenceId:'source',explanation:'Prohibition'}]};
const vote:Vote={issueId:'a',decision:'accept',severity:3,confidence:0.9,rationale:'Exact reversal',replacement:'Nunca',evidence:[]};
test('stale and ambiguous patch application fails without partial output',()=>{
 expect(()=>applyPatches('Siempre',hash('new'),[issue])).toThrow('Stale');
 expect(()=>applyPatches('Siempre Siempre',hash('Siempre Siempre'),[issue])).toThrow('Ambiguous');
 expect(applyPatches('Siempre',hash('Siempre'),[issue])).toBe('Nunca');
 expect(()=>applyPatches('Siempre',hash('Siempre'),[issue,{...issue,id:'b'}])).toThrow('Overlapping');
});
test('consensus requires two complete ballots agreeing on wording and severity',()=>{
 expect(()=>agreedIssues([issue],[[vote]],'Never','Siempre',new Set())).toThrow();
 expect(()=>validateVotes([issue],[vote,vote])).toThrow();
 expect(agreedIssues([issue],[[vote],[{...vote,severity:1}]],'Never','Siempre',new Set())).toEqual([]);
 expect(agreedIssues([issue],[[vote],[vote]],'Never','Siempre',new Set())).toEqual([issue]);
 expect(agreedIssues([issue],[[vote],[{...vote,replacement:'Jamás'}]],'Never','Siempre',new Set())).toEqual([]);
});
test('unsupported cultural claims and source corrections cannot silently become edits',()=>{
 expect(issueAdmissibility({...issue,requiresExternalEvidence:true},'Never','Siempre',new Set())).toContain('checked reference');
 expect(issueAdmissibility({...issue,kind:'source'},'Never','Siempre',new Set())).toContain('author review');
 expect(issueAdmissibility({...issue,evidence:[{referenceId:'invented',explanation:'because'}]},'Never','Siempre',new Set())).toBe('Unknown reference');
});
test('numeric facts, code and answer flags survive cultural adaptation',()=>{
 expect(protectedDiff('250','200')).toContain('numbers');
 expect(protectedDiff('`const a = 2`','`const a = 3`')).toContain('inlineCode');
 expect(protectedDiff('isAnswer: true','isAnswer: false')).toContain('answerFlags');
 expect(protectedDiff('Hello','Hola')).toEqual([]);
});
test('history is bound to actual source and target bytes',()=>{
 const r={id:'abc',path:'ja/index.mdx',sourcePath:'index.mdx',sourceHash:hash('source'),translationHash:hash('target'),matchesCurrentSource:true,declaredSourceHash:null,contents:'target'};
 expect(readRevision([r],'abc',r.sourceHash)).toEqual(r);
 expect(()=>readRevision([r],'abc',hash('new source'))).toThrow('mismatch');
 expect(()=>readRevision([{...r,contents:'changed'}],'abc',r.sourceHash)).toThrow('Corrupt');
});
test('gold admission fails on unresolved evidence, bad validation, or duplicate dimensions',()=>{
 const a=assessmentSchema.parse({...assessmentShape,ready:true,unresolved:[]});
 expect(meetsQualityGate([a,a],true,false)).toBe(true);
 expect(meetsQualityGate([a,a],true,true)).toBe(false);
 expect(meetsQualityGate([a,a],false,false)).toBe(false);
 expect(()=>assessmentSchema.parse({...a,ratings:a.ratings.map(()=>a.ratings[0])})).toThrow();
});
