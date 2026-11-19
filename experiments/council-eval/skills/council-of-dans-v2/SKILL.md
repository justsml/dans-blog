---
name: council-of-dans
description: "Fan one task out to parallel agents working under different priorities, then hand back every result. Use for important decisions, complex planning, alternative options, and trade-offs."
disable-model-invocation: true
---

# Council of Dans

Run the same task in parallel under different priorities, then present what each agent produced.

Scope ends at presenting. What happens next — return all of them, the fastest, the first to clear a rubric, pipe them into another tool, merge them — is the caller's call. Absent an instruction, hand back the set as it is.

If the task has one defensible answer, do not fan out. Say so in one sentence and just do it. A task that splits into separate parts (several independent changes, several risks to check) is not one answer: give each part an owner.

## Knobs

- `N`: candidate count. Default 3. A user-supplied number wins.
- `personas`: required, excluded, or user-defined lenses.
- `concurrency`: how many candidates run at once. Default: all `N`.
- `disposition`: what to do with the results.

Pass any other setting the user supplies — worktrees, output paths, models, reasoning effort — through to the candidates verbatim. Ask only when a missing knob changes the result.

## Personas

Builders own the whole task and produce a competing artifact.

| Builder | Priority |
|---|---|
| Architect | Boundaries, ownership, contracts, invariants, migration paths |
| Originalist | Challenges the default framing and the familiar project pattern |
| Unoriginalist | Reuses established patterns, dependencies, and test seams; reads docs and history before inventing |
| Clean-slate Radical | First principles, best end state over smallest migration; names the compatibility breaks and irreversible choices |
| Product Visionary | Starts from the user's workflow — behavior, discoverability, ergonomics |
| Ruthless Minimalist | Smallest coherent change that fully satisfies the task |
| Genius Inventor | A non-obvious but implementable mechanism that materially improves the result |

Critics attack one shared artifact and report what they would change. They do not produce competing solutions.

| Critic | Hunts for |
|---|---|
| Detail Detective | Edge cases, state bugs, integration gaps, weak verification |
| Doomsayer | Failure modes, hidden costs, unsafe rollouts |
| Battle-scarred Operator | Deployment, observability, recovery, resource limits, day-two ownership |
| Performance Wizard | Bottlenecks in speed, memory, and throughput |
| Pennypincher | Cost, complexity, dependencies, hidden maintenance |

Run a critic as a builder when the task's whole point is that priority — a performance rewrite, a cost reduction, a hardening pass.

**Picking three:** Architect, Ruthless Minimalist, and one persona matched to the task's main risk — Doomsayer for rollouts, Performance Wizard for hot paths, Battle-scarred Operator for anything on-call, Security Paranoid for auth or untrusted input. Add a task-specific persona (Privacy Zealot, Data Modeler, Accessibility Advocate, Test Saboteur, a sharp domain expert) when the task gives it something distinct to find. Use Clean-slate Radical only when redesign is in scope.

The name supplies the worldview; the brief ties it to the work. Persona is an execution bias, not a writing style.

## Focus

Before launching, read the task and the repo, then give each candidate a **focus**: the one question it owns that the other candidates do not, plus two or three primary sources to open first (official docs, API references, specs, changelogs, pricing or limits pages; the exact URL when you know it, the exact page to search for when you don't).

Write the foci side by side. If two read alike, merge them or change one. A persona without its own focus is the same candidate under a different name.

## Fan out

Launch all `N` candidates with the Agent tool **in a single message** so they run in parallel. With a concurrency cap, launch in batches of that size.

Each candidate gets the same task contract, one persona brief with its focus and sources, and its own output path. Two briefs that would produce the same result are one candidate: combine or drop, and record in a sentence what decision each survivor could change.

Isolate them, in this order:

1. **Read-only proposal (default).** The candidate inspects the repo and writes its plan or diff to `.scratch/council/<persona>/`. It does not touch tracked files.
2. **Worktree.** When candidates must actually build and run checks, give each one its own git worktree (`git gtr`, or the `git-gtr` skill). Two candidates never share a directory.

Every candidate opens its sources before it proposes anything, and reads the page itself: a search snippet or a recalled fact is not a source. Detail Detective, Security Paranoid, Performance Wizard, and Battle-scarred Operator open the spec, standard, or limits documentation for the thing they attack, since their findings are claims about how it behaves.

Ask each for three sections, in this order:

1. `## Sources`: one row per page opened, giving the URL, the fact taken from it, and which part of the proposal it changed.
2. `## Proposal`: its work, with a short rationale.
3. `## Considered and rejected`: what it looked at and left alone, and why.

If a candidate fails or drops out, record it and report what remains. Replace it only when the user asked for a fixed `N`.

## Present

Report the personas and `N` used, each candidate's output path and rationale, and any dropout or failure. Keep candidates distinct and attributed — no silent merging, ranking, or dropping.

Then carry out whatever disposition the user asked for.
