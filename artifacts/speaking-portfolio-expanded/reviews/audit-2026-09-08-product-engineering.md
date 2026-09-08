# Audit: Product Engineering — 8 September 2026

Audited against `talks/product-engineering/index.md` (canonical, 17 slides) and all fifteen sibling files. No talk files were edited. Prior reviews: `reviews/audit-product-engineering.md` (6 Sept), `reviews/product-engineering-review.md` (6 Sept), roll-up `reviews/AUDIT-2026-09-06.md`.

## Verdict

**Ready after fixes — but the demo overruns every route it appears in, and the 15-minute route ships a dangling reference.** The 6 September audit's three blocking items are two-thirds closed: the slide-14 stage direction is fixed, the Graicunas formula is now unambiguous aloud, and the 70/22/8 split — which the audit could not verify — I have now confirmed verbatim from the published paper, which means the talk is being *more* cautious than its evidence requires and has thrown away its best hallway number in the process. What has not moved is the demo-duration drift (still two number-sets across six files, and the runbook the presenter actually performs is 30–60 seconds longer than any route allows), the peak (the answer is now printed on slide 10 instead of in the fixture), and the packet/evidence ring, which still carries the pre-rewrite thesis the packet itself forbids restoring.

The predictions are in good shape: labelled once, prediction two lands squarely on the opportunity, no doomward drift. Neither is falsifiable.

## 1. Status against the prior audits

Only items that are not clean are listed.

| # | Prior finding | Status | Evidence |
| --- | --- | --- | --- |
| B1 | "Keep the answers for slide 14" points at a cut slide | **FIXED** | `index.md:65` "Keep the answers for the close."; paid off at `index.md:274` and `script-30min.md:190` |
| B2 | Graicunas formula parses as 197 when spoken | **FIXED** | `index.md:196` "n times **the quantity** two-to-the-n-minus-one plus n-minus-one. For six that is six times the quantity thirty-two plus five, which is six times thirty-seven: 222." |
| B3 | 70/22/8 needs the paper open | **VERIFIED — and now under-used** | Confirmed verbatim (§3). `evidence-bank.md:72` is correct. But `index.md:26-29` dropped the numbers for "Mostly supported, with a documented minority that was not." See BLOCKING 3. |
| §2.2 | "Peak is a rerun with the answer printed on the ticket" | **PARTLY FIXED / MOVED** | Fixture no longer leaks (`index.md:150` "they are A, B, and C"). But slide 10 is titled "Campbell's law arrives on schedule" and shows "What behavior did we just pay for?" 90 seconds before the vote. See BLOCKING 4. |
| §5 | Coase inversion should be the spine | **PARTLY LANDED** | Coase is stated as "the inversion" (`index.md:48`) and never returns. Slides 5–9 price nothing. See Part B.1. |
| §5 | Demo ahead of the guards | **FIXED** | Slide 11 → slide 12 in all three routes. |
| §2.8 / 18 | Demo ran 5:00 / 5:00 / 3:30 / 4:00 | **STILL OPEN, now split 2–3** | See BLOCKING 1. |
| Edit 3 | Delete the "no sample size or uncertainty" sentence from the peak | **STILL OPEN** | `index.md:168` verbatim. |
| Edit 4 | Add "Automatica 19(6), 775–779" to Bainbridge | **STILL OPEN** | `index.md:202` has neither. Confirmed correct externally (§3). |
| Edit 5 | demo.md blank line splits the stage table | **STILL OPEN** | `demo.md:29` blank, `demo.md:30` renders as a stray paragraph. |
| Edit 7 | Drop "Your Org Chart Is a Fossil of Coordination Cost" (banned "Your X Is a Y") | **STILL OPEN** | `packet.md:11`. Also still the H2 of slide 3, `index.md:37`. |
| Edit 8 | Packet references omit Campbell, Graicunas, MacCormack, Thoughtworks, Team Topologies | **PARTLY FIXED** | `packet.md:60-64` added Coase, Colfer & Baldwin, Bainbridge; the other five still missing. `packet.md:56` still says "cites Conway's 1968 paper and Microsoft's experimentation guidance." |
| Edit 9 | formats.md "roster" → "interfaces" | **STILL OPEN** | `formats.md:23` "Draw the roster on purpose"; `formats.md:27` "two agents from the roster"; `formats.md:38` "Draw the roster". |
| Edit 10 | Delete evidence-bank stale slide names and story-slot table | **STILL OPEN** | `evidence-bank.md:53-54`, `evidence-bank.md:56-66` (table still lists "40 min \| 11 \| The customer who became a collaborator"; slide 11 is the demo). |
| Edit 12 | Rewrite `evidence.md` to the current claims | **STILL OPEN** | `evidence.md:11` still asserts the pre-rewrite thesis; `evidence.md:12` the forthcoming-customers claim. See BLOCKING 5. |
| §6/64 | Title is a name plus a colon explainer | **STILL OPEN** | `index.md:1`, all three script H1s, `README.md:57`, `packet.md:9`. See Part B.3. |
| §2.6 | No joke, no memorable number | **JOKES FIXED** | ~8 laugh lines now (`:194`, `:198`, `:218`, `:242`, `:244`). Number: see Part B.4. |
| §2.11 | Two audience moments in 40 minutes | **FIXED** | Seven now (slides 4, 7, 11, 13, 14, 15, 16). |
| Cruft | `outlines/product-engineering-{15,30}min.md` stubs | **FIXED, no dangling links** | `outlines/` no longer exists; only the two audit files reference the paths, historically. `README.md:129` records the removal. |
| Edit 15 | `formats.md` workshop slide numbers | **REGRESSED** | Table was not renumbered for the 17-slide arc: `formats.md:44` "Slide 14. Write the hypothesis and the automatic report" (slide 14 is now the fuel prediction; hypothesis is 16) and `formats.md:45` "Close \| Slide 15" (the close is 17). |

