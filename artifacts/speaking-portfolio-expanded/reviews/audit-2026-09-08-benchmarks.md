# Audit: Stop Looking at My Benchmarks… Get Your Own! — 8 September 2026

Audited against `talks/benchmarks/index.md` (canonical, 15 slides), the three scripts, both adaptations, `bullets.md`, `packet.md`, `formats.md`, `CFP.md`, `evidence-bank.md`, `contracts.md`, `visuals.md`, `public/talks/assets/benchmarks/bound.svg`; the prior verdicts in `reviews/benchmarks-review.md` and `reviews/audit-benchmarks.md`; the roll-up `reviews/AUDIT-2026-09-06.md`; `talks/retrieval/index.md` and `talks/free-tier/index.md` for ownership; and Dan's posts `src/content/posts/2026-05-06--llm-evals-are-broken/index.mdx` and `src/content/posts/2026-08-11--auto-tune-your-llm-judge/index.mdx`. Every number recomputed in Python. Every source URL fetched. Thirteen citations checked against the literature.

## Verdict

**The rewrite cleared the bar it was set.** The talk now beats Dan's own posts on argument, on evidence and on the number — it has a spine the posts do not have, it does arithmetic on stage the posts only assert, and it corrects a factual error in one of the posts it cites. Every statistic is exactly right. Every citation is real and used within what it supports. The old review's nine hedges are down to seven, of which two are the skill-endorsed "say what it does not prove" move; net excess is four, not nine.

It loses to the posts on one axis, and it is the axis the title names. *Get Your Own!* promises a build. The talk hands the room six vocabulary words and no artifact, while "Fight Evils with Evals!" hands over a `GoldenCase` type and a working harness. Five blocking items, all mechanical except one: **all three on-stage calculations print their answers on the slide before Dan derives them, including the peak.**

## Status vs prior audits

| Prior finding | Status | Evidence |
| --- | --- | --- |
| (a) `"supplied article"` leftover in Source line | **FIXED** | `grep -rn "supplied article" talks/ shorts/` → none. `index.md:111` now reads `danlevy.net, 11 August 2026.` |
| (b) Add Goodhart 1975 to slide 3 | **FIXED** | `index.md:48` opens `Goodhart (1975), Problems of Monetary Management: The U.K. Experience, Reserve Bank of Australia conference paper (reprinted 1981).` Verified correct (see citation table). |
| (c) Slides 4 and 9 used the rejected "Your X Is a Y" formula | **PARTIAL** | Slide 9 fixed → `Agreeable to a Fault (κ = 0)` (`index.md:134`). Slide 4 is now `Your Eval Suite Needs Therapy` (`index.md:50`) — a shorts title, approved, but still opens `Your …`. Acceptable; the joke is the swap, not the formula. |
| (d) Slide 13 duplicated Free Tier slide 10 (cost per success) | **FIXED** | Slide 13 is now `The Cheapest Honest No` (check ladder). `index.md:33` defers explicitly: `The cost-per-success arithmetic belongs to Buy Me a Free Tier.` Free Tier retains it at `free-tier/index.md:199`. |
| (e) Nine self-retractions/disclaimers | **IMPROVED, STILL OPEN** | Seven remain (inventory below). Rule is one. |
| Old review (b): "the word *I* does not appear once in 18 slides"; title's first-person premise unearned | **STILL OPEN** | Exactly one first-person sentence in 40 minutes: `index.md:107`. See Part B §4. |
| Old review (e): thirty-two minutes with no audience moment | **FIXED** | Six delivery beats: slides 1, 6, 7, 8, 9, 14. |
| Old review (f): "the talk has 18 slides and no crest" | **FIXED (with a caveat)** | Slides 8–9 are a real 7-minute peak. Caveat is BLOCKING-5. |
| Old review (j): 30-min route deletes the argument | **FIXED** | 30-min keeps 1,2,3,4,5,6,7,8,9,12,14,15 — the argument and the number survive; bridges at slides 9 and 12 cover every cut. |
| Shorts parent pointers stale | **FIXED** | `run-your-judge-five-times.md:3` → `slides 7 and 9`; `nice-paragraph-buys-a-refund.md:3` → `slides 2, 3, 5, 6, 12, 13`. |
| `formats.md` MERGE recommendation | **REGRESSED** | `formats.md` is now 1 byte (empty) while `packet.md:5` and `README.md:45` both link to it. See BLOCKING-3. |

## Talk vs blog post

The old verdict — *"weaker than Dan's own posts on the subject"* — is no longer true. It is also not yet unambiguously false. Here is the split, with quotes.

### Where the talk now wins

**1. It has an argument the posts do not have.** The posts assert; the talk proves. "Fight Evils with Evals!" says (`llm-evals-are-broken/index.mdx:263`):

> The benchmarks are not lying. They are answering someone else's question.

True, and the room agrees by minute four. The talk goes one level down and asks whether *your* benchmark answers *your* question either (`index.md:57`):

> Your eval suite is a psychometric instrument somebody checked into Git. It produces scores from tasks and judgments, then we use those scores to make decisions. Where is its validation?

That question is not in either post. It is the thing that makes this a talk rather than a listicle.

**2. It has the number, and the posts have none.** Neither post contains a single derived figure. The talk derives one on stage (`index.md:124`):

> With no failures, the chance of that observation at failure probability p is one minus p, raised to twenty. Set it to five percent. Solve for p. The exact one-sided ninety-five-percent upper bound is about thirteen point nine percent.

**3. It corrects the post.** "Auto-Tune Your LLM Judge" (`auto-tune-your-llm-judge/index.mdx:125`) says:

