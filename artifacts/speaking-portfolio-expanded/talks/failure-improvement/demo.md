# Authored case cards: nothing leaves without evidence

These cards are authored teaching fixtures, available without an application. They are not captured test output. The proposed standalone `mastra-agent-lab` implementation and its actual command output have not been verified. Do not claim a passing integration or switch to a live application.

## Opening scroll and closing artifact

Authored display, not a production export:

```text
09:00 tenant=A job=17 request timed out trace=t17
09:01 tenant=A job=18 request timed out trace=t18
09:02 tenant=B job=44 request timed out trace=missing
09:03 tenant=A job=17 request timed out trace=t17 duplicate=true
```

At the close, show its smaller artifact: three distinct reports after deduplication; tenant A has two evidence-linked reports; tenant B has one unexplained report needing a trace. Counts and links survive. The opening does not reveal the candidate or its holdout outcome.

## Card A — show before the vote

Three reports contain `request timed out`. Two belong to tenant A; one belongs to tenant B. A candidate changes the shared retry policy. The visible timeout regression is marked PASS in this authored case. The diff summary says “retry cancelled jobs after transient failures.”

Ask: promote, hold, or request more evidence? Give 45 seconds. Do not show the answer card yet.

## Card B — reveal after the vote

| Check | Authored result | Decision evidence |
| --- | --- | --- |
| Visible regression | PASS | Original timeout symptom disappears |
| Held-out cancellation case | FAIL | A cancelled job resumes and writes output |
| Scope | FAIL | Shared policy changes behavior for every tenant |
| Human review | HOLD | Regression alone is insufficient; fix the candidate |

Give 30 seconds to inspect the two independent reasons to hold. Do not edit the held-out case to obtain green.

## Card C — a fresh unknown

Tenant B's trace is missing. The log message matches tenant A, but there is no evidence of the same operation, cause or cancellation state. Ask what the classifier may conclude. Give 45 seconds, then reveal: UNKNOWN, preserve evidence, assign investigation. A shared string is insufficient to merge the incident.

The unknown case is deliberately distinct from the authorization workaround on slide 6. The room must decide before receiving the cancellation or missing-trace evidence.

## Timing

40-minute route: slide 8 gets 4:30, including two minutes of decisions and reveal reading, leaving 2:30 for its 167 spoken words. The 30- and 15-minute routes use their separate 112-word track in four minutes, with the same two minutes of interaction. The case answers stay in speaker notes until each reveal.

## Validation still required for a live recording

Implement and run the checks in a separate supporting repository. Retain the exact fixture input, candidate diff, regression command and exit status, unchanged holdout command and exit status, scope policy version, and human disposition. Verify the unknown route preserves evidence and receives an owner. Verify an interrupted collection run resumes from durable output without duplicate tickets. An isolated fixture tracker is sufficient; no production integration is implied.

The [offline contract](contracts.md) is the acceptance specification. These cards satisfy the slide walkthrough, not that implementation acceptance gate.
