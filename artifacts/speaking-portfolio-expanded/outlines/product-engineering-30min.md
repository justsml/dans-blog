# The Future of Product Engineering

30 minutes · 14 slides · 30min

Timings are rehearsal targets, excluding Q&A. Speaker notes are delivery guidance, not a verbatim script.

## 1. A Product Organization Is a Feedback System

0.0–1.5 minutes

The Future of Product Engineering
Shorter loops. Explicit boundaries.

Open at the point where a weekly product meeting stalls. In this fictional scene, support thinks onboarding is confusing, analytics sees an activation drop, and sales wants more invitations. Everybody has a signal; nobody shares an explanation. Ask how long it takes this organization to move from a signal to a defensible decision. This version treats that delay as a system design problem. The objective is faster learning with visible controls, rather than simply generating more experiments or replacing the people who own product direction.

## 2. Map the missing feedback

1.5–3.5 minutes

Signal → interpretation → action
Action → behavior → evidence
Evidence → decision → memory

Draw the loop and ask where a typical organization waits. Customer evidence may sit in support software while product decisions live in meetings and experiment results disappear into dashboards. Those gaps are candidates for automation because they impede learning, not because every manual activity is waste. Use the onboarding case to identify one missing connection: repeated integration visits were observed, but no one connected them to the invitation sequence. Treat this as a hypothesis to investigate rather than an analytical conclusion.

## 3. Do not compress away disagreement

3.5–5.5 minutes

Support says: confusing sequence
Sales says: missing team value
Analytics says: cohort changed
All three can be plausible

Give three explanations equal airtime. The same drop in activation could reflect confusing onboarding, weak team value, or a changed acquisition mix. A synthesis agent should preserve those alternatives with source links instead of producing a tidy consensus. Ask what evidence would distinguish them. For example, inspect behavior within stable acquisition cohorts and interview users who stopped at different points. This is the value of the research step: create testable uncertainty, keep provenance, and prevent the first persuasive narrative from becoming the roadmap.

## 4. Make the hypothesis falsifiable

5.5–7.5 minutes

If we clarify the first useful step
more new users will complete it
without extra support demand

Translate the broad complaint into a narrow experiment proposal. Specify who sees the change, what first useful action means, and which supporting evidence made this plausible. Include a counter-hypothesis: perhaps the issue is the missing integration itself, which copy cannot repair. Microsoft experimentation guidance emphasizes clear hypotheses and complementary metric categories. Use that as support for disciplined experiment design, not as evidence that this particular onboarding idea works. The audience should be able to explain what result would cause the team to abandon the idea.

Sources: [Reference](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-pre-experiment-stage/)

## 5. The experiment is a contract

7.5–9.5 minutes

Hypothesis and primary metric
Guardrails and exposure
Stopping rule and rollback
Named decision owner

Treat an experiment proposal as a contract between the implementer, analyst, and accountable owner. It specifies the population, randomization unit, planned duration or sequential method, primary metric, guardrails, and rollback. Set thresholds before looking at treatment results. Product-specific constraints such as no fabricated urgency sit alongside operational metrics. The contract also states which decisions an agent may make and which require human review. This reduces ambiguous handoffs without assuming that a schema alone guarantees a trustworthy experiment or a worthwhile product change.

## 6. Fast loops can amplify the wrong objective

9.5–11.5 minutes

Clicks are easy to count
Trust is easier to spend than rebuild
Local success can create system cost

Use an ordinary control-system analogy: making corrections more often is unhelpful when the sensor measures the wrong thing. A system rewarded for invitations may add pressure that creates low-quality signups and extra support. More frequent optimization can reinforce that mistake. Avoid promising a single metric for trust; instead name observable guardrails, prohibited patterns, qualitative review, and longer-term outcomes. The central systems lesson is that increased response speed makes the choice of objective and the reliability of feedback more consequential.

## 7. Let the audience pick the winner

11.5–15.5 minutes

Control: 40% activation, 3% support
Pressure: 48% activation, 9% support
Clear step: 45% activation, 4% support
Synthetic fixture; no causal claim

Run the four-minute product demonstration. Reveal activation first and invite a show of hands, then show support rates and the false-urgency flag. Apply the five-percent support ceiling and the rule against fabricated urgency. Pressure copy is blocked; the clearer first-step candidate is eligible for human review. Explicitly state that these invented aggregates demonstrate policy enforcement, not significance, a causal estimate, or a production result. The twist is that the policy was defined before the scorecard, so the system cannot move the goalposts to protect its favorite candidate.

