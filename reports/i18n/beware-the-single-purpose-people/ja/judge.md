# Translation Judge

- Selected candidate: current
- Selected model: current
- Judge model: openrouter/google/gemini-3-flash-preview
- Confidence: high (0.866)

The current version is superior because it correctly handles asset paths in MDX. According to the instructions, locale files live one folder deeper than English, so inherited local image paths must start with '../'. The current version uses '../desktop-social.webp', whereas the candidate version incorrectly uses 'desktop-social.webp'. While both versions leave some English words like 'ideally', 'insisting', and 'clueless' in the prose (which is slightly awkward), the current version's adherence to structural path requirements makes it the only valid choice.