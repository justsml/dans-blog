# I18n Judge Report: mastra-mcp-tool-integrations (it)

## Candidates
- **Qwen 3.6 Plus (7f8f14e)**: Strong natural flow, good technical terminology.
- **DeepSeek V4 Flash (3fdb695)**: Solid, but slightly more formal/dry. Corrected one social image path.
- **MiniMax M2.7 (5aa5331)**: Good, but has some "translationese" (e.g., "deal con i loro rate limit").

## Decision: Qwen 3.6 Plus (7f8f14e)

Qwen captured Dan's direct, slightly punchy style best while maintaining technical accuracy. It used natural Italian developer parlance (e.g., "wrapper API", "endpoint", "rate limit") without sounding forced. 

### Polishing adjustments made to Qwen:
- Fixed `social_image` path to include `../` prefix to match other assets and maintain consistency in the localized folder.
- Minor punctuation and flow tweaks to keep the "Dan Levy" voice sharp.

## Metadata
- **Judge Model**: openrouter/google/gemini-3-flash-preview (via OpenCode)
- **Selection**: 7f8f14e39a9280de4cc5b3d52f70ad9d6aafc7a6
