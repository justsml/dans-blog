# Translation Score

- Slug: quiz-regex-or-wreckage
- Locale: hi
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 93.8/100
- Recommendation: accept
- Hash: 0c8c293f96cc85128212c59a742f78a783307da984f1764256ad410ad8d9952c
- JSON archive: reports/i18n/quiz-regex-or-wreckage/hi/scores/google-gemini-3-flash-preview/2026-05-13T07-33-38-837Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 95 |
| coherence | 98 |
| relevance | 90 |
| translationQuality | 94 |

## Analysis

The translation is high quality, successfully localized into Hindi while maintaining the technical rigor and playful tone of the original. It correctly handles MDX components and code blocks. However, there is a significant omission in Challenge index 2 and 13 where the 'options' array was left empty in the translation, which breaks the quiz functionality for those specific questions.

## Strengths

- Excellent use of transliteration for technical terms (e.g., 'फ्लैग', 'इंजन', 'सिंटैक्स') alongside Hindi explanations.
- Maintains the author's personality, especially in the 'Look-into-hell' (लुक-अहेड नर्क) section.
- Accurate translation of complex regex logic explanations into natural-sounding Hindi.

## Issues

- high / relevance: The 'options' array for Challenge index 2 and 13 is empty in the translation, omitting all answer choices. (options: [
  ])
- low / readability: Inconsistent translation of 'Character' - sometimes 'वर्ण' (varna) and sometimes 'कैरेक्टर' (character). (एक कैरेक्टर क्लास जो एक वर्ण से मेल खाता है)

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 13158 | 393 | 0 | 0 | 4580 | $0.007758 |
