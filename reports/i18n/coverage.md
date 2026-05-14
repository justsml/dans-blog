# I18n Coverage

Generated at `2026-05-14T02:11:53.473Z`.

## Summary

- English posts: 75
- Translation slots: 150/150 filled (100.0%)
- Missing slots: 0
- Fully translated posts: 75/75
- Locales: ar, he

## Locale Coverage

| Locale | Filled | Missing | Coverage |
| --- | ---: | ---: | ---: |
| ar | 75 | 0 | 100.0% |
| he | 75 | 0 | 100.0% |

## Zero Coverage Posts

No zero-coverage posts.

## Health Notes

- Missing locale slots with candidate reports waiting: 0
- Existing translations without judge summaries: 16

### Candidate Reports Without Translation Files

No waiting candidate reports found.

### Translations Without Judge Summaries

| Post | Locale | Qwen baseline |
| --- | --- | --- |
| llm-connection-strings | ar | no |
| llm-connection-strings | he | no |
| llm-evals-are-broken | ar | no |
| llm-evals-are-broken | he | no |
| postgres-text-search-guide | ar | no |
| postgres-text-search-guide | he | no |
| semantic-vector-search-landscape | ar | no |
| semantic-vector-search-landscape | he | no |
| securing-clawdbot-tailscale | ar | no |
| securing-clawdbot-tailscale | he | no |
| ai-sdk-math-tool | ar | no |
| ai-sdk-math-tool | he | no |
| mastra-workflows-memory | ar | no |
| mastra-workflows-memory | he | no |
| mastra-mcp-tool-integrations | ar | no |
| mastra-mcp-tool-integrations | he | no |

## Prioritized Gaps

| Priority | Post | Category | Date | Filled | Missing locales | Reports waiting |
| --- | --- | --- | --- | ---: | --- | ---: |

## Translation Queue Commands

```sh
bun run i18n:qwen:baseline -- --missing-only --limit 10
bun run i18n:translate:all-missing -- --min-candidates 2 --limit 5
bun run i18n:report:models
bun run i18n:coverage
```
