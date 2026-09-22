import { expect, test } from 'bun:test';
import { lowestLatestScores, type ScoreRecord } from './judge-benchmark-fixtures.ts';
const row = (slug:string,locale:string,score:number,at:string):ScoreRecord => ({event:'translation_scored',slug,locale,overallScore:score,at,sourcePath:'source',targetPath:'target'});
test('ranks latest record per translation, not historical worst', () => {
  const rows=[row('a','es',10,'2026-09-01'),row('b','ja',50,'2026-09-02'),row('a','es',90,'2026-09-03'),row('a','ja',40,'2026-09-02')];
  expect(lowestLatestScores(rows,2).map(r=>`${r.slug}/${r.locale}`)).toEqual(['a/ja','b/ja']);
  expect(lowestLatestScores([...rows].reverse(),2).map(r=>`${r.slug}/${r.locale}`)).toEqual(['a/ja','b/ja']);
});
test('excludes existing corpus and breaks ties by slug then locale', () => {
  const rows=[row('b','es',30,'2026-09-01'),row('a','ja',30,'2026-09-01'),row('a','es',30,'2026-09-01')];
  expect(lowestLatestScores(rows,2,new Set(['a/es'])).map(r=>`${r.slug}/${r.locale}`)).toEqual(['a/ja','b/es']);
});
test('does not fall back to an old score when latest record has no finite score', () => {
  expect(lowestLatestScores([row('a','es',10,'2026-09-01'),row('a','es',NaN,'2026-09-02')],10)).toEqual([]);
});
test('rejects invalid score timestamps instead of silently misranking', () => {
  expect(()=>lowestLatestScores([row('a','es',10,'invalid')],10)).toThrow('Invalid score timestamp');
});
