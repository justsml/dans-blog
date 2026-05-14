# Translation Judge

- Selected candidate: df0b8f037b920d619d9f92ac4ed1869af64d448f
- Selected model: openrouter/deepseek/deepseek-v4-flash
- Judge model: openrouter/google/gemini-3-flash-preview

Deepseek provided a very natural and technically accurate translation. It correctly used 'المفاتيح الخارجية' (the standard term for Foreign Keys in Arabic) whereas the other candidate used 'المفاتيح الأجنبية' (a literal translation that is less common in technical database contexts). It also followed all MDX preservation rules, including heading counts and asset path adjustments. The internal link in the current MDX already matches the source's absolute path style.