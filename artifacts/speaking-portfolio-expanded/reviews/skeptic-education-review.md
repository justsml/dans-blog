# Review: A Skeptic's Guide to Surviving AI in Education

Reviewed 2026-09-06 against `outlines/skeptic-education-40min.md` (14 slides), the 15- and 30-minute adaptations, `packets/skeptic-education/*`, `education/CFP.md`, `education/evidence.md`, `education/demo.md`, `demos/DEMO-RUNBOOK.md` §1, and `reveal-talks/skeptic-education.html`. Benchmark: `outlines/free-tier-40min.md`. Sibling: `outlines/evidence-learning-40min.md`.

---

## 1. Verdict

No, not against strong competition — this would place as a solid reserve, not an accept. It is careful, well-sourced, ethically clean, and it never once surprises anyone; a reviewer reading the 250-word abstract can predict all fourteen slides. The single biggest problem is that **the title promises a skeptic and the talk delivers a compliance officer.** A talk called "A Skeptic's Guide" that says "Demand Evidence" on its own title slide contains, from slide 1 to slide 14, exactly zero numbers, zero contested claims examined, zero moments where the speaker says "here is the thing everybody in this field repeats and here is why it's wrong." It cites four sources and agrees with all four. The second problem follows from the first: next to *Outsmart Your Lying, Cheating Students*, this is the same talk with the jokes removed and a taxonomy bolted on. The boundary is mushy, and the mush is on the load-bearing slides.

---

## 2. The roast

### 2.1 The demo is a dropdown that reads the slide back to you

Slide 5 (10:00–14:30, four and a half minutes — an eighth of the talk) prints this in the quote block:

> Spelling without assistance → Preserve
> Strength of an argument → Augment
> Scientific explanation → Delegate

Then the runbook says: "Begin with 'Spelling without assistance.' The result says Preserve. Switch to 'Strength of an argument' and then 'Scientific explanation.'" And: "**Expected outcome:** Preserve, Augment, Delegate."

So the audience reads the three answers off the slide, and then watches a web page display the three answers. This is failure pattern 4 in its purest form. There is no reveal, no risk, nothing that could come out differently. Free-tier's demo at least does arithmetic the room hasn't done; the sibling's demo breaks a shortcut the room formed sixty seconds earlier ($80 → +25% → −20% comes back to $80). This one is a lookup table with a `<select>` on it. Cut it or make it dangerous.

Also, the runbook says the demo is **three minutes**. The outline budgets **four and a half**. Someone is padding.

### 2.2 The peak is two minutes of the audience talking while the speaker stands there

The header says "peak at the pre-mortem." Slide 10 (25:00–29:00) is:

> Pairs, two minutes. One partner names how the assignment's AI policy failed... The other names the smallest change that would have caught it. Then thirty seconds of shared answers.

A pre-mortem is a good workshop activity. It is not a peak. The peak of a talk is the moment the speaker does something the room could not have done for itself. Here the speaker contributes one sentence — "This is how confidence is earned" — and hands the microphone to the room's own assumptions, which are the assumptions the talk is supposedly there to disturb. Compare slide 12 of free-tier: "This is the slide I would keep if you cut every other one." That is what a peak sounds like.

### 2.3 Three story slots, and the deck has already given up on them

Slides 1, 6, and 13 carry `Story:` slots. The built deck renders all three as:

> "No verified story was supplied. Omit this cue unless the presenter supplies an authorized firsthand account."

Meanwhile `packets/skeptic-education/evidence-bank.md` lists three candidates — Lambda School instructional analytics, Galvanize assessments, MagicSchool student features — with every substantive field left as `[ ]`. So the current shipping state of the talk is: forty minutes on AI in education from a person who ran a 2,500-student program across five countries, built instructional analytics, co-authored dozens of assessments, and shipped student-facing AI features, and the audience hears about none of it. Failure pattern 2, unambiguous.

The sibling talk does not have this problem, which makes it worse. *Outsmart* opens with the Casio watch confession and closes with the friend who never touched the wet clay because there was no car to carry it home. That talk has a person in it. This one has a framework.

### 2.4 The disclaimers moved rather than left

The header does the right thing — "Say it once on slide 1" — and slide 1 does say it once. Then:

