# I18n Translation Repair Queue

Generated: 2026-07-08T17:42:00Z

Score source: latest `translation_scored` events in `reports/translations-log.jsonl`

This queue is built from the current scoring snapshot and includes only pairs still below 90.

## Current Below-90 Queue

| Rank | Locale | Slug | Score | Recommendation | Confidence | Issues H/M/L | Notes |
| ---: | --- | --- | ---: | --- | --- | ---: | --- |
| 1 | hi | just-add-more-engineers-fallacy | 87.8 | accept | low | 0/1/1 | Source post no longer present in repo; appears stale, queued for archive/migration before repair |
| 2 | hi | rag-pipeline-failures | 88.8 | accept | low | 1/1/1 | Source post no longer present in repo |
| 3 | hi | developer-workstation-blast-radius | 89.0 | accept | low | 1/1/2 | Source post no longer present in repo |
| 4 | es | developer-workstation-blast-radius | 89.8 | polish | low | 1/2/1 | Source post no longer present in repo |

## Issue Hints

### hi/just-add-more-engineers-fallacy

- Score: 87.8 (accept, low confidence)
- Validation: translation target path is stale for current corpus and cannot be repaired until source is restored/recovered.

### hi/rag-pipeline-failures

- Score: 88.8 (accept, low confidence)
- Validation: source slug cannot be found in `src/content/posts`.

### hi/developer-workstation-blast-radius

- Score: 89.0 (accept, low confidence)
- Validation: source slug cannot be found in `src/content/posts`.

### es/developer-workstation-blast-radius

- Score: 89.8 (polish, low confidence)
- Validation: source slug cannot be found in `src/content/posts`.
