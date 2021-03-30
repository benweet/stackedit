const pandocPath = process.env.PANDOC_PATH || 'pandoc';
const wkhtmltopdfPath = process.env.WKHTMLTOPDF_PATH || 'wkhtmltopdf';
const userBucketName = process.env.USER_BUCKET_NAME || 'stackedit-users';
const paypalUri = process.env.PAYPAL_URI || 'https://www.paypal.com/cgi-bin/webscr';
const paypalReceiverEmail = process.env.PAYPAL_RECEIVER_EMAIL;

const dropboxAppKey = process.env.DROPBOX_APP_KEY;
const dropboxAppKeyFull = process.env.DROPBOX_APP_KEY_FULL;
const githubClientId = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const githubAuthUrl = process.env.GITHUB_AUTH_URL || 'https://github.com/login/oauth/authorize';
const githubTokenUrl = process.env.GITHUB_TOKEN_URL || 'https://github.com/login/oauth/access_token';
const githubUserProfileUrl = process.env.GITHUB_USER_PROFILE_URL || 'https://api.github.com/user';
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
  githubAuthUrl,
  githubTokenUrl,
  githubUserProfileUrl,
  googleClientId,
  googleApiKey,
  wordpressClientId,
};

exports.publicValues = {
  dropboxAppKey,
  dropboxAppKeyFull,
  githubClientId,
  githubAuthUrl,
  githubTokenUrl,
  githubUserProfileUrl,
  googleClientId,
  googleApiKey,
  wordpressClientId,
  allowSponsorship: !!paypalReceiverEmail,
};
