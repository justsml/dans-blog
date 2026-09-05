# Code Is Cheap. Judgment Is Expensive.

40 minutes · 18 slides · Dan Levy

## 1. Code Is Cheap. Judgment Is Expensive.

If your org uses AI to build an infinite feature machine, you have tragically missed the potential of the magic AI genie.

0.0–2.0 minutes

Engineering leadership when implementation becomes abundant

Ask what happens when producing 10,000 lines of plausible code becomes easier than reviewing 1,000. Treat this as a thought experiment, not a measured productivity claim. The talk is about where constraints move for teams using code generation. Implementation still matters, especially in difficult legacy systems. The organizational question is how to turn more proposed changes into outcomes we can trust.

## 2. The implementation bottleneck

2.0–4.0 minutes

Ideas wait for implementation.
Teams allocate scarce engineering time.

Describe the familiar queue from idea to requirements, implementation, tests and release. Teams organize around whatever constrains delivery. That constraint has never been identical everywhere: discovery, approvals and integration can already dominate. Use implementation scarcity as the starting model for this talk, then ask the audience where work actually waits in their organization.

## 3. A growing review queue

4.0–6.0 minutes

Generation can outpace review.
Unreviewed changes accumulate.
Integration becomes the queue.

A fast generator can create more work for everyone downstream. Walk through a hypothetical developer receiving several plausible implementations before lunch. Someone still has to compare behavior, run meaningful checks, understand dependencies and decide which change belongs in the product. The useful measure is time to a validated outcome, including the queue after generation.

## 4. Code carries ongoing costs

6.0–8.0 minutes

Dependencies
Attack surface
Maintenance
Future context burden

Each accepted line becomes part of a system that future engineers must understand. Generated code can be excellent and still be unnecessary. Distinguish the negligible cost of proposing an implementation from the ongoing cost of owning it. A patch that removes code while preserving useful behavior can be a better outcome than a large feature with unclear demand.

## 5. A useful unit of progress

8.0–10.0 minutes

Validated outcomes
per unit of complexity

Use this as an engineering objective rather than a pretend universal formula. Define the outcome concretely: a user can complete a task, a failure no longer recurs, or an operation becomes easier to maintain. Assess complexity through the interfaces, dependencies and operational burden the change adds. Avoid inventing a single score that hides those tradeoffs.

## 6. “Add enterprise permissions”

10.0–12.0 minutes

A vague request can produce
a very large implementation.

Read the request aloud and ask which questions it leaves unanswered. Does an administrator act across organizations? Can an owner remove the last owner? What happens when access changes during a session? A generator can fill those gaps with plausible assumptions. Plausibility gives the code a head start, but it does not settle the product or security decisions.

## 7. A permission specification

12.0–14.0 minutes

Actors and resources
Allowed and denied actions
Invariants
Failure behavior

Continue the permissions example with explicit boundaries. A member can read their organization’s records. A member cannot read another organization’s records. Removing the last owner fails without changing state. These examples are hypothetical requirements, not a complete authorization design. The useful work is making assumptions visible before implementation turns them into behavior.

## 8. Executable acceptance criteria

14.0–16.0 minutes

Cross-organization access fails.
Denied requests leave state unchanged.
The last owner cannot be removed.

Translate selected requirements into checks with clear preconditions and observable results. Separate authentication from authorization. Include both allowed and denied paths, and check what state remains after a rejected operation. Tests cannot exhaust every possible failure, but they can make important invariants repeatable. The specification and tests should inform each other rather than merely describe code already written.

## 9. Validation infrastructure

16.0–18.0 minutes

Unit and contract tests
Integration checks
Policy and static analysis
Evals for uncertain behavior

Explain which layer checks which behavior. A unit test covers local rules. A contract test covers an interface. An integration check exercises the real boundary. Evals help when output quality is variable, but deterministic assertions remain useful. Each check needs an owner and a failure response. An impressive test count is less useful than knowing which important failures the suite can detect.

