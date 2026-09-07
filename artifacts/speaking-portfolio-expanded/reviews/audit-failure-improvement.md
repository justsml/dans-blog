# Audit: Automating Improvement From Failure

Audited 2026-09-06 against `outlines/failure-improvement-40min.md` (canonical, 15 slides), both adaptations, the packet directory, `build-talk.ts`, the two child shorts, `reviews/failure-improvement-review.md`, `engineering/failure-improvement/{CFP,demo,evidence}.md`, `packets/speaker/recording-plan.md`, both READMEs, the deck HTML (grep only), and the cross-referenced slides in adaptive-systems, judgment, product-engineering and evidence-learning.

## 1. Verdict

Ready after fixes. The canonical outline, generated scripts, adaptations, route config and deck are mutually consistent and the arithmetic and citations check out; nothing on a slide would embarrass Dan. The hand-written packet copy (packet.md, CFP.md, formats.md, engineering/evidence.md) still describes the pre-rewrite arc and would contradict the deck if a committee read both.

## 2. Blocking

| file:line | quoted text | problem | concrete fix |
| --- | --- | --- | --- |
| `packets/failure-improvement/packet.md:30` | "The back half extends the loop to agent-driven exploratory testing against a PR's diff, compiling repeated work into scheduled scripts, customer feedback… and proactive incident notices." | 250-word abstract describes the cut arc (old slides 9–15). A committee comparing this to the deck sees a different talk. | Rewrite the 250-word abstract from slides 6, 8, 9, 13: the retry that hid the 403, the failed holdout, the reviewer, the ticket metric. |
| `packets/failure-improvement/packet.md:11` | "Your Logs Are a Roadmap Nobody Reads" (alternate title) and `outlines/failure-improvement-40min.md:5` slide 1 heading | "Your X Is a Y" formula; the voice skill names this shape as the canonical GPT reject. It is the first heading on screen. | Retitle slide 1, e.g. *The Pager Trained You* or *Nobody Reads the Scroll*; drop the alternate title from packet.md. |
| `engineering/failure-improvement/CFP.md:9` | "The peak is the guardrails: similarity is a candidate, three evidence gates, and a human… The back half extends the loop to agent-driven testing" | Submitted CFP copy contradicts slide 8 (four items: regression · holdout · scope · human) and the current back half (reviewer, compile, feedback, money gate, metrics). Reviewer notes on line 23 are current; the abstract above them is not. | Rewrite the 150-word abstract to the 15-slide arc; say "regression, holdout, scope, and a person". |
| `packets/speaker/recording-plan.md:7` | "it has a working offline demo" | Contradicts line 11 of the same file ("A checkbox replay does not clear the recording gate"), CFP.md:23, and the outline's slide 8 stage direction. | Change to "its demo is specified but not yet built (engineering/failure-improvement/demo.md)". |

## 3. Consistency findings

