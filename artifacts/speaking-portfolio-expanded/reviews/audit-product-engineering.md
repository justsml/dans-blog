# Audit: product-engineering

Audited 2026-09-06 against `outlines/product-engineering-40min.md` (canonical). No talk files were edited.

## 1. Verdict

Ready after fixes. The canonical outline, both generated adaptations, the three scripts, the deck, `build-talk.ts`, `contracts.md`, `demo.md` and the runbook all agree on slide numbers, timings and the demo fixture; the Sept 6 review's arc was adopted almost line for line. What remains is one stale stage direction that ships in the 30-minute deck, one spoken formula that is ambiguous aloud, and a ring of packet/evidence files still describing the pre-rewrite talk.

## 2. Blocking

| file:line | quoted text | problem | concrete fix |
| --- | --- | --- | --- |
| `outlines/product-engineering-40min.md:65` (propagates to `packets/product-engineering/script-30min.md:52` and `reveal-talks/product-engineering-30min.html`) | "Keep the answers for slide 14." | The 30-minute route keeps slide 4 and cuts slide 14, so the presenter tells the room to hold an answer for a slide that never appears. | Change to "Keep the answers for the close." (slide 15 asks "Take one boundary"), then `sync-talks.ts product-engineering`. |
| `outlines/product-engineering-40min.md:198` | "n times two to the n minus one, plus n minus one" | Spoken aloud this parses as 6·2⁵ + 5 = 197, not 6·(2⁵ + 5) = 222. The visible line is right; the sentence Dan reads is not. | "n times the quantity two to the n-minus-one plus n minus one. Six times thirty-two plus five. Six times thirty-seven: 222." |
| `outlines/product-engineering-40min.md:29`; `evidence-bank.md:72` | "seventy percent strongly, twenty-two percent partially, eight percent not at all" | Not verifiable from the published abstract (which says only "prevalent pattern but not universal" for industry/firm studies and "not supportive" for open collaborative). The split must be read off the paper's table before it goes on a slide; the pre-rewrite review recalled "about 69%". | Open Colfer & Baldwin 2016 (or HBS WP 10-058) and confirm the 70/22/8 row and which subset it describes; if it cannot be confirmed, use "most, with a documented minority of exceptions" and drop the second visible line. |

## 3. Consistency findings