## 10. Generated tests need scrutiny

18.0–20.0 minutes

A test can repeat the same assumption
as the implementation.
Passing is evidence with limits.

An implementation and its tests can agree because both misunderstood the requirement. Give an independent reviewer the specification and expected outcomes before showing the proposed solution. Differential tests and deliberately broken examples can reveal weak assertions. Independence helps, but reviewers and generators can still share blind spots. Someone remains responsible for the acceptance criteria.

## 11. Seniority and judgment

20.0–22.0 minutes

Problem framing
System knowledge
Tradeoff decisions
Evidence review

Avoid turning this into a claim that junior engineers have no future. Judgment develops through implementation, feedback and exposure to consequences. If agents take more routine coding work, teams need deliberate ways to preserve those learning opportunities. Senior engineers still implement, and junior engineers still exercise judgment. The distinction concerns responsibilities and support, not a permanent ranking of people.

## 12. An engineer directing execution

22.0–24.0 minutes

Define a bounded task.
Compare candidate solutions.
Inspect evidence.
Integrate a small change.

An engineer can coordinate several attempts without becoming a manager in the formal organizational sense. The work resembles task design, delegation and review. Small tasks with clear interfaces are easier to compare and integrate than sprawling rewrites. Budget for rejected candidates and cleanup. Keep a named owner for the final change so responsibility does not disappear into an orchestration system.

## 13. Trustworthy review

24.0–26.0 minutes

Small changes shorten review.
Clear boundaries limit context.
Independent checks expose blind spots.

Review capacity depends on the shape of the work. A coherent small change lets a reviewer understand intent and consequences. Boundaries reduce how much surrounding code they need to load into their head. Reviewer agents can help surface issues, but their approvals do not replace evidence. Escalate uncertainty to a human who understands the affected system.

## 14. Ownership after generation

26.0–28.0 minutes

Who accepts the change?
Who handles the incident?
Who maintains it next year?

Ownership should survive the end of an agent run. Before accepting a generated component, identify its maintainer, operational expectations and rollback path. This is ordinary engineering responsibility with more proposals entering the queue. If nobody can explain why the code belongs in the product or how it fails, generating it faster has not solved the important problem.

## 15. Measures that help

28.0–31.0 minutes

Time to validated outcome
Escaped defects
Customer results
Maintenance burden

Raw commits and lines of code count activity, which generation makes easier to inflate. Use several measures together and examine the stories behind them. Faster cycle time can coexist with more defects or growing maintenance costs. Avoid individual rankings that reward gaming. The goal is understanding whether the team delivers useful changes and can continue supporting them.

## 16. A bounded team experiment

31.0–34.0 minutes

One recurring workflow
A baseline and acceptance criteria
A review owner
A decision to continue or stop

Propose a small pilot rather than an organization-wide productivity promise. Select a recurring workflow with observable outcomes. Record current turnaround and failure patterns. Introduce generation while keeping acceptance standards explicit. Include review and rework in the comparison. After a defined trial, decide whether to continue, change the workflow or stop. No numerical improvement target is assumed here.

## 17. Responsibility stays explicit

34.0–37.0 minutes

Machines propose implementations.
Checks provide evidence.
Engineers own acceptance.
Leaders choose direction.

Present this as a division of responsibility, not a law of nature. Humans generate and automated systems sometimes judge. What matters is that the organization can identify who sets direction, who defines acceptable behavior and who accepts consequences. Automation should make those decisions easier to execute and audit, not obscure who made them.

## 18. Knowing when to stop

37.0–40.0 minutes

What should exist?
Does it work?
Is it worth maintaining?

Return to the opening thought experiment. More available implementations make selection and validation more valuable, but they do not force us to accept more code. Sometimes the best decision is a smaller change or no change. Close with the user’s central argument: knowing what should be built, whether it works and when not to build it are expensive skills worth developing.

