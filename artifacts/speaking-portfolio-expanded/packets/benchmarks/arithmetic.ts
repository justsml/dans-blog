// Offline arithmetic, no model calls and no sampled production observations.
const scores = [78, 79, 81, 82, 80];
const verdicts = scores.map(s => s >= 80);
const passes = verdicts.filter(Boolean).length;
console.log({ scores, verdicts, majorityDisagreement: Math.min(passes, scores.length-passes)/scores.length });
console.log({ n: 20, zeroFailuresUpper95Exact: 1-Math.pow(0.05,1/20), ruleOfThree: 3/20 });
console.log({ alwaysPassJudgeAgreement: 0.9, kappa: (0.9-0.9)/(1-0.9) });
