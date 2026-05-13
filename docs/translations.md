# Article Translation Workflow

This project translates articles with competing LLM candidates, a cheap judge pass, and intentionally messy Git provenance. The goal is a real localized page plus a useful audit trail of what each model produced, what failed, what the judge chose, and what final fixes were needed.

## Routing Contract

- English stays unprefixed: `/the-last-to-think/`.
- Translations use locale prefixes: `/es/the-last-to-think/`, `/hi/the-last-to-think/`, `/ja/the-last-to-think/`, `/ru/the-last-to-think/`, `/de/the-last-to-think/`, `/fr/the-last-to-think/`, `/it/the-last-to-think/`.
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
```

Candidate generation validates and commits each model output unless `--no-commit` is passed.

For broad baseline coverage, run the low-confidence Qwen queue directly on `main`:

```sh
bun run i18n:qwen:baseline -- --push
```

That queue is resumable. It skips slug+locale pairs that already have a successful `openrouter/qwen/qwen3.6-plus` report, pulls/rebases before each item, and can be scoped with `--limit`, `--latest-posts`, `--locales`, or `--slugs`.

By default, candidate generation is idempotent per slug, locale, and model: if the model already has a report at `reports/i18n/{slug}/{locale}/{safe-model-name}.md`, the script skips that language+model combo. Pass `--overwrite` to intentionally rerun and replace that model's target-file output:

```sh
bun run i18n:translate:candidates -- \
  --slug the-last-to-think \
  --locale es \
  --models openrouter/qwen/qwen3.6-plus \
  --overwrite
```

Every future candidate report includes run telemetry:

- runtime seconds
- input tokens
- output tokens
- thinking/reasoning tokens
- cached input tokens
- estimated cost when the model has known pricing in `translate-candidates.ts`

Token fields are best-effort because provider and OpenCode output formats vary. Unknown token counts are still written explicitly so model reports keep a stable shape.

OpenRouter usage metadata is read from the response `usage` object. As of the 2026-05-13 OpenRouter docs check, the useful fields are `usage.prompt_tokens`, `usage.completion_tokens`, `usage.total_tokens`, `usage.cost`, `usage.prompt_tokens_details.cached_tokens`, `usage.prompt_tokens_details.cache_write_tokens`, and `usage.completion_tokens_details.reasoning_tokens`.

To run a subset:

```sh
bun run i18n:translate:candidates -- \
  --slug the-last-to-think \
  --locale es \
  --models openrouter/z-ai/glm-5.1,openrouter/minimax/minimax-m2.7
```

OpenCode calls default to a 240 second timeout. Override it per run when needed:

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

For quiz posts, generate competing Nitro candidates through the normal candidate wrapper so each model output is committed and available to the judge:

```sh
bun run i18n:translate:candidates -- \
  --slug javascript-promises-quiz \
  --locale ja \
  --models openrouter/openai/gpt-oss-120b:nitro,openrouter/qwen/qwen3-32b:nitro \
  --chunk 4p \
  --quiz-concurrency 18 \
  --challenge-retries 2 \
  --timeout-seconds 240
```

To keep the current Qwen/DeepSeek primary pair and add Nitro candidates after them:

```sh
bun run i18n:translate:candidates -- \
  --slug javascript-promises-quiz \
  --locale ja \
  --models openrouter/qwen/qwen3.6-plus,openrouter/deepseek/deepseek-v4-flash,openrouter/openai/gpt-oss-120b:nitro,openrouter/qwen/qwen3-32b:nitro \
  --chunk 1p \
  --quiz-concurrency 18 \
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

OpenRouter pricing checked on 2026-05-13 showed `openrouter/openai/gpt-oss-120b:nitro` at $0.039/M input and $0.18/M output tokens, and `openrouter/qwen/qwen3-32b:nitro` at $0.08/M input and $0.24/M output tokens. Both are kept after the current primary Qwen and DeepSeek candidates in the cheap pool.

OpenRouter pricing checked on 2026-05-10 showed `openrouter/qwen/qwen3.6-plus` cheaper than `openrouter/z-ai/glm-5-turbo`, so GLM 5 Turbo is kept as a later fallback instead of an early default.

Older batches also used Gemma, DeepSeek V4 Pro, Kimi, GLM 5.1, and OpenAI mini judges. Keep those reports as provenance, but do not treat them as the default path for new broad translation coverage.

Qwen availability notes from earlier checks:

- OpenCode exposed `openrouter/qwen/qwen3.6-plus` and `openrouter/qwen/qwen-3.6-27b`.
- OpenRouter's public API exposed `qwen/qwen3.6-plus`, `qwen/qwen3.6-35b-a3b`, and `qwen/qwen3.6-flash`.
- OpenCode did not expose `qwen/qwen3.6-flash`, and it rejected `qwen/qwen3.6-35b-a3b`.

`minimax-m2.6` was requested during setup, but `opencode models openrouter` did not expose that model ID. The closest available MiniMax candidate at the time was `openrouter/minimax/minimax-m2.7`.

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

## Failure Handling

OpenRouter providers can fail in awkward ways. A provider may print an SSE or JSON error but still leave the wrapper process in a state where the previous target file exists.

Rules:

- A model attempt is a candidate only if it leaves a diff in the translated MDX target file.
- If OpenCode exits non-zero, commit a rejection report only.
- If OpenCode exits zero but the target file is unchanged, commit a rejection report only.
- If validation fails, do not silently promote the file. Either fix and commit the fix or commit the attempt as rejected with the validation failure.

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
