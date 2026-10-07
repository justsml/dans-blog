import fs from 'node:fs/promises';
import sharp from 'sharp';
const root = new URL('../../', import.meta.url);
const dirs = JSON.parse(await fs.readFile(new URL('manifest.json',import.meta.url),'utf8'));
const old = ['square.webp','square.webp','square.webp','square.webp','square.webp','square-200.webp','dancing-postgres-elephant-square-200.webp','elephant-synthwave-gym-square-200.webp'];
const cells = [];
for(let i=0;i<dirs.length;i++) {
  const p=new URL(dirs[i].postDirectory+'/'+old[i],root);
  cells.push({input:await sharp(p.pathname).resize(300,300).png().toBuffer(),left:(i%4)*300,top:Math.floor(i/4)*300});
}
await sharp({create:{width:1200,height:600,channels:3,background:'#faf7f1'}}).composite(cells).png().toFile(new URL('existing-contact.png',import.meta.url).pathname);
