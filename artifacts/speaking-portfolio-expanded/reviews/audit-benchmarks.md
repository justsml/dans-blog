# Audit: Stop Looking at My Benchmarks… Get Your Own!

Audited 2026-09-06 against `outlines/benchmarks-40min.md` (canonical). Generated files regenerated in memory from `build-talk.ts` and diffed byte-for-byte against the checked-in scripts, adaptations, and `reveal-talks/benchmarks.html`: all identical. `arithmetic.ts` run; every number recomputed below.

## 1. Verdict

Ready after small fixes. Nothing on stage is wrong: timings sum, routes validate, arithmetic checks, citations are real and used within what they support, and the talk carries no stance drift on (a)–(d). The remaining work is voice on four headings, one missing Goodhart source line, one odd Source phrase, two README/index gaps, and cruft removal in `flagship-talks/`.

## 2. Blocking

| file:line | quoted text | problem | concrete fix |
| --- | --- | --- | --- |
| `artifacts/speaking-portfolio-expanded/outlines/benchmarks-40min.md:111` | `Dan Levy, Auto-Tune Your LLM Judge` linked to a placeholder URL, `supplied article.` | "supplied article" is a leftover from the writing session; it is read aloud from the script and printed in the deck notes | Replace with `danlevy.net, 11 August 2026.` |
| `artifacts/speaking-portfolio-expanded/outlines/benchmarks-40min.md:42,48` | `Goodhart described statistical regularities breaking under pressure from their use in control.` … `Source: Campbell (1979)… Strathern (1997)…` | The slide paraphrases Goodhart 1975 but the Source line cites only Campbell and Strathern; an economics-literate questioner will ask | Add `Goodhart (1975), Problems of Monetary Management: The U.K. Experience, Reserve Bank of Australia conference paper (reprinted 1981)` to the slide 3 Source line |

Neither breaks the build; both are what a back-row question would land on.

## 3. Consistency findings

