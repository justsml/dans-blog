# Infographic generation prompts

Generated with the built-in image_gen tool.

## Shared prompt

Use case: infographic-diagram. Create a polished, highly understandable standalone educational infographic about improving an AI evaluator. Title exactly: "Better AI judging". Subtitle exactly: "Match the measured failure to an experiment." Include all SEVEN numbered failure → experiment pairs, with readable large type and explanatory illustrations that show what each experiment does. Preserve these exact words:
1. "Misses a required condition" → "Split the rubric into atomic checks"
2. "Accepts unsupported claims" → "Require cited evidence before a pass"
3. "Flips near a numeric threshold" → "Use pass, fail, and uncertain"
4. "Favors the first answer" → "Reverse order and require agreement"
5. "Overweights writing style" → "Score correctness separately from presentation"
6. "Returns malformed JSON" → "Use a strict schema and shorter output"
7. "Costs too much" → "Remove rationale, examples, or reasoning effort one at a time"
Footer exactly: "Test one change at a time. Measure again."
Visual semantics: 1 one tangled checklist becomes separate checkboxes; 2 claim plus cited document enters evidence gate; 3 clear FAIL / UNCERTAIN / PASS regions around a threshold, uncertainty region is amber; 4 A/B and B/A comparisons produce matching decisions, not claims of perfect neutrality; 5 two independent meters labeled correctness and presentation; 6 broken curly braces become a compact schema-shaped valid object; 7 three removable blocks with only one removed in each experiment, to convey cost ablation. Do not invent numerical results, guarantees, data, or code examples. Don't simply reproduce a text table: make illustrations the explanatory core. Seven panels must have unmistakable reading order, plentiful whitespace, large legible copy, no tiny captions, no decorative filler, no cropped content. Portrait high-resolution artwork. 

## 01-repair-manual

Style: illustrated field repair manual. Warm off-white paper, charcoal precise line drawings, restrained orange and teal highlights. Seven spacious horizontal illustrated modules, clear before→after transformations, numbered orange tabs. Practical technical handbook tone, immaculate typography.

## 02-comic-strip

Style: friendly educational comic strip. Seven generous panels with bold ink outlines, flat colors, simple expressive abstract evaluator robot as a small recurring guide. Use visual actions and arrows, not speech-bubble clutter. Each panel pairs a visible failure and its experimental repair. Clean modern editorial comic with cream, blue, coral, amber.

## 03-transit-map

Style: transit wayfinding map. Seven independent clearly numbered short routes from a failure station to an experiment station, each route includes an illustrative explanatory mechanism. No connecting different tips as sequential steps. White background, vivid restrained route colors, strong geometric symbols and superb signage typography, clear row-by-row reading.

## 04-swiss-poster

Style: Swiss editorial information poster. Extremely clean asymmetric typographic grid with seven illustrated modules, vivid cobalt blue, black, warm white, small orange accents. Oversized numerals, geometrically simplified but semantically explicit pictograms, elegant arrows and strong visual hierarchy. Distinct from a conventional table.

## 05-cut-paper-guide

Style: tactile cut-paper educational illustration. Cream background with layered colored paper shapes, subtle physical shadows, rich forest green, terracotta, mustard, pale blue. Seven clearly ordered roomy modules, diagrams made from recognizable paper documents, gates, gauges and movable blocks. Crisp printed large text, sophisticated approachable teaching poster.

## 06-isometric-lab

Style: isometric miniature evaluator laboratory, technical but approachable. Seven separate numbered lab workstations, each showing a concrete failure→experiment mechanism, with large flat readable text labels outside the isometric scenes. Pale background, teal, indigo, amber and coral, clean soft 3D forms, no perspective-distorted text. Spacious seven-module poster.

