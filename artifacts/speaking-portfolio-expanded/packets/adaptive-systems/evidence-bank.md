# Evidence and editorial boundaries: Adaptive, agentic apps

## What is first-hand

- **The agent generator (slides 4, 5, 12).** Dan's working prototype: an orchestrator that writes a per-job contract, generates an agent with a tailored prompt and a minimum tool list, gates tool-search requests through policy, logs every grant and denial, and loops on the result. Say "prototype on my own integrations." Do not quote a success rate until one exists that you would defend in Q&A.
- **The client with local models (slide 5).** A client processed sensitive data with local models while a frontier orchestrator passed access references. Dan's recollection includes signed URLs passing through orchestration. Tell it as "what was built" and then "the stronger boundary I would build now" (the dispatcher design). Confirm disclosure permission before naming anything identifiable.
- **Council of attempts (companion talk).** Dan's practice of comparing two to five model or persona attempts before a harder review. Lives in Dynamic Scaling, slide 12.

## Story slots to fill before delivery

| Slide | Prompt |
| --- | --- |
| 1 | The vendor rename you actually lived through: field, hour, cost. |
| 3 | Your own near miss with an over-permissioned agent, or the dry-run flag you were glad existed. |
| 4 | The prototype's first denied tool request and what it revealed. |
| 5 | The client setup: what was real, what you would strengthen. |
| 11 | A job where per-customer compute would have changed the pricing conversation. |

## Primary documentation checked 2026-09-06

- [AWS retry with backoff](https://docs.aws.amazon.com/prescriptive-guidance/latest/cloud-design-patterns/retry-backoff.html): bounded retries and idempotency considerations. Supports slide 9.
- [AWS S3 presigned URLs](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html): presigned URLs are bearer credentials. Supports the signed-URL line on slide 5.
- [Anthropic, Building effective agents](https://www.anthropic.com/engineering/building-effective-agents): workflow versus agent vocabulary, orchestrator-workers pattern. Supports the pattern language on slide 4; it does not evaluate per-job agent generation.
- [Fly.io agent sandboxes](https://fly.io/learn/agent-sandbox/): egress policy applied from outside the sandbox. Supports the least-privilege claim on slide 11.
- Saltzer and Schroeder (1975), [The Protection of Information in Computer Systems](https://doi.org/10.1109/PROC.1975.9939), Proceedings of the IEEE 63(9), 1278 to 1308. Least privilege is principle (f). Cited on slide 5; the talk claims the per-job agent makes compliance easier, which is a design argument, not a finding of theirs.
- Bainbridge (1983), [Ironies of Automation](https://doi.org/10.1016/0005-1098(83)90046-8), Automatica 19(6), 775 to 779. Cited on slide 12. Written about industrial process control; the transfer to an agent's daily digest is the speaker's argument.
- Skitka, Mosier and Burdick (1999), [Does automation bias decision-making?](https://doi.org/10.1006/ijhc.1999.0252), International Journal of Human-Computer Studies 51(5), 991 to 1006. A simulated flight task, not a software review task. Say measured in a cockpit simulator; do not quote an effect size.
- Vaughan (1996), The Challenger Launch Decision, University of Chicago Press. Normalization of deviance, cited on slide 13. An organizational case study; use it as a named pattern to watch for, not as evidence about agent rollouts.

## Claims to keep modest

- Prompt injection through vendor payloads (slide 3) is a real class; do not claim a specific incident unless you have one.
- "Least privilege for free" (slide 11) means short lifetime plus narrow egress plus one scoped credential; it is not a compliance statement.
- The daily report, ledger arithmetic and fixtures are design fixtures, not observations.

## Memory pattern

The working-memory / observational-memory split on slide 14 is a proposed application pattern, not a claim about a particular product. The tenant-filter example in [memory-pattern.md](memory-pattern.md) is synthetic. Its runner records execution events independently of the model; correctness requires named checks beyond a clean exit. The suggested comparison tests repeated mistakes, stale successes and unknown outcomes. No measured improvement is claimed.

## Cuts

| Idea from the notes | Treatment |
| --- | --- |
| Debouncing, backoff, circuit breakers, HTTP status classification | Cut; generic and covered elsewhere |
| Regional failover contract | Folded into the catalog guard on slide 11; mechanics live in Dynamic Scaling |
| OCR objective-gaming example | Cut; the ingest example carries the incomplete-objective point via the quality floor in the job contract |
| Wi-Fi scanning, batteries, solar | Parked for a defensive-automation talk |

## Portfolio boundary

Adaptive owns per-job agent generation, repair authority, tool risk classes, the data boundary and the smaller execution-memory pattern. Dynamic Scaling owns admission, ledgers, durable jobs, the compute substrate and parallel attempts. Improvement From Failure owns the scheduled improvement loop.
