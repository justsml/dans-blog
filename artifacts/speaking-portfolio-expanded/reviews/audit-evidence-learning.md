# Audit: Outsmart Your Lying, Cheating Students (evidence-learning)

Audited 2026-09-06 against `outlines/evidence-learning-40min.md` (canonical, 14 slides), both adaptations, `packets/evidence-learning/*`, `education/{CFP,demo,evidence}.md`, `demos/DEMO-RUNBOOK.md` §5, `demos/demo-logic.js`, `build-talk.ts`, the three education shorts, `reviews/skeptic-education-*.md`, both READMEs, and `reveal-talks/evidence-learning*.html`. No `reviews/evidence-learning-review.md` and no `flagship-talks/evidence-learning-*` exist.

## 1. Verdict

Ready after fixes. The 40-minute outline is sound: timings sum, arithmetic checks, citations are real and used within what they support, the voice is Dan's. What breaks on stage is the demo plumbing (slide 7 sends the presenter to a runbook section and a kit tab that still run the pre-rewrite Learner A/B fixture) and the 15-minute route, which lands on a story it never told and shows a visible line it never argues.

## 2. Blocking

| file:line | quoted text | problem | concrete fix |
| --- | --- | --- | --- |
| `outlines/evidence-learning-40min.md:122` and `:128`; propagated to `script-40min.md`, `script-30min.md`, `script-15min.md:78,82`, `reveal-talks/evidence-learning.html` | "Run the two scripted learners from the runbook" / "Runbook section 5 for the scripted turns" | `demos/DEMO-RUNBOOK.md:41-47` §5 and the kit tab (`demos/demo-logic.js:23-28`, `demos/index.html:6` "5 · Evidence of learning") still run the old fixture: two learners, a "polished scientific explanation", "comparable groups", "baseline imbalance". Nothing about $100, $120, $96 or a base. The tutor/learner turns the slide actually needs are in `education/demo.md:21-31`, which the runbook never references. A presenter who opens the kit on stage gets the wrong demo. | Rewrite runbook §5 and `studentReplay` to the percentage tutor/learner table from `education/demo.md:25-31` (4 steps: wrong base → $120 → $96 with reason → $80 transfer), or change outline line 122/128 to point at `education/demo.md` "four-minute evidence replay" and delete runbook §5. Rename the kit tab to the talk's title. |
| `packets/evidence-learning/script-15min.md:123` (from `outlines/evidence-learning-40min.md:247`) | "The kid with no car never touched the clay. The same tool that lets Johnny phone it in is the one that can hand a sculptor the clay." | The 15-minute route cuts slide 12 and, unlike the 30-minute route (`build-talk.ts:573` bridge), has no bridge naming the sculptor. The close references a story the room never heard. | In `build-talk.ts:587` add `14: [0, 2]` to the 15-minute `trim`, or extend the slide-9 bridge (`build-talk.ts:585`) with "…and the friend who never touched the clay because there was no car to carry it home." |
| `packets/evidence-learning/script-15min.md:106` (visible), `build-talk.ts:587` `9: [0, 1]` | "Voice is biometric. Offline. Zero retention. Age-appropriate. Written alternative." | The trim drops the only paragraph (`outline:166`) that argues this line; it stays on screen for two minutes unsupported. Voice biometrics is the one topic in the talk a K-12 audience will challenge. | Change the 15-minute trim to `9: [0, 1, 2]` and take the half minute from slide 7 (3.5 → 3.0), which already says "skip the kit". |

## 3. Consistency findings

