# Stage demonstration: the winning treatment fails the product

Both demonstrations use fixed, synthetic fixtures and deterministic rules. Nothing is sent to customers or providers. The presenter must call them simulations before revealing results.

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
