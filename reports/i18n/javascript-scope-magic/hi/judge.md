# Translation Judge

- Selected candidate: current
- Selected model: current
- Judge model: openrouter/google/gemini-3-flash-preview
- Confidence: high (0.870)

The 'current' translation is the most complete and accurate. It correctly translates the headings and prose into Hindi while maintaining the technical context. Candidate 75148d707ec20a241b12b0af8b9b0ee8caacc1e8 failed to translate the main headings (Imperative vs. Recursive vs. Functional) and the code comments, which are translated in 'current'. Candidate 2114fc9f6509814aa3eced7e60521c378a877289 is almost identical to 'current' but stripped the subTitle in the frontmatter. 'current' also correctly uses MDX comment syntax `{/* ... */}` for the work-in-progress section at the end, whereas the English source used HTML comments.