# Compute, Please (and a Receipt): 15-minute presenter script

Use slides 1, 2, 3, 6, 10, 14. Read the prose as the talk track; perform the delivery notes instead of reading them aloud. Fill the bounded Story slots before delivery; their allowances are included, never added. [Spoken and interaction budgets](pacing.md) sum to this slot. Timings are rehearsal targets without Q&A. Lightning route: the multiplication, the inversion, the ecosystem, one admission rule, then a compressed restart walkthrough.

## 00:00 to 02:00: slide 1, Four callers, forty images, one customer

On screen:

> A chat turn, a retry, a cron job, a second tab
> Each legal. Each ten images.
> The customer bought ten.

A customer asks for ten images. Four things happen within a minute, and every one of them is legitimate. The chat turn calls the batch tool. A worker crashed halfway and its replacement retries. A nightly job re-runs anything not marked done. The customer opened a second tab because the first one looked stuck.

Four callers, ten images each. Every local limit passed. The provider is rendering forty. Your dashboard proudly reports four tool calls. We put the limit on the wrong unit of work.

Your agent chooses the compute, and the bill still has your name on it. Numbers here are fixtures; the vendors later are real.

Delivery: Let the room multiply before you show forty. Then ask which component knew the customer's entitlement. Silence is the answer.

## 02:00 to 05:00: slide 2, Infra Is a Tool Call

On screen:

> `replicas: 12`, decided by ops in 2023, for everyone
> `{ shape: provider-wait, n: 8, ttl: 6m, cap: $1.50 }`, decided by the job, at job start
> Resolve: catalog, tenant budget, lease with a teardown

Here is the part that is actually new. The orchestrator asks for compute the way it asks for a tool. Eight sandboxes for six minutes, this region, this cost cap. The scheduler resolves that against a catalog of approved classes and the tenant's budget, and returns a lease with a teardown.

What you get is per-job economics. A customer can buy a faster turnaround. Finance can cap one workflow instead of one environment. Nobody pays for a warm fleet sized for the worst Tuesday of the year. And short lifetimes help limit exposure: an instance that lives six minutes, reaches three domains, and holds one scoped credential limits the reach of a confused agent.

What you risk is obvious. An agent that can provision is an agent that can spend. The catalog, the lease and the teardown are the answer, and they are enforced outside the model. The agent chooses; it does not grant. Everything the lease is enforced against is still yours to build, and that is the middle of this talk. First, proof that the substrate exists.

Story: Replace up to 40 words of the per-job economics paragraph with a first-hand capacity-planning example. This is substitution, not extra material; at most 25 seconds within the spoken budget.

Delivery: Contrast one autoscaler threshold with one job request. Ask which one you could put on an invoice.

## 05:00 to 07:30: slide 3, Torn Down by Default

On screen:

> Sandboxes: Fly.io Sprites, Depot
> Serverless compute and GPUs: Modal, Vast.ai
> Durable edge state: Cloudflare Workers, Durable Objects, Workflows
> Interruptible capacity: AWS EC2 Spot

Fly.io Sprites are microVMs with a stated sub-second creation target, checkpoints and external egress policy. Depot provides agent sandboxes with per-second billing. Modal offers scale-to-zero functions and GPUs; Vast.ai is a GPU marketplace. Cloudflare Durable Objects and Workflows hold coordination state; Dynamic Workflows, shipped in May 2026, lets code vary per tenant or request. Spot capacity can disappear. These are different billing and isolation contracts. Your scheduler still owns the lifetime, network policy and ledger.

Delivery: Ask who runs agent code on something with a lifetime under an hour. Then ask who has an egress policy on it.

Bridge: fifty containers do not make a provider render faster; match the class to the work, and count logical items and provider attempts separately, because a retry is not a new entitlement.

## 07:30 to 10:00: slide 6, Put admission below every caller

On screen:

> Reserve before dispatch
> Share tenant and provider limits
> Queue or reject what does not fit

A prompt that says only run one expensive tool is guidance. It is not a lock. The chat turn, the retry, the cron job and the second tab arrive at once, and none of them can see the others.

So every external dispatch crosses one shared admission controller. It atomically checks tenant entitlement, budget, provider concurrency, rate and deadline, then reserves. If the request does not fit, it queues or returns an explicit rejection. If admission is unavailable, queue durably or reject explicitly; never dispatch without a reservation. Measure its p99: this coordinated write is on the hot path. A process-local semaphore only works when that process owns all the work, and in an agentic system it never does.

Delivery: Walk two simultaneous callers in contracts.md. Read-balance-then-write loses; atomic reservation admits one.

Bridge: money, concurrency and rate are three different limits, and a job survives its caller only when intent, provider IDs and reservations are persisted before dispatch.

## 10:00 to 13:00: slide 10, Walkthrough: restart the batch

On screen:

> Two callers, one entitlement
> lease-88f1 expires mid-batch
> One response lost, one email fails

Two callers want distinct batches against one entitlement. Seven items reserve $1.40 of the $1.50 provider cap; three are refused. The second batch queues. Duplicate calls for the first batch get its existing job ID. Dispatch uses slide 2's lease-88f1, eight sandbox-small workers. Six minutes into the job its TTL expires: the sandboxes stop, the provider keeps rendering, the reservations stay charged.

A new worker reloads the job, checks provider status for every submitted item, and collects what finished. One item's response never arrived; it stays unresolved with its reservation held, and the worker asks the provider rather than resubmitting. All seven accepted outputs land. The email fails. The delivery worker retries the email against the completed job, and the expensive generation is untouched.

One job, a recoverable lifecycle, honest accounting, and a compute substrate that was allowed to disappear under it. That is the abstraction the batch tool owed us.

Delivery: The trace in demo.md; compress rows 1 and 2 on the short routes. Ask the room for each next transition before revealing it.

Bridge: two more scaling axes have names. The barrel-of-monkeys maneuver leads with cheap parallel generation on purpose and hands the barrel to the next stage. The Council of Guards is cheap judges from different models, and the number you want back is the disagreement. Gate every candidate; a synthesis is a new candidate.

## 13:00 to 15:00: slide 14, Put the limit where the work begins

On screen:

> One ledger across every caller
> Durable state across every restart
> A lease on every box, a gate on every candidate

Back to the four callers. Forty jobs were legal by four local counters. The missing piece was one shared account of what the application had promised and what it had already started.

The inversion is real: the workload can now describe its own shape and ask for its own compute, and the substrate to grant it in seconds already exists. That is a better world than a warm fleet and a guess. The catalog, ledger and expiring boxes limit what a mistaken request can spend or reach.

The bill still has your name on it. Inspect one expensive tool and count the work underneath it. Put the limit where the work begins.

Delivery: Close on the multiplication and the shared admission line. Do not add a vendor. Stop talking.
