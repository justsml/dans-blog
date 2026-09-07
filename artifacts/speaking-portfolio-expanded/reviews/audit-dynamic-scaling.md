# Audit: Dynamic Scaling of Agentic Workloads (2026-09-06, after the slide 12 rewrite)

Paths below are relative to `artifacts/speaking-portfolio-expanded/` unless they start with `artifacts/`.

## 1. Verdict

Ready after fixes. Structure, arithmetic, citations and stance alignment are sound; the one real problem is that slide 12 now carries 806 spoken words in five minutes (161 wpm, against 27–67 wpm on every other slide) plus a scoring exercise and a council reveal, and the 30-minute route makes it worse at 4.5 minutes. Two vendor sentences on slide 8 need trimming to what the cited sources say.

## 2. Blocking

| file:line | quoted text | problem | concrete fix |
| --- | --- | --- | --- |
| outlines/dynamic-scaling-40min.md:198 · :206–218 | `30:00 to 35:00 · build` | 806 spoken words = 161 wpm for the full 5 min, leaving 0:00 for the stage direction at :222 (room finds three failed gates, then council split reveal). Every other slide runs 27–67 wpm. | Cut to ≤ 450 words: keep :206 (setup), :208 (K&L set aside), a 3-sentence version of :210 (the judge arithmetic + "Council of Guards" name), a 4-sentence version of :212 (name the maneuver; race / synthesize / rank / catch as one sentence each; "the next stage handles the barrel"), :216 (gates), :218 (axioms). Move the migration-harness, model-characterization, sandbox-vs-single-shot and "fan-out is a tool you encapsulate" sentences to evidence-bank.md; they are already in the two shorts verbatim. |
| build-talk.ts:638 | `times: [1.5, 2.5, 1.5, 2.5, 1.5, 3, 2.5, 2.5, 4, 4.5, 1.5, 2.5]` | Slide 12 gets 4.5 min for the same 806 words (179 wpm) and slide 13 gets 1.5 min while its stage direction (`Ninety seconds: choose a baseline…`, outline :238) alone is 1.5 min, leaving nothing for Amdahl. | After the 40-min cut, add `trim: { 12: [0, 1, 2, 4, 5] }` (drop the speculative-optimization aside on the 30 route) and retime to `[1.5, 2.5, 1.5, 2.5, 1.5, 3, 2.5, 2.5, 4, 3.5, 2.5, 2.5]` (sums to 30). |
| outlines/dynamic-scaling-40min.md:142 | `Depot sandboxes bill per second for exactly this: run agent-generated code, stream output, throw it away.` | The cited announcement (evidence-bank.md:20) says "$0.01/minute, tracked by the second", is about `depot claude` sessions, and says explicitly that sessions are **async only** and monitored in the Depot UI. "stream output" is contradicted by the source; "sandbox SDK billed per vCPU-second" (evidence-bank.md:20) is not in it. | Change to `Depot sandboxes bill by the second for exactly this: run agent-generated code, throw it away.` Fix evidence-bank.md:20 to "billed per second ($0.01/min, no minimum), aimed at agent sessions" or cite a Depot page that actually says vCPU-second and SDK. Same sentence in packets/dynamic-scaling/script-*.md regenerates; the short the-job-asks-for-its-own-compute.md:21 says only "per-second billing", which is fine. |
| artifacts/reveal-talks/assets/dynamic-scaling/11-independent-attempts-share-requirements.svg (text at y=355, three times) | `Independent artifact` | The diagram shows "Independent" three times on the slide where Dan says "the independently written versions failed together… That is not what this is." The word on screen is the one being set aside. | Relabel the three cells `Separate first draft`. Optionally rename the file to `11-separate-drafts-share-requirements.svg` and update outline :200 and visuals.md:18; if renamed, keep the slide alt text. |

## 3. Consistency findings

