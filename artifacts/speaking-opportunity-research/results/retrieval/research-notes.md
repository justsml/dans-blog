# Retrieval speaking-opportunity research notes

Research run: 2026-09-04  
Horizon: 2026-09-04 through 2028-03-04  
Talk: `retrieval` — *From RAGs to Retrievals: Learn the New Engineering Speak*

## Decision summary

The best immediate bets are DeveloperWeek 2027, GIDS 2027, and AI Agent Event 2027. DeveloperWeek has the cleanest near-term route for the engineering-language bridge; GIDS has the strongest general software-engineering audience but requires concrete work the speaker personally did; AI Agent Event is the most urgent and needs real deployment evidence rather than a terminology tour.

The highest evidence-backed fit overall is Dutch AI Conference 2027. Its developer/architect audience, practical editorial stance, and prior retrieval/MCP programming align unusually well, and travel plus hotel are stated. Its December deadline allows a sharper proposal than the September opportunities.

Do not treat AgenticCon, the European Chatbot & Agentic AI Summit, DevOpsDays Los Angeles, or DevOpsDays Raleigh's notification date as clean facts. Their official pages conflict internally or with another official page. The conflicting values remain separate in the CSVs.

## Ten strongest candidates

| Rank | Edition | Deadline/status at research run | Score | Recommended treatment |
|---:|---|---|---:|---|
| 1 | AI Agent Event 2027 | CFP open; final deadline 2026-09-09, no time zone | 88 | Urgent only if Dan can evidence a real deployed system; pitch production handoffs, testing, and failure localization. |
| 2 | DeveloperWeek 2027 | CFP open; final deadline 2026-09-18 | 95 | Submit to AI DevWorld or DevExec; use the 30-minute adaptation and the familiar-engineering-concepts frame. |
| 3 | GIDS 2027 | CFP open; deadline 2026-09-30 | 96 | Strong 30-minute fit if each analogy is backed by work Dan directly did or materially contributed to. |
| 4 | PlatformCon San Francisco 2027 | CFP open; deadline 2026-10-04 at 12:59 PM “EST” | 86 | Build a 25-minute platform version about context admission, retrieval quality, and authority boundaries; recheck the odd time-zone label. |
| 5 | AgenticCon 2027 | CFP open, but same page says both 2026-10-04 and 2026-11-01 | 78 | Prepare a 25-minute version; do not rely on either deadline until the organizer corrects the page. |
| 6 | Cloud Native AI + Inference Day Europe 2027 | CFP open; deadline 2026-10-18 | 90 | Excellent direct topic fit: retrieval, context, agents, inference, and evaluation. Use this as the Barcelona primary. |
| 7 | KubeCon + CloudNativeCon Europe 2027 | CFP open; deadline 2026-10-11 23:59 CEST (UTC+2) | 92 | Use a production-systems framing and avoid duplicating the co-located-event proposal. Maximum three main-event proposals. |
| 8 | Dutch AI Conference 2027 | CFP open; deadline 2026-12-18, no time zone | 99 | Best overall match. Center the proposal on analogy boundaries and debugging; differentiate it from basic RAG implementation talks. |
| 9 | SREcon27 Americas | Participation call open; deadline 2026-11-19 23:59 Pacific Time | 95 | Reframe the 40-minute talk into the 35+10 format around diagnosis, observability, and control in production AI systems. |
| 10 | AOmA 2027 | CFP open; deadline 2026-10-23 23:59 “CET” | 91 | Pitch an architecture-boundary review with a short mapping exercise; recheck the source's CET label before relying on a UTC conversion. |

The Barcelona portfolio needs a single primary. Cloud Native AI + Inference Day is the better direct match; KubeCon main is the backup with greater reach. Platform Engineering Day is a second backup, not a copy-paste third submission. Confirm cross-event duplicate/reuse rules before planning more than one proposal.

## Confirmed deadline calendar

Only dates supported by current official pages are included here. Conflicted dates are listed separately below.

- 2026-09-09 — AI Agent Event 2027 CFP closes; year comes from the 2027 edition context, and no time zone is stated.
- 2026-09-18 — DeveloperWeek 2027 final round closes.
- 2026-09-30 — GIDS 2027 CFP closes.
- 2026-10-04 — PlatformCon San Francisco 2027 closes at 12:59 PM “EST”; no UTC conversion was made.
- 2026-10-11 — KubeCon + CloudNativeCon Europe closes at 23:59 CEST (UTC+2).
- 2026-10-18 — Cloud Native AI + Inference Day and Platform Engineering Day CFPs close; no time was stated.
- 2026-10-23 — AOmA closes at 23:59 “CET”; no UTC conversion was made because Berlin normally observes summer time on that date while the source explicitly says CET.
- 2026-11-19 — SREcon27 Americas closes at 23:59 Pacific Time.
- 2026-12-18 — Dutch AI Conference closes; the year follows from the 2027 edition context, and no time zone is stated.
- 2027-01-01 — DevOpsDays Raleigh closes; its stated notification date is not credible.

