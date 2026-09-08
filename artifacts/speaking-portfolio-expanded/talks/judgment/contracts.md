# Plan-space fixture

An illustrative count, not a measured traffic forecast or experimental design recommendation. Substitute a product's actual eligible population, assignment unit and constraints before using it.

## Candidate plans

Assume six distinct features, no precedence constraints, every feature launched exactly once, one of three cohorts assigned to each feature, and all assignments and orderings considered distinct. Then 6! × 3⁶ = 720 × 729 = 524,880 plans. Dependencies, equivalences and prior decisions can remove most of them. Dates and batching are not counted. This does not imply every plan must be tested independently or that models cannot generalize.

## Illustrative evidence budget

Assume 12,000 *new, distinct eligible users* in each of four weeks: 48,000 unique users total, one independent binary outcome each, random assignment, no spillovers, no missing outcomes. Ordinary WAU cannot be multiplied this way: the same users can return every week. Repeated measures, account-level randomization or overlapping cohorts need another variance calculation.

For a two-sided, two-arm comparison at approximately 80% power and α = 0.05, a local normal approximation gives n per arm ≈ 2 × (1.96 + 0.84)² × p(1−p) / δ². Rounding the constant 15.68 to 16 gives the talk's heuristic:

- p = 0.08; δ = 0.02 absolute (8% to 10%, not a 2% relative lift).
- 16 × 0.08 × 0.92 / 0.02² = 2,944, rounded to about 3,000 users per arm.
- floor(48,000 / 2,944) = 16 arms, including a control; these are not sixteen independent two-arm experiments.
- 524,880 / 16 = 32,805 candidate plans per arm slot in this illustrative allocation.

The alternative proportion has a different variance, so 2,944 is a rough sizing heuristic rather than an exact 8%-versus-10% power calculation. A real multi-arm design specifies comparisons, control allocation, multiplicity, attrition and stopping rules. Under the same power criterion, correcting many comparisons ordinarily demands more evidence; do not imply the naive sixteen-arm allocation is already powered. A useful primary implementation reference is [R stats power.prop.test](https://stat.ethz.ch/R-manual/R-devel/library/stats/html/power.prop.test.html), which computes power for a two-sample proportions test.

The ratio illustrates scarce direct evidence within a large unconstrained plan space. It is not a theorem that analytics cannot guide release planning or that reasoning tokens buy nothing. The product owner still decides which constraints and outcomes matter.

## Delivery

40/30 routes: 45 seconds of board work; prewrite the assumptions, calculate plan count, show the per-arm sizing, then divide. Use the room's alternative numbers only in Q&A so the booked timing remains meaningful. 15 route: calculate 6! × 3⁶ only; supply the arm result and assumptions verbally. No second derivation.
