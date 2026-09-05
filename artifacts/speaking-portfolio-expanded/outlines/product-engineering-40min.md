# The Future of Product Engineering

40 minutes · 18 slides · 40min

Timings are rehearsal targets, excluding Q&A. Speaker notes are delivery guidance, not a verbatim script.

## 1. Design the Product Learning Loop

0.0–1.5 minutes

The Future of Product Engineering
A technical blueprint with governors

Start with a concrete systems question: how would a product agent discover that onboarding confuses users, propose a change, and stop itself from shipping a manipulative version that raises activation? Promise an architecture whose intermediate artifacts can be inspected. The demo is a deterministic policy replay with synthetic numbers; the broader system is a proposed reference design. State the boundary early: the agent can prepare hypotheses and changes, but the product organization owns what it promises customers and which evidence is sufficient for release.

## 2. An executable loop needs durable state

1.5–3.5 minutes

Observe → hypothesize → prepare
Approve → expose → measure
Judge → record → learn

Name each state as a durable record, not just a function in a long agent conversation. A hypothesis has an identifier; an approval names the approved revision; exposure references an experiment configuration; a decision references a scorecard. This structure makes retries and audits understandable. If a process restarts after deployment, it should resume measurement rather than create a second experiment. Use the onboarding example as the record moving through the system. The architecture is useful even if the first implementation uses plain tables and a queue.

## 3. Ingest signals with provenance

3.5–5.5 minutes

Identity and time
Source and consent scope
Schema and confidence
Deletion and retention rules

Start the pipeline with product events and customer feedback that the organization is authorized to use. Normalize timestamps, identifiers, event versions, and links to source material. Retain enough provenance to inspect a claim without indiscriminately copying every customer conversation into a model context. Define access, retention, and deletion behavior alongside ingestion. An unresolved identity should remain unresolved rather than being guessed by a language model. Explain that confidence in a synthesized interpretation is different from confidence that an event was collected correctly.

## 4. Memory can begin as ordinary tables

5.5–7.5 minutes

Customer → segment → observation
Hypothesis → experiment → decision
Every claim keeps its source

Resist introducing a graph database merely because the conceptual model contains arrows. Tables with stable identifiers and explicit relationships may be sufficient. Store observations separately from generated interpretations, and connect decisions to the evidence available at the time. The key query is practical: have we tested a similar intervention on a comparable segment, and what happened? Include failed and rejected ideas. A memory that retains only successful launches creates selection bias and encourages future agents to repeat attractive mistakes.

## 5. Researchers produce evidence packets

7.5–9.5 minutes

Observation
Supporting and contrary evidence
Alternative explanations
Gaps requiring human research

Give the research step a constrained output rather than asking for a confident product recommendation. In the onboarding case, the packet includes integration visits, support complaints, cohort changes, and missing information. Require citations to internal source records and preserve contradictions. A reviewer can then inspect whether the proposed hypothesis follows from the evidence. The research agent should identify when a customer interview or domain expert is necessary. Automating synthesis cannot manufacture access to the customer's motives or make an observational correlation causal.

## 6. The hypothesis is a typed proposal

9.5–11.5 minutes

Segment and expected outcome
Primary metric and counter-hypothesis
Guardrails and estimated exposure
Evidence references and owner

Turn the packet into a structured proposal that can be validated before work starts. Include the affected segment, expected outcome, counter-hypothesis, metric definitions, constraints, planned exposure, and owner. A schema can reject missing fields, while human review considers whether the experiment is worth doing. Separate confidence in the idea from permission to act. The proposal might be perfectly well formed yet strategically wrong. Show the onboarding hypothesis as a small concrete instance: clarify the first useful step while keeping support demand within the agreed boundary.

## 7. Plan a portfolio, then control interference

11.5–13.5 minutes

Explore several cheap candidates
Limit concurrent exposure
Record overlapping experiments
Choose an analysis plan first

