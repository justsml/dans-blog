# Review: From RAGs to Retrievals: Learn the New Engineering Speak

Reviewed 2026-09-06 against the standard set by `outlines/free-tier-40min.md`.
Material read: `flagship-talks/retrieval-40min-outline.md`, `flagship-talks/retrieval-15min-outline.md`, `flagship-talks/README.md`, `reveal-talks/retrieval.html`.

---

## 1. Verdict

This would not win a competitive CFP slot in 2026, and the reason is the premise, not the execution. "Here is what the new words mean" was a good talk in early 2023, when the vocabulary was genuinely a barrier and the docs were bad; in 2026 the docs are fine, the words are in every onboarding deck, and a program committee reading the abstract will correctly guess all eighteen slides. The craft is real — the hedging is disciplined, the caveats are honest, the pipeline decomposition on slide 4 is right — but honest and correct is not the same as worth forty minutes of four hundred people's attention. The single biggest problem is that the talk is **explanatory where it should be argumentative**: it translates AI vocabulary into generic engineering nouns ("feature representations", "similarity index", "workload allocation") when there is a fifty-year-old discipline with *precise* names for every single one of these things, and the fact that the industry renamed that discipline instead of reading it is the actual talk. There is a live spine buried in here — **this field is re-deriving information retrieval and its sixty-year evaluation tradition from scratch, expensively, and does not know it** — and it is a much better talk than the one currently on the slides.

Kill the premise. Keep about a third of the content. The corpse is worth robbing.

---

## 2. The roast

**1. The title promises a phrasebook and then delivers a hedge.** "Learn the New Engineering Speak" sets up a fun, brisk, decode-the-jargon session. What arrives is slide 3's careful qualification: *"these mappings identify an engineering concern, not exact equivalence."* Slide 5: *"Avoid implying that vectors supersede full-text search or that hybrid search always wins."* Slide 13: *"Do not reduce it to authorization or suggest that protocol adoption makes tools safe."* Every promise the title makes, the body takes back. Either be a phrasebook and be funny about it, or stop calling it a phrasebook. Right now it is a phrasebook written by someone who read the legal review first.

**2. Failure pattern 5, in its purest form, in a talk that is *about* vocabulary.** Slide 3's translation table:

> Embeddings → feature representations
> Vector database → similarity index
> Structured output → typed data
> Routing → workload allocation

Three of those four map a specific thing onto a vaguer thing. "Feature representations" is not a discipline's name for an embedding; it is a shrug in a lab coat. The real answer is that dense-vector document representation for retrieval has a paper — Deerwester, Dumais, Furnas, Landauer & Harshman, *Indexing by Latent Semantic Analysis*, JASIS 1990 — and a grandparent, Salton's vector space model, 1975. A talk whose entire thesis is "the words got renamed" and which then renames things *itself*, into vaguer words, has lost the plot at slide 3 of 18.

