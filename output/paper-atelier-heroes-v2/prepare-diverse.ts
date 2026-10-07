import sharp from "sharp";
import { copyFile, mkdir, readFile } from "node:fs/promises";
const records=JSON.parse(await readFile(new URL("./diverse-heroes.json",import.meta.url),"utf8"));
for(const r of records){await copyFile(r.sourceGeneration,r.postDirectory+"/"+r.source);await sharp(r.postDirectory+"/"+r.source).resize(1600,900,{fit:"cover"}).webp({quality:90}).toFile(r.postDirectory+"/"+r.candidate);}