- `outlines/evidence-learning-40min.md` timings: 2.5+2.5+2+2+3+2+5+3.5+3+2.5+3+2.5+4+2.5 = 40.0, monotonic. OK.
- `build-talk.ts:571` 30-min `times` sum 30.0 over 13 kept slides; `:581` 15-min `times` sum 15.0 over 8. Adaptation tables match. OK.
- `build-talk.ts:587` `1: [0, 1, 2]` is a no-op (slide 1 has exactly three paragraphs). Harmless; delete for clarity.
- `script-15min.md:34` prints "Source: Liang et al. (2023)" after `2: [0, 1]` trimmed the only paragraph that mentions Liang (`outline:46`). Same at `:96-98`: Bastani and Soderstrom sources print under slide 8 after `8: [0, 1]` dropped both paragraphs (`outline:144,146`). `scriptFor` (`build-talk.ts:764`) emits sources regardless of trim. Either trim sources with paragraphs in the generator or accept orphaned citations in lightning scripts.
- `outlines/evidence-learning-40min.md:78` places the Koedinger and Aleven source under slide 4 with the note "Cited on slide 3". The citation is spoken on slide 3 (`:63`). In the 15-minute route slide 3 is cut, so `script-15min.md:49` reads "Cited on slide 3" in a script with no slide 3. Move the Source line to slide 3.
- `script-15min.md:78` still says "Run the two scripted learners from the runbook, then go live" while the route note (`build-talk.ts:588`) says "the live reconstruction without the kit" and the delivery line says "skip the kit". The spoken text and the route disagree about whether the kit runs.
- `outlines/evidence-learning-40min.md:113` heading "the four-minute reconstruction" sits in a five-minute slot (14:00–19:00); `education/CFP.md:55` says "five-minute live reconstruction"; the 30-min adaptation says "four and a half minutes with the kit". Three durations for one demo. Pick "four minutes inside a five-minute slide" and say so once.
- `packets/evidence-learning/formats.md:15` and `packet.md:5`: "The PPTX exports predate the 2026-09-06 rewrite." False since 03:11 today: `decks/evidence-learning-40min-screen.pptx` contains "Casio" and the new title. Delete both sentences.
- `packets/evidence-learning/formats.md:22`: "25 minutes | 30-minute route with slides 10 and 11 dropped" gives 30 − 2 − 2 = 26 minutes. Say 26, or drop slide 6 as well (24.5).
- `decks/README.md` lists only Dynamic Scaling ("These 6 PowerPoint files") while `decks/` holds six current evidence-learning files plus a seventh, `evidence-learning-40min.pptx` (no suffix, same 56,404 bytes as `-screen`). `README.md:40` sends readers to `decks/README.md` for this talk's PowerPoint and finds no row.
- `packets/evidence-learning/packet.md:57-62` References list Liang, Bastani, TEQSA, Lemov only. Koedinger and Aleven, Soderstrom and Bjork, and Skitka et al. are spoken on slides 3, 8 and 10 and live only in `evidence-bank.md:61-63`. Add them to the packet.
- `packets/evidence-learning/formats.md:45` (AI Tinkerers demo): "Requires a model you are permitted to show" vs `packet.md:55`: "the demo is offline". Different demos, same packet; label the Tinkerers one as the only live-model format.
- Shorts: three name this talk as parent, not four. `shorts/assign-the-cheating.md:3` (slide 5), `shorts/up-20-down-20.md:3` (slides 4 and 7), `shorts/detector-is-a-biased-coin.md:3` (slide 2, shared with Skeptic slide 8). All three slide references and fixtures ($96, $80, 1.25 × 0.8, rubric "a one, not a two") match the current outline. `shorts/README.md:29-31` titles match the files. No fourth exists.
- `packets/evidence-learning/notes-2026-09-05.md:3` maps a 16-slide outline onto the 14-slide one; the mapping is correct but every "new slide N" heading in the file (`:27,36,42,50,60`) still uses the old numbering (e.g. "Measure AI time like talk time (new slide 9)" is slide 10 now).
- `packets/speaker/bio.md:76-77` tags two posts "Evidence of learning" and `demos/index.html:6` tab reads "5 · Evidence of learning". Old title.
- `reveal-talks/evidence-learning*.html`: titles, "14 / 14", no "Evidence of Learning", no "No verified story" placeholders; `Story:` lines render inside `<aside class="notes">`, not on screen. OK. Index card (`reveal-talks/index.html:11`) is current.
- `README.md:25` labels the packet row "Outsmart Your Students" while every other row uses the full title. Cosmetic.

