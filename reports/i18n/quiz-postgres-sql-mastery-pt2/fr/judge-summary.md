# Translation Judge Summary

- Slug: quiz-postgres-sql-mastery-pt2
- Locale: fr
- Judge model: openrouter/google/gemini-3-flash-preview
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local

## Primary Judge Telemetry
- Runtime seconds: 4.18
- Input tokens: 22446
- Output tokens: 533
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.012822
- Estimated cost: $0.012822

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 4.18
- Input tokens: 17269
- Output tokens: 666
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010632
- Estimated cost: $0.010632

### Pass 2
- Runtime seconds: 4.23
- Input tokens: 17475
- Output tokens: 721
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.010901
- Estimated cost: $0.010901

## Judge Suggestions
1. Pass 1: applied high priority suggestion. Match: "{text: '\\'}," Replacement: "{text: '\\'first.name\\''}," Reason: The candidate has a broken string literal in the options for Challenge 7, likely due to an escaping error during translation. Note: Applied exact replacement to selected MDX.
2. Pass 1: logged high priority suggestion. Match: "options=[ ]}" Replacement: "options={[ {text: '...students SAMPLETABLE BERNOULLI (0.10)'}, {text: '...students TABLESAMPLE USER (10)'}, {text: '...students TABLESAMPLE RANDOM (10)'}, {text: '...students SA..." Reason: The options for Challenge 8 are missing in the candidate, which breaks the quiz functionality. Note: Exact match not found in selected MDX.
3. Pass 1: logged high priority suggestion. Match: "options=[ ]}" Replacement: "options={[ {text: 'ON a.id = b.id', isAnswer: true}, {text: 'ON a.id > b.id'}, {text: 'ON a.id >= b.id'}, {text: 'HASH JOIN ON a.id = b.id ...'} ]}" Reason: The options for Challenge 4 are missing in the candidate. Note: Exact match not found in selected MDX.
4. Pass 2: applied high priority suggestion. Match: "index={4} group=\"Internes SQL\" title=\"Éligibilité du Hash Join\" options={[ ]}" Replacement: "index={4} group=\"Internes SQL\" title=\"Éligibilité du Hash Join\" options={[ {text: 'ON a.id = b.id', isAnswer: true}, {text: 'ON a.id > b.id'}, {text: 'ON a.id >= b.id'}, {text: ..." Reason: The options for Challenge 4 are missing in the translation, making the question unanswerable. Note: Applied exact replacement to selected MDX.
5. Pass 2: applied high priority suggestion. Match: "index={8} group=\"Échantillonnage de données\" title=\"Syntaxe TABLESAMPLE\" options={[ ]}" Replacement: "index={8} group=\"Échantillonnage de données\" title=\"Syntaxe TABLESAMPLE\" options={[ {text: '...students SAMPLETABLE BERNOULLI (0.10)'}, {text: '...students TABLESAMPLE USER (10)..." Reason: The options for Challenge 8 are missing in the translation, making the question unanswerable. Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2024-11-28--quiz-postgres-sql-mastery-pt2/fr/index.mdx
- 481c8f10491ea96e541f8df0a587b7e5f3c0ab08 i18n candidate(fr): quiz-postgres-sql-mastery-pt2 via openrouter/openai/gpt-oss-120b:nitro
- 3dabd4627ff07244b096f109123de18b9c1c95e9 i18n candidate(fr): quiz-postgres-sql-mastery-pt2 via openrouter/qwen/qwen3-32b:nitro
