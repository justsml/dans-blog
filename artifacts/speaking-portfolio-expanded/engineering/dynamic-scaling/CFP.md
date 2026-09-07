# Dynamic Scaling of Agentic Workloads

## Short abstract (50 words)

Four legitimate callers launch forty image jobs for a customer who bought ten. Every local limit passed. This talk fixes the accounting, then shows the inversion that makes it urgent: agents that describe their own compute and ask for it, on sandboxes and spot capacity that live minutes, inside a per-customer budget.

## Standard abstract (100 words)

Scaling used to be an infra decision made once for everyone. Agentic workloads invert it: the job can say it is waiting on a provider, needs a GPU for ninety seconds, or wants a sandbox, and ask for exactly that. This talk follows an image batch through hidden fan-out, shared admission, a $2 ledger, a reclaimed spot worker and a lost response, then shows compute as something the orchestrator requests inside a catalog and a lease. We survey the ephemeral substrate (Fly.io Sprites, Depot, Modal, Vast.ai, Cloudflare Durable Objects, EC2 Spot), then treat parallel generation and cheap multi-model judging as the last scaling axis.

## Outcomes

- Locate hidden fan-out and enforce aggregate limits at the point where work begins.
- Specify a compute request, catalog and lease so an agent can direct its own scale without granting itself anything.
- Persist job state that survives reclaimed instances and lost responses.
- Run the barrel-of-monkeys maneuver deliberately — race, synthesize, rank or catch — and gate every candidate before a preference is expressed, with a Council of Guards reporting disagreement rather than an average score.

## Reviewer notes

The closing section is not an argument that redundancy produces correctness. Knight and Leveson (1986) is raised on stage and explicitly set aside: it is a result about N-version programming as a correctness strategy, and this talk does not claim to vote models toward the truth. The case for parallel work here is cheaper, faster or better output, understanding the models you depend on, and detecting low judge overlap. Fan-out ships behind an environment variable that sets it to one; the talk says plainly that this borders on speculative optimization and should be tuned from measured acceptance. Prices are ratios, not quotes, and no provider's margin is claimed.

Audience: application, platform and infrastructure engineers. 14 slides, 40 minutes including a five-minute paper walkthrough; 15 and 30 minute routes available. [Full submission packet](../../packets/dynamic-scaling/packet.md).
