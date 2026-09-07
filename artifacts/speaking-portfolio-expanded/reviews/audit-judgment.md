# Audit: Code Is Cheap. Judgment Is Expensive.

Audited 2026-09-06 against `outlines/judgment-40min.md` (canonical, last changed in decee2483), both adaptations, `packets/judgment/*`, the `judgment` route in `build-talk.ts`, three shorts, `reviews/judgment-review.md`, `flagship-talks/judgment-*`, both READMEs, `reveal-talks/judgment*.html`, the 40-min screen PPTX, and `reveal-talks/assets/judgment/queue.svg`. Boundary checked against `outlines/dynamic-scaling-40min.md`.

## 1. Verdict

Ready after fixes. The arithmetic, the citations, the demo and the route sums all check out; the one on-stage hazard is the 15-minute script telling Dan to give pairs thirty seconds and then sixty seconds on the same slide. The rest is stale index files and four hedges the evidence bank already carries.

## 2. Blocking

| file:line | quoted text | problem | concrete fix |
| --- | --- | --- | --- |
| `packets/judgment/script-15min.md:3` vs `:51` and `:57` | L3 "Pairs get 30 seconds; the demo gets 3:30." · L51 "Spend sixty seconds with the person next to you." · L57 "Delivery: … Give pairs a full 60 seconds, collect two answers" | Slide 6 has 1:30 in the 15-minute route (`build-talk.ts:358`, `times[2] = 1.5`). The header says 30 seconds; the talk track and the delivery note both say 60. Read as written, the exercise alone eats two thirds of the slot and the presenter contradicts himself on stage. | In `build-talk.ts` judgment route `"15"`, add `trim: { 6: [0, 2, 3] }` (drops the "Spend sixty seconds" paragraph) and fold the timing into the existing slide-3 bridge: "Bridge: improve the process producing the queue. Start with the request before the code exists. Thirty seconds in pairs: what does the ticket leave unanswered?" Then rerun `bun artifacts/speaking-portfolio-expanded/build-talk.ts judgment`. The stage direction will still say 60 seconds; accept that or add a route-level note override. |

## 3. Consistency findings

