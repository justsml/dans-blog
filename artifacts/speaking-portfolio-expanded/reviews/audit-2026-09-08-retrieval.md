# Audit: retrieval — *Three Search Methods in a Fundable Trenchcoat* (2026-09-08)

Read against `.claude/skills/dans-voice/SKILL.md`, `talks/retrieval/index.md` (canonical), all three scripts, both adaptations, `bullets.md`, `packet.md`, `formats.md`, `CFP.md`, `evidence-bank.md`, `contracts.md`, `visuals.md`, the three retrieval shorts, `public/decks/retrieval/index.html`, both prior reviews, the 6 September roll-up, and a repo-wide grep for the old title. Every citation was re-verified against Crossref and the publishers' own pages.

## Verdict

**Deliverable at 40 and 30 minutes after six fixes; the 15-minute route has a broken callback and should not be given as written.** The scholarship is now the strongest in the portfolio — I checked all ten citations against Crossref and publisher metadata and every author, year, volume, issue and page range is exactly right, and every attributed claim is what the source says. The rename is *not* complete: seven files in `artifacts/speaking-opportunity-research/` still carry *From RAGs to Retrievals*. The deck is a genuine achievement and the right template for the other eight — and it has quietly become a second source of truth with better lines, one fabricated stage direction, and a slide 8 that answers the question it is asking. The peak is still not an exercise.

## Status vs prior audits

| Prior finding | Source | Status |
| --- | --- | --- |
| Title is the skill's canonical reject, 85 hits / 22 files | `audit-retrieval.md:13` | **FIXED in the talk**, **STILL OPEN portfolio-wide** — see rename table |
| 15-min route says 45s and 60s for the same exercise | `audit-retrieval.md:39`, `AUDIT-2026-09-06.md:29` | **FIXED** — `script-15min.md:3` and `adaptation-15min.md:16` both now read "Pairs get 60 seconds" |
| Unverified Kendall's τ > 0.99 on a stage | `audit-retrieval.md:53` | **FIXED by removal** — and now **over-corrected**; τ > 0.99 is in the published abstract (see citations) |
| "Sparck" vs "Spärck" | `audit-retrieval.md:45` | **FIXED** — "Spärck" everywhere |
| Slide headings 4/10/12 were colon-explainers | `audit-retrieval.md:72-74` | **FIXED** |
| Hedge pile on slide 14 | `audit-retrieval.md:75` | **FIXED** — one line survives and it is a punchline |
| `pooling.ts` reproduces slide 10 | `AUDIT-2026-09-06.md:36` | **REGRESSED** — the file no longer exists but the deck and CFP still promise it |
| "Stop translating, start citing the discipline being re-derived" | `retrieval-review.md:129` | **HALF-ADOPTED** — the citations landed, the *argument* structure did not (Part B.1) |
| Benchmarks/Retrieval topic boundary | `README.md:121` | **NEW DRIFT** — deck slide 11 now runs a small-sample agreement fixture (Part B.9) |

## Rename completeness

Every straggler carrying *From RAGs to Retrievals* outside the reviews directory (reviews legitimately record it as history):

| file:line | text | verdict |
| --- | --- | --- |
| `artifacts/speaking-opportunity-research/README.md:19` | `- [From RAGs to Retrievals: Learn the New Engineering Speak](retrieval.md)` | STRAGGLER |
| `artifacts/speaking-opportunity-research/retrieval.md:1` | `# Deep research prompt: From RAGs to Retrievals: Learn the New Engineering Speak` | STRAGGLER |
| `artifacts/speaking-opportunity-research/retrieval.md:8` | `- Title: From RAGs to Retrievals: Learn the New Engineering Speak` | STRAGGLER — this is the title fed to the opportunity matcher |
| `artifacts/speaking-opportunity-research/build_composite_rankings.py:50` | `"retrieval": "From RAGs to Retrievals",` | STRAGGLER — regenerates the stale title into every ranking artifact |
| `artifacts/speaking-opportunity-research/results/retrieval/research-notes.md:5` | `Talk: \`retrieval\` — *From RAGs to Retrievals: Learn the New Engineering Speak*` | STRAGGLER |
| `artifacts/speaking-opportunity-research/results/consolidated/report.md:118` | `\| From RAGs to Retrievals \| 28 \| [Open packet](../retrieval/research-notes.md) \|` | STRAGGLER |
| `results/consolidated/{composite-ranking.json,composite-ranking.csv,ranked-workbook-data.json}` | 14 hits each | derived from `build_composite_rankings.py:50`; fix the source, re-run |
| `results/consolidated/talk_matches.csv`, `results/retrieval/talk_matches.csv` | 7 hits each | derived |
| `results/consolidated/speaking-opportunity-rankings.xlsx.inspect.ndjson`, `portfolio-top-20.csv` | 3 + 1 | derived |

