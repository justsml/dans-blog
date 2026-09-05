# The Future of Product Engineering: Big Idea

15 minutes · 9 slides

**Talk in one line.** The future product engineer automates how the company learns what product to build.

**Scope and claims (say once, on slide 1).** Proposed operating model, fictional onboarding case, synthetic demo numbers that show a decision gate. After slide 1, argue plainly.

**Demo.** Compact version of [runbook section 6](../demos/DEMO-RUNBOOK.md#6-the-future-of-product-engineering). Fallback: the table on slide 5.

**Story slots.** Lines marked `Story:` need a first-hand example before rehearsal.

**Timings** are rehearsal targets, excluding Q&A. Notes are cues, not a script.

---

## 1. When the product team becomes an executable loop

0:00–1:30

**Say:** Should onboarding ask a new user to invite teammates before they have seen any value? An AI can generate either screen in seconds. The hard problem is deciding which screen deserves to exist and what evidence would change that decision.

**Say (scope, once):** Proposed operating model, fictional case, synthetic numbers. That is the caveat.

**Story:** [Thirty seconds: the screen you shipped fast and should not have shipped at all.]

## 2. Code generation is the easy part to notice

1:30–3:00

> A component appears in seconds
> The product question remains: what should exist?

**Say:** Imagine thirty polished onboarding variants before lunch. The backlog moved into choosing, testing, and understanding consequences. Shift attention from the speed of producing a component to the time between a customer signal and a supported decision. Integration, operation, and accessibility still cost real engineering.

## 3. The learning loop becomes programmable

3:00–5:00

> Observe → understand → hypothesize → experiment
> Measure → judge → learn → observe

**Say:** Users visit integrations before invitations. Research proposes the order is confusing. A prototype tests a clearer first action. Instrumentation records a completed useful task, not a click. Review considers support burden. The result becomes a searchable decision. The arrows are responsibilities and evidence transfers; an agent can help at several, not all.

## 4. Research needs receipts

5:00–6:30

> A support message is evidence
> A cluster is an interpretation
> A hypothesis is a proposal

**Say:** Three cards. One complaint does not estimate prevalence; a cluster overrepresents vocal customers; a confident explanation does not establish cause. Every synthesized claim links to its evidence and keeps the disconfirming cases.

## 5. Demo: a win can be a worse product

6:30–9:30

| Candidate | Activation | Support | Urgency |
| --- | --- | --- | --- |
| Control | 40% | 3% | None |
| Pressure copy | 48% | 9% | False |
| Clear first step | 45% | 4% | None |

**Ask (20 s):** Activation from 40% to 48%. Win?

**Show:** Support from 3% to 9%, and false urgency in the treatment. Give the room a moment to change its answer. The system optimized a visible metric while violating an operational threshold and the product's promise.

## 6. Taste becomes a constraint on optimization

9:30–11:00

> Support rate at most 5% · No fabricated urgency
> No hidden exit · Human judgment still required

**Say:** Rules shown before the decision. The ceiling and the urgency ban were chosen by humans for this scenario. Some checks are deterministic, such as whether an exit exists; others need calibrated review. A passed check grants eligibility for review, not permission to ship.

## 7. A quieter candidate survives review gates

11:00–12:30

> Clear first step: 45% activation, 4% support, no urgency
> Eligible for human review

**Say:** It passes the gates; that does not prove it is the better product. A real experiment still needs trustworthy assignment, adequate observation, and a decision owner. Automated evaluation narrows the queue without laundering an experiment into a decision.

## 8. Humans own the product promise

12:30–14:00

> Vision and strategy · Taste and consequential tradeoffs
> Customer communication · Accountability for release

**Say:** Automate evidence gathering, hypothesis drafting, and reversible changes. Name the people accountable for direction, sensitive personalization, pricing, and release. Boundaries move with risk and demonstrated reliability; they do not vanish because a system can technically act.

## 9. Automate how the company learns

14:00–15:00

> Keep the evidence · Encode the boundaries
> Name the decision owner · Learn what deserves to exist

**Say (close):** The strongest artifact is now a decision with its evidence, limits, and owner, not a generated screen. Choose one handoff where evidence gets lost and make it inspectable this week. The future product engineer does not just automate building the product; they automate how the company learns what product to build.

**Show:** Pause. Leave the loop on screen.
