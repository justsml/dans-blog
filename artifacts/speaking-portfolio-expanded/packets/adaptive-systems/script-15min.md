# Adaptive, agentic apps: 15-minute presenter script

Use slides 1, 2, 3, 4, 6, 10, 16. Rehearsal target includes pauses, worked examples and interaction. Read the prose as the talk track; perform the stage directions instead of reading them aloud. Short versions compress examples, not delivery speed. No Q&A included.

## 00:00 to 01:00: slide 1, The vendor renamed a field

The API still returns 200. Authentication works. The vendor's status page is green. Your ingest is broken because somebody renamed a field. If you work around B2B integrations, this is a very boring way to have a very expensive morning.

I want to talk about adaptive, agentic apps: applications that can investigate an unfamiliar failure and propose a recovery using the tools we give them. The ambition is useful fault tolerance. The difficult part is deciding which repairs deserve automatic execution.

Delivery: Ask who has seen a successful HTTP response carry a breaking change. Take one brief example; return to the ingest job.

## 01:00 to 02:00: slide 2, Recovery needs a definition of success

Imagine telling an OCR agent: get the highest quality extraction, prefer our cheap provider, make it so. What happens when a slightly better result costs a hundred times more? What happens when the score improves if the system quietly drops difficult pages?

Neither behavior needs a science-fiction motive. We supplied an incomplete objective. A quality metric can reward the wrong behavior, and even honest optimization can exceed a budget we never specified.

Delivery: Write an OCR objective with a quality floor, coverage requirement, spend ceiling and incomplete outcome. Explain which is a hard constraint.

## 02:00 to 03:30: slide 3, Give the planner a bounded job

The model gets room to investigate. It can inspect approved samples, compare a contract, consult a vendor changelog, and propose a mapping. A controller checks that proposal before anything changes.

The contract names the goal, available evidence, permitted actions, deadline, budget and stop conditions. The model can choose a different investigation strategy inside that contract. It cannot grant itself a new database permission because the current one is inconvenient.

Delivery: Draw the boundary between planner and controller. Place schema reads inside; place deployment credentials outside.

## 03:30 to 06:00: slide 4, Repair syntax; prove meaning

A name resemblance is a hypothesis. It is not evidence that two fields mean the same thing. A postal code is not always a US ZIP code. Preserve leading zeros and country context. ZIP+4 has a four-digit extension, and throwing it away is a policy decision.

A Boolean status becoming an enum is harder. Does true mean active, eligible, verified, or anything except cancelled? Pending cannot safely become true just because both values are truthy in JavaScript.

Delivery: Show {zip:"02108"} and {postal_code:"02108"}, then {status:"pending"}. Ask what evidence is missing in each case.

Bridge after cuts: Record the decision and test the reusable policy separately. Return to the original failure.

## 06:00 to 08:00: slide 6, Make a plausible repair fail a test

Here is where we try to embarrass the repair before a customer does. Test the renamed field, but also send both names with conflicting values. Send a missing field, a null, a leading zero, and a value from another country.

The agent should not author the only examples that judge its own work. Keep regression cases and held-out examples under separate control. Schema validation tells us that output has the right shape. It cannot tell us that a policyholder is eligible or that an address is deliverable.

Delivery: Run the four paper fixtures in demo.md. Ask the audience to reject the conflicting-field fixture before revealing its expected outcome.

Bridge after cuts: Keep repairs versioned and reversible; familiar transport failures follow bounded retry code. Now let us test where the application should stop.

## 08:00 to 13:00: slide 10, Walkthrough: one ingest, three decisions

Let us run the design against three events. The rename has contract evidence and passes both positive and negative fixtures. Our policy permits a canary of that mapping version. The job continues for matching records.

The status change lacks semantic evidence. The job isolates affected records, reports what remains incomplete, and gives an owner the samples and the question they need to answer.

Delivery: Use demo.md as a five-minute paper walkthrough. Allocate one minute to each event and two minutes to decisions and questions. No live agent claim.

Bridge after cuts: Record the decision and test the reusable policy separately. Return to the original failure.

## 13:00 to 15:00: slide 16, The next surprise should cost less

Return to the field that changed overnight. We did not predict its spelling. We did define what had to remain true, what evidence a repair needed, and how far the application could go without us.

That is the promise I care about. The next surprise costs less attention because the application can do the investigation, preserve the evidence, and either recover within policy or hand us a useful unresolved question.

Delivery: Pause on the recovery card. Close with the final paragraph; do not reopen the provider catalog.
