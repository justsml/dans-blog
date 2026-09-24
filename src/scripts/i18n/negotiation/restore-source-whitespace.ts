import {readFileSync,writeFileSync} from 'node:fs';
import {join,resolve} from 'node:path';
import {hash} from './protocol.ts';
import {readRecord,writeRecords} from './records.ts';
/** Restore only protected spans identical apart from NBSP/narrow-NBSP loss. */
export function restoreSourceWhitespace(source:string,candidate:string){
 const pattern=/^[ \t]*```[^\n]*\n[\s\S]*?^[ \t]*```|`[^`\n]+`/gm;
 const sourceSpans=[...source.matchAll(pattern)].map(m=>m[0]);
 const normalize=(s:string)=>s.replace(/[\u00a0\u202f]/g,' ');
 const changes:Array<{before:string;after:string}>=[];
 const text=candidate.replace(pattern,span=>{
  const matches=[...new Set(sourceSpans.filter(s=>normalize(s)===normalize(span)))];
  if(matches.length!==1||matches[0]===span)return span;
  changes.push({before:span,after:matches[0]!});return matches[0]!;
 });
 return {text,changes};
}
if(import.meta.main){
 const [path,locale]=process.argv.slice(2);if(!path||!locale)throw Error('Usage: bun restore-source-whitespace.ts RUN_DIR LOCALE');
 const dir=resolve(path),snapshot=JSON.parse(readFileSync(join(dir,locale+'-snapshot.json'),'utf8'));
 const ledger=readRecord(join(dir,locale+'-ledger.json')),last=ledger.rounds.at(-1);
 const {text,changes}=restoreSourceWhitespace(snapshot.source,last.proposal.translation);
 if(!changes.length)throw Error('No unambiguous protected whitespace restoration found');
 const proposal={translation:text,changes:changes.map(c=>({...c,severity:3,confidence:1,rationale:'Mechanical copy of exact frozen-source protected span: only nonbreaking whitespace differs. Requires new final endorsements.',evidenceIds:['source']})),responseToPeer:'Restored source bytes identified by reviewers; no prose edits.',sourceConcerns:[]};
 ledger.rounds.push({round:last.round+1,stage:'mechanical-source-whitespace-restoration',severityScale:'1-5',startingHash:last.candidateHash,candidateHash:hash(text),proposal,approvals:[],validation:null,consensus:false,gold:false,audits:[],codePoints:changes.map(c=>({before:[...c.before].map(x=>x.codePointAt(0)),after:[...c.after].map(x=>x.codePointAt(0))}))});
 writeRecords(join(dir,locale+'-ledger.jsonl'),[ledger]);writeFileSync(join(dir,locale+'-candidate.mdx'),text);console.log(changes.length+' source spans restored; final review required');
}
