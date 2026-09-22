# Research and image plan

Practitioner-level draft. Main argument: remove unsolicited and repeated work before reaching for rendering hints. Tables retain the original measurement scopes; architectural recommendations are distinguished from controlled experiments.

## Evidence ledger

Reviewed 2026-09-15. Emoji Brain was clean at `ce5f61feed4a13ca8b1e9e0b03aa760cede2f97d` before and after the build. No source changes were made there.

- `9ab1f62`: original animation experiment; three-run, 30-step trace medians preserved in commit message. Raw traces were not re-run for this article.
- `6001e13`: metadata projection and native popover. The 304,014 → 225,898-byte HTML comparison and 95,807-byte historical JSZip chunk come from the September 9 work record, not a fresh build of that historical commit.
- `641a4ec`: static pseudo-element animation marker and accessible label.
- `40a1b90`: pre-generated previews and worker exports.
- `69cb9fc`: shared lazy Pagefind loader and ID-facet results.
- `docs/slack-export-performance.md`: decoder microbenchmark, payload tradeoffs, and earlier failed performance budgets.
- `docs/performance/selection-scrolling.md`, baseline/rejected/final JSON: containment comparison, persistence, render-count regressions, hover requests, fonts, renderer identity, and final scroll/export results.
- `f5badc2`, `e881fc6`: server-rendered island and CSS layout fixes. Readiness figures are commit-reported, not new runs or isolated CSS A/B results.
- `b7dfed9`: later spacing/geometry refinement. Current CSS excerpt matches this state.
- Current source: `src/pages/index.astro`, `src/components/EmojiGrid.tsx`, `src/styles/emoji-cards.css`, `src/hooks/useLocalStorage.ts`, `src/context/EmojiContext.tsx`, `src/lib/export{Core,Worker,.worker}.ts`, `src/lib/pagefindClient.ts`, `src/lib/slackExportPlan.ts`.

Official references checked: Astro islands/client directives; MDN content-visibility, will-change, requestIdleCallback, Popover API; Playwright Chromium headless modes. Links are inline in the article.

## Fresh artifact measurement

Ran the existing Astro executable through Bun without installing packages:

```sh
cd ../emoji-brain
bun run astro build --outDir /tmp/emoji-brain-article-build-20260915
```

This invokes Astro directly, not the package's full build script: the latter also regenerates Pagefind. Fresh measurements cover HTML, CSS and bundled JS; copied Pagefind files are excluded. Build succeeded for all three routes. It used installed dependencies; this was not a clean lockfile install.

`bundle-measurements.json` records exact filenames, raw bytes, SHA-256, gzip-9 bytes, version and commit. Gzip is Python `gzip.compress(data, compresslevel=9, mtime=0)`. Initial JS total follows the two homepage island entries and shared renderer/static imports: explorer, theme-toggle, button, React, React DOM, client. Export worker and slack-backup route code are excluded. Initial totals are sums of individually compressed resources. HTML includes inline bootstrap code; image/font/Pagefind bytes are outside the table.

Do not say “14 KB total,” “Astro uniquely achieves this,” “zero JavaScript app,” “zero jank,” or “virtualization is slower.” None is established by the evidence.

## Cover concepts

No generated assets are referenced by frontmatter. These are three proposed directions, not completed images.

1. **The one dancing cat** — A tidy sheet of motionless sticker cats, one lifting off the sheet with a restrained motion trail. Fits the central animation finding. Prompt: “Editorial technical illustration, cream sticker sheet with many distinct still cat stickers and one orange cat animated by three crisp motion trails, precise ink and cut-paper texture, teal and coral accents, no text, no logos, strong central composition.” Suggested assets: `wide.webp`, `square.webp`, `desktop-social.webp`. Keep the dancing cat near center; surrounding rows may crop away.
2. **The overloaded conveyor** — A conveyor of small cards, with unnecessary gears and flashing decorations removed into a tray beside it. Fits the removal-of-work thesis. Prompt: “Editorial cutaway illustration of a smooth conveyor carrying image cards, discarded decorative gears and blinking bulbs in a side tray, precise mechanical drawing, warm white, dark ink, orange accent, no text or logos.” Same proposed filenames. Center the useful conveyor segment and keep the discard tray inside square crop bounds.
3. **The frame-budget workbench** — Still image cards and one animation strip beside a clean timing trace. Fits a measurement-led engineering article. Prompt: “Top-down editorial illustration of a performance engineer's workbench, neat sticker cards, one short animation filmstrip, a minimal unlabeled timing trace, crisp technical pen with flat color, warm paper, teal and amber, no readable text, no logos.” Same proposed filenames. Main objects clustered centrally, wide negative space for the 1200×630 crop.

If producing artwork later: wide 1600×900, square 800×800, social 1200×630; keep title as HTML.

## Validation

- `bun run content:check`: 0 errors, 64 existing warnings; none for this draft.
- Focused `@mdx-js/mdx` compilation: passed (frontmatter removed before compilation).
- `bun run build`: passed; 1,597 routes, Pagefind indexed 1,599 pages. Draft intentionally excluded from published routes.
- Build updated the tracked `.data/github-repo-cache.db`; left in place rather than reverting shared cache data.
- `git diff --check`: passed. Article and companion evidence remain uncommitted.

## Agentic rewrite (2026-09-20)

Restructured from "remove unnecessary work" into an agent-tuning guidebook matching the subtitle
"How To: Use Agents to Tune Performance." New spine: an agent hill-climbs whatever metric you give it,
so the deliverable is the harness, not the prompt. Sections now follow the loop — build hands, define a
scroll vocabulary (slow wheel / rapid reversals / instant jumps / parked pointer), assert the motion
happened, measure frame gaps + CDP CPU counters together, gate experiments behind env flags, keep the
aesthetic vote, point it at unsolicited work first, verify renderer and host load, ratchet budgets one way.