- `outlines/benchmarks-40min.md`: 15 slides, timings contiguous and monotonic, sum to 40:00 (2.5+2+2.5+2.5+2.5+3+3+3.5+3.5+2.5+3+2.5+2+2.5+2.5). `build-talk.ts` sanity checks pass.
- `build-talk.ts:236-271` (30-min route): keep [1,2,3,4,5,6,7,8,9,12,14,15], times sum 30.0. Bridges on 9 (covers cut 10, 11) and 12 (covers cut 13) reference content that exists. No `trim`.
- `build-talk.ts:272-301` (15-min route): keep [1,3,4,5,6,7,8,9,15], times sum 15.0. Bridge on 1 covers cut 2; bridge on 9 names holdout (11), slices/counts (12), scorer versioning and rejection rule (14) but not the check ladder (13) or Cranfield (10). Acceptable; 13 is one sentence if wanted.
- 15-min route keeps full spoken text with no `trim`: slides 1, 3, 4 get 1:00 each against ~120-word scripts. Tight but speakable; consider `trim: { 3: [1, 2], 4: [0, 2] }` if rehearsal runs over.
- `packets/benchmarks/script-{40,30,15}min.md`, `outlines/benchmarks-{30,15}min-adaptation.md`, `reveal-talks/benchmarks.html`: byte-identical to a fresh build from the outline. No stale phrasing: grep for `ILLUSTRATIVE`, `FICTIONAL`, `Set constraints before choosing`, `Calibrate before trusting`, `compressed-specification`, `Total operating cost`, `Routing is a system`, `moral failure`, `three times` returns nothing in any of the four HTML decks (the `museum` hit is the SIGIR URL).
- `reveal-talks/benchmarks-15min.html` and `-30min.html` carry exactly the route's `data-slide`/`data-timing` sets (15: 1,3,4,5,6,7,8,9,15 at 60/60/60/90/90/120/180/150/90 s; 30: 1,2,3,4,5,6,7,8,9,12,14,15 at 120/90/150/150/150/120/180/210/210/120/150/150 s). Matches `build-talk.ts`.
- `reveal-talks/assets/benchmarks/bound.svg`: rows read `3 / 20 = 15%`, `1 − 0.05^(1/20) = 13.91%`, `About one failure in seven`, `IID sampling…`, `Incident handpicks: … no population-rate bound`. Agrees with slide 8 lines 119-126. The `alt` in all four decks is the slide heading (`Twenty green cases. About one in seven.`), so the heading renders twice (h2 + alt); harmless. Note `deckFor` drops the two `>` lines when an image is present, so the SVG is the only on-screen text for slide 8; it covers both lines.
- `bound.svg` uses the amber/#161d26 palette; `templates/engineering-head.html:3` gives benchmarks the same default palette. Consistent.
- `packets/benchmarks/visuals.md:5`: links `bound.svg`, which exists. Correct.
- `packets/benchmarks/contracts.md:9-13` and `evidence-bank.md:5-7`: 2/5 = 40%, one adjacent transition, 13.91%, 3/n = 15%, κ = 0. All agree with slides 7, 8, 9.
- `packets/benchmarks/evidence-bank.md:3`: ownership statement (Free Tier owns cost per accepted outcome; Retrieval owns IR history and pooling) matches `flagship-talks/README.md:13` and the outline's deferrals at lines 33 and 162.
- `shorts/nice-paragraph-buys-a-refund.md:3`: header says `slides 3, 5, 6, 13`; the hook (line 9) uses slide 2's fixture and the landing (line 29) is slide 12's `Nine friendly answers do not compensate for deleting the wrong account`. Header should read `slides 2, 3, 5, 6, 12, 13`.
- `shorts/run-your-judge-five-times.md:3`: header says `slide 7`; the third beat (line 17, blinding, A/B swap, position bias, self-preference) is slide 9. Header should read `slides 7 and 9`.
- `shorts/eval-suite-is-a-psych-test.md:3`, `twenty-green-tests.md:3`, `you-calibrated-a-button.md:3`: slide pointers correct (4–5, 8, 9). `shorts/README.md:14,17,19,20,45` lengths and parents match the files.
- `speaking-portfolio-expanded/README.md:44` links `[Browser and PowerPoint](../decks/README.md)` for Benchmarks, but `decks/README.md:1-9` says "These 6 PowerPoint files" and lists only Dynamic Scaling; `decks/sync-inputs.json` has no benchmarks entry although `decks/benchmarks-{15,30,40}min-{screen,handout}.pptx` exist. The index is stale for this talk (and others).
- `speaking-portfolio-expanded/README.md:29,63` use the short name `Benchmarks` in tables where line 44 uses the full title. Cosmetic.
- `flagship-talks/benchmarks-15min.pptx` and `-40min.pptx` are byte-identical to `decks/benchmarks-15min-screen.pptx` and `-40min-screen.pptx` (verified with `cmp`). `flagship-talks/benchmarks-*-outline.md` are three-line pointers. Superseded; see Cruft.
- `reviews/README.md:15,45` rows for Benchmarks are current (title, outline link, remaining evidence = green-eval story).

## 4. Correctness findings

