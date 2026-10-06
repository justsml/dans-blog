import sharp from "sharp";
import {copyFile,readFile,writeFile} from "node:fs/promises";
const path=new URL("./data-squares.json",import.meta.url);
const rows=JSON.parse(await readFile(path,"utf8"));
for(const r of rows){await copyFile(r.sourceGeneration,r.sourcePath);const m=await sharp(r.sourcePath).metadata();r.nativeDimensions={width:m.width,height:m.height};const size=Math.min(1600,m.width,m.height);await sharp(r.sourcePath).resize(size,size,{fit:"cover",withoutEnlargement:true}).webp({quality:90}).toFile(r.squarePath);r.outputDimensions={width:size,height:size};if(size<1600)r.cropNotes+=" Built-in output is below1600 pixels; saved native size without upscaling.";}
await writeFile(path,JSON.stringify(rows,null,2)+"\n");
console.log(rows.map(r=>({slug:r.slug,native:r.nativeDimensions,output:r.outputDimensions})));

