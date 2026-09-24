import { test, expect } from "bun:test";
import {
  decideIssue,
  negotiateConsensus,
  type TrackedIssue,
  type ModelBallot,
  type Event,
} from "./consensus-engine.ts";
import { policySchema } from "./consensus-policy.ts";
import { dimensions } from "./protocol.ts";
const policy = policySchema.parse({
  audience: "Japanese developers",
  maxRounds: 2,
});
const issue: TrackedIssue = {
  id: "i",
  originator: "a",
  raisedHash: "h",
  status: "open",
  decisions: [],
  quote: "old",
  sourceQuote: "source",
  claim: "Meaning is wrong",
  severity: 4,
  suggestion: "fix",
  evidenceIds: ["source"],
};
const ballot = (
  model: string,
  verdict: "uphold" | "reject" | "resolved",
): ModelBallot => ({
  model,
  candidateHash: "h",
  votes: [
    {
      issueId: "i",
      verdict,
      severity: verdict === "uphold" ? 4 : 2,
      reason: "specific source evidence",
      evidenceIds: ["source"],
    },
  ],
});
test("override requires distinct other models, a majority and current-hash evidence", () => {
  expect(
    decideIssue(
      issue,
      [ballot("a", "uphold"), ballot("b", "reject"), ballot("c", "reject")],
      "h",
      policy,
    ).status,
  ).toBe("overruled");
  expect(
    decideIssue(
      issue,
      [
        ballot("a", "uphold"),
        ballot("b", "uphold"),
        ballot("c", "reject"),
        ballot("d", "reject"),
      ],
      "h",
      policy,
    ).status,
  ).toBe("open");
  expect(
    decideIssue(
      issue,
      [ballot("a", "uphold"), ballot("b", "reject"), ballot("c", "reject")],
      "h",
      { ...policy, overrideVotes: 3 },
    ).status,
  ).toBe("open");
  expect(() =>
    decideIssue(
      issue,
      [ballot("a", "uphold"), ballot("b", "reject"), ballot("b", "reject")],
      "h",
      policy,
    ),
  ).toThrow("Duplicate");
  expect(() =>
    decideIssue(issue, [ballot("a", "uphold")], "new", policy),
  ).toThrow("Stale");
});
const assessment = {
  ready: true,
  ratings: dimensions.map((d) => ({
    dimension: d,
    score: 4,
    confidence: 0.8,
    rationale: "clear",
    quote: "old",
  })),
  unresolved: [],
  summary: "strong",
};
const input = {
  source: "source",
  target: "old",
  sourcePath: "source.mdx",
  targetPath: "ja/index.mdx",
  policy,
  actors: ["a", "b", "c", "d"].map((model) => ({ model })),
  references: [],
  history: [],
};
test("an overruled high claim is recorded and hard validation cannot be voted away", async () => {
  const events: Event[] = [];
  const call: any = async (
    key: string,
    actor: any,
    _: string,
    payload: any,
  ) => {
    if (key.includes("review"))
      return {
        assessment,
        findings:
          actor.model === "a"
            ? [
                {
                  ...issue,
                  sourceQuote: "metadata outside source",
                  evidenceIds: [],
                  id: undefined,
                  originator: undefined,
                },
              ]
            : [],
        sourceConcerns: [],
      };
    if (key.includes("ballot"))
      return {
        votes: payload.issues.map((i: any) => ({
          ...ballot(actor.model, actor.model === "a" ? "uphold" : "reject")
            .votes[0],
          issueId: i.id,
        })),
      };
    return { changes: [], explanation: "No justified edit" };
  };
  const result = await negotiateConsensus(input, {
    call,
    validate: async () => ({ passed: true }),
    emit: (e) => events.push(structuredClone(e)),
  });
  expect(result.status).toBe("consensus-backed");
  expect(result.issues[0]!.status).toBe("overruled");
  expect(events.some((e) => e.type === "issue-decision")).toBe(true);
  expect(result.issues[0]!.evidenceWarnings).toHaveLength(2);
  const failed = await negotiateConsensus(input, {
    call,
    validate: async () => ({ passed: false }),
    emit: () => {},
  });
  expect(failed.status).toBe("needs-attention");
});
test("unresolved issue survives omission and triggers revision before final consensus", async () => {
  const events: Event[] = [];
  const result = await negotiateConsensus(input, {
    validate: async () => ({ passed: true }),
    emit: (e) => events.push(structuredClone(e)),
    call: async <T>(
      key: string,
      actor: any,
      _: string,
      payload: any,
    ): Promise<T> => {
      if (key.includes("review"))
        return {
          assessment,
          findings: key.startsWith("r1") && actor.model === "a" ? [issue] : [],
          sourceConcerns: [],
        } as T;
      if (key.includes("ballot"))
        return {
          votes: payload.issues.map((i: any) => ({
            issueId: i.id,
            verdict: key.startsWith("r1") ? "uphold" : "resolved",
            severity: key.startsWith("r1") ? 4 : 1,
            reason: "The replacement fixes the source meaning",
            evidenceIds: ["source"],
          })),
        } as T;
      return {
        changes: [
          {
            before: "old",
            after: "new",
            issueIds: payload.issues.map((i: any) => i.id),
            sourceQuote: "source",
            reason: "Fix meaning",
            tradeoff: "None",
            instruction: "Preserve intent",
            kind: "repair",
            evidenceIds: key.includes("revision-repair") ? ["source"] : [],
          },
        ],
        explanation: "Address criticism",
      } as T;
    },
  });
  expect(result.status).toBe("consensus");
  expect(result.candidate).toBe("new");
  expect(events.some((e) => e.type === "revision-rejected")).toBe(true);
  expect(result.issues).toHaveLength(1);
  expect(result.issues[0]!.decisions).toHaveLength(2);
  expect(
    events.some((e) => e.type === "revision" && Array.isArray(e.changes)),
  ).toBe(true);
});
test("explicit severity consensus can downgrade an issue without pretending it was fixed", () => {
  const ballots = ["a", "b", "c"].map((model) => ({
    ...ballot(model, "uphold"),
    votes: [{ ...ballot(model, "uphold").votes[0]!, severity: 3 }],
  }));
  const result = decideIssue(issue, ballots, "h", policy);
  expect(result.status).toBe("downgraded");
  expect(result.resultingSeverity).toBe(3);
});

