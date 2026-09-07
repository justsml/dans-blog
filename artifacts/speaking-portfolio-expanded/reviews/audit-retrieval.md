# Audit: retrieval (2026-09-06)

Canonical: `artifacts/speaking-portfolio-expanded/outlines/retrieval-40min.md`. Read against `.claude/skills/dans-voice/SKILL.md`, all three adaptations/scripts, the packet, `build-talk.ts` routes, three shorts, `reviews/retrieval-review.md`, `flagship-talks/retrieval-*`, both READMEs, and the four generated decks (grep only).

## 1. Verdict

Ready after fixes. Content, arithmetic, citations, timings and generated files are consistent; `pooling.ts` reproduces slide 10. The one thing that would embarrass Dan is the title he already rejected, which appears 85 times across 22 files and on the eyebrow and closing display line of every deck; rename it in one pass and rebuild.

## 2. Blocking

| file:line | quoted text | problem | concrete fix |
| --- | --- | --- | --- |
| `outlines/retrieval-40min.md:1` and `:231` | `# Your Eval Suite Has a Grandfather` / `> Your eval suite has a grandfather.` | Title is the canonical reject in `dans-voice/SKILL.md:24` ("identified as GPT output on sight"). It is also the visible closing line of slide 15 in every deck and both PPTX editions (17 hits in `decks/retrieval-40min-screen.pptx`, 20 in handout). | Pick the new title, change lines 1 and 231 in the outline, `build-talk.ts:155` and `:158`, then run `sync-talks.ts retrieval` (regenerates scripts, adaptations, HTML, PPTX). Hand-edit the eight non-generated hits listed under "Rename inventory" below. |

**Rename inventory** (every file that carries the old title; generated files regenerate, the rest are hand edits):

| path | hits | generated? |
| --- | ---: | --- |
| `artifacts/speaking-portfolio-expanded/outlines/retrieval-40min.md` (L1, L231) | 2 | canonical, hand |
| `artifacts/speaking-portfolio-expanded/build-talk.ts` (L155 `title`, L158 `eyebrow`) | 2 | hand |
| `artifacts/speaking-portfolio-expanded/README.md` (L28, L43, L64, L121) | 4 | hand |
| `artifacts/speaking-portfolio-expanded/reviews/README.md` (L46) | 1 | hand |
| `artifacts/speaking-portfolio-expanded/packets/retrieval/evidence-bank.md` (L1) | 1 | hand |
| `artifacts/speaking-portfolio-expanded/packets/retrieval/packet.md` (L1) | 1 | hand (check whether sync regenerates it; formats.md is generated, packet.md has no marker) |
| `artifacts/flagship-talks/README.md` (L7), `retrieval-40min-outline.md` (L3), `retrieval-15min-outline.md` (L3) | 3 | hand |
| `artifacts/reveal-talks/index.html` (L4) | 1 | check whether sync rewrites index; otherwise hand |
| `artifacts/reveal-talks/retrieval.html`, `retrieval-40min.html` (18 each), `retrieval-30min.html` (17), `retrieval-15min.html` (11) | 64 | generated |
| `artifacts/speaking-portfolio-expanded/outlines/retrieval-{15,30}min-adaptation.md` (L1 each) | 2 | generated |
| `artifacts/speaking-portfolio-expanded/packets/retrieval/script-{15,30,40}min.md` (L1 and closing quote) | 6 | generated |
| `artifacts/speaking-portfolio-expanded/decks/retrieval-*-{screen,handout}.pptx` and the byte-identical aliases `artifacts/flagship-talks/retrieval-{40,15}min.pptx` | — | generated |

Candidate check against the skill: *Fool's Golden Dataset* (3 words, idiom hijack, move 1) passes but is already the title of `shorts/fools-golden-dataset.md`, the 4-minute cut of slides 9–10; using it for the parent is defensible ("once named, use the name everywhere", skill L20) but the shorts README row 15 would then read as the talk, not a cut. *RAG Is Search With a Funding Round* is seven words, one over the limit, and reads as a "X is Y" explainer; the five-word *Search With a Funding Round* keeps the joke from slide 1 L16 and passes the bar test. Not renaming here.

