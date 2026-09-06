# Content and visual review, September 5

Reviewed both talks against Dan's latest direction and the legacy-content cleanup.

## Findings fixed

- Both browser decks were text-only while the outlines carried unused generic image prompts. Added eight editable SVG diagrams per talk, linked the exact assets from the outlines, and marked the remaining slides as intentional typography.
- The parallelization lightning script and workshop underrepresented independent solution attempts. Both now include the common rubric, rejection of invalid candidates and revalidation of a combined design.
- The parallelization standard abstract exceeded a 100-word field by one word. Submission copy now fits; displayed word counts match the text.
- The sensitive-data visual explicitly routes worker status through an allowlist filter. It separates that return path from scoped worker access to storage.
- The portfolio's blanket claim that every slide has an illustration prompt now reflects the actual diagrams and typography used by these talks.

## Verification

- Rendered and visually inspected all 32 browser slides in installed Chrome through Playwright at a 1440 × 1000 viewport.
- Both decks contain 16 slides, 16 speaker-note blocks and 2,400 seconds of pacing metadata.
- All 16 SVG assets load, have descriptive alt text, parse as XML, and keep their text within the viewBox. No detected heading, display-text or slide-row overflow.
- Compared every 40-minute outline prose paragraph with the corresponding presenter script and browser speaker notes; no mismatch found.
- Checked contiguous timing intervals in all six 15/30/40-minute scripts, and all active packet, outline and engineering-handout local links.
- Checked illustrative accounting arithmetic, source/fixture boundaries and removal of unused image prompts.
- Checked whitespace with `git diff --check`.

[Adaptive visual inventory](adaptive-systems/visuals.md) · [Parallelization visual inventory](parallelization/visuals.md)

Current presentation artifacts are the HTML decks, SVG assets and Markdown talk materials. No application build, model inference, provider call, production recovery test or measured speaking rehearsal was performed. Diagrams show proposed architectures and synthetic scenarios; timings remain rehearsal targets.
