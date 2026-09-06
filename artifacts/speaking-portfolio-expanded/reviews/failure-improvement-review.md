# Review: Automating Improvement From Failure

Reviewed 2026-09-06 against `outlines/failure-improvement-40min.md` (17 slides), the 15- and 30-minute adaptations, `packets/failure-improvement/{packet,formats,evidence-bank}.md`, `engineering/failure-improvement/{CFP,evidence,demo}.md`, `demos/DEMO-RUNBOOK.md` §2, and `reveal-talks/failure-improvement.html`. Compared against the current portfolio bar (`outlines/free-tier-40min.md`) and the two rewritten siblings (`adaptive-systems-40min.md`, `dynamic-scaling-40min.md`).

---

## 1. Verdict

It would win a slot. It is the most immediately useful talk in the portfolio, the abstract is concrete, and the arc is legible — "hand an agent your logs, then earn each next permission" is a real spine you can say in one sentence. It is **not yet strong enough to be the recorded flagship**, and the gap is not polish. The single biggest problem: **this talk is a well-ordered list of good ideas with no idea in it.** Fifteen of seventeen slides tell you what to build; none tell you something you did not already suspect. Free-tier imports eight words from a hundred and fifty years of economics and hands them to the room; adaptive-systems has a thesis about authority you can disagree with. This one has a roadmap. A roadmap is the thing a blog post does better than a stage does.

Second, and specific to the flagship stakes: **the peak is the least differentiated slide in the deck.** Slide 8's "regression · holdout · scope" is adaptive-systems slide 8 ("The agent does not write its own exam", "Held-out fixtures under separate control") and slide 13 ("Widen authority only from measured outcomes: shadow, canary, expand") with fewer teeth. And it is illustrated by a checkbox replay that the portfolio's own docs disqualify — `formats.md`: "The offline kit is a deterministic replay and does not qualify."

