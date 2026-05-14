# Translation Judge

- Selected candidate: current
- Selected model: current
- Judge model: openrouter/google/gemini-3-flash-preview

The 'current' translation is already quite good and follows the required structure. The candidate commit is nearly identical to the current version (likely due to the model being used for the initial translation or a very similar one), but it has an incorrect import path for the components (one extra level of nesting `../../../../..` instead of `../../../../`), which would break the build. Therefore, 'current' is the safer and more accurate choice.