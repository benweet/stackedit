import networkSvc from '../../networkSvc';
import store from '../../../store';

const clientId = '23361';
const tokenExpirationMargin = 5 * 60 * 1000; // 5 min (WordPress tokens expire after 2 weeks)

const request = (token, options) => networkSvc.request({
  ...options,
  headers: {
    ...options.headers || {},
    Authorization: `Bearer ${token.accessToken}`,
  },
});

export default {
  startOauth2(sub = null, silent = false) {
    return networkSvc.startOauth2(
      'https://public-api.wordpress.com/oauth2/authorize', {
        client_id: clientId,
        response_type: 'token',
        scope: 'global',
      }, silent)
      // Call the user info endpoint
      .then(data => request({ accessToken: data.accessToken }, {
        url: 'https://public-api.wordpress.com/rest/v1.1/me',
      })
        .then((res) => {
          // Check the returned sub consistency
          if (sub && `${res.body.ID}` !== sub) {
            throw new Error('WordPress account ID not expected.');
          }
          // Build token object including scopes and sub
          const token = {
            accessToken: data.accessToken,
            expiresOn: Date.now() + (data.expiresIn * 1000),
            name: res.body.display_name,
            sub: `${res.body.ID}`,
          };
          // Add token to wordpressTokens
          store.dispatch('data/setWordpressToken', token);
          return token;
        }));
  },
  refreshToken(token) {
    const sub = token.sub;
    const lastToken = store.getters['data/wordpressTokens'][sub];

    return Promise.resolve()
      .then(() => {
        if (lastToken.expiresOn > Date.now() + tokenExpirationMargin) {
          return lastToken;
        }
        // Existing token is going to expire.
        // Try to get a new token in background
        return store.dispatch('modal/providerRedirection', {
          providerName: 'WordPress',
          onResolve: () => this.startOauth2(sub),
        });
      });
  },
  addAccount(fullAccess = false) {
    return this.startOauth2(fullAccess);
  },
  uploadPost(
    token,
    domain,
    siteId,
    postId,
    title,
    content,
    tags,
    categories,
    excerpt,
    author,
    featuredImage,
    status,
    date,
  ) {
    return this.refreshToken(token)
      .then(refreshedToken => request(refreshedToken, {
        method: 'POST',
        url: `https://public-api.wordpress.com/rest/v1.2/sites/${siteId || domain}/posts/${postId || 'new'}`,
        body: {
          content,
          title,
          tags,
          categories,
          excerpt,
          author,
          featured_image: featuredImage || '',
          status,
          date: date && date.toISOString(),
        },
      })
        .then(res => res.body));
  },
};
