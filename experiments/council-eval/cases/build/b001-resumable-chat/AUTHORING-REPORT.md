# b001-resumable-chat authoring report

## Requirement inventory

| ID | Kind | Class | Clue | Shipping rationale |
|---|---|---|---|---|
| R1 | new | state | src/replies.ts; public/index.html | Browser disconnect must not abandon the reply. |
| R2 | new | state | public/index.html SSE reader | Reconnection must not duplicate or omit text. |
| R3 | new | state | compose.yaml replicas; nginx.conf | Reconnects are routed without session affinity. |
| R4 | new | state | src/db.ts messages table | Returning users need the full persisted reply. |
| R5 | new | cost | README.md provider billing | Viewing cannot trigger another paid generation. |
| R6 | new | failure-mode | src/fake-llm.ts error frames | Provider failures must terminate and persist. |
| R7 | new | failure-mode | docs/operations.md rolling deploy policy | A lost producer cannot leave a permanent streaming record. |
| R8 | new | security | src/db.ts ownership; server.ts authentication | Tokens and cancellation are private to the owner. |
| R9 | new | state | public/index.html Stop; provider counters | Explicit Stop must end billed work and notify viewers. |
| R10 | preserve | data-migration | src/db.ts defaults and serializer | Historical records and list clients must survive deployment. |
| R11 | new | performance | src/replies.ts streams; operations reconnects | Slow readers cannot hold generation hostage. |
| R12 | new | state | docs/operations.md support dashboard history contract | Delivered progress must already be durable. History reads during streaming must contain the observed prefix, and cancellation must retain exactly the event text. |
| R13 | new | state | docs/operations.md terminal lifecycle and Stop contract | Multiple tabs and retries can race Stop. There must be one terminal event, no post-terminal writes or timestamp changes, and no user-message lifecycle mutation. |
| R14 | new | edge-case | docs/operations.md cursor contract | Corrupt client state needs a bounded client error; acknowledged terminal cursors must close without a reconnect loop, replay duplication, mutation or rebilling. |
| R15 | new | failure-mode | docs/operations.md provider deploy behavior; README.md eof_after diagnostic | A clean TCP EOF does not prove a complete answer. Zero-token and partial EOF must persist error and exact partial text, without retrying paid work. |
| R16 | new | edge-case | docs/operations.md international replies; README.md unicode diagnostic | International text must survive byte-fragmented transport, persistence and replay without replacement characters, normalization or escaped line breaks. |

## Added discoverable context

The fixture's operations guide now describes the existing support dashboard reading
history during generation, immutable terminal records, idempotent Stop, assistant-only
generation lifecycle, cursor validation and terminal EOF behavior, and provider
transport/international text behavior. These are normal service contracts rather
than test names or implementation prescriptions. The ticket and its interface are
unchanged. The README documents the fake provider's additive `eof_after` and
`unicode=1` diagnostic options. Original directive defaults and behavior remain.

## Reference design and compromises

- Postgres holds bounded-page event replay and transactionally serialized token,
  content and terminal writes. Generation outlives readers and has a heartbeat.
- Interrupted producers end in error after four seconds rather than making another
  billed request. R7 kills only the container named by the response's X-Replica;
  the surviving replica continues serving. The TCP Postgres healthcheck and the
  verifier's optional host setting are preserved unchanged.
- Cursor comparisons in the reference use Postgres bigint casts to accommodate
  the documented safe-integer cursor range even though stored event IDs are integer.
- The reference additionally rejects stream/cancel on user messages with 409.
  Repeated Stop on terminal assistant records returns the existing status without
  changing timestamps or event history.
- New tests are independent black-box HTTP tests, each with a 55-second deadline.
  They use fresh chats and reset provider counters after previous active work ends.
  No new test uses Docker or database access. R10 retains its existing Docker/psql
  setup of a historical row, with all compatibility assertions over HTTP.
- Unicode wire chunks use seven-byte slices separated by one millisecond. Networks
  may coalesce reads, so this exercises fragmentation rather than promising that
  every receiver sees the exact same chunk boundaries. Values include CJK, emoji,
  combining marks and literal newlines. Replay also crosses a 64-event page boundary.
- R11 remains a generous noninterference test, not proof of arbitrary socket-buffer
  saturation. Events are retained for the message lifetime; compaction, multi-day
  expiry and unbounded output remain outside this small fixture.
- No contender outputs or prohibited benchmark source/config/prompt/run paths were
  read. Work is based on the ticket, fixture and authoring guidance. No branches
  were switched and no commits were created. Local Docker/fake-provider work has
  no model API cost; reporting is direct from this implementation sub-agent.

## Verification

Three consecutive invocations of `bun cases/build/verify-build.ts b001-resumable-chat`
from `experiments/council-eval/` printed `ok` on 2026-11-18:

| Invocation | Wall time | Baseline polarity | Reference |
|---|---:|---|---|
| 1 | 162.4 s | R1–R9, R11–R16 fail; R10 passes | All 16 pass three rounds |
| 2 | 174.7 s | R1–R9, R11–R16 fail; R10 passes | All 16 pass three rounds |
| 3 | 160.7 s | R1–R9, R11–R16 fail; R10 passes | All 16 pass three rounds |

Visible tests pass in both stages of each invocation. This provides nine passing
reference rounds per requirement, including all five additions. Each new test has
a 55-second deadline; in the initial diagnostic run the new reference tests took
approximately 0.11–1.91 seconds each. `verification.log` retains all 192 hidden
outcomes and the three final success lines. The implementation did not change
between these three acceptance runs.

An earlier diagnostic invocation passed all hidden reference rounds but failed a
visible assertion because additive provider settings changed the return shape of
`directive()`. Parsing those settings inside the fake provider restored the
existing interface; visible tests were not changed. An initial sandbox-only
attempt could not reserve a localhost port; accepted verification used host
Docker/localhost access. All Compose project names began with `b001-`, and the
verifier tore down each stack and removed its own scratch in finally blocks.
