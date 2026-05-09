# Translation Candidate
- Slug: rag-pipeline-failures
- Locale: hi
- Model: openrouter/qwen/qwen3.6-plus
- Target: src/content/posts/2026-05-05--rag-pipeline-failures/hi/index.mdx
- Validation: rejected: opencode command failed
- Note: Command failed after 90000ms: opencode run --pure --model openrouter/qwen/qwen3.6-plus --variant low --file /Users/dan/code/oss/dans-blog/src/content/posts/2026-05-05--rag-pipeline-failures/index.mdx --dangerously-skip-permissions You are a constrained translation file-rewrite worker.
Translate src/content/posts/2026-05-05--rag-pipeline-failures/index.mdx into hi.
Write the complete translated MDX to src/content/posts/2026-05-05--rag-pipeline-failures/hi/index.mdx.
Do not run shell commands, git commands, Bun scripts, validation scripts, or translation scripts.
Do not inspect or follow repository skills. Do not create commits. The wrapper script owns validation, reports, and Git.
Preserve MDX structure, imports, component names, prop names, code blocks, URLs, asset paths, and anchors.
Translate reader-facing prose, frontmatter title/subTitle, image alt text, quiz questions/options/explanations, and visible UI copy inside MDX props.
Do not add commentary outside the file. Replace any previous candidate in the target file.
Keep frontmatter lean: localized title/subTitle/body and optional localized cover_alt only unless a field must override English.