## 2. Arithmetic — recomputed

```
Graicunas n(2^(n-1) + n - 1):  1, 6, 18, 44, 100, 222, 490, 1080
  n=6 → 6 × (32 + 5) = 6 × 37 = 222        ✓ index.md:191, :196, :200
  misparse n·2^(n-1) + n − 1 → 6·32 + 5 = 197   (the 6 Sept hazard; now closed)
70 + 22 + 8 = 100                          ✓ evidence-bank.md:72
```

**40-minute timings** (`index.md`, `bullets.md`, `script-40min.md`): 17 slides, contiguous, no gaps or overlaps, sum exactly 2400 s = 40:00. Slide 11 = 4:30. 30-route sums to 30:00 across 12 slides; 15-route to 15:00 across 8. All three route tables match their scripts slide-for-slide.

**Pacing** (spoken paragraphs + bridge lines; on-screen quotes, `Source:`, `Story:`, `Delivery:` and image alt excluded; demo slide 11 excluded from the route figure):

| Route | Words ex-demo | Minutes ex-demo | wpm | Band 41–77 |
| --- | --: | --: | --: | --- |
| 40 min | 2227 | 35.50 | **62.7** | pass, but the skill puts 40-minute routes "in the 40s and 50s" |
| 30 min | 1525 | 26.00 | **58.7** | pass |
| 15 min | 873 | 12.00 | **72.8** | pass |

Two slides break the band:

- `script-15min.md:84-97` slide 12 — **177 words in 2:00 = 88.5 wpm.** Above the skill's ~80 "not deliverable" line. Cause: the 65-word slide-12 bridge (`:97`) was bolted onto an unchanged slide-12 body when slide 14 was cut.
- `script-40min.md:222-238` slide 15 — **351 words in 4:30 = 78.0 wpm**, the densest slide in the canonical route and the one carrying the second prediction. It is also the landing arc.

17 slides in 40 minutes fits, and the arithmetic is clean. The density problem is local, not global.

## 3. Citation table

