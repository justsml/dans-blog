import fs from 'node:fs/promises';
import sharp from 'sharp';
const root = new URL('../../', import.meta.url);
const entries = JSON.parse(await fs.readFile(new URL('manifest.json', import.meta.url),'utf8'));
for (const entry of entries) {
  const dir = new URL(entry.postDirectory+'/',root);
  await fs.copyFile(entry.sourceGeneration,new URL(entry.source,dir));
  await sharp(entry.sourceGeneration).resize(1600,900,{fit:'cover'}).webp({quality:88}).toFile(new URL(entry.candidate,dir).pathname);
  await sharp(entry.sourceGeneration).resize(800,800,{fit:'cover',position:'centre'}).webp({quality:86}).toFile(new URL('paper-atelier-square-preview-v1.webp',dir).pathname);
  await sharp(entry.sourceGeneration).resize(900,400,{fit:'cover',position:'centre'}).webp({quality:86}).toFile(new URL('feature-'+entry.rank+'.webp',import.meta.url).pathname);
}
