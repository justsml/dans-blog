# Review: Code Is Cheap. Judgment Is Expensive.

Reviewed 2026-09-06 against `judgment-40min-outline.md`, `judgment-15min-outline.md`, `flagship-talks/README.md` and `reveal-talks/judgment.html`. Quality bar: `outlines/free-tier-40min.md`. Boundary check against `outlines/dynamic-scaling-40min.md`.

---

## 1. Verdict

This would not win a competitive CFP slot in 2026, and not because the ideas are wrong — they are all correct, which is the problem. The title makes a sharp comparative claim about the price of two things, and the talk then spends thirty-eight minutes refusing to price either one; there is not a single number in the deck after slide 1's "10,000 lines … 1,000," and that one is retracted in the same sentence it appears ("Treat this as a thought experiment, not a measured productivity claim"). The thesis as delivered — review matters, specs help, someone should own the code — is not a thesis, because no competent engineer in the room disagrees with any of it; a program committee reading this abstract cannot tell what the audience would argue with on the way out. The single biggest problem is **defensive framing as a structural habit**: I count eleven separate retractions across eighteen slides, roughly one per slide, each one dissolving the claim the slide just made, so the talk never accumulates an argument, it just keeps returning to zero. The fix is not a rewrite of the topic — the topic is the best one in the portfolio — it is to import queueing theory, commit to the one claim the title already makes, and let it be wrong in public.

---

## 2. The roast

**2.1. The deck retracts itself eleven times. This is the whole disease.**

An incomplete list, all verbatim: slide 1 "Treat this as a thought experiment, not a measured productivity claim"; slide 2 "That constraint has never been identical everywhere"; slide 5 "Use this as an engineering objective rather than a pretend universal formula" *and* "Avoid inventing a single score that hides those tradeoffs"; slide 7 "These examples are hypothetical requirements, not a complete authorization design"; slide 8 "Tests cannot exhaust every possible failure"; slide 10 "Independence helps, but reviewers and generators can still share blind spots"; slide 11 "Avoid turning this into a claim that junior engineers have no future" and "not a permanent ranking of people"; slide 12 "without becoming a manager in the formal organizational sense"; slide 16 "No numerical improvement target is assumed here"; slide 17 "Present this as a division of responsibility, not a law of nature."

Free-tier solves this in one line on slide 1: "Here is my one disclaimer, and then I am done qualifying." Judgment instead pre-apologizes to an imaginary hostile Hacker News commenter before every single point. The audience is in the room. They came to hear an argument. A talk that says "not a law of nature" about its own closing slide has told the room, correctly, that it does not believe itself.

**2.2. The title is a price comparison and the talk never quotes a price.**

"Code Is Cheap. Judgment Is Expensive." How cheap? How expensive? What is the exchange rate? Slide 5 gets closest with "Validated outcomes / per unit of complexity" and then immediately declines to define either term numerically ("Avoid inventing a single score"). Compare free-tier slide 10, which commits: "Seventy-five percent acceptance means you are paying one and a third times the list price… dropping from seventy-five to forty-five percent acceptance costs you exactly the same as every token in your stack doubling in price overnight." That is a claim someone can check, argue with, and repeat at work on Tuesday. Judgment's equivalent is a fraction with no numerator and no denominator, rendered at 62px.

**2.3. There is no story, and the deck says so out loud, twice.**

Slide 3: "Walk through a **hypothetical** developer receiving several plausible implementations before lunch." Slide 7: "These examples are **hypothetical** requirements." Slide 16 proposes "A bounded team experiment" that Dan has apparently not run. This is a talk about a thing Dan has strong opinions about, delivered entirely in the subjunctive. The permissions example on slides 6–8 is genuinely the best material in the deck and it is fictional. Every newer outline in the portfolio carries named `Story:` slots; this one has zero.

**2.4. Zero audience moments, zero stage directions, eighteen dense slides, forty minutes.**

Timings sum correctly (14 × 2.0 + 4 × 3.0 = 40.0), so this is not arithmetic fiction — it is *interaction* fiction. Two slides quietly demand a beat and are given no seconds for it: slide 2 "then ask the audience where work actually waits in their organization" and slide 6 "Read the request aloud and ask which questions it leaves unanswered," followed by three questions to pose. Reading that request aloud, posing three questions, and waiting for even one answer is ninety seconds of a two-minute slide. Free-tier budgets four audience moments explicitly and tags every slide `warm / steady / build / peak / land`. Judgment has no pacing tags at all, and at 2.2 minutes per slide across eighteen four-bullet slides, the delivery shape is a lecture with no dynamic range.