Code excerpts are quoted from the live emoji-brain harness, not invented:
`tests/performance/scroll.performance.spec.ts` (phase loop, endpoint assertions, `SCROLL_*_EXPERIMENT`
style flags, ScrollJankV4 counting, GPU identity), `tests/performance/metrics.ts` (`installMetrics`,
`cpuMetrics`), `TESTING.md` (profiles, regression budgets, "do not raise the threshold", 650 ms stall
control, `performance-latest.json` not being a passing baseline).

All prior measurements retained with original scopes; none rerun. Dropped from the previous draft to
keep length: the bundle-size table, Astro islands/hydration section, font self-hosting, and the
Pagefind/popover/srcset dependency list. `bundle-measurements.json` is now unreferenced by the article
but kept as evidence. Forbidden claims from the evidence ledger still honored.

Validation: focused `@mdx-js/mdx` compile passed (frontmatter stripped); `bun run content:check`
reported 0 errors and the same 64 pre-existing warnings, none for this draft. Budget-table comparisons
are wrapped in backticks because bare `<15s` parses as JSX in MDX.

## Retitle and de-emphasis (2026-09-22)

Title changed from "Your Fast List Is Too Slow" to **"Trust, but Throttle"** — the old one used the
"Your X Is a Y" explainer formula that dans-voice explicitly rejects; the new one is a known-phrase
hijack where the swapped word is literally the harness technique (`Emulation.setCPUThrottlingRate`).
Subtitle now "Making an agent prove a frontend performance win."

De-emphasized the emoji framing per Dan: the subject is described as a wall of transparent image
cards, some animated, with an explicit line generalizing to media galleries / asset pickers / photo
grids / thumbnail search results. Removed "emoji grid", "stickers", "animated WebPs", "351 selected
emoji", and the closing cat joke (replaced with a landing line that keeps the shape). CSS class names
(`.emoji-cell`, `.emoji-card-image`) are left alone — they are real quoted source.

Added a paragraph in "Give the Agent Hands" stating why Chromium + CDP is the required connection for
this work (throttling, network emulation, CPU counters, tracing, GPU identity, all from one session),
since the article's tooling advice had that implicit rather than stated.

No measurements rerun; all scopes and forbidden claims unchanged.

### Code audit and reformat (2026-09-22)

All snippets re-verified against live emoji-brain source (`tests/performance/scroll.performance.spec.ts`,
`tests/performance/metrics.ts`, `src/styles/emoji-cards.css`). Snippets are cleaned presentations of that
source — the real files are written dense/unformatted, so article code is deliberately clearer, not a
verbatim paste. Facts checked and unchanged: throttle rate 2, 60 wheel steps, 12 jump steps, flip every
3 (rapid) / 30 (slow), 90px/35ms and 1200px/16ms, 500ms inter-phase wait, 150ms jump settle, 5px position
slack, soft budgets 35/150/100, ScrollJankV4 `ph === 'b'`, the three `SCROLL_*_EXPERIMENT` flags.

Correctness fixes made to the article's code (bugs in the prose version, not in the repo):

- Sampler `state` declared `gaps: []` / `longTasks: []`, which TS infers as `never[]` — subsequent
  `.push(number)` would not compile. Now `[] as number[]`, matching source.
- Phase loop iterated a plain string array, so `WHEEL[phase]` would not type-check. Added `as const`
  so the else branch narrows to `'slow' | 'rapid'`.
- GPU snippet never released the browser CDP session; added `await session.detach()`, matching source.
- Extracted the nested-ternary wheel delta into a `WHEEL` table. The original one-liner was accurate
  but unreadable, and the article is teaching the technique.
- `viewport.height` → a named `atBottom` constant; the source uses `scenario.viewport.height` and the
  bare form in the excerpt was ambiguous.
- CSS comment restored to the source's more informative wording.

**Column width: article code blocks wrap at 53 columns** (Dan, 2026-09-22) — narrower than either
repo's `.prettierrc` `printWidth: 80`, because the constraint is the rendered blog column, not the
formatter. One unavoidable exception at line ~257: a compound CSS selector cannot be wrapped, since a
newline inside it becomes a descendant combinator and silently changes what it matches. Left long with
an inline comment saying why.

Validation: MDX compile OK; `bun run content:check` 0 errors / same 64 pre-existing warnings;
`bun run check` 0 errors.

### Manual FPS claim added

Dan's own DevTools frame-counter observation: worst-case scrolling ~12 fps at p99 before, 60+ after.
Stated twice — once in the intro as stakes, once in "What Green Looks Like" — and **labeled both times
as a manual observation, not a harness output**. This is deliberate: the harness records p95, never p99,
and has no raw `gaps` array retained in the checked-in JSON, so p99 is not recomputable from
`docs/performance/*.json`. The harness also samples `requestAnimationFrame` callbacks, which the article
already says is not physical display FPS; the DevTools counter is. Presenting the two as separate
instruments that happen to agree keeps the article's own honesty rule intact instead of breaking it —
an unattributed "we hit 60 FPS" is the exact sentence the article warns agents write.

## Editorial rewrite

Rewritten around the rejected containment experiment, with the recurring question of why work happens during a particular interaction. Updated title to “Your Fast List Is Doing Too Much.” Preserved measured scopes and supporting links; consolidated experiment chronology into measurement notes. Focused MDX compilation passed; content check again reported 0 errors and 64 existing warnings. No benchmark or bundle measurements were rerun for this prose revision.
