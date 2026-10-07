from pathlib import Path
import json, shutil, html

root = Path(__file__).resolve().parents[2]
out = root / 'output/paper-atelier-heroes-v3'
pub = root / 'public/designs/paper-hero-proposals-v3'
pub.mkdir(parents=True, exist_ok=True)
rows = []
for filename in ['data-systems.json', 'quizzes.json', 'learning-work.json']:
    rows.extend(json.loads((out / filename).read_text()))
rows.sort(key=lambda x: x['rank'])
assert len(rows) == 12 and len({x['rank'] for x in rows}) == 12
rows = [x for x in rows if x['slug'] != 'llm-connection-strings']
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
    return n if isinstance(n, str) else json.dumps(n, ensure_ascii=False)

def markdown(local):
    lines = ['# Eleven new proposals; LLM connection strings retained', '', 'Current article covers alongside new wide proposals. Built-in image generation; source artwork and exact prompts preserved. These wide proposals are adopted on the blog, with freshly recomposed high-resolution square companions.', '', 'LLM connection strings: keep the existing cover; the rejected proposal has been removed from this comparison.', '']
    for x in rows:
        before = str(root / x['oldPath']) if local else 'https://warm-editorial-preview--danlevy.netlify.app/designs/paper-hero-proposals-v3/' + x['oldPublic']
        after = str(root / x['widePath']) if local else 'https://warm-editorial-preview--danlevy.netlify.app/designs/paper-hero-proposals-v3/' + x['newPublic']
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
page = '''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,follow"><title>Paper atelier — eleven more hero proposals</title><style>*{box-sizing:border-box}body{margin:0;background:#eee9df;color:#262b2b;font:16px/1.6 system-ui}body.dark{background:#211f1c;color:#f1eee5}header,main{max-width:1440px;margin:auto;padding:2rem}h1,h2{font-family:Georgia,serif;font-weight:500;line-height:1.2}h1{font-size:clamp(2.5rem,5vw,4.8rem);max-width:19ch;margin:.7rem 0 1rem}header p{max-width:70ch}nav{display:flex;gap:1rem;flex-wrap:wrap;align-items:center}a{color:inherit}select{font:inherit;background:#faf7f1;color:#262b2b;border:1px solid #938c82;padding:.3rem .6rem}main{display:grid;gap:2rem;padding-top:0}article{min-width:0;background:#faf7f1;border:1px solid #cec7bb;padding:1.5rem}body.dark article{background:#2b2823;border-color:#514b42}h2{font-size:1.9rem;margin:0 0 1rem}h2 span{font:13px system-ui;opacity:.6;vertical-align:middle;margin-right:.7rem}.pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.5rem}.overview{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem}.overview a{text-decoration:none;font-size:.75rem;min-width:0}.overview span{display:block;margin-top:.4rem}figure{margin:0;min-width:0}figcaption{font-size:.8rem;margin-bottom:.6rem}img{display:block;width:100%;aspect-ratio:16/9;object-fit:contain;background:#ddd6cb}body.dark img{background:#211f1c}article p{font-size:.9rem;max-width:95ch}summary{cursor:pointer}pre{white-space:pre-wrap;overflow-wrap:anywhere;font:13px/1.6 system-ui}a:focus-visible,summary:focus-visible,select:focus-visible{outline:2px solid currentColor;outline-offset:4px}@media(max-width:700px){header,main{padding:1rem}.overview{grid-template-columns:repeat(2,minmax(0,1fr))}.pair{grid-template-columns:1fr;gap:1rem}article{padding:1rem}h2{font-size:1.5rem}}@media(prefers-color-scheme:dark){body:not(.light){background:#211f1c;color:#f1eee5}body:not(.light) article{background:#2b2823;border-color:#514b42}body:not(.light) img{background:#211f1c}}</style></head><body><header><nav><a href="/">Blog preview</a><a href="../paper-hero-proposals-v2/">Previous five</a><a href="proposals.md">Side-by-side Markdown</a><a href="manifest.json">Prompts & sources</a><label for="theme">◐</label><select id="theme" aria-label="Color theme"><option value="">System</option><option value="light">Light</option><option value="dark">Dark</option></select></nav><h1>Eleven more editorial perspectives.</h1><p>A new set spanning databases, teaching, quizzes, automation, and the blog itself. Each proposal explores its article through paper, photography, print, or sculpture. Compare against the current artwork below.</p><p><strong>LLM connection strings: existing cover retained.</strong> Its rejected proposal has been removed. <a href="llm-connection-strings-current.webp">View the retained cover</a>.</p></header><main>''' + overview + ''.join(cards) + '''</main><script>document.getElementById('theme').onchange=e=>document.body.className=e.target.value;</script></body></html>'''
(pub / 'index.html').write_text(page)
(out / 'index.html').write_text(page.replace('src="', 'src="../../public/designs/paper-hero-proposals-v3/'))
previous = root / 'public/designs/paper-hero-proposals-v2/index.html'
s = previous.read_text()
link = '<a href="../paper-hero-proposals-v3/">Next eleven →</a>'
if link not in s: previous.write_text(s.replace('<nav>', '<nav>' + link, 1))
for source in [pub, previous.parent]:
    shutil.copytree(source, root / 'dist/designs' / source.name, dirs_exist_ok=True)
print('Created eleven-image comparison gallery and Markdown.')
