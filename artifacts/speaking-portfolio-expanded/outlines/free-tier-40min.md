# Cry Me a Free Tier

40 minutes · 15 slides

**Arc.** Warm open on the electricity question, build through the parking argument, peak at the live sweep, land on three numbers. Pacing tags per slide: warm, steady, build, peak, land.

**Scope.** Nobody outside a provider knows its margins, so the talk never estimates one. It uses reported figures with dates, a synthetic workload, and Shoup's parking argument as an argument about incentives. Say that once on slide 1 and then argue.

**Demo.** [Runbook section 4](../demos/DEMO-RUNBOOK.md#4-cry-me-a-free-tier) · [Kit](../demos/index.html). Fallback: the table on slide 10.

**Before each delivery.** Fill the `Story` lines. Recheck the dated commitments and credit offer on slide 3.

**Image style.** Dark slate background, one amber accent, flat vector, generous negative space, no text or logos. Each slide comment is a complete prompt.

**Timings** are rehearsal targets, no Q&A. Notes are cues.

---

## 1. Free electricity for a year

0:00–2:30 · warm

<!-- image: a small startup office at night lit by one bare bulb, power cable running out the window to a distant power plant, dark slate background, one amber accent on the bulb, flat vector, no text -->

> What did the cheap input teach your architecture to expect?

A startup gets free electricity for a year. What does it build? Five seconds of silence. Now: what survives when the offer ends? Connect it to inference.

One sentence of scope: no one outside a provider knows its margins, so I will use reported numbers with dates, a made-up workload, and an argument borrowed from urban economics. Then I will stop qualifying and make the case.

Story: [the first time a bill, quota, or rate change broke an assumption in something you built]

## 2. The invoice is not the whole story

2:30–4:00 · warm

<!-- image: four separate cardboard boxes in a row, each a different size, one open and empty, dark slate background, amber accent on the open box, flat vector, no text -->

> Price paid · Resources consumed · Cost allocated · Value delivered

Draw the four boxes with your hands. The invoice records what the buyer pays. It hides utilization, depreciation, training allocation, and margin. Customer value is a fifth box. A free allowance can be worth a lot to a provider as acquisition while burning real resources. Which of these does your system measure, and which does it assume?

## 3. Dated commitments and offers

4:00–7:30 · steady

> $250B incremental Azure services contracted by OpenAI · Microsoft, October 28, 2025
> More than $100B AWS commitment over ten years · Amazon, April 20, 2026
> Up to $200K AWS Activate credits for eligible startups · offer checked September 5, 2026

Microsoft announced on 28 October 2025 that OpenAI had contracted to purchase an incremental $250 billion of Azure services. Amazon announced in April 2026 that Anthropic committed more than $100 billion of AWS spending over ten years. AWS Activate offers up to $200,000 in credits for eligible startups, checked 5 September 2026. These are corporate announcements and an offer, not audited statements of inference margins. Do not infer a provider loss per query from them. Terms can change. Ask which architectural choices depend on the present effective rate. Recheck the offer immediately before delivery.

Source: [Microsoft · 28 Oct 2025](https://blogs.microsoft.com/blog/2025/10/28/the-next-chapter-of-the-microsoft-openai-partnership/).

Source: [Amazon · Apr 2026](https://www.aboutamazon.com/news/company-news/amazon-invests-additional-5-billion-anthropic-ai).

Source: [AWS Activate · accessed 5 Sep 2026](https://aws.amazon.com/startups/credits/).

## 4. Subsidy is a hypothesis

7:30–9:00 · steady

<!-- image: a gift voucher with a visible expiry date corner curling and fading, dark slate background, amber accent on the date, flat vector, no text -->

> Credits expire. Bundles cross-fund. A low price proves neither.

The one documented case: AWS says promotional credits are subject to expiration and offer terms. Do not stretch that to every provider. A bundle spreads cost across products; a low price may be real efficiency. You cannot read margin off a token rate.

The conditional that works without a subsidy estimate: if your paid rate rises relative to your product's value, which design choices become liabilities?

Source: Amazon Web Services, [AWS Promotional Credit terms](https://aws.amazon.com/awscredits/).

## 5. Free parking is an argument about incentives

9:00–11:30 · build

<!-- image: an enormous empty parking lot at dusk with a tiny storefront at the far edge, painted lines stretching to the horizon, dark slate background, amber accent on the storefront window, flat vector, no text -->

> "Free" parking costs someone
> Minimum requirements shaped the built environment
> The cost moved into rents, prices, and land

Donald Shoup spent a career showing free parking is never free. Cities required developers to build minimum parking. The cost went into rents and retail prices; the land went to asphalt. Because drivers saw no meter, demand looked infinite, and the requirements grew to match.

The mechanism transfers, not the numbers: a hidden price makes one input look free, the environment reorganizes around it, and the reorganization is expensive to reverse. Software is AI's built environment.

Source: Shoup (2005, updated 2011), *The High Cost of Free Parking*, American Planning Association. Also Shoup (2011), [Free parking or free markets](https://www.accessmagazine.org/spring-2011/free-parking-free-markets/), ACCESS Magazine.

## 6. Second-order effects of free parking

11:30–14:30 · build

<!-- image: aerial view of a strip mall where parking lots take up most of the frame and buildings are small islands, dark slate background, amber accent on one small building, flat vector, no text -->

> Retail density falls
> Business mix shifts to car-dependent formats
> Housing carries a bundled space per unit
> Small formats and transit lose

Walk the chain. Minimum parking spreads buildings apart, so density falls. Formats that need a big lot win; small storefronts that cannot fit one lose. Every apartment carries a parking space, paid by tenants who may not drive. Transit ridership drops because everything is far apart and parking is free at the destination. Each step is individually reasonable.

Third order: once the environment is car-shaped, repealing the requirement does not undo it. The lots exist. The businesses that could have opened never did.

Which of these has an obvious software equivalent? Hold it. Next slide.

## 7. Map it: second-order effects of free inference

14:30–18:30 · build

<!-- image: the same aerial strip mall, but the parking lots are replaced with glowing server racks and the small buildings are tiny code windows, dark slate background, amber accent on the code windows, flat vector, no text -->

> Density: a frontier call where a lookup would do
> Business mix: products viable only at today's price
> Rent: unlimited-usage promises baked into contracts
> Small format: deterministic code loses to "just ask the model"

Density: architectures that make a frontier call where a cache, a regex, or a lookup would do, because the call looked free. Longer context, more retries, more competing branches, frontier by default. Business mix: products whose unit economics work only at promotional rates, crowding out products that would work at any price. Rent: unlimited-usage promises to customers that bake the assumption into a contract. Small format: boring deterministic code loses the design review to "just ask the model."

Call it architectural obesity, with a grin, then qualify once: redundancy and big context can be worth it. The failure is not measuring what each extra call buys.

Story: [a design review where "inference is basically free" ended the discussion]

## 8. Third-order effects

18:30–20:30 · build

<!-- image: three concentric ripple rings on dark water from a single coin drop, outermost ring reaching the frame edge, dark slate background, amber accent on the coin, flat vector, no text -->

> Labor priced at the invoice, not the recovery cost
> App builders proliferate; infrastructure suppliers concentrate
> Customers learn that intelligence is unmetered

Labor substitution math that uses the invoice and omits oversight and recovery. Democratized access for app builders beside concentrated supply, because few can carry the capital cost of being cheap. Customer expectations that are hard to reset. Pose these as questions for the room: which one is already visible in your industry?

## 9. Cost per accepted outcome

20:30–23:30 · steady

<!-- image: a long division symbol drawn large, a pile of coins above the line and a single green checkmark below it, dark slate background, amber accent on the checkmark, flat vector, no text -->

> Total operating spend ÷ accepted completed jobs
> Retries and human recovery count
> Fixture: 1,000 attempts a month, 750 accepted, 3¢ per attempt → 4¢ per success

Define the denominator before showing dollars. A completed job meets an explicit acceptance rule; an impressive answer a human later repairs is not free success. Include inference, tools, infrastructure, and recovery. A blended token rate is not a unit economics model.

Then the fixture, labeled synthetic: one month, one thousand attempts, seventy-five percent accepted, two cents inference plus one cent other cost per attempt. Thirty dollars, seven hundred fifty accepted outcomes, four cents each. The failed attempts still cost money.

Ask (30 s): name your product's accepted outcome in one sentence. If that is hard, the economics discussion just found a product problem.

## 10. Demo: change one assumption, watch the unit cost

23:30–28:30 · peak

<!-- image: a single dial being turned by a hand, the needle sweeping from 1x to 10x, a bar chart behind it rising steeply, dark slate background, amber accent on the needle, flat vector, no text -->

> Inference price 1× 2× 5× 10×
> Per success 4¢ 6.7¢ 14.7¢ 28¢

Follow [runbook section 4](../demos/DEMO-RUNBOOK.md#4-cry-me-a-free-tier). Read the 1× row, then 10×. Then move the success rate and let the room see that it matters more than most people expect.

| Price factor | Monthly cost | Cost / success |
| --- | --- | --- |
| 1× | $30 | $0.040 |
| 2× | $50 | $0.067 |
| 5× | $110 | $0.147 |
| 10× | $210 | $0.280 |

Sensitivity, not prediction. Quality is held fixed, which is itself an assumption.

Ask (45 s): which assumption would you attack first before funding an optimization project?

Compression: at two minutes, 1× and 10× rows only.

## 11. Now change the architecture

28:30–30:00 · peak

<!-- image: the same bar chart with every bar cut in half by a horizontal slice, the removed top halves fading away, dark slate background, amber accent on the cut line, flat vector, no text -->

> Halve inference per attempt, same 75% acceptance
> At 10×: 28¢ → 14.7¢ per success
> Parity is an assumption until an eval says otherwise

A cache, a router, or a deterministic pre-check halves inference per attempt at the same acceptance rate. At ten times price, cost per success halves. Preserved acceptance is an assumption that needs an eval. The optimization costs engineering time too. A router that costs more to run than it saves is not better engineering.

## 12. The counterargument, in your own voice

30:00–32:00 · steady

<!-- image: a boxing ring with one empty corner stool under a spotlight, dark slate background, amber spotlight accent, flat vector, no text -->

> Maybe today's low price is tomorrow's ordinary cost
> Efficiency is real
> Do not forecast a cliff

Better hardware, smaller models, better serving, and competition keep cutting the price of useful work. A team that spends months optimizing a disappearing expense made a worse decision than one that shipped. Next slide is the evidence for this objection. My recommendation is reversibility and sensitivity analysis, not austerity.

## 13. Fixed capability got cheaper; workloads got bigger

32:00–35:00 · steady

<!-- image: two lines on a chart crossing, one falling steeply and one rising, drawn as ribbons, dark slate background, amber accent on the rising ribbon, flat vector, no text -->

> Epoch AI, 2021–2025: six benchmark families, steep and uneven declines
> Retail price ≠ production cost
> Spend = price × (jobs × calls per job × tokens per call)

Epoch's March 2025 analysis tracks the cheapest model reaching fixed benchmark milestones. Prices fell a lot, at very different rates per task. A benchmark score is not your workload, and offered prices are not production cost.

Then the other side of the equation. Write spend as price times consumption and unpack consumption. More capable systems invite new work, longer sessions, more verification. A falling token price and a growing bill coexist comfortably, and both can be fine if customer value rises faster. Measure the relationship.

Source: Cottier, Snodin, Owen, Adamczewski (Epoch AI, March 2025), [LLM inference prices have fallen rapidly but unequally across tasks](https://epoch.ai/data-insights/llm-inference-price-trends). Check for a newer edition before each delivery.

## 14. Three prices for the next design review

35:00–38:30 · land

<!-- image: three price tags hanging from strings at different heights, the highest one slightly singed at the edge, dark slate background, amber accent on the singed tag, flat vector, no text -->

> What we pay today
> What we pay without the offer
> What we can survive paying

Bring three numbers: effective rate today, gross rate without promotional treatment, and the highest rate compatible with an acceptable outcome. Sweep downward too, so the optimization plan can be dropped when efficiency makes it pointless.

Four actions to get there: record gross consumption separately from credits; keep a small representative acceptance suite; rehearse one provider replacement against it, including latency and recovery; price the maintenance cost of portability. A generic abstraction that hides real model differences can make things worse.

## 15. Cheap intelligence changes incentives first

38:30–40:00 · land

<!-- image: the bare bulb from slide 1 now on a desk beside a small solar panel and a battery, the long cable coiled unused, dark slate background, amber accent on the bulb, flat vector, no text -->

> Enjoy the experiment. Measure the dependence. Build for more than one price.

Back to the electricity. Use the cheap input; understand what it encouraged you to build. Some low prices are temporary; some preview cheaper production. You do not need to know which to measure outcomes and keep the big choices reversible.

Slowly: cheap intelligence changes incentives before it changes organizations. Leave the table up.
