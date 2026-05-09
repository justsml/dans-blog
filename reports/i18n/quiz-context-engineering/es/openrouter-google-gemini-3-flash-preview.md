# Translation Candidate

- Slug: quiz-context-engineering
- Locale: es
- Model: openrouter/google/gemini-3-flash-preview
- Target: src/content/posts/2026-05-09--quiz-context-engineering/es/index.mdx
- Validation: rejected: missing preserved import
- Note: Candidate output changed the protected Challenge/QuizUI import paths, causing `bun run i18n:validate -- --slug quiz-context-engineering --locale es` to fail before the wrapper could commit it.