**2.5. The peak is a pilot proposal.**

The energy high point lands at minutes 31–37, and it is slide 16, "A bounded team experiment" — "One recurring workflow / A baseline and acceptance criteria / A review owner / A decision to continue or stop" — followed by slide 17, "Responsibility stays explicit," which is four bullets of org philosophy ("Machines propose implementations. / Checks provide evidence. / Engineers own acceptance. / Leaders choose direction."). Nine minutes of the back third is a governance memo read aloud. There is no demo, no artifact, no reversal, no moment where the room's assumption breaks. The most dramatic thing that happens in this talk is a table with two columns.

**2.6. Two talks, stapled at slide 11.**

Slides 6–10 are an IC craft talk: write the permission spec, translate it into executable acceptance criteria, layer your validation, distrust generated tests. Excellent, concrete, and aimed at a senior engineer. Slides 11–17 are an engineering-leadership talk: seniority, ownership, metrics, pilots, division of responsibility. Also fine, aimed at a VP. The README names the audience as "Engineering leaders, CTOs and senior engineers," which is not one audience, it is a hedge. The seam is visible at slide 11, where the deck stops talking about code and starts talking about career development ("Judgment develops through consequences"), and never returns to a keyboard.

**2.7. Generic vocabulary everywhere a discipline has a precise name.**

"A growing review queue" (slide 3) is *literally* a queueing problem and the talk does not use one term from queueing theory. "The implementation bottleneck" (slide 2) is Theory of Constraints without Goldratt. Slide 10's "A test can repeat the same assumption as the implementation" is the confirmation-bias-in-oracles problem with no name attached. Slide 13's "Reviewer agents can help surface issues, but their approvals do not replace evidence" is *automation bias*, a forty-year-old term with a measurement literature, unnamed. Slide 14's "Who accepts the change? / Who handles the incident?" is the accountability-sink / moral-crumple-zone question, unnamed. Free-tier hands the room eight imported words and lists them back on the closing slide. Judgment hands the room zero and its closing slide is three questions the room already knew to ask.

**2.8. No line survives the elevator.**

Nothing here is quotable. The only joke in forty minutes is on slide 1 — "If your org uses AI to build an infinite feature machine, you have tragically missed the potential of the magic AI genie" — and it is a good Dan line that then has to carry the entire register alone, because slides 2 through 18 read like a well-written internal RFC. Compare the register the portfolio has established: "a very boring way to have a very expensive morning," "we do not need to rent a committee every time a CSV arrives." The nearest Judgment gets is slide 15's "Raw commits and lines of code count activity," which is true and forgettable.

**2.9. The deck is meaningfully richer than the outline, so the outline undercounts the talking.**

Real drift, not cosmetic. Deck slide 2 shows four lines absent from the outline's visible copy: "Where does the work wait? / Idea → requirements → implementation / Tests → review → release / Implementation scarcity is a starting model. Your bottleneck may already be somewhere else." The outline lists only "Ideas wait for implementation. / Teams allocate scarce engineering time." Deck slide 9 renders a full two-column table (Unit tests → Local rules, Contract tests → Interfaces, Integration checks → Real boundaries, Policy / static analysis → Specified rules and code properties, Evals → Variable output quality) where the outline lists four bullets. Deck slide 5 renders the fraction as numerator/denominator over an accent rule. Nearly every deck slide adds a closing caption the outline does not record ("Excellent generated code can still be unnecessary," "Reviewer-agent approval still needs evidence," "Sometimes the best decision is a smaller change—or no change"). The consequence is not aesthetic: the outline's two-minute budgets were set against a slide with two lines on it, and the deck has six.

**2.10. The 15-minute cut has a dangling reference; and the deck refers to Dan in the third person.**

15-minute slide 4 speaker note: "**Continue** the permissions example with explicit boundaries." There is no permissions example to continue — "Add enterprise permissions" is 40-minute slide 6 and does not exist in the 15. The lightning version opens a spec for a request the room never heard.