- Slide 7: "One intervention, one setting." / "Reuse the design lesson, not a headline percentage, and check the corrected article before quoting numbers." / "Keep the treatment attached to the finding."
- Slide 8: "Evidence about tested tools, not every future detector."
- Slide 11: "A benchmark score cannot certify your lesson."
- Slide 13: "TEQSA's guidance supports multiple contextual approaches; this is one local implementation."

That is five more hedges, three of them stacked inside slide 7 alone. The scope disclaimer was consolidated; the *evidence* disclaimers were not. The tell is slide 7's instruction to the audience to "check the corrected article before quoting numbers" — that is a note-to-self about the PNAS correction, escaping onto the stage as an apology. Free-tier does the honest version of this move on slide 8 with QWERTY: "The concept survives. The canonical example is contested." One sentence, delivered as an argument, and it makes the speaker look sharper rather than nervous. Say the correction out loud as a skeptical act, once, and stop.

### 2.5 Slides 11–13 are a different talk for a different buyer

Slides 1–5 are addressed to an instructor holding one assignment. Slides 6–9 are a failure-mode listicle. Slides 11–14 are addressed to whoever runs procurement: "Two educators score the teaching moves," "Estimate staff time," "Agree what improvement justifies continuing," "In the next vendor demo, ask them to walk through one learner misconception." The instructor who came in holding one assignment cannot commission a second grader or negotiate with a vendor. The packet's four audience-specific abstracts are the symptom, not the cure — you have written four abstracts because the talk genuinely has four different addressees and hasn't chosen one.

(To be fair on failure pattern 8: those four abstracts are *not* copy-pasted boilerplate. I checked all five packets; the Executive paragraphs are genuinely per-talk. Credit where due.)

### 2.6 Delegate / Augment / Preserve is presented as if the field had no words for this

Slide 4 offers a three-column framework as the talk's organizing device. Two problems.

First, your own packet cites the published alternative and then hides it: `packet.md` references "Perkins, Furze, Roe, MacVaugh (2024). The Artificial Intelligence Assessment Scale (AIAS). Journal of University Teaching and Learning Practice. [Verify citation and add DOI before submission.]" That is a peer-reviewed five-level scale doing the same job, in your reference list, unmentioned on stage. Any faculty-development reviewer who knows AIAS will ask why a proposed three-column device beats a published five-level one, and "it's mine" is not an answer.

Second, the underlying idea has a name and a date in the learning-sciences literature — see §3. Failure pattern 5, and it's the pattern that costs this talk the most, because "the same help lands in a different column depending on the objective" is exactly the kind of claim that sounds like folk wisdom when unnamed and like expertise when named.

### 2.7 A talk that says "Demand Evidence" and never states a number

Search the outline for a digit that isn't a timestamp or a slide number. There is one: "week ten." Fourteen slides about evaluating claims, and the speaker never once does the thing on stage — never quotes a magnitude, never compares two effect sizes, never says "this number is the one everyone repeats and here is what happened when someone measured it." The closest is slide 7's explicit refusal: "Reuse the design lesson, not a headline percentage." Refusing to quote a percentage is a defensible research posture and a fatal stage posture. Failure pattern 6, hit hard. Free-tier gives the room "75% acceptance means 1.33× sticker; 45% means 2.22×; a 30-point acceptance drop costs what doubling every token price costs." That is a hallway number. This talk has none. §3 hands you one that is free, checkable, and directly on-theme.

### 2.8 Boundary with the sibling: mushy, and mushy where it counts

You asked. Blunt answer: as written, roughly a third of the Skeptic talk has a counterpart in *Outsmart* that is better staged, better written, and funnier.

| Skeptic | Outsmart | Verdict |
|---|---|---|
| 3: "A formatted essay proves an essay exists." | 4: "The prose is clean. The denominator is wrong." | Same move. Outsmart's is sharper and has a fixture. |
| 8: detector as judge, Liang | 2: detector as judge, Liang | Same source, same conclusion, same slide. |
| 7: Bastani, supported vs unaided | 8: Bastani, supported vs unaided | Same source, same conclusion. |
| 11: "record supported and independent performance separately" | 6/8: "Write down which rung you gave, because supported and independent performance are different evidence." | Identical claim. |
| 13: pairs, redesign one assignment, estimate staff time, TEQSA | 13: pairs, redesign one checkpoint, minutes to review a class set, TEQSA | Same exercise, same slide position, same citation, same minute (33:30–37:30 vs 34:30–38:00). |
| 14: "the reason they're there" | 14: "Explain it. Challenge it. Change it. Apply it. Defend it." | Same landing. |

