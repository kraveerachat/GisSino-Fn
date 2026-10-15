import http from 'node:http';
import path from 'node:path';
import { readFile, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

if (process.env.NODE_ENV === 'production') {
  console.error('GisSino synthetic-data preview is development-only; production startup is refused.');
  process.exit(1);
}
const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 4173);
const mime = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.svg': 'image/svg+xml', '.ttf': 'font/ttf', '.txt': 'text/plain; charset=utf-8' };
const allowed = (name) => name === 'index.html' || name.startsWith('src/') || name.startsWith('assets/');
export const server = http.createServer(async (req, res) => {
  const headers = {
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'no-referrer',
    'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self'; font-src 'self'; img-src 'self' data:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'"
  };
  try {
    if (!['GET', 'HEAD'].includes(req.method)) {
      res.writeHead(405, { ...headers, Allow: 'GET, HEAD' }); res.end(); return;
    }
    const requested = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/+/, '') || 'index.html';
    const segments = requested.split(/[\\/]/);
    const filename = path.resolve(root, requested);
    const canonical = path.relative(root, filename).split(path.sep).join('/');
    if (segments.some(segment => segment.startsWith('.')) || !filename.startsWith(root + path.sep) || !allowed(canonical) || !(await stat(filename)).isFile()) {
      res.writeHead(404, headers); res.end('Not found'); return;
    }
    res.writeHead(200, { ...headers, 'Content-Type': mime[path.extname(filename)] || 'application/octet-stream' });
    res.end(req.method === 'HEAD' ? undefined : await readFile(filename));
  } catch {
    res.writeHead(404, headers); res.end('Not found');
  }
});
server.listen(port, '127.0.0.1', () => console.log(`GisSino design preview: http://127.0.0.1:${server.address().port} (development only)`));
