# Speaking opportunity research instructions

Ten self-contained Deep Research prompts cover the six new concepts and four original flagship talks. Each prompt can run independently. These files are research instructions; no event availability or deadline has been verified in this package.

## Run a research task

Copy a whole talk brief into a Deep Research task. Attach its linked CFP/outline if the research environment cannot read local files. Attach the five CSV templates for consistent output. The brief itself repeats the schema, so it also works without attachments.

The default horizon is the next 18 months from execution, internationally, including remote opportunities. Travel origin, budget, preferred regions, compensation requirements, and eligibility details remain unspecified. Add any known preferences before running; otherwise the researcher must record those unknowns rather than assume them.

## Talk briefs

- [A Skeptic’s Guide to Surviving AI in Education](skeptic-education.md)
- [Outsmart Your Lying, Cheating Students](evidence-learning.md)
- [Automating Improvement From Failure](failure-improvement.md)
- [Adaptive, agentic apps](adaptive-systems.md)
- [Cry Me a Free Tier](free-tier.md)
- [The Future of Product Engineering](product-engineering.md)
- [From RAGs to Retrievals: Learn the New Engineering Speak](retrieval.md)
- [Stop Looking at My Benchmarks… Get Your Own!](benchmarks.md)
- [Rethinking Parallelization in the Agentic Era](parallelization.md)
- [Code Is Cheap. Judgment Is Expensive.](judgment.md)

## Shared collection format

- [Event series](templates/events.csv): organizer, audience, history, conference and contact links.
- [Specific editions](templates/editions.csv): dates, location, CFP, requirements, format, speaker economics and rights.
- [Deadlines](templates/deadlines.csv): separate CFP, notification, confirmation, and materials dates with time-zone evidence.
- [Talk matches](templates/talk_matches.csv): fit, variant, pitch, score, queue and next action.
- [Evidence](templates/evidence.csv): source links, claims, verification dates and conflicts.

Use empty CSV cells for null/unknown structured values, and explain missing information in the relevant unknowns field or report. Date-only ISO fields use YYYY-MM-DD; timestamps include an offset. Multiple IDs in a cell use semicolons. Do not put estimated historical windows in confirmed deadlines.

## Consolidate the results

After individual runs, merge event series by organizer and canonical series URL, then editions by event and year/session. Preserve distinct regional chapters and editions. Retain each talk match and its fit evidence. Deduplicate aliases and record source conflicts; do not silently overwrite an earlier fact.

Build one deadline calendar from confirmed dates. Keep historical-cycle monitoring separate. For events that fit several talks, recommend one primary submission and a backup based on the actual track and audience. Check rules on multiple proposals, exclusivity, repeat talks, and simultaneous submissions before proposing a submission plan.

Sort the actionable list by deadline urgency and evidence-backed fit. A high-fit closed CFP belongs in a monitoring queue. An invitation-only opportunity needs an evidenced public contact route; it is not an open CFP. Paid speaker placement belongs in a separate commercial category.

The researcher should deliver a top-10 shortlist per talk where the evidence supports it, plus a consolidated top-20 portfolio shortlist without duplicate editions. This is discovery and preparation only: no outreach, applications, payments, or automatic reminders are authorized by these prompts.

## Talk versions in research results

Saved research results retain the talk names and positioning evaluated on their recorded dates. Use the current [adaptive packet](../speaking-portfolio-expanded/packets/adaptive-systems/packet.md) and [parallelization packet](../speaking-portfolio-expanded/packets/parallelization/packet.md) for submission copy. Historical fit scores have not been recomputed for the revised talks.
