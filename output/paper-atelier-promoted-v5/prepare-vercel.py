"""Package the already-built Astro site for a Vercel preview, without source/env uploads."""
from pathlib import Path
import json, re, shutil

root = Path(__file__).resolve().parents[2]
dist = root / 'dist'
assert (dist / 'index.html').exists()
output = root / '.vercel/output'
output.mkdir(parents=True, exist_ok=True)
static = output / 'static'
if static.exists():
    shutil.rmtree(static)  # Only this script's generated deployment copy.
shutil.copytree(dist, static)

def pattern(path):
    return '^' + re.escape(path).replace(r'\*', '(.*)') + '$'

routes = []
current = None
for line in (dist / '_headers').read_text().splitlines():
    if not line.strip() or line.lstrip().startswith('#'):
        continue
    if line.startswith('/'):
        current = {'src': pattern(line), 'headers': {}, 'continue': True}
        routes.append(current)
    elif current is not None:
        key, value = line.strip().split(':', 1)
        current['headers'][key] = value.strip()
routes.insert(0, {'src': '/.*', 'headers': {'X-Robots-Tag': 'noindex, nofollow'}, 'continue': True})
for line in (dist / '_redirects').read_text().splitlines():
    fields = line.split()
    if len(fields) != 3 or not fields[2].rstrip('!').startswith('3'):
        continue
    source, target, status = fields
    routes.append({'src': pattern(source), 'headers': {'Location': target.replace(':splat', '$1')}, 'status': int(status.rstrip('!'))})
routes.extend([
    {'src': '^/$', 'dest': '/index.html'},
    {'handle': 'filesystem'},
    {'src': '^/(.+?)/?$', 'dest': '/$1/index.html', 'check': True},
    {'src': '/.*', 'dest': '/404.html', 'status': 404},
])
(output / 'config.json').write_text(json.dumps({'version': 3, 'routes': routes}, indent=2) + '\n')
print('Packaged static Astro build, existing cache headers, redirects, and preview noindex header.')