What is *only* in Skeptic: the DAP columns (slide 4), unequal access (9), the pre-mortem (10), humans-at-consequential-decisions (12), and the vendor questions (13b). Call it thirteen minutes of genuinely distinct material in a forty-minute talk. A program director who books both gets Bastani twice, Liang twice, TEQSA twice, and the same pairs worksheet twice, in the same conference.

There is also a documented three-way disagreement about what this talk's demo even is:
- `outlines/skeptic-education-40min.md`: "The percentage-change fixture belongs to the assessment-design talk, so the two can be booked together."
- `education/demo.md`: "**A Skeptic's Guide: four-minute capability audit** ... **Exact fixture:** 'A shop raises a $100 price by 20%...'" — i.e. the percentage fixture, assigned to this talk.
- `education/CFP.md`, 150-word abstract: "A worked percentage problem shows why a polished answer, a corrected explanation, and an independent transfer task support different conclusions."

Two of your three CFP-facing documents give this talk the fixture the outline explicitly gave away. Fix before submission — a committee reading the abstract and the outline together will notice.

### 2.9 Deck and CFP drift on the basic facts

`education/CFP.md`: "**Format:** 40 minutes, 18 slides, including a four-minute exercise and four-minute application discussion." The outline is 14 slides with a 2:30 exercise and a 45-second discussion. There is no 18-slide version and no four-minute application discussion anywhere in the repository. The reveal deck agrees with the outline (`14 / 14`), so the CFP is the stale artifact.

### 2.10 Not a hit: timing fiction

Counted honestly, the 40-minute version has four audience beats totalling about 4:45 (60s write, 45s ask, 2:30 pre-mortem including share, 45s write). That is 12% of the running time and entirely deliverable. The 30-minute adaptation's claim that "each loses about a quarter of its time" is arithmetically true for a 40→30 cut. The 15-minute version keeps two beats totalling 2:00. This talk does not have the timing problem the others had. Say so and move on.

### 2.11 Not a hit, but worth noting: the voice is gone

There is not one joke in fourteen slides. Not one. The register is "Decisions about a learner on a task at a stage, not permanent lists" and "A policy that creates unequal access distorts the measurement before the first answer." That is a well-written policy memo. It is not the person who wrote "Johnny ain't learning too good," "Life finds a way," or "You didn't check the results? Johnny, you're not gonna make it." Failure pattern 9 with a twist: the title has the attitude, the body has none, and the sibling talk has all of it. If a committee reads both, they book the sibling.

---

## 3. The missing discipline

The talk cites four sources: three studies and one regulator's guidance, all from 2023–2025. That is a news summary, not a discipline. Education has a hundred years of exactly this argument, and importing it is the difference between "sensible advice" and "I have never thought about it that way." Every concept below has a precise name, a primary source, and a slide it should replace.

**Verify each before quoting. I have named author, year and venue for all of them; check the pages against the record.**

### 3.1 The assistance dilemma — the name for Delegate / Augment / Preserve

Koedinger, K. R., & Aleven, V. (2007). *Exploring the assistance dilemma in experiments with Cognitive Tutors.* Educational Psychology Review, 19(3), 239–264.

They named the exact problem slide 4 poses — when to give information and when to withhold it so the learner has to generate it — and demonstrated it empirically inside intelligent tutoring systems, nineteen years ago. This is the single highest-value import in the review. Saying "the learning sciences named this in 2007 and called it the assistance dilemma, and the honest answer is that it depends on the learner and the moment" turns a proposed taxonomy into an inherited one. It also disarms 2.6: DAP stops competing with AIAS and becomes a classroom-usable handle on a known dilemma.

### 3.2 Expertise reversal — why the columns move

Kalyuga, S., Ayres, P., Chandler, P., & Sweller, J. (2003). *The expertise reversal effect.* Educational Psychologist, 38(1), 23–31.

Instructional support that measurably helps novices measurably *harms* more advanced learners on the same material. This is slide 4's "the same activity moves columns" claim, except it is a replicated finding with a mechanism (redundant guidance imposes extraneous cognitive load) rather than a plausible assertion. It also supplies the missing dimension: the talk currently varies assistance by *objective* and never by *learner*, which is the axis the evidence is strongest on.

### 3.3 Learning versus performance — the actual explanation of Bastani

