# Speaking portfolio

Talk outlines with speaker cues, timed slides, image prompts, CFP packages and evidence notes. These extend the earlier four-talk portfolio.

## Layout

One directory per talk under [talks/](talks/README.md). Everything for a talk lives directly in its folder:

```
talks/<slug>/
  index.md            canonical source; edit this one
  adaptation-{15,30}min.md    route plans
  script-{15,30,40}min.md     presenter scripts
  bullets.md                  rehearsal sheet
  packet.md  formats.md       submission index and edition table
  CFP.md  evidence-bank.md    submission copy and claim boundaries
  visuals.md  contracts.md    hand-written companions and fixtures
```

Shared material stays at this level: [shorts/](shorts/README.md), [reviews/](reviews/README.md), [speaker/](speaker/bio.md), [alternate-angles/](alternate-angles/README.md). Retired talks live in [retired/](retired). Consolidated on 7 September 2026 from the former `outlines/`, `packets/`, `decks/`, `engineering/`, `education/` and `economics-product/` directories.

**Decks.** Slide decks are hand-authored, one design per talk, in [artifacts/decks](../decks/README.md); the outline supplies only speaker notes. The generated per-route decks and PowerPoint editions were removed on 7 September 2026. Retrieval is the first rebuilt deck. Adaptive includes the [execution-memory pattern and prompt](talks/adaptive-systems/memory-pattern.md) in its current outline and 40-minute handout.

**Critical reviews and audit.** The [reviews directory](reviews/README.md) holds the pre-rewrite verdicts and the [6 September evening audit](reviews/AUDIT-2026-09-06.md) of all ten talks. A Skeptic's Guide was retired that evening; its procurement material survives as [Show Me the Misconception](talks/evidence-learning/procurement-route.md) under Outsmart.

**Before each delivery.** Fill every `Story` line with a first-hand example. Recheck the dated commitments and credit offer on free-tier slide 4.

## Submission packets

Each talk's `packet.md` and `formats.md` sit in its own directory. `formats.md` indexes the available talk lengths and workshop material. Existing packet, evidence, contract, worked-example, and visual-reference content remains in place.

The [speaker kit](speaker/bio.md) holds 50/100/200-word bios built from the resume, links, location, and a past-speaking template. The [recording plan](speaker/recording-plan.md) specifies the 25-minute talk to record first.

