# The Future of Product Engineering: Feedback Systems

30 minutes · 14 slides

**Talk in one line.** A product organization is a feedback system. Shorten the loop, keep the steering wheel.

**Scope and claims (say once, on slide 1).** The opening meeting and the onboarding case are fictional. The demo is a deterministic replay with synthetic numbers that shows policy enforcement, not significance or a production result. After slide 1, argue plainly.

**Demo.** [Runbook section 6](../demos/DEMO-RUNBOOK.md#6-the-future-of-product-engineering) · [Open the kit](../demos/index.html). Fallback: the table on slide 7.

**Story slots.** Lines marked `Story:` need a first-hand example before rehearsal.

**Timings** are rehearsal targets, excluding Q&A. Notes are cues, not a script.

---

## 1. A product organization is a feedback system

0:00–2:00

> Shorter loops. Explicit boundaries.

**Say:** A weekly product meeting stalls. Support thinks onboarding is confusing; analytics sees an activation drop; sales wants more invitations. Everybody has a signal; nobody shares an explanation. How long does it take this organization to go from signal to defensible decision?

**Say (scope, once):** Fictional meeting, synthetic demo numbers, policy behavior only. That is the caveat; from here on, the design.

**Story:** [The meeting where three teams had three true explanations and nobody could pick.]

## 2. Map the missing feedback

2:00–4:00

> Signal → interpretation → action
> Action → behavior → evidence
> Evidence → decision → memory

**Say:** Draw the loop; ask where the organization waits. Evidence sits in support software; decisions live in meetings; results vanish into dashboards. Those gaps are automation candidates because they impede learning. In the onboarding case: repeated integration visits were observed, but nobody connected them to the invitation step.

## 3. Do not compress away disagreement

4:00–6:00

> Support: confusing sequence · Sales: missing team value
> Analytics: cohort changed · All three plausible

**Say:** A synthesis agent preserves the alternatives with source links instead of producing consensus. Ask what evidence would distinguish them: behavior within stable cohorts, interviews with users who stopped at different points. The research step creates testable uncertainty and stops the first persuasive story from becoming the roadmap.

## 4. Make the hypothesis falsifiable

6:00–8:00

> If we clarify the first useful step,
> more new users complete it, without extra support demand

**Say:** Specify who sees the change, what "first useful action" means, and the counter-hypothesis: maybe the missing integration is the problem and copy cannot fix it. Microsoft's guidance supports disciplined hypotheses and complementary metric categories. The audience should be able to say what result kills the idea.

Source: Microsoft ExP (2021), [Patterns of trustworthy experimentation: pre-experiment stage](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-pre-experiment-stage/).

## 5. The experiment is a contract

8:00–10:00

> Hypothesis and primary metric · Guardrails and exposure
> Stopping rule and rollback · Named decision owner

**Say:** A contract between implementer, analyst, and owner: population, randomization unit, duration or sequential method, primary metric, guardrails, rollback. Thresholds set before looking at results. "No fabricated urgency" sits beside operational metrics. The contract says which decisions an agent may make.

## 6. Fast loops can amplify the wrong objective

10:00–12:00

> Clicks are easy to count
> Trust is easier to spend than rebuild

**Say:** Control-system analogy: correcting more often is harmful when the sensor measures the wrong thing. A system rewarded for invitations adds pressure, gets low-quality signups and support load, and optimizes harder. Faster response makes the choice of objective and the reliability of feedback more consequential.

## 7. Demo: let the audience pick the winner

12:00–17:00

| Candidate | Activation | Support | Urgency |
| --- | --- | --- | --- |
| Control | 40% | 3% | None |
| Pressure copy | 48% | 9% | False |
| Clear first step | 45% | 4% | None |

**Show:** Follow [runbook section 6](../demos/DEMO-RUNBOOK.md#6-the-future-of-product-engineering). Activation first.

**Ask (30 s):** Show of hands.

**Show:** Support and urgency. Apply the 5% ceiling and the urgency rule. Pressure copy blocked; clear first step eligible for review. The policy was defined before the scorecard, so the system cannot move the goalposts.

**Compression plan:** at 2 minutes, show the table and the block only.

## 8. Passing gates is not a shipping decision

17:00–19:00

> Eligible for review · Evidence can still be insufficient
> Owner weighs tradeoffs · Decision records why

**Say:** Blocking conditions versus positive evidence. A candidate that avoids violations may still be underpowered or strategically irrelevant. The owner ships, continues under the plan, investigates data quality, or rejects. The agent assembles the packet and flags missing fields.

## 9. Feedback has a delay

19:00–21:00

> Activation appears early · Retention arrives later
> Support lags exposure · Respect the window

**Say:** A fast loop cannot make every outcome arrive faster. Represent pending evidence instead of treating an incomplete window as zero. Keep the plan stable unless a predefined safety stop triggers.

**Ask (30 s):** Which of your success metrics arrives sooner than the harm it might cause?

## 10. Instrumentation is part of the treatment

21:00–23:00

> Verify assignment · Verify event meaning
> Check sample ratios · Inspect denominators

**Say:** A logging change that records onboarding more reliably in the treatment arm produces an uplift with no real improvement. Validate assignment and event semantics first; investigate sample ratio mismatch rather than dismissing it.

Source: Microsoft ExP (2021), [Patterns of trustworthy experimentation: post-experiment stage](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-post-experiment-stage/).

## 11. Activation and reactivation need bounds

23:00–25:00

> Useful help at the right moment · Frequency caps
> Respect opt-outs · Review external communication

**Say:** A stalled account might benefit from contextual help; repeated nudges turn assistance into noise. Bounded interventions, preferences respected, external messages behind review with a logged reason. A successful activation metric does not justify violating preferences.

## 12. Taste needs examples and owners

25:00–27:00

> Principle: earn the next action
> Allowed: explain the useful step · Forbidden: invent a deadline

**Say:** Contrasting examples make a principle applicable. A human owns disputed cases; automated judgments are periodically compared with that person's. A taste score is an aid, not authority.

**Story:** [A principle your team could only articulate as a pair of examples.]

## 13. Remember the decision, not just the metric

27:00–28:30

> Hypothesis and segment · Evidence and uncertainty
> Human decision and rationale · Expiry or revisit trigger

**Say:** Capture the experiment, population, scorecard, surprise, decision, and revisit condition. Link the shipped or rejected candidate. Avoid universal lessons from one narrow test. The next research agent retrieves this before proposing similar work.

## 14. Shorten the loop. Keep the steering wheel.

28:30–30:00

> Machines prepare evidence and options
> Rules constrain execution
> Humans own the product promise

**Say (close):** Back to the meeting. Support, analytics, and sales now share an evidence packet, explicit hypotheses, and an owner who can decide. They may still disagree; the disagreement is now productive and traceable.

**Ask (close):** Map one product loop, find its slowest evidence transfer, and write one nonnegotiable constraint.
