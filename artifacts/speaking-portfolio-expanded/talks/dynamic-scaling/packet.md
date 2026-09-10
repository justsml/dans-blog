# Talk packet: Compute, Please (and a Receipt)

[Formats](formats.md) · [Visuals](visuals.md) · [40-minute script](script-40min.md) · [Contracts](contracts.md) · Supporting code: [08 durable admission](https://github.com/justsml/scaling-ai-agents/blob/main/examples/src/08-durable-admission.ts), [10 council reliability](https://github.com/justsml/scaling-ai-agents/blob/main/examples/src/10-council-of-guards.ts), [11 bounded fan-out](https://github.com/justsml/scaling-ai-agents/blob/main/examples/src/11-fanout-node.ts) · [Evidence](evidence-bank.md) · Deck (deck not yet rebuilt; see [decks](../../../decks/README.md))

## Titles

- Compute, Please (and a Receipt)
- Descriptive subtitle: Dynamic scaling of agentic workloads

## Short abstract (50 words)

Four callers launch forty image jobs for a customer who bought ten. Now their orchestrator can request compute too. We follow its request into a catalog, lease and shared ledger, recover a batch after the lease expires, and price the disagreement reported by a Council of Guards.

## Standard abstract (100 words)

Four legitimate callers launch forty image jobs for a customer who bought ten. Now that orchestrator can request its own compute. Follow one request through a catalog, lease, shared admission and a $1.50 provider ledger that refuses three items. The lease expires mid-batch; durable state preserves accepted work and unresolved charges. Then we price the third scaling axis: attempts. The barrel-of-monkeys maneuver produces competing drafts; a Council of Guards reports disagreement and can reject every candidate. Five judges can cost more than the draft they review. The workload chooses what to request. Your ledger decides what it gets.

## Extended abstract (230 words)

Scaling used to be an infra decision made once for everyone: add replicas, buy a bigger box, let an autoscaler watch CPU. Agentic workloads invert it. The orchestrator knows the shape of each job at the moment it starts and can ask for compute the way it asks for a tool: shape, size, duration, region and a cost cap, resolved against a catalog into a lease with a teardown. Short lifetimes and scoped network access limit exposure. The substrate that already works this way is real (Fly.io Sprites, Depot sandboxes, Modal, Vast.ai, Cloudflare Workers and Durable Objects, EC2 Spot). None of it ships the ledger.

So the middle of the talk builds one, around a worked example. Four legitimate callers (a chat turn, a retry, a cron job, a second browser tab) launch forty provider jobs for a customer who bought ten. We put admission below every caller, separate money from concurrency from rate, walk a $1.50 ledger with its reservation-tightness trade, and persist the job so it survives an expired compute lease and a lost response without resubmitting.

Then the third scaling axis, attempts. Amdahl prices speed and is unkind about it; the barrel-of-monkeys maneuver buys something else, and a Council of Guards of cheap multi-model judges reports disagreement rather than an average. Close where the talk began: put the limit where the work begins.

## Learning outcomes

1. Locate hidden fan-out and enforce aggregate limits at the point where work begins.
2. Specify a compute request, catalog and lease so an agent can direct its own scale without granting itself anything.
3. Persist job state that survives reclaimed instances and lost responses, and gate parallel attempts before comparing them.

## Audience and prerequisites

Application, platform and infrastructure engineers building tool-using agents. Familiarity with queues, asynchronous jobs and cloud billing helps. No specific model, framework or cloud account required.

## Reviewer notes

14 slides; 15-, 30- and 40-minute routes; 60- or 75-minute workshop. Job counts and prices are fixtures. Vendors on the ecosystem slide are real and cited; no vendor pitch, no benchmark.

## Audience adaptations

| Audience | Lead with | Retain |
| --- | --- | --- |
| Practitioners | The multiplication and the ledger | Admission protocol, state machine |
| Infrastructure and platform | The inversion and the ecosystem | Catalog, lease, teardown, egress |
| Engineering leadership | Per-job cost controls and pay-for-performance | Measured accepted outcome |
| General technology | Four callers, forty images | One recovery trace and an honest stop |
