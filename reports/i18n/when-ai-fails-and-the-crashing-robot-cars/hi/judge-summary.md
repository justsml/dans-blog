# Translation Judge Summary

- Slug: when-ai-fails-and-the-crashing-robot-cars
- Locale: hi
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 2.85
- Input tokens: 4113
- Output tokens: 301
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.002959
- Estimated cost: $0.002959

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 3.46
- Input tokens: 4412
- Output tokens: 515
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003751
- Estimated cost: $0.003751

### Pass 2
- Runtime seconds: 15.68
- Input tokens: 4500
- Output tokens: 378
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.003384
- Estimated cost: $0.003384

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "बगीचे की ताजगी के लिए बहुत जटिल" Replacement: "शुरुआत से ही बहुत जटिल" Reason: The current translation 'बगीचे की ताजगी' (garden freshness) is a hallucination/mistranslation of 'from the get-go'. Note: Applied exact replacement to selected MDX.
2. Pass 1: applied high priority suggestion. Match: "पैदल चलाने के लिए गुजरना" Replacement: "पैदल पार पथ (crosswalk) को पार करना" Reason: 'पैदल चलाने के लिए गुजरना' is nonsensical; it should refer to crossing a walkway/crosswalk. Note: Applied exact replacement to selected MDX.
3. Pass 1: applied medium priority suggestion. Match: "पार्किंग में चलना" Replacement: "सड़क के किनारे (sidewalk) पर चलना" Reason: The English text says 'sidewalk', not 'parking'. Note: Applied exact replacement to selected MDX.
4. Pass 2: applied high priority suggestion. Match: "रोबोट की दुर्भाग्यपूर्ण गलती नहीं थीं।" Replacement: "रोबोट की गलती नहीं थी।" Reason: The word 'दुर्भाग्यपूर्ण' (unfortunate) is not in the source and changes the meaning of 'not the robots fault'. Note: Applied exact replacement to selected MDX.
5. Pass 2: applied high priority suggestion. Match: "अब तक के लिए एक सरल ठीक करने के लिए चमकदार लाल फ्लैशिंग एलईडी (स्कूल बसों की तरह सोचें) का उपयोग करें मानव चालकों को चेतावनी देने के लिए कि वे अपने गाड़ी से एक अज्ञात रोबोट को ट..." Replacement: "शायद अभी के लिए एक सरल समाधान चमकदार लाल फ्लैशिंग एलईडी (स्कूल बसों की तरह) का उपयोग करना होगा, ताकि मानव चालकों को चेतावनी दी जा सके कि वे एक निर्दोष रोबोट को पीछे से टक्कर मार..." Reason: The current sentence is grammatically broken and mistranslates 'innocent' as 'unknown' (अज्ञात) and 'rear-end' as a generic collision. Note: Applied exact replacement to selected MDX.
6. Pass 2: applied medium priority suggestion. Match: "नियमों के पालन और अवलोकन के तहरे हों।" Replacement: "नियमों के पालन और अनुपालन के विभिन्न स्तर (tiers) हों।" Reason: 'तहरे' is not a standard word for 'tiers' in this context; 'स्तर' is more appropriate for technical layers. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2015-12-18--when-ai-fails-and-the-crashing-robot-cars/hi/index.mdx
- c46852d3bacf230cedae71e597e2ec0252e5b063 i18n candidate(hi): when-ai-fails-and-the-crashing-robot-cars via openrouter/qwen/qwen3-32b:nitro
