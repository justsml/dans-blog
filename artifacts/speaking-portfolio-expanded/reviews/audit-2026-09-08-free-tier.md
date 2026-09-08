# Audit: Buy Me a Free Tier (free-tier) — 8 September 2026

Audited against `talks/free-tier/index.md` (canonical) and every other file in the folder, the prior audit `reviews/audit-free-tier.md`, the roll-up `reviews/AUDIT-2026-09-06.md`, `README.md`, `talks/README.md`, the five child shorts, and live checks of every dated vendor item. No talk files were edited. Held to the reference-standard bar, since the other nine reviews were written against this talk.

## Verdict

**Not ready. Seven blocking items.** The economics is sound, the arithmetic is exactly right in every place I could check it, every citation resolves and supports what it is attached to, and the prior audit's headline arithmetic bug is genuinely fixed. But the talk's opening number is attributed to the wrong year, its second number is off by 80%, its central organising device (the eight words) does not add up on stage, the 40-minute route is undeliverable once you subtract its own audience exercises, and the sixty-minute workshop is a ninety-five-minute workshop. Most importantly: **the portfolio's one known-good thesis statement — "Don't fear training the model, worry how it's training you" — appears nowhere in this talk, and the reward-schedule frame the voice skill says this talk moved to was never built.** The talk is still entirely parking-lot framed. That is not a fix list; it is the twenty-percent reorder in Part B.

## Status vs. prior audit (2026-09-06)

Only items not cleanly fixed are listed, plus the three prior blockers for the record.

| Prior finding | Status |
| --- | --- |
| B1: slide 13 "$10" where 10× arithmetic gives $100 | **FIXED.** `index.md:265` / `script-40min.md:237`: "At a thousand attempts it is a hundred dollars — ten at today's price, and you should never do it." Both figures now on stage. Recomputed: 1,000 × $0.10 = $100; 1,000 × $0.01 = $10. Correct. |
| B2: slide 2 heading said "three" above four boxes | **FIXED.** `index.md:38` "Four boxes, one invoice". |
| B3: deck index regeneration | **OBSOLETE** (generators and PPTX removed 7 Sept) but leaves residue — see BLOCKING 6. |
| 15-min trims orphaned the four explanations / the spend equation / "Eight words" | **FIXED** by hand-rewrite: `script-15min.md:37` names all four, `:67` speaks the equation, `:20` sets up "Eight words." |
| 15-min "leave the sweep table up" orphan | **STILL OPEN.** `script-15min.md:134` "For questions, jump back to the sweep table if this route kept slide 11." Slide 11 is not in this route; the direction resolves to nothing and the 15-min route has no Q&A fallback at all. |
| "the next three slides" | **FIXED.** `index.md:249` "everything after this". |
| demo.md "slide 9" → 11 | **FIXED** (`demo.md:5`) but the same line now dangles on deleted tooling — see BLOCKING 6. |
| Voice: slide-10 "Your X Is a Y", slides 4/11/13 headings | **FIXED.** "Doubling on a Tuesday", "Burn the boats", "Turn the dial", "Reversible is a line item". |
| Slide-11 visible caveat trimmed | **FIXED.** `index.md:217` "Sensitivity, not prediction." |
| Abstract word counts | **FIXED.** packet 50/100/250 exact; CFP 50/150 exact. One residual: packet's "(100 words each)" audience abstracts run 99/100/99/**103** (`packet.md:86-88`). NIT. |
| `dans-voice/SKILL.md:16` cites retired title | **FIXED** centrally. |
| Retired title "Cry Me a Free Tier" purged portfolio-wide | **REGRESSED at a new location.** `talks/README.md:16` — see BLOCKING 5. |
| Anthropic/AWS $100B "may move with the late-September prospectus" | **STILL OPEN, window now live** — see stale-claims table. |

## Stale-claims table (checked 2026-09-08)

