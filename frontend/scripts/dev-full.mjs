import http from 'node:http';
import { createServer as createViteServer } from 'vite';
import handler from '../api/cloud.js';

// Local-only runner for the existing Vercel handler and React app.
const port = Number(process.env.RAKSHAK_DEV_PORT || 8081);
let vite;
const server = http.createServer(async (req, res) => {
  if (req.url?.split('?')[0] === '/api/cloud') {
    res.status = code => { res.statusCode = code; return res; };
    res.json = body => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(body)); return res; };
    try {
      let payload = '';
      for await (const chunk of req) {
        payload += chunk;
        if (Buffer.byteLength(payload) > 16000) return res.status(413).json({ error: 'Request too large' });
      }
      req.body = payload ? JSON.parse(payload) : {};
      await handler(req, res);
    } catch { if (!res.writableEnded) res.status(400).json({ error: 'Invalid request' }); }
    return;
  }
  if (req.url?.startsWith('/api/')) { res.writeHead(404); res.end(); return; }
  vite.middlewares(req, res);
});
vite = await createViteServer({ server: { middlewareMode: true, hmr: { server } }, appType: 'spa' });
server.listen(port, '127.0.0.1', () => console.log(`RakshakApp frontend + backend: http://localhost:${port}`));
server.on('error', error => { console.error(error.message); process.exitCode = 1; void vite.close(); });
async function stop() { server.close(); await vite.close(); }
process.on('SIGINT', stop); process.on('SIGTERM', stop);
