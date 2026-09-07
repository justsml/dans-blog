# Agents Don't Run in a Prompt

**Alternate title:** Where the Agents Actually Go  
**Best format:** 20–40 minutes; five–seven-minute live topology demo for AI Tinkerers  
**Audience:** Staff and principal engineers, architects, SRE and platform teams, AI application builders

## The angle

Agent demos flatten a system into a prompt and a glowing response box. Real applications have queues, sandboxes, tools, browsers, model calls, parallel branches, approvals, streams, durable state, budgets, and users who close the tab halfway through.

The design problem is no longer only “what should the agent do?” It is where each piece of work runs, what it may touch, how much parallel work it can create, what the user sees while it runs, and how the system resumes after interruption.

## Thesis

Agentic application design is topology plus protocol. Draw the execution boundaries, budget fan-out globally, persist resumable state, and treat streaming as a product contract rather than animation.

## Opening

> Point to where the agent is running.

Put a familiar agent diagram on screen: user → model → tools. Ask the room where the browser lives, where shell commands run, who owns a parallel child, what survives a restart, and which component can stop the bill.

## Talk arc

### 1. Draw the real topology

Map five boundaries:

1. user interface and stream;
2. orchestrator and durable run state;
3. model calls and provider limits;
4. tools, browsers, sandboxes, and target networks;
5. artifacts, approvals, and evidence.

If two boxes have different permissions, lifetimes, or failure modes, they are different boxes.

### 2. Split work three different ways

Do not call all concurrency “multi-agent”:

- **Task decomposition:** different workers own different subproblems.
- **Independent attempts:** several workers solve the same bounded problem and a judge compares them.
- **Tool parallelism:** one reasoning step launches independent I/O or checks together.

Each shape has a different merge step, cost profile, and failure mode.

### 3. Put one budget over all fan-out

- A child agent can call tools that create more work.
- Per-call limits do not control a tree.
- Admission, concurrency, tokens, wall time, and side effects need a shared ledger.
- Cancellation must flow down; evidence and partial progress must flow up.

### 4. Sandboxes are execution boundaries, not decorations

- Put network, filesystem, credentials, and target authorization at the boundary where work runs.
- Ask for approval before active probes, mutation, downloads, writes, or shell execution.
- Keep exact command and response evidence even when the UI shows a calm summary.
- Never replay a side-effecting tool blindly after a dropped connection.

### 5. Streaming is part of correctness

A useful stream distinguishes:

- accepted work;
- progress and partial evidence;
- approval needed;
- recoverable failure;
- durable completion;
- a resumable pause.

The browser disconnecting is not the work failing. The model stopping is not the research finishing. The spinner is not a protocol.

### 6. The topology exercise

Give the room one agentic feature and ask them to draw:

- where each task runs;
- the shared fan-out limit;
- the approval boundary;
- the durable checkpoint;
- what the user sees when one branch fails.

Close with: if the system cannot draw its own boundaries, it cannot defend them or recover across them.

## Audience takeaway

Attendees leave with three distinct concurrency patterns, a five-boundary topology, and a streaming state vocabulary they can apply to one agentic feature before it becomes a production incident.

## Event alignment

| Priority | Target | Relevance | Focus for this room |
| --- | --- | --- | --- |
| 1 | SREcon Americas | Excellent reliability, operations, and “AI as teammate” fit | Center durable state, partial failure, replay safety, and the distinction between provider stop and completed work. |
| 1 | Data Summit | Direct agentic AI and operational-data fit | Use a data investigation pipeline; show decomposition, shared budgets, and evidence merge. |
| 1 | Denver DevOps | Strong local operations route | Make it a whiteboard teardown of queues, sandboxes, cancellation, and observability. |
| 1 | ACM Austin: Enterprise AI & Engineering | Broad enterprise architecture fit | Keep all five boundaries and include a real streaming trace. |
| 1 | DeveloperWeek | Strong developer audience | Lead with the misleading three-box agent diagram and rebuild it live. |
| 2 | San Diego Python | Good short technical route | Demonstrate one Python orchestrator with bounded parallel tools; fit the normal short slot. |
| 2 | Denver AI and Machine Learning Group | Strong technical local audience | Go deeper on model/tool concurrency and state transitions. |
| 2 | PlatformCon / KubeCon + CloudNativeCon | Strong platform and infrastructure fit | Emphasize admission, policy, runtime isolation, and operator-visible recovery. |
| 2 | Boston / NYC / Denver AI Developers | Builder-heavy audience | Show SDK-level examples, but keep the talk framework-neutral. |
| 3 | AI Tinkerers / Colorado AI Builders | Excellent only after conversion to a working demo | Five–seven minutes, no broad lecture: crash one branch, preserve the artifact, and resume without repeating the side effect. |
| 3 | MLOps Community / PyData London | Strong later or remote routes with a concrete data workload | Use operational evaluation and trace evidence; avoid a generic agents overview. |

## Relationship to existing talks

**Dynamic Scaling** owns admission, ledgers, and the compute substrate. **Adaptive, agentic apps** owns per-job agent generation, access, and bounded recovery. This angle owns the diagram that connects the runtime to the user: topology, three kinds of parallelism, and the streaming protocol.

Keep it as an adaptation while most slides still come from those two talks. It becomes a genuinely separate talk only if the streaming contract and topology exercise are strong enough to carry at least half the session.

## Evidence and demo needed before delivery

- One runnable workflow with at least two parallel branches and one approval boundary.
- A captured interruption that resumes without replaying a side effect.
- A stream showing partial evidence, failure, and durable completion as separate states.
- Total work and cost reported across the whole task tree.
- Framework examples from at least two implementations, or an explicit statement that the design is demonstrated in one stack only.