| Claim | As written | Today | Verdict |
| --- | --- | --- | --- |
| Average US ticket price 2017 | `index.md:19` "Average US ticket that year: $9.11"; `:32` cites it to "the National Association of Theatre Owners annual average" | NATO 2017 average = **$8.97**. $9.11 is NATO's **2018** average. | **WRONG YEAR. Blocking.** |
| MoviePass growth | `index.md:24` "Twenty thousand subscribers became three million in eighteen months" | ~20,000 in Aug 2017 → 3M announced June 2018 = **ten months**. (400k Sept 2017, 1M Dec 2017, 2M Feb 2018, 3M June 2018.) | **WRONG, and it undersells.** Blocking. |
| May 2018 loss | `index.md:24` "May 2018 lost forty million dollars in that month alone" | Helios & Matheson SEC filings: baseline burn ~$21.7M/month, **~$40M in May 2018**. | Supported. Precisely it is cash burn, not accounting loss. NIT. |
| MoviePass shutdown | `index.md:24` "By September 2019 it was gone" | Service ceased 14 Sept 2019. But MoviePass **relaunched in 2022** and operates today on a credit-balance plan. | Supported as written about the $9.95 unlimited product; exposed to a Q&A gotcha. SHARPEN. |
| FTC: 75,000 heaviest users | `index.md:68` "passwords invalidated for the seventy-five thousand heaviest users under a false fraud claim" | FTC complaint / FTC business blog: MoviePass "invalidated the passwords of the 75,000 subscribers who used the service most often while falsely claiming … 'suspicious activity or potential fraud'". | Figure and conduct supported. Framing is not — see SHARPEN 1. |
| Microsoft/OpenAI $250B | `index.md:80` "$250B incremental Azure services contracted by OpenAI · Microsoft, 28 Oct 2025" | Page live, verbatim: "OpenAI has contracted to purchase an incremental $250B of Azure services". | **Still current.** Adjacent figure to avoid: "approximately $135 billion, representing roughly 27 percent". |
| Amazon/Anthropic $100B | `index.md:81` "More than $100B AWS commitment over ten years · Amazon, 20 Apr 2026" | Page live, verbatim: "commitment from Anthropic to spend more than $100 billion over the next ten years on AWS technologies". Also on the page: $5B now + up to $20B more, atop $8B prior. | **Still current.** |
| AWS Activate credits | `index.md:82` "Up to $200K AWS Activate credits · offer checked 5 Sep 2026" | Page live: "Up to $200,000 USD in Activate Credits" (Activate Portfolio Pre-Series B). Also now a separate invitation-only "AWS Credits for AI Startups — $200,000+". | **Still current.** Update the checked date to 2026-09-08. |
| Anthropic IPO risk note | `index.md:94` / `evidence-bank.md:83` "Anthropic's IPO prospectus is expected late September 2026" | Confidential draft S-1 filed **1 June 2026**; reporting says the public prospectus was expected **after Labor Day** (7 Sept), listing late Sept–Oct; amended S-1 must be public ≥15 days before institutional marketing. As of today **no public prospectus has been filed**. | **Figure has not moved. Window is now open, not "late September."** Update the note; recheck EDGAR the morning of any delivery. |
| Epoch AI inference prices | `index.md:128` "Epoch's data through 2025"; source line dated March 2025 | Page unchanged: "Mar. 12, 2025", same four authors, latest datapoint **Feb 2025**. | Citation accurate. But it is now **18 months old** in a talk about a fast-moving price. SHARPEN. |
| Cinema subscriptions today | `index.md:295` "AMC, Regal, Cinemark, millions of subscribers" | All three programmes operate in 2026 (AMC A-List 3/week, Regal Unlimited uncapped, Cinemark Movie Club). Last public A-List figure is ~860,000 (2019); Regal and Cinemark do not break out membership. | Programmes verified. **"Millions" is not publicly documented.** SHARPEN. |

## BLOCKING

**1. The first number on the first slide is attributed to the wrong year.**
`index.md:19`, `script-40min.md:9`, `script-30min.md:9`, `script-15min.md:9`, `bullets.md:31`, `packet.md:24`, `CFP.md:17`, `formats.md:21`:
> "August 2017: one movie a day, $9.95 a month. Average US ticket that year: $9.11."

and the source line `index.md:32`:
> "Average US ticket price $9.11 (2017) is the National Association of Theatre Owners annual average."

NATO's 2017 annual average was **$8.97** (up 3.7% from $8.65 in 2016). **$9.11 is the 2018 figure.** The talk names the source and the year, which is exactly what makes the error catchable — and it is on the slide where the audience is invited to do arithmetic in its head.

Fix, eight files: "$9.11" → **"$8.97"**, and `index.md:32` → "Average US ticket price $8.97 (2017) is the National Association of Theatre Owners annual average." The point gets stronger: $9.95 buys 1.11 tickets, not 1.09.

