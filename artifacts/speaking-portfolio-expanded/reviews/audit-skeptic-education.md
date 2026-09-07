# Audit: skeptic-education (A Skeptic's Guide to Surviving AI in Education)

Audited 2026-09-06 against `outlines/skeptic-education-40min.md` (canonical, 14 slides), both adaptations, `packets/skeptic-education/*`, `build-talk.ts`, `demos/DEMO-RUNBOOK.md` §1, `demos/index.html`, `education/{CFP,demo,evidence}.md`, `shorts/detector-is-a-biased-coin.md`, both reviews, both READMEs, and the reveal decks (grep only). External checks run on Bastani 2025 (article and correction) and Kestin 2025.

## 1. Verdict

Needs a pass, and before that a decision: the retirement plan was neither executed nor rejected, and in the meantime Outsmart absorbed the exact vocabulary (Koedinger and Aleven, Soderstrom and Bjork, Skitka) that the Skeptic review prescribed for Skeptic's own rewrite, so the rewrite path is now closed. Recommendation: **merge into evidence-learning** by executing the transplant rows, then retire the 40-minute deck, keeping only the procurement material (slides 2, 11, 13b) as one lightning route under Outsmart's packet. If it is delivered as-is in the meantime, the slide 7 correction line and the demo.md fixture must be fixed first.

## 2. Blocking

| file:line | quoted text | problem | concrete fix |
| --- | --- | --- | --- |
| `outlines/skeptic-education-40min.md:119` | "Reuse the design lesson, not a headline percentage, and check the corrected article before quoting numbers." | The PNAS correction (10.1073/pnas.2518204122, 20 Aug 2025, 122(34)) fixes one author affiliation (Osbert Bastani → Dept. of Computer and Information Science, Penn). No number, figure or result changed. Saying this on stage implies the findings were corrected. | Delete the clause. If a caveat is wanted: "The only correction to that paper is an author's department." Then quote the numbers or don't; see §4. |
| `education/evidence.md:8` | "Correction metadata was verified; its full text was inaccessible in this research pass. Check corrected text before adding numerical results." | Stale; the correction text is public (PMC12403119) and is affiliation-only. | Replace with: "Correction (Aug 2025) is an affiliation fix; results unchanged." |
| `education/demo.md:5–17` | "A Skeptic's Guide: four-minute capability audit … Exact fixture: 'A shop raises a $100 price by 20%…'" | Outline line 13 and Outsmart line 9 both say the percentage fixture belongs to Outsmart. demo.md still builds Skeptic's exercise on it and only gestures at "its own history-essay fixture," which is written nowhere. The three-switch demo that slide 5 actually runs is relegated to an "optional stagekit alignment" paragraph. | Rewrite §"A Skeptic's Guide" as the slide 5 demo (three switches, history-essay translation) and drop the percentage audit; or write the history-essay fixture out in full. |
| `packets/skeptic-education/formats.md:40–55` | "## 60–75 minute workshop" with blocks 0:00–1:35 | Blocks sum to 95 minutes (10+15+15+10+15+10+10+10). | Retitle "90-minute workshop" or cut 20–35 minutes (e.g. fold 0:10–0:25 into the DAP block, cut the demo block to 5). |
| `packets/skeptic-education/formats.md:21` | "[30-minute adaptation]; drop slide 9 for 25" | Slide 9 is 1.5 min on the 30 route; dropping it gives 28:30, not 25. | "drop slides 3, 9 and 12 for 25" (1.5+1.5+1.5 = 4.5 → 25:30) or run the 30 route with slide 5 at 2:00. |
| `packets/skeptic-education/packet.md:62` | "Perkins, Furze, Roe, MacVaugh (2024). The Artificial Intelligence Assessment Scale (AIAS). … [Verify citation and add DOI before submission.]" | A submission packet carries an unverified reference that no slide uses. | Verify (JUTLP 21(6), 2024; expected DOI 10.53761/q3azde36) and cite it on slide 4 in one sentence, or remove the entry. |

## 3. Consistency findings