- Timings, 40-min: 2.5+2+3+3+2.5+3+2.5+5.5+3+3+2.5+2.5+2+1.5+1.5 = 40.0, monotonic, matches `script-40min.md` headers and deck `data-timing` (150/120/180/180/150/180/150/330/180/…).
- Route 30 in `build-talk.ts:474-490`: 1.5+1+2+2+1.5+2+1.5+5.5+2.5+2.5+1.5+2.5+1.5+1.5+1 = 30.0; matches `failure-improvement-30min-adaptation.md` table. Route 15 (`build-talk.ts:503-512`): 1+1+1.5+2+4+2+2+1.5 = 15.0; matches the 15-min adaptation.
- Route 15 bridges keyed 2, 4, 6, 9, 13 each follow a kept slide and cover the cut that follows (3; 5; 7; 10–12; 14). Bridge text matches the cut slides' content. No `trim` entries for this slug, so nothing to check there.
- `outlines/failure-improvement-30min-adaptation.md:3` "Hide the others in presenter preparation" and `:23` "Bridge sentences for every cut are in the script" — the 30 route keeps all 15 slides and `script-30min.md` has zero `Bridge:` lines. Harmless generator boilerplate; not stale content, but reads oddly.
- `packets/speaker/recording-plan.md:9` "drop slides 10 and 12, each allocated 2:30 in that route, to land at 25 minutes": route 30 gives slide 10 = 2.5 and slide 12 = 2.5; 30 − 5 = 25. Correct. Bridge lines there ("After slide 9… After slide 11…") point at the right neighbours.
- `engineering/failure-improvement/demo.md:5-11` live sequence: 0:00–1:15, 1:15–2:00, 2:00–3:45, 3:45–4:45, 4:45–5:30 — contiguous, totals 5:30, matches slide 8's 5.5 min and line 3's "15-minute route allocates 4:00" matches route 15 `times[4] = 4`. The file exists and is consistent with slide 8's stage direction ("Use the live sequence in engineering/failure-improvement/demo.md… Recording remains blocked"). The checkbox kit is retained under an explicit "Historical checkbox exercise" heading, marked "not the flagship peak".
- `packets/failure-improvement/formats.md:32` lightning beat "the enrichment rule in one sentence: the more it can see, the more you can trust it to act" — contradicts slide 3 ("Access is a set of individual grants, not a graduation ceremony") and slide 9.
- `formats.md:33` and `:53` "three gates" vs slide 8's visible line "Regression · holdout · scope · human" (four).
- `formats.md:52` workshop Classify block "pattern, severity, risk, security class" — slide 5 now shows "Severity · evidence · owner · unknown".
- `formats.md:56` "Keep the E2E economics and compile-what-repeats slides as a handout" — no E2E economics slide exists; compile-what-repeats is slide 10 and in the deck.
- `packet.md:36` learning outcome 1 "severity, risk, and security tags" and `:46` "A GitHub Actions skeleton for the out-of-band check" — the outline no longer mentions GitHub Actions or those tag names. `:38` "three evidence gates" (see above).
- `engineering/failure-improvement/evidence.md:25` "Say this on slides 8 and 13" — the money gate is now slide 12 ("Correlate, escalate, and the money gate"); slide 13 is metrics. `:27` "The personalized-software slide is speculation" — slide cut. `:14-15` quote outline sentences ("I have seen remarkable results…", "leaves model names blank") that no longer exist.
- `packets/failure-improvement/evidence-bank.md:5` "The talk now makes claims about cost savings on E2E suites and about agent-opened PRs; those claims need run records… The rewritten outline makes no measured cost-saving claim." Self-contradicting paragraph; first sentence is pre-rewrite.
- `evidence-bank.md:93` story map "Slides 1, 6, 10, and 11" matches the outline's four `Story:` lines exactly.
- Visible `>` lines match the prose on every slide; deck `<h2>` titles match the outline's 15 headings; image alt text (`failure-improvement.html:47-48`) equals the slide titles and SVG `<title>`s ("Enrichment ladder: logs, code, trace, reproduction, ticket"; "The bookmark follows the artifact") match slides 3 and 4. SVG rungs "Logs / Code / Trace / Reproduce / Ticket" match the slide 3 visible line.
- Stage directions and the "Recording remains blocked" sentence live inside `<aside class="notes">` in the deck (`failure-improvement.html:52`), not on screen. No "Omit this cue" text remains anywhere.
- `README.md:37` lists the deck as "Browser deck" while the nine other rows say "Browser and PowerPoint"; `decks/README.md` and `decks/exports.json` currently list only dynamic-scaling (staged edit from the parallel sync), so the failure-improvement PPTX files on disk are unindexed. Portfolio-wide, not this talk's fault; flag for the sync owner.
- `shorts/README.md:21,32` rows ("Retry Hard", "The Robot Took the Easy Ones") match the shorts' H1s and parent/slide pointers (slides 6 and 9) point at the right content.
- Adaptive-systems handoff: slide 1 here defers runtime recovery to "Adaptive, agentic apps"; adaptive slides 6–9 and 13 do cover repair, versioned artifacts, held-out exams and widening authority. Adaptive slide 14 (`adaptive-systems-40min.md:271`) hands back only implicitly: "the offline improvement loop evaluates changes to the reusable procedure". The explicit sentence the old review relied on ("The full improvement loop is the failure-improvement talk") is gone; the pointer is one-directional.

