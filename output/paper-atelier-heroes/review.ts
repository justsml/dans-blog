import fs from 'node:fs/promises';
import sharp from 'sharp';
const root=new URL('../../',import.meta.url);
const entries=JSON.parse(await fs.readFile(new URL('manifest.json',import.meta.url),'utf8'));
const cells=[];
for(let i=0;i<entries.length;i++) {
const img=new URL(entries[i].postDirectory+'/paper-atelier-square-preview-v'+(i===7?2:1)+'.webp',root).pathname;
for(let theme=0;theme<2;theme++) {
  const left=(i%4)*320,top=Math.floor(i/4)*540+theme*270;
  cells.push({input:await sharp({create:{width:320,height:270,channels:3,background:theme?'#211f1c':'#faf7f1'}}).png().toBuffer(),left,top});
  cells.push({input:await sharp(img).resize(200,200).png().toBuffer(),left:left+10,top:top+35});
  cells.push({input:await sharp(img).resize(96,96).png().toBuffer(),left:left+214,top:top+85});
}}
await sharp({create:{width:1280,height:1080,channels:3,background:'#faf7f1'}}).composite(cells).png().toFile(new URL('thumbnail-review.png',import.meta.url).pathname);
