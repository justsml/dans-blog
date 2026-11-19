You are grading a code review against an answer key. You do not know who wrote the
review. Judge substance, not wording.

<seeded_defects>
{{defects}}
</seeded_defects>

<review_findings>
{{findings}}
</review_findings>

For each seeded defect, decide whether any single finding identifies it. A match
requires the same mechanism (what goes wrong and why), not just the same file or a
vague gesture at the area. A finding that names the right line but the wrong cause is
not a match. Use the finding's index or null.

Then label every finding:
- "match": it identifies a seeded defect.
- "valid": a real problem in this PR that is not in the answer key. Use this only when
  the finding's evidence would convince a careful maintainer.
- "invalid": wrong, unsupported, or about code the PR did not touch or expose.
- "nit": true but not a defect (style, naming, speculative hardening).
