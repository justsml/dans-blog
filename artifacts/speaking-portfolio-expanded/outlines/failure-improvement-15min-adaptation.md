# Automating Improvement From Failure: 15-minute lightning

Full deck, unlisted slides hidden. Slide numbers refer to [the full notes](failure-improvement-40min.md). No Q&A in the timings.

**Strategy.** The foundation, the enrichment rule, the scheduled distill-and-classify mechanism, the guardrails, one glimpse of the feedback loop, and the close. Say "one failure class at a time" once on slide 3 instead of giving slide 4 its own time. Name agent-driven testing and compile-what-repeats in one breath on the way to the feedback slide.

| Time | Slide | Section | Bridge or cut |
| --- | ---: | --- | --- |
| 0:00–1:30 | 1 | Your logs are a roadmap nobody reads | Drop the story. Keep the hands-up. |
| 1:30–3:00 | 2 | Step one: hand your logs to an agent | |
| 3:00–5:00 | 3 | Enrichment is leverage | Skip the table; say "every platform has an MCP, an API, or a CLI." Bridge out with slide 4's line: "one failure class at a time, and different agents for different failures is fine." |
| 5:00–7:00 | 5 | The out-of-band check | Bridge in: "the mechanism is a cron job." |
| 7:00–8:30 | 6 | Distill, then classify | Bridge out: "with tags, it can file tickets and open PRs into a queue," which is slide 7 in one sentence. |
| 8:30–11:00 | 8 | Guardrails before autonomy | Three-gate sequence only, no port switch. Say the money rule. |
| 11:00–13:00 | 12 | Feedback is the same loop | Bridge in: "the same loop takes thumbs-downs, and the same agent can drive a browser through the PR diff and turn anything it repeats into a script." Covers slides 9, 10, and 11 in one sentence. |
| 13:00–15:00 | 17 | Fail to win, or fail to win | Add slide 16's one line: "logs, schedule, distill, classify, ticket, guard, measure." Ask the Monday question. |

**Close.** End on the question. Point to the long version for the E2E economics, the correlation and escalation flow, and the proactive-notice example.