- Timings: 40-min slide durations 2.5+2.5+2.5+2+2.5+2.5+2+2+2.5+2+5+3+3+3+3 = 40:00, monotonic, no gaps (`outlines/product-engineering-40min.md`).
- `build-talk.ts:399-411` 30-route times 2+2.5+2+2.5+2.5+1.5+2+2+5+3+5 = 30.0; `:430-437` 15-route 1.5+2+2+1.5+3.5+2.5+2 = 15.0. Both match the adaptation tables (`outlines/product-engineering-30min-adaptation.md:7-17`, `-15min-adaptation.md:7-13`).
- Bridges: 30-route "1" covers cut slide 2, "7" covers cut 8, "12" covers cut 13-14; 15-route "1" covers 2, "5" covers 6-9, "12" covers 13-14. Every bridge names content that exists in the canonical outline. No `trim` entries for this slug, so no trim index check.
- Route `keep` lists in `build-talk.ts:386-397, 421-429` match `script-30min.md:3`, `script-15min.md:3` and the rendered `reveal-talks/product-engineering-15min.html` (`data-slide` 1,3,5,10,11,12,15).
- Demo: outline slide 11 (A 40%, B 48%, C 45%; support 9% vs 5% ceiling; C 4%; ceiling raised to 10 still fails urgency) matches `economics-product/demo.md:53-58,65-70`, `demos/DEMO-RUNBOOK.md:51-57`, and `packets/product-engineering/contracts.md:9`. Durations 5:00/5:00/3:30 agree across outline `:174`, demo.md `:47`, runbook `:51`, formats.md `:21-23`, contracts.md `:9`, CFP.md `:39`.
- `economics-product/demo.md:72-73`: blank line before the `4:15–5:00` row splits the stage-sequence table; that row renders as a stray paragraph.
- `packets/product-engineering/formats.md:28-35` lightning route: 1:30+1:30+2:30+1:30 = 7:00, correct. Beat 4 "Draw the roster on purpose" uses the pre-rewrite vocabulary; slide 15 says "Draw the interfaces."
- `formats.md:41-57` workshop: 0:00–1:35 under "95-minute workshop", heading now matches. All slide references (1, 4, 5, 13, 7, 11, 12, 9, 14, 15) point at the right content.
- `packets/product-engineering/evidence-bank.md:56-66` story-slot table is stale: "40 min | 11 | The customer who became a collaborator" (slide 11 is the demo; the slot is on slide 9 with different text), "40 min | 6" wording is the old prompt, and the "30 min | 4 / 7" and "15 min" rows use the deleted hand-written outlines' numbering. Line 70 already states the correct slots (1, 6, 9). Delete the table.
- `evidence-bank.md:53-54` "taste-as-mixed-system slide" and "smallest-trustworthy-loop slide" name slides that no longer exist.
- `packets/product-engineering/packet.md:5` links `outlines/product-engineering-30min.md` and `-15min.md` (pointer stubs) with labels "the agent roster" and "big idea" from the old talk; should link the two `-adaptation.md` files.
- `packet.md:56` "cites Conway's 1968 paper and Microsoft's experimentation guidance" and `packet.md:58-64` References omit Coase, Campbell, Graicunas, MacCormack et al., Thoughtworks and Team Topologies, all of which are on slides now.
- `economics-product/CFP.md:3` "Submit one Product Engineering variant per event" describes the retired three-purpose-built-lengths model; `:39` and `:55` already say routes are derived.
- `README.md:42` gives this talk "[Browser deck]" where every registered sibling gets "[Browser and PowerPoint](decks/README.md)"; PPTX editions exist in `decks/`. `decks/README.md` itself lists only Dynamic Scaling ("These 6 PowerPoint files") even though nine product-engineering PPTX files are present, and the outline stubs (`outlines/product-engineering-15min.md:3`) point readers there.
- `reviews/README.md:34` "Product Engineering ... not registered in build-talk.ts ... demo runs 5:00, 5:00, 3:30 and 4:00" is contradicted by `reviews/README.md:36-43` and by `build-talk.ts:377`.
- SVG `reveal-talks/assets/product-engineering/interfaces.svg` title "Design the handoff, not a robot org chart" and row labels match slide 5's visible lines and spoken text; alt text "Draw the wires between agents" matches the heading.
- Deck `reveal-talks/product-engineering.html` renders the three current `Story:` lines verbatim (1, 6, 9); no old story text found. No pre-rewrite phrases ("map every function", "one agent per function", "t-shirt") in any generated file.
- Short `shorts/dont-photocopy-the-org-chart.md:3` parent "Break the Mirror on Purpose ... slides 1, 3, 5" is correct; its beats quote slides 1, 3 and 5 accurately. `shorts/README.md:28` row matches.

## 4. Correctness findings

- Graicunas: n(2^(n−1) + n − 1); n = 6 → 6 × (32 + 5) = 6 × 37 = 222. Correct on the visible line (`:193`) and in `evidence-bank.md:72`, `packet.md:32`, `build-talk.ts:415`. Spoken phrasing at `:198` is ambiguous (see Blocking). Citation: Graicunas 1933, reprinted in Gulick & Urwick, *Papers on the Science of Administration*, 1937; outline says "reprinted ... 1937" without the 1933 origin. Acceptable; nickols.us link returns 200.
- Colfer & Baldwin 2016, *Industrial and Corporate Change* 25(5), 709–738: venue/pages correct. Abstract (fetched via RePEc) confirms 142 studies, the three-way split (industry / firm / open collaborative), "prevalent pattern but not universal" for industry and firm studies, and open collaborative "not supportive". The outline's characterization (subset-specific, not "one third broke Conway's law") is the right shape. The 70/22/8 numbers and the word "descriptive" need the paper's table checked; not verifiable from the abstract (doi.org → OUP returns 403 to scripts).
- MacCormack, Rusnak & Baldwin 2012, *Research Policy* 41(8), 1309–1324: correct; HBS PDF returns 200. Outline's "differences in modularity across development arrangements ... association" is what the paper supports.
- Conway 1968, *Datamation*, April, 28–31; quoted sentence "are constrained to produce designs which are copies of the communication structures of these organizations" is verbatim. melconway.com PDF returns 200.
- Coase 1937, *Economica* 4(16), 386–405: correct; Wiley link returns 403 to curl (paywall, not broken).
- Campbell 1979, *Evaluation and Program Planning* 2(1), 67–90: correct; DOI resolves (200). The outline attributes only the indicator-corruption pressure to Campbell, not the Goodhart/Strathern phrasing. Correct.
- Bainbridge 1983, *Ironies of Automation*, *Automatica* 19(6), 775–779: outline omits volume/pages (other talks include them). ScienceDirect returns 403 to curl. Use across the portfolio: Adaptive (`adaptive-systems-40min.md:230`) pairs it with Skitka 1999 automation-bias numbers for the digest reader; Judgment (`judgment-40min.md:149`) uses it for reviewer deference to a green signal; Failure Improvement (`failure-improvement-40min.md:145`) uses "opportunities to practise shrink"; this talk (`:200`) uses "removing routine practice → assign recovery drills and review time." Distinct from Adaptive and Judgment; overlaps Failure Improvement's practice-decay reading. Acceptable because here it is applied to ownership capacity, not the reviewer, but the sentence is the same idea and a room that saw both talks would notice.
- Microsoft ExP pre-experiment article: outline says 2020, evidence-bank says July 31, 2020; consistent. microsoft.com returns 403 to curl (bot block). Recheck URL manually before delivery.
- Thoughtworks Inverse Conway Maneuver "2014/2015" and Team Topologies key-concepts: both URLs 200; attribution is hedged as "the name people use," which is correct.
- Demo numbers are labelled synthetic in slide 1 and demo.md; 5% ceiling is called fictional in demo.md `:78` but not on stage. Fine given slide 1's disclaimer.
- Slide 7 first-person observation is marked ("My observation, not your sprint report", stage direction "Confirm the first-person observation with Dan before delivery"; `evidence-bank.md:70`). Correct handling; still needs Dan's confirmation.
- No vendor, product, price or dated-announcement claims in the talk.