Clean: all nine `talks/retrieval/*` files, `README.md`, `talks/README.md`, `bullets-index.md`, `shorts/README.md`, the three retrieval shorts, and `public/decks/retrieval/index.html`. *Your Eval Suite Has a Grandfather* survives only in the two review files, correctly, as history.

This matters because `retrieval.md:8` is the title a CFP-matching pipeline reads, and `report.md:118` is a live index row. A finalist deadline is recorded in `results/consolidated/talk_matches.csv:19` ("FINALIST; September 9 deadline") under the dead title.

## Citations

Every source re-checked against Crossref publisher metadata (`api.crossref.org`) and the publishers' own abstracts.

| Claim on the slide | Source as written | What the source actually supports | Verdict |
| --- | --- | --- | --- |
| Term specificity, 1972; rare terms carry more evidence (`index.md:42`) | Spärck Jones (1972), J. Doc. 28(1), 11–21 | Exact. DOI 10.1108/eb026526; ERIC EJ056432 confirms 28(1) 11–21, March 1972 | ✅ |
| Vector space model, 1975 (`index.md:59`) | Salton, Wong, Yang, CACM 18(11), 613–620 | Crossref: exact title, three authors in that order, Nov 1975, 18(11), 613–620 | ✅ |
| LSA, 1990 (`index.md:59`) | Deerwester, Dumais, Furnas, Landauer, Harshman, JASIS 41(6), 391–407 | Crossref: exact, five authors in that order, Sept 1990 | ✅ |
| Vocabulary problem, 1987 (`index.md:74`) | Furnas, Landauer, Gomez, Dumais, CACM 30(11), 964–971 | Crossref: exact, four authors in that order | ✅ |
| Passage retrieval, 1993 (`index.md:91`) | Salton, Allan, Buckley, SIGIR, 49–58 | Crossref: exact, SIGIR '93, 49–58 | ✅ |
| "BM25 a robust baseline… reranking and late-interaction best on average… at higher computational cost" (`index.md:106`) | Thakur et al. (2021), BEIR, NeurIPS D&B | Camera-ready abstract: "BM25 is a robust baseline and re-ranking and late-interaction-based models on average achieve the best zero-shot performances, however, at high computational costs." Near-verbatim | ✅ |
| Cranfield report dated 1966, Cleverdon/Mills/Keen (`index.md:141`) | *Factors Determining the Performance of Indexing Systems*, Vol. I Design | Cranfield DSpace + NIST IRLIB confirm Cleverdon, Mills, Keen for Volume 1; Volume 2 is Cleverdon and Keen. Talk cites Volume 1 only | ✅ |
| Zobel investigated reliability with incomplete judgments (`index.md:161`) | Zobel (1998), SIGIR, 307–314 | Crossref: exact, single author, Aug 1998 | ✅ |
| "In a 2022 recheck, Voorhees, Soboroff, and Lin added judgments to TREC-8… The ordering barely moved." (`index.md:161`) | arXiv 2201.11086 | Abstract: new pools judged for **the TREC-8 ad hoc collection**, five new runs (three transformer, two BM25), "the ranking of all runs… are almost identical, with Kendall's tau correlations greater than 0.99." Fully supported, **and the number is publishable** | ✅ (see SHARPEN 1) |
| Voorhees varied judgments; comparative results stable (`index.md:176`) | Voorhees (2000), IP&M 36(5), 697–716 | Crossref: exact, DOI 10.1016/s0306-4573(00)00010-8, Sept 2000. (There is also a 1998 SIGIR precursor at 315–323; the talk cites the journal version, which is the right one) | ✅ |
| R1 at DEC, journal paper 1982 (`index.md:219`) | McDermott (1982), AI 19(1), 39–88 | Crossref: exact, Sept 1982 | ✅ |
| **Deck only** — "1966: 1,400 aeronautics abstracts" (`index.html:324`) | uncited on the slide | Cranfield 2 collection is 1,400 documents (1,398 abstracts in the distributed form) | ✅ but uncited |
| **Deck only** — "1966: 221 questions from working scientists" (`index.html:325`) | uncited on the slide | 221 is subset 3 of the Cranfield 2 questions searched against the 1400 collection; the number almost every IR person will say aloud is **225**, and the appendices list 279 total | ⚠️ defensible, will be challenged, unrecorded anywhere in the talk files |
| **Deck only** — "1966: 33 indexing languages" (`index.html:327`) | uncited on the slide | Standard figure for Cranfield 2's index-language variants | ✅ but uncited |
| **Deck only** — "BM25, 1994" (`index.html:259`) | uncited | Okapi BM25 dates to TREC-3, 1994 | ✅ but uncited |
| **Deck only** — "BEIR, 2021, eighteen datasets" (`index.html:265`) | Thakur et al. | Camera-ready is 18 datasets (the preprint said 17) | ✅ correct edition |

