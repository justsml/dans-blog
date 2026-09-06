# Evidence and editorial boundaries: Dynamic Scaling of Agentic Workloads

## What is first-hand

- **Council of attempts (slide 12).** Dan compares two to five model or persona attempts before a harder review. Say contrasting approaches expose tradeoffs; do not claim statistically independent failures or that a cheaper model won a particular contest.
- **Agent-directed compute (slide 7).** The request-catalog-lease shape is the design Dan's agent generator is growing toward (see the adaptive talk). Present as design, not as a deployed scheduler.

## Story slots to fill before delivery

| Slide | Prompt |
| --- | --- |
| 1 | The fan-out you found on a bill before a dashboard. |
| 7 | The moment an agent-sized request would have replaced a capacity-planning meeting. |

## Vendors on slide 8, checked 2026-09-06

| Vendor | What the slide claims | Source |
| --- | --- | --- |
| Fly.io Sprites | Hardware-isolated Linux VMs, create in 1 to 2 s, checkpoint/restore, egress policy applied from outside the sandbox | [Agent sandboxes](https://fly.io/learn/agent-sandbox/), [launch post](https://fly.io/blog/code-and-let-live/) |
| Depot | Remote agent sandboxes and a sandbox SDK billed per vCPU-second, aimed at agent-generated code | [Announcement](https://depot.dev/blog/now-available-remote-agent-sandboxes), [API docs](https://depot.dev/docs/api/overview) |
| Modal | Serverless functions and GPUs that scale to zero | [Modal docs](https://modal.com/docs) |
| Vast.ai | GPU marketplace with short-lived, low-cost instances | [vast.ai](https://vast.ai/) |
| Cloudflare Workers, Durable Objects, Workflows | Coordinated state and durable steps; in-memory Durable Object state can be discarded on lifecycle transitions | [Workflows](https://developers.cloudflare.com/workflows/), [DO lifecycle](https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/) |
| AWS EC2 Spot | Interruptible capacity with a two-minute interruption notice | [Spot interruptions](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-interruptions.html) |

Dan's notes also named **MetalSmith**. A search on 2026-09-06 found only the OpenStack bare-metal provisioning tool and the Node static-site generator, neither a compute vendor. It is left off the slide until the product can be identified; add it to the ecosystem diagram and this table once confirmed.

Prices and limits change. Recheck before quoting any of them in Q&A.

## Other sources

- [AWS retry with backoff](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/retry-backoff.html): supports slide 6.
- [Anthropic, Building effective agents](https://www.anthropic.com/engineering/building-effective-agents): parallelization and evaluator vocabulary for slide 12; it does not evaluate persona councils.

## Cuts

| Idea from the notes | Treatment |
| --- | --- |
| Notification presence, quiet hours, channel policy | Cut to one outbox paragraph on slide 10 |
| "Fifty sandboxes do not make the provider render faster" | Kept as one line on slide 9 |
| Ryan Dahl durable-object release | Omitted; project identity not established |
| Smarter model as a semaphore | Replaced with shared admission enforced outside the model |
| Hundreds of candidate outputs | Two or three bounded attempts with a declared review budget |

## Portfolio boundary

Dynamic Scaling owns admission, ledgers, durable jobs, the compute substrate and parallel attempts. Adaptive owns per-job agent generation, repair authority and the data boundary. Improvement From Failure owns the scheduled improvement loop.
