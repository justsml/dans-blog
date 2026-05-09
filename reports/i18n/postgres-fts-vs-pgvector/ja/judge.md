# Judge Report: ja translation for postgres-fts-vs-pgvector

## Candidates

- **Candidate A**: 738f18e0 (Qwen 3.6 Plus)
- **Candidate B**: ec1597f3 (DeepSeek V4 Flash)
- **Candidate C**: 080cc906 (Gemini 3 Flash Preview)

## Decision

**Winner**: **Candidate B** (DeepSeek V4 Flash)

## Reasoning

### Technical Accuracy
All candidates handled the technical terms well. 
- Candidate B (DeepSeek) correctly uses "レクシーム" (lexeme) and maintains the distinction between "字句ベース" (lexical) and "セマンティックベース" (semantic).
- Candidate C (Gemini) uses polite forms (です/ます), which clashes with Dan's direct, technical style.
- Candidate A (Qwen) is good but slightly less natural in its phrasing of technical tradeoffs compared to B.

### Natural Language Quality & Style
DeepSeek (Candidate B) captured Dan's voice best—direct, slightly cynical ("今日の同期バグに姿を変える"), and focused on operational reality. It uses the "だ/である" style which is appropriate for technical blog posts. Gemini (Candidate C) was too "brochure-like" with polite Japanese.

### MDX Preservation
DeepSeek preserved all MDX components, code blocks, and parent-relative asset paths (e.g., `../search-tool-map.svg`) correctly. It also correctly translated the captions and alt text within the MDX structure.

## Selected Polishing
- Adjusted a few sentence endings for better flow.
- Ensured consistency in "トライグラム" vs "Trigram".
- Verified code block language hints and formatting.
- Fixed the subtitle to be more punchy in Japanese.
