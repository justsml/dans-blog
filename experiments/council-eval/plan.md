# Council vs. Upgrade

Decision record for the eval behind the "Personas, Priorities, Profiles" article.
Hypothesis owner: Dan. Status: **Article now reports brrr-01 (pizza cost task). The review, plan, and build families are parked: all three hit ceiling at the mid tier.**

## Target behavior and release decision

**Question.** For planning and code-review work done by coding agents (Claude Code
and Codex CLI), does running a mid-tier model as a council of *priority-diverse*
personas beat upgrading to the frontier model, and if it does, is the persona
content what earns the gain, or just the extra samples?

**Decisions this evidence supports.**

1. Article claim: whether we can say "personas beat the upgrade", "extra samples beat
   the upgrade", "the upgrade wins", or "no detectable difference". All four
   outcomes are publishable. The design must be able to produce each one.
2. Practice: whether Council of Dans should stay the default for planning and review
   loops in my own work, and at which tier.

**What would change my mind.** If `M3same` (three identical samples plus the same
synthesizer) matches `M3council`, the personas are decoration and the article says
so. If `F1` beats `M3council` at equal or lower cost, the upgrade wins.

## Arms

Every arm runs per provider. `M` = mid tier, `F` = frontier tier. Effort is pinned
to `high` for every call in every arm. Models: `config/models.json`.

| Arm | Calls | What it controls for |
| --- | --- | --- |
| `M1` | 1 mid | Baseline |
| `F1` | 1 frontier | **"Just upgrade the model"** |
| `M1R` | 1 mid + 1 mid self-refine | The verification/filter pass the synthesizer adds |
| `M3same` | 3 mid, identical prompt + synth | More samples, no personas |
| `M3style` | 3 mid, style-only placebo personas + synth | Role-play and prompt length without priorities |
| `M3council` | 3 mid, Council of Dans priorities + synth | **Treatment** |
| `F3council` | 3 frontier council + synth | Does it stack? (secondary) |
| `X3council` | Council split across Claude and Codex mid models | Model diversity vs priority diversity (exploratory) |
| `P0` (plan only) | no plan, implementer works from the task alone | Is planning worth anything here? |

Shared rules that keep arms comparable:

- **Output budget is capped.** Every arm's *final* answer obeys the same cap: at
  most `K = 8` findings for review and at most 900 words for a plan. A council
  cannot buy recall by emitting more findings.
- **The synthesizer is identical** across `M3same`, `M3style`, `M3council`, and
  `F3council`, and runs on the same tier as its members. `M1R` gets the same
  verify-and-filter instruction applied to its own single draft.
- **Persona text is frozen** from `council-of-dans/SKILL.md`
  (sha256 `d7282084e97dbb4b2614fa472b79f33dd7c6fb9ff9edb64c3ac2adebbe9ca0e3`),
  copied into `prompts/personas.json`. Placebo personas match its length and
  structure but only describe writing style, which is exactly what the skill says a
  persona is *not*.