| Claim on slide | Source as cited | What the source actually supports | Verdict |
| --- | --- | --- | --- |
| `index.md:12` "are constrained to produce designs which are copies of the communication structures of these organizations" | Conway (1968), *Datamation*, April, 28–31 | Verbatim; melconway.com PDF 200. The extension to agent rosters is flagged as the speaker's argument. | **Correct** |
| `index.md:29` "Colfer and Baldwin reviewed 142 empirical studies" | Colfer & Baldwin (2016), *ICC* 25(5), 709–738 | Paper: "We were able to identify 142 separate studies … an extensive compilation of 103 studies published before and during 2009 and a supplementary compilation of 39 studies published since then." | **Correct** |
| `evidence-bank.md:72` "industry/firm descriptive subset shows 70% strong, 22% partial, and 8% no support" | same | §4.3, verbatim: "The descriptive studies of industries and firms showed that correlation … is a common pattern … **Over two-thirds (70%) of these studies provide strong evidence of mirroring; 22% provide partial support; while only 8% do not support the hypothesis.**" Subset attribution in the evidence bank is exactly right. | **VERIFIED** (the 6 Sept blocker is closed) |
| `index.md:29` "The open collaborative projects looked different" | same | "Here the majority of descriptive studies (56%) did not support the mirroring hypothesis." | **Correct, and under-stated** — 56% is a hard number the slide declines to use |
| `index.md:31` "firms can deliberately break the mirror through modular partitions or relationships across organizational boundaries" | same | Abstract: "Firms can 'break the mirror' by … creating modular partitions within their boundaries or by building relational contracts across their boundaries." Body: "strategic mirror-breaking can be a source of competitive advantage." | **Correct and directly sourced.** "Break the mirror" is the paper's own term, not a slogan bolted onto it |
| *(absent)* the paper's failure mode | same | "in 10 cases, unmirrored organizations performed poorly. The common thread linking the poor performers was **premature modularization**. These firms attempted to create modular organizations in response to new, supposedly modular technical architectures. However, they lacked knowledge of latent technical interdependencies." And: for dynamic industries the recommended strategy is **partial mirroring**, not mirror-breaking — "all firms that adopted this strategy performed well." | **MISSING — see BLOCKING 2** |
| `index.md:31` "MacCormack, Rusnak, and Baldwin also found differences in modularity across development arrangements … studies of association" | (2012) *Research Policy* 41(8), 1309–1324 | Correct venue/pages; HBS PDF 200. The association framing is what the paper supports. | **Correct** |
| `index.md:44-48` Coase, "the boundary depends on that comparison" / "That is the inversion" | Coase (1937), *Economica* 4(16), 386–405 | Coase's comparison is **firm vs market** — the boundary sits where the cost of organizing one more transaction internally equals the cost of using the price mechanism. The talk applies it to **departmental boundaries inside one firm**, which Coase does not address, and does not say which of the two costs fell. Read literally, a fall in *internal* coordination cost is Coase's argument for firms getting **larger and more integrated**, not for internal boundaries dissolving. `index.md:50` flags the application as the speaker's, which is the right hygiene but not an answer. | **Overreach as stated.** An economist would accept the transaction-cost *frame*; they would not accept "That is the inversion" without naming which cost moved. See BLOCKING 6 and Part B.6 |
| `index.md:148` Campbell, "the pressure that decision-making puts on quantitative indicators" | Campbell (1979), *E&PP* 2(1), 67–90 | Correct; DOI 200. Attribution avoids the Goodhart/Strathern phrasing. | **Correct** |
| `index.md:196` Graicunas, 222 | Graicunas, *Relationship in Organization*, reprinted 1937 | Formula and value confirmed (1, 6, 18, 44, 100, 222). Original paper is **1933**; the slide gives only the 1937 reprint and the spoken text gives no year at all, against the skill's "name the source, with year." Its use as a hard span-of-control limit was discredited long ago; `index.md:196` disclaims the staffing reading but never says *that*, which the 6 Sept review asked for. | **Correct, year thin** |
| `index.md:198` Bainbridge, "automation leaves monitoring and exceptional interventions while removing routine practice" | Bainbridge (1983), *Ironies of automation* | Confirmed: *Automatica* 19(6), 775–779, DOI 10.1016/0005-1098(83)90046-8. Volume/pages **still omitted** on the slide where four sibling talks include them. | **Correct, citation incomplete** |
| `index.md:83` "the name people use for" the inverse Conway manoeuvre | Thoughtworks Radar, 2014/2015 | Correctly hedged as popularization, not coinage. URL 200. Team Topologies interaction modes URL 200. | **Correct** |
| `index.md:263` hypothesis-before-experiment | Microsoft ExP (2020) | URL 403 to scripts (bot block, not dead). Year consistent with `evidence.md:8`. | **Unverified this pass — open manually** |

Link status: melconway 200, nickols 200, Campbell DOI 200, Thoughtworks 200, Team Topologies 200. 403 (publisher bot blocks, not breakage): ICC DOI, Wiley/Coase, ScienceDirect/Bainbridge, Microsoft.

**"Break the mirror" is defensible** — it is the source paper's own term for a strategy it documents as a competitive advantage. The prescription is not a misreading. What is missing is the same paper's documented cost of doing it wrong.

## BLOCKING

**1. The demo overruns every route, and three files still carry the old durations.**

`demo.md:5`: "**Duration:** 5:00 in the 30- and 40-minute routes; 3:30 in the 15-minute route."
`contracts.md:9`: "The sequence gets **5:00 for 40/30 and 3:30 for 15**."
`formats.md:9-11`: "15 min … Slide 11, **3:30** … 30 min … Slide 11, **5:00** … 40 min … Slide 11, **5:00**".

