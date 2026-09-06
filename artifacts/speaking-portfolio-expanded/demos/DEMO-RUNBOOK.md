# Offline stage kit

Open `index.html` in a browser. Keep `demo-logic.js` beside it. No server, API key, internet connection or installation is required. Select the matching talk in the top navigation and use browser full-screen mode for projection.

These are **interactive deterministic demonstrations with synthetic inputs**, not a live agent, tutor, model benchmark or field experiment. The learner dialogue is a scripted replay. They demonstrate a decision and its boundaries while keeping the mechanics inspectable.

## 1. A Skeptic's Guide to Surviving AI in Education

**Three minutes.** Begin with “Spelling without assistance.” The result says Preserve. Switch to “Strength of an argument” and then “Scientific explanation.” The same general assistance changes category as the capability under assessment changes.

Ask the audience to name evidence that would demonstrate the intended capability. Explain that formatting can be incidental while source interpretation remains central. The categories apply to a learning objective and a stage of learning. They are not permanent labels attached to a task.

**Expected outcome:** Preserve, Augment, Delegate. This is a framework exercise, not evidence that these choices improve learning outcomes in every context.

## 2. Automating Improvement From Failure

**Two to four minutes, guardrail slide only.** The talk's spine is a scheduled agent reading logs; this kit shows what happens once that loop proposes a fix. Start with the connection-refused error. Switch ports to show normalization retrieving the same prior case. Ask whether similarity establishes root cause. It does not.

Click Evaluate proposed promotion with all gates unchecked. The fix stays in review. Check the regression test only, then the holdout. It still stays in review until scope matches. With all three checked, the scoped readiness check can be promoted. Switch to the permission error: it has no known resolution.

**Expected outcome:** Similarity retrieves a candidate lesson. Separate verification gates control promotion. Say on stage that money, data deletion, and customer messaging get a fourth gate the kit does not show: a person. Checkboxes represent evidence a real system must collect; clicking them does not run tests or establish a causal diagnosis.

## 3. Resource-policy exercise

This standalone exercise covers strategy selection and caps. For the current talks, use the [adaptive recovery walkthrough](../packets/adaptive-systems/demo.md) or [dynamic-scaling walkthrough](../packets/dynamic-scaling/demo.md).

**Four minutes.** Show the known status lookup with no model agent. Select a routine task, then a novel intermittent failure. The selected organization changes. For the novel case, lower the budget to $0.10 or the deadline to five seconds. The system stops because the modeled strategy does not fit.

Toggle the consequential-action gate. It routes to a human decision rather than treating budget as authorization. Human time and cost remain outside the displayed estimate.

**Expected outcome:** A deterministic policy chooses between modeled strategies and enforces caps. Prices, timings and capabilities are synthetic. A production implementation needs evidence that each eligible strategy satisfies the workload.

## 4. Cry Me a Free Tier

**Four minutes.** Defaults: 1,000 monthly attempts, $0.02 inference and $0.01 other costs per attempt, 75% success. Read the 1× row, then the 10× row. Total monthly costs are $30 and $210. Costs per successful outcome are $0.040 and $0.280.

Increase the success rate or change the inference component to expose which assumption matters. Ask whether current retail prices are an acquisition subsidy, an indicator of declining costs, or a mix. The calculator cannot answer that question.

**Expected outcome:** A sensitivity scenario, not a forecast. Quality stays fixed as price changes. The model omits capacity limits, customer demand changes and any labor not entered under other costs.

## 5. Outsmart Your Lying, Cheating Students

**Four minutes.** Reveal the two identical artifacts, then click through the follow-up questions. Learner A identifies assumptions and possible confounders. Learner B initially offers confidence without evidence, then asks for a smaller example.

Ask what additional support or evidence would help. Offer a written alternative to speaking. Avoid inferring misconduct, a disability, or a final grade from the scripted responses. The point is to collect richer evidence and choose the next teaching step.

**Expected outcome:** The same artifact can lead to different follow-up questions. A scripted conversation does not validate automated assessment or establish learning gains.

## 6. The Future of Product Engineering

**Four minutes.** Select Pressure copy: activation rises from 40% to 48%, but support contacts rise from 3% to 9%, beyond the 5% ceiling. False urgency independently violates the selected product principle.

Raise the support ceiling to 10% and show that the principle still rejects it. Permit false urgency to reveal what removing that constraint allows. Restore the constraints and select Clearer first step: activation 45%, support 4%, and no false urgency. The result says Eligible for human review, not Ship.

**Expected outcome:** The objective function includes explicit constraints. These point estimates are synthetic; no sample size, significance test, causal claim, rollout, or live customer data is involved.

## Rehearsal and recovery

Reload the page to reset every control. Practice with the projector's resolution and browser zoom. The companion track-specific `demo.md` files contain additional worked exercises and discussion variants. The slide notes support a fully spoken fallback if the browser is unavailable.

## Verification frame

The implementation prioritizes deterministic, inspectable behavior. Quality means selecting the expected branch and preserving the stated limits. Cost and speed values inside routing are illustrative. Actual inference cost is zero because the kit makes no model calls. Other criteria include no external transmission, a clear simulation label, keyboard-operable controls, and refusal to label review eligibility as deployment authorization.

The included Bun tests cover normalization, unknown failures, three promotion gates, routing caps, human escalation, costs per successful outcome, invalid inputs, and the product guardrails. Run from this directory: `bun test demo.test.js`. These tests validate the demo mechanics, not any model, educational intervention, or production system.
