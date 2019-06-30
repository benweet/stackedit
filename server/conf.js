const pandocPath = process.env.PANDOC_PATH || 'pandoc';
const wkhtmltopdfPath = process.env.WKHTMLTOPDF_PATH || 'wkhtmltopdf';
const userBucketName = process.env.USER_BUCKET_NAME || 'stackedit-users';
const paypalUri = process.env.PAYPAL_URI || 'https://www.paypal.com/cgi-bin/webscr';
const paypalReceiverEmail = process.env.PAYPAL_RECEIVER_EMAIL;

const dropboxAppKey = process.env.DROPBOX_APP_KEY;
const dropboxAppKeyFull = process.env.DROPBOX_APP_KEY_FULL;
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleApiKey = process.env.GOOGLE_API_KEY;
const wordpressClientId = process.env.WORDPRESS_CLIENT_ID;

exports.values = {
  pandocPath,
  wkhtmltopdfPath,
  userBucketName,
  paypalUri,
  paypalReceiverEmail,
  dropboxAppKey,
  dropboxAppKeyFull,
  githubClientId,
  githubClientSecret,
  googleClientId,
  googleApiKey,
  wordpressClientId,
};

exports.publicValues = {
  dropboxAppKey,
  dropboxAppKeyFull,
  githubClientId,
  googleClientId,
  googleApiKey,
  wordpressClientId,
  allowSponsorship: !!paypalReceiverEmail,
};
