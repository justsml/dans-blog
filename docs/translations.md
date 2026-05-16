# Article Translation Workflow

This project translates articles with competing LLM candidates, a cheap judge pass, and intentionally messy Git provenance. The goal is a real localized page plus a useful audit trail of what each model produced, what failed, what the judge chose, and what final fixes were needed.

## Routing Contract

- English stays unprefixed: `/the-last-to-think/`.
- Translations use locale prefixes: `/es/the-last-to-think/`, `/hi/the-last-to-think/`, `/ja/the-last-to-think/`, `/ru/the-last-to-think/`, `/de/the-last-to-think/`, `/fr/the-last-to-think/`, `/it/the-last-to-think/`, `/ar/the-last-to-think/`, `/he/the-last-to-think/`, `/zh/the-last-to-think/`.
- Slugs remain English permanently.
- Translation files live beside the English article:

  ```text
  src/content/posts/YYYY-MM-DD--slug/index.mdx
  src/content/posts/YYYY-MM-DD--slug/es/index.mdx
  src/content/posts/YYYY-MM-DD--slug/hi/index.mdx
  src/content/posts/YYYY-MM-DD--slug/ja/index.mdx
  src/content/posts/YYYY-MM-DD--slug/ru/index.mdx
  src/content/posts/YYYY-MM-DD--slug/de/index.mdx
  src/content/posts/YYYY-MM-DD--slug/fr/index.mdx
  src/content/posts/YYYY-MM-DD--slug/it/index.mdx
  src/content/posts/YYYY-MM-DD--slug/ar/index.mdx
  src/content/posts/YYYY-MM-DD--slug/he/index.mdx
  src/content/posts/YYYY-MM-DD--slug/zh/index.mdx
  ```

- Missing translated URLs redirect to English instead of rendering duplicate English content.
- Real translated URLs must not retain stale fallback redirects.

## What Translations Own

Translation files should contain localized reader-facing content:

- `title`
- `subTitle`
- body prose
- image alt text and `cover_alt` when present
- quiz questions, options, hints, and explanations
- visible text inside MDX component props

Translations inherit non-reader-facing metadata from English unless an override is needed:

- dates
- category and tags
- related links
- redirects
- comment key
- images

Because locale files sit one folder deeper than English, inherited assets usually need parent-relative paths:

```yaml
social_image: ../mobile-social.webp
cover_full_width: ../banner-thinking-decay-wide.webp
cover_mobile: ../banner-thinking-decay-square-200.webp
cover_icon: ../banner-thinking-decay-square-200.webp
```

## Scripts

The translation pipeline is wrapped with Bun scripts:

```sh
bun run i18n:translate:candidates -- --slug the-last-to-think --locale es
bun run i18n:judge -- --slug the-last-to-think --locale es --model openrouter/google/gemini-3-flash-preview
bun run i18n:validate -- --slug the-last-to-think --locale es
bun run i18n:coverage
bun run i18n:promote -- --slug the-last-to-think --locale es
bun run i18n:report:models
bun run i18n:score                   # LLM-score all promoted translations
bun run i18n:eval                    # offline prompt evals against fixed fixtures
```

**Prompt eval suite**: `bun run i18n:eval` runs real cheap-model inferences against fixed source fixtures and scores outputs with a lightweight judge. Run it after editing prompts in `prompts.ts`, judge builders in `judge-utils.ts`, or translation-agent prompt profiles. The eval harness can apply active translation and judge prompt profiles by locale/model/content kind, or disable them with `--no-prompt-profile`. See [i18n-evals.md](i18n-evals.md) for full documentation.

**Unit tests** (no LLM, no tokens): `bun test src/scripts/i18n/judge.test.ts` covers all pure functions in `judge-utils.ts` — JSON parsing, score normalization, suggestion normalization, escalation logic, and prompt builder structure.

Validation checks frontmatter, preserved imports/components, fenced code counts, nested locale asset paths, per-level heading counts, and comparable prose length. English and translated files must keep the same number of H1, H2, H3, H4, H5, and H6 headings; translate the heading text, but do not promote, demote, add, or drop headings. Translated bodies must stay within the locale's comparable-length range after frontmatter, imports, fenced code blocks, `<pre>` blocks, comments, and excess whitespace are ignored. CJK languages use lower character-count minimums because the text is naturally denser; Arabic, Hebrew, Hindi, German, French, Italian, Spanish, and Russian each have locale-specific expansion/compression bounds instead of sharing one English-centric percentage.

