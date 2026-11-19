// JSON Schemas shared by both CLIs. Codex's --output-schema needs strict shapes:
// every property required and additionalProperties: false.

export const reviewSchema = (maxFindings: number) => ({
  type: "object",
  additionalProperties: false,
  required: ["findings"],
  properties: {
    findings: {
      type: "array",
      maxItems: maxFindings,
      items: {
        type: "object",
        additionalProperties: false,
        required: ["file", "line_start", "line_end", "severity", "category", "claim", "evidence"],
        properties: {
          file: { type: "string" },
          line_start: { type: "integer" },
          line_end: { type: "integer" },
          severity: { type: "string", enum: ["critical", "high", "medium", "low"] },
          category: { type: "string" },
          claim: { type: "string", description: "What goes wrong, under what input or condition." },
          evidence: { type: "string", description: "The code path that proves it." },
        },
      },
    },
  },
});

export const judgeReviewSchema = {
  type: "object",
  additionalProperties: false,
  required: ["defects", "findings"],
  properties: {
    defects: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "finding_index", "rationale"],
        properties: {
          id: { type: "string" },
          finding_index: { type: ["integer", "null"] },
          rationale: { type: "string" },
        },
      },
    },
    findings: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["index", "label", "rationale"],
        properties: {
          index: { type: "integer" },
          label: { type: "string", enum: ["match", "valid", "invalid", "nit"] },
          rationale: { type: "string" },
        },
      },
    },
  },
};

export const judgePlanSchema = {
  type: "object",
  additionalProperties: false,
  required: ["requirements"],
  properties: {
    requirements: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["id", "satisfied", "rationale"],
        properties: {
          id: { type: "string" },
          satisfied: { type: "boolean" },
          rationale: { type: "string" },
        },
      },
    },
  },
};
