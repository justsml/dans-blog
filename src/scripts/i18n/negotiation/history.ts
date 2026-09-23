import {execFileSync} from 'node:child_process';
import {readFileSync,realpathSync} from 'node:fs';
import {resolve,relative,sep} from 'node:path';
import {hash} from './protocol.ts';
export type Revision={id:string;path:string;sourcePath:string;sourceHash:string;translationHash:string;matchesCurrentSource:boolean;declaredSourceHash:string|null;contents:string};
export function assertArticlePath(root:string,path:string) {
  if(path.includes('\0')||!path.startsWith('src/content/posts/')||!path.endsWith('/index.mdx'))throw Error('Only article index.mdx paths allowed');
  const full=realpathSync(resolve(root,path)),base=realpathSync(resolve(root,'src/content/posts'));
  if(!full.startsWith(base+sep))throw Error('Article path escapes content root');
  return relative(root,full);
}
export function snapshotHistory(root:string,sourcePath:string,targetPath:string,limit=6):Revision[] {
  sourcePath=assertArticlePath(root,sourcePath);targetPath=assertArticlePath(root,targetPath);
  const currentHash=hash(readFileSync(resolve(root,sourcePath),'utf8'));
  const commits=execFileSync('git',['log','-'+limit,'--format=%H','--',targetPath],{cwd:root,encoding:'utf8'}).trim().split('\n').filter(Boolean);
  const rows:Revision[]=[];
  for(const id of commits){
    if(!/^[a-f0-9]{40}$/.test(id))throw Error('Invalid revision');
    const contents=execFileSync('git',['show',id+':'+targetPath],{cwd:root,encoding:'utf8',maxBuffer:2_000_000});
    const source=execFileSync('git',['show',id+':'+sourcePath],{cwd:root,encoding:'utf8',maxBuffer:2_000_000});
    rows.push({id,path:targetPath,sourcePath,sourceHash:hash(source),translationHash:hash(contents),matchesCurrentSource:hash(source)===currentHash,declaredSourceHash:contents.match(/^sourceHash:\s*["']?([a-f0-9]+)/m)?.[1]??null,contents});
  }
  return rows;
}
export function readRevision(revisions:Revision[],id:string,sourceHash:string) {
  const item=revisions.find(r=>r.id===id);
  if(!item||item.sourceHash!==sourceHash)throw Error('Revision/source hash mismatch');
  if(hash(item.contents)!==item.translationHash)throw Error('Corrupt history artifact');
  return item;
}
