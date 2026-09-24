# Consensus translation gold

The consensus dataset is the canonical reference for future translation and
judge evals. It is a separate artifact from individual model translations.
Reports identify the dataset version; the complete creation history lives in
its lineage records.

## Editorial contract

Aim for a credible local technical writer with Dan's voice. Preserve the edge,
humor, deliberate provocation and profanity when they carry intent. Repair
translationese, accidental awkwardness and unintended connotations. Do not
sanitize the writing by default or treat every possible objection as a defect.
Any softening must explain its local benefit and its cost to authorial voice.

Hard constraints preserve source claims, facts, quantities, executable code,
quiz answers, component structure and URLs. Existing literal corruption can
be restored toward the English source. Source errors are logged separately;
editors cannot silently change the author's argument to fix them. A cultural
association with a number is not permission to change a factual quantity or
quiz answer. An arbitrary fictional example can be adapted only in a separate
author-approved change with its dependent answers checked.

Flexible choices include idioms, metaphors, rhythm, sentence structure,
paragraph organization and register. Cultural claims need a named audience,
context and relevant evidence. A technical reference is not evidence that a
phrase is offensive. Unsupported claims remain open or must be retracted;
agreement between two agents does not manufacture a citation.

## Pilot protocol

1. Freeze current English and current locale translation, exact repository
   paths and full SHA-256 hashes. Snapshot recent Git translations with the
   English source hash at each revision. Older-source translations are context,
   not replacements for the current source.
2. Independently critique before sharing opinions. Editors can read the whole
   current article, list/read frozen translation history, read checked
   references, and request additional reference verification. These tools are
   read-only and scoped to the frozen article/evidence packet, without arbitrary
   shell execution or credential access.
3. Exchange issue-level claims, exact quotations, proposed wording,
   alternatives, evidence, severity and confidence. Each editor must address
   every issue, including its own. Counterproposals are reviewed in subsequent
   rounds. The goal is justified agreement, not automatic deference or a
   manufactured fight. Public rationales are retained; private internal
   chain-of-thought is not required.
4. Apply only edits with unanimous agreement on exact wording and seriousness,
   valid source/target matches, and applicable evidence. Reject stale hashes,
   overlapping replacements and new protected-literal drift. Keep withheld,
   rejected and disputed proposals in the ledger.
5. Recheck the complete edited article independently, including remaining
   issues and structural/MDX validation. Both editors must find no unresolved
   severity 3–5 translation issues and score every dimension at least 4/5.
6. Separate frontier auditors score baseline and candidate in counterbalanced
   order, without debate, authorship or confidence metadata. A sealed second
   pass reveals aggregated change confidence to measure anchoring; it does not
   replace the blind scores. Blind candidate scores must also pass admission.
7. Export immutable versioned golden cases. Source changes require a new case
   or dataset version; never silently reuse an old reference against new input.

The ten dimensions are faithfulness, technical accuracy, completeness,
readability, grammar/spelling, idiom/metaphor adaptation, authorial voice,
locale appropriateness, structure/flow and MDX integrity. Scores range from
1 (unusable) to 5 (exceptional). Severity uses 1–5: 1 is a valid alternative/no defect, 2 is optional polish,
3 is a noticeable issue, 4 is a serious meaning/technical error, and 5 is
critical semantic/structural damage. Severity 3–5 blocks admission. Per-change
confidence is self-reported and retained alongside mean/median summaries.
"Viral-worthy" is interpreted as compelling writing, not a prediction of reach.

## Models and limits

The pilot editors are GPT-6 Sol and Claude Opus 5.5 at explicit high reasoning.
GPT-6 Astra and Claude Fable 5.1 are the independent auditors, also high.
`--tier frontier` swaps the two pairs. Japanese receives initial advisory
critiques from DeepSeek V4.1 Flash and GLM 5.3 Flash; advisors cannot outvote the
two editors. The live September 23 catalog does not expose medium thinking for
DeepSeek or GLM, so this pilot uses low rather than silently upgrading to high.
No language-wide superiority assumption is encoded: additional languages need
separate measured pilots.

Each call uses 24k output tokens, up to four read-only tool steps, a 240-second
limit and no automatic provider retry. Three negotiation rounds are the
default (maximum four). Work is cached by task/model/input identity. Invalid
responses and interrupted requests are retained. API calls use the existing
OpenRouter integration and record usage. The CLI transport below preserves
the same protocol, with inline frozen evidence instead of tool calls.

## Run and export

Prepare an output directory with `catalog.json` (the live selected-model
catalog) and `references.json` (coordinator-checked URLs, scope, summaries and
verification dates). Unverified reference requests are recorded in
`tool-events.jsonl`; they are not automatically converted to evidence.

```sh
bun src/scripts/i18n/negotiation/pilot.ts --out RUN_DIR --prepare-only
bun src/scripts/i18n/negotiation/pilot.ts --out RUN_DIR
bun src/scripts/i18n/negotiation/dataset.ts RUN_DIR datasets/i18n/consensus-gold/v1 v1
```

