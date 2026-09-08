# Compute, Please (and a Receipt): 30-minute presenter script

Budget: 26 spoken minutes (including bounded stories and bridges) + 4 interaction minutes = 30. See [per-slide counts and reveal limits](pacing.md).

Use slides 1, 2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 14. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill the bounded Story slots before delivery; their allowances are included, never added. [Spoken and interaction budgets](pacing.md) sum to this slot. Timings are rehearsal targets without Q&A.

## 00:00 to 02:00: slide 1, Four callers, forty images, one customer

On screen:

> A chat turn, a retry, a cron job, a second tab
> Each legal. Each ten images.
> The customer bought ten.

A customer asks for ten images. Four things happen within a minute, and every one of them is legitimate. The chat turn calls the batch tool. A worker crashed halfway and its replacement retries. A nightly job re-runs anything not marked done. The customer opened a second tab because the first one looked stuck.

Four callers, ten images each. Every local limit passed. The provider is rendering forty. Your dashboard proudly reports four tool calls. We put the limit on the wrong unit of work.

Your agent chooses the compute, and the bill still has your name on it. Numbers here are fixtures; the vendors later are real.

Delivery: Let the room multiply before you show forty. Then ask which component knew the customer's entitlement. Silence is the answer.

## 02:00 to 05:30: slide 2, Infra Is a Tool Call

On screen:

> `replicas: 12`, decided by ops in 2023, for everyone
> `{ shape: provider-wait, n: 8, ttl: 6m, cap: $1.50 }`, decided by the job, at job start
> Resolve: catalog, tenant budget, lease with a teardown

For twenty years scaling was an infra question answered once for everyone. Add replicas or buy a bigger box, then let an autoscaler watch CPU and guess. The workload never got a say. Now it does. The orchestrator knows this batch is mostly waiting on a provider, that this one needs a GPU for ninety seconds, that this one is untrusted code and wants a sandbox, and it knows at the moment the job starts.

Here is the part that is actually new. The orchestrator asks for compute the way it asks for a tool. Eight sandboxes for six minutes, this region, this cost cap. The scheduler resolves that against a catalog of approved classes and the tenant's budget, and returns a lease with a teardown.

What you get is per-job economics. A customer can buy a faster turnaround. Finance can cap one workflow instead of one environment. Nobody pays for a warm fleet sized for the worst Tuesday of the year. And short lifetimes help limit exposure: an instance that lives six minutes, reaches three domains, and holds one scoped credential limits the reach of a confused agent.

What you risk is obvious. An agent that can provision is an agent that can spend. The catalog, the lease and the teardown are the answer, and they are enforced outside the model. The agent chooses; it does not grant. Everything the lease is enforced against is still yours to build, and that is the middle of this talk. First, proof that the substrate exists.

Story: Replace up to 40 words of the per-job economics paragraph with a first-hand capacity-planning example. This is substitution, not extra material; at most 25 seconds within the spoken budget.

Delivery: Contrast one autoscaler threshold with one job request. Ask which one you could put on an invoice.

## 05:30 to 08:30: slide 3, Torn Down by Default

On screen:

> Sandboxes: Fly.io Sprites, Depot
> Serverless compute and GPUs: Modal, Vast.ai
> Durable edge state: Cloudflare Workers, Durable Objects, Workflows
> Interruptible capacity: AWS EC2 Spot

The pieces exist, and they are shaped for this. Fly.io Sprites are microVMs whose stated creation target is under a second, checkpoint and restore, and take an egress policy from outside so the agent inside cannot loosen it. Depot sandboxes bill by the second for exactly this: run agent-generated code, throw it away.

Modal gives you functions and GPUs that scale to zero; Vast.ai is a marketplace where a spare GPU is cheap and short-lived. Cloudflare Workers with Durable Objects and Workflows hold durable coordination state. Dynamic Workflows, shipped in May 2026, lets workflow code vary per tenant or request. EC2 Spot is the old version of the same idea: capacity that can vanish, so the job had better be restartable.

These are different products, not one isolation or billing contract. The scheduler must enforce lifetime, budget and network policy for the class it grants. That is the substrate an agent-directed scheduler needs. What none of them give you is the ledger; that is still yours.

Delivery: Ask who runs agent code on something with a lifetime under an hour. Then ask who has an egress policy on it.

Bridge: match the execution class to the work; waiting on a provider needs a durable step, not a GPU. Where the money and the state live starts by counting.

## 08:30 to 10:00: slide 5, Count items and attempts, not tool slots

On screen:

> Agent slots ≠ tool batch size ≠ provider attempts ≠ entitlement

