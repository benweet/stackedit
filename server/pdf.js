/* global window,MathJax */
const { spawn } = require('child_process');
const dns = require('dns');
const fs = require('fs');
const net = require('net');
const tmp = require('tmp');
const user = require('./user');
const conf = require('./conf');

function waitForJavaScript() {
  if (window.MathJax) {
    // Amazon EC2: fix TeX font detection
    MathJax.Hub.Register.StartupHook('HTML-CSS Jax Startup', function () {
      var htmlCss = MathJax.OutputJax['HTML-CSS'];
      htmlCss.Font.checkWebFont = function (check, font, callback) {
        if (check.time(callback)) {
          return;
        }
        if (check.total === 0) {
          htmlCss.Font.testFont(font);
          setTimeout(check, 200);
        } else {
          callback(check.STATUS.OK);
        }
      };
    });
    MathJax.Hub.Queue(function () {
      window.status = 'done';
    });
  } else {
    setTimeout(function () {
      window.status = 'done';
    }, 2000);
  }
}

const authorizedPageSizes = [
  'A3',
  'A4',
  'Legal',
  'Letter',
];

const readJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
};


function ipIsPrivate(ip) {
  if (net.isIPv4(ip)) {
    const p = ip.split('.').map(Number);
    if (p[0] === 0 || p[0] === 10 || p[0] === 127) return true;
    if (p[0] === 169 && p[1] === 254) return true;              // link-local / metadata
    if (p[0] === 172 && p[1] >= 16 && p[1] <= 31) return true;
    if (p[0] === 192 && p[1] === 168) return true;
    if (p[0] === 100 && p[1] >= 64 && p[1] <= 127) return true; // CGNAT
    if (p[0] === 192 && p[1] === 0 && p[2] === 0) return true;
    if (p[0] === 198 && (p[1] === 18 || p[1] === 19)) return true;
    if (p[0] >= 224) return true;                              // multicast / reserved
    return false;
  }
  if (net.isIPv6(ip)) {
    const v = ip.toLowerCase();
    if (v === '::1' || v === '::') return true;
    if (/^f[cd]/.test(v)) return true;                        
    if (/^fe[89ab]/.test(v)) return true;                      
    const m = v.match(/^::ffff:(\d+\.\d+\.\d+\.\d+)$/);
    if (m) return ipIsPrivate(m[1]);
    return false;
  }
  return true;                                                
}

function validateUrl(rawUrl, cb) {
  let parsed;
  try {
    parsed = new URL(String(rawUrl));
  } catch (e) {
    return cb(new Error('Invalid url'));
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
    return cb(new Error('Only http/https urls are allowed'));
  }
  const host = parsed.hostname.replace(/^\[|\]$/g, '');
  if (host === 'localhost' || /\.localhost$/i.test(host) || host === 'metadata.google.internal') {
    return cb(new Error('Blocked host'));
  }
  if (net.isIP(host)) {
    return ipIsPrivate(host) ? cb(new Error('Blocked address')) : cb(null);
  }
  dns.lookup(host, { all: true }, function (err, addresses) {
    if (err) return cb(err);
    if (!addresses || !addresses.length) return cb(new Error('Unresolvable host'));
    for (let i = 0; i < addresses.length; i++) {
      if (ipIsPrivate(addresses[i].address)) return cb(new Error('Blocked address'));
    }
    cb(null);
  });
}

// Extract resource URLs from the submitted HTML and validate them one by one.
function validateHtmlResources(html, cb) {
  const urls = [];
  const re = /(?:src|href)\s*=\s*["']([^"']+)["']|url\(\s*["']?([^"')]+)["']?\s*\)/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const u = (m[1] || m[2] || '').trim();
    if (u && urls.indexOf(u) === -1) urls.push(u);
  }
  let i = 0;
  (function next() {
    if (i >= urls.length) return cb(null);
    const u = urls[i++];
    if (/^file:/i.test(u)) return cb(new Error('Blocked file: url'));
    if (!/^https?:/i.test(u)) return next();          // data:, #, relative -> leave to the renderer
    validateUrl(u, (err) => { if (err) return cb(err); next(); });
  })();
}

