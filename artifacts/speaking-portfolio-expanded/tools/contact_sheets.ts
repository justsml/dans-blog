#!/usr/bin/env bun
import { readdirSync, mkdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import sharp from 'sharp';

const source=process.argv[2], destination=process.argv[3];
mkdirSync(destination,{recursive:true});
for(const deck of readdirSync(source).sort()){
 const dir=join(source,deck);
 let files:string[];
 try{files=readdirSync(dir).filter(name=>name.endsWith('.pptx.png')).sort()}catch{continue}
 const width=280,height=210,cols=4;
 const layers=[];
 for(let index=0;index<files.length;index++)layers.push({
  input:await sharp(join(dir,files[index])).resize(width,height,{fit:'contain',background:'#777'}).png().toBuffer(),
  left:(index%cols)*width,top:Math.floor(index/cols)*height,
 });
 const rows=Math.ceil(files.length/cols);
 await sharp({create:{width:cols*width,height:rows*height,channels:3,background:'#777'}}).composite(layers).png().toFile(join(destination,`${basename(deck)}.png`));
}
