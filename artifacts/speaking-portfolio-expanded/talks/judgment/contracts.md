# Plan-space fixture

The demo is arithmetic on the board, not a simulation. The constants are six features, three cohorts, 12,000 weekly actives over four weeks, an 8% baseline and a 2-point lift; swap in the room's numbers if it supplies better ones.

The plan count:

- 6! = 720 orderings
- 3⁶ = 729 cohort assignments
- 720 × 729 = 524,880 distinct plans, before batching and before dates

The arm count:

- 12,000 × 4 = 48,000 exposures in the window
- 16 × 0.08 × 0.92 ÷ 0.02² = 2,944 per arm
- ⌊48,000 ÷ 2,944⌋ = 16 arms
- 524,880 ÷ 16 = 32,805 plans per arm of evidence

The per-arm figure uses the standard two-proportion rule of thumb, n ≈ 16·p(1−p)/δ², which approximates 80% power at α = 0.05. It is a sizing heuristic, not a derivation; Benchmarks owns instrument validation and small-sample inference, and this talk does not re-teach either.

Nothing here measures a real team, a real product, or a real release. The numbers establish one thing: the plan space is enormous relative to the evidence any single window can buy, so most of the decision is made without data.
