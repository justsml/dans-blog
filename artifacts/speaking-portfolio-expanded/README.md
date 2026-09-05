# Speaking portfolio: seven concepts

Editable decks in Simple Dark Mode, with speaker notes, timed outlines, CFP packages, evidence notes and an offline demo kit. These extend the earlier four-talk portfolio.

[Open the offline demos](demos/index.html) · [Demo runbook](demos/DEMO-RUNBOOK.md)

**Deck sync.** The outlines were revised on 2026-09-05 (structured cues, consolidated scope statements, story slots, named sources, and new content for the failure-improvement, free-tier, adaptive-systems and skeptic talks). The PPTX decks predate that revision and need re-exporting from the outlines before use. Slide counts are unchanged, so the adaptation slide numbers still map.

**Before each delivery.** Fill every `Story:` slot in the outline with a first-hand example. The free-tier talk also needs current dated reporting inserted on its slide 3.

## Decks and submission copy

| Talk | Deck | Outline | CFP package |
| --- | --- | --- | --- |
| A Skeptic's Guide to Surviving AI in Education | [40 min / 18 slides](decks/skeptic-education-40min.pptx) | [Full notes](outlines/skeptic-education-40min.md) | [Education](education/CFP.md) |
| Automating Improvement From Failure | [40 min / 18 slides](decks/failure-improvement-40min.pptx) | [Full notes](outlines/failure-improvement-40min.md) | [Failure improvement](engineering/failure-improvement/CFP.md) |
| Building Adaptive & Dynamic AI Systems | [40 min / 18 slides](decks/adaptive-systems-40min.pptx) | [Full notes](outlines/adaptive-systems-40min.md) | [Adaptive systems](engineering/adaptive-systems/CFP.md) |
| Cry Me a Free Tier | [40 min / 18 slides](decks/free-tier-40min.pptx) | [Full notes](outlines/free-tier-40min.md) | [Economics](economics-product/CFP.md) |
| Outsmart Your Lying, Cheating Students (event-friendly: Stop Trying to Catch Students Using AI) | [40 min / 18 slides](decks/evidence-learning-40min.pptx) | [Full notes](outlines/evidence-learning-40min.md) | [Education](education/CFP.md) |
| Rethinking Parallelization in the Agentic Era | No deck yet | [Full notes](outlines/parallelization-40min.md) | No CFP package yet |
| The Future of Product Engineering: Big Idea | [15 min / 9 slides](decks/product-engineering-15min.pptx) | [Full notes](outlines/product-engineering-15min.md) | [Product variants](economics-product/CFP.md) |
| The Future of Product Engineering: Feedback Systems | [30 min / 14 slides](decks/product-engineering-30min.pptx) | [Full notes](outlines/product-engineering-30min.md) | [Product variants](economics-product/CFP.md) |
| The Future of Product Engineering: Technical Blueprint | [40 min / 18 slides](decks/product-engineering-40min.pptx) | [Full notes](outlines/product-engineering-40min.md) | [Product variants](economics-product/CFP.md) |

CFP packages include 50- and 150-word abstracts, intended audiences, learning outcomes and reviewer notes. The packages contain no invented biography, speaking history, or case-study results. Adapt the fields to a specific venue's form before submission.

## Shorter routes

Each adaptation uses the full deck with unlisted slides hidden. Each names the slides kept, the bridge sentence for every dependency that a cut removes, a compression plan for the demo, and a closing for that length.

| Talk | 15-minute outline | 30-minute outline |
| --- | --- | --- |
| A Skeptic's Guide to Surviving AI in Education | [Lightning](outlines/skeptic-education-15min-adaptation.md) | [Standard](outlines/skeptic-education-30min-adaptation.md) |
| Automating Improvement From Failure | [Lightning](outlines/failure-improvement-15min-adaptation.md) | [Standard](outlines/failure-improvement-30min-adaptation.md) |
| Building Adaptive & Dynamic AI Systems | [Lightning](outlines/adaptive-systems-15min-adaptation.md) | [Standard](outlines/adaptive-systems-30min-adaptation.md) |
| Cry Me a Free Tier | [Lightning](outlines/free-tier-15min-adaptation.md) | [Standard](outlines/free-tier-30min-adaptation.md) |
| Outsmart Your Lying, Cheating Students | [Lightning](outlines/evidence-learning-15min-adaptation.md) | [Standard](outlines/evidence-learning-30min-adaptation.md) |
| Rethinking Parallelization in the Agentic Era | [Lightning](outlines/parallelization-15min-adaptation.md) | [Standard](outlines/parallelization-30min-adaptation.md) |

A 45-minute slot can use the 40-minute deck plus five minutes of questions. All timings are rehearsal targets, excluding Q&A. The notes are cues, not verbatim scripts.

## What makes the talks distinct

| Talk | Central audience decision | Worked example |
| --- | --- | --- |
| Skeptic's Guide | How do I adopt AI in a course with justified confidence, and what will fail first? | A history essay weighing two conflicting sources; four failure modes and a pre-mortem. |
| Improvement From Failure | Where should a recurring lesson become durable behavior, from hooks and skills to GEPA and hosted eval platforms? | A local connection failure becomes a readiness check, with three promotion gates and a pruning rule. |
| Adaptive Systems | Which strategy deserves the available budget and authority, and how do new models earn their way in? | A known lookup, a routine task and a novel failure receive different bounded strategies; a new model enters via mirrored traffic. |
| Free Tier | Which of my assumptions depend on today's price, and what has free inference already shaped? | Free parking's second-order effects mapped onto software; a fixed workload under 1× to 10× prices. |
| Outsmart Your Lying, Cheating Students | What follow-up would distinguish understanding from a polished artifact? | The percentage-change reconstruction and transfer item, plus a scripted learner replay. |
| Parallelization | Which of the five new axes of parallelism pays for its coordination cost on my workload? | A capped three-way tournament that ends by compiling the winner into a script. |
| Product Engineering | Which faster learning loops still honor the product promise? | An activation winner violates support and false-urgency constraints. |

The two education talks now use different worked examples so they can be booked together.

## Evidence and demo details

- [Education research and claim boundaries](education/evidence.md) and [worked assessment exercises](education/demo.md).
- [Failure-improvement evidence](engineering/failure-improvement/evidence.md) and [stage sequence](engineering/failure-improvement/demo.md).
- [Adaptive-systems evidence](engineering/adaptive-systems/evidence.md) and [stage sequence](engineering/adaptive-systems/demo.md).
- [Economics and experimentation evidence](economics-product/evidence.md) and [stage sequences](economics-product/demo.md).

Each outline names its sources with author, year and title. The evidence notes distinguish empirical findings, guidance, proposed practices and illustrations. The Bastani PNAS paper has a published correction whose full text was inaccessible during research; the talks avoid its numeric effect sizes. The failure-improvement outline's new sources (DSPy, GEPA, hooks, skills, pg_trgm, the three platform docs) and the free-tier outline's Shoup references are not yet in the evidence notes.

The offline kit uses scripted or deterministic fixtures. It makes no model calls, estimates no provider subsidy, grades no student, and deploys no experiment. The parallelization talk has no fixture yet; its outline borrows the adaptive-systems kit for caps and the human gate.

## Reuse across the portfolio

Pair the strategic education talk with the assessment-design talk when a program wants both framing and implementation. Pair failure improvement with adaptive systems or parallelization when the audience wants to retain lessons and change execution policy; all three end on "compile the work you understand." Pair the economics talk with Product Engineering when the discussion spans market incentives and organizational decisions.

The original eight decks remain in the sibling `flagship-talks` directory.
