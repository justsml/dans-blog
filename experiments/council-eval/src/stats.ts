// Small, dependency-free statistics for paired comparisons over cases.

/** Mulberry32: seeded PRNG so bootstrap CIs are reproducible. */
export function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const mean = (xs: number[]) => (xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : NaN);
export const sd = (xs: number[]) => {
  const m = mean(xs);
  return Math.sqrt(xs.reduce((a, x) => a + (x - m) ** 2, 0) / Math.max(1, xs.length - 1));
};

function quantile(sorted: number[], q: number) {
  const i = (sorted.length - 1) * q;
  const lo = Math.floor(i);
  const hi = Math.ceil(i);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (i - lo);
}

/** Case-level bootstrap of the mean paired difference. */
export function bootstrapCI(diffs: number[], iters = 10_000, alpha = 0.05, seed = 1) {
  const r = rng(seed);
  const n = diffs.length;
  const stats: number[] = [];
  for (let b = 0; b < iters; b++) {
    let s = 0;
    for (let i = 0; i < n; i++) s += diffs[Math.floor(r() * n)];
    stats.push(s / n);
  }
  stats.sort((a, b) => a - b);
  // Two-sided bootstrap p-value: how often the resampled mean lands on the other side of 0.
  const below = stats.filter((x) => x <= 0).length / iters;
  const above = stats.filter((x) => x >= 0).length / iters;
  return { lo: quantile(stats, alpha / 2), hi: quantile(stats, 1 - alpha / 2), p: Math.min(1, 2 * Math.min(below, above)) };
}

/** Wilcoxon signed-rank, normal approximation with tie correction. Zero diffs dropped. */
export function wilcoxon(diffs: number[]) {
  const d = diffs.filter((x) => x !== 0).map((x) => ({ x, a: Math.abs(x) }));
  const n = d.length;
  if (n < 5) return { n, p: NaN };
  d.sort((a, b) => a.a - b.a);
  const ranks = new Array(n);
  let tie = 0;
  for (let i = 0; i < n; ) {
    let j = i;
    while (j + 1 < n && d[j + 1].a === d[i].a) j++;
    const r = (i + j + 2) / 2;
    for (let k = i; k <= j; k++) ranks[k] = r;
    const t = j - i + 1;
    tie += t ** 3 - t;
    i = j + 1;
  }
  const wPlus = d.reduce((acc, v, i) => acc + (v.x > 0 ? ranks[i] : 0), 0);
  const mu = (n * (n + 1)) / 4;
  const sigma = Math.sqrt((n * (n + 1) * (2 * n + 1)) / 24 - tie / 48);
  const z = (wPlus - mu) / sigma;
  return { n, z, p: 2 * (1 - normCdf(Math.abs(z))) };
}

function normCdf(z: number) {
  // Abramowitz & Stegun 26.2.17
  const t = 1 / (1 + 0.2316419 * z);
  const p = 0.3989423 * Math.exp((-z * z) / 2) * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return 1 - p;
}

/** Holm step-down adjustment. Returns adjusted p-values in input order. */
export function holm(ps: number[]) {
  const order = ps.map((p, i) => ({ p, i })).sort((a, b) => a.p - b.p);
  const adj = new Array(ps.length);
  let running = 0;
  order.forEach(({ p, i }, k) => {
    running = Math.max(running, Math.min(1, (ps.length - k) * p));
    adj[i] = running;
  });
  return adj as number[];
}
