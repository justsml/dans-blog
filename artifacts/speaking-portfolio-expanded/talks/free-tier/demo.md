# Stage demonstration: what survives the price assumption?

Both demonstrations use fixed, synthetic fixtures and deterministic rules. Nothing is sent to customers or providers. The presenter must call them simulations before revealing results.

**Duration:** 4:00. Use the price sensitivity panel. The 40-minute deck reserves slide 11 for this run.

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
| 1:45–2:15 | Restore 1× and drop acceptance from 75% to 45%. Cost per accepted outcome goes to $0.0667 — identical to the 2× row, at unchanged prices. Say: “A thirty-point acceptance drop costs what doubling every token price costs. One of those is on the front page.” |
| 2:15–2:30 | Ask the audience to choose a response: remove repeated calls, improve acceptance, route work, or accept the cost because the outcome is valuable. Do not announce a universal winner. |
| 2:30–3:15 | Restore 75%. At 10×, set baseline inference per attempt to $0.01, leaving other cost and acceptance unchanged. The result is $110 per batch and about 14.7¢ per accepted outcome. Say: “The assumption that quality stayed equal needs an eval.” |
| 3:15–4:00 | Restore the baseline. State the counterargument: useful inference may continue getting cheaper, and engineering work has its own cost. Close: “Measure what the architecture depends on before deciding what to optimize.” |

**Expected outcome:** The audience sees why cost per call, net invoice, and cost per accepted outcome answer different questions. Halving usage can reduce sensitivity, but the teaching example does not establish that a real optimization preserves quality or is worth building.

**Honest limits:** No revenue, taxes, fixed overhead, recovery labor, uncertainty, demand response, or provider profitability model. The 75% rate is a fixture, not a measured pass rate. Multipliers are stress cases, not forecasts. The assumed 50% consumption reduction is unmeasured. If acceptance or costs vary with load, this one-variable calculation is incomplete.

**Fallback:** Keep the four-row table above as a local screenshot or use deck slide 11. Read the same sequence and do the last arithmetic verbally. No live provider request is needed.
