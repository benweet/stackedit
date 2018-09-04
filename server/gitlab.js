const request = require('request');

function gitlabToken(clientId, redirectUri, code) {
  return new Promise((resolve, reject) => {
    request({
      method: 'POST',
      url: 'https://gitlab.com/oauth/token',
      qs: {
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: process.env.GITLAB_SECRET,
        code,
      },
    }, (err, res, body) => {
      if (err) {
        reject(err);
      }
      const token = JSON.parse(body).access_token;
      if (token) {
        resolve(token);
      } else {
        reject(res.statusCode);
      }
    });
  });
}

exports.gitlabToken = (req, res) => {
  gitlabToken(req.query.clientId, req.query.redirectUri, req.query.code)
    .then(
      token => res.send(token),
      err => res
        .status(400)
        .send(err ? err.message || err.toString() : 'bad_code'),
    );
};