## Conflicts and monitoring

- AgenticCon's single CFP page gives October 4 and November 1 closing dates, plus October 20 and November 17 notification dates. All four records are preserved.
- European Chatbot & Agentic AI Summit's CFP page accepts applications and says October 1, while its homepage says the call opens soon. The pages also disagree on whether the event ends March 18 or March 19.
- Dutch AI Conference's page headline and footer say March 16–18, while a content block gives March 10–12. The edition remains useful, but travel dates must not be booked from this packet.
- DevOpsDays Los Angeles is marked open with a November 1 deadline in the global index, while the local page says TBD.
- DevOpsDays Raleigh says notification occurs on the day its CFP opens, four months before the close. The close date is usable; notification is not.
- PlatformCon's “EST” deadline and AOmA's “CET” deadline may be literal fixed offsets or timezone-label mistakes. They are retained exactly as written.
- ARC 2027 has a public “Apply to Speak” route but no verified deadline, duration, or speaker economics.
- Voxxed Days Luxembourg announces a November–December 2026 CFP window without exact dates.
- QCon London is invitation-led with a spontaneous route, not an open CFP. QCon San Francisco's 2026 program appears effectively set.
- Haystack, Berlin Buzzwords, NDC London, LeadDev/LDX3, and the three AI Tinkerers chapters are monitoring or historical-fit records, not current open calls.

## Smaller and community routes inspected

The packet includes DevOpsDays Raleigh, DevOpsDays Los Angeles, Voxxed Days Luxembourg, MLOps Community local meetups, AI Tinkerers Seattle, AI Tinkerers Calgary, and AI Tinkerers Boston. Raleigh is the only one with a current, usable public close date. Calgary's prior 5–15-minute format could fit the existing short version after adding a concrete demo. Seattle's prior two-minute demo format needs a separate artifact, not a shortened slide talk. Boston's old form is explicitly closed. MLOps Community has no universal CFP; a chapter should enter the pipeline only after it publishes a dated event and public speaker route.

## Saturation and differentiation

Retrieval, RAG, embeddings, vector search, MCP, agent context, and evaluation already appear in the programs of Dutch AI, PlatformCon, SREcon, Haystack, and AI Tinkerers. That is evidence of audience demand, but a generic glossary pitch will blend into the program. The defensible angle is the talk's boundary test: which old engineering concept helps, exactly where the analogy fails, and what production failure that mismatch causes. The strongest concrete sequence is candidate generation → reranking → context admission → model/agent action → traces and evaluation.

## Exclusions

- TREC 2026 is a research participation route. It requires an organization to run evaluation tracks and report results; a poster or selected plenary presentation follows from that work. It is not an ordinary talk CFP.
- NAACL 2027 requires a peer-reviewed original research paper and ARR workflow. The existing talk is not a paper submission.
- Paid placement was not found among the verified candidates. Sponsor/exhibitor routes were not treated as speaking opportunities.

## Unknowns that remain unknown

Travel origin, travel budget, preferred regions, compensation threshold, and the speaker's eligibility or employer constraints were not supplied and were not inferred. Most editions do not publish honoraria, reimbursement limits, recording licenses, accessibility terms, or exclusivity/repeat-talk rules. Speaker economics are best documented for GIDS, Dutch AI Conference, AOmA, QCon London, and the Linux Foundation co-located events, but even those records have material gaps. No submission, outreach, registration, payment, publication, or reminder was performed.

## Query and verification log

Research covered combinations of the talk terms (`RAG`, retrieval, vector search, hybrid search, reranking, context engineering, MCP, agents, evals) with CFP, call for speakers, conference, meetup, architecture, platform engineering, SRE, MLOps, and developer conference terms. Searches were run internationally and for named series surfaced by official programs. Candidate claims were accepted only from organizer-controlled sites, organizer-linked forms, or institutional conference pages. Prior-session evidence was used to measure fit and saturation, not to infer an open call.

The ten leading CFP/status pages were reopened at the end of the run. Their open states and displayed deadline text were unchanged; the four conflict families above remained unresolved. Breadth stopped at 28 candidates because additional results were dominated by stale aggregators, vendor webinars, closed local forms, research-paper calls, or events without a public speaking route.

## Packet QA

- 28 event series, 28 editions, 24 deadline records, 28 talk matches, and 49 evidence records.
- All five CSV headers exactly match the supplied templates.
- Every row has the expected column count; primary IDs are unique.
- All event, edition, deadline, match, and evidence foreign-key references resolve.
- Every cited source ID resolves to an evidence row.
- Date-only fields use ISO `YYYY-MM-DD`; no historical estimate was inserted as a confirmed deadline.
