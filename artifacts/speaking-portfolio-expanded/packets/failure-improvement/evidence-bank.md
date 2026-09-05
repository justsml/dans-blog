# Evidence bank: Automating Improvement From Failure

Firsthand examples the talk can draw on. Each entry needs every field filled from your own records before it is used on stage or in an application. Candidate contexts below come from the resume; the details, measurements, and permissions are yours to supply. Do not publish numbers you cannot reproduce.

Practitioner events (GIDS, PlatformCon, SREcon, AI Agent Event) weigh this section heavily.

## Entry template

- **Problem and operating context:**
- **What I personally built or changed:**
- **What failed:**
- **Before and after measurements:** (metric, baseline, after, period, how measured)
- **Diagram or screenshot:** (path)
- **What remains uncertain:**
- **Organization may be named publicly:** yes / no / with approval from [ ]

## Candidate 1: evaluation pipeline with deterministic and model-graded scoring

Resume basis: MagicSchool.ai, LLM observability and tuning; Braintrust, AutoEvals, custom scoring; Claude Code skills for evaluation.

- **Problem and operating context:** [which product feature, which failure class kept recurring, who was correcting it]
- **What I personally built or changed:** [the pipeline, the skills, the scoring harmonization]
- **What failed:** [a lesson that was promoted and turned out wrong, or a gate that was missing]
- **Before and after measurements:** [recurrence per comparable run, human correction time, regression escapes]
- **Diagram or screenshot:** [ ]
- **What remains uncertain:** [ ]
- **Organization may be named publicly:** [ ]

## Candidate 2: AI-augmented engineering workflows across an org

Resume basis: Hotel Engine, LLM-assisted code review, test generation, documentation pipelines.

- **Problem and operating context:** [which workflow, how many teams]
- **What I personally built or changed:** [ ]
- **What failed:** [the instruction that grew without pruning, the review rule that drifted]
- **Before and after measurements:** [ ]
- **Diagram or screenshot:** [ ]
- **What remains uncertain:** [ ]
- **Organization may be named publicly:** [ ]

## Candidate 3: consulting engagement with an evaluation and observability practice

Resume basis: independent practice using Langfuse, Weights & Biases, Helicone, Braintrust.

- **Problem and operating context:** [anonymized client context if naming is not permitted]
- **What I personally built or changed:** [ ]
- **What failed:** [ ]
- **Before and after measurements:** [ ]
- **Diagram or screenshot:** [ ]
- **What remains uncertain:** [ ]
- **Organization may be named publicly:** [ ]

## Already public, citable today

These need no permission and can go in an application as work samples.

- [Auto-Tune Your LLM Judge](../../../../src/content/posts/2026-08-11--auto-tune-your-llm-judge/index.mdx): a measured evaluator-tuning loop with variance, accuracy, cost, and latency. Direct support for slide 12 (GEPA/DSPy) and the holdout discipline.
- [Fight Evils with Evals!](../../../../src/content/posts/2026-05-06--llm-evals-are-broken/index.mdx): deterministic, model-graded, and human evaluation with a concrete harness. Support for slides 7–9.
- [Semantic Vector Search](../../../../src/content/posts/2026-05-01--semantic-vector-search-landscape/index.mdx): exact, lexical, fuzzy, semantic, and hybrid retrieval. Support for the search ladder on slide 11.
- OSS ledger: Mastra streaming output-processor fix (`src/shared/ossData.ts`, lines 3–9). Link the exact PR before citing.

## Story slots in the outline that these entries feed

| Slide | Slot |
| --- | --- |
| 1 | The correction you have personally made more than three times |
| 4 | A fix you turned into a script or test so nobody has to remember it |
| 11 | A "similar" error that led you to the wrong fix |