- Timings sum and are monotonic: 2.5+2.5+2+3+4.5+2.5+4+2+2+4+3.5+2+3.5+2 = 40:00. `build-talk.ts:682–686` accepts the en-dash form (`(?: to |–)`) and `padStart(5,"0")` normalises "0:00"; the sanity chain at `build-talk.ts:855–860` passes (generated scripts and adaptations dated Sep 6 03:11 carry the right times). Parsing confirmed.
- Route sums: 15 → 1.5+1+2.5+2.5+2+1.5+1.5+1.5+1 = 15.0; 30 → 2+2+1.5+2.5+3.5+1.5+3+1.5+1.5+3+2+1.5+3+1.5 = 30.0. `keep` arrays match the adaptations' "Keep slides" lines.
- `build-talk.ts:96,100` bridges keyed 4 and 7 are written as "Bridge **in** with slide 3's objective…" / "Bridge **in** with slide 6 in one line…" but the type says a bridge is "spoken after a kept slide," and the script prints them after the slide's own text (`script-15min.md:47,81`). Re-key them to 2 and 5 respectively, or reword as bridge-out lines.
- `script-15min.md:17–19` prints the slide 1 Story placeholder and then "drop the story"; `reveal-talks/skeptic-education-15min.html` still renders the slide 1 and slide 13 Story placeholders although the route drops both. Generated behaviour, not a content error, but the deck notes contradict the route.
- `packets/skeptic-education/formats.md:27–34` lightning: 1+2+2.5+1.5 = 7:00. OK. Its slide 4 beat says "with the citation and counter-reading examples" and slide 7 "Bastani and Kestin in two minutes", both match the outline.
- `formats.md:38` live-demo format runs the four-case eval set "against a real tutor"; the outline's slide 5 demo and runbook §1 are the three-switch kit. Two different demos are described as "the demo" in the same packet; the four-case one exists only as prose.
- `demos/DEMO-RUNBOOK.md:9` now says "Four and a half minutes, matching slide 5" (review item 3 fixed). Kit labels in `demos/index.html:8` ("Spelling without assistance", "Strength of an argument", "Scientific explanation") and `demo-logic.js:4–6` verdicts (Preserve, Augment, Delegate) match slide 5's visible lines exactly. Internal option value `formatting` for "Scientific explanation" is harmless.
- `education/CFP.md:29` "three-minute assistance exercise and a two-minute pre-mortem" vs outline slide 4 "Write it (60 s)" and slide 10 "two minutes … then thirty seconds." The exercise figure is wrong; 14 slides is now right (review item 1 fixed).
- `education/CFP.md:21–23` learning outcomes ("Redesign an artifact-only assignment to elicit explanation and transfer") differ from `packet.md:38–40` (pilot design, four failure modes). Outcome 2 is Outsmart's outcome. Pick the packet's three.
- `education/CFP.md:27` "It is distinct from Evidence of Learning" and `packets/speaker/bio.md:76–77` "Evidence of learning" use the sibling's retired title; current title is Outsmart Your Lying, Cheating Students.
- `education/CFP.md:9` promises "an assessment redesign, a tutor evaluation checklist"; the talk's artifacts (packet.md:48–50, formats.md:59) are the DAP worksheet, the four-case eval set and the vendor questions. Align the 50-word abstract with the packet.
- Ownership of `education/*`: `CFP.md` is shared (one section per talk, lines 5–29 Skeptic, 31–55 Outsmart); `evidence.md` is shared (Liang and TEQSA serve both, Bastani both, Kestin Skeptic only); `demo.md` is shared but its Skeptic section is currently an Outsmart exercise wearing Skeptic's heading (see Blocking). Outsmart's outline links `education/demo.md` as its "Walkthrough" (`evidence-learning-40min.md:7`); Skeptic's does not link it at all, so demo.md is effectively Outsmart's.
- `evidence-bank.md:53–54` references slides 2, 14 and 11; all still point at the content named. Story-slot table (1, 6, 13) matches the outline.
- `shorts/detector-is-a-biased-coin.md:3` names Outsmart slide 2 and Skeptic slide 8; both still carry Liang and the detector-as-judge claim. The short's caption "authorship ≠ learning ≠ misconduct" matches slide 8's visible line. `shorts/README.md:30` row is correct.
- Reveal deck headings (lines 45–58) match the outline; Story lines now render as bracketed prompts, not the "No verified story was supplied" apology the review saw. Notes render markdown link syntax raw ("Follow [runbook section 1](../…)") on slide 5; cosmetic, shared with other decks.
- `README.md:9` "Skeptic remains unchanged pending a retire-or-procurement decision" and `reviews/README.md:12,48` agree with each other and with the state of the files.
- `packets/speaker/recording-plan.md:48` "Weak; record the skeptic talk next" contradicts the reserve verdict.
- No `artifacts/flagship-talks/skeptic-education-*` files exist; nothing to clean there.

