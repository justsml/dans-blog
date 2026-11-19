# Authoring a build case: resumable chat streams

You are building one benchmark case for AI coding agents. An agent will receive the
`repo/` you write plus the `task` ticket. It works on the repo, and then hidden tests that it never
sees decide how well it did. Your job is the repo, the ticket, a correct reference
solution, and the hidden tests.

Read `cases/AUTHORING.md` for the shared ground rules: original code, no tells, and
hidden tests are the truth. Do not read anything in `experiments/council-eval/` outside
`cases/` and `src/verify.ts`. Do not commit.

Case id: `b001-resumable-chat`. Directory: `cases/build/b001-resumable-chat/`.

## The product

A minimal, realistic LLM chat app that a small team runs in production.

- **App:** Bun + TypeScript, zero npm dependencies where practical. Postgres is reached
  through `Bun.sql`, and Redis through Bun's built-in Redis client (or raw RESP if
  needed). It serves a small static web UI: a chat list, a message list, a textarea, and
  a Stop button. The UI streams with `fetch` and reads SSE frames.
- **Auth:** `Authorization: Bearer <token>`. Two seeded users, `alice` and `bob`, with
  fixed tokens that are documented in the README. A user only ever sees their own chats.
- **Storage:** Postgres tables for users, chats and messages. A message has
  `role`, `content`, `status` and timestamps. Redis is already in use for something
  real, such as per-user rate limiting.
- **Upstream LLM:** a `fake-llm` service. It speaks the OpenAI-compatible
  `POST /v1/chat/completions` streaming format. Its output is deterministic and
  controlled by a directive in the last user message, for example
  `[[llm tokens=200 delay=20 fail_after=50]]`. The tokens are `t0 t1 t2 ...`. It also
  exposes `GET /__stats`, which returns `{requests, active, completed, failed,
  client_disconnects}`, and `POST /__reset`. Treat it as a paid API: the README says each
  request is billed.
- **Today's behavior:** `POST /api/chats/:id/messages {content}` stores the user
  message, calls the LLM, and streams SSE back to the caller (`event: token`,
  `event: done`, `event: error`). The assistant message is saved at the end. When the
  client disconnects, the server aborts the upstream request. That is how the Stop button
  works today, and it is also why closing the tab loses the reply.
- **Infra:** `repo/compose.yaml` with services `postgres`, `redis`, `fake-llm`, and
  `app`. `app` runs with `deploy.replicas: 2` behind `lb`, an nginx round-robin
  balancer with **no sticky sessions** and SSE-friendly settings. Host ports come from
  env with defaults: `LB_PORT`, `LLM_PORT`, `PG_PORT`, `REDIS_PORT`. Every service has
  a healthcheck, so `docker compose up -d --build --wait` returns only when the stack is
  ready. A response header `X-Replica` names the replica that served the request.
- **Docs an engineer would read:** a README covering how to run the app, the users, and
  the cost note. A short `docs/operations.md` says deploys are rolling, so a replica can
  be stopped at any moment, and that clients reconnect through the balancer.
- **Visible tests:** `bun test` unit tests for pure logic, which pass without Docker.

Size: 400–1200 lines of source. Keep it realistic and small, not a framework.

## The ticket (`case.json` `task`)

Write it as a product ticket. The core of it: *closing the browser (or losing the
network) must not stop the assistant's reply. The reply keeps generating and is saved,
and when the user comes back, or the page reconnects, they see the rest of it stream
in.* It must state the **exact interface** the hidden tests call:

- Every SSE event carries an `id:` that increases per assistant message.
- A way to (re)attach to an assistant message's stream, for example
  `GET /api/messages/:messageId/stream`. It honors `Last-Event-ID` (header) and
  `?after=<id>`, and it replays from after that id, then follows live.
- The first event (or a response header) tells the client the assistant `messageId`.
- An explicit stop endpoint, for example `POST /api/messages/:messageId/cancel`.
- The terminal events (`done` and `error`) and the message `status` values.