## 4. Correctness findings

- Arithmetic (`outline:74,119,122,124`, `shorts/up-20-down-20.md:13,17`): $100 × 1.20 = $120; $120 × 0.80 = $96. $80 × 1.25 = $100; $100 × 0.80 = $80; 1.25 × 0.80 = 1.00. All correct. "Out Four Bucks" = $100 − $96. Correct.
- Rubric (`outline:136`): three dimensions × 0–2 = six points; `education/evidence.md:24` calls it a "six-point rubric". Consistent.
- Abstract word counts (`education/CFP.md:3` says lengths are whitespace-separated words): `packet.md:18` and `CFP.md:35` "50 words" = 52; `packet.md:22` "100 words" = 102; `packet.md:26-32` "250 words" = 274; `CFP.md:39` "150-word" = 156. Trim the 250 by at least 24.
- Liang et al. (2023), Patterns, doi 10.1016/j.patter.2023.100779: title, venue and year verified from the DOI form and the evidence brief. Slide 2's use ("flagged non-native English writers at alarming rates", `outline:46`) is what the paper reports. OK.
- Koedinger and Aleven (2007), Educational Psychology Review 19(3), 239–264, doi 10.1007/s10648-007-9049-0: correct citation. Slide 3 claims they "called it the assistance dilemma" and that "nobody has solved it"; the first is the paper's title, the second is Dan's framing and `evidence-bank.md:61` already says not to attribute a help level to them. OK.
- Soderstrom and Bjork (2015), Perspectives on Psychological Science 10(2), 176–199, doi 10.1177/1745691615569000: correct. "Fifty years of it" (`outline:146`) matches the review's scope. OK.
- Skitka, Mosier and Burdick (1999), IJHCS 51, 991–1006, doi 10.1006/ijhc.1999.0252: authors, year, venue, volume and pages confirmed via Semantic Scholar metadata; abstract not retrievable (Elsevier blocked). The slide-10 paraphrase "people given a highly but imperfectly reliable aid did worse than people given no aid at all" (`outline:182`) needs an external check: from memory the automated group made more omission and commission errors on the trials where the aid was wrong, not worse overall. Say "on the trials where the aid was wrong" until the abstract is read.
- Bastani et al. (2025), PNAS, doi 10.1073/pnas.2422633122, correction doi 10.1073/pnas.2518204122: the correction exists, published 2025-08-20 ("Correction for Bastani et al., Generative AI without guardrails can harm learning: Evidence from high school mathematics", confirmed via Semantic Scholar). Its text was not readable (PNAS 403). The outline says so at `:148` ("A correction exists; check it before quoting figures"), and the talk quotes no figure. OK as written; the correction's full text still needs a read before delivery.
- TEQSA (2023): title and URL correct. Slide 13 claims only that it "backs contextual, multiple approaches". OK.
- Lemov's 4Ms (`packet.md:62`): manageable, measurable, made first, most important. Correct.
- Fixture labels: `outline:200` "five flashcards an hour before produced a 98" is labeled "Made-up numbers, real mechanism." OK. `outline:180` "a class of 30 or a course of 300" is a size, not a finding. OK.
- Vendor/product claims to recheck before delivery: `outline:166` "Newer offline models claim to detect frustration and distress in speech" and "meet zero-retention, no-sharing district rules on modest hardware"; no model named, `notes:75` already flags it. `outline:22` "Casio calculator watch" (C-80, 1980) is safe.
- `outline:42` "the first rung of Bloom's taxonomy" = Remember. Correct.

## 5. Direction alignment

