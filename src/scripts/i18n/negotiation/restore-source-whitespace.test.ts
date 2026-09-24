import {test,expect} from 'bun:test';
import {restoreSourceWhitespace} from './restore-source-whitespace.ts';
test('restore invisible protected-source spaces without changing prose or substantive literals',()=>{
 const source='Prose\n`1\u202f234 €`\n```js\n// ❌\u00a0Not Supported\nconst x = 1;\n```';
 const target='Prosa\n`1 234 €`\n```js\n// ❌ Not Supported\nconst x = 1;\n```';
 const result=restoreSourceWhitespace(source,target);
 expect(result.text).toBe(source.replace('Prose','Prosa'));expect(result.changes).toHaveLength(2);
 expect(restoreSourceWhitespace('`1\u202f234 €`','`9 999 €`').changes).toHaveLength(0);
 expect(restoreSourceWhitespace('`1\u202f234 €` and `1\u00a0234 €`','`1 234 €`').changes).toHaveLength(0);
});
