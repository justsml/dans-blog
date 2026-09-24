# Consensus-backed Spanish translation

The canary completed in two rounds with eight fragment edits. All four final independent reviews mark the candidate ready. Deterministic validation passes, including protected content, links and MDX.

The panel adjudicated 94 tracked issues: 77 resolved and 17 explicitly downgraded. No high or critical issues remain. Four issue records retain severity 3, and their arguments remain visible. Severity is 1–5; the configured blocking threshold is 4.

| Reviewer | Mean score / 5 | Mean reported confidence |
| --- | ---: | ---: |
| openai/gpt-6-sol | 4.1 | 0.90 |
| anthropic/claude-opus-5.5 | 4.2 | 0.78 |
| openai/gpt-6-astra | 4.6 | 0.96 |
| anthropic/claude-fable-5.1 | 4.4 | 0.86 |

The edited passages address literal translations of “teeter,” “receipts,” and “hand-wringing”; clarify the learning/development distinction; improve local phrasing and title capitalization; and restore the source publication date. Exact edits, reasons, references and votes are in the JSONL event streams.

## Verified telemetry

- [Completed live trace](http://dev03.local:3344/project/cmud8ag3e0001si073dk7vrvu/traces/f5c010be09e96614ff12f377ec472186): HTTP 200, 360 observations and 25 native generations. Cached earlier calls are recorded as cache events.
- [Historical backfill](http://dev03.local:3344/project/cmud8ag3e0001si073dk7vrvu/traces/da763b48a41db22b0e17d73058e0b8fc): HTTP 200, 280 observations and 25 call attempts. Import duration is not inference latency.

## Artifacts

- `candidate.mdx`: final text.
- `result.jsonl`: final reviews and full issue decisions.
- `summary.jsonl`: compact metrics and frozen input/output hashes.
- `revised-validation.jsonl`: deterministic validation for the final hash.
- `snapshot.json`: immutable English source and original translation.
- `events-*.jsonl` and `calls/`: complete attempts, failures, revisions and receipts.

Earlier failures are preserved: unbounded ballots, missing evidence IDs and quadratic prompt duplication. Bounded ballots, mandatory ballot evidence, compact issue histories and automatic revision correction resolved them. V1 golden dataset files remain unchanged; this is the separate completed v2 consensus artifact.
