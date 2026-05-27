# GPT-OSS 120B Nitro Tuning Experiment - 2026-05-21

Goal: improve `openrouter/openai/gpt-oss-120b:nitro` i18n success rate and reduce high-priority judge issues.

## Corpus Slice

- Model: `openrouter/openai/gpt-oss-120b:nitro`
- Judge: `openrouter/google/gemini-3-flash-preview`
- Locale: `es`
- Cases: current visible article + quiz selected by `bun run i18n:eval -- --kind all --locales es`
- Article: `into-the-breach`
- Quiz: `quiz-advanced-js-error-mastery`

## Variants

| Variant | Run | Profiles | Article | Quiz | Notes |
| --- | --- | --- | --- | --- | --- |
| `baseline-no-profile` | `reports/i18n/evals/eval-run-2026-05-21T19-46-30-475Z` | disabled | pass, 99.4 overall, 98.1 judge | fail, 94.5 overall, 97.3 judge | Quiz blocked by high judge suggestions for English option prose. |
| `profile-v1` | `reports/i18n/evals/eval-run-2026-05-21T19-47-06-937Z` | article + quiz active | fail, 75.6 overall, 57.5 judge | fail, 92.0 overall, 90.0 judge | Article profile was harmful; archived. |
| `profile-v2-quiz-only-heuristic-fix` | `reports/i18n/evals/eval-run-2026-05-21T19-49-09-009Z` | quiz active, article archived | fail, 75.6 overall, 57.5 judge | fail, 80.4 overall, 93.1 judge | Quiz profile produced malformed import/code-option failures; archived. |
| `settings-heuristic-v3-no-profile` | `reports/i18n/evals/eval-run-2026-05-21T19-50-16-536Z` | disabled | fail, 94.5 overall, 97.5 judge | fail, 94.5 overall, 97.5 judge | Remaining blockers were frontmatter/title/spacing polish, not structural coverage. |

## Findings

- The first prompt-profile attempt did not improve GPT-OSS. It made article coverage much worse, so both GPT-OSS profiles are archived.
- The useful changes are code/pipeline guardrails:
  - production GPT-OSS now defaults to `temperature=0.1`;
  - reasoning output is excluded for reasoning-capable OpenRouter models, matching eval behavior;
  - production candidate generation can consume prompt profiles, but no GPT-OSS profile is active after this run;
  - quiz code-like option preservation is narrower, so mixed prose like `Throws a TypeError` can translate the prose while preserving the term;
  - deterministic integrity checks now use the same narrower code-like option heuristic;
  - eval output now records `experimentId`, `variantId`, and resolved prompt profiles in `run.jsonl`.

## Next Bet

The v3 run had strong judge scores but still failed on frontmatter polish:

- article: unchanged idiomatic title tripped `title-translated`;
- quiz: frontmatter subtitle spacing triggered a high judge suggestion.

Next targeted experiment should isolate frontmatter handling:

```sh
bun run i18n:eval -- \
  --models openrouter/openai/gpt-oss-120b:nitro \
  --kind all \
  --locales es \
  --no-prompt-profile \
  --experiment-id gptoss-tuning-2026-05-21 \
  --variant-id frontmatter-spacing-v4
```