> Scores of `78, 79, 81, 82, 80` look stable on a chart. If the pass threshold is 80, that evaluator changed its decision three times while looking perfectly well-behaved.

That is wrong on both readings. Under the post's own definition at line 131 ("the share of repeated runs whose verdict differs from that case's majority verdict") it is 2/5 = 40%. Counting adjacent transitions it is one. The talk gets it right (`index.md:105`). The talk is more careful than the published prose it cites.

**4. It brings ninety years of literature the posts never touch.** Cronbach and Meehl, Messick, Raji, Hanley, Card, Cohen, Feinstein, Voorhees, Oren, Dwork. The posts cite two arXiv IDs and four vendor doc pages.

### Where the posts still win

**1. Concreteness in the first ninety seconds.** The post opens (`llm-evals-are-broken/index.mdx:16-18`):

> Every new model arrives wearing a tuxedo of benchmarks.
>
> MMLU: 92.4%. HumanEval: 87.2%. LLeMU: 88.7%. MATH: 73.6%. AGI: 127%!

The talk keeps the tuxedo line (`index.md:13`) and throws away the joke, replacing it with `A · 89.7 / B · 88.9 / C · 84.3` — then disowns it two sentences later (`index.md:15`). **"AGI: 127%!" is the best line either artifact contains and it is not in the talk.** It is a fake leaderboard entry that makes the argument, gets a laugh, and requires no disclaimer because nobody thinks AGI is a benchmark scoring 127%. The talk sanded off a joke that was doing structural work, and paid for it with a hedge.

**2. The reversal sentence.** The post has it (`llm-evals-are-broken/index.mdx:40`):

> **You're using your users as test infrastructure.** They didn't sign up for that.

That is exactly the shape the voice skill describes — the object becomes the subject, the people you thought you were serving turn out to be your QA department. The talk has no sentence in that shape anywhere. Its load-bearing statement (`bullets.md:3`, *"Validate the instrument before optimizing its score."*) is an imperative, not a reversal. See Part B §3.

**3. Stakes.** The post has a section titled "What 'Vibes-Based Evaluation' Actually Costs" and then names three costs. The talk never says what happens to you if you skip this. The one place it could — the Story slot at `index.md:63` — is empty by design.

**4. The build.** This is the headline. The post ships a working `GoldenCase` interface, a `groundedCitations` scorer, and a baseline-vs-candidate comparison function. "Auto-Tune Your LLM Judge" ships an eight-step practical version and a promotion-criteria block:

> ```
> required:
>   human agreement >= current baseline
>   hard-failure recall >= 98%
> optimize:
>   decision flip rate -> 0
> ```

The talk's equivalent is `index.md:201`: *"Check the account state with code. Check whether a required field exists with code."* No code, no template, no named artifact. `contracts.md` holds the acceptance criteria but it is a handout, not a slide, and the room does not leave with it.

**Verdict on the comparison: the talk beats the posts on the argument and loses to them on the build — and the title promises the build.** That single sentence is the whole finding.

## Hedge inventory

Rule: one scope disclaimer, slide 1, then stop apologizing. Current count **seven**, of which one is allowed and two are the skill-sanctioned "cited to set aside" move. Net excess: **four**.

| # | file:line | quote | verdict |
| --- | --- | --- | --- |
| 1 | `index.md:15` | "One scope statement: the model names and workload numbers in this fixture are invented. The arithmetic and cited research are checkable. We are choosing a support system, not measuring general intelligence." | **ALLOWED** — this is the one. |
| 2 | `index.md:29` | "C has the best pass rate **in this fixture**." | **CUT.** Slide 1 already said the numbers are invented. Re-flagging fourteen seconds later is the deposition register. |
| 3 | `index.md:48` (Source) | "Formulations above are attributed paraphrases, not claims that every optimized benchmark has stopped measuring anything." | **MOVE to evidence-bank.** It is already there almost verbatim at `evidence-bank.md:11`. |
| 4 | `index.md:105` | "There is one change between adjacent runs; **do not confuse that with majority disagreement**." | **REWRITE.** This is a silent correction of `auto-tune-your-llm-judge/index.mdx:125`, cited on the same slide. Say it out loud instead — see SHARPEN-6. |
| 5 | `index.md:111` (Source) | "The sequence is reused as a teaching fixture, not a fresh measurement." | **MOVE to evidence-bank** (already at `evidence-bank.md:5`). |
| 6 | `index.md:160` | "That is evidence about those comparisons, **not permission to trust any automated grader**." | **KEEP** — legitimate "say what it does not prove." But the Retrieval talk does it better: `retrieval/index.md:178` turns the same caveat into an action ("relabel a sample independently, then see which conclusions survive"). Steal that shape. |
| 7 | `index.md:173` | "**That does not make every public score meaningless.** It makes provenance a question you must ask." | **CUT the first sentence.** This is the old review's item (b) — *"slide 4 apologizes to the thing in the title"* — migrated to slide 11. The title picks a fight; this sentence buys the other guy a drink. The second sentence carries the whole point without it. |

Not counted as hedges (they are argument, correctly scoped): `index.md:122` (IID assumption — required and good), `:126` (handpicked cases are not a sample — the sharpest paragraph on the slide), `:143` (kappa prevalence sensitivity — Feinstein and Cicchetti raised before someone else raises it), `:229` (the honest limitation — the payload).

Stage-direction self-instructions at `:109` ("do not claim a live model run") are notes to self, not spoken, and belong where they are.

## Citation table

Every URL fetched 2026-09-08. Every claim checked against the source literature.

