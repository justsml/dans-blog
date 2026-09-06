# Dynamic Scaling of Agentic Workloads

## Short abstract (50 words)

Four legitimate callers launch forty image jobs for a customer who bought ten. Every local limit passed. This talk fixes the accounting, then shows the inversion that makes it urgent: agents that describe their own compute and ask for it, on sandboxes and spot capacity that live minutes, inside a per-customer budget.

## Standard abstract (100 words)

Scaling used to be an infra decision made once for everyone. Agentic workloads invert it: the job can say it is waiting on a provider, needs a GPU for ninety seconds, or wants a sandbox, and ask for exactly that. This talk follows an image batch through hidden fan-out, shared admission, a $2 ledger, a reclaimed spot worker and a lost response, then shows compute as something the orchestrator requests inside a catalog and a lease. We survey the ephemeral substrate (Fly.io Sprites, Depot, Modal, Vast.ai, Cloudflare Durable Objects, EC2 Spot), treat parallel attempts as a scaling axis, and measure the accepted outcome.

## Outcomes

- Locate hidden fan-out and enforce aggregate limits at the point where work begins.
- Specify a compute request, catalog and lease so an agent can direct its own scale without granting itself anything.
- Persist job state that survives reclaimed instances and lost responses, and gate parallel attempts before comparing them.

Audience: application, platform and infrastructure engineers. 14 slides, 40 minutes including a five-minute paper walkthrough; 15 and 30 minute routes available. [Full submission packet](../../packets/dynamic-scaling/packet.md).