**3. There is no story anywhere. Not one. Not even a bad one.** The 40-minute outline is 190 lines and contains the word "I" zero times, "we" twice (slide 1's *"assuming nothing changed"* framing and slide 17). Every example is explicitly disowned: *"Mark the scenario as hypothetical"* (slide 7), *"Use a hypothetical timed-out tool call"* (slide 12), *"Use read-only invoice lookup and refund issuance as a hypothetical capability pair"* (slide 14). "Hypothetical" appears four times. Compare free-tier, which carries named Story slots on slides 1 and 7 and a stage direction that reads *"Then admit you have too."* A hypothetical timed-out tool call is a whiteboard. A real one is a talk. Dan has shipped these systems; the absence of a single first-hand sentence is the most fixable and most damaging gap here.

**4. Failure pattern 3, and it is not subtle: this is three talks in a trench coat.** Slides 4-7 are a retrieval talk. Slides 8-10 are an evals talk. Slides 11-14 are an agents-and-tool-permissions talk. Slides 15-16 are a context-engineering talk. The connective tissue is entirely transitional throat-clearing — *"Next, inspect retrieval in depth"*, *"then move to evaluation"*, *"That leads naturally to familiar operational concerns"*, *"Next, examine what those workers are permitted to call"*. Four "next"-shaped sentences is not a spine, it is a table of contents read aloud. The one-sentence spine test fails: the closest you get is "AI has new words for old things, but the analogies break," which is a premise, not an argument, and it makes no prediction anyone could disagree with.

**5. The peak is not a peak. There isn't one.** Every slide is 2-3 minutes of level, calm exposition. The nearest thing to a climax is slide 7's contract question, at minute 11, and it is defused before it starts: *"Mark the scenario as hypothetical... The point is not to teach contract interpretation."* Then the talk keeps going for twenty-nine more minutes at the same altitude. Free-tier has an explicit `peak` pacing tag on slides 11 and 12 and a line that says *"This is the slide I would keep if you cut every other one."* Retrieval has no such slide, and the outline knows it — nowhere does it tell the presenter to raise or drop energy, because there is no shape to raise it against.

**6. Failure pattern 7, timing fiction, nine times over.** The outline stages nine audience questions and allocates seconds to none of them: *"Ask where the audience would record evidence at each handoff"* (slide 4, inside a 2-minute block that also has to explain a five-stage pipeline), *"Ask the audience to imagine a result that is topically perfect and operationally wrong"* (slide 6, 2 min), *"Ask whether a single overall score would tell the team which component to fix"* (slide 8, 2 min), *"Ask the audience what should happen when a previously useful memory becomes stale"* (slide 15, 3 min). Only slide 17 admits an interaction costs time — *"Leave room for one or two responses"* — and even that has no seconds attached. Eight of nine "asks" are rhetorical questions the speaker answers himself, which the room will detect by the third one and stop engaging with. Free-tier prices its interactions: *"45 seconds in pairs on the third price."* Do that, or delete the asks.

**7. No memorable number, and no memorable line except the borrowed one.** There is not a single quantity in this talk. Not one. Not a corpus size, not a recall figure, not a cost, not a date. Free-tier's audience walks out able to say "seventy-five percent acceptance means you pay one and a third times sticker" and "a thirty-point acceptance drop equals every token price doubling." Retrieval's audience walks out with a closing line — *"You don't need to relearn engineering. You need to know which parts got renamed, which abstractions started leaking, and which parts genuinely changed."* — which is a decent line, and which the outline twice describes as *"the supplied message"* and *"the supplied claim"*, i.e. it came in with the brief. Nothing in the body is quotable. Search the outline for a joke: there isn't one. Slide 2 instructs *"The humor should target the language rather than people learning it,"* which is a note about a joke rather than a joke, and the joke it refers to is not written down anywhere (see next).

**8. Deck/outline drift is genuinely minor — with one hole big enough to fall through.** Credit where due: I diffed all 18 slides. The deck's speaker notes are byte-identical to the outline's prose, the slide order matches exactly, and the 30-minute adaptation arithmetic in `README.md` is correct (hiding 2, 5, 10, 14, 17 removes exactly 10 minutes from a 40-minute total). This talk does **not** have a drift problem. But: the punchline of slide 2 is *"Read the supplied opening sentence in full, with increasing speed if that fits the delivery."* **That sentence does not exist in the 40-minute outline or in the deck.** It only exists in the 15-minute outline, slide 2: *"Our agent uses RAG over an embedding store, adds memories to context, calls MCP tools, emits structured outputs, gets evaluated by an LLM judge, and traces the whole thing through our agent observability platform."* The single best moment in the entire 40-minute talk — the one bit with actual comic timing — is a dangling pointer. Worse, the README's 30-minute adaptation tells you to **hide slide 2**, which deletes the hook and instructs the speaker to *"Introduce the vocabulary directly"*, i.e. open a talk about jargon by reciting jargon, straight, with no joke. That is the version most conferences will actually book.

**9. Slide 6 contains the good talk and gets 2 minutes.** *"Search: what should a person inspect? / RAG: what should a model reason over?"* This is the only place where something genuinely, structurally new is identified: the consumer of the ranked list stopped being a human with judgment and became a generator without any. That is a real change in the relevance problem, it has decades of IR context behind it, and it deserves ten minutes and a peak. Instead it gets 120 seconds sandwiched between a retrieval-methods table and a hypothetical contract, and the outline immediately softens it: *"Traditional search also deals with trust, freshness, and conflicting evidence."* True, and the qualification eats the insight.

**10. The hedging has a body count.** I counted 32 uses of "can" as a hedge verb in 190 lines, plus five explicit "avoid/do not" instructions to the speaker. Sample from slide 9: *"can permit direct checks... can range from... usually need... These are not rigid bins, and probabilistic does not mean untestable."* Four qualifications in four sentences. This is failure pattern 1 in a distributed form — it is not one bloated disclaimer slide, it is disclaimer dust spread evenly across all eighteen. The standard is free-tier's: *"Here is my one disclaimer, and then I am done qualifying."* Say it once on slide 1 and then be willing to be wrong out loud for thirty-nine minutes.

**Not present, in fairness:** deck/outline drift (checked, clean); title-to-content mismatch (the title accurately describes the content — the problem is that the content is not worth a slot); arithmetic errors in the 30-minute adaptation.

---

## 3. The missing discipline

The talk keeps saying "this got renamed" and never once says **what it was called before, by whom, in what year**. That is the entire opportunity. Information retrieval is a named field with primary sources, an evaluation tradition older than most of the audience, and — critically — a documented history of the *exact* mistakes the AI industry is currently making at scale. Naming it turns "here is a glossary" into "you are the fourth generation to work on this and you are the first not to read the previous three."

**The renaming, with citations.**

- **Term specificity / IDF.** Karen Sparck Jones (1972), "A statistical interpretation of term specificity and its application in retrieval," *Journal of Documentation* 28(1), 11-21. Rare terms carry more information. Fifty-four years old. Still in your hybrid retriever, under a different name, usually uncredited.
- **The vector space model.** Salton, Wong & Yang (1975), "A Vector Space Model for Automatic Indexing," *CACM* 18(11), 613-620. Documents as vectors, cosine similarity, ranked retrieval. Salton's SMART system at Cornell had been doing this since the 1960s. The phrase "vector database" is a product category built on a 1975 paper.
- **Dense semantic vectors.** Deerwester, Dumais, Furnas, Landauer & Harshman (1990), "Indexing by Latent Semantic Analysis," *JASIS* 41(6), 391-407. This is the honest ancestor of the embedding, and it is thirty-six years old.
- **Why embeddings exist at all.** Furnas, Landauer, Gomez & Dumais (1987), "The vocabulary problem in human-system communication," *CACM* 30(11), 964-971. Two people spontaneously choose the same term for the same thing well under a third of the time. That empirical finding is the reason lexical matching is insufficient and the reason dense retrieval was invented. It is a far better slide than "embeddings → feature representations," because it explains *the problem* rather than restating *the mechanism*. (Check the exact figure before quoting; the commonly cited number is under 20%.)
- **Chunking is passage retrieval, rediscovered.** Salton, Allan & Buckley (1993), "Approaches to passage retrieval in full text information systems," *SIGIR '93*; Callan (1994), "Passage-level evidence in document retrieval," *SIGIR '94*. Every "what's the right chunk size" thread on the internet in the last three years was answered, empirically, in 1993-94. This is a laugh line and a citation at the same time.
- **BM25.** Robertson, Walker, Jones, Hancock-Beaulieu & Gatford (1994/95), "Okapi at TREC-3," in the TREC-3 proceedings, building on Robertson & Sparck Jones (1976), "Relevance weighting of search terms," *JASIS* 27(3). Thirty-plus years old and still, embarrassingly often, the baseline to beat: Thakur et al. (2021), "BEIR: A Heterogeneous Benchmark for Zero-shot Evaluation of Information Retrieval Models," *NeurIPS Datasets & Benchmarks*, found BM25 outperformed many dense retrievers out of domain. Recheck the current state of that result before delivery — it is the most likely thing in this list to have moved.

**The spine — and this is the one I would build the talk on.**

The AI industry is re-deriving evaluation methodology that was worked out sixty years ago, and it is re-deriving it badly because it does not know the failure modes.

- **The Cranfield paradigm.** Cyril Cleverdon's experiments at the College of Aeronautics, Cranfield, Bedfordshire, through the early-to-mid 1960s — see Cleverdon (1967), "The Cranfield tests on index language devices," *Aslib Proceedings* 19(6). A fixed document collection, a fixed set of queries, human relevance judgments, comparable scores across systems. That is your eval harness. It is sixty years old. Your golden dataset is a test collection and the methodology has a name.
- **TREC.** Launched by NIST in 1992 under Donna Harman. Thirty-four years of running exactly the "shared benchmark, held-out judgments, annual comparison" ritual that eval startups are currently selling as a category.
- **Pooling, and the hole in your golden set.** TREC could not judge every document against every query, so it judged the union of the top-k from participating systems. Which means any relevant document no system retrieved was never judged, and is scored as irrelevant forever — including for a new system that finds it. See Zobel (1998), "How reliable are the results of large-scale information retrieval experiments?", *SIGIR '98*. This is the single most useful thing IR can hand this audience: **your hand-built eval set has the same bug, it penalizes the retriever that gets better than the one you built the set with, and there is a literature on it.**
- **Assessor disagreement, and what it means for your LLM judge.** Voorhees (2000), "Variations in relevance judgments and the measurement of retrieval effectiveness," *Information Processing & Management* 36(5). Different human assessors disagree substantially about which documents are relevant, *and system rankings stay stable anyway*. Two consequences the eval-tooling discourse mostly hasn't absorbed: absolute scores are much softer than they look, and relative comparisons are much sturdier. That is a precise, cited replacement for slide 10's *"Compare with expert labels. Inspect disagreements."* — same advice, but now with a reason and a number. Verify the specific overlap and correlation figures against the paper before quoting them.
- **Graded relevance.** Järvelin & Kekäläinen (2002), "Cumulated gain-based evaluation of IR techniques," *ACM TOIS* 20(4). nDCG. Because "did it retrieve the right thing" was never binary, and rubric design has thirty years of prior art.

**Two more, used sparingly.**

- **Expert systems, as the cautionary tale.** McDermott (1980), "R1: A Rule-Based Configurer of Computer Systems," *Artificial Intelligence* 19(1) — XCON at DEC, the genuine commercial success — alongside the knowledge-acquisition bottleneck that Feigenbaum named, and the maintenance collapse that followed as rule bases grew. The last time this industry shipped systems whose behavior nobody could fully specify, the thing that killed it was not capability. It was that nobody could tell when it was wrong, and the cost of maintaining the knowledge exceeded the value of having it. Useful, chastening, and factually solid — but keep it to one slide and do not overclaim the parallel.
- **Leaky abstractions.** Joel Spolsky (2002), "The Law of Leaky Abstractions." The talk already gestures at this on slide 17 (*"Old abstractions need new boundaries"*) without naming it. Flag honestly: this is a widely-loved blog post, not research.

**Discard:** "the semantic gap" — the phrase is canonical in *content-based image retrieval* (Smeulders et al., 2000, IEEE TPAMI), and borrowing it for text will get a correction from someone in row three. Furnas's vocabulary problem is the right text-IR concept and it is stronger anyway.

**The memorable checkable number.** Cranfield 2 wrapped up around 1966. That makes the methodology behind your eval suite sixty years old. Sparck Jones published IDF in 1972: fifty-four. TREC started in 1992: thirty-four. Pick one, put it on a slide, say it twice.

**Lines in his register, offered as raw material, not as script:**
- "We spent thirty years calling it search. Then we called it a vector database and raised a round."
- "Karen Sparck Jones worked out that rare words matter more in 1972. We put it on a pitch deck in 2023 and did not mention her."
- "Your eval framework has a grandfather. He is sixty, he worked at an aeronautics college in Bedfordshire, and he already knows what is wrong with your golden dataset."
- "Chunk size was an open research question in 1993 and a Reddit thread in 2024. One of those had a control group."

---

## 4. A proposed new arc

**Replacement talk.** Working title: *Your Eval Suite Has a Grandfather.* Or, closer to his register: *We Reinvented Search and Forgot to Read the Manual.*

**Spine, one sentence:** AI engineering is re-deriving information retrieval and its sixty-year evaluation tradition from scratch, and the parts we skipped are exactly the parts that are currently breaking.

**The eight imported words** (from one discipline, per the standard — all IR, no borrowing from security, which is what causes the stapling): *term specificity, vector space model, vocabulary problem, passage retrieval, relevance judgment, the Cranfield paradigm, pooling, assessor disagreement.* Slide 15 lists them back.

**One disclaimer, slide 2, said once:** I am not an IR researcher, I am an engineer who went and read the papers after getting burned; every date and citation is on the slide so you can check me.

40 minutes, 15 slides.

| # | Slide | Min | Status |
|---|---|---|---|
| 1 | **The sentence.** Read the ridiculous jargon sentence aloud, fast, straight-faced — and finally write it down in the 40-minute materials. Then: every noun in that sentence has a citation older than the startup that sold it to you. | 2.5 | **kept** (old slide 2, promoted to open, joke actually written down) |
| 2 | **The bet, the disclaimer, the eight words.** One disclaimer, said once. The claim: you are not learning a new field, you are joining an old one late. Here are eight words it will give you. | 2.0 | **new** |
| 3 | **1972: rare words matter more.** Sparck Jones on term specificity. Fifty-four years old, in your retriever right now, uncredited. | 3.0 | **new** (replaces old slide 3's translation table) |
| 4 | **1975 and 1990: the vector was already there.** Salton's vector space model; LSA as the honest ancestor of the embedding. "Vector database" is a product category built on a fifty-year-old paper. | 2.5 | **new** (absorbs old slide 3) |
| 5 | **Why embeddings exist: the vocabulary problem.** Furnas et al. 1987. Two people rarely pick the same word for the same thing. That is the problem; embeddings are one answer to it, not the point of it. | 2.5 | **new** |
| 6 | **Chunking is passage retrieval, rediscovered.** Salton/Allan/Buckley 1993, Callan 1994. Your chunk-size argument had a control group thirty years ago. | 2.0 | **new** (absorbs old slide 4's pipeline decomposition, compressed) |
| 7 | **BM25 is still standing there.** Lexical, hybrid, reranking — with BEIR's out-of-domain result as the checkable fact and the honest recheck note. | 2.0 | **merged** (old slide 5, given a number and a spine) |
| 8 | **Audience moment: judge these five documents.** The contract question, rebuilt as a live relevance-judgment exercise. 60 seconds in pairs: which of these five governs this customer? Then the reveal — you just did what a TREC assessor does, and you disagreed with each other. | 3.5 | **kept, rebuilt** (old slides 6+7 merged; the disagreement is the point, not the hypothetical) |
| 9 | **Cranfield, Bedfordshire, 1966.** Cleverdon's test collections. Fixed corpus, fixed queries, human judgments, comparable scores. This is your eval harness. It is sixty years old and it has a paper. | 3.0 | **new** (replaces old slide 8) |
| 10 | **PEAK: pooling, and the bug in your golden set.** TREC judged the union of what systems found. Anything nobody retrieved was scored irrelevant forever — which punishes the retriever that finally finds it. Your hand-built eval set has this bug. Show it. | 4.0 | **new** — this is the peak the talk has never had |
| 11 | **Assessors disagree, and rankings survive it.** Voorhees 2000. Absolute scores are softer than they look; relative comparisons are sturdier. Therefore: calibrate your LLM judge against disagreement, not against truth, and trust it for A-vs-B, not for "is this good." | 3.0 | **merged** (old slides 9+10, now with a citation and a consequence) |
| 12 | **What actually is new: the reader stopped being a person.** The one genuine break. Sixty years of IR assumed a human inspects and rejects the ranked list. The consumer is now a generator with no judgment and no ability to abstain. Everything above still applies; this is the part that doesn't. | 3.0 | **kept, promoted** (old slide 6, finally given the weight it earned) |
| 13 | **The second break: retrieved text is control flow.** IR never had to worry that a document would give the reader instructions. Now it does. Trust boundary, not a ranking score. | 2.5 | **merged** (salvaged from old slides 15/16/17) |
| 14 | **The last time we shipped systems nobody could specify.** Expert systems, XCON, the knowledge-acquisition bottleneck. What killed it was not capability; it was that nobody could tell when it was wrong. One slide, no overclaiming. | 2.5 | **new** |
| 15 | **Close: eight words, one number, one instruction.** List the eight words back. Say the sixty-year number one last time. Then: go find the documents your eval set never judged. | 2.0 | **kept** (closing line survives; the "supplied message" can stay, it's good) |

**Total: 40.0 minutes.**

**Explicitly cut:** old slide 11 (agent loop), old slide 12 (retries, idempotency, checkpoints, budgets), old slide 13 (MCP), old slide 14 (tool permissions and least privilege). That is seventeen minutes and four slides, and none of it is bad — old slide 12 in particular is solid material. It belongs in a different talk, one about operating agents, with the confused-deputy literature behind it (Hardy, 1988, *ACM SIGOPS OSR* 22(4)) and capability-based security as the imported discipline. That is a real second talk. Write it separately. Do not staple it here.

**Also cut:** the 30-minute adaptation table's instruction to hide slide 2. Whatever the new arc, never cut the hook.

---

## 5. The one thing

**Stop translating and start citing.** Every place the current talk says "this is really just X," replace it with "this is X, it was published in *year* by *person*, and here is what they already found out that you are about to rediscover the expensive way." That single substitution converts the talk from a glossary — commoditized, unbookable, correct — into an argument that a room of senior engineers will find genuinely uncomfortable and will repeat afterwards. It also fixes, in one move, the missing-discipline problem, the missing-number problem, the missing-peak problem, and the reason a program committee currently has no reason to pick this over the other 400 submissions.

---

## 6. Facts to check or claims to soften

**Verify before quoting (I am confident of the works and years below, but the specific figures need eyes on the source):**

1. **Furnas et al. 1987 vocabulary-agreement figure.** The commonly cited result is that two people choose the same term for the same object well under 20% of the time, but the exact number varies by experiment within the paper. Read it, quote one specific experiment, cite the table.
2. **Voorhees 2000 disagreement and stability figures.** The qualitative finding — assessors disagree substantially, system rankings remain stable — is solid. The specific overlap percentage and the Kendall's tau values must come from the paper, not from memory or from secondary summaries.
3. **BEIR / BM25.** Thakur et al. 2021 is real and the "BM25 is a strong out-of-domain baseline" finding is real *as of 2021*. Five years have passed. Recheck the current state of the art before saying it on a stage in 2026, and phrase it as "as of the BEIR paper" rather than as a present-tense claim.
4. **Cranfield dates.** Cranfield 1 and Cranfield 2 ran across the late 1950s and 1960s and different sources bracket them differently. Pick one citable date from Cleverdon's own publications and use it consistently, because "sixty years" is the memorable number and someone will check it.
5. **TREC start year and organizer.** 1992, NIST, Donna Harman. Easy to confirm on NIST's own site; do so, and link it.
6. **XCON / R1.** McDermott 1980 is solid. The *decline* narrative — maintenance cost overwhelming value as the rule base grew — is broadly accepted but the specific rule counts and dollar figures that circulate about XCON vary wildly between retellings. Tell the shape of the story; do not quote a rule count you cannot source.

**Soften or drop:**

7. **"Leaky abstractions" (Spolsky 2002)** is a blog post. Attribute it as one. It is a great phrase and not a finding.
8. **"The semantic gap"** — drop it, or attribute it to content-based image retrieval (Smeulders et al. 2000). Do not present it as a text-IR term.
9. **Any implication that IR researchers solved RAG.** They did not, and slide 12 of the new arc is where you say so plainly. The argument is "you skipped the reading," not "there is nothing new here" — the second version is smug, wrong, and will lose the room.
10. **The existing outline's *"RAG is an information architecture"*** (old slide 7) is described as a "supplied claim." It is a fine claim but it is doing no work; in the new arc it is replaced by the pooling argument, which makes the same point with evidence.
