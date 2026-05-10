# I18n Judgment: Postgres Text Search Guide (Italian)

## Candidates
1. `6f3ea908af8ed048d542e8dc76ff24f0ea4bd774` - Qwen 3.6 Plus
2. `9a05f57b7c4cf4c7175f585725283596311668c4` - Qwen 3.5 Flash
3. `fec8601b2ed9b71c6356cf460caef8c05ceaa5b2` - DeepSeek V4 Flash

## Selection
**Winner:** Qwen 3.6 Plus (`6f3ea908af8ed048d542e8dc76ff24f0ea4bd774`)

## Decision Logic
- **Natural Language Quality:** Qwen 3.6 Plus provides the most idiomatic Italian translation. It uses "lessemi" and "stemming" (standard technical terms) correctly. It successfully captures Dan's direct, no-fluff tone (e.g., "quando ognuno si ripaga" for "when each one earns its keep").
- **Technical Accuracy:** All models handled the SQL blocks well. DeepSeek and Qwen Plus were slightly better at translating descriptive comments while keeping technical keywords intact.
- **MDX Preservation:** Qwen 3.6 Plus and DeepSeek V4 Flash preserved the SVG structure and frontmatter correctly, including parent-relative asset paths (`../`). Qwen 3.5 Flash omitted some frontmatter fields.
- **SVG Localization:** Qwen 3.6 Plus did a thorough job translating labels inside the SVGs (e.g., "lessicale", "ibrida", "Mappa degli strumenti...") without breaking the XML.

## Refinements Applied
- Minor consistency check on "ranking" vs "posizione" in the hybrid search explanation.
- Ensured "refusi" is used consistently for "typos".
- Fixed a minor awkward phrasing in the final conclusion.
