# Version 5: repeatability first

Generated with built-in image_gen. Intermediate information density, six modules; same-input repeatability and criterion definition are the visual priorities.

## Editorial distinction

Judge repeatability and judge accuracy are separate properties. Repeated judgments on fixed, unlabeled inputs can expose disagreement without a gold-labeled evaluation dataset. Use such examples to simplify ambiguous criteria, pin the available model version and configuration, fix evidence and request construction, and compare before/after disagreement per criterion. Model services can retain nondeterminism despite low temperature or a pinned configuration, so measure rather than promise its elimination.

A repeatable judge with unknown accuracy is easier to debug and compare than an unstable one; this is an operational advantage, not evidence that its decisions are safe or correct. Explicit uncertain/review outcomes can clarify behavior, but always abstaining would trivially improve apparent stability. Track coverage and uncertainty alongside disagreement. Cached responses also do not demonstrate fresh-inference repeatability.

Human-reviewed labels and held-out cases serve correctness assessment and calibration. They need not block initial stability work. Preserve validation data from tuning. Recheck both axes after changing prompts, evidence construction, model, or cost controls.

Binary facts are a focused starting point; probabilistic estimates and anchored ordinal or categorical judgments are still appropriate when their meaning is defined. More score resolution does not define the construct.

## Reference context
- https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
- https://developers.openai.com/api/reference/python/resources/responses/methods/create

## Shared prompt

Use case: infographic-diagram. Create a new professionally art-directed infographic of INTERMEDIATE complexity: substantive engineering detail and meaningful diagrams, but no tiny text, nested cards, decorative clutter, or giant blank icons. Portrait high-resolution. Six numbered modules, clear reading order. The first module is the dominant full-width centerpiece. The second module is also full-width. The remaining four modules form a balanced 2x2 grid. Good whitespace, restrained type scale, each diagram explains a mechanism. Title "Build a steadier AI judge". Subtitle "Reduce wobble. Define the facts. Validate correctness."
Render the following exact copy. Do not add unrelated text.
1 heading "Make repeatability the first target"
Body "Freeze the input, rubric, model version, and settings. Repeat the same judgment; compare labels per criterion."
Emphasized note "Start with unlabeled examples. You do not need a gold dataset to measure wobble."
Small but readable bottom line "Stable does not mean correct. Accuracy may still be unknown."
Diagram: one fixed input document branches to three repeated judgments with labels "Pass", "Fail", "Pass", grouped as "Wobble". A separate small box labelled "Explicit uncertain / review" represents a possible defined outcome after addressing ambiguity, NOT a magical guaranteed solution. No statistics, no claim that one change ensures determinism, no majority vote depicted as truth. The centerpiece should make repeated same-input disagreement visually obvious.
2 heading "Choose the facts before the scale"
Body "A finer goodness score cannot repair a vague question. Start by labeling the binary facts that matter."
Diagram: small vague slider labelled "goodness: 0–1" with question mark; next to it three crisp independent label cards: "Requirement met?", "Claim supported?", "Critical error?". These are distinct yes/no facts, not ordinal positions.
Closing sentence "Use probability estimates, Likert ratings, or categories when they answer a defined question."
3 heading "Move exact rules into code"
Body "Check schemas, required fields, and numeric cutoffs deterministically. Reserve model judgment for meaning."
Diagram: schema document and calculator route to a code-check box, distinct from a semantic-review magnifier. Tiny diagram labels optional only if already in copy. No actual code or JSON snippets. Do not imply format validity establishes correct content.
4 heading "Require supporting evidence"
Body "Check that the cited passage supports the claim. Score correctness separately from presentation."
Diagram: claim and source excerpt linked through a magnifier plus a restrained correctness/style separation. No invented claims, studies, or authors.
5 heading "Expose order effects"
Body "Judge A/B and B/A. Record changed winners; route disagreement to review."
Closing sentence "Agreement alone does not prove correctness."
Diagram: A/B produces "A wins"; B/A produces "B wins"; these converge to "Review". Answer identifiers are identities, not slot numbers.
6 heading "Validate accuracy as evidence grows"
Body "Use human-reviewed cases to test correctness. Keep validation cases separate from tuning."
Closing sentence "Retest stability and accuracy after cost or model changes."
Diagram: two separate stacks labelled "Tuning" and "Validation", with visible separation. No dependency arrow implying labels are required before stability work.
Footer "Track disagreement, uncertain outcomes, errors, and cost."
Engineering intent: repeatability and accuracy are separate axes. You can reduce measured same-input variation without a labeled eval dataset; accuracy remains unknown until supported by evidence. Stable uncertainty can be an operationally useful explicit outcome, but don't imply always returning uncertain is success. No absolute elimination-of-variance guarantee. No claim temperature zero ensures determinism. Preserve the nuance around scales and binary-first without statistical lecture or Bernoulli footnote. All labels readable. No robots, trees, trophies, ornamental gauges, fabricated numbers, or extra slogans.

## paper-v5

Style: sophisticated paper-cut editorial infographic. Warm cream, forest green, terracotta, mustard and muted blue. Tactile layers and subtle paper shadows only for meaningful diagrams, crisp large printed typography. Visual depth but restrained detail. Intermediate density, not a children's poster.

## swiss-v5

Style: sophisticated Swiss information design. White, near-black and cobalt, restrained orange for disagreement. Flat precise geometric diagrams, disciplined grid, bold compact section headings, medium-density technical poster with excellent scanability. Intermediate density, not a generic five-icon checklist.