## 4. Correctness findings

- **Bastani et al. (2025)**, PNAS 122(26) e2422633122, published 25 Jun 2025; authors Hamsa Bastani, Osbert Bastani, Alp Sungu, Haosen Ge, Özge Kabakcı, Rei Mariman. Field experiment, ~1,000 high-school maths students (Turkish high school), GPT-4. Verified from the abstract: practice grades +48% (GPT Base) and +127% (GPT Tutor); subsequent unassisted exam −17% for GPT Base vs control (0.054 of 1 in raw terms); the GPT Tutor exam effect is "essentially eradicated" but not positive. The outline's characterisation (improved practice, worse unaided performance, safeguards mitigated) is accurate. The correction (PNAS 122(34) e2518204122, 20 Aug 2025) is an affiliation fix only; see Blocking. The talk's refusal to state a number is a choice, not a necessity, and the review's §2.7 point stands: 48 / 127 / −17 is a hallway number the room can check.
- **Kestin et al. (2025)**, Scientific Reports 15:17458, 3 Jun 2025; Kestin, Miller, Klales, Milbourne, Ponti. Verified from PMC12179260: Harvard Physical Sciences 2, 233 enrolled, 194 eligible; randomized crossover over two consecutive weeks; treatment was an at-home GPT-4 tutor ("PS2 Pal") with expert-written solutions and scaffolded prompts, comparison was in-class active learning with the same worksheets; post-tests immediately after each lesson, no delayed retention; median 49 min vs 60 min in class; effect 0.73–1.3 SD after ceiling correction. Outline line 121 ("carefully engineered AI tutor outperformed the active-learning comparison in a university physics course on immediate outcomes") is accurate. Add "at home, two weeks, N = 194, no delayed test" on the slide so "beat active learning" is not heard as a general result (review item 6, now satisfiable in one line).
- **Liang et al. (2023)**, Patterns 4(7):100779. Slide 8 claims false positives on nonnative English writing and sensitivity to rewriting; both are the paper's headline findings. Verified against the outline and evidence.md only; no external check run, none needed for the wording used.
- **TEQSA (2023)**, Assessment reform for the age of artificial intelligence. Slide 13 uses it only as "supports multiple contextual approaches," which the guidance does say. Verified from text only.
- **AIAS (Perkins, Furze, Roe, MacVaugh 2024)**: needs an external check before it stays in packet.md (see Blocking).
- Arithmetic: only timings; recomputed above. No fixtures, no invented numbers. That absence is itself the review's finding.
- No vendor, price or dated-announcement claims in the talk.

## 5. Direction alignment

