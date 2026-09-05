# Formats: Building Adaptive & Dynamic AI Systems

| Length | Format | Source |
| --- | --- | --- |
| 5–10 min | Lightning or live demo | Below |
| 15 min | Lightning talk | [15-minute adaptation](../../outlines/adaptive-systems-15min-adaptation.md) |
| 25–30 min | Standard session | [30-minute adaptation](../../outlines/adaptive-systems-30min-adaptation.md); drop slide 13 for 25 |
| 40–45 min | Conference talk | [40-minute outline](../../outlines/adaptive-systems-40min.md) plus five minutes of questions |
| 60–75 min | Workshop | Below |

## 5–10 minute lightning talk (slides)

Seven minutes, four slides: 1, 4, 10, 17.

| Time | Beat |
| --- | --- |
| 0:00–1:00 | Two requests, one architecture. |
| 1:00–2:30 | The contract: evidence, DAG, budget, deadline, scopes, escalation. The planner proposes; a validator decides. |
| 2:30–5:30 | Demo compressed: novel case, one cap, human gate. |
| 5:30–7:00 | Autoscaling, but for cognition. |

## 5–10 minute live demo (AI Tinkerers format)

The offline kit replays fixtures and does not qualify. A qualifying demo runs a real planner against two live requests: show the contract it emits, the validator rejecting an over-budget plan, the controller reserving spend, and a deadline cancelling a branch mid-flight with the trace explaining why. Five minutes, one terminal, one trace viewer. Requires a working planner and controller; the kit's `demo-logic.js` documents the intended policy.

## 60–75 minute workshop

Participants bring one workflow that currently uses a fixed architecture and leave with a contract, a strategy set, and a governor list for it.

**Prerequisites sent in advance:** a laptop, one workflow description with two contrasting request examples (one routine, one hard), and current per-request cost and latency if known.

| Time | Block | What happens |
| --- | --- | --- |
| 0:00–0:10 | Opening | Slides 1–2. Each participant writes their two requests on cards and the architecture both currently receive. |
| 0:10–0:25 | Strategy, not model | Slide 3. For each request card, participants name the full strategy: model, tools, topology, verification, stop condition. Pairs compare. |
| 0:25–0:45 | The contract | Slide 4. Participants fill the twelve-line contract for the hard request. Facilitator reviews three on the board for missing evidence requirements or unbounded scopes. |
| 0:45–0:55 | Scaling axes | Slides 5–7 compressed. Which request needs a deeper attempt, which needs independent branches, and which needs neither? |
| 0:55–1:05 | Governors | Slide 8. Participants list every cap their controller must enforce, then mark which currently live only in a prompt. |
| 1:05–1:15 | Demo | Slide 10 at full length. Participants map their contract onto the three fixture strategies. |
| 1:15–1:25 | AGENTS.md | Slide 16. Draft the three horizons for the workflow. Facilitator checks each "future" item has an owner and activation condition. |
| 1:25–1:35 | Share-out and close | Three participants present their contract and the cap that surprised them. Slide 17. |

**Facilitation notes.** The governors block usually reveals that budgets exist only as prompt text. Let that discussion run. Skip dynamic A/B and mirrored traffic in the workshop; hand out the slides.

**Artifacts participants leave with:** the contract schema, the strategy card, the governor checklist, the AGENTS.md skeleton.
