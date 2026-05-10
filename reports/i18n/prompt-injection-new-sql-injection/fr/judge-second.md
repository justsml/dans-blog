# Judge Report: prompt-injection-new-sql-injection (fr)

**Reviewer**: Second judge
**Date**: 2026-05-09
**Selected SHA**: `58c0277e` (final selection & polish)
**Candidates reviewed**:
- `e5a64cf2` — qwen3.6-plus (original candidate, created the file)
- `45cf6cc7` — deepseek-v4-flash (edited on top of qwen3.6-plus)
- `fd1db8e0` — qwen3.5-flash (edited on top of deepseek-v4-flash)

## Verdict: DISAGREE — escalation required on 2 issues

The selected translation (`58c0277e`) is generally idiomatic and well-written French, but contains two issues that warrant escalation.

---

## Issue 1: Title meaning drift (HIGH severity)

**File**: `fr/index.mdx` line 2
**Current**: `title: "L'Injection de Prompt est l'Injection SQL des Agents"`
**Original EN**: `"Prompt Injection Is SQL Injection for Agents"`

The original draws a comparison: prompt injection **is [like]** SQL injection, specifically **for** AI agents. The French `"l'Injection SQL des Agents"` means "the SQL Injection **of/belonging to** Agents" — a possessive construction that shifts the meaning. It reads as if there is an entity called "SQL Injection of Agents" that prompt injection happens to be.

Both `45cf6cc7` (deepseek-v4-flash) and `fd1db8e0` (qwen3.5-flash) had the correct rendering:
- `45cf6cc7`: `"L'injection de prompt est l'injection SQL pour les agents"`
- `fd1db8e0`: `"L'injection de prompt est l'injection SQL pour les agents"`

The final polish reverted to the possessive `des`, which is a regression. The correct preposition is **pour** ("for").

---

## Issue 2: Untranslated "See also" link text (MEDIUM severity)

**File**: `fr/index.mdx` line 243
**Current**: `*Voir aussi : [Production AI is Terrifying (And How to Fix It)](/mastra-security-guardrails/)...`
**Original EN**: `*See also: [Production AI is Terrifying (And How to Fix It)](/mastra-security-guardrails/)...`

The link display text is left in English. Both `45cf6cc7` and `fd1db8e0` had translated versions:
- `45cf6cc7`: `[L'IA en production est terrifiante (Et comment y remédier)]`
- `fd1db8e0`: `[L'IA en production est terrifiante (et comment la corriger)]`

A French reader seeing English link text mid-sentence is jarring and unpolished.

---

## Notes on other candidate differences (not escalated)

The final polish made several deliberate revert choices compared to the candidates:

| Aspect | Selected (58c0277e) | Candidates (45cf6cc7 / fd1db8e0) | Assessment |
|---|---|---|---|
| **Code comments** | Kept in English (original) | Translated to French | Code-in-English is standard for French tech articles. No issue. |
| **Category frontmatter** | `AI` / `Security` (English) | `IA` / `Sécurité` (French) | Frontmatter drives routing/filters — should match the EN taxonomy. Current is correct. |
| **`parseur` vs `analyseur`** | `parseur` (anglicism) | `analyseur` (proper French) | Both acceptable in tech context. No issue. |
| **`firewall` vs `pare-feu`** | `firewall` (anglicism) | `pare-feu` (proper French) | Both acceptable. No issue. |
| **`gate` vs `porte`/`barrière`** | `gate` (anglicism) | `porte`/`barrière` (proper French) | Stylistic choice. `gate` is uncommon in French and may confuse, but not severe enough to escalate. |
| **`input` vs `entrée`** | `input` (anglicism) | `entrée` (proper French) | Common in French tech writing. No issue. |
| **Bullet list verbs (Couche: Exécuter/Exfiltration/Escalade/Atteinte)** | Mixed verb/noun forms | Consistent nouns in deepseek | Slightly inconsistent but not a blocker. |
| **"Vous avez déjà appris cette leçon. Ne la réapprenons pas."** | Current version | Candidates had variations | Current is good. |

---

## Summary

The selected translation needs **two fixes**:
1. **Line 2**: Change `des Agents` → `pour les agents` to restore the original comparative meaning.
2. **Line 243**: Translate the link display text from English to French (any of the candidate versions works).

These are both regressions introduced during the final polish step that had been correct in earlier candidates. Recommend `45cf6cc7` as the reference for both fixes.
