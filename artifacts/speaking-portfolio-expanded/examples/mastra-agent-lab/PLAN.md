# Plan: `mastra-agent-lab`

A standalone mini project that turns the ideas from the seven new talks into runnable Mastra snippets. One small support/incident agent, composed step by step, with observability, memory, feedback, datasets, evals and experiments layered on. Fake auth via `?userId=` in the query string.

**Standalone means standalone.** Its own directory, its own `package.json`, its own `bun.lock`, its own `node_modules`, its own `mastra.db`, its own git history. It imports nothing from the blog and nothing from the blog's Mastra translation agent in `src/scripts/i18n-agent/`. That agent is unrelated: different purpose, different tools, different storage. The only link between this lab and the blog is a URL in the speaking-portfolio README.

Status: plan only. Nothing is implemented yet. This PLAN.md sits with the talk materials; the project itself will live outside the blog repo (section 3).

## 1. Goals and non-goals

**Goals**

- One coherent agent (`triageAgent`) that every talk can point at, plus one script per concept that isolates a single idea.
- Every concept script runs on its own with `bun run <script>`, against a running local Mastra server or in-process, and prints something a speaker can read aloud.
- Files stay between 600 and 1000 lines. When a "main" script would exceed that, the largest chunks move into `src/lib/*` and get imported. Import order is by size, biggest first, until the main file fits.
- Local and minimal: LibSQL file storage, Mastra dev server, no cloud services beyond the model provider. Memory, traces, feedback, datasets and experiments all persist to one `mastra.db`.
- Real Mastra APIs verified against `@mastra/core@1.34.0` embedded docs and https://mastra.ai/llms.txt on 2026-09-05. Re-verify before implementation; Mastra moves fast.

**Non-goals**

- No production auth. `userId` from the query string is trusted on purpose and labelled as fake in every file that reads it.
- No hosted eval platform. The talks name LangSmith, Braintrust and Langfuse; the lab shows the same evidence contract with Mastra storage only. One optional exporter stub shows where a hosted exporter would plug in.
- No fine-tuning, no GEPA/DSPy run. The prompt-optimizer slide gets a hand-rolled "propose, score, keep-if-better" loop over dataset items to show the shape, not the library.
- Does not replace the offline browser kit in `../../demos/`. That kit is for projection with zero network. This project is for the "show me real code" follow-up and for blog posts.

## 2. Concept map: talk slide to snippet

| # | Snippet | Talk and slide | Mastra features exercised |
| --- | --- | --- | --- |
| 00 | `00-agent-composition.ts` | Adaptive 3, 4 (strategy is a contract) | `Agent`, `createTool`, dynamic `instructions`/`model`/`tools` from `RequestContext` |
| 01 | `01-fake-auth-request-context.ts` | Adaptive 8, Product 13 (authority lives in code) | server `middleware`, `RequestContext`, `requestContextSchema`, typed keys, `MASTRA_RESOURCE_ID_KEY` |
| 02 | `02-observability-traces.ts` | Adaptive 11, Parallel 13 (one span per worker; why did this request get this architecture) | `Observability`, `MastraStorageExporter`, `requestContextKeys`, custom span metadata, `mastra api trace list` |
| 03 | `03-memory-per-user.ts` | Failure 2 (the human became the database), Product 3 (provenance in, tables out) | `Memory` with LibSQL, threads per `userId`, working memory, semantic recall, optional observational memory |
| 04 | `04-feedback-loop.ts` | Failure 7 (a correction is a candidate change), Product 12 (taste as a mixed system) | `mastra.observability.addFeedback`, `createFeedback`, `listFeedback`, `getFeedbackBreakdown`, traceId recovered from message metadata |
| 05 | `05-failure-to-fixture.ts` | Failure 6, 8, 9 (hooks, four fixtures, promotion gate) | output processor as post-tool hook, error normalization, `datasets.create`, `addItems` with the four readiness fixtures |
| 06 | `06-scorers-and-gates.ts` | Failure 9, 14; Product 9 (optimization separate from permission) | `checks.*` quick checks, `createScorer` custom scorer, `runEvals` with `gates` and `thresholds`, `verdict` |
| 07 | `07-datasets-experiments.ts` | Adaptive 12, 13 (score the whole strategy; A/B of strategies) | `dataset.startExperiment`, two agent variants, `compareExperiments`, per-item `scorerIds` |
| 08 | `08-bounded-strategies.ts` | Adaptive 10 (lookup / routine / novel), Parallel 7, 8 (caps, honest stop) | `createWorkflow` with branch, budget reservation in workflow state, deadline via `AbortSignal`, `requireApproval` for the consequential path |
| 09 | `09-tournament.ts` | Parallel 3, 4, 10 (compete across profiles; the judge needs a rubric it did not write) | N agents with different instructions, `Promise.allSettled` under a cap, deterministic judge first, LLM judge second, one span per competitor |
| 10 | `10-compile-the-winner.ts` | Failure 16, Adaptive 15, Parallel 12 (manufacture cheap determinism) | winning path becomes a `createTool` and a dynamic workflow definition via `addDynamicWorkflow`; next request skips the model |
| 11 | `11-prompt-optimizer-lite.ts` | Failure 12 (GEPA/DSPy shape) | loop over dataset items: mutate instructions, `runEvals`, keep if score improves, holdout stays untouched |
| 12 | `12-product-guardrail.ts` | Product 9, 10 (apparent winner is blocked) | typed hypothesis with zod, scorecard scorer, hard gate that cannot be bought with a metric gain |
| 13 | `13-mirrored-traffic.ts` | Adaptive 14 (new models enter via mirrored traffic) | same request to baseline and candidate model, candidate result stored not returned, offline comparison via experiment |