test("large ballots are bounded and require explicit known evidence", async () => {
  const sizes: number[] = [];
  const result = await negotiateConsensus(input, {
    validate: async () => ({ passed: true }),
    emit: () => {},
    call: async <T>(
      key: string,
      actor: any,
      _: string,
      payload: any,
      schema: any,
    ): Promise<T> => {
      if (key.includes("review"))
        return {
          assessment,
          findings:
            actor.model === "a"
              ? Array.from({ length: 21 }, (_, i) => ({
                  ...issue,
                  claim: `Claim ${i}`,
                }))
              : [],
          sourceConcerns: [],
        } as T;
      sizes.push(payload.issues.length);
      const votes = payload.issues.map((i: any) => ({
        issueId: i.id,
        verdict: "reject",
        severity: 1,
        reason: "The source supports this wording",
        evidenceIds: ["source"],
      }));
      expect(
        schema.safeParse({
          votes: votes.map((v: any) => ({ ...v, evidenceIds: [] })),
        }).success,
      ).toBe(false);
      expect(
        schema.safeParse({
          votes: votes.map((v: any) => ({ ...v, evidenceIds: ["invented"] })),
        }).success,
      ).toBe(false);
      return { votes } as T;
    },
  });
  expect(result.status).toBe("consensus");
  expect(sizes.filter((n) => n === 20)).toHaveLength(4);
  expect(sizes.filter((n) => n === 1)).toHaveLength(4);
});

test("each issue retains only its own ballots to prevent quadratic prompt growth", () => {
  const ballots = ["a", "b", "c"].map((model) => ({
    ...ballot(model, "reject"),
    votes: [
      ...ballot(model, "reject").votes,
      { ...ballot(model, "reject").votes[0]!, issueId: "other" },
    ],
  }));
  const result = decideIssue(issue, ballots, "h", policy);
  expect(
    result.votes.every(
      (b) => b.votes.length === 1 && b.votes[0]!.issueId === "i",
    ),
  ).toBe(true);
});
