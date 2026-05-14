# i18n Eval Suite

Offline eval harness for the translation pipeline. Runs real LLM inferences with cheap models against real corpus articles, scores outputs with deterministic integrity checks plus a lightweight LLM judge, and records results to `reports/i18n/evals/`.

No Braintrust account required. All results are local JSONL + markdown.

## When to run

- After editing any prompt in `src/scripts/i18n/prompts.ts`
- After editing judge prompt builders in `src/scripts/i18n/judge-utils.ts`
- Before merging changes to translation or judge logic
- Periodically to catch prompt quality drift across model upgrades

## Quick start

```sh
# Dry-run: list cases without spending tokens
bun run i18n:eval -- --dry-run

# Run defaults (newest article + newest quiz, locale=es)
bun run i18n:eval

# Single locale
bun run i18n:eval -- --locale ja

# Pin to a specific article or quiz slug
bun run i18n:eval -- --article-slug postgres-fts-vs-pgvector
bun run i18n:eval -- --quiz-slug quiz-modern-css-2025
bun run i18n:eval -- --slug stop-hardcoding-your-prompts   # auto-detects kind

# One kind only
bun run i18n:eval -- --kind article
bun run i18n:eval -- --kind quiz

# Swap translation model
bun run i18n:eval -- --translation-model openrouter/qwen/qwen3-32b:nitro
bun run i18n:eval -- --translation-model 32b

# Swap both models independently
bun run i18n:eval -- \
  --translation-model nitro \
  --judge-model flash
```

## Flags

| Flag | Default | Description |
| --- | --- | --- |
| `--model` | — | Sets both `--translation-model` and `--judge-model` at once |
| `--translation-model` | `openrouter/openai/gpt-oss-120b:nitro` | Model used to produce translations |
| `--judge-model` | `deepseek/deepseek-v4-flash` | Model used to score translations |
| `--locale` | `es` | Target locale (`es`, `ja`, `zh`, `fr`, `de`, …) |
| `--kind` | `all` | `article`, `quiz`, or `all` |
| `--slug` | — | Pin to a specific slug (auto-detects article vs quiz) |
| `--article-slug` | — | Pin the article case to this slug |
| `--quiz-slug` | — | Pin the quiz case to this slug |
| `--dry-run` | false | Print selected cases and exit without calling any model |

Model flags accept either full OpenRouter IDs or loose case-insensitive substrings. Loose input resolves to the first match in the shared cheap/fast translation model list, so `nitro` becomes `openrouter/openai/gpt-oss-120b:nitro`, `32b` becomes `openrouter/qwen/qwen3-32b:nitro`, and `flash` becomes `openrouter/deepseek/deepseek-v4-flash`.

## Input: real corpus posts

The eval runner reads from the live `src/content/posts` corpus — no synthetic fixtures. By default it selects:

- The **newest visible, published non-quiz article**
- The **newest visible, published quiz**

Posts marked `draft: true`, `hidden: true`, `publish: false`, or `unlisted: true` are excluded. Future-dated posts are also excluded.

This means eval results reflect real article complexity and real quiz structure, including any quirks in your actual content.

## Outputs

Each run writes two files under `reports/i18n/evals/`:

```text
reports/i18n/evals/
├── eval-run-<ISO-timestamp>.jsonl        # one JSON line per case
└── eval-run-<ISO-timestamp>-summary.md  # human-readable pass/fail table
```

JSONL fields per row:

```json
{
  "at": "2026-05-14T…",
  "id": "article:stop-hardcoding-your-prompts:es",
  "kind": "article",
  "locale": "es",
  "slug": "stop-hardcoding-your-prompts",
  "translationModel": "openrouter/openai/gpt-oss-120b:nitro",
  "judgeModel": "deepseek/deepseek-v4-flash",
  "passed": true,
  "overallScore": 84.2,
  "llmJudgeScore": 88.5,
  "deterministicScore": 75.0,
  "minScore": 72,
  "deterministicScores": [
    { "name": "frontmatter-preserved", "score": 100, "passed": true, "severity": "high" },
    { "name": "title-translated", "score": 100, "passed": true, "severity": "medium" },
    { "name": "no-wrapper-text", "score": 100, "passed": true, "severity": "high" }
  ],
  "durationMs": 4200,
  "inputTokens": 1100,
  "outputTokens": 680,
  "providerCostUsd": 0.00004
}
```

## Scoring model

Each case produces two score tracks that are combined into an overall score.

### Deterministic scorers

Run by `runDeterministicScorers` in `eval-prompts.ts`, powered by `analyzeTranslationIntegrity` from `integrity-checks.ts`. No LLM calls.

| Scorer | Severity | What it checks |
| --- | --- | --- |
| `integrity:*` | high/medium/low | Structural issues from `analyzeTranslationIntegrity`: heading count drift, bare asset paths, LLM instruction leakage, code fence count, etc. |
| `frontmatter-preserved` | high | Output must start with `---` frontmatter delimiters |
| `title-translated` | medium | Frontmatter `title:` must not be identical to the English source title |
| `no-wrapper-text` | high | Output must not start with wrapper prose (`"Here is…"`, `"Sure!"`) or a raw fence |

A case **fails** if any high- or medium-severity deterministic scorer fails, regardless of LLM score.

### LLM judge score

The judge model scores the translation on eight dimensions (0–100 each):

| Dimension | What it measures |
| --- | --- |
| `readability` | Native flow, idiom, sentence clarity |
| `technicalAccuracy` | Preserves technical meaning, constraints, warnings |
| `coherence` | Consistent terminology, argument flow |
| `relevance` | No hallucinated content, no omissions |
| `translationQuality` | Natural register + Dan's direct voice |
| `mdxPreservation` | MDX/JSX structural correctness |
| `culturalAdaptation` | Locale-appropriate cultural register |
| `languagePurity` | No untranslated reader-facing prose leaking through |

The overall score is: `(llmJudgeScore × 0.7) + (deterministicScore × 0.3)`.

If the judge call fails or returns no parseable scores, the overall score falls back to the deterministic score alone, and the LLM threshold is skipped with a warning.

A case **fails** if `llmJudgeScore < minScore` (default: 72).

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
| --- | --- |
| `src/scripts/i18n/eval-prompts.ts` | Eval runner — corpus selection, scorers, LLM calls, reporting |
| `src/scripts/i18n/integrity-checks.ts` | Deterministic structural integrity checks used by scorers |
| `src/scripts/i18n/judge-utils.ts` | Pure functions shared by `judge.ts` and `eval-prompts.ts` |
| `src/scripts/i18n/judge.ts` | Production judge script |
| `src/scripts/i18n/prompts.ts` | Translation prompt builders (`buildSystemPrompt`, `buildUserPrompt`) |
| `src/scripts/i18n/judge.test.ts` | Offline unit tests for judge scoring loop |
| `reports/i18n/evals/` | Eval run output (JSONL + markdown summaries) |
