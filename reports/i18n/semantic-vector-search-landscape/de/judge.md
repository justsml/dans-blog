# i18n Judge Report: `semantic-vector-search-landscape` → de

## Selected Candidate

| Field | Value |
|---|---|
| **SHA** | `f8a778a73a55c1a4c383c678b39f1fabe74293d0` |
| **Model** | `openrouter/deepseek/deepseek-v4-flash` |

## Candidates Considered

| SHA | Model | Verdict |
|---|---|---|
| `a5cf7f8a` | `openrouter/qwen/qwen3.6-plus` | Rejected |
| `f8a778a7` | `openrouter/deepseek/deepseek-v4-flash` | **Selected** |
| `f0e3ede4` | `openrouter/minimax/minimax-m2.7` | Rejected |

## Evaluation Against Criteria

### Technical Accuracy

- **DeepSeek**: Excellent — correct German CS terminology throughout ("unscharfe Suche" for fuzzy search, "Kosinus-Ähnlichkeit", "Ranglistenergebnissen", "Embedding" kept as standard German tech term, "Mandanten" for tenants). All SQL, Python, and code blocks preserved exactly. Technical concepts (RRF, HNSW, BM25, SPLADE) translated accurately.
- **Qwen**: Good overall but "Liebhaber" in title changes meaning to romantic/sexual. "unverwandte" is a typo for "nicht verwandte". "Similarity-Schwellenwert" mixes languages unnecessarily.
- **MiniMax**: Multiple untranslated English words ("belong" in prose at line 22, "Benchmarcken", "Varies" in table, "evaluaiere" typo, "Prototype"). Grammatical errors ("die halbe Produkt", "pro Sprache Dictionary-Konfiguration").

### Natural German & Direct Voice

- **DeepSeek**: Uses consistent formal "Sie" (appropriate for technical blog post targeting professionals). Prose flows naturally: "Suche ist nicht nur eine Sache" for "Search is not one thing". Complex technical explanations rendered clearly in German.
- **Qwen**: Uses informal "du". Mostly natural but some anglicisms ("Cosine-Distanz", "Similarity-Schwellenwert").
- **MiniMax**: Uses informal "du" but inconsistent — switches between "du" and "Sie" mid-paragraph (line 71). English intrusions break flow.

### MDX Preservation

All three candidates preserved frontmatter, MDX structure, code blocks, and image paths correctly (`../` prefix for `de/` subdirectory). DeepSeek had the cleanest frontmatter formatting.

### Code & URL Preservation

All three preserved code blocks and URLs identically. No differences.

### Search/Vector Terminology

- **DeepSeek**: Best terminology choices — "Embedding" (standard German tech term, not "Einbettung"), "unscharfe Suche" (correct for "fuzzy"), "Spaltenformat" (columnar), "Kontextfenster" (context window), "Ähnlichkeitsschwellenwert" (similarity threshold).
- **Qwen**: Good but anglicized ("Cosine-Distanz", "Feature-Flags").
- **MiniMax**: Inconsistent — mixes "Einbettung" and "Embedding", uses "Canin" (not standard German for "canine"), "Varies" in table.

### Title Translation

- **DeepSeek**: "um Freunde und Liebste zu gewinnen" — best approximation of the original's playful "Win Friends and Lovers" (a twist on Dale Carnegie). "Liebste" preserves the playful/affectionate tone.
- **Qwen**: "um Freunde und Liebhaber zu gewinnen" — "Liebhaber" specifically means romantic/sexual lovers, changing the tone.
- **MiniMax**: "um Freunde zu gewinnen und zu beeindrucken" — loses the Carnegie reference entirely, becomes "win friends and impress."

## Polish Applied

A single typo fix was applied to the selected candidate before writing:

| Location | Original (DeepSeek) | Polished |
|---|---|---|
| Line ~13 | "Die nützliche Version ist nicht **„embeddde alles“**." | "Die nützliche Version ist nicht **„embedde alles“**." |

No other changes were needed. The DeepSeek candidate was production-ready.

## Summary

The DeepSeek translation was the clear winner across all criteria: most technically accurate (correct German CS terminology), most natural German prose, best title translation, consistent formal register, and zero English intrusions in the prose. The single typo (triple 'd' in "embeddde") was the only polish needed.