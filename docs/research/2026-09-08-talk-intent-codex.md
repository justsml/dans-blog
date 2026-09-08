# Talk intent research — Codex side

Date: 2026-09-08

Source: user messages in locally available Codex conversations

Status: extracted intent and discussion history; not an approved final talk architecture

## Scope and provenance

This is the **Codex side** of the research: a distillation of Dan's user messages about recent talks, presentations, and conferences. It records concepts, later clarifications, presentation requirements, and event preferences without treating existing talk artifacts as authoritative.

The extraction searched 2,125 locally available Codex session logs. The substantive recent talk discussions found cluster around September 4–8, 2026. Relevant user-message follow-ups were also inspected so short corrections without talk-related keywords were included.

Existing talk files, decks, review files, and repository content were not opened for the extraction. A memory index helped locate original conversations; the report's substantive evidence comes from user-message text. Assistant responses, tool output, injected instructions, automated approval-review transcripts, and duplicated messages were excluded as evidence.

Some user messages contain pasted briefs or review instructions. Those are distinguished below from Dan's later spoken explanations and corrections. Some original material appears only as attachment references. Those attachments were left unopened, so this report does not claim to reconstruct their contents or conversations unavailable in the local history.

Source references identify local session logs and JSONL line numbers. They are provenance pointers, not public links. Dates in the narrative refer to the September discussion; provider capabilities, economic estimates, and future scenarios were not independently verified for this extraction.

## Overall body of work

The messages describe a connected body of work about how we build, evaluate, pay for, and exercise judgment over AI systems, with distinct engineering, leadership, and education audiences. The strongest recent additions concern adaptive recovery, multiple layers of parallelism, and the economic consequences of subsidized AI.

## 1. Adaptive agentic apps: recovery from unforeseen problems

Dan's clearest description is fault tolerance and resilience built into agents that can problem-solve through conditions not explicitly anticipated.

- Recover from changing third-party APIs: renamed or disappearing fields, changed types, and inconsistent schemas.
- Regenerate mapping artifacts, potentially version them or support migrations.
- Respond to failures by adding delays, reducing batch sizes, changing concurrency, or selecting another available region or service.
- Apply this to ingestion, ETL, batch jobs, search integrations, infrastructure monitoring, and security operations.
- Give engineers prioritized observations about how the system has adapted.

The corresponding danger is unconstrained optimization. An instruction such as maximizing extraction quality can encourage reward hacking or runaway resource consumption. Adaptation needs limits on goals, costs, capabilities, and acceptable actions.

A later addition makes this approachable: working and observational memory that remembers which generated commands succeeded or failed. SQL, shell commands, and scripted API operations are examples. The agent checks proposed output against remembered execution results and corrects known mistakes before returning it. Dan also requested a succinct prompt that records frequency patterns and successful/failed generation and execution.

Suggested naming in Dan's spoken explanation: **Adaptive Agentic Apps**.

Sources: S2, lines 9 and 1155.

## 2. Parallelization: where work runs and how its layers compose

The messages distinguish several mechanisms:

- Multiple tools running concurrently.
- Parallel work inside one tool call, such as a search tool accepting four queries.
- Agents coordinating background shells, threads, or concurrent work.
- Remote containers and sandboxes providing additional compute.
- Durable execution for long-running or intermittent tasks.
- Combinations of these approaches.

A concrete failure mode: a tool internally generates ten images, but the orchestrator invokes it four times. An apparently small number of tool calls becomes forty expensive jobs.

The talk should address where concurrency control lives, how nested parallelism multiplies work, and how failures change batch size or scheduling. Dan mentioned semaphores or locks as possible controls, alongside instructions governing coordination.

Examples include image and video generation, route optimization, data processing, and bursty DNS lookups. Dan explicitly added streaming interfaces as a skill developers need when composing these applications.

Sources: S2, line 9; S3, lines 180 and 407.

## 3. On-demand infrastructure as an application capability

A later clarification adds a distinct architectural point:

> “moves management from Infra/Ops into the app/user control plane”

Dan described ad hoc, metered containers for webhooks, compute, GPUs, and other work. Named examples included Fly Sprites, Cloudflare Durable Objects, Vercel Sandboxes, and E2B. These are examples mentioned in the conversation, not a verified current capability comparison.

The application or agent can choose and coordinate execution resources according to the customer's task:

- Long-running, sparse workloads.
- Short, highly bursty workloads.
- More private processing.
- More tailored customer experiences.
- Resources that activate, sleep, or disappear as needed.

