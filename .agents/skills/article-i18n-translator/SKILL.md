---
name: article-i18n-translator
description: Generate and judge DanLevy.net article translations with AI SDK/OpenRouter candidate models, locale-prefixed Astro routes, and full Git provenance. Use when translating posts, adding i18n candidates, judging translations, preserving messy model history, or debugging translated article routing.
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
- `openrouter/openai/gpt-oss-120b:nitro`
- `openrouter/qwen/qwen3-32b:nitro`
- `openrouter/z-ai/glm-4.7-flash`
- `openrouter/minimax/minimax-m2.5`
- `openrouter/minimax/minimax-m2.7`
- `openrouter/google/gemini-3-flash-preview`
- `openrouter/deepseek/deepseek-v3.2`
- `openrouter/z-ai/glm-5-turbo`

OpenRouter pricing checked on 2026-05-13 showed `openrouter/openai/gpt-oss-120b:nitro` at $0.039/M input and $0.18/M output tokens, and `openrouter/qwen/qwen3-32b:nitro` at $0.08/M input and $0.24/M output tokens. Both sit after the current primary Qwen and DeepSeek candidates in the cheap pool.

GLM 5 Turbo is now a fallback, not an early default; OpenRouter pricing checked on 2026-05-10 showed Qwen 3.6 Plus cheaper than GLM 5 Turbo.

Older candidates retained in history:

- `openrouter/google/gemma-4-26b-a4b-it`
- `openrouter/google/gemma-4-31b-it`
- `openrouter/deepseek/deepseek-v4-pro`
- `openrouter/moonshotai/kimi-k2.6`
- `openrouter/z-ai/glm-5.1`

Judge with Gemini Flash by default:

- `openrouter/google/gemini-3-flash-preview`

For higher-risk batches, add a second cheap judge explicitly with `--second-model`. Escalate with `--escalate-model openrouter/anthropic/claude-sonnet-4.6` or `--escalate-model openrouter/google/gemini-3-pro-preview` only when the second judge disagrees or the cheap judge output is structurally suspect. Judge summaries should record runtime, tokens, thinking tokens, cached tokens, and estimated cost.

## Standard Workflow

1. Check `git status --short`. Work with any user changes; do not revert unrelated files.
2. Run candidates:

   ```sh
   bun run i18n:translate:candidates -- --slug the-last-to-think --locale es
   ```

   Candidate generation captures every successful slug+locale+model attempt as a timestamped artifact and appends it to `candidates.jsonl`; judging owns promotion back into `src/content`.

   AI SDK translation and judge calls default to a 240 second timeout. Use `--timeout-seconds 240` explicitly for batch work. Thinking-capable models should stay cheap: Qwen, gpt-oss, and GLM run with low reasoning effort; Gemini 3 Flash runs with minimal reasoning effort.

   Article translation chunks default to `10p`: ten paragraphs per active chunk, with one neighboring source paragraph before and after as context padding when available. Stable translation instructions, locale guidance, and article/quiz context should live in cacheable prompt blocks; dynamic prompt text should contain only per-chunk or per-question material. Quiz posts ignore chunk padding because they use structured Challenge input/output.

   Each model report should include runtime seconds, input tokens, output tokens, thinking/reasoning tokens, cached input tokens, and estimated cost. Token counts are best-effort from provider output; write `unknown` rather than omitting unavailable fields.

   OpenRouter usage metadata is read from `usage.prompt_tokens`, `usage.completion_tokens`, `usage.total_tokens`, `usage.cost` in OpenRouter credits, `usage.prompt_tokens_details.cached_tokens`, `usage.prompt_tokens_details.cache_write_tokens`, and `usage.completion_tokens_details.reasoning_tokens`.

   For quiz posts, run competing Nitro candidates through the normal candidate wrapper so the outputs are committed and judgeable:

   ```sh
   bun run i18n:translate:candidates -- \
     --slug javascript-promises-quiz \
     --locale ja \
     --models openrouter/openai/gpt-oss-120b:nitro,openrouter/qwen/qwen3-32b:nitro \
     --quiz-concurrency 18 \
     --challenge-retries 2 \
     --timeout-seconds 240
   ```

   Judge only the last two or three candidate commits with `--candidate-limit`:

   ```sh
   bun run i18n:judge -- \
     --slug javascript-promises-quiz \
     --locale ja \
     --candidate-limit 2 \
     --model openrouter/google/gemini-3-flash-preview \
     --timeout-seconds 240
   ```

   Judge calls compare at most three candidate commits at a time and include any existing translated file as `<current>` context. The judge wrapper appends every judge call and automatic fix application to `reports/i18n/{slug}/judgements.jsonl`, next to the article-level `candidates.jsonl`.

   Automatic pre-publish fixes loop until no medium/high-priority issues remain or `--fix-pass-limit` is reached. The default limit is 2.

   The candidate TUI can launch a parallel judge pass with `--judge`, or with `j` while the dashboard is open. It uses `--task-concurrency` to run separate slug/locale eval+fix loops in parallel.

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
