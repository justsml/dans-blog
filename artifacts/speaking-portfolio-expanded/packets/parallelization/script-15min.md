# Rethinking parallelization in the agentic era: 15-minute presenter script

Use slides 1, 3, 4, 8, 10, 11, 12, 13, 16. Timings include the stated walkthrough and pauses, with no Q&A. This route retains both hidden work and competing solutions. Read prose; perform delivery cues.

## 00:00 to 01:00: slide 1, Four calls. Forty images.

Your agent is allowed four concurrent tool calls. Your image tool accepts ten prompts and fans them out. Everything obeys its local limit. You now have forty image jobs running for one customer.

The customer bought ten. The provider counts forty. Your dashboard proudly reports four tool calls. That is the problem I want to start with: we put the limit on the wrong unit of work.

Delivery: Point to the slide and explain one consequence. Keep extended exercises for the workshop.

Bridge: Count logical tasks, external attempts and placement separately. Tool slots only describe one of those layers.

## 01:00 to 02:00: slide 3, Tool slots hide downstream work

A runtime may allow a total number of tool calls, separate limits by tool type, or something else entirely. Inspect the actual contract. Do not assume that four means four of every tool.

A batch tool is useful. It reduces orchestration chatter and owns the details of its workload. But its public contract must expose maximum batch size, estimated resource demand, cancellation behavior and how partial results return.

Delivery: Point to the slide and explain one consequence. Keep extended exercises for the workshop.

## 02:00 to 04:00: slide 4, Put admission below every caller

A prompt saying only run one expensive tool is useful guidance. It is not a lock. Two conversations, a restarted worker and a scheduled job can all arrive at once.

Use a shared admission controller at the boundary every external dispatch crosses. It atomically checks the tenant budget and entitlement, provider concurrency, request rate and run deadline, then reserves capacity and spend. If the request does not fit, queue it or return an explicit rejection.

Delivery: Point to the slide and explain one consequence. Keep extended exercises for the workshop.

Bridge: Concurrency, rate and spend have separate limits. Throttling reduces dispatch inside those ceilings. Long-running jobs also need state that survives the caller.

## 04:00 to 05:30: slide 8, A durable job survives the conversation

Accept ten prompts and return a stable job ID. Persist item IDs, provider IDs, reservations, attempts, output locations and terminal states. The conversation can end without losing the job.

Save progress between steps. A callback may arrive twice or out of order. Authenticate it, deduplicate it, and apply only valid state transitions. A restart should reconstruct pending work from storage rather than rerun the whole conversation.

Delivery: Point to the slide and explain one consequence. Keep extended exercises for the workshop.

Bridge: Store completed outputs before scheduling notifications, so delivery retries cannot regenerate images. Now put those boundaries through a failure.

## 05:30 to 07:30: slide 10, Walkthrough: restart the batch

Start with two callers each requesting a full batch. The first reserves the available entitlement. The second cannot reserve the same balance; it queues or receives an explicit rejection.

Now lose one provider response. We keep that item unresolved and keep its reservation. Restart the dispatcher. It reloads the job, checks provider status where supported and collects completed outputs. It does not treat a missing local result as proof that nothing happened.

Delivery: Two-minute paper trace: simultaneous admission, lost response, failed notification. State the expected transitions; take one audience decision.

## 07:30 to 09:30: slide 11, Parallel attempts explore different answers

Now change the unit of parallel work. Give the same bounded design problem to two or three independent attempts. A ruthless minimalist searches for the smallest adequate change. A maintenance-focused attempt considers interfaces and failure recovery. A security and performance reviewer challenges the expensive or dangerous assumptions.

These are priorities, not guarantees of independent expertise. Different models and prompts can still share the same blind spot. Give them the same requirements and acceptance criteria, and keep first drafts separate so they do not immediately converge on the first plausible answer.

Delivery: Point to the slide and explain one consequence. Keep extended exercises for the workshop.

## 09:30 to 11:30: slide 12, Make the judge earn its vote

Write the rubric before reviewing the candidates. For this job, hard gates include no duplicate dispatch after restart, no cross-tenant budget leakage and no regeneration on notification retry. A beautiful explanation cannot compensate for failing those requirements.

Use executable checks where they cover the requirement. Passing tests does not establish complete correctness, so review missing cases and operational complexity too. Remove author and model names where practical, vary presentation order, and require evidence for the judge's conclusions.

Delivery: Point to the slide and explain one consequence. Keep extended exercises for the workshop.

## 11:30 to 13:00: slide 13, Synthesis creates a new candidate

The final review should extract the best compatible ideas. That word compatible matters. A minimal design that assumes a single process cannot simply inherit the claims of another design that uses a distributed coordinator.

Write the resulting design as a new candidate with one coherent set of assumptions. Then rerun the tests and review. Passing parts do not automatically make a passing whole. For code, keep candidate work in isolated branches or worktrees, and merge through an explicit integration step.

Delivery: Point to the slide and explain one consequence. Keep extended exercises for the workshop.

Bridge: Keep the stable procedure as code, retain its negative tests, and compare total cost and latency per accepted outcome against one competent attempt. Return to the opening multiplication.

## 13:00 to 15:00: slide 16, Count the work below the tool call

Back to the four tool calls. Forty provider jobs were legal according to four local counters. The missing piece was a shared account of what the application had promised and what it had already started.

The same discipline applies when the outputs are competing designs. Bound the attempts, preserve their artifacts, judge them against the requirement, and verify the combined result. Parallelism gives us more opportunities to find a good answer. It also gives us more opportunities to spend money without one.

Delivery: Point to the slide and explain one consequence. Keep extended exercises for the workshop.
