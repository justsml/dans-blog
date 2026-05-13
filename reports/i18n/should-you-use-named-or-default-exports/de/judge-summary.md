# Translation Judge Summary

- Slug: should-you-use-named-or-default-exports
- Locale: de
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 3.45
- Input tokens: 7248
- Output tokens: 389
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004791

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.50
- Input tokens: 6013
- Output tokens: 666
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.005005

### Pass 2
- Runtime seconds: 3.41
- Input tokens: 6126
- Output tokens: 480
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: unknown
- Estimated cost: $0.004503

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "[Siehe weitere Beispiele am Ende des Artikels.](../#summary)" Replacement: "[Siehe weitere Beispiele am Ende des Artikels.](#summary)" Reason: The link was incorrectly changed to a relative parent path, which will break the anchor link on the same page. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied medium priority suggestion. Match: "Sollten Sie `named` oder `default` Exports" Replacement: "Solltest du `named` oder `default` Exports" Reason: The original text uses 'you' (informal), and the rest of the blog's tone is informal. 'Sie' is too formal for Dan's style. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied medium priority suggestion. Match: "export` Sie bitte" Replacement: "export` bitte" Reason: Consistency with informal tone. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied high priority suggestion. Match: "Lassen Sie uns einige der häufigen" Replacement: "Lass uns einige der häufigen" Reason: The translation uses formal 'Sie' (Lassen Sie uns), which contradicts Dan's informal and direct style. Switching to 'du/wir' (Lass uns) is more appropriate. Note: Applied exact replacement to selected MDX.
5. Pass 2: applied high priority suggestion. Match: "Vielleicht suchen Sie nach einer Lint‑Regel?" Replacement: "Vielleicht suchst du nach einer Lint‑Regel?" Reason: Consistency with informal tone. Note: Applied exact replacement to selected MDX.
6. Pass 2: applied high priority suggestion. Match: "Ich muss es Ihnen leider sagen, aber warten Sie, bis Sie lernen" Replacement: "Ich muss es dir leider sagen, aber warte, bis du lernst" Reason: Consistency with informal tone. Note: Applied exact replacement to selected MDX.
7. Pass 2: applied high priority suggestion. Match: "Wie soll ich Ihr Gerät wieder halten?" Replacement: "Wie soll ich dein Gerät wieder halten?" Reason: Consistency with informal tone. Note: Applied exact replacement to selected MDX.
8. Pass 2: applied high priority suggestion. Match: "Passen Sie Ihre Werkzeuge an bzw. aktualisieren Sie sie." Replacement: "Passe deine Werkzeuge an bzw. aktualisiere sie." Reason: Consistency with informal tone. Note: Applied exact replacement to selected MDX.
9. Pass 2: applied high priority suggestion. Match: "können Sie `export default` nicht" Replacement: "kannst du `export default` nicht" Reason: Consistency with informal tone. Note: Applied exact replacement to selected MDX.
10. Pass 2: applied high priority suggestion. Match: "können Sie sie als Default exportieren." Replacement: "kannst du sie als Default exportieren." Reason: Consistency with informal tone. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2023-08-18--should-you-use-named-or-default-exports/de/index.mdx
- 56a2636a43a47d1a5eeee79b2c7db88bde8d2d64 i18n candidate(de): should-you-use-named-or-default-exports via openrouter/openai/gpt-oss-120b:nitro
- 0e6d0c84d1cd05c239827a0c3451b12e50ecee3f i18n candidate(de): should-you-use-named-or-default-exports via openrouter/qwen/qwen3-32b:nitro