Judge runs compare at most three candidate commits per model call, with any pre-existing translated file included as `<current>` context. Runs may return structured `suggestions` in `judge.json`. Medium/high-priority suggestions must include an exact `match`, exact `replacement`, and English `reason`; the judge wrapper applies those exact replacements, re-runs judge scoring, and repeats until no medium/high issues remain or `--fix-pass-limit` is reached. The default fix pass limit is 2. Every suggestion is written to `judge-suggestions.jsonl` when present and summarized in `judge-summary.md`. Every judge call and fix application appends an accounting row to `reports/i18n/{slug}/judgements.jsonl`, next to the article-level `candidates.jsonl`. Score and final-run rows also persist confidence (`confidence`, `confidenceScore`, `confidenceSignals`, and high/medium/low `issueCounts`) derived from issue severity, judge agreement/disagreement, and strong frontier-model scoring when available.

Candidate generation harvests and commits each model output as an immutable candidate artifact unless `--no-commit` is passed. It should not skip a model just because a previous candidate exists, and it should not leave the translated `src/content` file changed after harvesting. The judge step is responsible for comparing candidates, refining the selected output, and updating the live translated post.

For translation batches, prefer high parallelism unless you are deliberately debugging a single slug/locale: `--quiz-concurrency 24 --task-concurrency 12`. Keep those flags visible in examples so batch runs do not quietly fall back to slow serial habits.

For broad baseline coverage, run the low-confidence Qwen queue directly on `main`:

```sh
bun run i18n:qwen:baseline -- --push
```

That queue is resumable. It skips slug+locale pairs that already have a successful `openrouter/qwen/qwen3.6-plus` report, pulls/rebases before each item, and can be scoped with `--limit`, `--latest-posts`, `--locales`, or `--slugs`.

Candidate generation is append-only per slug, locale, and model run. Re-running the same model should create a new timestamped candidate and append a new `candidates.jsonl` row instead of overwriting or skipping older candidates:

```sh
bun run i18n:translate:candidates -- \
  --slug the-last-to-think \
  --locale es \
  --models openrouter/qwen/qwen3.6-plus
```

Use `--only-modified` for refresh passes that should only re-translate existing locale files whose English `modified` frontmatter date is newer than the localized file's `modified` date. Locale files with no `modified` are treated as stale when English has one; missing locale files are not included by this flag. The flag is supported by the candidate, all-missing, Qwen baseline, chunked translator, and candidate TUI wrappers.

```sh
bun run i18n:translate:candidates -- \
  --locales es,ja,zh \
  --only-modified \
  --task-concurrency 12 \
  --quiz-concurrency 24
```

Keep telemetry reports inside timestamped run directories. Do not write or commit latest-by-model `reports/i18n/{slug}/{locale}/{model}/chunked-*.md` files.

Every future candidate report includes run telemetry:

- runtime seconds
- input tokens
- output tokens
- thinking/reasoning tokens
- cached input tokens
- estimated cost when the model has known pricing in `translate-candidates.ts`

Token fields are best-effort because provider output formats vary. Unknown token counts are still written explicitly so model reports keep a stable shape.

OpenRouter usage metadata is read from the response `usage` object. As of the 2026-05-13 OpenRouter docs check, the useful fields are `usage.prompt_tokens`, `usage.completion_tokens`, `usage.total_tokens`, `usage.cost` in OpenRouter credits, `usage.prompt_tokens_details.cached_tokens`, `usage.prompt_tokens_details.cache_write_tokens`, and `usage.completion_tokens_details.reasoning_tokens`.

To run a subset:

```sh
bun run i18n:translate:candidates -- \
  --slug the-last-to-think \
  --locale es \
  --models openrouter/z-ai/glm-5.1,openrouter/minimax/minimax-m2.7
```

AI SDK translation and judge calls default to a 240 second timeout. Override it per run when needed:

```sh
bun run i18n:translate:candidates -- \
  --slug the-last-to-think \
  --locale es \
  --timeout-seconds 240

bun run i18n:judge -- \
  --slug the-last-to-think \
  --locale es \
  --timeout-seconds 240
```

Judge comparison calls are capped at three candidate commits by default. `--judge-batch-size` may be set lower, but values above 3 are capped to keep prompts bounded. `--fix-pass-limit` controls the medium/high-priority fix loop and defaults to 2.

