// Алхам 5 — локал тест сервер (гадны dependency-гүй, Node-ийн http модуль).
//   node server/server.js
//   GET /      -> шууд хариу
//   GET /slow  -> 100 мс хүлээгээд хариу (удаан endpoint-ийн нөлөөг хэмжих)
const http = require('http');

const PORT = Number(process.env.PORT) || 3000;
const SLOW_MS = Number(process.env.SLOW_MS) || 100;

const server = http.createServer((req, res) => {
  const send = (body) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
  };

  if (req.url === '/') return send({ ok: true, endpoint: 'fast' });
  if (req.url === '/slow') {
    return setTimeout(() => send({ ok: true, endpoint: 'slow', delayMs: SLOW_MS }), SLOW_MS);
  }
  res.writeHead(404);
  res.end();
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`Local test server: http://127.0.0.1:${PORT} (/slow = ${SLOW_MS}ms)`);
});