- 40-min timings: 2+3+2+3+2+2+3+3+2+3+5+5+2.5+2.5 = 40, contiguous. 30 route sums to 30; 15 route sums to 15. `build-talk.ts` validation passes (deck data-timing for 12/13/14 = 300/150/150 in the 40 deck; 270/90/150 in the 30 deck; both match config).
- artifacts/reveal-talks/dynamic-scaling-15min.html was last written 03:22 (the 30/40 decks at 18:27), but the 15 route does not include slide 12 and slide 14's timing (90 s) matches; decks/exports.json and sync-inputs.json record sha `e3525d4b…`, which equals the current outline. Not stale.
- packets/dynamic-scaling/script-15min.md:106 and script-30min.md:146: `Delivery: Five minutes from demo.md.` while slide 11 is 3:00 on the 15 route and 4:00 on the 30 route. Generated text; fix at the source by changing outline :194 to `Stage direction: The trace in demo.md; compress rows 1 and 2 on the short routes.` and add a one-line note in demo.md:3.
- outlines/dynamic-scaling-40min.md:170 visible `accepted → submitted → waiting → …` vs contracts.md:18 status list `queued, submitted, waiting, …`, contracts.md:88 `[*] --> queued`, and the slide 10 SVG first box `Queued / Accepted items`. Pick one word; `queued` is what the code and diagram say.
- outlines/dynamic-scaling-40min.md:202–204 visible lines run barrel → council → gates; spoken :210–212 runs council → barrel. shorts/README.md:47 says the intended order is "generate the barrel, then guard it". Reorder the two spoken paragraphs to match the screen (or swap the two visible lines).
- build-talk.ts:653 (15-min bridge after slide 11) says `a council of cheap judges from different models` without the names. Per dans-voice ("Once named, use the name everywhere"): `Bridge: two more scaling axes have names: the barrel-of-monkeys maneuver (cheap parallel generation, on purpose) and the Council of Guards (cheap judges that measure disagreement). Gate every candidate; a synthesis is a new candidate.`
- build-talk.ts:655 `trim: { 2: [0, 1], 7: [0, 1, 2], 8: [0, 1, 2], 11: [0, 1, 2] }`: slides 7, 8 and 11 have exactly three spoken paragraphs, so those three entries are no-ops. Harmless; delete for clarity.
- packets/dynamic-scaling/evidence-bank.md:5 `**Council of attempts (slide 12).** Dan compares two to five model or persona attempts…` — stale name (the slide says Council of Guards) and it describes generation, not judging.
- packets/dynamic-scaling/evidence-bank.md:45 Cuts row `Hundreds of candidate outputs | Two or three bounded attempts with a declared review budget` contradicts the rewritten slide (:212 "one output out of ten", "n alternatives for a sample of requests") and barrel-of-monkeys.md:9 ("do the work nine times"). Reword the Treatment cell: "Bounded fan-out at named graph nodes with an env var to turn it down to one; the review budget is declared."
- packets/dynamic-scaling/formats.md:47 workshop row `32 to 45 | Score the three candidates against the gates | Each candidate's failed gate` does not include the council-split reveal that demo.md:27 and outline :222 now make the payoff. Append "then the council split" to the Activity and "which candidate gets the human" to the Output.
- packets/dynamic-scaling/visuals.md:18 link text `Independent attempts share requirements` — same stale word as the SVG; change with the SVG fix.
- shorts/council-of-guards.md:25 lists three gates; outline :216 lists four (adds `no dispatch after deadline`), and demo.md:20 makes the deadline gate the maintainer's failure, which is the council's low-overlap case at demo.md:27 and council-of-guards.md:33. Add the fourth gate to the short.
- shorts/the-job-asks-for-its-own-compute.md:33 on-screen `cap: $2` vs contracts.md:34 `"costCapUsd": 1.5` (the $2 is the run spend cap at contracts.md:15). Either is a fixture; make the short say `cap: $1.50` or the contract say 2 so the two fixtures agree.
- packets/dynamic-scaling/contracts.md:82 `caller B waited behind $0.90 that was never spent` — at that ledger row $0.90 was released; across the whole run $1.00 was never spent (ledger row :78 releases the tenth). Say "behind money that was never spent ($0.90 released at row four, $1.00 by the end)" or just "$1.00".
- Deck notes contain no pre-rewrite phrasing: `Council of Guards`, `barrel-of-monkeys`, `Knight and Leveson` present in the 30/40 decks; "vote"/"voting" occurrences are the set-aside sentences and slide 2's "The workload never got a vote".

## 4. Correctness findings

