# Offline stage kit

Open `index.html` in a browser. Keep `demo-logic.js` beside it. No server, API key, internet connection or installation is required. Select the matching talk in the top navigation and use browser full-screen mode for projection.

These are **interactive deterministic demonstrations with synthetic inputs**, not a live agent, tutor, model benchmark or field experiment. The learner dialogue is a scripted replay. They demonstrate a decision and its boundaries while keeping the mechanics inspectable.

## 1. Learning-goals exercise

**Not booked to a current talk.** A Skeptic's Guide was retired on 6 September 2026 and its replacement, [Show Me the Misconception](../talks/evidence-learning/procurement-route.md), runs without a demo kit — if that room wants a live moment, use the four index cards from its section 4 instead. Keep this panel as a standalone exercise for workshops and office hours, in the same spirit as the resource-policy panel below.

**Four and a half minutes**; compress to two by running one switch and stating the other two. Begin with “Spelling without assistance.” The result says Preserve. Switch to “Strength of an argument” and then “Scientific explanation.” The same general assistance changes category as the capability under assessment changes.

Ask the audience to name evidence that would demonstrate the intended capability. Explain that formatting can be incidental while source interpretation remains central. The categories apply to a learning objective and a stage of learning. They are not permanent labels attached to a task.

**Expected outcome:** Preserve, Augment, Delegate. This is a framework exercise, not evidence that these choices improve learning outcomes in every context.

## 2. Automating Improvement From Failure

**Two to four minutes, guardrail slide only.** The talk's spine is a scheduled agent reading logs; this kit shows what happens once that loop proposes a fix. Start with the connection-refused error. Switch ports to show normalization retrieving the same prior case. Ask whether similarity establishes root cause. It does not.

Click Evaluate proposed promotion with all gates unchecked. The fix stays in review. Check the regression test only, then the holdout. It still stays in review until scope matches. With all three checked, the scoped readiness check can be promoted. Switch to the permission error: it has no known resolution.

**Expected outcome:** Similarity retrieves a candidate lesson. Separate verification gates control promotion. Say on stage that money, data deletion, and customer messaging get a fourth gate the kit does not show: a person. Checkboxes represent evidence a real system must collect; clicking them does not run tests or establish a causal diagnosis.

## 3. Resource-policy exercise

This standalone exercise covers strategy selection and caps. For the current talks, use the [adaptive recovery walkthrough](../talks/adaptive-systems/demo.md) or [dynamic-scaling walkthrough](../talks/dynamic-scaling/demo.md).

**Four minutes.** Show the known status lookup with no model agent. Select a routine task, then a novel intermittent failure. The selected organization changes. For the novel case, lower the budget to $0.10 or the deadline to five seconds. The system stops because the modeled strategy does not fit.

Toggle the consequential-action gate. It routes to a human decision rather than treating budget as authorization. Human time and cost remain outside the displayed estimate.

**Expected outcome:** A deterministic policy chooses between modeled strategies and enforces caps. Prices, timings and capabilities are synthetic. A production implementation needs evidence that each eligible strategy satisfies the workload.

## 4. Buy Me a Free Tier

**Four minutes**, on slide 11 of the 40-minute route. Defaults: 1,000 monthly attempts, $0.02 inference and $0.01 other costs per attempt, 75% accepted. Read the 1× row, then the 10× row. Total monthly costs are $30 and $210. Costs per accepted outcome are $0.040 and $0.280.

Then do the beat the slide leads with. Restore 1× and move acceptance from 75% to 45%: cost per accepted outcome goes to $0.0667, the same number as the 2× row, with no price change at all. A thirty-point acceptance drop costs exactly what doubling every token price costs; one of those is on the front page and the other is a Tuesday. Restore 75% before moving on.

Change the inference component to expose which assumption matters. Ask whether current retail prices are an acquisition subsidy, an indicator of declining costs, or a mix. The calculator cannot answer that question.

