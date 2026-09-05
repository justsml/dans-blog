import { resolve, sep } from 'node:path';
const root = resolve(import.meta.dir, '..');
const server = Bun.serve({hostname:'127.0.0.1', port:Number(process.env.TALKS_PORT || 4343), async fetch(request) {
  const url = new URL(request.url);
  let path: string;
  try { path = decodeURIComponent(url.pathname); } catch { return new Response('Bad URL', {status:400}); }
  if (path === '/') return Response.redirect(new URL('/reveal-talks/index.html',url),302);
  let full = resolve(root, '.' + path);
  if (!full.startsWith(root + sep)) return new Response('Forbidden',{status:403});
  if (path.endsWith('/')) full = resolve(full,'index.html');
  const file = Bun.file(full);
  return await file.exists() ? new Response(file) : new Response('Not found',{status:404});
}});
console.log(`Talks: http://localhost:${server.port}/reveal-talks/index.html`);