No source in the talk asserts more than its paper supports. The link targets resolve (ACM/Elsevier/OpenReview return 403 to `curl` — bot-blocking, not rot).

## BLOCKING

**1. The deck tells the presenter to run a script that does not exist.**
`public/decks/retrieval/index.html:395`:
> `Stage direction: Run <code>bun artifacts/speaking-portfolio-expanded/talks/retrieval/pooling.ts</code> after revealing F.`

`find . -name pooling.ts` returns nothing anywhere in the repo. The canonical outline says something different — `index.md:165`: "After revealing F, walk precision@2 on the board." This is leftover from the generated-deck era, it contradicts canon, and it violates the standing rule against stage kits and scaffolding around talks.
**Fix:** replace the deck note with `index.md:165` verbatim.

**2. The CFP promises a program committee a script that does not exist.**
`CFP.md:27`: "The pooling exercise runs offline from a synthetic fixture; **the accompanying script is in the packet**." `packet.md:3` lists three presenter scripts and nothing else. This is a reviewer-facing false claim.
**Fix:** delete the clause after the semicolon, or replace with "the synthetic fixture is in the packet."

**3. The deck spoils the peak on slide 8.**
`index.html:289` prints card B as:
> `<div class="t">Acme addendum, signed</div><div class="q">"fee waiver per Schedule R"</div>`

Canon says B refers to a schedule *without saying what it contains* — `index.md:119` "B · signed Acme addendum; 'see Schedule R'"; `contracts.md:8` "Acme's cancellation and fee terms are governed by Schedule R." The outline's own stage direction is explicit — `index.md:130`: "Do not reveal the missing schedule until slide 10." The deck reveals that a fee waiver exists twelve minutes early, which is the entire slide-10 punchline.
**Fix:** `index.html:289` → `"cancellation and fees per Schedule R"`.

**4. The deck answers the exercise it is posing.**
`index.html:288-292` stamps every card before the room judges anything: A `stamp ok` "current", B `stamp ok` "signed", C `stamp no` "expired", D `stamp no` "other customer", E `stamp no` "a guess" — green and red, rendered on load, not on a fragment. The slide asks "Judge these five documents. Sixty seconds, in pairs." with the verdicts already colour-coded. The room cannot get it wrong, which means it is not an exercise.
**Fix:** move the stamps behind `class="fragment" data-fragment-index="1"` alongside the four-criteria row that already reveals at index 1.

**5. The 15-minute route's landing refers to a beat it cut.**
`script-15min.md:131` closes with:
> "Three search methods in a fundable trenchcoat… Lexical, dense, hybrid: we inherited all three."

Lexical/dense/hybrid are named exactly once, on slide 7 (`index.md:110`), and the 15-minute route drops slide 7 (`adaptation-15min.md:3` keeps 1, 2, 8, 9, 10, 11, 12, 15). In the lightning route the title's own joke has no setup and the closing callback points at nothing. This is precisely `SKILL.md:74`.
**Fix:** move "Lexical, dense, hybrid. Those are the three search methods in the trenchcoat" from slide 7 into slide 2, in the canonical outline, so every route carries it. It belongs there anyway — see Part B.1.

**6. Rename incomplete in opportunity research.** Seven hand-written files plus their derived CSV/JSON, table above. `build_composite_rankings.py:50` is the generator; fixing it and re-running clears the derived files.

**7. The 30-minute route puts slide 6 at 92 wpm.** `script-30min.md:84` gives slide 6 the window 08:30–10:00 (1.5 min) for 138 spoken words = **92.0 wpm**, above the 80 ceiling in `SKILL.md:72` and the densest slide in the portfolio. Cause is the classic one: the chunk-size joke was added to the outline on 6 September (`audit-retrieval.md:146`) and the 30-minute window was never retimed. Slide 7 in the same route is 76 wpm, at the edge.
**Fix:** give slide 6 two minutes in the 30-minute route and take 30 seconds from slide 10's four minutes, which is the one slide with slack because most of its time is the reveal beat.

## Pacing

Spoken paragraphs only; `On screen`, `>` lines, `Source`, `Story`, `Bridge` and `Delivery` excluded.

