# Translation Judge Summary

- Slug: breaking-unicorns
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: low (0.327)
- Confidence signals: 4 high and 0 medium issues; single judge
- High/medium/low issue counts: 4/0/0
- Validation error: Command failed: bun run i18n:validate --slug breaking-unicorns --locale de --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug breaking-unicorns --locale de --skip-global
224 | export function assertStructuralParity(input: CompareMdxStructureInput) {
225 |   const comparison = compareMdxStructure(input);
226 |   if (comparison.valid) return;
227 | 
228 |   const targetLabel = input.targetPath ?? "translation";
229 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2024-09-01--breaking-unicorns/de/index.mdx failed structural parity with score 0.965 (minimum 0.980). /Users/dan/code/oss/dans-blog/src/content/posts/2024-09-01--breaking-unicorns/de/index.mdx: Link count or href sequence changed across Markdown/HTML link formats. Differences: {"linkTargets":4}. Differences: {"linkTargets":4}
      at assertStructuralParity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/structural-validation.ts:229:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:29:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.52
- Input tokens: 11859
- Output tokens: 395
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.007115
- Estimated cost: $0.007115

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.24
- Input tokens: 9079
- Output tokens: 483
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005988
- Estimated cost: $0.005988

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[Unternehmenstheater 🎭](#enterprise-theater-)" Replacement: "[Unternehmenstheater 🎭](#unternehmenstheater-)" Reason: The link fragment must match the localized heading slug. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "[Die Bar höher legen 💪](#raising-the-bar-)" Replacement: "[Die Bar höher legen 💪](#die-bar-höher-legen-)" Reason: The link fragment must match the localized heading slug. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied high priority suggestion. Match: "[Bist du disruptiv? 🚀](#are-you-disrupted-)" Replacement: "[Bist du disruptiv? 🚀](#bist-du-disruptiv-)" Reason: The link fragment must match the localized heading slug. Note: Applied exact replacement to selected MDX.
4. Pass 1: applied high priority suggestion. Match: "[Von Buchclubs erdrosselt 📚](#book-clubbed-to-death-)" Replacement: "[Von Buchclubs erdrosselt 📚](#von-buchclubs-erdrosselt-)" Reason: The link fragment must match the localized heading slug. Note: Applied exact replacement to selected MDX.
5. Pass 2: logged high priority suggestion. Match: "[Unternehmenstheater 🎭](#enterprise-theater-)" Replacement: "[Unternehmenstheater 🎭](#unternehmenstheater-)" Reason: The link fragment must match the localized heading slug. Note: Exact match not found in selected MDX.
6. Pass 2: logged high priority suggestion. Match: "[Die Bar höher legen 💪](#raising-the-bar-)" Replacement: "[Die Bar höher legen 💪](#die-bar-höher-legen-)" Reason: The link fragment must match the localized heading slug. Note: Exact match not found in selected MDX.
7. Pass 2: logged high priority suggestion. Match: "[Bist du disruptiv? 🚀](#are-you-disrupted-)" Replacement: "[Bist du disruptiv? 🚀](#bist-du-disruptiv-)" Reason: The link fragment must match the localized heading slug. Note: Exact match not found in selected MDX.
8. Pass 2: logged high priority suggestion. Match: "[Von Buchclubs erdrosselt 📚](#book-clubbed-to-death-)" Replacement: "[Von Buchclubs erdrosselt 📚](#von-buchclubs-erdrosselt-)" Reason: The link fragment must match the localized heading slug. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2024-09-01--breaking-unicorns/de/index.mdx
- 1eb6b4de53b09d972526b6748450761489bd7fae i18n candidate(de): breaking-unicorns via openrouter/openai/gpt-oss-120b:nitro
- 67148c78de7ed95df7b6c0daff5db46febf2a529 i18n candidate(de): breaking-unicorns via openrouter/qwen/qwen3-32b:nitro
- a59be6644861f75769295fa28290899d71c59d0b i18n candidate(de): breaking-unicorns via deepseek/deepseek-v4-flash