- Zero-failure bound, slide 8. (1 − p)^20 = 0.05 ⇒ p = 1 − 0.05^(1/20) = 1 − e^(ln 0.05 / 20) = 1 − e^(−0.14979) = 0.13911. Check: 0.86089^20 = 0.0500. Rule of three: 3/20 = 0.15; check 0.85^20 = 0.0388 (conservative, as expected). 1/7 = 0.1429 sits between 13.9% and 15%, so "about one in seven" is fair. `arithmetic.ts` prints `zeroFailuresUpper95Exact: 0.13910834…, ruleOfThree: 0.15`. Agrees with slide line 120 (`3 / 20 ≈ 15%; exact 13.9%`), `bound.svg` (`13.91%`), `evidence-bank.md:7`, `twenty-green-tests.md:13,25`.
- Decision flip, slide 7. Scores 78, 79, 81, 82, 80 at pass ≥ 80 → F, F, P, P, P. Majority = pass (3/5); minority = 2/5 = 40%. Adjacent transitions: F→F, F→P, P→P, P→P = one. `arithmetic.ts` prints `verdicts: [false,false,true,true,true], majorityDisagreement: 0.4`. Agrees with slide line 101 and 105. The source post (`src/content/posts/2026-08-11--auto-tune-your-llm-judge/index.mdx:125`) says "changed its decision three times"; its own definition at line 131 ("share of repeated runs whose verdict differs from that case's majority verdict") yields 40%, so the talk's correction is right and `contracts.md:9` records it. If the post is ever edited, "three times" is the line to fix.
- Kappa, slide 9. Experts 90 pass / 10 fail; judge 100 pass. p_o = 0.90. p_e = (1.0 × 0.9) + (0.0 × 0.1) = 0.90. κ = (0.90 − 0.90)/(1 − 0.90) = 0/0.1 = 0. `arithmetic.ts` prints `kappa: 0`. Agrees with slide line 139, 143, 147 and `you-calibrated-a-button.md:13`.
- Slide 2 fixture ($0.34 / $0.28 / $0.20 per run; 71/82/90%) and slide 1 scores (89.7/88.9/84.3): invented and labelled once on slide 1 line 15. No other invented-looking numbers.
- Citations verified from the text and general knowledge; none needs an external recheck for date or venue, but the URLs have not been fetched in this audit:
  - Campbell (1979), *Assessing the impact of planned social change*, Evaluation and Program Planning 2(1); DOI 10.1016/0149-7189(79)90048-X. Use (indicator corruption under decision pressure) matches.
  - Strathern (1997), *'Improving ratings': audit in the British University system*, European Review 5(3), 305–321. Correctly credited for the "measure becomes a target" phrasing.
  - Goodhart (1975) paraphrased at line 42 with no Source entry (see Blocking).
  - Cronbach and Meehl (1955), Psychological Bulletin 52(4). Messick (1990), ETS RR-90-11 *Validity of Test Interpretation and Use*. Raji, Denton, Bender, Hanna, Paullada (2021), NeurIPS Datasets and Benchmarks. Uses match.
  - Hanley and Lippman-Hand (1983), JAMA 249(13), 1743–1745. Card, Henderson, Khandelwal, Jia, Mahowald, Jurafsky (2020), EMNLP main.745. Uses match; slide states the IID assumption the paper requires.
  - Cohen (1960), EPM 20(1). Feinstein and Cicchetti (1990), J Clin Epidemiol 43(6). Slide correctly flags prevalence sensitivity instead of quoting Landis–Koch thresholds.
  - arXiv 2406.07791 (Shi et al., position bias in pairwise LLM judging) and 2410.21819 (Wataoka et al., self-preference bias). Cited by title/URL only at line 149; add author-year for the deck notes if desired.
  - Cleverdon, Mills, Keen (1966) Cranfield report; TREC 1992; Voorhees (2000) IP&M 36(5). Slide's claim ("rankings stable under changed judgments in the experiments she studied") is scoped correctly.
  - Oren, Meister, Chatterji, Ladhak, Hashimoto (2024) ICLR; Dwork et al. (2015) Science 349(6248), 636–638. Uses match.
- No vendor, product, price, or dated-announcement claims. Nothing to recheck before delivery.

## 5. Direction alignment

- (a) everything-assistant, (b) Knight & Leveson, (c) council/barrel, (d) spend-where-axioms-said-not-to: none of these topics appears in this talk; no drift possible and none found. Grep of outline and decks for `Knight`, `vote`, `council`, `barrel`, `don't build` returns nothing.
- Deferrals hold: line 33 sends cost per success to Cry Me a Free Tier (`free-tier-40min.md:187` owns `Cost per accepted outcome = total spend ÷ accepted jobs`); line 162 sends IR history and pooling to Retrieval (`retrieval-40min.md:132-182` owns Cranfield, pooling, Voorhees 2000, Zobel 1998).
- Mild duplicate: slide 10 paragraph 2 (Voorhees 2000, stable rankings under changed judgments) is retrieval slide 10's headline claim (`retrieval-40min.md:173-176`). Kept to one sentence here and explicitly handed off; acceptable.
- Old-stance leftovers from the pre-rewrite deck (public benchmarks "help with an initial shortlist", "scope, not moral failure", cost-per-success slide, routing slide) are gone from outline and all four decks.

## 6. Voice

Hedge count: one scope statement on slide 1 (line 15). Stage-direction and Source lines carry the fixture caveats (lines 109, 111), which is where they belong. No spoken-line hedges beyond that. Story slot on slide 4 is explicit and unfilled.

Headings that read as explainers or compliance-deck imperatives, with sharper lines available (skill: 2–6 words; hijack, stinger, verdict, or reuse a named technique; shorts already carry approved titles for four of these):