## 3. Consistency findings

- Timings sum and are monotonic: 40-min slides 2.5+2+3+2.5+2.5+2+2+3.5+3+4+3+3+2.5+2.5+2 = 40.0; deck `data-timing` totals 2400 s / 15 slides (`retrieval.html`, `retrieval-40min.html`). 30-min `times` (`build-talk.ts:178-193`) = 30.0, deck 1800 s / 14 slides. 15-min `times` (`build-talk.ts:211-220`) = 15.0, deck 900 s / 8 slides.
- Route `keep` lists match the adaptations and deck `data-slide` attributes (30: drops 14; 15: keeps 1, 2, 8, 9, 10, 11, 12, 15).
- Bridges reference content that exists: `build-talk.ts:195` (after 13, covers dropped 14 R1) and `:222-223` (after 2 covers 3–7; after 12 covers 13–14). No `trim` entries for this talk.
- `packets/retrieval/script-15min.md:3` says "Pairs get 45 seconds" (from `build-talk.ts:225` route note) but the same script at L47 says "Work in pairs for sixty seconds" and L53 "Give 60 seconds"; the 15-min deck notes carry the same 60. The 15-min adaptation L16 also says 45. Either add a per-route override for the slide 8 sentence or change the note to 60.
- Slide references in hand-written files all still point at the right content: `contracts.md:15` "slide 10"; shorts headers "slides 3 and 7", "slide 5", "slides 9 and 10"; outline stage directions "until slide 10" (`retrieval-40min.md:130`).
- `history.svg` `<title>` "The evaluation method is sixty years old" and five rows (1966/1992/1998/2000/2022) match slide 9–10 claims; deck `alt="Cranfield, Bedfordshire, 1966"` matches the slide heading.
- Visible `>` lines match the spoken text on every slide; slide 15's second line "Find the documents your eval never judged." matches the closing sentence.
- `speaking-portfolio-expanded/README.md:43` and `:7` send readers to `decks/README.md` for "Browser and PowerPoint" / "all 60 editions", but `decks/README.md` (staged today) lists only Dynamic Scaling's six files; it did not list retrieval at HEAD either. The six `decks/retrieval-*.pptx` exist and `packet.md`/`formats.md` link them directly. Portfolio-level regeneration bug, not retrieval content.
- `README.md:43` CFP column is "—"; no CFP package exists for this talk (checked `engineering/`, `economics-product/`).
- Name spelling: outline uses "Sparck Jones" (L39, L42, L50); short and shorts README use "Spärck Jones". Both forms are used in the literature; pick one across the portfolio.
- Generated scripts/decks contain no phrasing from the pre-rewrite glossary talk (grepped "glossary", "feature representations", "workload allocation", "Learn the New Engineering Speak": zero hits in retrieval decks and scripts).

## 4. Correctness findings