Skipped on purpose: the two education talks and the free-tier calculator. Those are not agent-composition problems.

## 3. Project layout

```
mastra-agent-lab/
├── PLAN.md                     this file
├── README.md                   how to run, what each snippet shows, talk cross-refs
├── package.json                bun scripts, one per snippet
├── tsconfig.json               ES2022 / bundler (Mastra requirement)
├── .env.example                MODEL, optional OPENAI_COMPAT_URL for local models
├── mastra.db                   gitignored; created on first run
├── src/
│   ├── mastra/
│   │   ├── index.ts            Mastra instance: storage, observability, server middleware, agents, workflows, scorers
│   │   ├── agents/triage.ts    the one agent; imports tools + memory
│   │   ├── tools/              lookupStatus, readinessCheck, searchIncidents, proposePatch (requireApproval)
│   │   ├── memory.ts           Memory config; thread + resource derived from userId
│   │   ├── scorers/            readinessFixtureScorer, scopeMatchScorer, urgencyGuardrail, rubricJudge
│   │   └── workflows/          boundedStrategy, tournament
│   ├── lib/                    extracted chunks, biggest first (see section 5)
│   │   ├── fixtures.ts         the four readiness cases, the three product candidates, incident corpus
│   │   ├── normalize-error.ts  connection-refused family normalizer (ports/paths stripped)
│   │   ├── budget.ts           reserve / reconcile / deadline helpers
│   │   ├── fake-auth.ts        userId from query string, labelled FAKE
│   │   └── print.ts            table + trace printing for the terminal
│   └── snippets/
│       ├── 00-agent-composition.ts
│       ├── ...
│       └── 13-mirrored-traffic.ts
└── presets.json                request-context presets for Studio (dev-user, qa-user, admin-user)
```

Location: a new repo at `~/code/oss/mastra-agent-lab`, initialized with `git init` and `bun init`, pushed to GitHub under `justsml/mastra-agent-lab` when ready. Not a subdirectory of the blog, not a workspace member, not sharing the blog's `node_modules` or tsconfig. The speaking-portfolio README links to the repo URL. This PLAN.md moves into the new repo as its first commit and the copy here becomes a one-line pointer.

Isolation checklist, verified before the first commit:

- `grep -r "dans-blog\|i18n-agent\|@/" src/` returns nothing.
- `bun run check` passes with the blog repo renamed or absent.
- `bun.lock` and `mastra.db` are the lab's own; `mastra.db` is gitignored.

## 4. Dependencies and setup

```
bun add @mastra/core @mastra/memory @mastra/libsql @mastra/evals @mastra/loggers zod
bun add -d mastra typescript @types/node
```

- Versions pinned in the lab's own `package.json`. The blog happens to have `@mastra/core@1.34.0` installed for its translation agent; that install is not used, only its embedded docs were read while writing this plan.
- Model: `MODEL` env var, default `anthropic/claude-sonnet-4-6` (verified in the provider registry). For a fully local run, document the `lmstudio/...` or OpenAI-compatible URL form; Ollama is installed on this machine but has no models pulled, so it is a documented option, not the default.
- Storage: `new LibSQLStore({ id: 'lab', url: 'file:./mastra.db' })`. One database for memory, traces, feedback, datasets, experiments, dynamic workflows.
- Observability: `MastraStorageExporter` with `requestContextKeys: ['userId', 'strategy', 'experimentArm']` so every span carries who and which policy.
- Scripts: `dev` (mastra dev with `--request-context-presets ./presets.json`), `snippet:00` .. `snippet:13`, `check` (tsc), `test` (bun test over `lib/`).

