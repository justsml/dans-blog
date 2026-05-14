# Translation Judge

- Selected candidate: 891f9e6aa4b4c34c36514074046c7ee0b42d5c2d
- Selected model: openrouter/deepseek/deepseek-v4-flash
- Judge model: openrouter/google/gemini-3-flash-preview

The candidate 891f9e6aa4b4c34c36514074046c7ee0b42d5c2d is the best choice. It correctly handles the asset path requirements (using ../ for images in frontmatter and markdown), preserves the MDX structure and heading counts perfectly, and provides a natural, high-quality Arabic translation that captures Dan's direct and informal tone. The other candidate (e7846213) incorrectly modified the markdown image reference path for [schema_refactor] by adding an extra '../' inside the bracket label reference, which would break the link.