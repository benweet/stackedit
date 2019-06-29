/* global window */
const { spawn } = require('child_process');
const fs = require('fs');
const tmp = require('tmp');
const user = require('./user');
const conf = require('./conf');

const outputFormats = {
  asciidoc: 'text/plain',
  context: 'application/x-latex',
  epub: 'application/epub+zip',
  epub3: 'application/epub+zip',
  latex: 'application/x-latex',
  odt: 'application/vnd.oasis.opendocument.text',
  pdf: 'application/pdf',
  rst: 'text/plain',
  rtf: 'application/rtf',
  textile: 'text/plain',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

const highlightStyles = [
  'pygments',
  'kate',
  'monochrome',
  'espresso',
  'zenburn',
  'haddock',
  'tango',
];

const readJson = (str) => {
  try {
    return JSON.parse(str);
  } catch (e) {
    return {};
  }
};

exports.generate = (req, res) => {
  let pandocError = '';
  const outputFormat = Object.prototype.hasOwnProperty.call(outputFormats, req.query.format)
    ? req.query.format
    : 'pdf';
  user.checkSponsor(req.query.idToken)
    .then((isSponsor) => {
      if (!isSponsor) {
        throw new Error('unauthorized');
      }

      return new Promise((resolve, reject) => {
        tmp.file({
          postfix: `.${outputFormat}`,
        }, (err, filePath, fd, cleanupCallback) => {
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
      const options = readJson(req.query.options);
      const metadata = readJson(req.query.metadata);
      const params = [];

      params.push('--latex-engine=xelatex');
      params.push('--webtex=http://chart.apis.google.com/chart?cht=tx&chf=bg,s,FFFFFF00&chco=000000&chl=');
      if (options.toc) {
        params.push('--toc');
      }
      options.tocDepth = parseInt(options.tocDepth, 10);
      if (!Number.isNaN(options.tocDepth)) {
        params.push('--toc-depth', options.tocDepth);
      }
      options.highlightStyle = highlightStyles.includes(options.highlightStyle) ? options.highlightStyle : 'kate';
      params.push('--highlight-style', options.highlightStyle);
      Object.keys(metadata).forEach((key) => {
        params.push('-M', `${key}=${metadata[key]}`);
      });

      let finished = false;

      function onError(error) {
        finished = true;
        cleanupCallback();
        reject(error);
      }

      const format = outputFormat === 'pdf' ? 'latex' : outputFormat;
      params.push('-f', 'json', '-t', format, '-o', filePath);
      const pandoc = spawn(conf.values.pandocPath, params, {
        stdio: [
          'pipe',
          'ignore',
          'pipe',
        ],
      });
      let timeoutId = setTimeout(() => {
        timeoutId = null;
        pandoc.kill();
      }, 50000);
      pandoc.on('error', onError);
      pandoc.stdin.on('error', onError);
      pandoc.stderr.on('data', (data) => {
        pandocError += `${data}`;
      });
      pandoc.on('close', (code) => {
        if (!finished) {
          clearTimeout(timeoutId);
          if (!timeoutId) {
            res.statusCode = 408;
            cleanupCallback();
            reject(new Error('timeout'));
          } else if (code) {
            cleanupCallback();
            reject();
          } else {
            res.set('Content-Type', outputFormats[outputFormat]);
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
      req.pipe(pandoc.stdin);
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
        res.end(pandocError || 'Unknown error.');
      }
    });
};
