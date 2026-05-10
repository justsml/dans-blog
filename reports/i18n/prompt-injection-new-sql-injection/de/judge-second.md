# Second Judge Report: Prompt Injection Is SQL Injection for Agents (DE)

## Summary

**Verdict: AGREE** with the current `de/index.mdx` (based on qwen3.6-plus, commit `965ec09562ef4de74192294752024da4fef9c79f`).

The qwen3.6-plus candidate is clearly the strongest. Both alternative candidates introduced regressions that would damage the translation.

## Candidate Comparison

| Criteria | qwen3.6-plus (current) | qwen3.5-flash (`5f8ed11`) | deepseek-v4-flash (`de030bc`) |
|---|---|---|---|
| **Taxonomy** | ✅ Preserved (AI/Security) | ❌ Translated category to "KI"/"Sicherheit" | ❌ Translated category to "KI"/"Sicherheit" |
| **Code blocks** | ✅ Code stays as code | ❌ Translated code comments and string literals | ❌ Translated code comments and string literals |
| **Headings** | ✅ Correct German sentence case | ❌ Wrong title-case (`Tatsächlich Ist`) | ❌ Wrong title-case (`Wirklich Ist`) |
| **Technical accuracy** | ✅ "Datenexfiltration" is correct | ⚠️ "Datendiebstahl" (imprecise) | ❌ "Datenerpressung" means *extortion/blackmail*, not exfiltration |
| **Injection example** | ✅ Kept in English (original form) | ❌ Translated, changes the attack example | ❌ Translated, changes the attack example |
| **Natural German** | ✅ "Aber sie reimt sich" (preserves rhythm) | ❌ "Sie reimt sich" (loses contrast) | ❌ "Sie reimt sich" (loses contrast) |

## Key Issues in Rejected Candidates

### qwen3.5-flash (`5f8ed11`)
- Translated `category: AI` → `category: KI` — breaks the controlled taxonomy in `content.config.ts`
- Translated code comments and string values inside TypeScript blocks
- "Datendiebstahl" (data theft) is imprecise for "exfiltration"
- "abrufte" is a spelling error (should be "abruft")
- "kundengesichtschatbot" — garbled compound noun

### deepseek-v4-flash (`de030bc`)
- Translated `category: AI` → `category: KI` — same taxonomy break
- "Datenerpressung" is an outright mistranslation: *Erpressung* = blackmail/extortion, not exfiltration
- Translated the injection example prompt into German, altering the nature of the attack illustration
- "produktive Systeme" loses the "deployed in production" meaning
- "adversarial Eingaben" leaves "adversarial" in English without correct German declension

## Minor Polish Notes (not blocking)

These are acceptable in the current file but could be refined:

1. **Line 96**: "Policy-Text" is Denglish. "Richtlinientext" would be more native, but "Policy-Text" is common in tech German.
2. **Line 237**: "möglicherweise adversarial" — "adversarial" stays in English. "böswillig" or "feindselig" would be more natural but this is standard tech-German usage.
3. **Line 124**: "`gpt-4o-mini`-artiger" is slightly awkward. An alternative like "mit `gpt-4o-mini`-Klasse" (from deepseek) reads better, but the deepseek candidate's overall version is too flawed to cherry-pick this change.

**None of these warrant escalation.** The current translation is accurate, idiomatic, and preserves the technical precision of the original.

## Recommendation

The current `de/index.mdx` (qwen3.6-plus commit `965ec09` with the polish documented in `judge.md`) should remain as-is. No changes required.