- 1972 → 2026 = 54 (slide 3 L40, L46; short L13). 1966 → 2026 = 60 (slide 9 L139, L141; slide 15 L238). Both correct.
- Slide 10 P@2: old top-2 {B, A} ∩ judged-relevant {A, B} = 2/2 = 1.0; new top-2 {B, F} ∩ {A, B} = 1/2 = 0.5; after adding F, {B, F} ∩ {A, B, F} = 2/2 = 1.0. `bun packets/retrieval/pooling.ts` prints `old 1 / new 0.5` then `old 1 / new 1` (exit 0), matching L159 and the stage direction "2/2, 1/2, then 2/2" (L165), `contracts.md:19`, and the short's on-screen "1.0 → 0.5 → 1.0".
- Citations checked against the text as written (author, year, venue, pages) and all consistent with my knowledge of the papers: Spärck Jones 1972 J. Doc 28(1) 11–21; Salton/Wong/Yang 1975 CACM 18(11) 613–620; Deerwester et al. 1990 JASIS 41(6) 391–407 (author order confirmed in `evidence-bank.md:3`); Furnas et al. 1987 CACM 30(11) 964–971; Salton/Allan/Buckley 1993 SIGIR 49–58; Thakur et al. 2021 BEIR, NeurIPS D&B; Cleverdon/Mills/Keen 1966 Cranfield Vol. I; Zobel 1998 SIGIR 307–314; Voorhees 2000 IP&M 36(5) 697–716; McDermott 1982 AI 19(1) 39–88 (the 1980 date in the review was corrected, `evidence-bank.md:13`). Each slide's use matches what the paper supports; no effect sizes quoted for Furnas or Voorhees 2000, as the review asked.
- Needs an external check before delivery: slide 10 L161 and `history.svg:19` "rank τ > 0.99" for Voorhees, Soboroff, Lin 2022 (arXiv 2201.11086). The qualitative finding (TREC-8 rankings essentially unchanged after expanded judgments) is right; confirm the exact Kendall's τ figure and that it refers to TREC-8 ad hoc before saying "point nine nine" on stage.
- Slide 7 L106 "Reranking and late-interaction models performed best on average in that study, at higher computational cost" is what BEIR 2021 reports (cross-encoder re-ranking and ColBERT). Confirm the OpenReview id `wCu6T5xFjeJ` resolves.
- Slide 9 source link labels the PDF "Volume I, Design, Part 2, front matter"; the URL is the Part 2 Appendices front matter. Label is accurate.
- No vendor, price, or dated-announcement claims in this talk. All numbers are dates, arithmetic, or labeled fixtures (`contracts.md:21`, `pooling.ts:1`).

## 5. Direction alignment

- No drift on (a)–(d); the talk does not touch the assistant-with-everything, Knight & Leveson, Council of Guards, or barrel-of-monkeys material. Slide 11 L178 "That does not mean a model judge is trustworthy because it ranks two answers" and L180 "Keep disagreement as data" agree with the Council of Guards stance (judges measure disagreement).
- Slide 13 L206 "Keep tool permissions and policy checks outside the retrieved document's control" agrees with the guard in `adaptive-systems-40min.md:211`; no duplication, retrieval only states the boundary.
- Ownership is consistent: `flagship-talks/README.md:13` "Retrieval owns the Cranfield/TREC history and pooling exercise"; `benchmarks-40min.md:151-162` covers Cranfield and Voorhees 2000 in 2.5 minutes and defers pooling with "The Retrieval talk follows that history and its pooling problem." Benchmarks slide 10 is a miniature of retrieval slides 9 and 11 (same two sources); acceptable as a pointer, but if both talks run at one event, cut Voorhees from benchmarks.
- `evidence-bank.md:17` "Agent orchestration, retry budgets, and MCP permissions are outside this talk's new arc." The review (§4 L121) proposed a separate confused-deputy talk for that material; none exists and the outline itself makes no "companion talk" promise, so nothing dangles.
- Disclaimer placement: the one allowed scope line is on slide 2 (L27), not slide 1, per the review's arc. Direction says slide 1. Either move L27 into slide 1 after L16 or accept slide 2 as the "bet" slide; do not have both.

## 6. Voice

Hedge count beyond the slide-2 disclaimer: slide 3 (1), slide 4 (1), slide 7 (2 incl. source note), slide 12 (1), slide 14 (3). Slide 10 L161 "The risk is real; universal failure is not" is load-bearing (it sets up the 2022 recheck) and stays.

