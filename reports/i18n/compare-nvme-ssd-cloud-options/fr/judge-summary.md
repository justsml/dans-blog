# Translation Judge Summary

- Slug: compare-nvme-ssd-cloud-options
- Locale: fr
- Judge model: openrouter/google/gemini-3.8-flash
- Second judge model: not run
- Escalation judge model: not run
- Max candidate commits per judge call: 3
- Fix pass limit: 2
- Selected commit hint: judge selected
- Validation: passed
- Validation scope: local
- Confidence: high (0.884)
- Confidence signals: no high/medium issues; single judge
- High/medium/low issue counts: 0/0/0

## Primary Judge Telemetry
- Runtime seconds: 4.44
- Input tokens: 8306
- Output tokens: 535
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.008236
- Estimated cost: $0.008236

## Pre-Publish Rescore Telemetry
### Pass 1
- Runtime seconds: 2.07
- Input tokens: 5874
- Output tokens: 164
- Thinking tokens: unknown
- Cached input tokens: 0
- Cache write tokens: 0
- OpenRouter cost credits: 0.005020
- Estimated cost: $0.005020

## Judge Suggestions
1. Pass 1: applied medium priority suggestion. Match: "> EC2 **i3.large** avec un **SSD NVMe de 475 Go** coûte généralement environ **110 $/mois !** > <br /> > Un **i3.2xlarge avec 1,9 To de NVMe** coûte environ **450 $/mois** * > <..." Replacement: "> EC2 **i3.large** avec un **SSD NVMe de 475 Go** coûte généralement environ **110 $/mois !** <br /> > Un **i3.2xlarge avec 1,9 To de NVMe** coûte environ **450 $/mois** * <br /..." Reason: Clean up messy trailing quote characters around line breaks in the blockquote Note: Applied exact replacement to selected MDX.

## Candidates
- current src/content/posts/2017-04-15--compare-nvme-ssd-cloud-options/fr/index.mdx
- ea13110d80e735b3463ca8ab4a530e966c9cbf4f i18n candidate(fr): compare-nvme-ssd-cloud-options via openrouter/deepseek/deepseek-v4-flash
- 87d67c6b5139b0b1b7bba7c5bc9c0b071cc6823c i18n candidate(fr): compare-nvme-ssd-cloud-options via openrouter/openai/gpt-oss-120b:nitro
- 81fdb36a47d197c228308a61b37616986926f4d8 i18n candidate(fr): compare-nvme-ssd-cloud-options via openrouter/openai/gpt-5.6-luna
