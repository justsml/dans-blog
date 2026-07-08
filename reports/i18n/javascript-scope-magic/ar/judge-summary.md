# Translation Judge Summary

- Slug: javascript-scope-magic
- Locale: ar
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: failed
- Validation scope: local
- Confidence: medium (0.650)
- Confidence signals: low blocking-issue rate; single judge
- High/medium/low issue counts: 0/1/0
- Validation error: Command failed: bun run i18n:validate --slug javascript-scope-magic --locale ar --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug javascript-scope-magic --locale ar --skip-global
103 | 
104 | export function assertTranslationIntegrity(input: IntegrityCheckInput) {
105 |   const issues = analyzeTranslationIntegrity(input).filter((issue) => issue.severity !== "low");
106 |   if (issues.length === 0) return;
107 | 
108 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2015-06-06--javascript-scope-magic/ar/index.mdx failed translation integrity checks:
- [high] html-comment-outside-code: /Users/dan/code/oss/dans-blog/src/content/posts/2015-06-06--javascript-scope-magic/ar/index.mdx:103 uses an HTML comment. Use MDX comments ({/* ... */}) outside code fences.
- [high] html-comment-outside-code: /Users/dan/code/oss/dans-blog/src/content/posts/2015-06-06--javascript-scope-magic/ar/index.mdx:107 uses an HTML comment. Use MDX comments ({/* ... */}) outside code fences.
      at assertTranslationIntegrity (/Users/dan/code/oss/dans-blog/src/scripts/i18n/integrity-checks.ts:108:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:34:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.12
- Input tokens: 6700
- Output tokens: 335
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004355
- Estimated cost: $0.004355

## Judge Suggestions
1. Pass 1: logged medium priority suggestion. Match: "<!-- ## تقنيات عكس التحكم قيد الإعداد -->" Replacement: "{/* ## تقنيات عكس التحكم قيد الإعداد */}" Reason: MDX files should use curly brace comments instead of HTML comments to avoid potential rendering issues or leakage. Note: Exact match not found in selected MDX.

## Candidates
- current src/content/posts/2015-06-06--javascript-scope-magic/ar/index.mdx
- 3b4325a26167e9e485e6caac229d9304a40303ab i18n candidate(ar): javascript-scope-magic via openrouter/deepseek/deepseek-v4-flash
- d93c5c2b6703597c88ea7cffeb6cd8555252c617 i18n candidate(ar): javascript-scope-magic via openrouter/openai/gpt-oss-120b:nitro
