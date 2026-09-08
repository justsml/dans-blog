# Automating Improvement From Failure: bullet outline

The offline repair loop and the humans reviewing it.

Rehearsal sheet for [the 40-minute outline](outline-40min.md). 15 slides, 40 minutes, no Q&A. Every Story line needs Dan's own record before delivery. Shorter routes: [15](adaptation-15min.md) · [30](adaptation-30min.md).

## Spine

1. **Nobody reads the scroll** — 00:00 · warm · 02:30
2. **Step one: hand an agent the logs** — 02:30 · warm · 02:00
3. **Enrichment earns the next step** — 04:30 · build · 03:00
4. **The out-of-band check** — 07:30 · build · 03:00
5. **Distill, then classify** — 10:30 · build · 02:30
6. **The retry that hid the auth failure** — 13:00 · build · 03:00
7. **Tickets are cheap. Review is not.** — 16:00 · build · 02:30
8. **Demo: nothing leaves without evidence** — 18:30 · peak · 05:30
9. **Who reviews the robot's PRs?** — 24:00 · build · 03:00
10. **Compile what repeats** — 27:00 · build · 03:00
11. **Feedback is the same loop** — 30:00 · build · 02:30
12. **Correlate, escalate, and the money gate** — 32:30 · build · 02:30
13. **The metrics that will lie to you** — 35:00 · build · 02:00
14. **Start Monday** — 37:00 · land · 01:30
15. **Fail to win** — 38:30 · land · 01:30

## Slides

### 1. Nobody reads the scroll

00:00–02:30 · warm · 02:30

> The pager trained you to ignore it
> The next improvement is already in the scroll

