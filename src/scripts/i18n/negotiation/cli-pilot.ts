import {mkdirSync,copyFileSync,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';

// Reuse checked catalog/reference inputs, never another transport's cached calls.
const args=process.argv.slice(2);
const value=(key:string,fallback:string)=>{const i=args.indexOf(key);return i<0?fallback:args[i+1]!;};
const seed=resolve(value('--seed','reports/i18n/consensus-pilots/2026-09-23-named-exports'));
const out=resolve(value('--out','reports/i18n/consensus-pilots/2026-09-23-named-exports-cli'));
if(seed===out)throw Error('CLI output must differ from seed');
mkdirSync(out,{recursive:true});
for(const name of ['catalog.json','references.json'])if(!existsSync(join(out,name)))copyFileSync(join(seed,name),join(out,name));
const forwarded=args.filter((_,i)=>args[i]!=='--seed'&&args[i-1]!=='--seed');
if(!args.includes('--out'))forwarded.push('--out',out);
if(!args.includes('--transport'))forwarded.push('--transport','cli');
const child=Bun.spawn(['bun',resolve('src/scripts/i18n/negotiation/pilot.ts'),...forwarded],{stdin:'inherit',stdout:'inherit',stderr:'inherit'});
process.exit(await child.exited);
