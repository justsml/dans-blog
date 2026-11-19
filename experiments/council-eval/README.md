# council-eval

Does a mid-tier model run as a council of priority-diverse personas beat upgrading to
the frontier model, for planning and code review? And if it does, are the
personas the reason, or just the extra samples?

Everything about the claims, arms, thresholds, and threats to validity lives in
[`plan.md`](./plan.md). This file covers how to run it.

## Layout

```
plan.md            decision record: hypotheses, arms, metrics, decisions
config/models.json model tiers, list prices, judge, implementer, limits
prompts/           every prompt the agents see, plus frozen persona text
cases/review/      seeded-defect PRs (+ clean controls), verified by hidden tests
cases/plan/        feature tickets with hidden requirements and acceptance tests
src/               harness (Bun, no dependencies)
runs/<run-id>/     raw output (gitignored), report.md, results.json, manifest.json
```

## Commands

Run from this directory.

```bash
bun run verify              # every case must print ok
bun run dry                 # whole pipeline on a mock provider, $0
bun run typecheck

bun run probe               # one cheap call per provider/tier: parsing + isolation

bun src/run.ts --family review --providers claude,codex \
  --arms M1,F1,M1R,M3same,M3style,M3council --seeds 1 \
  --split all --concurrency 6 --run-id pilot-01
bun src/run.ts --family plan ... --run-id pilot-01
bun src/score.ts --run-id pilot-01
bun src/score.ts --run-id pilot-01 --second-judge   # review only, judge agreement
bun src/analyze.ts --run-id pilot-01 --split all
```

`run` and `score` resume: anything with a result or score on disk is skipped.

## How the pieces keep it honest

- **Isolation.** Agent workspaces live outside the repo (`$TMPDIR/council-eval-ws`),
  each a fresh git checkout. Claude runs with `CLAUDE_CONFIG_DIR` and Codex with
  `CODEX_HOME` pointed at clean homes in `~/.cache/council-eval/`, which only
  symlink the login file. That hides skills (including the council skill under
  test), memory, hooks, plugins, and global AGENTS.md / CLAUDE.md. With
  `ANTHROPIC_API_KEY` set, Claude runs with `--bare` instead. `probe` checks this, and
  every call records a canary for persona words in arms that were never given any.
- **Hidden truth.** Workspaces never contain hidden tests, fixes, reference
  solutions, or answer keys. `verify` proves each seeded defect is real (its test
  fails on the PR head and passes after its fix) and each plan requirement is real.
- **Blind scoring.** The judge sees anonymized findings with no arm, persona, or
  model. Plans are scored by hidden tests after a fixed implementer executes them.
- **Compute controls.** `M3same` (same prompt ×3 + synth) and `M1R` (one draft +
  refine) spend similar compute without personas. `M3style` gives three personas
  that only change writing style. Final outputs are capped the same for every arm.
- **Provenance.** `manifest.json` records CLI versions, model ids, prompt digest,
  config, and a digest per case. `score` refuses results whose case changed.
- **Split.** Cases hash into dev (25%) and held-out (75%). Tune on dev only.
  `analyze` reports held-out by default.

## Cost

Costs are list prices from token counts in `config/models.json`, not subscription
plans. OpenAI prices are the Standard tier as of 2026-11-16.
