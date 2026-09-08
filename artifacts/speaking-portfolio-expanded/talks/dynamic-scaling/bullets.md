# Dynamic Scaling of Agentic Workloads: bullet outline

Agents now direct their own compute; put the limits where the work begins.

Generated from [the 40-minute outline](outline-40min.md) by `bun artifacts/speaking-portfolio-expanded/bullets.ts`. Edit the outline, not this file. 14 slides, 40 minutes, no Q&A. Every Story line needs Dan's own record before delivery. Shorter routes: [15](adaptation-15min.md) · [30](adaptation-30min.md).

## Spine

1. **Four callers, forty images, one customer** — 00:00 · warm · 02:00
2. **Horizontal, vertical, and now self-directed** — 02:00 · warm · 03:00
3. **Count items and attempts, not tool slots** — 05:00 · steady · 02:00
4. **Put admission below every caller** — 07:00 · build · 03:00
5. **Money, concurrency and rate are three limits** — 10:00 · steady · 02:00
6. **Adapt pressure inside a fixed ceiling** — 12:00 · steady · 02:00
7. **Infra Is a Tool Call** — 14:00 · peak · 03:00
8. **Torn Down by Default** — 17:00 · steady · 03:00
9. **Fifty Containers Don't Render Faster** — 20:00 · steady · 02:00
10. **A durable job survives the caller** — 22:00 · build · 03:00
11. **Walkthrough: restart the batch** — 25:00 · peak · 05:00
12. **Monkeys, Then Guards** — 30:00 · build · 05:00
13. **Measure the accepted outcome** — 35:00 · land · 02:30
14. **Put the limit where the work begins** — 37:30 · land · 02:30

## Slides

### 1. Four callers, forty images, one customer

00:00–02:00 · warm · 02:00

> A chat turn, a retry, a cron job, a second tab
> Each legal. Each ten images.
> The customer bought ten.

- A customer asks for ten images. Four things happen within a minute, and every one of them is legitimate.
- Four callers, ten images each. Every local limit passed.
- That is the whole talk in one multiplication.
- Diagram — Each of four batch-tool calls starts ten jobs: 4 × 10 = 40, before retries.
- Story — The fan-out you found on a bill before you found it in a dashboard.
- Do — Let the room multiply before you show forty. Then ask which component knew the customer's entitlement. Silence is the answer.

### 2. Horizontal, vertical, and now self-directed

02:00–05:00 · warm · 03:00

> Horizontal: more boxes, decided by ops
> Vertical: bigger box, decided by ops
> Self-directed: the job describes its shape and asks

- For twenty years scaling was an infra question answered once for everyone.
- Agentic workloads do. The orchestrator knows this batch is mostly waiting on a provider, that this one needs a GPU for ninety seconds, that this one is untrusted code and wants a sandbox.
- Three decisions stay separate. Tasks: split the work.
- Diagram — Ops sized the fleet for everyone; an autoscaler reacts to CPU; an agentic job describes its own shape and asks.
- Do — Classify an image batch, a route-optimization run, three competing designs and a region move. Note that an LLM can schedule a solver without doing the arithmetic.

### 3. Count items and attempts, not tool slots

05:00–07:00 · steady · 02:00

> Agent slots ≠ tool batch size ≠ provider attempts ≠ entitlement

- A runtime's concurrency limit counts tool calls.
- Record logical items and external attempts separately.
- Diagram — One retry per item can turn 40 logical items into 80 provider attempts.
- Do — Draw four callers, ten children, one retry layer. Count to eighty out loud.

### 4. Put admission below every caller

07:00–10:00 · build · 03:00

> Reserve before dispatch
> Share tenant and provider limits
> Queue or reject what does not fit

- A prompt that says only run one expensive tool is guidance.
- So every external dispatch crosses one shared admission controller.
- Diagram — One coordinated reservation protects tenant spend and entitlement across all callers.
- Do — Walk two simultaneous callers in contracts.md. Read-balance-then-write loses; atomic reservation admits one.

### 5. Money, concurrency and rate are three limits

10:00–12:00 · steady · 02:00

> Concurrency ≠ requests per minute ≠ dollars
> Reserved ≠ charged. Cancelled ≠ refunded.
> Pessimistic reservations refuse real work; choose your tightness

- You can satisfy any one of these and blow the other two.
- There is a real trade here. Reserve the full retry allowance up front and a second legitimate caller gets queued behind money that may never be spent.
- Diagram — Illustrative $2 run cap: settled + reserved ≤ $2. Prices here are invented fixture values.
- Do — Use the $2 ledger in contracts.md. Show settled plus reserved never passing $2, then ask what the second caller should have seen.

### 6. Adapt pressure inside a fixed ceiling

12:00–14:00 · steady · 02:00

> Throttled → wait and reduce
> Healthy window → cautious increase
> Deadline → stop dispatch, report honestly

- An agent can propose that a batch of ten becomes five after the provider starts failing.
- When the deadline arrives, stop new work and report completed, pending and unresolved separately.
- Diagram — The scheduler reduces admission after throttling; every increase remains inside the approved maximum.
- Do — Walk ten to five, then a cautious recovery that never exceeds the original ceiling.

### 7. Infra Is a Tool Call

14:00–17:00 · peak · 03:00

> Request: shape, size, duration, region, cost cap
> Resolve: catalog, tenant budget, lease
> Pay per job. No idle fleet. Least privilege for free.