And in both outlines *and* in the shipped browser deck's slide 18 notes: "Close with **the user's** central argument." The presenter is being instructed to close with the argument of "the user." That phrase should not survive into a deck with Dan's name on the cover.

**2.11. Boundary: slides 12 and 15 are now owned by dynamic-scaling.**

Precise overlap, since dynamic-scaling was rewritten and Judgment was not:

| Judgment | Dynamic-scaling | Verdict |
| --- | --- | --- |
| S12 "Compare candidate solutions. / Inspect evidence. / Integrate a small change." | S12 "Same brief, contrasting priorities, separate first drafts / Gates before preferences; the judge may reject everyone / A synthesis is a new candidate" | Same mechanic. Dynamic-scaling does it better and with an exercise. **Cut from Judgment.** |
| S12 "Budget for rejected candidates and cleanup." | S13 "Count the whole thing: all candidates, failed work, reserved uncertainty, judging and human review, and compare against one competent attempt." | Same instruction, one sentence vs. a costed model. **Cut.** |
| S15 "Time to validated outcome / Escaped defects / Customer results / Maintenance burden" | S13 "Measure accepted outcomes, not launched workers." | Overlapping. Judgment's version is a list; dynamic-scaling's is a rule. Keep Judgment's only if it is re-pointed at *review capacity* specifically. |
| S12 "An engineer can coordinate several attempts without becoming a manager" | S12–14 entire arc | Judgment's 22:00–24:00 is now a two-minute trailer for a forty-minute talk that already exists. **Cut.** |

Secondary overlap with the benchmarks talk, per the README's own description ("turning production failures into eval cases"): Judgment slides 8, 9 and 10 spend six minutes on acceptance criteria, validation layers and eval scrutiny. That is benchmarks' declared territory. Judgment should keep the *specification* half (slides 6–7) and hand the *eval-layer* half back.

---

## 3. The missing discipline

The talk's own slide 3 says the quiet part — "Generation can outpace review. / Unreviewed changes accumulate. / Integration becomes the queue" — and then walks past a hundred-year-old field that answers the question precisely. **Queueing theory is the spine.** Everything else below is supporting cast.

### The spine: a queue with a fixed-rate server

**Little's Law.** John D. C. Little (1961), "A Proof for the Queuing Formula: L = λW," *Operations Research* 9(3), 383–387. L = λW: average items in the system equals arrival rate times average time in system. It holds under almost no assumptions, which is what makes it usable on stage. Applied here: the number of changes in flight equals how fast you generate them times how long each waits. Halve the wait or halve the arrivals; there is no third option, and "the reviewer will try harder" is not one.

**Kingman's formula — this is the number the talk is missing.** J. F. C. Kingman (1961), "The single server queue in heavy traffic," *Mathematical Proceedings of the Cambridge Philosophical Society* 57(4), 902–904. Waiting time scales with ρ/(1−ρ), where ρ is utilization. The checkable, memorable, repeat-it-at-work number: **at 80% utilization a reviewer's queue waits about 4× the review time; at 90% it is 9×; at 95% it is 19×.** Utilization went up by fifteen points and wait went up nearly five-fold. That is the entire talk in one curve, and it is the answer to the manager who says the review team "still has headroom." Flag honestly on stage: this is a heavy-traffic *approximation* for a single server, and variability (the c² term) matters as much as utilization — which is itself an argument for small uniform diffs over sprawling ones, i.e. it re-derives slide 13 from first principles instead of asserting it.

**Amdahl's law, applied to a pipeline with one human stage.** Gene Amdahl (1967), "Validity of the single processor approach to achieving large scale computing capabilities," AFIPS Spring Joint Computer Conference, 483–485. If review is 30% of cycle time and generation goes infinitely fast, the ceiling on total speedup is 1/0.3 ≈ **3.3×**. Not "diminishing returns" — a hard, computable ceiling that no amount of model improvement moves. This is the slide that makes a CTO put their phone down, and it costs one line of arithmetic the audience can do in their head.

Optional supporting frame: Donald Reinertsen (2009), *The Principles of Product Development Flow*, Celeritas — queueing applied to product development, WIP limits and cost of delay. And Eliyahu Goldratt (1984), *The Goal*, North River Press, for the constraint-moves argument that slide 2 is already making without attribution.

### Why "just review harder" fails

