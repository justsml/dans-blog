# Translation Judge

- Selected candidate: current
- Selected model: current
- Judge model: openrouter/google/gemini-3-flash-preview

The current version is superior in its handling of technical terminology and Hebrew grammar. The candidate commit has a typo in the subtitle ('הוא ה‑USB-C' vs 'הוא ה-USB-C' with a missing space or incorrect character joining), and it translates 'child processes' as 'תהליכי-ילד' which is less standard than 'תהליכים צאצאים' used in the current version. The current version also correctly localizes the series links at the bottom to Hebrew titles, whereas the candidate leaves them in English. Both preserve MDX structure well, but the current version feels more natural and technically accurate for a Hebrew-speaking developer.