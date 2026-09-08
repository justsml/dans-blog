# Compute, Please (and a Receipt): bullet outline

Your agent chooses the compute, and the bill still has your name on it.

Rehearsal sheet for [the 40-minute outline](index.md). 14 slides, 40 minutes, no Q&A. Hand-written beats, not extracted sentences: each line is the thing to say next, in order. Every Story line needs Dan's own record before delivery. Shorter routes: [15](adaptation-15min.md) · [30](adaptation-30min.md).

## Spine

Act 1, the inversion (0:00 to 11:00): the new thing and proof it is real.
Act 2, the ledger (11:00 to 27:00): everything the lease is enforced against, paid off by the walkthrough.
Act 3, the third axis (27:00 to 37:30): attempts, with Amdahl as the brake before the barrel and the council.

1. **Four callers, forty images, one customer** — 00:00 · warm · 02:00
2. **Infra Is a Tool Call** — 02:00 · peak · 04:00
3. **Torn Down by Default** — 06:00 · steady · 03:00
4. **Fifty Containers Don't Render Faster** — 09:00 · steady · 02:00
5. **Count items and attempts, not tool slots** — 11:00 · steady · 02:00
6. **Put admission below every caller** — 13:00 · build · 02:30
7. **Money, concurrency and rate are three limits** — 15:30 · steady · 02:00
8. **A durable job survives the caller** — 17:30 · build · 02:30
9. **Adapt pressure inside a fixed ceiling** — 20:00 · steady · 02:00
10. **Walkthrough: restart the batch** — 22:00 · peak · 05:00
11. **Ten Workers Buy You Five** — 27:00 · steady · 02:30
12. **The Barrel-of-Monkeys Maneuver** — 29:30 · build · 03:30
13. **Council of Guards** — 33:00 · peak · 04:30
14. **Put the limit where the work begins** — 37:30 · land · 02:30

## Slides

### 1. Four callers, forty images, one customer

00:00–02:00 · warm · 02:00

> A chat turn, a retry, a cron job, a second tab
> Each legal. Each ten images.
> The customer bought ten.

- Customer wants ten images. Within a minute: chat turn, crashed worker's replacement retrying, nightly cron re-running "not done", customer's second tab.
- Every one of those is legitimate. Every local limit passed. Provider is rendering forty. Dashboard says four tool calls.
- We put the limit on the wrong unit of work. That is the whole talk in one multiplication.
- Turn: the system that hid the fan-out can now ask for its own compute. Decide what that is allowed to mean.
- Scope, once: numbers are fixtures, vendors are real.
- Diagram — 4 × 10 = 40, before retries.
- Story — Moved to slide 10; no extra anecdote on the opener.
- Do — Let the room multiply before showing forty. Ask which component knew the entitlement. Silence.

### 2. Infra Is a Tool Call

02:00–06:00 · peak · 04:00

> `replicas: 12`, decided by ops in 2023, for everyone
> `{ shape: provider-wait, n: 8, ttl: 6m, cap: $1.50 }`, decided by the job, at job start
> Resolve: catalog, tenant budget, lease with a teardown

- Twenty years: replicas or a bigger box, autoscaler watches CPU and guesses. The workload never got a say.
- Now it does. The orchestrator knows: this batch waits on a provider; this one needs a GPU for ninety seconds; this one is untrusted code and wants a sandbox. It knows at job start.
- The new part: it asks for compute the way it asks for a tool. Eight sandboxes, six minutes, this region, this cap. Scheduler resolves against a catalog and the tenant budget, returns a lease with a teardown.
- What you get: per-job economics. Customer buys a faster turnaround. Finance caps one workflow, not one environment. No warm fleet sized for the worst Tuesday.
- Least privilege for free: six minutes, three domains, one scoped credential. Hard to abuse even when the agent inside is confused.
- What you risk: an agent that can provision is an agent that can spend. Catalog, lease, teardown, enforced outside the model. The agent chooses; it does not grant.
- Bridge: everything the lease is enforced against is still yours to build. That is the middle of the talk. First, proof the substrate exists.
- Diagram — Request (shape, size, duration, cap) → catalog + tenant budget → lease.
- Story — Replace up to 40 words of per-job economics with Dan's example; do not append it.
- Do — One autoscaler threshold beside one job request. Ask which one you could put on an invoice.

