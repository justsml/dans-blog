# The Future of Product Engineering: Feedback Systems

30 minutes · 11 slides

**In one line.** A product organization is a feedback system. Shorten the loop, keep the steering wheel.

**Arc.** Warm open on the stalled meeting, steady through hypothesis and contract, build through the wrong-objective warning, peak at the demo, steady through delay and instrumentation, land back in the meeting.

**Scope.** Fictional meeting and onboarding case; synthetic demo numbers that show policy enforcement, not significance. Say it once on slide 1.

**Demo.** [Runbook section 6](../demos/DEMO-RUNBOOK.md#6-the-future-of-product-engineering) · [Kit](../demos/index.html). Fallback: the table on slide 6.

**Before each delivery.** Fill the `Story` lines.

**Image style.** Dark slate background, one amber accent, flat vector, generous negative space, no text or logos. Each slide comment is a complete prompt.

**Timings** are rehearsal targets, no Q&A. Notes are cues.

---

## 1. A product organization is a feedback system

0:00–2:30 · warm

<!-- image: a meeting table with three people each holding up a different shaped chart, the charts do not fit together, a wall clock behind them, dark slate background, amber accent on the clock, flat vector, no text -->

> Shorter loops. Explicit boundaries.

A weekly product meeting stalls. Support thinks onboarding is confusing; analytics sees an activation drop; sales wants more invitations. Everybody has a signal; nobody shares an explanation. How long does it take this organization to go from signal to defensible decision?

Scope, once: fictional meeting, synthetic numbers, policy behavior only.

Story: [the meeting where three teams had three true explanations and nobody could pick]

## 2. Map the missing feedback; keep the disagreement

2:30–6:00 · warm

<!-- image: a loop of pipes with two visible gaps where water is spilling, three separate faucets feeding the loop from different directions, dark slate background, amber accent on one gap, flat vector, no text -->

> Signal → interpretation → action → behavior → evidence → decision → memory
> Support: confusing sequence · Sales: missing team value · Analytics: cohort changed

Draw the loop; ask where the organization waits. Evidence sits in support software, decisions live in meetings, results vanish into dashboards. Those gaps are the automation candidates. In the onboarding case, repeated integration visits were observed and nobody connected them to the invitation step.

Then the three explanations, equal airtime. A synthesis agent preserves them with source links instead of producing consensus. What evidence would tell them apart? Behavior within stable cohorts; interviews with users who stopped at different points. The research step creates testable uncertainty and stops the first persuasive story from becoming the roadmap.

## 3. Make the hypothesis falsifiable

6:00–8:30 · steady

<!-- image: a glass beaker with a single clear hypothesis card inside, a small hammer resting beside it, dark slate background, amber accent on the hammer, flat vector, no text -->

> If we clarify the first useful step,
> more new users complete it, without extra support demand

Who sees the change, what "first useful action" means, and the counter-hypothesis: maybe the missing integration is the problem and copy cannot fix it. Microsoft's guidance supports disciplined hypotheses and complementary metric categories. The room should be able to say what result kills the idea.

Source: Microsoft ExP (2021), [Patterns of trustworthy experimentation: pre-experiment stage](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-pre-experiment-stage/).

## 4. The experiment is a contract

8:30–10:30 · steady

<!-- image: a three-way handshake drawn as three hands meeting over a single signed sheet, dark slate background, amber accent on the signature line, flat vector, no text -->

> Hypothesis and primary metric · Guardrails and exposure
> Stopping rule and rollback · Named decision owner

A contract between implementer, analyst, and owner: population, randomization unit, duration or sequential method, primary metric, guardrails, rollback. Thresholds set before looking at results. "No fabricated urgency" sits beside operational metrics. The contract says which decisions an agent may make.

## 5. Fast loops can amplify the wrong objective

10:30–12:30 · build

<!-- image: a thermostat wired to a thermometer that sits outside the window in the snow, the radiator inside glowing red, dark slate background, amber accent on the radiator, flat vector, no text -->

> Clicks are easy to count
> Trust is easier to spend than rebuild

Correcting more often is harmful when the sensor measures the wrong thing. A system rewarded for invitations adds pressure, gets low-quality signups and support load, and optimizes harder. Faster response makes the choice of objective and the reliability of feedback more consequential.

## 6. Demo: let the audience pick the winner

12:30–17:30 · peak

<!-- image: a podium with three places, the tallest position has a barrier gate closed in front of it, the second position has an open gate and a small review stamp hovering, dark slate background, amber accent on the closed gate, flat vector, no text -->

| Candidate | Activation | Support | Urgency |
| --- | --- | --- | --- |
| Control | 40% | 3% | None |
| Pressure copy | 48% | 9% | False |
| Clear first step | 45% | 4% | None |

Follow [runbook section 6](../demos/DEMO-RUNBOOK.md#6-the-future-of-product-engineering). Activation first; show of hands. Then support and urgency. Apply the 5% ceiling and the urgency rule. Pressure copy blocked; clear first step eligible for review. The policy was defined before the scorecard, so the system cannot move the goalposts.

Compression: at two minutes, the table and the block only.

## 7. Gates are not a shipping decision, and feedback has a delay

17:30–20:30 · steady

<!-- image: a green traffic light with a second smaller signal beneath it still showing a spinning hourglass, dark slate background, amber accent on the hourglass, flat vector, no text -->

> Eligible for review · Evidence can still be insufficient · Owner weighs tradeoffs
> Activation appears early · Retention arrives later · Support lags exposure

A candidate that avoids violations may still be underpowered or strategically irrelevant. The owner ships, continues under the plan, investigates data quality, or rejects. The agent assembles the packet and flags missing fields.

And a fast loop cannot make every outcome arrive faster. Represent pending evidence instead of treating an incomplete window as zero. Keep the plan stable unless a predefined safety stop triggers.

Ask (30 s): which of your success metrics arrives sooner than the harm it might cause?

Story: [a metric that looked great for two weeks]

## 8. Instrumentation is part of the treatment

20:30–22:30 · steady

<!-- image: two identical funnels side by side, one with a hidden extra hole near its rim, water levels below them visibly different, dark slate background, amber accent on the hidden hole, flat vector, no text -->

> Verify assignment · Verify event meaning
> Check sample ratios · Inspect denominators

A logging change that records onboarding more reliably in the treatment arm produces an uplift with no real improvement. Validate assignment and event semantics first; investigate sample ratio mismatch rather than dismissing it.

Source: Microsoft ExP (2021), [Patterns of trustworthy experimentation: post-experiment stage](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-post-experiment-stage/).

## 9. Bounds on nudges; examples for taste

22:30–25:30 · steady

<!-- image: a doorbell with a small counter dial beside it set to a low number, above the door two framed pictures, one of an open hand and one of a stopwatch crossed out, dark slate background, amber accent on the counter dial, flat vector, no text -->

> Useful help at the right moment · Frequency caps · Respect opt-outs · Review external messages
> Principle: earn the next action · Allowed: explain the useful step · Forbidden: invent a deadline

A stalled account might benefit from contextual help; repeated nudges turn assistance into noise. Bounded interventions, preferences respected, external messages behind review with a logged reason. A successful activation metric does not justify violating preferences.

Then taste. Contrasting examples make a principle applicable. A human owns disputed cases; automated judgments get compared with that person's periodically. A taste score is an aid, not authority.

Story: [a principle your team could only articulate as a pair of examples]

## 10. Remember the decision, not just the metric

25:30–27:30 · land

<!-- image: a bound logbook open to a page with a hypothesis sketch, a result, a signature, and a small future date circled, dark slate background, amber accent on the circled date, flat vector, no text -->

> Hypothesis and segment · Evidence and uncertainty
> Human decision and rationale · Expiry or revisit trigger

Capture the experiment, population, scorecard, surprise, decision, and revisit condition. Link the shipped or rejected candidate. No universal lessons from one narrow test. The next research agent retrieves this before proposing similar work.

## 11. Shorten the loop. Keep the steering wheel.

27:30–30:00 · land

<!-- image: the meeting table from slide 1, the three people now looking at one shared folder, the wall clock showing an earlier time, dark slate background, amber accent on the folder, flat vector, no text -->

> Machines prepare evidence and options
> Rules constrain execution
> Humans own the product promise

Back to the meeting. Support, analytics, and sales share an evidence packet, explicit hypotheses, and an owner who can decide. They may still disagree; the disagreement is now productive and traceable.

Map one product loop, find its slowest evidence transfer, and write one nonnegotiable constraint.
