# Retry Until the 403 Goes Away

2 min · video · parent: [Automating Improvement From Failure](../outlines/failure-improvement-40min.md), slide 6

The retry worked. That's the problem.

## Hook

Request fails. Agent retries. It works. Dashboard glows. Score the loop on eventual success and the lesson writes itself: retry more.

## Beat: make the failure a 403

Now the first attempt was *forbidden*. The retry used a second credential that happened to be allowed. Green result. What you actually automated is the discovery that the wrong credential also works, and you rewarded it. A sleep that hides a race teaches the same lesson, slower.

## Beat: the name for this

Vaughan called it normalization of deviance in the Challenger analysis: repeated acceptance of anomalies makes them ordinary. Our version is narrower. A repair loop needs evidence the defect is gone, and successful workarounds are extremely persuasive evidence of the wrong thing.

## Landing

Successful workaround ≠ repaired system. Hold out the authorization case. If the fix passes everything except the one test that asks *should this have been allowed*, the gate holds, and the useful result is "permission denied."

## On screen

`attempt 1 → 403` · `attempt 2 (alt cred) → 200` · big green check · caption: *what did we just learn?*

## Source

Vaughan (1996), The Challenger Launch Decision.

## Story slot

A workaround you left running after it stopped the symptom. The defect underneath, and the test that eventually found it.