On the duplication question the parent asked: **the talk does own its territory.** Adaptive-systems slide 14 defers explicitly — "The full improvement loop is the failure-improvement talk" — and dynamic-scaling has no compile-what-repeats beat at all (slide 14 closes on ledgers and admission; the parent's brief overstates it). The runtime/offline boundary is clean. The problem is that this talk never *claims* the boundary out loud, so a program committee reading all three packets sees three sets of guardrails and no statement of which talk owns which.

---

## 2. The roast

**1. The scope disclaimer is fine; the *hedging* has migrated into the deck body and multiplied.**
The outline follows the rule — one Scope paragraph up top. But the generated deck turned every story slot into an apology *on the slide*: "No verified personal story was supplied. Omit this cue if none is available" (slide 1), then "Omit if none is available" on slides 2, 3, 6, 7, 9, 11 and 12. That is seven printed confessions of missing content in a deck being exported at 1920×1080 for a public recording. Nobody should be able to film this deck by accident.

**2. Story slots: 8 of them, 0 filled, in the talk selected for the recording.**
`evidence-bank.md` has four candidates and every field is a bracket: "**Problem and operating context:** [which system, which log source, who was reading it before]". Slide 1's slot — "a failure that sat in your logs for weeks before a customer reported it" — is the *load-bearing* one. Without it, slide 1's argument is "teams pay for observability and then read it only when a pager goes off," asserted about the audience, by a speaker who supplies no instance of it happening to him. That is a talk that accuses the room and exempts the speaker. The self-implicating register is Dan's best asset and it is entirely absent from this talk. Compare free-tier slide 6, which opens the CFO conversation with "You are not being gouged and you did not do anything wrong."

**3. Slide 10 contradicts the outline's own preamble, in writing, and the models look fabricated.**
Preamble: "Verify the model names you plan to say on slide 10; **the outline leaves them blank on purpose**." Slide 10 then reads: "Name a few cheap models you have measured multi-step dynamic browser tasks with: `GPT-5.6-luna`, `GLM-5.3-flash`, `deepseek-v4-flash`, `gemini-3.7-flash`." Followed by "We traded several-hour-long E2E test suite with an LLM based selection of the '3 individual tests most likely to be affected by the current change' for **$0.36-$0.81**." `evidence.md` explicitly forbids this: "Name only models you have run on this workload, and give the observed cost per session or none at all." The deck is clean here; the outline is not. This is the only checkable number in the talk and it is currently sitting inside the file that says not to say it.

**4. Slide 10 also ends with the worst sentence in the portfolio.**
"There are additional ways to help the model associate & target the optimal test(s) when given a feature/PR's description & code changes, **ask me later if you are curious about the advanced options here.**" Ampersands, a parenthetical plural, and a promise to explain the interesting part after the talk. If the advanced options are worth a sentence they are worth a slide; if not, cut them. "Ask me later" on a filmed talk is a dead link.

**5. Slides 9, 10 and 11 are a second talk wearing the first talk's badge.**
Slides 1–8 are: production failures become classified, guarded work. Slides 9–11 are: exploratory agent testing is cheaper than your Playwright suite. Slide 9 admits the seam — "**you have a jumping-off point** for the other kind of testing." Slide 11 then has to reach backward to re-staple them: "That log-distilling check on slide 5 is exactly this. So is the login script on slide 9." When a slide has to argue that it belongs in the talk, it does not yet belong in the talk. The E2E economics material is genuinely good and would win a lightning slot on its own; here it costs 5 minutes and steals the momentum between the peak and the feedback loop.

**6. The peak is not a peak, and its demo is disqualified by your own paperwork.**
Slide 8 is marked `peak`, gets 4:00, and the audience's experience of it is: two error strings normalize to the same family, then three checkboxes. `demo.md` is honest about what that is — "The checkboxes represent evidence a real pipeline must gather. Clicking them neither runs a test nor proves a root cause. The browser does not read logs, edit files, promote code, call a model, or train anything." So at the emotional high point of a talk about automating improvement, the room watches a form that does nothing, having been told it does nothing. Meanwhile the one genuinely surprising sentence in the whole deck is buried in the same slide's prose: "A retry hides an auth failure. A sleep hides a race." That is the talk. It is currently a subordinate clause.

**7. Generic vocabulary where four disciplines have exact names.** See §3. Nine examples in the current text, none named:
- "Teams pay for observability and then read it only when a pager goes off" → alert fatigue.
- "A looping agent will happily learn the wrong lesson from a successful workaround" → normalization of deviance.
- "Measure: time from failure to ticket" → a Goodhart metric, proposed without comment.
- "a human when money or data moves" → the andon cord, stated without the fifty years of practice behind it.
- The entire absence of any slide about what happens to the engineer who now reviews the robot's PRs → automation irony.

**8. No memorable line, and the one it has is a pun it explains twice.**
"Fail to win, or fail to win" appears as the title of slide 17, in the thesis, in the 15-minute adaptation, in the close, and is then unpacked for the audience in two clauses: "Fail to win: let the failures drive the wins. Or fail to win: watch someone else's system do it first." A pun you have to gloss is a pun that did not land. Compare what this deck *could* keep: "an agent... is already better than the nobody who was doing it before" (slide 2) is the only line in the talk that sounds like Dan, and it is thrown away in the middle of a paragraph.

**9. Deck/outline drift, and the flagship is the least-tooled talk in the repo.**
`build-talk.ts` registers `adaptive-systems`, `dynamic-scaling`, `evidence-learning`, `free-tier` — **not `failure-improvement`**. The rewritten siblings have `visuals.md`, `script-40min.md`, `script-30min.md`, `script-15min.md`, `contracts.md` and real SVGs under `reveal-talks/assets/<slug>/`. `packets/failure-improvement/` has three files, links to a `.pptx`, and `reveal-talks/assets/failure-improvement/` does not exist. Every slide's art is still an unrendered `<!-- image: ... -->` prompt. The talk chosen for the camera is the only one that cannot be regenerated by the build script.

**10. Timing is honest, but slide 16 is not.**
The clock adds up cleanly (2, 4:30, 7:30, 9:30, 12, 14:30, 17, 21, 23, 25:30, 28, 30:30, 32:30, 34:30, 36, 38, 40) and there are only three interaction beats — no timing fiction here, unlike other talks in this set. Say that plainly. The exception: slide 16 gets 2:00 total and contains a seven-step roadmap, three metrics, a claim about ROI, *and* a "Write down (60 s)" exercise. That leaves sixty seconds for eleven items. One of them has to go, and it should be the roadmap recital, because slide 17 says it again.

**11. Boilerplate check: clean, and the packet is better than most.**
The four audience-specific abstracts are genuinely rewritten per audience (the education one — "instructors experience as 'the tool broke again'" — is not a find-and-replace of the engineering one). No manufactured hit here. The `formats.md` workshop block is the strongest in the portfolio; the facilitation note "The classify block is where people discover their failure class is actually three" is a real observation and should be *on a slide in the talk*, not buried in a workshop appendix.

**12. Title-to-content match: strong, with one crack.** "Automating Improvement From Failure" delivers. But slide 12 ("Feedback is the same loop") and slide 15 ("personalized software") are improvement from *success and desire*, not failure. Slide 15 in particular — "Speculation, labeled as such... Who knows." — is 90 seconds of admitted hand-waving in a talk whose whole pitch is "actionable Monday." Cut it and the title gets truer.

---

## 3. The missing discipline

This talk is building an automated safety-critical feedback controller and describing it in the vocabulary of a build guide. Four disciplines have already named everything on these slides, and one of them is *directly about the exact system Dan is proposing*.

**The one that changes the talk: Bainbridge (1983), "Ironies of Automation."**
Lisanne Bainbridge, *Automatica* 19(6):775–779. Her argument: automating a process does not remove the human, it leaves the human the tasks the designer could not automate — and monitoring a system that is usually right is a task humans are measurably bad at. Skills decay when unused, so the operator is least prepared exactly when the automation hands control back, which it does only during the hardest cases. Now read slide 7 of this talk: "Then PRs, into a queue. The queue can be a human reviewer." The talk builds a machine that files tickets and opens PRs, and never once asks what happens to the engineer whose job is now *reviewing an agent that is right most of the time*. That is not a caveat, it is a missing slide and arguably the most thought-provoking one available. Related and citable: Endsley & Kiris (1995), "The Out-of-the-Loop Performance Problem and Level of Control in Automation," *Human Factors* 37(2):381–394; Sarter, Woods & Billings (1997), "Automation Surprises," in *Handbook of Human Factors and Ergonomics*, 2nd ed.

**Vaughan (1996), *The Challenger Launch Decision*** (University of Chicago Press) — normalization of deviance. Slide 8 already describes it perfectly and does not name it: "A looping agent will happily learn the wrong lesson from a successful workaround. A retry hides an auth failure. A sleep hides a race." Vaughan's finding was that O-ring erosion became acceptable one successful launch at a time, each step locally reasonable. An improvement loop that measures itself by *successful* outcomes is a normalization-of-deviance engine with a cron schedule. Name it and slide 8 stops being a checklist and becomes an argument.

**Alert fatigue** — the reason slide 1 is true. Best primary source outside software: Cvach (2012), "Monitor Alarm Fatigue: An Integrative Review," *Biomedical Instrumentation & Technology* 46(4):268–277, reviewing why clinicians disable and ignore alarms with high false-positive rates. This is the mechanism behind "read it only when a pager goes off," and it is also the failure mode of the system Dan is proposing: an agent that files tickets enthusiastically recreates the condition that made the logs unreadable. That tension is a better slide 4 than "do not wire everything on day one."

**Goodhart's law**, applied to slide 16's proposed metrics. Goodhart (1975), "Problems of Monetary Management: The U.K. Experience"; the familiar phrasing is Strathern (1997), "'Improving ratings': audit in the British University system," *European Review* 5(3):305–321. Slide 16 currently says "Measure: time from failure to ticket, repeat failures after a fix, feedback items that became changes." Two of those three optimize beautifully by filing more tickets, faster, about nothing. Dan should say so on stage — it is the kind of self-undercutting move his voice does well and it buys enormous credibility three slides from the close.

**Jidoka and the andon cord** — Taiichi Ohno, *Toyota Production System: Beyond Large-Scale Production* (Productivity Press, 1988; Japanese ed. 1978). The principle is not "anyone can stop the line" as a morale story; it is *autonomation*: a machine that detects its own abnormality and halts rather than producing defects at speed. That is precisely the human gate on slides 8 and 13, and it reframes the gate from "a safety hedge" to "the thing that makes the automation worth having." **Contested — flag it:** the popular "any worker can pull the cord and stop the whole plant" telling is heavily romanticized in Western management literature; in practice the pull triggers a fixed-position stop and a team-leader response, not a plant halt. Say the accurate version or don't say it.

**Blameless postmortem practice**, for slide 6's classification and slide 13's escalation. John Allspaw, "Blameless PostMortems and a Just Culture" (Etsy *Code as Craft*, 22 May 2012), building on Sidney Dekker, *Just Culture* (Ashgate, 2007) and Dekker's *Field Guide to Understanding Human Error*. Directly relevant and underused: when the agent files the ticket, it also writes the narrative, and it has no incentive to be blameless — or to be blameful. Who is accountable for a wrong "low" severity tag is a live question the talk raises ("a wrong 'low' is worse than a wrong 'high'") and drops.

**Available and probably worth one line each, not slides:**
- Richard Cook (1998/2000), "How Complex Systems Fail," Cognitive Technologies Laboratory, University of Chicago — #7 ("post-accident attribution to a root cause is fundamentally wrong") is the sharpest possible attack on an agent that assigns causes automatically.
- Ashby (1956), *An Introduction to Cybernetics* — the law of requisite variety: a controller must have at least as much variety as the system it regulates. This is the formal statement of slide 3's enrichment ladder and slide 4's "one failure class at a time."
- Beyer, Jones, Petoff & Murphy, *Site Reliability Engineering* (O'Reilly, 2016), ch. 5, "Eliminating Toil" — gives the room a word for what slide 11 is doing.
- Reason (1990), *Human Error* (Cambridge UP) and Reason (2000), "Human error: models and management," *BMJ* 320:768–770 — the Swiss cheese model. **Evaluated and I would discard it.** It is the most over-cited model in this space, it is a defence-in-depth picture, and slide 8 already shows three layered gates without needing the cheese.

**Suggested word list for the close** (free-tier hands the room eight words and lists them back on slide 15; this talk should hand back five): *alert fatigue · normalization of deviance · jidoka · automation irony · Goodhart*. Every one of them is a thing an engineer in that room has felt and cannot name in a planning meeting. That is the whole reason free-tier works.

---

## 4. A proposed new arc

40 minutes, 15 slides, four audience moments, no Q&A. Spine, sayable in one sentence: **an agent can work the queue your logs have been filling for years, but every permission you hand it has to be bought with evidence, and the last thing you automate is the part where the system admits it does not know.**

| # | Slide | Min | Cum | Status | What it does |
|---|---|---|---|---|---|
| 1 | Your logs are a roadmap nobody reads | 2.5 | 2.5 | **kept, rewritten** | Opens on the scroll; the scope disclaimer said once and never again; the hands-up; **the story slot filled** — the failure that sat in the logs until a customer found it. Ends by naming *alert fatigue*: you didn't stop reading because you're lazy, you stopped because the pager trained you to. |
| 2 | Step one: hand an agent the logs | 2.0 | 4.5 | **kept, trimmed** | The whole first step, smaller than expected. Keep "already better than the nobody who was doing it before" and put it on the slide. Cut the vendor list to one clause. |
| 3 | Enrichment is leverage | 3.0 | 7.5 | **kept + merged (old 3 + old 4)** | The ladder as a drawn ladder, not a five-row table. Absorbs old slide 4's whole point in two lines: "an agent reading everything writes you a summary of the noise — one failure class at a time." Table moves to the handout. |
| 4 | The out-of-band check | 3.0 | 10.5 | **kept, reordered earlier** | The cron, the bookmark, the artifact. Show the workflow skeleton once. This is the most copy-pasteable slide in the talk; give it the room. |
| 5 | Distill, then classify | 2.5 | 13.0 | **kept** | Tags are what make routing possible. Add the workshop's best observation as the punchline: most people discover their one failure class is actually three. |
| 6 | The retry that hid the auth failure | 3.0 | 16.0 | **new** | The idea slide. Vaughan, normalization of deviance, Challenger in three sentences. A loop that scores itself on successful outcomes will learn to prefer workarounds. Audience moment: two answers on "name a fix your team is still running that hid something." |
| 7 | From tags to tickets and PRs | 2.5 | 18.5 | **kept** | Tickets are cheap, PRs are not. Match ceremony to consequence. Now *earned* by slide 6 instead of asserted. |
| 8 | **PEAK: nothing leaves the queue without evidence** | 5.5 | 24.0 | **kept, upgraded** | Regression · holdout · scope · human. Named as jidoka: the machine that stops itself is the reason the automation is worth having. **Live demo, not the checkbox kit** (see §7). Ends on the permission-denied case: the loop says it does not know, out loud. |
| 9 | Who reviews the robot's PRs? | 3.0 | 27.0 | **new** | Bainbridge. You did not delete the work; you promoted yourself to monitoring a system that is right most of the time, which is a job humans are bad at. What the queue does to the reviewer, and what to do about it (sampling, rotation, deliberately unreviewed holdouts). The most thought-provoking slide in the talk. |
| 10 | Compile what repeats | 3.0 | 30.0 | **merged (old 9 + 10 + 11)** | Nondeterminism finds the path, determinism runs it. The browser-driving agent and the E2E economics become the *worked example* of this slide, not two slides of their own — one number, measured, or none. Slide 4's check and the login script are cited as the same move. |
| 11 | Feedback is the same loop | 2.5 | 32.5 | **kept** | Thumbs-down through the same pipeline. Feature request → PR → flag for one user → similar users → guards → human. |
| 12 | Correlate, escalate, and the money gate | 2.5 | 35.0 | **merged (old 13 + 14)** | Session ID matches an error → linked, escalated, support opens a ticket that already has the trace. Three tickets before the fourth customer. Then the money rule, hard: detect, recommend, draft — a person presses the button. |
| 13 | The metrics that will lie to you | 2.0 | 37.0 | **new (replaces old 15)** | Goodhart. Time-to-ticket and tickets-filed both optimize by filing more tickets about nothing. What to measure instead: failures that recurred after a fix, and tickets a human closed as wrong. The credibility slide. |
| 14 | Start Monday | 1.5 | 38.5 | **kept, cut in half** | Drop the roadmap recital (slide 15 says it). Keep only the 60-second write-down: one failure class, one integration. |
| 15 | Fail to win | 1.5 | 40.0 | **kept, cut** | Replay the scroll. "The model did not get smarter. The system around it got a job." List the five words back. Say the pun **once** and do not explain it. |

**Cut outright:** old slide 15 (personalized software speculation) — 90 seconds of "who knows" in a talk selling Monday. Old slide 4 and old slide 9 survive as lines inside 3 and 10. The vendor table survives as a handout.

**Audience moments (4, matching the portfolio standard):** hands-up on slide 1; two answers on slide 6; the demo question on slide 8 ("does similarity establish cause?"); the 60-second write-down on slide 14.

---

## 5. The one thing

**Add slide 9 — "Who reviews the robot's PRs?" — and let Bainbridge reframe the whole talk.**

Right now the talk's implied promise is *the loop does the work*. Bainbridge's finding is that it never does; it redistributes the work to the part of the job humans handle worst, and it does so invisibly. Putting that on stage converts the talk from a build guide into an argument, gives the guardrails a *reason* instead of a checklist, and — most valuable for a speaker with unfilled story slots — it is the one slide where being honest about the limits of a system you built is the content rather than a disclaimer about it. It also cleanly claims the territory the two sibling talks hand over: they own the runtime loop, this one owns the offline loop *and the humans standing next to it*.

Everything else on this list is a rewrite. That is a new idea.

---

## 6. Facts to check or claims to soften

1. **`GPT-5.6-luna`, `GLM-5.3-flash`, `deepseek-v4-flash`, `gemini-3.7-flash`** (outline slide 10). I cannot verify any of these as shipping model identifiers, and at least one reads as a placeholder. The outline's own preamble says the names are "blank on purpose." Delete them from the file. Say only models Dan has run, on the day of the talk.
2. **"$0.36-$0.81"** (outline slide 10) and "**We traded** several-hour-long E2E test suite..." Currently the talk's only checkable number and it has no entry behind it — `evidence-bank.md` candidate 2 is entirely brackets. Either fill candidate 2 with method, model, date and task set, or delete the number. Do not soften it to "roughly a dollar"; an unsourced number with a hedge is still an unsourced number.
3. **"half the failures are flakiness nobody can interpret"** (slide 10). Stat-shaped, unsourced. Soften to "in every suite I have worked on" or cite something real.
4. **"Every logging and observability platform now has some mix of MCP server, API, and CLI... Nobody is blocked on integration."** (slide 3). "Every" and "nobody" are both false for someone in the room running an in-house log pipeline or a locked-down vendor tier. Soften to "every platform I have checked" and keep the verify-before-delivery discipline the table already demands.
5. **"Hermes"** listed alongside Claude Code and Codex as a coding agent (slide 2, and in the deck). Verify this is a current, recognizable product before naming it on camera; the name collides with at least one unrelated model family.
6. **Anthropic, "Demystifying evals for AI agents," January 9, 2026** (`packet.md`, `evidence.md`). Confirm the URL and date resolve before the talk; a dead citation in a filmed talk is permanent.
7. **The `.pptx` link** in `packets/failure-improvement/packet.md` and `formats.md` points at `../../decks/failure-improvement-40min.pptx` while the portfolio has moved to reveal decks. Verify it exists and is current, or drop the link.
8. **Andon cord**, if adopted: use the accurate jidoka framing, not the "any worker stops the whole plant" legend. Cite Ohno (1988).
9. **"pays huge dividends for a small build"** (slide 16). Unquantified ROI claim. `evidence.md` already bans turning "low lift" into an estimate for someone else's system — this sentence is the same move with a different noun. Cut or attach a number Dan owns.
10. **"There has never been a smoother way to show a client that asking for something can lead to having it"** (slide 12). Superlative, unfalsifiable. Trim to the observation without "never."

---

## 7. Recording readiness

**Blockers before this is filmed.**

1. **Fill at least three story slots**, including slide 1's. A recorded talk with eight visible `[bracket]` slots is a draft. If only one can be filled from the record, restructure so the talk leans on that one and stops promising the others.
2. **Strip the presenter cues out of the deck body.** "No verified personal story was supplied. Omit this cue if none is available" cannot be on screen. These belong in speaker notes.
3. **Register `failure-improvement` in `build-talk.ts`** and produce `visuals.md`, `script-40min.md`/`script-30min.md`, and real SVGs under `reveal-talks/assets/failure-improvement/`. Every `<!-- image: -->` comment is currently an unrendered prompt. The flagship should not be the only talk in the repo that cannot be regenerated.
4. **Fix slide 10 before it is spoken**, per §6.1–6.3, or cut it — the 25-minute recording cut in `recording-plan.md` drops slides 13 and 14, but *keeps* 10.
5. **Decide the boundary out loud.** One sentence, once, probably on slide 4: this talk is the offline improvement loop; the runtime recovery loop is a different talk. Adaptive-systems already points here by name; the pointer should be mutual, and it is the cheapest possible defence against a committee reading three packets and seeing one talk.
6. **Reconcile the recording cut with the new arc.** `recording-plan.md` says "drop slides 13 and 14 (correlation and the proactive notice) to land at 25 minutes." Under the proposed arc those are merged into one slide; the 25-minute cut should instead drop slides 10 and 12 and keep 6, 9 and 13 — the three slides carrying the ideas. Cutting the ideas to keep the roadmap is exactly the wrong trade for a calling card.

**What the five-minute live demo must actually show.** `formats.md` is already correct that the offline kit "does not qualify," and `recording-plan.md`'s script is the right shape. Three things it must not fake:

- **Real distillation on real volume.** The moment that sells this is the count: N thousand lines in, a handful of distinct failures out, with counts, first-seen and last-seen, and secrets stripped on camera. A five-line fixture proves nothing. Show the input scrolling.
- **A gate that actually fails, on its own.** The script says "Regression passes, holdout fails, held in review." That must be a real test run producing a real red, not a checkbox. The single most persuasive five seconds available here is an automated system declining to promote its own work.
- **An honest "I don't know."** Run one failure the loop cannot classify and let it say so, unedited. Everything in this talk about trust rests on the loop having somewhere to stop, and the offline kit's permission-denied case is the one beat worth carrying into the live version.

Two more: show the ticket land in a real tracker with the trace attached (that is the beat non-engineers feel), and end on the re-run where the failure comes back as a *known* case — that closes the loop visually in a way no slide does. Bring the fallback recording; a live agent on a conference network is a very boring way to lose five minutes.

**Not blockers, but do them:** correct the captions by hand for "MCP", "holdout", "jidoka" and every model name; add chapter markers at the new slide boundaries; and re-record slide 1 if the story slot lands late — the opening is the twenty seconds a program chair actually watches.
