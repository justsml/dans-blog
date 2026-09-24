import {test,expect} from 'bun:test';
import {mkdtempSync,writeFileSync,readFileSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {writeRecords,readRecord,readRecordText} from './records.ts';
test('JSONL preserves multiline text and reads legacy results without changing evidence',()=>{
 const dir=mkdtempSync(join(tmpdir(),'negotiation-records-'));
 try{
  const legacy=join(dir,'result.json'),current=join(dir,'result.jsonl');
  const text=JSON.stringify({value:'old'},null,2)+'\n';writeFileSync(legacy,text);
  expect(readRecord(legacy)).toEqual({value:'old'});
  writeRecords(current,[{value:'paragraph one\nparagraph two'}]);
  expect(readRecord(legacy)).toEqual({value:'paragraph one\nparagraph two'});
  expect(readRecordText(legacy).trim().split('\n')).toHaveLength(1);
  expect(readFileSync(legacy,'utf8')).toBe(text);
  writeRecords(current,[{value:1},{value:2}]);
  expect(()=>readRecord(legacy)).toThrow('exactly one');
 }finally{rmSync(dir,{recursive:true});}
});
