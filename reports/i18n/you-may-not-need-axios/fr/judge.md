# Translation Judge

- Selected candidate: 84d37ea4004a2a6114aa909b0e6b6f352ef36aba
- Selected model: openrouter/qwen/qwen3-32b:nitro
- Judge model: openrouter/google/gemini-3-flash-preview
- Confidence: low (0.315)

Candidate 84d37ea4004a2a6114aa909b0e6b6f352ef36aba is selected because it provides a high-quality translation that respects the technical tone. While it has several broken internal links in the TOC (due to slugification differences with accents), it is structurally more sound than the 'current' version which had duplicate 'Aperçu' headings and broken links. Candidate b566b4f6175aeffa8433c0165a2ca94be21c5e40 incorrectly modified the Gist paths to include '../' which breaks the component's logic (Gist paths should be owner/id).