### 3. Torn Down by Default

06:00–09:00 · steady · 03:00

> Sandboxes: Fly.io Sprites, Depot
> Serverless compute and GPUs: Modal, Vast.ai
> Durable edge state: Cloudflare Workers, Durable Objects, Workflows
> Interruptible capacity: AWS EC2 Spot

- The pieces exist and are shaped for this.
- Fly.io Sprites: microVMs, stated creation target under a second, checkpoint and restore, egress policy set from outside so the agent cannot loosen it.
- Depot: sandboxes billed by the second. Run agent-generated code, throw it away.
- Modal: functions and GPUs that scale to zero. Vast.ai: a marketplace where a spare GPU is cheap and short-lived.
- Cloudflare Workers + Durable Objects + Workflows: the coordination state that survives everything else being torn down.
- EC2 Spot: the old version of the idea. Capacity that can vanish, so the job had better be restartable.
- Common thread: create in seconds, pay per second, torn down unless someone says otherwise, network narrowed from outside.
- None of them give you the ledger. That is still yours.
- Diagram — Sandboxes, serverless GPUs, durable edge state, spot capacity; all seconds to create, torn down by default.
- Do — Who runs agent code on something with a lifetime under an hour? Then: who has an egress policy on it?

### 4. Fifty Containers Don't Render Faster

09:00–11:00 · steady · 02:00

> Waiting on a provider → durable step, not a GPU
> CPU or GPU work → compute worker, spot if restartable
> Untrusted code → sandbox with egress policy

- If the provider is rendering the image, you are waiting on the network. Fifty containers do not make it render faster.
- Long waits: persist state, resume from callbacks or bounded polling. Real computation: a worker sized for it. Code you did not write: a sandbox, and take egress seriously.
- The two decisions that matter: where execution happens and where recovery state lives. Get those right and the vendor list is a detail.
- Bridge: where execution happens, you just saw. Where the money and the state live is the next eleven minutes, and it starts by counting.
- Do — Place a local graph solver, a remote image request and an agent-written script into their classes.

### 5. Count items and attempts, not tool slots

11:00–13:00 · steady · 02:00

> Agent slots ≠ tool batch size ≠ provider attempts ≠ entitlement

- Back to the forty. It is worse.
- Runtime concurrency counts tool calls. Batch tool multiplies. Retry layer multiplies again. Forty items, one retry each, eighty provider attempts. Visible count still says four.
- Record logical items and external attempts separately. A retry is another attempt at an item, not a new entitlement.
- Read the batch tool's actual contract: max batch size, resource estimate, cancellation behavior, what a partial result looks like.
- Diagram — 40 logical items → 80 provider attempts.
- Do — Four callers, ten children, one retry layer. Count to eighty out loud.

### 6. Put admission below every caller

13:00–15:30 · build · 02:30

> Reserve before dispatch
> Share tenant and provider limits
> Queue or reject what does not fit

- A prompt that says "only run one expensive tool" is guidance. It is not a lock.
- Chat turn, retry, cron, second tab arrive at once and none of them can see the others.
- So every external dispatch crosses one shared admission controller: atomically check entitlement, budget, provider concurrency, rate, deadline; then reserve.
- Does not fit? Queue, or explicit rejection. Never a silent partial.
- A process-local semaphore only works when that process owns all the work. In an agentic system it never does.
- Diagram — One coordinated reservation across all callers.
- Do — Two simultaneous callers from contracts.md. Read-balance-then-write loses; atomic reservation admits one.

### 7. Money, concurrency and rate are three limits

15:30–17:30 · steady · 02:00

> Concurrency ≠ requests per minute ≠ dollars
> Reserved ≠ charged. Cancelled ≠ refunded.
> Pessimistic reservations refuse real work; choose your tightness

- You can satisfy any one of the three and blow the other two.
- Reserve a defensible maximum per operation. Reconcile against the bill when the answer arrives. Keep unresolved provider jobs charged until you know.
- A worker lease expiring revokes its dispatch authority. It does not prove the remote render stopped.
- The trade: reserve the full retry allowance up front and a second legitimate caller queues behind money that may never be spent. Reserve each retry atomically and the cap still holds, but a retry may be refused.
- Pick a tightness on purpose and write it down.
- Diagram — $1.50 provider cap: seven × $0.20 = $1.40; three refused.
- Do — Walk the $1.50 ledger. Settled plus reserved stays within $1.50; ask why ten cents cannot fund another allowance.

