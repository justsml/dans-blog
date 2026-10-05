import sharp from "sharp";
import { copyFile, readFile } from "node:fs/promises";
const rows=JSON.parse(await readFile(new URL("./data-systems.json",import.meta.url),"utf8"));
for(const r of rows){await copyFile(r.sourceGeneration,r.sourcePath);await sharp(r.sourcePath).resize(1600,900,{fit:"cover"}).webp({quality:90}).toFile(r.widePath);}