| Route | All slides | Excluding 8 and 10 (interaction) | Verdict |
| --- | --- | --- | --- |
| 40 min | 1,696 w / 40.0 = **42.4 wpm** | 1,410 / 32.5 = **43.4** | in band, at the calm end — correct for 40 |
| 30 min | 1,596 w / 30.0 = **53.2** | 1,310 / 23.0 = **57.0** | in band overall; **slide 6 = 92, slide 7 = 76** |
| 15 min | 929 w / 15.0 = **61.9** | 643 / 10.0 = **64.3** | in band; slide 1 = 76, slide 15 = 75, both acceptable for lightning |

Exercise timing in the 15-minute route is now stated once and consistently: `adaptation-15min.md:16` and `script-15min.md:3` both say 60 seconds, matching `index.md:124` and `index.md:130`.

## Arithmetic

- P@2, old run: top-2 `{B, A}` ∩ judged-relevant `{A, B}` = 2/2 = **1.0** ✅
- P@2, new run, unjudged-as-nonrelevant: `{B, F}` ∩ `{A, B}` = 1/2 = **0.5** ✅
- P@2, new run, after judging F: `{B, F}` ∩ `{A, B, F}` = 2/2 = **1.0** ✅
- 1972 → 2026 = **54** (`index.md:40`, `:46`) ✅ · 1966 → 2026 = **60** (`index.md:137`, `:238`) ✅
- Deck slide 2 timeline geometry (`index.html:97`, "axis 1960..2030 → x 60..1220 : 16.57px/yr"): every one of the seven dots lands on its year — 1966→159.4 (cx 159), 1972→258.9 (259), 1975→308.6 (309), 1987→507.4 (507), 1993→606.8 (607), 1998→689.7 (690), 2000→722.9 (723). The "you, 2026" box centres on 2026.3. ✅
- Deck slide 11 agreement fixture (`index.html:407-411`): assessor rows differ at positions 2, 5, 8, 11 = 4 of 12, and the four red brackets sit at exactly those columns. "One in three labels moved" = 4/12 ✅

The result is reproducible from the text alone: `index.md:159` states both top-2 lists, the judged set, and the rule for unjudged. No script is required, which is why BLOCKING 1 matters — the deck asks for one anyway.

## Voice: hedges, jokes, Story slots

**Scope disclaimers: one, deliberately on slide 2.** `index.md:27` — "The claim is that we skipped useful evaluation work, not that IR researchers solved every problem in RAG." The slide-2 rather than slide-1 placement is a recorded decision (`evidence-bank.md:23`: "Slide 1 is a cold open… Do not add a second one to slide 1") and is right.

Residual hedges beyond it: `index.md:108` "That is a dated experimental result, not a claim that BM25 wins in 2026" and `index.md:112` "This slide reports the 2021 experiment" — two statements of the same limit on one slide. Cut the source-line one. `index.md:161` "The risk is real; universal failure is not" is load-bearing and stays.

**Jokes: eight or nine, well distributed except after the peak.** `:16` "we called it a vector database and raised a round"; `:46` "We have had time to put her name on the slide"; slide 4's title *Vector Database, 1975*; `:91` "an open research question in 1993 and a forum thread in 2024. One of those had a control group"; `:145` "a test collection with a flattering filename" and "the next slide is about you"; slide 10's title *Fool's Golden Dataset*; `:163` "We called our first results golden"; `:208` "A useful citation does not turn a document into a supervisor"; `:223` "We do not need a grand theory of why expert systems declined to ask who updates Schedule R." Slides 11 and 12 — 27:00 to 33:00, six minutes immediately after the peak — contain none. That is where a room's attention goes.

**Story slots:** exactly one, `index.md:33`, named and unfilled. Correct. No invented retrieval result is presented as Dan's own; the fixture is labelled synthetic in `contracts.md:3` and `:21`, and every deck-only number carries a "synthetic" or "illustrative" note (`index.html:141`, `:426`).

**A stage note has leaked into the talk track.** `index.md:128` ends the spoken paragraph with "Do not manufacture disagreement for the punchline." That is an instruction to Dan, sitting in the sentence he says to the room. It is inside the spoken block in all three scripts and in the deck's notes as prose. Move it to the `Stage direction` line.

## SHARPEN

