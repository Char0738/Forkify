const http = require('http');
const https = require('https');
const { URL } = require('url');

const server = http.createServer(async (req, res) => {
  const targetUrl = new URL(req.url.slice(1));
  const targetProtocol = targetUrl.protocol === 'https:' ? https : http;

  const proxyReq = targetProtocol.request({
    hostname: targetUrl.hostname,
    path: targetUrl.pathname + targetUrl.search,
    method: req.method,
    headers: {
      ...req.headers,
      'host': targetUrl.hostname,
    },
  }, proxyRes => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res);
  });

  req.pipe(proxyReq);
});

server.listen(8080, () => {
  console.log('Proxy server running on port 8080');
});
