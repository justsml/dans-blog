# Translation Shortfall

- Slug: postgres-fts-vs-pgvector
- Locale: ru
- Target: src/content/posts/2026-05-08--postgres-fts-vs-pgvector/ru/index.mdx
- Recorded: 2026-05-09T18:33:19Z
- Worker lane: 1
- Requested minimum real candidates: 3
- Real candidates produced: 0
- Judge status: not run

## Reason

The translation wrapper was run with the standard cheap model pool, but every candidate attempt failed before producing target MDX because this worker environment could not resolve the `opencode` executable.

The rejected provenance commits were preserved for each attempted model. No synthetic translation or judge result was created.

## Attempted Models

- openrouter/google/gemini-3.1-flash-lite-preview
- openrouter/z-ai/glm-5-turbo
- openrouter/anthropic/claude-haiku-4.5
- openrouter/google/gemini-3-flash-preview
- openrouter/google/gemini-2.5-flash-lite
- openrouter/deepseek/deepseek-v4-flash
- openrouter/qwen/qwen3-coder-flash
- openrouter/minimax/minimax-m2.7
- openrouter/minimax/minimax-m2.5
- openrouter/moonshotai/kimi-k2.6

## Validation

- `bun run i18n:validate -- --slug postgres-fts-vs-pgvector --locale ru`: not run because no target translation file exists.
- `bun run check`: passed with 0 errors.
