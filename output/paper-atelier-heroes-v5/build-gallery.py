from pathlib import Path
import json, shutil, html

root = Path(__file__).resolve().parents[2]
out = root / 'output/paper-atelier-heroes-v5'
pub = root / 'public/designs/paper-hero-proposals-v5'
pub.mkdir(parents=True, exist_ok=True)
rows = json.loads((root / 'output/paper-atelier-heroes-v4/manifest.json').read_text())
revisions = []
for filename in ['data-systems.json', 'quizzes.json', 'learning-work.json']:
    revisions.extend(json.loads((out / filename).read_text()))
by_slug = {x['slug']: x for x in revisions}
assert len(by_slug) == 6
rows = [dict(x, **by_slug.get(x['slug'], {})) for x in rows]
rows.sort(key=lambda x: x['rank'])
assert len(rows) == 10 and len({x['rank'] for x in rows}) == 10
for x in rows:
    for field in ['widePath', 'sourcePath', 'oldPath']:
        path = Path(x[field])
        if path.is_absolute(): path = path.relative_to(root)
        x[field] = str(path)
        assert (root / path).exists(), path
    x['newPublic'] = x['slug'] + '.webp'
    x['oldPublic'] = x['slug'] + '-current' + Path(x['oldPath']).suffix
    shutil.copy2(root / x['widePath'], pub / x['newPublic'])
    shutil.copy2(root / x['oldPath'], pub / x['oldPublic'])
for directory in [out, pub]:
    (directory / 'manifest.json').write_text(json.dumps(rows, indent=2) + '\n')

def notes(x):
    n = x.get('notes', '')
    return (n if isinstance(n, str) else json.dumps(n, ensure_ascii=False)).replace('No square generated; existing covers remain.', '').replace('No square or frontmatter changes.', '').replace('Originalv4 and current covers retained.', 'Previous source artwork is preserved.').strip()

def markdown(local):
    lines = ['# Ten adopted editorial heroes', '', 'Original article covers alongside the approved wide heroes. Built-in image generation; source artwork and exact prompts preserved. Fresh square companions and responsive delivery are now installed.', '', 'Ten approved wide heroes: six revised for broader visual range, four retained. Atmospheric photography, narrative scenes, and gestural prints join the quieter graphic pieces. Includes the homepage Postgres text-search guide.', '']
    for x in rows:
        before = str(root / x['oldPath']) if local else 'https://warm-editorial-preview--danlevy.netlify.app/designs/paper-hero-proposals-v5/' + x['oldPublic']
        after = str(root / x['widePath']) if local else 'https://warm-editorial-preview--danlevy.netlify.app/designs/paper-hero-proposals-v5/' + x['newPublic']
        lines += [f'## {x["rank"]}. {x["title"]}', '', '| Before | Adopted hero |', '| --- | --- |', f'| ![Current cover]({before}) | ![{x["alt"]}]({after}) |', '', f'**{x["concept"]}.** {notes(x)}', '']
    lines += ['[Exact prompts, sources, and review notes](./manifest.json)', '']
    return '\n'.join(lines)
(out / 'proposals.md').write_text(markdown(True))
(pub / 'proposals.md').write_text(markdown(False))
e = html.escape
cards = []
for x in rows:
    cards.append(f'''<article id="rank-{x['rank']}"><h2><span>{x['rank']:02d}</span> {e(x['title'])}</h2><div class="pair"><figure><figcaption>Before</figcaption><img loading="lazy" src="{x['oldPublic']}" alt="Current article cover"></figure><figure><figcaption>Adopted hero · {e(x['concept'])}</figcaption><img loading="lazy" src="{x['newPublic']}" alt="{e(x['alt'])}"></figure></div><p>{e(notes(x))}</p><details><summary>Generation prompt</summary><pre>{e(x['prompt'])}</pre></details></article>''')
