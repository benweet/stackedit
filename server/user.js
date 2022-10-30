import request  from 'request';
import AWS from 'aws-sdk'
import verifier from 'google-id-token-verifier'
import conf from './conf.js'

const s3Client = new AWS.S3();

const cb = (resolve, reject) => (err, res) => {
  if (err) {
    reject(err);
  } else {
    resolve(res);
  }
};

const getUser = id => new Promise((resolve, reject) => {
  s3Client.getObject({
    Bucket: conf.values.userBucketName,
    Key: id,
  }, cb(resolve, reject));
})
  .then(
    res => JSON.parse(`${res.Body}`),
    (err) => {
      if (err.code !== 'NoSuchKey') {
        throw err;
      }
    },
  );

const putUser = (id, user) => new Promise((resolve, reject) => {
  s3Client.putObject({
    Bucket: conf.values.userBucketName,
    Key: id,
    Body: JSON.stringify(user),
  }, cb(resolve, reject));
});

const removeUser = id => new Promise((resolve, reject) => {
  s3Client.deleteObject({
    Bucket: conf.values.userBucketName,
    Key: id,
  }, cb(resolve, reject));
});

const getUserFromToken = idToken => new Promise((resolve, reject) => verifier
  .verify(idToken, conf.values.googleClientId, cb(resolve, reject)))
  .then(tokenInfo => exports.getUser(tokenInfo.sub));

const userInfo = (req, res) => exports.getUserFromToken(req.query.idToken)
  .then(
    user => res.send(Object.assign({
      sponsorUntil: 0,
    }, user)),
    err => res
      .status(400)
      .send(err ? err.message || err.toString() : 'invalid_token'),
  );

const paypalIpn = (req, res, next) => Promise.resolve()
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
      req.body.receiver_email !== conf.values.paypalReceiverEmail ||
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
      uri: conf.values.paypalUri,
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
      .then(() => putUser(userId, {
        paypalEmail,
        sponsorUntil,
      }))
      .then(() => res.end());
  })
  .catch(next);

const checkSponsor = (idToken) => {
  if (!conf.publicValues.allowSponsorship) {
    return Promise.resolve(true);
  }
  if (!idToken) {
    return Promise.resolve(false);
  }
  return getUserFromToken(idToken)
    .then(userInfo => userInfo && userInfo.sponsorUntil > Date.now(), () => false);
};

export default {getUser,removeUser,paypalIpn,checkSponsor, userInfo}
