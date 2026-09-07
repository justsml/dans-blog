# Audit: Adaptive, agentic apps (2026-09-06)

Scope: outline, adaptations, packet, build-talk.ts route, four shorts, decks, READMEs, cross-talk references. No `adaptive-systems-review.md` and no `flagship-talks/adaptive-*` exist, so items 7 and 8 of the audit prompt are empty.

## Verdict

Ready after fixes. The outline, generated scripts, decks and SVG captions are in sync (outline 17:15:40, SVG 17:15:47, HTML and PPTX 17:17:22; route timings sum to 15/30/40; deck `data-timing` sums to 900/1800/2400). One build bug mangles both DOI links in the deck presenter notes, and the hand-written packet files carry a handful of stale phrases from before today's rewrite.

## Blocking

| file:line | quoted text | problem | concrete fix |
| --- | --- | --- | --- |
| `artifacts/speaking-portfolio-expanded/build-talk.ts:735` | `/\[([^\]]+)\]\((https?:\/\/.+)\)/g` | Greedy `.+` swallows the rest of the line. In `reveal-talks/adaptive-systems.html:52` the Saltzer link becomes `href="https://doi.org/10.1109/PROC.1975.9939), Proceedings of the IEEE 63(9), 1278 to 1308. Least privilege is their principle (f"`; at `:59` the Bainbridge link swallows the whole Skitka citation. Affects all three route decks and every talk with a `Source:` link. | Use a lazy, delimiter-aware URL group: `/\[([^\]]+)\]\((https?:\/\/\S+?)\)(?=[\s,.;:]|$)/g`, then `bun artifacts/speaking-portfolio-expanded/sync-talks.ts adaptive-systems`. |

## Consistency findings

