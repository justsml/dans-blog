# Translation Score

- Slug: quiz-is-your-memory-rusty
- Locale: it
- Model: openrouter/google/gemini-3-flash-preview
- Overall score: 95.8/100
- Recommendation: accept
- Hash: 27374afbd97fc80c50897e23f586113004a71a7d95604054e2e20ff14f0e67b8
- JSON archive: reports/i18n/quiz-is-your-memory-rusty/it/scores/google-gemini-3-flash-preview/2026-05-13T07-33-18-362Z.json

## Scores

| Metric | Score |
| --- | ---: |
| readability | 92 |
| technicalAccuracy | 95 |
| coherence | 98 |
| relevance | 100 |
| translationQuality | 94 |

## Analysis

The translation is of high quality, successfully adapting Dan Levy's technical yet direct tone into Italian. It correctly handles complex Rust terminology (ownership, borrowing, lifetimes) while maintaining the structural integrity of the MDX and Challenge components. Some minor inconsistencies in translating 'lifetimes' (sometimes 'durata', sometimes 'lifetime') are present but do not hinder understanding.

## Strengths

- Excellent preservation of MDX structure and component props.
- Natural adaptation of the subtitle's wordplay ('(Prestito) controllati prima di rovinarti').
- Accurate translation of technical explanations and code-adjacent logic.

## Issues

- low / coherence: Inconsistent translation of 'lifetimes'. It is translated as 'durata' in some headings/options and left as 'lifetime' in others. (group="Lifetime" vs title="Annotazioni di durata")
- low / readability: The translation of 'Move Semantics' as 'Semantica di Spostamento' is technically correct but 'Semantica Move' is often preferred in Italian technical discourse to avoid ambiguity. (Semantica di Spostamento di Base)
- low / translationQuality: Some English comments within code blocks were left untranslated, though this is often acceptable in technical contexts. (// What happens to our wisdom?)

## Cost

| Input tokens | Output tokens | Cache read | Cache write | Duration ms | Estimated cost |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 26382 | 444 | 0 | 0 | 3930 | $0.014523 |
