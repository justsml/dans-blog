# I18n Judge Report: your-foreign-keys-are-killing-performance (ru)

## Decision Summary
**Selected Candidate:** `4cb72a1f2b0df6064fcca462d7ba0509dea00ce6` (Qwen 3.6 Plus)

The Qwen candidate was chosen for its superior handling of technical terminology ("блобы", "узкое место", "осиротевшие записи") and more natural, direct tone that mirrors Dan's style. It avoided common pitfalls found in other candidates, such as leaving English words untranslated or using clunky literal translations for idiomatic technical phrases.

## Candidate Comparison

### [4cb72a1] Qwen 3.6 Plus (Winner)
- **Technical Accuracy:** Excellent. Correctly uses "блобы" for blobs and "узкое место" for bottleneck.
- **Natural Language:** Very high. Flows well in Russian without sounding like a "translation".
- **Style Alignment:** Captures the punchy, direct tone of the original article.
- **MDX Preservation:** Perfect. Correctly updated asset paths to `../`.

### [3fd2388] DeepSeek V4 Flash
- **Issues:** Left the English word "absolutely" in the middle of a Russian sentence (line 22). Used "встала на колени" for "ground to a halt", which is slightly less idiomatic in this context than Qwen's "встала колом".
- **Tone:** A bit more formal/literal.

### [e91d0d2] MiniMax M2.7
- **Issues:** Translated "JSONB blob" as "JSONB-большом объекте", which is technically an expansion of the acronym but not how developers actually talk. Qwen's "JSONB-блобу" is much better.
- **Tone:** Slightly inconsistent, mixing informal and formal registers.

## Final Polish Applied
The Qwen candidate was already of very high quality. No significant changes were required beyond verifying asset path consistency and ensuring the frontmatter fields remained intact.
