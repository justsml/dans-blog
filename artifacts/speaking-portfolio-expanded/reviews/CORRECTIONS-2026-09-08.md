# Verified portfolio corrections, 8 September 2026

The [audit](AUDIT-2026-09-08.md) was checked against the actual artifacts, arithmetic, and relevant primary sources. Work was separated by talk across three parallel agents and the coordinating editor. Original audits remain unchanged; each correction report records verified findings, adopted fixes, disputed prescriptions, and delivery dependencies.

## Per-talk records

| Current title | Correction record | Canonical talk |
| --- | --- | --- |
| Compute, Please (and a Receipt) | [Dynamic Scaling](corrections-2026-09-08-dynamic-scaling.md) | [14 slides](../talks/dynamic-scaling/index.md) |
| Stop Looking at My Benchmarks… Get Your Own! | [Benchmarks](corrections-2026-09-08-benchmarks.md) | [15 slides](../talks/benchmarks/index.md) |
| Conjure Exactly Enough | [Adaptive Systems](corrections-2026-09-08-adaptive-systems.md) | [15 slides](../talks/adaptive-systems/index.md) |
| Break the Mirror on Purpose | [Product Engineering](corrections-2026-09-08-product-engineering.md) | [17 slides](../talks/product-engineering/index.md) |
| Three Search Methods in a Fundable Trenchcoat | [Retrieval](corrections-2026-09-08-retrieval.md) | [15 slides](../talks/retrieval/index.md) |
| Turn Your Thinkin' Tokens Up to 11 | [Judgment](corrections-2026-09-08-judgment.md) | [14 slides](../talks/judgment/index.md) |
| The Pager Cried Wolf | [Failure Improvement](corrections-2026-09-08-failure-improvement.md) | [15 slides](../talks/failure-improvement/index.md) |
| Buy Me a Free Tier | [Free Tier](corrections-2026-09-08-free-tier.md) | [15 slides](../talks/free-tier/index.md) |
| Outsmart Your Lying, Cheating Students | [Evidence of Learning](corrections-2026-09-08-evidence-learning.md) | [14 slides](../talks/evidence-learning/index.md) |

Outsmart’s event-friendly title is **Make Verification Feel Like Cheating**. Stable directory slugs and slide IDs are retained; some routes deliberately reorder those IDs. The route files, not numeric sorting, determine presentation order.

## Shared findings

| Audit finding | Correction |
| --- | --- |
| Speech and interaction share the clock | Route headers and per-talk timing records split the slot. Checks include bridges, audience time, and bounded story allowances. Walkthroughs no longer receive a blanket exemption for spoken explanation. |
| Peak reveals leak | Changed initial screens, titles, answer assets, and delivery order. Retrieval’s actual deck receives staged fragments; the unbuilt decks are described as unbuilt. Static instructions are not claimed as tested browser animation. |
| Three empty formats files | Benchmarks, Judgment, and Retrieval now have edition tables and working script/route links. Removed generated-deck/PPTX promises. |
| Two 95-minute “60-minute” workshops | Free Tier and Outsmart now total 60 minutes; a 75-minute option adds only 15 minutes. |
| Retired titles feed submissions | Corrected `build_composite_rankings.py` first, current research briefs, source match CSVs, shared indexes, and derived ranking files. Updated the XLSX and inspection. Source links and several briefs’ obsolete positioning also needed correction. |
| Missing fixture promises | Removed the shared fixture-directory link; The Test Who Loved Me now explicitly uses printed illustrative code. Retrieval uses board arithmetic and the packet’s static fixture. Deleted scripts were not restored. |
| New deck depends on retired runtime location | Vendored the existing matched Reveal.js 5.2.0 files and MIT license into `public/decks/vendor/reveal/`; the hand-authored Retrieval deck imports them. No dependency update or generator was added. Old unrelated talk assets remain intact. |
| Deck becomes another source of truth | Retrieval corrections reconcile notes, headings, fixture wording, and citations with the canonical source. Deck guidance now requires back-porting improvements and recording diagram-only numbers. |
| Visual inventory overstates coverage | README distinguishes source SVGs, intentional typography, and rebuilt decks. Free Tier and Outsmart now have actual teaching diagrams and no unfilled image prompts. |
| Retirement transplant incomplete | Outsmart’s report maps the teaching/procurement transplants. Updated the retirement-plan status, speaker-topic mapping, and recording recommendation. A Skeptic’s Guide remains historical research, not a second active education submission. |

## Verification disagreements worth keeping

- The judge-cost error is real, but a real multi-model council cannot be priced as five copies of one cheap model. The corrected talk labels the same-rate arithmetic as an illustration and requires actual per-model pricing.
- One in seven is slightly above the exact 13.91% zero-event bound. Benchmarks uses one in 7.2 for the reciprocal and avoids the audit’s imprecise proposed CFP sentence.
- Product Engineering’s 70/22/8 describes 50 studies, not the full 142-study corpus or companies. The 8% category does not establish a deliberate mirror-breaking success rate.
- VanLehn’s tutoring summaries are **means**, not medians.
- The alarm calculation divides by available bed-days. It is not a per-patient-day rate or evidence of a software outcome.
- Retrieval’s synthetic rubric scores applicability to the current task, not just topical relevance. The fix states that distinction instead of knowingly mislabeling the fixture.
- Reorders, joke substitutions, and wholesale slide cuts are editorial proposals, not facts. Each talk report explains any alternative correction.

## Submission-data verification

The ranking source regenerated 166 opportunities. Compared with the prior artifact, all ranks, composite scores, primary talk IDs, event dates, and deadline dates are unchanged. One pre-existing source/output discrepancy was reconciled: DeveloperWeek’s backup ID is `retrieval` in the current source-derived ranking rather than the workbook’s older `parallelization`. This is not a new event search or a deadline refresh.

The workbook edit preserved all 167 formulas, four tables, panes, conditional formats, validations and drawings. Changed title views were rendered and inspected; formula-error inspection found none. The historical `skeptic-education` fit evidence remains identifiable and explicitly requires reassessment against the current procurement route. No outreach or submission was performed.

## Final integration checks

All nine canonical talks match the spoken text of their 40-minute scripts. All 27 timed routes were checked for spoken counts and explicit interaction budgets; per-slide rates use remaining speech time, including walkthrough narration. The first Dynamic Scaling and Adaptive pacing pass still used total-slot denominators; the integration pass caught this, shortened the affected passages, and recounted them. Maximum rates are at or below 80 words per spoken minute.

Active portfolio local links resolve, all nine formats files are populated, and referenced SVGs parse. Retrieval’s three routes were exercised in Chromium: 15/14/8 slides, exactly 2,400/1,800/900 seconds, no page errors, and all 37 speaker-note blocks matching route scripts. Source diagrams were rendered and inspected where edited. Current submission titles agree with the ranking source; the remaining old names are explicitly historical references. Repository diff whitespace checks use CRLF-aware handling for existing CSV files.

No broad Astro build was needed for these artifact and static-deck edits. Browser checks establish Retrieval’s route behavior; the remaining timing records establish written budgets only.

## Delivery limits

Written timings are desk checks, not recorded delivery. First-hand stories remain Dan’s to supply within their caps. Failure Improvement’s live integration and recording are still unexecuted prerequisites; its static teaching fixture is labeled accordingly. Eight hand-authored decks were already unbuilt and are not manufactured or advertised as complete by this correction pass. Dated vendor material must be rechecked when used for a future delivery.

Per-talk source-access limits are recorded with the relevant finding; a blocked publisher fetch is not represented as a full-text verification. No customer result, personal story, model-quality result, or executed demo was invented to close a row.
