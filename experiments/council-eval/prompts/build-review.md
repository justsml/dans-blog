You are reviewing a change in the repository in your current directory, before it ships.

The ticket it implements is below. `CHANGE.diff` at the repository root holds the full
change against the base commit, and the working tree already has the change applied.
Read whatever code you need.

{{lens}}

<ticket>
{{task}}
</ticket>

Report problems that this change introduces or leaves unsolved: wrong behavior, ways the
ticket is not met, data loss, failure handling, security holes, and performance or cost
problems. Skip style nits. Each finding must point at a file and line range and say what
goes wrong, and under what condition. Use severity honestly: `medium` or above means it
should block shipping.

Return at most {{maxFindings}} findings, most severe first. Return an empty list if
nothing should block or concern a careful reviewer. Do not modify any files.
