# Translation Score

- Slug: quiz-bash-in-the-shell
- Locale: hi
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 90.0/100
- Recommendation: polish
- Hash: 000b763c71bde934a0c7d1f5f8aa3a4ce8b1390de3d8a534043e64c9b9d3ffd7
- JSON archive: reports/i18n/quiz-bash-in-the-shell/hi/scores/google-gemini-3-flash-preview/2026-05-13T07-32-48-088Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 88 |
| coherence | 90 |
| relevance | 95 |
| translationQuality | 85 |

## Analysis

The translation is generally high quality, maintaining the technical nuance and the author's informal yet direct tone. However, there are significant omissions in the final two challenges where the 'options' arrays were left empty in the Hindi version, rendering those quiz questions unusable. The Hindi prose is natural, using a good mix of transliterated technical terms (like 'सिंटैक्स', 'वेरिएबल') and appropriate Hindi equivalents.

## Strengths

- Excellent preservation of technical explanations and 'gotcha' logic.
- Natural flow in Hindi that captures the author's personality (e.g., 'मज़ाक कर रहा हूँ!').
- Correct handling of MDX components and slot syntax.

## Issues

- high / relevance: The 'options' array for Challenge index 9 and 15 is empty in the translation but populated in the source. (options={[
  ]})
- medium / technicalAccuracy: In Challenge 1, 'Error' is translated as 'त्रुटि' in the options, but in Challenge 11 it is 'त्रुटि' and in others it remains 'Error'. Consistency is needed for UI elements. ({text: 'त्रुटि'})
- low / readability: Occasional gender/number agreement issues in technical descriptions, though minor. (शेल कमांड को एक प्रोग्राम के रूप में इंटरप्रिट करने लगता है)

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 12258 | 346 | 0 | 0 | 4597 | $0.007167 |
