# i18n Eval Suite

Offline eval harness for the translation pipeline. Runs real LLM inferences with cheap models against fixed source fixtures, scores outputs with a lightweight judge, and records results to `reports/i18n/evals/`.

No Braintrust account required. All results are local JSONL + markdown.

## When to run

- After editing any prompt in `src/scripts/i18n/prompts.ts`
- After editing judge prompt builders in `src/scripts/i18n/judge-utils.ts`
- Before merging changes to translation or judge logic
- Periodically to track prompt quality drift across model upgrades

## Quick start

```sh
# Dry-run: list cases without spending tokens
bun run i18n:eval -- --dry-run

# Run all fixtures with defaults
bun run i18n:eval

# Single locale
bun run i18n:eval -- --locale es

# Swap translation model
bun run i18n:eval -- --translation-model openrouter/qwen/qwen3-32b:nitro

# Swap both models independently
bun run i18n:eval -- \
  --translation-model openrouter/deepseek/deepseek-v4-flash \
  --judge-model openrouter/google/gemini-2.0-flash-001

# One suite only
bun run i18n:eval -- --suite translation
```

## Flags

| Flag | Default | Description |
|------|---------|-------------|
| `--model` | see below | Sets both `--translation-model` and `--judge-model` at once |
| `--translation-model` | `openrouter/openai/gpt-oss-120b:nitro` | Model used to produce translations |
| `--judge-model` | `deepseek/deepseek-v4-flash` | Model used to score translations |
| `--locale` | all | Filter to one locale (`es`, `ja`, `zh`, `fr`, …) |
| `--suite` | `all` | `translation`, `judge`, or `all` |
| `--dry-run` | false | Print cases and exit without calling any model |

## Outputs

Each run writes two files under `reports/i18n/evals/`:

```
reports/i18n/evals/
├── eval-run-<ISO-timestamp>.jsonl        # one JSON line per case
└── eval-run-<ISO-timestamp>-summary.md  # human-readable pass/fail table
```

JSONL fields per row:

```json
{
  "at": "2026-05-14T…",
  "id": "basic-mdx-article-es",
  "suite": "translation",
  "locale": "es",
  "translationModel": "openrouter/openai/gpt-oss-120b:nitro",
  "judgeModel": "deepseek/deepseek-v4-flash",
  "passed": true,
  "overallScore": 84.2,
  "minScore": 70,
  "rubricResults": [
    { "rule": "mustPreserve: \"```ts\"", "passed": true }
  ],
  "durationMs": 4200,
  "inputTokens": 1100,
  "outputTokens": 680,
  "providerCostUsd": 0.00004
}
```

## Suites

### `translation`

Runs the full translation prompt (system + user, as built by `buildSystemPrompt` / `buildUserPrompt` in `prompts.ts`) and checks each output against a rubric + a minimum judge score.

Each fixture specifies:

- **`mustPreserve`** — strings or regexes that must appear in the output (e.g. preserved code fences, import paths, JSX prop names)
- **`mustNotContain`** — strings or regexes that must not appear (e.g. the original English title, bare `./` asset paths)
- **`minScore`** — minimum acceptable overall judge score (0–100); a case fails if the judge returns a score below this threshold

Current fixtures:

| ID | Locale | What it tests |
|----|--------|---------------|
| `basic-mdx-article-es` | `es` | Code fence preservation, heading structure, title translation |
| `quiz-challenge-ja` | `ja` | `<Challenge>` prop preservation (`index`, `client:visible`, `isAnswer`), import path depth |
| `asset-paths-zh` | `zh` | `./` → `../` asset path rewriting in markdown, HTML, and frontmatter |
| `heading-structure-fr` | `fr` | H1/H2/H3 count preservation |

### `judge`

Reserved for deterministic judge/validator failure-state fixtures — cases where a known-bad translation should produce low scores or specific issue codes. Not yet populated; add cases here as regressions are discovered.

## Scoring

The eval runner asks the judge model to score each translation using the same JSON shape as the production judge (`judge-utils.ts: getJudgeJsonShape()`). Scores are on a 0–100 scale across six dimensions:

| Dimension | What it measures |
|-----------|-----------------|
| `readability` | Native flow, idiom, sentence clarity |
| `technicalAccuracy` | Preserves technical meaning, constraints, warnings |
| `coherence` | Consistent terminology, argument flow |
| `relevance` | No hallucinated content, no omissions |
| `translationQuality` | Natural target-language register + Dan's direct voice |
| `mdxPreservation` | MDX/JSX structural correctness |
| `culturalAdaptation` | Locale-appropriate cultural register |
| `languagePurity` | No untranslated reader-facing prose leaking through |

The overall score is the arithmetic mean of all dimensions that the judge returns. Cases with a missing or un-parseable judge response still check rubric rules; the score threshold is skipped with a warning.

## Adding fixtures

Add an entry to `TRANSLATION_FIXTURES` in `src/scripts/i18n/eval-prompts.ts`:

```ts
{
  id: "my-new-fixture-de",
  slug: "my-article-slug",
  locale: "de",
  isQuiz: false,
  source: `---\ntitle: My Article\n---\n\nBody text…`,
  mustPreserve: [
    "```ts",          // code fence must survive
    /^## /m,          // at least one H2 must appear
  ],
  mustNotContain: [
    "My Article",     // title should be translated
  ],
  minScore: 70,
}
```

Keep fixtures small (< 30 lines of source). They are meant to be fast and cheap, not exhaustive.

## Unit tests (offline, no LLM)

The companion test file `src/scripts/i18n/judge.test.ts` covers all pure functions in `judge-utils.ts` without any network calls:

```sh
bun test src/scripts/i18n/judge.test.ts
```

Covered areas:

- JSON extraction from bare output, fenced blocks, and usage-line-prefixed output
- `parseSelectedCommit` — SHA extraction from JSON and prose patterns
- Score normalization (clamping, rounding, missing keys, string coercion)
- Priority normalization (`critical → high`, unknown → undefined)
- Suggestion normalization — current schema and legacy `severity/current/suggested` schema
- Candidate selection with hint fallback
- Escalation logic — all signal paths including multilingual disagree markers
- All four prompt builder functions — presence of required instructions, locale/slug substitution, hint-commit behavior

## Key source files

| File | Role |
|------|------|
| `src/scripts/i18n/eval-prompts.ts` | Eval runner — fixtures, rubric checks, LLM calls, reporting |
| `src/scripts/i18n/judge-utils.ts` | Pure functions used by both `judge.ts` and `eval-prompts.ts` |
| `src/scripts/i18n/judge.ts` | Production judge script (imports from `judge-utils.ts`) |
| `src/scripts/i18n/prompts.ts` | Translation prompt builders (`buildSystemPrompt`, `buildUserPrompt`) |
| `src/scripts/i18n/judge.test.ts` | Offline unit tests for judge scoring loop |
| `reports/i18n/evals/` | Eval run output (JSONL + markdown summaries) |