Against: `index.md:158` 18:00–22:30 = **4:30**; `adaptation-30min.md:15,20` **4:00**; `adaptation-15min.md:11,16` **3:00**; `CFP.md:7` "4:30 in the 40, 4:00 in the 30 and 3:00 in the 15"; all three scripts agree with the adaptations. Worse than a label mismatch: `demo.md:21-30`'s stage sequence is a seven-row table running 0:00 → 5:00, and its last row — `demo.md:30` "Ask the room to write the rule it needed" — is the beat the scripts call for ("Allow 45 seconds to write the rule," `script-40min.md:170`). **The presenter performing the runbook is 30 s over in the 40, 60 s over in the 30, 30 s over in the 15.** Also `demo.md:32` lightning says 3:30 where `formats.md:22` allots 2:30.

Fix: 4:30 / 4:00 / 3:00 everywhere; rewrite `demo.md:21-30` to a 4:30 sequence (compress 2:30–3:15 and 3:15–4:15 into one 2:30–3:45 row), delete the blank line at `demo.md:29`, and set the lightning row to 2:30 in both files.

**2. The talk cites Colfer & Baldwin for permission to break the mirror and omits the failure mode the same paper documents.**

`index.md:31`: "Their useful finding is that firms can deliberately break the mirror through modular partitions or relationships across organizational boundaries."

The paper's normative results also contain: "in 10 cases, unmirrored organizations performed poorly. The common thread linking the poor performers was premature modularization … they lacked knowledge of latent technical interdependencies." And its actual recommendation for technologically dynamic settings is *partial* mirroring — knowledge boundaries drawn wider than operational boundaries — of which it says "all firms that adopted this strategy performed well." A talk whose title is the imperative form of this paper's term cannot leave out the ten firms that did it and lost. This is also the single sentence that disarms the row-three researcher (Part B.6).

Fix, one sentence on slide 2 after `:31`: "The same table counts ten firms that broke the mirror on an architecture they had not understood yet — premature modularization — and every one of them underperformed. Break the mirror where you know the dependencies. Widen the knowledge boundary where you don't."

**3. The 15-minute route says "the channel is not spoken for" to a room that was never told what the channel is.**

`script-15min.md:3`: "Slide 14 is cut; its fuel prediction **and slide 15's channel question** both ride in the slide-12 bridge."
`script-15min.md:97` (the bridge, verbatim): "Bridge: ownership consumes attention, and it is about to consume fuel. Two predictions close this talk … The first: tokens stop being a build cost and become a running cost, defensive agents run forever, and the ongoing burn belongs in the design doc beside the latency budget, with an owner who is not whoever wrote the prompt."

The bridge carries the fuel prediction only. The channel question — `index.md:240` "Should OpenAI and Anthropic end up owning every software channel?" — is dropped from the 15's slide 15 body entirely. Yet `script-15min.md:105` still shows **"The channel is not spoken for"** on screen and `:111` still says "That future is not spoken for." The header claims a bridge that does not exist. This is precisely the cut-slide rule in the skill: "a cut slide 14 leaves 'Second prediction' on slide 15 pointing at nothing, and the fix belongs in the preceding bridge."

Fix: add one clause to the `:97` bridge — "…and the second is about who ends up owning the channel all that software reaches you through." (`adaptation-15min.md:16` needs the same correction.) This compounds with BLOCKING 4.

**4. The 15-minute slide 12 is 88.5 wpm — over the deliverable ceiling.**

`script-15min.md:84-97`: 177 spoken words in a 2:00 slot. The skill: "Anything above ~80 is not deliverable and means the route was never retimed after the slide was rewritten." The body (`:91-95`) is unchanged from the 40 while a 65-word bridge was added on top. Note the fix for BLOCKING 3 makes it worse, not better.

Fix: split the canonical slide 12 in `index.md` so the 15 can drop the infrastructure paragraph (`index.md:183` "Widening a cohort spends more customer exposure … Name the budget, the owner, and the evidence needed at each crossing") rather than compressing it — the skill's rule that a fused paragraph must be split upstream, not deleted downstream. Then 15-route slide 12 is ~110 words in 2:00 = 55 wpm with the extended bridge.

**5. `evidence.md` still asserts the thesis the packet forbids restoring.**

`evidence.md:11`: "**Every function of a product group can be mimicked as an agent with a human owner;** guards belong where risk spikes."
`packet.md:68`: "do not restore the former one-agent-per-function thesis."
`index.md:48`: "Do not start with one agent per box on the current org chart."

The talk's evidence register contradicts the talk. `evidence.md:12` likewise still logs "Customers become more forthcoming once they see a response to their feedback," which appears on no slide. Also `README.md:102` still describes this talk's question as "**Which functions of my product group become agents**, who owns each one, and where do the guards go?" — the pre-rewrite framing, in the portfolio index, two lines from `README.md:141`'s correct "Product Engineering reprices coordination and defines interfaces."