## 5. Sizing rule for the main scripts

Target: each `src/snippets/*.ts` reads top to bottom as one story, 600 to 1000 lines including comments, and never more.

Procedure when a snippet grows past 1000:

1. Measure the top-level blocks by line count.
2. Move the biggest block into `src/lib/<name>.ts` with a one-line import back.
3. Re-measure. Repeat until the snippet is under 1000.
4. Stop extracting once under 1000. Do not chase minimal files; the point is that the snippet still shows the mechanism inline.

Predicted first extractions: `fixtures.ts` (the incident corpus and product candidates are long), `normalize-error.ts` (shared by 05, 06, 10), `budget.ts` (shared by 08, 09).

Comment style inside snippets: short section banners that name the talk slide (`// Failure 8: the four fixtures`), so a reader can jump from outline to code.

## 6. Snippet-by-snippet notes

**00 Agent composition.** Build `triageAgent` with `instructions`, `model` and `tools` as functions of `requestContext`. Show that the same agent id serves a lookup user with zero tools and an on-call user with the readiness and search tools. This is the "strategy is a contract" slide with no planner yet.

**01 Fake auth.** Server middleware reads `?userId=` from `context.req.query('userId')`, writes it to `requestContext` under a typed key and to `MASTRA_RESOURCE_ID_KEY` so memory and experiments scope to that user. A second raw key carries `role` (`viewer`, `oncall`, `admin`). Every file that reads it imports `FAKE_AUTH_BANNER` from `lib/fake-auth.ts` and prints it. Include a `curl` block in the README showing the same prompt with two different `userId`s.

**02 Observability.** Configure `Observability` with the storage exporter and `requestContextKeys`. Inside tools, call `tracingContext.currentSpan?.update({ metadata })` for cost estimate, strategy version, and "why this branch existed". Print the trace id from the result, then shell out to `mastra api trace list` and `trace get` to show the span tree. Add `environment: 'lab'` on the Mastra instance.

**03 Memory.** `Memory` on LibSQL, thread id `${userId}:${topic}`. Demonstrate three sessions where the user keeps supplying the same prerequisite ("wait for the DB"), then show working memory capturing it once. Semantic recall is on with a small local embedding if one is available; otherwise document it as off. Observational memory is shown as a flag with its model requirement called out, not on by default.

**04 Feedback.** After a `generate`, read `traceId` from the result, then `addFeedback` with `feedbackSource: 'user'`, thumbs as 1 or -1. Then a QA path: recall a stored message from memory, read `content.metadata.traceId`, attach a `comment` with a correction. Close with `getFeedbackBreakdown` grouped by `entityName`. This is the raw material for slide 7 of the failure talk: feedback is a candidate, not policy.

**05 Failure to fixture.** An output processor watches tool results for errors, runs `normalizeError` (strip host, port, path; keep errno family), and appends a case record. Then the four fixtures from the talk go into a dataset: starting, ready, denied, deadline, each with `groundTruth` naming the expected behavior (wait then run, run once, stop, stop and explain). Show that connection-refused on two ports normalizes to one family and permission-denied stays unknown.

**06 Scorers and gates.** `checks.calledTool('readinessCheck')`, `checks.didNotCall('proposePatch')`, `checks.maxToolCalls(3)` as gates. Custom `scopeMatchScorer` built with `createScorer`, function steps only. `runEvals` over the fixture dataset with `gates` and `thresholds`; print `verdict`, `gateResults`, `thresholdResults`. Flip one fixture to show `failed` versus `scored`.

**07 Datasets and experiments.** Register two agents that differ only in instructions (`triageAgent` and `triageAgentV2`). `startExperiment` against each with the same scorer ids, then `compareExperiments`. Run one with `requestContext` carrying a dedicated eval `userId` so real user memory is never touched. Show per-item `scorerIds` override on one item.

