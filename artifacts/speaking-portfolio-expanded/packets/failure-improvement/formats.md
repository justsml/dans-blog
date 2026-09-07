<!-- BEGIN GENERATED EDITIONS -->
# Synchronized editions

Generated from [the current 40-minute outline](../../outlines/failure-improvement-40min.md).

| Length | Browser | Screen PPTX | Handout PPTX | Presenter script |
| ---: | --- | --- | --- | --- |
| 15 min | [Open](../../../reveal-talks/failure-improvement-15min.html) | [Download](../../decks/failure-improvement-15min-screen.pptx) | [Download](../../decks/failure-improvement-15min-handout.pptx) | [Script](script-15min.md) |
| 30 min | [Open](../../../reveal-talks/failure-improvement-30min.html) | [Download](../../decks/failure-improvement-30min-screen.pptx) | [Download](../../decks/failure-improvement-30min-handout.pptx) | [Script](script-30min.md) |
| 40 min | [Open](../../../reveal-talks/failure-improvement-40min.html) | [Download](../../decks/failure-improvement-40min-screen.pptx) | [Download](../../decks/failure-improvement-40min-handout.pptx) | [Script](script-40min.md) |
<!-- END GENERATED EDITIONS -->

# Formats: Automating Improvement From Failure

[Browser deck](../../../reveal-talks/failure-improvement.html).

| Length | Format | Source |
| --- | --- | --- |
| 5–10 min | Lightning or live demo | Below |
| 15 min | Lightning talk | [15-minute adaptation](../../outlines/failure-improvement-15min-adaptation.md) |
| 25–30 min | Standard session | [30-minute adaptation](../../outlines/failure-improvement-30min-adaptation.md); drop slides 10 and 12 for 25; retain the 5:30 demo |
| 40–45 min | Conference talk | [40-minute outline](../../outlines/failure-improvement-40min.md) plus five minutes of questions |
| 90 min | Workshop | Below |

## 5–10 minute lightning talk (slides)

Seven minutes, four slides from the full deck: 1, 2, 8, 15.

| Time | Beat |
| --- | --- |
| 0:00–1:00 | The logs nobody reads. "Every failure in production is a queued improvement." |
| 1:00–3:00 | Step one: hand your logs to an agent. Then the enrichment rule in one sentence: add the one integration that answers the next question, because access is a set of individual grants, not a graduation ceremony. Then the mechanism in one sentence: a scheduled check that distills and classifies everything since the last bookmark. |
| 3:00–5:30 | The gate, compressed: similarity is a candidate, not a diagnosis; regression, holdout, scope, and a person. The useful result is the fix that fails the held-out authorization case. |
| 5:30–7:00 | The five words back — alert fatigue, normalization of deviance, jidoka, automation irony, Goodhart — then the close: fail to win. |

## 5–10 minute live demo (AI Tinkerers format)

No slides, no pitch, a system you built. The offline kit is a deterministic replay and does not qualify. The live version needs a real scheduled agent reading real (or realistic sanitized) logs; see the [recording plan](../speaker/recording-plan.md) for the build list and the five-minute script. Bring a fallback recording in case of network failure.

## 90 minute workshop

Participants bring one production failure class from their own system and leave with a scheduled check that distills it, a classification prompt, and a guardrail list for the first automated ticket.

**Prerequisites sent in advance:** a laptop, a coding agent installed, read access to one log source (a file export is fine), and one failure class written down with a sample of its log lines.

| Time | Block | What happens |
| --- | --- | --- |
| 0:00–0:10 | Opening | Slides 1–2. Each participant names their failure class and its log source on a card. |
| 0:10–0:25 | Foundation | Participants point their agent at their sample logs and ask "what broke here?" Facilitator collects three outputs on the board and asks what was missing. |
| 0:25–0:40 | Enrichment | Slide 3. Each participant lists the one integration (codebase, observability, cloud, ticketing, browser) that would turn their agent's description into a location or an action. Pick one integration, not all. |
| 0:40–0:55 | The check | Slide 4. Participants draft the scheduled job: trigger, "since last check" bookmark, distill prompt, output artifact. Template provided. |
| 0:55–1:10 | Classify | Slide 5. Participants write the classification loop for their failure class: severity, evidence, owner, and an unknown result. Run it on their sample. |
| 1:10–1:20 | Guardrails | Slide 8 at full length. Participants list which of their actions need regression, holdout, and scope, and which need a person. Money and customer messaging go on the human list by default. |
| 1:20–1:30 | Feedback and share-out | Slide 11 compressed. Three participants present their check and their guardrail list. Slide 15. |

**Facilitation notes.** The classify block is where people discover their failure class is actually three. Let them split it; that is the "one at a time" lesson landing. Keep the compile-what-repeats slide as a handout. For rooms over twenty-five, do the share-out in tables.

**Artifacts participants leave with:** the scheduled-check skeleton, the distill prompt, the classification prompt, the enrichment table, the guardrail checklist.
