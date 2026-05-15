---
name: i18n-eval-loop
description: Run iterative DanLevy.net translation eval improvement loops: baseline requested i18n eval commands, inspect raw streams and judge JSON, research prompt/QA ideas, tune prompts, validation, and pre/post-processing, rerun, measure, and record findings without confusing medium polish with hard failures.
---

# I18n Eval Loop

Use this when asked to improve translation quality with `bun run i18n:eval` or similar i18n eval commands.

## Workflow

1. Check `git status --short` and preserve unrelated user changes.
2. Run the user's exact eval command(s) as the baseline. Prefer sequential runs when commands would otherwise write summaries at the same timestamp.
3. Inspect `summary.md`, `cases.jsonl`, raw `translation-*.txt`, and raw `judge-*.txt`. Do not trust a green pass until judge suggestions and deterministic details have been read.
4. Research likely improvements from repo behavior first, then external sources only when useful. Good recurring ideas:
   - document-level context improves flow, but critical errors still need explicit QA;
   - terminology and metadata constraints should be deterministic, not only judge prose;
   - translate idioms by intent, not literal wording;
   - postprocess only mechanical issues the production pipeline already repairs.
5. State the current hypothesis, make one focused change, and rerun local checks before spending tokens again.
6. Rerun the same eval command(s), compare scores and failure modes, then repeat while failures are real.
7. Record the outcome: baseline, changes, final scores, remaining medium/low polish, and report paths.

## Tuning Rules

- Keep `bun` only.
- Add deterministic scorers for deploy-breaking or convention-breaking issues: frontmatter language, taxonomy preservation, MDX parse, asset paths, component imports, code fences, quiz answer flags.
- Mirror production postprocessing in eval scoring when production already normalizes the issue, especially inherited locale asset paths. Keep raw stream files for debugging.
- Treat high-priority judge suggestions as eval blockers. Treat medium suggestions as score penalties and visible polish notes unless the user explicitly wants zero medium suggestions; otherwise the loop becomes overly sensitive to stylistic quibbles.
- Prompt tweaks should be short and locale-specific when a model repeatedly makes the same language error. Avoid global prompt bulk unless multiple locales show the same failure.
- Preserve controlled frontmatter metadata exactly: `category`, `subCategory`, `tags`, dates, routing/visibility fields, and asset filenames. Translate only reader-facing frontmatter values such as `language`, `title`, `subTitle`, `cover_alt`, and `cover_credit`.

## Lessons From `the-last-to-think`

- Spanish `gpt-oss` initially looked green but had real issues: `language:English`, translated taxonomy risk, and literal idioms such as transitive `hobble` rendered with intransitive `cojear`.
- Japanese `deepseek-v4-flash` needed explicit guidance to translate ordinary prose concepts while preserving brands/code/technical terms; otherwise normal phrases like `juvenile delinquency` can leak through in English.
- The eval harness should normalize frontmatter assets before scoring because production candidate writing already does that repair.
