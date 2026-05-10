# Judge Report (Second)
- Slug: stop-hardcoding-your-prompts
- Locale: ja
- Judge: opencoder manual review (human)
- Date: 2026-05-09
- Model: N/A (human review)

## Candidates Considered

| SHA | Model | Status |
|-----|-------|--------|
| `f505daf933dc9f7f81f29e8377a133793aa1bc83` | openrouter/deepseek/deepseek-v4-flash | Selected |
| `3ed36ef0bb53d8278592fee0ffd521d30cfc034f` | openrouter/minimax/minimax-m2.7 | Rejected |
| `0584dc57ad44e68dfd71c73c00f3a169b29de156` | openrouter/z-ai/glm-5-turbo | Rejected |

Excluded: Qwen candidate was rejected during generation (touched unrelated files in `hi/` directory).

## Candidate Analysis

### f505daf — openrouter/deepseek/deepseek-v4-flash **(Selected)**

Natural, fluent Japanese prose throughout. Title/subtitle feel native. Key strengths:
- Consistent and appropriate technical vocabulary (e.g., "文字列補間", "コンポーザブル", "バージョニング")
- Natural sentence flow that preserves the English author's voice without sounding translated
- Code comments left in English — acceptable choice for a developer audience
- All section headings properly translated
- Summary list items maintain parallel structure and punch
- Final line ("AIエンジニアリングの難しい部分はモデルではない。プロンプトインフラだ。") captures the original's weight

### 3ed36ef — openrouter/minimax/minimax-m2.7 **(Rejected)**

Multiple critical issues render this candidate unusable:
1. **Chinese vocabulary**: "免责声明" (mainland Chinese term) used instead of Japanese "免責事項"; "管辖别" instead of "管轄ごと"
2. **Korean grammar intrusion**: "神聖인지" — `인지` is a Korean grammatical particle, not Japanese
3. **Untranslated English**: "Together they turn prompt work from folklore into ordinary engineering:" and "typed, testable, versioned, and boring to change" left raw in the prose
4. **English section heading**: "Composable Prompt Sections" heading untranslated
5. **Awkward phrasing**: "快速プロトタイプ", "負担が大きくて見えない", "信心を持って" (should be "自信")
6. **Garbled grammar**: "始まり取った文字列" — ungrammatical

These are not minor style disagreements. The presence of simplified Chinese vocabulary, Korean grammar, and untranslated English blocks makes this candidate fail on correctness grounds.

### 0584dc5 — openrouter/z-ai/glm-5-turbo **(Rejected)**

GLM corrected many of MiniMax's issues (reverted Chinese terms to proper Japanese, fixed section headings) but started from the flawed MiniMax base. Residual issues:
- Some phrasing retained MiniMax's awkwardness (e.g., "快速プロトタイプ" vs DeepSeek's natural "さっと作ったプロトタイプ")
- Code comments returned to English (acceptable but sometimes less helpful than DeepSeek's selectively translated approach)

The translation is serviceable but less natural than the DeepSeek candidate. Without the DeepSeek alternative it might pass, but it does not outperform.

## Decision

**Select f505daf (DeepSeek).**

The DeepSeek candidate produces the most natural Japanese reading experience with the fewest artifacts. No escalation required. The only notable choice is code comments being left in English, which is standard practice for Japanese developer documentation targeting this audience.

## Escalation

None required. DeepSeek candidate is structurally sound and stylistically appropriate.