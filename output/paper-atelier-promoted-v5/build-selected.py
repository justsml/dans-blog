from pathlib import Path
import json
root=Path(__file__).resolve().parents[2]
directory=root/'output/paper-atelier-promoted-v5'
rows=json.loads((directory/'manifest.json').read_text())
proposals={x['slug']:x for x in json.loads((root/'output/paper-atelier-heroes-v5/manifest.json').read_text())}
lines=['# Adopted wide and freshly recomposed square heroes','','These ten approved families are installed across English and ten shared locales. Squares are fresh compositions using the approved wide references; native dimensions are preserved without upscaling.','']
for row in rows:
 proposal=proposals[row['slug']]
 lines += [f'## {proposal["title"]}','','| Wide hero | Square mobile hero |','| --- | --- |',f'| ![{proposal["alt"]}]({root/row["widePath"]}) | ![Fresh square composition]({root/row["squarePath"]}) |','',f'Native square: {row["squareDimensions"][0]} × {row["squareDimensions"][1]}. Search icon: 160px.','']
(directory/'selected.md').write_text('\n'.join(lines))
print(f'Wrote {len(rows)} wide/square comparison rows.')
