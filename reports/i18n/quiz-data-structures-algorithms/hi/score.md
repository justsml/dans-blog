# Translation Score

- Slug: quiz-data-structures-algorithms
- Locale: hi
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 93.8/100
- Recommendation: accept
- Hash: eac793373bc46a0b9a902f60c3abc83f8c1afba7aa1c0a8e7f1b8d84f3072b14
- JSON archive: reports/i18n/quiz-data-structures-algorithms/hi/scores/google-gemini-3-flash-preview/2026-05-13T07-33-01-886Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 95 |
| coherence | 94 |
| relevance | 100 |
| translationQuality | 88 |

## Analysis

The translation is technically sound and maintains the MDX structure perfectly. It uses a good mix of Hindi and English technical terms (transliterated or original) which is standard for Indian developers. However, the 'hints' slots from the source were omitted in the translation, and the subtitle 'Can you BS a Binary Tree?' was translated literally, losing the idiomatic 'BS' (bullshit/fake) nuance.

## Strengths

- Excellent preservation of MDX components and props.
- Natural use of technical Hindi (e.g., 'समय जटिलता' for time complexity, 'गैर-ऋणात्मक' for non-negative).
- Consistent terminology across all 20 questions.

## Issues

- medium / relevance: The 'hints' slot present in every source Challenge component was completely omitted in the translation. (<slot name='hints'>...)
- low / translationQuality: Literal translation of 'BS' in the subtitle doesn't convey the intended English slang meaning. (क्या आप बाइनरी ट्री पर बीएस कर सकते हैं?)
- low / readability: Inconsistent transliteration of 'Queue' (sometimes 'क्यू', sometimes 'कतार'). (स्टैक बनाम क्यू vs कतार संचालन)

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 10992 | 428 | 0 | 0 | 4504 | $0.006780 |