- Timings sum and are monotonic. 40-min: 2.5+2.5+3+2.5+2.5+3+3+3+4+3+3+3+3+2 = 40.0. 30-min route (`build-talk.ts:327-340`): 3+2+3+2+2+2+2+4+2.5+2.5+2+3 = 30.0; note's "permissions block is four minutes" = slides 6+7 = 2+2 ✓; "rubber stamp keeps four minutes" ✓. 15-min route (`build-talk.ts:358-366`): 1.5+2.5+1.5+1.5+3.5+2.5+2 = 15.0; "demo gets 3:30" ✓.
- Bridges cover every cut. 30: bridge after 3 covers cut 4; bridge after 10 covers cut 11. 15: bridge after 1 covers 2; after 3 covers 4–5; after 7 covers 8; after 9 covers 10–11. Slide 13 is cut in the 15 with no bridge, but slide 14 opens "Back to the curve" and needs none.
- Slide references in shorts all resolve to the right content: `you-ate-their-slack.md:3` (slides 1, 3 → hook and Kingman ✓), `human-crumple-zone.md:3` (5, 8, 10 → Deming, Bacchelli & Bird, Elish ✓), `test-that-loves-the-bug.md:3` (9 → demo ✓). Shorts README rows 3, 6, 29 point at the retitled names with unchanged slugs ✓.
- Generated scripts and all four HTML decks match the outline (diff is structural only: headings, "Delivery:" for "Stage direction:", sources relocated). No stale phrases from the pre-rewrite deck ("thought experiment", "10,000 lines", "the user's central argument", "law of nature", "hypothetical", "bounded team experiment") survive in `judgment*.html` or the 40-min screen PPTX slides/notes. Slide counts: 14 / 12 / 7 ✓.
- `outlines/judgment-40min.md:112` says out loud at 16:00 "The same admin requests a change in B: deny." Slide 9 at 22:00 then asks the room to approve a predicate that ignores the tenant, and `packets/judgment/contracts.md:11` says "Do not display the second case before the vote." The stage direction at `:116` half-acknowledges this ("Keep the cross-tenant case visible in the handout, not beside the later demo's initial code") but the spoken line is the reveal. Not a break; slide 9's own direction at `:151` handles a room that catches it. Decide on purpose: either drop the B case from `:112` (let slide 9 introduce it), or keep it and say so on slide 9: "You heard the cross-tenant case six minutes ago. Watch the vote anyway." The second is the automation-bias point and the stronger talk.
- `outlines/judgment-40min.md:139` shows `canEdit(user) = user.roles.includes("admin")`; `packets/judgment/demo.ts:4` is `canEdit(u, _resourceTenant)` and `contracts.md:6` is `(user, resourceTenant)`. When `--holdout` fails, Bun prints lines 3–8 on the projector, so the room sees a two-argument signature that the slide showed as one. Match the slide to the file or accept the reveal.
- `decks/README.md:3,7` says "These 6 PowerPoint files" and lists only Dynamic Scaling. `sync-talks.ts:77` rewrites the manifest from whichever slugs were passed on the last run (the 18:27 dynamic-scaling sync). `README.md:45` sends Judgment's "Browser and PowerPoint" link to that manifest, where Judgment does not appear. Same at HEAD (0 mentions), so this predates today. Fix is in `sync-talks.ts` (merge rows instead of overwrite) or rerun sync for all registered slugs.
- `flagship-talks/README.md:3` claims the retained PPTX files are "synchronized aliases of the current screen editions." Today they are byte-identical (`cmp` against `decks/judgment-40min-screen.pptx` and `-15min-screen.pptx` both match), but `sync-talks.ts` and `build-talk.ts` contain no copy step (grep "flagship" is empty). They will drift on the next sync.
- `outlines/judgment-40min.md:219` slide 14 reuses `queue.svg` with alt text "Knowing when to stop" (the heading, not the image). Slide 3's alt at `:39` is likewise the heading. The SVG's own `<title>` ("Kingman: queue wait vs reviewer utilization, variability factor one") is the accurate description; use it as alt on both.
- `reveal-talks/index.html:7` blurb "the code you should never generate" is a fair paraphrase of slides 12 and 14 ✓.

## 4. Correctness findings

- Kingman, `outlines/judgment-40min.md:41-46`, `queue.svg`, `you-ate-their-slack.md:13`. Formula form Wq ≈ ((ca² + cs²)/2) · ρ/(1−ρ) · E[S] is the standard single-server heavy-traffic approximation ✓. Recomputed: 0.80/0.20 = 4.00; 0.90/0.10 = 9.00; 0.95/0.05 = 19.00 ✓. "Fifteen percentage points … nearly five times the wait": 19/4 = 4.75 ✓. "if variability doubles … it multiplies the wait too": Wq is linear in V ✓. Spoken "point nine five divided by point zero five is nineteen" ✓.
- SVG geometry, `queue.svg`: x = 110 + 1135.4ρ, y = 410 − 16.5·(ρ/(1−ρ)). 80% → (1018.3, 344.0) ✓; 90% → (1131.9, 261.5) ✓; 95% → (1188.6, 96.5) ✓; 25% tick at 393.85 ✓. Curve terminates at ρ ≈ 0.952 (19.8×) inside the 20× axis ✓. Subtitle "Wq / E[S] ≈ V · ρ / (1 − ρ) · single server, V = 1" matches slide 3 ✓.
- Amdahl, `:58-61`: speedup = 1/((1−p) + p/s); with p = 0.70 and s → ∞, 1/0.30 = 3.333… ✓ "three and a third" ✓. Labeled as fixed-work arithmetic with a put-your-own-fraction instruction ✓ (evidence bank L3 agrees).
- Little, `:48`: "average work in progress equals throughput times average time in the system" = L = λW ✓.
- Demo verified. `bun packets/judgment/demo.ts` → prints `PASS: tenant A admin can edit tenant A`, exit 0. With `--holdout` → same PASS line, then `AssertionError: Tenant A admin must not edit tenant B`, `true !== false`, exit 1. Matches slide 9 `:143-145` and `contracts.md:11` ("Exit 1 is the intended failed gate") ✓. Fixture is labeled synthetic in `demo.ts:1`, `contracts.md:3`, `evidence-bank.md:5` ✓.
- Citations verified from the text: Kingman (1961) Math. Proc. Camb. Phil. Soc. 57(4) 902–904 ✓. Little (1961) Operations Research 9(3) 383–387 ✓. Amdahl (1967) AFIPS SJCC 483–485, DOI 10.1145/1465482.1465560 ✓. Bacchelli & Bird (2013) ICSE ✓; the slide's use (defect-finding is the stated motivation, observed outcomes skew to understanding and knowledge transfer) is what the paper reports ✓. Elish (2019) ESTS 5, 40–60 ✓. Brooks: UNC TR 86-020 (1986), Computer 20(4) 1987, 10–19 ✓; slide uses only the essence/accident distinction, not the decade forecast ✓.
- Citations needing an external recheck or a venue: `:153` "Bainbridge (1983), Ironies of automation" has no venue; add Automatica 19(6), 775–779. `:153` "Mosier and Skitka (1999), Automation Use and Automation Bias", DOI 10.1177/154193129904300346 resolves to Proc. HFES Annual Meeting 43(3); confirm title and author order on the page, or swap to the more-cited Skitka, Mosier & Burdick (1999), IJHCS 51(5), 991–1006, which the old review recommended. `:82` cites Deming's Point 3 through a Deming Institute blog post; the primary is Out of the Crisis (1986). Not wrong, but a blog is a soft source for the talk's first contestable claim.
- No vendor, product, price or dated-announcement claims in this talk. No invented numbers: every figure is derived on stage (4, 9, 19, 3.33) or labeled a fixture.