**Deming: you cannot inspect quality in.** W. Edwards Deming (1986), *Out of the Crisis*, MIT CAES. Point 3 of the Fourteen Points is "Cease dependence on inspection to achieve quality… Improve the process." This is the sharpest available rebuttal to the room's instinctive fix, and it lets Judgment argue something genuinely contestable: **that the response to cheap generation is not more review but fewer, smaller, better-specified arrivals** — a service-rate and variability intervention, not a staffing one.

**What review actually catches.** Michael Fagan (1976), "Design and code inspections to reduce errors in program development," *IBM Systems Journal* 15(3), 182–211 — the origin of formal inspection and still the reference point. Then Alberto Bacchelli and Christian Bird (2013), "Expectations, Outcomes, and Challenges of Modern Code Review," ICSE 2013 — Microsoft study finding that developers *expect* review to find defects while the observed outcomes skew toward code improvement and knowledge transfer, with defect-finding less common than believed. And Peter Rigby and Christian Bird (2013), "Convergent Contemporary Software Peer Review Practices," ESEC/FSE 2013 — modern reviews converge on small changes and few reviewers. This is the honest, uncomfortable material Judgment needs: if review is weaker at defect detection than the room assumes, then adding a review queue in front of a firehose is not a safety mechanism, it is a *feeling* of one. **Softening note:** the widely repeated "200–400 lines per review" and "~500 LOC/hour" figures come from SmartBear/Cisco's *Best Kept Secrets of Peer Code Review* (2006), a vendor-published study, not peer-reviewed. Cite it as industry practice, name the source, do not present it as a research finding.

### Why the human in the loop is not the safeguard you think

**Lisanne Bainbridge (1983), "Ironies of Automation," *Automatica* 19(6), 775–779.** The load-bearing citation for the whole back half. Automation removes the easy work and leaves the human the hard residue; and the operator's skill decays precisely because the automation is doing the practice for them, yet we assign them the monitoring role that requires that skill. Point it directly at slide 11 (which currently worries about junior engineers in the abstract) and at slide 13 (which asserts review capacity depends on work shape without saying why the reviewer degrades).

**Automation bias.** Linda Skitka, Kathleen Mosier and Mark Burdick (1999), "Does automation bias decision-making?", *International Journal of Human-Computer Studies* 51(5), 991–1006 — errors of omission and commission when people defer to automated aids. Background: Raja Parasuraman and Victor Riley (1997), "Humans and Automation: Use, Misuse, Disuse, Abuse," *Human Factors* 39(2), 230–253, for the use/misuse/disuse vocabulary. This names slide 13's "their approvals do not replace evidence" and makes it a measured phenomenon instead of a preference. Note the transfer is from aviation and clinical decision support; say so rather than implying a code-review study exists.

**The law of stretched systems.** David Woods and Erik Hollnagel (2006), *Joint Cognitive Systems: Patterns in Cognitive Systems Engineering*, CRC Press — every system is stretched to operate at its capacity, so capacity gains are consumed by new demand rather than banked as slack. This is the mechanism behind the queue never getting shorter, and it pairs cleanly with the utilization curve.

### Who is left holding it

**Moral crumple zones.** Madeleine Clare Elish (2019), "Moral Crumple Zones: Cautionary Tales in Human-Robot Interaction," *Engaging Science, Technology, and Society* 5, 40–60. The human nearest the automated system absorbs blame for failures they had limited ability to prevent. This is precisely what slide 14 is circling ("Who accepts the change? / Who handles the incident?") without a name, and naming it makes the slide *dangerous* instead of dutiful: the approver of a machine-generated diff is being positioned as a crumple zone, and everyone in the room has either been one or appointed one.

**Accountability sinks.** Dan Davies (2024), *The Unaccountability Machine*, Profile Books — the organizational structure where a decision is arranged so no individual can be said to have made it. Complementary to Elish and very quotable. Verify the edition/publisher before the slide goes on screen.

**Principal-agent framing.** Michael Jensen and William Meckling (1976), "Theory of the Firm: Managerial Behavior, Agency Costs and Ownership Structure," *Journal of Financial Economics* 3(4), 305–360 — agency costs are monitoring plus bonding plus residual loss. Useful in exactly one line: review *is* the monitoring cost, and when the agent's output is free, monitoring cost is the whole cost.

