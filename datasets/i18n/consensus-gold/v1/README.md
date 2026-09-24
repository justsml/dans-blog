# Translation consensus gold v1

5 frozen reference cases across 4 source documents.

`cases.jsonl` contains exact source, starting translation and negotiated reference text with SHA-256 hashes, paths, consensus/audit lineage and confidence. `benchmark-fixtures.jsonl` exposes only frozen source and canonical target to the eval harness. `selection.jsonl` records sampling rationale.

Each admitted translation passed two-editor approval, structural/MDX checks, and separate blind frontier reviews. The canonical quality records use severity 1-5 (3-5 blocks admission); legacy 0-4 receipts are mapped by adding one without altering raw evidence. Authorial edge is preserved; inherited English defects are recorded in the run ledger. Change source bytes only by creating a new case/version.