1. **Restore τ > 0.99.** `evidence-bank.md:21` holds it back: "Do not quote a Kendall's tau figure on stage until the exact value has been read off arXiv 2201.11086 and confirmed to refer to the TREC-8 ad hoc runs." I have now done exactly that: the published abstract says "the TREC-8 ad hoc collection" and "Kendall's tau correlations greater than 0.99." The condition is satisfied. The talk's generous half currently lands as an adjective — `index.md:161` "The ordering barely moved" — where it could land as a number the room can check. This is the second hallway number and the talk gave it away.
2. **Deck-vs-outline heading drift, three slides.** Deck `:92` "You are joining an old field late." vs outline "The bet, and the eight words"; deck `:189` "The vocabulary problem, both ways." vs "The vocabulary problem"; deck `:503` "Who updates Schedule R?" vs "The old cost of keeping knowledge current". In all three the deck is better — especially `:503`, which ties a 1982 citation to the talk's own fixture in four words. Back-port them to `index.md`; the outline is canonical and is currently the weaker document.
3. **Deck slide 11 invents a fixture the outline does not have,** and it is small-sample inference — Benchmarks' territory (`README.md:121`). `index.html:412` "One in three labels moved" from twelve documents. Twelve. A benchmarks-literate attendee, or Dan on the other talk, will point out that 4/12 supports almost no inference. Either drop the ratio and keep the picture, or add the fixture to `index.md` and `evidence-bank.md` with an explicit "illustrative, n=12, do not infer a rate" line.
4. **Deck slide 2 dates "pooling" to 1998** (`index.html:109`). Pooling is the TREC method from 1992 — the outline says so itself (`index.md:167`, "NIST TREC overview, started 1992"). 1998 is Zobel's critique of it. The timeline labels the technique with the date of its audit. Move the dot to 1992 and label it "TREC pooling", or relabel the 1998 dot "pooling, audited."
5. **The talk's rubric is not the rubric it claims.** `contracts.md:19`: "For this toy topical-relevance rubric, A and B are relevant, C/D/E are not." C is *expired Acme cancellation terms* — under any topical rubric TREC would recognise, C is relevant to a topic about Acme cancellation. The fixture is scoring applicability, not topicality, which is the exact conflation slide 12 accuses the industry of. See Part B.6.
6. **Deck-only fixture text drifts from `contracts.md`.** Deck E (`:292`) "probably immediate? ask legal" vs `contracts.md:11` "author has not checked the executed agreement"; deck D (`:291`) "Globex terms, current — immediate cancellation, no fee" vs `contracts.md:10` "A fee waiver for that customer." Pick one wording; the fixture is the thing the room reasons over.
7. **`formats.md` is empty (1 byte) but `README.md:44` links it** as retrieval's editions index. Same for benchmarks and judgment — portfolio-wide, but retrieval's row advertises it.
8. **`index.md:136` embeds `history.svg` on slide 9; the deck does not use it,** having drawn a far better Cranfield-loop diagram inline (`index.html:309-338`). `visuals.md:3` already describes the SVGs as leftovers from "the retired generated decks." Either delete the embed or replace it with a still of the deck slide.
9. **Spärck Jones is the only citation without a paper link** (`index.md:50` points at an archive index page). Use DOI 10.1108/eb026526, or the free PDF at `staff.city.ac.uk/~sbrp622/idfpapers/ksj_orig.pdf`. Naming the woman is the whole point of the slide; give the room a click.
10. **Landing line drifts between screen and mouth.** On screen `index.md:232` "Find the documents your eval never judged."; spoken `index.md:238` "Go find the documents your eval set never judged." Make them identical.

## NIT

- `index.html:376` declares `<pattern id="hatch">` outside `<defs>` and *after* the `use` at `:373`. Renders in browsers; fragile in PDF export.
- Deck has no per-route hiding mechanism, though `adaptation-15min.md:3` says "Hide the others in presenter preparation." Nothing in `index.html` supports it.
- `index.md:3` "Sources checked 6 September 2026" — they were checked again today and all hold.

---

# Part B — the ceiling

## 1. The better talk inside this one

The new premise is real and it is stated once, on `index.md:14`: "knowing what the nouns mean does not tell us whether the retrieval works. The useful question is what the people who studied it already found out." Then the talk does not build on it for twelve minutes.

Slides 3 through 7 are a chronological tour: 1972, 1975/1990, 1987, 1993, 2021. Each has the identical shape — *this was published in year Y by person Z, here is why it still matters*. That is a corrected-attribution lecture. It is a better lecture than the glossary it replaced, but it is still explanatory where `retrieval-review.md:10` said it should be argumentative. The room reaches 16:30 — **41% of the talk** — before it is asked to do anything, and 23:00 before the argument pays.

The 20% reorder, and the evidence that it works is already in the folder: **the 15-minute route is the better 40-minute talk.** `adaptation-15min.md:3` keeps 1, 2, 8, 9, 10, 11, 12, 15 — sentence, bet, exercise, Cranfield, the flip, disagreement, the handoff, landing. That is a complete argument with a peak at minute six. The history is not cut from it because it is boring; it is cut because it is *preamble*.