- Stances (a)–(d) are not in play for an education talk; no sentence argues the old side of any of them. Slide 1 "I assume access will persist, so we design around it" is consistent with (a).
- Transplant plan status, row by row (`reviews/skeptic-education-retirement-plan.md:15–26`): DAP columns → Outsmart 3: **not done** (Outsmart 3 now names the assistance dilemma but not the three columns). Tutor A/B staging → Outsmart 6: **not done**. Kestin → Outsmart 8: **not done** (Outsmart 8 gained Soderstrom and Bjork, not Kestin). Access checklist → Outsmart 12: **not done**. Pre-mortem → Outsmart workshop: **not done** (`packets/evidence-learning/formats.md:47–64` has no pre-mortem block). Four-case eval set → Benchmarks: **not done** (no match in `outlines/benchmarks-40min.md`). Three questions → Benchmarks opener: **not done**. Vendor questions → Free Tier: **not done** (`free-tier-40min.md:257` "Three prices" slide carries no education questions). History essay → Outsmart demo file: **not done**. VanLehn → Outsmart evidence bank: **not done**. Mechanical deletion checklist (`:45–53`): nothing deleted. Net: the plan is **abandoned in effect**, not partially executed.
- What did move: three of the review's §3 imports went into Outsmart instead of Skeptic. `evidence-learning-40min.md:63` (Koedinger and Aleven 2007), `:146,150` (Soderstrom and Bjork 2015), `:182–184` (Skitka, Mosier and Burdick 1999). The review's proposed Skeptic arc (`skeptic-education-review.md:192–208`) used all three; a Skeptic rewrite along that arc would now duplicate Outsmart slides 3, 8 and 10 on top of the six collisions already counted.
- Duplicates with the sibling as of today: Skeptic 7 (Bastani) = Outsmart 8; Skeptic 8 (Liang) = Outsmart 2 and the shared short; Skeptic 13 (pairs, TEQSA, staff minutes) = Outsmart 13 at the same minute; Skeptic 4 poses the assistance dilemma without its name while Outsmart 3 names it.
- Deferred-topic check: Skeptic defers the percentage fixture to "the assessment-design talk" (line 13); Outsmart still owns it (its line 9). Consistent. Outsmart's line 9 "The Skeptic talk uses a different example" is the sibling's only dependency on Skeptic and survives retirement as a one-word edit.
- Recommendation restated: merge. Thirteen distinct minutes, zero filled stories, no number, and the prescribed vocabulary already spent elsewhere. The "narrow to procurement" option (`retirement-plan.md:41`) is the only rewrite that would not collide, and it is a 15-minute talk, not a 40.

## 6. Voice

