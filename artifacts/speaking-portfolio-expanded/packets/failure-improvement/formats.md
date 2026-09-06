# Formats: Automating Improvement From Failure

[PPTX](../../decks/failure-improvement-40min.pptx)

| Length | Format | Source |
| --- | --- | --- |
| 5–10 min | Lightning or live demo | Below |
| 15 min | Lightning talk | [15-minute adaptation](../../outlines/failure-improvement-15min-adaptation.md) |
| 25–30 min | Standard session | [30-minute adaptation](../../outlines/failure-improvement-30min-adaptation.md); drop slides 13–14 for 25 |
| 40–45 min | Conference talk | [40-minute outline](../../outlines/failure-improvement-40min.md) plus five minutes of questions |
| 60–75 min | Workshop | Below |

## 5–10 minute lightning talk (slides)

Seven minutes, four slides from the full deck: 1, 2, 8, 17.

| Time | Beat |
| --- | --- |
| 0:00–1:00 | The logs nobody reads. "Every failure in production is a queued improvement." |
| 1:00–3:00 | Step one: hand your logs to an agent. Then the enrichment rule in one sentence: the more it can see, the more you can trust it to act. Then the mechanism in one sentence: a cron job that distills and classifies everything since the last check. |
| 3:00–5:30 | Guardrails, compressed: similarity is a candidate, three gates, and a human whenever money moves. |
| 5:30–7:00 | The feedback loop in one line, then the close: fail to win, or fail to win. |

## 5–10 minute live demo (AI Tinkerers format)

No slides, no pitch, a system you built. The offline kit is a deterministic replay and does not qualify. The live version needs a real scheduled agent reading real (or realistic sanitized) logs; see the [recording plan](../speaker/recording-plan.md) for the build list and the five-minute script. Bring a fallback recording in case of network failure.

## 60–75 minute workshop

Participants bring one production failure class from their own system and leave with a scheduled check that distills it, a classification prompt, and a guardrail list for the first automated ticket.

**Prerequisites sent in advance:** a laptop, a coding agent installed, read access to one log source (a file export is fine), and one failure class written down with a sample of its log lines.

| Time | Block | What happens |
| --- | --- | --- |
| 0:00–0:10 | Opening | Slides 1–2. Each participant names their failure class and its log source on a card. |
| 0:10–0:25 | Foundation | Participants point their agent at their sample logs and ask "what broke here?" Facilitator collects three outputs on the board and asks what was missing. |
| 0:25–0:40 | Enrichment | Slide 3. Each participant lists the one integration (codebase, observability, cloud, ticketing, browser) that would turn their agent's description into a location or an action. Slide 4: pick one, not all. |
| 0:40–0:55 | The check | Slide 5. Participants draft the scheduled job: trigger, "since last check" bookmark, distill prompt, output artifact. Template provided. |
| 0:55–1:10 | Classify | Slide 6. Participants write the classification loop for their failure class: pattern, severity, risk, security class. Run it on their sample. |
| 1:10–1:20 | Guardrails | Slide 8 at full length. Participants list which of their actions need the three gates and which need a human. Money and customer messaging go on the human list by default. |
| 1:20–1:30 | Feedback and share-out | Slide 12 compressed. Three participants present their check and their guardrail list. Slide 17. |

**Facilitation notes.** The classify block is where people discover their failure class is actually three. Let them split it; that is the "one at a time" lesson landing. Keep the E2E economics and compile-what-repeats slides as a handout. For rooms over twenty-five, do the share-out in tables.

**Artifacts participants leave with:** the scheduled-check skeleton, the distill prompt, the classification prompt, the enrichment table, the guardrail checklist.