## 4. Correctness findings

- Slide 13 arithmetic: 100 − 90 = 10; 10/100 = 10%. Labeled "That is our arithmetic fixture" on the slide and "explicitly synthetic" at `evidence-bank.md:95`. Correctly labeled.
- Cvach (2012), Biomedical Instrumentation & Technology 46(4), 268–277, PubMed 22839984 — author, year, venue, pages correct. Use ("I am borrowing the mechanism") is within what an integrative review supports.
- Vaughan (1996), *The Challenger Launch Decision*, University of Chicago Press; the linked page is the 2016 enlarged edition, and the outline says so. Use (normalization of deviance, repeated acceptance of anomalies) is the book's central claim.
- Bainbridge (1983), *Ironies of automation*, Automatica 19(6), 775–779 — correct. Slide 9's summary (monitoring and difficult interventions remain, practice shrinks) is the paper's argument. Link is the ScienceDirect PII; adaptive uses the DOI — either resolves, but harmonise.
- Strathern (1997), European Review 5(3), 305–321 — correct; the outline correctly attributes the "target… ceases to be a good measure" wording to Strathern rather than Goodhart. Link is a gwern-hosted PDF; external check that it still resolves before delivery.
- Toyota jidoka/andon page — vendor description; the outline's correction ("not a story about one cord stopping an entire company") is accurate. External check that the URL still resolves.
- Skitka, Mosier & Burdick (1999), IJHCS 51(5), 991–1006 — cited in the child short `what-happened-to-sarah.md:29` but not on parent slide 9. Correct citation; the short makes a claim ("did worse than people given no aid at all") the parent slide does not.
- Bainbridge duplication across the portfolio: failure-improvement slide 9 (what the queue does to the reviewer; the design response — the fullest use), adaptive-systems slide 12 (`:230`, why the daily report must be short; paired with Skitka), judgment slide 12 (`judgment-40min.md:149`, green signal draws attention the missing case never got; paired with Mosier & Skitka), product-engineering slide 13 (`:200`, owner capacity, one sentence). Evidence-learning slide 10 cites Skitka only, not Bainbridge. Each use is distinct in claim; the near-verbatim sentence "promotes them to monitoring a system that is almost always right" appears in adaptive 12 and the sarah short. Acceptable if the talks are not booked together; if they are, adaptive 12 should shrink to one clause and point here.
- No vendor, price or dated-announcement claims remain on any slide. Historical model names and the $0.36–$0.81 figure survive only in `evidence-bank.md:67`, marked "not delivery evidence".
- `packet.md:60` Anthropic "Demystifying evals for AI agents" (January 2026) — not spoken; external URL check before submission.

## 5. Direction alignment

- (a) Nothing argues "don't build it". Slide 3 "An agent reading everything writes you a summary of the noise. Pick one failure class." is about scoping one loop's input, not refusing the assistant; it reads as compatible with the per-job stance but could be sharpened to say so (one clause: "the big assistant still exists; this loop is one job").
- (b) Knight & Leveson, councils, parallel generation: not present. No drift.
- (c) Not present. No drift.
- (d) Slide 10 "Cheap selection that skips the failing test has excellent unit economics right up to the incident" and slide 7 "Tickets are cheap. Review is not." both say plainly that the spend belongs on review and the full suite. Aligned.
- Deference: slide 1 defers runtime recovery to adaptive-systems, which covers it (adaptive 6–9, 13). Adaptive 14 hands the offline loop back without naming this talk (`adaptive-systems-40min.md:271`). README `:105` records the boundary correctly ("failure improvement owns the offline loop and compile-what-repeats beat").
- `formats.md:32` "the more it can see, the more you can trust it to act" is the pre-rewrite enrichment stance and contradicts slide 3's "individual grants, not a graduation ceremony".

## 6. Voice