**2. "Eighteen months" is ten months.**
`index.md:24` and the same sentence in all three scripts and `bullets.md:35`:
> "Twenty thousand subscribers became three million in eighteen months."

The $9.95 price landed 15 Aug 2017 at ~20,000 subscribers; MoviePass announced 3 million in **June 2018**. Ten months. Along the way: 400k (Sept 2017), 1M (Dec 2017), 2M (Feb 2018).

Fix: **"in ten months."** This is a rare correction that improves the story — a 150× subscriber run in under a year is a better setup for "pay for one movie, see thirty" than eighteen months is.

**3. The eight words do not add up on stage.**
Numbered aloud: 1 externality (`:104`), 2 Jevons paradox (`:124`), 3 induced demand (`:126`), 4 path dependence (`:162`), 5 moral hazard (`:177`), **6 asset specificity and 7 hold-up** (`:239`), 8 real option (`:257`).

Listed back on slide 15 (`:291-292`):
> "Externality · Induced demand · Jevons paradox · Path dependence
> Moral hazard · **Credible commitment** · Asset specificity · Real option"

**Credible commitment is on the recap list but is never given a number.** `index.md:86` introduces it as "the word" without a count. **Hold-up is numbered word seven and is absent from the recap.** The canonical file's own header (`index.md:9`) sides with the recap and omits hold-up. So the room that is counting — and this talk explicitly asks it to count, `:30` "Eight words." — arrives at slide 15 with a list that does not match what it heard.

Fix (cheapest, preserves both slides): on `index.md:86` add the number — "Thomas Schelling gave us word six in 1960: a credible commitment." Then `index.md:239` becomes "**Word seven: asset specificity.** Hold-up is what it lets your counterparty do." and `:257` "Word eight: real option" is unchanged. Propagates to all three scripts and `bullets.md:182`.

**4. The 40-minute route is undeliverable once its own audience exercises are subtracted; the header undercounts them.**
`index.md:5`:
> "40 minutes, 15 slides, **four audience moments**, no Q&A."

There are **six**: show of hands on slide 2 (`:53`), slide 7 (`:153`), slide 9 (`:191`); timed exercises on slide 10 ("Thirty seconds", `:209`), slide 11 ("Ask for 45 seconds", `:231`), slide 14 ("45 seconds in pairs", `:283`).

Measured pacing (spoken paragraphs and bridge lines; slide 11 excluded as the demo slide):

| Route | Whole route | Excl. demo | Excl. demo **and** audience time |
| --- | --- | --- | --- |
| 40 min | 70.5 wpm | 75.5 wpm | **82.4 wpm** |
| 30 min | 69.3 wpm | 73.2 wpm | **79.9 wpm** |
| 15 min | **77.7 wpm** | 77.7 wpm | **82.2 wpm** |

The band is 41–77; above ~80 is not deliverable. All three routes cross 80 once the exercises the talk itself schedules come out of the clock. Worse, the skill puts 40-minute routes "in the 40s and 50s" — this one runs at 15-minute density for forty minutes. Per-slide offenders in the 40-min route: slide 3 at 85.8 wpm (236 words / 2:45), slide 9 at 85.6 (214 / 2:30), slide 15 at 84.4 (232 / 2:45). In the 15-min route: slide 15 at 82.9, slide 3 at 82.5, slide 10 at 81.5.

Fix: correct the header to "six audience moments", then buy the minutes back. BLOCKING because a 40-minute talk that needs 44 will land on the closing slide with the room already standing. The cut list is in Part B7 (slides 8 and 2 = 4:30, which is exactly the deficit).

**5. Route drift on the slide-11 exercise: the canonical file schedules 45 seconds that no script carries.**
`index.md:231`:
> "Stage direction: Walk the 1× and 10× rows, then change the acceptance assumption. **Ask for 45 seconds:** which assumption would you test before funding an optimization project?"

`script-40min.md:207` and `script-30min.md:173`:
> "Delivery: Walk the 1× and 10× rows, then change the acceptance assumption. **Ask which assumption the room would test** before funding an optimization project."

`bullets.md:176` matches the scripts. This is the exact failure the 6 Sept roll-up flagged in Judgment (§29, "the route header states a pair time the untrimmed body contradicts") — here it is index-vs-script, in the reference talk. The canonical file wins, so all three derived files are wrong and 45 seconds are unbudgeted. Fix the three derived files to carry "Ask for 45 seconds".

