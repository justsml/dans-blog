# Evidence and editorial boundaries: parallelization

## Primary documentation checked 2026-09-05

- [AWS retry with backoff pattern](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/retry-backoff.html): bounded retries for transient failures, overload risk and idempotency considerations. Supports the transport-failure discussion; the talk's combined controller is a proposed design.

- [Cloudflare Workflows overview](https://developers.cloudflare.com/workflows/): persisted multi-step execution, retry support and event waits. Supports choosing durable orchestration for long waits; does not imply every external operation is idempotent.
- [Durable Object lifecycle](https://developers.cloudflare.com/durable-objects/concepts/durable-object-lifecycle/): lifecycle transitions can discard in-memory state. Persist application recovery state; do not promise that an in-flight JavaScript promise survives hibernation.
- [Anthropic, Building effective agents](https://www.anthropic.com/engineering/building-effective-agents): distinguishes workflows and agents, and describes parallelization and evaluator patterns. Supports the pattern vocabulary; does not establish a universal advantage for three personas or any particular judge.
- [AWS S3 presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html): presigned URLs grant time-limited access according to their signing authority and are bearer credentials. They are not opaque references that can safely be exposed to a planner while claiming it has no data access.

The proposed contracts, accounting arithmetic, failure fixtures and rollout decisions are design analysis, not results from these sources. Recheck platform limits and prices before implementation; this talk makes no current model, GPU or sandbox price claim.

## Dan's supplied firsthand material

The September 5 dictation reports a client using local models for sensitive data analysis and a frontier orchestrator passing access references, plus Dan's practice of comparing two to five model or persona attempts before a more demanding review. These are speaker recollections, not independently verified case studies. No client name, hardware model, measured savings, success rate or deployment certification is supplied.

For the local-processing story, the spoken description appears to include signed URLs passing through orchestration. Do not retroactively claim that deployment kept all bearer credentials outside the frontier model. The stronger dispatcher boundary in the handout is a proposed design, clearly separate from the recollection. The accumulating anomaly queue can itself contain sensitive data and needs retention limits. Keep it in workshop discussion unless implementation details and permission to disclose are available.

For the council-of-experts workflow, say that contrasting approaches can expose useful tradeoffs. Do not claim that different prompts produce statistically independent failures, that a cheaper model won a particular contest, or that the judge proves correctness without recorded evidence.

## Cuts and corrections

| Dictated idea | Editorial treatment |
| --- | --- |
| Adaptive systems acronym joke | Omitted from the main script; title follows the preferred “Adaptive, agentic apps” |
| OCR maximization and paperclips | Kept as a concrete incomplete-objective example; distinguish proxy gaming from honest but costly optimization |
| ZIP extension | Corrected to ZIP+4; preserve leading zeros and country meaning |
| Debouncing failed API calls | Distinguish debouncing, retry backoff and circuit breaking |
| Different IPs for blocked APIs | Restrict example to authorized regional recovery; access denial and account quota are separate failure classes |
| Fifty sandboxes and provider catalog | Cut shopping list; retain execution versus waiting and approved placement |
| Ryan Dahl open-source durable-object release | Omitted because the project identity was not established |
| Specific model generations and cheap/instant claims | Removed unsupported version and latency assertions |
| Wi-Fi scanning, batteries and solar | Parked for a separate defensive-automation talk |
| Route optimization and consultants | Retain only as a workload classification example; no claim an LLM replaces optimization expertise |
| Smarter model as a semaphore | Replace with shared admission enforced outside the model |
| Hundreds of candidate outputs | Start with two or three bounded attempts and a declared review budget |
| Synthesize the best parts | Keep, but require revalidation of the combined candidate |

## Portfolio boundary

Adaptive owns unfamiliar operational failures and repair authority. Parallelization owns aggregate work accounting, long-running job recovery and independent solution attempts. Both end with a tested reusable procedure. The broader scheduled improvement loop remains in [Automating improvement from failure](../failure-improvement/packet.md).

## Before presenting

Rehearse timings including audience participation. Use the synthetic examples as written if there is no verified personal story. For any added client story, confirm disclosure permission and exact architecture; for any claimed improvement, bring the baseline, workload slice, failure cases and total costs. The talk is complete without adding private anecdotes.