Runnable supporting code lives outside the blog. [Scaling AI Agents](https://github.com/justsml/scaling-ai-agents) contains the examples behind Dynamic Scaling, Adaptive Systems, and Judgment. The planned `mastra-agent-lab` repository will hold the incident-loop and product-policy examples when they are implemented. Talks may quote a small result or code fragment and link to the relevant repository; they do not depend on an interactive stage kit.

| Talk | Packet | Formats | Evidence bank |
| --- | --- | --- | --- |
| Improvement From Failure | [packet](talks/failure-improvement/packet.md) | [formats](talks/failure-improvement/formats.md) | [evidence](talks/failure-improvement/evidence-bank.md) |
| Adaptive, agentic apps | [packet](talks/adaptive-systems/packet.md) | [formats](talks/adaptive-systems/formats.md) | [evidence](talks/adaptive-systems/evidence-bank.md) |
| Free Tier | [packet](talks/free-tier/packet.md) | [formats](talks/free-tier/formats.md) | [evidence](talks/free-tier/evidence-bank.md) |
| Outsmart Your Students | [packet](talks/evidence-learning/packet.md) | [formats](talks/evidence-learning/formats.md) | [evidence](talks/evidence-learning/evidence-bank.md) |
| Dynamic Scaling | [packet](talks/dynamic-scaling/packet.md) | [formats](talks/dynamic-scaling/formats.md) | [evidence](talks/dynamic-scaling/evidence-bank.md) |
| Product Engineering | [packet](talks/product-engineering/packet.md) | [formats](talks/product-engineering/formats.md) | [evidence](talks/product-engineering/evidence-bank.md) |
| Three Search Methods in a Fundable Trenchcoat | [packet](talks/retrieval/packet.md) | [formats](talks/retrieval/formats.md) | [evidence](talks/retrieval/evidence-bank.md) |
| Benchmarks | [packet](talks/benchmarks/packet.md) | [formats](talks/benchmarks/formats.md) | [evidence](talks/benchmarks/evidence-bank.md) |
| Turn Your Thinkin' Tokens Up to 11 | [packet](talks/judgment/packet.md) | [formats](talks/judgment/formats.md) | [evidence](talks/judgment/evidence-bank.md) |

## Decks and submission copy

| Talk | Outline | Slides | Deck | CFP package |
| --- | --- | ---: | --- | --- |
| Automating Improvement From Failure | [40 min](talks/failure-improvement/index.md) | 15 | not yet rebuilt | [Failure improvement](talks/failure-improvement/CFP.md) |
| Adaptive, agentic apps | [40 min](talks/adaptive-systems/index.md) | 15 | not yet rebuilt | [Adaptive systems](talks/adaptive-systems/CFP.md) |
| Buy Me a Free Tier | [40 min](talks/free-tier/index.md) | 15 | not yet rebuilt | [Economics](talks/free-tier/CFP.md) |
| Outsmart Your Lying, Cheating Students (event-friendly: Stop Trying to Catch Students Using AI) | [40 min](talks/evidence-learning/index.md) | 14 | not yet rebuilt | [Education](talks/evidence-learning/CFP.md) |
| Dynamic Scaling of Agentic Workloads | [40 min](talks/dynamic-scaling/index.md) | 14 | not yet rebuilt | [Dynamic scaling](talks/dynamic-scaling/CFP.md) |
| The Future of Product Engineering: Break the Mirror on Purpose | [40 min](talks/product-engineering/index.md) | 17 | not yet rebuilt | [Product engineering](talks/product-engineering/CFP.md) |
| Three Search Methods in a Fundable Trenchcoat | [40 min](talks/retrieval/index.md) | 15 | [Deck](../../public/decks/retrieval/index.html) | [Retrieval](talks/retrieval/CFP.md) |
| Stop Looking at My Benchmarks… Get Your Own! | [40 min](talks/benchmarks/index.md) | 15 | not yet rebuilt | [Benchmarks](talks/benchmarks/CFP.md) |
| Turn Your Thinkin' Tokens Up to 11 | [40 min](talks/judgment/index.md) | 14 | not yet rebuilt | [Judgment](talks/judgment/CFP.md) |

CFP packages include 50- and 150-word abstracts, intended audiences, learning outcomes and reviewer notes. They contain no invented biography, speaking history, or case-study results. Adapt the fields to a venue's form before submission.

## Shorter routes

Each adaptation uses the full deck with unlisted slides hidden. It names the slides kept, a bridge sentence for every dependency a cut removes, a compression plan for each worked example, and a close for that length.

| Talk | 15-minute | 30-minute |
| --- | --- | --- |
| Automating Improvement From Failure | [Lightning](talks/failure-improvement/adaptation-15min.md) | [Standard](talks/failure-improvement/adaptation-30min.md) |
| Adaptive, agentic apps | [Lightning](talks/adaptive-systems/adaptation-15min.md) | [Standard](talks/adaptive-systems/adaptation-30min.md) |
| Buy Me a Free Tier | [Lightning](talks/free-tier/adaptation-15min.md) | [Standard](talks/free-tier/adaptation-30min.md) |
| Outsmart Your Lying, Cheating Students | [Lightning](talks/evidence-learning/adaptation-15min.md) | [Standard](talks/evidence-learning/adaptation-30min.md) |
| Dynamic Scaling of Agentic Workloads | [Lightning](talks/dynamic-scaling/adaptation-15min.md) | [Standard](talks/dynamic-scaling/adaptation-30min.md) |
| Product Engineering | [Lightning](talks/product-engineering/adaptation-15min.md) | [Standard](talks/product-engineering/adaptation-30min.md) |
| Turn Your Thinkin' Tokens Up to 11 | [Lightning](talks/judgment/adaptation-15min.md) | [Standard](talks/judgment/adaptation-30min.md) |
| Benchmarks | [Lightning](talks/benchmarks/adaptation-15min.md) | [Standard](talks/benchmarks/adaptation-30min.md) |
| Three Search Methods in a Fundable Trenchcoat | [Lightning](talks/retrieval/adaptation-15min.md) | [Standard](talks/retrieval/adaptation-30min.md) |

A 45-minute slot is the 40-minute deck plus five minutes of questions. Timings are rehearsal targets without Q&A. All nine talks carry 40/30/15 presenter scripts as plain files. Outsmart also carries a hand-written 15-minute [procurement route](talks/evidence-learning/procurement-route.md) for administrator audiences.

## Bullet outlines

Each talk folder holds a hand-written `bullets.md`, indexed in [talks/bullets-index.md](talks/bullets-index.md): the spine in a screen, then each slide's on-screen lines and the beats to say in order, with Story, delivery and source notes. Use them to rehearse the arc, to fill a CFP form's outline field, and to find which slide owns an idea. `index.md` in each talk folder is the canonical complete talk; when it changes, update the bullets by hand.

## Shorts

[shorts/](shorts/README.md) holds 31 standalone cuts, 1 to 10 minutes each: one idea, one number or picture, one landing line. Each names its parent talk and slide so the fixtures and evidence travel with it. Twenty-three are sized for video (1 to 5 minutes); eight are lightning slots (5 to 10). Hand-written, not generated from the outlines.

## Image prompts

Adaptive and Dynamic Scaling use actual SVG diagrams linked from their outlines, with typography slides where a diagram adds little. See their [adaptive visual inventory](talks/adaptive-systems/visuals.md) and [dynamic-scaling visual inventory](talks/dynamic-scaling/visuals.md). The diagrams match the browser decks: dark backgrounds, mint for adaptive, amber for dynamic scaling, and readable labels. Failure Improvement, Product Engineering, Judgment, Benchmarks, and Retrieval also have real SVGs and packet visual inventories. Some other outlines retain `<!-- image: ... -->` prompts.

## What makes the talks distinct

| Talk | Central audience decision | Worked example |
| --- | --- | --- |
| Improvement From Failure | What is the smallest step toward a system that fixes itself, and what access do you grant next? | An agent with log access grows into a scheduled loop that distills, classifies, files guarded tickets and PRs, and answers customer feedback. |
| Adaptive, agentic apps | How do we give an assistant real access and manage the risk? Conjure a narrow agent per job, prove every repair, let the app ask for its own scale. | One address ingest: a rename, an ambiguous status and a lost provider response; a per-job agent generator with a logged tool gate. |
| Outsmart Your Lying, Cheating Students | Once you stop trying to catch anyone, how do you out-design them? | Three moves (the smudged sheet, small-group speaking, AI time across 300 transcripts) around the percentage reconstruction, a rubric and a four-line record. |
| Dynamic Scaling | Now that agents can direct their own compute, where do the limits live? | Four legitimate callers, forty image jobs; a $2 ledger; a reclaimed spot worker; compute as a request, catalog and lease; the ephemeral vendor substrate. |
| Product Engineering | Which functions of my product group become agents, who owns each one, and where do the guards go? | An activation winner violates support and false-urgency constraints. |

The two education talks use different worked examples so they can be booked together.

## Evidence and worked-example details

- [Education research and claim boundaries](talks/evidence-learning/evidence.md) and [worked assessment exercises](talks/evidence-learning/demo.md).
- [Failure-improvement evidence](talks/failure-improvement/evidence.md) and [supporting example](talks/failure-improvement/demo.md).
- Adaptive-systems evidence and stage sequence.
- [Free Tier evidence](talks/free-tier/evidence.md) and [worked example](talks/free-tier/demo.md).
- [Product Engineering evidence](talks/product-engineering/evidence.md) and [worked example](talks/product-engineering/demo.md).


The talks use authored fixtures and saved output where a concrete example helps. Runnable implementations live in separate supporting repositories. The slide decks do not depend on an interactive application.

## Topic ownership

Each talk owns a topic; the others defer to it rather than re-teaching it.

Retrieval owns the Cranfield/TREC history and the pooling exercise. Benchmarks owns validity, reliability and small-sample inference. Judgment owns feature selection, release pacing, the user's cost of change, and versioning as a user-facing surface. Multi-candidate orchestration, the Council of Guards and the barrel-of-monkeys maneuver belong to [Dynamic Scaling](talks/dynamic-scaling/index.md). Cost per accepted outcome belongs to [Free Tier](talks/free-tier/index.md). Runtime recovery belongs to [Adaptive](talks/adaptive-systems/index.md); the offline improvement loop belongs to [Failure Improvement](talks/failure-improvement/index.md).

The outline is the canonical text. The scripts, adaptations and bullet sheets beside it were generated once and are now plain files; edit them by hand, and keep the deck's speaker notes in step with the outline. Sources and claim boundaries live beside slides and in each packet's evidence bank. Named Story prompts still require Dan's own records. The synthetic fixtures do not establish customer outcomes or productivity gains.

## Reuse across the portfolio

Pair the strategic education talk with the assessment-design talk when a program wants both framing and implementation. Pair failure improvement with adaptive systems or dynamic scaling when the audience wants to grow an agent's authority and change execution policy; failure improvement owns the offline loop and compile-what-repeats beat. Adaptive and Dynamic Scaling are companions: adaptive owns per-job agent generation and repair authority, dynamic scaling owns admission, ledgers and the compute substrate. Pair the economics talk with Product Engineering when the discussion spans market incentives and organizational decisions.

Retrieval, Benchmarks, and Judgment now use canonical outlines here. The former `flagship-talks/` directory was removed on 6 September 2026: its outline files were pointer stubs and its PowerPoints were byte-identical aliases of the current screen exports, which drift on the next sync. The two `outlines/product-engineering-{15,30}min.md` pointer stubs went the same way on 7 September, as the audit had recommended.

## Adaptive and Dynamic Scaling rewrite, September 6

Both talks were rewritten around Dan's direction: the assistant-with-everything question and a per-job agent generator for adaptive; the infra inversion, agent-directed compute and the ephemeral vendor substrate for dynamic scaling (formerly Rethinking Parallelization). Each outline is the single source for the wording; the 40/30/15 scripts and the two adaptations sit beside it as plain files. Disclaimers are said once per talk. Story slots are listed in each evidence bank and must be filled before delivery. Timings are rehearsal targets, not recordings.

## Judgment rewrite, September 7

*Code Is Cheap. Judgment Is Expensive.* became **Turn Your Thinkin' Tokens Up to 11**, keeping the `judgment` slug. The queue argument — Kingman, Deming, Elish, the rubber-stamp fixture — left the portfolio and survives only in three standalone shorts, [Who Ate My Slack?](shorts/you-ate-their-slack.md), [Human Crumple Zone](shorts/human-crumple-zone.md) and [The Test Who Loved Me](shorts/test-that-loves-the-bug.md), whose fixture now lives in [shorts/fixtures/](shorts/fixtures). The new talk owns feature selection, release pacing, the user's cost of change, and two labeled predictions about versioning and shared configuration profiles.

## September 6 review rewrites

Failure Improvement owns the offline loop and its reviewer. Product Engineering reprices coordination and defines interfaces. Benchmarks validates the measuring instrument. Retrieval follows Cranfield, TREC pooling, and assessor disagreement. Each has a visual inventory. The failure-improvement live recording still needs verified stories and an executed integration; see the recording plan.

| Rewritten talk | Canonical source | Full presenter script |
| --- | --- | --- |
| Failure Improvement | [Outline](talks/failure-improvement/index.md) | [Script](talks/failure-improvement/script-40min.md) |
| Product Engineering | [Outline](talks/product-engineering/index.md) | [Script](talks/product-engineering/script-40min.md) |
| Benchmarks | [Outline](talks/benchmarks/index.md) | [Script](talks/benchmarks/script-40min.md) |
| Three Search Methods in a Fundable Trenchcoat | [Outline](talks/retrieval/index.md) | [Script](talks/retrieval/script-40min.md) |