Fix: rewrite `evidence.md:11` to "Repricing a handoff and specifying its artifact contract is a proposed operating model, not a measured result"; delete `:12`; rewrite `README.md:102` to "Which handoffs still earn their coordination cost, who owns each interface, and where do the guards go?"

**6. "That is the inversion" borrows Coase's authority without naming which cost fell.**

`index.md:48`: "That is the inversion. Do not start with one agent per box on the current org chart. Start with the outcome and price the handoffs again."

Coase's comparison is firm-vs-market and his comparative static runs the other way for the case the talk is making: cheaper *internal* coordination predicts more internalization, i.e. bigger firms and *more* boundaries absorbed, not fewer. The talk needs one sentence saying what actually got cheaper — collecting, translating and transmitting evidence across a handoff — because that is a cost the handoff was buying, and it is the version an economist signs off on.

Fix, replacing the first sentence of `index.md:48`: "The cost that moved is not the cost of deciding. It is the cost of collecting the evidence and carrying it across — which is most of what the handoff was for. That is the inversion."

## SHARPEN

1. **`index.md:168` — cut the sentence on the peak slide.** "These point estimates have no sample size or uncertainty behind them; our opening scope statement matters here." The 6 Sept audit asked for this and it is still there, in the four seconds after the reveal, which is the only silence the talk earns. "It is not shipped." already lands it. (Hedge #1 past the allowance.)
2. **`index.md:135` — second hedge past the allowance.** "Narrow feedback tells us what to try next; it does not establish a causal improvement." → "Narrow feedback tells us what to try next. That is all it tells us."
3. **`index.md:29` — an orphaned rebuttal.** "Do not turn that into a claim that one third of companies broke Conway's law." Nothing on the slide mentions a third; the figure was removed with the percentages. The room hears a correction to a claim it never heard. If BLOCKING 3 is taken (restore 70/22/8), the sentence works again, because 22+8 ≈ a third. Otherwise delete it.
4. **`index.md:29` — a note-to-self became a line of the talk.** "Read the split off their table before you quote a percentage at anyone." This was the 6 Sept audit's instruction to Dan. It is now spoken to the audience, and it is the only sentence in the talk that tells the room to go check a table instead of telling them what is in it.
5. **`index.md:202` — Bainbridge citation.** Add "Automatica 19(6), 775–779" (verified). Add Graicunas 1933 as the original year.
6. **`index.md:196` — 27 words of spoken algebra before the number.** "His maximum counting formula is n times the quantity two-to-the-n-minus-one plus n-minus-one." Unambiguous now, but a room cannot hold it. Drop the general form; keep only "Six agents. Two to the fifth is thirty-two, plus five is thirty-seven, times six: two hundred and twenty-two."
7. **`formats.md:44-45` — workshop table not renumbered.** "Slide 14. Write the hypothesis" (14 is the fuel prediction; 16 is the hypothesis); "Close | Slide 15" (17 is the close).
8. **`formats.md:23,27,38` — "roster" survives three times** in a talk whose slide 5 says "An agent roster without these wires is a seating plan."
9. **`formats.md:3` vs `:5`** — "deck not yet rebuilt" then "Current PowerPoint editions are linked above." Nothing is linked above.
10. **`packet.md:9-12` — title block.** Primary is still the panel label; `packet.md:11` still carries the banned "Your Org Chart Is a Fossil of Coordination Cost". Same formula survives as the slide 3 heading, `index.md:37`.
11. **`evidence-bank.md:53-66`** — two stale slide names and a story-slot table that maps slide 11 (the demo) to "The customer who became a collaborator". `:70` already carries the correct map (1, 6, 9). Delete `:53-66`.
12. **Shorts disagree on the parent's name.** `shorts/dont-photocopy-the-org-chart.md:3` "parent: Break the Mirror on Purpose"; `shorts/software-runs-on-petrol.md:3` and `shorts/minority-report-with-terminals.md:3` "parent: The Future of Product Engineering". One rename pass, after the title decision.
13. **`bullets.md:36`** — mangled bullet: `- " Constrained. Communication structures.` (stray leading quote, truncated).
14. **`index.md:278` — no "Stop talking."** The skill's stage direction for a landing; the 6 Sept audit asked for it.
15. **Story slots.** Three, all named and unfilled (`index.md:18`, `:98`, `:139`), plus a fourth on slide 14 (`:222`). Correct handling. Nothing invented anywhere — no org-change result is presented as Dan's own. The one first-person claim (`index.md:107` "I have not heard an engineering team discuss level of effort on a ticket in months") is flagged on screen as "My observation, not your sprint report" and gated by a stage direction requiring reconfirmation. Clean.

**Counts.** Hedges/scope disclaimers: **one allowed** (`index.md:14`, slide 1) + **three legitimate set-asides** (`:29`, `:31`, `:196`) + **the required prediction label** (`:214`) + **two over the line** (`:135`, `:168`). Jokes: **eight**, all in the back half except `:81` — `:194` "Somehow you own four of them and are on call for all six", `:198` "a forwarding address for blame", `:218` "They have read all of your commits", `:242` "Skynet is not so bad if I get to keep my CLIs", `:244` "the organic agents in the room", `:81` "a seating plan", `:63` "the suffering arrives later than the speed does", `:137` "responding is a one-time event". The 6 Sept "zero jokes" finding is closed, but the first laugh is at 08:00.

## Part B — the ceiling

### 1. The better talk inside this one

The Coase inversion is **announced and abandoned**. It occupies exactly one slide. `index.md:48` "That is the inversion" is the last time a price is mentioned until `index.md:274` "what did it cost last week?" — thirty-one minutes later. In between, slides 5 through 9 are a tour of an agent roster in which nothing is priced, nothing is compared against what it replaced, and nothing fails. That is the shape the 6 Sept review diagnosed and it survived the rewrite in compressed form.

The evidence that this is a tour and not an argument: slide 6 says "Both preserve the evidence behind their summaries" (`:92`); slide 8 says "Each proposal carries the screenshot, the attempted task, and the reason the current page got in the way" (`:120`). Same rule, twice, four minutes apart. And slide 9 says "A person approves the message and the recipients" (`:135`) while slide 12 says "Sending a message to a real customer … A person approves them, and the system enforces that permission" (`:185`) — **the identical rule, eight minutes apart, and the second one is delivered as a discovery** ("Then add the two missing from the old list").

**The 20% reorder.** Three merges, no new slides:

- **6 + 8 → one slide.** "Two directions of attention, and what each one has to hand over." Keeps the research/feedback disagreement (the actual argument) and the build-walking agent as its third example. Saves ~1:30.
- **9 → the front of 12.** Beta enrollment *is* the customer-consequence guard; the talk already says so twice. Delivering it as one slide makes slide 12 an argument instead of a list. Saves ~1:15.
- **Move the price question from 17 to 5.** `index.md:274` "What arrives, what leaves, who decides, **and what did it cost last week?**" is the best sentence in the talk and it is in the last two minutes as a homework prompt. Put it on slide 5, applied live to one of the three wires. Then Coase runs through the middle instead of being a citation on slide 3.

Net: 17 slides → 15, ~2:45 freed, and the spine is repriced coordination all the way down instead of at both ends.

### 2. The thesis line

**There isn't one.** Slide 1's visible lines are `index.md:9-10`: "Conway, 1968: communication structures constrain designs / Which of those boundaries still earns its keep?" — a citation and a question. The skill requires a load-bearing statement under the title on slide 1 that returns, shortened, as the landing. Free Tier has one; this talk has a slogan ("Automate the right things. Keep the taste.") doing the landing job with no statement behind it — which is why the slogan has to appear three times (`:63`, `:270`, `:278`) to feel load-bearing.

Three candidates in the reversal shape, second person, one breath:

1. **"You think you're designing the agents; your org chart already did."** — the object becomes the subject, exactly the *"worry how it's training you"* move.
2. **"Don't ask which jobs the agents take, ask which handoffs they're keeping alive."**
3. **"Your org chart isn't describing your company, it's writing your software."**

(1) is the one. It reverses the agency, it is sayable in one breath, and shortened to "Your org chart already designed them" it is a landing line.

### 3. The title

"The Future of Product Engineering: Break the Mirror on Purpose" is a category label + colon + explainer — the skill's explicit reject, and the 6 Sept audit's finding, unmoved. Test the halves:

- **"The Future of Product Engineering"** — fails hard. It is a panel slot, not a name; it promises the audience news about *their careers* and delivers an operating model; and it survives only because it is what `packet.md:9` calls "Primary" and what two of the three shorts point at.
- **"Break the Mirror on Purpose"** — five words, imperative-verdict, one joke, and it is the source paper's own term of art ("strategic mirror-breaking"), so it is a hijack rather than a coinage. Passes the bar test. Its one weakness: "mirror" needs slide 2 to decode, so it names the talk without previewing it — which is what the skill asks a title to do.

**Recommendation: `Break the Mirror on Purpose` becomes the title everywhere** — `index.md:1`, three script H1s, `packet.md:9`, `README.md:57`, both stray shorts. "The future of product engineering" goes in the description field, where it is honest CFP copy.

Two further alternatives:
- **`Conway's Photocopier`** — proper-noun protagonist, immediately legible with no setup, and already named as `shorts/dont-photocopy-the-org-chart.md:1`. The skill says once named, use the name everywhere. The cost: it names the *problem*, and the talk's prescription is the interesting half.
- **`Six Agents, 222 Relationships`** — parenthetical-stinger shape with the hallway number in the title. Names slide 13, not the spine, so it is a lightning-route title.

### 4. The hallway number

222 is stated, printed (`index.md:191`), and computed on stage (`:200` "Do 6 × (32 + 5) aloud") — the skill's rule is satisfied. But it is **disclaimed to death**: "This is combinatorics, not a staffing limit. It does not mean your six agents generate 222 meetings" (`:196`). By the time the room could repeat it, the talk has told them twice that it doesn't mean anything. And Graicunas's own use of it — as a span-of-control limit — was discredited, which the 6 Sept review asked the talk to say out loud and it does not.

Two better candidates are sitting unused:

- **70 / 22 / 8.** Now verified from §4.3 of the paper. "Seventy percent of the studies found the mirror. Twenty-two percent found half of it. Eight percent didn't find it at all — and that eight percent is the interesting bit, because those are people who broke it on purpose." That is checkable, portable, and it is the number that makes the *title* true. The talk currently owns this number in its evidence bank and refuses to say it.
- **The fuel number that does not exist.** Slide 14 is the biggest claim in the talk and carries **zero arithmetic**. Worse, `index.md:220` explicitly outsources it: "Buy Me a Free Tier owns the arithmetic; this org chart owns the owner." A prediction that software will burn a permanent token stream needs one number a room can put in a budget — a defensive agent at a daily rate, times 365, on a product with no new features. Without it, the strongest slide in the talk is the least checkable one, in a portfolio whose whole discipline is doing arithmetic on stage.

### 5. The peak

Slide 11, 18:00–22:30, marked `peak` in `index.md:158` and `bullets.md:19`. The fixture leak is genuinely fixed — `contracts.md:9` hides the candidate names and `index.md:150` says "Do not reverse-engineer the answer from the names; they are A, B, and C."

**But the answer moved to the previous slide's title.** Slide 10 is called "Campbell's law arrives on schedule" (`index.md:141`) and its on-screen lines are "Activation is the target / **What behavior did we just pay for?**" (`:145-146`), followed by "The interesting question is what the winning candidate did to earn the number" (`:152`). Ninety seconds before the vote, the room has been told the name of the law about gaming metrics and asked what behaviour they just paid for. Nobody in that room votes for B. The vote is a compliance test, and the reveal confirms what the previous slide announced.

**The fix is one line and it is the highest-value change in the talk.** Retitle slide 10 to something that sets a target without naming the trap — "Pick the number you're going to be judged on" — replace the second visible line with something flat ("Ship Friday. Which one?"), take the vote, reveal, *then* name Campbell on slide 12 as the label for what the room just did. Same content, same citation, the reversal becomes a reversal. Cost: zero minutes.

### 6. The hostile expert

The obvious attack — *"Conway's law is descriptive, you're prescribing against it"* — **fails**, and that is to the talk's credit. Slide 2 exists precisely to absorb it: `index.md:33` "So the org chart is evidence about why the software looks like this. It is not an instruction to make the next system look identical," plus `:31`'s "studies of association … not a randomized trial."

The two attacks that land:

**(a) The economist.** "Coase's boundary is between the firm and the market. Cheaper internal coordination is, in Coase's own comparative static, an argument for firms getting *bigger* — internalizing more, not dissolving internal boundaries. You've used him to argue for the opposite of his result, and you never say which cost fell." This is BLOCKING 6. The talk survives with one sentence naming the cost that moved (evidence collection and transmission across a handoff), which is true and is Coase-compatible.

**(b) The org-design researcher, and this one is sharper.** "You put 'break the mirror' in the title and cited Colfer and Baldwin for it. Their normative table also contains ten firms that broke the mirror on an architecture whose latent dependencies they hadn't mapped — premature modularization — and all ten underperformed. And their actual recommendation for dynamic industries isn't mirror-breaking, it's *partial* mirroring, where every firm that tried it performed well. You cited the permission and skipped the warning."

The talk does **not** survive that as written. It survives with the inoculation, and per the skill's "cited to set aside" move it should be Dan who raises it:

> **"Ten firms in that same table broke the mirror on an architecture they hadn't mapped yet. Premature modularization. All ten underperformed. So: break it where you know the dependencies, and widen the knowledge boundary where you don't."**

One sentence, on slide 2, and it converts the strongest attack in the room into the talk's most credible thirty seconds.

### 7. The predictions

**Labelling: correct.** `index.md:214` "Two predictions to close on, and I will label them as predictions once: this is where I think the operating model goes, not something I have measured." Slide 15's `:236` "Second prediction" is a pointer, not a second hedge. Both 30- and 15-minute bridges carry the same single label (`script-30min.md:161`, `script-15min.md:97`). Clean.

**Prediction two lands on opportunity, not doom — confirmed.** The doom is real and stated (`index.md:240` "So is everything you spent a lifetime mastering about to be irrelevant? Yes. At least as you know it.") but it is not the payload. The payload is `index.md:244`: "That future is not spoken for. GPT image being pretty good does not mean image creation belongs to the big players … Those of us who do not work at a frontier lab — the organic agents in the room — get to rethink any and every app as an AI-native system, from the boundary up." It is the last substantive paragraph, it is preserved verbatim in both short routes, and the stage direction after it (`:246`, "Take one answer. Do not resolve it.") leaves it open rather than closing on the doom. **No drift.**

**Falsifiability: neither prediction has a date or a condition.** "Before long most software will need a steady stream of them" (`:214`) and "What replaces it looks less like a grid of apps" (`:242`) cannot be wrong. A prediction the speaker cannot lose is not worth the four minutes. Proposed falsifiers, one line each, in his register:

- **P1:** "Here's how you'll know I was wrong. It's 2029, you ship a maintained SaaS product, and its monthly inference bill is still under one percent of what you pay to host it. Then this was a fuel line nobody needed."
- **P2:** "Here's how you'll know I was wrong. It's 2031 and the top twenty apps by daily use are still twenty apps, and you still chose every one of them off a shelf."

Both are checkable by someone in the room, both are things Dan would actually concede, and both make the predictions worth making rather than worth nodding at.

### 8. Dead weight

**Slide 8, "Gap analysis, past engineering" (12:45–14:30, 1:45).** Its first rule duplicates slide 6's (`:120` vs `:92`, both "carry the evidence with the summary"). Its second paragraph — the permission-hidden screenshot — is genuinely good and belongs, as three sentences, inside the merged slide 6. Its third paragraph (`:124` "Analytics, warehouse queries and marketing drafts feed the same queue") is the growth-operations residue the 6 Sept review told him to cut (§2.7); it survived compressed but intact, and it is the only place in the talk where a warehouse appears.

**Cut buys 1:45.** Folding slide 9's approval sentence into slide 12 buys another ~1:15. Spend the 3:00 on: slide 15 (currently 78.0 wpm, the densest slide in the talk), the fuel arithmetic (Part B.4), and 20 seconds of silence after the reveal on slide 11.

### 9. The landing

`index.md:278`, verbatim: "You are allowed to make new ones, and the channel is not spoken for yet. **Break the mirror on purpose. Automate the right things. Keep the taste.**"

Three short declaratives — right register, right length. Two problems. First, "Automate the right things. Keep the taste." has already been said twice (`:63`, and it is printed on the same slide at `:270`), so the room reads it on the screen and then hears it, and by the third delivery it is a slogan rather than a landing. Second, there is **no "Stop talking." stage direction** — the skill's requirement, and the 6 Sept audit's edit that did not land.

Recommendation: end on the title line alone. "…and the channel is not spoken for yet. **Break the mirror on purpose.**" *Stage direction: Stop talking.* The slogan stays on the screen at `:270`, where it does its work without competing with the last thing the room hears.

## What I could not verify

- **Microsoft ExP (2020)** pre-experiment article — microsoft.com returns 403 to scripts (bot block, not a dead link). Year is internally consistent (`index.md:263`, `evidence.md:8`, `evidence-bank.md:72`). Open manually before delivery.
- **Coase, Bainbridge, Colfer & Baldwin publisher pages** return 403 to scripts. Bibliographic details confirmed independently (Bainbridge: *Automatica* 19(6), 775–779, DOI 10.1016/0005-1098(83)90046-8; Colfer & Baldwin: full text obtained via HBS and read directly, §4.3 quoted above; Coase: *Economica* 4(16), 386–405 unchanged from the 6 Sept check).
- **Graicunas's original 1933 publication** — verified through Nickols' reprint and secondary sources; I did not see a 1933 primary scan. The 1937 *Papers on the Science of Administration* reprint the slide cites is real and the table matches.
- **`index.md:107`** "I have not heard an engineering team discuss level of effort on a ticket in months" — Dan's own observation, correctly gated by `:111`. Not verifiable by me and should not be.
- **Deck state.** `packet.md:3` and `formats.md:3` say "deck not yet rebuilt"; `artifacts/decks/` contains only a README. I could not check outline-to-deck fidelity because there is no deck.