- `packets/adaptive-systems/evidence-bank.md:14` story slot for slide 3 reads "or the dry-run flag you were glad existed"; outline `adaptive-systems-40min.md:65` now reads "or the tool pairing you only noticed after it fired". Stale.
- `evidence-bank.md:24` and `:33` say Fly.io sandboxes "Supports the least-privilege claim on slide 11" and quote "Least privilege for free (slide 11)". Slide 11 no longer says that; least privilege is on slide 5 (Saltzer). Slide 11 says catalog, lease, teardown. Retarget or delete.
- `evidence-bank.md:7` "Council of attempts (companion talk). Dan's practice of comparing two to five model or persona attempts before a harder review. Lives in Dynamic Scaling, slide 12." Dynamic Scaling slide 12 (`outlines/dynamic-scaling-40min.md:196-222`) is now Council of Guards (judges measuring disagreement) plus the barrel-of-monkeys maneuver. Name and framing are stale; see Direction.
- `evidence-bank.md:34` "The daily report, ledger arithmetic and fixtures are design fixtures". There is no ledger arithmetic in this talk any more (ledgers moved to Dynamic Scaling). Drop "ledger arithmetic".
- `evidence-bank.md:46` says the OCR cut is carried "via the quality floor in the job contract"; `contracts.md:9-24` has no quality-floor field. Either add `"qualityFloor"` (e.g. `"every input record accounted for"`) to the contract or reword the cut row.
- `contracts.md:15` job contract grants `run-fixtures` up front (`"tools": [..., "run-fixtures"]`), but `demo.md:7` and outline slide 4 (`:79`) say the diff agent is conjured with read-sample and read-contract only and then "asks for run-fixtures; policy grants it" through tool search. The gate table at `contracts.md:35` also lists `run-fixtures` as a request. Remove `run-fixtures` from the contract's `tools` so the handout and the walkthrough tell the same story.
- `build-talk.ts:555` 15-min `trim: { 3: [0, 1, 3] }` cuts slide 3 paragraph 2 ("Most of the damage will be accidents..."), but the route keeps the visible line "Accidents first. Then people who mean it." and the stage direction "Pause on the third line; let the room feel that the accident case is the common one" (`script-15min.md:31,41`). Either keep paragraph 2 (`[0,1,2,3]`, +20 s) or accept that the third line is unspoken.
- `build-talk.ts:555` 15-min `trim: { 4: [0, 1, 3] }` cuts the loop paragraph while keeping the visible line "Orchestrator loops: done, more help, or stop" (`script-15min.md:49`). Same choice as above; the loop sentence is one line and the slide has 3 minutes.
- `build-talk.ts:555` 15-min `trim: { 10: [0, 1, 2] }` drops "Three events, three different right answers, none of them success or failure. If your dashboard only has two states, it is hiding the most interesting one." That is the landing line of the walkthrough. Keep `[0,1,2,3]`.
- `build-talk.ts:553` 15-min bridge after slide 10: "the same orchestrator can ask for its own scale inside a per-customer budget; that is a companion talk." Slide 11 is in this talk; the companion owns mechanics. Say "that is slide 11 in the long version; the mechanics are a companion talk."
- `formats.md:26` "45 minutes | 40-minute route plus five minutes of Q&A" vs outline `:5` "no Q&A. Add five minutes for a 45-minute booking." Pick one; the outline is canonical.
- `formats.md:15` and `packet.md:3` link `decks/adaptive-systems-screen.pptx` and `-handout.pptx` (no length suffix). The files exist (byte-identical to the 40min pair) but the generated editions table at `formats.md:6-10` is the source of truth; drop the un-suffixed links or the duplicate files.
- `decks/README.md` lists only Dynamic Scaling (6 files) while `README.md:7` says the index "links all 60 editions". Adaptive rows are missing from the decks index.
- `engineering/adaptive-systems/CFP.md:11-15` lists three outcomes; `packet.md:37-41` lists four (the memory-pattern outcome was added). CFP copy drifted.
- `packet.md:37-41` outcome 4 is separated from 1-3 by a blank line; renders as a loose list in some viewers. Cosmetic.
- `shorts/you-will-build-the-assistant-with-everything.md:33` on-screen "this job: 3 tools, 6 minutes, $2" vs `contracts.md:18-19` `maxSpendUsd: 2, deadlineSeconds: 120`. The six minutes is the compute lease from slide 11 (`durationSeconds: 360`), not the job deadline. Use "2 minutes" or change the contract to 360.
- `visuals.md:22` "The regional-recovery diagram was removed with its slide." The file `reveal-talks/assets/adaptive-systems/03-proposal-and-authority-are-separate.svg` is still on disk and referenced nowhere (checked all `.md`, `.html`, `.ts`). See Cruft.
- SVG captions match current claims: `03-the-assistant-with-everything.svg` closes "You will build this. The question is how many pathways are live at once." and outline alt text at `:51` agrees. `13-keep-access-capabilities-out-of-the-planner.svg` matches slide 5. No stale captions found.
- Deck headings (`reveal-talks/adaptive-systems.html:48-62`) match the 15 outline headings exactly. Generated scripts contain no pre-rewrite phrasing (grepped for refuse / don't build / dry-run / regional / vote / Knight).

## Correctness findings

- C(10,2) = 10·9/2 = 45. Correct (slide 3, short on-screen `10 tools → 45 pairs`).
- "Plug in one SaaS with a dozen endpoints ... hundreds of routes": 22 tools → C(22,2) = 231 pairs, 186 new; ordered read→write pairs 22·21 = 462. "Hundreds" holds either way; if challenged, say "over two hundred pairs".
- "We have all been nodding at that for fifty years": 1975 → 2026 is 51. Fine.
- Saltzer and Schroeder (1975), Proc. IEEE 63(9), 1278–1308. Least privilege is principle (f) in their list (a: economy of mechanism … f: least privilege … h: psychological acceptability). Verified from memory of the paper; DOI matches. Use is accurate.
- Bainbridge (1983), Automatica 19(6), 775–779. Correct. The "promoted to monitoring" paraphrase is faithful.
- Skitka, Mosier and Burdick (1999), IJHCS 51(5), 991–1006. Correct citation. Slide 12 says "people given a highly but imperfectly reliable aid did worse than people given no aid at all." The paper's result is that on the events the automation missed or miscalled, the non-automated group outperformed the automated group (omission and commission errors). Add "on the events the aid got wrong" so the sentence is what the paper supports; evidence bank already says not to quote an effect size.
- Vaughan (1996), The Challenger Launch Decision, University of Chicago Press. Correct.
- ZIP+4: four-digit add-on. Correct.
- Needs an external recheck before delivery: "WebMCP lets an agent act on whatever site you have open" (slide 3, `no-agent.md:9`). WebMCP is a proposal in which a site declares tools; it does not act on arbitrary open sites. Say "on any site that opts in" or keep it as prediction. "Browsers now ship a chat that drives the page" is vendor-dated; name the browser or leave it generic.
- Fixture numbers are labeled: `contracts.md:5` "Numbers are policy choices, not measurements"; `demo.md:1` "Paper trace"; `memory-pattern.md:30` "Synthetic example". The "ninety-eight percent" on slide 1 is unlabeled but reads as illustrative. The daily report's `18 records`, `$0.20`, `3 denied` are covered by the contracts.md disclaimer.
- Compute request fixture matches the spoken line: `count: 8`, `durationSeconds: 360` ↔ "eight sandboxes for six minutes". `costCapUsd: 1.5` < `maxSpendUsd: 2`, consistent.

## Direction alignment

- (a) Aligned everywhere: outline `:57` "is not a design we get to decline", `:63` "the question is not whether to give the assistant access", `:285` "nothing on these slides stops it, and I would not want to"; `packet.md:21` "a strategy for giving them that access anyway"; SVG caption; all three shorts. No "don't build it" residue found.
- (b) Knight and Leveson is not cited in this talk. `evidence-bank.md:7` still describes the companion beat as "comparing two to five model or persona attempts before a harder review" under the name "Council of attempts". The current Dynamic Scaling slide 12 frames it as judges measuring disagreement and explicitly not a vote. Rewrite the bullet: "Council of Guards and the barrel-of-monkeys maneuver (companion talk). Cheap parallel judges measure disagreement; parallel generation is led with on purpose. Lives in Dynamic Scaling, slide 12."
- (c) `evidence-bank.md:51` "Dynamic Scaling owns ... parallel attempts" is fine but should name the two techniques so the name is used everywhere (skill: "Once named, use the name everywhere").
- (d) Nothing contradicts. Slide 11 "a customer can buy a faster turnaround" and slide 4 "Nobody rents a committee every time a CSV arrives" are both compatible with spend-where-it-pays.
- Deferral gap: `outlines/dynamic-scaling-40min.md:214` and `shorts/barrel-of-monkeys.md:29` both hand off "the system that watches its own acceptance rate and token burn and adjusts fan-out itself" to this talk. Adaptive covers per-job compute (slide 11) and authority widening from measured outcomes (slide 13), but never says the orchestrator tunes fan-out or spend from measured acceptance. Add one sentence to slide 13 (e.g. "The same loop tunes how much the orchestrator spends per job class: acceptance rate up, budget up; false repairs up, budget down.") or soften the two deferrals.
- Ownership claims check out: `failure-improvement-40min.md:14` "Runtime recovery belongs to Adaptive, agentic apps" ↔ slide 14 "the offline improvement loop evaluates changes"; Dynamic Scaling slides 7-8 exist for the slide 11 "companion talk" hand-off.

## Voice

Hedge count beyond the slide-1 disclaimer: slide 4 has one real admission ("I do not have one I trust yet"), which the skill allows. No other slide hedges. Handout caveats (`contracts.md:5,96`, `memory-pattern.md:38`) are in bounds.

- `outline:47` heading "The assistant with everything is coming, one integration at a time" (11 words) → "Sorry, You're Building It" (the short already owns this name; skill: use the name everywhere).
- `outline:31` "The bar is: diff the schema and page a human" → "The Bar Is a Pager".
- `outline:98` visible line "Read customer data and post to a vendor never share one agent" (reads as a run-on) → "Reads customer data? Then it never posts to a vendor."
- `outline:217` "Show engineers what changed today" → "Ironies of Automation" (proper-noun protagonist; the slide is built on Bainbridge anyway).
- `outline:236` "Widen authority only from measured outcomes" → "Normalization of Deviance" or "Widen Per Class, Never Per Streak".
- `outline:197` "Scale becomes something the app asks for" → "The Job Asks for Its Own Compute" is taken by a short; "Compute, Please (and a Receipt)" is taken by Dynamic Scaling. Leave, or "Compute Is a Tool Too".
- `packet.md:11` title candidate "Adaptive, agentic apps" is a category label, not a name. Add "Sorry, You're Building It" and "Conjure Exactly Enough" (drop "agent") as the leads; keep "Adaptive, agentic apps" as the descriptor.
- `outline:244` "A model saying ninety percent confident settles nothing." is already the sharpest line on slide 13; consider making it the visible third line instead of the "Expand:" bullet.

## Cruft

| path | action | reason |
| --- | --- | --- |
| `artifacts/reveal-talks/assets/adaptive-systems/03-proposal-and-authority-are-separate.svg` | DROP | Referenced by nothing; `visuals.md:22` already says its slide was removed. |
| `artifacts/speaking-portfolio-expanded/decks/adaptive-systems-screen.pptx`, `adaptive-systems-handout.pptx` | DROP | Byte-identical to the `-40min-` pair; the generated editions table is the index. Update `formats.md:15` and `packet.md:3` links first. |
| `artifacts/speaking-portfolio-expanded/engineering/adaptive-systems/CFP.md` | MERGE | Duplicates `packet.md` abstracts with a stale three-outcome list; keep as a pointer file like its `demo.md` and `evidence.md` siblings. |
| `artifacts/speaking-portfolio-expanded/engineering/adaptive-systems/demo.md`, `evidence.md` | KEEP | Pointer files the README links; two lines each. |
| `packets/adaptive-systems/evidence-bank.md` "Cuts" table (`:40-47`) | KEEP | Still true, but fix the quality-floor row and drop "ledger arithmetic" at `:34`. |
| `packets/adaptive-systems/formats.md` five-minute lightning script (`:30-40`) | KEEP | Matches today's outline paragraph for paragraph; the five-minute slot is the only source. |
| `packets/adaptive-systems/visuals.md:22` | KEEP | Correct once the orphan SVG is deleted. |
| `decks/README.md` | MERGE | Add the adaptive rows (and the other eight talks) or stop claiming "all 60 editions" in `README.md:7`. |

## Proposed edit list

1. `packets/adaptive-systems/evidence-bank.md:14` — replace "the dry-run flag you were glad existed" with "the tool pairing you only noticed after it fired".
2. `packets/adaptive-systems/evidence-bank.md:34` — delete "ledger arithmetic".
3. `packets/adaptive-systems/evidence-bank.md:24,33` — retarget the Fly.io line and "least privilege for free" to slide 5, or delete both.
4. `packets/adaptive-systems/evidence-bank.md:7` — rename "Council of attempts" to "Council of Guards and the barrel-of-monkeys maneuver" and restate it as judges measuring disagreement, not attempts before review.
5. `packets/adaptive-systems/contracts.md:15` — remove `"run-fixtures"` from the job contract's `tools` so the demo's tool-search request is the only path.
6. `packets/adaptive-systems/contracts.md:10-23` — add a `"qualityFloor"` field or reword `evidence-bank.md:46` to stop citing one.
7. `shorts/you-will-build-the-assistant-with-everything.md:33` — change "6 minutes" to "2 minutes" (or set `deadlineSeconds` to 360 in contracts.md).
8. `packets/adaptive-systems/formats.md:26` — align the 45-minute row with the outline's "no Q&A; add five minutes".
9. `packets/adaptive-systems/formats.md:15` and `packet.md:3` — point the PPTX links at the `-40min-` files, then delete the un-suffixed duplicates in `decks/`.
10. `reveal-talks/assets/adaptive-systems/03-proposal-and-authority-are-separate.svg` — delete.
11. `engineering/adaptive-systems/CFP.md` — add the fourth outcome or reduce the file to a pointer at `packet.md`.
12. `build-talk.ts:553` — reword the 15-min slide-10 bridge to "that is slide 11 in the long version; the mechanics are a companion talk."
13. `build-talk.ts:555` — change `10: [0, 1, 2]` to `10: [0, 1, 2, 3]` so the 15-min route keeps the walkthrough's landing line; optionally `3: [0,1,2,3]` and `4: [0,1,2,3]` so the visible lines are spoken.
14. `outlines/adaptive-systems-40min.md:230` — after "did worse than people given no aid at all" add "on the events the aid got wrong".
15. `outlines/adaptive-systems-40min.md:57` — soften "WebMCP lets an agent act on whatever site you have open" to "on any site that opts in", and mirror in `shorts/no-agent.md:9`.
16. `outlines/adaptive-systems-40min.md:248` — add one sentence saying the orchestrator's per-class budget is tuned from measured acceptance and false repairs, closing the deferral from Dynamic Scaling slide 12 and `shorts/barrel-of-monkeys.md:29`.
17. `outlines/adaptive-systems-40min.md:47,31,98,217,236` — apply the heading and visible-line rewrites from the Voice section.
18. `build-talk.ts:735` — replace the greedy link regex with `/\[([^\]]+)\]\((https?:\/\/\S+?)\)(?=[\s,.;:]|$)/g`, then run `bun artifacts/speaking-portfolio-expanded/sync-talks.ts adaptive-systems` (and the other nine talks, since the bug is shared).
19. `decks/README.md` — regenerate or extend the index so it lists the adaptive editions, or drop the "all 60 editions" claim in `README.md:7`.

## Fixes applied 2026-09-06

### Changed

- `outlines/adaptive-systems-40min.md` — headings: 2 → "The Bar Is a Pager"; 3 → "Sorry, You're Building It"; 11 → "Compute Is a Tool Too"; 12 → "Ironies of Automation"; 13 → "Widen Per Class, Never Per Streak".
- `outlines/adaptive-systems-40min.md` slide 5 visible line → "Reads customer data? Then it never posts to a vendor."
- `outlines/adaptive-systems-40min.md` slide 3 — WebMCP softened to "act on any site that opts in, and the list of sites that opt in only goes one direction."
- `outlines/adaptive-systems-40min.md` slide 12 — Skitka sentence now reads "on the events the aid got wrong, people given a highly but imperfectly reliable aid did worse…".
- `outlines/adaptive-systems-40min.md` slide 13 — added the sentence that closes the deferral from `dynamic-scaling-40min.md:214` and `shorts/barrel-of-monkeys.md:29`: the same loop adjusts the system's own fan-out and token burn from measured acceptance (acceptance up, false repairs flat → more parallel attempts and a bigger budget; false repairs up → both come down). No slide durations changed; timings still sum to 40:00.
- `packets/adaptive-systems/evidence-bank.md` — "Council of attempts" renamed and restated as Council of Guards (judges measuring disagreement, not a vote) plus the barrel-of-monkeys maneuver; slide-3 story slot updated to "the tool pairing you only noticed after it fired"; Fly.io line retargeted to slides 5 and 11; "least privilege for free (slide 11)" replaced with a leased-sandbox blast-radius claim; "ledger arithmetic" dropped; portfolio boundary now names both techniques.
- `packets/adaptive-systems/contracts.md` — `run-fixtures` removed from the job contract's `tools` (it is now only reachable through tool search, matching `demo.md:7` and outline slide 4); added `"qualityFloor"` and a sentence explaining it as the incomplete-objective guard, so `evidence-bank.md` cut row is accurate.
- `packets/adaptive-systems/formats.md:26` — 45-minute row aligned with the outline (no Q&A).
- `packets/adaptive-systems/packet.md` — titles now lead with "Sorry, You're Building It" / "Conjure Exactly Enough" / "200 OK (Nothing Is)", with "Adaptive, agentic apps" kept as the descriptor; outcome 4 joined to the list.
- `engineering/adaptive-systems/CFP.md` — fourth (memory-pattern) outcome added.
- `shorts/you-will-build-the-assistant-with-everything.md:33` — on-screen "6 minutes" → "2 minutes" (matches `deadlineSeconds: 120`; the 3-tool count now matches the contract too).
- `shorts/no-agent.md` — WebMCP line mirrored; stale link text "You Will Build the Assistant That Has Everything" → "Sorry, You're Building It".
- Deleted `artifacts/reveal-talks/assets/adaptive-systems/03-proposal-and-authority-are-separate.svg` (orphan). `visuals.md:22` is now correct as written.

### Skipped

- Item 18 (greedy link regex in `build-talk.ts:735`) — already fixed centrally today.
- Item 19 (`decks/README.md`) and the deletion of `decks/adaptive-systems-screen.pptx` / `-handout.pptx` — out of scope for a talk agent (`decks/**` and root `README.md` are off-limits). Both unsuffixed files are now referenced by nothing; see the block below.
- Items 12–13 (`build-talk.ts` route config) — cannot edit; instructions below.
- Voice note about promoting "A model saying ninety percent confident settles nothing." to the visible third line on slide 13 — kept as prose; the "Expand:" line is the only place the widening criteria appear on screen, and the sentence lands better spoken.
- `packet.md`/`formats.md` PPTX links already point at the `-40min-` files; nothing to change there.

### Route config changes for the caller

```
build-talk.ts, talk "adaptive-systems", route 15:
  field: bridges[10]
  old: "Bridge: the same orchestrator can ask for its own scale inside a per-customer budget; that is a companion talk."
  new: "Bridge: the same orchestrator can ask for its own scale inside a per-customer budget; that is slide 11 in the long version, and the mechanics are a companion talk."

  field: trim[10]
  old: [0, 1, 2]
  new: [0, 1, 2, 3]
  reason: [0,1,2] drops the walkthrough's landing line ("Three events, three different right answers…"). Slide 10 has 3:00 in this route; four paragraphs fit.

  NOT recommended without a time rebalance: trim[3] and trim[4] stay [0,1,3]. Slide 3 has 1:30 and slide 4 has 3:00 here; restoring their second paragraphs needs ~40 s the 15-minute route does not have. The dropped visible lines stay on screen unspoken.

Route times unchanged: 15-min 1+1.5+3+1.5+1.5+3+2.5+1 = 15:00; 30-min sums to 30:00; outline sums to 40:00.
Also unowned by this agent: delete decks/adaptive-systems-screen.pptx and decks/adaptive-systems-handout.pptx (unsuffixed legacy duplicates, now referenced nowhere), and add the adaptive rows to decks/README.md or drop the "all 60 editions" claim in README.md:7.
```

### Morning-review proposals

No `reviews/adaptive-systems-review.md` exists (the talk was rewritten before that round), so there were none to adopt or skip.
