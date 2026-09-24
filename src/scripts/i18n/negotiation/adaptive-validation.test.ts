import { test, expect } from "bun:test";
import { policySchema } from "./consensus-policy.ts";
import { validateAdaptive } from "./adaptive-validation.ts";
const source =
  "---\ntitle: Source article\n---\n\n## Original\n\nA clear article describes a useful idea with enough context for its readers. The factual count is 250.\n";
const baseline =
  "---\ntitle: Artículo traducido\n---\n\n## Original traducido\n\nUn artículo claro explica una idea útil con contexto suficiente para sus lectores. La cantidad es 250.\n";
test("adaptive profile permits a new heading while preserving numeric facts and strict mode blocks layout change", async () => {
  const candidate = baseline.replace(
    "La cantidad",
    "\n\n## Más contexto\n\nLa cantidad",
  );
  const policy = policySchema.parse({ audience: "Spanish readers" });
  const adaptive = await validateAdaptive(
    source,
    candidate,
    baseline,
    "es/index.mdx",
    "es",
    policy,
  );
  expect(adaptive.passed).toBe(true);
  expect(
    (
      await validateAdaptive(
        source,
        candidate,
        baseline,
        "es/index.mdx",
        "es",
        { ...policy, structure: "preserve" },
      )
    ).passed,
  ).toBe(false);
  expect(
    (
      await validateAdaptive(
        source,
        candidate.replace("250", "251"),
        baseline,
        "es/index.mdx",
        "es",
        policy,
      )
    ).passed,
  ).toBe(false);
});