**Elinor Ostrom (1990), *Governing the Commons*, Cambridge University Press** — evaluate but probably discard. The eight design principles (clear boundaries, monitoring by accountable monitors, graduated sanctions) map onto a shared codebase pleasingly, but it is a second full frame and this talk's failure mode is already too many frames. If Dan wants one line from it, it is the monitoring principle; otherwise cut.

### The one to consider and probably reject

**Brooks (1986/1987), "No Silver Bullet — Essence and Accidents of Software Engineering,"** IFIP Congress 1986, reprinted *IEEE Computer* 20(4), 10–19. Tempting: if generation removes accidental complexity and leaves essential complexity untouched, then the ratio shifts and *specification becomes the entire job*. That is a genuinely good ten-line argument and it directly justifies slides 6–7. But it is also the single most over-quoted paper in conference talks in this space, and Brooks himself would be an eighth frame in a talk that currently has none. **Use it only if it replaces slide 5's undefined fraction** — which it can, and better: the ratio of essence to accident is a real quantity people can argue about, and "validated outcomes per unit of complexity" is not.

### The spine, in one sentence

*If generating code is free and reviewing it is not, delivery is a queue with a fixed-rate server — and the queueing math says the wait explodes long before the reviewer looks busy, so the only real interventions are fewer arrivals, smaller variance, and a specification written before the code exists.*

That is a sentence people can disagree with. Someone in the room will say "we'll just use reviewer agents," and slide 9 gets to answer them with Bainbridge and Skitka.

---

## 4. A proposed new arc

40 minutes, 14 slides, four audience moments, no Q&A. Pacing tags in the current portfolio style.

| # | Minutes | Slide | Status |
| --- | --- | --- | --- |
| 1 | 00:00–02:30 · warm | **The morning four good implementations arrive** — open on the multiplication, land the genie joke, then say the one disclaimer once and stop qualifying. `Story:` the first time review, not writing, was the thing holding a change. | merged (old 1 + 3) |
| 2 | 02:30–05:00 · warm | **Where does the work actually wait?** — the pipeline diagram, then a real budgeted show of hands on which stage is their constraint. | kept (old 2), beat now budgeted |
| 3 | 05:00–08:00 · steady | **A queue does not care how you feel about it** — Little's Law, then Kingman: 80% → 4×, 90% → 9×, 95% → 19×. The number of the talk. | new |
| 4 | 08:00–10:30 · build | **Your ceiling is the stage you did not speed up** — Amdahl on a pipeline; review at 30% caps you at 3.3× no matter how good the model gets. | new |
| 5 | 10:30–13:00 · build | **You cannot inspect quality in** — Deming's Point 3; therefore the fix is arrivals and variance, not headcount. First contestable claim, stated flat. | new (absorbs old 4's ongoing-cost bullets as one line) |
| 6 | 13:00–16:00 · build | **"Add enterprise permissions"** — read it aloud, 60 seconds in pairs on what it leaves unanswered, then the three questions. | kept (old 6), now a timed exercise |
| 7 | 16:00–19:00 · build | **A spec is a variance reduction, not paperwork** — actors, invariants, failure behavior, and the three executable criteria. Explicitly tie back to the c² term on slide 3. | merged (old 7 + 8) |
| 8 | 19:00–22:00 · steady | **What review actually catches** — Fagan's inspections, Bacchelli & Bird on the gap between what review is for and what it does. Fold in the junior-engineer question here, in 45 seconds, not as its own slide. | new (absorbs old 9, 10, 11) |
| 9 | 22:00–26:00 · **peak** | **The rubber stamp** — show a plausible diff with its plausible passing test, both wrong the same way; let the room approve it; then Bainbridge 1983 and automation bias. This is the reversal the talk has never had. | new |
| 10 | 26:00–29:00 · peak | **Somebody has to be the crumple zone** — Elish 2019, accountability sinks; who accepts, who gets paged, who maintains it next year. | new (absorbs old 14 + 17) |
| 11 | 29:00–32:00 · build | **Essence and accident** — Brooks 1986; generation eats accident, leaves essence, so specification is now the job. Replaces the undefined fraction. | new (replaces old 5) |
| 12 | 32:00–35:00 · build | **Three levers on the queue** — fewer arrivals, smaller variance, protect slack below the cliff. Each lever restated as the queueing term it came from. | merged (old 13 + 16) |
| 13 | 35:00–38:00 · land | **Measure the wait, not the output** — time to validated outcome, escaped defects, maintenance burden, and the one number: your review utilization. 45 seconds: estimate yours. | merged (old 15), re-pointed at review capacity |
| 14 | 38:00–40:00 · land | **Knowing when to stop** — what should exist, does it work, is it worth maintaining; the smaller change or no change. Leave the utilization curve on screen. | kept (old 18) |

