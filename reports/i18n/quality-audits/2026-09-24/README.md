# Translation quality audit — September 24, 2026

Verified all five consensus-gold/v1 source hashes and promoted target hashes against the current checkout: all match. The preserved translation battle preferred gold in 122/130 reviews (65 paired candidates, five Spanish/Japanese cases). This supports retaining those references, not extrapolating to every locale.

Scanned 850 localized MDX files across ten locales with `analyzeTranslationIntegrity`. Only 33 latest translation-scored records exactly matched both current source and target SHA-256 hashes before repairs. Missing or mismatched evidence is not a current quality certification; an old score is not automatically a current defect either.

Repairs: 33 heading-link targets in 25 files, two relative image paths, three stray code fences, and the Hebrew regex example restored verbatim to the source code block. Gold references and raw trace/generation evidence remain unchanged.

Validation: content check passed with 0 errors and 110 existing warnings; Astro check passed with 0 errors, 0 warnings, and 119 hints. The corpus JSON records the post-repair deterministic findings and latest historical scores; it does not contain fresh LLM assessments. 26 files still have high/medium structural findings requiring source-aware review. These are tracked findings, not a claim that every difference is wrong. In particular, five Docker security translations have multiple malformed fences, and several older posts have heading/table differences. Full corpus linguistic quality remains unverified.

## Remaining deterministic review queue

- `src/content/posts/2023-08-13--mastering-functional-pipelines-passing-state/ja/index.mdx`: heading-h4-count
- `src/content/posts/2025-12-29--async-stack-traces-why-error-stack-lies-in-production/ru/index.mdx`: heading-h2-count
- `src/content/posts/2015-10-05--higher-order-programming/ru/index.mdx`: heading-h2-count
- `src/content/posts/2018-11-14--securely-using-environment-variables-in-nodejs/de/index.mdx`: blockquote-count
- `src/content/posts/2025-09-15--serverless-database-magic/es/index.mdx`: heading-h3-count
- `src/content/posts/2023-08-28--deathmatch-git-rebase-vs-merge/fr/index.mdx`: heading-h4-count
- `src/content/posts/2023-08-28--deathmatch-git-rebase-vs-merge/it/index.mdx`: heading-h2-count, heading-h4-count
- `src/content/posts/2023-08-28--deathmatch-git-rebase-vs-merge/ja/index.mdx`: heading-h4-count
- `src/content/posts/2024-08-22--upgrade-from-gatsby-to-astro/he/index.mdx`: heading-h2-count
- `src/content/posts/2015-06-06--javascript-scope-magic/fr/index.mdx`: heading-h2-count
- `src/content/posts/2015-06-06--javascript-scope-magic/it/index.mdx`: external-asset-rewritten-local
- `src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/es/index.mdx`: html-comment-outside-code, fenced-code-count, markdown-image-count, heading-h1-count, heading-h2-count, heading-h3-count, heading-h4-count
- `src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/de/index.mdx`: fenced-code-count, markdown-image-count, heading-h1-count, heading-h2-count, heading-h3-count, heading-h4-count
- `src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/hi/index.mdx`: html-comment-outside-code, fenced-code-count, markdown-image-count, heading-h1-count, heading-h2-count, heading-h3-count, heading-h4-count
- `src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/ar/index.mdx`: fenced-code-count, markdown-image-count, heading-h1-count, heading-h2-count, heading-h3-count, heading-h4-count
- `src/content/posts/2025-01-05--docker-security-tips-for-self-hosting/ru/index.mdx`: html-comment-outside-code, fenced-code-count, markdown-image-count, heading-h1-count, heading-h2-count, heading-h3-count, heading-h4-count
- `src/content/posts/2018-11-15--you-may-not-need-axios/fr/index.mdx`: heading-h3-count
- `src/content/posts/2018-11-15--you-may-not-need-axios/hi/index.mdx`: heading-h2-count, heading-h3-count
- `src/content/posts/2018-11-15--you-may-not-need-axios/ar/index.mdx`: table-count
- `src/content/posts/2018-11-15--you-may-not-need-axios/ja/index.mdx`: table-count, heading-h2-count, heading-h3-count
- `src/content/posts/2018-11-15--you-may-not-need-axios/he/index.mdx`: table-count
- `src/content/posts/2015-03-10--stop-the-angularjs-hate/de/index.mdx`: heading-h3-count
- `src/content/posts/2015-03-10--stop-the-angularjs-hate/ja/index.mdx`: heading-h2-count
- `src/content/posts/2025-04-03--beware-the-single-purpose-people/hi/index.mdx`: heading-h2-count
- `src/content/posts/2015-06-12--love-computer-languages/de/index.mdx`: heading-h4-count
- `src/content/posts/2015-06-12--love-computer-languages/it/index.mdx`: heading-h4-count
