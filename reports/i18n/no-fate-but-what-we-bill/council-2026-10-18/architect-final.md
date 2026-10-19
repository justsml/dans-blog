# Architect integrated re-review

Reviewed 2026-10-18. English MDX and all four revised SVGs inspected. No tracked files edited in this round.

All A1–A7 findings are resolved. Verified the final `defense-layers.svg:9,42` corrections to “familiar failure modes” and “familiar components”; these now agree with the bounded thesis at `index.mdx:35,77`. No critical or high findings remain.

## Closure evidence

- **A1:** `index.mdx:39-55` defines human-baseline task time at 50% reliability and disclaims elapsed agent runtime. `capability-curves.svg:3,20-26,31-37` consistently separates task difficulty and hypothetical work budgets.
- **A2:** `index.mdx:62-84` attributes the campaign report, distinguishes target count from concurrency, retains human decisions and model failures, and replaces the capability equation with capacity arithmetic. `capability-curves.svg:10,23-25,32-37` removes dated forecasts and measured breadth doubling claims. The defense figure now consistently describes familiar failure modes/components.
- **A3:** `index.mdx:88-114` separates historical cost scenarios, shifted inference charges and remaining controls/costs; `who-pays.svg:15-18,26-28,42-47,56-68` matches those boundaries.
- **A4:** `index.mdx:123-146` explicitly labels toy probabilities and correlated failure/detection limitations; `swarm-odds.svg:10,34-38` removes invented swarm-region data and zero-cost/human-only triage claims.
- **A5:** `index.mdx:153-177` distinguishes model calls from durable system state, identifies the authority boundary, and labels three persistence scenarios as hypotheses. Memory research supports the bounded general mechanism.
- **A6:** `index.mdx:190-203` explains credential limits and deterministic tool authorization; `defense-layers.svg:14-24` replaces prevention guarantees with risk reduction.
- **A7:** `index.mdx:205-218` monitors both changes and runtime/spend, distinguishes alerts from caps, and contains access/workers before evidence-preserving cleanup. `defense-layers.svg:29-40` follows the same approach.

## Newly added source checks

[METR's measurement page](https://metr.org/time-horizons/) confirms September 8, 2026 last update, discontinued active updating, human-baseline definition and the above-sixteen-hour measurement caveat. [Microsoft's memory article](https://www.microsoft.com/en-us/security/blog/2026/06/22/guarding-ai-memory/) supports durable memory influence and external enforcement; the revised article does not misrepresent its hypothetical illustration as a specific incident. [Sysdig's June 2026 report](https://www.sysdig.com/blog/llmjacking-evolved-attackers-are-using-stolen-ai-compute-to-build-offensive-agentic-tools) explicitly describes private practice targets and unresolved eventual intent, both retained in the revised post.

English is explicitly published via `draft: false`; retaining stale translations as drafts is consistent with publishing only reviewed content. This review establishes editorial/security-argument readiness, not build, routing, browser or deployment validation.