| Slide | Claim on the slide | Source cited | What the source actually supports | Verdict |
| --- | --- | --- | --- | --- |
| 3 | "Goodhart described statistical regularities breaking under pressure from their use in control." | Goodhart (1975), *Problems of Monetary Management: The U.K. Experience*, RBA (reprinted 1981) | Goodhart's actual 1975 wording: "Any observed statistical regularity will tend to collapse once pressure is placed upon it for control purposes." Presented July 1975, *Papers in Monetary Economics* Vol. I, Reserve Bank of Australia; reprinted in Courakis (ed.), *Inflation, Depression, and Economic Policy in the West*, Barnes & Noble, 1981, p. 116. | **EXACT.** Paraphrase is faithful. "Conference paper" is loose for *Papers in Monetary Economics* but defensible. |
| 3 | "The familiar sentence about a measure becoming a target comes through Marilyn Strathern." | Strathern (1997), *European Review* 5(3), 305–321 | Confirmed. Strathern's paraphrase — "when a measure becomes a target, it ceases to be a good measure" — is the popular formulation; the paper is an anthropological account of UK RAE audit culture, adapted from the Girton Founders' Memorial Lecture, 11 March 1997. Volume, issue and pages exact. | **EXACT.** This is the credit most talks get wrong. |
| 3 | "Campbell described the pressure that social decision-making puts on indicators and on the processes they measure." | Campbell (1979), DOI 10.1016/0149-7189(79)90048-X | *Evaluation and Program Planning* 2(1). DOI resolves 200. Campbell's law concerns corruption pressure on quantitative social indicators used for social decision-making. | **EXACT**, and correctly distinguished from Goodhart rather than merged. |
| 5 | "Cronbach and Meehl gave us construct validity." | Cronbach & Meehl (1955), *Psych. Bulletin* 52(4), 281–302 | Confirmed. **But**: the paper's operative requirement is the *nomological network* — "to validate a claim that a test measures a construct, a nomological net surrounding the concept must exist." The talk borrows the concept without the machinery. See Part B §7. | **TRUE BUT UNDER-QUALIFIED.** |
| 5 | "Messick puts interpretation and use at the center of validation." | Messick (1990), ETS RR-90-11 | Confirmed: ETS Research Report RR-90-11, August 1990, also *ETS Research Report Series* 1990(1), 1487–1495, DOI 10.1002/j.2333-8504.1990.tb01343.x. Opens with validity as "an integrated evaluative judgment of the degree to which empirical evidence and theoretical rationales support the adequacy and appropriateness of interpretations and actions based on test scores." | **EXACT.** Strongly supported. |
| 5 | "Raji and colleagues make the problem explicit for broad AI benchmarks." | Raji et al. (2021), NeurIPS D&B | Raji, Bender, Paullada, Denton, Hanna. The paper explicitly frames its critique as *construct validity* issues in "general" benchmarks; argues task formation happens independently of the declared problem space. | **EXACT**, and the talk understates it — Raji uses the same term the slide does. |
| 8 | "The exact one-sided ninety-five-percent upper bound is about thirteen point nine percent"; "three divided by twenty, fifteen percent" | Hanley & Lippman-Hand (1983), *JAMA* 249(13), 1743–1745 | Confirmed, PMID 6827763. The paper's own worked example is literally 20 trials with zero events, giving ~14%, with 3/n as the approximation. | **EXACT.** But the URL 404s — BLOCKING-2. |
| 8 | "Card and colleagues examined statistical power in NLP comparisons. Small tests also miss real differences." | Card et al. (2020), EMNLP main.745 | Card, Henderson, Khandelwal, Jia, Mahowald, Jurafsky. Finds underpowered experiments common in NLP; small GLUE test sets mean most SOTA comparisons are inadequately powered. | **EXACT**, understated. |
| 9 | "Cohen's kappa compares observed agreement with agreement expected from the marginal label rates." | Cohen (1960), *EPM* 20(1) | Correct definition. Sage URL returns 403 to bots; the article is real (DOI 10.1177/001316446002000104). | **EXACT.** URL is bot-blocked, not dead — NIT. |
| 9 | "But kappa also changes with prevalence." | Feinstein & Cicchetti (1990), PMID 2348207 | *J Clin Epidemiol* 43(6). "High agreement but low kappa" is precisely the prevalence paradox. The slide raises the pathology in its own metric before the room can. | **EXACT**, and the right register. |
| 9 | "Position bias and self-preference have published evidence behind them." | Shi et al. (2024), arXiv 2406.07791; Wataoka et al. (2024), arXiv 2410.21819 | Shi, Ma, Liang, Diao, Ma, Vosoughi (Dartmouth) — 15 judges, MTBench + DevBench, 150k+ instances; position bias not attributable to chance. Wataoka, Takahashi, Ri (SB Intuitions / U. Tokyo) — GPT-4 self-preference tracks output perplexity. | **EXACT.** Staleness NIT: 2406.07791 is now v9 (Nov 2025), retitled *A Systematic Study of Position Bias in LLM-as-a-Judge*, published IJCNLP-AACL 2025, 292–314. |
| 10 | "Cleverdon, Mills, and Keen documented the Cranfield test collections in 1966."; "NIST started TREC in 1992" | Cleverdon/Mills/Keen (1966); NIST TREC overview | Both correct; both URLs resolve. | **EXACT** — but this is Retrieval's topic. See SHARPEN-2. |
| 10 | "Voorhees found comparative rankings remarkably stable under changed judgments in the experiments she studied." | Voorhees (2000), IP&M 36(5), 697–716 | Confirmed: very high correlations among system rankings across alternative judgment sets; absolute scores shift, relative ordering is preserved. The slide's scoping ("in the experiments she studied") is exactly right. | **EXACT**, correctly hedged. |
| 11 | "Oren and colleagues show a way to detect contamination in black-box models **under their method's assumptions**." | Oren et al. (2024), ICLR | Confirmed. The assumption is dataset *exchangeability*; the test detects preference for canonical example ordering, with provable false-positive-rate control, no weights or training data needed. The slide's "under their method's assumptions" is doing real work. | **EXACT**, well qualified. |
| 11 | "Dwork and colleagues formalized this adaptive-data-analysis problem and studied controlled reuse." | Dwork et al. (2015), *Science* 349(6248), 636–638 | Confirmed. DOI 10.1126/science.aaa9375. Differential-privacy-based stability; Thresholdout. | **EXACT.** |
| 7 | "In Auto-Tune Your LLM Judge I call majority disagreement the decision flip rate." | Dan Levy, danlevy.net, 11 Aug 2026 | `auto-tune-your-llm-judge/index.mdx:131` defines it exactly that way. URL resolves 200. | **EXACT** — and the talk is more correct than the post it cites. |