- Stances (a)–(d) do not arise in this talk; no sentence argues the old versions. Slide 14's "or the data should not exist" (`outline:249`) is a data-governance line, not a "don't build it" stance about the everything-assistant.
- Companion-talk deferral holds in the outlines: `outline:9` "The Skeptic talk uses a different example so the two can be booked together" and `outlines/skeptic-education-40min.md:13` "The percentage-change fixture belongs to the assessment-design talk". It does not hold in `education/demo.md:5-17`, whose "A Skeptic's Guide: four-minute capability audit" still runs on "$100 … 20% … 20%", and `demo.md:3` promises a Skeptic "history-essay fixture (two primary sources disagreeing about the same event)" that is written nowhere in the repo (not in demo.md, not in `DEMO-RUNBOOK.md` §1).
- The slide-13 collision flagged in `reviews/skeptic-education-review.md:86` is not resolved. `outlines/skeptic-education-40min.md:187-203` still runs "Redesign one assignment… Estimate staff time… TEQSA" at 34:30–38:00 against Outsmart's `outline:218-234` at 33:30–37:30. `README.md:9` and `reviews/README.md:48` say Skeptic "remains unchanged pending a retire-or-procurement decision"; the retirement plan assigns the worksheet, Liang and TEQSA to Outsmart. Until the decision lands, a program booking both hears Liang (Skeptic 8 / Outsmart 2), Bastani (7 / 8) and the worksheet (13 / 13) twice. Outsmart is the right owner of all three; nothing needs to change on this side.
- `shorts/detector-is-a-biased-coin.md:3` names both talks as parents. If Skeptic is retired or narrowed per `skeptic-education-retirement-plan.md:33`, drop the second parent.

## 6. Voice

Disclaimer count beyond the slide-1 line and the slide-8 "last time I'll say that" the header explicitly permits (`outline:5`): slide 7 one ("Never pressure an individual into a public assessment"), slide 8 two ("Try the rubric on sample work before it touches a grade", "A mismatch needs a human to interpret it"), slide 9 three ("never to convict", "Not foolproof", "A replay is context, never proof"), slide 13 one ("grading, accusations and anything sensitive stay with you"). No heading reads like a compliance deck. Suggestions, Dan's register per `.claude/skills/dans-voice/SKILL.md` "Titles" and "Prose":

1. `outline:50` "Write down where the foundations happen" → "Pencil first. Then the tool." (flat verdict; the `>` lines already carry the detail)
2. `outline:100` "Ask for an attempt, then ration the help" → "Ration the help"
3. `outline:130` "Score the reasoning, then write down what you saw" → "Score the reasoning. Write it down."
4. `outline:168` "Outsmart move three: count AI time, then read all 300 transcripts" → "Outsmart move three: read all 300 transcripts" (the AI-time count is the setup; the 300 is the joke)
5. `outline:162` "never to convict" and `:166` "A replay is context, never proof" say the same thing twice on one slide; keep the second, it lands harder.
6. `outline:140` "Try the rubric on sample work before it touches a grade." → move to `evidence-bank.md` (skill: "Caveats go in the evidence bank, not the script").
7. `education/CFP.md:39` has a line the talk lacks: "If your assessment depends on knowing who typed a paragraph, the detector has become part of your curriculum." Put it on slide 2 after "Who typed the sentence is not whether the kid can do the thing" (`outline:46`).
8. `outline:126` "Never pressure an individual into a public assessment." is a stage direction, not talk track; move it into the slide's `Stage direction:` line.

## 7. Cruft