Article translation chunks default to `18p`: eighteen paragraphs per translated chunk. For non-quiz prose, the prompt also includes one neighboring source paragraph before and after the active chunk when available. That padding is context only; the model is told to translate only the active chunk. Stable translation instructions, locale guidance, and article/quiz context are sent in cacheable prompt blocks; the dynamic prompt should contain only per-chunk or per-question material. Quiz posts ignore prose chunk padding because they use structured Challenge input/output instead.

Example: For quiz posts, generate competing Nitro candidates through the normal candidate wrapper so each model output is committed and available to the judge:

```sh
bun run i18n:translate:candidates -- \
  --slug javascript-promises-quiz \
  --locale ja \
  --models openrouter/openai/gpt-oss-120b:nitro,openrouter/qwen/qwen3-32b:nitro \
  --task-concurrency 12 \
  --quiz-concurrency 24 \
  --challenge-retries 2 \
  --timeout-seconds 240
```

To keep the current Qwen/DeepSeek primary pair and add Nitro candidates after them:

```sh
bun run i18n:translate:candidates -- \
  --slug javascript-promises-quiz \
  --locale ja \
  --models openrouter/qwen/qwen3.6-plus,openrouter/deepseek/deepseek-v4-flash,openrouter/openai/gpt-oss-120b:nitro,openrouter/qwen/qwen3-32b:nitro \
  --task-concurrency 12 \
  --quiz-concurrency 24 \
  --challenge-retries 2 \
  --timeout-seconds 240
```

Judge only the last two candidate commits, which is useful after running just the two Nitro models:

```sh
bun run i18n:judge -- \
  --slug javascript-promises-quiz \
  --locale ja \
  --candidate-limit 2 \
  --model openrouter/google/gemini-3-flash-preview \
  --timeout-seconds 240
```

Judge the last three candidates with a second cheap judge and escalation only if the judges disagree:

```sh
bun run i18n:judge -- \
  --slug javascript-promises-quiz \
  --locale ja \
  --candidate-limit 3 \
  --model openrouter/google/gemini-3-flash-preview \
  --second-model openrouter/deepseek/deepseek-v3.2 \
  --escalate-model openrouter/anthropic/claude-sonnet-4.6 \
  --timeout-seconds 240
```

If the repo has older history for the same slug and locale, combine the limit with explicit model filtering:

```sh
bun run i18n:judge -- \
  --slug javascript-promises-quiz \
  --locale ja \
  --candidate-models openrouter/openai/gpt-oss-120b:nitro,openrouter/qwen/qwen3-32b:nitro \
  --candidate-limit 2 \
  --model openrouter/google/gemini-3-flash-preview \
  --timeout-seconds 240
```

Thinking-capable models are run with cheap reasoning variants by default:

- `openrouter/openai/gpt-oss-120b:nitro`: `--variant low`
- `openrouter/qwen/qwen3-32b:nitro`: `--variant low`
- `openrouter/qwen/qwen3.6-plus`: `--variant low`
- `openrouter/google/gemini-3-flash-preview`: `--variant minimal`
- `openrouter/z-ai/glm-5.1`: `--variant low`

`bun run i18n:report:models` regenerates `reports/i18n/model-performance.md`, including aggregate model stats, winner counts, and article/locale winner tables.

For ad hoc accounting over `candidates.jsonl` and `judgements.jsonl`, use the
[i18n telemetry jq cookbook](i18n-telemetry-jq.md). It includes snippets for
combining logs, de-duplicating candidate rows, totaling costs and tokens,
filtering by absolute or relative date ranges, and turning the snippets into
small shell scripts.

`bun run i18n:coverage` prints a coverage and health report for the translation corpus. Use it before starting a broad batch to see which slug/locale pairs are missing, after promotion to confirm coverage changed as expected, and during review to spot stale fallback redirects or locale folders that look incomplete. It is a reporting pass, not a promotion or validation substitute; still run the build/check commands below before finishing.

## Candidate Models

Default candidate models are defined in `src/scripts/i18n/translate-candidates.ts`.

Current low-cost OpenRouter set:

```text
openrouter/qwen/qwen3.6-plus
openrouter/deepseek/deepseek-v4-flash
openrouter/openai/gpt-oss-120b:nitro
openrouter/qwen/qwen3-32b:nitro
openrouter/z-ai/glm-4.7-flash
openrouter/minimax/minimax-m2.5
openrouter/minimax/minimax-m2.7
openrouter/google/gemini-3-flash-preview
openrouter/deepseek/deepseek-v3.2
openrouter/z-ai/glm-5-turbo
```