## 5. Direction alignment

- (a) No "don't build it" sentence. Slide 3 `:48` "Do not start with one agent per box on the current org chart" argues against photocopying the org chart, not against the everything-assistant; slide 13 `:200` "restrict the interfaces we actually require" is the countable-live-set idea in different words. Aligned. The sentence reads oddly; see Voice.
- (b)/(c) Knight & Leveson, Council of Guards and the barrel-of-monkeys maneuver do not appear; "vote" at `:172` is the audience show of hands, not a correctness vote. No drift.
- (d) Slide 3 `:48` "Agents do not delete coordination cost. They move some of it into verification, permissions, and maintenance." and slide 13 `:234` "Reserve the person's attention" say plainly that the new cost is spending on review capacity. Aligned; could be one notch blunter (see Voice).
- Stale old stance in supporting files: `economics-product/evidence.md:31` "Every function of a product group can be mimicked as an agent with a human owner" is the pre-rewrite thesis that `packet.md:68` says not to restore; `evidence.md:32` cites the "customers become more forthcoming" observation that no longer appears in any slide.
- No companion-talk deferral in this outline; `README.md:103` pairs it with Free Tier and `CFP.md:59` divides ownership (Free Tier cost per outcome, this talk coordination and ownership, Judgment review queues). No slide here duplicates a slide another talk owns; Bainbridge is the only shared citation (see §4).

## 6. Voice

- Disclaimer count: slide 1 carries the one allowed (`:14`). Extra: slide 11 `:170` "These point estimates have no sample size or uncertainty behind them; our opening scope statement matters here." → cut the sentence; "It is not shipped." already lands the point. Slide 9 `:137` "it does not automatically establish a causal improvement" → "Narrow feedback tells us what to try next. That is all it tells us." Slide 2 `:31` and slide 13 `:198` are set-aside moves, allowed.
- H1 `outlines/product-engineering-40min.md:1` "The Future of Product Engineering: Break the Mirror on Purpose" is a title plus colon explainer, which the skill forbids; `build-talk.ts:379` uses only "The Future of Product Engineering" (a panel title). → Make "Break the Mirror on Purpose" the primary title everywhere and demote the panel title to the description.
- `packet.md:11` alternate title "Your Org Chart Is a Fossil of Coordination Cost" is the banned "Your X Is a Y" formula → "Fossil of a Coordination Cost" or drop it.
- Slide 6 heading `:85` "Two directions of attention" → "Look Out. Look In." (visible line `:89` already has it).
- Slide 8 heading `:115` "Gap analysis, past engineering" → "Walk the Build" .
- Slide 13 `:200` "The lesson for our design is to restrict the interfaces we actually require." → "Only wire the interfaces the work needs. Everything else is a relationship you are paying for."
- Slide 3 `:48` last sentence, for stance (d): "Count those before declaring the meeting extinct." → "You will spend on review where you used to spend on meetings. Say so in the budget."
- Slide 15 `:236` ends on the repeated "Automate the right things. Keep the taste." Fine as a callback; add stage direction "Stop talking." per the skill.

