# Translation Judge

- Selected candidate: e443ee5e2912ee41b292496d7e9731314dc0eda9
- Selected model: openrouter/openai/gpt-6.1-sol
- Judge model: openrouter/anthropic/claude-haiku-5.5
- Confidence: low (0.286)

Candidate e443ee5 has the most natural and direct French, keeps Dan's voice intact, and renders the technical argument (LLMjacking, GTG-1002, swarm probability math) faithfully. Its main pre-publish defect is the untranslated English phrasing and decimal formatting inside the probability code block, which is a concrete language-purity fix. The other candidates have larger purity problems, such as untranslated English paragraphs and figure alt text in 6faa4c7 and looser phrasing in 52ea83a, so e443ee5 remains the best selection.