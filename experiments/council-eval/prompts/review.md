You are reviewing a pull request in the repository in your current directory.

The PR description is below. The diff is in `PR.diff` at the repository root, and the
working tree already has the PR applied. Read whatever code you need.

{{lens}}

<pr_description>
{{description}}
</pr_description>

Report defects this PR introduces or exposes: wrong behavior, security holes, data
loss, failure handling, performance or cost problems. Skip style nits. Each finding
must point at a file and line range in the PR's version of the code and say what goes
wrong, under what input or condition.

Return at most {{maxFindings}} findings, most severe first. Return an empty list if the
PR is clean. Do not modify any files.
