# Escalation Report: ai-sdk-math-tool (fr)

**Escalated by**: Judge 2 (second judge)
**Resolution by**: claude-sonnet-4.6 (escalation judge)
**Date**: 2026-05-09

## Summary

Judge 1 correctly selected the Qwen candidate (`0cd00d8`) as the best translation. However, the file written to disk at the time of Judge 2's review had diverged substantially from that candidate — three entire sections were missing and one invented section had been inserted. Judge 2 flagged this as a disagreement requiring escalation.

On inspection, the problem was not a disagreement about translation quality: both judges agreed Qwen was the best candidate. The problem was that the current `fr/index.mdx` did not match what Qwen produced. The escalation judge resolved this by restoring the Qwen candidate as the authoritative base and applying light polish.

## What Was Wrong With the Current File

The file at escalation time was missing:

1. **`## Au-delà de l'arithmétique de base`** — 3 paragraphs covering algebra, calculus, and LaTeX support. This section appears in the English source and in all three candidates.

2. **`## La vue d'ensemble`** — 4 paragraphs articulating the orchestrator pattern. This is the article's central thesis ("not 'can the model do this?' but 'can the model orchestrate this?'"). Its omission made the translation editorially incomplete.

3. **`## Ressources`** — 4 reference links.

Additionally, the `console.log(text);` line was absent from the "Putting It to Work" code block, and an invented section titled **`## Pourquoi c'est important`** had been substituted in place of the authentic content. That section had no counterpart in the English source.

## Escalation Decision

**Base candidate selected**: Qwen — `0cd00d8fc4a30f618a63242fe3b28de1e80a8fc3`

Qwen's translation was complete, faithful to the English source, and carried natural idiomatic French throughout. DeepSeek (`0c53bef`) produced an equally complete and nearly identical translation; the primary differentiator favoring Qwen was phrasing in the intro ("Ils sont nuls en calcul" vs. "Ils sont nuls à ça") and marginally more natural flow in a few prose paragraphs. MiniMax (`7c27cd5`) was complete but stylistically weaker — section headings used title case inconsistently and some phrasing felt more mechanical.

## Polishing Applied to Qwen Base

- Replaced straight ellipsis `...` with typographic `…` in two places to match French editorial convention.
- Lowercased resource link labels (e.g., "Documentation Vercel AI SDK", "Guide d'appel d'outils") to align with the informal tone of the rest of the article.
- Verified `console.log(text);` is present in the "Le mettre au travail" code block.
- Confirmed all asset paths use `../` prefix (correct for the nested `fr/` directory).
- No substantive prose changes were made beyond the above.

## Candidate Comparison

| Candidate | SHA | Complete | Prose Quality | Asset Paths |
|-----------|-----|----------|---------------|-------------|
| Qwen | `0cd00d8` | Yes | High — natural, idiomatic | Correct (`../`) |
| DeepSeek | `0c53bef` | Yes | High — nearly identical to Qwen | Correct (`../`) |
| MiniMax | `7c27cd5` | Yes | Medium — mechanical in places | Correct (`../`) |
| **Final file** | — | **Yes** | **Qwen + light polish** | **Correct (`../`)** |

## Root Cause Note

The divergence between the Judge 1 selection and the on-disk file suggests the judge runner wrote an intermediate or partial version to disk rather than the winning candidate output. Future judge runs should verify that the written file matches the selected candidate SHA before marking the judge step complete.