Parallel candidate generation is often easy because drafts do not affect customers. Parallel live experiments require more care: treatments can interact, share participants, or compete for scarce traffic. Distinguish independent prototype exploration from production assignment. Use an experiment registry to track eligible populations, dependencies, and overlaps. Choose a design and analysis plan appropriate to the question rather than letting an agent allocate traffic opportunistically. The system can reduce preparation time without claiming to abolish sample requirements, interference, or the need for statistical expertise.

## 8. Approved intent becomes a reversible change

13.5–15.5 minutes

Branch and feature flag
Tests and instrumentation
Approval tied to revision
Rollback prepared before exposure

Describe implementation as a bounded transaction. An agent prepares a branch, flags the behavior, adds meaningful tests and events, and produces a rollback path. Approval refers to the exact revision and experiment settings, so later edits cannot inherit permission accidentally. A deployment step must be idempotent and observable. External communication, pricing changes, or sensitive targeting follow their own authority boundaries. This is the point where ordinary engineering controls provide more value than another clever prompt. A generated patch is evidence to review, not an accomplished product outcome.

## 9. Verify the measuring instrument

15.5–17.5 minutes

Event schema and assignment
A/A or instrumentation checks
Sample ratio mismatch
Stable outcome definitions

Before exposure expands, test event emission, assignment persistence, and metric definitions. Use appropriate instrumentation checks or A/A tests to find measurement failures. Microsoft experimentation guidance treats sample ratio mismatch as a data quality signal requiring investigation. A balanced count does not prove correct randomization or complete logging, so keep multiple checks. In the onboarding flow, ensure that activation means the same completed action in both arms and that support events join to the right observation window. Otherwise the fastest agent can simply optimize a broken dashboard.

Sources: [Reference](https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/articles/patterns-of-trustworthy-experimentation-during-experiment-stage/)

## 10. Keep optimization and permission separate

17.5–19.5 minutes

Score candidate outcomes
Apply nonnegotiable gates
Check evidence sufficiency
Request the accountable decision

Split the evaluation engine into functions with different jobs. A scorecard describes measured outcomes. A policy layer rejects disallowed behavior. An evidence check determines whether the experiment is interpretable and complete. An accountable owner makes the release decision. Combining everything into one weighted score could allow enough activation uplift to compensate for a forbidden pattern. In this design, hard constraints cannot be bought off by a metric gain. Make the distinction visible in the output so a reviewer can see exactly why a candidate stopped.

## 11. Demo: the apparent winner is blocked

19.5–23.5 minutes

Pressure copy: 48% / 9% support
Clear first step: 45% / 4% support
Control: 40% / 3% support
All values are synthetic

Run the four-minute offline policy replay. Reveal the activation score before the support and false-urgency fields, ask the room to choose, then apply the rules. Pressure copy breaches the five-percent support ceiling and contains fabricated urgency, so it is blocked. The clearer first-step candidate passes those checks and becomes eligible for human review. Show that changing a threshold is a policy edit, not a reason to quietly rerun until a favorite passes. This demo proves deterministic gate behavior only; it does not establish statistical significance or customer benefit.

| Candidate | Activation | Support | Urgency |
| --- | --- | --- | --- |
| Control | 40% | 3% | None |
| Pressure copy | 48% | 9% | False |
| Clear first step | 45% | 4% | None |

## 12. A bandit is a different experimental design

23.5–26.0 minutes

Adaptive allocation can help
Naive A/B math may not apply
Log propensities and preserve holdouts
Use an appropriate inference method

Separate traffic optimization from causal estimation. Adaptive allocation can be useful for some objectives, but changing assignment probabilities affects analysis and reproducibility. Do not bolt ordinary fixed-horizon confidence intervals onto an arbitrary bandit. Preserve assignment logs and use methods suited to the actual design, with specialist review where needed. For a first version of this system, a well-designed randomized experiment may be easier to trust. The architecture should support a declared design, not give the planner permission to change statistical rules whenever a promising result appears.