**Cut outright:** old slide 12 ("An engineer directing execution") — now dynamic-scaling's territory, see 2.11. Old slide 11 as a standalone — survives as 45 seconds inside new slide 8. Old slide 5's fraction — replaced by Brooks. Old slide 9's validation-layer table — hand it back to the benchmarks talk. Old slide 16's pilot proposal as a standalone — its useful half merges into new slide 12; nobody wants nine minutes of governance at the peak.

**30-minute cut for the new arc:** drop 4, 11, and compress 6+7 into one four-minute block. The queue spine survives, which is the point of having one.

Lines in his register, offered as seed not script: *"Ninety-five percent utilization is not efficiency. It is a nineteen-times wait with good posture."* · *"The model wrote the test that agrees with the bug. Both of them are very confident."* · *"We did not remove the bottleneck. We moved it onto one person and gave them a keyboard shortcut for approving things."*

---

## 5. The one thing

**Put Kingman's curve on a slide in the first ten minutes and let the rest of the talk be its consequences.**

One graph, three numbers — 80% is a 4× wait, 90% is 9×, 95% is 19× — converts the entire deck from a list of reasonable opinions into an argument with a mechanism. It gives the title an actual price. It supplies the memorable checkable number the talk currently lacks entirely. It makes slides 6–8 *derivations* (a spec reduces variance; small diffs reduce variance; that is why they help) rather than assertions. And it earns the disagreement the talk needs: someone will stand up and say their reviewers are not a single-server queue, and they will be partly right, and that is a conference talk.

Everything else on this list is downstream of that one slide.

---

## 6. Facts to check or claims to soften

- **"the user's central argument"** (slide 18 speaker notes, both outlines *and* the shipped `judgment.html`). A generation artifact naming Dan in the third person. Must not survive into a deck with his name on the cover.
- **15-minute slide 4** says "**Continue** the permissions example" — the permissions example (40-min slide 6) is not in the 15-minute cut. Either add a one-line setup or reword.
- **"producing 10,000 lines of plausible code becomes easier than reviewing 1,000"** (slide 1). Currently a rhetorical figure the deck immediately disowns. Either commit to it as a stated model with the arithmetic shown, or drop the numbers and keep the question.
- **Kingman's formula** is a heavy-traffic *approximation* for a single-server queue. Say "approximation" on stage. Also say that a review team is not literally one server and that variability matters as much as utilization — both concessions strengthen the argument rather than weakening it.
- **Amdahl's 3.3× ceiling** depends entirely on the 30% assumption. Present it as "put your own number in" arithmetic, not as a finding.
- **"200–400 LOC per review" / "500 LOC per hour"** — if used at all, attribute to SmartBear/Cisco, *Best Kept Secrets of Peer Code Review* (2006), and label it a vendor-published industry study, not research.
- **Automation bias** research is from aviation and clinical decision support (Skitka/Mosier/Burdick 1999; Parasuraman/Riley 1997). State the transfer explicitly; do not imply a code-review study exists.
- **Path-dependence-style contested sources**: none used here, but if Brooks 1986 goes in, note that "no order-of-magnitude improvement in a decade" was a prediction about 1986–1996 and is routinely misquoted as a timeless law. Quote the essence/accident distinction, not the forecast.
- **Dan Davies, *The Unaccountability Machine* (2024, Profile Books)** — verify publisher and year on the copy before it goes on a slide.
- **README audience line** — "Engineering leaders, CTOs and senior engineers" should narrow once the two-talks seam (2.6) is resolved. The new arc points at senior engineers and the leaders who staff review; say that.
- **README 30-minute table** for Judgment ("Hide these slides: 2, 4, 10, 12, 14") arithmetically checks out (five 2-minute slides = 30.0), but the stated transition asks slide 13 to absorb both ownership *and* generated-test limitations inside its two minutes. If the current deck ships unchanged, that bridge needs its own budget.
