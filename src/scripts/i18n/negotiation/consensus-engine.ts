import { z } from "zod";
import {
  hash,
  assessmentSchema,
  applyPatches,
  type Issue as PatchIssue,
} from "./protocol.ts";
import { type ConsensusPolicy, policyPrompt } from "./consensus-policy.ts";
export const findingSchema = z.object({
  quote: z.string().min(1),
  sourceQuote: z.string().min(1),
  claim: z.string().min(1),
  severity: z.number().int().min(1).max(5),
  suggestion: z.string(),
  evidenceIds: z.array(z.string()),
});
export const reviewSchema = z.object({
  assessment: assessmentSchema,
  findings: z.array(findingSchema),
  sourceConcerns: z.array(z.string()),
});
export const ballotSchema = z.object({
  votes: z.array(
    z.object({
      issueId: z.string(),
      verdict: z.enum(["uphold", "resolved", "reject"]),
      severity: z.number().int().min(1).max(5),
      reason: z.string().min(1),
      evidenceIds: z.array(z.string()),
    }),
  ),
});
export const revisionSchema = z.object({
  changes: z.array(
    z.object({
      before: z.string().min(1),
      after: z.string(),
      issueIds: z.array(z.string()),
      sourceQuote: z.string().min(1),
      reason: z.string().min(1),
      tradeoff: z.string(),
      instruction: z.string(),
      kind: z.enum(["repair", "adaptation", "restructure", "polish"]),
      evidenceIds: z.array(z.string()),
    }),
  ),
  explanation: z.string(),
});
export type Finding = z.infer<typeof findingSchema>;
export type TrackedIssue = Finding & {
  evidenceWarnings?: string[];
  id: string;
  originator: string;
  raisedHash: string;
  status: "open" | "resolved" | "overruled" | "reopened" | "downgraded";
  decisions: Array<{
    candidateHash: string;
    status: string;
    votes: ModelBallot[];
  }>;
};
export type ModelBallot = {
  model: string;
  candidateHash: string;
  votes: z.infer<typeof ballotSchema>["votes"];
};
export type Actor = { model: string };
export type Event = { type: string; [key: string]: unknown };
export type EngineIO = {
  call: <T>(
    key: string,
    actor: Actor,
    system: string,
    payload: unknown,
    schema: z.ZodType<T>,
  ) => Promise<T>;
  validate: (
    candidate: string,
  ) => Promise<{ passed: boolean; [key: string]: unknown }>;
  emit: (event: Event) => void;
};
export function decideIssue(
  issue: TrackedIssue,
  ballots: ModelBallot[],
  candidateHash: string,
  p: ConsensusPolicy,
) {
  if (new Set(ballots.map((b) => b.model)).size !== ballots.length)
    throw Error("Duplicate model votes");
  if (ballots.some((b) => b.candidateHash !== candidateHash))
    throw Error("Stale candidate ballot");
  const votes = ballots.map((b) => ({
    model: b.model,
    vote: b.votes.find((v) => v.issueId === issue.id),
  }));
  if (votes.some((v) => !v.vote)) throw Error("Missing issue vote");
  const closing = votes.filter((v) => v.vote!.severity < p.blockingSeverity);
  const author = closing.some((v) => v.model === issue.originator);
  const independent = closing.filter((v) => v.model !== issue.originator);
  const majority = closing.length > votes.length - closing.length;
  const status =
    majority && author && independent.length >= 1
      ? closing.some((v) => v.vote!.verdict === "uphold")
        ? "downgraded"
        : "resolved"
      : majority && independent.length >= p.overrideVotes
        ? "overruled"
        : "open";
  const resultingSeverity =
    status === "open"
      ? Math.max(
          issue.severity,
          ...votes
            .filter((v) => v.vote!.verdict === "uphold")
            .map((v) => v.vote!.severity),
        )
      : Math.max(...closing.map((v) => v.vote!.severity));
  return {
    status: status as "resolved" | "overruled" | "open" | "downgraded",
    resultingSeverity,
    candidateHash,
    votes: ballots.map((ballot) => ({
      ...ballot,
      votes: ballot.votes.filter((vote) => vote.issueId === issue.id),
    })),
  };
}
async function all<T>(jobs: Promise<T>[]): Promise<T[]> {
  const rows = await Promise.allSettled(jobs);
  const failed = rows.filter((r) => r.status === "rejected");
  if (failed.length)
    throw new AggregateError(
      failed.map((r) => (r as PromiseRejectedResult).reason),
    );
  return rows.map((r) => (r as PromiseFulfilledResult<T>).value);
}
export async function negotiateConsensus(
  input: {
    source: string;
    target: string;
    sourcePath: string;
    targetPath: string;
    policy: ConsensusPolicy;
    actors: Actor[];
    references: Array<{ id: string; [key: string]: unknown }>;
    history: unknown;
  },
  io: EngineIO,
) {
  const { policy: p, actors } = input;
  if (
    new Set(actors.map((a) => a.model)).size !== actors.length ||
    actors.length < p.overrideVotes + 1
  )
    throw Error("Panel needs distinct models sufficient for overrides");
  const system = policyPrompt(p),
    issues: TrackedIssue[] = [];
  let candidate = input.target,
    calls = 0;
  const refs = new Set([
    "source",
    "target",
    ...input.references.map((r) => r.id),
  ]);
  const evidence = (ids: string[]) => {
    if (!ids.length || ids.some((id) => !refs.has(id)))
      throw Error("Missing/unknown evidence reference");
  };
  const call = async <T>(
    key: string,
    a: Actor,
    payload: unknown,
    schema: z.ZodType<T>,
  ) => {
    if (calls >= p.maxCalls) throw Error("call-budget");
    calls++;
    const parsed = schema.parse(await io.call(key, a, system, payload, schema));
    io.emit({
      type: "response",
      key,
      model: a.model,
      candidateHash: hash(candidate),
      value: parsed,
    });
    return parsed;
  };
  io.emit({
    type: "run-start",
    policy: p,
    sourceHash: hash(input.source),
    baselineHash: hash(input.target),
    sourcePath: input.sourcePath,
    targetPath: input.targetPath,
    actors,
  });
  for (let round = 1; round <= p.maxRounds; round++) {
    // A round needs independent review, optional issue ballots and one revision.
    if (calls + actors.length * 2 + 1 > p.maxCalls) {
      io.emit({ type: "limit", reason: "call-budget", calls, round });
      return { status: "needs-attention", candidate, issues, calls };
    }
    const candidateHash = hash(candidate),
      validation = await io.validate(candidate);
    const context = {
      source: input.source,
      candidate,
      candidateHash,
      sourceHash: hash(input.source),
      references: input.references,
      history: input.history,
    };
    const reviews = await all(
      actors.map((a) =>
        call(
          "r" + round + "-review-" + a.model,
          a,
          {
            task: "Independently assess the whole candidate and all ten dimensions. Raise specific issues with exact source/target quotes. Do not infer quality from authorship or earlier votes.",
            ...context,
          },
          reviewSchema,
        ),
      ),
    );
    for (let n = 0; n < reviews.length; n++)
      for (const finding of reviews[n]!.findings) {
        const evidenceWarnings: string[] = [];
        if (!candidate.includes(finding.quote))
          evidenceWarnings.push(
            "Target quote is not an exact candidate substring",
          );
        if (!input.source.includes(finding.sourceQuote))
          evidenceWarnings.push(
            "Source quote is not an exact source substring; it may refer to metadata or be unsupported",
          );
        if (
          !finding.evidenceIds.length ||
          finding.evidenceIds.some((id) => !refs.has(id))
        )
          evidenceWarnings.push(
            "Missing or unknown evidence references; peers must independently establish or reject this claim",
          );
        const id = hash(
          JSON.stringify([
            actors[n]!.model,
            finding.claim,
            finding.sourceQuote,
          ]),
        ).slice(0, 20);
        let issue = issues.find((i) => i.id === id);
        if (issue) {
          Object.assign(issue, finding, {
            evidenceWarnings,
            status: issue.status === "open" ? "open" : "reopened",
          });
          io.emit({ type: "issue-reopened", issue, candidateHash });
        } else {
          issue = {
            ...finding,
            evidenceWarnings,
            id,
            originator: actors[n]!.model,
            raisedHash: candidateHash,
            status: "open",
            decisions: [],
          };
          issues.push(issue);
          io.emit({ type: "issue-raised", issue, candidateHash });
        }
      }
    // Findings in assessment.unresolved must also enter the tracked queue; omission
    // from a model's structured findings cannot bypass adjudication.
    for (let n = 0; n < reviews.length; n++)
      for (const u of reviews[n]!.assessment.unresolved) {
        if (u.severity < p.blockingSeverity) continue;
        if (
          !issues.some(
            (i) => i.originator === actors[n]!.model && i.claim === u.claim,
          )
        ) {
          const issue: TrackedIssue = {
            id: hash(JSON.stringify([actors[n]!.model, u.claim])).slice(0, 20),
            originator: actors[n]!.model,
            raisedHash: candidateHash,
            status: "open",
            decisions: [],
            quote: u.quote,
            sourceQuote: "",
            claim: u.claim,
            severity: u.severity,
            suggestion: "",
            evidenceIds: [],
          };
          issues.push(issue);
          io.emit({ type: "issue-raised", issue, candidateHash });
        }
      }
    for (let n = 0; n < reviews.length; n++)
      for (const rating of reviews[n]!.assessment.ratings) {
        const threshold =
          rating.dimension === "readability" ? p.minimumReadability : 4;
        if (rating.score >= threshold) continue;
        const claim = rating.dimension + ": " + rating.rationale,
          id = hash(JSON.stringify([actors[n]!.model, claim])).slice(0, 20);
        if (!issues.some((i) => i.id === id)) {
          const issue: TrackedIssue = {
            id,
            originator: actors[n]!.model,
            raisedHash: candidateHash,
            status: "open",
            decisions: [],
            quote: rating.quote,
            sourceQuote: "",
            claim,
            severity: 4,
            suggestion:
              "Improve this dimension or refute the specific assessment with evidence.",
            evidenceIds: [],
          };
          issues.push(issue);
          io.emit({ type: "issue-raised", issue, candidateHash });
        }
      }
    // Re-adjudicate all historical issues on this exact candidate; nothing closes
    // because an editor simply omitted it from a rewrite or later review.
    if (issues.length) {
      if (calls + actors.length * Math.ceil(issues.length / 20) > p.maxCalls) {
        const result = {
          status: "needs-attention",
          candidate,
          candidateHash,
          issues,
          calls,
        };
        io.emit({ type: "limit", reason: "ballot-call-budget", ...result });
        return result;
      }
      const ballots = await all(
        actors.map(async (a) => {
          const votes: ModelBallot["votes"] = [];
          const groundedBallotSchema = z.object({
            votes: z.array(
              ballotSchema.shape.votes.element.extend({
                evidenceIds: z
                  .array(z.enum([...refs] as [string, ...string[]]))
                  .min(1),
              }),
            ),
          });
          for (let offset = 0; offset < issues.length; offset += 20) {
            const batch = issues.slice(offset, offset + 20);
            const response = await call(
              `r${round}-ballot-${a.model}-batch-${offset / 20 + 1}`,
              a,
              {
                task: "Address EVERY supplied issue ID. Respond to opposing arguments and prior decisions. resolved means current text fixes it; reject means unfounded or nonblocking; uphold means it still requires work. Every vote requires evidenceIds: use source or target for direct textual evidence, or an allowed checked reference ID. Explain the evidence in your reason. Never agree merely because peers agree.",
                ...context,
                allowedEvidenceIds: [...refs],
                issues: batch,
              },
              groundedBallotSchema,
            );
            if (
              response.votes.length !== batch.length ||
              new Set(response.votes.map((v) => v.issueId)).size !==
                batch.length ||
              response.votes.some((v) => !batch.some((i) => i.id === v.issueId))
            )
              throw Error("Incomplete or duplicate ballot");
            response.votes.forEach((v) => evidence(v.evidenceIds));
            votes.push(...response.votes);
          }
          return { model: a.model, candidateHash, votes };
        }),
      );
      for (const issue of issues) {
        const decision = decideIssue(issue, ballots, candidateHash, p);
        issue.status = decision.status;
        issue.severity = decision.resultingSeverity;
        issue.decisions.push(decision);
        io.emit({ type: "issue-decision", issueId: issue.id, ...decision });
      }
    }
    const blockers = issues.filter(
      (i) =>
        i.severity >= p.blockingSeverity &&
        ["open", "reopened"].includes(i.status),
    );
    const enough = (scores: number[], minimum: number) =>
      scores.filter((score) => score >= minimum).length >=
      Math.max(p.overrideVotes, Math.floor(actors.length / 2) + 1);
    const readable = enough(
      reviews.map(
        (r) =>
          r.assessment.ratings.find((v) => v.dimension === "readability")!
            .score,
      ),
      p.minimumReadability,
    );
    const quality = reviews[0]!.assessment.ratings.every((r) =>
      enough(
        reviews.map(
          (review) =>
            review.assessment.ratings.find((v) => v.dimension === r.dimension)!
              .score,
        ),
        4,
      ),
    );
    io.emit({
      type: "round-complete",
      round,
      candidateHash,
      validation,
      blockers: blockers.map((i) => i.id),
      readable,
      quality,
      reviews,
    });
    if (validation.passed && !blockers.length && readable && quality) {
      const result = {
        status:
          issues.some((i) => i.status !== "resolved") ||
          reviews.some((r) => !r.assessment.ready)
            ? "consensus-backed"
            : "consensus",
        candidate,
        candidateHash,
        issues,
        reviews,
        calls,
        round,
      };
      io.emit({ type: "final", ...result });
      return result;
    }
    if (round === p.maxRounds) break;
    const actor = actors[(round - 1) % Math.min(2, actors.length)]!;
    const revision = await call(
      "r" + round + "-revision-v2",
      actor,
      {
        task: "Repair unresolved blockers and low-quality dimensions. Apply policy flexibility to improve local readability and preserve voice. Return exact nonoverlapping before/after replacements; cover all edits, including annotations, instructions, headings or structural moves. Link each change to issue IDs (empty only for explicitly justified new adaptations), quote its source basis and explain tradeoffs. Do not force unnecessary polish.",
        ...context,
        issues,
        reviews,
        validation,
      },
      revisionSchema,
    );
    revision.changes.forEach((c) => {
      if (
        !input.source.includes(c.sourceQuote) ||
        c.issueIds.some((id) => !issues.some((i) => i.id === id))
      )
        throw Error("Unbound change");
      evidence(c.evidenceIds);
    });
    const patches = revision.changes.map(
      (c, i) =>
        ({
          id: String(i),
          targetQuote: c.before,
          replacement: c.after,
        }) as PatchIssue,
    );
    const next = applyPatches(candidate, candidateHash, patches);
    io.emit({
      type: "revision",
      round,
      model: actor.model,
      beforeHash: candidateHash,
      afterHash: hash(next),
      changes: revision.changes,
      explanation: revision.explanation,
      text: next,
    });
    candidate = next;
  }
  const result = {
    status: "needs-attention",
    candidate,
    candidateHash: hash(candidate),
    issues,
    calls,
  };
  io.emit({ type: "limit", reason: "round-budget", ...result });
  return result;
}
