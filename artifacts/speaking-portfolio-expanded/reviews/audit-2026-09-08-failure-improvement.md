# Audit: Automating Improvement From Failure — 8 September 2026

Audited against `talks/failure-improvement/` (index.md canonical, 15 slides), all three scripts, both adaptations, bullets, packet, formats, CFP, evidence-bank, evidence, contracts, demo, visuals; the two prior reviews (`audit-failure-improvement.md`, `failure-improvement-review.md`) and the roll-up `AUDIT-2026-09-06.md`; the portfolio `README.md`; `speaker/recording-plan.md`; `talks/adaptive-systems/index.md` for the deferral; and the two child shorts. Citations verified against PubMed/AAMI, Cambridge Core, ScienceDirect/ACM and Toyota's own page. No talk file was edited.

## 1. Verdict

The 6 September fix list was executed almost completely and the canonical 40-minute outline is now clean, well-jointed and funny — but the *derived* routes were never retimed after the 7 September reorg, so the 30-minute script is the 40-minute script read 33% faster (slide 1 lands at 127 wpm) and the 15-minute route asks for 149 wpm on slide 6; that, plus a peak that replays a fixture the room already solved, is what stands between this and the recorded flagship.

## 2. Status vs prior audits

| Prior finding | Status |
| --- | --- |
| 09-06 B1 `packet.md` 250-word abstract describes pre-rewrite arc | **FIXED** — `packet.md:23-31` runs the current arc (alert fatigue → grants → bookmark → 403 holdout → reviewer → money gate → 100/90/10 → Monday) |
| 09-06 B2 "Your Logs Are a Roadmap Nobody Reads" + slide-1 heading | **FIXED** — `index.md:5` "Nobody reads the scroll"; alternate gone from `packet.md:9-11` |
| 09-06 B3 `CFP.md:9` 150-word abstract, "three evidence gates" | **FIXED** — `CFP.md:9` "Regression, holdout, scope, and a person" |
| 09-06 B4 `recording-plan.md:7` "working offline demo" | **FIXED** — now "its supporting example is specified in demo.md and not yet built" |
| 09-06 §3 `formats.md:32` "the more it can see, the more you can trust it to act" | **FIXED** — `formats.md:20` "access is a set of individual grants, not a graduation ceremony" |
| 09-06 §3 `formats.md` "three gates" ×2 | **FIXED** — `formats.md:21` |
| 09-06 §3 `formats.md:52` classify fields "pattern, severity, risk, security class" | **FIXED** — `formats.md:40` "severity, evidence, owner, and an unknown result" |
| 09-06 §3 `formats.md:56` "E2E economics" slide that does not exist | **FIXED** — `formats.md:44` |
| 09-06 §3 `packet.md` outcomes "severity, risk, security tags" / "GitHub Actions skeleton" | **FIXED** — `packet.md:37-40`, `:48-51` |
| 09-06 §3 `evidence-bank.md:5` self-contradicting E2E paragraph | **FIXED** — `evidence-bank.md:5` |
| 09-06 §3 `evidence.md:25` "slides 8 and 13" | **PARTIALLY FIXED** — now `:25` "slides 8 and 12", but slide 8 says nothing about money/deletion/messaging; slides 7, 9 and 12 do. See S8. |
| 09-06 §3 pre-rewrite story map, historical model/cost notes | **FIXED** — deleted; `evidence-bank.md:75` "Slides 1, 6, 10, and 11" matches the four `Story:` lines exactly |
| 09-06 §6 three removable hedges (`:16`, `:96`, `:166`) | **FIXED**, but a new one appeared — see S1 |
| 09-06 §6 slide 7 retitle → "Tickets are cheap. Review is not." | **FIXED** — `index.md:104` |
| 09-06 §6 append "Stop talking." | **FIXED** — `index.md:240` |
| 09-06 §4 100/90/10 arithmetic and its synthetic label | **STILL CORRECT** — 100 − 90 = 10; 10/100 = 10%; labelled on stage (`index.md:205`) and in `evidence-bank.md:77` |
| 09-06 §4 Cvach use "within what an integrative review supports" | **REGRESSED** — see B6 |
| 09-06 §3 route-15 timings (slide 8 = 4:00) | **REGRESSED** — retimed to 3:30, prose not updated. See B2 |
| 09-06 §3 30-min adaptation "Hide the others" boilerplate | **STILL OPEN**, and now load-bearing rather than harmless. See B1 |
| 09-06 §4 Bainbridge link PII here vs DOI in adaptive | **STILL OPEN** — `index.md:151` vs `adaptive-systems/index.md:233` |
| 09-06 §5 adaptive handback one-directional | **REGRESSED** — adaptive no longer mentions the offline loop at all. See B7 |
| 09-06 §6/§8.11 title "Automating Improvement From Failure" is a summary, not a name | **STILL OPEN** (deliberately deferred as a portfolio rename). See Part B.3 |
| 09-06 §2 skip note: `recording-plan.md:35` "the three gates" | **STILL OPEN**, plus "a security class" (superseded field). See B8 |
| 09-06 README `:37` deck editions | **OBSOLETE** — decks removed 7 Sept; `README.md:52`, `packet.md:3`, `formats.md:3` all agree "not yet rebuilt". No drift. |
| 09-05 review §7.1 story slots unfilled | **OPEN BY DESIGN** — four slots, all named, none invented. Correct. |
| 09-05 review §6.1–6.3 fabricated model names, $0.36–$0.81, "half the failures" | **FIXED** — none survive anywhere in the folder |

