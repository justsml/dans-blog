# Buy Me a Free Tier

Abstracts are 50 and 153 words by whitespace count, excluding labels. Revised 8 September 2026.

**Subtitle:** Eight words for the budget meeting

**Format:** 40 minutes; 15 slides. Economics, game theory, and architecture.

**Audience:** Staff engineers, architects, founders, CTOs, platform and engineering leaders. Familiarity with operating a software product helps; no economics background is assumed, and the talk defines every term it uses.

### 50-word abstract

Cheap inference rewards habits before anyone measures their value. This talk follows those incentives from a design review to an invoice, using MoviePass, economics and a synthetic workload. Learn to compute cost per accepted outcome, inventory expensive dependencies, and bring three prices to the next decision about what to build.

### 150-word abstract

In 2017 MoviePass offered one movie a day for $9.95 while the average ticket cost $8.97. Cheap access made another visit easy. In software, cheap inference can make another call, retry or unlimited promise easy. Don't fear training the model, worry how it's training you.

This talk treats that training as an incentive analogy and asks what the repeated decisions bought. Eight economic terms supply vocabulary without pretending that a vendor's price discloses its margins. The worked example is a synthetic workload: a lower acceptance rate can cost exactly as much as doubling inference prices, under a stated cost split. The arithmetic fits on one slide.

Then inventory the prompts, evals, fine-tunes and customer promises that make switching expensive. Price the work of keeping an alternative usable against the exposure. Leave with three prices for the next design review: today, without the offer, and the highest rate you can survive.

### Three audience outcomes

1. Name four explanations for a low price and observations that help distinguish them, instead of arguing about a vendor's margins.
2. Compute cost per accepted outcome, convert an acceptance rate into a multiplier on sticker price, and state the volume at which an optimization is worth funding.
3. Inventory relationship-specific assets and price reversibility as a real option against measured exposure.

### Notes for reviewers

The talk makes no claim about any named provider's margins, alleges no predatory pricing, and forecasts no price cliff. Every economic concept is cited to its primary source and used as a frame rather than a measurement; where the canonical example is contested, as with QWERTY and path dependence, the talk says so on stage. The counterargument, that prices are falling because the engineering is genuinely improving, appears in the first ten minutes rather than as a late concession, with Epoch AI's public data. The two-minute worked table is offline and synthetic, and the talk explicitly tells small-volume teams not to optimize.

## Portfolio fit

Buy Me a Free Tier owns cost per accepted outcome. Product Engineering owns coordination and human ownership. Judgment owns feature selection and release pacing. Do not book the three lengths of Product Engineering as independent talks.

## Submission integrity

Use the speaker’s real biography separately; none is invented here. Do not describe the demonstrations as live production results, statistically significant experiments, measured ROI, or a customer case study. Source and uncertainty details are in [evidence.md](evidence.md); exact stage sequences and fallback plans are in [demo.md](demo.md).