**Contamination and leaderboard staleness: nothing to check.** `grep -Ei 'MMLU|HumanEval|GSM8K|SWE-bench|GPQA|LMArena|HELM|saturat'` across all twelve files returns nothing but the word "leaderboard" used generically. The talk names no public benchmark, ranks nothing, and makes no saturation claim. Deliberate (`CFP.md:27`) and correct. **This talk cannot go stale.** That is a genuine design win and worth saying out loud in a CFP.

## Arithmetic — all work shown

```python
p = 1 - 0.05**(1/20)          # 0.13910834066826516
(1-p)**20                     # 0.05000000000000005   ✓
3/20                          # 0.15                  ✓ rule of three
0.85**20                      # 0.03875953...         (conservative, as expected)
1/7                           # 0.14285714...
1/0.139108                    # 7.1887                → "one in 7.2"

# kappa, slide 9
p_o = 0.90
p_e = 1.0*0.9 + 0.0*0.1       # 0.90
(p_o - p_e)/(1 - p_e)         # 0.0                   ✓

# decision flip, slide 7
[s >= 80 for s in (78,79,81,82,80)]   # [F, F, P, P, P]
majority = pass (3/5); minority       # 2/5 = 0.40     ✓
adjacent transitions                  # 1              ✓

# slide 7 first sequence
max(94,82,91,97,89) - min(...)        # 15-point spread ✓ (matches post)
```

Every figure on every slide, in `bound.svg`, in `contracts.md:9-13` and in `evidence-bank.md:5-7` is correct and mutually consistent. `bound.svg` reads `3 / 20 = 15%`, `1 − 0.05^(1/20) = 13.91%`, `About one failure in seven`, `IID sampling from the population of interest`, `Incident handpicks: Useful regressions; no population-rate bound`.

**Assumptions are stated, not hand-waved.** Slide 8 names independence and identical distribution (`index.md:122`), names the binomial via `(1 − p)^20`, and says **"one-sided"** explicitly (`:124`). Slide 9 names the marginal-rate assumption behind `p_e` (`:143`). This is better assumption hygiene than most statistics talks manage.

**One precision flaw, worth a clause.** `index.md:124` says the exact bound is 13.9%; `:124` then says *"About one in seven is the scale we still have not excluded."* One in seven is 14.29%, which is **outside** the 13.91% exact bound the same sentence just stated, and inside the 15% rule-of-three bound. The slide states both numbers and then headlines the looser one while calling the tighter one exact. The internal docs are careful — `evidence-bank.md:7` says "About one in seven communicates scale, not an estimated failure rate" — but the stage line is not. See SHARPEN-1.

## Pacing

Spoken paragraphs and bridge lines; `On screen`, `Source:`, `Story:` and `Delivery:` lines excluded.

| Route | All slides | Excluding exercise/walkthrough slides | Band 41–77 |
| --- | ---: | ---: | --- |
| 40-min | 1628 w / 40.0 min = **40.7 wpm** | 857 w / 19.5 min = **43.9 wpm** | PASS (at the floor) |
| 30-min | 1332 w / 30.0 min = **44.4 wpm** | 541 w / 11.0 min = **49.2 wpm** | PASS |
| 15-min | 1031 w / 15.0 min = **68.7 wpm** | 315 w / 4.25 min = **74.1 wpm** | PASS (at the ceiling) |

Per-slide outliers:

- **15-min slide 9** (11:30–13:45): 153 words in 2.25 min, but the delivery note says *"Allow 45 seconds to inspect the ten missed failures."* 153 words in the remaining 1.5 min = **102 wpm**. Undeliverable. BLOCKING-4.
- **15-min slide 6** (05:45–07:15): 114 words at 76 wpm *plus* "Walk through timeout-after-acceptance using the contracts handout." A walkthrough and 76 wpm cannot share ninety seconds. SHARPEN-8.
- **40-min slide 9**: 120 w / (3.5 − 0.75) = 43.6 wpm. Fine.
- **40-min overall at 40.7 wpm is the portfolio floor.** The Story slot at `index.md:63` will add ~100 words when filled, lifting slide 4 from 36.8 to ~77 wpm and the route to ~43. Fine once filled; thin until then.

## Cross-file drift

