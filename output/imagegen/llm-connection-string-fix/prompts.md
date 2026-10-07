# LLM connection string image correction

Tool: built-in imagegen, editing the existing desk photographs.

Exact text restored from the previous `hero-wide.webp`:

```text
llm://api.openai.com/gpt-5.2?cache=true
```

Square prompt: Preserve the wooden desk, sticky notes, lighting, materials and photographic style. Replace the entire handwritten text on the central card with the exact string above, with two forward slashes after `llm:`. Enlarge the card so the full string is readable with padding and no clipped characters. Wrap at the question mark: `llm://api.openai.com/gpt-5.2` followed by `?cache=true`. Output a square photograph.

Landscape prompt: Preserve the desk, sticky notes, pencils, palette, lighting, photographic style and landscape framing. Replace the bedrock connection string with the exact string above. Enlarge the central card and text, retain padding, and keep all essential text within central 1.8:1 and 2.25:1 crops. Wrap at the question mark if needed. Output a landscape photograph.

Final files live beside `src/content/posts/2026-01-30--llm-connection-strings/index.mdx`. The square was independently edited, not cropped from the landscape. Sharp resized and encoded the approved images as WebP; social variants use the corrected landscape at 1200 by 628. `square-fullsize.webp` is the corrected source used by the existing hero-format regeneration script.
