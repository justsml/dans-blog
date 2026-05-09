# I18n Second Judge Report: stop-hardcoding-your-prompts (FR)

## Verdict: DISAGREE with committed state (minimax-m2.7, 5315459)

The first judge correctly selected **DeepSeek V4 Flash** (e8808763). The minimax commit (5315459) that followed is a **clear regression** and should not have overwritten deepseek.

### Escalation: Commit `5315459` (minimax-m2.7)

This candidate reverted multiple correct translations from deepseek:

| Issue | minimax (5315459) | deepseek (e8808763) |
|---|---|---|
| `portant` (incorrect adj.) | ✅ `porteur` |
| `rollbacker` (anglicism) | ✅ `revenir en arrière` |
| `grepper` (anglicism) | ✅ `rechercher` |
| `ternary` (English in French text) | ✅ `ternaire` |
| `features` for "features" | ✅ `fonctionnalités` |
| `versioning` (English heading) | ✅ `versionnage` |
| `AI` instead of `IA` | ✅ `IA` |
| Code block comments in English | ✅ All comments in French |
| `artifacts` (English spelling) | ✅ `artefact` |
| `Taggez` (anglicism) | ✅ `Marquez` |
| `config` (anglicism) | ✅ `configuration` |
| Weaker closing re: "modèle" | ✅ Stronger closing faithful to original |

### Uncommitted working tree changes

The working tree already contains changes that revert most minimax damage back toward deepseek + the first judge's polishes. However, one remaining issue: `audirables` (line 310) is a typo — should be **`auditables`**.

### Recommendation

1. Revert 5315459 and apply deepseek (e8808763) + the first judge's polishes, OR
2. Commit the working tree changes after fixing `audirables` → `auditables`
