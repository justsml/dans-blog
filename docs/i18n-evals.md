# i18n Eval Suite

Offline eval harness for the translation pipeline. Runs real LLM inferences with cheap models against real corpus articles, scores outputs with deterministic integrity checks plus a lightweight LLM judge, and records results to `reports/i18n/evals/`.

Works offline (JSONL + markdown) or with Braintrust when `BRAINTRUST_API_KEY` is set.

## Braintrust integration

Set `BRAINTRUST_API_KEY` in `.env` and every `runEval` call is automatically wrapped in a `traced` span logged to the `danlevy.net` project. Each (input × model) pair becomes a scored experiment row. LLM calls inside the span are auto-traced via `wrapAISDK`. Without the key, everything runs offline as before.

```sh
BRAINTRUST_API_KEY=sk-... bun run i18n:eval
```

## When to run

- After editing any prompt in `src/scripts/i18n/prompts.ts`
- After editing judge prompt builders in `src/scripts/i18n/judge-utils.ts`
- Before merging changes to translation or judge logic
- Periodically to catch prompt quality drift across model upgrades

## Quick start

```sh
# Dry-run: list cases without spending tokens
bun run i18n:eval -- --dry-run

# Run defaults (newest article + newest quiz, locale=es, two models)
bun run i18n:eval

# Multiple locales — each becomes its own set of eval cases
bun run i18n:eval -- --locales es,ja,zh

# Compare multiple models in parallel against the same inputs
bun run i18n:eval -- --models openrouter/qwen/qwen3-32b:nitro,openrouter/deepseek/deepseek-v4-flash

# Full matrix: multiple locales × multiple models
bun run i18n:eval -- --locales es,ja --models openrouter/qwen/qwen3-32b:nitro,openrouter/deepseek/deepseek-v4-flash

# Pin to a specific slug
bun run i18n:eval -- --slug stop-hardcoding-your-prompts --locales es

# One kind only
bun run i18n:eval -- --kind article
bun run i18n:eval -- --kind quiz --locales zh

# Override judge model
bun run i18n:eval -- --judge-model openrouter/google/gemini-3-flash-preview
```

## Flags

| Flag | Default | Description |
| --- | --- | --- |
| `--models` | two cheap defaults | Comma-separated translation models to compare in parallel |
| `--judge-model` | `gemini-3-flash-preview` | Model used to score translations |
| `--locales` | `es` | Comma-separated locales (`es,ja,zh`, …) — each is a separate eval axis |
| `--kind` | `all` | `article`, `quiz`, or `all` |
| `--slug` | — | Pin to a specific slug (auto-detects article vs quiz) |
| `--dry-run` | false | Print all cases and exit without calling any model |

## Multi-model, multi-locale comparison

All combinations of `--locales × --models` run in parallel via `Promise.all`. Each `(input × locale × model)` triple is an independent eval case scored by the same shared scorers, so results are directly comparable across any axis.

Default models: `openrouter/openai/gpt-oss-120b:nitro` and `openrouter/deepseek/deepseek-v4-flash`.  
Model names resolve through `model-presets.ts` — short substrings like `nitro` or `flash` are accepted.

## Input: real corpus posts

The eval runner reads from the live `src/content/posts` corpus — no synthetic fixtures. By default it selects:

- The **newest visible, published non-quiz article**
- The **newest visible, published quiz**

Posts marked `draft: true`, `hidden: true`, `publish: false`, or `unlisted: true` are excluded. Future-dated posts are also excluded. Use `--slug` to pin to a specific article.

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
  "inputId": "article:stop-hardcoding-your-prompts:es",
  "kind": "article",
  "locale": "es",
  "slug": "stop-hardcoding-your-prompts",
  "model": "openrouter/openai/gpt-oss-120b:nitro",
  "passed": true,
  "overallScore": 0.87,
  "scores": [
    { "name": "frontmatter-preserved", "score": 1, "passed": true, "severity": "high" },
    { "name": "title-translated",       "score": 1, "passed": true, "severity": "medium" },
    { "name": "no-wrapper-text",        "score": 1, "passed": true, "severity": "high" },
    { "name": "judge:readability",       "score": 0.88, "passed": true, "severity": "low" },
    { "name": "judge:technicalAccuracy", "score": 0.91, "passed": true, "severity": "low" },
    { "name": "judge:coherence",         "score": 0.85, "passed": true, "severity": "low" },
    { "name": "judge:translationQuality","score": 0.87, "passed": true, "severity": "low" },
    { "name": "judge:mdxPreservation",   "score": 0.95, "passed": true, "severity": "low" },
    { "name": "judge:overall",           "score": 0.89, "passed": true, "severity": "medium",
      "details": "Strong technical accuracy, natural register…" }
  ],
  "judgeScores": {
    "readability": 88, "technicalAccuracy": 91, "coherence": 85,
    "translationQuality": 87, "mdxPreservation": 95, "judge:overall": 89
  },
  "durationMs": 4200,
  "inputTokens": 1100,
  "outputTokens": 680,
  "providerCostUsd": 0.00004
}
```

## Scoring model

Every scorer produces a named `Score` entry with `score` (0–1), `passed`, and `severity`. All scores are written to the JSONL and surfaced in the per-result breakdown table in the markdown summary. The overall score is the mean across all entries; a composite is also shown but does not hide the details.

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

Each judge dimension becomes its own `judge:<dim>` scorer entry (severity `low` — individual dimensions don't block by themselves). A `judge:overall` entry (severity `medium`) carries the mean and the judge's rationale snippet. A case fails if `judge:overall` score < `minScore` (default: 72/100) or any high/medium deterministic scorer fails.

If the judge call fails entirely, a single `judge:overall` failure entry is recorded and the LLM threshold is skipped.

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
