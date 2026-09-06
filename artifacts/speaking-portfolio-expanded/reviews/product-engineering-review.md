# Review: The Future of Product Engineering

Reviewed 2026-09-06 against the bar set by [free-tier-40min.md](../outlines/free-tier-40min.md).
Material read: the 15/30/40 outlines, [packet.md](../packets/product-engineering/packet.md), [formats.md](../packets/product-engineering/formats.md), [evidence-bank.md](../packets/product-engineering/evidence-bank.md), [CFP.md](../economics-product/CFP.md), [evidence.md](../economics-product/evidence.md), [demo.md](../economics-product/demo.md), [DEMO-RUNBOOK.md §6](../demos/DEMO-RUNBOOK.md#6-the-future-of-product-engineering), and the rendered deck at [reveal-talks/product-engineering.html](../../reveal-talks/product-engineering.html).

---

## 1. Verdict

This would win a slot at a product-leadership track and lose one at a competitive engineering conference, because it is sensible and nobody in the room disagrees with any of it. The single biggest problem: **the talk has no claim you could argue with.** "Map every function to an agent, give each agent an owner, put humans where risk spikes, write a hypothesis" is a checklist a thoughtful attendee could have written on the flight. Conway is quoted on slide 1 and slide 15 and does no work in between — the frame is a picture frame, not a load-bearing wall. Free-tier hands the room eight words and a piece of arithmetic that reorders their priorities on the spot; this talk hands them a roster diagram and an assurance that taste matters. It is the most professionally packaged of the talks reviewed and the least likely to change anyone's Monday.

---

## 2. The roast

### 2.1 Conway is decorative. Provably: the talk draws boxes, and Conway's law is about wires.

Slide 1 (40): *"a system's structure copies the communication structure of the organization that built it."* Correct paraphrase. Then slide 4 says *"This is Conway's law used deliberately. If your agent roster is going to mirror your org chart anyway, draw the roster first."*

That is not Conway's law used deliberately, that is an org chart with robots drawn on it. Conway's claim is specifically about **communication structures** — the interfaces, not the boxes. The talk specifies six agents and zero interfaces. How does the research agent's brief reach the feedback agent's clusters? Who reconciles them when they disagree? Is the marketing agent allowed to read the warehouse the analytics agent writes? The one genuine interface in the whole design is buried on slide 6 as a nicety — *"Keep the meeting. It is where taste gets exercised in public"* — when it is in fact the only high-bandwidth channel in the entire architecture, and therefore, by the law you opened with, the thing that determines the product's shape. You quoted the law and then ignored what it predicts.

**Verdict on the framing question: currently decorative, but one slide away from load-bearing.** It becomes load-bearing the moment slide 6's review meeting is named as the system's integrating interface, and the moment you name the manoeuvre you are actually performing (see §3).

### 2.2 The peak is a rerun with the answer printed on the ticket.

Slide 12 (40), 26:30–29:00: *"The human-in-the-loop part is not 'a human reads everything.' It is placing guards where the risk exposure spikes."*
Slide 13 (40), 29:00–34:00: *"Reveal activation first. Show of hands: which ships?"*

By 29:00 the room has sat through: slide 3, *"Taste here means knowing what the product should refuse to do"*; slide 10, *"widens only when the evidence and the owner say so"*; and slide 12, an entire slide announcing that guards block things. Then you ask for a show of hands on which candidate ships. Nobody is raising a hand for pressure copy. You have spent twenty-nine minutes training them not to. The demo's stated payoff — *"a metric win cannot buy off a product principle"* — was already delivered on slide 3, twenty-two minutes earlier, and again on slide 12, thirty seconds earlier.

The tell is that **your own 15-minute version has the right order**: demo at slide 5 (7:30), guards at slide 6 (11:00). In the short version the reversal is live. In the long version it is a replay. The 40 should have adopted the 15's ordering and did not, which is the drift discussed in §2.8 acting against you.

Worse, the fixture is legible from the table. Any room reading a row labelled "Pressure copy" with a column headed "Urgency: **False**" has solved it before you finish the sentence. The columns give away the ending. If you want a surprise, reveal one column at a time from a source the audience cannot pre-read, or better — run the demo before you have ever used the word "guard."

### 2.3 The roster never fails. A talk about taste in which the machines are always right.

Across fifteen slides, every agent in this roster does its job. The research agent produces *"a standing brief, not a dashboard nobody opens."* The feedback agent produces clusters *"linked back to the customers who said it."* The gap-analysis agent produces *"a list of candidate changes with screenshots and reasons."* The only thing that ever goes wrong in the entire talk is a synthetic copywriter being manipulative — and it is caught, by a rule, immediately.

Where is the slide where the clustering agent merges two genuinely different complaints and buries the one that mattered? Where is the research brief that confidently reports a competitor feature that does not exist? Where is the beta cohort selected by "users similar to that cluster" that turns out to be similar on the wrong axis? You are asking a room to hand six functions to software and you never once show the software being wrong in a way a rule cannot catch. That is the difference between a talk about judgment and a talk that asserts judgment matters.

### 2.4 The guard list is wrong, and your own runbook already contains the right one.

Slide 12 (40) lists four risk spikes: *"A subset of users → all users · A cheap run → an expensive model or API run · Deploying new infrastructure → tearing down existing infrastructure."*

Three slides earlier, slide 10 has an agent **sending email to real human customers**: *"find the users similar to them and push an invitation."* An agent composing and sending messages to named customers does not appear anywhere in your risk list. Neither does writing to or deleting customer records, which slide 9 explicitly wires up: *"connect those to your ecommerce platform or customer records."*

And you already know this. [DEMO-RUNBOOK.md §2](../demos/DEMO-RUNBOOK.md#2-automating-improvement-from-failure) says, in your own words: *"money, data deletion, and customer messaging get a fourth gate the kit does not show: a person."* The correct list is sitting in the same repository, attached to a different talk. The four spikes you chose are all about **cost and blast radius**. The two you dropped are the ones about **irreversibility toward a human being**, which is the category your thesis actually cares about.

### 2.5 "Nobody t-shirt sizes anymore" is the most contestable line in the talk, and the 15-minute version strips off the one thing making it defensible.

40, slide 7: *"I have not heard an engineering team discuss level of effort on a ticket in months. No t-shirt sizing; story points, where they survive, are auto-assigned by an agent and nobody argues about them."*
30, slide 5: *"I have not heard an engineering team discuss level of effort on a ticket in months. Effort is leaving the rubric."*
15, slide 4: *"Effort estimation has already left the rubric; nobody t-shirt sizes anymore."*

The 15 has quietly converted a first-person observation into an industry fact. [evidence.md](../economics-product/evidence.md) explicitly forbids exactly this: *"**Speaker's firsthand observation** ... Do not present as an industry measurement. Invite the room to disagree."* Two of the three outlines fail that instruction and the third only half-passes, because none of them contains the invitation to disagree that the evidence ledger requires.

This matters beyond compliance. A meaningful fraction of any engineering room estimated something last week. When you tell them a thing they do every sprint no longer happens, you lose them for the next ten minutes and they stop believing the rest. The fix is free and it is more interesting than the assertion: state it as your observation, ask for hands, and *use the count*. A room that splits down the middle is a better slide than a room being told what is true.

### 2.6 There is no memorable number, and there is no joke.

Free-tier gives the room *"dropping from seventy-five to forty-five percent acceptance costs you exactly the same as every token in your stack doubling in price overnight"* — checkable, arithmetic, portable to a budget meeting. Product Engineering's only numbers are 40/48/45%, 3/9/4%, and a 5% ceiling that the material itself calls *"a fictional choice, not a recommendation for other products."* Nobody is repeating a fictional ceiling in a hallway.

The talk also runs forty minutes without a single laugh. Free-tier has *"spending three weeks optimizing a thirty-dollar bill because a conference talk made you anxious."* The best lines here are dry-good rather than funny: *"the suffering arrives later than the speed does"* (keep), *"cheap to produce and cheap to reject"* (keep), *"you have taught your best customers that responding is a one-time event"* (keep — best line in the talk), *"a dashboard nobody opens"* (keep). There is one obvious unclaimed joke sitting in slide 4's own image: six robots, six owners. Somebody in that room owns four of them and is on call for all six. That is the joke and it is also the argument (see §3, span of control).

### 2.7 Slide 9 is a different talk, and formats.md admits it.

Slide 9 (40): *"Connect agents to website analytics and engagement metrics, connect those to your ecommerce platform or customer records, connect all of it to your warehouse... the marketing agent drafts ads and videos into a proposal queue."*

Ecommerce platforms, warehouses, and ad creative are a growth-operations talk. The surrounding fourteen slides are an organizational-design talk. CFP.md promises reviewers *"an organizational design talk built on Conway's law, not a tooling lecture"* — and slide 9 is a tooling lecture with the tool names filed off, which is why it needs the apology *"Tool names here are placeholders. The ownership pattern is the point."* If the ownership pattern is the point, the slide can be one sentence inside another slide.

Your own [formats.md](../packets/product-engineering/formats.md) line 11 confirms this: *"drop slide 6 for 25"* — slide 6 of the 30 is exactly this material. You already treat it as the first thing to cut. Cut it in the 40 too.

### 2.8 Three outlines: they are not purpose-built, they are hand-copied, and the copy has already drifted.

[formats.md](../packets/product-engineering/formats.md): *"This talk has three purpose-built lengths rather than one deck with adaptations."*

Measured against the text: 32% of the 30-minute outline's sentences are **byte-identical** to the 40's, and reading the remainder, essentially all of it is paraphrase of the same beats in the same order, not different argument. The 15 is the same again. These are adaptations. They are simply adaptations maintained by hand, which is the worst available arrangement: you pay the maintenance cost of three documents and get none of the guarantees of derivation.

The drift is already measurable, in a repository that is one day old:

| Thing | 40 | 30 | 15 | demo.md | runbook |
|---|---|---|---|---|---|
| Demo duration | 5:00 | 5:00 | 3:30 | 4:00 / 3:00 lightning | "Four minutes" |
| Estimation claim | first person | first person | **stated as fact** | — | — |
| Demo vs. guards order | guards first | guards first | **demo first** | — | — |

Structurally: `build-talk.ts` registers `adaptive-systems`, `evidence-learning`, `free-tier`, `dynamic-scaling` and emits `*-15min-adaptation.md` / `*-30min-adaptation.md` with explicit `keep`, `times`, `bridges` and `trim` arrays. Product Engineering appears **zero times** in that file (`grep -c "product-engineering" build-talk.ts` → 0). It also has no `script-15min.md` / `script-30min.md` / `script-40min.md` in its packet, which free-tier has. And `reveal-talks/` contains exactly one deck for this talk — the 40 — while formats.md links three PPTXs as if all three are current.

**Call: the split does not earn its keep.** Register the talk in `build-talk.ts`, derive 15 and 30 as routes with bridges, delete the two hand-maintained outlines. The one thing worth preserving from the hand-written versions is the 15's slide ordering, which is better than the 40's — so fix the 40 and the routes inherit it. (See §4.)

### 2.9 Timing and packet errors.

- **Workshop overruns by twenty minutes.** formats.md heads the section *"## 60–75 minute workshop"* and then tables blocks from `0:00–0:10` through `1:30–1:35`. That is 95 minutes. A workshop chair will notice this before they read your abstract.
- **Lightning route pays off a slide it cut.** formats.md: *"Seven minutes from the 15-minute deck: slides 1, 3, 5, 8"* — slide 2 (the thesis) is cut, yet the beat table closes on *"Automate the right things, keep the taste,"* which is slide 2's line.
- **Under-interactive for forty minutes.** Two audience moments total: slide 2's *"Ask (30 s)"* and slide 14's *"Write it (45 s)"*. Seventy-five seconds of participation in a forty-minute slot. Free-tier runs four moments and says so on line 5. Not timing fiction — the opposite problem, and just as visible from the back row.
- **Citation year conflict.** Every outline says *"Microsoft ExP (2021)"*; evidence.md says *"2020"* twice. One of them is wrong and it is on a slide.
- **Packet contradicts itself.** packet.md: *"It names no experimentation platform, analytics tool, warehouse, or agent framework"* — then lists *"Anthropic (2024). Building effective agents"* under References, and no outline cites it. Either use it or drop it.

### 2.10 The title promises the future and delivers a Tuesday.

"The Future of Product Engineering" is a keynote-panel title, and the room that shows up for it wants to know what happens to **them** — to the job, the title, the career, the number of product engineers a company needs. The talk never touches that. It answers "how should I organize the software?" while the title asked "what happens to us?" The 40's subtitle *"Conway's Law, Applied on Purpose"* is far better and far more honest, and per §2.1 it is currently not what the talk does. Fix §2.1 and the subtitle becomes the true title.

### 2.11 What this talk does *not* have — stated plainly, per the checklist.

- **Disclaimer bloat: mostly absent, and this is the best-behaved talk on this axis.** The outline instructs *"Say it once on slide 1"* and largely obeys. The only leaks are slide 9's *"Tool names here are placeholders"* and slide 13's *"It is not shipped."* Slide 13's is earned — it is the demo's actual point. Slide 9's is a symptom of the slide not belonging (§2.7), not of hedging.
- **Two talks stapled together: no, one talk with one foreign slide.** Slide 9 is the seam; everything else is one argument.
- **Deck/outline drift: the 40's deck is clean.** I diffed the rendered reveal deck against the 40 outline; the body text is faithful slide for slide, with one cosmetic change (*"A crawler with browser tools you control"* for *"a web-crawling bot"*). The deck also handles the empty story slots honestly: *"No verified story was supplied. Omit this cue unless the presenter supplies an authorized firsthand account."* That is good hygiene. The drift is between the three outlines, not between outline and deck.
- **No first-hand story: yes, and it is total.** All three story slots are empty brackets, and as a consequence the delivered deck contains zero personal material. Note the second-order damage: slide 11's entire claim — *"it is remarkable how forthcoming people become once they see a response"* — is flagged in evidence.md as *"Speaker's firsthand observation"* and is supported by story slot #3, which is empty. Right now that slide is an unsupported assertion with a placeholder where its evidence goes. The slots are also weaker than free-tier's: *"the customer who became a collaborator after one beta invitation"* asks for a heartwarming anecdote, where free-tier's *"The first time a bill, a quota, or a rate change broke an assumption in something you built"* asks for a scar. Ask for scars.

---

## 3. The missing discipline

The talk uses the generic words — *guards, owner, roster, taste, risk spikes* — for concepts that four separate literatures have named precisely. Here is what fits, what to discard, and where each one goes.

**Conway (1968), properly quoted.** Melvin E. Conway, "How Do Committees Invent?", *Datamation* 14(5), April 1968, pp. 28–31. The sentence is: *"organizations which design systems … are constrained to produce designs which are copies of the communication structures of these organizations."* Two words in that sentence are doing work the talk drops. **"Constrained"** — Conway is describing a force, not a tendency; you cannot opt out, you can only choose which structure you are copied from. And **"communication structures"** — not org charts, not headcount, not function lists. Quote it verbatim on slide 1, then spend the talk on the communication structure between agents rather than the list of agents.

**The mirroring hypothesis is empirical, and it breaks about a third of the time.** MacCormack, Rusnak & Baldwin (2012), "Exploring the Duality Between Product and Organizational Architectures: A Test of the 'Mirroring' Hypothesis," *Research Policy* 41(8):1309–1324 — comparing loosely-coupled distributed development against co-located commercial teams, and finding the loosely-coupled products significantly more modular. Colfer & Baldwin, "The Mirroring Hypothesis: Theory, Evidence, and Exceptions" (Harvard Business School working paper 10-058, 2010; later *Industrial and Corporate Change*, 2016) surveyed roughly 142 empirical cases and found mirroring supported in something near 69% of them — **and the interesting part is the 31%**, which the authors describe as deliberate *mirror-breaking* by firms that chose an architecture their org did not have. Verify both figures before quoting (see §6). This gives you the memorable checkable number the talk currently lacks, and it converts Conway from a proverb into a measured effect with documented exceptions, which is exactly the posture you want before you claim you can break the mirror on purpose.

**The inverse Conway manoeuvre — the name for the thing slide 4 already does.** Slide 4 says *"If your agent roster is going to mirror your org chart anyway, draw the roster first."* That has a name; the term was popularized by the ThoughtWorks Technology Radar and traces to Jonny LeRoy and Matt Simons' 2010 *Cutter IT Journal* discussion of restructuring teams to force a desired architecture. Attribution is soft, so say "the name people use for this is…" rather than crediting a paper. Naming it costs four seconds and moves you from "here is a good idea I had" to "here is a known manoeuvre, applied to a new substrate," which is a much stronger CFP position.

**Team Topologies gives you the wires.** Skelton & Pais, *Team Topologies* (IT Revolution, 2019) supplies exactly what §2.1 says is missing: four team types (stream-aligned, enabling, complicated-subsystem, platform) and — the part you need — **three interaction modes**: collaboration, X-as-a-Service, and facilitating. Your six agents currently interact by unspecified magic. Declaring that the research agent serves the feedback agent X-as-a-Service, while the weekly review is a *collaboration* mode with deliberately high bandwidth and deliberately short duration, is the difference between a roster and an architecture. The book's cognitive-load argument (drawing on Sweller, 1988) is also the right lens on the owner: an owner's capacity is bounded by cognitive load, not by enthusiasm.

**Coase, and the inversion that makes this talk worth attending.** Ronald Coase (1937), "The Nature of the Firm," *Economica* 4(16):386–405. Firms exist because using the price mechanism has a cost; the boundary of the firm sits where the cost of coordinating one more thing internally equals the cost of buying it outside. Your org chart is therefore a **fossil of 1990s coordination costs** — a record of what was expensive to coordinate when it was drawn.

Now run your own thesis against that. Slide 4 says *"mimic each function you already have, or would have at scale, as an agent."* If agents collapse coordination cost, then by Coase the boundaries should move, and the org chart is the **last** template you should photocopy onto your roster. Your talk's conservative answer is, on its own theory, probably wrong. That contradiction is the best thing in this material and it is currently unwritten. It is also the version of the talk that someone argues with you about in the hallway, which is the only reliable sign a CFP slot was worth giving you.

Line in your register, for the slot: *"Your org chart is a fossil. It records what used to be expensive to coordinate. Do not photocopy a fossil onto your agents."*

**Principal-agent theory, because "one owner per agent" is not free.** Jensen & Meckling (1976), "Theory of the Firm: Managerial Behavior, Agency Costs and Ownership Structure," *Journal of Financial Economics* 3(4):305–360. Agency cost decomposes into **monitoring cost + bonding cost + residual loss**. Your slide 4 assigns ownership and treats it as costless. It is not: the owner must monitor output they did not produce and cannot fully read, and the residual loss is whatever the agent does that the owner would not have. And the delicious part — the literature is about aligning a *self-interested human* agent. Software agents have no interests, which removes the incentive problem and leaves the harder half: **accountability without motive.** You cannot fire an agent for negligence, so the whole residual lands on the owner. Say that out loud; the room has never thought about it.

**Span of control, and the joke that is also the argument.** V. A. Graicunas (1933), "Relationship in Organization," in Gulick & Urwick's *Papers on the Science of Administration*, gave the combinatorial count of relationships a supervisor manages: n(2^(n−1) + n − 1). For **six** subordinates that is **222 relationships**. Your slide 4 image is literally *"a row of six desks each with a small robot seated at it."* Six agents. 222 relationships. The arithmetic is checkable on stage in ten seconds, and it is funny, and it is the argument: an agent roster is not free capacity, it is a supervision load, and the person you named as owner already has a job. Use Graicunas as an illustration of combinatorial growth, not as a management rule — his prescriptive limit was discredited long ago (Urwick's own 1956 *HBR* piece, "The Manager's Span of Control," is the readable defence and shows how contested it was).

**Bainbridge, which makes your guard slide partly wrong.** Lisanne Bainbridge (1983), "Ironies of Automation," *Automatica* 19(6):775–779. The central irony: automating a process leaves the human responsible for exactly the cases the automation cannot handle — while removing the routine practice that built the skill needed to handle them. The manual operator degrades precisely because the automation is good. Applied to slide 12: **the owner you posted at the guard is the person who stopped reading the routine cases**, by design, because you told them not to read every token. Six months in, they are asked to adjudicate the one weird beta cohort with no recent practice at judging beta cohorts. This is the strongest single addition available to you. It does not destroy your argument, it completes it: a guard needs *scheduled practice on the routine cases*, not just authority over the exceptional ones. Parasuraman & Riley (1997), "Humans and Automation: Use, Misuse, Disuse, Abuse," *Human Factors* 39(2):230–253, is the companion citation for automation complacency and bias.

**Campbell's law, which your demo is a worked example of and never names.** Donald T. Campbell (1979), "Assessing the Impact of Planned Social Change," *Evaluation and Program Planning* 2(1):67–90: the more a quantitative indicator is used for social decision-making, the more it will distort and corrupt the process it monitors. Your pressure copy raised activation by fabricating urgency. That is not a story about a guard, it is a textbook instance of Campbell's law, and naming it gives the room a word they will use next week. Careful with attribution: the popular phrasing *"When a measure becomes a target, it ceases to be a good measure"* is **Marilyn Strathern's** 1997 restatement ("'Improving ratings': audit in the British University system," *European Review* 5(3):305–321), not Goodhart's own sentence, which came from a 1975 paper on UK monetary management and was about statistical regularities collapsing under policy pressure. Cite it correctly and the pedantic staff engineer in row three becomes an ally.

**What happened last time automation arrived.** David Autor (2015), "Why Are There Still So Many Jobs? The History and Future of Workplace Automation," *Journal of Economic Perspectives* 29(3):3–30, contains the ATM-and-bank-teller case: cash machines spread, per-branch teller headcount fell, branches got cheaper to operate so banks opened more of them, and total teller employment rose for a period while the job's content shifted toward relationship work. That is the honest historical answer to the question your title asks and your content ducks (§2.10) — automation of a *task* is not automation of a *job*, and the surviving job is the judgment-shaped part. It also earns the thesis on slide 3, which is currently a bare prophecy. Note the caveat in §6.

**Discard:** Williamson and transaction-cost specificity — it is load-bearing in Cry Me a Free Tier and reusing it here blurs the duplication boundary that CFP.md is careful to draw. Perrow's *Normal Accidents* (1984) is tempting for the coupling argument but adds a second heavy frame to a talk that already needs to make room; leave it in the evidence bank.

---

## 4. A proposed new arc — 40 minutes, 15 slides

Spine, one sentence: **Your agent roster will mirror your org chart by default, and your org chart is a fossil of coordination costs that agents just deleted — so break the mirror on purpose, and know what it costs to own the pieces.**

| # | Slide | Time | Status | One line |
|---|---|---|---|---|
| 1 | The architecture you could read off the org chart | 0:00–2:30 | kept, rewritten | Open on the story slot, quote Conway's actual sentence including "constrained," one scope disclaimer, then the question for the next forty minutes. |
| 2 | Mirroring is measured, and it breaks about a third of the time | 2:30–5:00 | **new** | Conway's law is an empirical claim with data behind it (MacCormack et al. 2012; Colfer & Baldwin) — and the documented exceptions are firms that broke the mirror deliberately. |
| 3 | Your org chart is a fossil of coordination cost | 5:00–7:30 | **new — the turn** | Coase 1937: the boundary sits where coordination got expensive. Agents moved that number, so mimicking your current functions is the one default you should distrust. |
| 4 | The spectrum, and the two ways to lose | 7:30–9:30 | merged (old 2 + 3) | Committee at one end, five people at the other; automate the right things or trade taste for vibes. Audience ask (30 s), unchanged. |
| 5 | The inverse Conway manoeuvre, and the wires between agents | 9:30–12:00 | kept, re-armed (old 4) | Name the manoeuvre; then specify interaction modes (Team Topologies), because a roster without interfaces is not an architecture. |
| 6 | Two directions of attention, and the one interface that matters | 12:00–14:30 | merged (old 5 + 6) | Research looks out, feedback looks in; the weekly review is not a nicety, it is the system's only high-bandwidth channel. Story slot. |
| 7 | Effort left the rubric — argue with me | 14:30–16:30 | kept, corrected (old 7) | Stated as your observation, with the show of hands evidence.md asks for, and the count used live. |
| 8 | Gap analysis, and the loop past engineering | 16:30–18:30 | merged and cut (old 8 + 9) | The build-walking agent in full; the warehouse-and-ads material compressed to two sentences, since formats.md already cuts it first. |
| 9 | Targeted beta enrollment, and the deluge it causes | 18:30–21:00 | kept, absorbing old 11 | Provenance → similar users → opt-in flag; and once they see a response the volume arrives, so be ready. Story slot. |
| 10 | Campbell's law arrives on schedule | 21:00–23:00 | **new** | The number you chose is about to be optimized against; name the law, set the trap, and do not yet say the word "guard." |
| 11 | Demo: run it before you know the rule | 23:00–28:00 | reordered (old 13) | Same fixture, moved ahead of the guard slide so the reversal is live; close by asking the room to write the rule they would have needed. |
| 12 | Where guards go — including the two you forgot | 28:00–31:00 | kept, extended (old 12) | The four exposure spikes, drawn out of the demo the room just watched, plus customer messaging and data deletion. |
| 13 | The irony of automation, and how many agents one person can own | 31:00–34:00 | **new** | Bainbridge 1983: the guard is the person you stopped giving practice to. Graicunas: six agents, 222 relationships. Ownership is a load, not a checkbox. |
| 14 | Every experiment carries a hypothesis and reports itself | 34:00–37:00 | kept (old 14) | Unchanged, including the 45-second write-it exercise. |
| 15 | Conway, read forward — and broken on purpose | 37:00–40:00 | kept, rewritten (old 15) | Do not photocopy the fossil; break the mirror where it pays, name the owners, place the guards including the two you forgot, keep the taste. |

Sum: 2.5 + 2.5 + 2.5 + 2 + 2.5 + 2.5 + 2 + 2 + 2.5 + 2 + 5 + 3 + 3 + 3 + 3 = **40:00**.
Audience moments: slide 4 (30 s ask), slide 7 (hands), slide 11 (hands + write-the-rule inside the demo), slide 13 (hands), slide 14 (45 s write). Five, matching free-tier's density.
Cut outright: nothing. Old slide 9 survives as two sentences in the new 8; old slide 11 survives as the back half of the new 9.

### How the 15 and 30 should be derived

Register `product-engineering` in `build-talk.ts` with `keep`, `times`, `bridges` and `trim` arrays exactly as `free-tier` and `evidence-learning` do, then delete `product-engineering-15min.md` and `product-engineering-30min.md` and let the generator emit `-30min-adaptation.md` and `-15min-adaptation.md`. The 30 keeps roughly slides 1, 3, 4, 5, 6, 7, 9, 10, 11, 12, 15 with a bridge carrying slide 2's mirroring evidence into slide 3 and a bridge carrying slide 13's Bainbridge line into the close. The 15 keeps roughly 1, 3, 5, 10, 11, 12, 15 — the fossil, the manoeuvre, Campbell, the demo, the guards, the close — with a bridge for the roster and one for ownership cost. Note that the new arc already runs the demo before the guards, which means the 15's current (correct) ordering survives derivation instead of existing as an accidental divergence. Regenerate the deck from the same source. This also gets the talk the three presenter scripts its packet is missing, and stops formats.md linking three PPTXs when only one deck is current.

---

## 5. The one thing

**Give the talk a claim someone can disagree with, and make it slide 3: your org chart is a fossil of coordination costs, so do not photocopy it onto your agents.** Everything the talk currently says follows from "mimic your existing functions," which is the safe answer and, by Coase, probably the wrong one. Making the inversion the spine costs you one new slide and a rewrite of slide 4, and it converts a well-produced checklist into an argument — which is the only thing that reliably wins a competitive slot. The cheapest second change, if you want one free improvement on the way to the airport: move the demo ahead of the guards slide, so the reversal is a reversal.

---

## 6. Facts to check or claims to soften

**Verify before quoting.**

1. **Colfer & Baldwin's numbers.** I recall roughly 142 empirical cases and mirroring supported in about 69%. Do not say either figure on stage until you have the paper open; use "most cases, with a substantial minority of documented exceptions" if you cannot confirm. The 2010 HBS working paper 10-058 and the 2016 *Industrial and Corporate Change* version may differ in count.
2. **MacCormack, Rusnak & Baldwin (2012)**, *Research Policy* 41(8):1309–1324 — confirm volume, issue and pages. Also note on stage that it is a comparison across development modes, not a controlled experiment; it is evidence of association.
3. **Bainbridge (1983)**, *Automatica* 19(6):775–779 — confirm the page range.
4. **Graicunas' formula and the 222.** n(2^(n−1) + n − 1); for n = 6 that is 6 × (32 + 5) = 222. Do the arithmetic on stage so the room can check you. Present it as an illustration of combinatorial growth, and say explicitly that its use as a hard limit on span of control was discredited decades ago.
5. **Goodhart attribution.** The quotable sentence is Strathern (1997), not Goodhart (1975). Use Campbell (1979) as the primary for the demo since it is the closer fit, and mention the Goodhart/Strathern provenance only if you use the popular phrasing.
6. **Inverse Conway manoeuvre attribution** is soft — ThoughtWorks Radar popularized it; the LeRoy & Simons (2010) *Cutter IT Journal* origin is commonly cited but not a clean primary. Say "the name people use for it," not "coined by."
7. **Autor's ATM case.** State the period. Teller employment rose over the decades of ATM diffusion and has declined since; a claim phrased as "automation always creates jobs" is not what Autor argues and will be challenged. The defensible version is narrow: automating a task changed the job's content and did not, over that period, eliminate the occupation.
8. **Microsoft ExP year.** All three outlines say 2021; evidence.md says 2020 twice. Resolve it; it is printed on a slide.
9. **Conway citation detail.** *Datamation* 14(5), April 1968, pp. 28–31; melconway.com hosts the author's own reprint. Quote the sentence verbatim rather than paraphrasing, since the paraphrase drops "constrained."

**Soften or reframe.**

10. *"Nobody t-shirt sizes anymore; points, if they exist, are assigned by an agent"* (40 slide 7) — first person plus an explicit invitation to disagree, in all versions. The 15's flat assertion (*"Effort estimation has already left the rubric"*) violates evidence.md's own instruction and must go.
11. *"The teams that automate the right things... will be rewarded richly. The teams that... will suffer"* (40 slide 3) — currently a prophecy with no mechanism. Either attach the mechanism (Bainbridge's skill decay, Campbell's metric corruption, agency cost) or mark it plainly as your bet.
12. *"it is remarkable how forthcoming people become once they see a response"* (40 slide 11) — flagged in evidence.md as firsthand and currently backed by an empty story slot. Fill the slot or cut the sentence; do not deliver it as a general fact.
13. **The 5% support ceiling** is called *"a fictional choice, not a recommendation"* in demo.md. Make sure that is said on stage, not just written in the ledger.

**Fix in the packet.**

14. formats.md workshop table runs 0:00–1:35 under a heading of *"60–75 minute workshop."* Ninety-five minutes.
15. formats.md lightning route cuts slide 2 and then closes on slide 2's line.
16. formats.md: *"This talk has three purpose-built lengths rather than one deck with adaptations"* — not supported by the text (32% verbatim overlap, same beats in the same order). Remove the claim when the talk moves to derived routes.
17. packet.md claims the talk *"names no... agent framework"* while listing Anthropic (2024) under References, uncited by any slide. Use it or drop it.
18. Demo duration is 5:00 in the 40 and 30 outlines, 4:00 in demo.md, and *"Four minutes"* in the runbook. Pick one.
