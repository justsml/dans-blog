# Two stage demonstrations

Both demonstrations run offline in the portfolio demo kit. They use fixed, synthetic fixtures and deterministic rules. Nothing is sent to customers or providers. The presenter must call them simulations before revealing results.

## 1. Cry Me a Free Tier — “What survives the price assumption?”

**Duration:** 4:00. Use the price sensitivity panel. The 40-minute deck reserves slide 9 for this run.

**Question:** “If inference stopped feeling free, which architecture decision would you revisit first?”

### Exact fixture

- Attempts in the displayed batch: 1,000.
- Accepted outcome rate: 75%, therefore 750 accepted outcomes.
- Inference charge per attempt: $0.02 at baseline.
- Other attributable operating cost per attempt: $0.01.
- Multipliers: 1×, 2×, 5×, 10×, applied only to inference.
- Gross cost per accepted outcome: `(inference × multiplier + other) / acceptance`.
- Credit balances are not production costs. If discussing free access, distinguish net invoice from gross usage; do not pretend the fixture estimates a provider subsidy.

| Multiplier | Batch cost | Accepted outcomes | Cost per accepted outcome |
|---|---:|---:|---:|
| 1× | $30 | 750 | $0.0400 |
| 2× | $50 | 750 | $0.0667 |
| 5× | $110 | 750 | $0.1467 |
| 10× | $210 | 750 | $0.2800 |

### Stage sequence

| Clock | Action and exact teaching beat |
|---|---|
| 0:00–0:30 | Show the fixture. Say: “Invented workload. Real arithmetic. These are not vendor prices.” Ask the opening question. |
| 0:30–1:00 | Reveal 750 accepted outcomes. Explain that failed attempts still consume money. Baseline batch cost is $30, therefore 4¢ per accepted outcome. |
| 1:00–1:45 | Select 2×, 5×, then 10×. Pause at 28¢ per accepted outcome. Say: “That is exposure, not a forecast.” |
| 1:45–2:30 | Ask the audience to choose a response: remove repeated calls, improve acceptance, route work, or accept the cost because the outcome is valuable. Do not announce a universal winner. |
| 2:30–3:15 | At 10×, set baseline inference per attempt to $0.01, leaving other cost and acceptance unchanged. The result is $110 per batch and about 14.7¢ per accepted outcome. Say: “The assumption that quality stayed equal needs an eval.” |
| 3:15–4:00 | Restore the baseline. State the counterargument: useful inference may continue getting cheaper, and engineering work has its own cost. Close: “Measure what the architecture depends on before deciding what to optimize.” |

**Expected outcome:** The audience sees why cost per call, net invoice, and cost per accepted outcome answer different questions. Halving usage can reduce sensitivity, but the teaching example does not establish that a real optimization preserves quality or is worth building.

**Honest limits:** No revenue, taxes, fixed overhead, recovery labor, uncertainty, demand response, or provider profitability model. The 75% rate is a fixture, not a measured pass rate. Multipliers are stress cases, not forecasts. The assumed 50% consumption reduction is unmeasured. If acceptance or costs vary with load, this one-variable calculation is incomplete.

**Fallback:** Keep the four-row table above as a local screenshot or use deck slide 9. Read the same sequence and do the last arithmetic verbally. No live provider request is needed.

## 2. Product Engineering — “The winning treatment fails the product”

**Duration:** 5:00 in the 30- and 40-minute routes; 3:30 in the 15-minute route. Full-deck slide 11 in every route. Start on the slide showing only A/B/C activation; open the kit after the vote. The kit’s answer-labelled controls must not be visible first.

**Question:** “Which onboarding treatment would you promote if activation were the only number you saw?”

### Exact fixture and policy

| Candidate | Activation | Support rate | False urgency |
|---|---:|---:|---|
| Control | 40% | 3% | No |
| Pressure copy | 48% | 9% | Yes |
| Clearer first step | 45% | 4% | No |

Policy is chosen **before** viewing results: support rate must be at most 5%; fabricated urgency is prohibited. In this fixture, passing both rules means **eligible for human review**. It never means automatically ship. There is no randomized event dataset, power calculation, confidence interval, or causal claim.

### Stage sequence

| Clock | Action and exact teaching beat |
|---|---|
| 0:00–0:30 | Introduce the synthetic onboarding question. Show only full-deck slide 11 with neutral A/B/C names and activation figures. Ask for a show of hands. |
| 0:30–1:00 | Reveal support rates and the false-urgency flag. Do not suggest these invented values came from customers. |
| 1:00–1:45 | Show the predeclared policy. Run the replay. Pressure copy is blocked for support above 5% and fabricated urgency. |
| 1:45–2:30 | Highlight the clearer first-step candidate: 45% activation, 4% support, no false urgency. It is eligible for human review. Say: “Passing a gate is different from having enough evidence to ship.” |
| 2:30–3:15 | Inspect or narrate the reasons. Explain that hard prohibitions cannot be offset by a higher weighted activation score. A policy edit requires an accountable decision; it is not an optimization trick. |
| 3:15–4:15 | State what a real experiment still needs: valid assignment, event checks, observation window, analysis suited to the design, uncertainty, and a named owner. Close: “The rule was written before the scorecard. Automate the right things; keep the taste.” |

| 4:15–5:00 | Ask the room to write the rule it needed, then compare with the predeclared policy. |

**Lightning timing:** 0:00–0:30 setup; 0:30–1:00 reveal; 1:00–1:45 run gates; 1:45–2:15 contrast blocked and review-eligible candidates; 2:15–2:45 write the rule; 2:45–3:30 limits and human ownership. Full-deck slide 12 then explains the boundaries without rerunning the demo.

**Expected outcome:** The apparently strongest activation result is rejected. The less aggressive candidate clears the stated rules but still requires a release decision. The software demonstrates rule execution, not a reliable AI taste evaluator or a statistically valid experiment.

**Honest limits:** Aggregates are synthetic; support is an illustrative rate without underlying people or exposure dates. The false-urgency flag is labelled input, not a model's demonstrated ability to detect manipulation. The 5% ceiling is a fictional choice, not a recommendation for other products. No reweighting, significance test, or causal inference occurs. A real deployment would need consent and access boundaries, stable identifiers and metrics, experiment design, sample requirements, stopping rules, rollout controls, and an accountable owner.

**Fallback:** Use the fixed table and reveal the decision verbally. Pressure copy: blocked on two grounds. Clearer first step: eligible for review. Preserve the distinction even if the UI fails.
