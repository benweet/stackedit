const request = require('request');
const AWS = require('aws-sdk');
const verifier = require('google-id-token-verifier');

const BUCKET_NAME = process.env.USER_BUCKET_NAME || 'stackedit-users';
const PAYPAL_URI = process.env.PAYPAL_URI || 'https://www.paypal.com/cgi-bin/webscr';
const PAYPAL_RECEIVER_EMAIL = process.env.PAYPAL_RECEIVER_EMAIL || 'stackedit.sales@gmail.com';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const s3Client = new AWS.S3();

const cb = (resolve, reject) => (err, res) => {
  if (err) {
    reject(err);
  } else {
    resolve(res);
  }
};

exports.getUser = id => new Promise((resolve, reject) => {
  s3Client.getObject({
    Bucket: BUCKET_NAME,
    Key: id,
  }, cb(resolve, reject));
})
  .then(
  res => JSON.parse(`${res.Body}`),
  (err) => {
    if (err.code !== 'NoSuchKey') {
      throw err;
    }
  });

exports.putUser = (id, user) => new Promise((resolve, reject) => {
  s3Client.putObject({
    Bucket: BUCKET_NAME,
    Key: id,
    Body: JSON.stringify(user),
  }, cb(resolve, reject));
});

exports.removeUser = id => new Promise((resolve, reject) => {
  s3Client.deleteObject({
    Bucket: BUCKET_NAME,
    Key: id,
  }, cb(resolve, reject));
});

exports.getUserFromToken = idToken => new Promise(
  (resolve, reject) => verifier.verify(idToken, GOOGLE_CLIENT_ID, cb(resolve, reject)))
  .then(tokenInfo => exports.getUser(tokenInfo.sub));

exports.userInfo = (req, res) => exports.getUserFromToken(req.query.idToken)
  .then(user => res.send(Object.assign({
    sponsorUntil: 0,
  }, user)),
  err => res.status(400).send(err ? err.message || err.toString() : 'invalid_token'));

exports.paypalIpn = (req, res, next) => Promise.resolve()
  .then(() => {
    const userId = req.body.custom;
    const paypalEmail = req.body.payer_email;
    const gross = parseFloat(req.body.mc_gross);
    let sponsorUntil;
    if (gross === 5) {
      sponsorUntil = Date.now() + (3 * 31 * 24 * 60 * 60 * 1000); // 3 months
    } else if (gross === 15) {
      sponsorUntil = Date.now() + (366 * 24 * 60 * 60 * 1000); // 1 year
    } else if (gross === 25) {
      sponsorUntil = Date.now() + (2 * 366 * 24 * 60 * 60 * 1000); // 2 years
    } else if (gross === 50) {
      sponsorUntil = Date.now() + (5 * 366 * 24 * 60 * 60 * 1000); // 5 years
    }
    if (
      req.body.receiver_email !== PAYPAL_RECEIVER_EMAIL ||
      req.body.payment_status !== 'Completed' ||
      req.body.mc_currency !== 'USD' ||
      (req.body.txn_type !== 'web_accept' && req.body.txn_type !== 'subscr_payment') ||
      !userId || !sponsorUntil
    ) {
      // Ignoring PayPal IPN
      return res.end();
    }
    // Processing PayPal IPN
    req.body.cmd = '_notify-validate';
    return new Promise((resolve, reject) => request.post({
      uri: PAYPAL_URI,
      form: req.body,
    }, (err, response, body) => {
      if (err) {
        reject(err);
      } else if (body !== 'VERIFIED') {
        reject(new Error('PayPal IPN unverified'));
      } else {
        resolve();
      }
    }))
      .then(() => exports.putUser(userId, {
        paypalEmail,
        sponsorUntil,
      }))
      .then(() => res.end());
  })
  .catch(next);

exports.checkSponsor = (idToken) => {
  if (!idToken) {
    return Promise.resolve(false);
  }
  return exports.getUserFromToken(idToken)
    .then(userInfo => userInfo && userInfo.sponsorUntil > Date.now(), () => false);
};

exports.checkMonetize = (token) => {
  if (!token) {
    return Promise.resolve(false);
  }
  return new Promise(resolve => request({
    uri: 'https://monetizejs.com/api/payments',
    qs: {
      access_token: token,
    },
    json: true,
  }, (err, paymentsRes, payments) => {
    const authorized = payments && payments.app === 'ESTHdCYOi18iLhhO' && (
      (payments.chargeOption && payments.chargeOption.alias === 'once') ||
      (payments.subscriptionOption && payments.subscriptionOption.alias === 'yearly'));
    resolve(!err && paymentsRes.statusCode === 200 && authorized);
  }));
};
