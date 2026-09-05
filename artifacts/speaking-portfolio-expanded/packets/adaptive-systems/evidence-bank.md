# Evidence bank: Building Adaptive & Dynamic AI Systems

Firsthand examples the talk can draw on. Fill every field from your own records before use. Candidate contexts come from the resume; details, measurements, and permissions are yours to supply. Do not publish numbers you cannot reproduce.

## Entry template

- **Problem and operating context:**
- **What I personally built or changed:**
- **What failed:**
- **Before and after measurements:** (metric, baseline, after, period, how measured)
- **Diagram or screenshot:** (path)
- **What remains uncertain:**
- **Organization may be named publicly:** yes / no / with approval from [ ]

## Candidate 1: agentic RAG and memory layer

Resume basis: MagicSchool.ai, persistent memory graph and retrieval framework for context-aware interactions at scale.

- **Problem and operating context:** [which request classes, what a fixed pipeline cost on the easy ones]
- **What I personally built or changed:** [routing, retrieval policy per request class, caps]
- **What failed:** [a routing decision that regressed a class nobody measured]
- **Before and after measurements:** [cost and latency by request class; escalation rate]
- **Diagram or screenshot:** [ ]
- **What remains uncertain:** [ ]
- **Organization may be named publicly:** [ ]

## Candidate 2: production agentic workflows on Mastra, LangChain, or LangGraph

Resume basis: consulting specialty in production agentic workflow systems.

- **Problem and operating context:** [anonymized if needed]
- **What I personally built or changed:** [orchestrator, worker roles, governors]
- **What failed:** [recursive spawning, budget exhaustion, a deadline that did not cancel]
- **Before and after measurements:** [ ]
- **Diagram or screenshot:** [ ]
- **What remains uncertain:** [ ]
- **Organization may be named publicly:** [ ]

## Candidate 3: a model upgrade that regressed something unmeasured

Any engagement. Feeds slide 14's story slot.

- **Problem and operating context:** [ ]
- **What I personally built or changed:** [the qualification process that followed]
- **What failed:** [ ]
- **Before and after measurements:** [ ]
- **Diagram or screenshot:** [ ]
- **What remains uncertain:** [ ]
- **Organization may be named publicly:** [ ]

## Candidate 4: the three-layer hybrid-search rescue

Consulting catalogue basis (`src/data/consultingServices.ts`, lines 187–238): a knowledge base that degraded around 25,000–50,000 indexed documents, rescued with a three-layer hybrid search. A direct example of "choose a strategy, not a model" (slide 3) and of compiling a known problem into a deterministic path (slide 15).

- **Problem and operating context:** [ ]
- **What I personally built or changed:** [ ]
- **What failed:** [ ]
- **Before and after measurements:** [ ]
- **Diagram or screenshot:** [ ]
- **What remains uncertain:** [ ]
- **Organization may be named publicly:** [ ]

## Already public, citable today

- [Semantic Vector Search](../../../../src/content/posts/2026-05-01--semantic-vector-search-landscape/index.mdx): retrieval strategy selection across exact, lexical, fuzzy, semantic, and hybrid. Support for slide 3.
- [Production AI is Terrifying](../../../../src/content/posts/2026-01-03--mastra-security-guardrails/index.mdx): input and output processors for injection detection and PII redaction in Mastra. Support for slide 8's "boundary checks run in code before the call."
- [Auto-Tune Your LLM Judge](../../../../src/content/posts/2026-08-11--auto-tune-your-llm-judge/index.mdx): support for slide 9's calibrated confidence and slide 14's eval-and-tuning loop.
- Resume claims of production experience across Anthropic, OpenAI, Llama, Mistral, and Gemini models support slide 14's model-onboarding process; cite as experience, not as a comparison result.

## Story slots in the outline that these entries feed

| Slide | Slot |
| --- | --- |
| 1 | A request the system over- or under-served because the architecture was fixed |
| 7 | A fixed pipeline that forced a bolted-on special case |
| 14 | A model upgrade that regressed something nobody was measuring |