`--models` accepts full IDs or loose case-insensitive substrings matched against that list in order. For example, `--models nitro,32b,deepseek` resolves to `openrouter/openai/gpt-oss-120b:nitro`, `openrouter/qwen/qwen3-32b:nitro`, and the first DeepSeek match, `openrouter/deepseek/deepseek-v4-flash`.

OpenRouter pricing checked on 2026-05-13 showed `openrouter/openai/gpt-oss-120b:nitro` at $0.039/M input and $0.18/M output tokens, and `openrouter/qwen/qwen3-32b:nitro` at $0.08/M input and $0.24/M output tokens. Both are kept after the current primary Qwen and DeepSeek candidates in the cheap pool.

OpenRouter pricing checked on 2026-05-10 showed `openrouter/qwen/qwen3.6-plus` cheaper than `openrouter/z-ai/glm-5-turbo`, so GLM 5 Turbo is kept as a later fallback instead of an early default.

Older batches also used Gemma, DeepSeek V4 Pro, Kimi, GLM 5.1, and OpenAI mini judges. Keep those reports as provenance, but do not treat them as the default path for new broad translation coverage.

Qwen availability notes from earlier checks:

- OpenRouter's public API exposed `qwen/qwen3.6-plus`, `qwen/qwen3.6-35b-a3b`, and `qwen/qwen3.6-flash`.
- The current script model list uses runnable OpenRouter IDs through the AI SDK provider.

`minimax-m2.6` was requested during setup, but the available OpenRouter catalog did not expose that model ID. The closest available MiniMax candidate at the time was `openrouter/minimax/minimax-m2.7`.

For judging, start cheap:

```text
openrouter/google/gemini-3-flash-preview
```

Judge summaries include runtime, token, thinking-token, cached-token, and estimated-cost fields using the same telemetry shape as candidate reports.

Use a second judge when a batch is high-risk, when candidates are close, or when a candidate comes from a model with a weak history for that locale:

```sh
bun run i18n:judge -- \
  --slug the-last-to-think \
  --locale es \
  --model openrouter/google/gemini-3-flash-preview \
  --second-model openrouter/deepseek/deepseek-v3.2 \
  --escalate-model openrouter/anthropic/claude-sonnet-4.6
```

Escalation runs only when the second judge report appears to disagree and an `--escalate-model` is provided. Use a smarter judge such as `openrouter/anthropic/claude-sonnet-4.6` or `openrouter/google/gemini-3-pro-preview` only when the cheaper judges disagree, the judge output is structurally broken, it misses obvious translation problems, or it cannot compare candidates.

## Git Provenance

Use one normal branch per batch, for example:

```sh
git switch -c codex/i18n-pilot-es-hi-ja
```

Keep every candidate, rejection, judge pass, and final polish commit in history. Do not squash.

Commit subjects:

```text
i18n candidate(es): the-last-to-think via openrouter/qwen/qwen3.6-plus
i18n rejected(es): the-last-to-think via openrouter/google/gemini-3-flash-preview
i18n judge(es): select translation for the-last-to-think
i18n final(es): polish the-last-to-think
i18n final(es): fix inherited asset paths for the-last-to-think
```

Candidate commits intentionally replace the same target file. The point is that `git show <sha>:path` preserves each model output without needing separate permanent files for every draft.

Reports live under:

```text
reports/i18n/{slug}/{locale}/
```

Expected report files include:

- one report per model candidate
- rejected attempt reports
- `judge.md`
- `judge-summary.md`

The judge reads prior candidates from Git history. It should compare only commits that actually changed the translated MDX target. Report-only commits, provider failures, and unchanged outputs should be treated as rejected attempts.

Candidate generation is a harvesting phase. By default, `i18n:translate:candidates` normalizes obvious locale-folder paths and records `Validation: deferred`, but it does not run `content:check`, `fix-quizzes`, `astro check`, or a full build per model attempt. Use `--validate-candidates` only when you want local structural checks during generation. Use `--full-validation` sparingly; broad concurrent batches should defer global validation to judge, final polish, promotion, or the end-of-batch checklist.

Candidate batch ordering should fill weak slots first. The candidate runner sorts slug/locale tasks by fewest existing candidate rows, then by oldest newest-candidate timestamp, so under-covered or stale translations get new candidates before already-fresh slots.