**08 Bounded strategies.** A workflow with three branches chosen by a deterministic classifier over the input: lookup (tool only, no model), routine (one agent call), novel (two hypothesis agents plus a verifier). Budget is reserved in workflow state before fan-out and reconciled after. Deadline is an `AbortSignal`. The consequential path calls a tool with `requireApproval: true` and the script shows the `tool-call-approval` chunk and a decline with a reason. Costs are estimates from token usage, labelled as such.

**09 Tournament.** Three profiles of one model (minimal-diff, best-practices, performance) plus one alternate model, all run with `Promise.allSettled` under a concurrency cap and the shared budget. Deterministic judge first (does it compile in the sandboxed `Function`, does it pass the fixture tests), LLM rubric judge only for survivors. Each competitor is a child span with `profile`, `cost`, `latency`, `outcome`. Print the one-line score table from slide 4.

**10 Compile the winner.** Take the tournament winner and register it as a `createTool` with the fixture tests as its contract, then as an `addDynamicWorkflow` JSON definition persisted to LibSQL. Re-run the original request and show it resolved by the tool with zero model calls. Keep one negative case that must still miss the rule.

**11 Prompt optimizer lite.** Split the fixture dataset into train and holdout. Loop: ask the model to propose an instruction edit given the failing items and their reasons, run `runEvals` on train, keep the edit only if the average improves, never touch holdout until the end. Print the diff of instructions between rounds. Name GEPA and DSPy in the header comment as the real tools.

**12 Product guardrail.** Zod schema for a hypothesis (segment, metric, counter-hypothesis, guardrails, owner). Three candidates from the talk table. A scorecard scorer for activation, a hard gate for support ceiling and a false-urgency detector (deterministic pattern list first, LLM second). Show that raising the ceiling still blocks the pressure copy, and the passing candidate is `eligible_for_review`, never `ship`.

**13 Mirrored traffic.** Middleware flag `mirror=1` sends the same request to a candidate model in the background with `tracingOptions.metadata.experimentArm = 'candidate'`, stores its output as a dataset item, returns only the baseline. A follow-up experiment compares arms offline. Data-boundary check runs in code before the mirror call and refuses when `role` is not `admin`.

## 7. Verification

- `bun run check` passes on every snippet.
- Each snippet has a header comment with: talk and slide, what it prints, expected runtime, expected cost order of magnitude.
- `bun test` covers the deterministic parts: `normalizeError` families, budget reserve/reconcile, the three product gates, the fixture scorer. These mirror the existing `demos/demo.test.js` cases so the browser kit and the code lab agree.
- A `bun run all` script runs 00 to 13 in order against a fresh `mastra.db` and exits non-zero on any thrown error. Model-dependent scores are printed, not asserted.
- Manual: open Studio at `localhost:4111`, pick a preset from `presets.json`, confirm traces, feedback, datasets and experiments appear.

## 8. Order of work

0. Create `~/code/oss/mastra-agent-lab`, `git init`, `bun init`, copy this PLAN.md in, install dependencies from section 4, commit.
1. Scaffold: `package.json`, `tsconfig.json`, `src/mastra/index.ts`, `lib/fake-auth.ts`, snippets 00 to 02. This gets an agent, fake auth and traces on screen in one sitting.
2. Memory and feedback: 03, 04.
3. Failure loop: `lib/normalize-error.ts`, `lib/fixtures.ts`, 05, 06, 07. This is the core of the failure-improvement talk and the datasets/evals/experiments requirement.
4. Adaptive and parallel: `lib/budget.ts`, 08, 09, 10.
5. Remaining: 11, 12, 13.
6. README with the concept table, the `curl` examples, and links back to each outline slide in the blog repo by GitHub URL. Add one line to `artifacts/speaking-portfolio-expanded/README.md` in the blog pointing at the lab repo, beside the offline kit link.

Each step ends with `bun run check` and the affected snippets run once.

## 9. Open decisions

- **Default model.** Cloud model via the Mastra router is the default because Ollama has no models pulled here and the LM Studio entries in the registry assume LM Studio is running. Decide whether to pull a small local model and make it the default for the talks.
- **Observational memory.** Requires a background model; leave off by default and show as a flag, or turn on for snippet 03 only.
- **Hosted exporter.** Add one Langfuse or Braintrust exporter stub behind an env var to match failure slide 13, or keep the lab storage-only. Recommendation: stub behind env var, off by default.
- **Where the blog post lives.** The snippets are sized to lift into MDX. Decide whether each snippet becomes a post section or the lab gets one overview post. Either way the post links to the lab repo; code is not copied back into the blog tree.