| path | verdict | reason |
| --- | --- | --- |
| `packets/evidence-learning/notes-2026-09-05.md` | MERGE | Dictation is fully absorbed into the outline; "Open items" 74-79 are half done (Lemov named, slide count now 14, adaptations renumbered). Move the three still-open items (the untranscribed second name, the voice-model claims, the runbook §5 / kit swap) into `evidence-bank.md`, then delete the file and the "Working notes" links at `outline:7` and `packet.md:3`. |
| `education/CFP.md` | KEEP | Only home of the 150-word abstracts and the reviewer notes; `README.md:40` links it. Fix `:3` "Prepared 4 September 2026" (Outsmart section is 6 September) and the word counts; its 50-word Outsmart abstract duplicates `packet.md:18` verbatim, so edit one and copy. |
| `education/demo.md` | MERGE | Lines 21-49 (tutor/learner turns, JSON record, rubric) are the real slide-7 runbook and should become `DEMO-RUNBOOK.md` §5. Lines 5-19 (Skeptic audit on the percentage fixture) contradict `skeptic-education-40min.md:13`; replace with the history-essay fixture or delete. Lines 51-53 (stagekit replay) die with the kit rewrite. |
| `education/evidence.md` | MERGE | Liang, Bastani and TEQSA rows duplicate `evidence-bank.md:57-64`; Kestin is unused by Outsmart; "Claims we deliberately do not make" includes Delegate/Augment/Preserve, which is Skeptic's. Fold the Bastani correction note ("full text was inaccessible") into the evidence bank; `skeptic-education-retirement-plan.md:48` already prescribes this. |
| `demos/DEMO-RUNBOOK.md:41-47` §5 | DROP and rewrite | Pre-rewrite Learner A/B scientific-answer replay; see Blocking. |
| `demos/demo-logic.js:23-28` `studentReplay`, `demos/index.html:6` tab 5 | DROP and rewrite | Same fixture, same reason; tab label carries the old title. |
| `decks/evidence-learning-40min.pptx` | DROP | Byte-identical size to `-40min-screen.pptx`, unlinked from `formats.md`. |
| `decks/README.md` | KEEP, add rows | Six current evidence-learning exports exist and are unlisted; `README.md:40` points here. |
| `packets/evidence-learning/formats.md:15`, `packet.md:5` | DROP sentence | "PPTX exports predate the rewrite" is false since today's 03:11 build. |
| `packets/speaker/bio.md:76-77`, `packets/speaker/recording-plan.md:48` | MERGE | Old title "Evidence of learning"; "record the skeptic talk next" should retarget to Outsmart per the retirement plan. |
| `reviews/skeptic-education-review.md`, `reviews/skeptic-education-retirement-plan.md` | KEEP | Decision still pending; both are the spec for what moves into this talk. |
| `artifacts/flagship-talks/` | n/a | No evidence-learning copy exists. |

## 8. Proposed edit list