- Here is the part that is actually new. The orchestrator asks for compute the way it asks for a tool.
- What you get is per-job economics. A customer can buy a faster turnaround.
- What you risk is obvious. An agent that can provision is an agent that can spend.
- Diagram — The job requests shape, size, duration and a cost cap; the scheduler resolves it against a catalog and tenant budget and returns a lease.
- Story — The moment an agent-sized request would have replaced a capacity-planning meeting.
- Do — Contrast one autoscaler threshold with one job request. Ask which one you could put on an invoice.

### 8. Torn Down by Default

17:00–20:00 · steady · 03:00

> Sandboxes: Fly.io Sprites, Depot
> Serverless compute and GPUs: Modal, Vast.ai
> Durable edge state: Cloudflare Workers, Durable Objects, Workflows
> Interruptible capacity: AWS EC2 Spot

- The pieces exist, and they are shaped for this.
- ai is a marketplace where a spare GPU is cheap and short-lived.
- The common thread: create in seconds, pay per second, torn down unless someone says otherwise, and the network narrowed from the outside.
- Diagram — Sandboxes, serverless GPUs, durable edge state and spot capacity, all created in seconds and torn down by default.
- Do — Ask who runs agent code on something with a lifetime under an hour. Then ask who has an egress policy on it.

### 9. Fifty Containers Don't Render Faster

20:00–22:00 · steady · 02:00

> Waiting on a provider → durable step, not a GPU
> CPU or GPU work → compute worker, spot if restartable
> Untrusted code → sandbox with egress policy

- If the provider is rendering the image, you are waiting on the network.
- These combine. The decision that matters is where execution happens and where recovery state lives; get those two right and the vendor list is a detail.
- Do — Place a local graph solver, a remote image request and an agent-written script into their classes.

### 10. A durable job survives the caller

22:00–25:00 · build · 03:00

> queued → submitted → waiting → completed / failed / unresolved
> Callbacks: authenticate, deduplicate, valid transitions only
> Notification is its own job

- Accept ten prompts, return a stable job ID, persist item IDs, provider IDs, reservations, attempts, output locations and terminal states.
- Callbacks arrive twice and out of order; authenticate, deduplicate, apply only valid transitions.
- Diagram — Persist intent and provider identity; uncertain acceptance goes to reconciliation, not blind replay.
- Do — Draw the state machine in contracts.md. Crash after submission and before the provider ID is saved. Discuss unresolved.

### 11. Walkthrough: restart the batch

25:00–30:00 · peak · 05:00

> Two callers, one entitlement
> Spot instance reclaimed mid-batch
> One response lost, one email fails

- Two callers each want a full batch. The first reserves the entitlement; the second queues with an explicit reason.
- A new worker reloads the job, checks provider status for every submitted item, and collects what finished.
- One job, a recoverable lifecycle, honest accounting, and a compute substrate that was allowed to disappear under it.
- Do — The trace in demo.md; compress rows 1 and 2 on the short routes. Ask the room for each next transition before revealing it.

### 12. Monkeys, Then Guards

30:00–35:00 · build · 05:00

> Barrel of monkeys: lead with cheap parallel generation, on purpose
> Council of Guards: judges read a thousand tokens and write fifty; measure the disagreement
> Gates before preferences; the judge may reject everyone

- Change the unit of work from images to whole designs.
- Somebody is going to cite Knight and Leveson at me, so let me do it first.
- The generation side has a name I am not sorry about: the barrel-of-monkeys maneuver.
- Speculative optimization in a lab coat? Possibly.
- The cheap half is judging. A judge reads a thousand tokens and writes fifty, and output is what costs, so five judges from different models on every candidate is affordable.
- Write the gates before you read the candidates: no duplicate dispatch after restart, no cross-tenant spend, no regeneration on notification retry, no dispatch after deadline.
- None of this looks like the engineering we were raised on.
- Diagram — Cheap parallel generation produces candidates; shared gates reject before preference; cheap multi-model judges report disagreement rather than an average score.
- Do — Score the three candidates in demo.md. Have the room find each candidate's failed gate before revealing it. Then show the council split per candidate: high agreement on the minimalist's failure, low overlap on the maintainer's, and ask which one deserves the human's afternoon.
- Source — Knight and Leveson (1986), [An Experimental Evaluation of the Assumption of Independence in Multiversion Programming](https://doi.org/10.1109/TSE.1986.6312924), IEEE Transactions on Software Engineering SE-12(1), 96 to 109. Cited to set aside: it is a result about redundancy as a correctness strategy, which this slide does not claim.

### 13. Measure the accepted outcome

35:00–37:30 · land · 02:30

> Latency: dispatch + queue + slowest branch + merge + verify
> Cost: every candidate, every retry, every held reservation, review time
> Compare against one competent attempt

- Starting three workers does not delete the serial parts.
- Measure accepted outcomes, not launched workers.
- Do — Ninety seconds: choose a baseline, a cap and an acceptance gate. Keep latency and total cost as separate numbers.
- Source — Amdahl (1967), Validity of the single processor approach to achieving large scale computing capabilities, AFIPS Conference Proceedings 30, 483 to 485.

### 14. Put the limit where the work begins

37:30–40:00 · land · 02:30

> One ledger across every caller
> Durable state across every restart
> A lease on every box, a gate on every candidate

- Back to the four callers. Forty jobs were legal by four local counters.
- The inversion is real: the workload can now describe its own shape and ask for its own compute, and the substrate to grant it in seconds already exists.
- Inspect one expensive tool in your system.
- Do — Close on the multiplication and the shared admission line. Do not add a vendor.