Slide counts and timings that check out: 40-min = 2.5+2+3+3+2.5+3+2.5+5.5+3+3+2.5+2.5+2+1.5+1.5 = **40.0**, monotonic, matching `index.md`, `bullets.md:9-23` and `script-40min.md` headers. 30-min route sums to **30.0**; 15-min route sums to **15.0** (105+90+90+90+210+135+105+75 = 900 s). `formats.md:9` and `recording-plan.md:9`: 30 − 2.5 (slide 10) − 2.5 (slide 12) = **25.0** ✓. `formats.md:17-22` lightning = 1+2+2.5+1.5 = **7:00** ✓. README's "15" slides ✓; README's central-decision and worked-example row ✓.

## 3. BLOCKING

### B1. The 30-minute route is the 40-minute talk, verbatim, in 30 minutes

`script-30min.md` prose is byte-identical to `script-40min.md` prose on all fifteen slides (diffed programmatically). Only the header timings changed. The result:

| Slide | 30-min allocation | Spoken words | Interaction inside it | Effective wpm |
| --- | --- | ---: | --- | ---: |
| 1 | 1:30 (`script-30min.md:5`) | 127 | 30 s hands-up (`:22`) | **127** |
| 2 | 1:00 (`:24`) | 95 | — | **95** |
| 6 | 2:00 (`:80`) | 101 | 45 s answers (`:98`) | **81** |
| 7 | 1:30 (`:100`) | 109 | — | 73 |
| 13 | 1:30 (`:194`) | 113 | — | 75 |
| 14 | 1:30 (`:209`) | 54 | 60 s write-down (`:221`) | **108** |

The portfolio band is 41–77 wpm and the skill calls anything over ~80 undeliverable. Four slides are over. Slide 1 asks Dan to say "The logs are still arriving… we have automated the thing that made the logs unreadable" — 127 words — in sixty seconds, *and* run a show of hands.

`adaptation-30min.md:3` is the tell: **"Keep slides 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15. Hide the others in presenter preparation."** There are no others. The 6 September audit called this "harmless generator boilerplate"; after the 7 September reorg there is no generator, so it is now a hand-maintained file asserting a cut that was never made. `:23` "Bridge sentences for every cut are in the script" is false — `script-30min.md` contains zero `Bridge:` lines.

**Fix.** Either (a) drop three slides — 12 (see S3/Part B.7), 11 and 5 fold into 7 and 4 respectively — and retime the survivors into the band; or (b) cut ~350 words from `script-30min.md` and delete the two false sentences at `adaptation-30min.md:3,23`. (a) is better. Do not ship a route whose only difference from the 40 is the clock.

### B2. The 15-minute route contradicts itself and asks for 149 wpm

`script-15min.md:3`: **"The worked example gets four minutes."** The same file's header at `:78` gives slide 8 as **06:15 to 09:45** — 3:30 — and `adaptation-15min.md:11` and `:16` repeat both the 3:30 row and the "four minutes" sentence. This is exactly the class of self-contradiction `AUDIT-2026-09-06.md:29` flagged for Judgment and Retrieval, and it is a *new* one here: route 15 previously gave slide 8 four minutes and was retimed at the reorg without updating the prose.