- Hedge count beyond the slide-1 disclaimer: slide 1 has a second one (`:16` "I am borrowing the mechanism, not claiming a hospital study measured your on-call rotation"); slide 6 (`:96` "Our application is narrower"); slide 10 Story (`:166` "Use measured browser-test costs only with run records" — caveat in a Story line, belongs in the evidence bank). Slides 8 and 13 carry label sentences that are required, not hedges. Total: 3 removable.
- `outlines/failure-improvement-40min.md:5` "Your logs are a roadmap nobody reads" → *Nobody Reads the Scroll* (flat verdict; skill rule 3, and it reuses the talk's own closing image).
- `:16` "I am borrowing the mechanism, not claiming a hospital study measured your on-call rotation." → "Cvach measured it on hospital monitors. Your pager is the same instrument." (keeps the source, drops the apology; the caveat is already at `evidence-bank.md:99`).
- `:96` "Our application is narrower: a repair loop needs evidence that the defect is gone, because…" → "A repair loop needs evidence the defect is gone. Successful workarounds are very persuasive evidence of the wrong thing." (drop "Our application is narrower"; the short at `retry-until-the-403-goes-away.md:17` already does this better).
- `:104` "From tags to tickets and PRs" → *Tickets Are Cheap. Review Is Not.* (promote the slide's own visible line; skill rule 3).
- `:54` "The out-of-band check" and `:76` "Distill, then classify" read as build-guide section headers, not names. Candidates: *The Bookmark Follows the Artifact* (already the SVG title) and *Count Before You Diagnose*.
- Talk title "Automating Improvement From Failure" is four words but a summary, not a name; the packet's own alternate *The Fail-to-Win Loop* satisfies skill rule 5 (name the technique) and matches slide 15. Consider swapping primary and alternate in `packet.md:9-10`.
- `:236` "The model did not get smarter. The system around it got a job." is the correct landing; keep, and add the skill's stage direction "Stop talking." after `:238`.
- `:203` "That is our arithmetic fixture, and it is the number I want next to the throughput chart." Good; keep as is.

## 7. Cruft

| path | action | reason |
| --- | --- | --- |
| `reviews/failure-improvement-review.md` | KEEP | Historical spec; `reviews/README.md:56` marks it as such. All §4 arc, §5 Bainbridge slide, §6 fact fixes (models, $0.36–0.81, "half the failures", "Hermes", ROI claim, "never" superlative) and §7 blockers 2–6 are implemented; blocker 1 (stories) and the live demo remain open by design. |
| `engineering/failure-improvement/evidence.md` | MERGE | Header "Revised 2026-09-05 for the fail-to-win-loop arc"; lines 14–15, 25, 27 quote or index slides that no longer exist. Fold the still-true rows (MCP/hooks/schedule/evals table, claim hygiene bullets) into `packets/failure-improvement/evidence-bank.md` §"Research checked", then delete. |
| `packets/failure-improvement/evidence-bank.md:65-67` "Historical model and cost notes" and `:77-89` "Historical story map, before the September 6 rewrite" | DROP | Pre-rewrite model names and a 9-row story map keyed to old slide numbers; nothing references them and the current map at `:91-95` supersedes. |
| `packets/failure-improvement/evidence-bank.md:5` | MERGE | Delete the first two sentences (E2E cost-saving claims); keep "The rewritten outline makes no measured cost-saving claim." |
| `packets/failure-improvement/packet.md:16-30, 34-49, 63-79` | MERGE | Abstracts, outcomes, takeaways and four audience abstracts describe the old arc; "Revised argument" (`:81-83`) was appended rather than integrated. Rewrite from the 15-slide outline. |
| `packets/failure-improvement/packet.md:15` and `formats.md:15` "The retained PPTX is historical; regenerate before use." | DROP | Synchronized PPTX now generated (`decks/failure-improvement-*-{screen,handout}.pptx`, 03:11 today); the editions table above it already links them. |
| `decks/failure-improvement-40min.pptx` | DROP | Byte-identical size to `failure-improvement-40min-screen.pptx` (272106); legacy filename nothing links to. |
| `packets/failure-improvement/formats.md:25-34` lightning table | MERGE | Beats 2–3 carry the old enrichment rule and "three gates"; rewrite to slides 1, 2, 8, 15 as actually written. |
| `packets/failure-improvement/formats.md:46-58` workshop | KEEP, edit two lines | Strongest workshop block in the portfolio; fix `:52` classify fields and `:56` "E2E economics" reference. |
| `engineering/failure-improvement/demo.md:15-40` "Historical checkbox exercise" | KEEP | Explicitly labeled historical, used by the workshop and `demos/DEMO-RUNBOOK.md` §2; not the peak. |
| `demos/DEMO-RUNBOOK.md:15-21` | KEEP | Describes the kit, which still exists; already says the human gate is a fourth gate. |
| `engineering/failure-improvement/CFP.md:3-9` | MERGE | 50-word abstract is fine; 150-word abstract is pre-rewrite (see Blocking). Reviewer notes current. |
| `packets/speaker/recording-plan.md:7` | MERGE | One stale clause ("working offline demo"); rest of the file matches the 30 route and demo.md. |
| `artifacts/flagship-talks/` | n/a | No failure-improvement files there. |
| `README.md:37` "Browser deck" | MERGE | Make the Editions cell "Browser and PowerPoint" like the other rows once `decks/README.md` re-indexes this slug. |

## 8. Proposed edit list

1. `packets/speaker/recording-plan.md:7` — replace "it has a working offline demo" with "its live demo is specified in engineering/failure-improvement/demo.md and not yet built".
2. `packets/failure-improvement/formats.md:33,53` — change "three gates" to "regression, holdout, scope, and a person".
3. `packets/failure-improvement/formats.md:32` — replace the enrichment sentence with "add the one integration that answers the next question; access is individual grants".
4. `packets/failure-improvement/formats.md:52,56` — classify fields to "severity · evidence · owner · unknown"; delete "E2E economics and".
5. `packets/failure-improvement/formats.md:15` and `packet.md:15` — delete "The retained PPTX is historical; regenerate before use."
6. `decks/failure-improvement-40min.pptx` — delete the duplicate legacy export.
7. `packets/failure-improvement/evidence-bank.md:5` — delete the two pre-rewrite sentences about E2E cost savings and agent-opened PRs.
8. `packets/failure-improvement/evidence-bank.md:65-67,77-89` — delete the historical model notes and the pre-rewrite story map.
9. `engineering/failure-improvement/evidence.md:25` — "slides 8 and 13" → "slides 8 and 12"; delete `:27` (speculation slide) and `:14-15` (quotes of removed outline text).
10. `engineering/failure-improvement/CFP.md:9` — rewrite the 150-word abstract to the 15-slide arc (403 retry, failed holdout, reviewer, ticket metric, Monday).
11. `packets/failure-improvement/packet.md:9-11` — make *The Fail-to-Win Loop* primary, drop "Your Logs Are a Roadmap Nobody Reads".
12. `packets/failure-improvement/packet.md:16-49,63-79` — rewrite abstracts, outcomes, takeaways and audience abstracts from the current outline; fold `:81-83` into them.
13. `outlines/failure-improvement-40min.md:5` — retitle slide 1 (e.g. *Nobody Reads the Scroll*), then `bun artifacts/speaking-portfolio-expanded/sync-talks.ts failure-improvement`.
14. `outlines/failure-improvement-40min.md:16,96,166` — remove the three secondary hedges listed in §6, then re-sync.
15. `outlines/failure-improvement-40min.md:104` — retitle slide 7 to *Tickets Are Cheap. Review Is Not.*; re-sync.
16. `outlines/failure-improvement-40min.md:238` — append "Stop talking." to the final stage direction; re-sync.
17. `outlines/adaptive-systems-40min.md:271` — name the handoff: "…the offline improvement loop, which is the Improvement From Failure talk, evaluates changes to the reusable procedure" (adaptive owner's file; coordinate).
18. `README.md:37` — "Browser deck" → "Browser and PowerPoint" once `decks/README.md` and `decks/exports.json` index failure-improvement again (currently only dynamic-scaling is listed in the staged versions).
19. After edits 10–12, merge `engineering/failure-improvement/evidence.md` into `packets/failure-improvement/evidence-bank.md` and delete it; update `README.md:93` link.
