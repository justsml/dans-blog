---
name: article-i18n-translator
description: Generate and judge DanLevy.net article translations with OpenCode/OpenRouter candidate models, locale-prefixed Astro routes, and full Git provenance. Use when translating posts, adding i18n candidates, judging translations, preserving messy model history, or debugging translated article routing.
---

# Article I18n Translator

Use this skill for DanLevy.net article translation work. The priority is not only a good translated page; it is a traceable history of model attempts, judge decisions, rejections, and final fixes.

## Core Rules

- Use Bun scripts only. Never use npm or yarn.
- Keep English slugs permanently. English routes stay unprefixed, translated routes use `/{locale}/{base-slug}/`.
- Store translated files next to the English post: `src/content/posts/YYYY-MM-DD--slug/{es,hi,ja,ru,de,fr,it}/index.mdx`.
- Preserve full Git history. Commit candidate outputs, rejected attempts, judge passes, and final fixes as normal commits. Do not squash.
- For broad baseline coverage, run Qwen directly on `main` with `bun run i18n:qwen:baseline -- --push`. It is resumable and skips slug+locale pairs that already have a successful Qwen report.
- Do not edit `public/_redirects` by hand. Let build-generated redirects update it.
- Preserve MDX structure, imports, components, props, code blocks, URLs, anchors, and asset paths.
- Translate reader-facing prose, frontmatter `title` and `subTitle`, image alt text, quiz text, options, and explanations.
- Use parent-relative asset paths in nested locale folders, for example `../banner.webp`.

## Model Set

Default candidate models live in `src/scripts/i18n/translate-candidates.ts`.

Current low-cost OpenRouter candidates:

- `openrouter/qwen/qwen3.6-plus`
- `openrouter/deepseek/deepseek-v4-flash`
- `openrouter/z-ai/glm-4.7-flash`
- `openrouter/minimax/minimax-m2.5`
- `openrouter/minimax/minimax-m2.7`
- `openrouter/google/gemini-3-flash-preview`
- `openrouter/deepseek/deepseek-v3.2`
- `openrouter/z-ai/glm-5-turbo`

GLM 5 Turbo is now a fallback, not an early default; OpenRouter pricing checked on 2026-05-10 showed Qwen 3.6 Plus cheaper than GLM 5 Turbo.

Older candidates retained in history:

- `openrouter/google/gemma-4-26b-a4b-it`
- `openrouter/google/gemma-4-31b-it`
- `openrouter/deepseek/deepseek-v4-pro`
- `openrouter/moonshotai/kimi-k2.6`
- `openrouter/z-ai/glm-5.1`

Note: the Gemma 4 26B A4B and Gemma 4 31B entries were added as the cheapest paid runnable options from the requested model list at the time of the OpenRouter/OpenCode check. OpenRouter's public API listed `qwen/qwen3.6-35b-a3b` as cheaper than DeepSeek V4 Pro, but OpenCode rejected that model ID with `ProviderModelNotFoundError`, so the runnable third addition is `openrouter/deepseek/deepseek-v4-pro`. `gpt-5.5-mini` was not present in OpenRouter's model list, and OpenCode exposed `anthropic/claude-haiku-4.5` rather than `anthropic/claude-haiku-latest`. `minimax-m2.6` was requested earlier, but OpenCode's OpenRouter catalog did not expose that ID during setup. Use the nearest available MiniMax model unless the catalog changes.

Judge with Gemini Flash by default:

- `openrouter/google/gemini-3-flash-preview`

For higher-risk batches, add a second cheap judge explicitly with `--second-model`. Escalate with `--escalate-model openrouter/anthropic/claude-sonnet-4.6` or `--escalate-model openrouter/google/gemini-3-pro-preview` only when the second judge disagrees or the cheap judge output is structurally suspect. Judge summaries should record runtime, tokens, thinking tokens, cached tokens, and estimated cost.

## Standard Workflow

1. Check `git status --short`. Work with any user changes; do not revert unrelated files.
2. Run candidates:

   ```sh
   bun run i18n:translate:candidates -- --slug the-last-to-think --locale es
   ```

   Candidate generation skips existing slug+locale+model reports by default. Use `--overwrite` only when you intentionally want to rerun that model and replace its target-file output.

   OpenCode calls default to a 240 second timeout. Use `--timeout-seconds 240` explicitly for batch work. Thinking-capable models should stay cheap: Qwen and GLM run with `--variant low`, Gemini 3 Flash runs with `--variant minimal`.

   Each model report should include runtime seconds, input tokens, output tokens, thinking/reasoning tokens, cached input tokens, and estimated cost. Token counts are best-effort from OpenCode/provider output; write `unknown` rather than omitting unavailable fields.

3. If a provider failed or left no target-file diff, make sure it is recorded as `i18n rejected(...)`, not a candidate.
4. Judge only real candidate commits that changed the translated MDX:

   ```sh
   bun run i18n:judge -- --slug the-last-to-think --locale es --model openrouter/google/gemini-3-flash-preview
   ```

   Keep judge timeouts at 240 seconds for this translation pipeline unless there is a deliberate reason to shorten one.

5. If the judge breaks inherited asset paths, fix them with parent-relative paths and commit as `i18n final(...)`.
6. Validate:

   ```sh
   bun run content:check
   bun run fix-quizzes
   bun run check
   bun run build
   bun test src/scripts/redirectManager.test.ts src/shared/i18n.test.ts
   ```

   For non-quiz articles, `fix-quizzes` may be skipped when no quiz files changed.

## Commit Subjects

- `i18n candidate(es): slug via openrouter/qwen/qwen3.6-plus`
- `i18n rejected(es): slug via openrouter/google/gemini-3-flash-preview`
- `i18n judge(es): select translation for slug`
- `i18n final(es): polish slug`
- `i18n final(es): fix inherited asset paths for slug`

## Quality Checks

- Build must emit the localized route, for example `/es/the-last-to-think/index.html`.
- The localized HTML should have `html lang`, self-canonical, `hreflang` alternates, and `x-default` pointing at English.
- Missing translations should redirect to English; real translations must not retain stale fallback redirects.
- Reports should live under `reports/i18n/{slug}/{locale}/`.
- `judge-summary.md` should list candidate SHAs and omit rejected/no-output commits from candidate comparisons.

For the full project playbook, read `docs/translations.md`.

Regenerate model performance stats with:

```sh
bun run i18n:report:models
```
