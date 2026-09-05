# Formats: Rethinking Parallelization in the Agentic Era

No deck or demo fixture exists yet. Every format below assumes the outline is the source of truth until the deck is built.

| Length | Format | Source |
| --- | --- | --- |
| 5–10 min | Lightning or live demo | Below |
| 15 min | Lightning talk | [15-minute adaptation](../../outlines/parallelization-15min-adaptation.md) |
| 25–30 min | Standard session | [30-minute adaptation](../../outlines/parallelization-30min-adaptation.md); drop slide 11 for 25 |
| 40–45 min | Conference talk | [40-minute outline](../../outlines/parallelization-40min.md) plus five minutes of questions |
| 60–75 min | Workshop | Below |

## 5–10 minute lightning talk (slides)

Seven minutes, four slides: 1, 2, 10, 16.

| Time | Beat |
| --- | --- |
| 0:00–1:00 | Parallel used to mean cores. |
| 1:00–2:30 | Five axes on one slide. |
| 2:30–5:30 | The tournament table: two eligible, one honest stop. |
| 5:30–7:00 | Rent reasoning; own the result. |

## 5–10 minute live demo (AI Tinkerers format)

This talk is the best fit in the portfolio for a demo-gated venue. A qualifying demo runs a real three-profile tournament live on a real flaky test: three agents launch in parallel under a $2 and 4-minute cap, one is cancelled at the cap with partial artifacts, two finish, tests and a rubric score them, a human picks, and the winning fix is compiled into a script and rerun. Five minutes, one terminal, one trace view. Bring a recording as fallback. Build required: the harness, the cap controller, the judge script.

## 60–75 minute workshop

Participants bring one recurring, expensive agent task and leave with caps, a tournament plan, and a compile candidate.

**Prerequisites sent in advance:** one agent task that runs often and costs real money or time, with its current cost and duration if known, and one example of it going wrong.

| Time | Block | What happens |
| --- | --- | --- |
| 0:00–0:10 | Opening | Slides 1–2. Participants write their task and its current cost on a card. Show of hands: who can state the maximum it may cost? |
| 0:10–0:25 | Compete | Slides 3–4. Participants write three profiles for their task and a judge rubric a human would sign. Pairs check the rubric for judge-invented criteria. |
| 0:25–0:40 | Decompose | Slides 5–6. Split the task into workers with one question, one artifact, one exit. Mark any two workers that would touch the same file. |
| 0:40–0:55 | Constrain | Slides 7–8. Set the cap: spend, wall-clock, concurrency. Write what an honest stop returns. |
| 0:55–1:10 | Tournament | Slide 10. Participants fill their own tournament table with estimated columns. Facilitator walks three. |
| 1:10–1:20 | Compile | Slides 12–13. Which part of the last successful run should already be a script? Write its promotion gate. |
| 1:20–1:30 | Tax and start | Slides 14–15. Each participant names the tax they would pay first and the axis they would start with. |
| 1:30–1:35 | Close | Slide 16. |

**Facilitation notes.** The show of hands at the opening sets the tone; let the silence sit. The compile block is where participants get concrete; keep the tax discussion short if compile runs over.

**Artifacts participants leave with:** the profile and judge template, the worker card, the cap sheet, the tournament table, the compile candidate with its gate.