- The logs are still arriving. Stack traces, retries, the same customer clicking the same broken button.
- This talk owns the offline improvement loop, including the people reviewing its output.
- There is a name for training people to ignore the channel that is supposed to warn them.
- Story — The failure that sat in your logs until a customer reported it. Bring the first log timestamp, the report, and what you missed.
- Do — Scroll a sanitized export. Take a show of hands: who learned about a logged failure from a customer? Allow 30 seconds.
- Source — Maria Cvach (2012), [Monitor alarm fatigue: an integrative review](https://pubmed.ncbi.nlm.nih.gov/22839984/), Biomedical Instrumentation & Technology 46(4), 268–277.

### 2. Step one: hand an agent the logs

02:30–04:30 · warm · 02:00

> Already better than the nobody who was doing it before
> Read access. One question. One saved answer.

- Give a coding agent a sanitized export. Ask what broke since yesterday.
- It may group unrelated failures together.
- Save the answer with the input window. Tomorrow, you want to know whether it found something new or just described yesterday more confidently.

### 3. Enrichment earns the next step

04:30–07:30 · build · 03:00

> Logs → code → trace → reproduction → ticket
> One failure class at a time

- A stack trace tells you where an exception surfaced.
- Add the integration that answers the next question.
- The assistant with access to everything is coming anyway, and I am not arguing against it.
- Diagram — Enrichment earns the next step
- Do — Walk up the ladder using one timeout. Stop at the first rung that supports an action. Use the contracts handout for the integration table.

### 4. The out-of-band check

07:30–10:30 · build · 03:00

> Schedule → bookmark → distill → artifact
> Advance the bookmark after durable output

- Run outside the request path. A scheduled job reads the last completed bookmark, fetches a bounded window, strips secrets, and produces an artifact.
- Only advance the bookmark after the artifact is saved.
- Keep the collection window and the classifier version beside the result.
- Diagram — The out-of-band check
- Do — Open contracts.md and trace one interrupted run. Show which artifact survives and why repeating it does not open another ticket.

### 5. Distill, then classify

10:30–13:00 · build · 02:30

> Count occurrences before guessing causes
> Severity · evidence · owner · unknown

- Distillation removes repetition. Classification decides where the remaining work goes.
- Two matching strings are a family candidate.
- Give the classifier an unknown result and a queue that receives it.

### 6. The retry that hid the auth failure

13:00–16:00 · build · 03:00

> A retry hides an auth failure
> A sleep hides a race
> Successful workaround ≠ repaired system

- A request fails. The agent retries. It works.
- Now make the failure an authorization error.
- Diane Vaughan called the organizational pattern normalization of deviance.
- Story — A workaround you left running after it stopped the symptom. Name the underlying defect and the test that eventually exposed it.
- Do — Take two short answers about fixes that hid a problem. Budget 45 seconds; do not invite incident-length stories.
- Source — Diane Vaughan, [The Challenger Launch Decision](https://press.uchicago.edu/ucp/books/book/chicago/C/bo22781921.html), University of Chicago Press, original 1996; linked enlarged edition 2016.

### 7. Tickets are cheap. Review is not.

16:00–18:30 · build · 02:30

> Tickets are cheap. Review is not.
> A proposed diagnosis travels with its evidence

- A useful ticket says what happened, how often, who was affected, and what remains unexplained.
- Opening a PR spends somebody else's attention.
- Match ceremony to consequence. A documentation correction and a payment retry do not get the same permissions because they happen to arrive through the same agent.

### 8. Demo: nothing leaves without evidence

18:30–24:00 · peak · 05:30

> Regression · holdout · scope · human
> The useful result is permission denied

- The candidate removes the visible failure.
- Run the regression. Now run the held-out authorization case.
- Toyota calls stopping at an abnormality jidoka.
- Now give the classifier the case it cannot explain.
- Do — Use the live sequence in engineering/failure-improvement/demo.md. Full slot 5:30. Run real tests; never substitute the checkbox kit for execution. Recording remains blocked until a sanitized production export, working tracker integration, and captured gate run exist.
- Source — Toyota, [Toyota Production System](https://global.toyota/en/company/vision-and-philosophy/production-system/), jidoka and the andon response.

### 9. Who reviews the robot's PRs?

24:00–27:00 · build · 03:00

> The easy cases disappear
> The reviewer keeps the exceptions

- The robot opens good PRs for a month. What happens to the person reviewing them?
- Bainbridge's Ironies of Automation asks what remains for the human after automation takes the routine work.
- My design response is to rotate review duty, reserve time for it, and practise recovery on known failures outside production.
- If the queue is too big to inspect, reduce what enters it.
- Source — Lisanne Bainbridge (1983), [Ironies of automation](https://www.sciencedirect.com/science/article/pii/0005109883900468), Automatica 19(6), 775–779.

### 10. Compile what repeats

27:00–30:00 · build · 03:00

> Nondeterminism finds the path. Determinism runs it.
> Save the script, its tests, and its invalidation rule

- Let the agent explore a changed flow in a browser.
- The scheduled check is the same move. Memory and search over prior work help identify repetition.
- This is where Adaptive, agentic apps hands work back.
- Selecting tests from a diff is another candidate.
- Story — The repeated agent task you turned into a script. Bring the file and a case where it needed invalidating.

### 11. Feedback is the same loop

30:00–32:30 · build · 02:30

> Thumbs down + a sentence of rage = a useful input
> Feedback → evidence → candidate → opt-in flag

- A thumbs-down tells you where to look. The sentence after it tells you why.
- The pipeline now proposes a change instead of a failure diagnosis.
- Keep feature requests and incident fixes visibly distinct in the queue.
- Story — A complaint that became a change, including what the first proposed fix misunderstood.

### 12. Correlate, escalate, and the money gate

32:30–35:00 · build · 02:30

> Session ID → linked trace → incident candidate
> Detect. Recommend. Draft. A person presses the button.

- A customer reports lost data. Their session links to an error.
- Three address complaints and a shipping error suggest a shared incident.
- Draft the notice before the fourth customer asks.

### 13. The metrics that will lie to you

35:00–37:00 · build · 02:00

> 100 tickets. 90 wrong. Ten worth reading.
> Measure recurrence and wrong tickets, with denominators

- Suppose the agent files a hundred tickets and a reviewer closes ninety as wrong.
- Goodhart is the warning here: once we reward a proxy, we change the behavior producing it.
- Track recurring failures after a fix, with exposure counts.
- Source — Marilyn Strathern (1997), [Improving ratings: audit in the British University system](https://gwern.net/doc/statistics/decision/1997-strathern.pdf), European Review 5(3), 305–321. The familiar target-and-measure wording is Strathern’s formulation of Goodhart’s law.

### 14. Start Monday

37:00–38:30 · land · 01:30

> One failure class
> One integration
> One place the loop must stop

- Write down one failure class you could hand this loop on Monday.
- Now name the one integration it needs next.
- Do — Give the room a full 60 seconds. Do not fill it with a recap.

### 15. Fail to win

38:30–40:00 · land · 01:30

> Alert fatigue · normalization of deviance
> Jidoka · automation irony · Goodhart

- The scroll is still arriving. Now the loop leaves a smaller pile of inspectable work, and it knows where to stop.
- Alert fatigue explains the unread channel.
- The model did not get smarter. The system around it got a job.
- Do — Replay the opening scroll beside the distilled artifact. End there. Stop talking.
