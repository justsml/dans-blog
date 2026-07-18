# Translation Judge Summary

- Slug: security-agent-model-router
- Locale: he
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
- Validation error: Command failed: bun run i18n:validate --slug security-agent-model-router --locale he --skip-global
$ bun ./src/scripts/i18n/validate.ts --slug security-agent-model-router --locale he --skip-global
210 |     ]
211 |     : [];
212 | 
213 |   if (nestedAssetReferences.length === 0 && bareAssetReferences.length === 0) return;
214 | 
215 |   throw new Error(
                  ^
error: /Users/dan/code/oss/dans-blog/src/content/posts/2026-06-30--security-agent-model-router/he/index.mdx uses asset paths inside a locale folder that do not start with ../. Use ../ for inherited post assets.
      at assertNestedAssetPaths (/Users/dan/code/oss/dans-blog/src/scripts/i18n/localized-mdx.ts:215:13)
      at /Users/dan/code/oss/dans-blog/src/scripts/i18n/validate.ts:33:1
      at loadAndEvaluateModule (2:1)

Bun v1.3.1 (macOS arm64)
error: script "i18n:validate" exited with code 1


## Primary Judge Telemetry
- Runtime seconds: 3.65
- Input tokens: 31118
- Output tokens: 424
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.016831
- Estimated cost: $0.016831

## Judge Suggestions
1. Pass 1: logged high priority suggestion. Match: "img src=\"./docker-lab-score-matrix.svg\"" Replacement: "img src=\"../docker-lab-score-matrix.svg\"" Reason: Localized image paths must start with ../ to resolve correctly from the locale subfolder. Note: Exact match not found in selected MDX.
2. Pass 1: logged high priority suggestion. Match: "img src=\"./cost-quality-frontier.svg\"" Replacement: "img src=\"../cost-quality-frontier.svg\"" Reason: Localized image paths must start with ../ to resolve correctly from the locale subfolder. Note: Exact match not found in selected MDX.
3. Pass 1: logged high priority suggestion. Match: "img src=\"./frontier-tool-behavior.svg\"" Replacement: "img src=\"../frontier-tool-behavior.svg\"" Reason: Localized image paths must start with ../ to resolve correctly from the locale subfolder. Note: Exact match not found in selected MDX.
4. Pass 1: logged high priority suggestion. Match: "img src=\"./command-tool-pass-rates.svg\"" Replacement: "img src=\"../command-tool-pass-rates.svg\"" Reason: Localized image paths must start with ../ to resolve correctly from the locale subfolder. Note: Exact match not found in selected MDX.

## Candidates
- current not present
- de4776e7e47914026b1e6cbcd248ebef5d139ec7 i18n candidate(he): security-agent-model-router via openrouter/deepseek/deepseek-v4-flash
- 904903a4cc6fce5d6cd0afbc4c87549be4cf2cd4 i18n candidate(he): security-agent-model-router via openrouter/openai/gpt-oss-120b:nitro
