/* global window,MathJax */
const { spawn } = require('child_process');
const fs = require('fs');
const tmp = require('tmp');
const user = require('./user');
const conf = require('./conf');

/* eslint-disable no-var, prefer-arrow-callback, func-names */
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
/* eslint-disable no-var, prefer-arrow-callback, func-names */

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

      // Use a temp file as wkhtmltopdf can't access /dev/stdout on Amazon EC2 for some reason
      params.push('--run-script', `${waitForJavaScript.toString()}waitForJavaScript()`);
      params.push('--window-status', 'done');
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
      req.pipe(wkhtmltopdf.stdin);
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
        res.end(wkhtmltopdfError || 'Unknown error.');
      }
    });
};
