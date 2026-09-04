# Translation Judge Summary

- Slug: llm-routing-mastra-ai
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: low (0.332)
- Confidence signals: 3 high and 0 medium issues; single judge
- High/medium/low issue counts: 3/0/0

## Primary Judge Telemetry
- Runtime seconds: 2.31
- Input tokens: 7555
- Output tokens: 262
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.004563
- Estimated cost: $0.004563

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 4.00
- Input tokens: 7246
- Output tokens: 518
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005177
- Estimated cost: $0.005177

### Pass 2
- Runtime seconds: 3.57
- Input tokens: 7444
- Output tokens: 457
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005093
- Estimated cost: $0.005093

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "title: ''" Replacement: "title: 'Ne vous mariez pas avec votre modèle'" Reason: The frontmatter title was left empty in the candidate but should be translated as per instructions. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "title: ''" Replacement: "title: 'Ne vous mariez pas avec votre modèle'" Reason: The frontmatter title was left empty in the candidate but should be translated as per instructions. Note: Applied exact replacement to selected MDX.
3. Pass 2: logged high priority suggestion. Match: "subTitle: ''" Replacement: "subTitle: 'Routage LLM, tellement tendance'" Reason: The frontmatter subTitle was left empty in the candidate but should be translated. Note: Exact match not found in selected MDX.
4. Pass 2: applied high priority suggestion. Match: "[Sécurité et barrières de protection](/mastra-security-guardrails)" Replacement: "[Sécurité et garde-fous](/mastra-security-guardrails)" Reason: While 'barrières de protection' is okay, 'garde-fous' is the standard technical term for LLM guardrails in French engineering contexts. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2026-01-02--llm-routing-mastra-ai/fr/index.mdx
- 0c0c1cee312cbca1aee3fe9526aa5a5a009affd9 i18n candidate(fr): llm-routing-mastra-ai via openrouter/deepseek/deepseek-v4-flash
- 2af31d642fe1a131f5c44d49d4b2475dab56ebe9 i18n candidate(fr): llm-routing-mastra-ai via openrouter/qwen/qwen3.6-plus
