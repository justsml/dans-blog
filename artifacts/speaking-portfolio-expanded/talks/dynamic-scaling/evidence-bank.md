# Evidence and editorial boundaries: Compute, Please (and a Receipt)

## What is first-hand

- **Barrel of monkeys (slide 12), generation claim.** Dan leads with several cheap model or persona attempts on the same brief. Say that contrasting priorities expose tradeoffs; do not claim statistically independent failures or that a cheaper model won a particular contest.
- **Council of Guards (slide 13), judging claim.** Cheap parallel judges from different models score every candidate, and the reported signal is their *disagreement*, not an average or a vote. Do not present it as a correctness result.
- **Agent-directed compute (slide 2).** The request-catalog-lease shape is the design Dan's agent generator is growing toward (see the adaptive talk). Present as design, not as a deployed scheduler.

## Story slots to fill before delivery

| Slide | Prompt |
| --- | --- |
| 10 | The fan-out you found on a bill before a dashboard: maximum 40 words / 25 seconds, included in walkthrough spoken time. |
| 2 | Replace up to 40 words of per-job economics with the capacity-planning example; never add time. |

## Vendors on slide 3, refreshed 2026-09-08

| Vendor | What the slide claims | Source |
| --- | --- | --- |
| Fly.io Sprites | microVMs (own kernel, dedicated CPU and memory, own network namespace), copy-on-write checkpoint/restore, egress policy applied from outside the sandbox. Sub-second creation is Fly's *stated goal* on that page, not a measured figure; the slide says "stated creation target is under a second" | [Agent sandboxes](https://fly.io/learn/agent-sandbox/), [launch post](https://fly.io/blog/code-and-let-live/) |
| Depot | Remote agent sandboxes for agent-generated code, billed by the second ($0.01/min, no minimum). The announcement describes `depot claude` sessions as async only, monitored in the Depot UI, so the slide does not claim streamed output. A per-vCPU-second SDK claim would need a docs page that says so | [Announcement](https://depot.dev/blog/now-available-remote-agent-sandboxes), [API docs](https://depot.dev/docs/api/overview) |
| Modal | Serverless functions and GPUs that scale to zero | [Scaling docs](https://modal.com/docs/guide/scale) |
| Vast.ai | GPU marketplace with short-lived, low-cost instances | [Instance types](https://docs.vast.ai/guides/instances/choosing/instance-types) |
| Cloudflare Workers, Durable Objects, Workflows | Coordinated state and durable steps; in-memory Durable Object state can be discarded on lifecycle transitions | [Workflows](https://developers.cloudflare.com/workflows/), [DO lifecycle](https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/) |
| AWS EC2 Spot | Interruptible capacity; stopping/termination notices normally precede interruption by two minutes, but hibernation starts immediately | [Spot interruptions](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-instance-termination-notices.html) |

Dan's notes also named **MetalSmith**. A search on 2026-09-06 found only the OpenStack bare-metal provisioning tool and the Node static-site generator, neither a compute vendor. It is left off the slide until the product can be identified; add it to the ecosystem diagram and this table once confirmed.

Prices and limits change. Recheck before quoting any of them in Q&A.

## Other sources

- [AWS retry with backoff](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/retry-backoff.html): supports slide 9.
- [Anthropic, Building effective agents](https://www.anthropic.com/engineering/building-effective-agents): parallelization and evaluator vocabulary for slides 12 and 13; it does not evaluate persona councils.
- Knight and Leveson (1986), [An Experimental Evaluation of the Assumption of Independence in Multiversion Programming](https://doi.org/10.1109/TSE.1986.6312924), IEEE Transactions on Software Engineering SE-12(1), 96 to 109. Twenty-seven versions from one specification, one million tests, coincident failures well above the independence prediction. Cited on slide 12 to be set aside: it is a result about N-version redundancy as a correctness strategy, and the slide explicitly does not claim that. The Council of Guards argument (slide 13) is about characterizing the models you rely on, diffing behavior across model versions, synthesizing better output, and using cheap parallel judges (low output-token ratio) to measure disagreement, not to vote on truth.
- No universal 1/100 or 1/1000 model-price ratio is claimed. Candidate sampling exposes possible failures; it supplies no measured detection rate. Price every stage before comparing accepted outcomes.
- Amdahl (1967), Validity of the single processor approach to achieving large scale computing capabilities, AFIPS Conference Proceedings 30, 483 to 485. Cited on slide 11. The arithmetic on the slide is the standard formula: with a serial tenth, ten workers give 5.26x and a hundred give 9.17x. Checkable on stage.

## Cuts

| Idea from the notes | Treatment |
| --- | --- |
| Notification presence, quiet hours, channel policy | Cut to one outbox paragraph on slide 8 |
| "Fifty sandboxes do not make the provider render faster" | Kept as one line on slide 4 |
| Ryan Dahl durable-object release | Omitted; project identity not established |
| Smarter model as a semaphore | Replaced with shared admission enforced outside the model |
| Hundreds of candidate outputs | Bounded fan-out at named graph nodes with an env var to set it to one; the review budget is declared |

## Cut from the monkeys-and-guards slide for time (2026-09-06; now slides 12 and 13)

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

## Council arithmetic checked 2026-09-08

[Anthropic Haiku 4.5 pricing](https://www.anthropic.com/claude/haiku) lists $1 per million input tokens and $5 per million output tokens. The token counts below are fixtures, using base uncached rates; there are no tool, reasoning, infrastructure or human-review charges in this token subtotal.

- A 1,000-input/50-output judge costs $0.00125; $0.001 input is 80%.
- Draft: (300 × $1 + 1,500 × $5) / 1,000,000 = $0.0078.
- Five verdicts: 5 × (1,800 × $1 + 50 × $5) / 1,000,000 = $0.01025, or 131.41% of that draft.
- Three drafts plus their fifteen verdicts total $0.05415 versus $0.0078 for one draft alone. These are unequal review policies, not an accepted-outcome comparison. Add retries, synthesis, compute and measured human review before choosing.
- The actual Council of Guards uses five different models. The calculation holds rates constant to expose token volume; it is not a quote for that multi-model council. Sum each selected model's actual price and cache eligibility. Do not assume one cache can be shared across different models.

[Cloudflare Dynamic Workflows](https://blog.cloudflare.com/dynamic-workflows/) was published 1 May 2026 and describes durable workflow code that varies by tenant or request. [Fly's agent sandbox page](https://fly.io/learn/agent-sandbox/) still describes sub-second creation as a stated goal. [Depot remote-agent documentation](https://depot.dev/docs/agents/overview) lists $0.01/minute. None establishes that all listed services have the same startup latency, isolation or billing semantics. Depot's shared-kernel claim in the audit is not adopted without a primary isolation source.

## Delivery decisions after audit

Slide 9 remains a short scheduler-policy bridge: the useful boundary is that pressure may change while the granted ceiling does not. Adaptive owns recovery-policy tuning; this slide does not teach an agent repair loop. Its diagram is guided explanation, not an additional discussion. No deployed scheduler or validated delivery recording is claimed. The hand-authored deck remains not yet rebuilt; this correction does not fabricate one.
