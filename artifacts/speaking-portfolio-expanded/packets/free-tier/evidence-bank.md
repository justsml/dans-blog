# Evidence bank: Cry Me a Free Tier

Firsthand examples the talk can draw on. Fill every field from your own records before use. Candidate contexts come from the resume; details, measurements, and permissions are yours to supply. Do not publish numbers you cannot reproduce.

## Entry template

- **Problem and operating context:**
- **What I personally built or changed:**
- **What failed:**
- **Before and after measurements:** (metric, baseline, after, period, how measured)
- **Diagram or screenshot:** (path)
- **What remains uncertain:**
- **Organization may be named publicly:** yes / no / with approval from [ ]

## Candidate 1: cost and quality improvements from an evaluation and observability practice

Resume basis: independent practice; "measurable quality and cost improvements across production features" using Langfuse, Weights & Biases, Helicone, Braintrust.

- **Problem and operating context:** [which feature, what the bill looked like, what the acceptance rule was]
- **What I personally built or changed:** [the measurement, the routing or caching change]
- **What failed:** [an optimization that cost more than it saved, or a quality regression]
- **Before and after measurements:** [cost per accepted outcome before and after; period]
- **Diagram or screenshot:** [ ]
- **What remains uncertain:** [ ]
- **Organization may be named publicly:** [ ]

## Candidate 2: fine-tuned vision language models for low-cost document understanding

Resume basis: shipping fine-tuned VLMs with Unsloth for "ultra-low-cost" document understanding.

- **Problem and operating context:** [what the frontier-model version cost per document; volume]
- **What I personally built or changed:** [the fine-tune, the acceptance suite]
- **What failed:** [ ]
- **Before and after measurements:** [cost per accepted document; accuracy against the suite]
- **Diagram or screenshot:** [ ]
- **What remains uncertain:** [ ]
- **Organization may be named publicly:** [ ]

## Candidate 3: a design review where "inference is free" ended the discussion

Any engagement. This feeds slide 7's story slot directly.

- **Problem and operating context:** [ ]
- **What I personally built or changed:** [ ]
- **What failed:** [ ]
- **Before and after measurements:** [ ]
- **Diagram or screenshot:** [ ]
- **What remains uncertain:** [ ]
- **Organization may be named publicly:** [ ]

## Candidate 4: the $22,500 monthly auth-cost engagement

Consulting catalogue basis (`src/data/consultingServices.ts`). The strongest firsthand example for slides 7 and 9.

- **Problem and operating context:** [ ]
- **What I personally built or changed:** [ ]
- **What failed:** [ ]
- **Before and after measurements:** [baseline, after, window, how measured]
- **Diagram or screenshot:** [ ]
- **What remains uncertain:** [ ]
- **Organization may be named publicly:** [ ]

## Already public, citable today

- [LLM Connection Strings](../../../../src/content/posts/2026-01-30--llm-connection-strings/index.mdx) and the [llm:// Internet-Draft](https://datatracker.ietf.org/doc/draft-levy-llm-uri-scheme/): provider addressing and portability. Support for slide 14's "rehearse one provider replacement."
- [Auto-Tune Your LLM Judge](../../../../src/content/posts/2026-08-11--auto-tune-your-llm-judge/index.mdx): cost and latency measured alongside accuracy. Support for slide 9's denominator.

## Story slots in the outline that these entries feed

| Slide | Slot |
| --- | --- |
| 1 | The first time a bill, quota, or rate change broke an assumption |
| 3 | Three or four dated reported items (not personal; refresh before each delivery) |
| 7 | A design review where "inference is basically free" ended the discussion |
