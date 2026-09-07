# Evidence and editorial boundaries: Dynamic Scaling of Agentic Workloads

## What is first-hand

- **Barrel of monkeys (slide 12), generation claim.** Dan leads with several cheap model or persona attempts on the same brief. Say that contrasting priorities expose tradeoffs; do not claim statistically independent failures or that a cheaper model won a particular contest.
- **Council of Guards (slide 12), judging claim.** Cheap parallel judges from different models score every candidate, and the reported signal is their *disagreement*, not an average or a vote. Do not present it as a correctness result.
- **Agent-directed compute (slide 7).** The request-catalog-lease shape is the design Dan's agent generator is growing toward (see the adaptive talk). Present as design, not as a deployed scheduler.

## Story slots to fill before delivery

| Slide | Prompt |
| --- | --- |
| 1 | The fan-out you found on a bill before a dashboard. |
| 7 | The moment an agent-sized request would have replaced a capacity-planning meeting. |

## Vendors on slide 8, checked 2026-09-06

| Vendor | What the slide claims | Source |
| --- | --- | --- |
| Fly.io Sprites | microVMs (own kernel, dedicated CPU and memory, own network namespace), copy-on-write checkpoint/restore, egress policy applied from outside the sandbox. Sub-second creation is Fly's *stated goal* on that page, not a measured figure; the slide says "stated creation target is under a second" | [Agent sandboxes](https://fly.io/learn/agent-sandbox/), [launch post](https://fly.io/blog/code-and-let-live/) |
| Depot | Remote agent sandboxes for agent-generated code, billed by the second ($0.01/min, no minimum). The announcement describes `depot claude` sessions as async only, monitored in the Depot UI, so the slide does not claim streamed output. A per-vCPU-second SDK claim would need a docs page that says so | [Announcement](https://depot.dev/blog/now-available-remote-agent-sandboxes), [API docs](https://depot.dev/docs/api/overview) |
| Modal | Serverless functions and GPUs that scale to zero | [Modal docs](https://modal.com/docs) |
| Vast.ai | GPU marketplace with short-lived, low-cost instances | [vast.ai](https://vast.ai/) |
| Cloudflare Workers, Durable Objects, Workflows | Coordinated state and durable steps; in-memory Durable Object state can be discarded on lifecycle transitions | [Workflows](https://developers.cloudflare.com/workflows/), [DO lifecycle](https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/) |
| AWS EC2 Spot | Interruptible capacity with a two-minute interruption notice | [Spot interruptions](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-interruptions.html) |

Dan's notes also named **MetalSmith**. A search on 2026-09-06 found only the OpenStack bare-metal provisioning tool and the Node static-site generator, neither a compute vendor. It is left off the slide until the product can be identified; add it to the ecosystem diagram and this table once confirmed.

Prices and limits change. Recheck before quoting any of them in Q&A.

## Other sources

- [AWS retry with backoff](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/retry-backoff.html): supports slide 6.
- [Anthropic, Building effective agents](https://www.anthropic.com/engineering/building-effective-agents): parallelization and evaluator vocabulary for slide 12; it does not evaluate persona councils.
- Knight and Leveson (1986), [An Experimental Evaluation of the Assumption of Independence in Multiversion Programming](https://doi.org/10.1109/TSE.1986.6312924), IEEE Transactions on Software Engineering SE-12(1), 96 to 109. Twenty-seven versions from one specification, one million tests, coincident failures well above the independence prediction. Cited on slide 12 to be set aside: it is a result about N-version redundancy as a correctness strategy, and the slide explicitly does not claim that. The Council of Guards argument is about characterizing the models you rely on, diffing behavior across model versions, synthesizing better output, and using cheap parallel judges (low output-token ratio) to measure disagreement, not to vote on truth.
- Judge token ratio (a thousand in, fifty out) and monkey price ratios (a hundredth, a thousandth of the frontier) are illustrative orders of magnitude, not quotes from any price list. Same for "one output in ten" on slide 12: a rhetorical rate, not a measurement.
- Amdahl (1967), Validity of the single processor approach to achieving large scale computing capabilities, AFIPS Conference Proceedings 30, 483 to 485. Cited on slide 13. The arithmetic on the slide is the standard formula: with a serial tenth, ten workers give 5.26x and a hundred give 9.17x. Checkable on stage.

## Cuts

| Idea from the notes | Treatment |
| --- | --- |
| Notification presence, quiet hours, channel policy | Cut to one outbox paragraph on slide 10 |
| "Fifty sandboxes do not make the provider render faster" | Kept as one line on slide 9 |
| Ryan Dahl durable-object release | Omitted; project identity not established |
| Smarter model as a semaphore | Replaced with shared admission enforced outside the model |
| Hundreds of candidate outputs | Bounded fan-out at named graph nodes with an env var to set it to one; the review budget is declared |

## Cut from slide 12 for time (2026-09-06)

The slide was 806 spoken words in five minutes. These four beats came off it. Each is already verbatim in the shorts, which are the place to deliver them; keep them here for Q&A.

| Beat | Where it lives | What it says |
| --- | --- | --- |
| Model characterization | [council-of-guards.md](../../shorts/council-of-guards.md), "what parallel attempts actually buy" | Run one brief through two models and you learn what each reaches for and what each forgets. |
| Migration harness | same beat | Same brief, new model, diff the behavior *before* you switch instead of after the incident. |
| Tool-calling agent vs single-shot | [barrel-of-monkeys.md](../../shorts/barrel-of-monkeys.md), "the monkeys are cheap" | Some monkeys need files, search, chunked reads, edits and git, which means a sandbox and somebody's cloud; others single-shot it fine. That is an effort-now versus retune-at-runtime architecture choice. |
| Encapsulate fan-out at graph nodes | [barrel-of-monkeys.md](../../shorts/barrel-of-monkeys.md), "single-shot generations are tools" | Fan-out is something you encapsulate at a node: default model for most traffic, n alternatives for a sample of requests. Your needs decide why, where and how often. |

Also off the 40-minute slide: "a revision loop, a router, the council, or your users in an A/B test" as the list of next stages (the slide now says "the next stage"), and "an endless debate is an expensive way to not ship".

## Portfolio boundary

Dynamic Scaling owns admission, ledgers, durable jobs, the compute substrate and parallel attempts. Adaptive owns per-job agent generation, repair authority and the data boundary. Improvement From Failure owns the scheduled improvement loop.
