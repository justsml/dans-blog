import {existsSync,readFileSync,writeFileSync} from 'node:fs';

/** One complete result per line, including records containing multiline prose. */
export function writeRecords(path:string,records:unknown[]) {
 writeFileSync(path,records.map(record=>JSON.stringify(record)).join('\n')+(records.length?'\n':''));
}
export function recordPath(legacyPath:string) {
 const path=legacyPath.replace(/\.json$/,'.jsonl');
 return existsSync(path)?path:legacyPath;
}
export function readRecordText(legacyPath:string){return readFileSync(recordPath(legacyPath),'utf8');}
export function readRecord(legacyPath:string) {
 const path=recordPath(legacyPath),text=readFileSync(path,'utf8');
 if(path.endsWith('.json'))return JSON.parse(text);
 const rows=text.split('\n').filter(line=>line.trim());
 if(rows.length!==1)throw Error('Expected exactly one result record: '+path);
 return JSON.parse(rows[0]!);
}