Dan also supplied a client anecdote in which a frontier model coordinated local-model processing without receiving sensitive results itself; signed storage access mediated the handoff. The anecdote was not independently verified in this extraction.

Sources: S3, line 407; S2, line 9.

## 4. Parallel perspectives and possible solutions

A second branch of parallelization concerns exploration and judgment, beyond dividing execution work.

Dan described generating a small number of deliberately different approaches:

- Ruthless minimalist.
- Perfectionist or standards enforcer.
- Security- and performance-focused.
- Other personas appropriate to frontend, backend, or greenfield work.

The preferred practical shape was typically two to five perspectives, generated concurrently, followed by a stronger model with a higher thinking budget that critically combines the best ideas.

Dan explicitly questioned generating 50 or 500 alternatives: review burden, confusion, and endless output can erase the value.

The earlier supplied brief enumerated decomposition, competition, perspective, search, verification, and speculative execution. The later explanation gives that broad taxonomy a concrete center: a council of different approaches, followed by critical synthesis.

Sources: S1, line 9; S2, line 9.

## 5. Turn failures and expensive reasoning into reusable improvements

This theme connects evaluation, adaptive systems, and parallelization:

- Capture failures and successful corrections.
- Turn production experience into regression cases.
- Judge alternatives using explicit criteria.
- Remember what works.
- Convert repeated solutions into scripts, SQL, mappings, rules, tests, or other reusable artifacts.
- Reduce how often recurring problems require fresh reasoning.

The initial supplied brief expressed this as:

> “Use expensive nondeterminism to discover cheap determinism.”

Dan's later spoken explanation connects comparative generation plus rubric-based judging to an auto-improving loop, while noting that this is another talk.

**Automating Improvement From Failure** appears in the ten-talk list. A later user message containing review directions introduces alert fatigue, normalization of deviance, jidoka, automation irony, and Goodhart as proposed supporting material. These are review-derived directions supplied in a user message, distinct from Dan's explanatory anecdotes.

Sources: S1, line 9; S2, lines 9 and 1155; S4, line 9; S5, line 9.

## 6. Evals define success for the actual workload

The supplied **Stop Looking at My Benchmarks… Get Your Own!** brief is about replacing leaderboard-driven decisions with workload-specific evidence.

- Define the jobs the system must perform before selecting models.
- Include tools, prompts, retrieval, policies, and orchestration in evaluation.
- Capture complaints, failed traces, overrides, malformed outputs, and surprising successes.
- Use deterministic checks where possible, calibrated model judges where useful, and expert review where necessary.
- Break results down by failure class; aggregate success rates can conceal an entirely broken workflow.
- Compare quality, reliability, latency, and cost together.
- Use findings to support routing, cheaper models, fallbacks, caching, and deterministic substitution.

A later pasted review proposes a measurement-validity angle: whether the eval instrument itself has been validated, including construct validity and lessons from information retrieval evaluation. This is a later proposed development, not evidence that the original workload-focused argument disappeared.

Sources: S1, line 9; S5, line 9.

## 7. Subsidized AI changes habits and hides application economics

The September 7 transcript develops audience-specific versions of this argument.

For individual engineers:

- Subscriptions obscure the underlying cost of usage.
- Routine actions such as staging files, committing, or merging can consume reasoning unnecessarily.
- An experience that feels inexpensive personally can establish expensive habits.

For product builders and employers:

- API economics differ from subscription economics.
- Increasingly elaborate agent behavior can deepen dependence on costly models and hosted platforms.
- Open models should not be assumed to reproduce sophisticated, long-running agent behavior without substantial additional work.
- Architecture and model choice affect future affordability and dependence.

Dan raised estimates such as 25–50× subscription value and $5,000–$10,000 of usage for $200. These are claims or estimates raised in the conversation, not established figures in this report.

**Cry Me a Free Tier** appears in the earlier portfolio list; the later transcript supplies a more specific explanation of the economic concerns.

Sources: S3, line 180; S4, line 9.

## 8. Education: dependency, learning evidence, and the eventual bill

The education-specific subsidy argument is distinct:

- Discounted or free institutional access encourages adoption.
- If credible evidence establishes learning benefits, schools and parents may become strongly dependent on continued access.
- Providers may then have greater pricing power.
- Budgets could face major pressure when subsidies end or limits arrive.
- Dynamic model selection, alternative hosting, and specialized models deserve consideration.
- Safety claims for alternatives require testing; Dan explicitly said more research is needed.

