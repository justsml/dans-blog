# Authoring benchmark cases

You are building cases for a benchmark of AI code review and implementation planning.
Read this file and the two exemplar cases, then build your assigned cases. Do not read
anything else in `experiments/council-eval/` outside `cases/` and `src/verify.ts`.

Exemplars:

- Review: `cases/review/r001-partial-refunds/`
- Plan: `cases/plan/p001-discount-codes/`

Every case must pass `bun src/verify.ts --cases <id>` (run from `experiments/council-eval/`).
A case that does not pass is not done. Do not edit `src/` or the exemplars.

## Ground rules for every case

- **Original code.** A small TypeScript project for Bun with zero dependencies, written
  fresh for this case. 80–400 lines of source, plus a visible test file. Realistic
  domain code a team would actually own, not a puzzle.
- **Visible tests pass.** `bun test` passes in the repo the agent sees.
- **No tells.** No comment, name, test, or description that hints at a planted
  problem: no "TODO", "FIXME", "careful", "bug", "note: this is wrong". The PR
  description reads like a normal PR author who believes the change is correct.
  `verify.ts` rejects some tells mechanically; avoid all of them.
- **Hidden tests are the truth.** Each hidden test is one file, uses `bun:test`,
  imports from `../src/...`, and tests behavior, not text.

## Review cases (`cases/review/<id>/`)

```
case.json      id, family "review", author, description, defects[]
base/          the repo before the PR (visible tests pass)
pr.diff        unified diff from base/ to the PR head, applies with `git apply`
fixes/<d>.diff one per defect, applies to the PR head, fixes only that defect
hidden/*.test.ts
```

Make `base/` a git repo in a scratch directory, commit, make the PR change, commit,
and write `git diff HEAD~1 HEAD > pr.diff`. Copy `base/` out without `.git`.
Write each fix as a diff against the PR head. Fixes must apply on their own and
together, so keep each defect at least 7 lines from the others or in a different
hunk.

**The PR must be a plausible feature or refactor** of 30–150 changed lines, where the
defects sit inside otherwise-good work. A reviewer should need to read code outside
the diff for at least one defect per case (a caller, an invariant, a config, another
module's contract).

**Defects.** 1–3 per seeded case. Each defect entry:

| Field | Meaning |
| --- | --- |
| `id` | `d1`, `d2`, ... |
| `class` | one of `edge-case`, `state`, `failure-mode`, `security`, `performance`, `cost`, `data-migration` |
| `severity` | `critical`, `high`, `medium`, `low`, judged as a staff engineer would |
| `file`, `lines` | where the defect lives in the PR head (1-based, inclusive) |
| `mechanism` | one or two sentences: what goes wrong, under what input, and why |
| `test` | hidden test file that fails on the PR head and passes after `fixes/<id>.diff` |

Class guidance, so defects are testable:

- `performance`: an operation that turns quadratic, unbounded, or N+1 on realistic
  input. The hidden test asserts a bound (call count on an injected dependency, or a
  timing bound with 10× headroom), never a flaky micro-timing.
- `cost`: work that multiplies paid calls or storage: missing cache, retry without
  limit, fetching everything to use one row. Test with a counting fake.
- `failure-mode`: partial failure, retries, timeouts, error swallowing, missing
  rollback. Test with a fake that throws.
- `state`: lifecycle and status transitions, stale caches, ordering, concurrency
  between async calls.
- `data-migration`: persisted shape changes that break existing records or readers.

**Clean controls.** A case with `"defects": []` and a `passingTests` list: a real PR
with no defects, plus hidden tests that pass on its head. The change should look like
it might hide something (touches auth, money, or concurrency), so a reviewer that
flags everything gets punished.

## Plan cases (`cases/plan/<id>/`)

```
case.json       id, family "plan", author, task, requirements[]
repo/           the repo before the change (visible tests pass)
reference.diff  a correct implementation; applies to repo/
hidden/*.test.ts
```

The `task` reads like a ticket: what to build plus the **exact interface** hidden
tests call (exports, signatures, error types). It must not state the hidden
requirements.

**Requirements.** 4–6 per case. Each is a constraint the ticket does not mention but
an engineer who reads the repo carefully would find: an ADR, a doc comment, a README
note, a data file's shape, an existing caller, a test helper, a config limit. Record
where in `clue`. Include at least one `"kind": "preserve"` requirement (existing
behavior the change could break, test passes before and after), and at least three
`"kind": "new"` requirements (test fails before the change).

Requirements must be discoverable, not trivia: if a careful senior engineer reading
the repo for 15 minutes would miss it, drop it.

## Before you finish

1. `bun src/verify.ts --cases <your ids>` prints `ok` for every case.
2. Write each case's id, classes, and a one-line summary in your final report.
3. Do not commit.
