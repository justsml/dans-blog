# Engineering review and simplified infographic prompts

Reviewed from a staff-engineering perspective; this is not an official OpenAI review.

## Content adjustments

- Define observable criteria before choosing a score. A vague binary is_good and a vague continuous goodness both obscure what is being measured. Focused binary labels are a useful starting point, not a universal requirement.
- Binary labels, probabilities, and Likert ratings have different meanings. Bernoulli describes a binary outcome; its probability parameter is not a general-purpose quality rating. Likert ratings need clear anchors. Use categories when they describe meaningful states; retain uncertainty separately from partial quality.
- Use deterministic checks for mechanically verifiable schema constraints and numerical rules. Valid JSON is not evidence of factual or task correctness. Extracting the relevant quantity may itself require semantic review.
- Check whether cited evidence supports the particular claim; a citation is not proof, and source support does not by itself establish source reliability.
- Swapping answer order can expose instability; agreement does not prove the judge is unbiased. Score factual/task correctness separately from presentation, while retaining presentation as a legitimate criterion when the task requires it.
- Calibrate against rubric-aligned human labels, review human disagreements, and reserve held-out cases for validation. Do not repeatedly tune against the held-out set. Include representative failures and boundary cases.
- For cost changes, compare errors by criterion and failure severity as well as overall agreement. Track false passes, false fails, abstention or uncertainty rates, latency and cost with explicit denominators. Self-reported confidence should not be assumed calibrated.

The posters distill these into five actions rather than seven dense troubleshooting panels.

## Sources

- https://developers.openai.com/api/docs/guides/evaluation-best-practices
- https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents

## Shared image prompt

Create a NEW much simpler and less cluttered educational infographic, not an edit of the previous dense images. Portrait poster, large readable typography and abundant blank space. Exactly FIVE spacious numbered horizontal sections, one simple explanatory illustration per section. No complex card-within-card layouts, no robots, no code snippets, no decorative scenery, no tiny captions. All exact text below must be rendered clearly, with no additional text except tiny numbers 1–5. Title "Better AI judging". Subtitle "Define what matters before choosing a scale."
Section 1 headline "Start with specific facts"
Body "Requirement met? Claim supported? Critical error?"
Second short sentence "Use ratings or probabilities when they answer a defined question."
Visual: three separate empty checkboxes representing three independent facts. The critical-error checkbox must not be a green success check. Do not illustrate a vague goodness slider as preferred. Binary-first is a practical starting point, not an absolute rule.
Section 2 headline "Match the grader to the job"
Body "Code for schemas and numeric rules. Model judges for meaning."
Visual: simple document splitting into curly-brace icon and small magnifier icon, clearly distinct deterministic checks versus semantic review. Schema validity does not imply content correctness. No code shown.
Section 3 headline "Check evidence, not just citations"
Body "Verify that the source actually supports the claim."
Visual: one claim card and one source document compared with a magnifier. No automatic pass stamp simply because a citation exists.
Section 4 headline "Test for judging bias"
Body "Swap answer order; review disagreements. Score correctness separately from style."
Visual: A/B and B/A mini cards with opposing order, paired with two separate minimal score dials. This is ONE restrained illustration group, no complex arrows or other small labels. Swapping does not guarantee bias disappears.
Section 5 headline "Validate before optimizing"
Body "Calibrate on human labels. Validate on held-out cases. Retest after cost changes."
Visual: two distinct small stacks, one calibration stack and a separate sealed held-out stack, with a simple review/check symbol. No fabricated metrics or numerical results.
Footer "Track false passes, false fails, uncertainty, and cost."
This is expert engineering guidance: resolution does not define the construct; binary facts can be a focused starting point, probabilities or anchored ordinal ratings remain useful; deterministic grading is for verifiable rules and model grading for meaning; bias controls need measurement; human labels need rubric agreement; tuning and validation sets should be separated. Convey only the exact concise copy specified above, do not add this explanatory guidance as poster text. Keep the poster readable at reduced size. All content fully within wide margins. At most two font families, strong contrast. Prioritize clarity over decoration.

## paper-simple-v4

Style: restrained paper cut-out educational poster. Warm cream paper background, forest-green typography, terracotta numbered paper tabs, subtle hand-cut paper shapes and gentle tactile shadows. Flat mostly top-down paper icons, no plants or scenery. Single-column five-row composition separated only by generous whitespace or hairline rules. Spacious, calm, highly legible.

## swiss-simple-v4

Style: rigorous minimalist Swiss editorial poster. White background, black typography, cobalt blue numbered blocks and simple flat geometric diagrams, one restrained orange accent for disagreement. Single-column five-row grid, disciplined typography, wide margins, clean thin dividing rules, almost no borders. Spacious, crisp, exceptionally legible.

Generated using the built-in image_gen tool.