Clean. Programmatic diff of every spoken block in `index.md` against `script-40min.md` shows zero prose drift — the only difference on every slide is the timing line's position. `bullets.md` spine matches `index.md` slide-for-slide: 15 slides, contiguous, 2.5+2+2.5+2.5+2.5+3+3+3.5+3.5+2.5+3+2.5+2+2.5+2.5 = 40:00. `adaptation-15min.md` / `adaptation-30min.md` keep-lists match their scripts. `README.md:59` and `CFP.md:29` both say 15 slides. `visuals.md:5` links `bound.svg`, which exists. All five benchmarks shorts point at live slide numbers.

Two exceptions, both in BLOCKING below: the empty `formats.md`, and the 404 Hanley URL replicated across `index.md:132`, `script-40min.md:128`, `script-30min.md:128`, `script-15min.md:116`, `bullets.md:127`.

## Jokes

Eighteen lines carry voice, roughly one every 2.2 minutes. Three are imports from the posts (`:13` tuxedo, `:103` noise wearing a lab coat, `:107` a stable liar is still a liar); fifteen are native. Best natives: `:57` "a psychometric instrument somebody checked into Git", `:61` "the nerve to keep it after it ruins the chart", `:91` "A transcript without an acceptance criterion is only a souvenir", `:141` "Congratulations, we have calibrated a button", `:175` "The holdout became development data one honest decision at a time", `:177` "Calling a file holdout.json does not make it held out", `:190` "A two-case slice should look like two cases, not a confident percentage", `:218` "If nothing would, you have a report, not a gate".

This is a complete reversal of the old review's *"exactly two lines with any voice in them."*

**But slide 8 — the peak, the hallway number, 148 words, 3.5 minutes — contains zero jokes.** The funniest title in the portfolio has its driest slide at the climax.

## Story slots and invented results

One `Story:` slot, `index.md:63`, named and unfilled. Correct. No invented eval result is presented as Dan's own anywhere — all fixtures are labelled at `:15`, `:109`, `:111`, and `evidence-bank.md:9` states plainly "No personal incident was invented."

One slot is thin for forty minutes, and it is the only first-person moment in a talk whose title says *my* benchmarks. See Part B §4.

## BLOCKING

**1. `CFP.md:13` misstates the talk's headline statistic, in the submission copy, on a talk about measurement.**

> "Power: twenty for twenty still leaves a one-in-seven true failure rate, by the rule of three."

Two errors. (a) It asserts a *rate*; the result is an *exclusion* — twenty for twenty fails to rule out a rate that high. The talk itself is careful (`index.md:126`, `evidence-bank.md:7`); the abstract a program committee reads is not. (b) It attributes one-in-seven to the rule of three, which gives 15% (one in 6.7); one-in-seven is the reciprocal of the *exact* bound. A measurement reviewer will circle this before reading paragraph two.

**Fix:** "Power: twenty passing cases in a row still leave a one-in-seven failure rate unexcluded at ninety-five percent confidence — the talk derives the bound on stage."

**2. The URL for the talk's most important source is dead (404), in five files.**

`index.md:132`, `script-40min.md:128`, `script-30min.md:128`, `script-15min.md:116`, `bullets.md:127` all carry:

> `https://www.medicine.mcgill.ca/epidemiology/hanley/c607/ch08/zero_numerator.pdf`

Verified `404`. Hanley's reprints migrated. **Fix:** `https://jhanley.biostat.mcgill.ca/c607/ch08/zero_numerator.pdf` (verified `200`), or PMID `6827763` (verified live).

**3. `formats.md` is empty; two files link to it.**

`formats.md` is 1 byte. `packet.md:5` says *"Presenter scripts for all three lengths are listed in [formats.md](formats.md)."* `README.md:45` links it as the Benchmarks formats index and `README.md:30` says it "indexes the available talk lengths and workshop material." `CFP.md:29` sends reviewers to `packet.md`, which sends them here. The submission packet has a hole in it. (Portfolio-wide: `judgment` and `retrieval` are also 1 byte; the other six run 3.2–5.8 KB.)

**Fix:** either restore the editions table to `formats.md`, or delete `formats.md` and point `packet.md:5` and `README.md:45` at the script links `packet.md:3` already carries.

**4. `script-15min.md:120-135`, slide 9: 102 wpm of actual speech. Undeliverable.**

Slot is 11:30–13:45 (2.25 min). Body is 153 words (135 of prose plus an 18-word bridge). The delivery note (`:135`) says *"Allow 45 seconds to inspect the ten missed failures."* That leaves 1.5 minutes for 153 words = 102 wpm, 33% over the band ceiling.

**Fix:** drop the 45-second inspection from the 15-minute route only — keep the confusion matrix and the `(0.9 − 0.9)/(1 − 0.9)` computation, which are the point. That restores 68 wpm.

**5. All three on-stage calculations print their answers on the slide before Dan derives them — including at the peak.**

| Slide | On-screen line | Delivery note that it spoils |
| --- | --- | --- |
| 7 | `index.md:101` — `> Majority disagreement: 2 / 5 = 40%` | `:109` — "Reveal the five verdicts and do the 2/5 calculation aloud." |
| 8 | `bound.svg` — `1 − 0.05^(1/20) = 13.91%` and `About one failure in seven` | `:130` — "Spend one minute on (1 − p)^20 = 0.05." |
| 9 | `index.md:137` — `> Always-pass judge: 90% agreement, κ = 0` | `:147` — "Write the 90/10 confusion matrix. Compute (0.9 − 0.9)/(1 − 0.9)." |

The stage directions instruct a reveal that the slide has already performed. On slide 8 this is worse than a missed beat: `deckFor` behaviour aside, the SVG *is* the only on-screen content for the peak slide, so the room reads `13.91%` and `About one failure in seven` while Dan is still setting up the algebra. The single most memorable minute of the talk is a replay with the answer visible in the fixture.