overview = '<section class="overview" aria-label="New proposals at a glance">' + ''.join(f'<a href="#rank-{x["rank"]}"><img loading="eager" src="{x["newPublic"]}" alt="{e(x["alt"])}"><span>{x["rank"]}. {e(x["concept"])}</span></a>' for x in rows) + '</section>'
page = '''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Paper atelier — next ten hero proposals</title><style>*{box-sizing:border-box}body{margin:0;background:#eee9df;color:#262b2b;font:16px/1.6 system-ui}body.dark{background:#211f1c;color:#f1eee5}header,main{max-width:1440px;margin:auto;padding:2rem}h1,h2{font-family:Georgia,serif;font-weight:500;line-height:1.2}h1{font-size:clamp(2.5rem,5vw,4.8rem);max-width:19ch;margin:.7rem 0 1rem}header p{max-width:70ch}nav{display:flex;gap:1rem;flex-wrap:wrap;align-items:center}a{color:inherit}select{font:inherit;background:#faf7f1;color:#262b2b;border:1px solid #938c82;padding:.3rem .6rem}main{display:grid;gap:2rem;padding-top:0}article{min-width:0;background:#faf7f1;border:1px solid #cec7bb;padding:1.5rem}body.dark article{background:#2b2823;border-color:#514b42}h2{font-size:1.9rem;margin:0 0 1rem}h2 span{font:13px system-ui;opacity:.6;vertical-align:middle;margin-right:.7rem}.pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.5rem}.overview{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem}.overview a{text-decoration:none;font-size:.75rem;min-width:0}.overview span{display:block;margin-top:.4rem}figure{margin:0;min-width:0}figcaption{font-size:.8rem;margin-bottom:.6rem}img{display:block;width:100%;aspect-ratio:16/9;object-fit:contain;background:#ddd6cb}body.dark img{background:#211f1c}article p{font-size:.9rem;max-width:95ch}summary{cursor:pointer}pre{white-space:pre-wrap;overflow-wrap:anywhere;font:13px/1.6 system-ui}a:focus-visible,summary:focus-visible,select:focus-visible{outline:2px solid currentColor;outline-offset:4px}@media(max-width:700px){header,main{padding:1rem}.overview{grid-template-columns:repeat(2,minmax(0,1fr))}.pair{grid-template-columns:1fr;gap:1rem}article{padding:1rem}h2{font-size:1.5rem}}@media(prefers-color-scheme:dark){body:not(.light){background:#211f1c;color:#f1eee5}body:not(.light) article{background:#2b2823;border-color:#514b42}body:not(.light) img{background:#211f1c}}</style></head><body><header><nav><a href="/">Blog preview</a><a href="../paper-hero-proposals-v4/">Earlier draft</a><a href="proposals.md">Side-by-side Markdown</a><a href="manifest.json">Prompts & sources</a><label for="theme">◐</label><select id="theme" aria-label="Color theme"><option value="">System</option><option value="light">Light</option><option value="dark">Dark</option></select></nav><h1>Ten adopted covers, a wider visual range.</h1><p>These ten approved heroes are now installed with fresh square companions and responsive delivery. Six revised treatments bring atmosphere, natural settings, photography, and gestural print; four earlier compositions remain. Original covers are preserved below for comparison.</p></header><main>''' + overview + ''.join(cards) + '''</main><script>document.getElementById('theme').onchange=e=>document.body.className=e.target.value;</script></body></html>'''
(pub / 'index.html').write_text(page)
(out / 'index.html').write_text(page.replace('src="', 'src="../../public/designs/paper-hero-proposals-v5/'))
previous = root / 'public/designs/paper-hero-proposals-v4/index.html'
s = previous.read_text()
link = '<a href="../paper-hero-proposals-v5/">More varied revision →</a>'
if link not in s: previous.write_text(s.replace('<nav>', '<nav>' + link, 1))
print('Created ten-image comparison gallery and Markdown.')
