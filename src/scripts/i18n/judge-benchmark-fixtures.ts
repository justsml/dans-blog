/** Freeze additional translations selected by latest recorded score per slug/locale. */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
export type ScoreRecord = { event: string; at: string; slug: string; locale: string; overallScore: number; sourcePath: string; targetPath: string; sourceHash?: string; translationHash?: string; judgeModel?: string };
export function lowestLatestScores(rows: ScoreRecord[], count: number, excluded = new Set<string>()) {
  const latest = new Map<string, ScoreRecord>();
  for (const row of rows) {
    if (row.event !== 'translation_scored') continue;
    if (!Number.isFinite(Date.parse(row.at))) throw new Error(`Invalid score timestamp: ${row.slug}/${row.locale}`);
    const key = `${row.slug}/${row.locale}`;
    const prior = latest.get(key);
    if (!prior || Date.parse(row.at) >= Date.parse(prior.at)) latest.set(key, row);
  }
  return [...latest.values()].filter(r => Number.isFinite(r.overallScore) && !excluded.has(`${r.slug}/${r.locale}`))
    .sort((a,b) => a.overallScore-b.overallScore || a.slug.localeCompare(b.slug) || a.locale.localeCompare(b.locale)).slice(0,count);
}
const hash = (text:string) => createHash('sha256').update(text).digest('hex');
function main() {
  const dir = process.argv[2];
  if (!dir) throw new Error('Provide the existing benchmark directory');
  const output = join(dir,'fixtures-lowest10.json');
  if (existsSync(output)) throw new Error('Frozen lowest10 fixtures already exist');
  const logPath = 'reports/translations-log.jsonl';
  const log = readFileSync(logPath,'utf8');
  const priorFixtures = JSON.parse(readFileSync(join(dir,'fixtures.json'),'utf8'));
  const excluded = new Set<string>(priorFixtures.filter((f:any)=>f.split==='corpus').map((f:any)=>`${f.id.slice(f.locale.length+1).replace(/^\d{4}-\d{2}-\d{2}--/,'')}/${f.locale}`));
  const selected = lowestLatestScores(log.trim().split('\n').map(line=>JSON.parse(line)),10,excluded);
  if(selected.length!==10) throw new Error('Need ten scored translations');
  const fixtures = selected.map((r, index) => {
    const source=readFileSync(r.sourcePath,'utf8');const target=readFileSync(r.targetPath,'utf8');
    return {id:`${r.locale}-${r.slug}`,slug:r.slug,locale:r.locale,source,target,sourcePath:r.sourcePath,targetPath:r.targetPath,split:'lowest-scoring',selectionRank:index+1,selectionScore:r.overallScore,scoreAt:r.at,scoreJudge:r.judgeModel,sourceHash:hash(source),targetHash:hash(target),sourceMatchesScoredHash:hash(source)===r.sourceHash,targetMatchesScoredHash:hash(target)===r.translationHash,contentKind:source.includes('<Challenge')?'quiz':'article'};
  });
  writeFileSync(output,JSON.stringify(fixtures,null,2)+'\n');
  writeFileSync(join(dir,'lowest10-selection.json'),JSON.stringify({selectedAt:new Date().toISOString(),selection:'Latest translation_scored record per slug/locale, ascending overallScore, ties slug then locale; excludes existing corpus cases. Current files frozen without truncation; prior scores are selection metadata, not gold labels.',logPath,logHash:hash(log),fixturesPath:output,fixturesHash:hash(readFileSync(output,'utf8')),selectedRecords:selected},null,2)+'\n');
  console.log(fixtures.map(({source,target,...metadata})=>({...metadata,sourceChars:source.length,targetChars:target.length})));
}
if(import.meta.main)main();
