#!/usr/bin/env bun
/** Synchronize derived formats without rewriting canonical talk or reference content. */
import { readFileSync, writeFileSync, mkdirSync, mkdtempSync, existsSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
import { TALKS, parseOutline, buildTalk, deckFor, fmt, toSec } from './build-talk';

const root=dirname(new URL(import.meta.url).pathname), repo=resolve(root,'../..');
const selected=process.argv.slice(2).filter(s=>!s.startsWith('--'));
const slugs=selected.length?selected:Object.keys(TALKS);
const build=mkdtempSync(join(tmpdir(),'talk-sync-'));
const hash=(p:string)=>createHash('sha256').update(readFileSync(p)).digest('hex');
const records:any[]=[];
const protectedInputs:Record<string,string>={};
const protect=(p:string)=>protectedInputs[resolve(p)]=hash(p);
const write=(p:string,s:string)=>{mkdirSync(dirname(p),{recursive:true});if(!existsSync(p)||readFileSync(p,'utf8')!==s)writeFileSync(p,s)};
const syncBlock=(p:string,block:string)=>{
 const begin='<!-- BEGIN GENERATED EDITIONS -->',end='<!-- END GENERATED EDITIONS -->';
 const current=existsSync(p)?readFileSync(p,'utf8'):'';
 const replacement=`${begin}\n${block.trim()}\n${end}`;
 const next=current.includes(begin)?current.replace(new RegExp(`${begin}[\\s\\S]*?${end}`),replacement):`${replacement}\n\n${current}`;
 write(p,next);
};
for(const slug of slugs){
 const talk=TALKS[slug];if(!talk)throw Error(`Unknown talk: ${slug}`);
 const file=join(root,'talks',slug,'outline-40min.md');protect(file);
 const raw=readFileSync(file,'utf8'), parsed=parseOutline(raw);
 const blocks=raw.split(/^## \d+\. /m).slice(1);
 const slides=parsed.slides.map((s,i)=>({...s,raw:blocks[i]}));
 buildTalk(slug);
 const media:Record<string,any>={};
 for(const slide of slides){if(!slide.image)continue;
  const image=resolve(dirname(file),slide.image.src);protect(image);
  const svg=readFileSync(image);const info=await sharp(svg).metadata();
  const key=hash(image);const svgFile=join(build,key+'.svg'),pngFile=join(build,key+'.png');
  writeFileSync(svgFile,svg);
  await sharp(svg).resize({width:2560}).png().toFile(pngFile);
  media[slide.image.src]={svg:svgFile,png:pngFile,width:info.width,height:info.height,source:image};
 }
 const variants=[];
 for(const minutes of [15,30,40]){
  const route=minutes===40?{keep:slides.map(s=>s.n),times:slides.map(s=>(toSec(s.end)-toSec(s.start))/60),bridges:{},trim:undefined,note:''}:talk.routes[minutes as 15|30];
  let elapsed=0;
  const chosen=route.keep.map((n,i)=>{
   const s=slides.find(s=>s.n===n)!;
   const result={...s,spoken:route.trim?.[n]?route.trim[n].map(k=>s.spoken[k]):s.spoken,start:fmt(elapsed),end:fmt(elapsed+route.times[i]),bridge:route.bridges[n]||''};
   if(result.spoken.some(p=>p===undefined))throw Error(`${slug}: invalid paragraph selection in ${minutes}min slide ${n}`);
   elapsed+=route.times[i];return result;
  });
  if(Math.abs(elapsed-minutes)>.001)throw Error(`${slug} route totals ${elapsed}`);
  write(join(repo,'public/talks',`${slug}-${minutes}min.html`),deckFor({...talk,description:talk.description+` (${minutes}-minute route)`},chosen));
  variants.push({minutes,slides:chosen,route});
 }
 const appendices=[];
 if(slug==='adaptive-systems'){
  const p=join(root,'talks',slug,'memory-pattern.md');protect(p);appendices.push({path:p,text:readFileSync(p,'utf8')});
 }
 records.push({slug,title:parsed.title,description:talk.description,source:file,sourceHash:hash(file),front:parsed.front,slides,variants,media,appendices});
}
writeFileSync(join(build,'talks.json'),JSON.stringify(records,null,2));
const priorExports=existsSync(join(root,'talks','exports.json'))?JSON.parse(readFileSync(join(root,'talks','exports.json'),'utf8')):[];
const result=Bun.spawnSync(['python3',join(root,'tools/export_pptx.py'),join(build,'talks.json'),join(root,'talks')],{stdout:'inherit',stderr:'inherit'});
if(result.exitCode)throw Error('PowerPoint export failed');
for(const [p,digest] of Object.entries(protectedInputs))if(hash(p)!==digest)throw Error(`Reference changed during export: ${p}; rerun this talk.`);
writeFileSync(join(build,'protected-inputs.json'),JSON.stringify(protectedInputs,null,2));
/** Partial runs must not drop the other talks from the shared indexes; merge on slug. */
const mergeBySlug=<T extends {slug:string}>(prior:T[],fresh:T[],key:(t:T)=>string)=>{
 const byKey=new Map(prior.map(t=>[key(t),t]));
 for(const t of fresh)byKey.set(key(t),t);
 const order=Object.keys(TALKS);
 return [...byKey.values()].sort((a,b)=>order.indexOf(a.slug)-order.indexOf(b.slug)||key(a).localeCompare(key(b)));
};
const readJson=(p:string,fallback:any)=>existsSync(p)?JSON.parse(readFileSync(p,'utf8')):fallback;
const priorInputs=readJson(join(root,'talks','sync-inputs.json'),{talks:[],inputs:{}});
const syncInputs={
 talks:mergeBySlug(priorInputs.talks||[],records.map(r=>({slug:r.slug,source:r.source.replace(repo+'/',''),sha256:r.sourceHash})),t=>t.slug),
 inputs:{...(priorInputs.inputs||{}),...Object.fromEntries(Object.entries(protectedInputs).map(([p,h])=>[p.replace(repo+'/',''),h]))},
};
writeFileSync(join(root,'talks','sync-inputs.json'),JSON.stringify(syncInputs,null,2)+'\n');
const editions=(slug:string)=>`| Length | Browser | Screen PPTX | Handout PPTX | Presenter script |\n| ---: | --- | --- | --- | --- |\n${[15,30,40].map(m=>`| ${m} min | [Open](../../../../public/talks/${slug}-${m}min.html) | [Download](${slug}-${m}min-screen.pptx) | [Download](${slug}-${m}min-handout.pptx) | [Script](script-${m}min.md) |`).join('\n')}`;
for(const talk of records){
 const dir=join(root,'talks',talk.slug);
 syncBlock(join(dir,'formats.md'),`# Synchronized editions\n\nGenerated from [the current 40-minute outline](outline-40min.md).\n\n${editions(talk.slug)}`);
 if(!existsSync(join(dir,'packet.md')))
  write(join(dir,'packet.md'),`# ${talk.title}\n\nThis packet indexes the current source-preserving editions. The canonical wording, notes, citations, and slide structure live in [the 40-minute outline](outline-40min.md).\n\n${editions(talk.slug)}\n`);
}
const manifest=mergeBySlug(priorExports,JSON.parse(readFileSync(join(root,'talks','exports.json'),'utf8')),(e:any)=>e.file);
writeFileSync(join(root,'talks','exports.json'),JSON.stringify(manifest,null,2)+'\n');
const rowFor=(slug:string,title:string,slides:number)=>`| ${title} | ${slides} | ${[15,30,40].map(m=>`[${m} screen](${slug}/${slug}-${m}min-screen.pptx) · [${m} handout](${slug}/${slug}-${m}min-handout.pptx)`).join('<br>')} | [Outline](${slug}/outline-40min.md) |`;
/** Source slides, not exported PPTX slides: count the outline's `## N.` headings for talks not in this run. */
const slideCount=(slug:string)=>{
 const fresh=records.find(r=>r.slug===slug); if(fresh)return fresh.slides.length;
 const outline=join(root,'talks',slug,'outline-40min.md');
 return existsSync(outline)?(readFileSync(outline,'utf8').match(/^## \d+\. /gm)||[]).length:0;
};
const deckRows=Object.keys(TALKS).filter(slug=>manifest.some((e:any)=>e.slug===slug))
 .map(slug=>rowFor(slug,TALKS[slug].title,slideCount(slug))).join('\n');
write(join(root,'talks','README.md'),`# Talks\n\nOne directory per talk. Each holds its canonical \`outline-40min.md\`, the generated \`adaptation-{15,30}min.md\` and \`script-{15,30,40}min.md\`, its \`bullets.md\`, \`packet.md\`, \`formats.md\`, \`CFP.md\`, hand-written evidence and fixtures, and its six PowerPoint editions (${manifest.length} across the portfolio). Edit the outline; everything else is regenerated.\n\nScreen editions contain succinct projected slides with full source notes. Handout editions retain the source wording in a reading layout.\n\n| Talk | Source slides | Downloads | Canonical source |\n| --- | ---: | --- | --- |\n${deckRows}\n\nRegenerate all sibling formats with \`bun artifacts/speaking-portfolio-expanded/sync-talks.ts\`. Bullet sheets come from \`bullets.ts\`; see [bullets-index.md](bullets-index.md). The source hashes used for the last export are recorded in [sync-inputs.json](sync-inputs.json). Retired talks live in [../retired/](../retired/).\n`);
console.log(`Export data and review files: ${build}`);
