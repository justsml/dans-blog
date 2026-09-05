# Formats: Automating Improvement From Failure

| Length | Format | Source |
| --- | --- | --- |
| 5–10 min | Lightning or live demo | Below |
| 15 min | Lightning talk | [15-minute adaptation](../../outlines/failure-improvement-15min-adaptation.md) |
| 25–30 min | Standard session | [30-minute adaptation](../../outlines/failure-improvement-30min-adaptation.md); drop slides 12–13 for 25 |
| 40–45 min | Conference talk | [40-minute outline](../../outlines/failure-improvement-40min.md) plus five minutes of questions |
| 60–75 min | Workshop | Below |

## 5–10 minute lightning talk (slides)

Seven minutes, four slides from the full deck: 1, 3, 9, 16.

| Time | Beat |
| --- | --- |
| 0:00–1:00 | The database-not-ready failure, three days running. "The human became the database." |
| 1:00–2:30 | The ladder on one slide. Top is code and hooks; bottom is hope. |
| 2:30–5:30 | The demo, compressed: two errors normalize, three gates, promotion blocked until holdout passes. |
| 5:30–7:00 | Pruning in one line, then the close: use expensive nondeterminism to manufacture cheap determinism. |

## 5–10 minute live demo (AI Tinkerers format)

No slides, no pitch, a system you built. The offline kit is a deterministic replay and does not qualify. The live version needs a real harness; see the [recording plan](../speaker/recording-plan.md) for the build list and the five-minute script. Bring a fallback recording in case of network failure.

## 60–75 minute workshop

Participants bring one recurring correction from their own system. The workshop ends with a candidate fix, its fixtures, and a lifecycle record.

**Prerequisites sent in advance:** a laptop, one recurring failure written down with its exact error text, and read access to the repo where it happens.

| Time | Block | What happens |
| --- | --- | --- |
| 0:00–0:10 | Opening | Slides 1–2. Each participant writes their failure on a card: error, environment, what the human did. |
| 0:10–0:25 | The ladder | Slides 3–5. Participants place their failure on a rung and defend it to a neighbor. Facilitator collects three examples on the board. |
| 0:25–0:40 | Hooks and case records | Slide 6. Participants draft the case record for their failure using the template. Which fields would a post-tool hook fill automatically? |
| 0:40–0:55 | Fixtures | Slides 7–8. Write four fixtures for your failure: the case that needs the fix, one where it already works, one where the fix would be wrong, one that must stop. |
| 0:55–1:05 | Demo and gates | Slide 9 at full length. Participants map their fixtures onto regression, holdout, and scope. |
| 1:05–1:15 | Search and optimizers | Slides 11–12 compressed. Which participants have a judgment problem rather than a precondition problem? Those get DSPy/GEPA as the route. |
| 1:15–1:25 | Lifecycle | Slide 14. Fill the lifecycle record: owner, scope, source, verified cases, supersession condition. |
| 1:25–1:35 | Share-out and close | Three participants present their fix and its "wrong" fixture. Slide 16. |

**Facilitation notes.** Keep the managed-stack slide as a handout. The workshop's value is the fixtures block; protect its time. For rooms over twenty-five, do the share-out in tables rather than to the whole room.

**Artifacts participants leave with:** the case-record template, the `SKILL.md` skeleton, the hook pair, the fixture pattern, the lifecycle record.
