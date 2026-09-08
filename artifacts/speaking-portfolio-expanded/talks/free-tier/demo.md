# Stage demonstration: what survives the price assumption?

This worked example uses a fixed, synthetic fixture. No application, network request or provider account is required. The opening slide identifies the synthetic workload.

**Duration:** 2:00, walked off the slide-11 table. There is no interactive panel.

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

### Two-minute stage sequence

| Clock | Action |
| --- | --- |
| 0:00–0:45 | Speak the slide-11 prose. Point to $30 / $0.040, then $210 / $0.280. Only inference price changes. |
| 0:45–1:00 | Allow fifteen seconds to read the intervening rows in silence. |
| 1:00–1:45 | Ask for 45 seconds: which assumption would you test before funding optimization? Participants write one assumption; no report-back. |
| 1:45–2:00 | Finish the volume warning. Advance to the asset inventory. |

The acceptance comparison was already computed on slide 10. For a separate five-minute workshop walkthrough, use the extra three minutes to recompute acceptance at 45% and discuss a router that halves inference at unchanged acceptance: at 10×, $110 / 750 = $0.1467. This extension is not part of the 40-minute route.

**Expected outcome:** The audience sees why cost per call, net invoice, and cost per accepted outcome answer different questions. Halving usage can reduce sensitivity, but the teaching example does not establish that a real optimization preserves quality or is worth building.

**Honest limits:** No revenue, taxes, fixed overhead, recovery labor, uncertainty, demand response, or provider profitability model. The 75% rate is a fixture, not a measured pass rate. Multipliers are stress cases, not forecasts. The assumed 50% consumption reduction is unmeasured. If acceptance or costs vary with load, this one-variable calculation is incomplete.

**Presentation:** The printed table is the primary artifact. Keep a local copy for projection or handout; there is no separate tool to fall back from.
