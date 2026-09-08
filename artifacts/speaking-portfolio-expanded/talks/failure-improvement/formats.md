# Formats: The Pager Cried Wolf

Browser deck (deck not yet rebuilt; see [decks](../../../decks/README.md)).

| Length | Format | Source |
| --- | --- | --- |
| 5–10 min | Lightning or live demo | Below |
| 15 min | Lightning talk | [15-minute adaptation](adaptation-15min.md) |
| 25–30 min | Standard session | [30-minute adaptation](adaptation-30min.md); for 25 minutes use the 15-minute route plus ten minutes of questions; the 30-minute route has its own cuts |
| 40–45 min | Conference talk | [40-minute outline](index.md) plus five minutes of questions |
| 90 min | Workshop | Below |

## 5–10 minute lightning talk (slides)

Seven minutes, four slides from the full deck: 1, 2, 8, 15; the second beat borrows one line each from slides 3 and 4.

| Time | Beat |
| --- | --- |
| 0:00–1:00 | The logs nobody reads. "Every failure in production is a queued improvement." |
| 1:00–3:00 | Step one: hand your logs to an agent. Then the enrichment rule in one sentence: add the one integration that answers the next question, because access is a set of individual grants, not a graduation ceremony. Then the mechanism in one sentence: a scheduled check that distills and classifies everything since the last bookmark. |
| 3:00–5:30 | The gate, compressed: similarity is a candidate, not a diagnosis; regression, holdout, scope, and a person. Use the new cancellation/scope case from demo.md; keep the two decisions and reveal. |
| 5:30–7:00 | Return to the unread queue: do not let the loop train you to stop reading. |

## 5–10 minute live demo (AI Tinkerers format)

This proposed separate meetup format requires a working supporting implementation and captured validation, neither verified here. Do not submit it as an available live demo yet. It is not part of the slide talk. See the [recording plan](../../speaker/recording-plan.md) for the build list.

## 90 minute workshop

Participants bring one production failure class from their own system and leave with a design for a scheduled check that distills it, a classification prompt, and a guardrail list for the first automated ticket.

**Prerequisites sent in advance:** a laptop, a coding agent installed, read access to one log source (a file export is fine), and one failure class written down with a sample of its log lines.

| Time | Block | What happens |
| --- | --- | --- |
| 0:00–0:10 | Opening | Slides 1–2. Each participant names their failure class and its log source on a card. |
| 0:10–0:25 | Foundation | Participants point their agent at their sample logs and ask "what broke here?" Facilitator collects three outputs on the board and asks what was missing. |
| 0:25–0:40 | Enrichment | Slide 3. Each participant lists the one integration (codebase, observability, cloud, ticketing, browser) that would turn their agent's description into a location or an action. Pick one integration, not all. |
| 0:40–0:55 | The check | Slide 4. Participants draft the scheduled job: trigger, "since last check" bookmark, distill prompt, output artifact. Use the fields in contracts.md as the worksheet; no runnable template is promised. |
| 0:55–1:10 | Classify | Slide 5. Participants write the classification loop for their failure class: severity, evidence, owner, and an unknown result. Run it on their sample. |
| 1:10–1:20 | Guardrails | Slide 8 at full length. Participants list which of their actions need regression, holdout, and scope, and which need a person. Money and customer messaging go on the human list by default. |
| 1:20–1:30 | Feedback and share-out | Slide 11 compressed. Three participants present their check and their guardrail list. Slide 15. |

**Facilitation notes.** The classify block is where people discover their failure class is actually three. Let them split it; that is the "one at a time" lesson landing. Keep the compile-what-repeats slide as a handout. For rooms over twenty-five, do the share-out in tables.

**Artifacts participants leave with:** the scheduled-check design, the distill prompt, the classification prompt, the enrichment table, the guardrail checklist.
