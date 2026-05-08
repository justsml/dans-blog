# Article Translation Workflow

This project translates articles with competing LLM candidates, a cheap judge pass, and intentionally messy Git provenance. The goal is a real localized page plus a useful audit trail of what each model produced, what failed, what the judge chose, and what final fixes were needed.

## Routing Contract

- English stays unprefixed: `/the-last-to-think/`.
- Translations use locale prefixes: `/es/the-last-to-think/`, `/hi/the-last-to-think/`, `/ja/the-last-to-think/`.
- Slugs remain English permanently.
- Translation files live beside the English article:

  ```text
  src/content/posts/YYYY-MM-DD--slug/index.mdx
  src/content/posts/YYYY-MM-DD--slug/es/index.mdx
  src/content/posts/YYYY-MM-DD--slug/hi/index.mdx
  src/content/posts/YYYY-MM-DD--slug/ja/index.mdx
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
bun run i18n:judge -- --slug the-last-to-think --locale es --model openrouter/openai/gpt-5.4-mini
bun run i18n:validate -- --slug the-last-to-think --locale es
bun run i18n:promote -- --slug the-last-to-think --locale es
```

Candidate generation validates and commits each model output unless `--no-commit` is passed.

To run a subset:

```sh
bun run i18n:translate:candidates -- \
  --slug the-last-to-think \
  --locale es \
  --models openrouter/z-ai/glm-5.1,openrouter/minimax/minimax-m2.7
```

## Candidate Models

Default candidate models are defined in `src/scripts/i18n/translate-candidates.ts`.

Current OpenRouter set:

```text
openrouter/qwen/qwen3.6-plus
openrouter/moonshotai/kimi-k2.6
openrouter/google/gemini-3-flash-preview
openrouter/z-ai/glm-5.1
openrouter/minimax/minimax-m2.7
```

`minimax-m2.6` was requested during setup, but `opencode models openrouter` did not expose that model ID. The closest available MiniMax candidate at the time was `openrouter/minimax/minimax-m2.7`.

For judging, start cheap:

```text
openrouter/openai/gpt-5.4-mini
```

Escalate only when the judge output is structurally broken, misses obvious translation problems, or cannot compare candidates.

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
