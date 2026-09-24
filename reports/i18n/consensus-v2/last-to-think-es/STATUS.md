# Canary status

The v2 canary has not reached consensus and has not replaced any golden case.
All four initial reviews and all sixteen bounded ballot batches completed.
An earlier unbounded ballot attempt timed out for two models and returned
missing evidence IDs for the other two; those receipts remain preserved.

The first revision was rejected by Codex because its input was 9,857,577
characters, above the 1,048,576-character limit. The coordinator had copied
all issue ballots into each individual issue decision. The implementation now
retains only that issue's ballots, with a regression test. The failed call stays
at `r1-revision`; the corrected request uses `r1-revision-v2`.

Langfuse was absent from the original native CLI transport. The transport and
consensus runner now include tracing, explicit flush, and trace ID receipts.
Historical backfill and live ingestion verification are pending explicit
approval requested after automatic approval review blocked exporting the full
payload to the configured Langfuse endpoint. No upload has been claimed.