1. `outlines/benchmarks-40min.md:5` — *A leaderboard, and the question it isn't answering* → **Tuxedo of Benchmarks** (the line is already on the slide at line 13).
2. `:50` — *Your eval suite is a measuring instrument* → the "Your X Is a Y" formula the skill rejects. **Nobody Calibrated the Thermometer** or **Instrument, Unvalidated**.
3. `:95` — *Run it five times* → **Run the Judges** (the short's approved title, `shorts/run-your-judge-five-times.md:1`).
4. `:113` — *Twenty green cases. About one in seven.* → **Twenty for Twenty, One in Seven** (`shorts/twenty-green-tests.md:1`).
5. `:134` — *Your grader is an instrument too* → **Agreeable to a Fault (κ = 0)** (`shorts/you-calibrated-a-button.md:1`).
6. `:166` — *Contamination and the reusable holdout* → **holdout.json Is Not Held Out** (the slide's own last line, 177).
7. `:194` — *Use the cheapest check that can honestly fail* → **The Cheapest Honest No**.
8. `:207` — *Make it a release gate* → **Write the Rejection Rule First** (the slide's own second visible line, 212).

Also: line 111 `supplied article` (Blocking). Line 233 landing (`The suite is an instrument. Test the instrument. Then use it to make a decision.`) is three sentences; the skill wants one short line then silence. Suggest ending on `Test the instrument.` and adding `Stage direction: Stop talking.`

## 7. Cruft

| path | action | reason |
| --- | --- | --- |
| `artifacts/flagship-talks/benchmarks-40min-outline.md` | DROP | Three-line pointer to the canonical outline; `flagship-talks/README.md` already carries the same pointer. Superseded by `speaking-portfolio-expanded/outlines/benchmarks-40min.md`. |
| `artifacts/flagship-talks/benchmarks-15min-outline.md` | DROP | Same; points at the generated 15-min adaptation. |
| `artifacts/flagship-talks/benchmarks-40min.pptx` | DROP | Byte-identical to `decks/benchmarks-40min-screen.pptx` (`cmp` clean). A duplicate binary that will drift on the next `sync-talks.ts` unless re-copied. If an external link depends on the filename, replace with a one-line pointer in the README instead. |
| `artifacts/flagship-talks/benchmarks-15min.pptx` | DROP | Byte-identical to `decks/benchmarks-15min-screen.pptx`. Same reasoning. No 30-min alias exists, so the "synchronized aliases" claim in `flagship-talks/README.md:3` is already partial. |
| `artifacts/flagship-talks/README.md` (Benchmarks row) | KEEP | Only surviving compatibility pointer; row is accurate (15 slides, correct links, correct ownership sentence at line 13). |
| `artifacts/speaking-portfolio-expanded/reviews/benchmarks-review.md` | KEEP | `reviews/README.md` indexes it as the historical spec. Its §4 arc was adopted slide-for-slide (15 slides, same minutes, 30-min cut of 10/11/13 with slide 6 at 2:00), §2 items a–k are all resolved, and its "three times" flip claim (§2k, §4 slide 7) is corrected in `contracts.md:9`. Not adopted, by choice: Recht 2019, Dynabench/Kiela, replication-crisis analogy, Krippendorff, Zobel (moved to Retrieval), verbatim Goodhart quote (paraphrased instead). Nothing in it is still actionable. |
| `artifacts/speaking-portfolio-expanded/packets/benchmarks/formats.md` | MERGE | Entirely a generated editions table identical to `packet.md:5-9`; unlike other talks' `formats.md` (50–66 lines of hand-written format notes) it has no hand-written content. Fold the generated block into `packet.md` or leave `formats.md` as the generated-only file and drop the duplicate table from `packet.md`. |
| `artifacts/speaking-portfolio-expanded/packets/benchmarks/evidence-bank.md:11` | MERGE | Paragraph about what "the review requested" is review history, not evidence. Move the substantive half ("attributed paraphrases; avoids claiming every optimized benchmark has ceased to measure") into the slide 3 Source line and drop the reference to the review. |
| `artifacts/speaking-portfolio-expanded/decks/README.md` | KEEP (fix) | Not cruft but stale: lists one talk and "6 files" while the directory holds Benchmarks (and others). Portfolio-wide fix, flagged here because `README.md:44` routes Benchmarks readers to it. |
| `artifacts/speaking-portfolio-expanded/packets/benchmarks/arithmetic.ts` | KEEP | Referenced from slide 8 stage direction and `contracts.md:9`; output agrees with slides. |
| `artifacts/reveal-talks/assets/benchmarks/bound.svg` | KEEP | Referenced from slide 8 and `visuals.md`; content current. |

## 8. Proposed edit list

1. `outlines/benchmarks-40min.md:111` — replace `supplied article` with `danlevy.net, 11 August 2026`.
2. `outlines/benchmarks-40min.md:48` — prepend `Goodhart (1975), Problems of Monetary Management: The U.K. Experience, Reserve Bank of Australia (reprinted 1981).` to the slide 3 Source line.
3. `shorts/run-your-judge-five-times.md:3` — change `slide 7` to `slides 7 and 9`.
4. `shorts/nice-paragraph-buys-a-refund.md:3` — change `slides 3, 5, 6, 13` to `slides 2, 3, 5, 6, 12, 13`.
5. `outlines/benchmarks-40min.md:233` — end on `Test the instrument.` and add `Stage direction: Stop talking.`
6. `outlines/benchmarks-40min.md:149` — add author-year to the two arXiv cites: `Shi et al. (2024)` for 2406.07791, `Wataoka et al. (2024)` for 2410.21819.
7. `outlines/benchmarks-40min.md:5,50,95,113,134,166,194,207` — retitle the eight headings per §6 (four of them reuse approved short titles).
8. `packets/benchmarks/evidence-bank.md:11` — drop the "review requested" sentence; keep the paraphrase note as a plain statement.
9. `packets/benchmarks/packet.md:5-9` — remove the editions table duplicated from `formats.md`, or delete `formats.md` and keep the table in `packet.md`.
10. `build-talk.ts:296-299` — add a 13-word clause to the 15-min bridge on slide 9 covering slide 13 (`code for state and schema, graders for language, people for disputed policy`).
11. `artifacts/flagship-talks/` — delete `benchmarks-40min-outline.md`, `benchmarks-15min-outline.md`, `benchmarks-40min.pptx`, `benchmarks-15min.pptx`; keep the README row.
12. `decks/README.md` and `decks/sync-inputs.json` — regenerate via `sync-talks.ts benchmarks` (or fix the generator) so the Benchmarks PowerPoints are indexed.
13. After 1–7: run `bun artifacts/speaking-portfolio-expanded/sync-talks.ts benchmarks`, then `bun artifacts/speaking-portfolio-expanded/packets/benchmarks/arithmetic.ts` to reconfirm, then update the four benchmark shorts if any retitled heading is quoted in them (none currently is).

## Fixes applied 2026-09-06

### 1. Changes

- `outlines/benchmarks-40min.md:111` — Source line now reads `danlevy.net, 11 August 2026`; the "supplied article" leftover is gone.
- `outlines/benchmarks-40min.md:48` — slide 3 Source line now opens with `Goodhart (1975), Problems of Monetary Management: The U.K. Experience, Reserve Bank of Australia conference paper (reprinted 1981)`, and the closing sentence absorbs the paraphrase boundary ("attributed paraphrases, not claims that every optimized benchmark has stopped measuring anything").
- `outlines/benchmarks-40min.md` — eight headings retitled per §6: 1 *Tuxedo of Benchmarks*; 4 *Your Eval Suite Needs Therapy* (short #5's approved title, replacing the "Your X Is a Y" form the voice skill rejects); 7 *Run the Judges*; 8 *Twenty for Twenty, One in Seven* (the image `alt` follows the heading); 9 *Agreeable to a Fault (κ = 0)* (short #8's approved title, the second "Your X Is a Y"); 11 *holdout.json Is Not Held Out*; 13 *The Cheapest Honest No*; 14 *Write the Rejection Rule First*. Slides 5, 15 and the rest keep their headings. Slide numbers, timings and route keeps are untouched: 15 slides, contiguous, sum 40:00.
- `outlines/benchmarks-40min.md:233` — landing ends on `The suite is an instrument. Test the instrument.` plus `Stage direction: Stop talking.`
- `outlines/benchmarks-40min.md:149` — arXiv cites now carry author-year: Shi et al. (2024) for 2406.07791, Wataoka et al. (2024) for 2410.21819.
- `shorts/run-your-judge-five-times.md:3` — parent pointer now `slides 7 and 9`.
- `shorts/nice-paragraph-buys-a-refund.md:3` — parent pointer now `slides 2, 3, 5, 6, 12, 13`.
- `packets/benchmarks/evidence-bank.md` — the "the review requested" sentence is gone; the substance survives as a plain claim-boundary statement naming Goodhart/Campbell/Strathern.
- `packets/benchmarks/packet.md` — the editions table duplicated from `formats.md` is replaced by a pointer to `formats.md` (which `sync-talks.ts` regenerates) plus an index of the hand-written packet files. `packet.md` is only written when absent, so its copy of the table was the one that could silently drift.
- `arithmetic.ts` re-run after the edits: `majorityDisagreement: 0.4`, `zeroFailuresUpper95Exact: 0.13910834…`, `ruleOfThree: 0.15`, `kappa: 0`. Unchanged, still matches slides 7, 8, 9 and `bound.svg`.

### 2. Skipped

- Edit 10 (15-min bridge clause) — requires `build-talk.ts`; written as an instruction below instead.
- Edit 11 (`artifacts/flagship-talks/` deletions) — the directory was deleted portfolio-wide earlier today. Nothing to do.
- Edit 12 (`decks/README.md`, `decks/sync-inputs.json`) — out of bounds for a per-talk pass and portfolio-wide in nature; leaving it to the central sync. Flagged again here so it is not lost.
- Edit 13 (`sync-talks.ts` run) — the caller runs one full sync.
- Filling `formats.md` with hand-written format notes (§7 MERGE row's premise) — the row claims other talks carry 50–66 lines of notes; `judgment` and `retrieval` are generated-only at 12 lines, exactly like `benchmarks`, so this is a portfolio gap, not a benchmarks defect. Writing a lightning script and workshop plan is new authoring, not a fix.
- **Skitka 1999 qualification** — requested by the caller, but Skitka, Mosier and Burdick (1999) is not cited anywhere in this talk. It appears in `adaptive-systems`, `evidence-learning`, `judgment` and the shorts `what-happened-to-sarah.md` / `test-that-loves-the-bug.md`. Editing those is out of bounds here; the fix belongs to those talks' passes. For the record, the characterization to qualify is "people given a highly but imperfectly reliable aid did worse than people given no aid at all" — that holds for the trials in which the automated aid was wrong (errors of omission and commission on the non-normal events), not across the whole task, and it was measured in a flight simulator. `packets/adaptive-systems/evidence-bank.md:27` and `packets/evidence-learning/evidence-bank.md:63` already carry the simulator caveat but not the wrong-aid-trials scoping.

### 3. Route config changes for the caller

```
slug: benchmarks
route: 15
field: bridges["9"]
old: "Bridge: separate held-out evidence, report slices and counts, version the scorer, and set the rejection rule before viewing the candidate."
new: "Bridge: separate held-out evidence, report slices and counts, version the scorer, set the rejection rule before viewing the candidate, and use code for state and schema, graders for language, people for disputed policy."
reason: the 15-min bridge covered cut slides 11, 12 and 14 but not the check ladder (13).
times: unchanged. 15-min keep [1,3,4,5,6,7,8,9,15] at [1,1,1,1.5,1.5,2,3,2.5,1.5] = 15.0. 30-min keep [1,2,3,4,5,6,7,8,9,12,14,15] at [2,1.5,2.5,2.5,2.5,2,3,3.5,3.5,2,2.5,2.5] = 30.0.
```

### 4. Morning review (`reviews/benchmarks-review.md`)

Verified rather than assumed. Its §4 arc is adopted slide-for-slide: 15 slides, identical minute allocation (2.5/2/2.5/2.5/2.5/3/3/3.5/3.5/2.5/3/2.5/2/2.5/2.5), the same merges and cuts, the 30-minute route hiding 10/11/13. Its §2 roast items are all closed — real arithmetic now carries the fixture (a), the "scope, not moral failure" apology and the shortlist concession are gone (b), the orphaned compressed-specification note is gone (c), "One number is a comforting fiction" is the slide 5 heading (d), four audience moments exist at slides 1, 6/7, 8 and 14 (e), the peak is slides 8–9 (f), cost-per-success and routing are handed off (g), notes are spoken text (h), one disclaimer on slide 1 (i), the 30-minute route is rebuilt (j), and the "three times" error is corrected to 40% majority disagreement with one adjacent transition (k). §6's checks are all reflected on the slides (IID assumption stated, kappa prevalence flagged, Strathern credited).

Adopted from it today: the one genuinely open item, the Goodhart (1975) citation from §3 and §6 — the paraphrase was on the slide with no source entry behind it.

Skipped, and why: Recht et al. 2019 (§3, and §6 says verify the figures first — no room and no verified numbers); Dynabench/Kiela saturation (§3; §6 downgrades it to an illustration, and the contamination slide already carries the load); Krippendorff's alpha (a second coefficient on a slide that already argues against threshold worship); Zobel 1998 and the pooling material (owned by Retrieval by design); the replication-crisis analogy (§3 itself calls it glib-prone); verbatim Goodhart/Campbell quotations (attributed paraphrase is the deliberate choice, now recorded in the evidence bank). None of these contradicts tonight's direction; they are simply not improvements at this length.