The remark that school budgets could grow 10× is a future-risk scenario Dan voiced, not a measured forecast.

Earlier messages also name **A Skeptic's Guide to Surviving AI in Education** and **Outsmart Your Lying, Cheating Students**. Their original detailed six-concept handoff is represented by an attachment reference. This extraction does not reconstruct those talks from their titles or assistant-written content.

A later pasted review proposes either retiring the skeptic talk or narrowing it to procurement, while explicitly leaving that decision open. This report records the proposal without treating retirement as settled.

Sources: S3, line 180; S4, line 9; S5, line 9; S6, line 9.

## 9. Cheap code moves the bottleneck toward judgment

The supplied **Code Is Cheap. Judgment Is Expensive.** brief describes a shift toward:

- Deciding what should exist.
- Specifying behavior and constraints.
- Evaluating, reviewing, and integrating generated work.
- Managing complexity, maintenance, and risk.
- Measuring validated customer outcomes instead of code volume.

It treats an engineer coordinating agents as something like a small engineering organization: framing work, assigning attempts, evaluating results, and integrating the chosen approach.

A later pasted review suggests queueing and Kingman's formula as an opening for the review-capacity bottleneck.

**The Future of Product Engineering** also appears as a separate named talk, but its original detailed brief is among the attachment-only material. The available text does not justify silently merging it into the judgment talk.

Sources: S1, line 9; S4, line 9; S5, line 9.

## 10. Familiar engineering concepts and what actually changed

The original **From RAGs to Retrievals: Learn the New Engineering Speak** brief maps AI terminology onto search, testing, RPC, state, scheduling, and observability.

It explicitly warns against treating the mappings as exact. Proposed differences include probabilistic execution, natural language influencing control flow, dynamic tool choice, and provisioned reasoning.

A later pasted review proposes a substantial replacement, **Your Eval Suite Has a Grandfather**, centered on information retrieval's evaluation history. Both directions occur in user messages. The record contains a change proposal, not one uncontested final thesis.

Sources: S1, line 9; S5, line 9.

## Presentation and editorial requirements

Across follow-ups, Dan requested:

- Distinct, coherent talks with persuasive arguments.
- Multiple durations, Markdown outlines, scripts, slides, and synchronized formats.
- Separate succinct on-screen and fuller handout/download versions.
- Preservation of the latest content: “don't editorialize, or modify reference content.”
- Preservation of his voice: “don't ruin the voice ffs.”
- Much simpler infographics: “75% less words.”
- Supporting code that is easy to find and understand.

Earlier production requests included the Simple Dark Mode template, graphics as needed up to three per deck, Reveal.js slideshows, and generated images. Those requests do not establish approval of the resulting artifacts: Dan later explicitly criticized their visual quality and coherence.

The latest explicit correction about the example is especially important:

> “no demo, jesus... just a supporting example in a separate repo we can reference”

That supersedes treating that example as a presentation demo. It does not establish a blanket prohibition on every possible demonstration in every talk.

The supplied review instructions also specify dry, concrete, self-implicating prose; short declaratives; a joke that lands and moves on; one scope statement rather than repeated disclaimers; and no invented personal anecdotes or measurements.

Sources: S1, line 9; S2, lines 316 and 1489; S3, lines 330 and 375; S5, lines 9 and 85; S7, lines 9 and 51; S8, lines 272 and 479.

## Conference and audience requirements

Dan asked for each talk's relevance and focus to match actual conferences, events, and meetups, with:

- Event history, audience, dates, conference links, and CFP/application links.
- Application requirements, speaker economics, and rights.
- Clear separation of confirmed opportunities from historical patterns or closed CFPs.
- A shortlist per talk and a consolidated portfolio shortlist.
- Popular local meetups and Luma-style events.
- Ranking that accounts for location and ease of applying.

The supplied research instructions requested a next-18-month horizon, a top-10 shortlist per talk where evidence supports it, and a consolidated top-20 shortlist without duplicate editions. Discovery and preparation did not authorize outreach or applications.

The strongest location preferences were Denver, Boston, NYC, and Seattle, followed by SF, San Diego, New Orleans, Las Vegas, LA, Chicago, Austin, Nashville, Orlando, Miami, or similar. Dan said overseas travel would become possible in roughly 6–9 months from that September discussion. These are dated preferences, not freshly reconfirmed travel availability.

The requested application-difficulty scale ran from 1, easy or readily achievable requirements, to 5, substantial credentials, recordings, and similar requirements.