**6. `talks/README.md:16` still ships the retired title.**
> "| Cry Me a Free Tier | [Outline](free-tier/index.md) | not yet rebuilt |"

Retired 2026-09-06. This is the only surviving instance in the portfolio (I grepped; `dans-voice/SKILL.md:16` was fixed). Fix: "Buy Me a Free Tier".

**7. Three files point at demo tooling that no longer exists, and the 40-minute route reserves four minutes for it.**
- `demo.md:5` — "**Use the price sensitivity panel.** The 40-minute deck reserves slide 11 for this run."
- `formats.md:47` — "Slides 10 and 11 **with the kit**."
- `packet.md:55` — "**The calculator** is offline and vendor-free."

There is no `demos/` source directory anywhere in the repo (only a stale `dist/talks/demos/` build artifact from before the 7 Sept removal), and per the standing direction no demo kits should be rebuilt. So slide 11 — 4:00, 10% of the talk, labelled the peak, and carrying only 103 spoken words (25.8 wpm) — is a live-tool beat with no tool. `demo.md:42` already supplies the answer ("Keep the four-row table above as a local screenshot or use deck slide 11"), which means the fallback is the actual plan.

Fix: rewrite `demo.md:5` as "Duration: 4:00, walked off the slide-11 table; there is no interactive panel"; `formats.md:47` drop "with the kit"; `packet.md:55` "The calculator is offline and vendor-free" → "The sweep is a four-row table on a slide; no tool, no vendor data." Then shorten slide 11 (Part B5).

**8. The "sixty-minute workshop" is ninety-five minutes.**
`formats.md:36-50`. The block table runs 0:00–0:10, 0:10–0:22, 0:22–0:35, 0:35–0:45, 0:45–1:00, 1:00–1:15, 1:15–1:28, 1:28–1:35 = 10+12+13+10+15+15+13+7 = **95 minutes**. The slot table above it (`:14-15`) sells it as "60 minutes | Workshop below" and "75 minutes | Workshop plus 15-minute peer review" — which would be 110. A venue booking the 60 would be oversold by 35 minutes.

Fix: either retitle to "Ninety-five-minute workshop" and move the slot rows to 90/120, or cut the table to 60 (the facilitation note at `:52` already says the denominator block should run long and the specific-asset block should shrink — take that seriously and drop blocks 2 and 6 to 8 minutes each, blocks 3 and 5 to 10).

## SHARPEN

1. **The script states FTC allegations as findings; the evidence bank forbids exactly that.**
`index.md:68` (and both shorter scripts): "The FTC's 2021 complaint records what happened next: passwords invalidated for the seventy-five thousand heaviest users **under a false fraud claim**…"
`evidence-bank.md:23`: "settled **without admission of liability** and without monetary relief … **say 'alleged'** for the password and cap conduct."
Attribution to the complaint carries most of the weight, but "under a false fraud claim" asserts the falsity as established, and the source line names two living individuals (Lowe, Farnsworth). One word fixes it: "the FTC's 2021 complaint **alleges** what happened next: passwords invalidated … under **what the FTC calls** a false fraud claim."

2. **The Jevons on-screen line is literally false, and it is the sentence an economist will attack.**
`index.md:120`: "> 1865: better engines burned more coal, not less"
Better engines burned *less* coal per unit of work. *Britain* burned more coal in total. The spoken text (`:124`) gets this right; the slide does not, and the slide is what stays on screen. Fix: "**1865: better engines, less coal per unit — and far more coal.**"

3. **Jevons is presented as settled while QWERTY is carefully flagged as contested. That asymmetry is the strongest attack in the room.** See Part B6. The evidence bank has the caveat ("Not a law", `evidence-bank.md:13`); nothing says it on stage. One sentence, raised first, closes it.

4. **Slide 12 has no `Source:` line — the only concept slide without one, and it is the slide Dan says he would keep over all the others.**
`index.md:233-249`. Williamson is named in prose ("won a Nobel in 2009") but the file's own convention — a `Source:` line on slides 3, 4, 5, 6, 8, 9, 13 — is broken exactly where the talk is most exposed. Add: "Source: Williamson (1985), The Economic Institutions of Capitalism. Nobel 2009. Hold-up: Klein, Crawford and Alchian (1978), Vertical Integration, Appropriable Rents, and the Competitive Contracting Process, Journal of Law and Economics 21(2)." The Klein/Crawford/Alchian attribution matters: an economist will note that *hold-up* is theirs, not Williamson's.

