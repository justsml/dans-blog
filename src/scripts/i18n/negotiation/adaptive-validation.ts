import { validateNegotiatedTranslation } from "./batch-validation.ts";
import { type ConsensusPolicy } from "./consensus-policy.ts";
import matter from "gray-matter";
export async function validateAdaptive(
  source: string,
  target: string,
  baseline: string,
  path: string,
  locale: "es" | "ja",
  policy: ConsensusPolicy,
) {
  const raw = await validateNegotiatedTranslation(
    source,
    target,
    baseline,
    path,
    locale,
  );
  const waived: string[] = [];
  const issues = raw.structural.issues.filter((issue) => {
    if (issue.code === "length-ratio") {
      waived.push(issue.code);
      return false;
    }
    if (
      policy.structure === "adaptive" &&
      (issue.code === "heading-counts" ||
        /^heading-h[1-6]-count$/.test(issue.code) ||
        issue.code === "blockquote-count")
    ) {
      waived.push(issue.code);
      return false;
    }
    if (policy.structure === "adaptive" && issue.code === "structural-parity") {
      // Layout/ordering may change. Required components, import semantics, quiz
      // answers and links remain checked by the other validators and checks below.
      const d = raw.structural.structure.differences;
      const permitted = new Set([
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "headingSequence",
        "blockquotes",
        "linkTargets",
        "componentSequence",
      ]);
      if (Object.keys(d).every((k) => permitted.has(k))) {
        waived.push(issue.code);
        return false;
      }
    }
    return true;
  });
  const externals = (text: string) =>
    [...text.matchAll(/https?:\/\/[^\s)<>"']+/g)].map((m) => m[0]).sort();
  const linksPreserved =
    JSON.stringify(externals(source)) === JSON.stringify(externals(target));
  const ratio =
    matter(target).content.length / Math.max(1, matter(source).content.length);
  const outside =
    ratio < policy.length.minRatio || ratio > policy.length.maxRatio;
  return {
    ...raw,
    policy,
    rawValidation: raw,
    waivedChecks: waived,
    bodyCharacterRatio: ratio,
    lengthWarning: outside && policy.length.mode === "soft",
    linksPreserved,
    passed:
      !issues.some((i) => i.severity === "high" || i.severity === "medium") &&
      !raw.mdxError &&
      !raw.quizError &&
      !raw.protectedChanges.length &&
      linksPreserved &&
      !(outside && policy.length.mode === "strict"),
  };
}