Dan also asked which application requirements were broadly reusable, and requested a speaker bio plus a detailed inventory of relevant experience and credentials.

Sources: S3, line 180; S4, lines 9, 942, 1519, and 1547; S6, line 326.

## Unresolved distinctions to preserve

- Adaptive recovery and parallel execution are related but have different central arguments.
- Runtime parallelism and competing perspectives are different uses of parallel work.
- Personal subscription economics, product operating economics, and school procurement have different audiences and consequences.
- The original retrieval brief and proposed replacement both appear in user messages; they should not be silently flattened into a single settled intent.
- Skeptic-talk retirement was a proposal with an explicit unresolved decision.
- Detailed original intent for attachment-only concepts remains incomplete in this extraction.
- User-supplied estimates, forecasts, anecdotes, and pasted review proposals retain those evidence labels.
- This document is research provenance, not an ADR accepting an architecture or authorizing a portfolio rewrite.

## Source register — Codex user messages

All paths below are under `/Users/dan/.codex/sessions/`. Line numbers refer to the original JSONL logs. Only user-message text at the cited locations supports this report.

| ID | Session log | Relevant lines |
| --- | --- | --- |
| S1 | `2026/09/04/rollout-2026-09-04T19-00-59-01a06f15-4416-7900-be6a-d4626b4857dd.jsonl` | 9: four supplied flagship briefs and production request |
| S2 | `2026/09/05/rollout-2026-09-05T19-33-12-01a07459-1eea-7470-8da3-718ed51cc894.jsonl` | 9: adaptive and parallelization explanation; 316: screen and handout formats; 1155: memory pattern; 1489: preserve content across formats |
| S3 | `2026/09/07/rollout-2026-09-07T15-07-40-01a07db2-bc1e-79c2-8f01-5fb69b69d7db.jsonl` | 180: corrected transcript and audience alignment; 330: infographic request; 375: 75% fewer words; 407: app-controlled compute and combined parallelism |
| S4 | `2026/09/04/rollout-2026-09-04T23-57-14-01a07024-7b96-7993-9c3b-72d469144770.jsonl` | 9: ten-talk list and opportunity instructions; 942: ranking and geography; 1519: reusable requirements; 1547: bio and credentials |
| S5 | `2026/09/06/rollout-2026-09-06T02-32-27-01a075d8-f49b-7342-8d0a-a09c9c56b64f.jsonl` | 9: supplied review directions and voice requirements; 85: preserve voice |
| S6 | `2026/09/04/rollout-2026-09-04T22-18-39-01a06fca-3b02-70b2-8416-4092c1db6437.jsonl` | 9: attachment-only six-concept handoff reference; 326: event research request |
| S7 | `2026/09/07/rollout-2026-09-07T20-44-22-01a07ee6-fd11-7a00-8955-d37b333a284e.jsonl` | 9: deck coherence criticism; 51: separate-repository supporting example, not a demo |
| S8 | `2026/09/06/rollout-2026-09-06T01-38-30-01a075a7-8cf5-77d1-b8a0-bdead8e4a16b.jsonl` | 272: current, framework-appropriate examples; 479: examples easy to find and understand |

### Direct local links to principal messages

- [S1: Original supplied flagship briefs](/Users/dan/.codex/sessions/2026/09/04/rollout-2026-09-04T19-00-59-01a06f15-4416-7900-be6a-d4626b4857dd.jsonl:9)
- [S2: Adaptive and parallelization explanation](/Users/dan/.codex/sessions/2026/09/05/rollout-2026-09-05T19-33-12-01a07459-1eea-7470-8da3-718ed51cc894.jsonl:9)
- [S3: Corrected subsidy and application-design transcript](/Users/dan/.codex/sessions/2026/09/07/rollout-2026-09-07T15-07-40-01a07db2-bc1e-79c2-8f01-5fb69b69d7db.jsonl:180)
- [S4: Conference ranking preferences](/Users/dan/.codex/sessions/2026/09/04/rollout-2026-09-04T23-57-14-01a07024-7b96-7993-9c3b-72d469144770.jsonl:942)
- [S5: Supplied review directions](/Users/dan/.codex/sessions/2026/09/06/rollout-2026-09-06T02-32-27-01a075d8-f49b-7342-8d0a-a09c9c56b64f.jsonl:9)
- [S7: Supporting-example correction](/Users/dan/.codex/sessions/2026/09/07/rollout-2026-09-07T20-44-22-01a07ee6-fd11-7a00-8955-d37b333a284e.jsonl:51)
