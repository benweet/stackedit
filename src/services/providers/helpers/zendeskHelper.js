import networkSvc from '../../networkSvc';
import store from '../../../store';

const request = (token, options) => networkSvc.request({
  ...options,
  headers: {
    ...options.headers || {},
    Authorization: `Bearer ${token.accessToken}`,
  },
});

export default {
  startOauth2(subdomain, clientId, sub = null, silent = false) {
    return networkSvc.startOauth2(
      `https://${subdomain}.zendesk.com/oauth/authorizations/new`, {
        client_id: clientId,
        response_type: 'token',
        scope: 'read hc:write',
      }, silent)
      // Call the user info endpoint
      .then(({ accessToken }) => request({ accessToken }, {
        url: `https://${subdomain}.zendesk.com/api/v2/users/me.json`,
      })
        .then((res) => {
          const uniqueSub = `${subdomain}/${res.body.user.id}`;
          // Check the returned sub consistency
          if (sub && uniqueSub !== sub) {
            throw new Error('Zendesk account ID not expected.');
          }
          // Build token object including scopes and sub
          const token = {
            accessToken,
            name: res.body.user.name,
            subdomain,
            sub: uniqueSub,
          };
          // Add token to zendeskTokens
          store.dispatch('data/setZendeskToken', token);
          return token;
        }));
  },
  addAccount(subdomain, clientId) {
    return this.startOauth2(subdomain, clientId);
  },
  uploadArticle(
    token,
    sectionId,
    articleId,
    title,
    content,
    labels,
    locale,
    isDraft,
  ) {
    const article = {
      title,
      body: content,
      locale,
      draft: isDraft,
    };
    if (articleId) {
      return request(token, {
        method: 'PUT',
        url: `https://${token.subdomain}.zendesk.com/api/v2/help_center/articles/${articleId}/translations/${locale}.json`,
        body: { translation: article },
      })
        .then(() => labels && request(token, {
          method: 'PUT',
          url: `https://${token.subdomain}.zendesk.com/api/v2/help_center/articles/${articleId}.json`,
          body: {
            article: {
              label_names: labels,
            },
          },
        }))
        .then(() => articleId);
    }
    if (labels) {
      article.label_names = labels;
    }
    return request(token, {
      method: 'POST',
      url: `https://${token.subdomain}.zendesk.com/api/v2/help_center/sections/${sectionId}/articles.json`,
      body: { article },
    })
      .then(res => `${res.body.article.id}`);
  },
};