Default article: `2023-08-18--should-you-use-named-or-default-exports`;
default locales: `es,ja`. This pilot does not overwrite published translations.
`*-candidate.mdx` contains the negotiated version; `*-ledger.json` contains the
argument trail; `*-result.json` contains editorial and independent assessments.
No case is exported while required gates remain unresolved. Do not lower the
gates after seeing results: continue editing or record the unresolved case.

The dataset contains self-contained `cases.jsonl`, a content-hashed manifest,
and `benchmark-fixtures.jsonl`. The latter strips confidence and creation
lineage from evaluator inputs:

```sh
bun src/scripts/i18n/judge-benchmark.ts --out reports/i18n/gold-eval-RUN \
  --phase gold-regression --split heldout \
  --fixtures datasets/i18n/consensus-gold/v1/benchmark-fixtures.jsonl
```

Use `loadGoldenDataset` and `assertCurrentSourceMatches` in other harnesses.
`source.text` is the fixed input; `reference.text` is the canonical target;
`baseline.text` is the original translation for improvement comparisons.
Creator identities and receipts remain available through lineage hashes but
need not be repeated as caveats in benchmark reports.

## CLI orchestration

Run the same protocol through installed, authenticated CLIs:

```bash
bun src/scripts/i18n/negotiation/cli-pilot.ts --prepare-only
bun src/scripts/i18n/negotiation/cli-pilot.ts --locales es,ja
# Route every model through OpenCode's OpenRouter provider instead:
bun src/scripts/i18n/negotiation/cli-pilot.ts --transport opencode --out reports/i18n/consensus-pilots/opencode-pilot
```

The default CLI routing uses `codex exec` for OpenAI, `claude --print` for
Anthropic and `opencode run` for the advisory models. Model names and reasoning
levels stay explicit. CLI authentication and provider availability must already
be configured. A successful subscription-backed call does not imply zero cost
or unlimited usage; retain native usage receipts. No API key is copied between
providers.

The wrapper copies the checked catalog/reference packet from `--seed` (the API
pilot by default), freezes current article inputs, and uses a separate run
identity. Recheck reference/catalog freshness before reusing the seed later.
It never reuses API responses as CLI responses. Each role and round starts a
fresh process in an empty temporary working directory. History and references
are supplied inline to editors; blind auditors receive neither. Claude tools
are disabled, Codex uses read-only mode without user config, and OpenCode tool
permissions are denied. CLI subprocesses have a 240-second timeout; failures
retain stdout, stderr and exit receipts, without automatic retries. These are
CLI permission controls, not a claim of filesystem isolation.

Claude receives `CLAUDE_CODE_MAX_OUTPUT_TOKENS=24000`. Codex and OpenCode have
no verified equivalent in this adapter: their effective token ceiling remains
provider-managed and is explicitly recorded as unenforced. Use API transport
when an enforced 24k cap is required. Every response still passes the same
schema, exact-patch, source hash and gold-admission checks.

