# DanLevy.net visual language

## Current direction: Warm Editorial (2026-10-02)

The homepage exploration selected a quieter editorial image aesthetic. Default to a believable photograph of a carefully composed object or small physical system, rather than a busy miniature world, saturated illustration, or a rendered dashboard. Use the Warm Editorial mockups in `output/design-mockups/2026-10-02/` as mood references, not sources of factual copy or a template to reproduce. Their generated slogans and labels are not part of the approved image language.

The desired feeling is an independent technical journal: observant, tactile, intelligent, and a little wry. The current AI-hiring bridge and LLM-judge measurement apparatus are useful source examples. Keep the physical metaphor while reducing prop count and visual noise.

### Refined photographic direction

- One subject, one mechanism, one readable consequence. A load on a bridge, an instrument calibrating a measurement, a gate dividing routes, or ordered drawers holding evidence should communicate without a legend.
- Real-feeling wood, paper, stone, oxidized steel, brass, glass, and enamel. Show subtle wear and construction detail, not gratuitous grime or perfect plastic.
- Warm ivory, putty, charcoal, muted green, tobacco, and small rust/terracotta accents. Choose colors because of the objects; avoid blanket sepia, monochrome nostalgia, candy palettes, and neon.
- Broad directional light with gentle falloff and legible shadows. Use a neutral studio or quiet workshop backdrop, with depth of field that keeps the mechanism sharp.
- Prefer a straight-on, shallow three-quarter, or overhead view. Avoid dramatic wide-angle distortion, hyper-shallow focus, smoke, and cinematic darkness that hides the point.
- Give objects breathing room. Aim for one dominant silhouette and two or three meaningful supporting objects. Negative space is compositional; do not reserve a giant empty area for a baked-in title.
- Wit comes from a physical tension: an unexpectedly small support carrying a load, a calibration tool judging its own readings, or an orderly system revealing a bottleneck. No pasted-on cat mascots unless the article earns them.

### Pairing with the design

Images are rectangular editorial plates with clean edges. Do not bake shadows, rounded cards, gradients, borders, title typography, or UI into the asset. The layout owns those treatments. Use the same image on light and dark themes; retain detail at both extremes and make the subject distinct from its backdrop. Do not invert or darken photographs for dark mode.

For wide heroes, preserve the mechanism in 16:9 and a shallow 2.25:1 crop. For square thumbnails, recompose around its defining relationship rather than shrinking the whole set. Check at 200px and 96px, and on both ivory and warm charcoal. A dark corner is fine; a black object disappearing into black is not.

### Prompt example

```text
Editorial object photograph for a technical essay about evaluating AI judgment.
A small mechanical balance on a warm limestone workbench, with a precisely
machined reference weight on one side and several inconsistent weights on the
other. The difference in balance is immediately visible. Restrained brass,
oxidized steel, and pale paper; one muted rust accent. Gentle directional window
light, readable shadows, quiet neutral background, sharp mechanism, subtle wear.
Shallow three-quarter view with generous breathing room and a strong silhouette.
The scene must read at thumbnail size and support both wide and square versions.
No words, handwritten notes, inscriptions, labels, logos, fake code, interface,
neon, decorative circuitry, or extra symbolic props. No baked-in title or border.
```

Diagrams, infographics, and screenshots still belong in the article when they teach a mechanism precisely. Keep labels in editable SVG/HTML or real captured UI; they are not the default cover-art style.

## What the current imagery does well

Recent image families turn software behavior into physical systems. Model routing becomes a rail yard, marble run, kitchen pass, board game, or harbor. Reasoning effort becomes a test rig, amplifier, switchboard, or instrument panel. Connection strings become tagged wires, drawers, a workbench, or a notebook diagram.

The useful pattern is not "retro machinery." It is visible causality. A reader can see inputs moving, choices being made, bottlenecks forming, evidence accumulating, or a control changing system behavior.

Favor:

- tactile materials such as paper, brass, enamel, wood, glass, ink, cable, and painted metal
- miniature worlds and familiar operational settings
- one legible mechanism with a clear focal point
- restrained editorial surrealism
- warm neutrals with a few purposeful accent colors
- overhead, orthographic, cutaway, or straight-on compositions when they clarify relationships
- wit that comes from the metaphor rather than visual jokes pasted onto it

Use with care:

- dense control panels, since they can turn into decorative noise
- diagrams with generated labels, since image models produce bad text
- literal terminals or code, since they age quickly and read poorly as thumbnails
- photoreal people, since they often turn a technical idea into stock photography

Avoid:

- glowing brains, robot heads, circuit-board faces, holographic dashboards, and neon data tunnels
- generic blue-purple cyberpunk lighting
- floating logos, provider names, model names, or faux interface text
- a laptop on a desk as the whole idea
- five unrelated symbols orbiting a central object
- smooth corporate 3D blobs and glossy SaaS illustration
- apocalyptic drama unless the article earns it

## Translate prose into pictures

Look for verbs and relationships before nouns. "Routes" suggests tracks, gates, dispatch, sorting, or a kitchen pass. "Retries" suggests loops, returns, duplicate tickets, or a jammed mechanism. "Evidence" suggests folders, specimens, tags, chain of custody, or an inspection table.

Abstract claims need a physical consequence. If the post says a cheap setting causes more tool calls, show the supposedly low setting feeding a sprawling external machine. If it says a router must be evaluated, show routes entering a test fixture with observable outcomes. Do not illustrate the title literally when the article's twist offers a better scene.

## Wide and square relationship

The wide image may show the system. The square image should show its emblematic mechanism.

- Keep subject identity, material, palette, and light consistent.
- Recompose rather than shrink.
- Reduce side stories and background objects in the square.
- Use one strong central shape with clean edges.
- Check the square at roughly 200px before accepting it.

## Repository examples worth inspecting

- `2026-07-03--dont-fear-the-model-router`: broad metaphor search across transport, games, food service, and mechanical systems.
- `2026-07-28--less-effort-please`: analog measurement and control imagery tied to the article's benchmark result.
- `2026-01-30--llm-connection-strings`: physical analogies for configuration and connection syntax.

Treat these as evidence of taste, not templates to copy.