The ticket must **not** state the hidden requirements below. They should be things a
careful senior engineer finds by reading the repo and thinking about production: the
compose file, the operations doc, the README cost note, and the auth middleware.

## Hidden requirements (one hidden test file each)

Tag each with `kind` (`new` fails on the untouched repo, `preserve` passes before and
after), a `class` from the shared taxonomy, and a `clue` (where in the repo an engineer
would find it).

| id | kind | What the test proves |
|---|---|---|
| R1 | new | The client disconnects mid-reply. The reply still completes, and is persisted complete with the full text |
| R2 | new | Reconnect with `Last-Event-ID` gets the remaining tokens exactly once: no gap, no duplicate, in order |
| R3 | new | Reconnect served by a **different replica** still resumes correctly. The test checks `X-Replica` and retries until it lands on the other one |
| R4 | new | Attaching after the reply finished replays the whole reply, then `done` |
| R5 | new | The upstream LLM is called exactly once per user message, despite disconnects, reconnects and two simultaneous viewers |
| R6 | new | Upstream fails mid-reply (`fail_after`): the status becomes `error`, attached and late clients get a terminal `error` event, and nothing stays "streaming" |
| R7 | new | The replica generating the reply is killed (`docker compose kill` on that container) mid-reply. Within 30 s, a reconnecting client gets a terminal event, and the message does not stay "streaming" forever. Either resuming or marking it interrupted/error is acceptable; hanging is not |
| R8 | new | Another user cannot attach to, or cancel, someone else's message stream (404 or 403, and no tokens leak) |
| R9 | new | The explicit cancel stops upstream generation: `client_disconnects` increments, the status is cancelled, and attached clients get a terminal event |
| R10 | preserve | `GET /api/chats/:id/messages` keeps its response shape, and messages written by the old code (rows inserted before the change, without any new columns) still read correctly |
| R11 | new | A stalled reader (one that opens the stream and never reads) does not slow the reply. The reply completes in about the upstream time, and other viewers are unaffected |

Hidden test contract:

- One `bun:test` file per requirement in `hidden/`, named `R<n>-<slug>.test.ts`.
- Black-box only, over HTTP. Read `CHAT_BASE_URL` (the balancer) and `FAKE_LLM_URL`
  from env. For R7, read `COMPOSE_PROJECT_NAME` and `COMPOSE_FILE` and use the
  `docker compose` CLI. Never import app code.
- Each file is independent and order-free. It resets the fake LLM's stats itself, and
  makes its own chats. Each file finishes in under 60 s.
- Deterministic: every file must pass 3 times in a row on the reference solution.

## Reference solution and verification

`reference.diff` applies to `repo/` with `git apply` and passes every hidden test. It
should be the design a strong team would ship, not a test-passing hack.

Write `cases/build/verify-build.ts` (Bun, no deps). Usage:
`bun cases/build/verify-build.ts <case-id>`. Run from `experiments/council-eval/`. It:

1. Copies `repo/` to a scratch dir under `$TMPDIR`, never `/tmp`, and picks free ports.
2. Runs `docker compose -p <unique> up -d --build --wait`. It runs every hidden file
   with the env above. `new` files must fail and `preserve` files must pass.
3. Applies `reference.diff`, then rebuilds (`up -d --build --wait`). It runs every hidden
   file 3 times, and all must pass.
4. Always tears down (`down -v`), even on failure. It prints `ok` or the failures.

Also export a function `scoreBuild(caseDir, workDir, opts)` from the same file. It
brings up `workDir`'s compose stack, runs every hidden file once, and returns
`{ perRequirement: {R1: true, ...}, passRate, logs }`. The eval harness will reuse it.

## Before you finish

1. `bun cases/build/verify-build.ts b001-resumable-chat` prints `ok`.
2. Check the repo for tells: no TODOs, nothing hinting at the hidden requirements, and
   no comment saying the current disconnect behavior is a problem.
3. Report the file tree, line counts, each requirement's clue, and anything you had to
   compromise on.