- Slide 1/3 arithmetic: 4 callers × 10 = 40; one retry per item → 80 attempts. SVG 03 labels agree (`4 batches × 10 images`, `Up to 80 attempts`).
- $2 ledger (contracts.md:71–80): 10 items × 2 attempts × $0.10 = $2.00 reserved; nine first-attempt successes settle $0.90 and release 9 × $0.10 = $0.90, leaving reserved $2.00 − 0.90 − 0.90 = $0.20 and available $0.90; reconciliation settles $0.10 and releases $0.10 → settled $1.00, reserved $0, available $1.00. Invariant settled + reserved ≤ $2 holds at every row. SVG 05 shows the same three columns.
- Slide 7 / contracts.md:31–32: "eight sandboxes for six minutes" = `count: 8`, `durationSeconds: 360`. Consistent.
- Slide 13 Amdahl: f = 0.1 serial. S(10) = 1 / (0.1 + 0.9/10) = 1/0.19 = 5.26 ("five and a quarter", fine). S(100) = 1 / (0.1 + 0.009) = 1/0.109 = 9.17 ("nine", fine). evidence-bank.md:35 states 5.26x and 9.17x.
- Knight and Leveson (1986): verified from the text of the outline and evidence bank against my knowledge of the paper: IEEE TSE SE-12(1), pp. 96–109, DOI 10.1109/TSE.1986.6312924, 27 versions from one specification, 1,000,000 test cases, coincident failures above the independence prediction. The slide's use (cited to set aside; the paper is about N-version programming as a fault-tolerance strategy) is what the paper supports. One wording nit at outline :208: `twenty-seven teams` — the 27 programs were written by 27 individual programmers (UVA and UCI students), not teams; say "twenty-seven programmers".
- Amdahl (1967): AFIPS Spring Joint Computer Conference, Conference Proceedings vol. 30, pp. 483–485. Title and venue as cited are correct.
- Fly.io Sprites (outline :142; external check of https://fly.io/learn/agent-sandbox/ today): the page describes each Sprite as "a microVM with its own kernel, dedicated CPU and memory, its own network namespace"; egress policy is "readable from inside the Sprite and only writable from outside it"; checkpoints are copy-on-write. Creation time: the page says "the project's stated goal is creation in under a second". The slide's "create in a second or two" is close, but it is a stated goal, not a measured figure; say "Fly's target is under a second" or keep the phrasing and note it in the evidence bank. "Hardware-isolated" is fair for a microVM but the page's own word is microVM.
- Depot (outline :142; external check of the cited announcement today): see Blocking. Per-second billing tracked at $0.01/min is supported; "stream output" is contradicted ("async only… monitor in the Depot UI"); "vCPU-second" and "sandbox SDK" (evidence-bank.md:20) are not on that page. Needs the API docs page checked or the wording reduced.
- Modal, Vast.ai, Cloudflare Workflows/Durable Objects, EC2 Spot two-minute notice: slide claims are generic and match those vendors' long-standing public docs; no recheck needed beyond the standing "prices change" note. The SVG 08 caption already carries the date.
- Unlabeled numbers: outline :210 `reads a thousand tokens and writes fifty` and :212 `a hundredth or a thousandth the price of the frontier` are ratios presented as fact. barrel-of-monkeys.md:41 labels them ("Prices are ratios, not quotes"); the outline and evidence bank do not. Add one line to evidence-bank.md "Other sources": "Judge token ratio (1000 in / 50 out) and monkey price ratios (1/100, 1/1000) are illustrative orders of magnitude, not quotes."
- outline :212 `In law or medicine, where the rules are extensive and specific, that is how you catch the one errant mistake that shows up in one output out of ten.` The "one in ten" is a rhetorical rate, not a measurement; fine on stage, but do not let it migrate to the evidence bank as a finding.
- MetalSmith (evidence-bank.md:26): still unidentified; still correctly off the slide.

## 5. Direction alignment

- (a) Not this talk's topic; no sentence argues against building the everything-assistant. The adaptive outline :285 carries the corrected stance and this talk does not contradict it.
- (b) Correct and verbatim at outline :208 (`I am not voting three models toward the truth`) and evidence-bank.md:34. Residual drift is visual only: the SVG's three `Independent artifact` labels and the filename (Blocking row 4). Minor echo: outline :41–43 `The workload never got a vote. Agentic workloads can vote.` is about scheduling, not correctness, but the same word appears two slides later in its rejected sense; consider `never got a say` / `can say so` (the paragraph already ends "It can say so").
- (c) Council = judges measuring disagreement (:210), barrel = deliberate cheap generation handed to a next stage (:212). Correct. The 15-min bridge (build-talk.ts:653) and evidence-bank.md:5 predate the naming; see Consistency.
- (d) Stated plainly at :218 and in both shorts' landings. No hedge on it.
- Companion-talk deferral, outline :214: `ideally build the system that adjusts its own fan-out and token burn from what it measures. Right? Right. That system is the companion talk.` The adaptive outline has no fan-out or token-burn beat; the nearest owner is its slide 13 "Widen authority only from measured outcomes" (adaptive :236–248) and slide 11 "Scale becomes something the app asks for" (:197–211, which in turn defers "the mechanics and the ecosystem" back here). barrel-of-monkeys.md:29 makes the same deferral ("including when to bother and at what level of direct control"). Either add one sentence to adaptive slide 13 ("fan-out and token budget are authority too; widen them from measured acceptance") or soften this talk's line to "widening that knob from measured outcomes is the companion talk's slide 13".
- Ownership: judgment-40min.md:193 defers fleets of candidates here; artifacts/flagship-talks/README.md:13 defers "multi-candidate orchestration" here; adaptive :211 defers mechanics and ecosystem here. All still true after the rewrite. reviews/README.md:28's "Judgment slide 12 duplicates Dynamic Scaling slides 12 and 13" is resolved and the README marks itself historical.

## 6. Voice

- Disclaimers beyond slide 1: the SVG for slide 5 prints `Prices here are invented fixture values.` twice (subtitle and caption) and the SVG for slide 8 prints `Vendor claims checked 2026-09-06 against public docs. Verify limits and prices before depending on them.` Both are on screen. Slide 1 already says "Numbers here are fixtures; the vendors later are real." Drop the slide 5 caption repeat and shorten the slide 8 caption to the date only (`Checked 2026-09-06`). Evidence bank keeps the caveats.
- outline :111 heading `The inversion: infra as an agent capability` → `Compute, Please` (the short's name; move 5, use the name everywhere) or `Infra Is a Tool Call`.
- outline :196 heading `Attempts are a scaling axis. So is judging.` (8 words) → `Monkeys, Then Guards` (3 words, both technique names, in the order the screen and shorts/README.md:47 use).
- outline :131 heading `The ecosystem is already ephemeral by default` → `Torn Down by Default`.
- outline :150 heading `Match the execution class to the work` → `Fifty Containers Don't Render Faster` (the line the evidence bank says it kept).
- outline :210 `I call this the Council of Guards. It picks between one and three alternatives to generate, and it costs a fraction of the generation it is guarding.` The middle sentence is muddy (judges do not generate). → `I call this the Council of Guards. It reads everything, writes almost nothing, and costs a fraction of the generation it is guarding.`
- outline :214 `Right? Right.` lands as written; keep. `So do not build any of it without env vars to turn it down` → `Ship it with an env var that sets fan-out to one` (concrete, matches barrel-of-monkeys.md:29).
- Talk title `Dynamic Scaling of Agentic Workloads` is a category label, not a name (dans-voice: "A title is a name, not a summary"). packet.md:8–9 already lists better ones; `Four Callers, Forty Images` (4 words) or `Buy Ten, Get Forty` (the short) would pass the bar test. Not blocking; CFP fields may need the descriptive one.

## 7. Cruft

| path | verdict | reason |
| --- | --- | --- |
| engineering/dynamic-scaling/demo.md | DROP | Two-line pointer to packets/dynamic-scaling/demo.md; nothing links to it (only CFP.md in that directory is linked from README.md:41). |
| engineering/dynamic-scaling/evidence.md | DROP | Same: a pointer stub with no inbound links. |
| engineering/dynamic-scaling/CFP.md | KEEP | Linked from README.md:41; abstracts match packet.md:11–17 word for word. If both are kept, treat packet.md as source and note that in CFP.md's last line. |
| packets/dynamic-scaling/evidence-bank.md:37–45 (Cuts table) | MERGE | Rows 1–4 still describe real cuts; row 5 contradicts the rewrite (see Consistency). Fix row 5, keep the table. |
| packets/dynamic-scaling/evidence-bank.md:5 | MERGE | Rename to "Council of Guards / barrel of monkeys (slide 12)" and split into the generation claim (contrast exposes tradeoffs) and the judging claim (disagreement, not vote). |
| artifacts/reveal-talks/assets/dynamic-scaling/13-synthesis-must-pass-the-gates-again.svg | KEEP | visuals.md:21 documents it as workshop-only; the formats.md:48 row uses it. |
| artifacts/reveal-talks/assets/dynamic-scaling/08-a-job-survives-the-caller.svg (numbered 08, used on slide 10) | KEEP | visuals.md:21 explains the numbering; renaming would churn the outline for no content gain. |
| reviews/README.md:28 | KEEP | Historical record; its own "Implementation status" section says so. |
| artifacts/flagship-talks/ | KEEP (no action) | No dynamic-scaling files there; README.md:13 defers correctly to this outline. |
| reviews/dynamic-scaling-review.md | n/a | Does not exist; nothing to reconcile. |
| build-talk.ts:655 no-op trims for 7, 8, 11 | DROP | Slides have exactly three paragraphs; the entries do nothing. |
| packets/dynamic-scaling/formats.md:28–38 (five-minute lightning) | KEEP | Slides 1, 4, 7, 8, 14 text matches the current outline; nothing from slide 12 belongs in a 5-minute cut. |

## 8. Proposed edit list

1. artifacts/reveal-talks/assets/dynamic-scaling/11-independent-attempts-share-requirements.svg: change the three `Independent artifact` labels to `Separate first draft`.
2. packets/dynamic-scaling/visuals.md:18: change link text to "Separate drafts share requirements".
3. outlines/dynamic-scaling-40min.md:208: `twenty-seven teams` → `twenty-seven programmers`.
4. outlines/dynamic-scaling-40min.md:142: delete `stream output,` from the Depot sentence.
5. packets/dynamic-scaling/evidence-bank.md:20: replace "sandbox SDK billed per vCPU-second" with "sessions billed by the second ($0.01/min, no minimum), async, monitored in the Depot UI" or add a Depot docs URL that supports the SDK claim.
6. packets/dynamic-scaling/evidence-bank.md:19: note that "1 to 2 s" is Fly's stated sub-second target, not a measurement.
7. packets/dynamic-scaling/evidence-bank.md:5: rename "Council of attempts" to "Council of Guards / barrel of monkeys" and split the claim as described in Cruft.
8. packets/dynamic-scaling/evidence-bank.md:45: reword the Cuts row 5 Treatment to "Bounded fan-out at named graph nodes with an env var to set it to one; review budget declared."
9. packets/dynamic-scaling/evidence-bank.md "Other sources": add one line labeling the 1000/50 token ratio and 1/100–1/1000 price ratios as illustrative.
10. outlines/dynamic-scaling-40min.md:170: `accepted →` → `queued →` to match contracts.md and the SVG.
11. packets/dynamic-scaling/contracts.md:82: `$0.90` → `$1.00 by the end of the run`.
12. shorts/the-job-asks-for-its-own-compute.md:33: `cap: $2` → `cap: $1.50` (or contracts.md:34 to 2).
13. shorts/council-of-guards.md:25: add `no dispatch after deadline` as the fourth gate.
14. packets/dynamic-scaling/formats.md:47: append "then reveal the council split" to the 32–45 workshop row.
15. outlines/dynamic-scaling-40min.md:194: replace `Five minutes from demo.md.` with a route-neutral phrasing, and add a compression note at packets/dynamic-scaling/demo.md:3.
16. build-talk.ts:653: rewrite the 15-min bridge after slide 11 to name the barrel-of-monkeys maneuver and the Council of Guards.
17. build-talk.ts:655: remove the no-op trim entries for slides 7, 8, 11.
18. artifacts/reveal-talks/assets/dynamic-scaling/05-reservations-and-charges-share-one-ceiling.svg and 08-the-ephemeral-ecosystem.svg: drop the repeated fixture/verify disclaimers, keep the date on 08.
19. outlines/dynamic-scaling-40min.md:206–218: cut slide 12 to ≤ 450 spoken words per the Blocking row, moving the removed sentences to evidence-bank.md; reorder so the barrel paragraph precedes the council paragraph.
20. build-talk.ts:638–643: retime the 30 route to `[1.5, 2.5, 1.5, 2.5, 1.5, 3, 2.5, 2.5, 4, 3.5, 2.5, 2.5]` and add `trim: { 12: [0, 1, 2, 4, 5] }` (indexes valid after edit 19; recheck).
21. outlines/adaptive-systems-40min.md:236–248 (slide 13): add one sentence claiming fan-out and token budget as authority widened from measured outcomes, so this talk's :214 deferral and barrel-of-monkeys.md:29 point at something.
22. Delete engineering/dynamic-scaling/demo.md and engineering/dynamic-scaling/evidence.md.
23. Run `bun artifacts/speaking-portfolio-expanded/sync-talks.ts dynamic-scaling` after 19–20 so scripts, adaptations, decks and PPTX regenerate; confirm exports.json sha changes.
