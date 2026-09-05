# The Future of Product Engineering: Technical Blueprint

40 minutes · 15 slides

**In one line.** An architecture for a product learning loop that agents can run, with governors that keep the product promise human-owned.

**Arc.** Warm open, steady through state and evidence, build through the typed hypothesis and the instrument, peak at the demo, steady through statistics and taste, land on the smallest loop.

**Scope.** A proposed reference design. The demo is a deterministic policy replay with synthetic numbers; it shows gate behavior, not significance or customer benefit. Say it once on slide 1.

**Demo.** [Runbook section 6](../demos/DEMO-RUNBOOK.md#6-the-future-of-product-engineering) · [Kit](../demos/index.html). Fallback: the table on slide 10.

**Before each delivery.** Fill the `Story` lines.

**Image style.** Dark slate background, one amber accent, flat vector, generous negative space, no text or logos. Each slide comment is a complete prompt.

**Timings** are rehearsal targets, no Q&A. Notes are cues.

---

## 1. Design the product learning loop

0:00–2:30 · warm

<!-- image: a circular conveyor loop with small labeled crates moving around it, one station on the loop is a raised booth with a person inside holding a lever, dark slate background, amber accent on the lever, flat vector, no text -->

> A technical blueprint with governors

How would a product agent discover that onboarding confuses users, propose a change, and stop itself from shipping a manipulative version that raises activation? That is the systems question, and every intermediate artifact must be inspectable.

Scope, once: proposed design, synthetic demo numbers, gate behavior only. The agent prepares hypotheses and changes; the organization owns what it promises customers. From here on I build.

Story: [the experiment that "won" and made the product worse]

## 2. An executable loop needs durable state

2:30–4:30 · warm

<!-- image: a row of labeled filing drawers each connected to the next by a short pipe, one drawer half open with a numbered tag, dark slate background, amber accent on the tag, flat vector, no text -->

> Observe → hypothesize → prepare
> Approve → expose → measure
> Judge → record → learn

Each state is a durable record with an identifier, not a function call in a long conversation. Approval names a revision; exposure references an experiment configuration; a decision references a scorecard. If a process restarts, it resumes measurement instead of starting a second experiment. Plain tables and a queue are enough to start.

## 3. Provenance in, tables out

4:30–8:00 · steady

<!-- image: a stream of small tickets entering a sorting machine, each stamped, exiting into a neat grid of boxes linked by thin lines, a shredder slot on the side, dark slate background, amber accent on one stamped ticket, flat vector, no text -->

> Identity, time, source, consent scope, schema, confidence, deletion rules
> Customer → segment → observation · Hypothesis → experiment → decision
> Every claim keeps its source, including the failures

Start with events and feedback the organization is authorized to use. Normalize timestamps, identifiers, event versions, links to source. Define access, retention, and deletion at ingestion. An unresolved identity stays unresolved; a language model does not guess it.

Then the memory. Do not reach for a graph database because the diagram has arrows. Tables with stable identifiers are enough. Store observations apart from interpretations; connect decisions to the evidence available at the time. The key query: have we tested a similar intervention on a comparable segment? Keep failures and rejected ideas, or the memory teaches future agents to repeat attractive mistakes.

## 4. Researchers produce evidence packets

8:00–10:00 · steady

<!-- image: a manila folder open on a desk containing four stacked cards, one card with a plus sign, one with a minus sign, one with a question mark, one with a small human silhouette, dark slate background, amber accent on the question mark card, flat vector, no text -->

> Observation · Supporting and contrary evidence
> Alternative explanations · Gaps needing human research

Constrain the research step's output. For onboarding: integration visits, support complaints, cohort changes, missing information, with citations to internal records and preserved contradictions. The agent flags when a customer interview is needed. Synthesis cannot manufacture access to motives or make a correlation causal.

## 5. The hypothesis is a typed proposal

10:00–12:30 · steady

<!-- image: a form with clearly outlined fields, all filled, held against a cutout template that matches its shape exactly, dark slate background, amber accent on the template edge, flat vector, no text -->

> Segment and expected outcome
> Primary metric and counter-hypothesis
> Guardrails, exposure, evidence references, owner

A schema rejects missing fields; a human decides whether the experiment is worth doing. Confidence in the idea and permission to act are different things. The onboarding hypothesis: clarify the first useful step while keeping support demand within the agreed boundary.

Show the hypothesis as a fifteen-line record.

## 6. Plan a portfolio, then control interference

12:30–14:30 · steady

<!-- image: many small paper sketches pinned loosely on a board, below them two glass lanes with traffic flowing that must not cross, a registry book beside the lanes, dark slate background, amber accent on the registry, flat vector, no text -->

> Explore several cheap candidates
> Limit concurrent exposure
> Register overlaps. Choose the analysis plan first.

Drafts are cheap to parallelize because they touch no customers. Live experiments interact, share participants, and compete for traffic. Use a registry for eligible populations and overlaps. The agent does not allocate traffic opportunistically.

## 7. Approved intent becomes a reversible change

14:30–16:30 · build

<!-- image: a git branch drawn as a railway siding with a switch lever, a small flag on the siding, and a return track leading back to the main line, dark slate background, amber accent on the switch lever, flat vector, no text -->

> Branch and feature flag · Tests and instrumentation
> Approval tied to revision · Rollback prepared before exposure

Implementation is a bounded transaction. Approval refers to the exact revision and settings, so later edits cannot inherit permission. Deployment is idempotent and observable. Pricing, external communication, and sensitive targeting follow their own authority boundaries. A generated patch is evidence to review.

## 8. Verify the measuring instrument

16:30–19:30 · build

<!-- image: a set of kitchen scales being checked against a reference weight, two identical cups on the pans, one pan slightly lower, dark slate background, amber accent on the reference weight, flat vector, no text -->

> Event schema and assignment · A/A checks
> Sample ratio mismatch · Stable outcome definitions

Before exposure grows, test event emission, assignment persistence, and metric definitions. Microsoft's experimentation group treats sample ratio mismatch as a data-quality signal requiring investigation. A balanced count does not prove correct randomization. Otherwise the fastest agent optimizes a broken dashboard.

Source: Microsoft ExP (2021), [Patterns of trustworthy experimentation: during-experiment stage](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-during-experiment-stage/).

## 9. Keep optimization and permission separate

19:30–21:30 · build

<!-- image: four separate boxes in a row connected by arrows, a scoreboard, a barrier gate, a magnifying glass, and a chair with a person, dark slate background, amber accent on the barrier gate, flat vector, no text -->

> Score outcomes · Apply nonnegotiable gates
> Check evidence sufficiency · Request the accountable decision

Four functions with different jobs: scorecard, policy layer, evidence check, owner decision. One weighted score would let enough activation uplift buy off a forbidden pattern. Hard constraints cannot be purchased with a metric gain. The output shows exactly why a candidate stopped.

## 10. Demo: the apparent winner is blocked

21:30–26:30 · peak

<!-- image: a podium with three places, the tallest position has a barrier gate closed in front of it, the second position has an open gate and a small review stamp hovering, dark slate background, amber accent on the closed gate, flat vector, no text -->

| Candidate | Activation | Support | Urgency |
| --- | --- | --- | --- |
| Control | 40% | 3% | None |
| Pressure copy | 48% | 9% | False |
| Clear first step | 45% | 4% | None |

Follow [runbook section 6](../demos/DEMO-RUNBOOK.md#6-the-future-of-product-engineering). Reveal activation first. Show of hands: which ships?

Reveal support and urgency. Pressure copy breaches the 5% ceiling and fabricates urgency: blocked. Raise the ceiling to 10%: the principle still rejects it. Clear first step passes and is eligible for review, not shipped. Changing a threshold is a policy edit, not a reason to rerun until a favorite passes.

Compression: at two minutes, the table and the block; skip the threshold change.

## 11. Bandits and peeking change the rules of inference

26:30–29:30 · steady

<!-- image: a slot machine lever beside a wall clock with its hands removed and placed on the table, a sealed envelope leaning on the clock, dark slate background, amber accent on the sealed envelope, flat vector, no text -->

> Adaptive allocation is a different design: log propensities, preserve holdouts
> Fixed horizon: honor the plan. Sequential: use valid methods.
> Safety stops are explicit. Multiple comparisons need treatment.

Traffic optimization and causal estimation are different jobs. Changing assignment probabilities changes the analysis; fixed-horizon intervals do not bolt onto a bandit. For a first version, a well-designed randomized experiment is easier to trust.

Then peeking. An always-on system can inspect results constantly and announce a winner at the first favorable moment, which destroys the test's error guarantees. Johari, Pekelis, and Walsh developed always-valid inference for continuous monitoring. Choose the method and stopping rules before launch. Safety stops are operational controls, not efficacy wins. The planner does not get to change statistical rules when a result looks promising.

Source: Johari, Pekelis, Walsh (2015), [Always Valid Inference: Bringing Sequential Analysis to A/B Testing](https://arxiv.org/abs/1512.04922).

## 12. Taste tests are a mixed system

29:30–32:30 · steady

<!-- image: a tasting table with three small plates, one under a mechanical sensor, one under a magnifying glass, one being lifted by a human hand, dark slate background, amber accent on the human hand, flat vector, no text -->

> Deterministic interaction checks · Examples of acceptable voice
> Calibrated model review · Human decisions on disputed cases

The principle: explain the next useful action without inventing urgency. Some violations are flags or interface tests; subtle pressure needs interpretation. Keep reference examples and periodically compare model judgments with human ones. Log disagreement instead of false precision. Taste becomes discussable instead of discovered after release.

Story: [a product principle your team wrote down only after breaking it]

## 13. Authority follows risk, not agent confidence

32:30–34:30 · steady

<!-- image: four keys of increasing size on a ring, the smallest key in a lock, the largest key held by a person standing apart, dark slate background, amber accent on the largest key, flat vector, no text -->

> Low-risk synthesis can run
> Exposure and messages need policy
> Pricing and strategy have owners. Irreversible actions escalate.

Define action classes by reversibility, blast radius, sensitivity, money, and strategic significance. Give tools the narrow permissions for their class. Approval attaches to specific actions; audit shows who authorized them. Routine work moves without a human reading every token.

## 14. Capture a bounded lesson, then build the smallest loop

34:30–38:00 · land

<!-- image: a single index card with a date stamp and a small expiry tag, resting on top of a very small machine with one input pipe and one output tray, dark slate background, amber accent on the expiry tag, flat vector, no text -->

> What changed, for whom, when · Result and uncertainty · Decision · Revisit trigger
> One signal source · One hypothesis schema · One reversible experiment type · One owner

"Clearer onboarding helped this cohort under these conditions" beats "shorter flows always win." Include an expiry or revisit trigger. Later agents retrieve the record before proposing similar work. Training the system through evidence and memory, not the model.

Then the first implementation. One signal source and one recurring product question. Deterministic checks and a simple registry before research agents or dynamic allocation. Measure time to a supported decision, not hypotheses generated.

Write it (45 s): the signal source and the question.

## 15. Programmable learning needs human direction

38:00–40:00 · land

<!-- image: the conveyor loop from slide 1 now moving faster with a blur, the booth with the person and lever unchanged and clearly in focus, dark slate background, amber accent on the lever, flat vector, no text -->

> Observe → understand → experiment → measure → judge → remember
> The product promise stays human-owned

The system noticed friction, prepared an experiment, and refused to promote the candidate that won through pressure. It did not discover the company's values; humans supplied them. The payoff is a shorter path from customer evidence to a trustworthy change, with reusable learning afterward. The next product organization automates learning while keeping the taste and judgment that make the product worth using.