## 5. Direction alignment

- (a) assistant-with-everything: not argued in this talk; nothing to drift. (b) Knight & Leveson: not cited; nothing to drift. (d) spend-where-axioms-said-not-to: `:14` "We can spend the gain on fewer defects and smaller changes" is aligned.
- (c) one soft spot. `:193` "It includes declining a second implementation after the first already met the need. Comparing fleets of candidate agents belongs to Dynamic Scaling." Read cold, "declining a second implementation" sounds like an argument against the barrel-of-monkeys maneuver. It is not (Dynamic Scaling's candidates go to a council, not to the human reviewer), but the sentence should say so, in Dynamic Scaling's vocabulary.
- Deferral target exists. Dynamic Scaling slide 12 "Attempts are a scaling axis. So is judging." (`dynamic-scaling-40min.md:196-222`) owns parallel candidates, the Council of Guards and the barrel-of-monkeys maneuver. Vocabulary mismatch only: Dynamic Scaling says "attempts" and "candidates"; its word "fleet" (`:35`, `:119`, `:123`) means warm infrastructure, not candidate agents. "Fleets of candidate agents" points at the right talk with the wrong noun.
- `reviews/README.md:28` "Judgment slide 12 duplicates Dynamic Scaling slides 12 and 13" describes the pre-rewrite deck; current slide 12 is the three-levers slide and no longer duplicates. The README labels the section historical ✓.

## 6. Voice

Hedges beyond the allowed one at `:16`: four (`:48`, `:114`, `:149`, `:177`), plus a mild "in our model" at `:226`. All four are already in `evidence-bank.md:3-5`, so they can go.

1. `:48` "Neither result says your team is literally one server. They tell us what to measure before claiming the reviewer just needs to try harder." → "They tell us what to measure before claiming the reviewer just needs to try harder." (slide 1 already said one server).
2. `:114` "That is an attempt to reduce service-time variance, not a claim that a document automatically changes a coefficient." → "That is the variance term. On purpose."
3. `:149` "Those experiments were not code-review trials." → delete; evidence bank L5 carries it.
4. `:177` "Use that distinction here without turning his old forecast into a timeless speed limit." → "His forecast expired in 1996. The distinction did not."
5. `:54` heading "Your ceiling is the stage you did not speed up" is nine words and reads as an explainer (skill: 2–6 words, no "Your X Is a Y"). → "The stage you didn't speed up" or "Amdahl, for one human".
6. `:20` heading "Where does the work actually wait?" is a question title where the question is not the joke. → "Point at the queue" (its own visible line at `:25`).
7. `:44-46` slide 3 or `:226` slide 14: add the old review's unused seed line, "Ninety-five percent utilization is not efficiency. It is a nineteen-times wait with good posture."
8. `:162` slide 10 after "The org chart looks excellent.": "We did not remove the bottleneck. We moved it onto one person and gave them a keyboard shortcut for approving things." (also from the review, unadopted).

No slide heading reads as a compliance deck. Jokes retained: `:14` genie, `:147` "Both of them are very confident", `:166` "a convenient place to send the postmortem", `:209` "green squares".

## 7. Cruft

| path | verdict | reason |
| --- | --- | --- |
| `artifacts/flagship-talks/judgment-40min-outline.md` | DROP | Three-line pointer stub; nothing links to it (flagship README table links the canonical outline directly); Git history keeps the old prose. |
| `artifacts/flagship-talks/judgment-15min-outline.md` | DROP | Same; pointer to the generated adaptation. |
| `artifacts/flagship-talks/judgment-40min.pptx`, `judgment-15min.pptx` | DROP | 520 KB of binaries byte-identical to `decks/judgment-*-screen.pptx` today, with no sync step to keep them that way; the "synchronized aliases" claim will be false after the next `sync-talks.ts` run. |
| `artifacts/flagship-talks/README.md` | MERGE | Its one useful paragraph (ownership boundaries, L13) belongs in `speaking-portfolio-expanded/README.md:105-113`, which already says most of it; then the directory can go. Note in passing: its retrieval row title is the skill's canonical reject; that is the retrieval audit's problem. |
| `reviews/judgment-review.md` | KEEP | Historical spec. All 14 proposed slide slots were adopted one-for-one (§4 table → current outline), §6 checklist items are all resolved, §2.11 collisions are gone. Two seed lines in §4 remain unused (see Voice 7–8). |
| `reviews/README.md:24,28,44` | KEEP | Labeled historical; the Implementation status table is current. |
| `packets/judgment/packet.md:5-9` | MERGE | Duplicates `formats.md:6-10` verbatim; keep the generated `formats.md` table and have `packet.md` link to it. |
| `packets/judgment/evidence-bank.md`, `visuals.md`, `contracts.md`, `demo.ts` | KEEP | Hand-written, current, agree with the outline. |
| `decks/README.md` | REGENERATE | Lists only Dynamic Scaling; `sync-talks.ts:77` overwrites instead of merging. |
| Notes files, "Cuts" tables | none | None exist for this talk. |

## 8. Proposed edit list

1. `packets/judgment/packet.md`: replace the duplicated table (L5–9) with a link to `formats.md`.
2. `outlines/judgment-40min.md:39,219`: set both image alts to the SVG title, "Kingman: queue wait vs reviewer utilization, variability factor one".
3. `outlines/judgment-40min.md:153`: add venues, "Automatica 19(6), 775–779" and "Proc. HFES Annual Meeting 43(3)" (or swap to Skitka, Mosier & Burdick 1999, IJHCS 51(5)).
4. `outlines/judgment-40min.md:48,114,149,177`: apply Voice 1–4 (drop four hedges the evidence bank already holds).
5. `outlines/judgment-40min.md:193`: rewrite to "Generate ten if you like; the Council of Guards eats nine. That is Dynamic Scaling's talk. This one protects the person who accepts the one that gets through."
6. `outlines/judgment-40min.md:139`: change the visible line to `canEdit(user, tenant) = user.roles.includes("admin")` so it matches what Bun prints on failure, or leave it and accept the on-screen reveal; decide in the same edit as item 7.
7. `outlines/judgment-40min.md:112,145`: either delete "The same admin requests a change in B: deny." from slide 7, or add to slide 9 "You heard the cross-tenant case six minutes ago. Watch the vote anyway."
8. `build-talk.ts` judgment route `"15"`: add `trim: { 6: [0, 2, 3] }` and extend the slide-3 bridge with the thirty-second instruction (Blocking table), then run `bun artifacts/speaking-portfolio-expanded/build-talk.ts judgment`.
9. `outlines/judgment-40min.md:20,54`: retitle slides 2 and 4 per Voice 5–6; optionally add the two seed lines (Voice 7–8); regenerate.
10. `sync-talks.ts:77`: merge manifest rows across slugs instead of overwriting, then run `bun artifacts/speaking-portfolio-expanded/sync-talks.ts judgment` so `decks/README.md` lists Judgment again and the PPTX exports pick up items 2–9.
11. `artifacts/flagship-talks/`: delete the two judgment stubs and two judgment PPTX files; move the ownership paragraph from its README into `speaking-portfolio-expanded/README.md:113` and fix `README.md:105` to stop pointing at the flagship directory.

## Fixes applied 2026-09-06

### 1. Changes

- `outlines/judgment-40min.md:20-25` — slide 2 retitled "Point at the queue"; second visible line now "Not where it takes skill. Where it sits untouched." (was a question title whose question was not the joke, plus a heading/visible-line duplicate).
- `outlines/judgment-40min.md:54` — slide 4 retitled "The stage you didn't speed up" (six words; drops the "Your X is a Y" shape).
- `outlines/judgment-40min.md:39,219` — both image alts set to the SVG's own `<title>`, "Kingman: queue wait vs reviewer utilization, variability factor one".
- `outlines/judgment-40min.md:48,114,177` — Voice hedges 1, 2 and 4 removed ("Neither result says your team is literally one server", "not a claim that a document automatically changes a coefficient" → "That is the variance term. On purpose.", "without turning his old forecast into a timeless speed limit" → "His forecast expired in 1996. The distinction did not."). All three are carried by `evidence-bank.md`.
- `outlines/judgment-40min.md:100` — slide 6 stage direction now reads "Give pairs sixty seconds here, thirty in the 15-minute cut", so the delivery note is correct in every route instead of contradicting the 15-minute header. Pairs with the route trim below.
- `outlines/judgment-40min.md:139` — visible line is now `canEdit(user, resourceTenant) = user.roles.includes("admin")`, matching `contracts.md:6` and the arity Bun prints on the held-out failure. The ignored parameter is now the visible tell.
- `outlines/judgment-40min.md:145` — slide 9 gains "The resource tenant is right there in the signature. Nothing reads it. And you already heard the cross-tenant case, back on the spec slide. Watch the vote anyway." Keeps `:112`'s B case and makes the vote the automation-bias demonstration (audit §3, item 7, second option). Worded without a slide number so it survives the 30 and 15 cuts, where slide 7 is also kept.
- `outlines/judgment-40min.md:149,153` — Skitka characterization qualified and the citation swapped. Now: a flight-simulation task with an automated monitoring aid, and the omission/commission errors are scored **on the trials where the aid was wrong**. Source is Skitka, Mosier & Burdick (1999), IJHCS 51(5), 991–1006, DOI 10.1006/ijhc.1999.0252, replacing the HFES proceedings abstract; Bainbridge gains Automatica 19(6), 775–779. The hedge "Those experiments were not code-review trials" moves into the source line as a fact rather than a retraction.
- `outlines/judgment-40min.md:82` — Deming cited to *Out of the Crisis* (1986), Point 3, with the Deming Institute post demoted to "applied to review by".
- `outlines/judgment-40min.md:162` — morning-review seed line added after "The org chart looks excellent.": "We did not remove the bottleneck. We moved it onto one person and gave them a keyboard shortcut for approving things."
- `outlines/judgment-40min.md:193` — **slide 12 reconciled with Dynamic Scaling slide 12.** "fleets of candidate agents" is gone (Dynamic Scaling's "fleet" means warm infrastructure). New text: declining a second implementation is "a rule about review load, not about generation: generate ten parallel attempts if you like, as long as a gate collapses them to one candidate before a human reads any of them. Judging the ten is Dynamic Scaling's talk, and its Council of Guards eats nine." Uses attempts / candidates / gate / Council of Guards, so the two talks read as one position.
- `outlines/judgment-40min.md:226` — morning-review seed line lands slide 14: "Ninety-five percent utilization is not efficiency. It is a nineteen-times wait with good posture." Also drops the mild "in our model" hedge ("Argue with the model by measuring…").
- `packets/judgment/evidence-bank.md` — Skitka entry rewritten to the flight-simulator/aid-was-wrong scope; boundary paragraph now states explicitly that this talk does not argue against parallel attempts, the Council of Guards or the barrel-of-monkeys maneuver, and that slide 12 declines redundant review load only.
- `packets/judgment/packet.md` — duplicated edition table replaced with a link to the generated `formats.md`, plus a hand-written-companions index.
- `shorts/test-that-loves-the-bug.md` — snippet updated to the two-argument signature, "the resource tenant is right there in the signature" beat added, automation-bias beat and source line requalified to Skitka/Mosier/Burdick 1999 and the flight simulator. Other two shorts need no change (slide numbers and claims unmoved).

Verified after editing: 14 slides, timings monotonic and contiguous, sum 40:00. Slide 6 spoken paragraph indices confirmed 0–3 with the sixty-second instruction at index 1 (parsed with `parseOutline`; no generator run, nothing written).

### 2. Skipped

- Edit-list item 10 (`sync-talks.ts:77` manifest merge) and item 11 (`artifacts/flagship-talks/`) — out of scope by rules of engagement; `flagship-talks/` is already deleted per tonight's direction. `decks/README.md` will list Judgment again after the caller's full sync.
- Renaming `demo.ts`'s `_resourceTenant` parameter to match the slide exactly — the underscore is what keeps `noUnusedParameters` quiet, and the slide now agrees with `contracts.md` and with the arity. If Bun's printed source line bothers Dan on the projector, that is the one remaining cosmetic gap.

### 3. Route config changes for the caller

```
build-talk.ts → TALKS["judgment"].routes["15"]

  field: trim        old: (absent)
                     new: { 6: [0, 2, 3] }
    Drops slide 6 spoken paragraph 1 ("Spend sixty seconds with the person next to you…").
    Paragraphs 0, 2, 3 are kept in order. Verified against the edited outline.

  field: bridges["3"]
    old: "Bridge: improve the process producing the queue. Start with the request before the code exists."
    new: "Bridge: improve the process producing the queue. Start with the request before the code exists. Thirty seconds in pairs: what does the ticket leave unanswered?"

  field: note        unchanged ("… Pairs get 30 seconds; the demo gets 3:30.") — now true.

No `keep`, `times` or `minutes` change. 15-minute route still sums:
1.5 + 2.5 + 1.5 + 1.5 + 3.5 + 2.5 + 2 = 15.0
30-minute and 40-minute routes untouched.
```

### 4. Morning review (`reviews/judgment-review.md`)

Adopted — both remaining §4 seed lines, which were the only unimplemented items left:
- "Ninety-five percent utilization is not efficiency. It is a nineteen-times wait with good posture." → slide 14. Earns its place: slide 14 already stated the 19× flatly and the seed line states it with contempt, which is the register the closing slide was missing.
- "We did not remove the bottleneck. We moved it onto one person and gave them a keyboard shortcut for approving things." → slide 10, immediately after "The org chart looks excellent." It converts an Elish citation into an accusation, and it is the closest this talk gets to a quotable line outside the demo.

Also adopted from §6: the review's preferred automation-bias citation (Skitka, Mosier & Burdick 1999, IJHCS) over the HFES abstract, and its instruction to state the transfer explicitly — now done in the outline text, the source line, the evidence bank and the short.

Skipped — everything else in the review is already implemented (all 14 §4 slide slots, the §6 checklist) or settled: the "10,000 lines / 1,000" figure stays dropped in favour of the Kingman arithmetic; Fagan, Rigby & Bird, Reinertsen, Goldratt, Woods & Hollnagel, Davies, Jensen & Meckling and Ostrom stay out, since the review's own §2.1 diagnosis was too many frames and the talk now runs on three (queue, inspection, accountability); the SmartBear LOC figures stay unused.
