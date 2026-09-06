# Conference submission package

Prepared 2026-09-04. Abstracts are exact 50- and 150-word versions by whitespace count; titles and labels are excluded. Submit one Product Engineering variant per event unless the organizer explicitly requests a series.

## Cry Me a Free Tier

**Subtitle:** Eight words for the budget meeting

**Format:** 40 minutes; 15 slides. Economics, game theory, and architecture.

**Audience:** Staff engineers, architects, founders, CTOs, platform and engineering leaders. Familiarity with operating a software product helps; no economics background is assumed, and the talk defines every term it uses.

### 50-word abstract

Your token price fell and your bill went up. That is not a contradiction, it is the Jevons paradox, and economists have been describing your situation since 1865. This talk hands engineers eight words from economics and game theory that turn "it feels wasteful" into an argument finance cannot wave off.

### 150-word abstract

A startup gets free electricity for a year. What does it build, and what survives when the offer ends? Swap electricity for inference and that is the question.

Engineers lose this argument in budget meetings because the strongest thing we can say is "it feels wasteful." Economics has precise names for it, and this talk supplies eight: externality, induced demand, Jevons paradox, path dependence, moral hazard, credible commitment, asset specificity, and real option.

Along the way it separates four legitimate reasons a price can sit below cost and names the observation at renewal that distinguishes them, reframes the industry's enormous compute commitments as Schelling commitments rather than cost disclosures, and uses Shoup's parking argument for the mechanism. The turn is Williamson: your prompts, evals, fine-tunes and unlimited-usage clauses are relationship-specific assets, which makes this a contracting problem rather than a shopping problem. A synthetic price sweep closes it, with the volume caveat attached.

### Three audience outcomes

1. Name the four explanations for a below-cost price and the observation that distinguishes them, instead of arguing about a vendor's margins.
2. Compute cost per accepted outcome, convert an acceptance rate into a multiplier on sticker price, and state the volume at which an optimization is worth funding.
3. Inventory relationship-specific assets and price reversibility as a real option against measured exposure.

### Notes for reviewers

The talk makes no claim about any named provider's margins, alleges no predatory pricing, and forecasts no price cliff. Every economic concept is cited to its primary source and used as a frame rather than a measurement; where the canonical example is contested, as with QWERTY and path dependence, the talk says so on stage. The counterargument, that prices are falling because the engineering is genuinely improving, appears in the first ten minutes rather than as a late concession, with Epoch AI's public data. The four-minute demo is offline and synthetic, and the talk explicitly tells small-volume teams not to optimize.

## The Future of Product Engineering

**Subtitle:** Break the Mirror on Purpose

**Formats:** One canonical 40-minute, 15-slide outline. Generated 30- and 15-minute routes use the same deck and retain the demo-before-guards order. The demo gets 5:00 in the 40/30 and 3:30 in the 15.

**Audience:** Product engineers and the leaders responsible for product handoffs and review capacity. Familiarity with feature flags is useful.

### Abstract

Your org chart records what coordination used to cost. Copying every function onto an agent may preserve exactly the handoffs you could now remove. This talk uses Coase and Conway to redesign the wires: sourced research, traceable feedback clusters, a product review that resolves disagreement, and a durable hypothesis passed to build and experiment work. A synthetic onboarding demo asks the room to choose from activation alone, then reveals why the apparent winner fails the product’s policy. The back half budgets the human ownership the roster creates, including review time and recovery practice. Approval sits before broader rollout, expensive runs, infrastructure changes, customer messaging, and data deletion. Attendees leave with one handoff they can reprice and one artifact contract they can inspect. Automate the right things. Keep the taste.

### Audience outcomes

1. Identify a handoff whose original coordination cost has changed and specify the replacement interface.
2. Give each automated responsibility an owner with review capacity and recovery practice.
3. Distinguish a metric win from a permitted experiment, including customer messaging and deletion boundaries.

### Notes for reviewers

The operating model is proposed. The fixed demo executes policy; it is not a measured customer experiment. The room sees neutral A/B/C labels before the support and urgency reveal. The three lengths are derived routes, not separate talks. [Current packet](../packets/product-engineering/packet.md) and [formats](../packets/product-engineering/formats.md) contain submission copy and rehearsal links.

## Portfolio fit

Free Tier owns cost per accepted outcome. Product Engineering owns coordination and human ownership. Judgment owns review queues. Do not book the three lengths of Product Engineering as independent talks.

## Submission integrity

Use the speaker’s real biography separately; none is invented here. Do not describe the demonstrations as live production results, statistically significant experiments, measured ROI, or a customer case study. Source and uncertainty details are in [evidence.md](./evidence.md); exact stage sequences and fallback plans are in [demo.md](./demo.md).
