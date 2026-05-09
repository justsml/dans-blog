---
name: article-i18n-translator
description: Generate and judge DanLevy.net article translations with OpenCode/OpenRouter candidate models, locale-prefixed Astro routes, and full Git provenance. Use when translating posts, adding i18n candidates, judging translations, preserving messy model history, or debugging translated article routing.
---

# Article I18n Translator

Use this skill for DanLevy.net article translation work. The priority is not only a good translated page; it is a traceable history of model attempts, judge decisions, rejections, and final fixes.

## Core Rules

- Use Bun scripts only. Never use npm or yarn.
- Keep English slugs permanently. English routes stay unprefixed, translated routes use `/{locale}/{base-slug}/`.
- Store translated files next to the English post: `src/content/posts/YYYY-MM-DD--slug/{es,hi,ja}/index.mdx`.
- Preserve full Git history. Commit candidate outputs, rejected attempts, judge passes, and final fixes as normal commits. Do not squash.
- Do not edit `public/_redirects` by hand. Let build-generated redirects update it.
- Preserve MDX structure, imports, components, props, code blocks, URLs, anchors, and asset paths.
- Translate reader-facing prose, frontmatter `title` and `subTitle`, image alt text, quiz text, options, and explanations.
- Use parent-relative asset paths in nested locale folders, for example `../banner.webp`.

## Model Set

Default candidate models live in `src/scripts/i18n/translate-candidates.ts`.

Current OpenRouter candidates:

- `openrouter/qwen/qwen3.6-plus`
- `openrouter/moonshotai/kimi-k2.6`
- `openrouter/google/gemini-3-flash-preview`
- `openrouter/z-ai/glm-5.1`
- `openrouter/minimax/minimax-m2.7`

Note: `minimax-m2.6` was requested, but OpenCode's OpenRouter catalog did not expose that ID during setup. Use the nearest available MiniMax model unless the catalog changes.

Judge with a cheap OpenAI-class model first, currently:

- `openrouter/openai/gpt-5.4-mini`

## Standard Workflow

1. Check `git status --short`. Work with any user changes; do not revert unrelated files.
2. Run candidates:

   ```sh
   bun run i18n:translate:candidates -- --slug the-last-to-think --locale es
   ```

   OpenCode calls default to a 90 second timeout. Use `--timeout-seconds 60` or `--timeout-seconds 90` explicitly for batch work. Thinking-capable models should stay cheap: Qwen and GLM run with `--variant low`, Gemini 3 Flash runs with `--variant minimal`.

3. If a provider failed or left no target-file diff, make sure it is recorded as `i18n rejected(...)`, not a candidate.
4. Judge only real candidate commits that changed the translated MDX:

   ```sh
   bun run i18n:judge -- --slug the-last-to-think --locale es --model openrouter/openai/gpt-5.4-mini
   ```

   GPT-5-class judges run with `--variant low` by default. Keep judge timeouts at 60 or 90 seconds unless there is a deliberate reason to let one run longer.

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
