# Second Judge Report: de translation for developer-workstation-blast-radius

## Decision

**Agree with selection of 022c411466efd3a6dd50fb1b44d963649cdfa879** (openrouter/qwen/qwen3.6-plus).

The working tree has been restored to candidate 1's content, which is correct.

## Candidates Considered

| SHA | Model | Verdict |
| :-- | :-- | :-- |
| `022c4114` | openrouter/qwen/qwen3.6-plus | **Selected** |
| `b7d511e5` | openrouter/qwen/qwen3.5-flash-02-23 | **Rejected** — taxonomy breakage, voice mismatch |
| `060ba1a2` | openrouter/z-ai/glm-4.7-flash | **Rejected** — built on broken foundation, multiple translation errors |

## Why Not Candidates 2 & 3

### b7d511e5 (Qwen 3.5 Flash) — taxonomy and voice regressions

1. **Frontmatter `category` changed** from `Security` (controlled value in `content.config.ts`) to `Sicherheit`. This breaks the build's category taxonomy and would prevent the post from being properly listed. All controlled frontmatter values must remain in English.

2. **`tags` translated to German**: `Sicherheit, DevContainers, Secrets, CanaryTokens, VarLock, Firewall, AI-Agents, Entwicklererfahrung, BestPractices`. These are not controlled vocabulary items from the content schema, but the English originals (`security`, `devcontainers`, `secrets`, etc.) are the canonical forms used site-wide. These tags would not match existing tag pages or filters.

3. **Voice degraded from informal "du" to formal "Sie"** throughout. The blog's technical posts use the intimate "du" register. The formal switch makes the post read like a translated vendor manual rather than Dan's direct, peer-to-peer engineering voice.

4. **Concrete translation errors:**
   - `Laptop-Drohungsbild zu lösen` — garbled; intended: "jedes Laptop-Problem lösen" but produced nonsense ("threat image")
   - `humbelen` — nonsensical, probably intended "bescheiden" (humble/modest)
   - `dekorative Schnur` — "decorative string" mistranslated as literal "decorative cord" instead of "decorative string" in the programming sense
   - `Alles wahr. Auch nicht ausreichend.` — stilted; original's "Alles richtig. Trotzdem nicht genug." is more natural

### 060ba1a2 (GLM 4.7 Flash) — compounded errors on a broken base

This candidate is built on top of candidate 2 and inherits all its taxonomy/voice problems, then adds new ones:

1. **Title**: `Verengen Sie Ihr Entwickler-Workstation-Radius` — ungrammatical ("Ihr" should agree with "Radius" as "Ihren"), and "Verengen" is wrong for "reduce blast radius" (should be "Verkleinern" or "Reduzieren").

2. **Hallucinated word**: `Anmeldedaten-Madeleine` — "Madeleine" is a French name/pastry, inserted into a sentence about injecting credentials. This is a model hallucination with no source in the original.

3. **Nonstandard terminology**:
   - `Canarientokens` instead of the established `Canary Tokens` (capitalized, English borrowing as in candidate 1)
   - `Geheimnisse` for `Secrets` throughout — overly literal, loses the security-domain signal
   - `Streifzettel` for `tripwires` — means "slip of paper," wrong

4. **Grammatical issues throughout**: `hohes-Risiko-Repo`, `ausgehende Firewalls`, `Verschlüsselten lokalem Speicher`, `KI-Kontext` (inconsistent with `AI` used elsewhere)

## File State Note

HEAD (`bc475f23`) still points at candidate 3 (`060ba1a2`). The working tree has been restored to candidate 1's content. The only delta from HEAD is the content replacement (candidate 3 → candidate 1) plus a trailing newline fix. This working tree change should be committed as `i18n judge(de): select translation for developer-workstation-blast-radius` before further work.

## Summary

Candidate 1 (Qwen 3.6+) is the only viable translation. The other two candidates introduced taxonomy breakage (category/tags), voice mismatch (formal register), and substantive translation errors including a hallucination. The file on disk correctly reflects the selected candidate and needs only a commit to lock it in.