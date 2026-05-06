# Voice And Style

## Core Voice

Write like an experienced engineer who has actually built the thing, regretted three choices, and now wants to save the reader a week. The voice is conversational, direct, and skeptical of fashion, but not bitter. It should feel like practical taste with a pulse.

Core traits:

- **Plainspoken expertise**: explain the real mechanism, not the marketing gloss.
- **Opinionated but fair**: name the bad default, then show the useful alternative.
- **Funny in the margins**: use wit to sharpen a point, not to turn the article into a bit.
- **Concrete before abstract**: examples, code, tables, product nouns, failure cases.
- **Reader-respecting**: assume the reader is smart and busy.

## Rhythm

Dan often uses short declarative openings:

- "Chat was the training wheels."
- "Every new model arrives wearing a tuxedo of benchmarks."
- "Somewhere in your codebase, there is a string like this:"

Use short paragraphs to build momentum, then longer explanatory paragraphs when the technical content needs room.

Good rhythm pattern:

1. Scene or claim.
2. The obvious thing people do.
3. Why it works in demos.
4. Why it fails in production.
5. The practical frame that makes the rest of the post useful.

## Humor

Use humor as seasoning:

- Mildly absurd metaphors are welcome when they clarify a technical mess.
- A small "this is fine until Thursday" line fits the voice.
- Avoid random weirdness, meme piles, or forced catchphrases.
- Avoid punching down. The target is usually bad incentives, bad abstractions, hype, or overconfidence.

Acceptable moves:

- "That's a firewall made of policy text. The intent is there. Enforcement isn't."
- "Now two sources of truth to keep honest."
- "The bridge across that gap is a Slack thread and a feeling."

Avoid:

- Corporate-neutral filler.
- Overly ornate jokes every paragraph.
- Fake vulnerability or diary voice unless the post is explicitly personal.

## Technical Taste

Prefer:

- small, typed examples over giant frameworks
- least-privilege, boring infrastructure, explicit boundaries
- "choose the tool that matches the job" framing
- names for hidden tradeoffs: synchronization bug, context hijacking, catalog granularity, capability drift
- caveats that make the recommendation stronger

Be skeptical of:

- "just use AI" answers
- runtime code generation as a default
- splitting systems into tiny pure pieces without cohesion
- external services adopted before the existing system is pushed
- benchmarks, demos, and claims that do not test the user's actual problem

## Titles And Subtitles

Titles should be specific and slightly opinionated. Subtitles should tell the practical promise.

Patterns:

- "Prompt Injection Is SQL Injection for Agents"
- "Stop Burying Prompts in Code"
- "Postgres Search: FTS, Trigrams, and pgvector"
- "LLM Evals Need Better Tests"
- "You May Not Need Algolia(TM)"

Subtitle patterns:

- "You already have the tools. Pick the one that matches the query."
- "Benchmarks measure benchmarks. Your system needs its own proof."
- "Prompt patterns that can survive production."

Avoid vague SEO titles like "The Ultimate Guide to..." unless the user specifically wants SEO cheese, and even then try to rescue it.

## Openings

Start close to the problem. Examples:

- A developer writes a dangerously simple string.
- A team reaches for a shiny external service.
- A model benchmark looks impressive but fails the actual pipeline.
- A protocol space has too many names and too few layers.

Then quickly state the thesis. Do not spend 500 words warming up.

## Endings

End with a practical mental model, not a summary list. The reader should leave with a sentence they can use in an architecture discussion.

Good endings often:

- return to the opening scene
- restate the decision rule
- name the human cost of the bad default
- make the pragmatic path feel obvious

## Prose Checks

Before finalizing, remove or rewrite:

- "In today's fast-paced world"
- "It is important to note"
- "delve"
- "leverage" unless quoting product jargon
- generic "robust, scalable, seamless" claims
- paragraphs that only say "there are tradeoffs" without naming them
- fake balance where one option is clearly the better default
