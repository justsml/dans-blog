# Translation Shortfall

- Slug: postgres-fts-vs-pgvector
- Locale: fr
- Target: src/content/posts/2026-05-08--postgres-fts-vs-pgvector/fr/index.mdx
- Status: blocked
- Reason: approved cheap non-GPT OpenCode candidate pool is exhausted before reaching the required 3 successful candidate commits.
- Candidate MDX commits: 2
- Required candidate commits: 3
- Judge status: not run; do not judge with fewer than 3 successful candidates for this batch.
- Timeout used: 180s for earlier attempts, then 240s after the timeout increase request.

## Successful Candidate Commits

- `af5dcba3` openrouter/deepseek/deepseek-v4-flash
- `cbcc5c43` openrouter/google/gemini-2.5-flash-lite

## Approved Cheap Pool Status

No approved cheap non-GPT models remain untried through OpenCode for this target.

| Model | Status | Notes |
|---|---|---|
| openrouter/deepseek/deepseek-v4-flash | successful candidate | `af5dcba3` |
| openrouter/google/gemini-2.5-flash-lite | successful candidate | `cbcc5c43`; succeeded in isolated worktree, then cherry-picked to main |
| openrouter/google/gemini-3-flash-preview | rejected | validation failed; code fence count changed |
| openrouter/google/gemini-3.1-flash-lite-preview | rejected | timed out / missing usable output |
| openrouter/qwen/qwen3.5-flash-02-23 | rejected | touched unrelated files |
| openrouter/qwen/qwen3.6-plus | rejected | timed out |
| openrouter/z-ai/glm-4.7-flash | rejected | touched unrelated locale files |
| openrouter/z-ai/glm-5-turbo | rejected | missing output / stopped after status check because it was not a new untried model |
| openrouter/minimax/minimax-m2.7 | rejected | timed out |
| openrouter/minimax/minimax-m2.5 | rejected | timed out / command failed after partial edits |

## Excluded Models Previously Attempted

- openrouter/anthropic/claude-haiku-4.5: outside the current user-approved candidate pool for this run.
- openrouter/moonshotai/kimi-k2.6: outside the current user-approved candidate pool for this run.
- openrouter/qwen/qwen3-coder-flash: excluded by the user instruction to avoid this model family variant for translations.

## Stop Condition

Stop here rather than burning more attempts. The target has fewer than 3 successful cheap candidates, so the two-cheap-judge process has not been run.