### 8. A durable job survives the caller

17:30–20:00 · build · 02:30

> queued → submitted → waiting → completed / failed / unresolved
> Callbacks: authenticate, deduplicate, valid transitions only
> Notification is its own job

- Accept ten prompts, return a stable job ID. Persist item IDs, provider IDs, reservations, attempts, output locations, terminal states.
- The conversation can end. The sandbox can be reclaimed. The job continues.
- Callbacks arrive twice and out of order: authenticate, deduplicate, apply only valid transitions.
- Restart rebuilds pending work from storage, not from replaying the conversation.
- Notification goes through an outbox so an email failure never regenerates an image.
- Calling something "durable" does not make an in-flight promise survive a lifecycle transition. The recovery protocol is yours to write.
- Diagram — Persist intent and provider identity; uncertain acceptance goes to reconciliation, not blind replay.
- Do — Draw the state machine. Crash after submission, before the provider ID is saved. Discuss unresolved.

### 9. Adapt pressure inside a fixed ceiling

20:00–22:00 · steady · 02:00

> Throttled → wait and reduce
> Healthy window → cautious increase
> Deadline → stop dispatch, report honestly

- The agent can propose ten becomes five after the provider starts failing. Good. The scheduler still owns the range, same as it owned the lease.
- Known throttling is deterministic policy: respect retry guidance, add jitter, reduce admission, increase cautiously after a healthy window.
- Never let each worker double its own throughput because its last call worked.
- Deadline: stop new work, report completed, pending and unresolved separately. Accurate result, not a cheerful completion message over missing images.
- Bridge: that is every rule. Now run them all at once.
- Diagram — Admission drops after throttling; every increase stays inside the approved maximum.
- Do — Ten to five, then a cautious recovery that never exceeds the original ceiling.

### 10. Walkthrough: restart the batch

22:00–27:00 · peak · 05:00

> Two callers, one entitlement
> lease-88f1 expires mid-batch
> One response lost, one email fails

- Two callers want a full batch. First reserves the entitlement; second queues with an explicit reason.
- Dispatch on lease-88f1: eight sandbox-small workers, six-minute TTL. Lease expires; provider keeps rendering and reservations stay held.
- New worker reloads the job, checks provider status per submitted item, collects what finished.
- One response never arrived. Stays unresolved, reservation held, worker asks the provider instead of resubmitting.
- All seven accepted outputs land. Email fails. Delivery worker retries the email against the completed job; generation untouched.
- Land: one job, a recoverable lifecycle, honest accounting, and a substrate that was allowed to disappear under it. The abstraction the batch tool owed us.
- Do — Trace from demo.md, row by row. Ask the room for each next transition before revealing it. Compress rows 1 and 2 on short routes.

### 11. Ten Workers Buy You Five

27:00–29:30 · steady · 02:30

> Serial tenth: ten workers → 5.26×, a hundred → 9.17×
> Latency: dispatch + queue + slowest branch + merge + verify
> Cost: every candidate, every retry, every held reservation, review time

- Three decisions were hiding in the walkthrough. Placement: where it runs, done. Tasks: split the work, the batch did that. Attempts: several complete answers, nobody has budgeted yet.
- Before we do, the arithmetic, because it is unkind. Amdahl, 1967: serial tenth, ten workers → five and a quarter, a hundred workers → nine.
- Waiting on every branch can make a finished task slower.
- Count the whole thing: all candidates, failed work, reserved uncertainty, judging, human review. Compare against one competent attempt on the same task set.
- Measure accepted outcomes, not launched workers. Not the number of things blinking.
- Bridge: Amdahl prices speed. The third axis buys something else.
- Do — Do the division on stage. Let the room shout five before you reveal 5.26.
- Source — Amdahl (1967), Validity of the single processor approach to achieving large scale computing capabilities, AFIPS Conference Proceedings 30, 483 to 485.

### 12. The Barrel-of-Monkeys Maneuver

29:30–33:00 · build · 03:30