Soderstrom, N. C., & Bjork, R. A. (2015). *Learning versus performance: An integrative review.* Perspectives on Psychological Science, 10(2), 176–199. And for the mechanism: Bjork, R. A. (1994). *Memory and metamemory considerations in the training of human beings*, in Metcalfe & Shimamura (eds.), Metacognition, MIT Press — the origin of "desirable difficulties."

Slide 7 presents Bastani as news. It is not news; it is a fifty-year-old regularity with a name. Performance during training and learning measured later routinely dissociate, and conditions that *improve* performance during practice frequently *degrade* long-term retention and transfer. An AI tutor is, from this literature's point of view, a machine for removing desirable difficulties at industrial scale. That reframing is worth more than the study, because it tells the room what to predict about the next twenty tools rather than about one trial in one school.

### 3.4 Construct-irrelevant variance and construct underrepresentation — the names for slide 3

Messick, S. (1989). *Validity*, in R. L. Linn (ed.), Educational Measurement, 3rd ed., Macmillan, 13–103. Shorter and more quotable: Messick, S. (1995). *Validity of psychological assessment.* American Psychologist, 50(9), 741–749. For the modern argument-based form: Kane, M. T. (2013). *Validating the interpretations and uses of test scores.* Journal of Educational Measurement, 50(1), 1–73.

Slide 3 says "the proxy is not the capability" and slide 9 says grading speaking ease by accident. Those are two halves of one named idea. *Construct underrepresentation*: the assessment misses part of what you meant to measure. *Construct-irrelevant variance*: scores move for reasons that have nothing to do with it. Every failure mode in the talk is one or the other. A polished AI essay is construct-irrelevant variance in an essay-based measure of source judgment. A detector penalising non-native writers is construct-irrelevant variance in a misconduct decision. An oral checkpoint scoring fluency is construct-irrelevant variance in a history assessment. Kane's contribution is the frame the whole talk is already reaching for: validity is not a property of a test, it is an *argument* about a specific interpretation and use, and it can be written down and attacked. That is what "name the capability, choose the evidence" is, and it has been called an interpretive argument since the 1990s.

### 3.5 Transfer is rare, and the talk assumes it casually

Barnett, S. M., & Ceci, S. J. (2002). *When and where do we apply what we learn? A taxonomy for far transfer.* Psychological Bulletin, 128(4), 612–637.

Slide 2 proposes the falsifiable claim "students using this hint sequence will explain source bias on a new document next week." Barnett and Ceci's taxonomy exists because that sentence hides at least six dimensions of distance (content, context, modality, temporal, functional, social) and the literature's consistent finding is that transfer falls off fast as those distances grow. This lets the speaker do something genuinely useful and slightly uncomfortable: take the room's own proposed evidence and show that most of it tests near transfer, and near transfer is the easy case.

### 3.6 Automation bias and the ironies of automation — the names for failure modes 1 and 3, and the one you're missing

Skitka, L. J., Mosier, K. L., & Burdick, M. (1999). *Does automation bias decision-making?* International Journal of Human-Computer Studies, 51(5), 991–1006. Also Parasuraman, R., & Riley, V. (1997). *Humans and automation: Use, misuse, disuse, and abuse.* Human Factors, 39(2), 230–253.

Bainbridge, L. (1983). *Ironies of automation.* Automatica, 19(6), 775–779.

