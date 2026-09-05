# Automating Improvement From Failure

40 minutes · 16 slides

**Arc.** Warm open on one boring failure, steady through the destination hierarchy, build through hooks and fixtures, peak at the demo and the promotion gate, build again through search and optimizers, land on pruning and the exercise.

**Scope.** A proposed workflow with synthetic fixtures. The demo replays; it makes no model calls and edits nothing. Say that once on slide 1.

**Demo.** [Runbook section 2](../demos/DEMO-RUNBOOK.md#2-automating-improvement-from-failure) · [Kit](../demos/index.html). Fallback: narrate the fixtures on slide 8 and the gates on slide 9.

**Before each delivery.** Fill the `Story` lines with incidents from your own work.

**Image style.** Dark slate background, one amber accent, flat vector, generous negative space, no text or logos. Each slide comment is a complete prompt.

**Timings** are rehearsal targets, no Q&A. Notes are cues.

---

## 1. Yesterday's fix should survive today

0:00–2:00 · warm

<!-- image: a terminal window showing a red error line, a hand reaching in from the side to press a single key, the same scene repeated three times smaller in the background, dark slate background, amber accent on the key, flat vector, no text -->

> Train the system, not just the model.
> Fail → explain → retry → forget.

An agent launches integration tests while the database is still starting. A person recognizes the error, waits, reruns, gets green. Tomorrow another session does the exact same thing. We do not need a more eloquent apology. We need yesterday's discovery to change tomorrow's execution.

Scope, once: proposed workflow, synthetic fixtures, a demo that replays rather than learns. I will not repeat that.

Story: [the correction you have personally made more than three times to the same agent or teammate, with the actual error text]

Hands up if you typed the same fix into a chat window this week.

## 2. The human became the database

2:00–4:00 · warm

<!-- image: a person sitting inside a server rack in place of a hard drive, cables plugged into their shoulders, dark slate background, amber accent on the cables, flat vector, no text -->

> Then pay the human again.
> The missing metric: recurrence after a known fix exists.

Three sessions, each locally green, so the completion dashboard looks healthy while the interruption repeats invisibly. Capture the first error and the corrective action, not the final success. Count comparable episodes only: a missing service, bad credentials, and a migration failure share symptoms and need different fixes.

If a person keeps supplying the same prerequisite, the workflow has externalized state into that person. Learning starts by making that dependency visible.

## 3. Every lesson needs a destination

4:00–7:30 · steady

<!-- image: a tall ladder leaning against a wall with eight rungs, the top rungs solid steel and the bottom rungs turning to smoke, dark slate background, amber accent on the top rung, flat vector, no text -->

> 1 Eliminate · 2 Prevent · 3 Code, test, hook · 4 Tool
> 5 Skill · 6 Retrievable knowledge · 7 Instruction · 8 Hope

The spine of the talk, on one slide. Cheap, deterministic, narrow destinations at the top. Expensive, probabilistic, global ones at the bottom. Hope is where most teams currently store their lessons.

Preferences, not laws. A rarely used workflow may deserve a scoped note instead of a subsystem. The question is always whether the correction can disappear from the agent's decision space. The next three slides show what each tier looks like in a real harness.

## 4. Eliminate, prevent, encode

7:30–9:30 · steady

<!-- image: a door with its doorknob removed and the wall painted over smooth where the door used to be, dark slate background, amber accent on the paint edge, flat vector, no text -->

> Could the harness own startup and readiness?
> If not: a readiness check in code
> Then a tested entry point, then a tool

Before writing another instruction, look at the architecture. If the test harness owns startup plus readiness as one operation, the caller's obligation to remember ordering disappears. If orchestration must stay separate, enforce readiness in code. Package it as a tested entry point before exposing it as a tool. Our case picks a harness precondition because the prerequisite is objective and applies to every run.

Story: [a fix you turned into a script or test so nobody has to remember it; name the file]

## 5. Skills, plugins, AGENTS.md

9:30–12:00 · steady

<!-- image: three nested containers, a small labeled card inside a toolbox inside a filing cabinet drawer, dark slate background, amber accent on the small card, flat vector, no text -->

> SKILL.md: a reusable workflow, loaded on demand
> Plugin: skills + hooks + commands, versioned together
> AGENTS.md: stable, broadly applicable rules only

Some corrections cannot become a boolean. A migration investigation is a sequence of judgments across tools, so it belongs in a skill: a `SKILL.md` with a description that says when to load it, the steps, and the cases where it does not apply. Loaded when relevant, so it does not tax every session.

A plugin bundles skills with hooks and commands, so the fix ships as one versioned unit across repos. `AGENTS.md` is the last durable stop: rules that are stable and apply almost everywhere. Every incident pasted into a global file raises ambiguity and context cost. In our example, the readiness rationale lives beside the harness docs and the global reminder goes away once code enforces it.

Show a ten-line `SKILL.md` skeleton.

Sources: Anthropic, [Agent Skills overview](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/overview) · [AGENTS.md](https://agents.md).

## 6. Hooks: the deterministic edge of the harness

12:00–14:30 · build

<!-- image: a conveyor belt with three mechanical gates along it, one gate closed and blocking a package, a stamp marking the next package, dark slate background, amber accent on the closed gate, flat vector, no text -->

> Pre-tool: block the test command until readiness passes
> Post-tool: normalize the error and write the case record
> Stop: refuse to end with an unrecorded failure

Hooks run real code at fixed points in the agent loop, so the rule executes whether or not the model remembers it. A pre-tool hook runs the readiness check before any test command. A post-tool hook turns the failure into a case record: normalized error, service version, phase, observed readiness state, correction, expected outcome, source reference, secrets stripped. Capture stops being manual. Root cause stays a hypothesis until a reproduction supports it; the agent's story of what happened is evidence, not the event.

Source: Anthropic, [Claude Code hooks reference](https://docs.claude.com/en/docs/claude-code/hooks).

## 7. A correction is a candidate change

14:30–16:00 · build

<!-- image: a pull request card with a diff, held up to a light by a hand, a rubber stamp hovering but not yet pressed, dark slate background, amber accent on the stamp, flat vector, no text -->

> Trace → label → candidate patch
> Reproduce → compare → review
> Promote only after the gate

Discovering a lesson and granting it authority are different steps. Extraction can suggest startup readiness caused the failure and draft a preflight function. Neither silently rewrites repo rules. Owner, scope, supporting cases, rollback path. A sleep hides a race; a retry hides an authorization problem. A system can confidently learn the wrong lesson from a successful workaround.

Source: Anthropic (January 2026), [Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents).

## 8. The tiny fixture that catches the wrong lesson

16:00–18:00 · build

<!-- image: four small glass jars in a row each holding a different colored traffic light state, green, green, red, and an hourglass, dark slate background, amber accent on the hourglass, flat vector, no text -->

> Starting → wait, then run
> Ready → run once
> Denied → stop; do not retry
> Deadline → stop; explain

Four fixtures. Which does a fixed sleep handle, and which does it merely postpone? Denied and deadline must stop honestly. A vague lesson becomes a behavioral contract here.

Which of the four would your retry logic get wrong today?

## 9. Demo: yesterday's failure becomes a test

18:00–23:00 · peak

<!-- image: two identical error messages on cards being pulled together by a magnet, behind them three toggle switches in a row with only two flipped up, dark slate background, amber accent on the unflipped switch, flat vector, no text -->

> Normalize two connection failures
> Propose a scoped readiness check
> Block promotion without holdout proof

Follow [runbook section 2](../demos/DEMO-RUNBOOK.md#2-automating-improvement-from-failure). Two connection-refused errors on different ports normalize to one family. Switch ports; the prior case comes back. Permission denied stays unknown.

Evaluate promotion with all gates off. Regression only. Holdout. Scope. Promotion only with all three. The checkboxes stand for evidence a real system must collect; clicking runs nothing. Flip holdout off and show the block.

What is your equivalent of "scope matches"? Most teams have regression tests and no scope check.

Compression: at two minutes, skip the port switch, show the three-gate sequence.

## 10. Owner and rollback

23:00–24:30 · peak

<!-- image: a large lever with a hand resting on it, a small name tag hanging from the handle, a reverse arrow painted on the floor, dark slate background, amber accent on the name tag, flat vector, no text -->

> Propose separately from promote
> Text in a trace is data, not policy
> Match ceremony to consequence

A system that edits its own instructions is a new change channel. Give it what code gets: reviewable artifacts, scoped permissions, regression checks, deployment history, rollback. Text found in a trace does not become policy because the model called it a lesson. The readiness patch is a small diff and four assertions. A learned routing change gets a staged rollout.

## 11. Search the incident before inventing memory

24:30–28:00 · build

<!-- image: a staircase of four steps rising left to right, a magnifying glass on the first step, a three-letter tile on the second, a branching tree on the third, a cloud of dots on the fourth, dark slate background, amber accent on the first step, flat vector, no text -->

> Exact match → trigram → tree/AST → vector
> Filter by service and version first
> Return applicability and the replacement artifact, not just the fix

Another session sees connection refused. Start cheap: an exact-error index. Then trigram similarity on the normalized error and the surrounding chat context. It survives changing ports and paths and is one Postgres extension away. Then structural matching on a parse tree or stack shape when wording varies but structure repeats. Vectors last, when measured misses justify them.

Similar wording does not mean the same cause. Filter by applicability before fuzzy matching. Return the case's evidence and its replacement artifact with the fix. A skill can set this up: it knows how to query the store, what to filter on, and how to present a match for review. Boring search wins because its matches are easy to inspect.

Story: [a "similar" error that led you to the wrong fix]

Source: PostgreSQL, [pg_trgm](https://www.postgresql.org/docs/current/pgtrgm.html).

## 12. Prompt optimizers: GEPA and DSPy

28:00–30:30 · build

<!-- image: a sheet of paper being fed through a loop of arrows, each pass leaving the text slightly bolder, a small scale weighing two versions, dark slate background, amber accent on the scale, flat vector, no text -->

> Failures become training signal for the prompt, not the weights
> DSPy: declare the pipeline, compile the prompts
> GEPA: reflect on traces, evolve the instruction

Between hand-edited instructions and fine-tuning sits a middle tier. DSPy treats prompts as compiled artifacts: declare the module signature, supply examples and a metric, let the optimizer choose demonstrations and wording. GEPA reads execution traces, reflects in natural language on what failed, and proposes edited instructions kept only if the metric improves.

This is the lower-lift route when the recurring issue is judgment quality rather than a missing precondition. The fixtures from slide 8 become the eval set. The output is still text you can diff, review, and version, and the same gates apply. You need a metric that reflects the real failure, and optimized prompts overfit small sets. Keep the holdout.

Sources: Khattab et al. (2023), [DSPy](https://arxiv.org/abs/2310.03714) · Agrawal et al. (2025), [GEPA: Reflective Prompt Evolution Can Outperform Reinforcement Learning](https://arxiv.org/abs/2507.19457).

## 13. The managed stack

30:30–33:00 · steady

<!-- image: a glass-walled control room with three monitors showing traces, annotations, and a comparison chart, beside it a small wooden desk with a notebook and a five-dollar bill, dark slate background, amber accent on the bill, flat vector, no text -->

> LangSmith · Braintrust · Langfuse
> Traces → annotation queues → datasets → experiments
> Same evidence contract as the five-dollar loop

The fully managed end. All three centralize traces, let humans annotate failures, turn annotated traces into datasets, and run comparison experiments. That is the case store, the fixture set, and the regression gate from this talk, hosted.

A small team can start with sanitized structured records, a local replay command, and a pull request. Both ends need a definition of success and a promotion decision. Choose by volume, collaborators, access control, retention. Keep the evidence contract portable so the workflow survives a tooling change.

Show one row per platform: trace capture, annotation, datasets, evals, self-host. Verify feature names before the talk.

Sources: [LangSmith docs](https://docs.langchain.com/langsmith) · [Braintrust docs](https://www.braintrust.dev/docs) · [Langfuse docs](https://langfuse.com/docs).

## 14. Give each lesson an expiry, then prune

33:00–35:30 · steady

<!-- image: three identical sticky notes on a wall, two being peeled off by a hand and one remaining with a small date stamp, a shredder below, dark slate background, amber accent on the remaining note, flat vector, no text -->

> Owner + scope + source + last verified + last triggered
> Superseded by: the enforcing code
> Prune on a reviewable diff, like any change

At creation, record harness version and verifying cases. When a new harness owns readiness internally, point the record at the enforcing code and mark the reminder superseded. Keep the incident history; remove the text from active sessions.

The pruning provision. Three copies of the same reminder: a global instruction, a skill paragraph, an incident entry. Merge the explanation near the implementation, retire the redundant prompt material, and do it through a diff someone reviews. Trigger counts find unused material, but low frequency does not make a rare critical rule disposable. Memory without garbage collection is a leak.

## 15. Measure recurrence, then pick one

35:30–38:00 · land

<!-- image: a tally board with many chalk marks crossed out and a single mark circled, a small notebook open beneath with one line written, dark slate background, amber accent on the circle, flat vector, no text -->

> Repeat failures per comparable run · Human correction time
> Regression escapes · Active instruction burden

A system can generate hundreds of lessons without changing behavior. Track repeats among runs where a lesson should apply, time people spend correcting, regressions introduced, and the volume of active instruction text. Growth in that last number means deterministic work is still delegated to recall. Keep the denominator.

Write it down (60 s): one recurring correction, its tier on the ladder, and one nearby case where the fix would be wrong. The deliverable is one intervention with evidence, not a platform. If nothing generalizes safely, a scoped incident record is honest work.

## 16. Manufacture cheap determinism

38:00–40:00 · land

<!-- image: a glowing chaotic cloud of particles funneling down into a single small clean gear, dark slate background, amber accent on the gear, flat vector, no text -->

> Use expensive nondeterminism to manufacture cheap determinism.

Replay the opening. The database is starting; the harness now checks readiness and either runs within contract or stops with an accurate explanation. The model did not grow a new memory in its weights. The system around it changed.

The output of a hard reasoning episode should be a small function, a test, a clearer interface, a narrower rule, or an optimized prompt you can diff. The standard: the discovery makes the next comparable task cheaper to run or easier to verify.

Where does your next recurring failure go?
