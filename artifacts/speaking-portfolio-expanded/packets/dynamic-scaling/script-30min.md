# Dynamic Scaling of Agentic Workloads: 30-minute presenter script

Use slides 1, 2, 3, 4, 5, 7, 8, 10, 11, 12, 13, 14. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill every Story line before delivery. Timings are rehearsal targets without Q&A. Slides 6 and 9 are cut with bridges. Keep the spot-interruption event in the walkthrough.

## 00:00 to 01:30: slide 1, Four callers, forty images, one customer

A customer asks for ten images. Four things happen within a minute, and every one of them is legitimate. The chat turn calls the batch tool. A worker crashed halfway and its replacement retries. A nightly job re-runs anything not marked done. The customer opened a second tab because the first one looked stuck.

Four callers, ten images each. Every local limit passed. The provider is rendering forty. Your dashboard proudly reports four tool calls. We put the limit on the wrong unit of work.

That is the whole talk in one multiplication. The agentic part is what comes next: the same system that hid the fan-out can also ask for its own compute, and we have to decide what that is allowed to mean. Numbers here are fixtures; the vendors later are real.

Story: The fan-out you found on a bill before you found it in a dashboard.

Delivery: Let the room multiply before you show forty. Then ask which component knew the customer's entitlement. Silence is the answer.

## 01:30 to 04:00: slide 2, Horizontal, vertical, and now self-directed

For twenty years scaling was an infra question answered once for everyone. Add replicas or buy a bigger box, then let an autoscaler watch CPU and guess. The workload never got a vote.

Agentic workloads can vote. The orchestrator knows this batch is mostly waiting on a provider, that this one needs a GPU for ninety seconds, that this one is untrusted code and wants a sandbox. It can say so, per job, at the moment the job starts.

Three decisions stay separate. Tasks: split the work. Attempts: try several complete answers. Placement: choose where it runs. A model can propose all three cheaply now; it does not repeal the dependency graph, and it does not get to repeal the budget.

Delivery: Classify an image batch, a route-optimization run, three competing designs and a region move. Note that an LLM can schedule a solver without doing the arithmetic.

## 04:00 to 05:30: slide 3, Count items and attempts, not tool slots

A runtime's concurrency limit counts tool calls. A batch tool multiplies each one. A retry layer multiplies again. Forty logical items become eighty provider attempts when every item gets one retry, and the visible count still says four.

Record logical items and external attempts separately. A retry is another attempt at an item, not a new entitlement. And read the batch tool's actual contract: maximum batch size, resource estimate, cancellation behavior, what a partial result looks like.

Delivery: Draw four callers, ten children, one retry layer. Count to eighty out loud.

## 05:30 to 08:00: slide 4, Put admission below every caller

A prompt that says only run one expensive tool is guidance. It is not a lock. The chat turn, the retry, the cron job and the second tab arrive at once, and none of them can see the others.

So every external dispatch crosses one shared admission controller. It atomically checks tenant entitlement, budget, provider concurrency, rate and deadline, then reserves. If the request does not fit, it queues or returns an explicit rejection. A process-local semaphore only works when that process owns all the work, and in an agentic system it never does.

Delivery: Walk two simultaneous callers in contracts.md. Read-balance-then-write loses; atomic reservation admits one.

## 08:00 to 09:30: slide 5, Money, concurrency and rate are three limits

You can satisfy any one of these and blow the other two. Reserve a defensible maximum per operation, reconcile against the bill when the answer arrives, and keep unresolved provider jobs charged until you know. A worker lease expiring proves the worker died, not that the remote render stopped.

There is a real trade here. Reserve the full retry allowance up front and a second legitimate caller gets queued behind money that may never be spent. Reserve lazily and you can overshoot. Pick a tightness on purpose and write it down.

Delivery: Use the $2 ledger in contracts.md. Show settled plus reserved never passing $2, then ask what the second caller should have seen.

Bridge: a scheduler can lower pressure after throttling without ever raising the ceiling; that policy is deterministic code, not a prompt.

## 09:30 to 12:30: slide 7, The inversion: infra as an agent capability

Here is the part that is actually new. The orchestrator asks for compute the way it asks for a tool. Eight sandboxes for six minutes, this region, this cost cap. The scheduler resolves that against a catalog of approved classes and the tenant's budget, and returns a lease with a teardown.

What you get is per-job economics. A customer can buy a faster turnaround. Finance can cap one workflow instead of one environment. Nobody pays for a warm fleet sized for the worst Tuesday of the year. And least privilege stops being a project: an instance that lives six minutes, reaches three domains, and holds one scoped credential is hard to abuse even when the agent inside it is confused.

What you risk is obvious. An agent that can provision is an agent that can spend. The catalog, the lease and the teardown are the answer, and they are enforced outside the model. The agent chooses; it does not grant.