1. Title, `retrieval-40min.md:1`: *Your Eval Suite Has a Grandfather* → *Search With a Funding Round* (move 1, five words, reuses the slide 1 joke) or *Fool's Golden Dataset* if the short can share it.
2. Slide 15 visible line L231 "Your eval suite has a grandfather." → whatever the new title is, or the flatter verdict "Unjudged is not a zero."
3. Slide 4 heading L52 "1975 and 1990: the vector was already there" → "Vector Database, 1975" (colon explainer; skill L25).
4. Slide 10 heading L149 "Demo: the hole in the golden set" → "Fool's Golden Dataset" (technique already named in the short; skill L20 "use the name everywhere").
5. Slide 12 heading L184 "What changed: the next reader is a generator" → "The Reader Stopped Being a Person" (the review's own line, §4 row 12).
6. Slide 14 L219, L223, L225 carry three disclaimers ("not a cautionary fable", "We do not need a grand theory", source note "the speaker's argument, not a claim"). Keep L223's "Name the owner of the corpus and the invalidation path"; move the other two into `evidence-bank.md`, which already says it at L13.
7. Slide 3 L46 "The point is not that every rare word is relevant. A typo can be rare." → cut; the short (`karen-sparck-jones-would-like-a-word.md`) lands the same beat without it.
8. Slide 12 L195 "IR also studied machine consumers before modern RAG; the change here is this particular generative handoff and its failure modes." → move to `evidence-bank.md:11`, where it already lives.

## 7. Cruft

| path | verdict | reason |
| --- | --- | --- |
| `artifacts/flagship-talks/retrieval-40min-outline.md` | KEEP (pointer) | Committed in faf81e454 as a four-line redirect to the canonical outline; superseded content is gone. Carries the old title (L3) so it joins the rename pass. Not modified in the working tree despite the session's opening snapshot. |
| `artifacts/flagship-talks/retrieval-15min-outline.md` | KEEP (pointer) | Same; old title at L3. |
| `artifacts/flagship-talks/retrieval-40min.pptx`, `retrieval-15min.pptx` | KEEP | `cmp` shows byte-identical to `decks/retrieval-40min-screen.pptx` and `retrieval-15min-screen.pptx`; they are the "synchronized aliases" `flagship-talks/README.md:3` describes. Regenerate with the rename. |
| `artifacts/flagship-talks/README.md:7` | KEEP | Live index row; old title needs the rename. |
| `artifacts/speaking-portfolio-expanded/reviews/retrieval-review.md` | KEEP | Pre-rewrite record under the old talk's title "From RAGs to Retrievals: Learn the New Engineering Speak"; `reviews/README.md:16` lists it under that title (correct as history) and `:46` maps it to the current outline. Its arc (§4) was adopted slide for slide; its facts-to-check list was honored (no Furnas %, no Voorhees τ, BEIR dated, 1966 anchor, TREC 1992). Proposals deliberately not adopted and recorded in `evidence-bank.md:7-13`: Callan 1994, Järvelin/Kekäläinen nDCG, Spolsky, "semantic gap", XCON "nobody could tell when it was wrong", McDermott 1980, "scored irrelevant forever". Its alternate title "We Reinvented Search and Forgot to Read the Manual" (L91) is nine words; reject. |
| `artifacts/speaking-portfolio-expanded/packets/retrieval/evidence-bank.md:17` | MERGE | "Earlier glossary prose remains in Git history and the retained historical PowerPoints" is false: the flagship PPTX files are byte-identical to today's exports, not historical. Drop "and the retained historical PowerPoints". |
| `artifacts/speaking-portfolio-expanded/packets/retrieval/packet.md` | KEEP | Duplicates the generated table in `formats.md` plus one sentence pointing at the outline; harmless, but check whether sync regenerates it before hand-editing the title. |
| `artifacts/speaking-portfolio-expanded/packets/retrieval/visuals.md` | KEEP | One SVG, correctly listed. |
| `artifacts/speaking-portfolio-expanded/decks/README.md` | MERGE (portfolio) | Lists only Dynamic Scaling; the `README.md:7` "links all 60 editions" claim and the retrieval row's "Browser and PowerPoint" link depend on it. Regenerate for all ten talks. |
| `artifacts/reveal-talks/index.html:4` | KEEP | Live collection index; rename hit. |

## 8. Proposed edit list

1. `packets/retrieval/evidence-bank.md:17`: delete "and the retained historical PowerPoints".
2. `build-talk.ts:225` and `outlines/retrieval-15min-adaptation.md:16`: change "Pairs get 45 seconds" to 60, or add a route override for the slide 8 sentence, so the 15-min script stops contradicting itself.
3. `outlines/retrieval-40min.md:39,42,50` or the short: settle "Sparck" vs "Spärck" and apply everywhere.
4. `outlines/retrieval-40min.md:46`: cut "The point is not that every rare word is relevant. A typo can be rare."
5. `outlines/retrieval-40min.md:195`: cut the trailing "IR also studied machine consumers..." sentence (already in `evidence-bank.md:11`).
6. `outlines/retrieval-40min.md:219,225`: drop "not a cautionary fable about people foolish enough to use rules" and the source-note hedge; keep L223.
7. `outlines/retrieval-40min.md:27`: move the scope disclaimer to slide 1 after L16, or accept slide 2 and note it in `evidence-bank.md`.
8. `outlines/retrieval-40min.md:52,149,184`: retitle slides 4, 10, 12 per Voice items 3–5.
9. `outlines/retrieval-40min.md:161` and `reveal-talks/assets/retrieval/history.svg:19`: confirm the Kendall's τ > 0.99 figure against arXiv 2201.11086 before delivery.
10. `outlines/retrieval-40min.md:1,231`, `build-talk.ts:155,158`, `README.md:28,43,64,121`, `reviews/README.md:46`, `packets/retrieval/evidence-bank.md:1`, `packets/retrieval/packet.md:1`, `flagship-talks/README.md:7`, `flagship-talks/retrieval-{40,15}min-outline.md:3`, `reveal-talks/index.html:4`: apply the new title, then `bun artifacts/speaking-portfolio-expanded/sync-talks.ts retrieval` to regenerate scripts, adaptations, four HTML decks, six PPTX and the two flagship aliases.
11. `decks/README.md`: regenerate so it lists all ten talks (portfolio-wide; retrieval's README row links to it).
12. If the new title is *Fool's Golden Dataset*, retitle `shorts/fools-golden-dataset.md` (filename stays) so the short and the parent do not share a name.

## Fixes applied 2026-09-06

### 1. Changed

- `outlines/retrieval-40min.md:231` — closing visible line was a bare repeat of the new title. Now `> Three search methods. One instrument nobody checked.` It carries the argument (callback to slide 10's "We fixed the instrument") instead of re-reading the eyebrow, and sets up the unchanged instruction line beneath it. The title joke moved into the spoken close, where it is said once, flat, and then handed off: "Three search methods in a fundable trenchcoat. That is a fair joke about the retriever, and the coat is not the problem. Lexical, dense, hybrid: we inherited all three. What we left behind was the sixty years of checking whether the score underneath was telling the truth. Go find the documents your eval set never judged." Stage direction updated to match.
- `outlines/retrieval-40min.md:161`, `packets/retrieval/contracts.md:23`, `shorts/fools-golden-dataset.md:17`, `reveal-talks/assets/retrieval/history.svg:19` — the unverified Kendall's τ figure for Voorhees, Soboroff, and Lin (2022) is gone from everything that reaches a stage. Replaced with the qualitative finding ("the ordering barely moved" / SVG row now reads "Expanded TREC-8 labels; ranking barely moved"). `contracts.md` now carries the explicit instruction not to quote a τ until it has been read off arXiv 2201.11086 and confirmed to describe the TREC-8 ad hoc runs. Edit-list item 9 is closed by removal, not by verification.
- `packets/retrieval/evidence-bank.md:17` — deleted the false claim that glossary prose "remains in ... the retained historical PowerPoints" (those files are gone). Now: "Earlier glossary prose survives only in Git history; every exported deck and alias now carries the current talk."
- `packets/retrieval/evidence-bank.md` — new "Held back from the slides" section absorbs the τ caveat, the deliberate slide-2 disclaimer placement (edit-list item 7, resolved as "accept slide 2, note it"), the R1 non-fable note, and the machine-consumers note, so the outline stops carrying them.
- `outlines/retrieval-40min.md:46` — cut "The point is not that every rare word is relevant. A typo can be rare." (item 4).
- `outlines/retrieval-40min.md:195` — cut the trailing "IR also studied machine consumers..." sentence (item 5).
- `outlines/retrieval-40min.md:219,225` — cut "not a cautionary fable about people foolish enough to use rules" and the McDermott source-note hedge (item 6). Kept L223 including "We do not need a grand theory of why expert systems declined to ask who updates Schedule R" — that is a punchline, not a hedge.
- `outlines/retrieval-40min.md:39,42,50` — settled on "Spärck Jones", matching the shorts (item 3).
- `outlines/retrieval-40min.md` slide headings (item 8): 4 → "Vector Database, 1975"; 10 → "Fool's Golden Dataset"; 12 → "The Reader Stopped Being a Person".
- Timings untouched: still monotonic and summing to 40:00 (2.5+2+3+2.5+2.5+2+2+3.5+3+4+3+3+2.5+2.5+2).

### 2. Skipped

- Item 7 as written (move the disclaimer into slide 1): slide 1 is a cold open — jargon sentence, straight face, pause. A disclaimer there kills it. Took the audit's alternative: keep it on slide 2 and record the choice in `evidence-bank.md`.
- Items 10, 11, 12 and the whole rename inventory: done in the earlier title pass, or portfolio-level (`decks/README.md`) and outside this talk's files. The short keeps its name; the parent now shares it deliberately, per the skill's "use the name everywhere".
- Item 2 is a `build-talk.ts` route change; instruction below, not edited.

### 3. Route config changes for the caller

```
slug:      retrieval
route:     15
field:     note
old:       "Pairs get 45 seconds. Keep the missing schedule hidden until the pooling demonstration. The opening survives."
new:       "Pairs get 60 seconds. Keep the missing schedule hidden until the pooling demonstration. The opening survives."
location:  build-talk.ts:137
why:       slide 8 says "Work in pairs for sixty seconds" and its stage direction says 60; the route note is the only "45" and it propagates into script-15min.md:3 and retrieval-15min-adaptation.md:16, both generated. Changing the note fixes all three. No `times` change: the 15-min route keeps 1,2,8,9,10,11,12,15 with times summing to 15.0 and slide 8 already holds 2.5 minutes, which covers a 60-second exercise.
```

### 4. Morning review, reconsidered against the new title

Adopted (both are payoffs the sharper title now demands):

- **The chunk-size laugh line** (`retrieval-review.md:85`), on slide 6: "Chunk size was an open research question in 1993 and a forum thread in 2024. One of those had a control group." Slide 6 was the only build slide with no joke, and the review's own roast item 7 flagged the talk's jokelessness. Used "forum thread" rather than "Reddit thread" — the citation-versus-thread contrast is the joke; the brand name is not.
- **Naming the three methods out loud** (review row 7's "lexical, hybrid, reranking" beat, retargeted), on slide 7: "Lexical, dense, hybrid. Those are the three search methods in the trenchcoat, and the pitch usually names one of them." The title now advertises a count, and until this line the three existed only as a visible bullet. This is the mid-talk payoff that makes the slide 15 callback land.

Skipped, and why:

- **Callan 1994** — slide 6 already has one dated passage-retrieval citation doing the work; a second adds a page range I would be quoting from memory.
- **Järvelin & Kekäläinen / nDCG** — the talk's metric is a two-document precision the audience computes in their heads. Introducing graded relevance buys a metric the arc never uses.
- **Spolsky, "leaky abstractions"** — the abstraction-translation arc it belonged to was the glossary talk. It has nothing to attach to now, and the review itself flags it as a blog post.
- **"The semantic gap"** — the review said discard it; still right.
- **XCON "nobody could tell when it was wrong"** and **McDermott 1980** — both contradict `evidence-bank.md:13` (wrong year, and a decline narrative the talk deliberately refuses).
- **"Scored irrelevant forever"** — contradicted by the 2022 recheck the talk now leans on.
- **Alternate title "We Reinvented Search and Forgot to Read the Manual"** — nine words; moot.
- **The confused-deputy companion talk** — a separate talk, not a fix to this one.