Codex invocation follows its [official non-interactive documentation](https://developers.openai.com/codex/noninteractive);
CLI flags were also checked against the installed versions. Native receipts
preserve billing metadata when supplied; missing cost is unknown, never zero.

## Result storage

New call responses, requests, errors, ledgers, audit mappings, CLI receipts and
locale results use JSONL (newline-delimited JSON), one complete record per line.
`results.jsonl` and `benchmark-fixtures.jsonl` contain one record per locale or
fixture, rather than a JSON array. Dataset cases and event streams also use
JSONL. Configuration, manifests and frozen input snapshots remain JSON; native
CLI stdout/stderr remain verbatim evidence. Readers accept legacy JSON results
so prior runs remain resumable without rewriting their evidence or hashes.
The benchmark fixture reader accepts `.jsonl`, `.ndjson` and legacy `.json`.

## Expanded batch and golden export

```bash
bun src/scripts/i18n/negotiation/refine-batch.ts
bun src/scripts/i18n/negotiation/export-batch.ts \
  reports/i18n/consensus-batches/2026-09-23-expanded \
  datasets/i18n/consensus-gold/v1 v1
```

The expanded sample contains three additional source documents plus the
original Spanish/Japanese article cases. `selection.jsonl` records the
sampling rationale. Frozen snapshots include exact current source/target text,
paths, SHA-256 hashes and translation history. Refinement alternates the editor
that proposes a complete revision; both editors then vote on each listed
change's wording and severity and independently score the whole candidate.
Separate blind reviewers see only source and candidate. Failed validation or
review goes back into the next round, bounded at four rounds. All revisions,
rejections and source concerns remain in JSONL receipts and the ledger.

The exporter requires every selected case to pass and verifies final candidate
hashes against both results and the negotiation ledger. It combines multiple
runs into one immutable dataset version, with the full frozen inputs embedded
in each `cases.jsonl` record. It refuses duplicate cases and existing output
directories. Published source translations are not overwritten by this export.

Legacy 0–4 severity values are retained in raw receipts and explicitly mapped
to 1–5 by adding one in normalized dataset views. Rubric quality scores remain
1–5 and confidence remains 0–1; neither is shifted. New runs declare their
severity scale, preventing accidental double conversion.

After bounded revision, `finalize-batch.ts` obtains explicit endorsements of
the exact frozen candidate from both editors, then independent blind auditors.
Optional stylistic alternatives remain visible; final approval is not a claim
that every reviewer assigns the same optional-polish number. Every substantive
issue still blocks admission. New endorsements are bound to the exact candidate
hash. Mechanical restoration of invisible source-code spaces also requires
fresh endorsements.

A changed rubric/scale requires a new run directory; do not mix 0–4 and 1–5
responses in one cached call identity. Legacy completed runs remain readable
and exportable through the explicit severity conversion.

## Issue-driven negotiation v2

V2 automatically loops through independent reviews, issue-level rebuttals,
adjudication and revisions. It finishes only when no unresolved high/critical
issues remain, readability and other rubric dimensions have quorum support,
and deterministic validation passes. Severity 3 can also be made blocking
with `blockingSeverity: 3`; the default 4 matches high/critical priority.

An originating model can retract an issue with another model's support and a
majority. Otherwise an override requires at least two **other distinct models**
(configurable to three), a majority, a current-candidate hash and specific
rebuttal/evidence for that issue. A 2–2 split does not resolve. Fresh findings
reopen issues; low rubric scores create tracked issues as well. Omitting an
old issue from a subsequent review cannot close it. Dissent and medium/optional
issues remain visible in the final result. A budget limit yields
`needs-attention`, never automatic acceptance.

`events-*.jsonl` is append-only per execution attempt. It records policy,
source/baseline hashes, every review, fragment/source quote, issue ID, model,
ballot, rebuttal, severity, override, reopening, change instruction, rationale,
tradeoff and before/after revision hash. Full prompts/raw responses remain in
`calls/`. Revisions use exact nonoverlapping patches; every text change is
therefore represented in the ledger, including changes to annotations or
headings. References must be in the frozen checked packet. Model argument
quality is still assessed by the panel; a reference ID alone is not a proof.

The [adaptive policy](i18n-policies/adaptive.json) exposes audience, length,
structure, introduction, rhetorical arc, idioms, voice, quorum and run limits.
Default length is **free**: ratios are measured, not optimized for similarity.
The intro may be rewritten and the argument reorganized when the source's
purpose, claims and voice survive. Local metaphors may be recreated; awkward
literal approximations are not a goal. A strict structure/intro/arc policy
constrains the models via the prompt; structural counts are additionally
validated. Semantic fidelity and rhetorical purpose are model-assessed, not
claimed as deterministic guarantees. Quiz answers, factual numeric literals,
code, imports, links, assets and hydration remain protected.

```bash
bun src/scripts/i18n/negotiation/consensus-run.ts \
  reports/i18n/consensus-batches/2026-09-23-expanded/2025-05-31--the-last-to-think-es/es-snapshot.json \
  reports/i18n/consensus-v2/last-to-think-es \
  docs/i18n-policies/adaptive.json \
  reports/i18n/consensus-pilots/2026-09-23-named-exports/references.json
```

Add `--prepare-only` to freeze and inspect the inputs without model calls.
Use a new output directory for changed policy or source; cached calls are
identity-bound. V1 gold stays immutable. V2 final results distinguish unanimous
`consensus` from `consensus-backed` decisions with recorded dissent/overrides;
they are separate artifacts and do not silently replace an existing gold set.

Ballots are split into at most 20 issues per call, with required evidence IDs
restricted to the source, target, or checked reference packet. Reviewer claims
with missing references or inexact quotes are retained with explicit evidence
warnings for peer adjudication; they are not silently treated as established
facts. Execution failures are recorded as `needs-attention` with the latest
candidate, preserving partial receipts. Failed cached calls are retained for
inspection rather than silently overwritten.

### Langfuse

The consensus runner requires configured Langfuse credentials. A parent agent
trace groups native CLI generations, cache hits, review/ballot decisions,
revisions, validation events and the final result. Generations include prompts,
outputs, model/effort, failures, native token counters and reported CLI cost
when available. Missing cost is not presented as zero. Short-lived calls and
runs explicitly flush the exporter; JSONL receipts retain trace/observation IDs.

`bun src/scripts/i18n/negotiation/backfill-langfuse.ts RUN_DIRECTORY` imports
existing receipts without model calls. Backfilled traces are marked as imports;
their trace duration is not inference latency. Repeating an identical completed
receipt snapshot is skipped. Local receipts remain the immutable audit source.
