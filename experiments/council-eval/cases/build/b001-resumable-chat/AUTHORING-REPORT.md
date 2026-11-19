# b001-resumable-chat authoring report

## Requirement inventory

| ID | Kind | Class | Clue |
|---|---|---|---|
| R1 | new | state | src/replies.ts and public/index.html |
| R2 | new | state | public/index.html fetch SSE reader |
| R3 | new | state | compose.yaml app deploy.replicas and nginx.conf upstream |
| R4 | new | state | Postgres messages table in src/db.ts |
| R5 | new | cost | README.md provider billing note |
| R6 | new | failure-mode | src/fake-llm.ts provider error frames |
| R7 | new | failure-mode | docs/operations.md rolling deployment policy |
| R8 | new | security | src/db.ts ownership queries and server.ts authentication |
| R9 | new | state | public/index.html Stop button and provider disconnect counters |
| R10 | preserve | data-migration | src/db.ts schema defaults and message serializer |
| R11 | new | performance | src/replies.ts response stream and docs/operations.md reconnects |

## Implementation decisions and compromises

- R7 uses `docker compose kill app`, which kills both replicas, then starts the app service again. Compose has no per-replica selector for `kill`. This covers recovery after loss of the generating replica and a broader service outage; it does not isolate loss of only one replica while the other stays continuously running.
- R10 uses `docker compose exec postgres psql` only to arrange a historical row with the original column set. All compatibility assertions use HTTP; this is the one database setup operation beyond the otherwise HTTP-only tests.
- The reference marks interrupted generations as `error` after a four-second stale-heartbeat threshold rather than starting another billed request.
- Stream events remain in Postgres for the lifetime of the message. Retention/compaction and multi-day session expiry are outside this small case.
- R11 uses an unread fetch response and a generous 10× upstream-time allowance (18 seconds for 1,800 tokens at 1 ms). It checks noninterference at this workload, not arbitrary socket-buffer saturation.
- The fake provider bounds directive values at 10,000. It is deterministic, local, and has no paid model dependencies.
- Docker image tags specify release versions rather than immutable digests. Verification requires Docker image access or a populated local cache.

## File tree and line counts

```text
build/
├── verify-build.ts  (227 lines)
└── b001-resumable-chat/
    verification.log  (45 lines)
    case.json  (96 lines)
    hidden/R1-disconnect.test.ts  (27 lines)
    hidden/R10-legacy.test.ts  (60 lines)
    hidden/R11-slow-reader.test.ts  (36 lines)
    hidden/R2-cursor.test.ts  (33 lines)
    hidden/R3-replicas.test.ts  (38 lines)
    hidden/R4-late.test.ts  (25 lines)
    hidden/R5-billing.test.ts  (37 lines)
    hidden/R6-failure.test.ts  (34 lines)
    hidden/R7-replica-loss.test.ts  (47 lines)
    hidden/R8-ownership.test.ts  (38 lines)
    hidden/R9-cancel.test.ts  (34 lines)
    hidden/http.ts  (156 lines)
    reference.diff  (460 lines)
    repo/Dockerfile  (4 lines)
    repo/README.md  (23 lines)
    repo/compose.yaml  (53 lines)
    repo/docs/operations.md  (9 lines)
    repo/nginx.conf  (12 lines)
    repo/package.json  (1 lines)
    repo/public/index.html  (120 lines)
    repo/src/db.ts  (40 lines)
    repo/src/fake-llm.ts  (80 lines)
    repo/src/logic.test.ts  (26 lines)
    repo/src/logic.ts  (42 lines)
    repo/src/replies.ts  (51 lines)
    repo/src/server.ts  (73 lines)
```

Source total: 406 lines (src/*.ts excluding logic.test.ts, plus public/index.html). Visible tests: 26 lines. No package dependencies.

## Verification

`bun cases/build/verify-build.ts b001-resumable-chat` printed `ok b001-resumable-chat (152.6 s)` on 2026-11-18. This measured run includes baseline startup, baseline polarity checks, reference patch application and rebuild, every hidden file passing three times, and teardown. Baseline: R1–R9 and R11 fail; R10 passes. Both visible-test runs pass (2/2 each).

`verification.log` retains all 44 hidden-test outcomes and the final result. Docker inspection after verification returned no containers with the b001- prefix. No branch switches or commits were made.