Concretely: open with the sentence (slide 1). Run the judging exercise at minute 4, not 17. Reveal F at minute 9. *Then* ask the question the talk should be built on — "how would anyone ever have caught that?" — and spend slides 3–7 answering it, as the discipline's tools arriving when the room already needs them. Spärck Jones stops being a history slide and becomes the reason F was never retrieved in the first place. Salton/Allan/Buckley stops being a date and becomes why B and its schedule got split. The eight words currently arrive as a syllabus on slide 2 and get ticked off; they should arrive as forensics.

That reorder costs nothing but the ordering of existing prose, and it converts the talk from "a field you skipped" to "the failure you have, diagnosed with a field you skipped."

## 2. The thesis line

There isn't one. The candidates:

- `index.md:14` "knowing what the nouns mean does not tell us whether the retrieval works" — negative, first-person plural, no reversal.
- Slide 2's on-screen `index.md:24` "You are joining an old field late" — second person, one breath, but it is a status insult, not a reversal. It tells the room they are behind. It does not tell them the thing they are holding is pointed the wrong way.
- `index.md:238` "What we left behind was the sixty years of checking whether the score underneath was telling the truth" — 20 words, "we", subordinate clause. That is a paragraph, not a statement.

Here is the finding that should sting: **the talk's own short already has the line, and it is better than anything in the parent.** `shorts/fools-golden-dataset.md:5`:

> "The better retriever scored worse because nobody had ever judged what it found. **You didn't break retrieval. You found the hole in the ruler.**"

That is the reversal, exactly in the `SKILL.md:37` shape — the object becomes the subject; the thing you were measuring turns out to be measuring you. It is second person, present tense, one breath. It is sitting in a four-minute cut while the 40-minute parent closes on a sentence about coats.

Candidates, in Dan's voice:

- **"You didn't break your retriever, you caught your eval set lying."**
- **"Stop grading the retriever, it is the one grading your golden set."**
- **"Your best retriever fails the eval, because the eval never met it."**

The first is the strongest and it is nearly free — it is a compression of a sentence he has already written. And it changes slide 15: the landing becomes "You found the hole in the ruler. Go find the documents your eval never judged," which is a reversal followed by an instruction, rather than a joke followed by an instruction.

The `Karen Spärck Jones Would Like a Word` short has the other spine hiding in it — `karen-sparck-jones-would-like-a-word.md:5`: "Hybrid search: invented last quarter, published in 1972." That is the *re-derivation* thesis in eight words and the parent talk never says anything half as sharp. If the reorder in B.1 is not taken, that line at least belongs on slide 2.

## 3. The title

*Three Search Methods in a Fundable Trenchcoat* — **pass, but at the ceiling on both counts, and the body commits the real violation.**

- Six words. At the limit, not over.
- Move 1, hijack: "three kids in a trenchcoat." The swap kids→search methods is the joke. ✅
- But "fundable" is a *second* joke stacked on the swap — the funding-round gag that already lives on slide 1 (`index.md:16` "we called it a vector database and raised a round"). `SKILL.md:29`: "More than one joke per title. One swap, one stinger, or one verdict." **Three Search Methods in a Trenchcoat** is five words, the swap alone carries it, and slide 1 keeps the funding joke where it earns a laugh in context. I would drop "Fundable."
- The bar test passes. You can say it and not add "…which is about…".

**The violation is on slide 15.** `index.md:238`:
> "Three search methods in a fundable trenchcoat. That is a fair joke about the retriever, and the coat is not the problem."

That is the speaker annotating his own joke, thirty-eight minutes in, at the exact moment the talk should be landing. `SKILL.md:20` — once named, use the name; never re-explain it. The mid-talk payoff at `index.md:110` ("Lexical, dense, hybrid. Those are the three search methods in the trenchcoat") is the correct and sufficient use. The slide-15 gloss should be deleted outright; the close is four sentences and the first two are the speaker doing colour commentary on himself.

## 4. The hallway number

The P@2 flip **is** the right one: 1.0 → 0.5 → 1.0, integers over integers, checkable on a napkin, and it carries the argument rather than decorating it. It is the best hallway number in the portfolio.

**But the room never computes it.** `index.md:159` gives both answers in the speaker's own mouth — "precision at two equals one… precision at two equals point five" — and the deck renders `2/2` and `1/2` as 64px numerals (`index.html:379-380`). The skill says do the arithmetic on stage; the talk does the arithmetic *for* the stage. Two seconds fixes it: after F appears, ask "so what does the new run score?" and wait. Someone shouts "one half," someone else shouts "one," and the disagreement in the room *is* the point of slide 11 arriving four minutes later. That is free.

Second candidate, currently discarded: **τ > 0.99**. See SHARPEN 1. "They re-judged TREC-8 against modern neural retrievers, and the system ranking moved by a Kendall's tau of less than one part in a hundred" is the number that makes the talk's fair-minded half land. Right now that half is an adjective — "barely moved" — and adjectives are what this talk exists to argue against.

