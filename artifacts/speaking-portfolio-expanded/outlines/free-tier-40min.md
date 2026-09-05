# Cry Me a Free Tier

40 minutes · 18 slides · 40min

Timings are rehearsal targets, excluding Q&A. Speaker notes are delivery guidance, not a verbatim script.

## 1. Cry Me a Free Tier

0.0–1.5 minutes

What did the cheap input
teach your architecture to expect?

Open with a thought experiment: a startup receives free electricity for a year. Ask what it would build differently, then what survives when the offer ends. Give the audience five seconds to think before connecting electricity to inference. This is a question about dependence on a price assumption, not a claim that every AI provider loses money. State the promise of the talk: leave with a way to stress-test an architecture without pretending to know a vendor's confidential costs.

## 2. The invoice is not the whole story

1.5–3.5 minutes

Price paid
Resources consumed
Cost allocated
Value delivered

Draw four separate boxes with your hands as you name these concepts. A customer invoice records what the buyer pays. It does not expose utilization, hardware depreciation, training allocation, or the provider's contribution margin. Customer value is another variable again. A free allowance can have a positive acquisition value to a provider while consuming real resources. Keep those accounting boundaries visible throughout the talk. The useful engineering question is which of these quantities your system measures and which it merely assumes.

## 3. Cheap access has real value

3.5–5.0 minutes

More people can experiment
Small teams can try more ideas
Learning gets a lower entry cost

Take the strongest case for free access seriously before criticizing its incentives. A student can try a tool, a nonprofit can prototype a workflow, and a small team can test an idea before making a large commitment. These are potential benefits, not a measured estimate of social impact. Ask the audience which useful experiment they would have skipped if it required procurement first. The point is to preserve this option value while making temporary discounts visible in production decisions.

## 4. Subsidy is a hypothesis, not a disclosed number

5.0–7.0 minutes

Credits can expire
Bundles can cross-fund usage
Low price alone proves neither

Use promotional credits as the concrete, documented case: AWS says credits are subject to expiration and the terms of the offer. Do not generalize those terms to every provider. A bundle may spread costs across customers or services; a low price may also reflect genuine efficiency. We cannot infer a model's margin from a token rate. Frame the central conditional carefully: if your paid rate rises relative to your product's value, which design choices become liabilities? That question works without a subsidy estimate.

