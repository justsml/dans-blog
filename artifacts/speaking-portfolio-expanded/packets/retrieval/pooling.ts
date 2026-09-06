// Synthetic topical-relevance fixture; no model, network, or customer data.
const oldRun = ['B', 'A'];
const newRun = ['B', 'F'];
const initialRelevant = new Set(['A', 'B']);
const expandedRelevant = new Set(['A', 'B', 'F']);
const p2 = (run: string[], relevant: Set<string>) => run.slice(0,2).filter(d => relevant.has(d)).length/2;
console.table([
  { judgments: 'old pool', old: p2(oldRun,initialRelevant), new: p2(newRun,initialRelevant) },
  { judgments: 'F judged relevant', old: p2(oldRun,expandedRelevant), new: p2(newRun,expandedRelevant) },
]);