## 5. The peak

`bullets.md:18` labels slide 10 the peak. It is not an exercise. It is a reveal the presenter performs while the room watches, and the deck pre-renders every number in it.

The actual exercise is slide 8, and **the deck has answered it** — five documents, each already stamped green or red, three and a half minutes budgeted for the room to arrive at a conclusion printed on the slide (BLOCKING 4). This is the same failure the earlier reviews found in four of six talks, and it is here in its purest form: the fixture is well designed, the question is a real one, and the visual design gave away the key.

Worse: nothing in the peak asks the room to *commit* before seeing. No hands, no vote, no prediction. `index.md:128` even pre-empts the one moment of genuine tension — "If the room agrees perfectly, change the question… Do not manufacture disagreement" — which is correct advice delivered in the wrong place, because a room that has been shown green and red stamps will agree perfectly every time and the fallback will fire every time.

Two changes, both small, and the talk gains its peak:
1. Stamps behind a fragment. Room judges, *then* sees the labels.
2. On slide 10, before revealing the new score: "Hands up — does the new retriever score higher or lower?" Most of the room says higher. Then show 1/2.

That second one is the whole talk in six seconds. The audience makes the exact mistake the industry makes, out loud, and then watches the arithmetic.

## 6. The hostile expert

The IR researcher in row three will *not* lead with "Cranfield doesn't transfer to generative QA." That attack is already blunted: slide 12 (`index.md:191-195`) is explicitly about the retrieval-to-generation handoff, `evidence-bank.md:11` concedes IR studied automated consumers, and slide 6 (`index.md:95`) already says "Are we measuring the passage, the document, or the answer produced from it? Change one and the score may mean something else." That is a real inoculation and it works.

Nor will they lead with "pooling bias is a solved problem you've overstated" — because `index.md:161` says it first, in the talk's own voice: "The risk is real; universal failure is not… Deep, diverse pools had held up." Raising the counter-evidence yourself is the strongest move in the talk. Keep it.

**The attack that lands is the rubric.** `contracts.md:19`: "For this toy topical-relevance rubric, A and B are relevant, C/D/E are not." Document C is *expired Acme cancellation terms*. Under topical relevance as the Cranfield paradigm and TREC define it, C is relevant — it is about the exact topic. The talk marks it nonrelevant because it is superseded, which is an *applicability* judgment, not a topical one. Deck slide 10 makes it worse by putting a red bar on C (`index.html:365`) inside a diagram labelled "the judgment pool."

So the question from row three is: *"You just spent slide 8 teaching us that topical relevance, applicability, authority and sufficiency are four different criteria — and then your own gold set collapses them. Which one is your P@2 measuring?"*

The talk survives, because the honest answer strengthens it — but only if Dan gets there first. One sentence, on slide 8, right after the four criteria appear:

> **"I'm going to call this a topical rubric in a minute and it isn't one — it already smuggles in applicability, which is the exact mistake I'm about to accuse everyone else of. Watch how easy it was."**

That converts the strongest attack into the strongest demonstration: the speaker's own hand-built fixture, made in full knowledge of the distinction, still conflated the criteria. That is a far better argument for the discipline than any citation on slides 3–7.

## 7. Dead weight

**Slide 14, the R1/McDermott aside** (35:30–38:00, 2.5 minutes). It arrives after the argument has closed, cites a 1982 expert system to ask a question — "who maintains the corpus?" — that needs no 1982 citation, and the outline concedes as much in the slide itself (`index.md:223`: "We do not need a grand theory of why expert systems declined to ask who updates Schedule R"). The 30-minute route already drops it (`adaptation-30min.md:22`, "Drops the expert-system aside") and loses nothing detectable. The 40-minute route is the only one that carries it, which is the definition of padding.

Cut it. **Buys 2.5 minutes**, which is exactly the budget for: 30 seconds of hands-up on slide 10, 60 seconds of real judging time on slide 8 now that the stamps are hidden, and 60 seconds returned to slide 6 to fix the 92-wpm compression in the 30-minute route.

Keep the deck's heading, though — "Who updates Schedule R?" (`index.html:503`) is a better sentence than the slide it titles. Fold it into slide 12 as a single line and the citation goes to the evidence bank.

Runner-up cut: the LSA half of slide 4. Deerwester earns his place in the deck's three-panel diagram, not in the spoken track.

## 8. The landing

`index.md:238`, last spoken line:

> "Go find the documents your eval set never judged."

Nine words, imperative, declarative, and the stage direction is right — `index.md:240`: "Say the title line once, flat, then drop to the instruction… the screen closes on the instruction." Silence is implied but not stated; `SKILL.md:54` wants the explicit *Stop talking.*

