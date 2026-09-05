# Four flagship talks

Eight editable PowerPoint decks in the Simple Dark Mode template, each with speaker notes and a matching timed outline. Dan Levy is the named presenter. Timings are rehearsal targets and exclude Q&A.

| Talk | Audience | Lightning | Full talk |
| --- | --- | --- | --- |
| From RAGs to Retrievals: Learn the New Engineering Speak | Engineers and technical leaders moving into AI | [15 minutes / 9 slides](retrieval-15min.pptx) | [40 minutes / 18 slides](retrieval-40min.pptx) |
| Stop Looking at My Benchmarks… Get Your Own! | AI and product engineering teams | [15 minutes / 9 slides](benchmarks-15min.pptx) | [40 minutes / 18 slides](benchmarks-40min.pptx) |
| Rethinking Parallelization in the Agentic Era | Staff engineers, architects and platform teams | [15 minutes / 9 slides](parallelization-15min.pptx) | [40 minutes / 18 slides](parallelization-40min.pptx) |
| Code Is Cheap. Judgment Is Expensive. | Engineering leaders, CTOs and senior engineers | [15 minutes / 9 slides](judgment-15min.pptx) | [40 minutes / 18 slides](judgment-40min.pptx) |

## Outlines and rehearsal

Each deck has a companion file ending in `-outline.md` with slide timings, visible copy and speaker guidance. The PowerPoint notes contain the same delivery guidance. Notes are prompts for delivery, not word-for-word scripts.

The lightning versions introduce a focused argument and leave the detailed examples to the longer talk. For a 45-minute session, deliver the 40-minute version and reserve five minutes for questions. Rehearse once before accepting a hard cutoff.

## 30-minute adaptations

Use the 40-minute deck and hide the slides listed below. The remaining slide timings total 30 minutes. Bridge omitted examples verbally with the transition shown.

| Talk | Hide these slides | Transition |
| --- | --- | --- |
| Retrievals | 2, 5, 10, 14, 17 | Introduce the vocabulary directly. Fold judge calibration into the eval spectrum, permission scope into MCP, and the genuinely new behavior into the closing. |
| Benchmarks | 4, 5, 6, 16, 17 | Let the fictional comparison establish the limits of public benchmarks. Introduce the cancellation job directly and cover the regression loop when discussing system evaluation. |
| Parallelization | 2, 3, 10, 16, 17 | Move from the opening directly into the six patterns. Mention model choice in the budget discussion and reuse in the compilation section. |
| Judgment | 2, 4, 10, 12, 14 | Move directly to the review queue. Discuss ownership and generated-test limitations during trustworthy review. |

## What each talk offers

**Retrievals:** A translation between familiar engineering concepts and AI terminology. The examples identify where the analogies help and where they fail, covering retrieval, evals, agents, tool interfaces and context.

**Benchmarks:** A method for defining product-specific acceptance criteria, turning production failures into eval cases, calibrating judges, and choosing systems by workload quality and operating cost.

**Parallelization:** Six patterns for using multiple attempts to explore uncertainty. The argument includes selection cost, correlated failures, speculative side effects and the opportunity to turn recurring reasoning into tested deterministic artifacts.

**Judgment:** An organizational argument about review capacity, explicit specifications, validation infrastructure and ownership when teams can produce more candidate implementations.

## Example data

Benchmark scores, workload pass rates and costs are illustrative fictional data supplied with the talk concept. They do not compare current products. Agent budget examples are hypothetical. The talks make no measured productivity or cost-saving claims. Their technical arguments and speaker guidance develop the supplied talk concepts.
