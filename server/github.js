const qs = require('qs'); // eslint-disable-line import/no-extraneous-dependencies
const request = require('request');
const conf = require('./conf');

function githubToken(clientId, code) {
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      url: 'https://github.com/login/oauth/access_token',
      qs: {
        client_id: clientId,
        client_secret: conf.values.githubClientSecret,
        code,
      },
    }, (err, res, body) => {
      if (err) {
        reject(err);
      }
      const token = qs.parse(body).access_token;
      if (token) {
        resolve(token);
      } else {
        reject(res.statusCode);
      }
    });
  });
}

exports.githubToken = (req, res) => {
  githubToken(req.query.clientId, req.query.code)
    .then(
      token => res.send(token),
      err => res
        .status(400)
        .send(err ? err.message || err.toString() : 'bad_code'),
    );
};