| Candidate | Activation | Support | Urgency |
| --- | --- | --- | --- |
| Control | 40% | 3% | None |
| Pressure copy | 48% | 9% | False |
| Clear first step | 45% | 4% | None |

## 8. Passing gates is not a shipping decision

15.5–17.5 minutes

Eligible for review
Evidence can still be insufficient
Owner weighs tradeoffs
Decision records why

Distinguish blocking conditions from positive evidence. An experiment that violates a hard constraint should not advance. One that avoids violations may still be underpowered, strategically irrelevant, or poorly understood. The decision owner records whether to ship, continue observing under the existing plan, investigate data quality, or reject the treatment. An agent can assemble that evidence packet and flag missing fields. The improvement is a better decision process, not an automatic green light whenever a score exceeds an arbitrary threshold.

## 9. Feedback has a delay

17.5–19.5 minutes

Activation appears early
Retention arrives later
Support can lag exposure
Respect the observation window

Explain why a fast product loop cannot make every outcome arrive faster. A new user can activate today while retention requires later observation, and support contacts may follow delayed confusion. The system must represent pending evidence instead of turning an incomplete window into a zero. Keep the experiment plan stable unless a predefined safety stop triggers. Ask the audience which of its current success metrics is available sooner than the harm it might cause. That mismatch should influence rollout speed and the human review schedule.

## 10. Instrumentation is part of the treatment

19.5–21.5 minutes

Verify assignment
Verify event meaning
Check sample ratios
Inspect denominators

Describe a fictional logging change that records successful onboarding more reliably in the treatment arm. The dashboard may report an uplift even though the customer experience has not improved. Microsoft researchers document this class of telemetry and denominator problems. The implication is concrete: validate assignment and event semantics before interpreting outcomes, and investigate sample ratio mismatch rather than dismissing it as a dashboard detail. Passing a ratio check is necessary in this design but does not establish that every other source of bias has been removed.

Sources: [Reference](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-post-experiment-stage/)

## 11. Activation and reactivation need bounds

21.5–23.5 minutes

Useful help at the right moment
Frequency caps and preferences
Respect opt-outs
Review external communication

Move beyond the experiment to the follow-up loop. A stalled account might benefit from contextual help, but repeatedly nudging a user can turn assistance into noise. Give an agent access to relevant product events and customer preferences, with a bounded set of proposed interventions. Put external communication behind the organization's chosen review process and log the reason for any approved message. A successful activation metric does not justify violating preferences. The system's objective includes whether the intervention supports the customer's task, not simply whether it attracts a click.

## 12. Taste needs examples and owners

23.5–25.5 minutes

Principle: earn the next action
Allowed: explain the useful step
Forbidden: invent a deadline
Review disputed cases

Show how an abstract product value becomes operational. The principle is to earn the next action. The allowed example explains what a user can accomplish; the forbidden example invents urgency. A small set of contrasting examples helps reviewers and evaluators apply the principle consistently. Keep a human owner for disputed cases and periodically compare automated judgments with that person's decisions. A numerical taste score is an aid, not authority. This makes product values inspectable while leaving room for context and deliberate changes in strategy.

## 13. Remember the decision, not just the metric

25.5–27.5 minutes

Hypothesis and segment
Evidence and uncertainty
Human decision and rationale
Expiry or revisit trigger

Finish the feedback loop with a durable decision record. Capture the experiment, the population, the scorecard, what was surprising, what the owner decided, and what would justify revisiting it. Link the shipped implementation or rejected candidate so future agents can inspect what actually changed. Avoid universal lessons such as pressure never works from one narrow test. Store scope and uncertainty. The next research agent should retrieve this case when it proposes a similar intervention, saving the organization from relitigating the same incomplete story.

## 14. Shorten the loop. Keep the steering wheel.

27.5–30.0 minutes

Machines prepare evidence and options
Rules constrain execution
Humans own the product promise

Return to the opening meeting. Support, analytics, and sales now have a shared evidence packet, explicit hypotheses, and an owner who can make a bounded decision. They may still disagree; the system has made the disagreement productive and traceable. Ask the audience to map one product loop, identify its slowest evidence transfer, and write one nonnegotiable constraint. Close by separating learning speed from experiment count. A product organization improves when it makes better supported decisions sooner, while retaining responsibility for the experience it creates.

