# Evidence bank: Cry Me a Free Tier

Firsthand examples and claim boundaries. Fill every field from your own records before use. Do not publish numbers you cannot reproduce.

## How the economics is used

Every concept in this talk is a named, published idea used as a **frame**, not as a measurement of this industry. Nobody has run Duranton and Turner's regression on token consumption. Say "this is the mechanism economists describe, and here is how you would check whether it applies to you," and the talk stays honest.

| Word | Source | What the talk claims | What it must not claim |
| --- | --- | --- | --- |
| Externality | Shoup (2005/2011), *The High Cost of Free Parking*; Shoup (2011), [ACCESS](https://www.accessmagazine.org/spring-2011/free-parking-free-markets/) | A cost invisible at the point of decision relocates rather than disappears | No measured externality figure for inference. The parking numbers do not transfer |
| Induced demand | Downs (1962); Duranton and Turner (2011), *AER* 101(6), elasticity of driving to lane-kilometres near one | Added capacity is absorbed by new use | The near-unit elasticity is a road finding. Do not restate it as a token elasticity |
| Jevons paradox | Jevons (1865), *The Coal Question*, ch. VII | Efficiency gains can raise total consumption of the input | Not a law, and not a claim that every price decline raises every bill. Present as the mechanism behind spend = price × consumption |
| Path dependence | David (1985), *AER* 75(2); Arthur (1989), *Economic Journal* 99(394); contested by Liebowitz and Margolis (1990), *JLE* 33(1) | Reversal can cost more than the original decision | Say on stage that the QWERTY example is disputed. That honesty is the slide's point: measure your own lock-in in hours instead of asserting it |
| Moral hazard | Holmstrom (1979), Moral Hazard and Observability, Bell Journal of Economics 10(1), 74 to 91; Nobel 2016 | When the decider does not bear the cost, the decision changes | Not an accusation about any engineer. It is a structural claim about where the meter sits |
| Credible commitment | Schelling (1960), *The Strategy of Conflict*; Nobel 2005 | Large irreversible commitments are strategic signals | Do not infer margin, cost, or financial distress from a commitment's size |
| War of attrition | Standard game-theoretic model | Describes a race in which both sides burn capital and neither can stop first | A model offered for discussion, not a finding about named companies |
| Penetration, loss leader, predation | Rochet and Tirole (2003), *JEEA* 1(4); Brooke Group Ltd. v. Brown & Williamson, 509 U.S. 209 (1993) | Four legitimate explanations exist; the recoupment test is the legal standard for predation | Never allege that a named provider is engaged in predatory pricing. The slide's purpose is that the price cannot tell you which explanation holds |
| Asset specificity, hold-up | Williamson (1985), *The Economic Institutions of Capitalism*; Nobel 2009 | Relationship-specific investments create a surplus a counterparty can reach for at renewal | Do not claim any provider has done this. It is a structural exposure to inventory, not an accusation |
| Real option | Dixit and Pindyck (1994), *Investment Under Uncertainty* | Flexibility has a computable value and a recurring premium | The talk gives a payback formula, not a valuation model |
| Price declines | Cottier, Snodin, Owen, Adamczewski (Epoch AI, March 2025), [inference price trends](https://epoch.ai/data-insights/llm-inference-price-trends) | Prices for fixed benchmark milestones fell fast and unevenly by task | Benchmarks are not a production workload; offered prices are not provider cost. Check for a newer edition each delivery |
| Credits expire | [AWS Promotional Credit terms](https://aws.amazon.com/awscredits/) | One documented example of temporary customer pricing | Do not generalize the terms to other providers or treat promotional treatment as proof of a loss |

## Arithmetic in the talk

All synthetic. One thousand attempts a month, two cents inference plus one cent other cost per attempt, seventy-five percent accepted. Thirty dollars, seven hundred fifty accepted, four cents each. The acceptance multiplier is 1 ÷ 0.75 = 1.33 and 1 ÷ 0.45 = 2.22. The equivalence on slide 10 is exact: 3¢ ÷ 0.45 = 6.67¢, and doubling inference gives (4 + 1)¢ ÷ 0.75 = 6.67¢. Check it live if a room challenges it.

## Story slots in the outline

| Slide | Slot |
| --- | --- |
| 1 | The first time a bill, quota, or rate change broke an assumption in something you built |
| 4 | Recheck the three dated items; not a personal story |
| 7 | A design review where "inference is basically free" ended the discussion |

## Candidate firsthand entries

Fill from your own records. Candidate contexts come from the resume; details, measurements, and permissions are yours to supply.

### Candidate 1: cost and quality work from an evaluation and observability practice

Resume basis: independent practice, measurable quality and cost improvements across production features using Langfuse, Weights & Biases, Helicone, Braintrust.

- **Problem and operating context:** [which feature, what the bill looked like, what the acceptance rule was]
- **What I personally built or changed:** [the measurement, the routing or caching change]
- **What failed:** [an optimization that cost more than it saved, or a quality regression]
- **Before and after measurements:** [cost per accepted outcome before and after; period]
- **What remains uncertain:** [ ]
- **Organization may be named publicly:** [ ]

### Candidate 2: fine-tuned vision language models for low-cost document understanding

Resume basis: shipping fine-tuned VLMs with Unsloth for ultra-low-cost document understanding. This is also the best firsthand example of asset specificity for slide 12: a fine-tune is worth a great deal against one stack and nothing anywhere else.

- **Problem and operating context:** [what the frontier-model version cost per document; volume]
- **What I personally built or changed:** [the fine-tune, the acceptance suite]
- **Before and after measurements:** [cost per accepted document; accuracy against the suite]
- **Hours to replace if the provider changed:** [this number is the slide-8 lock-in measurement]
- **Organization may be named publicly:** [ ]

### Candidate 3: a design review where "inference is free" ended the discussion

Feeds slide 7 directly. Any engagement.

### Candidate 4: the $22,500 monthly auth-cost engagement

Consulting catalogue basis (`src/data/consultingServices.ts`). Strong firsthand support for slides 9 and 10: a recurring bill nobody could attribute to a decision.

## Already public, citable today

- [LLM Connection Strings](../../../../src/content/posts/2026-01-30--llm-connection-strings/index.mdx) and the [llm:// Internet-Draft](https://datatracker.ietf.org/doc/draft-levy-llm-uri-scheme/): provider addressing and portability. Direct support for slide 14's "rehearse one provider replacement" and for reducing asset specificity on slide 12.
- [Auto-Tune Your LLM Judge](../../../../src/content/posts/2026-08-11--auto-tune-your-llm-judge/index.mdx): cost and latency measured alongside accuracy. Support for slide 10's denominator.

## Before presenting

Recheck the three dated items on slide 4 and the Epoch edition on slide 6. If a figure has moved, say the new figure; the argument on slide 4 is about what a commitment signals, so it survives a number change. Do not add a provider-specific margin estimate, a price forecast, or a date when subsidies end.