Worse, in the same file:

- `script-15min.md:56` slide 6 is 04:45–06:15 (1:30) and `:74` still says **"Budget 45 seconds; do not invite incident-length stories."** 112 spoken words in the remaining 45 seconds = **149 wpm**.
- `:5` slide 1 is 01:45 long and `:22` still says **"Allow 30 seconds."** 127 words in 75 seconds = **102 wpm**.

The delivery notes were copied down from the 40-minute file without rescaling. Route total excluding the walkthrough and interaction beats: 816 words ÷ 10.25 min = **79.6 wpm**, sitting exactly on the ceiling before either of these slides is accounted for.

**Fix.** Set the worked example to 3:30 everywhere or retime to 4:00; cut slide 1's hands-up from the 15 (or cut ~50 words); cut slide 6's audience beat to 20 s and trim to ~60 words.

### B3. Slide 14 is undeliverable in every route that keeps it

`index.md:213-225` / `script-40min.md:209-221`: 1:30 allocated, 54 spoken words, and **"Give the room a full 60 seconds."** That leaves 30 seconds for 54 words = **108 wpm** — on the canonical 40-minute route, not just a short one. The 30-min route is identical. Either give slide 14 2:00 (it is the talk's only real audience exercise and the close depends on it) or cut the write-down to 45 s.

### B4. Submitted copy promises a live demo the talk forbids

`packet.md:69` (Engineering practitioner abstract): **"The peak is run live — a candidate fix passes regression and fails the held-out authorization case."**

`index.md:132`: **"Link the repository for the implementation; do not switch to a live application."**
`demo.md:3`: **"The talk uses captured output from it; the repository is supporting material, not a stage dependency."**
`packet.md:85`: **"The worked example requires captured output… The implementation will live in the planned `mastra-agent-lab` repository."**

A committee reading `packet.md` books a live demo of a repository that does not exist yet. Delete "run live" from `:69`.

### B5. The one instruction that prevents B4 exists only in the canonical file

`index.md:132` ends **"…do not switch to a live application."** All three presenter scripts drop that clause:

- `script-40min.md:130` — "Walk through the captured output from the supporting repository: passing regression, failed authorization holdout, and unknown classification. Link the repository for the implementation."
- `script-30min.md:130` and `script-15min.md:95` — identical.

The scripts are what gets read at the lectern. Restore the clause in all three. (This is the only prose drift between `index.md` and the scripts other than B-adjacent slide 8 wording; everything else diffed clean.)

### B6. "Cvach measured it on hospital monitors" — she reviewed it

`index.md:16` and all three scripts: **"Alert fatigue. Cvach measured it on hospital monitors. Your pager is the same instrument."**

Verified: Cvach, M. (2012), *Monitor Alarm Fatigue: An Integrative Review*, Biomedical Instrumentation & Technology 46(4), 268–277, DOI 10.2345/0899-8205-46.4.268, PMID 22839984. Author, year, venue and pages are all correct. But the paper is an **integrative review synthesizing 72 articles** published 1/1/2000–10/1/2011 under the Johns Hopkins Nursing EBP model. It is not a measurement study. The 6 September audit passed the old wording precisely because it said "I am borrowing the mechanism"; the fix that removed the hedge replaced it with a claim the source does not support.

This is the one citation in the talk a hostile expert can break with a phone.

**Fix, and it is an upgrade rather than a retreat** — the review contains a real measurement, and it is the best number in the talk (see Part B.4): *"Cvach's 2012 review has the number. Fifteen beds, eighteen days, sixteen thousand nine hundred and fifty-three high-priority alarms. Sixty-three per bed per day. They cut it forty-three percent — not with a smarter monitor, by deleting duplicates and setting patient-specific limits."*

### B7. Slide 10 asserts a handback the other talk does not make

`index.md:164`: **"This is where Adaptive, agentic apps hands work back. A runtime agent earns its own authority there; the compiled procedure it keeps reusing gets evaluated here, offline, like any other change."**

`talks/adaptive-systems/index.md` contains no reference to the offline improvement loop, to a compiled or reusable procedure being handed anywhere, or to this talk by any name (grepped for *failure*, *offline*, *procedure*, *improvement*; its fifteen headings are listed and none covers it). The 6 September audit noted the pointer was one-directional via adaptive's old slide 14 sentence "the offline improvement loop evaluates changes to the reusable procedure"; that sentence is gone from the current adaptive outline.

So the talk narrates a handoff on stage that, if both talks are booked at the same event, the room will not have received. Either restore one clause to adaptive slide 14, or reword `index.md:164` to a claim this talk owns: "A runtime agent earns its own authority elsewhere. The procedure it keeps reusing gets evaluated here, offline, like any other change."

### B8. `speaker/recording-plan.md` is three edits stale on this talk

Shared file, but it is entirely about this talk and the prior audit treated it as in scope.

- `:11` **"Readiness: the deck is generated"** — decks were removed on 7 September; `README.md:52`, `packet.md:3` and `formats.md:3` all say "not yet rebuilt". Fix: "the deck is not yet rebuilt."
- `:35` (demo-reel table, 2:30–4:00 row) **"The proposed PR and the three gates."** — slide 8 shows four: `index.md:121` "Regression · holdout · scope · human". This was the one "three gates" instance the 6 September fixer left behind.
- `:33` (1:30–2:30 row) **"The classify loop tags severity and a security class."** — slide 5's fields are `index.md:76` "Severity · evidence · owner · unknown". "Security class" is the pre-rewrite field that was removed from `formats.md` and never removed here.
- `:19` **"amber-on-slate style"** — `README.md:92` assigns amber to Dynamic Scaling.

## 4. SHARPEN

**S1. Second scope disclaimer.** `index.md:124`: **"In the supporting example, the candidate removes the visible failure."** Slide 1 already said "The examples are teaching fixtures until I attach a production record" (`:14`). The rule is one, on slide 1. All three scripts already say just "The candidate removes the visible failure." — the canonical file is the outlier. Drop the clause. (Hedge count otherwise: 1. Joke count: ten — "an angry email", "the nobody who was doing it before", "not a graduation ceremony", "gets its own failure-improvement system, and we are all going home late", "very persuasive evidence of the wrong thing", "without asking the agent whether it feels finished", "a hundred green suggestions… a hundred reasons", "excellent unit economics right up to the incident", "a sentence of rage", "another beautiful dashboard". Jokes are not a problem in this talk.)

**S2. Canonical file deleted an audience moment the scripts still perform.** `index.md:130` "Similarity did not establish cause." vs all three scripts: "Does similarity establish cause? We just watched it fail that test." The question form is one of the four audience moments the 5 September review's arc specified. Pick one and make both files agree; the question is better.

**S3. Slide 12 counts wrong out loud.** `index.md:194-196`: **"Three address complaints and a shipping error suggest a shared incident… Draft the notice before the fourth customer asks."** Three plus one is four; the fourth customer has already asked. Row three will hear it. Either make it "three address complaints" throughout, or move the notice to "before the fifth."

**S4. Three slides sit under the 41 wpm floor on the 40-minute route.** Slide 12 = 93 words / 2:30 = **37.2**; slide 5 = 101 / 2:30 = **40.4**; slide 11 = 100 / 2:30 = **40.0**. Slide 8 is 125 words in 5:30 = **22.7** — the thinnest slide anywhere in this portfolio, and it is the one marked `peak` (see Part B.5). Route totals excluding slide 8 and the three interaction beats: **40 min = 46.5 wpm** (healthy), **30 min = 67.4** (in band as a total, but see B1), **15 min = 79.6** (at the ceiling).

**S5. Two of this talk's five named disciplines are also in the talk it defers to.** `README.md:127` says "Pair failure improvement with adaptive systems." Adaptive slide 12 (`adaptive-systems/index.md:219-235`) is titled *Ironies of Automation* and quotes Bainbridge at length; adaptive slide 13 (`:250`) is normalization of deviance, Vaughan, Challenger. This talk's slides 6 and 9 are the same two. The 6 September audit caught the Bainbridge overlap; the Vaughan overlap is new and is the more damaging one, because both talks use it for the same move (a repair/authority loop that widens on locally reasonable steps). If the pair is ever booked, one of the two Vaughan slides has to become a one-clause callback.

**S6. Harmonise the Bainbridge link.** `index.md:151` uses the ScienceDirect PII; `adaptive-systems/index.md:233` uses the DOI. Use the DOI in both. (The PII URL returns 403 to non-browser clients; that is bot-blocking, not rot, but the DOI is cleaner and there is a free scan at ckrybus.com if a fallback is ever wanted.)

**S7. `formats.md:15` undercounts its own lightning route.** "Seven minutes, four slides from the full deck: 1, 2, 8, 15." The 1:00–3:00 beat at `:20` narrates slide 3's rule *and* slide 4's mechanism. Say "four slides, borrowing two lines from 3 and 4," or the presenter will be a slide short of their own script.

**S8. `evidence.md:25` points the money rule at the wrong slide.** "Never let the loop be the caller for money, deletion, or customer messaging; a person presses the button. Say this on slides 8 and 12." Slide 8 (`index.md:117-134`) says nothing about money, deletion or messaging. Slide 7 does ("A documentation correction and a payment retry"), slide 9 does ("it does not wave through a payment or a data deletion"), slide 12 does. Change to "slides 7, 9 and 12."

**S9. The jidoka source is Toyota's own marketing page.** `index.md:134`. I fetched it: it defines jidoka as "automation with a human touch," machines that detect abnormalities and stop, and an andon board lit by a stop. The talk's correction — "The andon summons help; it is not a story about one cord stopping an entire company" — is accurate, and the page does support the definition. But a vendor self-description carrying the one manufacturing citation in a talk that otherwise cites four peer-reviewed sources is the soft spot. Ohno (1988), *Toyota Production System: Beyond Large-Scale Production*, Productivity Press, was recommended by the 5 September review and is one line.

**S10. `demo.md:15` is an empty `## Validation` heading** with nothing under it. Either fill it from `contracts.md:17` or delete it.

**S11. `packet.md:10-11` alternate titles.** "The Fail-to-Win Loop" is the strong one (skill move 5, name the technique, and it is slide 15's own title). "Hand Your Production Logs to an Agent" is a six-word instruction, not a name. Drop it. See Part B.3.

**S12. Slide 15 puts a glossary between the close and the last line.** `index.md:236` recites five definitions immediately before "The model did not get smarter." The Free Tier move it borrows works because the word list *is* the payoff; here it competes with `:240` "Replay the opening scroll beside the distilled artifact." Move the word list to the end of slide 14 and give slide 15 the scroll, one sentence and the landing.

## 5. NITs

- `index.md:3` "Sources checked 6 September 2026" and `evidence.md:3` "Revised 2026-09-06" predate the 7 September reorg that moved every path in this folder. Harmless, but a reviewer reading dates will ask.
- `visuals.md:3` "They illustrated the retired generated decks and remain available as source material" — correct and current. Both SVGs exist at `public/talks/assets/failure-improvement/{check,enrichment}.svg`.
- Link check, 8 Sept: gwern/Strathern 200, U. Chicago Press/Vaughan 200, Toyota 200, PubMed/Cvach 200, Anthropic evals 200. ScienceDirect 403 (bot block).

## 6. Part B — the ceiling

### 6.1 The better talk inside this one

The spine is right and sayable in a sentence: *an agent can work the queue your logs have been filling for years, every permission it gets is bought with evidence, and the last thing you automate is the part where it admits it does not know.* The arc is about 80% there. The 20% is an ordering problem, and it is one move.

Right now the first idea in the talk arrives at **13:00**, on slide 6. Minutes 04:30–13:00 are three slides of mechanism — the enrichment ladder, the bookmark, distill-then-classify — taught before the room has been shown why any of it is necessary. The 5 September review diagnosed the disease ("a well-ordered list of good ideas with no idea in it") and the 6 September rewrite prescribed the cure: three idea slides at 6, 9 and 13. But they were *inserted into* the build guide rather than made the spine. The build guide still runs the clock.

**Move slide 6 to position 3.** Slide 2 hands an agent the logs. Slide 6 shows exactly how that goes wrong in a way that looks like success: the retry that hid the 403. Then slides 3, 4, 5, 7 stop being instructions and become answers — the enrichment ladder exists because a stack trace alone cannot tell you the 403 was a boundary violation; the bookmark exists because the loop that finds it must not lose it; distillation exists because you cannot see a pattern in noise; and slide 7's "Tickets are cheap. Review is not." is *earned* rather than asserted, which is exactly what the 5 September review said about it.

This costs nothing — no slide is added or cut, no timing changes — and it fixes the peak for free (§6.5).

Second, smaller reorder: `formats.md:44` carries the best observation in the whole folder and it is buried in a workshop facilitation note — **"The classify block is where people discover their failure class is actually three. Let them split it; that is the 'one at a time' lesson landing."** `index.md:50` has a thinner version of it ("If the class turns out to contain three different mechanisms, split it. That discovery is useful work."). Put the workshop's phrasing on slide 5, where it is a punchline instead of an aside.

### 6.2 The thesis line

There is no designated load-bearing statement. There are two candidates and they argue with each other.

`index.md:9` (slide 1, on screen): **"The pager trained you to ignore it"** — this has the reversal shape. You thought you were monitoring the pager; the pager was conditioning you. It is the same move as *Don't fear training the model, worry how it's training you.*

`index.md:238` (landing): **"The model did not get smarter. The system around it got a job."** — flat, systems-shaped, no reversal, and not a shortening of the pager line. The skill requires the statement to return, shortened, as the landing. These two cannot both be the statement.

The deeper problem: "The pager trained you to ignore it" reverses on the **old** world — why nobody reads logs. The talk's actual argument, and its best slide, is about the **new** system: slide 9, what a month of green PRs does to the reviewer. That is where the reversal genuinely lives and where the talk stops being a build guide.

Three candidates in his voice, second person, present tense, one breath:

1. **Every green suggestion is teaching you to stop reading the next one.**
2. **You are not reviewing the agent's work, the queue is reviewing your attention.**
3. **Don't ask what the loop automated, ask what it promoted you to.**

(1) is the one. It closes the talk's own loop: slide 1 says the pager trained you to ignore it; slide 9 says the loop you just built is doing it again, from the other side. It makes alert fatigue and automation irony the *same finding* rather than two words on the closing list, and it turns the hostile expert's best attack (§6.6) into the thesis. Put it on slide 1 under the title, and land on it shortened.

### 6.3 The title

**FAIL.**

Say it at the bar: "I'm giving a talk called Automating Improvement From Failure." You have to add "…which is about handing your production logs to an agent," which is the skill's own disqualifying test (`SKILL.md:31`). It is four words, so it passes the length rule, but it is a gerund plus two abstract nouns plus a prepositional phrase — a summary, not a name. It uses none of the five moves: no hijack, no stinger, no verdict, no proper noun, no named technique. It reads as a course description.

It is also the only title in the portfolio table (`README.md:52-60`) with nothing in it. Its neighbours are *Buy Me a Free Tier*, *Three Search Methods in a Fundable Trenchcoat*, *Stop Looking at My Benchmarks… Get Your Own!*, *Turn Your Thinkin' Tokens Up to 11*, *Outsmart Your Lying, Cheating Students*. A committee reading the portfolio sees eight names and one syllabus entry. The 6 September audit reached the same verdict and deferred the fix as "a portfolio-wide rename, not a packet edit" — that is a scheduling reason, not a defence, and the rename surface is now nine files plus two shorts, not twenty-two.

Three replacements, one move each:

1. **Hijack a known phrase** — ***The Pager Cried Wolf***. One swap on the fable; the swap is the joke; it names the mechanism the opening runs on and pairs with the Cvach number. Four words.
2. **Flat declarative verdict** — ***Tickets Are Cheap. Review Is Not.*** Already `index.md:104` and the strongest sentence in the deck. Two clauses, no comma-thesis, and it is the talk's actual economic claim — which is what a committee is buying.
3. **Proper noun as protagonist** — ***Bainbridge Reviews Your PRs***. Puts the 1983 paper on stage as the antagonist and promises the one slide that is an argument rather than a build step. Four words.

Also sitting unused: ***Nobody Reads the Scroll*** (`index.md:5`), a clean flat verdict, and ***The Fail-to-Win Loop*** (`packet.md:10`), skill move 5.

### 6.4 The hallway number

**The talk currently has one number and it is synthetic.** `index.md:205`: "Suppose the agent files a hundred tickets and a reviewer closes ninety as wrong… Ten percent were worth reading. **That is our arithmetic fixture.**" The honesty is correct and the label must stay. But it means the only figure an attendee can carry out of the room is one the speaker disowned on stage. The moment they repeat "ten percent" to a colleague, the caveat is gone and the number is made up. That is a liability, not a hallway number.

**The real one is already in the talk's own first citation and is not being spoken.** Cvach 2012 §Findings describes Graham & Cvach's quality-improvement study on a 15-bed medical progressive care unit: **16,953 high-priority alarms over 18 days, cut 43% to 9,647** by eliminating duplicate alarms and setting actionable, patient-specific limits.

Arithmetic on stage, two computations the room can check:

- 16,953 ÷ 18 days ÷ 15 beds = **62.8 alarms per bed per day**. Sixty-three alarms per patient per day is why nobody reads the channel.
- (16,953 − 9,647) ÷ 16,953 = 7,306 ÷ 16,953 = **43%**. And 9,647 ÷ 18 ÷ 15 = **35.7 per bed per day** afterwards.

This is the number for three reasons. It is real and citable. It says exactly what the talk says — *the fix was not a smarter monitor, it was deduplication and a bounded, patient-specific threshold*, which is literally what slide 4's bounded window and slide 5's distillation do to logs. And it repairs B6 in the same sentence: "Cvach measured it" becomes true the moment you say what was measured.

Say the fixture too. Two numbers, one real and one labelled, is a stronger talk than one labelled number.

### 6.5 The peak

**Slide 8, 18:30–24:00, is a replay, and it is 22.7 wpm of it.**

The room met this fixture at 13:00 on slide 6, with the moral stated in full (`index.md:94`): "Now make the failure an authorization error. A second credential works, but the first request was forbidden for a reason. The green result hid the boundary violation." Slide 8 then spends five and a half minutes showing that same 403 failing a holdout. The answer is visible in the fixture before the walkthrough starts. And per `index.md:132` it is **saved output**, not a live run — so the emotional high point of a talk about automating improvement is a screenshot of a red test for a bug the audience was told about five minutes ago. 125 spoken words in 5:30 is the thinnest slide in the portfolio; the silence is not tension, it is a gap.

Two fixes, and they compose:

1. **The reorder in §6.1.** Move slide 6 to position 3 and fourteen minutes separate the setup from the payoff. The holdout failing becomes a resolution rather than a repetition.
2. **Give slide 8 the beat it actually owns.** The only thing at 18:30 the room does not already know is the last forty seconds — `index.md:130` "Unknown is an output. It lands in review with the evidence intact." That is the surprising claim in this talk: the system's most valuable output is a refusal. Lead slide 8 with it instead of burying it.

Worth saying plainly: **the real peak of this talk is slide 9.** It is the only slide that makes an argument you could disagree with, it is the only one that turns on the audience rather than the machine, it runs at a healthy 46.7 wpm, and it contains the best line in the deck (`index.md:149`): "Giving one engineer a hundred green suggestions is not giving them a hundred reasons to trust the next one." Slide 8 is marked `peak` because it has the demo. Demos are not peaks; surprises are.

### 6.6 The hostile expert

Row three is an SRE who has run a real incident-review program for four years. Their attack:

> "Your loop's output is *more tickets*. Your only defence against that is a reviewer, and on slide 9 you just told us Bainbridge proved that reviewer is going to get worse at the job. On slide 13 you told us ninety percent of the tickets are wrong. So the honest summary of your talk is: it converts an unread log queue into a read-but-mostly-wrong ticket queue, and it charges a human's attention for the conversion. Where is the evidence the trade is positive? You told us on slide 1 these are teaching fixtures. So you don't have any."

**The talk does not survive this cleanly.** Both halves of the answer are on stage — slide 9 owns the reviewer cost, slide 13 owns the metric honesty — but they sit eleven minutes apart and are never joined, so the room never hears the net-benefit condition stated. Nowhere does the talk say when the loop is *not* worth building.

The inoculation is one sentence, and it must be raised first — "cited to set aside" against Dan's own design. Best placement is the end of slide 7, before the peak:

> *"Be clear about what I am selling. I am asking you to move a queue, not delete one. The loop is worth it only if what arrives is smaller than what it replaced and carries its own evidence — and slide 13 is where you check whether it did. If your reviewer spends more time per inspected item than the failure would have cost you undetected, I have sold you a worse pager."*

That converts the strongest attack into a slide, gives slide 13 a reason to exist eleven minutes before it arrives, and is exactly the self-undercutting move the voice skill lists as in-bounds.

A weaker second attack, from a human-factors reader: "You cite Bainbridge and then prescribe rotation and sampling. She does not say rotation fixes it." The talk already survives this — `index.md:147` says **"My design response is…"**, correctly labelling the prescription as Dan's rather than Bainbridge's. Keep that phrasing exactly; it is doing real work.

### 6.7 Dead weight

**Cut slide 12, "Correlate, escalate, and the money gate" (32:30–35:00). Buys 2:30.**

- It is the slowest slide in the talk: 93 spoken words in 2:30 = 37.2 wpm, below the portfolio floor.
- Its landing, `index.md:196` "Detect, recommend, draft. A person presses the button," is already made twice: slide 7 "Match ceremony to consequence. A documentation correction and a payment retry do not get the same permissions," and slide 9 "A sampling policy is for the audit; it does not wave through a payment or a data deletion."
- Its one distinctive line, `:194` "A matching word is not a matching outage," is the same claim as slide 5's `:80` "Two matching strings are a family candidate. They are not a root cause."
- Its arithmetic is off by one (S3).
- `recording-plan.md:9` and `formats.md:9` already drop it for the 25-minute cut — the portfolio has independently identified it as the least load-bearing slide.

Fold "Detect. Recommend. Draft. A person presses the button." onto slide 7 as its closing line; it is a better landing for "Tickets are cheap. Review is not." than what is there now. Spend the reclaimed 2:30 as: **+1:00 to slide 14** (which fixes B3 and gives the write-down its full minute), **+1:00 to slide 1** for the Cvach arithmetic (§6.4), and **+0:30 to slide 5** for the workshop's "your failure class is actually three" punchline (§6.1).

### 6.8 The landing

`index.md:238`: **"The model did not get smarter. The system around it got a job."** Followed by `:240` "Replay the opening scroll beside the distilled artifact. End there. Stop talking."

**Form: pass.** Two short declaratives, no hedge, explicit silence. The 6 September audit was right to keep it.

**Fit: fail.** It lands a systems-engineering talk. The talk actually delivered spent its best slide on what the loop does to the reviewer and its most honest slide on how the loop will lie to you — neither of which is "the system got a job." And because there is no designated thesis (§6.2), the landing has nothing to be the shortened version of; it is orphaned.

If the thesis becomes *Every green suggestion is teaching you to stop reading the next one*, the landing shortens to it:

> **The pager trained you once. Don't let the loop do it twice.**

Two clauses, second person, the reversal, and it makes the closing visual — the opening scroll beside the distilled artifact — mean something instead of just rhyming. Then: stop talking.

If the thesis stays systems-shaped, keep the existing line and delete "The pager trained you to ignore it" from slide 1, because right now the talk opens on one thesis and closes on another.

## 7. What I could not verify

- **Cvach's internal figures.** The 16,953 → 9,647 / 43% study is reported in the review's abstract and secondary summaries; I did not read the full text of Cvach 2012 or the underlying Graham & Cvach paper (AAMI and Ovid are paywalled). Confirm the bed count, day count and both alarm totals against the paper before speaking them. The bibliographic record (46(4), 268–277, PMID 22839984, DOI 10.2345/0899-8205-46.4.268, integrative review, 72 articles, Johns Hopkins Nursing EBP model) is confirmed from PubMed and AAMI Array.
- **`mastra-agent-lab`.** Referenced by `demo.md:3`, `packet.md:85`, `README.md:34` and `evidence.md:21` as the home of every fixture the peak depends on. Per MEMORY.md the Mastra agent lab is a standalone repo unrelated to i18n work; I did not verify whether it exists or contains the incident-loop example. **The peak of this talk is currently a reference to a repository I cannot confirm exists.** That is the recording gate, and it is Dan's to close.
- **The four `Story:` slots** (`index.md:18, 98, 168, 183`). Correct by design, all named, all unfilled, none fabricated. `evidence-bank.md:75` indexes them accurately. Dan must supply at least three, including slide 1's, before recording.
- **Whether Vaughan's Chicago page is the 2016 enlarged edition** as `index.md:102` asserts — the URL resolves 200 but I did not confirm the edition on the page.
- **`shorts/what-happened-to-sarah.md:29` Skitka 1999** — cited in the child short but not on parent slide 9; `AUDIT-2026-09-06.md:38` flags that this citation "should be qualified to the trials where the aid was wrong" across three talks. Not this talk's text, so not audited here, but it is a live portfolio item touching this talk's child short.