> Somebody will cite Knight and Leveson. Cite it first.
> Race · Synthesize · Rank · Catch
> Fan-out is one node with an env var; the next stage handles the barrel

- Change the unit of work from images to whole designs. Same batch API, three competing designs, three cheap models, three different priorities.
- Pre-empt: Knight and Leveson, 1986. Twenty-seven programmers, one spec, a million tests, separately written versions failed together. About N-version programming as a correctness strategy. Not this. I am not voting three models toward the truth.
- Name it: the barrel-of-monkeys maneuver. Cheap parallel generation on purpose, models chosen against a declared generation budget, hand the barrel to the next stage.
- Race: first draft that passes the gate. Synthesize: frontier model reads them all (input is cheap), writes one. Rank: more candidates for the judges. Catch: more samples can expose a hidden failure mode; no guaranteed detection rate.
- Hedge, in the open: speculative optimization in a lab coat? Possibly. Ship behind an env var that sets fan-out to one; ideally the system tunes that knob itself. That is the companion talk.
- Bridge: something still has to handle the barrel.
- Diagram — Cheap generation → shared gates → cheap multi-model judges reporting disagreement.
- Do — Name the four reasons; silent reflection only, no extra audience-response beat.
- Source — Knight and Leveson (1986), [An Experimental Evaluation of the Assumption of Independence in Multiversion Programming](https://doi.org/10.1109/TSE.1986.6312924), IEEE Transactions on Software Engineering SE-12(1), 96 to 109. Cited to set aside.

### 13. Council of Guards

33:00–37:30 · peak · 04:30

> Same-rate example: five verdicts 1.025¢; one draft 0.78¢
> Five judges, different models. Report the disagreement, not the average.
> Gates before preferences; the council may reject the room

- At Haiku 4.5 rates ($1 input / $5 output per million), 300 input + 1,500 output costs 0.78¢. Five judges × (1,800 input + 50 output) cost 1.025¢: 131% of the draft. Reading dominates.
- Not the average score. The disagreement. Judges that split, or whose reasons barely overlap, have found territory nobody understands. That candidate does not ship on autopilot.
- Council of Guards: sum the actual rates of the five different models. The same-rate calculation is a benchmark, not a multi-model quote; assume no shared cache.
- Gates before you read the candidates: no duplicate dispatch after restart, no cross-tenant spend, no regeneration on notification retry, no dispatch after deadline.
- Every candidate fails one, including the careful one. The council may reject the room. A synthesis is a new candidate. Stop at the review budget.
- Do — Score the three candidates in demo.md. Room finds each failed gate before the reveal. Then the council split: high agreement on the minimalist's failure, low overlap on the maintainer's. Ask which one deserves the human's afternoon. Two minutes total; one minute and maintainer only on the 30 route.
- Climax: none of this looks like the engineering we were raised on. Don't do the work twice, don't spend speculatively, one right answer per ticket. Axioms when the expensive thing was the engineer.
- When the expensive thing is being wrong and a second draft costs cents, doing it three times and reading what disagrees is the frugal move. Not a shill for Big Token. Cheaper, safer, faster now sometimes come from spending exactly where yesterday's wisdom said not to.

### 14. Put the limit where the work begins

37:30–40:00 · land · 02:30

> One ledger across every caller
> Durable state across every restart
> A lease on every box, a gate on every candidate

- Back to the four callers. Forty jobs, legal by four local counters. Missing: one shared account of what was promised and what was already started.
- The inversion is real. The workload describes its own shape and asks for its own compute; the substrate grants it in seconds. Better than a warm fleet and a guess.
- Catalog, ledger and expiring boxes limit what a mistaken request can spend or reach.
- Inspect one expensive tool in your system. Count the work it can launch underneath itself. Put the limit where the work begins.
- Do — Close on the multiplication and the shared admission line. No new vendor. Stop talking.

Delivery limits: follow [pacing.md](pacing.md). Seven audience-response beats; all other diagrams are guided explanation. Admission unavailable: durably queue or explicitly reject, never fail open. Slide 10 uses lease-88f1 (sandbox-small, eight workers, six-minute TTL), with a 30-word/25-second story substitution. Amdahl assumes fixed work, perfect parallel division and free coordination.
