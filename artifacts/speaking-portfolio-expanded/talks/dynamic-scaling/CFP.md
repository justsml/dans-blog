# Dynamic Scaling of Agentic Workloads

## Short abstract (50 words)

Four legitimate callers launch forty image jobs for a customer who bought ten. Every local limit passed. Now the same orchestrator can ask for its own compute: sandboxes and spot capacity that live minutes, inside a per-customer budget. This talk shows the inversion first, then builds the ledger that makes it safe.

## Standard abstract (100 words)

Scaling used to be an infra decision made once for everyone. Agentic workloads invert it: the job says it is waiting on a provider, needs a GPU for ninety seconds, or wants a sandbox, and asks for exactly that, resolved against a catalog into a lease with a teardown. The substrate already exists (Fly.io Sprites, Depot, Modal, Vast.ai, Cloudflare Durable Objects, EC2 Spot); what none of it ships is the ledger. We build one: hidden fan-out, shared admission, a $2 reservation ledger, a job that survives a reclaimed spot worker and a lost response. Then the third axis: the barrel-of-monkeys maneuver and a Council of Guards that reports disagreement.

## Outcomes

- Locate hidden fan-out and enforce aggregate limits at the point where work begins.
- Specify a compute request, catalog and lease so an agent can direct its own scale without granting itself anything.
- Persist job state that survives reclaimed instances and lost responses.
- Run the barrel-of-monkeys maneuver deliberately — race, synthesize, rank or catch — and gate every candidate before a preference is expressed, with a Council of Guards reporting disagreement rather than an average score.

## Reviewer notes

The closing section is not an argument that redundancy produces correctness. Knight and Leveson (1986) is raised on stage and explicitly set aside: it is a result about N-version programming as a correctness strategy, and this talk does not claim to vote models toward the truth. The case for parallel work here is cheaper, faster or better output, understanding the models you depend on, and detecting low judge overlap. Fan-out ships behind an environment variable that sets it to one; the talk says plainly that this borders on speculative optimization and should be tuned from measured acceptance. Prices are ratios, not quotes, and no provider's margin is claimed.

Audience: application, platform and infrastructure engineers. 14 slides, 40 minutes including a five-minute paper walkthrough; 15 and 30 minute routes available. [Full submission packet](packet.md).