## 13. Peeking changes the rules of inference

26.0–28.5 minutes

Fixed horizon: honor the plan
Sequential: use valid methods
Safety stops remain explicit
Multiple comparisons need treatment

Explain the temptation in agent terms: an always-on system can inspect results constantly and announce a winner at the first favorable moment. Repeatedly applying a fixed-horizon test that way does not preserve its original error guarantees. Johari, Pekelis, and Walsh develop always-valid inference for continuous monitoring. The lesson is to choose the method and stopping rules before launch. Safety stops for severe harm are operational controls, not evidence of an efficacy win. Multiple candidate selection also needs appropriate treatment; more generated experiments do not create free statistical certainty.

Sources: [Reference](https://arxiv.org/abs/1512.04922)

## 14. Taste tests are a mixed system

28.5–30.5 minutes

Deterministic interaction checks
Examples of acceptable voice
Calibrated model review
Human decisions on disputed cases

Use a concrete product principle: explain the next useful action without inventing urgency. Some violations can be checked through explicit flags or interface tests; subtle pressure in language requires interpretation. Keep reference examples and compare model evaluations with human judgments periodically. Log disagreement rather than converting an uncertain score into false precision. A testable product constraint does not mean aesthetic and ethical judgment is fully automated. The benefit is that product taste becomes discussable and reviewable instead of remaining an unwritten preference discovered only after a release.

## 15. Authority follows risk, not agent confidence

30.5–32.5 minutes

Low-risk synthesis can run
Exposure and messages need policy
Pricing and strategy have owners
Irreversible actions escalate

Do not confuse a model's self-reported certainty with authority. The same confident answer can be harmless in a research note and consequential in a customer-facing pricing change. Define action classes using reversibility, blast radius, sensitivity, money, and strategic significance. Give tools the narrow permissions needed for those classes. Approval should attach to specific proposed actions, while audit records show who authorized them. The product owner remains accountable even when software performs the mechanics. These boundaries let routine work move without forcing a human to inspect every intermediate token.

## 16. Capture a bounded lesson

32.5–34.5 minutes

What changed, for whom, and when
Result and uncertainty
Decision and rationale
Revisit trigger and superseded cases

When the experiment ends, write a scoped learning record with the hypothesis, segment, exposure, evidence, decision, and uncertainty. Record the implementation revision and any surprises. A lesson such as clearer onboarding helped this cohort under these conditions is more useful than a universal claim that shorter flows always win. Include an expiry or revisit trigger when product context changes. Later agents retrieve the record before proposing similar work. This is training the system through evidence and memory, without claiming that the underlying model has learned permanently.

## 17. Build the smallest trustworthy loop

34.5–36.5 minutes

One signal source
One hypothesis schema
One reversible experiment type
One accountable owner

Give the audience a credible first implementation. Choose a single signal source and one recurring product question. Build a hypothesis schema, a bounded experiment template, and an evidence packet for a named owner. Start with deterministic checks and a simple registry before adding many research agents or dynamic allocation. Measure time to a supported decision, not number of generated hypotheses. This makes failures diagnosable and keeps the learning objective visible. Expansion should follow evidence that the loop produces useful decisions without creating an unmanageable review burden.

## 18. Programmable learning needs human direction

36.5–40.0 minutes

Observe → understand → experiment
Measure → judge → remember
The product promise stays human-owned

Close the opening story. The system noticed onboarding friction, prepared an experiment, and correctly refused to promote the candidate that improved activation through unacceptable pressure. It did not discover the company's values on its own. Humans supplied the product promise, constraints, and accountable decision. The payoff is a shorter path from customer evidence to a trustworthy product change, with reusable learning afterward. End with the signature idea that the next product organization will automate learning, while preserving the taste and judgment that make the product worth using.

