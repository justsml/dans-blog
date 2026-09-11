# Translation Judge Summary

- Slug: quiz-postgres-sql-mastery-pt2
- Locale: ru
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: high (0.892)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0
- Validation error: Command failed: bun run i18n:validate --slug quiz-postgres-sql-mastery-pt2 --locale ru --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug "quiz-postgres-sql-mastery-pt2" --locale ru --skip-global
103 | 
104 | export function assertTranslationIntegrity(input: IntegrityCheckInput) {
105 |   const issues = analyzeTranslationIntegrity(input).filter((issue) => issue.severity !== "low");
106 |   if (issues.length === 0) return;
107 | 
108 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-11-28--quiz-postgres-sql-mastery-pt2/ru/index.mdx failed translation integrity checks:
- [high] quiz-option-missing-field: /Users/dan/code/oss/dans-blog/src/content/posts/2024-11-28--quiz-postgres-sql-mastery-pt2/ru/index.mdx Challenge 6 option 3 is missing expected field(s): error.
- [high] quiz-code-option-preservation: /Users/dan/code/oss/dans-blog/src/content/posts/2024-11-28--quiz-postgres-sql-mastery-pt2/ru/index.mdx Challenge 11 changed code-like quiz option "Modifies data & emits plan".
      at assertTranslationIntegrity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/integrity-checks.ts:108:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:38:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 4.81
- Input tokens: 29287
- Output tokens: 512
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.023885
- Estimated cost: $0.023885

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.81
- Input tokens: 17831
- Output tokens: 316
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.014558
- Estimated cost: $0.014558

### Pass 2
- Runtime seconds: 2.20
- Input tokens: 17505
- Output tokens: 113
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.013553
- Estimated cost: $0.013553

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "Хочется еще? Загляните в мою [коллекцию квизов](../challenges/) за порцией бесконечного* веселья!" Replacement: "Хочется еще? Загляните в мою [коллекцию квизов](/challenges/) за порцией бесконечного* веселья!" Reason: Root-relative URL /challenges/ matches the original English post and avoids incorrect relative path resolution. Note: Applied exact replacement to selected MDX.
2. Pass 1: logged medium priority suggestion. Match: "--- Отлично! Вы глубоко погрузились в нюансы PostgreSQL! 🐘 Надеюсь, вы узнали что-то новое или хотя бы набрали достаточно баллов, чтобы было чем похвастаться! 🏆 Хочется еще? З..." Replacement: "Отлично! Вы глубоко погрузились в нюансы PostgreSQL! 🐘 Надеюсь, вы узнали что-то новое или хотя бы набрали достаточно баллов, чтобы было чем похвастаться! 🏆 Хочется еще? Загля..." Reason: Remove extraneous thematic break markers around concluding text that do not exist in the source document. Note: Exact match not found in selected MDX.
3. Pass 2: applied medium priority suggestion. Match: "--- Отлично! Вы глубоко погрузились в нюансы PostgreSQL! 🐘 Надеюсь, вы узнали что-то новое или хотя бы набрали достаточно баллов, чтобы было чем похвастаться! 🏆 Хочется еще? З..." Replacement: "Отлично! Вы глубоко погрузились в нюансы PostgreSQL! 🐘 Надеюсь, вы узнали что-то новое или хотя бы набрали достаточно баллов, чтобы было чем похвастаться! 🏆 Хочется еще? Загля..." Reason: Remove extraneous thematic break markers around concluding text that do not exist in the source document. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-28--quiz-postgres-sql-mastery-pt2/ru/index.mdx
- 1818e718a0004d8ecaaf196d2c19d66aa2b1c2b1 i18n candidate(ru): quiz-postgres-sql-mastery-pt2 via openrouter/deepseek/deepseek-v4-flash
- f1ff75c4712b3b8612eea0854cc0c27fe4cfc303 i18n candidate(ru): quiz-postgres-sql-mastery-pt2 via openrouter/openai/gpt-5.6-luna
- 67af1b0d935ced901a93d7d11b3777845ae55c62 i18n candidate(ru): quiz-postgres-sql-mastery-pt2 via openrouter/openai/gpt-oss-120b:nitro
