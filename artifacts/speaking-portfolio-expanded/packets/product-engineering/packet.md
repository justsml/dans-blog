# Talk packet: The Future of Product Engineering

Outlines: [40 min blueprint](../../outlines/product-engineering-40min.md) · [30 min feedback systems](../../outlines/product-engineering-30min.md) · [15 min big idea](../../outlines/product-engineering-15min.md) · Formats: [formats.md](formats.md) · Evidence: [evidence-bank.md](evidence-bank.md)

## Titles

- **Primary:** The Future of Product Engineering
- Automate How the Company Learns
- The Product Team as an Executable Loop
- A Win Can Be a Worse Product

## Abstracts

### 50 words

Code generation is the easy part to notice. The harder problem is deciding what should exist and what evidence would change that decision. This talk designs a product learning loop agents can run, with governors that block the activation winner that cheats, and keeps the product promise human-owned.

### 100 words

An AI can generate either onboarding screen in seconds. Which one deserves to exist? This talk proposes an architecture for a product learning loop: signals with provenance, evidence packets that preserve disagreement, typed hypotheses, reversible changes, verified instruments, and a decision layer that keeps optimization and permission separate. A deterministic demo shows a candidate that raises activation from 40% to 48% blocked because support contacts tripled and the copy invented urgency. It covers bandits, peeking, taste as a mixed system of checks and human judgment, authority that follows risk, and a bounded lesson record. The product promise stays human-owned.

### 250 words

Should onboarding ask a new user to invite teammates before they have seen any value? An AI can generate either screen in seconds. The hard problem is deciding which screen deserves to exist and what evidence would change that decision. This talk argues that the next product organization automates how it learns, and builds the architecture to do it with governors.

The loop has durable state: a hypothesis with an identifier, an approval that names a revision, exposure that references an experiment configuration, a decision that references a scorecard. Signals enter with provenance and consent scope; memory begins as ordinary tables that keep failures as well as wins. Research agents produce evidence packets with supporting and contrary evidence, alternative explanations, and the gaps that need a human interview. Hypotheses are typed proposals a schema can reject. Implementation is a reversible transaction: branch, flag, tests, approval tied to a revision, rollback prepared before exposure.

Measurement gets its own discipline. Verify the instrument before trusting the result. Bandits change the analysis. Peeking destroys error guarantees; choose stopping rules before launch. Taste is a mixed system: deterministic checks, reference examples, calibrated model review, and a human for disputed cases.

The demo shows an activation winner blocked by a support ceiling and a rule against fabricated urgency, then a quieter candidate that becomes eligible for review, not shipped. Authority follows risk, not agent confidence. Lessons are bounded, with revisit triggers. The first implementation is small: one signal, one schema, one experiment type, one owner.

## Learning outcomes

Attendees will be able to:

1. Separate a product learning loop into durable states with identifiers and explain what each enables for retries and audit.
2. Design an evaluation layer that keeps scorecards, nonnegotiable gates, evidence sufficiency, and the human decision as distinct functions.
3. Specify a first implementation with one signal source, one hypothesis schema, one reversible experiment type, and one accountable owner.

## Audience and prerequisites

Product engineers, engineering leaders, and product managers building or evaluating AI-assisted product workflows. Familiarity with A/B testing and feature flags. No statistics beyond the basics.

## Practical takeaways

- The typed hypothesis record with counter-hypothesis, guardrails, and owner.
- The four-function evaluation split: scorecard, policy, evidence check, decision.
- The smallest trustworthy loop checklist.

## Not a product pitch

The talk cites Microsoft's experimentation guidance and Johari, Pekelis, and Walsh on always-valid inference. It names no experimentation platform, analytics tool, or agent framework. The demo is offline and vendor-free.

## References

- Microsoft ExP (2021). Patterns of trustworthy experimentation: [pre-experiment](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-pre-experiment-stage/), [during-experiment](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-during-experiment-stage/), and [post-experiment](https://www.microsoft.com/en-us/research/articles/patterns-of-trustworthy-experimentation-post-experiment-stage/) stages.
- Johari, Pekelis, Walsh (2015). [Always Valid Inference: Bringing Sequential Analysis to A/B Testing](https://arxiv.org/abs/1512.04922).
- Anthropic (2024). [Building effective agents](https://www.anthropic.com/engineering/building-effective-agents).

## Audience-specific abstracts (100 words each)

### Engineering practitioner

Thirty polished onboarding variants before lunch, and the backlog has moved into choosing. This session builds the loop that does the choosing: durable state with identifiers, evidence packets that cite internal records, typed hypotheses a schema rejects, reversible changes with approval tied to a revision, and instrument checks before any result is trusted. The evaluation layer splits into four functions so a metric gain cannot buy off a forbidden pattern. A deterministic demo blocks the activation winner. Then bandits, peeking, always-valid inference, and taste as deterministic checks plus calibrated review. You leave with the schema and the four-function split.

### Engineering leadership and product

A product organization is a feedback system, and most of its delay is in the handoffs between support, analytics, sales, and the roadmap. This talk maps the loop, shows where agents shorten it, and where they must not: the objective, the constraints, and the release decision. It explains why faster loops amplify the wrong objective, why passing gates is not a shipping decision, and why every experiment needs a decision record with an expiry. The demo shows a metric win that violates the product promise. Leaders leave with one loop to map, its slowest transfer, and one nonnegotiable constraint.

### Education and instructional design

Adapted for edtech product teams: learning products are experiments on learners, and the loop that runs them needs governors. This session shows how to state a product principle, such as explain the next useful step without inventing urgency, as checks a system can enforce and examples a human can judge. It covers hypotheses with counter-hypotheses, guardrails on support burden, instrument checks before trusting an uplift, and decision records that keep a narrow lesson narrow. The demo blocks a candidate that raises activation through pressure. No statistics beyond the basics; the emphasis is on what stays human.

### Executive and general technology

AI can now generate a product change in seconds. Deciding whether it should exist takes the same time it always did, unless the organization automates how it learns. This talk describes that loop, from customer signal to a decision with evidence and an owner, and the governors that keep it honest: constraints a metric gain cannot buy off, approvals tied to specific changes, and a human who owns the product promise. It shows a change that "won" and would have made the product worse, and closes with the smallest version any team can start next quarter.