**Fix — three lines:** slide 7 → `> Majority disagreement: ? / 5`; slide 9 → `> Always-pass judge: 90% agreement, κ = ?`; `bound.svg` → split into a build, or replace the `Exact` and `Scale` rows with `1 − 0.05^(1/20) = ?` until the derivation lands. The arithmetic is right; only the timing is wrong.

## SHARPEN

**1. `index.md:124` — "about one in seven … we still have not excluded" is loose against the exact bound the same sentence states.** 1/7 = 14.29% > 13.91%. Fix with one clause: *"…about thirteen point nine percent. One in seven point two. Call it one in seven."* Six extra words, and it survives a statistician.

**2. Slide 10 (`index.md:151-164`) is Retrieval's topic, taught for 2.5 minutes and handed off in the same breath.** `README.md:121` is explicit: "Retrieval owns the Cranfield/TREC history and the pooling exercise." Benchmarks slide 10 duplicates `retrieval/index.md:132-147` (same Cleverdon 1966, same SIGIR museum URL), `:161` (same TREC 1992) and `:169-182` (same Voorhees 2000 claim). Then `index.md:162` says "The Retrieval talk follows that history and its pooling problem." **This is the dead-weight slide.** Cut it, recover 2.5 minutes, and keep only its last sentence — *"instrument validation is part of building the benchmark. It is not the ceremony after the launch"* — as a bridge line on slide 11.

**3. Slide 2's price column is shown and then disowned.** `index.md:26-28` puts `$0.34/run`, `$0.28/run`, `$0.20/run` on screen; `:33` says "The cost-per-success arithmetic belongs to Buy Me a Free Tier." Do not show a column you are about to hand to another talk. Drop the prices, keep the pass rates, save the hand-off sentence for the bridge. Recovers ~20 seconds and one deferral.

**4. `index.md:173` — "That does not make every public score meaningless."** The old review's item (b) regression. Cut the sentence; `:173`'s next clause ("It makes provenance a question you must ask") carries the entire point and picks the fight the title picked.

**5. Slide 8 has no joke.** 148 words, 3.5 minutes, the peak, the number everyone repeats — and the closest thing to a line is "More decimal places do not create more observations" (`:128`), which is good but is the fourth paragraph. Move it up, or import the reversal from the post: *"Twenty for twenty is not a passing grade. It is a very small sample with excellent manners."*

**6. `index.md:105` corrects an error in the post cited on the same slide, silently.** *"There is one change between adjacent runs; do not confuse that with majority disagreement."* Anyone who follows the Source link at `:111` reads "changed its decision three times" and hears "one." **Say it out loud** — it is the best register in the skill's list of self-aware asides that carry a real admission: *"I wrote three in the post. It's two out of five, and one adjacent flip. I'll take the correction; the metric survives it."* Turns a hedge into a laugh and buys credibility for the next twenty minutes.

**7. `index.md:107` is the only first-person sentence in forty minutes.** See Part B §4.

**8. `script-15min.md:68-81`, slide 6: 76 wpm plus a walkthrough in 90 seconds.** Either trim the third paragraph (`"A trace becomes a test when it answers a specific question…"` — 34 words) or drop the walkthrough note in the 15-minute route.

**9. `index.md:149` Shi et al. citation is a year and a title behind.** arXiv 2406.07791 is now v9 (Nov 2025), retitled *A Systematic Study of Position Bias in LLM-as-a-Judge*, published at IJCNLP-AACL 2025, pages 292–314. Cite the peer-reviewed version.

**10. `evidence-bank.md:3` and `index.md:3` both say "Sources checked 6 September 2026."** Bump to 8 September; the Hanley link rot is exactly why the date matters.

## NIT

- `index.md:149` Cohen URL returns 403 to bots (Sage bot-block, not link rot). Real. `https://doi.org/10.1177/001316446002000104` behaves the same. Leave it, or use the DOI form.
- 15-min route drops slide 2, but the slide-1 scope statement (`script-15min.md:15`) still disclaims "workload numbers" that route never shows.
- `README.md:29` and `:45` use the short name "Benchmarks" where `:59` uses the full title.

## Part B — The ceiling

### 1. Is the talk now stronger than Dan's own blog post?

**On the argument, decisively yes. On the build, still no — and the title promises the build.** Full quotes in the *Talk vs blog post* section above. The one-sentence version: the posts tell you to write your own tests and show you the code; the talk tells you the tests you wrote have never been checked and shows you the arithmetic. The talk found the harder question. It has not yet found the harder answer's artifact.

The single thing the post does that the talk does not: it ends with something you can paste. `interface GoldenCase { … sourceIncident?: string }`. The talk ends with six nouns.

### 2. What is the better talk inside this one?

Trace the spine, slide by slide. Unambiguously about validating the instrument: **4, 5, 7, 9**. Adjacent (about the *sample*, not the instrument): **8, 11**. Not on the spine at all: **1, 2, 6, 10, 12, 13, 14** — these are the pre-rewrite "how to build a good eval suite" talk with new headings bolted on.

So the spine is genuinely load-bearing from minute 7 to minute 25, and then **the talk reverts to the old methods talk for its final fifteen minutes.** Slide 12 (slice by mechanism), slide 13 (check ladder) and slide 14 (release gate) are all sensible and all answer *"how do I run a good eval"* rather than *"how do I validate my instrument."* Nobody in the room notices they changed talks, but the argument stops paying rent at 25:00.

**The 20% reorder — and it is a rewrite of three slides, not a reshuffle:**

