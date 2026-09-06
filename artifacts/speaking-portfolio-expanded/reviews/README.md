# Critical reviews, September 6 2026

Independent reviews of the six talks that had not been through the rewrite. Each was reviewed against the same standard: the rewritten [Cry Me a Free Tier](../outlines/free-tier-40min.md), which fixed its scope disclaimer at one, named its story slots, imported vocabulary from a real discipline with primary sources, and carried a memorable checkable number.

Each review contains a verdict, a roast citing slide numbers and quoting the text, a missing-discipline section with primary sources, a proposed slide-by-slide arc whose minutes sum, one highest-value change, and a list of claims to verify or soften.

Nothing in the talks was edited. These are proposals.

| Talk | Verdict | The one thing |
| --- | --- | --- |
| [Automating Improvement From Failure](failure-improvement-review.md) | Wins a slot, not yet the recorded flagship | Name what monitoring a usually-correct system does to the reviewer (Bainbridge) |
| [A Skeptic's Guide to Surviving AI in Education](skeptic-education-review.md) | Reserve, not accept. Retirement under consideration; see the [transplant plan](skeptic-education-retirement-plan.md) | Perform skepticism on stage instead of describing it; open on the two-sigma correction |
| [The Future of Product Engineering](product-engineering-review.md) | Wins product-leadership, loses competitive engineering | Make the Coase inversion the spine; move the demo ahead of the guards |
| [Code Is Cheap. Judgment Is Expensive.](judgment-review.md) | Correct and therefore uncontestable | Put Kingman's curve in the first ten minutes and derive the rest from it |
| [Stop Looking at My Benchmarks](benchmarks-review.md) | Weaker than Dan's own posts on the subject | Validate the instrument; an eval suite is a measuring instrument nobody validates |
| [From RAGs to Retrievals](retrieval-review.md) | Premise is dead; a better talk is inside it | Stop translating, start citing the discipline being re-derived |

## What every review found

**Empty story slots.** Every talk except Improvement From Failure has unfilled `Story:` slots, and several decks print the apology on screen. The two rewritten talks that landed hardest (Outsmart, Free Tier) did so on first-hand material.

**No memorable number.** Not one of the six has a figure an attendee repeats in the hallway. Four reviews found a good one already adjacent to the material: reviewer utilization at 95% is a 19× wait, twenty passing cases are consistent with a one-in-seven failure rate, six subordinates is 222 relationships, and the two-sigma claim was measured near 0.76.

**Disclaimer bloat.** Judgment carries eleven self-retractions across eighteen slides; Benchmarks nine. Free-tier's fix is one line: state the scope once, then argue.

**The peak is not a peak.** Four of six have a demo or exercise that replays material the room already heard, with the answer visible in the fixture.

**Collisions with the rewritten talks.** Judgment slide 12 duplicates Dynamic Scaling slides 12 and 13. Benchmarks slide 13 duplicates Free Tier slide 10. The Skeptic's Guide shares six load-bearing beats with Outsmart, including an identical worksheet at the same slide number and minute.

**Bainbridge (1983), "Ironies of Automation."** Three independent reviews reached for the same paper without coordination. Every talk in this portfolio puts a human at a guard post and none asks what standing that post does to the human.

## Tooling gaps the reviews surfaced

Product Engineering and the three flagship talks are not registered in [`build-talk.ts`](../build-talk.ts), so their short routes are hand-maintained rather than derived. Measured drift is already present in Product Engineering: the demo runs 5:00, 5:00, 3:30 and 4:00 depending on which file you read.

## Implementation status, 6 September 2026

The verdicts above describe the reviewed versions and remain as the historical spec. Five rewrites are now implemented and registered in `build-talk.ts`:

| Review | Current source | Remaining delivery evidence |
| --- | --- | --- |
| Failure Improvement | [15-slide outline](../outlines/failure-improvement-40min.md) | Personal stories and live integration for recording |
| Product Engineering | [Canonical outline](../outlines/product-engineering-40min.md) | Personal stories and reconfirmed estimation observation |
| Judgment | [Queueing arc](../outlines/judgment-40min.md) | Personal review-delay story |
| Benchmarks | [Instrument-validation arc](../outlines/benchmarks-40min.md) | Personal green-eval failure story |
| Retrieval | [Your Eval Suite Has a Grandfather](../outlines/retrieval-40min.md) | Personal missing-judgment story |

Skeptic’s editorial rewrite remains pending an explicit retirement/procurement choice. The new evidence banks record corrections to the review’s proposed statistics and history, including mirroring-study denominators, threshold-flip arithmetic, incomplete-pool limits, and the R1 publication year. No anecdote or production measurement was invented to fill a slot.