exports.generate = (req, res) => {
  let wkhtmltopdfError = '';
  user.checkSponsor(req.query.idToken)
    .then((isSponsor) => {
      if (!isSponsor) {
        throw new Error('unauthorized');
      }
      return new Promise((resolve, reject) => {
        tmp.file((err, filePath, fd, cleanupCallback) => {
          if (err) {
            reject(err);
          } else {
            resolve({
              filePath,
              cleanupCallback,
            });
          }
        });
      });
    })
    .then(({ filePath, cleanupCallback }) => new Promise((resolve, reject) => {
      let finished = false;

      function onError(err) {
        finished = true;
        cleanupCallback();
        reject(err);
      }
      const options = readJson(req.query.options);
      const params = [];

      // Margins
      const marginTop = parseInt(`${options.marginTop}`, 10);
      params.push('-T', Number.isNaN(marginTop) ? 25 : marginTop);
      const marginRight = parseInt(`${options.marginRight}`, 10);
      params.push('-R', Number.isNaN(marginRight) ? 25 : marginRight);
      const marginBottom = parseInt(`${options.marginBottom}`, 10);
      params.push('-B', Number.isNaN(marginBottom) ? 25 : marginBottom);
      const marginLeft = parseInt(`${options.marginLeft}`, 10);
      params.push('-L', Number.isNaN(marginLeft) ? 25 : marginLeft);

      // Header
      if (options.headerCenter) {
        params.push('--header-center', `${options.headerCenter}`);
      }
      if (options.headerLeft) {
        params.push('--header-left', `${options.headerLeft}`);
      }
      if (options.headerRight) {
        params.push('--header-right', `${options.headerRight}`);
      }
      if (options.headerFontName) {
        params.push('--header-font-name', `${options.headerFontName}`);
      }
      if (options.headerFontSize) {
        params.push('--header-font-size', `${options.headerFontSize}`);
      }

      // Footer
      if (options.footerCenter) {
        params.push('--footer-center', `${options.footerCenter}`);
      }
      if (options.footerLeft) {
        params.push('--footer-left', `${options.footerLeft}`);
      }
      if (options.footerRight) {
        params.push('--footer-right', `${options.footerRight}`);
      }
      if (options.footerFontName) {
        params.push('--footer-font-name', `${options.footerFontName}`);
      }
      if (options.footerFontSize) {
        params.push('--footer-font-size', `${options.footerFontSize}`);
      }

      // Page size
      params.push('--page-size', !authorizedPageSizes.includes(options.pageSize) ? 'A4' : options.pageSize);

      // Defence in depth: no local-file access, no JavaScript-initiated loads
      params.push('--disable-local-file-access');
      params.push('--disable-javascript');

      // Use a temp file as wkhtmltopdf can't access /dev/stdout on Amazon EC2 for some reason
      params.push('--run-script', `${waitForJavaScript.toString()}waitForJavaScript()`);
      params.push('--window-status', 'done');

      // Buffer the HTML so we can validate its resource URLs before rendering.
      let body = '';
      req.on('data', (chunk) => { body += chunk; });
      req.on('error', onError);
      req.on('end', () => {
        validateHtmlResources(body, (err) => {
          if (err) {
            cleanupCallback();
            reject(err);
            return;
          }

          const wkhtmltopdf = spawn(conf.values.wkhtmltopdfPath, params.concat('-', filePath), {
            stdio: [
              'pipe',
              'ignore',
              'pipe',
            ],
          });
          let timeoutId = setTimeout(function () {
            timeoutId = null;
            wkhtmltopdf.kill();
          }, 50000);
          wkhtmltopdf.on('error', onError);
          wkhtmltopdf.stdin.on('error', onError);
          wkhtmltopdf.stderr.on('data', (data) => {
            wkhtmltopdfError += `${data}`;
          });
          wkhtmltopdf.on('close', (code) => {
            if (!finished) {
              clearTimeout(timeoutId);
              if (!timeoutId) {
                cleanupCallback();
                reject(new Error('timeout'));
              } else if (code) {
                cleanupCallback();
                reject();
              } else {
                res.set('Content-Type', 'application/pdf');
                const readStream = fs.createReadStream(filePath);
                readStream.on('open', () => readStream.pipe(res));
                readStream.on('close', () => cleanupCallback());
                readStream.on('error', () => {
                  cleanupCallback();
                  reject();
                });
              }
            }
          });
          wkhtmltopdf.stdin.end(body);
        });
      });
    }))
    .catch((err) => {
      const message = err && err.message;
      if (message === 'unauthorized') {
        res.statusCode = 401;
        res.end('Unauthorized.');
      } else if (message === 'timeout') {
        res.statusCode = 408;
        res.end('Request timeout.');
      } else {
        res.statusCode = 400;
        res.end(wkhtmltopdfError || message || 'Unknown error.');
      }
    });
};