Back to the forty. It is worse. A runtime's concurrency limit counts tool calls. A batch tool multiplies each one. A retry layer multiplies again. Forty logical items become eighty provider attempts when every item gets one retry, and the visible count still says four.

Record logical items and external attempts separately. A retry is another attempt at an item, not a new entitlement. And read the batch tool's actual contract: maximum batch size, resource estimate, cancellation behavior, what a partial result looks like.

Delivery: Draw four callers, ten children, one retry layer. Count to eighty out loud.

## 10:00 to 12:00: slide 6, Put admission below every caller

On screen:

> Reserve before dispatch
> Share tenant and provider limits
> Queue or reject what does not fit

A prompt that says only run one expensive tool is guidance. It is not a lock. The chat turn, the retry, the cron job and the second tab arrive at once, and none of them can see the others.

So every external dispatch crosses one shared admission controller. It atomically checks tenant entitlement, budget, provider concurrency, rate and deadline, then reserves. If the request does not fit, it queues or returns an explicit rejection. If admission is unavailable, queue durably or reject explicitly; never dispatch without a reservation. Measure its p99: this coordinated write is on the hot path. A process-local semaphore only works when that process owns all the work, and in an agentic system it never does.

Delivery: Walk two simultaneous callers in contracts.md. Read-balance-then-write loses; atomic reservation admits one.

## 12:00 to 13:30: slide 7, Money, concurrency and rate are three limits

On screen:

> Concurrency ≠ requests per minute ≠ dollars
> Reserved ≠ charged. Cancelled ≠ refunded.
> Pessimistic reservations refuse real work; choose your tightness

You can satisfy any one of these and blow the other two. Reserve a defensible maximum per operation, reconcile against the bill when the answer arrives, and keep unresolved provider jobs charged until you know. A worker lease expiring revokes its dispatch authority, not that the remote render stopped.

There is a real trade here. Reserve the full retry allowance up front and a second legitimate caller gets queued behind money that may never be spent. Reserve each retry atomically and the cap still holds, but a retry may be refused. Pick a tightness on purpose and write it down.

Delivery: Use the $1.50 ledger in contracts.md: seven items reserve $1.40, three refused. Ask why the remaining ten cents cannot fund another allowance.

## 13:30 to 15:30: slide 8, A durable job survives the caller

On screen:

> queued → submitted → waiting → completed / failed / unresolved
> Callbacks: authenticate, deduplicate, valid transitions only
> Notification is its own job

Accept ten prompts, return a stable job ID, persist item IDs, provider IDs, reservations, attempts, output locations and terminal states. The conversation can end. The sandbox can be reclaimed. The job continues.

Callbacks arrive twice and out of order; authenticate, deduplicate, apply only valid transitions. A restart rebuilds pending work from storage, not from replaying the conversation. And when the output is stored, enqueue the notification through an outbox so an email failure never regenerates an image. Naming something durable does not make an in-flight promise survive a lifecycle transition; the recovery protocol is yours to write.

Delivery: Draw the state machine in contracts.md. Crash after submission and before the provider ID is saved. Discuss unresolved.

Bridge: a scheduler can lower pressure after throttling without ever raising the ceiling; that policy is deterministic code, not a prompt. Now run every rule at once.

## 15:30 to 19:00: slide 10, Walkthrough: restart the batch

On screen:

> Two callers, one entitlement
> lease-88f1 expires mid-batch
> One response lost, one email fails

Seven items reserve $1.40 of the $1.50 cap; three are refused. The next batch queues. Duplicate calls get the existing job ID.

Lease-88f1 expires after six minutes. The sandboxes stop; the provider keeps rendering and reservations stay held. A new worker reloads the job and queries saved provider IDs. A missing response remains unresolved until reconciled; nobody resubmits it blindly. All seven outputs eventually land. The email fails. Retry notification, never generation.

The batch survives its caller and its compute. One lifecycle owns the reservations, provider identities and delivery state. The disappearing box never owned the truth.

Story: Optional bill-before-dashboard example from Dan's records: replace at most 30 existing words, maximum 25 seconds. Do not append; preserve the accounting and recovery facts.

Delivery: The trace in demo.md; compress rows 1 and 2 on the short routes. Ask the room for each next transition before revealing it.

## 19:00 to 21:00: slide 11, Ten Workers Buy You Five

On screen:

> Serial tenth: ten workers → 5.26×, a hundred → 9.17×
> Latency: dispatch + queue + slowest branch + merge + verify
> Cost: every candidate, every retry, every held reservation, review time