Sources: [Reference](https://aws.amazon.com/awscredits/)

## 5. Free parking is an analogy about incentives

7.0–9.0 minutes

The cost moves somewhere else
The built environment adapts
AI’s built environment is software

Keep the parking analogy short and explicitly label it an analogy. Imagine a shopping center treating parking as a bundled amenity: its construction and land still have a cost, even when a driver sees no meter. The thought experiment concerns incentives, not a numerical claim about cities. Likewise, software can grow around a price that hides resource consumption from the person making design decisions. The analogy ends where it stops helping; AI has different supply curves and can become much more efficient.

## 6. Architecture learns the price signal

9.0–11.0 minutes

Longer context
More retries
More competing branches
Frontier calls by default

Tell a fictional design-review story. A team asks whether it should summarize context, add a cache, or route easy work to code. Someone answers that inference is effectively free on their current plan. Each shortcut is locally reasonable, yet together they make usage difficult to predict. Name this architectural obesity with a little humor, then qualify it: redundancy and large context can be worthwhile when they improve outcomes. The mistake is failing to measure what each extra call buys.

## 7. Measure the successful outcome

11.0–13.5 minutes

Total operating spend
÷ accepted completed jobs
Include retries and human recovery

Define the denominator before showing any dollars. A completed job must meet an explicit acceptance rule; an impressive answer that a human later repairs is not free success. Include attributable inference, tools, infrastructure, and recovery effort in operating spend, while separating overhead if the comparison needs that distinction. Do not present a blended token rate as a unit economics model. Ask the audience to name their product's accepted outcome in one sentence. If that is difficult, the economics discussion has found a product problem.

## 8. A fictional workload before the price changes

13.5–15.5 minutes

1,000 attempts; 750 accepted
$0.02 inference per attempt
$0.01 other cost per attempt
$0.04 per accepted outcome

Introduce the demonstration as synthetic before displaying any numbers. The fixture has one thousand attempts, a seventy-five-percent acceptance rate, two cents of inference per attempt, and one cent of other attributable operating cost per attempt. That produces thirty dollars of cost and seven hundred fifty accepted outcomes, or four cents per accepted outcome. The unaccepted attempts still cost money. These inputs are chosen for teaching, not measured vendor performance. Keep promotional credits separate from gross resource consumption if the audience raises free allowances.

## 9. Change one assumption. Watch the unit cost.

15.5–19.5 minutes

Inference price: 1×  2×  5×  10×
Per success: 4¢ 6.7¢ 14.7¢ 28¢
Synthetic sensitivity, not a forecast

Run the four-minute economics demonstration from the companion guide. Start at the baseline, then sweep inference price through two, five, and ten times its starting value. Hold attempts, acceptance rate, and other costs fixed. Monthly costs for this invented batch become thirty, fifty, one hundred ten, and two hundred ten dollars. Divide each by seven hundred fifty accepted outcomes. This is a sensitivity analysis, not a price prediction or a complete profitability model. Ask which assumption the audience would challenge before committing to an optimization project.

| Price factor | Monthly cost | Cost / success |
| --- | --- | --- |
| 1× | $30 | $0.040 |
| 2× | $50 | $0.067 |
| 5× | $110 | $0.147 |
| 10× | $210 | $0.280 |

## 10. Now change the architecture

19.5–21.5 minutes

Assume half the inference use
Preserve the 75% acceptance rate
At 10×: 28¢ → 14.7¢ per success
Quality parity must be tested

Continue the synthetic scenario without inventing a measured optimization win. Assume a change could halve inference usage per attempt while maintaining the same seventy-five-percent acceptance rate. At ten times baseline price, total cost becomes one hundred ten dollars across a thousand attempts, or about fourteen-point-seven cents per accepted outcome. Label preserved acceptance as an assumption requiring an eval. The optimization project also costs engineering time and ongoing maintenance. Compare those costs with the recurring savings; a router that costs more to run than it saves is not automatically better engineering.

## 11. A cheap input can shape a company

21.5–23.5 minutes

Packaging promises
Customer expectations
Supplier dependence
Automation assumptions

Expand from code to commitments. A product that promises unlimited work may have less room to react than a product with explicit workload limits. A team that relies on one provider may face a migration project when capabilities or terms change. Labor substitution calculations also depend on recovery, oversight, and quality rather than the invoice alone. These are conditional mechanisms, not evidence that a specific industry is overautomating. Ask which commitments are reversible this quarter and which would take a year to unwind.

## 12. Democratized access, concentrated supply?

23.5–25.5 minutes

More builders can enter
Few suppliers may carry the cost
Both can happen at once

Pose this as a question for the room, not an established market forecast. Aggressive pricing can lower entry costs for application developers while making infrastructure competition difficult for suppliers with less capital. Open models, specialized providers, efficiency improvements, and changing demand can push in the opposite direction. Distinguish access to an API from durable bargaining power. The practical takeaway is to know which parts of the system are portable and to rehearse a replacement on actual workloads before claiming that switching is easy.

## 13. The counterargument deserves its own slide

25.5–28.0 minutes

Maybe today’s low price
is tomorrow’s ordinary cost
Efficiency is real
Do not forecast a price cliff

Present the strongest objection in your own voice. Better hardware, smaller models, improved serving, and competitive pressure can keep reducing the price of useful work. A team that spends months optimizing a disappearing expense may make a worse business decision than one that ships. The historical evidence on the next slide supports taking this objection seriously. The talk therefore recommends reversible architecture and sensitivity analysis, not austerity, a prediction of collapse, or a universal rule to avoid frontier models.

## 14. Fixed capability has become cheaper

28.0–30.0 minutes

Historical observation: 2021–2025
Epoch tracks six benchmark families
Declines vary by task and threshold
Retail price ≠ provider production cost

Cite Epoch AI's March 2025 analysis, which follows the cheapest model reaching fixed benchmark milestones across six benchmarks. Its observed price declines differ substantially across tasks and thresholds. Keep the benchmark scope explicit: a fixed benchmark score does not imply equivalent performance on every customer workflow. The study measures offered inference prices, not confidential provider cost accounting. Use the evidence to challenge a simplistic subsidy narrative, then return to the unresolved practical issue: your workload may also grow in complexity and consumption.

Sources: [Reference](https://epoch.ai/data-insights/llm-inference-price-trends)

## 15. Cheaper tokens can meet bigger workloads

30.0–32.0 minutes

Unit price may fall
Calls per job may rise
Context may grow
Track both sides of the equation

Write total inference spend as price times consumption, then unpack consumption into accepted jobs, calls per job, and tokens per call. More capable systems may invite new work, longer sessions, or more verification. That is a possible response to cheaper inputs rather than a claimed universal economic law. A falling token price can coexist with a growing bill, and either trend can still be good for the business if customer value rises faster. Measure the relationship instead of treating the bill alone as success or failure.

## 16. Buy options before you need them

32.0–34.5 minutes

Record gross usage and credits
Keep a workload eval set
Rehearse one provider replacement
Price the cost of extra complexity

Give four practical actions in a concrete sequence. Record gross consumption separately from credits. Preserve a small representative acceptance suite. Run one replacement provider or smaller model against that suite, including latency and recovery effort. Then estimate the maintenance cost of portability. A generic abstraction that hides meaningful model differences can make a system worse. The goal is a credible fallback, with known limitations, rather than a promise that every model is interchangeable. Keep simple implementations when the resilience benefit does not justify added machinery.

## 17. The next design review needs three prices

34.5–36.5 minutes

What we pay today
What we pay without the offer
What we can survive paying

Return to the fictional startup and its original design review. Give the team three numbers to bring next time: the effective rate today, the gross rate without promotional treatment, and the highest rate compatible with an acceptable outcome. Sweep downward prices too, so the optimization plan can be abandoned when efficiency gains make it unnecessary. Assign an owner and a review date to the assumptions. This turns an argument about industry destiny into an ordinary decision about exposure, optionality, and engineering effort.

## 18. Cheap intelligence changes incentives first

36.5–40.0 minutes

Enjoy the experiment
Measure the dependence
Build for more than one answer

Close by resolving the initial electricity question. The useful response to a cheap foundational input is to exploit the opportunity while understanding what it has encouraged you to build. Some low prices may prove temporary; others may be a preview of more efficient production. We do not need certainty about which story dominates to measure outcomes and keep important choices reversible. Deliver the signature line slowly: cheap intelligence changes incentives before it changes organizations. Leave the sensitivity table available for questions about assumptions.

