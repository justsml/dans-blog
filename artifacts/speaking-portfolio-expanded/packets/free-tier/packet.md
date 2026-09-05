# Talk packet: Cry Me a Free Tier

Outline: [40 min](../../outlines/free-tier-40min.md) · Formats: [formats.md](formats.md) · Evidence: [evidence-bank.md](evidence-bank.md)

## Titles

- **Primary:** Cry Me a Free Tier
- What Did the Cheap Input Teach Your Architecture to Expect?
- Free Inference Is Free Parking
- Three Prices Every Design Review Needs

## Abstracts

### 50 words

Free parking was never free; the cost moved into rents, land use, and the businesses that never opened. Free and subsidized inference is doing the same to software. This talk maps the second- and third-order effects onto architecture and gives you three prices to bring to your next design review.

### 100 words

LLM and cloud providers are reported to be pricing for growth, funded by capital that expects a return. Nobody outside knows the margins, and this talk does not guess. Instead it borrows Donald Shoup's argument about free parking: a hidden price makes one input look free, the environment reorganizes around it, and the reorganization is expensive to reverse. We walk the parking chain, from minimum requirements to retail density, business mix, and rents, then map each step onto AI architecture. A synthetic workload under 1× to 10× inference prices shows which assumptions matter. You leave with three prices and four actions.

### 250 words

A startup gets free electricity for a year. What does it build? What survives when the offer ends? Swap electricity for inference and you have the question this talk is about.

Reported losses at frontier labs, multi-year compute commitments, and credit programs measured in billions suggest prices set for growth rather than cost recovery. Nobody outside a provider knows its margins, so the talk never estimates one. It argues something narrower: cheap inputs shape what gets built, and the shaping can be measured.

The argument runs through Donald Shoup's work on free parking. Cities required developers to build minimum parking; the cost went into rents and prices, the land went to asphalt, and because drivers saw no meter, demand looked infinite. Second-order effects followed: retail density fell, business mix shifted to car-dependent formats, every apartment carried a bundled space, and small storefronts lost. Third order: once the environment was car-shaped, repealing the rule did not undo it.

Each step maps onto software. Density: a frontier call where a lookup would do. Business mix: products viable only at promotional rates. Rent: unlimited-usage promises baked into contracts. The small format: deterministic code losing the design review to "just ask the model."

A live sweep runs a synthetic workload at 1× to 10× inference prices and shows cost per accepted outcome. The counterargument gets its own slide, with Epoch AI's price-decline data. The close is three prices: what you pay today, what you pay without the offer, and what you can survive paying.

## Learning outcomes

Attendees will be able to:

1. Distinguish price paid, resources consumed, cost allocated, and value delivered, and identify which of the four their system measures.
2. Compute cost per accepted outcome for a workload and run a price sensitivity sweep on it.
3. Name the second-order effects a cheap input has already produced in their own architecture and commitments, using the parking mapping.

## Audience and prerequisites

Engineering leaders, architects, and founders making build decisions on top of LLM APIs. Basic familiarity with token pricing and unit economics. No finance background needed.

## Practical takeaways

- The three-price worksheet: effective rate today, gross rate without the offer, the highest survivable rate.
- The four actions: record gross usage separately from credits, keep a small acceptance suite, rehearse one provider replacement, price the cost of portability.
- The sensitivity calculator from the demo kit, usable with your own numbers.

## Not a product pitch

The talk names AWS credit terms and Epoch AI's public data as sources. It recommends no provider, no cost tool, and no consulting service. The calculator is offline and vendor-free.

## References

- Shoup, D. (2005, updated 2011). *The High Cost of Free Parking*. American Planning Association.
- Shoup, D. (2011). [Free parking or free markets](https://www.accessmagazine.org/spring-2011/free-parking-free-markets/). ACCESS Magazine.
- Cottier, Snodin, Owen, Adamczewski (Epoch AI, March 2025). [LLM inference prices have fallen rapidly but unequally across tasks](https://epoch.ai/data-insights/llm-inference-price-trends).
- Amazon Web Services. [AWS Promotional Credit terms](https://aws.amazon.com/awscredits/).
- Current reporting on provider losses, compute commitments, and credit programs: [insert three dated items before each submission].

## Audience-specific abstracts (100 words each)

### Engineering practitioner

Your architecture has already learned what inference costs, and it learned from a promotional price. This session maps free parking's second-order effects onto software: frontier calls where a lookup would do, retries and branches nobody measured, deterministic code losing design reviews to "just ask the model." We define cost per accepted outcome, run a live sensitivity sweep at 1× to 10× prices, and show what halving consumption buys back. Then the counterargument, with Epoch's price-decline data. You leave with three prices for your next design review and a rehearsal plan for one provider replacement.

### Engineering leadership and product

Reported losses, compute commitments, and billion-dollar credit programs suggest today's inference prices are set for growth. Nobody outside knows the margins, and this talk does not guess. It asks a narrower question: which of your product's commitments, unlimited-usage promises, pricing tiers, headcount plans, only work at today's rate? Using Shoup's free-parking argument, we trace second- and third-order effects onto business mix, supplier concentration, and customer expectations, then run a synthetic workload through a price sweep. The takeaway is a three-price worksheet and four reversible actions, not a forecast and not austerity.

### Education and instructional design

Schools and edtech products are adopting AI tools priced at promotional rates. This session, adapted for education leaders, asks what happens to a curriculum, a procurement decision, or a student expectation built on a price that may not last. It uses the free-parking analogy to show how a hidden cost reshapes an environment, then walks through a simple cost-per-successful-outcome model any program office can run. No engineering background needed. You leave with three prices to ask a vendor for and a way to keep the choice reversible.

### Executive and general technology

Free parking was never free; its cost moved into rents, land use, and the businesses that never opened. Free and subsidized AI is doing the same thing to software companies, and the effects show up in architecture, contracts, and hiring plans before they show up on an invoice. This talk explains the mechanism without code or a price forecast, walks a synthetic workload through a price sweep, and gives leaders three numbers to demand in any AI investment review: what we pay today, what we pay without the offer, and what we can survive paying.