- **Cut slide 10** (Retrieval's, 2.5 min) and **cut slide 2's prices** (Free Tier's, ~20 s). Recover 2:50.
- **Rewrite 12, 13, 14 onto the spine.** Slide 12 becomes *the slice is a reliability check* — a two-case slice reporting a percentage is the instrument lying about its own precision. Slide 13 becomes *what the instrument is allowed to be asked* — the ladder is a validity argument, not a cost argument. Slide 14 becomes *the rejection rule is the instrument's specification* — you cannot validate a measurement whose acceptance criterion you write after seeing the reading. Same content, same jokes, spine restored.
- **Spend the recovered 2:50 on the artifact the talk never hands over.** The six questions on slide 15 (`index.md:231`) are already a document: validity, reliability, agreement, power, contamination, Goodhart. Name it. **The suite ships with a calibration certificate** — six lines, each with the evidence behind it — and hand the template out. That is *Get Your Own!* delivered, it hijacks a form engineers already perform (the model card, the cal cert on the back of a torque wrench), and it turns slide 15 from a vocabulary recap into the thing the whole talk built.

The talk names nothing. Free Tier owns *cost per accepted outcome*. Dynamic Scaling owns *Council of Guards* and *barrel-of-monkeys*. Retrieval owns *the Cranfield paradigm*. Benchmarks names *decision flip rate* and immediately attributes it to a blog post. Give it one named artifact and it stops being a very good methods talk and starts being a talk people cite.

### 3. The thesis line

Current, `bullets.md:3`:

> Validate the instrument before optimizing its score.

Flat. Imperative, third-person object, no reversal, and it reads like a lint rule. It is also not on slide 1 — slide 1 carries the scope disclaimer where the thesis should be. The nearest thing to a thesis in the body is `index.md:57` ("Your eval suite is a psychometric instrument somebody checked into Git"), which is a good metaphor but is a *description*, not a reversal — nobody's role flips.

The reversal is sitting right there in the material and the talk walks past it. The suite exists to grade the model. The suite has never been graded. Candidates, in his voice:

1. **You built a test to grade the model, and nobody has graded the test.**
2. **Don't ask whether the model passed. Ask who checked the grader.**
3. **The suite is not measuring the model. It is measuring how carefully you defined "good," and it will keep that secret as long as it's green.**

(1) is the safest and has the right shape: the instrument the audience thought it was operating turns out to be the unexamined thing. (3) is the most Dan and the most dangerous — it is the same move as *"worry how it's training you."*

Land the short form: **"Test the instrument."** — which is already `index.md:233` and already right.

Note that `CFP.md:11` contains a sharper thesis than any slide does:

> Psychometrics has done this since Cronbach and Meehl in 1955; we ship a JSON file and call it a holdout.

That sentence should be on slide 4.

### 4. The title

*Stop Looking at My Benchmarks… Get Your Own!* works because it hijacks a schoolyard line — the exam-hall "eyes on your own paper" — and the swap does two jobs at once: it names the subject (benchmarks) and delivers the whole thesis (yours, not theirs) in five words, in the voice of someone who is annoyed rather than someone who is explaining. One joke, one swap, no colon. Skill-approved and it earns it.

**Two problems with delivery on the promise.**

*"My"* is unearned. `grep -nE "\bI\b|\bmy\b"` across the canonical outline returns exactly two hits: `index.md:80` (the customer saying "Cancel my account") and `index.md:107` (a citation to his own post). The old review said this in September and it is still true: the title implies Dan has benchmarks somebody is looking at, and the talk never produces them. The Story slot at `:63` is the one place it could, and it is empty. **Fill it with a real suite, real numbers, and a real green run that lied — and the title becomes literal instead of rhetorical.**

*"Get your own"* is delivered, but assembled from parts and never handed over. Slide 6 (turn a trace into a case), slide 12 (slice), slide 13 (ladder), slide 14 (rejection rule), slide 15 (start with twenty). All of that is a method. None of it is a *thing*. See §2 — the calibration certificate is the fix.

### 5. The hallway number

*"Twenty for twenty is consistent with one in seven."* It is the right number: it is small, it is surprising, it is checkable on a napkin, and it is the only figure in the talk an attendee can repeat without a slide.

**Stated memorably?** Yes — it is the slide heading (`index.md:113`, *Twenty for Twenty, One in Seven*), it names a short (`shorts/twenty-green-tests.md`), and it leads the CFP.

**Arithmetic done on stage?** Yes, one minute allocated (`index.md:130`) and the derivation is spoken in full at `:124`. This is exactly what the skill asks for.

**Two things blunt it.** First, BLOCKING-5: the SVG prints `13.91%` and `About one failure in seven` before the derivation. Second, SHARPEN-1: "one in seven" is 14.29% against a stated exact bound of 13.91%, so the memorable version is slightly looser than the precise one on the same slide. Say *"one in seven point two — call it one in seven"* and both problems shrink to nothing.

There is a **second** hallway line available and the talk almost says it. At `index.md:126`:

> Twenty cases hand-picked from your favorite incidents are not a random sample. The confidence statement does not transfer to that set.

The unstated half — the half that resolves the hostile expert's best attack and gives the room its second repeatable line — is: **twenty selected cases are not a sample, they are a specification.** A specification does not need a confidence interval. It needs an acceptance criterion. That one sentence turns the slide's uncomfortable middle into the talk's second-best idea.

### 6. The peak

**Minutes 18:00–25:00, slides 8 and 9.** Correctly placed (55–62% through), correctly weighted (7 of 40 minutes, the two longest slides), and correctly built: reliability (7) → sample size (8) → agreement (9) is an ascending argument, not three parallel facts.

**Is it real?** The *content* is real — the room does algebra it has not seen, on a fixture where the answer is not implied by the setup. That is a genuine peak, not a demo replay, and it is the single biggest improvement over the pre-rewrite talk.

**But it is performed in front of a slide that already spoiled it.** BLOCKING-5. On slide 8 the SVG is the only thing on screen and it contains both the exact bound and the punchline. Dan does a minute of live derivation while the room is reading the answer. Fixing this costs three edits and is the highest-leverage change in the audit relative to effort.

### 7. The hostile expert

A psychometrician in row three, three attacks in descending order of danger.

**Attack A — "You imported construct validity without the nomological network, and you didn't need it anyway."** Cronbach and Meehl 1955 is explicit: validating a construct claim requires a nomological net — an interlocking system of laws relating the construct to observables and to other constructs. The talk invokes construct validity at `index.md:72` and never builds a net. Worse for the talk: its own worked example does not *need* construct validity. A cancellation suite has an observable criterion — the account state — which makes it a criterion-validity problem, the easy case in psychometrics. The talk borrowed the field's hardest concept to describe the situation where it bites least.

**Does the talk survive?** Partly. Raji et al. gives cover for aiming construct validity at *general* benchmarks, and that is what slide 5's second paragraph does. But paragraph three (`:76`) immediately turns the concept on the cancellation suite, and that is where it does not fit.

**The inoculating sentence, raised first, on slide 5:** *"Cancellation is the easy case — there is an observable end state, so this is criterion validity and you can just go read the database. Construct validity is the leaderboard's problem, not yours. I am borrowing the vocabulary because it is the only vocabulary that has ninety years of results behind it."* That converts the attack into the speaker's own point and is exactly the "cited to set aside" move the skill endorses.

**Attack B — "Your small-sample argument cuts against your own recommendation."** Slide 8 proves twenty cases certify nothing. Slide 15 (`:229`) says "Start with twenty cases tomorrow." The talk notices at `:229` ("Then attach the honest limitation") but never resolves it — it concedes rather than answers.

**Does it survive?** As written, weakly. The resolution is already half-written at `:126` and needs its other half: the twenty cases are not a sample drawn from a population, so the bound does not apply to them *and* they never claimed to certify a rate. They are a specification. **Inoculating sentence, on slide 8, immediately after the bound:** *"Which means the twenty cases I'm about to tell you to write are not a sample at all. They're a specification. Specifications don't get confidence intervals. They get acceptance criteria."*

**Attack C — "Kappa is prevalence-sensitive, so your κ = 0 demo is the known pathology, not an indictment."** Already inoculated at `index.md:143`, with Feinstein and Cicchetti cited. **Survives cleanly.** This is the model for how A and B should be handled.

### 8. Dead weight

**Cut slide 10, `index.md:151-164` — *Cranfield had a test collection*. Buys 2:30.**

It is Retrieval's topic by written portfolio rule (`README.md:121`), it duplicates three Retrieval slides citation-for-citation including the identical SIGIR museum URL, it is off the spine (see §2), and the talk defers it in the same breath it teaches it (`:162`). The one line worth keeping — *"instrument validation is part of building the benchmark. It is not the ceremony after the launch"* — is a bridge, not a slide.

**Second cut, `index.md:26-28`: the price column.** Shown, then handed to Free Tier at `:33`. ~20 seconds.

**Total recovered: ~2:50** — enough for the calibration-certificate artifact in §2, or to give the Story slot at `:63` the room it needs to be a story rather than a sentence.

### 9. The landing

`index.md:233-235`:

> The suite is an instrument. Test the instrument.
>
> Stage direction: Stop talking.

**Correct.** Two short declaratives, no citation, no qualifier, silence stage-directed. This was three sentences before the September audit and is now right.

One refinement, contingent on §3: if the thesis becomes *"You built a test to grade the model, and nobody has graded the test,"* the landing should be its short form — **"Go grade the test."** — which is shorter, is an instruction rather than a description, and closes the loop the title opened. As it stands, "Test the instrument" repeats "instrument" from the sentence before it, which softens the final beat by a hair.

## What I could not verify

- **Cohen (1960)** and the **JAMA** landing page for Hanley return 403 to automated requests (publisher bot-blocking). Both are real — PMID 6827763 and DOI 10.1177/001316446002000104 both resolve — but I could not read the primary text. The talk's characterisations of both match the secondary literature exactly.
- **Feinstein and Cicchetti (1990)** and **Dwork et al. (2015)** were verified via PubMed metadata and the *Science* DOI record, not full text. Both uses are standard and uncontroversial.
- **Campbell (1979)** verified via DOI resolution and secondary sources; I did not read the article.
- **Cleverdon, Mills and Keen (1966)**: the linked PDF is the front matter of Volume I, Design, Part 2, Appendices. It resolves 200 and is the same URL Retrieval uses. I did not confirm that this specific front matter documents the test collections the slide describes — the claim itself is standard IR history and is not in doubt.
- **The Story slot** at `index.md:63` cannot be evaluated. Whether the talk lands depends entirely on whether the green-eval-then-production-failure case is real, specific and Dan's. Nothing is invented in its place, which is correct.
- **Delivery timing** is rehearsal arithmetic, not a recording. The wpm figures above assume every spoken paragraph is spoken and every stage direction is performed at the stated duration.
- **`bound.svg` rendering in a hand-authored deck.** `README.md:59` says the Benchmarks deck is "not yet rebuilt." I checked the SVG's text content, not how it will animate. BLOCKING-5's slide-8 fix may be free if the rebuilt deck stages the reveal.