Story: The moment an agent-sized request would have replaced a capacity-planning meeting.

Delivery: Contrast one autoscaler threshold with one job request. Ask which one you could put on an invoice.

## 12:30 to 15:30: slide 8, The ecosystem is already ephemeral by default

The pieces exist, and they are shaped for this. Fly.io Sprites are hardware-isolated VMs that create in a second or two, checkpoint and restore, and take an egress policy from outside so the agent inside cannot loosen it. Depot sandboxes bill per second for exactly this: run agent-generated code, stream output, throw it away.

Modal gives you functions and GPUs that scale to zero; Vast.ai is a marketplace where a spare GPU is cheap and short-lived. Cloudflare Workers with Durable Objects and Workflows hold the coordination state that survives everything else being torn down. EC2 Spot is the old version of the same idea: capacity that can vanish, so the job had better be restartable.

The common thread: create in seconds, pay per second, torn down unless someone says otherwise, and the network narrowed from the outside. That is the substrate an agent-directed scheduler needs. What none of them give you is the ledger; that is still yours.

Delivery: Ask who runs agent code on something with a lifetime under an hour. Then ask who has an egress policy on it.

Bridge: match the execution class to the work; waiting on a provider needs a durable step, not a GPU.

## 15:30 to 18:00: slide 10, A durable job survives the caller

Accept ten prompts, return a stable job ID, persist item IDs, provider IDs, reservations, attempts, output locations and terminal states. The conversation can end. The sandbox can be reclaimed. The job continues.

Callbacks arrive twice and out of order; authenticate, deduplicate, apply only valid transitions. A restart rebuilds pending work from storage, not from replaying the conversation. And when the output is stored, enqueue the notification through an outbox so an email failure never regenerates an image. Naming something durable does not make an in-flight promise survive a lifecycle transition; the recovery protocol is yours to write.

Delivery: Draw the state machine in contracts.md. Crash after submission and before the provider ID is saved. Discuss unresolved.

## 18:00 to 22:00: slide 11, Walkthrough: restart the batch

Two callers each want a full batch. The first reserves the entitlement; the second queues with an explicit reason. Dispatch begins on a spot worker. Halfway through, the instance is reclaimed with two minutes' notice: the lease expires, the provider keeps rendering, the reservations stay charged.

A new worker reloads the job, checks provider status for every submitted item, and collects what finished. One item's response never arrived; it stays unresolved with its reservation held, and the worker asks the provider rather than resubmitting. All outputs land. The email fails. The delivery worker retries the email against the completed job, and the expensive generation is untouched.

One job, a recoverable lifecycle, honest accounting, and a compute substrate that was allowed to disappear under it. That is the abstraction the batch tool owed us.

Delivery: Five minutes from demo.md. Ask the room for each next transition before revealing it.

## 22:00 to 25:30: slide 12, Attempts are a scaling axis too

Change the unit of work from images to whole designs. Give the batch-job problem to three generated agents with the same requirements and different priorities: a minimalist, a maintainer, a security and performance reviewer. Keep first drafts separate so they do not converge on the first plausible answer. They can still share a blind spot; the contrast is the product.

Write the gates before reading the candidates: no duplicate dispatch after restart, no cross-tenant spend, no regeneration on notification retry, no dispatch after deadline. Run executable checks first. In the exercise every candidate fails a gate, including the careful one, which is the point: the judge is allowed to reject the room.

Then combine compatible ideas into a new candidate with one coherent set of assumptions and run the gates again. Passing parts do not make a passing whole. Stop at the review budget; an endless debate is an expensive way to not ship.

Delivery: Score the three candidates in demo.md. Have the room find each candidate's failed gate before revealing it.

## 25:30 to 27:30: slide 13, Measure the accepted outcome

Starting three workers does not delete the serial parts. Waiting on every branch can make a finished task slower. Count the whole thing: all candidates, failed work, reserved uncertainty, judging and human review, and compare against one competent attempt on the same task set.

Measure accepted outcomes, not launched workers. Start with one extra attempt or one batch boundary; if it does not buy quality, time or cost, keep the simpler path. We are trying to buy useful work, not maximize the number of things blinking.

Delivery: Ninety seconds: choose a baseline, a cap and an acceptance gate. Keep latency and total cost as separate numbers.

## 27:30 to 30:00: slide 14, Put the limit where the work begins

Back to the four callers. Forty jobs were legal by four local counters. The missing piece was one shared account of what the application had promised and what it had already started.

The inversion is real: the workload can now describe its own shape and ask for its own compute, and the substrate to grant it in seconds already exists. That is a better world than a warm fleet and a guess. It is only safe because the agent chooses from a catalog, spends from a ledger, and runs on boxes that expire.

Inspect one expensive tool in your system. Count the work it can launch underneath itself. Put the limit where that work actually begins.

Delivery: Close on the multiplication and the shared admission line. Do not add a vendor.