5. **Epoch's data is 18 months old and the talk says so obliquely.**
`index.md:128` "Epoch's data through 2025" — the page is dated Mar. 12 2025 with a last datapoint of Feb 2025. In a talk whose premise is that prices move fast, citing an 18-month-old price series without saying so invites "is that still true?" Either say the date out loud ("Epoch's March 2025 series — the last one they published") or replace it.

6. **"Millions of subscribers" (slide 15, `:295`) is not documented.** The last public AMC A-List figure is ~860,000 (2019); Regal and Cinemark do not disclose. Drop the number: "Cinema subscriptions exist today and work — AMC, Regal, Cinemark." The names carry it.

7. **MoviePass is not gone.** `index.md:24` "By September 2019 it was gone." True of the $9.95 unlimited product; MoviePass relaunched in 2022 on a credit-balance plan and operates today. One word: "By September 2019 **the offer** was gone." It also sharpens slide 15, whose whole point is that the offer and the company are separable.

8. **The 15-minute route's slide-3 bridge dangles.**
`script-15min.md:49`: "Bridge: **those commitments** are Schelling moves in a war of attrition." Slide 4 is cut and slide 3 never mentions any commitments, so "those" has no antecedent. The 30-minute bridge does it correctly (`script-30min.md:64`: "the enormous compute commitments everyone quotes are Schelling commitments"). Copy that wording.

9. **The 15-minute route promises eight words and defines four.** Externality, path dependence, moral hazard and real option arrive only as one-clause glosses in the closing recap. The route note (`adaptation-15min.md:15`) says "Shoup and path dependence ride in the slide-3 bridge", but the bridge only gestures at asphalt; externality is never named before slide 15. Either drop "Eight words" from the 15-minute slide 1 and promise four, or add the externality sentence to the bridge.

10. **The 15-minute route cuts the sharpest sentence in the talk while leaving it on the slide.** `script-15min.md:104-114` keeps slide 12's visible line "Your prompts, evals, fine-tunes, and that unlimited-usage clause" but drops the paragraph that inventories them and lands "That sentence is the entire MoviePass balance sheet." In a 15-minute route that opens on MoviePass, that callback is the payoff. Keep the inventory paragraph; cut the "This is the slide I would keep" preamble instead, which is meta and only makes sense in a long route.

11. `evidence-bank.md:38` lists a Story slot for slide 4 ("Recheck the three dated items; not a personal story"). Slide 4 has no `Story:` line in `index.md`. Move that row out of the story-slot table into "Before presenting".

12. `packet.md:5` — "Current screen and handout PowerPoints are linked from the [deck index](../README.md)." PowerPoints were removed 7 Sept and `talks/README.md` says so. Delete the sentence.

13. `evidence.md:3` — "Verified 2026-09-04; Free Tier section reverified 2026-09-06." Stale as of this pass; the standing instruction is a per-delivery recheck. Update to 2026-09-08 with the prospectus-window note.

## NITs

- `packet.md:86-88` "Audience-specific abstracts (100 words each)": Executive is 103 words; practitioner and education are 99.
- Tone arc: slide 13 is labelled `build` after two `peak` slides, and slide 8 drops to `steady` mid-build-run. Reads as a registry artifact rather than an arc.
- Image prompts exist on 12 of 15 slides; 3, 4 and 9 have none. Presumably deliberate (typographic), but worth a line in the file so the next pass does not "fix" it.
- `index.md:24` "lost forty million dollars in that month alone" is cash burn, not accounting loss. Fine spoken; the evidence bank should say which.
- Hedge count: **one spoken disclaimer** (`index.md:28`), one on-screen ("Sensitivity, not prediction.", `:217`), one mild ("synthetic and deliberately small", `:205`). Within the rule; the best in the portfolio. Joke count: 14 in the 40-minute route. Healthy.
- `Story:` slots on slides 1 and 7 are named and unfilled — correct. `evidence-bank.md:41-72` candidates are bracketed placeholders — correct. **No invented anecdote anywhere.** The `$22,500` figure in `evidence-bank.md:70` still resolves to `src/data/consultingServices.ts:144,167`. Both blog links resolve.
- Every internal link in the folder resolves. The 40-minute script is a **verbatim** match to `index.md` prose and visible lines, slide for slide — no drift. Timings are monotonic and sum to exactly 40:00; `bullets.md` spine matches all 15 titles and durations.
- All arithmetic recomputed and correct: 1,000 × $0.03 = $30; 750 accepted; $0.040 each; 1/0.75 = 1.333; 1/0.45 = 2.222; the equivalence $0.03/0.45 = $0.0667 = ($0.04+$0.01)/0.75, both exactly 1/15; sweep rows $30/$50/$110/$210 and $0.040/$0.0667/$0.1467/$0.280; slide 13 $100,000 vs $100 vs $10; demo.md's 10×-with-halved-inference $110 / $0.1467.