**Expected outcome:** A sensitivity scenario, not a forecast. Quality stays fixed as price changes. The model omits capacity limits, customer demand changes and any labor not entered under other costs.

## 5. Outsmart Your Lying, Cheating Students

**Four minutes inside the five-minute slide 7**; compress to two by skipping the kit, running only the $100 sequence and stating the $80 item aloud.

Fixture, already on slide 4: a shop raises a $100 price by 20%, then discounts the new price by 20%, and the learner writes "equal and opposite, so the final price is $100." Clean sentence, wrong base. Reveal that argument first and let the room find the base before you open the kit.

Five scripted turns, one click each:

| Turn | Tutor | Learner | What it adds |
| --- | --- | --- | --- |
| Diagnostic question | "Which price does the discount use?" | "The original $100." | A specific mistaken base, which the final number alone would not show. |
| Conceptual hint | "What is the price after the increase? Apply the discount to that current price." | "$120." | Support given is visible and recorded. |
| Supported correction | "So what is the final price, and why?" | "$120 times 0.8 is $96. I used the wrong starting amount." | Supported correction with an explanation. |
| Transfer item | "Now start at $80, increase 25%, then decrease 20%. Explain why this one returns to its start." | "It reaches $100, then $80. 1.25 times 0.8 equals 1." | Immediate transfer, and it breaks the shortcut the room just formed. |
| The record | "What would you record, and what remains unknown?" | Concept, observation, support, next check. | Retention and unaided performance stay unknown. |

Reveal $120 only after the diagnostic question. Ask the room for $96 and one sentence explaining it. Then change the numbers to $80, up 25%, down 20%, and let the return to $80 break "opposite changes never cancel" — a transfer item with the same invariant and different numbers is where you find out whether they learned the rule or memorized the example. If the room is quiet, present the prepared learner response; never pressure an individual into a public assessment.

The rubric and the four-line record are on slide 8; the written turns are also in the [education walkthrough](../talks/evidence-learning/demo.md) if you would rather read from a card than open the browser.

**Expected outcome:** Assistance and the corrected explanation are recorded separately, and the transfer item is answered under known conditions. A scripted conversation does not validate automated assessment, assign a real grade, or establish learning gains.

## 6. The Future of Product Engineering

**Five minutes in the 40/30 routes; 3:30 in the 15.** Begin on full-deck slide 11, which shows only A/B/C activation. Take the vote before opening the kit. Then map B to Pressure copy and C to Clearer first step. Select Pressure copy: activation rises from 40% to 48%, but support contacts rise from 3% to 9%, beyond the 5% ceiling. False urgency independently violates the selected product principle.

Raise the support ceiling to 10% and show that the principle still rejects it. Permit false urgency to reveal what removing that constraint allows. Restore the constraints and select Clearer first step: activation 45%, support 4%, and no false urgency. The result says Eligible for human review, not Ship.

**Expected outcome:** The objective function includes explicit constraints. These point estimates are synthetic; no sample size, significance test, causal claim, rollout, or live customer data is involved.

Allow the final 45 seconds of the five-minute route for participants to write the rule they needed. See the [product stage sequence](../talks/free-tier/demo.md).

## Rehearsal and recovery

Reload the page to reset every control. Practice with the projector's resolution and browser zoom. The companion track-specific `demo.md` files contain additional worked exercises and discussion variants. The slide notes support a fully spoken fallback if the browser is unavailable.

## Verification frame

The implementation prioritizes deterministic, inspectable behavior. Quality means selecting the expected branch and preserving the stated limits. Cost and speed values inside routing are illustrative. Actual inference cost is zero because the kit makes no model calls. Other criteria include no external transmission, a clear simulation label, keyboard-operable controls, and refusal to label review eligibility as deployment authorization.

The included Bun tests cover normalization, unknown failures, three promotion gates, routing caps, human escalation, costs per successful outcome, invalid inputs, and the product guardrails. Run from this directory: `bun test demo.test.js`. These tests validate the demo mechanics, not any model, educational intervention, or production system.
