You are continuing work on a ticket in the repository in your current directory. The
change so far is in the working tree. A review of it found the problems below.

<ticket>
{{task}}
</ticket>

<review>
{{findings}}
</review>

{{env}}

Fix every finding of `medium` severity or higher. If, after checking the code, you
conclude a finding is wrong, leave the code as it is and say why in your summary. Run the
stack and check your fixes. Keep `bun test` passing. Commit nothing. When you finish,
summarize what you changed.
