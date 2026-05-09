# i18n judge — Italian (second pass)

Post: your-laptop-is-the-breach
Locale: it

Summary
-------
I agree with the candidate introduced by commit 5e5bf8bfe0b8b14aea8d2f519f56af20d7e85b0d (openrouter/minimax/minimax-m2.7).

Decision
--------
- Accept: 5e5bf8bfe0b8b14aea8d2f519f56af20d7e85b0d
- Reject / Escalate: e52466ada28da7c92e3eaad6e986d0a8c8e09ad0, d7384c9ddc2aef205a3d8ffe9640391998f1d700

Rationale
---------
Candidate 5e5bf8b... (minimax-m2.7)
- Natural, fluent Italian with correct register for a technical/security audience.
- Preserves tone and emphasis of the English source (direct, practical, slightly colloquial where appropriate).
- Technical terms are handled consistently (e.g. "sessioni del browser", "chiavi SSH", "file `.env`", "canary token").
- Minimal and sensible localization of headings, examples, and calls-to-action. I found no significant mistranslations or grammatical errors that would require correction prior to publication.

Candidate e52466a... (minimax-m2.5)
- Contains multiple grammar and register issues, odd literal translations, and unnatural phrasing (examples: "Imaginano" -> should be "Immaginano"; inconsistent use of "portatile" vs "laptop"; many awkward phrases and typos such as "Ponzia", "Vangelo"/capitalization issues).
- Several semantic shifts and mistranslations that change nuance ("La versione più utile è quella noiosa" vs original intent), plus inconsistent terminology for technical concepts.
- Recommendation: escalate — requires substantial post-editing to reach publication quality. Prefer re-run with a better Italian candidate or post-edit by a native speaker.

Candidate d7384c9d... (moonshotai/kimi-k2.6)
- Also contains many unnatural phrases, inconsistent register, and mistranslations (examples: "Il tuo portatile è un identity broker" rendered oddly, many literal calques, repeated anglicisms, inconsistent terminology across the document).
- Several segments show collapsed meaning or awkward Italian grammar; would need comprehensive copy-editing.
- Recommendation: escalate — not publishable as-is.

Action
------
1. Keep the minimax-m2.7 candidate (5e5bf8b...) as the accepted translation.
2. Mark e52466a... and d7384c9d... for escalation/review; they either need heavy post-editing or should be discarded in favor of the accepted candidate.

If you want, I can:
- Run a focused pass to extract a small list of precise edits for the accepted candidate (typos, punctuation, small style tweaks) — but I believe the selected candidate is publication-ready.
- Produce a short checklist for a native Italian reviewer to sign off before publishing (consistency checks, capitalization, product names, links).