## Part B — the ceiling

### 1. The better talk inside this one

The voice skill (`SKILL.md:39`) records that "the Free Tier talk moved from a parking-lot frame to a reward-schedule frame the moment the statement became 'it's training you'." **It did not.** Nothing in the folder mentions a reward schedule, habit formation, intermittent reinforcement, or training. Every structural beat is Shoup: slide 5 is the parking lot, slide 7's image is "the same aerial strip mall", slide 8 is "the lots are already built", slide 9's payoff is "Shoup's fix was never a ban. It was a meter." Parking owns 09:30–22:15 — a third of the talk. Parking-lot residue is not merely present; it is the load-bearing wall.

And the talk is already carrying the better frame, unused, in its first ninety seconds. `index.md:26`:

> "What did the cheap price build? Not the same moviegoing, cheaper — an audience that drove across town on a Tuesday for films it had never heard of. And what survived the offer? The habit did. The company did not."

That is a reward-schedule observation about *behaviour*, and it is the best paragraph in the talk. Then the talk drops it for thirty-five minutes and picks it up again in the last two. Parking answers "where did the cost go?" Habit answers "what did the price make you into?" — which is the question the title, the MoviePass case, slide 7's "because the call looked free", and slide 9's "consumption is not a moral failure, it is the equilibrium" are all actually about.

**The twenty-percent reorder.** Keep Shoup as *one* slide (5) that buys the word *externality* and nothing more. Cut slide 8 entirely (Part B7). Move slide 7's software translation to immediately follow slide 6, so the chain is: the price fell → Jevons and induced demand → *here is what it trained your architecture to do* → and now the org-chart version of the same training (slide 9) → the meter. Then slide 15's callback lands on a frame the room has been in the whole time instead of one it left at minute ten.

Concretely, the two sentences that need writing are on slide 7. `index.md:149` currently says:

> "I call it architectural obesity. It is not that any one of those calls is wrong."

"Architectural obesity" is a diagnosis of a *body*. The reward-schedule version is a diagnosis of a *training history*, and it is sharper: the promotional price was not a discount, it was a curriculum, and every design review since has been a rep. That sentence belongs where "architectural obesity" is.

### 2. The thesis line

**It is not there.** Slide 1 (`index.md:13-36`) has a title, a subtitle at `:3` ("What the cheap input taught your architecture to expect"), a visible pair, and no thesis statement. The known-good line — *Don't fear training the model, worry how it's training you* — appears in no file in the portfolio.

The landing line, `index.md:303`:

> "Cheap intelligence changes incentives before it changes organizations."

It is short, declarative, and followed by "Stop talking" — but it is a **new** sentence, not a shortened return of anything. Nothing on slide 1 comes back. The talk's best reversal, the one the skill itself quotes at `SKILL.md:37`, is `index.md:88`:

> "You are not a combatant. You are the terrain."

— stranded on slide 4, which `adaptation-30min.md:20` states plainly "no shorter route keeps". The portfolio's sharpest line survives in two of three routes only as bridge prose.

Two ways out. If the known-good statement stands, the arc has to be rebuilt on habit as in B1, because as written the talk earns *lock-in*, not *training*. If instead you keep this text, then write the statement this text actually earns, in the same reversal shape:

> **You did not choose this architecture. The price chose it, and you signed off.**

Either way the landing should return slide 1, and slide 1 already hands you the return. Slide 1 visible: "What survived the offer? The habit. Not the company." Landing:

> **The habit outlives the offer.**

Five words, concrete, closes the loop, and it is the reward-schedule thesis in one breath. Put "Cheap intelligence changes incentives before it changes organizations" one line earlier, where it belongs, as the penultimate beat.

