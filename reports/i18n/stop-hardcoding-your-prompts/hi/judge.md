# Primary Judge: hi Translation - stop-hardcoding-your-prompts

- Judge model: openrouter/google/gemini-3-flash-preview
- Result: selected `b5c0acea170aa03e7f7ad294ce8a9ddb3c6f161e` (openrouter/minimax/minimax-m2.7)
- Note: The judge wrapper timed out during the later escalation step, so this file records the primary judge result from the OpenCode output rather than the wrapper-generated report.

## Rationale

The primary judge preferred the MiniMax M2.7 candidate for its natural title, complete Hindi article structure, preserved MDX/frontmatter shape, and parent-relative asset paths. It judged GLM 5 Turbo as somewhat more formal and MiniMax M2.5 as less consistent in title/prose quality.

## Outcome

The second judge disagreed and recommended `ae1992555935dbb7a025a3e2682658e9085df675` (openrouter/z-ai/glm-5-turbo). Because this was a real model disagreement, the escalation judge was run with openrouter/anthropic/claude-sonnet-4.6.
