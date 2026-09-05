# Economics and product engineering: evidence and claim boundaries

Verified 2026-09-04. The user’s six-concept brief controls the argument. The material below supports factual claims; proposed architectures, principles, synthetic fixtures, and conditional market mechanisms are labelled as such.

## Cry Me a Free Tier

| Claim | Primary evidence | Scope and stage wording |
|---|---|---|
| Offered inference prices for fixed capabilities have declined substantially, with different trajectories by task. | Ben Cottier, Ben Snodin, David Owen, Tom Adamczewski, [Epoch AI, March 12, 2025](https://epoch.ai/data-insights/llm-inference-price-trends). The authors compare prices required to reach fixed milestones across six benchmark families. | Historical benchmark price evidence, not equivalent quality on every production workload. Retail prices do not disclose provider production costs. Do not extrapolate the fastest historical decline indefinitely. |
| Promotional credits can expire and have offer-specific restrictions. | [AWS Promotional Credit Terms](https://aws.amazon.com/awscredits/). | A concrete example of temporary customer pricing. Do not assert identical terms across providers or that promotional treatment proves a provider loses money. |
| Subsidy, genuine efficiency, bundles, and customer acquisition can coexist. | **Analytical framing**, not an estimate supported by public provider cost accounts. | Say “if the effective price changes” and “may influence.” No company-specific subsidy magnitude, profitability estimate, or forecast appears in the talk. |
| Cheap inputs can encourage architectures that consume more of those inputs. | **Conditional incentive argument.** The electricity and parking examples are explicitly thought experiments. | Do not claim a measured causal effect on software architecture, concentration, labor substitution, or willingness to pay. Ask what the architecture depends on. |
| Costs per accepted outcome change with price, consumption, and acceptance rate. | **Arithmetic**, implemented in the offline fixture. | $0.02 inference + $0.01 other cost per attempt, divided by 0.75 acceptance = $0.04 per accepted outcome. Every number is synthetic. |

The counterargument is part of the thesis: present-day low prices might reflect, or precede, genuinely lower costs for useful capability. The practical answer is to measure exposure and keep important choices reversible, not to predict an inevitable price cliff. Optimization has maintenance and opportunity costs too.

## The Future of Product Engineering

| Claim | Primary evidence | Scope and stage wording |
|---|---|---|
| Experiment design needs a clear hypothesis and a complementary metric set. | [Microsoft Research: Pre-Experiment Stage](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-pre-experiment-stage/), 2020. | Supports experimental discipline. It does not validate the proposed product agent or synthetic onboarding treatment. |
| Sample ratio mismatch is a data quality warning; guardrails track product properties that should not degrade. | [Microsoft Research: During-Experiment Stage](https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/articles/patterns-of-trustworthy-experimentation-during-experiment-stage/), 2020. | Investigate mismatch before trusting results. A passed ratio check does not establish that all other sources of bias are absent. |
| Treatment-dependent logging or denominator changes can distort apparent effects. | [Microsoft Research: Post-Experiment Stage](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-post-experiment-stage/), 2021. | Instrumentation belongs in experiment review; observed metric improvement alone is insufficient. |
| Repeated monitoring needs inference methods appropriate to the stopping behavior. | Ramesh Johari, Leo Pekelis, David J. Walsh, [Always Valid Inference: Bringing Sequential Analysis to A/B Testing](https://arxiv.org/abs/1512.04922), originally 2015. | The technical variant distinguishes fixed-horizon plans from sequential methods. It does not implement a statistical engine or promise that arbitrary adaptive allocation remains valid. |
| Agents can assist the product learning loop, bounded by human-owned principles. | **Proposed reference architecture.** | Describe assistance, evidence packets, decision records, approval scopes, and reversible changes as design choices. Do not claim a production deployment or measured improvement in organizational performance. |
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
