# Updated infographic prompts

Generated using the built-in image_gen tool. Final images were corrected to show reversed answer order and calibration flowing from human labels to the model judge.

## Shared generation prompt

Use case: infographic-diagram. Generate a highly understandable, beautifully illustrated educational infographic. Portrait composition, seven roomy numbered panels. This is the updated second iteration of the AI evaluator guide. Title exactly "Better AI judging". Subtitle exactly "Match the measured failure to an experiment." All seven pairs must appear with crisp legible text:
1 "Misses a required condition" → "Check every requirement separately"
Supporting caption: "Test answers that each omit one requirement."
Illustration: separate requirement checkboxes and an answer deliberately missing one, correctly caught.
2 "Accepts unsupported claims" → "Verify that cited evidence supports the claim"
Supporting caption: "Test irrelevant and contradictory citations."
Illustration: a claim and a cited source compared through an evidence gate; a citation alone does not automatically pass.
3 "Flips near a numeric threshold" → "Test rubric-defined categories"
Supporting caption: "Calibrate boundaries on labeled examples."
Illustration: four clearly distinct labeled category cards in this order "Does not meet", "Partially meets", "Meets", "Exceeds". Below these, a separate small card "Uncertain" with caption "Insufficient evidence or judge uncertainty". Uncertain must NOT be on the quality continuum or confused with Partially meets. Category boundaries need calibration; do not imply all wobble requires categories. This experiment is an option to test.
4 "Favors the first answer" → "Judge both answer orders"
Supporting caption: "If the winner changes, record disagreement and escalate."
Illustration: A/B and B/A cards yield two decision cards and a disagreement review route; do NOT imply order reversal guarantees agreement.
5 "Overweights writing style" → "Score correctness separately from presentation"
Illustration: two independent gauges or scorecards labeled "Correctness" and "Presentation", clearly separated.
6 "Returns malformed JSON" → "Use a strict schema and shorter output"
Illustration: a broken curly-brace document becomes compact structured output fitting a schema template; use abstract lines, not invented malformed code labeled valid.
7 "Costs too much" → "Use deterministic checks first, then a calibrated model judge"
Supporting caption: "Test each cost reduction on a fixed human-labeled set."
Illustration: code-check stage leading to model-judge stage, with human-labeled reference cards as the calibration reference. No fabricated statistics or guarantees.
Footer exactly "Change one thing. Check false passes, false fails, and cost."
Prioritize clear teaching through explanatory illustrations, large readable type, all content fully visible, generous margins, unmistakable 1–7 reading order. Panels 3 and 7 may need extra space. No promotional slogans, decorative filler, vendor logos, or invented results.

## paper-cutout-v2

Style: tactile cut-paper illustration, cream paper background, layered hand-cut colored paper shapes, subtle real shadows, forest green, terracotta, mustard, pale blue. Sophisticated approachable teaching poster with large crisp printed text. Mostly two-column reading grid, category panel can span full width to give four labels and a separate uncertainty card room. Distinct educational paper-craft scenes in every panel.

## swiss-poster-v2

Style: Swiss editorial information poster, clean asymmetric typographic grid, cobalt blue, black and warm white with restrained orange accents. Oversized numerals, geometrically simplified semantically explicit illustrations, impeccable alignment and typography. Flat graphic shapes, spacious seven-module grid. Category panel can span full width to keep all four category labels readable and uncertainty distinct. Strong visual hierarchy and excellent scanability.

