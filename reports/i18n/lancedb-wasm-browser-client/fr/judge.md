# I18n Judge Report: lancedb-wasm-browser-client (fr)

## Candidates

- **DeepSeek V4 Flash** (e2dfaf8355c91b5d757ba794a19ca68dbfb5b3cd): Highly natural, professional technical French. Preserves MDX perfectly.
- **DeepSeek V3.2** (f6b3953bec4e140ee45d45743d77f883749204a5): Good technical accuracy but slightly more literal/wooden phrasing in some sections.
- **MiniMax M2.5** (7b1cfb8b233102ac4e3abcfd53a708d0399c6b47): Failures in MDX preservation (e.g., "через", "mostly", "sometimes", and "fáciles" appearing in French text). Inconsistent terminology.

## Decision: DeepSeek V4 Flash

### Rationale
DeepSeek V4 Flash provided the most idiomatic technical translation while maintaining Dan's direct, conversational but expert tone. It correctly handled technical terms (Object Store, Range requests, Hybrid search) within French syntax without feeling like a machine translation.

### Key Improvements in Final Polish
- Standardized "snapshot" as "instantané" (already used well by the model).
- Ensured "sidecar" is used consistently.
- Verified all internal asset paths use the `../` prefix for locale subdirectories.

## Metrics
- **Selected SHA**: e2dfaf8355c91b5d757ba794a19ca68dbfb5b3cd
- **Judge Model**: manual (opencode)
- **Time**: 2026-05-09
