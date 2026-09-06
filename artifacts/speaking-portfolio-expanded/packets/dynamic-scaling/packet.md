# Talk packet: Dynamic Scaling of Agentic Workloads

[Formats](formats.md) · [Visuals](visuals.md) · [40-minute script](script-40min.md) · [Contracts](contracts.md) · [Evidence](evidence-bank.md) · [Deck](../../../reveal-talks/dynamic-scaling.html)

## Titles

- Dynamic Scaling of Agentic Workloads
- Put the limit where the work begins
- Four callers, forty images, one customer

## Short abstract (50 words)

Four legitimate callers launch forty image jobs for a customer who bought ten. Every local limit passed. This talk fixes the accounting, then shows the inversion that makes it urgent: agents that describe their own compute and ask for it, on sandboxes and spot capacity that live minutes, inside a per-customer budget.

## Standard abstract (100 words)

Scaling used to be an infra decision made once for everyone. Agentic workloads invert it: the job can say it is waiting on a provider, needs a GPU for ninety seconds, or wants a sandbox, and ask for exactly that. This talk follows an image batch through hidden fan-out, shared admission, a $2 ledger, a reclaimed spot worker and a lost response, then shows compute as something the orchestrator requests inside a catalog and a lease. We survey the ephemeral substrate (Fly.io Sprites, Depot, Modal, Vast.ai, Cloudflare Durable Objects, EC2 Spot), treat parallel attempts as a scaling axis, and measure the accepted outcome.

## Extended abstract (205 words)

Scaling used to be an infra decision made once for everyone: add replicas, buy a bigger box, let an autoscaler watch CPU. Agentic workloads invert it. The orchestrator knows the shape of each job at the moment it starts and can ask for compute the way it asks for a tool, inside a per-customer cost cap.

The worked example is an image batch. Four legitimate callers (a chat turn, a retry, a cron job, a second browser tab) launch forty provider jobs for a customer who bought ten. We put admission below every caller, separate money from concurrency from rate, walk a $2 ledger with its reservation-tightness trade, and persist the job so it survives a reclaimed spot worker and a lost response without resubmitting.

Then the inversion: a compute request with shape, size, duration and cap, resolved against a catalog into a lease with a teardown. Least privilege stops being a project when the box lives six minutes and reaches three domains. We survey the substrate that already works this way (Fly.io Sprites, Depot sandboxes, Modal, Vast.ai, Cloudflare Workers and Durable Objects, EC2 Spot), then treat parallel design attempts as one more axis with gates before preferences. Close on measuring the accepted outcome against one competent attempt.

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
