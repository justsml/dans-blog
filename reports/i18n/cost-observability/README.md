# Verified Langfuse cost coverage

Verified 2026-09-24 against the configured `dans-blog` Langfuse project.

The official AI SDK 7 integration is registered once through the shared module.
Its existing generation spans carry exact OpenRouter charges plus separately
reported upstream provider cost. Native CLI receipts carry reported or dated
API-equivalent estimates, with distinct cache and reasoning token buckets.

Two real generation/streaming canaries were run (four tiny calls in total).
The final canary has exactly two Langfuse generations for two responses. Each
reports gateway cost $0 and upstream inference cost $0.0000035, matching the
provider receipts. The two figures are retained separately.

[Final canary trace](http://dev03.local:3344/project/cmud8ag3e0001si073dk7vrvu/traces/d965b652f773cf2a99be21a5b477e8b5)

Existing negotiation observations were updated in place, with no added generation
spans. Of 51 attempts, 48 have costs: 23 CLI-reported estimates and 25 calculated
API-equivalent estimates. Three interrupted/rejected calls lack sufficient usage
receipts and remain unknown. All 25 generations in the completed negotiation have
costs; their combined reported/estimated amount is $9.622284899996. This is not a
subscription invoice allocation.

[Completed negotiation](http://dev03.local:3344/project/cmud8ag3e0001si073dk7vrvu/traces/f5c010be09e96614ff12f377ec472186)

- `provider-results.jsonl`: real provider usage/cost responses.
- `canary.jsonl`, `verification.jsonl`: trace IDs and read-back checks.
- `reconciliation.jsonl`: in-place update receipts.
- `coverage.jsonl`: read-back coverage by cost basis; unknown totals are null.

Offline tests cover generation, streaming, no duplicate cost-bearing spans,
reported zero, unknown costs, disjoint token buckets, partial CLI cost receipts,
OpenCode multi-step aggregation, failure traces and the verified Sol/Astra
long-context tier. The native CLI parser preserves unknown costs for failures.
