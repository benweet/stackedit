var qs = require('qs');
var request = require('request');

function githubToken(clientId, code) {
  return new Promise(function (resolve, reject) {
    request({
      method: 'POST',
      url: 'https://github.com/login/oauth/access_token',
      qs: {
        client_id: clientId,
        client_secret: process.env.GITHUB_SECRET,
        code: code
      },
    }, function(err, res, body) {
      if (err) {
        reject(err);
      }
      var token = qs.parse(body).access_token;
      if (token) {
        resolve(token);
      } else {
        reject(res.statusCode);
      }
    });
  });
}

exports.githubToken = function (req, res) {
  githubToken(req.query.clientId, req.query.code)
    .then(function (token) {
      res.send(token);
    }, function (err) {
      res.status(400).send(err ? err.message || err.toString() : 'bad_code');
    });
};
