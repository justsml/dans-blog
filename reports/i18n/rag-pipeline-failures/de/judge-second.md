# I18n Judge Report (Second Opinion): rag-pipeline-failures (de)

## Candidates

| Commit | Model | Observations |
|--------|-------|-------------|
| `ccd4a258` | openrouter/qwen/qwen3.6-plus | Best overall: correct "Du" tone matching Dan's direct style, full frontmatter preserved, good technical precision. Minor roughness in a few phrasings but structurally sound. |
| `07c4c645` | openrouter/qwen/qwen3.5-flash-02-23 | Weaker: switched to formal "Sie", introduced grammatical errors ("Sie einbetten"), translated controlled taxonomy fields (`category: KI`, `tags: [vektorsuche, ...]`). |
| `0a177fb7` | openrouter/google/gemini-3-flash-preview | **Critical failure**: stripped essential frontmatter (`date`, `modified`, `tags`, `category`, `subCategory`, `draft`, `unlisted`, `hidden`, `publish`, `popularity`, `social_image`, `cover_*`). Lost asset paths. |

## Decision

**Agree with first judge: `ccd4a258` (qwen3.6-plus) is the correct selection.**

## Significant Issues Requiring Escalation

### CRITICAL: `0a177fb7` — Stripped frontmatter

Commit `0a177fb7` (gemini-3-flash-preview) is currently checked in as HEAD at `src/content/posts/2026-05-05--rag-pipeline-failures/de/index.mdx`. It removed 13 of 16 frontmatter fields, retaining only `title`, `subTitle`, and the opening/closing `---`. This means:

- No `date` → Astro cannot sort this post
- No `tags`/`category`/`subCategory` → broken taxonomy, visibility, and routing
- No `draft`/`unlisted`/`hidden`/`publish` → visibility flags missing
- No `social_image`/`cover_*` → broken hero imagery
- No `popularity` → sorting broken

**This file must not be deployed as-is.** It needs to be reverted to `ccd4a258` content or have a proper `i18n final` commit applied that restores `ccd4a258`'s full frontmatter and asset paths.

### No polish was ever committed

The first judge report says "Polish Applied" but no such commit exists. The working tree is still `0a177fb7`'s broken output. A follow-up `i18n final(...)` commit is needed to apply the winning candidate (`ccd4a258`) and any desired polish.

## Summary

| Aspect | Verdict |
|--------|---------|
| Best translation | `ccd4a258` (qwen3.6-plus) — idiomatic, technically accurate, correct tone |
| Worst candidate | `0a177fb7` — frontmatter destruction is a hard blocker |
| Current HEAD state | `0a177fb7` — **must be replaced** before build |
| Action required | Checkout/revert to `ccd4a258` or author `i18n final` commit with ccd4a258's content |
