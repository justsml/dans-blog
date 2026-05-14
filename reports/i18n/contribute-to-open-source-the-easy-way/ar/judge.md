# Translation Judge

- Selected candidate: 8b1296e4eb5d3091e62cd9efc37e2b89b1bf66a9
- Selected model: openrouter/openai/gpt-oss-120b:nitro
- Judge model: openrouter/google/gemini-3-flash-preview

Candidate 8b1296e4eb5d3091e62cd9efc37e2b89b1bf66a9 is selected because it correctly preserves the MDX structure and heading counts. Candidate 22063d8d1a8a42f0e250acf557586acda847b35b has a duplicated H3 heading ('### العصف الذهني'), which violates the constraint to preserve the exact heading count of the English source. Candidate 8b1296e4eb5d3091e62cd9efc37e2b89b1bf66a9 also handles the frontmatter asset paths correctly and maintains a natural, direct tone suitable for the content.