### 3. The title

*Buy Me a Free Tier* works because the swap turns a complaint into a purchase order: "Cry me a river" is what you say to someone whining about the bill, and changing one verb reveals that the free tier is a thing somebody actually bought — just not you. One joke, one swap, and it names the mechanism rather than the topic.

Nothing re-explains it. `index.md:88` "Somebody is buying your free tier, and it is not you." is the *argument arriving at* the title, which is the correct move — the talk earns the joke on slide 4 rather than translating it on slide 1. `index.md:5` records the former title, but that is a maintenance note, not stage text. **Passes.** The only cost is structural: the sentence that earns the title lives on the one slide no shorter route keeps.

### 4. The hallway number

Three candidates compete, and that is itself the finding.

- **(a)** `index.md:200-201`: "75% accepted means you pay 1.33× sticker. 45% means 2.22×. A 30-point acceptance drop costs exactly what doubling every token price costs."
- **(b)** `index.md:80`: "$250B incremental Azure services contracted by OpenAI."
- **(c)** `index.md:19`: "$9.95 a month … average US ticket $9.11."

**(a) wins and should win** — it is checkable in the head, it is about the attendee's own system, it changes a decision, and it is what `README.md:121` assigns this talk to own. But **(b) is the number the room will actually repeat**, because $250 billion is louder than 2.22×, and that is a problem the talk creates for itself. `index.md:86` says "Everyone reads these as evidence about cost. **They are evidence about strategy**" — the talk tells you the number is uninformative and then puts it on screen in the largest type in the deck. The correction does not survive the hallway; the number does.

Fix: put **one** commitment figure on slide 4, not three, and make the visible line the *interpretation* rather than the number — "$250B contracted, and it discloses nothing about margin". Then (a) wins by default, because it will be the only number the room can do anything with.

### 5. The peak

The registry says slides 11 and 12 (`index.md:213,235`). **Slide 11 is not the peak; it is the flattest minute in the talk.** Four minutes, 103 spoken words, 25.8 wpm, a four-row table, and — after the 7 Sept tooling removal — no instrument to turn. Its best line is a warning against the talk itself (`:229`, "spending three weeks optimizing a thirty-dollar bill because a conference talk made you anxious"), which is excellent and takes fifteen seconds.

The real peak is the 22:15–32:00 run, and its summit is slide 10's `index.md:207`:

> "dropping from seventy-five to forty-five percent acceptance costs you exactly the same as every token in your stack doubling in price overnight. One of those is on the front page. The other one is a Tuesday."

That is the moment the room's own numbers turn on them — labelled `steady`. Slide 12's "your architecture is the collateral" is the intellectual peak; slide 10 is the emotional one.

Fix: relabel 10 as `peak`, keep 12 as `peak`, cut slide 11 to **2:00** as an exhibit inside slide 10's beat rather than a slide of its own. That buys 2:00 toward the pacing deficit and removes the demo-with-no-demo problem in the same edit.

### 6. The hostile expert

**The strongest attack is an energy economist, and the talk hands them the weapon on slide 8.**

> "You flagged QWERTY as contested — carefully, at length, and to your credit. Then you asserted Jevons as though it were settled. It isn't. Jevons is backfire: rebound above 100%. Measured direct rebound is typically 10–30% in developed economies, economy-wide estimates run 20–50%, and backfire is a minority position most economists reject. You applied the contested-example standard to the example that helps your honesty and not to the one that carries your argument."

**The talk survives, but only because the mechanism it actually needs is not the paradox.** The defence is already written, at `index.md:128`:

> "Spend is price times jobs times calls per job times tokens per call, and cheapness moved every term on the right."

That is an observation about four terms the audience can measure, not a claim that rebound exceeds unity. Jevons is decoration on it. But nobody on stage says so, and the caveat that would ("Not a law", `evidence-bank.md:13`) is filed where the room cannot hear it.

**The inoculating sentence, raised first, on slide 6, before induced demand:**

> "Fair warning before I lean on this: economists argue hard about whether Jevons ever generalises, and most measured rebound effects come in well under a hundred percent. I am not claiming a law. I am claiming you can watch your own four terms move, and you already know they did."

That converts the attack into agreement and costs nine seconds. It also fixes the asymmetry with slide 8 that makes the attack land.

