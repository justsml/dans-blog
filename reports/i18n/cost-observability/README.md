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

## Translation quality scores

The historical generation import stored quality metrics in output payloads but did
not create Langfuse Score records. The score projection now attaches the saved
metrics to those existing traces: 7,111 scorer records yield 55,875 scores. It
preserves the original numeric scales (quality 0–100, confidence 0–1), categorical
recommendations, source timestamps, hashes, and trace/observation linkage. This
imports prior evidence; it does not run a judge or create generation/cost records.

The production scoring command, core scorer used by consensus/benchmark runs,
and candidate judge now publish parsed scores under `i18n.*`. A non-billed parent
span groups scores and the existing SDK generation. Durable CLI score logs include
trace IDs. Export failures warn without discarding scorer output.

```sh
bun run i18n:langfuse:backfill-scores          # preview (reads Langfuse)
bun run i18n:langfuse:backfill-scores --apply  # publish and checkpoint
```

Credentials must resolve to the `dans-blog` project. Shell environment values
override `.env`; clear inherited Langfuse variables when switching projects.
Historical receipt links are checked against destination traces. Missing links
are recovered only from a unique exact model/slug/locale and start-time match;
unmatched records are reported, not invented. Stable score IDs and a project
checkpoint make retries resumable. Keep the checkpoint with the source evidence.

- `score-projection-summary.json`: initial accepted import.
- `score-native-links.json`: ten recovered native trace links.
- `score-projection-<projectId>.json`: accepted source hashes and score counts.
- `score-projection-verification.json`: read-back comparison against source values.
- `score-projection-last-run.json`: subsequent no-op/resume result, when present.

The read-back audit found all 55,875 unique score IDs with zero missing scores or
value/link mismatches. The trace count remained 10,727. The API aggregate score
count differed from the unique results; verification uses the actual IDs. Rerun
with `bun src/scripts/i18n/langfuse-verify-scores.ts` (read-only remote audit).

Offline projection and local HTTP integration tests exercise score scales, stable
IDs, missing metrics, partial ingestion failures, active trace linkage, and flush.
No new model calls are required to backfill or test this wiring.