The problem is not the line, it is the two sentences in front of it. The closing paragraph spends its first half explaining the title joke (Part B.3) and only then lands. Cut back to:

> "Lexical, dense, hybrid: we inherited all three. What we left behind was sixty years of checking whether the score was telling the truth. You found the hole in the ruler. Go find the documents your eval never judged."

Same length, no self-commentary, and the reversal from B.2 sits one beat before the imperative. And make the screen line match the mouth (SHARPEN 10).

## 9. The deck

This is the best artifact in the portfolio and it should absolutely be the template. What the other eight must copy:

**A recurring physical object.** The `.doc` paper card (`index.html:52-63`) — off-white stock, a folded corner via `::after`, a slight rotation — appears on slide 1 as six dated papers, on slide 8 as the five documents, on slide 10 as the pool, and on slide 15 as B and F alone. The argument has a mascot. Slide 15 closing on two cards, one of them hatched and labelled "never judged," does more than the closing sentence does.

**SVG that encodes real geometry, with the math in a comment.** `index.html:97`: `<!-- axis 1960..2030 → x 60..1220 : 16.57px/yr -->`, and all seven dots land on their years. The slide-11 agreement grid is internally consistent to the column. Someone can edit these diagrams a year from now and not break them. That comment convention should be a rule.

**One diagram, three captions.** Slide 4 (`index.html:148`, "The same picture, three times. What changes is how the axes are learned") reuses a single `<g id="cloud">` under three different axis labels — 1975 term weights, 1990 latent dimensions, 2020s neural embeddings. That is the continuity argument made *visually* instead of asserted. It is the single best idea in the deck and it generalises to at least four other talks.

**Notes that are the talk.** Every `<aside class="notes">` carries the outline's spoken prose plus live source links. The deck is deliverable with no other file open. And — checked specifically — the two-link `Source:` href-swallow bug that hit the generated decks portfolio-wide **does not occur here**: each source is separate `<a>` elements inside the notes (`:184`, `:395`), and the on-slide `.cite` lines are plain text with no anchors at all (`index.html:31`). This deck is clean.

**Mechanics worth standardising:** `data-timing` per section summing to exactly 2400s against `totalTime:2400`; `prefers-reduced-motion` and `@media print` fragment handling (`index.html:79-80`); `?all` query param to flatten fragments; light/dark handled by committing to one palette rather than half-doing both.

What I would fix before it becomes the pattern:

1. **The deck is now a second source of truth, and it is winning.** Three better headings, a slide-11 fixture that does not exist upstream, five Cranfield figures that appear nowhere else, and a stage direction that invents a script. `README.md:123` says "the outline is the canonical text… keep the deck's speaker notes in step with the outline," and that has already failed on the very first rebuilt deck. **Rule for the other eight: anything the deck improves gets back-ported to `index.md` the same day, and every number that appears only on a slide gets a line in `evidence-bank.md`.** Otherwise nine decks drift nine different ways and the outlines become archaeology.
2. **Never let the deck answer the exercise.** The stamps on slide 8 are the most expensive design decision in the file: beautiful, and they cost the talk its peak.
3. **No route mechanism.** The adaptations say "hide the others in presenter preparation" and there is nothing to hide them with. Add a `data-routes="40 30 15"` attribute per section and a three-line filter, once, in the shared `reveal.js` wrapper — before eight more decks are built without it.
4. Small: pattern-before-use in the slide-10 SVG (`:373` vs `:376`), and the deck-only fixture wording that drifts from `contracts.md`.

---

## What I could not verify

- **The OpenReview PDF link** (`index.md:112`, `wCu6T5xFjeJ`) returns 403 to automated fetches behind a browser check. The paper, the ID, the venue and the abstract wording are confirmed via the NeurIPS Datasets & Benchmarks proceedings and arXiv 2104.08663; I could not confirm that this specific PDF URL renders in a browser. Click it once before submitting.
- **The exact Cranfield question count.** 221 (deck `:325`) is traceable to subset 3 of the Cranfield 2 questions searched against the 1400-document collection, per the NIST IRLIB reproduction of Volume 2. 225 is the number in the redistributed collection and in Stanford's IR textbook; 279 appears in secondary accounts of the full question pool. I could not read the primary appendix directly to settle which the deck should say. It will be challenged; source it or use 225.
- **`Story:` at `index.md:33`** is unfilled by design and cannot be verified. It is the only one, correctly named, and the talk does not present it as told.
- **Delivery-time claims** — that 60 seconds is enough for pairs on slide 8, that the 40-minute route lands at 40 — are rehearsal targets, unrecorded, and stated as such at `index.md:3`.
