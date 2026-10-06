# Test suite review — 2026-10-05

A test earns its place when a plausible regression changes its result. Size,
simplicity and execution speed alone do not establish value. Review covered the
41 Bun test files and four browser specifications, with emphasis on redundant
coverage, source inspection, weak oracles and assertions disconnected from the
behavior named by the test.

## Changes

| Area | Finding | Action |
| --- | --- | --- |
| Pagefind contract | Six tests searched source text or filenames. Comments/dead code could satisfy checks; a draft article about LanceDB triggered the filename ban; wrapper pages failed because attributes moved into their shared template. | Remove the file. These checks did not prove index contents or search behavior. |
| Judge prompts | 27 tests mostly pinned rubric wording or found short strings such as `es` and `../` anywhere in a prompt. | Replace with five caller-data/selection assembly tests. Preserve integrity, parsing, scoring and escalation behavior tests. |
| Navigation | Twenty tests included repeated menu opening, href-selected href assertions, stale React-era selectors, CSS-class “ARIA” checks, and fixed sleeps. Most “clickable” tests never clicked a link. | Replace with eight browser tests exercising navigation, response status, keyboard focus/activation, switching and dismissal. |
| Configuration | Sort-mode tuple snapshots, fixed catalog/locale duplication and repeated path examples froze configuration or repeated existing coverage. | Remove redundant assertions; retain CLI defaults flowing through the parser and routing behavior. |
| Quiz corpus | Browser tests repeated six kinds of source-data assertions already checked by the offline corpus suite. | Remove those assertions; retain every rendered choice, answer, reload, mobile and locale-isolation check. |
| News identities | Hash lengths and comparing the same call with itself did not prove meaningful identity behavior. | Check identity across metric changes and separation across sources/IDs; check topic normalization/separation. |
| Score averages | Equal and symmetric scores could hide omitted dimensions. | Replace with one asymmetric eight-dimension case. |
| Cache | Three failing tests exposed immediate default expiry and clearing the wrong table. Delete could pass vacuously because its input had already expired. Shared disk state and a 2ms TTL introduced unnecessary fragility. | Fix both implementation defects. Use isolated in-memory databases, controlled time, and live-key preconditions for delete/clear. |

Other retained suites protect consequential behavior: localized routes and
visibility, redirects, Git change detection, translation assets/code/answer
preservation, telemetry linkage, cost accounting, provenance, patch admission,
consensus and immutable golden datasets. Small boundary tests in these areas are
valuable even when each assertion is simple.

Static rubric wording checks are not language-quality evaluations. Existing real
LLM evaluations remain the place to assess prompt quality. No prompts changed and
no paid model calls were made during this review.

## Verification

- Before cleanup: `bun test ./src` — 551 passed, five failed, 556 total.
- After cleanup: `bun test ./src` — 525 passed, zero failed, 40 files.
- Navigation: eight passed against the existing localhost server.
- Pagination: four passed in the broader browser run.
- Quiz runtime: Hebrew controls displayed English text; the first-failure setting
  stopped the run. This test remains intact. The full quiz corpus was not run.
- `bun run check` — zero errors and zero warnings.
- `git diff --check` — passed.
- Quiz corpus specification discovery — passed; no browser corpus execution.

Removing the Pagefind tests leaves no automated behavioral search check in this
suite. A future search check should query the built Pagefind index and verify
actual results, exclusions and metadata. Restoring source-string assertions would
not close that gap. No production build or deployment was performed.
