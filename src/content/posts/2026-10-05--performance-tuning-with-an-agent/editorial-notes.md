# Draft scope and comparison

New companion draft created October 5, 2026. Original `2026-09-15--trust-but-throttle/index.mdx` is preserved. New draft is private/unpublished and has no redirects or missing image references.

Title: Give Your Agent a Profiler. Practitioner-level guide organized around workload, browser instrumentation, CPU stacks, waits, GPU timelines, and experiment acceptance. Broader CLI recommendations are explicitly distinguished from tools used on Emoji Brain.

## Evidence and research

Reviewed the existing article and its editorial notes, plus live local Emoji Brain `docs/performance/selection-scrolling.md` and `scroll-rejected-containment-runs.json`. Historical results remain scoped to their original September experiments; no new performance measurements were run.

Primary documentation researched October 5, 2026. Inline article links cover Chrome Performance/Rendering panels, Playwright CDPSession, CDP Network/Emulation/Performance/Profiler/Tracing/SystemInfo, hyperfine, samply, Linux perf, Node CPU profiling and perf integration, py-spy, sysstat, iotop, strace, ltrace, BCC, NVIDIA monitoring and Nsight tools, Apple Metal tools, ROCm, and Perfetto. Current CDP network argument shapes were also checked against the canonical `ChromeDevTools/devtools-protocol` browser_protocol.json.

Code examples are teaching examples, not excerpts represented as the original harness. CLI commands were checked against docs, not executed against arbitrary local processes. No tools installed, profiler privileges changed, or external performance scans run.

## Image concepts

No hero generated or referenced yet. Three distinct directions for later comparison:

1. **The instrument bench:** an engineer's workbench with a flame graph, timing strips, and a small sticker grid; warm paper, precise ink, amber/teal. Emphasize measured work rather than robot imagery.
2. **The evidence loop:** four physical cards arranged in a loop, showing a workload, sampled stacks, a small code patch, and a timing comparison. Minimal geometric editorial illustration with a central artifact tray.
3. **The bottleneck cutaway:** a pipeline with CPU gears, disk queue, and GPU lanes, with one constrained segment highlighted. Technical cutaway drawing, restrained color, no implication that all stages are busy at once.

If artwork is produced: wide.webp 1600x900, square.webp 800x800, desktop-social.webp 1200x630. Keep the central argument legible in square crop; title remains HTML.

## Validation

- Focused MDX compilation passed after final edits.
- `bun run content:check`: 0 errors, 110 existing warnings; no warnings for the new draft.
- `git diff --check` passed.
- Original article SHA-256 stayed `43e1ae00b14d146dd7235edd1f0d41c2bef69e70633e26ea86fd5c51ca7d82a3`.
- Full site build and live browser rendering were not run. Draft remains excluded from published routes.

## Revision, October 7, 2026

Rewritten for coherence. The old opening (a benchmark that jumped to the bottom) argued for better workloads, not profilers, so the title's thesis never landed. New spine: benchmark = scoreboard, profile = map; agents without a map optimize from folklore (`content-visibility`, `will-change`, both rejected), while the real win came from a trace (animated WebPs invalidating tiles; raster 1,859 → 844 ms, from emoji-brain commit 9ab1f62). The export+search workload example was replaced with the actual scroll workload, and the invalid first baseline (unsettled Home/End scroll) is now the "can't be fooled" example. The tool catalog was condensed into one question → tool table plus the CPU-idle → waits pivot. Numbers verified against `docs/performance/selection-scrolling.md` and commit messages; no new measurements were run.
