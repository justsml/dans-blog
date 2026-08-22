---
name: blog-hero-images
description: Art-direct and generate DanLevy.net blog hero images plus compositionally matched square thumbnails. Use for analyzing a target post, exploring 3-5 varied visual concepts, generating wide and square image families, or updating post image frontmatter.
---

# Blog hero images

Create an image family that explains the post's idea at a glance. Treat the wide hero and square thumbnail as two compositions of the same concept, not an arbitrary crop and not unrelated artwork.

Use the built-in `imagegen` skill and image generation tool for raster generation. Read `references/visual-language.md` before writing prompts. Read the target `index.mdx` in full and inspect its existing images before generating anything.

## Workflow

1. Resolve the target post directory. Keep every project-bound image beside its `index.mdx`.
2. Read the post and write a private art-direction brief containing:
   - the one-sentence thesis
   - 3-7 concrete nouns or mechanisms in the post
   - 2-4 tensions, failures, or surprising reversals
   - visual cliches to avoid
   - any layout, palette, or subject constraints from existing assets
3. Inspect 2-4 relevant post image families. Prefer recent posts with similar subject matter or rhetorical shape. Use `view_image` on contact sheets or individual images. Do not imitate one image closely.
4. Develop 3-5 candidate concepts before generation. Default to five when the user asks for a range. Each candidate must use a different metaphor, setting, or image-making mode. Color changes do not count as variation.
5. For each candidate, record a short concept name, the connection to the thesis, the image-generation prompt, and square-composition notes. Avoid a long pitch deck.
6. Generate each wide candidate with a separate image-generation call. Do not ask the model for a contact sheet. Generate art without baked-in title text, logos, watermarks, fake UI copy, or illegible labels.
7. Inspect every output. Reject candidates with generic AI imagery, accidental text, broken causal logic, weak focal hierarchy, or a subject that cannot survive a square composition. If fewer than three credible candidates remain, generate replacements.
8. Present the viable candidates with filenames and a concise recommendation. If the user has not chosen a winner, stop before creating finals unless they explicitly authorized autonomous selection.
9. For the selected concept, generate a fresh square image using the wide image as a reference. Preserve the central metaphor, materials, palette, lighting, and recognizable objects. Recompose for 1:1. Do not merely center-crop unless the source already has a crop-safe composition.
10. Save final sources beside the post as `wide.<source-ext>` and `square.<source-ext>`. Add `desktop-social.<source-ext>` when the post uses `social_image` or the user requests it. Target 1600x900, 800x800, and 1200x630 respectively when the generation path supports those dimensions.
11. Convert only the target post directory with `bun run webp-images -- <post-directory>`. The command removes successfully converted source files.
12. Inspect the final wide and square files. Check that both read at small sizes, have no accidental text, and still communicate the same idea.
13. Update frontmatter only when requested or when creating the full asset set for a post:

```yaml
social_image: ./desktop-social.webp
cover_full_width: ./wide.webp
cover_mobile: ./square.webp
cover_icon: ./square.webp
```

14. Run `bun run content:check` after changing frontmatter. Report the final paths, selected concept, generation prompts, and whether the square was regenerated or cropped.

## Prompt construction

Write prompts as production briefs. Include:

- editorial purpose and target article idea
- central physical scene or metaphor
- objects and their relationships
- composition and focal point
- material, lighting, palette, and image-making mode
- crop or negative-space needs
- explicit exclusions

Use this skeleton only as needed:

```text
Editorial hero image for a technical essay about [thesis].
Depict [physical metaphor and relationship between objects].
Composition: [focal point, camera/framing, negative space, crop safety].
Visual language: [specific materials, image-making mode, light, restrained palette].
The image should feel intelligent, tactile, and slightly wry rather than futuristic or corporate.
No words, labels, logos, watermarks, code text, floating holograms, glowing brains, or generic AI circuitry.
```

For the square derivative, name the wide image as a style and concept reference, then specify the recomposition:

```text
Create a square companion to the referenced wide hero. Preserve [metaphor, objects, materials, palette, lighting]. Recompose the scene around one strong central silhouette for a 1:1 thumbnail. Simplify peripheral detail rather than shrinking the wide composition. Do not add new narrative elements. No text or logos.
```

## Candidate diversity

Choose 3-5 lanes that fit the post. Do not force every lane into every job:

- tactile machine or test bench
- miniature physical system or logistics world
- editorial still life with evidence or operational residue
- restrained diagrammatic or print-like abstraction
- failure scene with an obvious physical consequence
- familiar non-technical system that mirrors the technical mechanism

At least one candidate should be simple enough to recognize at 200px. At least one may be stranger or riskier. Reject concepts whose explanation is more interesting than the resulting picture.

## File handling

- Keep exploratory files descriptive: `hero-candidate-01-<concept>.webp`.
- Never overwrite an existing final without explicit permission. Use `wide-v2.webp` and `square-v2.webp` when needed.
- Keep source generations until selection is complete. Remove nothing the user did not ask to remove.
- Prefer a regenerated square. Use ImageMagick cropping only for already crop-safe art or when the user explicitly wants a derived crop.
