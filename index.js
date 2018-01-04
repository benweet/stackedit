const env = require('./config/prod.env');

Object.entries(env).forEach(([key, value]) => {
  if (!process.env[key]) {
    process.env[key] = JSON.parse(value);
  }
});

const http = require('http');
const https = require('https');
const path = require('path');
const express = require('express');
const fs = require('fs');

const app = express();

require('./server')(app, process.env.SERVE_V4);

let port = parseInt(process.env.PORT || 8080, 10);
if (port === 443) {
  const credentials = {
    key: fs.readFileSync(path.join(__dirname, 'ssl.key'), 'utf8'),
    cert: fs.readFileSync(path.join(__dirname, 'ssl.crt'), 'utf8'),
    ca: fs.readFileSync(path.join(__dirname, 'ssl.ca'), 'utf8').split('\n\n'),
  };
  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(port, null, () => {
    console.log('HTTPS server started: https://localhost');
  });
  port = 80;
}
const httpServer = http.createServer(app);
httpServer.listen(port, null, () => {
  console.log(`HTTP server started: http://localhost:${port}`);
});
