# Translation Judge

- Selected candidate: b2bcbe3869612139128889a4f42adce932e6a744
- Selected model: openrouter/openai/gpt-oss-120b:nitro
- Judge model: openrouter/google/gemini-3-flash-preview

The selected candidate provides a high-quality translation that maintains the technical terminology (SQL, ORM, CTE) while sounding natural in German. It correctly preserves the MDX structure and components. The previous judge's concern about a broken SQL string appears to be a misinterpretation of the escaping in the JSON-like options array; the candidate actually contains the correct string.