- **Persona selection is fixed before data exists.** Review council: Detail
  Detective, Doomsayer, Security Paranoid. Plan council: Architect, Ruthless
  Minimalist, Doomsayer (the skill's own picking rule).
- **Agents are isolated from my setup.** Claude runs with `--bare` when an API key
  is present, otherwise with setting sources, slash commands, skills, and MCP
  disabled. Codex runs with `--ignore-user-config --ignore-rules --ephemeral`. Both
  get read-only tools for review and planning. Each run records a contamination
  canary (any mention of "council", "persona", or my skill names in an
  uninstructed arm's transcript is flagged).

## Evaluation contract

| Claim or risk | Dataset slice | Metric or gate | Scorer | Threshold | Evidence |
| --- | --- | --- | --- | --- | --- |
| H1: council beats the upgrade | review/all, plan/all | Primary metric, `M3council − F1` | see rows below | 95% CI of paired diff > 0 (superiority) **and** cost ratio ≤ 1.25 | pending |
| H2a: personas beat sample count | review/all, plan/all | `M3council − M3same` | same | 95% CI > 0 | pending |
| H2b: priorities beat role-play | review/all, plan/all | `M3council − M3style` | same | 95% CI > 0 | pending |
| H3: council stacks on frontier | review/all | `F3council − F1` | same | CI > 0 (secondary) | pending |
| H4: gains follow persona priorities | review by defect class | Per-class recall delta, aligned vs unaligned classes | judge match | Aligned delta > unaligned delta | pending |
| Review recall | review/seeded | Seeded defects matched / seeded defects, severity-weighted | judge match, validated against my labels | primary metric | pending |
| Review precision | review/clean controls + seeded | High-severity findings judged invalid per case | judge label | reported, gate: no arm wins H1 while doubling false alarms | pending |
| Plan quality | plan/all | Hidden acceptance tests passing after a **fixed** implementer executes the plan | deterministic `bun test` | primary metric | pending |
| Plan requirement coverage | plan/all | Hidden requirements the plan mentions | judge | secondary, diagnoses H1 failures | pending |
| Cost | all | List-price USD from token counts, per case | deterministic | reported per arm, Pareto plot | pending |
| Latency | all | Wall clock per case (council members run in parallel) | deterministic | reported | pending |
| Scorer validity | 60 sampled judge decisions | Cohen's κ vs my labels | human | κ ≥ 0.75 before any headline number | pending |

Aligned defect classes for H4 (review council): `edge-case`, `state`, `failure-mode`,
`security`. Unaligned: `performance`, `cost`. Unaligned classes are the built-in
negative control: if the council's gain is just "more eyes", it shows up everywhere.

### Primary analysis (pre-registered)

- Unit: case. Each (case, arm) runs `r = 3` seeds; a case score is the mean of its seeds.
- Paired difference per case; 95% CI from a 10,000-resample case-level bootstrap.
  Wilcoxon signed-rank as a robustness check.
- Holm correction across the three primary contrasts (H1, H2a, H2b) per task family.
- Missing data: a crashed, refused, or schema-invalid final answer scores 0 for that
  seed. Refusals are counted and reported, not excluded.
- Providers are analyzed separately first. A pooled result is reported only if the
  two providers agree in sign.
- Cost is reported from list prices in `config/models.json`, never from subscription
  plans, so the cost axis means the same thing for both vendors.

### Power

Pilot target: 8 review + 4 plan cases, 1 seed, to estimate the SD of paired
differences. Planning assumption before the pilot: SD ≈ 0.25 on recall, so ~50 cases
detect a 0.10 difference at 80% power. Full run: 48 review cases (40 seeded, 8 clean)
and 24 plan cases. The pilot's SD replaces this assumption before the full run.

## Dataset

New, never-published TypeScript mini-repos (Bun, zero dependencies), so nothing is
in pre-training data.

- **Review cases:** a realistic PR diff against a small repo. Each seeded case has
  1–3 defects. Each defect ships with a hidden test that **fails on the PR head and
  passes after that defect's fix**. `bun run verify` enforces this; a case that fails
  verification is excluded. Clean controls are PRs with no seeded defects whose
  hidden tests all pass.
- **Plan cases:** a feature request plus a repo with discoverable constraints
  (ADRs, invariants in comments, existing callers). Hidden acceptance tests encode
  those constraints. Verification: the reference solution passes every hidden test,
  and the untouched repo fails at least one.
- **Authorship is a slice.** Cases are authored by Claude and by Codex agents and
  tagged with the author. If a provider does better on its own cases, that shows up
  in the `author` slice instead of contaminating the headline.
- **Defect taxonomy** is fixed independently of the personas: edge-case, state,
  failure-mode, security, performance, cost, plus `data-migration` where it fits.

**Split.** Cases are assigned to `dev` (25%) or `heldout` (75%) by a hash of the case
id. Any change to prompts, the synthesizer, K, or the judge is made on `dev` only.
The persona text itself is never tuned.

## Experiments

| Candidate | Change | Development result | Held-out result | Cost and latency | Decision |
| --- | --- | --- | --- | --- | --- |
| mock dry run | Pipeline check, no model calls | run → score → analyze completes on 2 cases, 8 arms | n/a | $0 | Pipeline accepted 2026-11-16 |
| pilot-01 | All 20 cases, 1 seed, 6 arms (+P0), both providers | **Ceiling.** Review recall is 100% for every arm and provider (spot-checked: matches are real). Plan hidden-test pass rate is 94–100% for every arm, and P0 (no plan) gets 91–94%. Every primary CI is [0, 0] or touches 0. Only signal: council precision is lower (Claude 53% vs 59% for F1; Codex 76% vs 85%). Canary 0. Judge agreement 96–99% (κ undefined with no variance) | n/a (pilot) | $34 total: $26.44 generation, $3.90 implementer, $4.03 judges | **Dataset cannot discriminate; rebuild harder before the full run.** Paired-diff SD is ~0, so it says nothing about power |
| brrr-01 | "make it cheaper, go brrrrr" on pizza-or-not; solo / skill / forced council (Architect, Ruthless Minimalist, Pennypincher); Sonnet 5.5 + Terra; 5 runs per cell; blind Sonnet judge | Skill: Claude fanned out 1 in 5 runs (4 times it cited the skill's "one defensible answer" clause); Codex 0 in 5 (one attempt crashed). Levers per run: Claude 7.6 / 6.6 / 7.6, Codex 4.4 / 4.8 / 4.4. Three pooled solo runs reached 10.3 (Claude) and 6.0 (Codex), more than one council run. Personas overlapped: 12 unique finds in 29 proposals, and no persona owned a lever. The merge dropped photo downscaling (proposed in 2 of 5 Codex councils, shipped 0 times). The council implemented more of what it proposed (Codex Batch API 80% vs 0%). Vendor > method | n/a | $4.73 runs + ~$1 judging | Reported in the article as a case study; savings not measured live (no API key) |
| build-smoke + build-calib | b001, Claude `BM3loopCouncil` ×1; `BM1` ×1 on each provider | **Ceiling again.** A single Sonnet pass scores 11/11 ($0.38, 4 min). A single Terra pass scores 10/11 (misses R7, replica loss; $0.11). The council loop also scores 11/11 ($3.59, 30 min, 3 rounds, never stopped clean). Its reviews found real production issues the hidden suite does not test: unbounded detached generation, a write per token, NUL/split-surrogate tokens breaking Postgres writes, and mixed old/new replicas during a rolling deploy | n/a | $4.08 | Suite does not discriminate at mid tier. Do **not** add tests from the council's findings (teaching to the test). Next: a blind hardening pass by the case author, and/or a smaller tier |

## Open failures and next actions

| Failure cluster | Evidence | Likely cause | Next discriminating test | Owner |
| --- | --- | --- | --- | --- |
| **Ceiling (pilot-01)** | Every arm finds every seeded defect; even no-plan P0 passes 91%+ of plan tests | Cases are small (84–174 lines) and defects are locally visible; mid-tier models already saturate them | Harder cases: bigger repos, defects that need cross-file reasoning, decoys, real bug-introducing commits; and/or add a small tier (Haiku 5.5 / a small Codex model) as the 'mid' arm. Gate: M1 recall ≤ 70% on dev before the full run | Dan |
| Dataset size | 20 verified cases (13 review incl. 2 clean, 7 plan); target 72 | Pilot-sized only | Build the rest after the pilot sets the variance | Dan / agents |
| Author confounded with difficulty | Codex review cases ≈ 87 src lines / 40-line diffs; Claude's ≈ 146 / 85 | Authors read the size range differently | Pilot: if Codex cases hit ceiling for every arm, rebuild them at Claude's size; otherwise the `author` slice cannot separate self-preference from difficulty | Dan |
| Author is a subject (Claude frontier) | Opus 5.5 authored r20x/p20x and is the Claude frontier arm | Fable excluded by Dan | Compare Claude `F1 − M1` on Codex-authored vs Claude-authored cases; a gap only on its own cases points to self-preference | Dan |
| Claude isolation without API key | `--bare` needs `ANTHROPIC_API_KEY` | OAuth path loads user settings | Use API key for the real run, or accept canary-checked fallback | Dan |

## Build family: implement in a loop (pre-registered 2026-11-18, before any build data)

Motivated by pilot-01's ceiling and by one anecdote, [DocSlurp/doppler#51](https://github.com/DocSlurp/doppler/pull/51).
In that PR, "review, fix every Medium+, repeat until a round finds none" took 9 rounds, and 8 of them found a High.

**Task.** `b001-resumable-chat`: "closing the browser must not stop the reply" in a small
LLM chat app (Bun, Postgres, Redis, fake paid LLM, 2 app replicas behind a round-robin
nginx, compose). The agent works on the real stack. Eleven hidden black-box tests
(R1–R11) cover:
- resume without gaps or duplicates
- cross-replica resume
- exactly-once upstream calls
- upstream failure
- replica killed mid-reply
- auth on attach and cancel
- explicit cancel still stops upstream
- old rows still readable
- slow readers

The ticket states the interface only. The rest has to be found by reading the repo. The case author is gpt-6.1-sol (not a subject), and it was never told about personas or the hypothesis.

**Arms** (per provider, effort `high`, at most 3 review rounds):

| Arm | Implement | Then |
|---|---|---|
| `BM1` | mid | nothing |
| `BF1` | frontier | nothing (**the upgrade**) |
| `BM1loop` | mid | loop: 1 mid reviewer, no persona |
| `BM3loopSame` | mid | loop: 3 identical mid reviewers + synth |
| `BM3loopCouncil` | mid | loop: 3 council critics + synth (**treatment**) |
| `BF1loop` | frontier | loop: 1 frontier reviewer (opt-in only, not run by default: cost) |

Loop rules:
- Each round, the reviewer(s) read the full change (read-only).
- A fresh implementer session on the same tier fixes every Medium+ finding.
- The loop stops when a round finds no Medium+ finding, or at the cap.

Review council: Detail Detective, Doomsayer, Battle-scarred Operator. This follows the skill's
picking rule, which assigns the Operator "for anything on-call"; long-lived streams across rolling deploys qualify.

**Revision 2026-11-18 (deviation, recorded before any primary build data).** Calibration
showed the mid tier at ceiling: a single Sonnet pass scored 11/11 and a single Terra pass 10/11. Two changes followed, both chosen by Dan:

1. **Small tier as the treatment.** Claude Haiku 5.5 and gpt-6-luna, both $0.10 / $0.50 per 1M. Arms: `BS1`, `BS1loop`, `BS3loopSame`, `BS3loopCouncil`, plus `BM1` and `BF1` as references. New primary contrasts: `BS3loopCouncil − BF1` (cheap council loop vs. the upgrade), `BS3loopCouncil − BS3loopSame`, `BS3loopCouncil − BS1loop`. The mid-tier loop arms remain available as secondary.
2. **Blind hardening of the hidden suite** by the same case author (gpt-6.1-sol). It is forbidden to read any run output. The council's smoke-run findings are **not** a source for tests, because that would be teaching to the test.

The cost of this deviation: the earlier mid-tier primary contrasts are no longer the headline. The smoke and calibration runs are excluded from all analysis, because the case changed after them.

**Spend.** Frontier models appear only in `BF1`, a single pass. There is no Fable anywhere; Claude frontier is Opus 5.5. `src/build.ts` enforces a hard list-price cap (`--max-usd`, default $60), runs seed by seed, and starts the frontier arms last.

**Primary contrasts:** `BM3loopCouncil − BF1`, `BM3loopCouncil − BM3loopSame`, `BM3loopCouncil − BM1loop`.

**Metric.** Hidden-test pass rate of the final tree, plus per-requirement pass counts. Also reported: rounds used, whether the loop stopped clean, cost, and wall time.

**Honest scope.** There is one task, so n = seeds (3 per arm per provider). The result is a case study, not a population claim. CIs resample runs within each arm.

**Isolation.** Agents and scoring use the eval's own Docker-in-Docker daemon (`src/dind.ts`), never the host daemon. Each run has its own compose project and port block.

## Threats to validity

- **Construct.** Small repos are not monorepos. Seeded bugs are cleaner than real
  ones. Mitigation: add a slice of real bug-introducing commits from OSS history in v2.
- **Judge bias.** A Claude judge may favor Claude's phrasing. Mitigation: findings are
  normalized and anonymized; recall only asks "does any finding identify defect X";
  two judges from different vendors, agreement reported; κ check against my labels.
- **Teaching to the test.** Defect classes that overlap persona priorities favor the
  council. Mitigation: taxonomy fixed independently, unaligned classes as negative
  control (H4), per-class results reported.
- **Compute.** Councils spend more tokens. Mitigation: `M3same` and `M1R` controls,
  capped final output, cost reported for every arm and compared on a Pareto plot.
- **Drift.** CLI and model versions change. Every run records CLI versions, model ids,
  prompt digests, and case digests in `runs/<run-id>/manifest.json`.

## Decisions

| Date | Decision | Evidence | Revisit when |
| --- | --- | --- | --- |
| 2026-11-16 | Use output caps and an identical synthesizer to separate personas from sample count | Design review | Pilot shows synth dominates scores |
| 2026-11-16 | Case authors are not subjects (gpt-6.1-sol, claude-opus-5-5) and are not told the hypothesis | Avoid self-preference and teaching-to-the-test | Author slice shows a gap |
| 2026-11-16 | Workspaces outside the repo, clean CLI homes; judges run in an empty dir | User setup includes the council skill and a global AGENTS.md | `probe` reports a leak |
| 2026-11-17 | Claude frontier is Opus 5.5, not Fable 5.2 (Dan: don't use Fable). Opus 5.5 also authored the r20x/p20x cases, so Claude `F1`/`F3council` on those cases have author = subject. Mitigation: report H1 for Claude on Codex-authored cases as a robustness slice | Dan's instruction | Claude cases re-authored by a non-subject model |
| 2026-11-16 | Mid/frontier tiers: Claude Sonnet 5.5 / Opus 5.5 (was Fable 5.2); Codex gpt-6.1-terra / gpt-6-astra | Current model lists. Sol rejected as Codex mid tier: it authored the Codex cases, so using it would make an author a subject | Cases are re-authored by a non-subject model |
| 2026-11-16 | OpenAI list prices filled: Terra $1 / $5 (cached $0.05), Astra $10 / $50 (cached $1) per 1M | OpenAI pricing page, Standard table | OpenAI changes prices |

## Skill improvement loop (2026-11-19)

Goal: show that narrow, orthogonal priorities that each read primary sources combine into better results than generic personas, and make the council-of-dans skill do that by default.

**Baseline (free, from brrr-01 transcripts, `bun src/lookups.ts --run-id brrr-01`):** personas looked something up in Claude 0/15 runs, Codex 13/15. The brrr report's `checked_docs` only covered the merge agent and hid this.

**Variants** (`prompts/briefs/`, run with `bun src/brrr.ts --arms council,council-v1,council-v2`; persona stage only for v1/v2):
- v0-current: today's persona brief.
- v1-grounded: v0 plus "open primary sources first" and a REQUIRED `## Sources` section (URL, fact taken, what it changed).
- v2-focused: v1 plus a lead step that gives each persona a narrow focus and where to look it up, so the three overlap less.

**Metrics:** per persona: lookup rate and count (deterministic, `src/lookups.ts`); source quality and Sources-section compliance (blind judge); distinct valid levers the three reach together, and unique finds per persona; cost. Control: three pooled v0 runs, same spend.

**Rules:** tune on pizza-or-not only; confirm once on a second case; no frontier tier; install a variant into `~/.agents/skills/council-of-dans` only after it beats v0 on dev and holds on the second case.
