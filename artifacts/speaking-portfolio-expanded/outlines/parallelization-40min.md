# Rethinking Parallelization in the Agentic Era

40 minutes · 16 slides

**Status.** Outline only. No deck or demo yet. The adaptive-systems kit ([runbook section 3](../demos/DEMO-RUNBOOK.md#3-building-adaptive--dynamic-ai-systems)) can stand in for slide 10 until a tournament fixture exists.

**In one line.** Parallelism used to mean splitting one job across cores. With agents it means competing solutions, structured decomposition, hard caps on time and money, fan-out across hardware and clouds, and compiling the nondeterministic parts into fast, dumb, deterministic code.

**Arc.** Warm open, steady through compete, build through decompose and constrain, peak at the tournament, build through compile, land on one axis to start with.

**Scope.** Patterns from real systems and published engineering reports; the tournament numbers are illustrative. Every pattern has a coordination cost and the talk names it each time. Say it once on slide 1.

**Before each delivery.** Fill the `Story` lines. This talk depends on them more than the others. It is a practice talk.

**Image style.** Dark slate background, one amber accent, flat vector, generous negative space, no text or logos. Each slide comment is a complete prompt.

**Timings** are rehearsal targets, no Q&A. Notes are cues.

---

## 1. Parallel used to mean cores

0:00–2:30 · warm

<!-- image: an old multicore processor chip on the left, on the right three small figures each holding a different complete drawing of the same house, dark slate background, amber accent on one drawing, flat vector, no text -->

> Now it means competitors, decomposition, caps, and compilation.

For thirty years parallelization meant one job, many cores, shared memory, and a lot of care about locks. Agents change the unit. The thing you run in parallel is now a whole attempt at the problem: a different model, a different persona, a different decomposition. The constraints change too. Not cores and memory. Dollars and minutes.

Scope, once: real patterns, illustrative numbers, and I will name the coordination cost every time.

Story: [the first time you ran two agents at the same problem and compared the answers; what surprised you]

## 2. Five new axes

2:30–4:30 · warm

<!-- image: five arrows radiating from a single center point in different directions, each arrow a different length, dark slate background, amber accent on the longest arrow, flat vector, no text -->

> Compete: many solutions, one problem
> Decompose: many sub-problems, many workers
> Constrain: caps on time and money as first-class inputs
> Distribute: hardware, providers, regions
> Compile: turn the winning path into deterministic code

The map for the talk. Most teams use one axis, usually decomposition, and call it multi-agent. The interesting gains come from combining them. The interesting failures come from combining them without caps.

## 3. Compete: multiple solutions across models

4:30–7:00 · steady

<!-- image: three different runners crossing a finish line from three different lanes, a judge at the line holding a printed checklist rather than a stopwatch, dark slate background, amber accent on the checklist, flat vector, no text -->

> Same task, three models, one judge
> Diversity from model, not just from temperature
> The judge needs a rubric it did not write

Give the same task to three models or three agent profiles and score the results. Diversity across models catches errors that samples from one model share. The judge is the hard part: a rubric written by a human or a deterministic check, not a preference the judge invents on the spot. Cost is roughly N attempts plus judging; the win is on tasks where failure modes are uncorrelated.

Story: [a task where a cheaper model beat the frontier model in the tournament, and why]

Source: Anthropic (June 2025), [How we built our multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system).

## 4. Compete: agent profiles, not just models

7:00–9:00 · steady

<!-- image: one figure shown three times wearing three different hats, a hard hat, a chef hat, and a racing helmet, each holding a slightly different wrench, dark slate background, amber accent on the racing helmet, flat vector, no text -->

> Minimal-diff · Best-practices · Performance
> Same model, different priorities
> Compare, then pick or merge

Profiles are cheaper than models to diversify. Same model, three system prompts optimizing for different things: smallest change, idiomatic code, fastest runtime. The comparison is the output. It shows the tradeoff space to a human who then picks or merges. Competitive review for code that no single agent would produce.

Show three diffs side by side for one small change, one-line score each.

## 5. Decompose: structuring the work

9:00–12:00 · build

<!-- image: a large jigsaw puzzle being assembled by three hands from three separate corners, one piece in the middle held by two hands at once, dark slate background, amber accent on the contested piece, flat vector, no text -->

> Decompose by evidence, not by org chart
> Each worker: one question, one artifact, one exit condition
> Shared files are the new shared memory

Break work along lines where workers can proceed without each other's intermediate results. Investigations split by evidence source; codebases by module ownership; documents by section with a fixed outline. The classic bug is two workers editing the same file, which is the locking problem back in a new costume. Give each worker an explicit artifact and an exit condition, and route conflicts through a merge step a human can read.

Story: [a decomposition that looked clean and collided anyway; what the merge step became]

## 6. The orchestrator's job

12:00–14:00 · build

<!-- image: a conductor's podium with a small ledger open on it instead of a score, three music stands below with one sheet each, dark slate background, amber accent on the ledger, flat vector, no text -->

> Plan the DAG · Validate it · Dispatch
> Collect artifacts · Merge · Verify
> Never let a worker spawn workers without a budget

The orchestrator plans, a validator checks the plan against caps and scopes, workers run, a merge step reconciles. Recursive spawning without a budget is how a two-dollar task becomes a two-hundred-dollar one. The orchestrator owns the budget. Workers request; they do not allocate.

## 7. Constrain: time and money are inputs now

14:00–17:00 · build

<!-- image: a problem written on a card being handed across a counter together with a small stack of coins and an hourglass, dark slate background, amber accent on the hourglass sand, flat vector, no text -->

> Max spend · Max wall-clock · Max concurrent workers
> Reserve before fan-out; reconcile after
> "Solve it for under $5 in under 3 minutes" is a valid spec

This is the capability business people dreamed about: hand a system a problem and a budget and get either a solution within budget or an honest stop. Caps are inputs to the planner, not afterthoughts. Reserve spend atomically before parallel dispatch so workers cannot each spend the same remaining balance. Deadline cancels dispatch and in-flight work and records what was billed anyway.

Who here can state, right now, the maximum an agent run in your system is allowed to cost? Most hands stay down. That is the gap.

## 8. Constrain: stopping honestly

17:00–18:30 · build

<!-- image: a half-finished bridge ending cleanly at a marked barrier with a small sign post, rather than crumbling, dark slate background, amber accent on the sign post, flat vector, no text -->

> Budget exhausted → stop with partial artifacts and a reason
> Deadline passed → stop, do not "just finish"
> Consequential action → route to a human regardless of budget

A system that stops well is more useful than one that finishes badly. Partial artifacts with an accurate explanation are a legitimate output. High-risk actions route to a person no matter how much budget remains. Budget is not authorization.

## 9. Distribute: hardware, clouds, and dynamic allocation

18:30–21:30 · build

<!-- image: a dispatcher's switchboard with cables running to four different shaped sockets, one socket small and local and glowing, dark slate background, amber accent on the local socket, flat vector, no text -->

> Providers as a pool, not a dependency
> Regions and data boundaries as hard filters
> Local models for the cheap, private, or bursty parts
> Easy request → small model, one worker. Hard request → more of everything.

Treat providers as a pool with per-call selection by cost, latency, capability, and data boundary. Data-boundary checks run before the call, in code. Local or self-hosted models take the cheap, private, or bursty parts. Coordination cost: you now own model-behavior differences, so an eval suite per provider is mandatory.

Fallback is data, not a decision. Mastra takes a model array with per-entry retries on the agent, LangChain takes a fallback middleware, the AI SDK leaves it to the gateway's model list. None of them asks a model whether to fail over, and none of them should: a 503 is a wire failure, not a reasoning problem. Two traps. A chain of three models with three retries each is nine attempts on a request that has produced nothing, so the whole chain needs a run-level cap; per-model retries do not bound it. And only the gateway hands back the attempt trail; with the frameworks you write it to the span yourself or the trace cannot say why this request got that model.

Allocation follows evidence: failed assertions, missing required evidence, novelty outside supported categories. Vertical scaling deepens one attempt; horizontal adds independent ones. Test-time compute research supports treating allocation as a variable, in its settings. Measure your own.

Story: [a provider outage or rate limit that your fan-out did or did not survive]

Source: Snell, Lee, Xu, Kumar (2024), [Scaling LLM Test-Time Compute Optimally](https://arxiv.org/abs/2408.03314).

## 10. A bounded tournament

21:30–26:30 · peak

<!-- image: three lanes on a track, two runners finishing and one runner stopped calmly at a rope barrier partway down the lane, a scoreboard with three rows of simple shapes, dark slate background, amber accent on the rope barrier, flat vector, no text -->

> Task: fix a flaky integration test
> Three attempts: minimal, idiomatic, performance
> Cap: $2, 4 minutes. Judge: tests pass + reviewer rubric

| Attempt | Cost | Time | Tests | Rubric | Result |
| --- | --- | --- | --- | --- | --- |
| Minimal diff | $0.40 | 1:10 | Pass | 2/3 | Eligible |
| Idiomatic | $0.90 | 2:30 | Pass | 3/3 | Eligible, preferred |
| Performance | $1.10 | Cap hit | Incomplete | — | Stopped honestly |

Illustrative numbers. Walk the table: two eligible, one stopped at the cap with partial artifacts. A human picks, or merges the minimal diff's scope with the idiomatic version's structure. Until a dedicated fixture exists, use the adaptive-systems kit to show the caps and the human gate.

Which column would your team look at first? Cost, time, or rubric?

Compression: at two minutes, the table, no kit.

## 11. Code generation is a funnel

26:30–28:30 · build

<!-- image: a wide funnel with many small paper airplanes entering the top, a mesh screen partway down, and two airplanes exiting the narrow bottom, dark slate background, amber accent on the mesh, flat vector, no text -->

> Generate N candidates cheaply
> Filter with deterministic checks: compile, lint, types, tests
> Only survivors reach the expensive judge

Code is the best-case workload because verification is cheap and deterministic. Generate many candidates, run compile and tests on all of them in parallel, and let only survivors reach a model judge or a human. Cheap wide, expensive narrow.

## 12. Compile: turn nondeterminism into fast, dumb code

28:30–31:30 · build

<!-- image: a swirling cloud of particles on the left condensing into a single small punched card on the right, dark slate background, amber accent on the punched card, flat vector, no text -->

> Expensive reasoning discovers the path
> The path becomes a script, a test, a rule
> The next request skips the model

The pattern that pays for everything else. When a parallel investigation finds a reproducible cause or a reliable procedure, encode it: a script, a test, a deterministic check, a tool. The next matching request runs the tool before any agent launches. The model's job was discovery. The system's job is to stop needing it for that case.

Keep negative cases so the rule does not misfire on lookalikes. A deterministic artifact is not automatically correct; it is consistently executable and testable within its contract.

Story: [the workflow you compiled from a multi-agent run into a forty-line script; how often it runs now]

## 13. The promotion gate, and one span per worker

31:30–34:00 · steady

<!-- image: a turnstile with four small lights above it, three green and one red, beside it a strip of film with one frame per figure, dark slate background, amber accent on the red light, flat vector, no text -->

> Reproduce → regression → holdout → scope check
> Promote with an owner and a rollback; prune when the harness enforces it
> One trace per run, one span per worker: cost, latency, outcome, and why it existed

Same discipline as any change. Reproduce, pass regression, pass holdout, confirm scope. An owner and an undo. When a later harness makes the rule automatic, retire the rule.

Parallel systems fail silently without per-worker traces. Record why each worker existed, what it cost, what it produced, and what the merge did with it. The question a maintainer will ask is "why did this request get this organization?" The trace must answer it.

## 14. The coordination tax, honestly

34:00–36:00 · steady

<!-- image: a receipt unrolling from a register with four line items drawn as icons, tokens, a merge symbol, a checklist, and a pair of eyes, dark slate background, amber accent on the total line, flat vector, no text -->

> Tokens: N attempts cost N
> Merge: someone reconciles
> Evals: one suite per provider and profile
> Attention: a human still picks

Every axis has a tax. Competition multiplies tokens. Decomposition needs a merge. Distribution needs per-provider evals. Constraints need accounting. If the task is cheap and the failure modes are correlated, run one attempt. Parallelism is a tool for uncertainty and scale, not a default.

## 15. Start with one axis

36:00–38:00 · land

<!-- image: a single lit path segment on a dark five-way junction, a small footprint on the lit segment, dark slate background, amber accent on the lit segment, flat vector, no text -->

> Pick one recurring, expensive task
> Caps first. Then one competitor. Then compile the winner.
> Measure cost per accepted outcome before and after

Write it (60 s): the task, the cap, and the second attempt you would add.

Caps first, because they make every later experiment safe. One competitor, because it tells you whether diversity helps on this task. Then compile, because that is where the cost goes back down.

## 16. Rent reasoning; own the result

38:00–40:00 · land

<!-- image: the three house drawings from slide 1 now pinned to a wall with one circled, and beneath them a small printed blueprint rolling out of a machine, dark slate background, amber accent on the blueprint, flat vector, no text -->

> Compete. Decompose. Constrain. Distribute. Compile.
> Use expensive nondeterminism to manufacture cheap determinism.

The old parallelism split one job across cores. The new one runs whole attempts against each other, under caps you set, across hardware you choose, and ends by writing the answer down as code so you never pay for it again. Rent the reasoning. Own the result.

What is the last thing an agent figured out for you that should already be a script?