**Second attack, from a vendor employee in row three:** "You put $250B and $100B on screen and then told a story about a company that lied to its customers and went bankrupt. The juxtaposition *is* the comparison, whatever `evidence.md:18` says." The talk's answer exists only off-stage. Say it: *"MoviePass is here because it finished. Nobody in this market has, and I am not predicting that any of them will."*

### 7. Dead weight

**Cut slide 8, "The lots are already built" (17:00–19:45, 2:45).**

It carries two payloads. The first, path dependence as a word, survives without it: slide 5 already says "the lots stay built" in the 30-minute bridge, and slide 15's recap defines it in one clause. The second, `index.md:169`:

> "Pick one model call in your product and try to remove it. Count the hours. That number is your lock-in."

— is one sentence and it is in the **wrong place**. Counting the hours to remove a model call *is* the measurement of asset specificity. It belongs on slide 12, next to the inventory it measures, where it converts the Williamson slide from a frame into a homework assignment. Everything else on slide 8 is a 45-second QWERTY digression that ends by telling the audience not to use the concept it just taught.

**Second cut: slide 2, "Four boxes, one invoice" (02:15–04:00, 1:45).** Its only durable payload is *consumer surplus*, which is not one of the eight words, never returns, and is already cut from the 15-minute route. The four-box taxonomy is the compliance-training register the voice skill warns about — a definitional grid before any argument has started. Move "your consumer surplus is enormous right now, which is why nobody is measuring" into slide 3 as a single sentence and take the 1:45.

**Total bought: 4:30**, against a measured deficit of roughly 4:00 (82.4 wpm needing to come down to ~73). That is not a coincidence worth ignoring — the talk is exactly two slides overweight, and they are the two slides that teach rather than argue.

### 8. The landing

`index.md:303`, with `:305`:

> "Cheap intelligence changes incentives before it changes organizations."
>
> "Stage direction: Say the last line slowly, then stop talking."

Short (nine words), declarative, silence after — the form is right. The content is not quite. Both load-bearing nouns are abstractions, in a talk whose own rule (`SKILL.md:50`) is to lead with the concrete. Compare the approved landings: *Put the limit where the work begins. The system around it got a job.* Those are pictures. This one is a summary of a summary, and — see B2 — it returns nothing.

It also arrives third in a queue. `:299` recites eight words, `:301` says "Some low prices are temporary…", and only then `:303`. Three closes in a row, in the slide already running at 84.4 wpm.

**Better: cut `:301` entirely** (it is the disclaimer from slide 1 restated at the end, which is the one place the talk agreed not to qualify), move "Cheap intelligence changes incentives before it changes organizations" up to sit under the eight-word recap, and land on the callback slide 1 has been holding for thirty-eight minutes:

> **The habit outlives the offer.**

Then stop talking.

## What I could not verify

- **Anthropic's public IPO prospectus.** Confidential draft S-1 filed 1 June 2026; press reporting says the public prospectus was expected after Labor Day with a listing late Sept–Oct. I could not confirm a public filing exists on EDGAR as of 2026-09-08, and I could not confirm whether it discloses AWS contract terms. Treat `index.md:94`'s "expected late September 2026" as live-now, and check EDGAR the morning of any delivery.
- **Aggregate cinema-subscription membership.** AMC's last public A-List number is ~860,000 (2019); Regal and Cinemark do not break out membership. "Millions of subscribers" (`index.md:295`) may well be true and is not publicly documented.
- **The Epoch series' currency.** The cited page is unchanged since 12 March 2025 with a Feb 2025 last datapoint. I did not find an Epoch-published successor; third parties cite the 2025 edition. Whether the "fast and unequal" shape still holds through 2026 is unverified.
- **Whether the reward-schedule reframe was ever attempted.** `dans-voice/SKILL.md:39` states the talk moved to it. Nothing in `talks/free-tier/` reflects it, and I found no retired draft. I cannot tell whether the skill is describing an intention, a lost draft, or an error in the skill.
- **The `Story:` slots** on slides 1 and 7, and the four evidence-bank candidates, are unfilled by design and cannot be verified until Dan supplies them. Nothing is invented in their place — I checked.
- **The 2018 NATO figure's provenance.** I confirmed $8.97 (2017) and $9.11 (2018) from multiple contemporaneous trade reports of NATO's release, not from a NATO document directly; NATO stopped publishing the series after 2019. If the slide is challenged, cite the trade coverage, not NATO's site.
