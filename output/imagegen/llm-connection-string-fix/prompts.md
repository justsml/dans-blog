# LLM connection string image correction

Tool: built-in imagegen, editing the existing desk photographs.

Exact text restored from the previous `hero-wide.webp`:

```text
llm://api.openai.com/gpt-5.2?cache=true
```

Square prompt: Preserve the wooden desk, sticky notes, lighting, materials and photographic style. Replace the entire handwritten text on the central card with the exact string above, with two forward slashes after `llm:`. Enlarge the card so the full string is readable with padding and no clipped characters. Wrap at the question mark: `llm://api.openai.com/gpt-5.2` followed by `?cache=true`. Output a square photograph.

Landscape prompt: Preserve the desk, sticky notes, pencils, palette, lighting, photographic style and landscape framing. Replace the bedrock connection string with the exact string above. Enlarge the central card and text, retain padding, and keep all essential text within central 1.8:1 and 2.25:1 crops. Wrap at the question mark if needed. Output a landscape photograph.

Final files live beside `src/content/posts/2026-01-30--llm-connection-strings/index.mdx`. The square was independently edited, not cropped from the landscape. Sharp resized and encoded the approved images as WebP; social variants use the corrected landscape at 1200 by 628. `square-fullsize.webp` is the corrected source used by the existing hero-format regeneration script.

## Short form, final user correction

Final exact text: `llm://openai/gpt-5.2?cache=true`, on one line.

Applied separately to the square and landscape photographs with built-in imagegen: Edit the central card's handwriting. Replace the current two lines with this EXACT text ON ONE SINGLE LINE: `llm://openai/gpt-5.2?cache=true`. No line break or wrapping. Use exactly the short provider name `openai`, model `gpt-5.2`, scheme `llm://` with two slashes, and query `?cache=true`. Center the entire single line on the card, adjust size for comfortable padding and clear readability. Preserve all desk objects, note positions, card, lighting, palette, photographic style and original framing. The central card contains no other text.

## GPT-7 Astra, superseded user correction

Final exact text: `llm://openai/gpt-7-astra?cache=true`, on one line.

Applied separately to the square and landscape photographs with built-in imagegen: Edit ONLY the handwriting on the central card. Put the entire exact replacement string on ONE SINGLE unbroken LINE, no wrapping. Two forward slashes after `llm:`, provider `openai`, model `gpt-7-astra`, query `?cache=true`. Adjust lettering size minimally if needed so all characters fit within the card with comfortable padding. Preserve the card, composition, all other objects, desk, notes, lighting, colors, handwriting style and original framing. No other text on the central card and no extra punctuation.

## GPT-7, final user correction

Final exact text: `llm://openai/gpt-7?cache=true`, on one line.

Applied separately to the square and landscape photographs with built-in imagegen: Edit ONLY the handwriting on the central card. Put the entire exact replacement string on ONE SINGLE unbroken LINE, no wrapping. Two forward slashes after `llm:`, provider `openai`, model `gpt-7`, query `?cache=true`. Center the lettering on the card with comfortable padding. Preserve the card, composition, all other objects, desk, notes, lighting, colors, handwriting style and original framing. No other text on the central card and no extra punctuation. Astra generations were superseded and were not installed.
