// Deterministic release-plan arithmetic. No model calls, no network, no user data.
// Default run prints the size of the plan space. --evidence prints how many arms
// the traffic in the window can actually pay for, and the ratio between them.
const FEATURES = 6;
const COHORTS = 3;
const WEEKLY_ACTIVE = 12_000;
const WEEKS = 4;
const BASELINE = 0.08; // conversion on the metric the release is judged by
const LIFT = 0.02; // smallest lift worth detecting

const factorial = (n: number): number => (n <= 1 ? 1 : n * factorial(n - 1));
const n = (x: number) => x.toLocaleString('en-US');

const orderings = factorial(FEATURES);
const assignments = COHORTS ** FEATURES;
const plans = orderings * assignments;

console.log(`${FEATURES} features, ordered:            ${n(orderings)} sequences`);
console.log(`each assigned to ${COHORTS} cohorts:        ${n(assignments)} assignments`);
console.log(`distinct release plans:            ${n(plans)}`);

if (process.argv.includes('--evidence')) {
  // Standard two-proportion rule of thumb: n per arm ~ 16 * p(1-p) / delta^2,
  // approximately 80% power at alpha = 0.05. Benchmarks owns the derivation.
  const perArm = Math.round((16 * BASELINE * (1 - BASELINE)) / LIFT ** 2);
  const exposures = WEEKLY_ACTIVE * WEEKS;
  const arms = Math.floor(exposures / perArm);
  console.log('');
  console.log(`exposures in a ${WEEKS}-week window:      ${n(exposures)}`);
  console.log(`needed per arm at ${BASELINE * 100}% + ${LIFT * 100}pt:  ${n(perArm)}`);
  console.log(`arms you can afford:               ${n(arms)}`);
  console.log(`plans per arm of evidence:         ${n(Math.round(plans / arms))}`);
}