The candidate TUI should stay lightweight while a batch is running. Refreshes are debounced (`--refresh-debounce-ms`, default 750ms), and token/cost/accounting panels report only the current active run from `candidate-run-events.jsonl`; historical candidate coverage still comes from candidate rows and report files.

Failed or interrupted candidate runs must preserve accounting. Do not roll `candidates.jsonl`, `candidate-run-events.jsonl`, `candidate-run-history.jsonl`, model run JSON, usage JSONL, or generated report directories backward just because a candidate failed. JSONL files are append-only evidence logs across models and runs. Candidate rows append to the article-level `reports/i18n/{slug}/candidates.jsonl`. Candidate run state appends `run_started`, `attempt_recorded`, and `run_finished` rows to the locale-level `candidate-run-events.jsonl`; finalized totals append to `candidate-run-history.jsonl`. Do not commit mutable latest-summary JSON files. Locale directories keep per-run summaries and model artifacts. The candidate runner records failed runs as `failed` or `interrupted` and cleans up active child process groups on exit.

Judge runs are serialized per slug/locale with `.git/codex-i18n-judge-{slug}-{locale}.lock`, so separate articles/locales can be judged concurrently while duplicate judges for the same target wait. After waiting more than 6 minutes, the wrapper cleans up a stale or malformed lock when the recorded owner process is gone.

Full/global validation is separately serialized with `.git/codex-i18n-global-check.lock` so `content:check`, `fix-quizzes`, and `astro check` do not run concurrently from parallel judge or candidate workflows.

## Failure Handling

OpenRouter providers can fail in awkward ways. A provider may print an SSE or JSON error but still leave the wrapper process in a state where the previous target file exists.

Rules:

- A model attempt is a candidate when it produces a timestamped candidate artifact and appends a row to `candidates.jsonl`; generation restores the live translated MDX target afterward so judging owns promotion.
- If the AI SDK/provider call fails, commit a rejection report only.
- If the model call succeeds but the target file is unchanged, commit a rejection report only.
- If a later judge, promotion, or final validation pass finds broken MDX, do not silently promote the file. Either fix and commit the fix or keep the attempt out of the final selection.

Example rejected report note:

```text
Validation: rejected: provider unavailable
Note: OpenRouter returned a 502 provider_unavailable SSE error, and the model left no diff in the target file.
```

## Judge Behavior

The judge should choose based on:

- technical fidelity
- natural target-language quality
- preservation of Dan's direct editorial voice
- MDX and asset-path correctness
- lack of mixed-language contamination
- minimal unnecessary paraphrase

The judge may lightly polish the winning candidate, but it should not rewrite the article into a new piece.

If the judge introduces broken asset paths, code fences, frontmatter drift, or MDX damage, fix that as a separate `i18n final(...)` commit.

## SEO And Search Checks

For a real translation, the built localized page should have:

- localized `html lang`
- self-canonical URL
- `hreflang` alternate for English
- `hreflang` alternate for itself
- `x-default` pointing to English
- sitemap inclusion
- Pagefind indexing

Spot check after build:

```sh
rg 'rel="canonical"|hreflang="en"|hreflang="es"|hreflang="x-default"' \
  dist/es/the-last-to-think/index.html
```

Also confirm that the real translation is not redirected away:

```sh
rg '^/es/the-last-to-think' public/_redirects || true
```

No output is expected for a translated page that now exists.

## Validation Checklist

For article-only changes:

```sh
bun run content:check
bun run check
bun run build
bun test src/scripts/redirectManager.test.ts src/shared/i18n.test.ts
```

For quiz translations, also run:

```sh
bun run fix-quizzes
```

Use `bun run build` as the final authority for asset path correctness, generated redirects, localized routes, Pagefind, and sitemap output.

Known existing content warnings may remain. New errors should be fixed before finishing.

## Pilot Outcome

The first pilot translated `the-last-to-think` into Spanish. It produced candidate commits for Qwen, Kimi, GLM, and MiniMax, recorded Gemini as a rejected provider failure, judged the real candidates with `openrouter/openai/gpt-5.4-mini`, and selected the Qwen candidate after polish.

The useful bugs found during the pilot:

- stale generated locale fallback redirects must be dropped once a translation becomes real
- `x-default` should point to English, not the current localized canonical URL
- judge passes can break nested asset paths unless build catches them
- provider failures must not become fake candidates just because the previous target file exists

Those are now encoded in scripts, tests, and this workflow.
