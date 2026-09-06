# Economics and product engineering: evidence and claim boundaries

Verified 2026-09-04. The user’s six-concept brief controls the argument. The material below supports factual claims; proposed architectures, principles, synthetic fixtures, and conditional market mechanisms are labelled as such.

## Cry Me a Free Tier

Rewritten 2026-09-06. The full claim ledger, including every economic concept with its primary source and its stated boundary, now lives in the [evidence bank](../packets/free-tier/evidence-bank.md). Summary of the boundaries that matter most:

| Claim | Primary evidence | Scope and stage wording |
|---|---|---|
| Offered inference prices for fixed capabilities have declined substantially, unevenly by task. | [Epoch AI, March 12, 2025](https://epoch.ai/data-insights/llm-inference-price-trends). | Historical benchmark price evidence, not equivalent quality on every production workload. Retail prices do not disclose provider production costs. |
| Promotional credits can expire and carry offer-specific restrictions. | [AWS Promotional Credit Terms](https://aws.amazon.com/awscredits/). | One concrete example of temporary customer pricing. Do not assert identical terms across providers or treat credits as proof a provider loses money. |
| Four explanations for a below-cost price are legitimate and indistinguishable from the price alone. | Rochet and Tirole (2003) on two-sided cross-subsidy; Brooke Group, 509 U.S. 209 (1993) for the recoupment standard. | Never allege predation by a named provider. The slide's point is that the price does not identify the explanation; renewal terms and rate limits might. |
| Large compute commitments are strategic signals rather than cost disclosures. | Schelling (1960), *The Strategy of Conflict*. | The commitment framing is analytic. No inference about margin, cost, or financial condition follows from a commitment's size. |
| Cheap inputs can encourage architectures that consume more of them. | Jevons (1865); Downs (1962); Duranton and Turner (2011). | The coal and highway findings are about coal and highways. No measured elasticity for token consumption is claimed. |
| Reversal of an entrenched architecture costs more than the original decision. | David (1985), Arthur (1989); contested by Liebowitz and Margolis (1990). | Say on stage that the canonical QWERTY example is disputed, and give the room a measurement (hours to remove one model call) instead of an assertion. |
| Relationship-specific investments create an exposure at renewal. | Williamson (1985), Nobel 2009. | Structural exposure to inventory, not an accusation that any provider has exploited it. |
| Flexibility has a computable value and a recurring premium. | Dixit and Pindyck (1994). | The talk gives a payback formula, not a valuation model. |
| Costs per accepted outcome change with price, consumption, and acceptance rate. | **Arithmetic**, implemented in the offline fixture. | 2¢ inference + 1¢ other per attempt ÷ 0.75 acceptance = 4¢ per accepted outcome. Every number is synthetic; the acceptance multiplier equivalence is exact and checkable on stage. |

The counterargument is part of the thesis and now appears in the first ten minutes: today's low prices might reflect, or precede, genuinely lower costs. The practical answer is to measure exposure and keep important choices reversible, not to predict a cliff. The talk also tells low-volume teams explicitly not to optimize.

## The Future of Product Engineering

| Claim | Primary evidence | Scope and stage wording |
|---|---|---|
| A system's structure copies the communication structure of the organization that built it. | Melvin E. Conway, [How Do Committees Invent?](http://www.melconway.com/Home/Committees_Paper.html), Datamation, 1968. | Quote the thesis as Conway's observation. The extension to agent rosters is the speaker's argument, not Conway's claim. |
| Experiment design needs a clear hypothesis and a complementary metric set. | [Microsoft Research: Pre-Experiment Stage](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-pre-experiment-stage/), 2020. | Supports the "every experiment carries a hypothesis" slide. It does not validate the proposed agent roster or the synthetic onboarding treatment. |
| Guardrail metrics track product properties that should not degrade. | [Microsoft Research: During-Experiment Stage](https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/articles/patterns-of-trustworthy-experimentation-during-experiment-stage/), 2020. | Background for the support ceiling in the demo. Cited in the evidence notes, not on a slide in the current outlines. |
| Effort estimation has largely left engineering planning conversations. | **Speaker's firsthand observation**, stated as such ("I have not heard a team discuss level of effort in months"). | Do not present as an industry measurement. Invite the room to disagree. |
| Every function of a product group can be mimicked as an agent with a human owner; guards belong where risk spikes. | **Proposed operating model.** | Describe the roster, owners, targeted beta enrollment, and guards as design choices. Do not claim a production deployment or measured organizational improvement. Tools named in notes are examples. |
| Customers become more forthcoming once they see a response to their feedback. | **Speaker's firsthand observation.** | State as experience, not as a measured effect. Fill the evidence-bank story slot before using a specific example. |
| A locally better activation number can violate another objective. | **Synthetic policy replay**, detailed in demo.md. | Control 40% activation / 3% support; pressure 48% / 9% plus false urgency; clearer step 45% / 4%. The 5% ceiling is fictional policy. Passing gates means eligible for human review, never automatic shipping. No causal or significance claim. |

## Claims intentionally removed or narrowed

- No estimate of vendor loss per query, hidden subsidy, sustainable margin, or a date when subsidies end.
- No assertion that customer willingness to pay necessarily tends to zero.
- No claim that cloud credits prove the economics of all AI services.
- No assertion that faster experimentation guarantees better learning or product quality.
- No implication that support percentages establish a causal experiment result; the demo has no randomized user-level data or sampling uncertainty.
- No equation that lets a metric win compensate for a prohibited pattern.
- No claim that model confidence authorizes exposure, pricing changes, or external communications.

## Source upkeep before a booking

Recheck offer terms immediately before presenting a named credit program. Preserve dates on historical research. If adding a current model price example, verify the model, token categories, currency, region, and date; keep it distinct from provider cost. If replacing synthetic product fixtures with real experiments, obtain an authorized, de-identified dataset and document assignment, observation window, design, analysis, uncertainty, and decision history.
