# Evidence bank: The Pager Cried Wolf

Firsthand examples the talk can draw on. Each entry needs every field filled from your own records before it is used on stage or in an application. Candidate contexts below come from the resume; the details, measurements, and permissions are yours to supply. Do not publish numbers you cannot reproduce.

Practitioner events (SREcon, KubeCon, PlatformCon, GIDS) weigh this section heavily. A first-person hedge is not evidence. The current outline makes no measured cost-saving claim; if one is ever added, it needs run records before it is spoken.

## Entry template

- **Problem and operating context:**
- **What I personally built or changed:**
- **What failed:**
- **Before and after measurements:** (metric, baseline, after, period, how measured)
- **Diagram or screenshot:** (path)
- **What remains uncertain:**
- **Organization may be named publicly:** yes / no / with approval from [ ]

## Candidate 1: a scheduled agent reading production logs

Resume basis: MagicSchool.ai, LLM observability and tuning; consulting practice with Langfuse, Helicone, Braintrust, cloud logging.

- **Problem and operating context:** [which system, which log source, who was reading it before]
- **What I personally built or changed:** [the scheduled check, the distill and classify prompts, the integrations granted]
- **What failed:** [the noise it summarized before you narrowed the failure class; the classification it got wrong]
- **Before and after measurements:** [time from failure to ticket, failures found before a customer report, repeat failures after a fix]
- **Diagram or screenshot:** [ ]
- **What remains uncertain:** [ ]
- **Organization may be named publicly:** [ ]

## Candidate 2: agent-driven exploratory testing against a PR diff

Resume basis: Hotel Engine, LLM-assisted code review and test generation; any client with a large Playwright or Cypress suite.

- **Problem and operating context:** [suite wall time, shard count, retry policy, flakiness rate]
- **What I personally built or changed:** [the browser MCP setup, the entry script, the "focus on the diff" instruction]
- **What failed:** [a curious action the agent took; a bug it missed that the suite caught]
- **Before and after measurements:** [cost per session, model used, bugs found per run, suite minutes replaced]
- **Diagram or screenshot:** [ ]
- **What remains uncertain:** [ ]
- **Organization may be named publicly:** [ ]

## Candidate 3: customer feedback or complaint correlated to an error

Resume basis: any product with a thumbs-down or support channel and correlated session IDs.

- **Problem and operating context:** [the feedback channel, the session identifier, the support tool]
- **What I personally built or changed:** [the correlation step, the ticket creation, the escalation rule, the human gate]
- **What failed:** [a false correlation; an escalation that should not have fired]
- **Before and after measurements:** [time from complaint to ticket with trace, proactive notices sent, credits recommended vs issued]
- **Diagram or screenshot:** [ ]
- **What remains uncertain:** [ ]
- **Organization may be named publicly:** [ ]

## Candidate 4: a repeated agent task compiled into a scheduled script

Resume basis: Claude Code skills and hooks for evaluation; Mastra output-processor work.

- **Problem and operating context:** [the task the agent kept redoing]
- **What I personally built or changed:** [the memory or search setup, the skill that triggers compilation, the resulting script and schedule]
- **What failed:** [a script that compiled a path that was wrong]
- **Before and after measurements:** [sessions per week before, invocations of the script after, tokens saved]
- **Diagram or screenshot:** [ ]
- **What remains uncertain:** [ ]
- **Organization may be named publicly:** [ ]

## Already public, citable today

These need no permission and can go in an application as work samples.

- [Fight Evils with Evals!](../../../../src/content/posts/2026-05-06--llm-evals-are-broken/index.mdx): deterministic, model-graded, and human evaluation with a concrete harness. Support for the guardrail slide.
- [Auto-Tune Your LLM Judge](../../../../src/content/posts/2026-08-11--auto-tune-your-llm-judge/index.mdx): a measured evaluator-tuning loop with variance, accuracy, cost, and latency. Support for the holdout discipline on slide 8.
- OSS ledger: Mastra streaming output-processor fix (`src/shared/ossData.ts`, lines 3–9). Link the exact PR before citing.

## Story map and recording gate

Slides 1, 6, 10, and 11 request the missed log failure, the symptom-hiding workaround, the compiled task, and the misunderstood feedback. Fill at least three from records before recording, including slide 1. No personal story was fabricated during the rewrite.

The memorable arithmetic on slide 13 is explicitly synthetic: 100 tickets minus 90 wrong tickets leaves 10 worth reading, a 10% useful-ticket rate. It is not a measured production result.

Model names and per-run costs are not spoken in this talk. If candidate 2 is ever filled, name only models actually run on that workload, with the observed cost per session, the date, and the task set — or say nothing.

## Research checked or bounded 8 September 2026

Cvach 2012, Vaughan’s Challenger analysis, Toyota’s jidoka description, Bainbridge 1983, and Strathern 1997 are linked beside their claims in the canonical outline and hand-maintained scripts. Clinical and industrial findings motivate engineering design choices; they are not code-review effect-size measurements.


## Cvach attribution and denominator

[Cvach 2012](https://pubmed.ncbi.nlm.nih.gov/22839984/) is an integrative review of 72 articles, not a new measurement study. Its full text, page 272, reports [Graham and Cvach 2010](https://pubmed.ncbi.nlm.nih.gov/20045845/): 16,953 critical alarms in an eighteen-day baseline on a fifteen-bed unit; 9,647 afterward, approximately 43% fewer. The original paper's Results section gives a mean census of 12 at baseline and 13.3 afterward; census was not included in its count analysis. The talk's 16,953 / 18 / 15 = 62.79 is **per available bed-day**, not per patient-day, and is arithmetic derived here. It is not a patient outcome or an effect estimate for software reviewers. Intervention elements included monitor defaults, individual limits, staff education and policy; do not claim one element alone caused the change.

The audit's proposed phrase “63 per patient per day” is therefore rejected. Its stronger causal slogan about deleting duplicates is narrowed to a multicomponent quality-improvement report. The review/paper support noise reduction as motivation, not the performance of this proposed loop.

## Pairing with Adaptive

Failure Improvement owns the offline reviewer and whether proposals are worth their review cost. Vaughan is a one-clause callback here; the cancellation case and reviewer economics carry the argument. Bainbridge motivates the reviewer question; rotation, reserved review time and recovery practice are explicitly Dan's design response, not Bainbridge's experimentally validated intervention. No reciprocal handoff or prerequisite session is asserted.