1. Delete the no-op `1: [0, 1, 2]` from the 15-minute `trim` in `artifacts/speaking-portfolio-expanded/build-talk.ts:587`.
2. Delete "The PPTX exports predate the 2026-09-06 rewrite." from `artifacts/speaking-portfolio-expanded/packets/evidence-learning/formats.md:15` and `packet.md:5`.
3. Change "25 minutes | 30-minute route with slides 10 and 11 dropped" to "26 minutes" in `artifacts/speaking-portfolio-expanded/packets/evidence-learning/formats.md:22`.
4. Delete `artifacts/speaking-portfolio-expanded/decks/evidence-learning-40min.pptx`.
5. Rename the kit tab "5 · Evidence of learning" to "5 · Outsmart" in `artifacts/speaking-portfolio-expanded/demos/index.html:6`, and the post tags in `packets/speaker/bio.md:76-77`.
6. Move the Koedinger and Aleven `Source:` line from slide 4 to slide 3 and drop "Cited on slide 3" in `artifacts/speaking-portfolio-expanded/outlines/evidence-learning-40min.md:78`.
7. Add Koedinger and Aleven, Soderstrom and Bjork, and Skitka et al. to References in `artifacts/speaking-portfolio-expanded/packets/evidence-learning/packet.md:57-62`.
8. Trim the 250-word abstract to 250 and the 50/100/150 to length in `packets/evidence-learning/packet.md:18-32` and `education/CFP.md:35-39`; update the date at `education/CFP.md:3`.
9. Qualify slide 10 to "did worse on the trials where the aid was wrong" in `artifacts/speaking-portfolio-expanded/outlines/evidence-learning-40min.md:182` until the Skitka abstract is checked.
10. Add `14: [0, 2]` to the 15-minute `trim` (or extend bridge 9 with the sculptor) in `artifacts/speaking-portfolio-expanded/build-talk.ts:585-587`, and change `9: [0, 1]` to `9: [0, 1, 2]` with slide 7 at 3.0 minutes.
11. Apply voice edits 1-8 above in `artifacts/speaking-portfolio-expanded/outlines/evidence-learning-40min.md`, then run `bun artifacts/speaking-portfolio-expanded/sync-talks.ts evidence-learning`.
12. Rewrite `artifacts/speaking-portfolio-expanded/demos/DEMO-RUNBOOK.md` §5 and `demos/demo-logic.js` `studentReplay` to the four percentage tutor/learner turns from `education/demo.md:25-31`, and delete `education/demo.md:51-53`.
13. Replace the Skeptic capability audit in `artifacts/speaking-portfolio-expanded/education/demo.md:5-19` with a written history-essay fixture, or delete the section and the promise at `:3`.
14. Fold `education/evidence.md` and the three open items of `packets/evidence-learning/notes-2026-09-05.md` into `packets/evidence-learning/evidence-bank.md`, delete both files, and remove their links from `outlines/evidence-learning-40min.md:7`, `packets/evidence-learning/packet.md:3`, and `README.md:92`.
15. Add evidence-learning rows to `artifacts/speaking-portfolio-expanded/decks/README.md` and fix its file count.
16. Decide Skeptic (retire or narrow) so the slide-13 worksheet, Liang and Bastani stop appearing in two talks; until then, no change on the Outsmart side.

## Fixes applied 2026-09-06

The assigned agent was terminated mid-pass by an account spend limit; the remaining items were completed by the caller. Everything below is in place and verified by a rebuild (14 slides, 40:00, both routes sum).

- **Blocking 1, the demo plumbing (fixed).** `demos/DEMO-RUNBOOK.md` §5 and `demos/demo-logic.js` (`studentReplay`) now run the $100 → $120 → $96 tutor turns from the ladder, not the retired "polished scientific explanation" Learner A/B fixture. The runbook carries the $80 / +25% / −20% transfer item and the "never pressure an individual" instruction. `demos/index.html` tab label updated.
- **Blocking 2, the sculptor (fixed via route).** The 15-minute route cut slide 12 and then landed on "The kid with no car never touched the clay" with the story untold. Bridge 9 now carries the sculptor in one sentence.
- **Blocking 3, the orphaned privacy line (fixed via route).** `trim` for slide 9 was `[0, 1]`, which dropped the only paragraph supporting the on-screen line "Voice is biometric. Offline. Zero retention." It is now `[0, 1, 2]`, paid for by 0.5 min from slide 7. Slide 14 gains `trim: [0, 2]` so the close still lands.
- **Slide 9 duplicate caveat** removed: paragraph 1 ends "sort likely from unlikely"; "never to convict" survives once, as "A replay is context, never proof."
- **Slide 10** retitled ("read all 300 transcripts") and the **Skitka 1999** claim qualified to "on the trials where the aid was wrong".
- **Skeptic retirement absorbed.** The slide-13 worksheet collision is resolved by Skeptic's retirement rather than by editing this talk; Outsmart is now the sole owner of that beat. `education/demo.md` no longer runs the retired Skeptic audit on this talk's percentage fixture.

Route config applied to `build-talk.ts` (15-minute route): `times` `[1.5, 1.5, 1, 2, 3.5, 2, 2, 1.5]` → `[1.5, 1.5, 1, 2, 3, 2, 2.5, 1.5]` (= 15.0); `trim` gains `9: [0, 1, 2]` and `14: [0, 2]`; bridge 9 extended with the sculptor sentence.

Still open by design: every `Story:` slot, and the history-essay fixture referenced by the procurement route is written only there, not in this outline.
