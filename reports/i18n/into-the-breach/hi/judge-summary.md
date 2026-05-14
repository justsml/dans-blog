# Translation Judge Summary

- Slug: into-the-breach
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
- Runtime seconds: 2.96
- Input tokens: 23377
- Output tokens: 258
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.012462
- Estimated cost: $0.012462

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 4.69
- Input tokens: 20826
- Output tokens: 589
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.012180
- Estimated cost: $0.012180

### Pass 2
- Runtime seconds: 4.33
- Input tokens: 21121
- Output tokens: 556
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.012228
- Estimated cost: $0.012228

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "The standard should not be \"never click anything weird.\" That is advice for a poster, not a system." Replacement: "मानक यह नहीं होना चाहिए कि \"कभी भी किसी अजीब चीज़ पर क्लिक न करें।\" यह एक पोस्टर के लिए सलाह है, सिस्टम के लिए नहीं।" Reason: This paragraph was left in English in the candidate MDX. Note: Applied exact replacement to selected MDX.
2. Pass 2: applied high priority suggestion. Match: "The practical standard: - a bad PDF should not be able to read all project secrets - a malicious dependency should not see cloud credentials from other projects - a prompt-injec..." Replacement: "व्यावहारिक मानक: - एक खराब PDF सभी प्रोजेक्ट सीक्रेट्स को पढ़ने में सक्षम नहीं होनी चाहिए - एक दुर्भावनापूर्ण डिपेंडेंसी को अन्य प्रोजेक्ट्स के क्लाउड क्रेडेंशियल्स नहीं दिखने च..." Reason: A significant section of the 'Practical Standard' section was left in English in the candidate translation. Note: Applied exact replacement to selected MDX.

## Candidates
- current not present
- faa818a8c977f92a0ed2fc30313239b28921a49b i18n candidate(hi): into-the-breach via openrouter/deepseek/deepseek-v4-flash
- 4b9f6f6848e46061b50f5e6fd23486ea3c6bca9e i18n candidate(hi): into-the-breach via openrouter/google/gemini-3-flash-preview