- Hedge count beyond the slide-1 allowance: slide 7 three ("One intervention, one setting." / "check the corrected article before quoting numbers" / "Keep the treatment attached to the finding."); slide 8 one ("Evidence about tested tools, not every future detector."); slide 13 one ("TEQSA's guidance supports multiple contextual approaches; this is one local implementation."); runbook §1 one ("This is a framework exercise, not evidence that these choices improve learning outcomes in every context."). Slide 1's scope is four sentences where the skill allows one line. Jokes: zero in fourteen slides.
- Compliance-deck headings: "Failure mode 1–4: …" (slides 6–9), "Handle it: a local eval set and proportional evidence" (11), "Humans belong at consequential decisions" (12).
- Title: "A Skeptic's Guide to Surviving AI in Education" is eight words with the explainer built in; the skill caps at six. `packet.md:10` already has the passing alternative.
- Suggestions (skill: flat declarative verdict, parenthetical stinger, proper noun as protagonist):
  1. Title → **Assume Access. Demand Evidence.** (packet.md:10, promote to primary).
  2. Slide 6 heading "Failure mode 1: the tutor that agrees with you" → **Great Point! (It Wasn't)**.
  3. Slide 7 heading "Failure mode 2: gains that vanish, and when they don't" → **48, 127, and Minus 17**, then say the numbers.
  4. Slide 7 hedge stack → one skeptical act: "The only thing PNAS corrected in that paper was a department name. The numbers stand."
  5. Slide 8 heading → **Guilty Until Rewritten** (the short already earned it).
  6. Slide 10 heading "Pre-mortem: it is week ten and the policy failed" → **Week Ten**.
  7. Slide 7 "A dashboard counting completed exercises tells you the system is busy." Keep; make it the visible line, it is the best sentence in the talk.
  8. Slide 14 landing "Change one prompt, add one check, look at what the evidence lets you conclude." → end on the sentence before it and stop: "It is education where using AI doesn't eliminate the reason they're there."

## 7. Cruft

| path | verdict | reason |
| --- | --- | --- |
| `reviews/skeptic-education-review.md` | KEEP | Historical spec; items 1–3 of §6 are now fixed, 4–10 open; §3 vocabulary has migrated to Outsmart, note that at the top. |
| `reviews/skeptic-education-retirement-plan.md` | KEEP | Still the only executable plan; add a status line (not executed as of 2026-09-06) and strike rows that Outsmart now covers by other means (Soderstrom replaces the Kestin-as-counterweight rationale in row 3). |
| `education/demo.md` §"A Skeptic's Guide" | MERGE | Percentage fixture belongs to Outsmart; either becomes the slide 5 three-switch demo or is deleted and demo.md becomes Outsmart-only. |
| `education/CFP.md` §Skeptic | KEEP until decision | Fix outcomes, exercise minutes and the "Evidence of Learning" name; delete the section on retirement. |
| `education/evidence.md` | KEEP | Shared; fix the Bastani correction note; Kestin row moves to Outsmart's evidence bank on merge. |
| `packets/skeptic-education/evidence-bank.md` | KEEP | Only file holding the three candidate story contexts; on merge, fold candidates 1–3 into `packets/evidence-learning/evidence-bank.md`. |
| `packets/skeptic-education/formats.md` live-demo and workshop sections | MERGE | Workshop overruns by 20–35 min; live-demo describes a demo the outline does not have. The four-case run belongs with the eval-set transplant. |
| `packets/skeptic-education/packet.md:62` AIAS reference | DROP unless verified | Unused, flagged unverified in the file itself. |
| `packets/speaker/recording-plan.md:48` | MERGE | "record the skeptic talk next" → Outsmart is the education preview to record. |
| `packets/speaker/bio.md:76–77` | MERGE | Remap both posts to "Outsmart" and drop "skeptic's guide" on retirement; fix the sibling's stale title now. |
| `reveal-talks/skeptic-education*.html`, `decks/skeptic-education-*.pptx` | KEEP | Generated and in sync with the outline; delete with the outline. |
| `artifacts/speaking-opportunity-research/skeptic-education.md` and `results/skeptic-education/` | KEEP | Deep-research brief and outputs; unaffected by talk edits, retarget on retirement. |
| `artifacts/flagship-talks/skeptic-education-*` | n/a | Does not exist. |

## 8. Proposed edit list

1. `outlines/skeptic-education-40min.md:119` delete "and check the corrected article before quoting numbers"; optionally add the 48 / 127 / −17 numbers as the visible line.
2. `education/evidence.md:8` replace the correction note with "Correction (Aug 2025) fixes one author affiliation; results unchanged."
3. `outlines/skeptic-education-40min.md:121` append "Two weeks, 194 students, at home, tested immediately; no delayed test." after "immediate outcomes."
4. `packets/skeptic-education/formats.md:21` change "drop slide 9 for 25" to "drop slides 3, 9 and 12 for 25:30".
5. `packets/skeptic-education/formats.md:40` retitle the workshop "90-minute workshop" or cut its blocks to 75.
6. `education/CFP.md:29` change "three-minute assistance exercise" to "one-minute assistance write".
7. `education/CFP.md:27` and `packets/speaker/bio.md:76–77` replace "Evidence of Learning" with "Outsmart Your Lying, Cheating Students".
8. `education/CFP.md:21–23` replace the three outcomes with `packet.md:38–40`.
9. `packets/speaker/recording-plan.md:48` change "record the skeptic talk next" to "record Outsmart next".
10. `packets/skeptic-education/packet.md:62` verify AIAS (JUTLP 21(6) 2024) and cite it on slide 4, or delete the line.
11. `build-talk.ts:96,100` re-key the two "Bridge in" bridges to slides 2 and 5, then rerun `bun artifacts/speaking-portfolio-expanded/sync-talks.ts skeptic-education`.
12. `education/demo.md:5–19` replace the percentage capability audit with the slide 5 three-switch demo and the history-essay translation.
13. `reviews/skeptic-education-retirement-plan.md:3` add "Status 2026-09-06: not executed; Outsmart independently adopted Koedinger and Aleven, Soderstrom and Bjork, and Skitka."
14. Decision edit, if merge: execute plan rows 1, 2, 4, 5 into `outlines/evidence-learning-40min.md` slides 3, 6, 12 and `packets/evidence-learning/formats.md`; row 7 into `outlines/free-tier-40min.md` slide 14 or `education/CFP.md`; rows 6 and 8 into `outlines/benchmarks-40min.md`; then run the deletion checklist at `retirement-plan.md:45–53` and change `evidence-learning-40min.md:9` to drop the Skeptic sentence.