"Sycophancy" describes the model. *Automation bias* describes the human — errors of commission (following a wrong automated recommendation) and omission (missing what the automation didn't flag). That is the right word for slide 6 *and* slide 8 at once, and it moves the diagnosis from the vendor's model to your own faculty. Bainbridge supplies the failure mode the talk does not have: automating the routine parts of a job leaves the human responsible for exactly the cases automation can't handle, while removing the daily practice that kept them competent at those cases. Applied here: the teacher who lets a tutor handle explanation is the teacher asked to adjudicate the one confusing transcript, with a year less practice at reading confusing transcripts. Student deskilling is the conference-circuit anxiety. *Teacher* deskilling is the one nobody is talking about, and it belongs in this talk.

If you want the model-side citation to sit beside the human-side one: Sharma et al. (2023), *Towards Understanding Sycophancy in Language Models*, arXiv:2310.13548 (ICLR 2024) — sycophancy as a measured, trained-in property of RLHF'd assistants, not an anecdote.

### 3.7 Campbell's law — the name for the dashboard that counts completed exercises

Campbell, D. T. (1979). *Assessing the impact of planned social change.* Evaluation and Program Planning, 2(1), 67–90. Original 1976 paper, Occasional Paper Series, Dartmouth.

"The more any quantitative social indicator is used for social decision-making, the more subject it will be to corruption pressures and the more apt it will be to distort and corrupt the social processes it is intended to monitor." Campbell's own worked example was achievement testing. Slide 7's throwaway line — "A dashboard counting completed exercises tells you the system is busy" — is Campbell's law in a sentence, unattributed, and it is a much bigger idea than the position it currently occupies. Goodhart (1975) is the economists' version and the more famous one; Campbell is the one who wrote it about schools, which is why he is the right citation for this room. For the empirical follow-through in education, Koretz, D. (2008), *Measuring Up: What Educational Testing Really Tells Us*, Harvard University Press.

### 3.8 The history — a hundred years of this exact promise

Skinner, B. F. (1958). *Teaching machines.* Science, 128(3330), 969–977. (Pressey's automatic testing machine predates it, 1920s.)
Cuban, L. (1986). *Teachers and Machines: The Classroom Use of Technology Since 1920.* Teachers College Press.
Cuban, L. (2001). *Oversold and Underused: Computers in the Classroom.* Harvard University Press.

Cuban's finding is the one a skeptic should open with: film, radio, television, and computers were each promised as the individualization of instruction, each was purchased at scale, and each ended up used in ways that left the fundamental grammar of the classroom intact. That is not a reason to refuse AI. It is a reason to be extremely specific about what would be different this time — and demanding that specificity is what the title advertises and the current opening does not deliver.

### 3.9 The number, and it is checkable

Bloom, B. S. (1984). *The 2 sigma problem: The search for methods of group instruction as effective as one-to-one tutoring.* Educational Researcher, 13(6), 4–16.

VanLehn, K. (2011). *The relative effectiveness of human tutoring, intelligent tutoring systems, and other tutoring systems.* Educational Psychologist, 46(4), 197–221.

"Bloom's 2 sigma" is the most-quoted number in the AI-tutoring sales deck, and it is quoted almost entirely by people who have not read the paper. It came from two dissertations under Bloom's supervision, with small samples, on mastery-learning conditions, and it has not held up at that magnitude. VanLehn's review put human tutoring at roughly d = 0.79 and intelligent tutoring systems at roughly d = 0.76 — that is, the machines were already at parity with human tutors in 2011, and *both* were less than half the advertised effect. Kulik, J. A., & Fletcher, J. D. (2016), *Effectiveness of intelligent tutoring systems: A meta-analytic review*, Review of Educational Research, 86(1), 42–78, reports a median effect around 0.66 in the same neighbourhood.

Check the exact figures against the papers before you say them on stage, and say clearly that these are meta-analytic medians over heterogeneous studies, not a single measured quantity. But this is your number. It is on-theme, it is free, it is repeatable in a hallway, and it lets the talk *do* skepticism in the first three minutes instead of describing it. Suggested register: "Two sigma. Everybody's deck has it. When somebody actually went and measured tutoring, it was point seven nine. And the machines were already at point seven six — in 2011. The number you were sold is more than double the number anybody has found."

---

## 4. A proposed new arc

**Spine, one sentence:** Help given during learning and evidence of learning are two different measurements, and almost every argument in this room — the miracle tutor, the cheating panic, the detector, the dashboard — is somebody confusing the two.

**Boundary with the sibling, stated so a program can book both:** *Outsmart* designs the assessment. *Skeptic* decides how much help, for whom, at which moment, and how to read anybody's claim that it worked. Skeptic keeps Bastani and the history; **Outsmart keeps Liang and TEQSA and the pairs-redesign worksheet.** Skeptic does not do detectors and does not do a redesign worksheet.

15 slides, 40:00, four audience beats totalling 4:45.

| # | Slide | Min | Time | Does | Status |
|---|---|---:|---|---|---|
| 1 | Two sigma, and the number somebody actually measured | 3:00 | 00:00–03:00 | Opens with the checkable number from §3.9. Bloom's 2.0 vs VanLehn's 0.79 vs ITS at 0.76 in 2011. One scope line, once, then stop qualifying. Names the one thing the talk hands over: six words from a real discipline. | **new** |
| 2 | Nobody has ever not promised this | 2:30 | 03:00–05:30 | Cuban's hundred years: film, radio, television, computers, each sold as individualized instruction, each absorbed by the grammar of the classroom. Pressey and Skinner's machines. Sets the skeptic's real question: what is different this time, specifically? | **new** |
| 3 | Skepticism is a method, not a mood | 2:00 | 05:30–07:30 | Three questions, compressed. Cut the "two failures you will hear about this year" preview — the talk delivers them anyway. | **kept, cut to the bone** |
| 4 | Construct-irrelevant variance | 2:30 | 07:30–10:00 | Word one and two. Messick's pair replaces "the proxy is not the capability." The polished essay, the detector, the oral checkpoint: all one named failure. History-essay objective stated once, here, and not repeated. | **merged (old 3 + old 9), reframed** |
| 5 | The assistance dilemma has a name and a date | 3:00 | 10:00–13:00 | Word three. Koedinger & Aleven 2007. DAP demoted from The Framework to a classroom handle on a known dilemma; acknowledge AIAS in one sentence and say why you use three columns anyway. Keep the 60-second write. | **kept, reframed (old 4)** |
| 6 | The same help, a different learner | 2:30 | 13:00–15:30 | Word four: expertise reversal. Support that helps the novice harms the expert on the same material. Supplies the axis the talk was missing. | **new** |
| 7 | Learning is not performance | 3:00 | 15:30–18:30 | Word five. Soderstrom & Bjork; desirable difficulties. *Then* Bastani, as an instance rather than a headline. Say the correction out loud once, as a skeptical act, and move. | **merged (old 7a), reframed** |
| 8 | Kestin, and what was actually in the box | 2:00 | 18:30–20:30 | The counterweight: a designed tutor beat active learning on immediate outcomes. Ask what the tutor made the learner *do*. Immediate outcomes are performance; see slide 7. | **kept (old 7b), split out** |
| 9 | Demo: four cases, live, against a real tutor | 5:00 | 20:30–25:30 | **The peak.** Promote the old slide 11 eval set into the demo. Confident wrong answer, right answer with faulty reasoning, a request for the solution, a learner the tutor misunderstands. Run them live. Something can go wrong on stage; that is the point. Fallback is the prepared transcripts, not the dropdown. | **new (absorbs old 5 and old 11); old slide 5 dropdown demo CUT** |
| 10 | Automation bias | 2:30 | 25:30–28:00 | Word six, covering the human side of what the demo just showed. Skitka on errors of commission and omission. This replaces both old slide 6 (sycophancy) and old slide 8 (detector as judge); detectors and Liang move wholly to the sibling talk, with one sentence of pointer. | **merged (old 6 + old 8), reframed** |
| 11 | Ironies of automation: the teacher deskills too | 2:30 | 28:00–30:30 | Bainbridge 1983. The conference-circuit anxiety is student deskilling; the unexamined one is that the teacher asked to adjudicate the hard case is the teacher who stopped practising on the easy ones. This is the talk's thought-provoking slide and it has no counterpart in the sibling. | **new** |
| 12 | Campbell's law and the dashboard that counts exercises | 2:30 | 30:30–33:00 | Word seven if you want a seventh. Campbell wrote it about schools. Promotes a throwaway line from old slide 7 into an argument. Record supported and independent performance separately — stated *here*, not also in the sibling. | **new (promotes a line from old 7)** |
| 13 | Week ten, and the policy failed | 3:00 | 33:00–36:00 | The pre-mortem, kept, but moved off the peak and given the new vocabulary to work with: which named failure was it — construct-irrelevant variance, expertise reversal, automation bias, Campbell? Pairs, two minutes, thirty seconds shared. | **kept, reordered (old 10)** |
| 14 | One assignment, one pilot, four questions for a vendor | 2:30 | 36:00–38:30 | Old 13 compressed hard. **Drop the pairs redesign worksheet entirely — that is the sibling's slide 13.** Keep only: baseline, staff time, continuation rule, and the vendor questions, which are unique here. | **merged (old 12 + old 13), heavily cut** |
| 15 | The reason students are here | 1:30 | 38:30–40:00 | Six words read back, the way free-tier's slide 15 does. 45-second write. The closing line survives; put it in Dan's register rather than the balanced-clause version. | **kept (old 14), cut to 1:30** |

**Cut outright:** old slide 5 (the dropdown demo), old slide 8 (detectors — belongs to the sibling), old slide 13's pairs worksheet (belongs to the sibling). **Story slots survive at 1, 9 and 14** and must be filled from the evidence bank before submission — describe the slot, not the story: slide 1 wants the assignment that broke first; slide 9 wants a tutor answer that was confidently wrong and got accepted; slide 14 wants a pilot and what was kept.

**The six words, listed back on slide 15:** construct-irrelevant variance, assistance dilemma, expertise reversal, learning-versus-performance, automation bias, Campbell's law. Same structural device as free-tier's eight words, different discipline, and it gives the talk a spine you can state in one sentence and a hallway artifact.

---

## 5. The one thing

**Do skepticism on stage instead of describing it.** Concretely: open with the two-sigma number and its measured replacement (§3.9), and make the peak a *live* four-case eval run against a real tutor (new slide 9) where the room watches something fail in front of them. Right now the talk asks the audience to be skeptical while the speaker performs no act of skepticism at all — it cites four sources and agrees with every one, refuses to state a single number, and its "demo" is a lookup table confirming the bullet points printed above it. One number that contradicts the industry's favourite slide, and one live moment that can go wrong, and this stops being a policy memo with a provocative title.

---

## 6. Facts to check or claims to soften

1. **The 18-slide claim.** `education/CFP.md`: "**Format:** 40 minutes, 18 slides, including a four-minute exercise and four-minute application discussion." The outline and the deck are both 14 slides, with a 2:30 exercise and a 45-second discussion. No 18-slide version exists in the repo. Fix the CFP before submission.

2. **Which talk owns the percentage fixture.** `outlines/skeptic-education-40min.md` gives it away ("belongs to the assessment-design talk"); `education/demo.md` assigns this talk a "four-minute capability audit" built on it; `education/CFP.md`'s 150-word abstract promises "a worked percentage problem." Three documents, two answers. Pick one and propagate.

3. **Demo duration.** Runbook §1 says three minutes; outline slide 5 budgets 4:30. Moot if you cut the demo as recommended, but fix it if you keep it.

4. **The AIAS citation is unverified in your own file.** `packet.md` carries "[Verify citation and add DOI before submission.]" on Perkins, Furze, Roe & MacVaugh (2024). Verify it, then either use it on stage or remove it from the references — a reviewer who checks the list and finds an uncited, unverified entry draws conclusions.

5. **Bastani's correction.** `education/evidence.md` is candid that "Correction metadata was verified; its full text was inaccessible in this research pass." Until the corrected text is read, do not state any directional magnitude, and do not paraphrase the finding more tightly than "assisted practice improved while later unaided performance was worse in the unrestricted condition, and teacher-designed safeguards mitigated that." Confirm the correction's scope before delivery.

6. **Kestin should not be described as "beat active learning."** The outline's shorthand — "a designed tutor beat active learning on immediate outcomes" — will be heard as a general result. State the design: one university physics course, a specific engineered tutor, immediate post-test. Confirm the study's design details (crossover/randomization, N, outcome timing) against the published paper before summarizing it in one line on a slide.

7. **Slide 6's "Sycophancy is the first failure to expect."** Asserted with no source. Either cite Sharma et al. (2023), arXiv:2310.13548, or say "the first failure I expect," which is honest and is also more in your register.

8. **"AI scales instruction far more easily than it scales wisdom"** (slide 12). Nice line, unsupported, and doing argumentative work. Either demote it to an explicit opinion or replace it with Bainbridge, who makes the same point as a documented engineering failure mode.

9. **Verify every §3 citation before use.** I have given author, year, venue and volume for each. Check the page ranges and the effect sizes — particularly VanLehn (2011) 0.79 / 0.76 and Kulik & Fletcher (2016) 0.66 — against the papers themselves, and present them as meta-analytic medians over heterogeneous studies, not as measurements of a single quantity. Bloom's 2 sigma should be described accurately as derived from two supervised dissertations under mastery-learning conditions; the honest framing is "it has not held up at that magnitude," not "it was fabricated."

10. **Do not claim the two-sigma correction is settled.** The tutoring-effect literature is heterogeneous and the comparisons across VanLehn, Kulik & Fletcher and Bloom are not like-for-like. Say that in one sentence on stage. It costs you nothing and it is the only place in the talk where hedging is the argument rather than an apology for it.