Starting ten workers does not delete the serial parts. That is Amdahl, 1967: if a tenth of the job is serial, ten workers get you five and a quarter times, and a hundred workers get you nine. That is an optimistic ceiling for fixed work: perfect division of the parallel part and free coordination. Waiting on every branch can make a finished task slower. Count the whole thing: all candidates, failed work, reserved uncertainty, judging and human review, and compare against one competent attempt on the same task set.

Measure accepted outcomes, not launched workers. We are trying to buy useful work, not maximize the number of things blinking. Amdahl prices speed. The third axis buys something else.

Source: Amdahl (1967), Validity of the single processor approach to achieving large scale computing capabilities, AFIPS Conference Proceedings 30, 483 to 485.

Delivery: Hide the answer line until the room computes 1 / (0.1 + 0.9 / 10); reveal 5.26 after the response.

## 21:00 to 24:30: slide 12, The Barrel-of-Monkeys Maneuver

On screen:

> Somebody will cite Knight and Leveson. Cite it first.
> Race · Synthesize · Rank · Catch
> Fan-out is one node with an env var; the next stage handles the barrel

Change the unit of work from images to whole designs. Same batch API, three competing designs, from three cheap models with three different priorities.

Somebody is going to cite Knight and Leveson at me, so let me do it first. 1986, twenty-seven programmers, one specification, a million tests, and the separately written versions failed together far more than independence predicts. True, important, and about N-version programming as a correctness strategy. Not this. I am not voting three models toward the truth.

The generation side has a name I am not sorry about: the barrel-of-monkeys maneuver. Lead with cheap parallel generation on purpose — models chosen against a declared generation budget — and hand the barrel to the next stage. Four reasons. Race: take the first draft that passes the gate. Synthesize: a frontier model reads them all, input tokens being the cheap ones, and writes one coherent output. Rank: more candidates for the judges, so the best whole answer goes downstream. Catch: sample multiple outputs to expose failure modes one draft can hide. Count the review cost; ten samples do not guarantee finding a rare mistake.

Speculative optimization in a lab coat? Possibly. Ship it with an env var that sets fan-out to one, and ideally let the system tune that knob itself. Right? Right. That is the companion talk. Something still has to handle the barrel.

Source: Knight and Leveson (1986), [An Experimental Evaluation of the Assumption of Independence in Multiversion Programming](https://doi.org/10.1109/TSE.1986.6312924), IEEE Transactions on Software Engineering SE-12(1), 96 to 109. Cited to set aside: it is a result about redundancy as a correctness strategy, which this slide does not claim.

Delivery: Name the four reasons and let the room choose silently. Do not open another discussion.

## 24:30 to 28:00: slide 13, Council of Guards

On screen:

> Same-rate example: five verdicts 1.025¢; one draft 0.78¢
> Five judges, different models. Report the disagreement, not the average.
> Gates before preferences; the council may reject the room

The Council of Guards has a bill. At Haiku 4.5 rates, a draft with 300 input and 1,500 output tokens costs 0.78 cents. Five judges, each reading 1,800 tokens and writing fifty at those same rates, cost 1.025 cents: 131 percent of generation. Reading dominates. A real council uses different models; sum their actual rates, with no assumed cache sharing. You are buying disagreement. A split buys human review, never automatic release.

Write the gates before you read the candidates: no duplicate dispatch after restart, no cross-tenant spend, no regeneration on notification retry, no dispatch after deadline. A synthesis is a new candidate. Stop at the review budget.

Delivery: One candidate only: the maintainer. Give 20 seconds to find the missing deadline check, reveal the gate, then show the five-judge split. Total exercise: one minute. Deliver the closing paragraph after the reveal.

None of this looks like the engineering we were raised on. Do not do the work twice. Do not spend compute speculatively. One right answer per ticket. Those were axioms when the expensive thing was the engineer. When the expensive thing is being wrong and a second draft costs cents, doing it three times and reading what disagrees is the frugal move. I am not a shill for Big Token. Cheaper, safer and faster now sometimes come from spending exactly where yesterday's wisdom told you not to.


## 28:00 to 30:00: slide 14, Put the limit where the work begins

On screen:

> One ledger across every caller
> Durable state across every restart
> A lease on every box, a gate on every candidate

Back to the four callers. Forty jobs were legal by four local counters. The missing piece was one shared account of what the application had promised and what it had already started.

The inversion is real: the workload can now describe its own shape and ask for its own compute, and the substrate to grant it in seconds already exists. That is a better world than a warm fleet and a guess. The catalog, ledger and expiring boxes limit what a mistaken request can spend or reach.

The bill still has your name on it. Inspect one expensive tool and count the work underneath it. Put the limit where the work begins.

Delivery: Close on the multiplication and the shared admission line. Do not add a vendor. Stop talking.
