"""Render every slide in selected PPTX files with macOS Quick Look for visual review."""
from pathlib import Path
import concurrent.futures, re, subprocess, sys, zipfile

destination = Path(sys.argv[1])
destination.mkdir(parents=True, exist_ok=True)
decks = [Path(value) for value in sys.argv[2:]]

def expand(deck):
    with zipfile.ZipFile(deck) as archive:
        files = {name: archive.read(name) for name in archive.namelist()}
    presentation = files["ppt/presentation.xml"].decode()
    slide_ids = re.findall(r'<p:sldId id="[^"]+" r:id="[^"]+"/>', presentation)
    jobs = []
    deck_dir = destination / deck.stem
    deck_dir.mkdir(exist_ok=True)
    for number, slide_id in enumerate(slide_ids, 1):
        single = re.sub(
            r"<p:sldIdLst>.*?</p:sldIdLst>",
            f"<p:sldIdLst>{slide_id}</p:sldIdLst>",
            presentation,
        )
        target = deck_dir / f"slide-{number:03d}.pptx"
        with zipfile.ZipFile(target, "w", zipfile.ZIP_DEFLATED) as archive:
            for name, data in files.items():
                archive.writestr(name, single if name == "ppt/presentation.xml" else data)
        jobs.append(target)
    return jobs

def render(path):
    result = subprocess.run(
        ["qlmanage", "-t", "-s", "1200", "-o", str(path.parent), str(path)],
        capture_output=True,
        text=True,
        timeout=30,
    )
    return path, result.returncode

jobs = [job for deck in decks for job in expand(deck)]
with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
    results = list(pool.map(render, jobs))
failures = [str(path) for path, code in results if code]
print(f"rendered {len(results) - len(failures)} of {len(results)} slides")
if failures:
    print("\n".join(failures))
    raise SystemExit(1)
