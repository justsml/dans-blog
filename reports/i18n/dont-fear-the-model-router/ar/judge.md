# Translation Judge

- Selected candidate: 02d0fb127518101e98ca378967a2dbe7a9519852
- Selected model: openrouter/openai/gpt-5.6-luna
- Judge model: openrouter/google/gemini-3.8-flash
- Confidence: high (0.883)

Candidate 02d0fb127518101e98ca378967a2dbe7a9519852 (gpt-5.6-luna) provides a remarkably clean, fluent, and technically precise Arabic translation. In contrast, candidate f53d60f3d899a1197cdc81133264637ab84f34c8 has duplicated lines ('ذلك الصف الأخير مهم...'), syntax corruption in code snippets (full-width Chinese punctuation like 'id：', 'type: "agent"，', and invalid JSON like 'description": "...'), a broken external URL ('mast.ar' instead of 'mastra.ai'), and a typo in an import path ('../scores/route-accuracy'). Candidate 02d0fb127518101e98ca378967a2dbe7a9519852 preserves code blocks, relative links, and MDX structure flawlessly.