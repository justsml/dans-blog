# Automating Improvement From Failure: The Fail-to-Win Loop

40 minutes · 17 slides

**Arc.** Warm open on the logs nobody reads, steady through the foundation (an agent with log access) and the enrichment ladder, build through the scheduled out-of-band check, distill-and-classify, and tickets-and-PRs, peak at the guardrails, build again through agent-driven testing, compiling what repeats, and the customer feedback loop, land on proactive response, the roadmap, and the close.

**Thesis.** Step one is giving an agent your production logs. Every enrichment after that (codebase, observability, cloud platform, ticketing, browser) raises how much you can trust it to respond on its own. Grow the loop one failure class at a time. The double meaning of the title is the close: fail to win, or fail to win.

**Scope.** Patterns from real setups, described in general terms. No customer, vendor result, or measurement is claimed unless a `Story` line supplies one. The offline kit on slide 8 is a deterministic replay; say that once when you open it.

**Demo.** [Runbook section 2](../demos/DEMO-RUNBOOK.md#2-automating-improvement-from-failure) · [Kit](../demos/index.html). It illustrates the guardrail slide only. Fallback: narrate the three gates from the slide.

**Before each delivery.** Fill the `Story` lines from your own work. Verify the platform integration table on slide 3 against current vendor docs. Verify the model names you plan to say on slide 10; the outline leaves them blank on purpose.

**Image style.** Dark slate background, one amber accent, flat vector, generous negative space, no text or logos. Each slide comment is a complete prompt.

**Timings** are rehearsal targets, no Q&A. Notes are cues.

---

## 1. Your logs are a roadmap nobody reads

0:00–2:00 · warm

<!-- image: a long paper scroll of log lines spilling out of a server and piling on the floor, one line near the top glowing, an empty office chair beside it, dark slate background, amber accent on the glowing line, flat vector, no text -->

> Every failure in production is a queued improvement.
> Nobody is working the queue.

Your production logs already contain the next month of engineering work. Every stack trace, every 500, every retry storm, every thumbs-down is a ticket that was never filed. Teams pay for observability and then read it only when a pager goes off.

The claim of this talk: an agent can work that queue. Start by handing it the logs. Every access you add after that raises how much of the loop it can close on its own. That is the fail-to-win loop, and the good kind.

Story: [a failure that sat in your logs for weeks before a customer reported it]

Hands up if you read your error logs today without an alert making you.

## 2. Step one: hand your logs to an agent

2:00–4:30 · steady

<!-- image: a single cable running from a server rack into a small robot sitting at a desk reading a printout, nothing else on the desk, dark slate background, amber accent on the cable, flat vector, no text -->

> Coding agent + log access = the foundation
> "What broke since yesterday?"

This is the whole first step, and it is smaller than people expect. Point a coding agent at your logs. Claude Code, Codex, Hermes, a custom agent on any framework; the choice matters less than the access. Ask it what broke since yesterday. It reads, groups, and explains, and it is already better than the nobody who was doing it before.

Once an agent can see system logs, traces, and failures, you are at step one of an automatic fail-to-win loop. Everything else in this talk is what to add next and in what order.

Story: [the first time you pointed an agent at real logs and what it found in the first ten minutes]

## 3. Enrichment is leverage

4:30–7:30 · steady

<!-- image: a small robot at a desk with five cables arriving from five directions, each cable thicker than the last, the robot's desk lamp growing brighter, dark slate background, amber accent on the lamp, flat vector, no text -->

> Logs → traces → codebase → cloud platform → tickets → browser
> The more it can see, the more you can trust it to act

The rule that makes the rest of the talk work. A log-only agent can describe. An agent with the codebase can locate. Add an observability MCP and it can pull the trace. Add a cloud platform MCP and it can check CloudWatch, the queue depth, the deploy that landed at 14:02. Add ticketing and it can file. Add a browser and it can reproduce.

Every logging and observability platform now has some mix of MCP server, API, and CLI. Use any of them. Nobody is blocked on integration.

| Source | Typical access | Verify before talk |
| --- | --- | --- |
| Datadog, New Relic, Honeycomb, Grafana | MCP server, API, CLI | Current MCP names and auth |
| Sentry | MCP server, API, CLI | Scope of issue and trace tools |
| AWS CloudWatch, GCP Logging, Azure Monitor | Vendor MCP, CLI | Which services the MCP covers |
| Splunk, Elastic, Loki, Axiom | API, CLI, community MCP | Whether an official MCP exists |
| GitHub, Linear, Jira | MCP server, API, CLI | Write permissions granted to the agent |

Story: [the one integration that changed what your agent could do, and what it did with it]

## 4. Do not wire everything on day one

7:30–9:30 · steady

<!-- image: a single seedling in a pot on a windowsill, behind it a blueprint of a huge greenhouse leaning against the wall unrolled, dark slate background, amber accent on the seedling, flat vector, no text -->

> A raw log-reading agent gets overwhelmed.
> One failure class at a time. Different agents for different failures is fine.

The honest limit. An agent reading everything is limited in what it delivers and easy to drown. Ten thousand lines of noise and one real incident, and it will write you a summary of the noise.

Do not go implement every capture, every nuance, every automatic fix I mention today and then wire it all up on day one. These systems grow organically into a company. Pick one failure class. Give one agent the access that class needs. Get one output you trust. Then the next. It is fine, and often better, to have different agents for different failures.

## 5. The out-of-band check

9:30–12:00 · build

<!-- image: a wall clock with a small robot standing beneath it holding a clipboard, a stack of paper on the floor with a bookmark marking where it stopped last time, dark slate background, amber accent on the bookmark, flat vector, no text -->

> Scheduled: GitHub Actions cron, a dev box, a server
> "Everything since the last check" → distilled failures

The mechanism. A scheduled task, out of band from any deploy or session. GitHub Actions on a cron, a dev machine, a server somewhere. It runs against everything since the last check, so it never re-reads what it already processed, and it never has to be fast.

Its only job is to extract and distill. Group the same failure under one heading, strip the noise, keep the trace, the environment, the count, and the first and last time seen. The output is a short list of distinct failures, not a summary of the log. Everything downstream consumes that list.

Show the skeleton: a workflow file with a cron, one job, one agent invocation, one artifact.

## 6. Distill, then classify

12:00–14:30 · build

<!-- image: a conveyor belt carrying identical grey boxes into a sorting machine that stamps them and drops them into four labeled bins, one bin with a red warning stripe, dark slate background, amber accent on the stamp, flat vector, no text -->

> Loop over the distilled list: pattern → severity → risk → security class
> Tagging is what makes the next step possible

Once failures are distilled, run loops over them. Identify patterns: is this new, or the same thing from last Tuesday with a different port? Estimate severity and risk. Flag anything that looks like a security issue, and be specific about the class: injection attempt, auth bypass, data exposure, denial of service.

The tags are the point. A failure with a severity, a class, an owner guess, and a link to the code region is something a system can route. A paragraph about it is not. Keep the tagging conservative; a wrong "low" is worse than a wrong "high."

Story: [a pattern the classifier surfaced that no human had connected]

## 7. From tags to tickets and PRs

14:30–17:00 · build

<!-- image: a sorting machine's output chute feeding two separate queues, one of ticket stubs and one of folded pull-request pages, a person at the end of one queue and a small robot at the end of the other, dark slate background, amber accent on the chute, flat vector, no text -->

> Big enough team or system: push tickets, then PRs
> Into a queue for human review or more agent testing and security audit

Once classification is reliable, let the agent write. Tickets first: a ticket with the trace, the tags, and the suspected code region is cheap to create and cheap to close if wrong. Then PRs, into a queue. The queue can be a human reviewer, or another agent that runs the tests, or a security audit agent, or all three in sequence.

These are not involved systems. You just have to start somewhere and keep providing access to the details and traces the agent needs. Match the ceremony to the consequence: a log-level fix can flow; a migration or a payment path waits for a person.

Story: [the first PR your loop opened, and whether it merged]

## 8. Guardrails before autonomy

17:00–21:00 · peak

<!-- image: three turnstiles in a row in front of a single open door, a folded pull-request page passing through the first turnstile, the other two still closed, dark slate background, amber accent on the open door, flat vector, no text -->

> Similarity is a candidate, not a diagnosis
> Regression · holdout · scope · a human when money or data moves

The peak, and the caution. A looping agent will happily learn the wrong lesson from a successful workaround. A retry hides an auth failure. A sleep hides a race. So a proposed fix passes gates before it gets authority: the regression case for this failure, the unrelated cases that must still pass, and a scope check that the environment and cause actually match the prior case.

Open the kit. Two connection-refused errors on different ports normalize to one family. Permission denied stays unknown. Evaluate with no gates, then one, then all three. The checkboxes stand for evidence; clicking runs nothing. Say that once.

Add the human gate explicitly for anything that dispenses money, deletes data, or messages customers. Language models are notoriously easy to finagle into whatever the caller wants. Do not let the loop be the caller.

Compression: at two minutes, skip the port switch, show the three-gate sequence.

## 9. The jumping-off point: let the agent drive

21:00–23:00 · build

<!-- image: a small robot holding a game controller in front of a large browser window, a cursor mid-click, a short list on a sticky note beside the keyboard, dark slate background, amber accent on the cursor, flat vector, no text -->

> Deterministic failures captured → now exercise the system on purpose
> Chrome CDP or Playwright MCP + "focus on what this PR touched"

Once regular, deterministic system errors are flowing through the loop, you have a jumping-off point for the other kind of testing. Give the same agent a browser through Chrome DevTools Protocol or a Playwright MCP. Give it a starting script: how to load the app, initialize, log into the admin. Then tell it to use its judgment on the features affected by the current PR.

Instead of writing every Playwright script for every path, you write the entry and let the agent explore the delta. Do not tell it to test everything. The PR diff is the scope.

Story: [a bug an exploratory agent session found that the scripted suite missed]

## 10. The E2E suite that runs in triplicate

23:00–25:30 · build

<!-- image: sixteen identical treadmills running side by side with nobody on them, one small robot walking a single path on the floor beside them, dark slate background, amber accent on the robot's path, flat vector, no text -->

> Hours of E2E, split sixteen ways, run three times for flakiness
> A cheap model driving a targeted session starts to look reasonable

The economics. Many teams run an end-to-end pipeline that takes hours, sharded sixteen ways to hide the wall time, and run in triplicate because half the failures are flakiness nobody can interpret. The load and the overhead are still there; the sharding just hides them.

Against that, an LLM driving a short targeted session with its judgment does not look ridiculous. Short multi-step tool-call tasks run fine on the cheapest current tier of models, up to a point. I have seen remarkable results and some curious actions, and usually a cost saving on the giant suites.

Name a few cheap models you have measured multi-step dynamic browser tasks with: `GPT-5.6-luna`, `GLM-5.3-flash`, `deepseek-v4-flash`, `gemini-3.7-flash`. We traded several-hour-long E2E test suite with an LLM based selection of the "3 individual tests most likely to be affected by the current change" for $0.36-$0.81. Roughly the same cost as a single run of the full suite, and now we have reduced flaky failures and a better chance of catching the real ones. The agent can even run the full suite on a schedule, and report only the failures that are new. There are additional ways to help the model associate & target the optimal test(s) when given a feature/PR's description & code changes, ask me later if you are curious about the advanced options here.

## 11. Compile what repeats

25:30–28:00 · build

<!-- image: a cloud of scattered footprints across a floor converging into a single painted straight line with a small wind-up key at its start, dark slate background, amber accent on the key, flat vector, no text -->

> Nondeterminism finds the path. Determinism runs it.
> Memory + search over past threads + a skill that says when

The E2E alternative on the last slide is one case of a general move: use an agent's judgment to discover a path, then compile the path into a script. The agent can do the noticing itself. Give it memory and a search mechanism over past chats or threads, and a skill that describes how and when to look. Its job on that skill: find tasks or actions it has performed more than a few times, and turn each into a script it can run as a cron job or another scheduled job.

That log-distilling check on slide 5 is exactly this. So is the login script on slide 9. None of it requires fancy harness modifications, though hooks and plugins help once the pattern is proven. The output is a file you can diff and a schedule you can read.

Story: [a task your agent repeated until you, or it, turned it into a script; name the file]

## 12. Feedback is the same loop

28:00–30:30 · build

<!-- image: a thumbs-down button on a phone screen with a speech bubble above it, a thin line running from the bubble into a folded pull-request page on a desk, dark slate background, amber accent on the thumbs-down, flat vector, no text -->

> Thumbs down + a sentence of rage = gold
> Feature request → PR → personal feature flag → similar users → guards → human

The loop is not only for errors. Any feedback signal feeds it: thumbs up or down on the chat, the session, the order. When they thumb down, prompt for a sentence and capture the rage. Those moments are gold if they run through the same distill, classify, and PR pipeline.

For a feature request, the dazzling version: the agent opens a PR, the change ships behind a feature flag scoped to that one user, and it tests. If it holds, expand to users with similar usage patterns or profiles using plain heuristics. Every step passes the agentic guards from slide 8, and a human looks at least once. There has never been a smoother way to show a client that asking for something can lead to having it.

Story: [a piece of user feedback that became a shipped change, and how long it took]

## 13. Correlate, escalate, and be careful with money

30:30–32:30 · steady

<!-- image: a support ticket and a log line side by side connected by a single bright thread, a locked cash drawer beneath them with the key hanging on the wall out of reach, dark slate background, amber accent on the thread, flat vector, no text -->

> "I lost data" + this session ID matches an error → high priority, linked, escalated
> A credit may be due. Detect it. Do not let the loop dispense it.

Frustrated customers escalate themselves: "I'm telling everyone how bad this is," "I lost my data." The loop can intercept. If the customer's session ID correlates with an error in the logs, log it as high priority immediately, link it to the support ticket, create the ticket if there is none, and escalate. The support person opens a ticket that already contains the trace.

The loop can even detect that a credit may be due and show off some smarts. Be very careful here. Anything that affects dispensing money gets the human gate, every time. Detect, recommend, draft the message. A person presses the button.

## 14. Proactive: three tickets before the fourth customer

32:30–34:30 · steady

<!-- image: a lighthouse beam sweeping across a row of small houses at night, three houses already lit, the beam reaching the fourth before its light turns on, dark slate background, amber accent on the beam, flat vector, no text -->

> Order error + three tickets about shipping addresses = an integration is down
> Tell the affected customers before they tell you

The step that earns trust. An error fires on an order. The loop notices three open tickets from other customers who could not get a shipping address to save. That is one incident, not four. Create the incident, link the tickets, and send a proactive notice: we are having issues with our shipping integration, bear with us, we will notify you when it is resolved.

For low-tech and mid-tech consumers to welcome this technology, it has to score wins they can feel. Curing diseases and stopping scams are on that list. So is a shop that tells you it broke before you noticed. This one is actionable today.

## 15. Where this goes

34:30–36:00 · steady

<!-- image: one app icon splitting into many slightly different versions of itself fanning out toward many small houses, each version a different shade, dark slate background, amber accent on the original icon, flat vector, no text -->

> Personalized software: say what should be different, get a mutated version
> Local, inside an application platform, or at a provider

Speculation, labeled as such. It may not be a distant future where we get personalized versions of software. Tell it this should be different and receive a mutated version. Maybe that runs locally, maybe inside specialized application platforms, maybe at a provider. Who knows.

What is not speculation: the feedback-to-flag loop on slide 12 is the first rung of that ladder, and it works with today's tools.

## 16. Start Monday

36:00–38:00 · land

<!-- image: a short checklist on a single index card pinned to a corkboard with one pin, the first box already ticked, dark slate background, amber accent on the tick, flat vector, no text -->

> Pick one failure class · one agent · one output
> Logs → schedule → distill → classify → ticket → guard → measure

The roadmap, in order. Give an agent read access to logs. Put it on a schedule. Make it distill. Make it classify. Let it file a ticket. Add the gates before it opens a PR. Measure: time from failure to ticket, repeat failures after a fix, feedback items that became changes.

A specialized agent for this, run from the CLI or as an internal service, pays huge dividends for a small build. Write down (60 s): the one failure class you will hand it first, and the one integration it needs to act on that class.

## 17. Fail to win, or fail to win

38:00–40:00 · land

<!-- image: the same long paper scroll of log lines from the first slide, now neatly cut into short strips, each strip clipped to a folded pull-request page, the office chair still empty, dark slate background, amber accent on the clips, flat vector, no text -->

> Turning observed failures into wins is low lift and high leverage in almost every company.
> The alternative is the other reading of the title.

Replay the opening. The logs are still spilling out. Now something reads them, and each strip becomes a ticket, a PR, a flag, or a message to a customer. The model did not get smarter. The system around it got a job.

With this much intelligence available, a system that does not automatically improve from its own failures, its customers' feedback, and its own incidents, possibly in real time, is leaving the cheapest high-leverage capability in the building unused. Fail to win: let the failures drive the wins. Or fail to win: watch someone else's system do it first.

Which failure are you handing over on Monday?