## 7. Cruft

| path | verdict | reason |
| --- | --- | --- |
| `outlines/product-engineering-15min.md`, `-30min.md` | DROP | Pointer stubs to the generated adaptations; no other talk has them; only `packet.md:5` links them (repoint that line). |
| `outlines/product-engineering-15min-adaptation.md`, `-30min-adaptation.md` | KEEP | Canonical generated routes, in sync with `build-talk.ts` and the scripts. |
| `reviews/product-engineering-review.md` | KEEP | Proposals adopted almost verbatim (arc §4, guards §2.4, Coase spine §5, Campbell/Graicunas/Bainbridge §3, packet fixes 14-18); still the historical spec referenced by `reviews/README.md`. Add a one-line "implemented" note at top. |
| `reviews/README.md:34` | MERGE | Replace the "not registered ... 5:00, 5:00, 3:30 and 4:00" paragraph with a pointer to the implementation table below it. |
| `packets/product-engineering/evidence-bank.md:51-66` | MERGE | Delete the story-slot table and the two stale slide names; line 70 already carries the current slot map. |
| `economics-product/evidence.md:23-33` | MERGE | Rewrite the Product Engineering table to the current claims (Conway, Colfer & Baldwin, Coase, Campbell, Graicunas, Bainbridge, Microsoft, demo); remove the one-agent-per-function and forthcoming-customers rows. |
| `economics-product/CFP.md:3` | MERGE | Drop "Submit one Product Engineering variant per event"; keep the rest. |
| `packets/product-engineering/formats.md:37-39` AI Tinkerers demo | KEEP | Still a real format; change "two agents from the roster" to "two of the interfaces". |
| `decks/product-engineering-{15,30,40}min.pptx` | DROP | Byte-identical to the `-screen.pptx` files, unreferenced by formats.md or decks/README.md. |
| `decks/README.md` | MERGE | Add the product-engineering rows (and the other registered talks); it currently lists one talk while claiming to be the index the stubs point at. |
| `artifacts/flagship-talks/` | n/a | No product-engineering files present. |
| `reveal-talks/assets/product-engineering/interfaces.svg` | KEEP | Referenced from slide 5; labels current. |

## 8. Proposed edit list

1. `outlines/product-engineering-40min.md:65` change "Keep the answers for slide 14." to "Keep the answers for the close." and resync.
2. `outlines/product-engineering-40min.md:198` reword the spoken Graicunas formula so the parenthesis is audible ("six times thirty-two plus five").
3. `outlines/product-engineering-40min.md:170` delete the "no sample size or uncertainty ... opening scope statement" sentence.
4. `outlines/product-engineering-40min.md:204` add "Automatica 19(6), 775–779" to the Bainbridge source.
5. `economics-product/demo.md:72` remove the blank line so the 4:15–5:00 row joins the table.
6. `packets/product-engineering/packet.md:5` link the two `-adaptation.md` files instead of the stubs and drop the "agent roster" / "big idea" labels.
7. `packets/product-engineering/packet.md:11` drop or retitle "Your Org Chart Is a Fossil of Coordination Cost".
8. `packets/product-engineering/packet.md:56-64` list Coase, Colfer & Baldwin, MacCormack et al., Campbell, Graicunas under References and widen the "cites" sentence.
9. `packets/product-engineering/formats.md:35,39` replace "roster" with "interfaces".
10. `packets/product-engineering/evidence-bank.md:53-66` delete the two stale slide names and the story-slot table.
11. `economics-product/CFP.md:3` delete "Submit one Product Engineering variant per event unless the organizer explicitly requests a series."
12. `economics-product/evidence.md:23-33` rewrite the Product Engineering claim table to the current slides.
13. `reviews/README.md:34` replace the unregistered/drift paragraph with a pointer to the implementation table.
14. `README.md:42` change "[Browser deck]" to "[Browser and PowerPoint](decks/README.md)" and add the talk's rows to `decks/README.md`.
15. Delete `outlines/product-engineering-15min.md`, `outlines/product-engineering-30min.md`, and `decks/product-engineering-{15,30,40}min.pptx`.
16. Before delivery: confirm the Colfer & Baldwin 70/22/8 row from the paper's table (`outlines/product-engineering-40min.md:29`), confirm the slide 7 estimation observation with Dan, and open the Microsoft ExP URL manually.
