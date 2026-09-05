# The Future of Product Engineering: Technical Blueprint

40 minutes · 18 slides

**Talk in one line.** An architecture for a product learning loop that agents can run, with governors that keep the product promise human-owned.

**Scope and claims (say once, on slide 1).** This is a proposed reference design. The demo is a deterministic policy replay with synthetic numbers; it shows gate behavior, not statistical significance or customer benefit. After slide 1, describe the design plainly.

**Demo.** [Runbook section 6](../demos/DEMO-RUNBOOK.md#6-the-future-of-product-engineering) · [Open the kit](../demos/index.html). Fallback: the table on slide 11.

**Story slots.** Lines marked `Story:` need a first-hand example before rehearsal.

**Timings** are rehearsal targets, excluding Q&A. Notes are cues, not a script.

---

## 1. Design the product learning loop

0:00–2:00

> A technical blueprint with governors

**Say:** How would a product agent discover that onboarding confuses users, propose a change, and stop itself from shipping a manipulative version that raises activation? That is the systems question. Every intermediate artifact must be inspectable.

**Say (scope, once):** Proposed design, synthetic demo numbers, gate behavior only. The agent prepares hypotheses and changes; the organization owns what it promises customers and what evidence is sufficient. That is the boundary; from here on I will build.

**Story:** [The experiment that "won" and made the product worse.]

## 2. An executable loop needs durable state

2:00–4:00

> Observe → hypothesize → prepare
> Approve → expose → measure
> Judge → record → learn

**Say:** Each state is a durable record with an identifier, not a function call in a long conversation. Approval names a revision; exposure references an experiment configuration; a decision references a scorecard. If a process restarts, it resumes measurement instead of creating a second experiment. Plain tables and a queue are enough to start.

## 3. Ingest signals with provenance

4:00–6:00

> Identity and time · Source and consent scope
> Schema and confidence · Deletion and retention

**Say:** Start with events and feedback the organization is authorized to use. Normalize timestamps, identifiers, event versions, links to source. Define access, retention, and deletion at ingestion. An unresolved identity stays unresolved; a language model does not guess it. Confidence in an interpretation differs from confidence that an event was collected correctly.

## 4. Memory can begin as ordinary tables

6:00–8:00

> Customer → segment → observation
> Hypothesis → experiment → decision
> Every claim keeps its source

**Say:** Do not introduce a graph database because the diagram has arrows. Store observations apart from interpretations; connect decisions to the evidence available at the time. The key query: have we tested a similar intervention on a comparable segment? Include failures and rejected ideas, or the memory teaches future agents to repeat attractive mistakes.

## 5. Researchers produce evidence packets

8:00–10:00

> Observation · Supporting and contrary evidence
> Alternative explanations · Gaps needing human research

**Say:** Constrain the research step's output. For onboarding: integration visits, support complaints, cohort changes, missing information, with citations to internal records and preserved contradictions. The agent flags when a customer interview is needed. Synthesis cannot manufacture access to motives or make a correlation causal.

## 6. The hypothesis is a typed proposal

10:00–12:00

> Segment and expected outcome
> Primary metric and counter-hypothesis
> Guardrails, exposure, evidence references, owner

**Say:** A schema rejects missing fields; a human decides whether the experiment is worth doing. Separate confidence in the idea from permission to act. The onboarding hypothesis: clarify the first useful step while keeping support demand within the agreed boundary.

**Show:** The hypothesis as a fifteen-line record.

## 7. Plan a portfolio, then control interference

12:00–14:00

> Explore several cheap candidates
> Limit concurrent exposure
> Register overlaps. Choose the analysis plan first.

**Say:** Drafts are cheap to parallelize because they touch no customers. Live experiments interact, share participants, and compete for traffic. Use a registry for eligible populations and overlaps. The agent does not allocate traffic opportunistically.

## 8. Approved intent becomes a reversible change

14:00–16:00

> Branch and feature flag · Tests and instrumentation
> Approval tied to revision · Rollback prepared before exposure

**Say:** Implementation is a bounded transaction. Approval refers to the exact revision and settings, so later edits cannot inherit permission. Deployment is idempotent and observable. Pricing, external communication, and sensitive targeting follow their own authority boundaries. A generated patch is evidence to review, not an outcome.

## 9. Verify the measuring instrument

16:00–18:00

> Event schema and assignment · A/A checks
> Sample ratio mismatch · Stable outcome definitions

**Say:** Before exposure grows, test event emission, assignment persistence, and metric definitions. Microsoft's experimentation group treats sample ratio mismatch as a data-quality signal requiring investigation. A balanced count does not prove correct randomization. Otherwise the fastest agent optimizes a broken dashboard.

Source: Microsoft ExP (2021), [Patterns of trustworthy experimentation: during-experiment stage](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-during-experiment-stage/).

## 10. Keep optimization and permission separate

18:00–20:00

> Score outcomes · Apply nonnegotiable gates
> Check evidence sufficiency · Request the accountable decision

**Say:** Four functions with different jobs: scorecard, policy layer, evidence check, owner decision. One weighted score would let enough activation uplift buy off a forbidden pattern. Hard constraints cannot be purchased with a metric gain. The output shows exactly why a candidate stopped.

## 11. Demo: the apparent winner is blocked

20:00–25:00

| Candidate | Activation | Support | Urgency |
| --- | --- | --- | --- |
| Control | 40% | 3% | None |
| Pressure copy | 48% | 9% | False |
| Clear first step | 45% | 4% | None |

**Show:** Follow [runbook section 6](../demos/DEMO-RUNBOOK.md#6-the-future-of-product-engineering). Reveal activation first.

**Ask (30 s):** Show of hands: which ships?

**Show:** Reveal support and urgency. Pressure copy breaches the 5% ceiling and fabricates urgency: blocked. Raise the ceiling to 10%: the principle still rejects it. Clear first step passes and is eligible for review, not shipped.

**Say:** Changing a threshold is a policy edit, not a reason to rerun until a favorite passes.

**Compression plan:** at 2 minutes, show the table and the block; skip the threshold change.

## 12. A bandit is a different experimental design

25:00–27:00

> Adaptive allocation can help
> Naive A/B math may not apply
> Log propensities. Preserve holdouts.

**Say:** Separate traffic optimization from causal estimation. Changing assignment probabilities changes the analysis. Do not bolt fixed-horizon intervals onto a bandit. For a first version, a well-designed randomized experiment is easier to trust. The planner does not get to change statistical rules when a result looks promising.

## 13. Peeking changes the rules of inference

27:00–29:00

> Fixed horizon: honor the plan
> Sequential: use valid methods
> Safety stops are explicit. Multiple comparisons need treatment.

**Say:** An always-on system can inspect results constantly and announce a winner at the first favorable moment, which destroys the test's error guarantees. Johari, Pekelis, and Walsh developed always-valid inference for continuous monitoring. Choose the method and stopping rules before launch. Safety stops are operational controls, not efficacy wins.

Source: Johari, Pekelis, Walsh (2015), [Always Valid Inference: Bringing Sequential Analysis to A/B Testing](https://arxiv.org/abs/1512.04922).

## 14. Taste tests are a mixed system

29:00–31:00

> Deterministic interaction checks · Examples of acceptable voice
> Calibrated model review · Human decisions on disputed cases

**Say:** The principle: explain the next useful action without inventing urgency. Some violations are flags or interface tests; subtle pressure needs interpretation. Keep reference examples and periodically compare model judgments with human ones. Log disagreement instead of false precision. Taste becomes discussable instead of discovered after release.

**Story:** [A product principle your team wrote down only after breaking it.]

## 15. Authority follows risk, not agent confidence

31:00–33:00

> Low-risk synthesis can run
> Exposure and messages need policy
> Pricing and strategy have owners. Irreversible actions escalate.

**Say:** Define action classes by reversibility, blast radius, sensitivity, money, and strategic significance. Give tools the narrow permissions for their class. Approval attaches to specific actions; audit shows who authorized them. Routine work moves without a human reading every token.

## 16. Capture a bounded lesson

33:00–35:00

> What changed, for whom, when · Result and uncertainty
> Decision and rationale · Revisit trigger

**Say:** "Clearer onboarding helped this cohort under these conditions" beats "shorter flows always win." Include an expiry or revisit trigger. Later agents retrieve the record before proposing similar work. This is training the system through evidence and memory, not the model.

## 17. Build the smallest trustworthy loop

35:00–37:30

> One signal source · One hypothesis schema
> One reversible experiment type · One accountable owner

**Say:** Choose one signal source and one recurring product question. Deterministic checks and a simple registry before research agents or dynamic allocation. Measure time to a supported decision, not hypotheses generated.

**Ask (45 s, write it):** Name the signal source and the question.

## 18. Programmable learning needs human direction

37:30–40:00

> Observe → understand → experiment
> Measure → judge → remember
> The product promise stays human-owned

**Say (close):** The system noticed friction, prepared an experiment, and refused to promote the candidate that won through pressure. It did not discover the company's values; humans supplied them. The payoff is a shorter path from customer evidence to a trustworthy change, with reusable learning afterward. The next product organization automates learning while keeping the taste and judgment that make the product worth using.
